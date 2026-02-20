export default function HomePatiente() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-br from-blue-100 via-cyan-200 to-blue-400 animate-gradient-x">
            <div className="bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center max-w-xl w-full animate-fade-in-up transition-all duration-700">
                <span className="mb-4 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-14 h-14 text-cyan-600 drop-shadow-xl"><defs><linearGradient id="userGradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#06b6d4"/><stop offset="100%" stopColor="#2563eb"/></linearGradient></defs><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2zm0 0c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm-6 8c0-2.21 3.582-4 8-4s8 1.79 8 4v1H6v-1z" style={{stroke: 'url(#userGradient)'}}/></svg>
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-blue-900 drop-shadow-lg text-center animate-fade-in">Bienvenido a tu Panel de Paciente</h1>
                <p className="text-lg text-cyan-800 mb-6 text-center max-w-2xl animate-fade-in delay-200">
                    Aquí podrás gestionar tus citas, ver tu historial médico y actualizar tu información personal.<br />
                    <span className="text-cyan-600 font-semibold">¡Gracias por confiar en nosotros para cuidar de tu salud!</span>
                </p>
                <div className="flex flex-col md:flex-row gap-6 w-full mt-4">
                    <div className="flex-1 bg-gradient-to-br from-cyan-100 via-blue-200 to-blue-300 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
                        <span className="text-cyan-700 text-2xl font-bold mb-2">Citas</span>
                        <p className="text-blue-900 text-center">Reserva y consulta tus próximas citas médicas fácilmente.</p>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-blue-100 via-cyan-200 to-cyan-300 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up delay-100">
                        <span className="text-blue-700 text-2xl font-bold mb-2">Historial</span>
                        <p className="text-blue-900 text-center">Accede a tu historial médico y revisa tus consultas anteriores.</p>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-cyan-200 via-blue-100 to-blue-300 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up delay-200">
                        <span className="text-cyan-700 text-2xl font-bold mb-2">Perfil</span>
                        <p className="text-blue-900 text-center">Actualiza tu información personal y preferencias de contacto.</p>
                    </div>
                </div>
            </div>
            <div className="mt-10 text-center text-cyan-700 text-sm animate-fade-in-up delay-300">
                <span>AgendaApp © 2026 | <span className="text-blue-700">Tu salud, nuestra prioridad</span></span>
            </div>
        </div>
    );
}