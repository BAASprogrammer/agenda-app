import { Calendar, FileText, MapPin, User, X } from "lucide-react";
import { getStatusColor } from "@/utils/getStatusColor";

export default function AppointmentDetails({ appointment, setSelectedAppointment }: { appointment: any, setSelectedAppointment: (appointment: any) => void }) {
    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-fade-in" onClick={() => setSelectedAppointment(null)}></div>
                <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up border border-white">
                    {/* Header Image/Pattern */}
                    <div className="h-32 bg-linear-to-br from-cyan-500 to-blue-600 relative">
                        <button
                            onClick={() => setSelectedAppointment(null)}
                            className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full text-white transition-all z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="absolute -bottom-10 left-8">
                            <div className="w-24 h-24 bg-white rounded-3xl p-1 shadow-xl">
                                <div className="w-full h-full bg-slate-100 rounded-[1.25rem] flex items-center justify-center text-slate-300">
                                    <User className="w-12 h-12" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-14 px-8 pb-10">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div>
                                <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest ${getStatusColor(appointment.status)}`}>
                                    {appointment.status}
                                </span>
                                <h2 className="text-3xl font-black text-slate-800 mt-2 tracking-tight">
                                    Dr. {appointment.professional?.first_name} {appointment.professional?.last_name}
                                </h2>
                                <p className="text-slate-500 font-bold flex items-center gap-2 mt-1">
                                    Especialista Médico <span className="w-1 h-1 bg-slate-300 rounded-full"></span> ID: #{appointment.id?.toString().slice(-6)}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 hover:border-cyan-200 transition-colors">
                                <div className="flex items-center gap-3 mb-4 text-cyan-600">
                                    <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <span className="font-black uppercase text-[10px] tracking-widest">Fecha y Hora</span>
                                </div>
                                <p className="text-lg font-bold text-slate-800 capitalize">{appointment.displayFullDate}</p>
                                <p className="text-slate-500 font-medium">{appointment.displayTime} hrs</p>
                            </div>

                            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 hover:border-cyan-200 transition-colors">
                                <div className="flex items-center gap-3 mb-4 text-cyan-600">
                                    <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <span className="font-black uppercase text-[10px] tracking-widest">Ubicación</span>
                                </div>
                                <p className="text-lg font-bold text-slate-800">Centro Médico Salud</p>
                                <p className="text-slate-500 font-medium">Av. Providencia 1234, Piso 4</p>
                            </div>
                        </div>

                        <div className="bg-cyan-50/50 rounded-3xl p-6 mb-8 border border-cyan-100">
                            <div className="flex items-center gap-3 mb-4 text-cyan-700">
                                <FileText className="w-5 h-5" />
                                <span className="font-black uppercase text-[10px] tracking-widest">Motivo de Consulta</span>
                            </div>
                            <p className="text-slate-700 font-medium leading-relaxed bg-white/50 p-4 rounded-2xl border border-white">
                                {appointment.reason || "Sin motivo especificado. El paciente requiere una evaluación general de su estado de salud actual."}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button className="flex-1 bg-cyan-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-cyan-200 hover:bg-cyan-700 hover:-translate-y-0.5 transition-all active:translate-y-0">
                                Reprogramar Cita
                            </button>
                            <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-black text-sm hover:bg-slate-50 hover:border-slate-300 transition-all">
                                Contactar Soporte
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}