import { supabase } from '../../lib/supabaseClient';

type LoginModalProps = {
    open: boolean;
    onClose: () => void;
}
export function LoginModal({open, onClose}: LoginModalProps) {
    if (!open) return null;
    const handleClose = () => {
        onClose();
    }
    const handleLogin = async () => {
        const email = (document.getElementById('username') as HTMLInputElement)?.value;
        const password = (document.getElementById('password') as HTMLInputElement)?.value;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert('Error de autenticación: ' + error.message);
        } else {
            // Redirigir o cerrar modal
            onClose();
        }
    }

    return (
        <div className="bg-yellow-50 rounded-2xl p-4 w-96 h-80 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-gray-900 absolute right-6 top-2 cursor-pointer" onClick={handleClose} title="Cerrar">x</div>
            <div className="text-center text-2xl font-bold text-gray-800 mb-4 mt-2">Iniciar Sesión</div>
            <div className="p-2">
                <label htmlFor="username" className="text-gray-600 block">Nombre de Usuario o Email</label>
                <input type="text" id="username" name="username" className="border-2 border-gray-400 rounded w-full text-black" />
            </div>
            <div className="p-2">
                <label htmlFor="password" className="text-gray-600 block">Contraseña</label>
                <input type="password" id="password" name="password" className="border-2 border-gray-400 rounded w-full text-black" />
            </div>
            <div className="p-2 text-center mt-4">
                <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer" onClick={handleLogin}>Iniciar Sesión</button>
            </div>
        </div>
    );
}