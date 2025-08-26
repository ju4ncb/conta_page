import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import { renderPage } from "vike/server";
import type { IncomingMessage, ServerResponse } from "http";
import {
  deleteQuery,
  insertQuery,
  insertMovimiento,
  selectQuery,
  updateBolsillo,
  updateUsuario,
} from "./dbQuerys.js";

export async function handleRequest(
  req: (IncomingMessage & express.Request) | VercelRequest,
  res: (ServerResponse & express.Response) | VercelResponse
) {
  // API routes first
  if (req.method === "POST") {
    if (req.url === "/update-bolsillo") {
      const { id_bo, dinero } = req.body;
      return updateBolsillo(id_bo, dinero, res);
    }
    if (req.url === "/get-usuario") {
      const { usuario, contrasena } = req.body;
      const tabla = "Usuarios";
      const columnas = "nombre, apellido, correo, username, contrasena, id_us";
      const condicion = `username = '${usuario}' AND contrasena = '${contrasena}'`;
      return selectQuery(tabla, columnas, condicion, res);
    }
    if (req.url === "/get-dinero") {
      const { idUsuario } = req.body;
      const tabla = "Bolsillos";
      const columnas = "dinero";
      const condicion = "id_us = " + idUsuario;
      return selectQuery(tabla, columnas, condicion, res);
    }
    if (req.url === "/insert-usuario") {
      const { us, pas, con, nm, ap } = req.body;
      const tabla = "Bolsillos";
      const columnas = [
        "username",
        "contrasena",
        "correo",
        "nombre",
        "apellido",
      ];
      const values = [us, pas, con, nm, ap];
      return insertQuery(tabla, columnas, values, res);
    }
    if (req.url === "/update-usuario") {
      const { id_us, valor, columna } = req.body;
      return updateUsuario(id_us, valor, columna, res);
    }
    if (req.url === "/get-table") {
      const { tabla, columnas, condicion } = req.body;
      return selectQuery(tabla, columnas, condicion, res);
    }
    if (req.url === "/insert-table") {
      const { tabla, columnas, values } = req.body;
      return insertQuery(tabla, columnas, values, res);
    }
    if (req.url === "/insert-movimiento") {
      const { nombre, dinero } = req.body;
      return insertMovimiento(nombre, dinero, res);
    }
    if (req.url === "/delete-table") {
      const { tabla, condicion } = req.body;
      return deleteQuery(tabla, condicion, res);
    }
  }

  // Vike SSR catch-all
  const pageContextInit = { urlOriginal: req.url! };
  const pageContext = await renderPage(pageContextInit);

  if (pageContext.errorWhileRendering) {
    // Add Sentry or logging here
  }

  const httpResponse = pageContext.httpResponse;
  if (!httpResponse) {
    res.statusCode = 404;
    res.end("Page not found");
    return;
  }

  const { body, statusCode, headers, earlyHints } = httpResponse;
  if ((res as any).writeEarlyHints) {
    (res as any).writeEarlyHints({
      link: earlyHints.map((e) => e.earlyHintLink),
    });
  }
  headers.forEach(([name, value]) => res.setHeader(name, value));
  res.statusCode = statusCode;
  res.end(body);
}
