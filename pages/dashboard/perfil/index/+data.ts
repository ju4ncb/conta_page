// https://vike.dev/data

export { data };
export type Data = Awaited<ReturnType<typeof data>>;

const data = async () => {
  return {
    // The page's <title>
    title: `Perfil`,
  };
};
