"use client";
import { Menu, LogOut, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SidebarProps } from "@/types/sidebar";
import { supabase } from "@/lib/supabaseClient";
import { clearAuthCookies } from "@/app/actions";

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

    const handleLogout = async () => {
        await supabase.auth.signOut();
        await clearAuthCookies();
        window.location.replace("/");
    };

    const HeaderIcon = navItems[0]?.icon || Menu;

    return (
        <>
            {/* Backdrop for Mobile Menu */}
            <div
                className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[151] md:hidden transition-all duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={() => setOpen(false)}
            />

            {/* Hamburger Button - Modern Floating Style */}
            <button
                onClick={() => setOpen(!open)}
                className={`block md:hidden fixed top-3 right-4 z-[160] w-12 h-12 ${buttonColor} text-white rounded-2xl shadow-xl border border-white/20 flex items-center justify-center transition-all active:scale-95 cursor-pointer overflow-hidden group outline-none`}
            >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 group-hover:scale-110 transition-transform" />}
            </button>

            {/* Aside Menu - Premium Drawer Style */}
            <aside
                className={`fixed md:static inset-y-0 right-0 top-[64px] h-[calc(100svh-64px)] md:h-svh w-[300px] md:w-64 bg-white/95 backdrop-blur-xl md:bg-white border-l md:border-l-0 md:border-r border-slate-200 md:border-slate-100 flex flex-col z-[155] md:z-40 transition-all duration-300 shadow-2xl md:shadow-none rounded-l-[2rem] md:rounded-none ${open ? "translate-x-0" : "translate-x-full md:translate-x-0"
                    }`}
            >
                {/* Header Section */}
                <div className="p-8 border-b border-slate-50 flex items-center gap-4 bg-linear-to-b from-slate-50/50 to-transparent shrink-0 rounded-l-[2rem]">
                    <div className="flex flex-col">
                        {header}
                    </div>
                </div>

                {/* Nav Links Section */}
                <nav className="flex-1 p-6 space-y-2 overflow-y-auto no-scrollbar" aria-label={ariaLabel}>
                    {navItems.map(({ href, icon: Icon, label }) => {
                        const isActive = active === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setOpen(false)}
                                aria-current={isActive ? "page" : undefined}
                                className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-[15px] transition-all duration-300 group ${isActive
                                    ? `${activeBgColor} ${activeTextColor} shadow-md shadow-slate-200/50 translate-x-1`
                                    : "text-slate-500 hover:bg-slate-50/80 hover:" + hoverTextColor + " hover:translate-x-1"
                                    }`}
                            >
                                <div className={`p-2 rounded-lg transition-colors duration-300 ${isActive ? "bg-white shadow-sm " + iconActiveColor : "bg-slate-50 text-slate-400 group-hover:text-slate-600"}`}>
                                    <Icon className="w-5 h-5" aria-hidden="true" />
                                </div>
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Section with Logout (Mobile Only) */}
                <div className="p-6 border-t border-slate-50 shrink-0 space-y-4 md:hidden">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-5 py-4 bg-rose-50 text-rose-600 rounded-2xl font-bold text-[15px] hover:bg-rose-100 transition-all group"
                    >
                        <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                            <LogOut className="w-5 h-5" />
                        </div>
                        Cerrar Sesión
                    </button>
                </div>
            </aside>
        </>
    );
}