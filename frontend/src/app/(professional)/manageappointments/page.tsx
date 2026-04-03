"use client";
// ✅ Import the hook that replaces all useState + useEffect + fetch logic
import { useAppointments } from "@/hooks/useAppointments";
import { ManagedAppointment } from "@/types/appointment";
import ProSidebar from "@/components/professional/ProSidebar";
import {
    ClipboardList, Search, Filter,
    CheckCircle2, XCircle, Clock, ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Pure helper function (no state, no effects → doesn't need to be a hook)
function getStatusColor(s: string) {
    if (s === "agendada") return "bg-indigo-100 text-indigo-700";
    if (s === "completada") return "bg-emerald-100 text-emerald-700";
    return "bg-rose-100 text-rose-700";
}

export default function ManageAppointments() {
    // 1. UI State
    const [filter, setFilter] = useState("todas");
    const [search, setSearch] = useState("");

    // 2. Data Hooks
    const { appointments, loading, error, updateStatus } = useAppointments(filter);

    // Search filter — presentation logic, stays in the component
    const filtered = appointments.filter((a: ManagedAppointment) => {
        const name = `${a.patient?.first_name ?? ""} ${a.patient?.last_name ?? ""}`.toLowerCase();
        return name.includes(search.toLowerCase());
    });

    return (
        <div className="min-h-svh bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
            <ProSidebar active="/manageappointments" />
            <main className="flex-1 flex flex-col relative overflow-hidden h-svh">
                <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-indigo-50/80 to-transparent -z-10" />

                <header className="px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in shrink-0">
                    <div>
                        <Link href="/home/professional" className="text-indigo-600 flex items-center gap-1 text-sm font-bold mb-2 hover:gap-2 transition-all">
                            <ChevronLeft className="w-4 h-4" aria-hidden="true" /> Inicio
                        </Link>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Gestionar Citas</h1>
                        <p className="text-slate-500 font-medium">Administra el estado de todas tus citas.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                            <input
                                type="text"
                                placeholder="Buscar paciente..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                aria-label="Search appointment by patient name"
                                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all w-56"
                            />
                        </div>
                        <button
                            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
                            aria-label="Open filter options">
                            <Filter className="w-5 h-5" aria-hidden="true" />
                        </button>
                    </div>
                </header>

                <div className="px-4 md:px-8 pb-12 flex-1 overflow-y-auto scroll-touch">
                    {/* Status filter tabs */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8 bg-slate-100/50 p-1 rounded-3xl w-full md:w-fit" role="tablist" aria-label="Filter by status">
                        {(["todas", "agendada", "completada", "cancelada"] as const).map(s => (
                            <button
                                key={s}
                                role="tab"
                                aria-selected={filter === s}
                                onClick={() => setFilter(s)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold capitalize transition-all shrink-0 ${filter === s ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                    }`}>
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Error banner — only visible when an error occurs */}
                    {error && (
                        <div role="alert" className="bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl px-6 py-4 mb-6 font-medium flex items-center gap-3">
                            <XCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                            {error}
                        </div>
                    )}

                    {/* Appointments list */}
                    {loading ? (
                        <div className="text-center py-20 text-slate-400 font-medium" aria-live="polite">Cargando...</div>
                    ) : (
                        <div className="space-y-4">
                            {filtered.length > 0 ? filtered.map((appt, i) => (
                                <article
                                    key={appt.id}
                                    className="bg-white rounded-3xl p-4 md:p-6 border border-white shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-4 group animate-fade-in-up"
                                    style={{ animationDelay: `${i * 0.06}s` }}>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(appt.status)}`}>
                                                {appt.status}
                                            </span>
                                            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                                                <Clock className="w-3 h-3" aria-hidden="true" />
                                                {appt.displayDate} · {appt.displayTime} hrs
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                                            {appt.patient?.first_name} {appt.patient?.last_name}
                                        </h4>
                                        <p className="text-sm text-slate-500">{appt.reason || "Consulta general"}</p>
                                    </div>
                                    {appt.status === "agendada" && (
                                        <div className="flex gap-2 shrink-0">
                                            <button
                                                onClick={() => updateStatus(appt.id, "completada")}
                                                aria-label={`Mark ${appt.patient?.first_name}'s appointment as completed`}
                                                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 font-bold rounded-2xl hover:bg-emerald-100 transition-all text-sm">
                                                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />Completar
                                            </button>
                                            <button
                                                onClick={() => updateStatus(appt.id, "cancelada")}
                                                aria-label={`Cancel ${appt.patient?.first_name}'s appointment`}
                                                className="flex items-center gap-2 px-4 py-2.5 bg-rose-50 text-rose-600 font-bold rounded-2xl hover:bg-rose-100 transition-all text-sm">
                                                <XCircle className="w-4 h-4" aria-hidden="true" />Cancelar
                                            </button>
                                        </div>
                                    )}
                                </article>
                            )) : (
                                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 md:p-16 border border-dashed border-slate-200 text-center">
                                    <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-4" aria-hidden="true" />
                                    <h3 className="text-xl font-bold text-slate-800">Sin citas encontradas</h3>
                                    <p className="text-slate-500 mt-1">No hay citas que coincidan con el filtro seleccionado.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
