export default function HomeProfessional() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-cyan-100 to-blue-200 flex flex-col items-center justify-center py-8 animate-gradient-x">
            <div className="bg-white/90 shadow-2xl rounded-3xl p-10 w-full max-w-xl border border-indigo-200 flex flex-col items-center animate-fade-in-up transition-all duration-700">
                <div className="mb-4 animate-bounce">
                    <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 via-pink-400 to-cyan-400 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><defs><linearGradient id="proGradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#06b6d4"/><stop offset="100%" stopColor="#a21caf"/></linearGradient></defs><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" style={{stroke: 'url(#proGradient)'}}/></svg>
                    </span>
                </div>
                <h1 className="text-4xl font-extrabold text-indigo-700 mb-2 text-center drop-shadow animate-fade-in">Panel Profesional</h1>
                <p className="text-lg text-indigo-900 mb-6 text-center max-w-2xl font-medium animate-fade-in delay-200">
                    Gestiona tus citas, revisa tu agenda y mantente organizado.<br/>¡Gracias por ser parte de <span className="text-pink-500 font-bold">AgendaApp</span>!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
                    <button className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-blue-500 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:from-indigo-600 hover:to-blue-700 hover:scale-105 transition-all duration-300 cursor-pointer w-full sm:w-auto animate-fade-in-up">Ver Agenda</button>
                    <button className="bg-gradient-to-r from-pink-400 via-cyan-400 to-indigo-400 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:from-pink-500 hover:to-indigo-500 hover:scale-105 transition-all duration-300 cursor-pointer w-full sm:w-auto animate-fade-in-up delay-100">Gestionar Citas</button>
                </div>
            </div>
        </div>
    );
}