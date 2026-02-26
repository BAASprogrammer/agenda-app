import { Mail, Phone, Clock, MessageSquare, Instagram, Twitter, Facebook, Send } from "lucide-react";

export default function Contact() {
    return (
        <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden bg-slate-50 flex flex-col items-center justify-center py-24 px-6 mt-10">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-gradient-to-b from-blue-50/50 to-transparent">
                <div className="absolute top-10 left-20 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
                <div className="absolute bottom-10 right-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-4xl w-full flex flex-col items-center animate-fade-in-up">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg mb-6">
                    <MessageSquare className="w-8 h-8" />
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight text-center mb-6">
                    Hablemos
                </h1>

                <p className="text-xl text-slate-600 font-medium text-center max-w-2xl mb-12 leading-relaxed">
                    ¿Tienes dudas, sugerencias o necesitas soporte técnico? ¡Estamos aquí para ayudarte a sacar el máximo provecho de tu agenda!
                </p>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
                    <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Correo</h3>
                        <a href="mailto:contacto@agendaapp.com" className="text-blue-600 font-medium hover:underline">contacto@agendaapp.cl</a>
                    </div>

                    <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
                        <div className="w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center text-cyan-600 mb-4">
                            <Phone className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Teléfono</h3>
                        <p className="text-slate-600 font-medium">+56 912 345 678</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
                        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Horario</h3>
                        <p className="text-slate-600 font-medium">Lun - Vie: 9:00 - 18:00</p>
                    </div>
                </div>

                {/* CTA Form / CTA Box */}
                <div className="w-full max-w-2xl bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-1 shadow-xl overflow-hidden relative isolate">
                    <div className="bg-white rounded-[22px] p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Envíanos un mensaje</h3>
                            <p className="text-slate-500 font-medium">Te responderemos a la brevedad posible.</p>
                        </div>
                        <button className="shrink-0 flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors w-full sm:w-auto">
                            Ir al formulario <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-16 text-center">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Síguenos en nuestras redes</p>
                    <div className="flex justify-center gap-4">
                        <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-50 hover:scale-110 transition-all shadow-sm border border-slate-100">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-blue-700 hover:bg-blue-50 hover:scale-110 transition-all shadow-sm border border-slate-100">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-pink-600 hover:bg-pink-50 hover:scale-110 transition-all shadow-sm border border-slate-100">
                            <Instagram className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-16 text-center text-slate-500 text-sm font-medium">
                    <span>AgendaApp © {new Date().getFullYear()} | Todos los derechos reservados</span>
                </div>
            </div>
        </div>
    );
}