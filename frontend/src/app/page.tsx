'use client';
import { useState } from "react";
import { ArrowRight, Stethoscope, Star, Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import SpecialistsModal from "@/components/patient/SpecialistsModal";
import { features } from "@/data/features";
import { specialties } from "@/data/specialties";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  const filteredSpecialties = specialties.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const featureList = features;
  return (
    <div className="min-h-svh bg-white font-sans text-slate-800 overflow-hidden relative">
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
            <Link href="/register/patient" className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-200/70 hover:shadow-blue-300/70 hover:-translate-y-1 transition-all duration-300 w-full lg:w-60 justify-center">
              Comenzar Gratis <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-blue-200 hover:text-blue-700 hover:bg-white hover:-translate-y-1 transition-all duration-300 w-full lg:w-60 justify-center">
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
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl p-8 shadow-[0_4px_24px_rgb(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.10)] hover:-translate-y-2 transition-all duration-500 group animate-fade-in-up"
              style={{ animationDelay: `${0.15 * i}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.color} ${feature.hoverBg} ${feature.iconColor} group-hover:text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 mx-auto group-hover:rotate-y-360`}>
                <feature.icon className="w-8 h-8 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-[15px]">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Specialties Section */}
        <div id="specialties" className="mt-40 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
                Directorio Médico
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900  mb-4 tracking-tight">Nuestras Especialidades</h2>
              <p className="text-lg text-slate-500 font-medium">
                Encuentra el profesional adecuado para tu salud entre más de 10 áreas especializadas.
              </p>
            </div>

            <div className="relative group w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors z-10" />
              <input
                type="text"
                placeholder="Buscar especialidad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-md border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto px-2 md:px-0">
            {filteredSpecialties.map((spec, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 p-6 sm:p-8 md:p-10 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 group relative flex flex-col items-center justify-center text-center aspect-square shadow-sm w-full max-w-[400px] mx-auto min-h-[200px]"
              >
                {spec.popular && (
                  <div className="absolute top-6 sm:top-8 bg-amber-100 text-amber-700 text-[8px] md:text-[9px] font-black px-2 md:px-3 py-0.5 rounded-full uppercase tracking-wider z-10">
                    Popular
                  </div>
                )}

                <div className={`w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full ${spec.bg} ${spec.color} flex items-center justify-center mb-2 md:mb-4 border-2 md:border-4 border-white shadow-md md:shadow-lg group-hover:scale-110 ${spec.bghover} ${spec.colorhover} group-hover:rotate-6 transition-all duration-500`}>
                  <spec.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" />
                </div>

                <h3 className="text-sm sm:text-lg md:text-xl font-extrabold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors tracking-tight line-clamp-2 leading-tight px-2">
                  {spec.name}
                </h3>
                <p className="text-slate-500 text-[10px] sm:text-[12px] md:text-[14px] font-semibold leading-tight sm:leading-normal mb-2 md:mb-4 max-w-[350px] line-clamp-2 px-4" title={spec.desc}>
                  {spec.desc}
                </p>

                <button
                  onClick={() => setSelectedSpecialty(spec.name)}
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm md:shadow-md cursor-pointer"
                  title="Ver especialistas"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </button>

                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-blue-50/50 rounded-full blur-xl group-hover:bg-blue-100/50 transition-colors"></div>
              </div>
            ))}

            {filteredSpecialties.length === 0 && (
              <div className="col-span-full py-20 text-center bg-slate-50 rounded-4xl border-2 border-dashed border-slate-200">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-slate-300">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">No encontramos esa especialidad</h3>
                <p className="text-slate-500 mt-2">Prueba con otro término o revisa el listado completo.</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-6 text-blue-600 font-bold hover:underline"
                >
                  Ver todas
                </button>
              </div>
            )}
          </div>
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

      {/* Specialists Modal */}
      {selectedSpecialty && (
        <SpecialistsModal
          specialtyName={selectedSpecialty}
          onClose={() => setSelectedSpecialty(null)}
        />
      )}
    </div>
  );
}
