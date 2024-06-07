import DashboardLayout from "../../../../components/DashboardLayout";
import type { Data } from "./+data";
import { SideBar } from "../../../../components/SideBar";
import { useData } from "../../../../renderer/useData";
import { Bolsillo } from "../types";
import { useEffect, useState } from "react";

export default Page;

function Page() {
  const [bolsillo, setBolsillo] = useState({} as Bolsillo);
  useEffect(() => {
    const bolsilloJson = localStorage.getItem("bolsillo");
    if (bolsilloJson === null) {
      window.location.href = "/";
    } else {
      setBolsillo(JSON.parse(bolsilloJson) as Bolsillo);
    }
  }, []);
  useData<Data>();
  return (
    <DashboardLayout>
      <SideBar isBack={true}>{""}</SideBar>
      <main className="dash-content">
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
              <p>a</p>
            </section>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}
