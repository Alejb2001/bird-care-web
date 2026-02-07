// Middleware global para manejo de errores
const errorHandler = (err, req, res, next) => {
  console.error('Error Stack:', err.stack);

  // Error de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Error de validación',
      details: err.message
    });
  }

  // Error de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Token inválido'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Token expirado'
    });
  }

  // Error de base de datos
  if (err.code && err.code.startsWith('23')) {
    // Códigos 23xxx son violaciones de restricciones en PostgreSQL
    return res.status(400).json({
      success: false,
      error: 'Error de integridad de datos',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }

  // Error genérico
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Error interno del servidor',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

// Middleware para rutas no encontradas
const notFound = (req, res, next) => {
  const error = new Error(`No encontrado - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };
