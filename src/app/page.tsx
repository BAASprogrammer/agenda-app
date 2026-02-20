'use client';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-400 flex flex-col items-center justify-center animate-gradient-x">
      <main className="flex flex-col items-center justify-center w-full max-w-2xl p-10 rounded-3xl shadow-2xl bg-white/80 mt-16 mb-16 border border-blue-200 animate-fade-in-up transition-all duration-700">
        <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow mb-4 tracking-tight text-center animate-fade-in">Bienvenidos a <span className="text-cyan-500">AgendaApp</span>!</h1>
        <p className="mt-2 text-xl text-cyan-900 text-center font-medium animate-fade-in delay-200">Organiza tus tareas, eventos y contactos de forma sencilla y moderna.</p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <span className="inline-block bg-gradient-to-r from-cyan-100 via-blue-100 to-blue-200 text-blue-700 px-4 py-2 rounded-full font-semibold shadow hover:-translate-y-1 hover:scale-105 transition-transform duration-300 animate-fade-in-up">¡Comienza a gestionar tu día hoy!</span>
        </div>
      </main>
      <footer className="text-center text-cyan-700 mt-auto mb-4 opacity-80 animate-fade-in-up delay-300">
        © {new Date().getFullYear()} <span className="text-blue-700 font-bold">AgendaApp</span>. Todos los derechos reservados.
      </footer>
    </div>
  );
}