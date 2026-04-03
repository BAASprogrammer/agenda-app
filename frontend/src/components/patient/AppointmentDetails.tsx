import { Calendar, FileText, MapPin, User, X, Info } from "lucide-react";
import { getStatusColor } from "@/utils/getStatusColor";
import { useState } from "react";
import RescheduleModal from "./RescheduleModal";
import DoctorProfileModal from "./DoctorProfileModal";

export default function AppointmentDetails({ appointment, setSelectedAppointment }: { appointment: any, setSelectedAppointment: (appointment: any) => void }) {
    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
    const [isDoctorProfileOpen, setIsDoctorProfileOpen] = useState(false);

    const handleRescheduleSuccess = () => {
        setSelectedAppointment(null);
    };

    return (
        <div>
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-2 md:p-4">
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-fade-in" onClick={() => setSelectedAppointment(null)}></div>
                <div className="relative bg-white w-full max-w-xl rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-y-auto animate-slide-up border border-white max-h-full md:max-h-[90svh]">
                    {/* Header Image/Pattern */}
                    <div className="h-24 md:h-32 bg-linear-to-br from-cyan-500 to-blue-600 relative shrink-0">
                        <button
                            onClick={() => setSelectedAppointment(null)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full text-white transition-all z-10"
                        >
                            <X className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <div className="absolute -bottom-8 md:-bottom-10 left-6 md:left-8">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-3xl p-1 shadow-xl">
                                <div className="w-full h-full bg-slate-100 rounded-[1rem] md:rounded-[1.25rem] flex items-center justify-center text-slate-300">
                                    <User className="w-10 h-10 md:w-12 md:h-12" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 md:pt-14 px-6 md:px-8 pb-8 md:pb-10">
                        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 mb-6">
                            <div>
                                <span className={`px-3 md:px-4 py-1 rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-widest ${getStatusColor(appointment.status)}`}>
                                    {appointment.status}
                                </span>
                                <button
                                    onClick={() => setIsDoctorProfileOpen(true)}
                                    className="group flex items-center gap-2 mt-2 hover:bg-slate-50 transition-colors rounded-2xl -ml-2 p-2 pr-4 text-left"
                                >
                                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                                        Dr. {appointment.professional?.first_name} {appointment.professional?.last_name}
                                    </h2>
                                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 md:opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shrink-0">
                                        <Info className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    </div>
                                </button>
                                <p className="text-slate-500 font-bold text-xs md:text-sm flex items-center gap-1 md:gap-2 mt-0.5 md:mt-1">
                                    Especialista <span className="w-1 h-1 bg-slate-300 rounded-full"></span> ID: #{appointment.id?.toString().slice(-6)}
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
                        {appointment.status === 'agendada' && (
                            <button
                                onClick={() => setIsRescheduleModalOpen(true)}
                                className="w-full bg-cyan-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-cyan-200 hover:bg-cyan-700 hover:-translate-y-0.5 transition-all active:translate-y-0"
                            >
                                Reprogramar Cita
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {isRescheduleModalOpen && (
                <RescheduleModal
                    appointment={appointment}
                    onClose={() => setIsRescheduleModalOpen(false)}
                    onSuccess={handleRescheduleSuccess}
                />
            )}

            {isDoctorProfileOpen && (
                <DoctorProfileModal
                    professional={appointment.professional}
                    onClose={() => setIsDoctorProfileOpen(false)}
                />
            )}
        </div>
    );
}