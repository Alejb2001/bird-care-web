const ArticlesModel = require('../models/articles.model');

/**
 * Controlador para endpoints públicos de artículos
 */
class ArticlesController {
  /**
   * GET /api/articles
   * Obtener todos los artículos publicados con paginación
   */
  static async getAll(req, res, next) {
    try {
      const {
        category,
        limit = 50,
        offset = 0,
        orderBy = 'date',
        orderDir = 'DESC'
      } = req.query;

      const articles = await ArticlesModel.getAllArticles({
        category: category || null,
        published: true,
        limit: parseInt(limit),
        offset: parseInt(offset),
        orderBy,
        orderDir
      });

      res.json({
        success: true,
        data: articles,
        count: articles.length,
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset)
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/articles/:id
   * Obtener artículo por ID
   */
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const article = await ArticlesModel.getArticleById(parseInt(id));

      if (!article) {
        return res.status(404).json({
          success: false,
          error: 'Artículo no encontrado'
        });
      }

      // Incrementar vistas
      await ArticlesModel.incrementViews(parseInt(id));

      res.json({
        success: true,
        data: article
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/articles/slug/:slug
   * Obtener artículo por slug
   */
  static async getBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const article = await ArticlesModel.getArticleBySlug(slug);

      if (!article) {
        return res.status(404).json({
          success: false,
          error: 'Artículo no encontrado'
        });
      }

      // Incrementar vistas
      await ArticlesModel.incrementViews(article.id);

      res.json({
        success: true,
        data: article
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/articles/category/:category
   * Obtener artículos por categoría
   */
  static async getByCategory(req, res, next) {
    try {
      const { category } = req.params;
      const { limit = 10 } = req.query;

      const articles = await ArticlesModel.getArticlesByCategory(
        category,
        parseInt(limit)
      );

      res.json({
        success: true,
        data: articles,
        count: articles.length,
        category
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/articles/:id/related
   * Obtener artículos relacionados
   */
  static async getRelated(req, res, next) {
    try {
      const { id } = req.params;
      const { limit = 3 } = req.query;

      const articles = await ArticlesModel.getRelatedArticles(
        parseInt(id),
        parseInt(limit)
      );

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
   * GET /api/articles/search
   * Buscar artículos por texto
   */
  static async search(req, res, next) {
    try {
      const { q, limit = 20 } = req.query;

      if (!q || q.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Parámetro de búsqueda "q" es requerido'
        });
      }

      const articles = await ArticlesModel.searchArticles(
        q.trim(),
        parseInt(limit)
      );

      res.json({
        success: true,
        data: articles,
        count: articles.length,
        query: q
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/categories
   * Obtener todas las categorías con conteo
   */
  static async getCategories(req, res, next) {
    try {
      const categories = await ArticlesModel.getCategories();

      res.json({
        success: true,
        data: categories,
        count: categories.length
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/tags
   * Obtener todos los tags con conteo
   */
  static async getTags(req, res, next) {
    try {
      const tags = await ArticlesModel.getTags();

      res.json({
        success: true,
        data: tags,
        count: tags.length
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ArticlesController;
