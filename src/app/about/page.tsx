export default function About() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-900 drop-shadow-lg">Acerca de AgendaApp</h1>
            <p className="text-lg text-blue-800 mb-6 text-center max-w-2xl">
                AgendaApp es una plataforma moderna para gestionar tareas, eventos y citas, diseñada para pacientes y profesionales.<br />
                Con una interfaz intuitiva y fácil de usar, puedes crear, editar y eliminar tareas, así como establecer recordatorios para no olvidar tus compromisos importantes.
            </p>
            <div className="flex flex-col md:flex-row gap-6 mt-4">
                <div className="bg-white/80 rounded-xl shadow-lg p-6 w-72 flex flex-col items-center">
                    <span className="mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-blue-700"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2zm0 0c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm-6 8c0-2.21 3.582-4 8-4s8 1.79 8 4v1H6v-1z" /></svg>
                    </span>
                    <h2 className="text-xl font-bold mb-2 text-blue-700">Para pacientes</h2>
                    <p className="text-blue-900 text-center">Reserva, consulta y gestiona tus citas de manera rápida y segura.</p>
                </div>
                <div className="bg-white/80 rounded-xl shadow-lg p-6 w-72 flex flex-col items-center">
                    <span className="mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-blue-700"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 20h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z" /></svg>
                    </span>
                    <h2 className="text-xl font-bold mb-2 text-blue-700">Para profesionales</h2>
                    <p className="text-blue-900 text-center">Organiza tu agenda, recibe notificaciones y mejora la atención a tus pacientes.</p>
                </div>
            </div>
            <div className="mt-10 text-center text-blue-700 text-sm">
                <span>AgendaApp © 2026 | Innovando la gestión de tareas y citas</span>
            </div>
        </div>
    );
}