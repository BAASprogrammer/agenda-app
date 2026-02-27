"use client";
import ProSidebarPatient from "@/components/ProSidebarPatient";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabaseClient";
import {
    FileText,
    HeartPulse,
    CalendarDays,
    UserCircle,
    LogOut,
    Download,
    ExternalLink,
    Search,
    Stethoscope,
    Activity,
    ClipboardList
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MedicalHistory() {
    const user = useUser();
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user.userId) return;
            // Simulamos datos ya que la tabla medical_appointments podría no tener diagnósticos detallados aún
            const { data, error } = await supabase
                .from('medical_appointments')
                .select(`id, appointment_date, status, reason, professional:users!medical_appointments_professional_id_fkey (first_name, last_name)`)
                .eq('patient_id', user.userId)
                .eq('status', 'completada')
                .order('appointment_date', { ascending: false });

            if (error) {
                console.error("Error obteniendo historial:", error);
                return;
            }
            setHistory(data ?? []);
        }
        fetchHistory();
    }, [user.userId]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
            <ProSidebarPatient active="/medicalhistory" />

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-cyan-50/80 to-transparent -z-10"></div>

                <header className="px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Historial Médico</h1>
                        <p className="text-slate-500 font-medium">Consulta tus registros, diagnósticos y recetas anteriores.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Filtrar por diagnóstico..."
                                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all w-64"
                            />
                        </div>
                    </div>
                </header>

                <div className="px-8 pb-12 flex-1 overflow-y-auto">
                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-4xl border border-white shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center">
                                <Stethoscope className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Total Consultas</p>
                                <p className="text-2xl font-black text-slate-800">{history.length}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-4xl border border-white shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Salud General</p>
                                <p className="text-2xl font-black text-slate-800">Estable</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-4xl border border-white shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                                <ClipboardList className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Recetas Activas</p>
                                <p className="text-2xl font-black text-slate-800">2</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {history.length > 0 ? (
                            history.map((record, index) => (
                                <div
                                    key={record.id}
                                    className="bg-white rounded-[2.5rem] p-8 border border-white shadow-sm hover:shadow-md transition-all group animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="space-y-4 flex-1">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-bold text-cyan-600 bg-cyan-50 px-4 py-1.5 rounded-full">
                                                    {new Date(record.appointment_date).toLocaleDateString('cl-CL', { day: '2-digit', month: 'long', year: 'numeric' })}
                                                </span>
                                                <span className="text-xs font-bold text-slate-400">Verificado</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                                                {record.reason || "Consulta de Routine"}
                                            </h3>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <UserCircle className="w-5 h-5 text-slate-400" />
                                                <span className="font-bold">Dr. {record.professional?.first_name} {record.professional?.last_name}</span>
                                            </div>
                                            <p className="text-slate-500 leading-relaxed font-medium">
                                                El paciente presenta una evolución favorable. Se recomienda continuar con el tratamiento preventivo y realizar chequeo de control en 6 meses.
                                            </p>
                                        </div>

                                        <div className="flex flex-row md:flex-col gap-3">
                                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-50 text-slate-700 px-6 py-3.5 rounded-2xl font-bold hover:bg-slate-100 transition-all text-sm">
                                                <Download className="w-4 h-4" /> Receta.pdf
                                            </button>
                                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3.5 rounded-2xl font-bold hover:border-cyan-200 hover:text-cyan-600 transition-all text-sm">
                                                <ExternalLink className="w-4 h-4" /> Lab Results
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white/60 backdrop-blur-sm rounded-[3rem] p-20 border border-dashed border-slate-200 text-center">
                                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-800">No hay registros médicos completados</h3>
                                <p className="text-slate-500">Tus diagnósticos aparecerán aquí después de tus consultas.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
