# AgendaApp
Sistema de gestión de citas médicas desarrollado con React, Next.js y Spring Boot.

## Desarrollador
Desarrollado con ❤️ por **BAASprogrammer**

## Estructura del Proyecto

```text
agenda-app/
├── frontend/               # Aplicación Next.js (Frontend)
│   ├── src/
│   │   ├── app/           # Rutas y páginas (App Router)
│   │   ├── components/    # Componentes de UI (Patient, Professional, Shared)
│   │   ├── hooks/         # Custom Hooks (TanStack Query, API)
│   │   ├── store/         # Gestión de Estado (Zustand)
│   │   ├── services/      # Llamadas a la API y Supabase
│   │   ├── types/         # Definiciones de TypeScript
│   │   └── utils/         # Funciones de ayuda y constantes
│   └── public/            # Assets estáticos
│
├── backend/                # Aplicación Spring Boot (Backend)
│   ├── src/main/java/     # Lógica corporativa (Controllers, Services, Models)
│   └── src/main/resources/ # Configuración y scripts SQL
│
└── README.md              # Documentación principal
```

# AgendaApp (Full Stack)

Aplicación de agenda de citas médicas con arquitectura moderna: **Next.js 16** en el frontend y **Spring Boot 4** en el backend.

## 🚀 Estado del Proyecto

El proyecto se encuentra en una fase activa de migración de una arquitectura serverless (Supabase client-side) a una arquitectura robusta con un backend centralizado en Spring Boot.

## 🛠 Arquitectura y Tecnologías

- **Frontend (`frontend/`)**: 
  - **Next.js 16 (App Router)** + **React 19**.
  - **Zustand**: Gestión de estado global (sustituyendo React Context).
  - **TanStack Query (React Query)**: Gestión de peticiones asíncronas y caché.
  - **Tailwind CSS 4**: Estilos modernos y utilitarios.
  - **Lucide React**: Set de iconos.
- **Backend (`backend/app/`)**:
  - **Spring Boot 4** (Java 21).
  - **Spring Data JPA** + **PostgreSQL**.
  - **Spring Security** (OAuth2 Resource Server / JWT).
  - **Lombok**: Reducción de código boilerplate.

## 📂 Estructura del Repositorio

- `frontend/`: UI del cliente organizada por Route Groups (`(patient)`, `(professional)`).
- `backend/app/`: Microservicio para la lógica de negocio y persistencia.

## ⚙️ Requisitos

- Node.js 20+
- Java 21
- Maven 3.9+
- PostgreSQL

## 🛠 Instalación y ejecución

### Backend

1. Configurar la base de datos PostgreSQL.
2. Ejecutar:
   ```bash
   cd backend/app
   ./mvnw spring-boot:run
   ```

### Frontend

1. Instalar dependencias:
   ```bash
   cd frontend
   npm install
   ```
2. Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```

## ✅ Mejoras Recientes

1. **Migración de Capa de Datos**: Finalizada la migración de consultas críticas (citas, pacientes) de Supabase Direct a la API de Spring Boot.
2. **Gestión de Estado**: Implementación de **Zustand** para un manejo de sesión y estado global más eficiente.
3. **Validaciones de Seguridad**: Implementación de endpoints de validación de usuario y flujos de recuperación de contraseña.
4. **Tipado Estricto**: Refuerzo de interfaces TypeScript en hooks de TanStack Query y componentes de perfil.
5. **Centralización de Hooks**: Creación de una capa de servicios y hooks reutilizables para el consumo de la API.

## 📌 Recomendaciones Siguientes

- Implementar la gestión completa de subespecialidades para profesionales.
- Finalizar la migración de los últimos componentes de Supabase Auth a la gestión de sesiones por el backend.
- Añadir tests de integración en el backend con `MockMvc`.
- Configurar un pipeline de CI/CD para automatizar el linting y las pruebas.

