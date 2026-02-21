'use client';
import { ArrowRight, Calendar, Clock, ShieldCheck, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden relative">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-[20%] right-[-5%] w-[30rem] h-[30rem] bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40rem] h-[40rem] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-sm mb-8 text-indigo-600 font-semibold text-sm">
            <Star className="w-4 h-4 text-cyan-500 fill-cyan-500" />
            La mejor plataforma para gestionar tus citas
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
            Tu tiempo es valioso.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-blue-600">
              Nosotros lo organizamos.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 font-medium max-w-3xl mx-auto leading-relaxed">
            AgendaApp conecta a profesionales y pacientes en una plataforma moderna, intuitiva y rápida. Gestiona tareas, eventos y citas sin estrés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-1 transition-all duration-300">
              Comenzar Gratis <ArrowRight className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 bg-white/80 backdrop-blur-md text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-indigo-300 hover:text-indigo-600 hover:bg-white hover:-translate-y-1 transition-all duration-300">
              Saber más
            </button>
          </div>
        </div>

        {/* Features Glassmorphism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {[
            {
              icon: <Calendar className="w-8 h-8 text-indigo-600" />,
              title: "Gestión Inteligente",
              desc: "Calendarios sincronizados y alertas automáticas para que nunca pierdas una cita.",
              color: "bg-indigo-50"
            },
            {
              icon: <Clock className="w-8 h-8 text-cyan-600" />,
              title: "Ahorra Tiempo",
              desc: "Automatiza confirmaciones, recordatorios y reagendamientos con un solo clic.",
              color: "bg-cyan-50"
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-pink-600" />,
              title: "Seguridad Total",
              desc: "Tus datos y los de tus pacientes están protegidos con los más altos estándares.",
              color: "bg-pink-50"
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-500 group animate-fade-in-up" style={{ animationDelay: `${0.2 * i}s` }}>
              <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center pb-8 pt-12 text-slate-500 font-medium border-t border-slate-200/50 bg-white/30 backdrop-blur-sm">
        <p>© {new Date().getFullYear()} <span className="text-indigo-600 font-bold">AgendaApp</span>. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}