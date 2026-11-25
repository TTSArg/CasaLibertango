# Casa Libertango

Sitio trilingüe para Casa Libertango y punto de partida para administrar alojamientos y experiencias.

## Arquitectura

- `frontend/`: Next.js, React y TypeScript. El sitio ofrece español, francés e inglés; la ruta inicial `/` redirige al francés.
- `backend/`: API de negocio Spring Boot y Java. Incluye una comprobación de salud con PostgreSQL y el esquema inicial de alojamientos y consultas de reserva.
- `cms/`: Strapi independiente para páginas y experiencias editables por la administradora.
- `db`: PostgreSQL con bases lógicamente separadas: `turismo_db` y `cms_db`.

El backend y Strapi usan usuarios y bases distintos. Comparten el servidor PostgreSQL local de Docker Compose para reducir recursos; se pueden separar en servidores distintos al desplegar. Docker mantiene la base y las imágenes subidas en volúmenes persistentes; para varias instancias en producción, usar almacenamiento de objetos compartido para los medios.

## Desarrollo local con Docker

1. Copiar `.env.example` a `.env` y reemplazar los valores de secretos antes de publicar el proyecto.
2. Ejecutar `docker compose up --build`.
3. Abrir:
   - Sitio: http://localhost:3000 (redirecciona al francés en `/fr`).
   - API: http://localhost:8080/api/v1/health
   - Administración de Strapi: http://localhost:1337/admin

Crear la primera cuenta de administración de Strapi desde `/admin`. Después, crear en **Settings → API Tokens** un token de solo lectura para el Content API, copiarlo en `CMS_API_TOKEN` dentro de `.env` y reiniciar el frontend. La web consume páginas y experiencias publicadas desde el CMS usando ese token; no es necesario habilitar lectura anónima.

Strapi permite cargar una entrada por idioma; usar `locale` con `es`, `fr` o `en`. La ruta de cada página en el CMS debe coincidir con el slug público de su idioma (por ejemplo, `hebergement` para la página francesa del alojamiento). Las experiencias se administran como entradas independientes.

## Desarrollo sin Docker

La aplicación Next.js se puede iniciar con `cd frontend; npm install; npm run dev`. Para ejecutar backend y CMS fuera de Docker, configurar las variables de entorno de `.env.example` en cada proceso y disponer de PostgreSQL con ambas bases inicializadas.

## Alcance actual

La web pública tiene páginas localizadas, selector de idioma, metadatos básicos y llamadas a Eva por WhatsApp. Cuando Strapi no tiene una página publicada, la web usa el contenido inicial incluido en el frontend y registra un aviso en el servidor. El backend todavía no confirma ni cobra reservas: su esquema evita guardar datos de tarjetas y sirve como base para implementar el flujo de reservas cuando se definan reglas, disponibilidad y proveedor de pagos.

Antes de producción, cambiar todos los secretos, configurar HTTPS, copias de seguridad, correo transaccional, privacidad/cookies y un proveedor de pagos disponible para la entidad que cobra en Argentina.
