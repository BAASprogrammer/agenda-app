import { cookies } from "next/headers";
import { Calendar, Users, Settings, LogOut, Activity, Clock, ChevronRight } from "lucide-react";

export default async function HomeProfessional() {
    // 1. Leer las cookies tal como en layout.tsx
    const cookieStore = await cookies();
    // 2. Extraer el nombre (si no existe, por defecto usa "Especialista")
    const firstName = cookieStore.get("first_name")?.value || "Especialista";

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col z-20">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-md">
                        <Activity className="text-white w-6 h-6 animate-pulse-slow" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500">
                        AgendaApp
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <Activity className="w-5 h-5" />
                        Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <Calendar className="w-5 h-5" />
                        Ver Agenda
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <Users className="w-5 h-5" />
                        Mis Pacientes
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <Settings className="w-5 h-5" />
                        Configuración
                    </a>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-500 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <LogOut className="w-5 h-5" />
                        Cerrar Sesión
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Decorative background blobs (glassmorphism feel) */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50/80 to-transparent -z-10"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float pointer-events-none"></div>
                <div className="absolute top-32 -left-24 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

                {/* Header */}
                <header className="px-8 py-6 flex justify-between items-center animate-fade-in">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Panel Profesional</h1>
                        {/* 3. Utilizar la variable firstName en lugar de texto estático */}
                        <p className="text-slate-500 mt-1 font-medium">Bienvenido de nuevo, Dr. {firstName}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-indigo-100 overflow-hidden shadow-sm hover:ring-2 hover:ring-indigo-300 transition-all cursor-pointer">
                        <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="px-8 py-4 flex-1 overflow-y-auto">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">+3 hoy</span>
                            </div>
                            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Citas Hoy</h3>
                            <p className="text-3xl font-extrabold text-slate-800 mt-1">8</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 shadow-inner">
                                    <Users className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">+12%</span>
                            </div>
                            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Pacientes</h3>
                            <p className="text-3xl font-extrabold text-slate-800 mt-1">142</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 shadow-inner">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">En 1h</span>
                            </div>
                            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Horas Trabajadas</h3>
                            <p className="text-3xl font-extrabold text-slate-800 mt-1">32h</p>
                        </div>
                    </div>

                    {/* Quick Actions & Upcoming Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        {/* Quick Actions Card */}
                        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110 duration-700 pointer-events-none"></div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Gestiona tu agenda</h2>
                            <p className="text-slate-500 mb-8 max-w-sm font-medium leading-relaxed">
                                Mantente organizado y revisa tus citas de forma rápida. ¡Gracias por ser parte de <strong className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500 text-lg">AgendaApp</strong>!
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300">
                                    <Calendar className="w-5 h-5" />
                                    Ver Agenda
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-4 rounded-xl font-bold hover:border-indigo-300 hover:text-indigo-600 hover:bg-slate-50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300">
                                    <Settings className="w-5 h-5" />
                                    Gestionar Citas
                                </button>
                            </div>
                        </div>

                        {/* Mini Schedule */}
                        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-slate-800">Próximas Citas</h2>
                                <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center group">
                                    Ver todas <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { time: "09:00 AM", name: "Ana Martínez", type: "Revisión General", status: "Confirmado" },
                                    { time: "10:30 AM", name: "Carlos López", type: "Consulta inicial", status: "Pendiente" },
                                    { time: "12:00 PM", name: "María Fernández", type: "Seguimiento", status: "Confirmado" }
                                ].map((cita, i) => (
                                    <div key={i} className="group flex items-center p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                                        <div className="w-16 text-center">
                                            <span className="block text-sm font-black text-slate-700">{cita.time.split(' ')[0]}</span>
                                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{cita.time.split(' ')[1]}</span>
                                        </div>
                                        <div className="w-1 h-10 bg-indigo-100 rounded-full mx-4 group-hover:bg-indigo-300 transition-colors"></div>
                                        <div className="flex-1 flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-slate-800">{cita.name}</p>
                                                <p className="text-xs font-semibold text-slate-500">{cita.type}</p>
                                            </div>
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${cita.status === 'Confirmado' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                                {cita.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}