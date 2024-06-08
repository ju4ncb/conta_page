import { useState } from "react";
import { ButtonItem, Form, FormInput } from "./Form";
import { Usuario } from "../pages/auth/types";

export const Bolsillos = ({ children }: { children: React.ReactNode }) => {
  const [modalActive, setModalActive] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  async function handleSubmit(nm: string, din: string, desc: string) {
    const userJson = localStorage.getItem("user");
    if (userJson != null) {
      const user = JSON.parse(userJson) as Usuario;
      try {
        let dinero = din as unknown as number;
        const respuesta = await fetch("/insert-table", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tabla: "Bolsillos",
            columnas: ["id_us", "nombre", "dinero", "descripcion"],
            values: [user.id_us, nm, dinero + "", desc],
          }),
        });
        const resultado = await respuesta.text();

        if (resultado != "Values inserted") {
          setErrMessage(resultado);
        } else {
          const respuesta2 = await fetch("/insert-movimiento", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre: nm,
              dinero: din,
            }),
          });
          const resultado2 = await respuesta2.text();

          if (resultado2 != "Values inserted") {
            setErrMessage(resultado2);
          } else {
            window.location.href = "/dashboard/bolsillos";
          }
        }
      } catch (error) {
        console.error("Error al enviar los datos:", error);
      }
    }
  }

  function toggleModal() {
    if (modalActive === false) {
      setModalActive(true);
    } else {
      setModalActive(false);
    }
  }

  return (
    <>
      <section className="bolsillos-container">
        {children}
        <BolsilloComponente onClick={toggleModal}>
          <p>Crear bolsillo</p>
        </BolsilloComponente>
      </section>
      {modalActive && (
        <Form
          additionalClass="fixed"
          onSubmitForm={(atributes) => {
            handleSubmit(atributes[0], atributes[1], atributes[2]);
          }}
          buttons={
            [
              { content: "Crear bolsillo", function: () => {}, isSubmit: true },
              {
                content: "Cerrar",
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
                maxChar: 30,
                minChar: 0,
                required: true,
                desc: "Título (*) ",
                name: "nombre",
              },
              {
                hideChar: false,
                maxChar: 10,
                minChar: 0,
                required: true,
                desc: "Dinero inicial (*) ",
                name: "dinero",
              },
              {
                hideChar: false,
                maxChar: 200,
                minChar: 0,
                required: false,
                desc: "Descripcion",
                name: "descripcion",
              },
            ] as FormInput[]
          }
          errorMessage={errMessage}
        />
      )}
    </>
  );
};

export const BolsilloComponente = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick(): void;
}) => {
  return (
    <div className="bolsillo" onClick={onClick}>
      {children}
    </div>
  );
};
