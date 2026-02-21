export default function LoginForm() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email" name="email" required className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-blue-200" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" required className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-blue-200" />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200">Login</button>
                </form>
            </div>
        </div>
    );
}