export default function About() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-4">Acerca de AgendaApp</h1>
            <p className="text-lg text-gray-600 mb-6 text-center max-w-2xl">
                AgendaApp es una aplicación de gestión de tareas y eventos diseñada para ayudarte a organizar tu vida diaria. Con una interfaz intuitiva y fácil de usar, puedes crear, editar y eliminar tareas, así como establecer recordatorios para no olvidar tus compromisos importantes.
            </p>
            <p className="text-lg text-gray-600 mb-6 text-center max-w-2xl">
                Nuestra misión es proporcionar una herramienta eficiente y confiable para que puedas mantener tu agenda bajo control y aumentar tu productividad. ¡Gracias por elegir AgendaApp!
            </p>
        </div>
    );
}