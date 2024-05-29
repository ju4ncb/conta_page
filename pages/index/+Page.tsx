export { Page };

import { Counter } from "./Counter";

function Page() {
  return (
    <>
      <h1>Pagina de test</h1>
      No te burles aun q no he decorado nada JAJAJAJJAJAJ
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Contador. <Counter />
        </li>
      </ul>
    </>
  );
}
