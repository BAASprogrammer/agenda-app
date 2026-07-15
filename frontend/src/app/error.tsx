"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Algo salió mal</h2>
            <p className="text-gray-500">{error.message || "Ocurrió un error inesperado"}</p>
            <button
                onClick={reset}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Intentar de nuevo
            </button>
        </div>
    );
}
