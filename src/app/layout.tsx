
import Header from "@/components/Header";
import "./globals.css";
import { cookies } from "next/headers";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Leer el nombre desde cookies (ajusta el nombre de la cookie según tu app)
  const cookieStore = await cookies();
  // Obtener el firstName
  const firstName = cookieStore.get("first_name")?.value || "";
  // Obtener el userId
  const userId = cookieStore.get("user_id")?.value || "";
  const isLoggedIn = !!firstName;
  return (
    <html lang="es">
      <body>
        <Header isLoggedIn={isLoggedIn} firstName={firstName} userId={userId} />
        {children}
      </body>
    </html>
  );
}
