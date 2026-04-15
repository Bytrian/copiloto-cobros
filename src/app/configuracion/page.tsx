"use client";

import { useState } from "react";
import { useStore } from "@/hooks/useStore";
import { Save, MessageSquare, Info, CheckCircle2 } from "lucide-react";

export default function ConfiguracionPage() {
  const { plantillas, updatePlantilla } = useStore();
  
  // Usamos la primera plantilla para editar
  const plantilla = plantillas[0];
  
  const [mensaje, setMensaje] = useState(plantilla?.mensaje || "");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (!plantilla) return;
    
    updatePlantilla(plantilla.id, mensaje);
    setIsSaved(true);
    
    // Feedback visual de guardado
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Configuración</h1>
        <p className="text-slate-500">Personaliza tus mensajes y preferencias del sistema.</p>
      </header>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-blue-600">
            <MessageSquare size={20} />
            <h2 className="font-bold">Plantilla de WhatsApp</h2>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
            <Info className="text-blue-500 shrink-0" size={20} />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">¿Cómo usar las variables?</p>
              <p>Puedes usar estos códigos para que el sistema rellene los datos automáticamente:</p>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li><code className="bg-white px-1 rounded border border-blue-200 font-bold">{"{{nombre}}"}</code>: Nombre del cliente.</li>
                <li><code className="bg-white px-1 rounded border border-blue-200 font-bold">{"{{titulo}}"}</code>: Título del servicio/propuesta.</li>
                <li><code className="bg-white px-1 rounded border border-blue-200 font-bold">{"{{monto}}"}</code>: Monto total formateado.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Mensaje del Recordatorio
            </label>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              rows={6}
              className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 leading-relaxed"
              placeholder="Escribe aquí el mensaje..."
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              disabled={isSaved}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                isSaved 
                ? "bg-emerald-500 text-white shadow-emerald-200" 
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"
              } shadow-lg`}
            >
              {isSaved ? (
                <>
                  <CheckCircle2 size={20} />
                  ¡Guardado con éxito!
                </>
              ) : (
                <>
                  <Save size={20} />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Sección de ayuda extra */}
      <footer className="text-center pb-10">
        <p className="text-slate-400 text-sm italic">
          Copiloto de Cobros v1.0 - Diseñado para freelancers.
        </p>
      </footer>
    </div>
  );
}