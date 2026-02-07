const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

/**
 * Rutas de administración
 * Prefijo: /api/admin
 * Todas las rutas requieren autenticación y rol de admin/editor
 */

// Aplicar autenticación a todas las rutas admin
router.use(authenticateToken);
router.use(requireAdmin);

// ==================== ARTÍCULOS ====================

// GET /api/admin/articles - Lista de todos los artículos
router.get('/articles', AdminController.getAllArticles);

// POST /api/admin/articles - Crear artículo
router.post('/articles', AdminController.createArticle);

// PUT /api/admin/articles/:id - Actualizar artículo
router.put('/articles/:id', AdminController.updateArticle);

// DELETE /api/admin/articles/:id - Eliminar artículo
router.delete('/articles/:id', AdminController.deleteArticle);

// PATCH /api/admin/articles/:id/publish - Publicar/despublicar
router.patch('/articles/:id/publish', AdminController.togglePublish);

// ==================== ESPECIES ====================

// GET /api/admin/species - Lista de todas las especies
router.get('/species', AdminController.getAllSpecies);

// POST /api/admin/species - Crear especie
router.post('/species', AdminController.createSpecies);

// PUT /api/admin/species/:id - Actualizar especie
router.put('/species/:id', AdminController.updateSpecies);

// DELETE /api/admin/species/:id - Eliminar especie
router.delete('/species/:id', AdminController.deleteSpecies);

// ==================== ESTADÍSTICAS ====================

// GET /api/admin/stats - Estadísticas del dashboard
router.get('/stats', AdminController.getStats);

module.exports = router;
