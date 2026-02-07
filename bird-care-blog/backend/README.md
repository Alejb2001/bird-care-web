# Bird Care Blog - Backend API

API REST para el blog "Entre Alas" - Cuidado de aves domésticas.

## Stack Tecnológico

- **Node.js** + **Express.js** - Framework web
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación
- **Cloudinary** - Almacenamiento de imágenes
- **Bcrypt** - Hash de contraseñas

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
# Edita .env con tus credenciales
```

3. Crear base de datos PostgreSQL:
```sql
CREATE DATABASE bird_care_db;
```

4. Ejecutar migraciones:
```bash
npm run migrate
```

## Desarrollo

Iniciar servidor en modo desarrollo (con hot-reload):
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## Producción

Iniciar servidor en modo producción:
```bash
npm start
```

## Endpoints API

### Públicos (sin autenticación)
- `GET /api/health` - Health check
- `GET /api/articles` - Listar artículos
- `GET /api/articles/:id` - Obtener artículo por ID
- `GET /api/species` - Listar especies
- `GET /api/species/:id` - Obtener especie por ID

### Admin (requiere autenticación JWT)
- `POST /api/auth/login` - Login admin
- `POST /api/admin/articles` - Crear artículo
- `PUT /api/admin/articles/:id` - Actualizar artículo
- `DELETE /api/admin/articles/:id` - Eliminar artículo
- `POST /api/admin/upload` - Subir imagen

## Estructura del Proyecto

```
backend/
├── src/
│   ├── config/          # Configuraciones (DB, etc)
│   ├── controllers/     # Lógica de negocio
│   ├── middleware/      # Middlewares (auth, error handling)
│   ├── models/          # Modelos de datos
│   ├── routes/          # Definición de rutas
│   ├── utils/           # Utilidades (Cloudinary, JWT, etc)
│   └── server.js        # Punto de entrada
├── migrations/          # Scripts de migración de BD
└── package.json
```

## Variables de Entorno

Ver `.env.example` para todas las variables requeridas.

## Licencia

MIT
