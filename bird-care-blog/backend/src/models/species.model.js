const { query, getClient } = require('./db');

/**
 * Modelo para gestionar especies de aves
 */
class SpeciesModel {
  /**
   * Obtener todas las especies con datos completos
   */
  static async getAllSpecies({ published = true } = {}) {
    const sql = `
      SELECT
        s.*,
        row_to_json(sc.*) as characteristics,
        row_to_json(scare.*) as care,
        row_to_json(sh.*) as health,
        row_to_json(sb.*) as breeding,
        row_to_json(sbeh.*) as behavior,
        row_to_json(shab.*) as habitat,
        row_to_json(scomp.*) as compatibility,
        COALESCE(
          json_agg(
            st.tip ORDER BY st.order_index
          ) FILTER (WHERE st.tip IS NOT NULL),
          '[]'
        ) as tips
      FROM bird_species s
      LEFT JOIN species_characteristics sc ON s.id = sc.species_id
      LEFT JOIN species_care scare ON s.id = scare.species_id
      LEFT JOIN species_health sh ON s.id = sh.species_id
      LEFT JOIN species_breeding sb ON s.id = sb.species_id
      LEFT JOIN species_behavior sbeh ON s.id = sbeh.species_id
      LEFT JOIN species_habitat shab ON s.id = shab.species_id
      LEFT JOIN species_compatibility scomp ON s.id = scomp.species_id
      LEFT JOIN species_tips st ON s.id = st.species_id
      WHERE s.published = $1 OR $1 IS NULL
      GROUP BY s.id, sc.species_id, scare.species_id, sh.species_id,
               sb.species_id, sbeh.species_id, shab.species_id, scomp.species_id
      ORDER BY s.common_name
    `;

    const result = await query(sql, [published]);
    return result.rows;
  }

  /**
   * Obtener especie por ID
   */
  static async getSpeciesById(id) {
    const sql = `
      SELECT
        s.*,
        row_to_json(sc.*) as characteristics,
        row_to_json(scare.*) as care,
        row_to_json(sh.*) as health,
        row_to_json(sb.*) as breeding,
        row_to_json(sbeh.*) as behavior,
        row_to_json(shab.*) as habitat,
        row_to_json(scomp.*) as compatibility,
        COALESCE(
          json_agg(
            st.tip ORDER BY st.order_index
          ) FILTER (WHERE st.tip IS NOT NULL),
          '[]'
        ) as tips
      FROM bird_species s
      LEFT JOIN species_characteristics sc ON s.id = sc.species_id
      LEFT JOIN species_care scare ON s.id = scare.species_id
      LEFT JOIN species_health sh ON s.id = sh.species_id
      LEFT JOIN species_breeding sb ON s.id = sb.species_id
      LEFT JOIN species_behavior sbeh ON s.id = sbeh.species_id
      LEFT JOIN species_habitat shab ON s.id = shab.species_id
      LEFT JOIN species_compatibility scomp ON s.id = scomp.species_id
      LEFT JOIN species_tips st ON s.id = st.species_id
      WHERE s.id = $1
      GROUP BY s.id, sc.species_id, scare.species_id, sh.species_id,
               sb.species_id, sbeh.species_id, shab.species_id, scomp.species_id
    `;

    const result = await query(sql, [id]);
    return result.rows[0] || null;
  }

  /**
   * Obtener especies destacadas
   */
  static async getFeaturedSpecies(limit = 4) {
    const species = await this.getAllSpecies({ published: true });
    return species.slice(0, limit);
  }

