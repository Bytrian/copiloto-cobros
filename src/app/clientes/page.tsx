"use client";

import { useState } from "react";
import { useStore } from "@/hooks/useStore";
import { Plus, Mail, Phone, Trash2 } from "lucide-react";

export default function ClientesPage() {
  const { clientes, addCliente, deleteCliente } = useStore();
  const [showForm, setShowForm] = useState(false);
  
  // Estado para el formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !email) return;

    const nuevoCliente = {
      id: crypto.randomUUID(),
      nombre,
      email,
      telefono,
    };

    addCliente(nuevoCliente);
    
    // Limpiar formulario
    setNombre("");
    setEmail("");
    setTelefono("");
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clientes</h1>
          <p className="text-slate-500 text-sm">Gestiona tus contactos comerciales.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full md:rounded-lg md:px-4 md:py-2 flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span className="hidden md:inline font-medium">Nuevo Cliente</span>
        </button>
      </header>

      {/* Formulario de Registro */}
      {showForm && (
        <form 
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl border border-blue-100 shadow-md space-y-4 animate-in fade-in slide-in-from-top-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-500">Nombre</label>
              <input
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Juan Pérez"
                className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-500">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juan@ejemplo.com"
                className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-500">Teléfono (Opcional)</label>
              <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="+54 11 ..."
                className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button 
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-slate-600 font-medium"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
            >
              Guardar Cliente
            </button>
          </div>
        </form>
      )}

      {/* Listado de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clientes.length === 0 ? (
          <div className="col-span-full bg-slate-100 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400">
            No hay clientes registrados. Agrega uno para empezar.
          </div>
        ) : (
          clientes.map((cliente) => (
            <div 
              key={cliente.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-start"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                    {cliente.nombre.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="font-bold text-slate-800">{cliente.nombre}</h3>
                </div>
                <div className="flex flex-col gap-1 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-slate-400" /> {cliente.email}
                  </div>
                  {cliente.telefono && (
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-slate-400" /> {cliente.telefono}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => deleteCliente(cliente.id)}
                className="text-slate-300 hover:text-red-500 p-2 transition-colors"
                title="Eliminar cliente"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}