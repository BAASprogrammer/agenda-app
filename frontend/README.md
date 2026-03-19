# AgendaApp 🏥

Sistema de gestión de citas médicas desarrollado con **Next.js**, **Supabase** y **Tailwind CSS**.

## 🚀 Inicio Rápido

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```
2.  **Ejecutar en desarrollo:**
    ```bash
    npm run dev
    ```

---

## 📂 Estructura del Proyecto (Route Groups)

Este proyecto utiliza **Route Groups** de Next.js para organizar las rutas por perfil de usuario sin afectar la URL.

-   **`src/app/(patient)/`**: Contiene las rutas exclusivas para pacientes (Ej: `/profile`, `/myappointments`).
-   **`src/app/(professional)/`**: Contiene las rutas para médicos (Ej: `/schedule`, `/settings`).

### ¿Por qué los paréntesis `(...)`?
Los nombres de carpetas entre paréntesis son ignorados por el sistema de rutas de Next.js. Se usan para:
1.  **Organización Logística**: Mantener el código del paciente separado del profesional en el disco duro.
2.  **URLs Limpias**: Permite que `(patient)/profile/page.tsx` sea accesible simplemente como `/profile`.
3.  **Layouts Compartidos**: Permite aplicar diseños o políticas de seguridad específicas a todo un grupo de rutas.

---

## 🛠 Tecnologías

-   **Framework:** Next.js 15 (App Router)
-   **Base de datos / Auth:** Supabase
-   **Estilos:** Tailwind CSS
-   **Iconos:** Lucide React
-   **Lenguaje:** TypeScript

---

## 🔑 Funcionalidades Clave

### Portal Profesional
-   Agenda visual semanal.
-   Gestión de estados de citas (Completar/Cancelar).
-   Listado dinámico de pacientes.

### Portal Paciente
-   Buscador y agendamiento de citas.
-   Historial de consultas anteriores.
-   Gestión de perfil personal.
