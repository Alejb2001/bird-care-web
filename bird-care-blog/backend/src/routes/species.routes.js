const express = require('express');
const router = express.Router();
const SpeciesController = require('../controllers/species.controller');

/**
 * Rutas públicas para especies
 * Prefijo: /api/species
 */

// GET /api/species - Lista de todas las especies
router.get('/', SpeciesController.getAll);

// GET /api/species/featured - Especies destacadas
router.get('/featured', SpeciesController.getFeatured);

// GET /api/species/:id - Obtener especie por ID
router.get('/:id', SpeciesController.getById);

module.exports = router;
