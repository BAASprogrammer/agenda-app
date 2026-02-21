import { Info, User, Stethoscope, Sparkles } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden bg-slate-50 flex flex-col items-center justify-center py-24 px-6 mt-10">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-gradient-to-b from-indigo-50/50 to-transparent">
                <div className="absolute -top-10 -left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-4xl w-full flex flex-col items-center animate-fade-in-up">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg mb-6">
                    <Info className="w-8 h-8" />
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight text-center mb-6">
                    Acerca de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">AgendaApp</span>
                </h1>

                <p className="text-xl text-slate-600 font-medium text-center max-w-2xl mb-16 leading-relaxed">
                    Somos una plataforma moderna creada para simplificar la vida de pacientes y profesionales. Unimos la tecnología con el cuidado de la salud para brindar una experiencia fluida, intuitiva y segura.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {/* Pacientes Card */}
                    <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-500 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>
                        <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center text-cyan-600 mb-6">
                            <User className="w-7 h-7" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-3">Para Pacientes</h2>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            Reserva, consulta y gestiona tus citas médicas fácilmente desde cualquier dispositivo. Mantén tu salud al día con notificaciones inteligentes.
                        </p>
                    </div>

                    {/* Profesionales Card */}
                    <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-500 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>
                        <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                            <Stethoscope className="w-7 h-7" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-3">Para Profesionales</h2>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            Organiza tu agenda, reduce las inasistencias y mejora la atención a tus pacientes mediante un panel administrativo completo y seguro.
                        </p>
                    </div>
                </div>

                <div className="mt-20 inline-flex items-center gap-2 text-slate-500 font-semibold bg-white/50 px-6 py-2 rounded-full border border-slate-200 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Innovando la gestión médica desde 2026
                </div>
            </div>
        </div>
    );
}