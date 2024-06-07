import { useEffect } from "react";
import Footer from "../../../components/Footer";
import DashboardLayout from "../../../components/DashboardLayout";
import { useData } from "../../../renderer/useData";
import type { Data } from "./+data";
import { SideBar, SideBarOption } from "../../../components/SideBar";

export default Page;

function Page() {
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson === null) {
      window.location.href = "/";
    }
  }, []);
  useData<Data>();

  return (
    <DashboardLayout>
      <SideBar isBack={false}>
        <SideBarOption>
          <i className="bi bi-person" />
          <p>Mi perfil</p>
        </SideBarOption>
        <SideBarOption>
          <i className="bi bi-journals" />
          <p>Bolsillos</p>
        </SideBarOption>
        <SideBarOption>
          <i className="bi bi-card-list" />
          <p>Movimientos</p>
        </SideBarOption>
      </SideBar>
      <main className="dash-content">
        <section className="hero__principal">
          <div className="monto">
            <h2 className="title__m">Hola! {}</h2>
            <h2 className="title_monto">Disponible</h2>
            <p className="p__dinero">$1000</p>
          </div>
          <section className="d-services">
            <div className="d-services__cuadros">
              <a href="#">Mis pagos</a>
            </div>

            <div className="d-services__cuadros">
              <a href="#">Mis bolsillos</a>
            </div>

            <div className="d-services__cuadros">
              <a href="#">Cerrar sesión</a>
            </div>

            <div className="d-services__cuadros">
              <a href="#">Configuracion</a>
            </div>
          </section>
        </section>
      </main>
    </DashboardLayout>
  );
}
