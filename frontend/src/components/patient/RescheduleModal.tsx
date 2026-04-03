import { Calendar, Clock, X, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import { api } from "@/lib/api";
import { RescheduleModalProps } from "@/types/modal";

export default function RescheduleModal({ appointment, onClose, onSuccess }: RescheduleModalProps) {
    const [newDate, setNewDate] = useState(appointment.displayDate || "");
    const [newTime, setNewTime] = useState(appointment.displayTime || "");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const sanitizeMessage = (rawMessage: string) => rawMessage.replace(/^\s*error:\s*/i, '');

    const handleReschedule = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        const now = new Date();
        const nowHours = now.getHours();
        const nowMinutes = now.getMinutes();
        const nowDate = now.toLocaleDateString("en-CA");
        if (newDate == nowDate && newTime < nowHours + ":" + nowMinutes) {
            setMessage('No es posible agendar citas con fecha y hora anteriores a la actual');
            setIsError(true);
            setLoading(false);
            return;
        }
        if (!newDate || !newTime) {
            setMessage("Por favor, selecciona una fecha y hora.");
            setIsError(true);
            setLoading(false);
            return;
        }

        try {
            await api.put('/appointments/reschedule', {
                id: appointment.id,
                appointment_date: `${newDate} ${newTime}:00`
            });
            setMessage("Cita reagendada exitosamente!");
            setTimeout(() => {
                onSuccess(newDate, newTime);
                onClose();
            }, 2000);
        } catch (error) {
            console.error("Error reagendando la cita:", error);
            setMessage("No se pudo reagendar la cita.");
            setIsError(true);
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-2 md:p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-lg rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-y-auto animate-scale-in border border-white max-h-full md:max-h-[90svh]">
                {/* Header */}
                <div className="bg-linear-to-br from-cyan-600 to-blue-700 p-5 md:p-6 text-white relative shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-5 md:right-5 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-colors"
                    >
                        <X className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-inner">
                            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg md:text-xl font-black tracking-tight">Reagendar Cita</h2>
                            <p className="text-cyan-50/80 font-medium text-[10px] md:text-xs">Selecciona una nueva fecha y hora</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleReschedule} className="p-8 space-y-6">
                    {message && (
                        <div className={`p-4 rounded-2xl flex items-center gap-3 animate-fade-in ${isError ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                            {isError ? <XCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                            <span className="text-sm font-bold">{message}</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-cyan-500" /> Nueva Fecha
                            </label>
                            <input
                                type="date"
                                min={new Date().toLocaleDateString("en-CA")}
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all font-bold text-slate-700"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-cyan-500" /> Nueva Hora
                            </label>
                            <div className="relative group">
                                <select
                                    value={newTime}
                                    onChange={(e) => setNewTime(e.target.value)}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                                >
                                    <option value="">Seleccionar Hora</option>
                                    <option value="08:00">08:00</option>
                                    <option value="09:00">09:00</option>
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="15:00">15:00</option>
                                    <option value="16:00">16:00</option>
                                    <option value="17:00">17:00</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-cyan-500 transition-colors">
                                    <Clock className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 group"
                        >
                            {loading ? "Procesando..." : "Confirmar Reprogramación"}
                            {!loading && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full bg-white border border-slate-200 text-slate-500 py-4 rounded-2xl font-black text-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
                        >
                            Volver a los Detalles
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
