import express from "express";
import dbConfig from "./dbConfig.js";
import fs from "fs";
import mysql from "mysql2/promise";

// db connection
const pool = mysql.createPool(dbConfig);

export const insertQuery = async (
  tableName: string,
  columns: string[],
  values: string[],
  res: express.Response
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

export const selectQuery = async (
  tableName: string,
  columns: string,
  condition: string,
  res: express.Response
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
