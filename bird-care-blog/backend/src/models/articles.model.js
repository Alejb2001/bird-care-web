const { query, getClient } = require('./db');

/**
 * Modelo para gestionar artículos del blog
 */
class ArticlesModel {
  /**
   * Obtener todos los artículos con filtros y paginación
   */
  static async getAllArticles({
    category = null,
    published = true,
    limit = 50,
    offset = 0,
    orderBy = 'date',
    orderDir = 'DESC'
  } = {}) {
    let sql = `
      SELECT
        a.*,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object('name', s.name, 'url', s.url)
          ) FILTER (WHERE s.id IS NOT NULL),
          '[]'
        ) as sources,
        COALESCE(
          json_agg(DISTINCT t.tag) FILTER (WHERE t.tag IS NOT NULL),
          '[]'
        ) as tags
      FROM articles a
      LEFT JOIN article_sources s ON a.id = s.article_id
      LEFT JOIN article_tags t ON a.id = t.article_id
      WHERE 1=1
    `;

    const params = [];
    let paramCount = 1;

    if (published !== null) {
      sql += ` AND a.published = $${paramCount}`;
      params.push(published);
      paramCount++;
    }

    if (category) {
      sql += ` AND a.category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    sql += `
      GROUP BY a.id
      ORDER BY a.${orderBy} ${orderDir}
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;
    params.push(limit, offset);

    const result = await query(sql, params);
    return result.rows;
  }

  /**
   * Obtener artículo por ID
   */
  static async getArticleById(id) {
    const sql = `
      SELECT
        a.*,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object('name', s.name, 'url', s.url)
            ORDER BY s.order_index
          ) FILTER (WHERE s.id IS NOT NULL),
          '[]'
        ) as sources,
        COALESCE(
          json_agg(DISTINCT t.tag) FILTER (WHERE t.tag IS NOT NULL),
          '[]'
        ) as tags
      FROM articles a
      LEFT JOIN article_sources s ON a.id = s.article_id
      LEFT JOIN article_tags t ON a.id = t.article_id
      WHERE a.id = $1
      GROUP BY a.id
    `;

    const result = await query(sql, [id]);
    return result.rows[0] || null;
  }

  /**
   * Obtener artículo por slug
   */
  static async getArticleBySlug(slug) {
    const sql = `
      SELECT
        a.*,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object('name', s.name, 'url', s.url)
            ORDER BY s.order_index
          ) FILTER (WHERE s.id IS NOT NULL),
          '[]'
        ) as sources,
        COALESCE(
          json_agg(DISTINCT t.tag) FILTER (WHERE t.tag IS NOT NULL),
          '[]'
        ) as tags
      FROM articles a
      LEFT JOIN article_sources s ON a.id = s.article_id
      LEFT JOIN article_tags t ON a.id = t.article_id
      WHERE a.slug = $1
      GROUP BY a.id
    `;

    const result = await query(sql, [slug]);
    return result.rows[0] || null;
  }

  /**
   * Obtener artículos por categoría
   */
  static async getArticlesByCategory(category, limit = 10) {
    return this.getAllArticles({ category, published: true, limit });
  }

  /**
   * Obtener artículos relacionados (misma categoría, excluyendo el actual)
   */
  static async getRelatedArticles(articleId, limit = 3) {
    const sql = `
      SELECT a.id, a.title, a.slug, a.excerpt, a.category, a.image_url, a.date
      FROM articles a
      WHERE a.published = true
        AND a.id != $1
        AND a.category = (SELECT category FROM articles WHERE id = $1)
      ORDER BY a.date DESC
      LIMIT $2
    `;

    const result = await query(sql, [articleId, limit]);
    return result.rows;
  }

  /**
   * Buscar artículos por texto
   */
  static async searchArticles(searchQuery, limit = 20) {
    const sql = `
      SELECT DISTINCT a.id, a.title, a.slug, a.excerpt, a.category, a.image_url, a.date
      FROM articles a
      LEFT JOIN article_tags t ON a.id = t.article_id
      WHERE a.published = true
        AND (
          a.title ILIKE $1 OR
          a.excerpt ILIKE $1 OR
          a.content ILIKE $1 OR
          t.tag ILIKE $1
        )
      ORDER BY a.date DESC
      LIMIT $2
    `;

    const result = await query(sql, [`%${searchQuery}%`, limit]);
    return result.rows;
  }

  /**
   * Crear nuevo artículo
   */
  static async createArticle(articleData) {
    const client = await getClient();

    try {
      await client.query('BEGIN');

      // Insertar artículo
      const articleSql = `
        INSERT INTO articles (
          title, slug, excerpt, content, category, date, read_time,
          image_url, image_public_id, author, published
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `;

      const articleResult = await client.query(articleSql, [
        articleData.title,
        articleData.slug,
        articleData.excerpt,
        articleData.content,
        articleData.category,
        articleData.date || new Date().toISOString().split('T')[0],
        articleData.readTime,
        articleData.imageUrl,
        articleData.imagePublicId,
        articleData.author,
        articleData.published || false
      ]);

      const article = articleResult.rows[0];

      // Insertar fuentes
      if (articleData.sources && articleData.sources.length > 0) {
        for (let i = 0; i < articleData.sources.length; i++) {
          const source = articleData.sources[i];
          await client.query(
            'INSERT INTO article_sources (article_id, name, url, order_index) VALUES ($1, $2, $3, $4)',
            [article.id, source.name, source.url, i]
          );
        }
      }

      // Insertar tags
      if (articleData.tags && articleData.tags.length > 0) {
        for (const tag of articleData.tags) {
          await client.query(
            'INSERT INTO article_tags (article_id, tag) VALUES ($1, $2)',
            [article.id, tag]
          );
        }
      }

      await client.query('COMMIT');

      // Retornar artículo completo
      return await this.getArticleById(article.id);

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Actualizar artículo
   */
  static async updateArticle(id, articleData) {
    const client = await getClient();

    try {
      await client.query('BEGIN');

      // Actualizar artículo
      const updateFields = [];
      const params = [];
      let paramCount = 1;

      const allowedFields = [
        'title', 'slug', 'excerpt', 'content', 'category', 'date',
        'read_time', 'image_url', 'image_public_id', 'author', 'published'
      ];

      const fieldMap = {
        readTime: 'read_time',
        imageUrl: 'image_url',
        imagePublicId: 'image_public_id'
      };

      for (const [key, value] of Object.entries(articleData)) {
        const dbField = fieldMap[key] || key;
        if (allowedFields.includes(dbField) && value !== undefined) {
          updateFields.push(`${dbField} = $${paramCount}`);
          params.push(value);
          paramCount++;
        }
      }

      if (updateFields.length === 0) {
        throw new Error('No hay campos para actualizar');
      }

      params.push(id);
      const sql = `
        UPDATE articles
        SET ${updateFields.join(', ')}
        WHERE id = $${paramCount}
        RETURNING *
      `;

      await client.query(sql, params);

      // Actualizar fuentes si se proporcionan
      if (articleData.sources !== undefined) {
        await client.query('DELETE FROM article_sources WHERE article_id = $1', [id]);

        if (articleData.sources.length > 0) {
          for (let i = 0; i < articleData.sources.length; i++) {
            const source = articleData.sources[i];
            await client.query(
              'INSERT INTO article_sources (article_id, name, url, order_index) VALUES ($1, $2, $3, $4)',
              [id, source.name, source.url, i]
            );
          }
        }
      }

      // Actualizar tags si se proporcionan
      if (articleData.tags !== undefined) {
        await client.query('DELETE FROM article_tags WHERE article_id = $1', [id]);

        if (articleData.tags.length > 0) {
          for (const tag of articleData.tags) {
            await client.query(
              'INSERT INTO article_tags (article_id, tag) VALUES ($1, $2)',
              [id, tag]
            );
          }
        }
      }

      await client.query('COMMIT');

      return await this.getArticleById(id);

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Eliminar artículo
   */
  static async deleteArticle(id) {
    const sql = 'DELETE FROM articles WHERE id = $1 RETURNING *';
    const result = await query(sql, [id]);
    return result.rows[0] || null;
  }

  /**
   * Incrementar vistas de artículo
   */
  static async incrementViews(id) {
    const sql = 'UPDATE articles SET views = views + 1 WHERE id = $1 RETURNING views';
    const result = await query(sql, [id]);
    return result.rows[0]?.views || 0;
  }

  /**
   * Obtener todas las categorías
   */
  static async getCategories() {
    const sql = `
      SELECT
        category,
        COUNT(*) as count
      FROM articles
      WHERE published = true
      GROUP BY category
      ORDER BY category
    `;

    const result = await query(sql);
    return result.rows;
  }

  /**
   * Obtener todos los tags
   */
  static async getTags() {
    const sql = `
      SELECT
        tag,
        COUNT(*) as count
      FROM article_tags t
      JOIN articles a ON t.article_id = a.id
      WHERE a.published = true
      GROUP BY tag
      ORDER BY count DESC, tag
    `;

    const result = await query(sql);
    return result.rows;
  }
}

module.exports = ArticlesModel;
