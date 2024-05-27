export type Usuario = UsuarioReducido & {
  nombre: string;
  apellido: string;
  contrasena: string;
  correo: string;
};

export type UsuarioReducido = {
  id: string;
  username: string;
};
