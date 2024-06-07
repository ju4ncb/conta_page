import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { useData } from "../../../renderer/useData";
import type { Data } from "./+data";
import { SideBar, SideBarOption } from "../../../components/SideBar";

export default Page;

type Fila = {
  dinero: number;
};

function Page() {
  useData<Data>();
  const [dineroDisponible, setDineroDisponible] = useState(0);
  const [nombreUsuario, setNombreUsuario] = useState("");

  async function calcularDinero() {
    const userJson = localStorage.getItem("user");
    if (userJson != null) {
      try {
        const respuesta = await fetch("/get-table", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tabla: "Bolsillos",
            columnas: "dinero",
            condicion: "id_us = " + JSON.parse(userJson).id_us,
          }),
        });
        const resultado = await respuesta.json();

        let dinero = 0;
        const resultados = resultado.resultados as Fila[];
        resultados.forEach((fila) => {
          dinero += fila.dinero;
        });

        setDineroDisponible(dinero);

        // Actualiza el estado o realiza acciones con los resultados
      } catch (error) {
        console.error("Error conseguir los datos:", error);
      }
    }
  }

  useEffect(() => {
    const userJson = localStorage.getItem("user");

    if (userJson === null) {
      window.location.href = "/";
    } else {
      calcularDinero();
      setNombreUsuario(JSON.parse(userJson).nombre);
    }
  }, []);

  return (
    <DashboardLayout>
      <SideBar isBack={false}>
        <SideBarOption
          handleClick={() => {
            window.location.href = "/dashboard/perfil";
          }}
        >
          <i className="bi bi-person" />
          <p>Mi perfil</p>
        </SideBarOption>
        <SideBarOption
          handleClick={() => {
            window.location.href = "/dashboard/bolsillos";
          }}
        >
          <i className="bi bi-journals" />
          <p>Bolsillos</p>
        </SideBarOption>
      </SideBar>
      <main className="dash-content">
        <section className="hero__principal">
          <div className="monto">
            <h2 className="title__m">Hola! {nombreUsuario}</h2>
            <h2 className="title_monto">Disponible</h2>
            <p className="p__dinero">${dineroDisponible}</p>
          </div>
          <section className="d-services">
            <div
              className="d-services__cuadros"
              onClick={() => {
                alert("Pronto habilitaremos esta opción!");
              }}
            >
              <p style={{ textAlign: "center" }}>Mis subscripciones</p>
            </div>

            <div
              className="d-services__cuadros"
              onClick={() => {
                window.location.href = "/dashboard/bolsillos";
              }}
            >
              <p>Mis bolsillos</p>
            </div>

            <div
              className="d-services__cuadros"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("bolsillo");
                window.location.href = "/";
              }}
            >
              <p>Cerrar sesión</p>
            </div>

            <div
              className="d-services__cuadros"
              onClick={() => {
                window.location.href = "/dashboard/perfil";
              }}
            >
              <p>Configuracion</p>
            </div>
          </section>
        </section>
      </main>
    </DashboardLayout>
  );
}
