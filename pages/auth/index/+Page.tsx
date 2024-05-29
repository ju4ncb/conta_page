export default Page;

import { useData } from "../../../renderer/useData";
import type { Data } from "./+data";

function Page() {
  const { usuarios } = useData<Data>();
  console.log(usuarios);
  return (
    <>
      <h1>Usuarios</h1>
      <ol>
        {usuarios.map(({ id, username }) => (
          <li key={id}>
            <a href={`/auth/${id}`}>{username}</a> e
          </li>
        ))}
      </ol>
      <p>La mala para donaldo</p>
      <p>
        Data can be fetched by using the <code>data()</code> hook.
      </p>
    </>
  );
}
