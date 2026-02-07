# 📋 Guía de Desarrollo - Entre Alas Blog

## 🎯 Estado Actual del Proyecto

### ✅ Completado (Fases 1-7):

- **Backend completo** - Node.js + Express + PostgreSQL
  - API REST con 13 endpoints públicos
  - Autenticación JWT
  - Sistema de roles (admin/editor)
  - Integración con Cloudinary para imágenes
  - Migraciones de base de datos
  - 13 tablas creadas en PostgreSQL

- **Frontend integrado con API** - Angular 19
  - Servicios usando HttpClient
  - Componentes actualizados para Observables
  - Routing sin hash (path-based para SEO)

- **Base de datos PostgreSQL**
  - Usuario admin creado
  - Tablas: articles, bird_species, admin_users, etc.

- **Archivos SSR creados** - Angular Universal (pendiente configuración en angular.json)

---

## 🚀 Próximas Fases

### Fase 8: Admin Panel (Pendiente - 6-8 horas)

Panel de administración completo para gestionar contenido dinámicamente.

**Componentes a crear:**

```
src/app/admin/
├── components/
│   ├── admin-layout/          # Layout con sidebar + navbar
│   ├── login/                 # Página de login
│   ├── dashboard/             # Dashboard con estadísticas
│   ├── article-list/          # Lista de artículos con tabla
│   ├── article-editor/        # Editor de artículos (TinyMCE)
│   ├── species-list/          # Lista de especies
│   └── species-editor/        # Editor de especies
├── services/
│   ├── admin-auth.service.ts  # Login, logout, JWT
│   └── admin-api.service.ts   # CRUD operations
├── guards/
│   └── auth.guard.ts          # Proteger rutas admin
└── admin.routes.ts            # Rutas /admin/*
```

**Funcionalidades:**

1. **Login System:**
   - Formulario username/password
   - Almacenar JWT en localStorage
   - Interceptor HTTP para agregar token
   - Logout y limpieza de sesión

2. **Dashboard:**
   - Total de artículos publicados
   - Total de especies
   - Últimos artículos creados
   - Estadísticas básicas

3. **Gestión de Artículos:**
   - Lista con tabla (título, categoría, fecha, estado)
   - Crear artículo nuevo
   - Editor de texto enriquecido (TinyMCE)
   - Upload de imagen destacada
   - Agregar fuentes (array dinámico)
   - Agregar tags (chips)
   - Publicar/Despublicar
   - Eliminar con confirmación

4. **Gestión de Especies:**
   - Similar a artículos
   - Campos específicos: características, cuidados, salud, etc.

**Dependencias a instalar:**

```bash
npm install @tinymce/tinymce-angular
```

**Rutas a configurar:**

```typescript
// src/app/app.routes.ts
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
  canActivate: [authGuard]
}
```

---

### Fase 9: SSR Configuration (1 hora)

Completar configuración de Angular Universal para SEO.

**Tareas:**

1. Actualizar `angular.json`:
   ```json
   "server": {
     "builder": "@angular-devkit/build-angular:server",
     "options": {
       "outputPath": "dist/bird-care-blog/server",
       "main": "src/main.server.ts",
       "tsConfig": "tsconfig.server.json"
     }
   }
   ```

2. Meta tags dinámicos:
   - Title service
   - Meta service
   - Open Graph tags

3. Sitemap.xml dinámico:
   - Endpoint `/sitemap.xml`
   - Generar desde base de datos

---

### Fase 10: Deployment en Render.com (2 horas)

**1. Crear `render.yaml`:**

```yaml
services:
  - type: web
    name: bird-care-blog
    env: node
    buildCommand: npm install && npm run build:ssr
    startCommand: npm run serve:ssr
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: bird-care-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: CLOUDINARY_CLOUD_NAME
        sync: false
      - key: CLOUDINARY_API_KEY
        sync: false
      - key: CLOUDINARY_API_SECRET
        sync: false

databases:
  - name: bird-care-db
    databaseName: bird_care
    plan: free
```

**2. Configurar scripts en `package.json`:**

```json
{
  "scripts": {
    "build:ssr": "ng build && ng run bird-care-blog:server:production",
    "serve:ssr": "node dist/bird-care-blog/server/main.js",
    "build:prod": "npm run build:ssr"
  }
}
```

