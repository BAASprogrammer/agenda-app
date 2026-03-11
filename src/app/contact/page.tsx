import { Mail, Phone, Clock, HeadphonesIcon, Instagram, Twitter, Facebook, Send } from "lucide-react";

export default function Contact() {
    return (
        <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden bg-white flex flex-col items-center justify-center py-24 px-6 mt-10">
            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-gradient-to-b from-teal-50/50 to-blue-50/30">
                <div className="absolute top-10 left-20 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float"></div>
                <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-4xl w-full flex flex-col items-center animate-fade-in-up">
                {/* Page badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-400 text-white shadow-lg shadow-teal-200/60 mb-6 hover:scale-105 transition-transform duration-300">
                    <HeadphonesIcon className="w-8 h-8" />
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight text-center mb-6">
                    Hablemos
                </h1>

                <p className="text-xl text-slate-500 font-medium text-center max-w-2xl mb-12 leading-relaxed">
                    ¿Tienes dudas, sugerencias o necesitas soporte? Estamos aquí para ayudarte a sacar el máximo provecho de tu agenda médica.
                </p>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
                    {[
                        { icon: Mail,  label: "Correo",   value: "contacto@agendaapp.cl", href: "mailto:contacto@agendaapp.cl", color: "bg-blue-50 text-blue-600" },
                        { icon: Phone, label: "Teléfono", value: "+56 912 345 678",        href: null,                          color: "bg-teal-50 text-teal-600"  },
                        { icon: Clock, label: "Horario",  value: "Lun - Vie: 9:00 - 18:00", href: null,                        color: "bg-amber-50 text-amber-600" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${0.1 * i}s` }}>
                            <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-4`}>
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-1">{item.label}</h3>
                            {item.href ? (
                                <a href={item.href} className="text-blue-600 font-medium hover:underline text-sm">{item.value}</a>
                            ) : (
                                <p className="text-slate-500 font-medium text-sm">{item.value}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA Box */}
                <div className="w-full max-w-2xl bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-px shadow-xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="bg-white rounded-[22px] p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-1">Envíanos un mensaje</h3>
                            <p className="text-slate-500 font-medium">Te responderemos a la brevedad posible.</p>
                        </div>
                        <button className="shrink-0 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">
                            Ir al formulario <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Síguenos en redes sociales</p>
                    <div className="flex justify-center gap-4">
                        {[
                            { icon: Twitter,   hover: "hover:text-blue-500 hover:bg-blue-50" },
                            { icon: Facebook,  hover: "hover:text-blue-700 hover:bg-blue-50" },
                            { icon: Instagram, hover: "hover:text-pink-600 hover:bg-pink-50" },
                        ].map(({ icon: Icon, hover }, i) => (
                            <a key={i} href="#" className={`w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 ${hover} hover:scale-110 transition-all duration-200 shadow-sm border border-slate-100`}>
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center text-slate-400 text-sm font-medium">
                    AgendaApp © {new Date().getFullYear()} | Todos los derechos reservados
                </div>
            </div>
        </div>
    );
}