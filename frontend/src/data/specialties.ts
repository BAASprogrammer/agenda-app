import { Baby, BicepsFlexed, Brain, BrainCog, Eye, HeartPulse, Smile, Sparkles, Stethoscope, Venus, Activity } from "lucide-react";
import { Specialty } from "@/types/specialty";


export const specialties: Specialty[] = [
    { name: 'Medicina General', desc: 'Atención médica integral para pacientes de todas las edades', icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-50', bghover: 'group-hover:bg-blue-600', colorhover: 'group-hover:text-white', popular: true },
    { name: 'Cardiología', desc: 'Diagnóstico y tratamiento de enfermedades del corazón', icon: HeartPulse, color: 'text-rose-600', bg: 'bg-rose-50', bghover: 'group-hover:bg-rose-600', colorhover: 'group-hover:text-white', popular: true },
    { name: 'Neurología', desc: 'Trastornos del sistema nervioso', icon: Brain, color: 'text-indigo-600', bg: 'bg-indigo-50', bghover: 'group-hover:bg-indigo-600', colorhover: 'group-hover:text-white' },
    { name: 'Pediatría', desc: 'Atención médica para niños y adolescentes', icon: Baby, color: 'text-orange-600', bg: 'bg-orange-50', bghover: 'group-hover:bg-orange-600', colorhover: 'group-hover:text-white', popular: true },
    { name: 'Dermatología', desc: 'Enfermedades y tratamiento de la piel', icon: Sparkles, color: 'text-pink-600', bg: 'bg-pink-50', bghover: 'group-hover:bg-pink-600', colorhover: 'group-hover:text-white' },
    { name: 'Ginecología', desc: 'Salud reproductiva femenina', icon: Venus, color: 'text-purple-600', bg: 'bg-purple-50', bghover: 'group-hover:bg-purple-600', colorhover: 'group-hover:text-white', popular: true },
    { name: 'Traumatología', desc: 'Lesiones y trastornos del sistema musculoesquelético', icon: BicepsFlexed, color: 'text-slate-600', bg: 'bg-slate-50', bghover: 'group-hover:bg-slate-600', colorhover: 'group-hover:text-white' },
    { name: 'Oftalmología', desc: 'Diagnóstico y tratamiento de enfermedades oculares', icon: Eye, color: 'text-cyan-600', bg: 'bg-cyan-50', bghover: 'group-hover:bg-cyan-600', colorhover: 'group-hover:text-white' },
    { name: 'Psiquiatría', desc: 'Diagnóstico y tratamiento de trastornos mentales', icon: BrainCog, color: 'text-emerald-600', bg: 'bg-emerald-50', bghover: 'group-hover:bg-emerald-600', colorhover: 'group-hover:text-white' },
    { name: 'Endocrinología', desc: 'Trastornos hormonales y metabólicos', icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50', bghover: 'group-hover:bg-amber-600', colorhover: 'group-hover:text-white' },
    { name: 'Odontología', desc: 'Prevención, diagnóstico y tratamiento de enfermedades bucales y dentales', icon: Smile, color: 'text-teal-600', bg: 'bg-teal-50', bghover: 'group-hover:bg-teal-600', colorhover: 'group-hover:text-white' },
];