  /**
   * Crear nueva especie
   */
  static async createSpecies(speciesData) {
    const client = await getClient();

    try {
      await client.query('BEGIN');

      // Insertar especie principal
      const speciesSql = `
        INSERT INTO bird_species (
          id, common_name, scientific_name, description,
          image_url, image_public_id, published
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;

      await client.query(speciesSql, [
        speciesData.id,
        speciesData.commonName,
        speciesData.scientificName,
        speciesData.description,
        speciesData.imageUrl,
        speciesData.imagePublicId,
        speciesData.published || false
      ]);

      // Insertar características
      if (speciesData.characteristics) {
        const char = speciesData.characteristics;
        await client.query(`
          INSERT INTO species_characteristics (
            species_id, size, weight, lifespan, temperament, colors
          ) VALUES ($1, $2, $3, $4, $5, $6)
        `, [
          speciesData.id,
          char.size,
          char.weight,
          char.lifespan,
          JSON.stringify(char.temperament || []),
          JSON.stringify(char.colors || [])
        ]);
      }

      // Insertar cuidados
      if (speciesData.care) {
        const care = speciesData.care;
        await client.query(`
          INSERT INTO species_care (
            species_id, diet_basic, diet_details, cage_size,
            temperature, humidity, social_needs
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [
          speciesData.id,
          care.dietBasic,
          JSON.stringify(care.dietDetails || []),
          care.cageSize,
          care.temperature,
          care.humidity,
          care.socialNeeds
        ]);
      }

      // Insertar salud
      if (speciesData.health) {
        const health = speciesData.health;
        await client.query(`
          INSERT INTO species_health (
            species_id, common_issues, preventive_care, veterinary_visits
          ) VALUES ($1, $2, $3, $4)
        `, [
          speciesData.id,
          JSON.stringify(health.commonIssues || []),
          JSON.stringify(health.preventiveCare || []),
          health.veterinaryVisits
        ]);
      }

      // Insertar breeding
      if (speciesData.breeding) {
        const breeding = speciesData.breeding;
        await client.query(`
          INSERT INTO species_breeding (
            species_id, maturity_age, breeding_season, clutch_size, incubation_period
          ) VALUES ($1, $2, $3, $4, $5)
        `, [
          speciesData.id,
          breeding.maturityAge,
          breeding.breedingSeason,
          breeding.clutchSize,
          breeding.incubationPeriod
        ]);
      }

      // Insertar behavior
      if (speciesData.behavior) {
        const behavior = speciesData.behavior;
        await client.query(`
          INSERT INTO species_behavior (
            species_id, vocal_level, activity_level, sociability,
            trainability, notes
          ) VALUES ($1, $2, $3, $4, $5, $6)
        `, [
          speciesData.id,
          behavior.vocalLevel,
          behavior.activityLevel,
          behavior.sociability,
          behavior.trainability,
          JSON.stringify(behavior.notes || [])
        ]);
      }

      // Insertar habitat
      if (speciesData.habitat) {
        const habitat = speciesData.habitat;
        await client.query(`
          INSERT INTO species_habitat (
            species_id, origin, natural_habitat, cage_requirements, enrichment
          ) VALUES ($1, $2, $3, $4, $5)
        `, [
          speciesData.id,
          habitat.origin,
          habitat.naturalHabitat,
          JSON.stringify(habitat.cageRequirements || []),
          JSON.stringify(habitat.enrichment || [])
        ]);
      }

      // Insertar compatibility
      if (speciesData.compatibility) {
        const compat = speciesData.compatibility;
        await client.query(`
          INSERT INTO species_compatibility (
            species_id, with_own_species, with_other_species, with_children
          ) VALUES ($1, $2, $3, $4)
        `, [
          speciesData.id,
          compat.withOwnSpecies,
          compat.withOtherSpecies,
          compat.withChildren
        ]);
      }

      // Insertar tips
      if (speciesData.tips && speciesData.tips.length > 0) {
        for (let i = 0; i < speciesData.tips.length; i++) {
          await client.query(`
            INSERT INTO species_tips (species_id, tip, order_index)
            VALUES ($1, $2, $3)
          `, [speciesData.id, speciesData.tips[i], i]);
        }
      }

      await client.query('COMMIT');

      return await this.getSpeciesById(speciesData.id);

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Actualizar especie
   */
  static async updateSpecies(id, speciesData) {
    const client = await getClient();

    try {
      await client.query('BEGIN');

      // Actualizar especie principal
      const updateFields = [];
      const params = [];
      let paramCount = 1;

      const fieldMap = {
        commonName: 'common_name',
        scientificName: 'scientific_name',
        imageUrl: 'image_url',
        imagePublicId: 'image_public_id'
      };

      for (const [key, value] of Object.entries(speciesData)) {
        const dbField = fieldMap[key] || key;
        const allowedFields = [
          'common_name', 'scientific_name', 'description',
          'image_url', 'image_public_id', 'published'
        ];

        if (allowedFields.includes(dbField) && value !== undefined) {
          updateFields.push(`${dbField} = $${paramCount}`);
          params.push(value);
          paramCount++;
        }
      }

      if (updateFields.length > 0) {
        params.push(id);
        const sql = `
          UPDATE bird_species
          SET ${updateFields.join(', ')}
          WHERE id = $${paramCount}
        `;
        await client.query(sql, params);
      }

      // Actualizar tablas relacionadas si se proporcionan
      // (Similar al create, pero con UPDATE en lugar de INSERT)
      // ... (código similar al create pero con UPDATEs)

      await client.query('COMMIT');

      return await this.getSpeciesById(id);

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Eliminar especie
   */
  static async deleteSpecies(id) {
    const sql = 'DELETE FROM bird_species WHERE id = $1 RETURNING *';
    const result = await query(sql, [id]);
    return result.rows[0] || null;
  }
}

module.exports = SpeciesModel;
