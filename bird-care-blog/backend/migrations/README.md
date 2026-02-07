# Migraciones de Base de Datos

Scripts para inicializar y poblar la base de datos PostgreSQL.

## Orden de Ejecución

### 1. Crear Schema
```bash
npm run migrate
```
Ejecuta `001_initial_schema.sql` que crea todas las tablas, índices y triggers.

### 2. Crear Usuario Admin
```bash
node migrations/004_create_admin_user.js
```
Crea el usuario administrador inicial usando credenciales del `.env`.

### 3. Poblar Artículos (Opcional - Fase 5)
```bash
node migrations/002_seed_articles.js
```
Inserta los artículos existentes. Requiere Cloudinary configurado para imágenes.

### 4. Poblar Especies (Opcional - Fase 5)
```bash
node migrations/003_seed_species.js
```
Inserta las especies existentes. Requiere Cloudinary configurado para imágenes.

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `migrate.js` | Ejecuta migraciones SQL en orden |
| `002_seed_articles.js` | Inserta artículos de prueba |
| `003_seed_species.js` | Inserta especies de prueba |
| `004_create_admin_user.js` | Crea usuario administrador |

## Variables de Entorno Requeridas

```env
DATABASE_URL=postgresql://user:password@host:port/database
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure-password
```

## Estructura de Tablas

### Artículos
- `articles` - Tabla principal
- `article_sources` - Referencias bibliográficas
- `article_tags` - Etiquetas/tags

### Especies
- `bird_species` - Tabla principal
- `species_characteristics` - Características físicas
- `species_care` - Cuidados y alimentación
- `species_health` - Información de salud
- `species_breeding` - Reproducción
- `species_behavior` - Comportamiento
- `species_habitat` - Hábitat
- `species_compatibility` - Compatibilidad
- `species_tips` - Consejos

### Administración
- `admin_users` - Usuarios con acceso al panel admin

## Notas

- Los scripts son idempotentes - pueden ejecutarse múltiples veces sin duplicar datos
- Los seeds actuales contienen datos de ejemplo - se completarán con datos reales en Fase 5
- Las imágenes se migrarán a Cloudinary antes del seed final
