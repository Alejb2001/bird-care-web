const SpeciesModel = require('../models/species.model');

/**
 * Controlador para endpoints públicos de especies
 */
class SpeciesController {
  /**
   * GET /api/species
   * Obtener todas las especies publicadas
   */
  static async getAll(req, res, next) {
    try {
      const species = await SpeciesModel.getAllSpecies({ published: true });

      res.json({
        success: true,
        data: species,
        count: species.length
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/species/:id
   * Obtener especie por ID
   */
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const species = await SpeciesModel.getSpeciesById(id);

      if (!species) {
        return res.status(404).json({
          success: false,
          error: 'Especie no encontrada'
        });
      }

      res.json({
        success: true,
        data: species
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/species/featured
   * Obtener especies destacadas
   */
  static async getFeatured(req, res, next) {
    try {
      const { limit = 4 } = req.query;

      const species = await SpeciesModel.getFeaturedSpecies(parseInt(limit));

      res.json({
        success: true,
        data: species,
        count: species.length
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SpeciesController;
