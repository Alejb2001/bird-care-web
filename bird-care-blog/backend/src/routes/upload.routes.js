const express = require('express');
const router = express.Router();
const UploadController = require('../controllers/upload.controller');
const { upload, handleMulterError } = require('../middleware/upload');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

/**
 * Rutas para subida de imágenes
 * Prefijo: /api/admin/upload
 * Todas las rutas requieren autenticación
 */

// Aplicar autenticación
router.use(authenticateToken);
router.use(requireAdmin);

// POST /api/admin/upload - Subir imagen
router.post(
  '/',
  upload.single('image'),
  handleMulterError,
  UploadController.uploadImage
);

// DELETE /api/admin/upload/:publicId - Eliminar imagen
router.delete('/:publicId', UploadController.deleteImage);

module.exports = router;
