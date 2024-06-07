import React, { useEffect, useState } from "react";
import { useData } from "../../../../renderer/useData";
import { Data } from "./+data";
import DashboardLayout from "../../../../components/DashboardLayout";
import { SideBar, SideBarOption } from "../../../../components/SideBar";
import { Usuario } from "../../../auth/types";
import { ButtonItem, Form, FormInput } from "../../../../components/Form";

export default Page;

function Page() {
  useData<Data>();
  const [modalActive, setModalActive] = useState(false);
  const [usuario, setUsuario] = useState({} as Usuario);
  const [errMessage, setErrMessage] = useState("");

  async function handleSubmit(columna: string, value: string, value2: string) {
    if (value === value2) {
      try {
        const respuesta = await fetch("/update-usuario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_us: usuario.id_us + "",
            columna: columna,
            valor: value,
          }),
        });
        const resultado = await respuesta.text();

        if (columna === "username") {
          usuario.username = value;
          localStorage.setItem("user", JSON.stringify(usuario));
        } else if (columna === "correo") {
          usuario.correo = value;
          localStorage.setItem("user", JSON.stringify(usuario));
        } else {
          usuario.contrasena = value;
          localStorage.setItem("user", JSON.stringify(usuario));
        }
        setErrMessage(resultado + columna);
      } catch (error) {
        console.error("Error al cambiar los datos:", error);
      }
    } else {
      setErrMessage("No concuerdan " + columna);
    }
  }

  function toggleModal() {
    if (modalActive === false) {
      setModalActive(true);
    } else {
      setModalActive(false);
    }
  }

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson === null) {
      window.location.href = "/";
    } else {
      setUsuario(JSON.parse(userJson));
    }
  }, []);

  return (
    <DashboardLayout>
      <SideBar isBack={true}>
        <SideBarOption
          handleClick={() => {
            window.location.href = "/dashboard/perfil";
          }}
        >
          <i className="bi bi-person-dash-fill"></i>
          <p>Mi informacion</p>
        </SideBarOption>

        <SideBarOption
          handleClick={() => {
            window.location.href = "/dashboard/perfil";
          }}
        >
          <i className="bi bi-lock-fill"></i>
          <p>Seguridad</p>
        </SideBarOption>

        <SideBarOption
          handleClick={() => {
            toggleModal();
          }}
        >
          <i className="bi bi-trash3-fill"></i>
          <p>Eliminar cuenta</p>
        </SideBarOption>
      </SideBar>
      <main className="dash-content" style={{ flex: 4 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{ borderRadius: 20, overflow: "hidden", display: "flex" }}
          >
            <Form
              onSubmitForm={(atributes) => {
                handleSubmit("username", atributes[0], atributes[1]);
              }}
              buttons={
                [
                  {
                    content: "Cambiar username",
                    function: () => {},
                    isSubmit: true,
                  },
                ] as ButtonItem[]
              }
              formInputs={
                [
                  {
                    hideChar: false,
                    maxChar: 20,
                    minChar: 4,
                    required: true,
                    desc: "Usuario",
                    name: "username",
                  },
                  {
                    hideChar: false,
                    maxChar: 20,
                    minChar: 4,
                    required: true,
                    desc: "Confirmar usuario",
                    name: "usernameC",
                  },
                ] as FormInput[]
              }
              errorMessage={""}
            />
            <Form
              onSubmitForm={(atributes) => {
                handleSubmit("correo", atributes[0], atributes[1]);
              }}
              buttons={
                [
                  {
                    content: "Cambiar correo",
                    function: () => {},
                    isSubmit: true,
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
                    desc: "Correo",
                    name: "correo",
                  },
                  {
                    hideChar: false,
                    maxChar: 100,
                    minChar: 0,
                    required: true,
                    desc: "Confirmar correo",
                    name: "correoC",
                  },
                ] as FormInput[]
              }
              errorMessage={""}
            />
            <Form
              onSubmitForm={(atributes) => {
                handleSubmit("contrasena", atributes[0], atributes[1]);
              }}
              buttons={
                [
                  {
                    content: "Cambiar contraseña",
                    function: () => {},
                    isSubmit: true,
                  },
                ] as ButtonItem[]
              }
              formInputs={
                [
                  {
                    hideChar: true,
                    maxChar: 20,
                    minChar: 4,
                    required: true,
                    desc: "Contraseña",
                    name: "contraseña",
                  },
                  {
                    hideChar: true,
                    maxChar: 20,
                    minChar: 4,
                    required: true,
                    desc: "Confirmar contraseña",
                    name: "contraseñaC",
                  },
                ] as FormInput[]
              }
              errorMessage={""}
            />
          </div>
          <p style={{ color: "#ff6969" }}>{errMessage}</p>
        </div>
      </main>
    </DashboardLayout>
  );
}
