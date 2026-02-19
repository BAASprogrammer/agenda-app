export default function Header() {
    return (
        <header>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="#" className="text-white text-lg font-bold">AgendaApp</a>
                    <div>
                        <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded">Inicio</a>
                        <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded">Acerca de</a>
                        <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded">Contacto</a>
                    </div>
                    <div>
                        <a href="#" className="text-gray-300  px-3 py-2 border border-amber-50 rounded-3xl hover:bg-amber-50 hover:text-gray-800">Login</a>
                    </div>
                </div>
            </nav>
        </header>
    );
}