import React from "react";
import Header from "@/components/Header";
import "./globals.css";
import { cookies } from "next/headers";
import { UserProvider } from "@/context/UserContext";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Leer el nombre desde cookies
  const cookieStore = await cookies();
  const firstName = cookieStore.get("first_name")?.value || "";
  const lastName = cookieStore.get("last_name")?.value || "";
  const email = cookieStore.get("email")?.value || "";
  const isProfessional = cookieStore.get("is_professional")?.value || "";
  const userId = cookieStore.get("user_id")?.value || "";
  const isLoggedIn = !!firstName;
  return (
    <html lang="es">
      <body className="antialiased">
        <UserProvider isLoggedIn={isLoggedIn} firstName={firstName} lastName={lastName} email={email} userId={userId} isProfessional={isProfessional}>
          <Header isLoggedIn={isLoggedIn} firstName={firstName} isProfessional={isProfessional} />
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
