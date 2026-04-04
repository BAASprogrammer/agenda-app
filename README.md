# AgendaApp 🏥 - Full Stack

**AgendaApp** es una solución integral de gestión médica diseñada con una arquitectura de vanguardia que separa nítidamente las responsabilidades. El sistema permite la gestión eficiente de citas, historiales y perfiles para profesionales de la salud y pacientes.

---

## Desarrollador
Desarrollado con ❤️ por **BAASprogrammer**

---

## 🏗 Arquitectura del Sistema

El proyecto está organizado en un monorepositorio con dos componentes principales:

```text
agenda-app/
├── frontend/               # Aplicación Next.js (Frontend)
│   ├── src/app/           # Rutas (Route Groups: patient, professional)
│   ├── src/components/    # Componentes UI (Modularizados por dominio)
│   ├── src/hooks/         # Lógica reactiva (TanStack Query)
│   ├── src/services/      # Comunicación API con Axios
│   └── src/store/         # Estado global con Zustand
│
├── backend/                # Aplicación Spring Boot (Backend)
│   └── app/               # Núcleo de la API REST
│       ├── controllers/   # Endpoints (User, Appointment, Specialty)
│       ├── services/      # Lógica de negocio avanzada
│       ├── repository/    # Persistencia con JPA
│       └── config/        # Seguridad (JWT/OAuth2) y CORS
└── README.md              # Documentación Principal
```

---

## 🛠 Stack Tecnológico

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) & **React 19**
- **Estado:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest) & **Axios**
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Documentación:** [jsPDF](https://github.com/parallax/jsPDF)

### Backend
- **Framework:** [Spring Boot 4.0.3](https://spring.io/projects/spring-boot) (Java 21)
- **Seguridad:** Spring Security (OAuth2 / Resource Server / JWT)
- **Persistencia:** Spring Data JPA + **PostgreSQL**
- **Utilidades:** Lombok, Maven, dotenv

---

## 🚀 Estado del Proyecto y Migración

Actualmente, el proyecto se encuentra en una fase avanzada de migración de lógica *serverless* a un backend centralizado.

- **✅ Completado:**
  - Migración de flujos críticos de citas y pacientes a Spring Boot.
  - Implementación de seguridad basada en JWT.
  - Gestión de estado global migrada de Context API a Zustand.
  - Validación estricta de tipos de datos entre el backend y frontend.
- **🚧 En progreso:**
  - Finalización de la gestión granular de subespecialidades médicas.
  - Desacoplamiento total de Supabase Auth en favor de una gestión de sesiones propia del backend.
  - Implementación de persistencia avanzada para historiales médicos.

---

## ⚙️ Instalación y ejecución

### Prerrequisitos
- Node.js v20+
- JDK 21+
- PostgreSQL activo

### 1. Clonar y Configurar Backend
```bash
cd backend/app
# Asegúrate de configurar tu archivo .env con las credenciales de DB
./mvnw spring-boot:run
```

### 2. Configurar Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## ✅ Mejoras Críticas Recientes
1. **Validación Dual:** Esquemas de validación integrados tanto en el frontend (client-side) como en el backend (Spring Validation).
2. **Optimización de Carga:** Uso extensivo de caché con TanStack Query para reducir la latencia de la API.
3. **Seguridad Robusta:** Implementación de CORS policies y protección de rutas mediante middleware de Next.js y Spring Security.
4. **Clean Architecture:** Refactorización de servicios en el frontend para centralizar la comunicación externa.

