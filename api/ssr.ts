import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleRequest } from "./render.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await handleRequest(req, res);
}
