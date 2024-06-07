import DashboardLayout from "../../../../components/DashboardLayout";
import type { Data } from "./+data";
import { SideBar, SideBarOption } from "../../../../components/SideBar";
import { useData } from "../../../../renderer/useData";
import { Bolsillo, Movimiento } from "../types";
import { useEffect, useState } from "react";
import { ButtonItem, Form, FormInput } from "../../../../components/Form";

export default Page;

function Page() {
  const [bolsillo, setBolsillo] = useState({} as Bolsillo);
  const [movimientos, setMovimientos] = useState([] as Movimiento[]);
  const [modalActive, setModalActive] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  async function handleSubmit(din: string) {
    try {
      let dinero = Number(din);
      const respuesta = await fetch("/update-bolsillo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_bo: bolsillo.id_bo + "",
          dinero: dinero + "",
        }),
      });
      const resultado = await respuesta.text();

      if (resultado != "Values updated") {
        setErrMessage(resultado);
      } else {
        bolsillo.dinero = bolsillo.dinero + dinero;
        localStorage.setItem("bolsillo", JSON.stringify(bolsillo));
        window.location.href = "/dashboard/bolsillos/" + bolsillo.id_bo;
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  }

  function toggleModal() {
    if (modalActive === false) {
      setModalActive(true);
    } else {
      setModalActive(false);
    }
  }

  async function getMovimientos(bol: Bolsillo) {
    try {
      const respuesta = await fetch("/get-table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tabla: "Movimientos",
          columnas: "id_mo, id_bo, monto, descripcion, fecha",
          condicion: "id_bo = " + bol.id_bo,
        }),
      });
      const resultado = await respuesta.json();
      setMovimientos(resultado.resultados as Movimiento[]);
      console.log(movimientos);
      // Actualiza el estado o realiza acciones con los resultados
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  }

  useEffect(() => {
    const bolsilloJson = localStorage.getItem("bolsillo");
    if (bolsilloJson === null) {
      window.location.href = "/";
    } else {
      setBolsillo(JSON.parse(bolsilloJson) as Bolsillo);
      getMovimientos(JSON.parse(bolsilloJson) as Bolsillo);
    }
  }, []);
  useData<Data>();
  return (
    <DashboardLayout>
      <SideBar isBack={true}>
        <SideBarOption
          handleClick={() => {
            toggleModal();
          }}
        >
          <i className="bi bi-journal-plus" />
          <p>Nuevo movimiento</p>
        </SideBarOption>
        <SideBarOption
          handleClick={async () => {
            try {
              fetch("/delete-table", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  tabla: "Movimientos",
                  condicion: "id_bo = " + bolsillo.id_bo,
                }),
              })
                .then((response) => response.text())
                .then((response) => {
                  console.log("id_bo = " + bolsillo.id_bo);
                });
              fetch("/delete-table", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  tabla: "Bolsillos",
                  condicion: "id_bo = " + bolsillo.id_bo,
                }),
              })
                .then((response) => response.text())
                .then((response) => {
                  console.log("id_bo = " + bolsillo.id_bo);
                });
              localStorage.removeItem("bolsillo");
              window.location.href = "/dashboard/bolsillos";
            } catch (error) {
              console.error("Error al eliminar el bolsillo:", error);
            }
          }}
        >
          <i className="bi bi-journal-x" />
          <p>Eliminar</p>
        </SideBarOption>
      </SideBar>
      <main className="dash-content" style={{ flex: 3.5 }}>
        <section className="bolsillo-extendido">
          <div className="titulo">
            <h1>{bolsillo.nombre}</h1>
          </div>
          <div className="contenido">
            {bolsillo.descripcion !== null && (
              <div className="descripcion">
                <p>{bolsillo.descripcion}</p>
              </div>
            )}
            <div className="balance">
              <p>${bolsillo.dinero}</p>
            </div>
            <section className="movimientos">
              <h3>Movimientos</h3>
              {movimientos.map(({ monto, descripcion, fecha }, index) => (
                <p key={index}>
                  Dinero: ${monto}
                  {descripcion != null && ", Descripción: " + descripcion},{" "}
                  {fecha}
                </p>
              ))}
            </section>
          </div>
        </section>
        {modalActive && (
          <Form
            additionalClass="fixed"
            onSubmitForm={(atributes) => {
              handleSubmit(atributes[0]);
            }}
            buttons={
              [
                {
                  content: "Cambiar dinero",
                  function: () => {},
                  isSubmit: true,
                },
                {
                  content: "Cancelar",
                  function: (
                    event: React.MouseEvent<HTMLElement, MouseEvent>
                  ) => {
                    event.preventDefault();
                    toggleModal();
                  },
                  isSubmit: false,
                },
              ] as ButtonItem[]
            }
            formInputs={
              [
                {
                  hideChar: false,
                  maxChar: 100,
                  minChar: 0,
                  required: true,
                  desc: "Suma o resta la cantidad actual de dinero",
                  name: "monto",
                },
              ] as FormInput[]
            }
            errorMessage={errMessage}
          />
        )}
      </main>
    </DashboardLayout>
  );
}
