import { renderPage } from "vike/server";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pageContextInit = {
    urlOriginal: req.url!,
  };

  const pageContext = await renderPage(pageContextInit);

  if (pageContext.httpResponse) {
    const { body, statusCode, headers } = pageContext.httpResponse;
    headers?.forEach(([name, value]) => res.setHeader(name, value));
    res.status(statusCode).send(body);
  } else {
    res.status(404).send("Page not found");
  }
}
