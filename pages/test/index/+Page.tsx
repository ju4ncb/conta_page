export default Page;

import { useData } from "../../../renderer/useData";
import type { Data } from "./+data";

function Page() {
  const { usuarios } = useData<Data>();
  return (
    <div className="auth_body" style={{ width: window.innerWidth }}>
      <h1>Usuarios</h1>
      <ol>
        {usuarios.map(({ id_us, username }) => (
          <li key={id_us}>
            <a href={`/auth/${id_us}`}>{username}</a> e
          </li>
        ))}
      </ol>
      <p>La mala para donaldo y julio</p>
      <p>
        Data can be fetched by using the <code>data()</code> hook.
      </p>
    </div>
  );
}
