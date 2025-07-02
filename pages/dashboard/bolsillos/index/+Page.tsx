import { useEffect, useState } from "react";
import DashboardLayout from "../../../../components/DashboardLayout";
import { useData } from "../../../../renderer/useData";
import type { Data } from "./+data";
import { SideBar } from "../../../../components/SideBar";
import { Usuario } from "../../../auth/types";
import {
  Bolsillos,
  BolsilloComponente,
} from "../../../../components/Bolsillos";
import { Bolsillo } from "../types";

export default Page;

function Page() {
  const [, setUsuario] = useState({} as Usuario);
  const [bolsillos, setBolsillos] = useState([] as Bolsillo[]);

  async function fetchBolsillos() {
    const userJson = localStorage.getItem("user");
    if (userJson != null) {
      const respuesta = await fetch("/get-table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tabla: "Bolsillos",
          columnas: "nombre, descripcion, dinero, id_bo, id_us",
          condicion: "id_us = " + JSON.parse(userJson).id_us,
        }),
      });
      const resultado = await respuesta.json();
      if (resultado.resultados.length != 0) {
        setBolsillos(resultado.resultados);
      }
    }
  }

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson === null) {
      window.location.href = "/";
    } else {
      setUsuario(JSON.parse(userJson) as Usuario);
      fetchBolsillos();
    }
  }, []);
  useData<Data>();

  return (
    <DashboardLayout>
      <SideBar isBack={true}>{""}</SideBar>
      <main className="dash-content">
        <Bolsillos>
          {bolsillos.length == 0
            ? ""
            : bolsillos.map((bolsillo, index) => (
                <BolsilloComponente
                  key={index}
                  onClick={() => {
                    localStorage.setItem("bolsillo", JSON.stringify(bolsillo));
                    window.location.href =
                      "/dashboard/bolsillos/" + bolsillo.id_bo;
                  }}
                >
                  <p>{bolsillo.nombre}</p>
                </BolsilloComponente>
              ))}
        </Bolsillos>
      </main>
    </DashboardLayout>
  );
}
