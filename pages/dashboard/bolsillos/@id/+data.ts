export { data };
export type Data = Awaited<ReturnType<typeof data>>;

import type { PageContextServer } from "vike/types";

const data = async (pageContext: PageContextServer) => {
  return {
    // The page's <title>
    title: `Bolsillo`,
  };
};
