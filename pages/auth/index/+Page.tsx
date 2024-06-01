export default Page;

import { useData } from "../../../renderer/useData";
import type { Data } from "./+data";
import { Form, ButtonItem, FormInput } from "../../../components/Form";
import { useEffect, useState } from "react";
import loginImage from "../../../renderer/images/login.jpg";
import Home from "../../../components/Home";

function Page() {
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson !== null) {
      window.location.href = "/";
    }
  }, []);
  useData<Data>();
  const [errMessage, setErrMessage] = useState("");

  async function handleSubmit(us: string, pas: string) {
    try {
      console.log(us);
      const respuesta = await fetch("/get-table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tabla: "Usuarios",
          columnas: "nombre, apellido, correo, username, contrasena, id_us",
          condicion: 'username = "' + us + '"',
        }),
      });
      const resultado = await respuesta.json();

      if (resultado.resultados.length == 0) {
        setErrMessage("Usuario no existe");
      } else if (pas != resultado.resultados[0].contrasena) {
        setErrMessage("Intente de nuevo");
      } else {
        localStorage.setItem("user", JSON.stringify(resultado.resultados[0]));
        console.log(localStorage.getItem("user"));
        window.location.href = "/dashboard";
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
            handleSubmit(atributes[0], atributes[1]);
          }}
          buttons={
            [
              { content: "Ingresar", function: () => {}, isSubmit: true },
              {
                content: "Registrarse",
                function: (
                  event: React.MouseEvent<HTMLElement, MouseEvent>
                ) => {
                  event.preventDefault();
                  window.location.href = "/register";
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
                desc: "Usuario",
                name: "username",
              },
              {
                hideChar: true,
                maxChar: 20,
                minChar: 4,
                required: true,
                desc: "Contraseña",
                name: "contrasena",
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
