import { CalendarDays, FileText, UserCircle, LogOut, HeartPulse, ChevronRight, Clock, Bell } from "lucide-react";

export default function HomePatiente() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col z-20">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
                        <HeartPulse className="text-white w-6 h-6 animate-pulse-slow" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                        AgendaApp
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 bg-cyan-50 text-cyan-700 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <HeartPulse className="w-5 h-5" />
                        Mi Resumen
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-cyan-600 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <CalendarDays className="w-5 h-5" />
                        Mis Citas
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-cyan-600 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <FileText className="w-5 h-5" />
                        Historial Médico
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-cyan-600 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <UserCircle className="w-5 h-5" />
                        Mi Perfil
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
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-cyan-50/80 to-transparent -z-10"></div>
                <div className="absolute top-10 right-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float pointer-events-none"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

                {/* Header */}
                <header className="px-8 py-6 flex justify-between items-center animate-fade-in border-b border-transparent">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Panel de Paciente</h1>
                        <p className="text-slate-500 mt-1 font-medium">¡Hola! ¿Cómo te sientes hoy?</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-cyan-600 hover:bg-cyan-50 transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="w-12 h-12 rounded-full border-2 border-cyan-100 overflow-hidden shadow-sm hover:ring-2 hover:ring-cyan-300 transition-all cursor-pointer">
                            <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="px-8 py-6 flex-1 overflow-y-auto">

                    {/* Welcome Card */}
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-8 text-white mb-8 shadow-lg shadow-cyan-200 relative overflow-hidden animate-fade-in-up">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        <h2 className="text-2xl font-bold mb-2">¡Bienvenido a AgendaApp!</h2>
                        <p className="text-cyan-50 max-w-lg mb-6 leading-relaxed">
                            Aquí podrás gestionar tus citas, revisar tu historial médico y actualizar tu información personal de forma rápida y segura.
                        </p>
                        <button className="bg-white text-cyan-700 px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
                            Agendar Nueva Cita
                        </button>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-800 mb-4 tracking-tight">Accesos Rápidos</h3>

                    {/* Action Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Card 1 */}
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                                <CalendarDays className="w-7 h-7" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">Mis Citas</h4>
                            <p className="text-slate-500 text-sm mb-4">Revisa, reprograma o cancela tus citas agendadas.</p>
                            <span className="text-indigo-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Ver panel <ChevronRight className="w-4 h-4" />
                            </span>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center text-teal-600 mb-4 group-hover:scale-110 transition-transform">
                                <FileText className="w-7 h-7" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">Historial Médico</h4>
                            <p className="text-slate-500 text-sm mb-4">Accede a tus diagnósticos y recetas anteriores.</p>
                            <span className="text-teal-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Ver historial <ChevronRight className="w-4 h-4" />
                            </span>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center text-rose-600 mb-4 group-hover:scale-110 transition-transform">
                                <UserCircle className="w-7 h-7" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">Mi Perfil</h4>
                            <p className="text-slate-500 text-sm mb-4">Actualiza tus datos personales y de contacto.</p>
                            <span className="text-rose-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Configurar <ChevronRight className="w-4 h-4" />
                            </span>
                        </div>
                    </div>

                    {/* Upcoming Appointment */}
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-cyan-100">
                            <span className="text-xs font-bold text-cyan-600 uppercase">Oct</span>
                            <span className="text-xl font-black text-slate-800">24</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="inline-block px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-wider rounded-lg mb-2">Próxima</span>
                                    <h4 className="font-bold text-slate-800 text-lg">Revisión General</h4>
                                    <p className="text-slate-500 text-sm flex items-center gap-1 mt-1 font-medium">
                                        <Clock className="w-4 h-4" /> 10:30 AM con Dr. Especialista
                                    </p>
                                </div>
                                <button className="text-cyan-600 bg-cyan-50 px-4 py-2 rounded-xl text-sm font-bold hover:bg-cyan-100 transition-colors">
                                    Detalles
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}