**3. Deployment:**
- Conectar repositorio GitHub
- Configurar variables de entorno
- Deploy automático

---

## 🔧 Configuración Local

### Iniciar Desarrollo:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
ng serve
```

### Credenciales Admin:
```
Username: admin
Password: Admin123!
```

### URLs:
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000/api
- Health Check: http://localhost:3000/api/health

---

## 📚 Endpoints API Disponibles

### Públicos (sin autenticación):
```
GET  /api/articles              # Lista artículos publicados
GET  /api/articles/:id          # Artículo por ID
GET  /api/articles/slug/:slug   # Artículo por slug
GET  /api/species               # Lista especies publicadas
GET  /api/species/:id           # Especie por ID
GET  /api/search?q=query        # Búsqueda
```

### Admin (requiere JWT):
```
POST /api/auth/login            # Login
GET  /api/auth/me               # Usuario actual
GET  /api/admin/articles        # Todos los artículos
POST /api/admin/articles        # Crear artículo
PUT  /api/admin/articles/:id    # Actualizar artículo
DELETE /api/admin/articles/:id  # Eliminar artículo
POST /api/admin/upload          # Upload imagen
```

---

## 🗄️ Base de Datos

### PostgreSQL Local:
```
Host: localhost
Port: 5432
Database: bird_care_db
User: postgres
Password: admin123
```

### Tablas (13):
- admin_users
- articles
- article_sources
- article_tags
- bird_species
- species_characteristics
- species_care
- species_health
- species_breeding
- species_behavior
- species_habitat
- species_compatibility
- species_tips

---

## 📁 Estructura del Proyecto

```
bird-care-blog/
├── backend/                 # Node.js + Express
│   ├── src/
│   │   ├── config/         # Database config
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth, upload, etc.
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   └── utils/          # Helpers (cloudinary, jwt)
│   ├── migrations/         # Database migrations
│   └── scripts/            # Utility scripts
│
├── src/                     # Angular app
│   ├── app/
│   │   ├── admin/          # Admin panel (PENDIENTE)
│   │   ├── components/     # Public components
│   │   ├── pages/          # Public pages
│   │   ├── services/       # API services
│   │   └── models/         # TypeScript interfaces
│   └── environments/       # Environment configs
│
└── DESARROLLO.md           # Este archivo
```

---

## 🎨 Stack Tecnológico

**Backend:**
- Node.js 18+
- Express.js
- PostgreSQL
- JWT para autenticación
- Bcrypt para passwords
- Cloudinary para imágenes
- Sharp para optimización

**Frontend:**
- Angular 19 (standalone components)
- Tailwind CSS
- RxJS (Observables)
- TinyMCE (editor de texto)

**DevOps:**
- Render.com (hosting)
- GitHub (repositorio)
- PostgreSQL managed (Render)

---

## ⏱️ Timeline Estimado

| Fase | Tarea | Tiempo | Estado |
|------|-------|--------|--------|
| 1-7 | Backend + Frontend + SSR base | 30h | ✅ Completado |
| 8 | Admin Panel completo | 6-8h | ⏳ Pendiente |
| 9 | SSR Configuration | 1h | ⏳ Pendiente |
| 10 | Deployment Render.com | 2h | ⏳ Pendiente |
| 11 | Testing & Polish | 2h | ⏳ Pendiente |

**Total restante:** ~11-13 horas

---

## 🔒 Seguridad

- ✅ Passwords hasheados con bcrypt
- ✅ JWT con expiración (7 días)
- ✅ CORS configurado
- ✅ Helmet.js activo
- ✅ Prepared statements (SQL injection prevention)
- ⏳ Rate limiting (pendiente)
- ⏳ Input sanitization en admin (pendiente)

---

## 📝 Notas Importantes

1. **Cloudinary**: Configurar credenciales antes de usar upload de imágenes
2. **JWT_SECRET**: Cambiar en producción (usar variable de entorno)
3. **Admin Password**: Cambiar después del primer login
4. **CORS**: Actualizar origins en producción

---

**Última actualización:** 7 de febrero de 2026
**Versión:** 1.0.0
