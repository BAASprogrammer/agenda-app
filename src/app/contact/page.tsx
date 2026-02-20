export default function Contact() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-4">Contacto</h1>
            <p className="text-lg text-gray-600 mb-6 text-center max-w-2xl">
                Si tienes alguna pregunta, sugerencia o necesitas ayuda, no dudes en contactarnos. Puedes enviarnos un correo electrónico a <a href="mailto:contacto@agendaapp.com" className="text-blue-500 underline">contacto@agendaapp.com</a> o seguirnos en nuestras redes sociales:
            </p>
            <div className="flex space-x-4">
                <a href="https://twitter.com/agendaapp" className="text-blue-500 hover:underline">Twitter</a>
                <a href="https://facebook.com/agendaapp" className="text-blue-500 hover:underline">Facebook</a>
                <a href="https://instagram.com/agendaapp" className="text-blue-500 hover:underline">Instagram</a>
            </div>
        </div>
    );
}