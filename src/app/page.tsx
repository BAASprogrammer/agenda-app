'use client';
import { ArrowRight, CalendarClock, Clock, ShieldCheck, Stethoscope, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 overflow-hidden relative">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-gradient-to-br from-slate-50 via-blue-50/40 to-teal-50/30">
        <div className="absolute top-[-8%] left-[-6%] w-[32rem] h-[32rem] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float"></div>
        <div className="absolute top-[18%] right-[-4%] w-[28rem] h-[28rem] bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-8%] left-[25%] w-[36rem] h-[36rem] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-blue-100 shadow-sm mb-8 text-blue-700 font-semibold text-sm">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            La plataforma médica más intuitiva de Chile
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
            Tu salud,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-blue-700">
              siempre organizada
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 mb-12 font-medium max-w-3xl mx-auto leading-relaxed">
            AgendaApp conecta pacientes y profesionales de la salud en una plataforma moderna y segura. Gestiona tus citas sin estrés, desde cualquier dispositivo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register/patient" className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-200/70 hover:shadow-blue-300/70 hover:-translate-y-1 transition-all duration-300">
              Comenzar Gratis <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-blue-200 hover:text-blue-700 hover:bg-white hover:-translate-y-1 transition-all duration-300">
              <Link href="/about" className="no-underline text-inherit flex items-center gap-2">
                Conocer más
              </Link>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-14 flex flex-wrap justify-center gap-6 text-sm text-slate-400 font-medium animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {["✓ Sin tarjeta de crédito", "✓ Gratuito para pacientes", "✓ Datos 100% seguros"].map(item => (
              <span key={item} className="flex items-center gap-1">{item}</span>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 text-center">
          {[
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
              title: "Seguridad Total",
              desc: "Tus datos clínicos y personales están protegidos con cifrado de nivel hospitalario.",
              color: "bg-amber-50",
              hoverBg: "group-hover:bg-amber-500",
              iconColor: "text-amber-600",
              accent: "from-amber-400 to-amber-500"
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl p-8 shadow-[0_4px_24px_rgb(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.10)] hover:-translate-y-2 transition-all duration-500 group animate-fade-in-up"
              style={{ animationDelay: `${0.15 * i}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.color} ${feature.hoverBg} ${feature.iconColor} group-hover:text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 mx-auto`}>
                <feature.icon className="w-8 h-8 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-[15px]">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Band */}
        <div className="mt-32 bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-1 shadow-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-white rounded-[22px] px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Stethoscope className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">¿Eres profesional de la salud?</h3>
                <p className="text-slate-500 font-medium">Gestiona tu agenda, reduce inasistencias y atiende mejor a tus pacientes.</p>
              </div>
            </div>
            <Link href="/register/professional" className="shrink-0 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:-translate-y-1 hover:shadow-blue-300 transition-all duration-300 whitespace-nowrap">
              Regístrate ahora <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      <footer className="text-center pb-8 pt-12 text-slate-400 font-medium border-t border-slate-100 bg-white/60 backdrop-blur-sm">
        <p>© {new Date().getFullYear()} <span className="text-blue-600 font-bold">AgendaApp</span>. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}