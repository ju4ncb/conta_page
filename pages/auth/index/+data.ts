// https://vike.dev/data
export { data };
export type Data = Awaited<ReturnType<typeof data>>;

// The node-fetch package (which only works on the server-side) can be used since

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const data = async () => {
  return {
    // The page's <title>
    title: `Inicio sesión`,
  };
};
