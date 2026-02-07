const express = require('express');
const router = express.Router();
const ArticlesController = require('../controllers/articles.controller');

/**
 * Rutas públicas para artículos
 * Prefijo: /api/articles
 */

// GET /api/articles - Lista de artículos con filtros y paginación
router.get('/', ArticlesController.getAll);

// GET /api/articles/search - Buscar artículos
router.get('/search', ArticlesController.search);

// GET /api/articles/slug/:slug - Obtener artículo por slug
router.get('/slug/:slug', ArticlesController.getBySlug);

// GET /api/articles/category/:category - Filtrar por categoría
router.get('/category/:category', ArticlesController.getByCategory);

// GET /api/articles/:id - Obtener artículo por ID
router.get('/:id', ArticlesController.getById);

// GET /api/articles/:id/related - Artículos relacionados
router.get('/:id/related', ArticlesController.getRelated);

module.exports = router;
