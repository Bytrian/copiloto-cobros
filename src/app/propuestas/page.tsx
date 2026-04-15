"use client";

import { useState } from "react";
import { useStore } from "@/hooks/useStore";
import { formatCurrency, cn } from "@/lib/utils";
import { Plus, FileText, Calendar, User, Trash2, CheckCircle, MessageCircle } from "lucide-react";
import { EstadoPropuesta } from "@/types";

export default function PropuestasPage() {
  const { propuestas, clientes, plantillas, addPropuesta, updateEstadoPropuesta, deletePropuesta } = useStore();
  const [showForm, setShowForm] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [monto, setMonto] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !monto || !clienteId || !fechaVencimiento) return;

    addPropuesta({
      id: crypto.randomUUID(),
      clienteId,
      titulo,
      monto: Number(monto),
      fechaCreacion: new Date().toISOString(),
      fechaVencimiento,
      estado: "pendiente",
    });

    setTitulo(""); setMonto(""); setClienteId(""); setFechaVencimiento("");
    setShowForm(false);
  };

  const enviarWhatsApp = (propuestaId: string) => {
    const p = propuestas.find(item => item.id === propuestaId);
    const c = clientes.find(item => item.id === p?.clienteId);
    const plantilla = plantillas[0];

    if (!p || !c) return;

    // CORRECCIÓN: Usamos 'const' porque el valor se asigna mediante encadenamiento
    const mensaje = plantilla.mensaje
      .replace("{{nombre}}", c.nombre)
      .replace("{{titulo}}", p.titulo)
      .replace("{{monto}}", formatCurrency(p.monto));

    const phone = c.telefono?.replace(/\D/g, "");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  const getStatusColor = (estado: EstadoPropuesta) => {
    const colors = {
      pendiente: "bg-amber-100 text-amber-700",
      negociando: "bg-blue-100 text-blue-700",
      aprobado: "bg-indigo-100 text-indigo-700",
      pagado: "bg-emerald-100 text-emerald-700",
      vencido: "bg-red-100 text-red-700",
    };
    return colors[estado] || "bg-slate-100 text-slate-700";
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Propuestas y Cobros</h1>
          <p className="text-slate-500 text-sm">Controla tus ingresos y envía recordatorios.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full md:rounded-lg md:px-4 md:py-2 flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus size={20} />
          <span className="hidden md:inline font-medium">Nueva Propuesta</span>
        </button>
      </header>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-blue-100 shadow-md space-y-4 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-500">Título del Servicio</label>
              <input required value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ej. Desarrollo Web" className="w-full p-2 border border-slate-200 rounded-lg outline-none text-slate-900" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-500">Cliente</label>
              <select required value={clienteId} onChange={(e) => setClienteId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-slate-900 bg-white">
                <option value="">Selecciona un cliente</option>
                {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-500">Monto (USD)</label>
              <input required type="number" value={monto} onChange={(e) => setMonto(e.target.value)} placeholder="0.00" className="w-full p-2 border border-slate-200 rounded-lg outline-none text-slate-900" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-500">Vencimiento</label>
              <input required type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-slate-900" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-600 font-medium">Cancelar</button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Crear Propuesta</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {propuestas.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400">
            No tienes propuestas.
          </div>
        ) : (
          propuestas.map((p) => {
            const cliente = clientes.find(c => c.id === p.clienteId);
            return (
              <div key={p.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={cn("p-3 rounded-xl hidden md:block", getStatusColor(p.estado))}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{p.titulo}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 mt-1">
                      <span className="flex items-center gap-1 text-blue-600 font-medium"><User size={14}/> {cliente?.nombre}</span>
                      <span className="flex items-center gap-1"><Calendar size={14}/> {p.fechaVencimiento}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0">
                  <div className="text-right">
                    <p className="font-bold text-slate-900 text-lg">{formatCurrency(p.monto)}</p>
                    <span className={cn("text-[10px] uppercase font-bold px-2 py-0.5 rounded-full", getStatusColor(p.estado))}>
                      {p.estado}
                    </span>
                  </div>
                  
                  <div className="flex gap-1">
                    {p.estado !== 'pagado' && (
                      <button onClick={() => updateEstadoPropuesta(p.id, 'pagado')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg" title="Pagado">
                        <CheckCircle size={20} />
                      </button>
                    )}
                    
                    <button 
                      onClick={() => enviarWhatsApp(p.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg" 
                      title="Enviar WhatsApp"
                    >
                      <MessageCircle size={20} />
                    </button>

                    <button onClick={() => deletePropuesta(p.id)} className="p-2 text-slate-300 hover:text-red-500 rounded-lg" title="Eliminar">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}