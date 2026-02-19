'use client';
import Header from "@/components/Header";
import { LoginModal } from "@/components/login/LoginModal";
import { useState } from "react";

export default function Home() {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const handleLogin = () => {
    setShowLogin(true);
  }
  return (
    <div>
      {showLogin && <div className="w-full h-full backdrop-blur-md absolute"></div>}
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Bienvenidos a AgendaApp!</h1>
        <p className="mt-4 text-lg text-gray-600">Esta es la página de inicio.</p>
        {showLogin && <LoginModal open={showLogin} onClose={() => setShowLogin(false)}  />}
      </main>
    </div>
  );
}