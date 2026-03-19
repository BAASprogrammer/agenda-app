import { CalendarClock, Clock, ShieldCheck } from "lucide-react";

export const features = [
    {
        icon: CalendarClock,
        title: "Gestión Inteligente",
        desc: "Calendarios sincronizados y alertas automáticas para que nunca pierdas una cita médica.",
        color: "bg-blue-50",
        hoverBg: "group-hover:bg-blue-600",
        iconColor: "text-blue-600",
        accent: "from-blue-500 to-blue-600"
    },
    {
        icon: Clock,
        title: "Ahorra Tiempo",
        desc: "Confirmaciones automáticas, recordatorios y reagendamientos en segundos.",
        color: "bg-teal-50",
        hoverBg: "group-hover:bg-teal-600",
        iconColor: "text-teal-600",
        accent: "from-teal-500 to-teal-600"
    },
    {
        icon: ShieldCheck,
        title: "Privacidad Total",
        desc: "Cumplimos con la normativa vigente. Tus datos están seguros con nosotros.",
        color: "bg-purple-50",
        hoverBg: "group-hover:bg-purple-600",
        iconColor: "text-purple-600",
        accent: "from-purple-500 to-purple-600"
    }
]