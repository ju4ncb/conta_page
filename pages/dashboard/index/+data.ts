// https://vike.dev/data
export { data };
export type Data = Awaited<ReturnType<typeof data>>;

// The node-fetch package (which only works on the server-side) can be used since
// this file always runs on the server-side, see https://vike.dev/data#server-side
import type { PageContextServer } from "vike/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const data = async (pageContext: PageContextServer) => {
  return {
    // The page's <title>
    title: `Dashboard`,
  };
};
