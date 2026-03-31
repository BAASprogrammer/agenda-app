"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SidebarProps } from "@/types/sidebar";

export default function Sidebar({
    navItems,
    active,
    header,
    buttonColor,
    activeBgColor,
    activeTextColor,
    hoverTextColor,
    iconActiveColor,
    ariaLabel
}: SidebarProps) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className={`block md:hidden absolute top-20 right-5 z-61 w-8 h-8 ${buttonColor} rounded`}>
                <Menu className="w-6 h-6 m-auto mt-1 group-hover:scale-110 transition-transform cursor-pointer text-white" onClick={() => setOpen(!open)} />
            </div>
            <aside className={`absolute md:block right-4 md:right-0 top-28 md:top-0 h-1/2 w-1/2 md:static md:h-full md:w-64 bg-white md:border-r md:border-slate-100 rounded-lg md:rounded-none border-2 border-slate-200 flex flex-col z-20 animate-slide-in-left ${open ? "translate-x-0 opacity-100" : "translate-x-full hidden md:translate-x-0 md:opacity-100"}`}>
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    {header}
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-1" aria-label={ariaLabel}>
                    {navItems.map(({ href, icon: Icon, label }) => {
                        const isActive = active === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                aria-current={isActive ? "page" : undefined}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${isActive
                                    ? `${activeBgColor} ${activeTextColor} shadow-sm`
                                    : "text-slate-600 hover:bg-slate-50 hover:" + hoverTextColor
                                    }`}
                            >
                                <Icon
                                    className={`w-5 h-5 transition-colors duration-200 ${isActive ? iconActiveColor : "text-slate-400"}`}
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