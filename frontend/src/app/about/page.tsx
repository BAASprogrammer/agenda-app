import { HeadphonesIcon, User, Stethoscope, Hospital } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden bg-white flex flex-col items-center justify-center py-24 px-6 mt-10">
            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-gradient-to-b from-blue-50/60 to-teal-50/30">
                <div className="absolute -top-10 -left-10 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-4xl w-full flex flex-col items-center animate-fade-in-up">
                {/* Page badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-lg shadow-blue-200/60 mb-6 hover:scale-105 transition-transform duration-300">
                    <Hospital className="w-8 h-8" />
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight text-center mb-6">
                    Acerca de{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                        AgendaApp
                    </span>
                </h1>

                <p className="text-xl text-slate-500 font-medium text-center max-w-2xl mb-16 leading-relaxed">
                    Somos una plataforma moderna creada para simplificar la vida de pacientes y profesionales. Unimos tecnología y salud para brindar una experiencia fluida, intuitiva y segura.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {/* Pacientes Card */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_4px_24px_rgb(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.10)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="absolute top-0 right-0 w-28 h-28 bg-teal-50 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                            <User className="w-7 h-7" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-3">Para Pacientes</h2>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Reserva, consulta y gestiona tus citas médicas fácilmente desde cualquier dispositivo. Mantén tu historial al día con notificaciones inteligentes.
                        </p>
                    </div>

                    {/* Profesionales Card */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_4px_24px_rgb(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.10)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="absolute top-0 right-0 w-28 h-28 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Stethoscope className="w-7 h-7" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-3">Para Profesionales</h2>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Organiza tu agenda, reduce las inasistencias y mejora la atención a tus pacientes con un panel administrativo completo y seguro.
                        </p>
                    </div>
                </div>

                <div className="mt-20 inline-flex items-center gap-2 text-slate-400 font-semibold bg-white/80 px-6 py-3 rounded-full border border-slate-100 backdrop-blur-sm shadow-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <HeadphonesIcon className="w-4 h-4 text-teal-500" />
                    Innovando la gestión médica desde 2026
                </div>
            </div>
        </div>
    );
}