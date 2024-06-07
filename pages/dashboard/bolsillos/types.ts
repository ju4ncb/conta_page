export type Bolsillo = {
  id_bo: number;
  id_us: number;
  dinero: number;
  nombre: string;
  descripcion: string;
};

export type Movimiento = {
  id_mo: number;
  id_bo: number;
  monto: number;
  descripcion: string;
  fecha: string;
};
