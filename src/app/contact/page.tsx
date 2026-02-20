export default function Contact() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-900 drop-shadow-lg">Contacto</h1>
            <p className="text-lg text-blue-800 mb-6 text-center max-w-2xl">
                ¿Tienes dudas, sugerencias o necesitas ayuda? ¡Estamos aquí para ayudarte!<br />
                Puedes enviarnos un correo a <a href="mailto:contacto@agendaapp.com" className="text-blue-600 underline font-semibold">contacto@agendaapp.com</a> o escribirnos por redes sociales.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <div className="flex flex-col items-center bg-white/80 rounded-xl shadow-lg p-6 w-72">
                    <span className="text-blue-700 text-2xl font-bold mb-2">Teléfono</span>
                    <span className="text-blue-900 font-semibold">+56 912 345 678</span>
                </div>
                <div className="flex flex-col items-center bg-white/80 rounded-xl shadow-lg p-6 w-72">
                    <span className="text-blue-700 text-2xl font-bold mb-2">Horario</span>
                    <span className="text-blue-900 font-semibold">Lunes a Viernes: 9:00 - 18:00</span>
                </div>
            </div>
            <div className="flex gap-6 mt-2">
                <a href="https://twitter.com/agendaapp" target="_blank" rel="noopener" className="flex items-center gap-2 text-blue-500 hover:text-blue-700 font-semibold text-lg transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3.1a9.864 9.864 0 0 1-3.127 1.195A4.916 4.916 0 0 0 16.616.64c-2.73 0-4.942 2.21-4.942 4.942 0 .387.044.765.127 1.127C7.728 6.575 4.1 4.885 1.671 2.149c-.427.734-.666 1.584-.666 2.491 0 1.72.875 3.234 2.209 4.122a4.904 4.904 0 0 1-2.237-.618v.062c0 2.404 1.713 4.415 4.004 4.872a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.868 9.868 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.009-7.514 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z"/></svg>
                    Twitter
                </a>
                <a href="https://facebook.com/agendaapp" target="_blank" rel="noopener" className="flex items-center gap-2 text-blue-500 hover:text-blue-700 font-semibold text-lg transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0z"/></svg>
                    Facebook
                </a>
                <a href="https://instagram.com/agendaapp" target="_blank" rel="noopener" className="flex items-center gap-2 text-blue-500 hover:text-blue-700 font-semibold text-lg transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.974.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.975-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.402 3.678 1.383c-.981.981-1.252 2.093-1.311 3.374C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.059 1.281.33 2.393 1.311 3.374.981.981 2.093 1.252 3.374 1.311C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.33 3.374-1.311.981-.981 1.252-2.093 1.311-3.374.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.059-1.281-.33-2.393-1.311-3.374-.981-.981-2.093-1.252-3.374-1.311C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                    Instagram
                </a>
            </div>
            <div className="mt-10 text-center text-blue-700 text-sm">
                <span>AgendaApp © 2026 | Todos los derechos reservados</span>
            </div>
        </div>
    );
}