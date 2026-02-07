const { uploadImage, deleteImage } = require('../utils/cloudinary');

/**
 * Controlador para subida de imágenes
 */
class UploadController {
  /**
   * POST /api/admin/upload
   * Subir imagen a Cloudinary
   */
  static async uploadImage(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No se proporcionó ninguna imagen'
        });
      }

      const { folder = 'bird-care-blog', type = 'articles' } = req.body;

      // Determinar carpeta según tipo
      const targetFolder = `${folder}/${type}`;

      // Subir imagen optimizada
      const result = await uploadImage(req.file.buffer, {
        folder: targetFolder,
        width: 1200,
        height: 800,
        quality: 85
      });

      res.json({
        success: true,
        data: {
          url: result.url,
          publicId: result.publicId,
          width: result.width,
          height: result.height,
          format: result.format,
          size: result.bytes
        },
        message: 'Imagen subida exitosamente'
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/admin/upload/:publicId
   * Eliminar imagen de Cloudinary
   */
  static async deleteImage(req, res, next) {
    try {
      const { publicId } = req.params;

      if (!publicId) {
        return res.status(400).json({
          success: false,
          error: 'Public ID es requerido'
        });
      }

      // Decodificar publicId (viene en formato URL-safe)
      const decodedPublicId = decodeURIComponent(publicId);

      const result = await deleteImage(decodedPublicId);

      if (result.result === 'ok') {
        res.json({
          success: true,
          message: 'Imagen eliminada exitosamente'
        });
      } else {
        res.status(404).json({
          success: false,
          error: 'Imagen no encontrada'
        });
      }

    } catch (error) {
      next(error);
    }
  }
}

module.exports = UploadController;
