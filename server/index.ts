import express from "express";
import compression from "compression";
import { handleRequest } from "./render.js";

startServer();

async function startServer() {
  const app = express();
  app.use(compression());
  app.use(express.json());

  // In dev: Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await import("vite");
    const viteDev = await vite.createServer({
      root: process.cwd(),
      server: { middlewareMode: true },
    });
    app.use(viteDev.middlewares);
  } else {
    const sirv = (await import("sirv")).default;
    app.use(sirv(`${process.cwd()}/dist/client`));
  }

  // Catch-all -> delegate to render.ts
  app.all("*", (req, res) => handleRequest(req, res));

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
