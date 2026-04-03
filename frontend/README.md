# AgendaApp 🏥 - Frontend

Sistema de gestión de citas médicas desarrollado con **Next.js 16**, **Zustand** y **Tailwind CSS 4**.

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

## 🛠 Tecnologías Core

-   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
-   **React:** 19.x
-   **Estado Global:** [Zustand](https://github.com/pmndrs/zustand) (Sustituyendo UserContext)
-   **Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest)
-   **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/)
-   **Iconos:** Lucide React

---

## 📂 Estructura del Proyecto (Route Groups)

Este proyecto utiliza **Route Groups** de Next.js para organizar las rutas por perfil de usuario de forma lógica sin afectar la URL pública.

-   **`src/app/(patient)/`**: Rutas para pacientes (Ej: `/profile`, `/myappointments`).
-   **`src/app/(professional)/`**: Rutas para profesionales (Ej: `/schedule`, `/settings`).

### Beneficios de esta estructura:
1.  **Organización Logística**: Código modular por perfil.
2.  **URLs Limpias**: `(patient)/profile/page.tsx` se mapea a `/profile`.
3.  **Layouts Específicos**: Aplicación de middleware y diseños únicos por grupo de rutas.

---

## 🔑 Funcionalidades Clave

### Portal Profesional
-   Agenda visual semanal con gestión de estados.
-   Registro de pacientes y gestión de especialidades/subespecialidades.
-   Configuración de perfil profesional vinculada al backend.

### Portal Paciente
-   Buscador dinámico de profesionales y servicios.
-   Agendamiento de citas con validación en tiempo real.
-   Historial clínico y gestión de datos personales.

---

## 🏗 Integración con Backend
El frontend se comunica con un backend **Spring Boot** mediante una capa de servicios centralizada en `src/services/` y hooks personalizados en `src/hooks/`. La autenticación se maneja vía JWT persistido de forma segura.

