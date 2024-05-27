// https://vike.dev/data
export { data };
export type Data = Awaited<ReturnType<typeof data>>;

// The node-fetch package (which only works on the server-side) can be used since
// this file always runs on the server-side, see https://vike.dev/data#server-side
import dbConfig from "../../../server/dbConfig";
import mysql from "mysql2/promise";
import type { Usuario, UsuarioReducido } from "../types";
import type { PageContextServer } from "vike/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

async function query(pool: mysql.Pool) {
  let query = [] as UsuarioReducido[];
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT id_us, username FROM Usuarios"
    );
    query = rows as UsuarioReducido[];
    console.log("Data fetched from MySQL database:", query);
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("Error executing MySQL query: ", error);
  } finally {
    pool.end(); // Close the connection pool
    return query;
  }
}

const data = async (pageContext: PageContextServer) => {
  const pool = mysql.createPool(dbConfig);
  let usuariosData = [] as UsuarioReducido[];

  // Perform a query
  usuariosData = await query(pool);

  return {
    usuarios: usuariosData,
    // The page's <title>
    title: `Lista de usuarios`,
  };
};

function sleep(milliseconds: number) {
  return new Promise((r) => setTimeout(r, milliseconds));
}
