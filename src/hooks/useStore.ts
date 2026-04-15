import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cliente, Propuesta, Plantilla } from '@/types';

interface AppState {
  clientes: Cliente[];
  propuestas: Propuesta[];
  plantillas: Plantilla[];
  
  // Acciones para Clientes
  addCliente: (cliente: Cliente) => void;
  deleteCliente: (id: string) => void;
  
  // Acciones para Propuestas
  addPropuesta: (propuesta: Propuesta) => void;
  updateEstadoPropuesta: (id: string, estado: Propuesta['estado']) => void;
  deletePropuesta: (id: string) => void;

  // Acciones para Plantillas (Configuración)
  updatePlantilla: (id: string, nuevoMensaje: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      clientes: [],
      propuestas: [],
      plantillas: [
        { 
          id: '1', 
          nombre: 'Recordatorio Estándar', 
          mensaje: 'Hola {{nombre}}, espero estés bien. Te envío este recordatorio sobre el pago de "{{titulo}}" por un monto de {{monto}}. ¡Saludos!' 
        }
      ],

      // Clientes
      addCliente: (cliente) => 
        set((state) => ({ clientes: [...state.clientes, cliente] })),
      
      deleteCliente: (id) => 
        set((state) => ({ clientes: state.clientes.filter(c => c.id !== id) })),

      // Propuestas
      addPropuesta: (propuesta) => 
        set((state) => ({ propuestas: [...state.propuestas, propuesta] })),

      updateEstadoPropuesta: (id, estado) =>
        set((state) => ({
          propuestas: state.propuestas.map((p) => 
            p.id === id ? { ...p, estado } : p
          ),
        })),

      deletePropuesta: (id) => 
        set((state) => ({ 
          propuestas: state.propuestas.filter(p => p.id !== id) 
        })),

      // Plantillas
      updatePlantilla: (id, nuevoMensaje) =>
        set((state) => ({
          plantillas: state.plantillas.map((pl) =>
            pl.id === id ? { ...pl, mensaje: nuevoMensaje } : pl
          ),
        })),
    }),
    {
      name: 'copiloto-storage',
    }
  )
);