"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { X, User, ChevronRight, Stethoscope, Star, Search, MapPin } from "lucide-react";
import DoctorProfileModal from "./DoctorProfileModal";
import { SpecialistsModalProps } from "@/types/modal";

export default function SpecialistsModal({ specialtyName, onClose }: SpecialistsModalProps) {
    const [professionals, setProfessionals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

    useEffect(() => {
        const fetchProfessionals = async () => {
            setLoading(true);
            try {
                // First get the specialty ID by name
                const { data: specData, error: specError } = await supabase
                    .from('medical_specialties')
                    .select('id')
                    .ilike('name', specialtyName)
                    .single();
                if (specError || !specData) {
                    console.error("Error obteniendo especialidad:", specError);
                    setProfessionals([]);
                    return;
                }

                // Then get all subspecialties for this specialty
                const { data: subData, error: subError } = await supabase
                    .from('medical_subspecialties')
                    .select('id, name')
                    .eq('specialty_id', specData.id);
                if (subError) {
                    console.error("Error obteniendo subespecialidades:", subError);
                    setProfessionals([]);
                    return;
                }

                const subIds = subData.map(s => s.id);

                // Finally get professionals linked to those subspecialties
                const { data: profData, error: profError } = await supabase
                    .from('users')
                    .select('id, first_name, last_name, subspecialty_id')
                    .eq('is_professional', true)
                    .in('subspecialty_id', subIds);
                if (profError) {
                    console.error("Error obteniendo profesionales:", profError);
                    setProfessionals([]);
                } else {
                    // Enrich professional data with subspecialty name
                    const enriched = profData.map(p => ({
                        ...p,
                        subspecialty_name: subData.find(s => s.id === p.subspecialty_id)?.name || specialtyName
                    }));
                    setProfessionals(enriched);
                }
            } catch (err) {
                console.error("Error inesperado:", err);
            } finally {
                setLoading(false);
            }
        };

        if (specialtyName) fetchProfessionals();
    }, [specialtyName]);

    return (
        <>
            <div className="fixed inset-0 z-110 flex items-center justify-center p-2 md:p-4">
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in" onClick={onClose}></div>

                <div className="relative bg-white w-full max-w-2xl rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden animate-scale-in border border-white flex flex-col max-h-full md:max-h-[90svh]">

                    {/* Header */}
                    <div className="p-6 md:p-8 bg-linear-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <Stethoscope className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">Especialistas en {specialtyName}</h2>
                                <p className="text-blue-100 text-[11px] md:text-sm font-medium">{professionals.length} profesionales disponibles</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
                        {loading ? (
                            <div className="py-20 text-center space-y-4">
                                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                <p className="text-slate-500 font-bold">Buscando los mejores profesionales...</p>
                            </div>
                        ) : professionals.length > 0 ? (
                            professionals.map((prof, i) => (
                                <div
                                    key={prof.id}
                                    className="bg-slate-50 border border-slate-100 p-5 rounded-3xl flex items-center gap-5 hover:bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group animate-fade-in-up"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-500">
                                        <User className="w-8 h-8" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Disponible</span>
                                            <div className="flex items-center gap-0.5 text-amber-500">
                                                <Star className="w-3 h-3 fill-amber-500" />
                                                <span className="text-[10px] font-black">4.9</span>
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-lg">Dr. {prof.first_name} {prof.last_name}</h4>
                                        <div className="flex items-center gap-3 mt-1 text-slate-500 text-sm font-medium">
                                            <span className="flex items-center gap-1">
                                                <Stethoscope className="w-3.5 h-3.5 text-blue-500" />
                                                {prof.subspecialty_name}
                                            </span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                Centro Médico
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setSelectedDoctor(prof)}
                                        className="p-3 bg-white rounded-2xl text-blue-600 shadow-sm border border-slate-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95 group/btn cursor-pointer"
                                    >
                                        <ChevronRight className="w-6 h-6 transition-transform group-hover/btn:translate-x-1" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="py-16 text-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                                    <Search className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">No hay especialistas registrados</h3>
                                <p className="text-slate-500 max-w-xs mx-auto">Actualmente no contamos con profesionales en esta área específica. Vuelve a intentarlo más tarde.</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center shrink-0">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Agenda tu cita de forma segura con AgendaApp</p>
                    </div>
                </div>
            </div>

            {/* Profile Detail Overlay */}
            {selectedDoctor && (
                <DoctorProfileModal
                    professional={selectedDoctor}
                    onClose={() => setSelectedDoctor(null)}
                />
            )}
        </>
    );
}
