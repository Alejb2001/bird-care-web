const { verifyToken } = require('../utils/jwt');

/**
 * Middleware para verificar token JWT
 */
function authenticateToken(req, res, next) {
  try {
    // Obtener token del header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Token de autenticación requerido'
      });
    }

    // Verificar token
    const decoded = verifyToken(token);

    // Agregar usuario a request
    req.user = decoded;
    next();

  } catch (error) {
    return res.status(403).json({
      success: false,
      error: 'Token inválido o expirado'
    });
  }
}

/**
 * Middleware para verificar rol de admin
 */
function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Autenticación requerida'
    });
  }

  if (req.user.role !== 'admin' && req.user.role !== 'editor') {
    return res.status(403).json({
      success: false,
      error: 'Acceso denegado - Se requieren permisos de administrador'
    });
  }

  next();
}

/**
 * Middleware para verificar rol específicamente admin (no editor)
 */
function requireSuperAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Autenticación requerida'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Acceso denegado - Se requieren permisos de super administrador'
    });
  }

  next();
}

module.exports = {
  authenticateToken,
  requireAdmin,
  requireSuperAdmin
};
