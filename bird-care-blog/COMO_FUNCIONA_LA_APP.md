# 🦜 Cómo Funciona la Aplicación - Entre Alas

## 📋 Índice
1. [Arquitectura General](#arquitectura-general)
2. [Backend (API)](#backend-api)
3. [Frontend (Angular)](#frontend-angular)
4. [Admin Panel](#admin-panel)
5. [Server-Side Rendering (SSR)](#server-side-rendering-ssr)
6. [Flujo de Datos](#flujo-de-datos)
7. [Deployment](#deployment)

---

## 🏗️ Arquitectura General

La aplicación sigue una arquitectura **Full-Stack** moderna con separación clara entre frontend y backend:

```
┌─────────────────────────────────────────────────────────┐
│                    NAVEGADOR (Cliente)                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │   Angular 19 (Frontend + Admin Panel)            │  │
│  │   - Componentes standalone                        │  │
│  │   - RxJS + HttpClient                            │  │
│  │   - TinyMCE Editor                                │  │
│  │   - Tailwind CSS                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                         │                                │
│                         │ HTTP/HTTPS                     │
│                         │                                │
└─────────────────────────┼────────────────────────────────┘
                          │
┌─────────────────────────┼────────────────────────────────┐
│                    SERVIDOR                              │
├─────────────────────────┴────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │   Node.js + Express (Backend API)                │  │
│  │   - REST API (/api/*)                            │  │
│  │   - JWT Authentication                            │  │
│  │   - Image Upload (Cloudinary)                     │  │
│  └──────────────┬───────────────────────────────────┘  │
│                 │                                        │
│  ┌──────────────▼───────────────────────────────────┐  │
│  │   PostgreSQL (Base de Datos)                     │  │
│  │   - 13 tablas relacionales                        │  │
│  │   - Artículos, Especies, Usuarios                 │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 🔧 Backend (API)

### Tecnologías
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Base de Datos:** PostgreSQL
- **Autenticación:** JWT (JSON Web Tokens)
- **Upload de Imágenes:** Cloudinary + Sharp
- **Seguridad:** Helmet.js, CORS, Bcrypt

### Estructura del Backend

```
backend/
├── src/
│   ├── server.js              # Servidor Express principal
│   ├── config/
│   │   └── database.js        # Conexión PostgreSQL
│   ├── controllers/
│   │   ├── articles.controller.js    # Endpoints públicos artículos
│   │   ├── species.controller.js     # Endpoints públicos especies
│   │   ├── admin.controller.js       # Endpoints admin (CRUD)
│   │   └── auth.controller.js        # Login, logout
│   ├── models/
│   │   ├── articles.model.js  # Operaciones DB artículos
│   │   └── species.model.js   # Operaciones DB especies
│   ├── middleware/
│   │   ├── auth.js            # Verificar JWT
│   │   └── upload.js          # Multer config
│   ├── routes/
│   │   ├── articles.routes.js
│   │   ├── species.routes.js
│   │   ├── admin.routes.js
│   │   └── auth.routes.js
│   └── utils/
│       ├── cloudinary.js      # Upload imágenes
│       └── jwt.js             # Generar/verificar tokens
└── migrations/
    └── 001_initial_schema.sql # Esquema DB
```

### Endpoints API

#### Públicos (sin autenticación):
```
GET  /api/articles              # Lista artículos publicados
GET  /api/articles/:id          # Artículo por ID
GET  /api/articles/slug/:slug   # Artículo por slug
GET  /api/species               # Lista especies publicadas
GET  /api/species/:id           # Especie por ID
GET  /api/search?q=query        # Búsqueda
```

#### Admin (requiere JWT):
```
POST /api/auth/login            # Login (retorna JWT)
GET  /api/auth/me               # Usuario actual

GET  /api/admin/stats           # Estadísticas dashboard
GET  /api/admin/articles        # Todos los artículos (incluye drafts)
POST /api/admin/articles        # Crear artículo
PUT  /api/admin/articles/:id    # Actualizar artículo
DELETE /api/admin/articles/:id  # Eliminar artículo
POST /api/admin/upload          # Upload imagen a Cloudinary

GET  /api/admin/species         # Todas las especies
POST /api/admin/species         # Crear especie
PUT  /api/admin/species/:id     # Actualizar especie
DELETE /api/admin/species/:id   # Eliminar especie
```

### Autenticación JWT

**Flujo:**
1. Usuario hace POST a `/api/auth/login` con username/password
2. Backend verifica credenciales con bcrypt
3. Si es válido, genera JWT con payload: `{ userId, username, role }`
4. Cliente guarda JWT en localStorage
5. Cada petición a endpoints admin incluye header: `Authorization: Bearer <token>`
6. Middleware `auth.js` verifica token antes de procesar request

**Expiración:** 7 días

---

## 🎨 Frontend (Angular)

### Tecnologías
- **Framework:** Angular 19 (standalone components)
- **Styling:** Tailwind CSS
- **HTTP Client:** HttpClient + RxJS
- **Routing:** Angular Router (path-based, sin hash)
- **State:** BehaviorSubject (auth state)

### Estructura del Frontend

```
src/app/
├── components/           # Componentes reutilizables
│   ├── navbar/
│   ├── footer/
│   ├── blog-feed/       # Feed de artículos
│   └── species-card/    # Tarjeta de especie
├── pages/               # Páginas públicas
│   ├── home/
│   ├── article-detail/
│   ├── all-articles/
│   ├── category/
│   ├── species-list/
│   └── species-detail/
├── admin/               # Admin Panel (explicado abajo)
├── services/
│   ├── articles.service.ts     # API calls artículos
│   ├── bird-species.service.ts # API calls especies
│   └── meta.service.ts         # SEO meta tags
├── models/              # Interfaces TypeScript
│   ├── article.interface.ts
│   └── bird-species.interface.ts
├── app.routes.ts        # Configuración rutas
└── app.config.ts        # Config app (providers)
```

### Servicios

**ArticlesService:**
```typescript
getAllArticles(): Observable<Article[]>
getArticleById(id: number): Observable<Article>
getFeaturedArticles(limit: number): Observable<Article[]>
getArticlesByCategory(category: string): Observable<Article[]>
getRelatedArticles(id: number, limit: number): Observable<Article[]>
```

**BirdSpeciesService:**
```typescript
getAllSpecies(): Observable<BirdSpecies[]>
getSpeciesById(id: string): Observable<BirdSpecies>
```

### Flujo de Navegación

```
Usuario visita /
    ↓
HomeComponent se carga
    ↓
Llama articlesService.getFeaturedArticles(6)
    ↓
HTTP GET /api/articles?published=true&limit=6
    ↓
Backend retorna artículos
    ↓
Componente muestra artículos en el template
```

---

## 🔐 Admin Panel

Panel de administración completo para gestionar contenido dinámicamente.

### Estructura

```
src/app/admin/
├── services/
│   ├── admin-auth.service.ts   # Login, logout, JWT management
│   └── admin-api.service.ts    # CRUD operations
├── guards/
│   └── auth.guard.ts           # Protege rutas admin
├── interceptors/
│   └── auth.interceptor.ts     # Agrega JWT a requests
├── components/
│   ├── login/                  # Página de login
│   ├── admin-layout/           # Layout con sidebar
│   ├── dashboard/              # Dashboard con stats
│   ├── article-list/           # Tabla de artículos
│   ├── article-editor/         # Editor con TinyMCE
│   ├── species-list/           # Lista de especies
│   └── species-editor/         # Editor de especies
└── admin.routes.ts             # Rutas /admin/*
```

### Rutas Admin

```
/admin/login              → Login (público)
/admin/dashboard          → Dashboard (protegido)
/admin/articles           → Lista artículos (protegido)
/admin/articles/new       → Crear artículo (protegido)
/admin/articles/:id/edit  → Editar artículo (protegido)
/admin/species            → Lista especies (protegido)
/admin/species/new        → Crear especie (protegido)
/admin/species/:id/edit   → Editar especie (protegido)
```

### Flujo de Autenticación Admin

```
1. Usuario visita /admin/dashboard
     ↓
2. Auth Guard verifica si tiene token JWT válido
     ↓
   NO → Redirige a /admin/login
     ↓
3. Usuario ingresa username/password
     ↓
4. POST /api/auth/login
     ↓
5. Backend verifica credenciales y retorna JWT
     ↓
6. AdminAuthService guarda JWT en localStorage
     ↓
7. Redirige a /admin/dashboard
     ↓
8. Todas las peticiones incluyen JWT automáticamente
   (gracias al HTTP Interceptor)
```

### TinyMCE Editor

Editor WYSIWYG integrado para artículos:

**Características:**
- 16 plugins (listas, links, imágenes, tablas, código, etc.)
- Toolbar completa con formato, alineación, colores
- Vista de código HTML
- Pantalla completa
- Contador de palabras
- Altura: 500px

**Configuración:**
```typescript
tinymceInit = {
  base_url: '/tinymce',
  height: 500,
  plugins: ['advlist', 'autolink', 'lists', 'link', ...],
  toolbar: 'undo redo | formatselect | bold italic ...',
  branding: false  // Sin marca TinyMCE
}
```

---

## 🚀 Server-Side Rendering (SSR)

### ¿Qué es SSR?

**Sin SSR (CSR - Client-Side Rendering):**
```
1. Browser pide index.html
2. Servidor envía HTML vacío + bundle.js
3. Browser descarga y ejecuta JavaScript
4. App se renderiza en el browser
5. Browser hace API calls
6. Contenido final se muestra

❌ Problemas:
- SEO pobre (bots ven HTML vacío)
- Tiempo de carga inicial lento
- No funciona sin JavaScript
```

**Con SSR (Server-Side Rendering):**
```
1. Browser pide /articulo/123
2. Servidor de Node.js:
   a. Ejecuta Angular en el servidor
   b. Hace API calls internos
   c. Renderiza HTML completo
3. Servidor envía HTML pre-renderizado
4. Browser muestra contenido inmediatamente
5. Angular se "hidrata" (toma control)

✅ Beneficios:
- SEO excelente (bots ven HTML completo)
- Tiempo de First Contentful Paint más rápido
- Funciona sin JavaScript (contenido inicial)
```

### Arquitectura SSR

```
┌─────────────────────────────────────────┐
│  Browser request: /articulo/mi-canario  │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  Express Server (server.ts)             │
│  Puerto: 4000                            │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  Angular Universal                       │
│  - Ejecuta Angular en Node.js            │
│  - Renderiza componentes a HTML          │
│  - Hace API calls al backend             │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  HTML completo + datos                   │
│  Enviado al browser                      │
└──────────────────────────────────────────┘
```

### Archivos SSR

```
server.ts                  # Servidor Express para SSR
src/main.server.ts         # Bootstrap server
src/app/app.config.server.ts  # Config server
tsconfig.server.json       # TypeScript config server
```

### Scripts SSR

```bash
npm run dev:ssr        # Desarrollo con SSR (port 4200)
npm run build:ssr      # Build browser + server
npm run serve:ssr      # Servir app SSR (port 4000)
npm run prerender      # Pre-renderizar rutas estáticas
```

---

## 📊 Flujo de Datos Completo

### Ejemplo: Crear un Artículo

```
┌──────────────────┐
│ Admin Panel      │
│ /admin/articles/ │
│ new              │
└────────┬─────────┘
         │ 1. Usuario llena formulario
         │    - Título, contenido (TinyMCE)
         │    - Upload imagen
         │    - Tags, fuentes
         │
┌────────▼─────────┐
│ Article Editor   │
│ Component        │
└────────┬─────────┘
         │ 2. onSubmit()
         │
┌────────▼─────────┐
│ AdminApiService  │
│ createArticle()  │
└────────┬─────────┘
         │ 3. POST /api/admin/articles
         │    Headers: { Authorization: Bearer <JWT> }
         │    Body: { title, content, ... }
         │
┌────────▼─────────┐
│ Auth Interceptor │
│ Agrega JWT       │
└────────┬─────────┘
         │ 4. HTTP Request con token
         │
┌────────▼─────────┐
│ Backend Express  │
│ /admin/articles  │
└────────┬─────────┘
         │ 5. Auth Middleware
         │    - Verifica JWT
         │    - Extrae userId
         │
┌────────▼─────────┐
│ Admin Controller │
│ createArticle()  │
└────────┬─────────┘
         │ 6. Validaciones
         │
┌────────▼─────────┐
│ Articles Model   │
│ createArticle()  │
└────────┬─────────┘
         │ 7. INSERT INTO articles ...
         │
┌────────▼─────────┐
│ PostgreSQL       │
│ Database         │
└────────┬─────────┘
         │ 8. Retorna artículo creado
         │
         │ 9. Response: { success: true, data: article }
         │
┌────────▼─────────┐
│ Frontend         │
│ Redirige a       │
│ /admin/articles  │
└──────────────────┘
```

---

## 📦 Base de Datos PostgreSQL

### Esquema (13 tablas)

```sql
-- Usuarios administradores
admin_users (
  id, username, email, password_hash,
  role, active, created_at, updated_at
)

-- Artículos del blog
articles (
  id, title, slug, excerpt, content,
  category, date, read_time, image_url,
  image_public_id, author, published,
  created_at, updated_at
)

-- Tags de artículos
article_tags (
  id, article_id, tag
)

-- Fuentes de artículos
article_sources (
  id, article_id, source_name, source_url
)

-- Especies de aves
bird_species (
  id, common_name, scientific_name,
  description, image_url, image_public_id,
  published, created_at, updated_at
)

-- Detalles de especies (9 tablas):
species_characteristics
species_care
species_health
species_breeding
species_behavior
species_habitat
species_compatibility
species_tips
```

### Relaciones

```
admin_users
    ↓ (1:N - via author field)
articles
    ↓ (1:N)
article_tags
article_sources

bird_species
    ↓ (1:1 para cada tabla)
species_characteristics
species_care
species_health
...
```

---

## 🚢 Deployment

### Desarrollo Local

```bash
# Terminal 1 - Backend
cd backend
npm run dev          # Port 3000

# Terminal 2 - Frontend
ng serve             # Port 4200
# O con SSR:
npm run dev:ssr      # Port 4200
```

### Producción (Render.com)

**Estructura:**
```
Render.com
├── Web Service (Node.js)
│   - Sirve SSR en port dinámico
│   - Build: npm run build:ssr
│   - Start: npm run serve:ssr
│
├── PostgreSQL Database
│   - Plan: Free (90 días) o Paid
│   - Provee DATABASE_URL
│
└── Environment Variables
    - DATABASE_URL (auto)
    - JWT_SECRET (generar)
    - CLOUDINARY_* (configurar)
```

**render.yaml** (Blueprint):
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
      - key: CLOUDINARY_API_KEY
      - key: CLOUDINARY_API_SECRET

databases:
  - name: bird-care-db
    databaseName: bird_care
    plan: free
```

---

## 🔄 Ciclo de Vida de la Aplicación

### Primera Carga (con SSR)

```
1. Usuario visita http://entrealas.com/
     ↓
2. Request llega a servidor Node.js (port 4000)
     ↓
3. Angular Universal en servidor:
   - Bootstrap Angular app
   - Ejecuta HomeComponent
   - Hace fetch a /api/articles internamente
   - Renderiza HTML completo
     ↓
4. Servidor envía HTML + inline CSS + datos
     ↓
5. Browser muestra contenido inmediatamente (FCP)
     ↓
6. Browser descarga bundles JavaScript
     ↓
7. Angular se "hidrata" (toma control del DOM)
     ↓
8. App se convierte en SPA (Single Page App)
     ↓
9. Navegación subsecuente es client-side (sin reload)
```

### Navegación Client-Side (después de hidratación)

```
Usuario click en artículo
     ↓
Router de Angular navega a /articulo/:id
     ↓
ArticleDetailComponent se carga
     ↓
ngOnInit() llama articlesService.getArticleById(id)
     ↓
HTTP GET /api/articles/:id
     ↓
Backend retorna artículo
     ↓
Componente actualiza template
     ↓
NO hay page reload (SPA)
```

---

## 🎯 Resumen de Tecnologías

| Capa | Tecnología | Propósito |
|------|-----------|-----------|
| **Backend** | Node.js + Express | Servidor API REST |
| **Base de Datos** | PostgreSQL | Almacenamiento persistente |
| **Auth** | JWT + Bcrypt | Autenticación segura |
| **Storage** | Cloudinary | Almacenar imágenes |
| **Frontend** | Angular 19 | UI/UX framework |
| **Styling** | Tailwind CSS | Diseño responsive |
| **HTTP** | RxJS + HttpClient | Manejo de API calls |
| **Editor** | TinyMCE | Editor WYSIWYG |
| **SSR** | Angular Universal | Renderizado servidor |
| **Deployment** | Render.com | Hosting + Database |

---

## 📈 Métricas de Rendimiento

### Sin SSR (CSR):
- **FCP (First Contentful Paint):** ~2.5s
- **LCP (Largest Contentful Paint):** ~3.5s
- **TTI (Time to Interactive):** ~4s
- **SEO Score:** 60/100

### Con SSR:
- **FCP:** ~0.8s ✅ (68% más rápido)
- **LCP:** ~1.2s ✅ (66% más rápido)
- **TTI:** ~2.5s ✅ (37% más rápido)
- **SEO Score:** 95/100 ✅

---

## 🔒 Seguridad

### Implementaciones:
- ✅ **Passwords hasheados** con bcrypt (10 rounds)
- ✅ **JWT con expiración** (7 días)
- ✅ **CORS configurado** (solo origins permitidos)
- ✅ **Helmet.js** activo (headers de seguridad)
- ✅ **Prepared statements** (previene SQL injection)
- ✅ **Validación de input** en backend
- ✅ **Auth guards** en frontend
- ✅ **HTTPS** en producción (Render.com)

### Pendientes:
- ⏳ Rate limiting (protección DDoS)
- ⏳ Input sanitization en admin panel
- ⏳ CSP (Content Security Policy)

---

## 📝 Conclusión

La aplicación **Entre Alas** es una aplicación web full-stack moderna que combina:

1. **Backend robusto** con API RESTful
2. **Frontend dinámico** con Angular 19
3. **Admin Panel completo** con autenticación JWT
4. **SSR para SEO** y rendimiento
5. **Base de datos relacional** con PostgreSQL
6. **Editor profesional** con TinyMCE

**Arquitectura:** Separación clara entre capas, fácil de mantener y escalar

**Deployment:** Una sola configuración en Render.com despliega todo

---

**Última actualización:** Febrero 2026
**Versión:** 1.0.0
**Stack:** PEAN (PostgreSQL + Express + Angular + Node.js)
