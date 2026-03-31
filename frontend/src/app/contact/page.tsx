'use client';
import { useState } from "react";
import { Mail, Phone, Clock, HeadphonesIcon, Instagram, Twitter, Facebook, Send, User, MessageCircle, Info, CheckCircle2 } from "lucide-react";
import { ContactFormData } from "@/types/contact-form-data";

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulation of submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden bg-white py-24 px-6 md:px-12">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-gradient-to-b from-teal-50/50 via-white to-blue-50/30">
                <div className="absolute top-[-10%] left-[-5%] w-160 h-160 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
                <div className="absolute bottom-[5%] right-[-5%] w-140 h-140 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col items-center">
                {/* Header Section */}
                <div className="text-center mb-20 animate-fade-in-up">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-400 text-white shadow-xl shadow-teal-200/60 mb-6 hover:scale-110 transition-transform duration-300">
                        <HeadphonesIcon className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
                        ¿Cómo podemos <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">ayudarte?</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Nuestro equipo de soporte está listo para resolver tus dudas y escuchar tus sugerencias.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
                    {/* Left Column: Info & Details */}
                    <div className="lg:col-span-5 space-y-8 animate-fade-in-left">
                        <div className="bg-white/60 backdrop-blur-xl border border-white p-8 rounded-[40px] shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <Info className="w-6 h-6 text-teal-600" /> Información de contacto
                            </h2>

                            <div className="space-y-6">
                                {[
                                    { icon: Mail, label: "Escríbenos", value: "contacto@agendaapp.cl", href: "mailto:contacto@agendaapp.cl", color: "bg-blue-50 text-blue-600", hover: "group-hover:bg-blue-600" },
                                    { icon: Phone, label: "Llámanos", value: "+56 912 345 678", href: "tel:+56912345678", color: "bg-teal-50 text-teal-600", hover: "group-hover:bg-teal-600" },
                                    { icon: Clock, label: "Atención", value: "Lun - Vie: 9:00 - 18:00", href: null, color: "bg-amber-50 text-amber-600", hover: "group-hover:bg-amber-600" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-3xl hover:bg-white/80 transition-colors group">
                                        <div className={`w-12 h-12 ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 rounded-full group-hover:text-white ${item.hover}`}>
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                                            {item.href ? (
                                                <a href={item.href} className="text-slate-800 font-bold hover:text-teal-600 transition-colors">{item.value}</a>
                                            ) : (
                                                <p className="text-slate-800 font-bold">{item.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 pt-12 border-t border-slate-100">
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Síguenos</p>
                                <div className="flex gap-4">
                                    {[
                                        { icon: Twitter, hover: "hover:text-blue-500 hover:bg-blue-50" },
                                        { icon: Facebook, hover: "hover:text-blue-700 hover:bg-blue-50" },
                                        { icon: Instagram, hover: "hover:text-pink-600 hover:bg-pink-50" },
                                    ].map(({ icon: Icon, hover }, i) => (
                                        <a key={i} href="#" className={`w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 ${hover} hover:scale-110 transition-all duration-200 shadow-sm border border-white`}>
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: The Form */}
                    <div className="lg:col-span-7 animate-fade-in-right">
                        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
                            {isSubmitted && (
                                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-12 text-center animate-fade-in">
                                    <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-4">¡Mensaje enviado!</h3>
                                    <p className="text-slate-500 font-medium mb-8">Gracias por contactarnos. Nuestro equipo revisará tu mensaje y te responderá muy pronto.</p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-teal-600 font-bold hover:underline"
                                    >
                                        Enviar otro mensaje
                                    </button>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                                            <User className="w-4 h-4 text-teal-500" /> Nombre Completo
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Ej: Juan Pérez"
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-medium text-slate-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                                            <Mail className="w-4 h-4 text-teal-500" /> Correo Electrónico
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="juan@ejemplo.com"
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-medium text-slate-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                                        <Info className="w-4 h-4 text-teal-500" /> Asunto
                                    </label>
                                    <select
                                        required
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-medium text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%220%200%2024%2024%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-size-[1.2em] bg-position-[right_1.5rem_center] bg-no-repeat"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="soporte">Soporte Técnico</option>
                                        <option value="ventas">Ventas y Planes</option>
                                        <option value="sugerencia">Sugerencias</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                                        <MessageCircle className="w-4 h-4 text-teal-500" /> Tu Mensaje
                                    </label>
                                    <textarea
                                        required
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Cuéntanos en qué podemos ayudarte..."
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-medium text-slate-700 resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white px-8 py-5 rounded-2xl font-black text-lg shadow-xl shadow-teal-200/50 hover:shadow-teal-300/60 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:pointer-events-none"
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>Enviar Mensaje <Send className="w-5 h-5" /></>
                                    )}
                                </button>

                                <p className="text-center text-xs text-slate-400 font-medium">
                                    Al enviar este formulario, aceptas nuestro tratamiento de datos personales de acuerdo a nuestra política de privacidad.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="mt-24 text-center text-slate-400 text-sm font-medium animate-fade-in" style={{ animationDelay: '0.8s' }}>
                    AgendaApp © {new Date().getFullYear()} | Innovando en salud digital para Chile 🇨🇱
                </div>
            </div>

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-30px) scale(1.05); }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                .animate-fade-in-up {
                    animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-fade-in-left {
                    animation: fadeInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-fade-in-right {
                    animation: fadeInRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-fade-in {
                    animation: fadeIn 1s ease-out forwards;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInLeft {
                    from { opacity: 0; transform: translateX(-40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}