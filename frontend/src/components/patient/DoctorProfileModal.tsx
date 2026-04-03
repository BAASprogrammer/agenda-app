import { X, Award, MapPin, Phone, Mail, Clock, ShieldCheck, Star } from "lucide-react";
import { DoctorProfileModalProps } from "@/types/modal";

export default function DoctorProfileModal({ professional, onClose }: DoctorProfileModalProps) {
    if (!professional) return null;

    // Hardcoded data as examples of what could be in the DB
    const mockData = {
        bio: "Especialista con más de 12 años de experiencia dedicada a proporcionar atención médica excepcional. Enfocado en diagnósticos precisos y tratamientos personalizados para cada paciente.",
        experience: "12+ años",
        education: "Universidad de Chile, Facultad de Medicina",
        certifications: ["Certificación Nacional de Especialidad", "Miembro de la Sociedad Médica"],
        office: "Centro Médico Salud, Piso 4, Oficina 402",
        rating: 4.9,
        reviews: 124
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-2 md:p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-2xl rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-y-auto animate-scale-in border border-white max-h-full md:max-h-[90svh]">

                {/* Header with gradient and cover */}
                <div className="h-28 md:h-40 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 relative shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full text-white transition-all z-10"
                    >
                        <X className="w-4 h-4 md:w-5 md:h-5" />
                    </button>

                    <div className="absolute -bottom-10 md:-bottom-12 left-6 md:left-10">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl md:rounded-4xl p-1.5 shadow-2xl">
                            <div className="w-full h-full bg-slate-100 rounded-[1.4rem] md:rounded-[1.8rem] flex items-center justify-center text-slate-300">
                                <span className="text-2xl md:text-4xl font-bold text-slate-400">
                                    {professional.first_name?.[0]}{professional.last_name?.[0]}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 md:pt-16 pb-8 md:pb-10 px-6 md:px-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-6 md:mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                    <ShieldCheck className="w-2.5 h-2.5 md:w-3 md:h-3" /> Verificado
                                </span>
                                <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                                    <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-amber-500" /> {mockData.rating}
                                </div>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
                                Dr. {professional.first_name} {professional.last_name}
                            </h2>
                            <p className="text-slate-500 font-bold text-base md:text-lg mt-1 flex items-center gap-2">
                                Especialista Médico <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-slate-200 rounded-full"></span> {mockData.experience} de Exp.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column: Info */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Sobre el Profesional</h4>
                                <p className="text-slate-600 font-medium leading-relaxed">
                                    {mockData.bio}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-indigo-100 hover:bg-white transition-all">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-500">
                                        <Award className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Educación</h5>
                                        <p className="text-slate-700 font-bold text-sm">{mockData.education}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-purple-100 hover:bg-white transition-all">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-purple-500">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Ubicación</h5>
                                        <p className="text-slate-700 font-bold text-sm">{mockData.office}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Experience and more */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Contacto Directo</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-slate-600 font-bold">
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <span>+56 9 9876 5432</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 font-bold">
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <span>dr.{professional.last_name?.toLowerCase()}@agendapp.cl</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Horario de Atención</h4>
                                <div className="flex items-center gap-3 text-slate-600 font-bold py-3 px-4 rounded-2xl border border-slate-100">
                                    <Clock className="w-5 h-5 text-indigo-500" />
                                    <span>Lun - Vie, 08:00 - 18:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
