# AgendaApp (Full Stack)

Aplicación de agenda de citas médicas con arquitectura frontend Next.js + backend Spring Boot.

## Estructura del repositorio

- `frontend/`: UI de cliente con Next.js 16 + Tailwind CSS + React Query + Supabase.
- `backend/app/`: API REST con Spring Boot 4, JPA, PostgreSQL y OAuth2.

## Requisitos

- Node.js 20+ (o compatible con Next 16)
- npm (o yarn)
- Java 21
- Maven 3.9+
- PostgreSQL como base de datos (o adaptado a otra DB)

## Instalación y ejecución

### Backend

```bash
cd backend/app
./mvnw clean package
./mvnw spring-boot:run
```

Configurar `application.properties` con los datos de conexión a la base de datos y las variables de entorno con credenciales.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Abrir: `http://localhost:3000`.

## Lint y pruebas

### Frontend

```bash
cd frontend
npm run lint
```

### Backend

```bash
cd backend/app
./mvnw test
```

## Hallazgos de calidad de código

- `frontend/src/app/(patient)/profile/page.tsx`: `setState` en `useEffect` genera alerta de linter (`react-hooks/set-state-in-effect`).
- `frontend/src/components/login/LoginModal.tsx`: se invocaban hooks condicionalmente con `if (!open) return null` antes de `useMutation`.
- Múltiples archivos con `@typescript-eslint/no-explicit-any` en hooks y handlers (tipado reforzable).
- `backend/app/src/main/java/com/agendaapp/app/controller/UserController.java`: doble captura de `Exception` con `printStackTrace`; se ajustó a usar logger y `ResponseStatusException`.

## Mejoras aplicadas

1. Añadido root `README.md` con instrucciones de desarrollo y evaluación.
2. Ajustes en `.gitignore` para evitar tracking de carpetas de IDE/compilación (`backend/.metadata`, `backend/app/target`).
3. Cambio en `UserController` a logger SLF4J + response status 500.
4. Corrección en `LoginModal` para no usar hooks condicionalmente.
5. Tipado más seguro del error de mutation en `scheduleappointment/page.tsx`.

## Recomendaciones siguientes

- Ejecutar `npm run lint` y resolver los `no-explicit-any` restantes en todo el frontend.
- Añadir pruebas unitarias para los componentes y la capa de servicios.
- Mejorar manejo de errores y mensajes de usuario en API y UI (estandarizar códigos de respuesta y traducciones).
- Añadir un CI (GitHub Actions) para lint + pruebas.
