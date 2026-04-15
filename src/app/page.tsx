"use client";

import { useStore } from "@/hooks/useStore";
import { formatCurrency, cn } from "@/lib/utils";
import { Clock, CheckCircle2, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { propuestas } = useStore();

  const totalPendiente = propuestas
    .filter((p) => p.estado !== "pagado")
    .reduce((acc, p) => acc + p.monto, 0);

  const totalCobrado = propuestas
    .filter((p) => p.estado === "pagado")
    .reduce((acc, p) => acc + p.monto, 0);

  const stats = [
    {
      name: "Total Pendiente",
      value: formatCurrency(totalPendiente),
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      name: "Cobrado este mes",
      value: formatCurrency(totalCobrado),
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Bienvenido, Adrian</h1>
        <p className="text-slate-500 text-sm">
          Esto es lo que está pasando con tus cobros hoy.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4"
          >
            <div className={cn("p-3 rounded-xl", stat.bg)}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-semibold">Cobros urgentes</h2>
        </div>
        <div className="p-8 text-center">
          {propuestas.length === 0 ? (
            <div className="flex flex-col items-center gap-2">
              <TrendingUp className="text-slate-300" size={48} />
              <p className="text-slate-500">No tienes propuestas registradas aún.</p>
              <button className="mt-2 text-blue-600 font-medium text-sm">
                Crear mi primera propuesta +
              </button>
            </div>
          ) : (
            <p className="text-slate-500">
              Aquí aparecerá el resumen de tus propuestas activas.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}