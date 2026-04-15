export type EstadoPropuesta = 'pendiente' | 'negociando' | 'aprobado' | 'pagado' | 'vencido';

export interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
}

export interface Propuesta {
  id: string;
  clienteId: string;
  titulo: string;
  monto: number;
  fechaCreacion: string;
  fechaVencimiento: string;
  estado: EstadoPropuesta;
  notas?: string;
}

export interface Plantilla {
  id: string;
  nombre: string;
  mensaje: string; // Ejemplo: "Hola {{nombre}}, te adjunto el cobro de {{titulo}}..."
}