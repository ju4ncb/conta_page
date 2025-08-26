import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { VercelResponse } from "@vercel/node";

// db connection
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
};

const pool = mysql.createPool(dbConfig);

type Movimiento = {
  id_mo: number;
  id_bo: number;
  monto: number;
  descripcion: string;
  fecha: string;
};

type Bolsillo = {
  id_bo: number;
  id_us: number;
  dinero: number;
  nombre: string;
  descripcion: string;
};

export const insertQuery = async (
  tableName: string,
  columns: string[],
  values: string[],
  res: express.Response | VercelResponse
) => {
  if (columns.length === 0 || values.length === 0) {
    res.status(200).send("Can't insert nothing on a table");
    return;
  } else if (columns.length != values.length) {
    res.status(200).send("The size of columns must match the size of values");
    return;
  }
  let columnsQuery = columns[0];
  let valuesQuery = "?";
  for (let i = 1; i < columns.length; i++) {
    columnsQuery += ", " + columns[i];
    valuesQuery += ", ?";
  }
  try {
    const connection = await pool.getConnection();
    const query = `
      INSERT INTO ${tableName} (${columnsQuery})
      VALUES (${valuesQuery});`;

    // Provide actual values for your columns
    const [rows] = await connection.execute(query, values);
    console.log("New row inserted:", rows);

    connection.release(); // Release the connection
  } catch (error) {
    console.log(error);
    res.status(200).send(error);
    return;
  }
  res.status(200).send("Values inserted");
};

export const insertMovimiento = async (
  nombre: string,
  dinero: string,
  res: express.Response | VercelResponse
) => {
  try {
    const connection = await pool.getConnection();
    const selQuery = `
      SELECT * FROM Bolsillos WHERE nombre = "${nombre}"
    `;
    const [selRows] = await connection.execute(selQuery);
    const row = selRows as Movimiento[];
    connection.release(); // Release the connection
    const query = `
      INSERT INTO Movimientos (id_bo, monto)
      VALUES (${row[row.length - 1].id_bo}, ${dinero});`;

    // Provide actual values for your columns
    const [rows] = await connection.execute(query);
    console.log("New row inserted:", rows);

    connection.release(); // Release the connection
  } catch (error) {
    console.log(error);
    res.status(200).send(error);
    return;
  }
  res.status(200).send("Values inserted");
};

export const updateBolsillo = async (
  id_bo: string,
  dinero: string,
  res: express.Response | VercelResponse
) => {
  try {
    const connection = await pool.getConnection();
    const selQuery = `
      SELECT * FROM Bolsillos WHERE id_bo = "${id_bo}"
    `;
    const [selRows] = await connection.execute(selQuery);
    const row = selRows as Bolsillo[];
    connection.release(); // Release the connection
    const dineroSumado = row[0].dinero + Number(dinero);
    console.log(dineroSumado);
    const updQuery = `
      UPDATE Bolsillos SET dinero = ${dineroSumado + ""} WHERE id_bo = ${id_bo}
    `;
    await connection.execute(updQuery);
    connection.release(); // Release the connection
    const query = `
      INSERT INTO Movimientos (id_bo, monto)
      VALUES (${id_bo}, ${dinero});`;

    const [rows] = await connection.execute(query);
    console.log("New row inserted:", rows);

    connection.release(); // Release the connection
  } catch (error) {
    console.log(error);
    res.status(200).send(error);
    return;
  }
  res.status(200).send("Values updated");
};

export const updateUsuario = async (
  id_us: string,
  valor: string,
  columna: string,
  res: express.Response | VercelResponse
) => {
  try {
    const connection = await pool.getConnection();
    const query = `
      UPDATE Usuarios SET ${columna} = "${valor}" WHERE id_us = ${id_us}
    `;
    const [rows] = await connection.execute(query);
    console.log("New row updated:", rows);

    connection.release(); // Release the connection
  } catch (error) {
    console.log(error);
    res.status(200).send(error);
    return;
  }
  res.status(200).send("Values updated");
};

export const selectQuery = async (
  tableName: string,
  columns: string,
  condition: string,
  res: express.Response | VercelResponse
) => {
  try {
    const connection = await pool.getConnection();
    let query: string;
    if (condition.trim() === "") {
      query = `
        SELECT ${columns} FROM ${tableName}
      `;
    } else if (columns[0] === "all") {
      query = `
        SELECT FROM ${tableName}
      `;
    } else {
      query = `
        SELECT ${columns} FROM ${tableName}
        WHERE ${condition};
      `;
    }
    // Provide actual values for your columns
    const [rows] = await connection.execute(query);
    console.log("Rows retrieved:\n", rows);
    connection.release(); // Release the connection
    res.json({ resultados: rows });
  } catch (error) {
    console.log(error);
    res.status(200).send(error);
    return;
  }
};

export const deleteQuery = async (
  tableName: string,
  condition: string,
  res: express.Response | VercelResponse
) => {
  try {
    const connection = await pool.getConnection();
    let query: string;
    if (condition.trim() === "") {
      query = `
        DELETE FROM ${tableName}
      `;
    } else {
      query = `
        DELETE FROM ${tableName}
        WHERE ${condition};
      `;
    }
    // Provide actual values for your columns
    const [rows] = await connection.execute(query);
    console.log("Rows deleted:\n", rows);
    connection.release(); // Release the connection
    res.status(200).send("Rows deleted succesfully");
  } catch (error) {
    console.log(error);
    res.status(200).send(error);
    return;
  }
};
