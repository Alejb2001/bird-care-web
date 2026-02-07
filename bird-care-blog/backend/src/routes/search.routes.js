const express = require('express');
const router = express.Router();
const ArticlesModel = require('../models/articles.model');
const SpeciesModel = require('../models/species.model');

/**
 * Rutas de búsqueda global
 * Prefijo: /api/search
 */

/**
 * GET /api/search
 * Búsqueda global en artículos y especies
 */
router.get('/', async (req, res, next) => {
  try {
    const { q, limit = 20 } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Parámetro de búsqueda "q" es requerido'
      });
    }

    const searchLimit = Math.floor(parseInt(limit) / 2);

    // Buscar en paralelo
    const [articles, species] = await Promise.all([
      ArticlesModel.searchArticles(q.trim(), searchLimit),
      SpeciesModel.getAllSpecies({ published: true })
    ]);

    // Filtrar especies que coincidan con la búsqueda
    const filteredSpecies = species.filter(s =>
      s.common_name.toLowerCase().includes(q.toLowerCase()) ||
      s.scientific_name.toLowerCase().includes(q.toLowerCase()) ||
      s.description.toLowerCase().includes(q.toLowerCase())
    ).slice(0, searchLimit);

    res.json({
      success: true,
      data: {
        articles: {
          results: articles,
          count: articles.length
        },
        species: {
          results: filteredSpecies,
          count: filteredSpecies.length
        }
      },
      query: q,
      totalResults: articles.length + filteredSpecies.length
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
