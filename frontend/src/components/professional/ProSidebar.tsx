"use client";
import {
    BarChart2, Calendar, ClipboardList, Users,
    Settings, LayoutDashboard, Menu
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ProSidebarProps {
    active: "/home/professional" | "/schedule" | "/manageappointments" | "/mypatients" | "/settings";
}

const NAV_ITEMS = [
    { href: "/home/professional", icon: BarChart2, label: "Dashboard" },
    { href: "/schedule", icon: Calendar, label: "Ver Agenda" },
    { href: "/manageappointments", icon: ClipboardList, label: "Gestionar Citas" },
    { href: "/mypatients", icon: Users, label: "Mis Pacientes" },
    { href: "/settings", icon: Settings, label: "Configuración" },
] as const;

export default function ProSidebar({ active }: ProSidebarProps) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div className="block md:hidden absolute top-20 right-5 z-61 w-8 h-8 bg-blue-500 rounded">
                <Menu className="w-6 h-6 m-auto mt-1 group-hover:scale-110 transition-transform cursor-pointer text-white" onClick={() => setOpen(!open)} />
            </div>
            <aside className={`absolute md:block right-4 md:right-0 top-28 md:top-0 h-1/2 w-1/2 md:static md:h-full md:w-64 bg-white md:border-r md:border-slate-100 rounded-lg md:rounded-none border-2 border-slate-200 flex flex-col z-20 animate-slide-in-left ${open ? "translate-x-0 opacity-100" : "translate-x-full hidden md:translate-x-0 md:opacity-100"}`}>
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-md shadow-blue-200/60 hover:scale-105 transition-transform duration-300">
                        <LayoutDashboard className="text-white w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-[15px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 tracking-tight">
                        Menú Profesional
                    </span>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-1" aria-label="Professional main navigation">
                    {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
                        const isActive = active === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                aria-current={isActive ? "page" : undefined}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${isActive
                                    ? "bg-blue-50 text-blue-700 shadow-sm"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                                    }`}
                            >
                                <Icon
                                    className={`w-5 h-5 transition-colors duration-200 ${isActive ? "text-blue-600" : "text-slate-400"}`}
                                    aria-hidden="true"
                                />
                                {label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </div>
    );
}
