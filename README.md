# AgendaApp

Autor: BAASprogrammer

AgendaApp es una plataforma full-stack para gestionar citas médicas, perfiles de pacientes y profesionales, y resúmenes de atención en un monorepo con Next.js y Spring Boot.

## Arquitectura

```text
agenda-app/
├── frontend/        # Next.js 16 + React 19 + TypeScript
│   ├── src/app/     # App Router y route groups
│   ├── src/components/
│   ├── src/hooks/
│   ├── src/lib/
│   ├── src/services/
│   └── src/store/
├── backend/
│   └── app/         # Spring Boot 4.0.3 + Java 21
│       └── src/main/java/
└── README.md
```

## Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack Query
- Axios
- Zustand
- Supabase JS
- jsPDF

### Backend
- Spring Boot 4.0.3
- Java 21
- Maven Wrapper
- Spring Web
- Spring Security OAuth2 Resource Server
- Spring Validation
- JdbcTemplate + PostgreSQL
- Spring Dotenv

## Requisitos previos

- Node.js 20+
- npm
- JDK 21+
- PostgreSQL corriendo localmente
- Variables de entorno configuradas para frontend y backend

## Variables de entorno

### Backend
El backend lee las credenciales de base de datos desde variables de entorno con `spring-dotenv`.

Ejemplo en `backend/app/.env` o exportadas antes de arrancar:

```bash
DB_URL=jdbc:postgresql://localhost:5432/agendaapp
DB_USER=postgres
DB_PASSWORD=tu_password
PORT=8080
```

### Frontend
El frontend usa Supabase y la URL base del backend mediante variables públicas.

Ejemplo en `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_KEY=tu_supabase_anon_key
```

## Ejecutar en local

### 1) Backend

```bash
cd backend/app
./mvnw spring-boot:run
```

Si tu shell no inyecta el `.env`, exporta las variables antes de iniciar:

```bash
export DB_URL=jdbc:postgresql://localhost:5432/agendaapp
export DB_USER=postgres
export DB_PASSWORD=tu_password
cd backend/app
./mvnw spring-boot:run
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

La app de interfaz quedará disponible en:

```text
http://localhost:3000
```

El backend queda en:

```text
http://localhost:8080
```

## Estado del proyecto

El proyecto está funcionando con una arquitectura de frontend React/Next y backend Spring Boot desacoplado, con autenticación por Supabase en el cliente y validación/autoridad en el backend.

Incluye:
- flujo de registro y login
- gestión de citas para paciente y profesional
- paneles y resumenes de agenda
- renovación automática de token en el cliente
- configuración de CORS para desarrollo local
- tipado más consistente en el frontend y limpieza de contratos de datos

## Comandos útiles

```bash
cd frontend
npm run lint
npm run build
```

```bash
cd backend/app
./mvnw test
./mvnw spring-boot:run
```

## Nota de desarrollo

Si el backend no arranca correctamente en local, revisa que las variables `DB_URL`, `DB_USER` y `DB_PASSWORD` estén disponibles en el mismo proceso donde se ejecuta `spring-boot:run`. La configuración actual del proyecto depende de esas variables para inicializar la conexión a PostgreSQL.

