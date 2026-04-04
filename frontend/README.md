# AgendaApp 🏥 - Frontend

Sistema moderno de gestión de citas médicas desarrollado con el ecosistema de **React 19** y **Next.js 16**. Proporciona interfaces optimizadas tanto para profesionales de la salud como para pacientes, integrándose de forma fluida con un backend robusto en Spring Boot.

## 🚀 Inicio Rápido

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```
2.  **Configurar variables de entorno:**
    Crea un archivo `.env.local` con las claves necesarias (Supabase y API URL).
3.  **Ejecutar en desarrollo:**
    ```bash
    npm run dev
    ```

---

## 🛠 Stack Tecnológico

-   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
-   **React:** [19.x](https://react.dev/)
-   **Gestión de Estado:** [Zustand](https://github.com/pmndrs/zustand) (Centralizado para autenticación y preferencias)
-   **Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest) & **Axios**
-   **Generación de Documentos:** [jsPDF](https://github.com/parallax/jsPDF) (Para reportes e historial médico)
-   **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/)
-   **Autenticación:** Supabase Auth + JWT personalizado.
-   **Iconos:** Lucide React

---

## 📂 Arquitectura del Directorio `src`

El proyecto utiliza **Route Groups** para separar nítidamente las experiencias de usuario sin ensuciar las URLs.

-   **`app/(patient)/`**: Portal privado del paciente (`/profile`, `/myappointments`, `/scheduleappointment`, `/medicalhistory`).
-   **`app/(professional)/`**: Portal privado del profesional (`/schedule`, `/manageappointments`, `/mypatients`, `/settings`).
-   **`app/register/`**: Flujos de registro diferenciados por tipo de perfil.
-   **`components/`**:
    -   `shared/`: UI genérica (Botones, Inputs, Modales).
    -   `professional/` & `patient/`: Componentes específicos de dominio.
-   **`services/`**: Capa de comunicación con el backend Spring Boot (Axios).
-   **`hooks/`**: Lógica reactiva reutilizable y queries de TanStack Query (`useAppointments`, `useProfile`).
-   **`store/`**: Definiciones de tiendas Zustand (Global state).

---

## 🔑 Funcionalidades Implementadas

### Portal del Profesional
-   **Agenda Semanal Interactiva**: Visualización y gestión de horarios.
-   **Gestión de Citas**: Administración proactiva de consultas pendientes y completadas.
-   **Directorio de Pacientes**: Acceso rápido a la lista de pacientes registrados.
-   **Configuración Avanzada**: Personalización de especialidades y datos profesionales.

### Portal del Paciente
-   **Buscador de Profesionales**: Reserva de citas basada en especialidades.
-   **Mis Citas**: Seguimiento y estado de las citas programadas.
-   **Historial Médico**: Registro histórico de consultas y diagnósticos.
-   **Gestión del Perfil**: Actualización de datos personales y médicos.

### Sistema Core
-   **Dashboard Dinámico**: Vistas personalizadas según el rol al iniciar sesión.
-   **Autenticación Robusta**: Flujo completo de login, registro dual y recuperación de contraseña.
-   **Middleware de Protección**: Rutas protegidas según el estado de la sesión.

---

## 🏗 Integración Backend
El frontend actúa como el cliente principal para la API **Spring Boot**. La comunicación se realiza vía `src/services/` utilizando tokens JWT para asegurar cada transacción.

