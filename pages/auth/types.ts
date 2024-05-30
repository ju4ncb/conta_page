export type UsuarioReducido = {
  id_us: string;
  username: string;
  contrasena: string;
};

export type Usuario = UsuarioReducido & {
  nombre: string;
  correo: string;
  apellido: string;
};
