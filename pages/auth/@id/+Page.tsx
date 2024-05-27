export { Page };

import { useData } from "../../../renderer/useData";
import type { Data } from "./+data";

function Page() {
  const { usuario } = useData<Data>();
  return (
    <>
      <h1>Holas {usuario.nombre === null ? "Cachon" : usuario.nombre}</h1>
      Nombre de usuario: {usuario.username}
      <br />
      Contraseña: {usuario.contrasena}
      <br />
      Correo: {usuario.correo === null ? "No hay correo" : usuario.correo}
    </>
  );
}
