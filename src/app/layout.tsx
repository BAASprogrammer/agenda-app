import Header from "@/components/Header";
import "./globals.css";
import { cookies } from "next/headers";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Leer el nombre desde cookies (ajusta el nombre de la cookie según tu app)
  const cookieStore = await cookies();
  const firstName = cookieStore.get("first_name")?.value || "";
  // Puedes agregar más lógica para isLoggedIn si guardas un token/cookie de sesión
  const isLoggedIn = !!firstName;
  return (
    <html lang="es">
      <body>
        <Header isLoggedIn={isLoggedIn} firstName={firstName} />
        {children}
      </body>
    </html>
  );
}
