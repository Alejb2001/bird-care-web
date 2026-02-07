const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Subir imagen a Cloudinary
 * @param {Buffer} fileBuffer - Buffer de la imagen
 * @param {Object} options - Opciones de subida
 * @returns {Promise<Object>} Resultado con url y public_id
 */
async function uploadImage(fileBuffer, options = {}) {
  const {
    folder = 'bird-care-blog',
    width = 1200,
    height = 800,
    quality = 85
  } = options;

  try {
    // Optimizar imagen con Sharp
    const optimizedBuffer = await sharp(fileBuffer)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality })
      .toBuffer();

    // Subir a Cloudinary
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
          format: 'webp'
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              width: result.width,
              height: result.height,
              format: result.format,
              bytes: result.bytes
            });
          }
        }
      );

      uploadStream.end(optimizedBuffer);
    });

  } catch (error) {
    console.error('Error procesando/subiendo imagen:', error);
    throw new Error('Error al procesar la imagen');
  }
}

/**
 * Eliminar imagen de Cloudinary
 * @param {string} publicId - Public ID de la imagen en Cloudinary
 * @returns {Promise<Object>} Resultado de la eliminación
 */
async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error eliminando imagen:', error);
    throw new Error('Error al eliminar la imagen');
  }
}

/**
 * Obtener información de una imagen
 * @param {string} publicId - Public ID de la imagen
 * @returns {Promise<Object>} Información de la imagen
 */
async function getImageInfo(publicId) {
  try {
    const result = await cloudinary.api.resource(publicId);
    return result;
  } catch (error) {
    console.error('Error obteniendo info de imagen:', error);
    throw new Error('Error al obtener información de la imagen');
  }
}

module.exports = {
  uploadImage,
  deleteImage,
  getImageInfo,
  cloudinary
};
