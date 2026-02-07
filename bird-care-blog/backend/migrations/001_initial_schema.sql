-- ============================================================================
-- BIRD CARE BLOG - DATABASE SCHEMA
-- ============================================================================
-- Descripción: Schema completo para el blog "Entre Alas"
-- Versión: 1.0
-- Fecha: 2026-02-07
-- ============================================================================

-- Eliminar tablas existentes si existen (para desarrollo)
DROP TABLE IF EXISTS species_tips CASCADE;
DROP TABLE IF EXISTS species_compatibility CASCADE;
DROP TABLE IF EXISTS species_habitat CASCADE;
DROP TABLE IF EXISTS species_behavior CASCADE;
DROP TABLE IF EXISTS species_breeding CASCADE;
DROP TABLE IF EXISTS species_health CASCADE;
DROP TABLE IF EXISTS species_care CASCADE;
DROP TABLE IF EXISTS species_characteristics CASCADE;
DROP TABLE IF EXISTS bird_species CASCADE;
DROP TABLE IF EXISTS article_tags CASCADE;
DROP TABLE IF EXISTS article_sources CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- ============================================================================
-- ARTÍCULOS
-- ============================================================================

-- Tabla principal de artículos
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    read_time VARCHAR(20),
    image_url VARCHAR(500),
    image_public_id VARCHAR(255),  -- Para eliminar de Cloudinary
    author VARCHAR(255),
    published BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fuentes/Referencias de artículos
CREATE TABLE article_sources (
    id SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    name VARCHAR(500) NOT NULL,
    url VARCHAR(1000),
    order_index INTEGER DEFAULT 0
);

-- Tags/Etiquetas de artículos
CREATE TABLE article_tags (
    id SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    tag VARCHAR(100) NOT NULL,
    UNIQUE(article_id, tag)
);

-- ============================================================================
-- ESPECIES DE AVES
-- ============================================================================

-- Tabla principal de especies
CREATE TABLE bird_species (
    id VARCHAR(100) PRIMARY KEY,  -- Slug: 'periquito-australiano'
    common_name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    image_public_id VARCHAR(255),
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Características físicas
CREATE TABLE species_characteristics (
    species_id VARCHAR(100) PRIMARY KEY REFERENCES bird_species(id) ON DELETE CASCADE,
    size VARCHAR(255),
    weight VARCHAR(255),
    lifespan VARCHAR(255),
    temperament JSONB,  -- Array de strings
    colors JSONB        -- Array de strings
);

-- Cuidados y necesidades
CREATE TABLE species_care (
    species_id VARCHAR(100) PRIMARY KEY REFERENCES bird_species(id) ON DELETE CASCADE,
    diet_basic TEXT,
    diet_details JSONB,    -- Array de strings
    cage_size TEXT,
    temperature VARCHAR(100),
    humidity VARCHAR(100),
    social_needs TEXT
);

-- Información de salud
CREATE TABLE species_health (
    species_id VARCHAR(100) PRIMARY KEY REFERENCES bird_species(id) ON DELETE CASCADE,
    common_issues JSONB,      -- Array de strings
    preventive_care JSONB,    -- Array de strings
    veterinary_visits TEXT
);

-- Información de cría
CREATE TABLE species_breeding (
    species_id VARCHAR(100) PRIMARY KEY REFERENCES bird_species(id) ON DELETE CASCADE,
    maturity_age VARCHAR(255),
    breeding_season VARCHAR(255),
    clutch_size VARCHAR(255),
    incubation_period VARCHAR(255)
);

-- Comportamiento
CREATE TABLE species_behavior (
    species_id VARCHAR(100) PRIMARY KEY REFERENCES bird_species(id) ON DELETE CASCADE,
    vocal_level INTEGER CHECK(vocal_level BETWEEN 1 AND 5),
    activity_level INTEGER CHECK(activity_level BETWEEN 1 AND 5),
    sociability INTEGER CHECK(sociability BETWEEN 1 AND 5),
    trainability INTEGER CHECK(trainability BETWEEN 1 AND 5),
    notes JSONB  -- Array de strings
);

-- Hábitat
CREATE TABLE species_habitat (
    species_id VARCHAR(100) PRIMARY KEY REFERENCES bird_species(id) ON DELETE CASCADE,
    origin TEXT,
    natural_habitat TEXT,
    cage_requirements JSONB,  -- Array de strings
    enrichment JSONB          -- Array de strings
);

-- Compatibilidad
CREATE TABLE species_compatibility (
    species_id VARCHAR(100) PRIMARY KEY REFERENCES bird_species(id) ON DELETE CASCADE,
    with_own_species TEXT,
    with_other_species TEXT,
    with_children TEXT
);

-- Tips/Consejos
CREATE TABLE species_tips (
    id SERIAL PRIMARY KEY,
    species_id VARCHAR(100) NOT NULL REFERENCES bird_species(id) ON DELETE CASCADE,
    tip TEXT NOT NULL,
    order_index INTEGER DEFAULT 0
);

-- ============================================================================
-- USUARIOS ADMINISTRADORES
-- ============================================================================

CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'editor',  -- 'admin' o 'editor'
    active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================================================

-- Índices para artículos
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_published ON articles(published);
CREATE INDEX idx_articles_date ON articles(date DESC);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_created_at ON articles(created_at DESC);

-- Índices para tags
CREATE INDEX idx_article_tags_tag ON article_tags(tag);
CREATE INDEX idx_article_tags_article_id ON article_tags(article_id);

-- Índices para especies
CREATE INDEX idx_bird_species_published ON bird_species(published);
CREATE INDEX idx_bird_species_common_name ON bird_species(common_name);

-- Índices para usuarios admin
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_username ON admin_users(username);

-- ============================================================================
-- FUNCIONES Y TRIGGERS
-- ============================================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para articles
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para bird_species
CREATE TRIGGER update_bird_species_updated_at BEFORE UPDATE ON bird_species
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para admin_users
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- DATOS INICIALES
-- ============================================================================

-- Comentario: Los datos se insertarán mediante scripts de seed separados:
-- - 002_seed_articles.js
-- - 003_seed_species.js
-- - 004_create_admin_user.js

-- ============================================================================
-- FIN DEL SCHEMA
-- ============================================================================

-- Verificación rápida
SELECT 'Schema creado exitosamente!' as status;
SELECT 'Tablas creadas: ' || count(*) as tablas_count
FROM information_schema.tables
WHERE table_schema = 'public';
