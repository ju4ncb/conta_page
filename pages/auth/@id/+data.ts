// https://vike.dev/data
export { data };
export type Data = Awaited<ReturnType<typeof data>>;

// The node-fetch package (which only works on the server-side) can be used since
// this file always runs on the server-side, see https://vike.dev/data#server-side
import dbConfig from "../../../server/dbConfig";
import mysql from "mysql2/promise";
import type { Usuario } from "../types";
import type { PageContextServer } from "vike/types";

async function query(pool: mysql.Pool) {
  let query = {} as Usuario;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM Usuarios");
    let rowsU = rows as Usuario[];
    query = rowsU[0];
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
  let usuarioData = {} as Usuario;

  // Perform a query
  usuarioData = await query(pool);

  return {
    usuario: usuarioData,
    // titulo de la pag
    title: "sapos todos",
  };
};

function sleep(milliseconds: number) {
  return new Promise((r) => setTimeout(r, milliseconds));
}
