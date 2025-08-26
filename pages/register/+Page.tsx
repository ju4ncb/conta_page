export default Page;

import { useData } from "../../renderer/useData";
import type { Data } from "./+data";
import { Form, ButtonItem, FormInput } from "../../components/Form";
import { useState, useEffect } from "react";
import loginImage from "../../renderer/images/login.jpg";
import Home from "../../components/Home";

function Page() {
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson !== null) {
      window.location.href = "/";
    }
  }, []);

  useData<Data>();
  const [errMessage, setErrMessage] = useState("");

  async function handleSubmit(
    us: string,
    pas: string,
    cor: string,
    nm: string,
    ap: string
  ) {
    try {
      console.log(us);
      const respuesta = await fetch("/insert-table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tabla: "Usuarios",
          columnas: ["username", "contrasena", "correo", "nombre", "apellido"],
          values: [us, pas, cor, nm, ap],
        }),
      });
      const resultado = await respuesta.text();
      if (resultado != "Values inserted") {
        setErrMessage(resultado);
      } else {
        window.location.href = "/auth";
      }

      // Actualiza el estado o realiza acciones con los resultados
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  }

  return (
    <div className="auth_body">
      <Home />
      <div className="auth-container">
        <Form
          onSubmitForm={(atributes) => {
            handleSubmit(
              atributes[0],
              atributes[1],
              atributes[2],
              atributes[3],
              atributes[4]
            );
          }}
          buttons={
            [
              { content: "Registrarse", function: () => {}, isSubmit: true },
              {
                content: "Iniciar sesión",
                function: (
                  event: React.MouseEvent<HTMLElement, MouseEvent>
                ) => {
                  event.preventDefault();
                  window.location.href = "/auth";
                },
                isSubmit: false,
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
                desc: "Usuario (*) ",
                name: "username",
              },
              {
                hideChar: true,
                maxChar: 20,
                minChar: 4,
                required: true,
                desc: "Contraseña (*) ",
                name: "contrasena",
              },
              {
                hideChar: false,
                maxChar: 100,
                minChar: 0,
                required: false,
                desc: "Correo (*) ",
                name: "correo",
              },
              {
                hideChar: false,
                maxChar: 50,
                minChar: 0,
                required: false,
                desc: "Nombre",
                name: "nombre",
              },
              {
                hideChar: false,
                maxChar: 50,
                minChar: 0,
                required: false,
                desc: "Apellido",
                name: "apellido",
              },
            ] as FormInput[]
          }
          errorMessage={errMessage}
        />
        <img src={loginImage} alt="" />
      </div>
    </div>
  );
}
