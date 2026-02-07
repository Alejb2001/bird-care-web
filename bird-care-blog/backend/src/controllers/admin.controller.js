const ArticlesModel = require('../models/articles.model');
const SpeciesModel = require('../models/species.model');

/**
 * Controlador para endpoints de administración
 */
class AdminController {
  // ==================== ARTÍCULOS ====================

  /**
   * GET /api/admin/articles
   * Obtener todos los artículos (incluyendo drafts)
   */
  static async getAllArticles(req, res, next) {
    try {
      const { limit = 100, offset = 0 } = req.query;

      const articles = await ArticlesModel.getAllArticles({
        published: null, // Incluir tanto publicados como drafts
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({
        success: true,
        data: articles,
        count: articles.length
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/admin/articles
   * Crear nuevo artículo
   */
  static async createArticle(req, res, next) {
    try {
      const articleData = req.body;

      // Validaciones básicas
      if (!articleData.title || !articleData.excerpt || !articleData.content) {
        return res.status(400).json({
          success: false,
          error: 'Título, extracto y contenido son requeridos'
        });
      }

      const article = await ArticlesModel.createArticle(articleData);

      res.status(201).json({
        success: true,
        data: article,
        message: 'Artículo creado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/admin/articles/:id
   * Actualizar artículo
   */
  static async updateArticle(req, res, next) {
    try {
      const { id } = req.params;
      const articleData = req.body;

      const article = await ArticlesModel.updateArticle(parseInt(id), articleData);

      if (!article) {
        return res.status(404).json({
          success: false,
          error: 'Artículo no encontrado'
        });
      }

      res.json({
        success: true,
        data: article,
        message: 'Artículo actualizado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/admin/articles/:id
   * Eliminar artículo
   */
  static async deleteArticle(req, res, next) {
    try {
      const { id } = req.params;

      const article = await ArticlesModel.deleteArticle(parseInt(id));

      if (!article) {
        return res.status(404).json({
          success: false,
          error: 'Artículo no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Artículo eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /api/admin/articles/:id/publish
   * Publicar/despublicar artículo
   */
  static async togglePublish(req, res, next) {
    try {
      const { id } = req.params;
      const { published } = req.body;

      const article = await ArticlesModel.updateArticle(parseInt(id), { published });

      res.json({
        success: true,
        data: article,
        message: `Artículo ${published ? 'publicado' : 'despublicado'} exitosamente`
      });
    } catch (error) {
      next(error);
    }
  }

  // ==================== ESPECIES ====================

  /**
   * GET /api/admin/species
   * Obtener todas las especies (incluyendo no publicadas)
   */
  static async getAllSpecies(req, res, next) {
    try {
      const species = await SpeciesModel.getAllSpecies({ published: null });

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
   * POST /api/admin/species
   * Crear nueva especie
   */
  static async createSpecies(req, res, next) {
    try {
      const speciesData = req.body;

      // Validaciones básicas
      if (!speciesData.id || !speciesData.commonName || !speciesData.scientificName) {
        return res.status(400).json({
          success: false,
          error: 'ID, nombre común y nombre científico son requeridos'
        });
      }

      const species = await SpeciesModel.createSpecies(speciesData);

      res.status(201).json({
        success: true,
        data: species,
        message: 'Especie creada exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/admin/species/:id
   * Actualizar especie
   */
  static async updateSpecies(req, res, next) {
    try {
      const { id } = req.params;
      const speciesData = req.body;

      const species = await SpeciesModel.updateSpecies(id, speciesData);

      if (!species) {
        return res.status(404).json({
          success: false,
          error: 'Especie no encontrada'
        });
      }

      res.json({
        success: true,
        data: species,
        message: 'Especie actualizada exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/admin/species/:id
   * Eliminar especie
   */
  static async deleteSpecies(req, res, next) {
    try {
      const { id } = req.params;

      const species = await SpeciesModel.deleteSpecies(id);

      if (!species) {
        return res.status(404).json({
          success: false,
          error: 'Especie no encontrada'
        });
      }

      res.json({
        success: true,
        message: 'Especie eliminada exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  // ==================== ESTADÍSTICAS ====================

  /**
   * GET /api/admin/stats
   * Obtener estadísticas del dashboard
   */
  static async getStats(req, res, next) {
    try {
      const { query } = require('../models/db');

      const [articlesCount, speciesCount, totalViews] = await Promise.all([
        query('SELECT COUNT(*) as count, COUNT(*) FILTER (WHERE published = true) as published FROM articles'),
        query('SELECT COUNT(*) as count, COUNT(*) FILTER (WHERE published = true) as published FROM bird_species'),
        query('SELECT COALESCE(SUM(views), 0) as total FROM articles')
      ]);

      res.json({
        success: true,
        data: {
          articles: {
            total: parseInt(articlesCount.rows[0].count),
            published: parseInt(articlesCount.rows[0].published)
          },
          species: {
            total: parseInt(speciesCount.rows[0].count),
            published: parseInt(speciesCount.rows[0].published)
          },
          totalViews: parseInt(totalViews.rows[0].total)
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminController;
