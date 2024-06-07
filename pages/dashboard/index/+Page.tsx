import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { useData } from "../../../renderer/useData";
import type { Data } from "./+data";
import { SideBar, SideBarOption } from "../../../components/SideBar";

export default Page;

function Page() {
  useData<Data>();
  const [nombreUsuario, setNombreUsuario] = useState("");
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson === null) {
      window.location.href = "/";
    } else {
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
        <SideBarOption handleClick={() => {}}>
          <i className="bi bi-journals" />
          <p>Bolsillos</p>
        </SideBarOption>
        <SideBarOption handleClick={() => {}}>
          <i className="bi bi-card-list" />
          <p>Movimientos</p>
        </SideBarOption>
      </SideBar>
      <main className="dash-content">
        <section className="hero__principal">
          <div className="monto">
            <h2 className="title__m">Hola! {nombreUsuario}</h2>
            <h2 className="title_monto">Disponible</h2>
            <p className="p__dinero">$1000</p>
          </div>
          <section className="d-services">
            <div className="d-services__cuadros">
              <p>Mis pagos</p>
            </div>

            <div className="d-services__cuadros">
              <p>Mis bolsillos</p>
            </div>

            <div className="d-services__cuadros">
              <p>Cerrar sesión</p>
            </div>

            <div className="d-services__cuadros">
              <p>Configuracion</p>
            </div>
          </section>
        </section>
      </main>
    </DashboardLayout>
  );
}
