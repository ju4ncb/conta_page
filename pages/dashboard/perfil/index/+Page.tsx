import React, { useEffect, useState } from "react";
import { useData } from "../../../../renderer/useData";
import { Data } from "./+data";
import DashboardLayout from "../../../../components/DashboardLayout";
import { SideBar, SideBarOption } from "../../../../components/SideBar";
import { Usuario } from "../../../auth/types";

export default Page;

function Page() {
  useData<Data>();
  const [modalActive, setModalActive] = useState(false);
  const [usuario, setUsuario] = useState({} as Usuario);
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
            window.location.href = "/dashboard/perfil/seguridad ";
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
      <main className="dash-content" style={{ flex: 4 }}></main>
      {modalActive && (
        <main className="modal-container">
          <main className="modal">
            <p>¿Seguro que quieres eliminar tu cuenta?</p>
            <button
              className="buttonModal"
              onClick={async () => {
                try {
                  const respuesta = await fetch("/delete-table", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      tabla: "Usuarios",
                      condicion: "id_us = " + usuario.id_us,
                    }),
                  });
                  const resultado = await respuesta.text();
                  console.log(resultado);
                  localStorage.removeItem("user");
                  window.location.href = "/";

                  // Actualiza el estado o realiza acciones con los resultados
                } catch (error) {
                  console.error("Error al eliminar la cuenta:", error);
                }
              }}
            >
              Eliminar
            </button>
            <button className="buttonModal" onClick={toggleModal}>
              Cancelar
            </button>
          </main>
        </main>
      )}
    </DashboardLayout>
  );
}
