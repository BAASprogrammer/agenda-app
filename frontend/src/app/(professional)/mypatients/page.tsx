"use client";
import { useUserStore } from "@/store/userStore";
import { supabase } from "@/lib/supabaseClient";
// ✅ MEJORA 1: componente compartido
import ProSidebar from "@/components/professional/ProSidebar";
import { Users, Search, UserCircle, Clock, ChevronLeft, CalendarDays } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Patient {
    id: string;
    first_name: string;
    last_name: string;
    total: number;
    lastDate: string;
    nextDate: string | null;
}

export default function MyPatients() {
    // 1. Hooks & Stores
    const user = useUserStore();

    // 2. State
    const [patients, setPatients] = useState<Patient[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // 3. Effects
    useEffect(() => {
        if (!user.userId) return;
        const fetchPatients = async () => {
            setLoading(true);
            const { data } = await supabase
                .from('medical_appointments')
                .select(`appointment_date, status, patient_id, patient:users!medical_appointments_patient_id_fkey (id, first_name, last_name)`)
                .eq('professional_id', user.userId)
                .order('appointment_date', { ascending: false });

            // Agrupar por paciente
            const map = new Map<string, Patient>();
            const today = new Date().toISOString().split('T')[0];

            (data ?? []).forEach((a: any) => {
                const pid = String(a.patient_id);
                if (!pid) return;
                if (!map.has(pid)) {
                    map.set(pid, {
                        id: pid,
                        first_name: a.patient?.first_name ?? '?',
                        last_name: a.patient?.last_name ?? '',
                        total: 0,
                        lastDate: '',
                        nextDate: null
                    });
                }
                const p = map.get(pid)!;
                p.total++;
                const d = a.appointment_date.split(' ')[0];
                if (d <= today && d > (p.lastDate ?? '')) p.lastDate = d;
                if (d >= today && (!p.nextDate || d < p.nextDate) && a.status === 'agendada') p.nextDate = d;
            });

            setPatients(Array.from(map.values()).sort((a, b) => b.total - a.total));
            setLoading(false);
        };
        fetchPatients();
    }, [user.userId]);

    // 4. Derived Data
    const filtered = patients.filter(p =>
        `${p.first_name} ${p.last_name}`.toLowerCase().includes(search.toLowerCase())
    );

    // 5. Helpers
    const fmt = (d?: string | null) => {
        if (!d) return null;
        const [yr, mo, dy] = d.split('-').map(Number);
        return new Date(yr, mo - 1, dy).toLocaleDateString('cl-CL', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
            <ProSidebar active="/mypatients" />
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-indigo-50/80 to-transparent -z-10"></div>
                <header className="px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
                    <div>
                        <Link href="/home/professional" className="text-indigo-600 flex items-center gap-1 text-sm font-bold mb-2 hover:gap-2 transition-all">
                            <ChevronLeft className="w-4 h-4" /> Dashboard
                        </Link>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Mis Pacientes</h1>
                        <p className="text-slate-500 font-medium">{patients.length} pacientes únicos en tu historial.</p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Buscar paciente..." value={search} onChange={e => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all w-64" />
                    </div>
                </header>

                <div className="px-8 pb-12 flex-1 overflow-y-auto">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Total Pacientes</p>
                                <p className="text-2xl font-black text-slate-800">{patients.length}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center">
                                <CalendarDays className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Con Cita Próxima</p>
                                <p className="text-2xl font-black text-slate-800">{patients.filter(p => p.nextDate).length}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Total Consultas</p>
                                <p className="text-2xl font-black text-slate-800">{patients.reduce((s, p) => s + p.total, 0)}</p>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-20 text-slate-400 font-medium">Cargando pacientes...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filtered.length > 0 ? filtered.map((p, i) => (
                                <div key={p.id} className="bg-white rounded-3xl p-6 border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 shrink-0">
                                            <UserCircle className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-800">{p.first_name} {p.last_name}</h4>
                                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{p.total} consulta{p.total !== 1 ? 's' : ''}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {p.lastDate && (
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <Clock className="w-4 h-4 text-slate-400" />
                                                <span>Última: <span className="font-medium text-slate-700">{fmt(p.lastDate)}</span></span>
                                            </div>
                                        )}
                                        {p.nextDate ? (
                                            <div className="flex items-center gap-2 text-sm">
                                                <CalendarDays className="w-4 h-4 text-indigo-400" />
                                                <span className="text-indigo-600 font-medium">Próxima: {fmt(p.nextDate)}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <CalendarDays className="w-4 h-4" />
                                                <span>Sin cita próxima</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full bg-white/60 backdrop-blur-sm rounded-3xl p-16 border border-dashed border-slate-200 text-center">
                                    <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-slate-800">No se encontraron pacientes</h3>
                                    <p className="text-slate-500">Prueba con otro término de búsqueda.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
