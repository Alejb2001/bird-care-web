const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { testConnection } = require('./config/database');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet());

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.FRONTEND_URL || 'https://bird-care-blog.onrender.com']
  : ['http://localhost:4200', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin (como apps móviles o curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'La política CORS no permite acceso desde este origen.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware (simple)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/articles', require('./routes/articles.routes'));
app.use('/api/species', require('./routes/species.routes'));
app.use('/api/search', require('./routes/search.routes'));
app.use('/api/categories', async (req, res, next) => {
  try {
    const ArticlesModel = require('./models/articles.model');
    const categories = await ArticlesModel.getCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
});
app.use('/api/tags', async (req, res, next) => {
  try {
    const ArticlesModel = require('./models/articles.model');
    const tags = await ArticlesModel.getTags();
    res.json({ success: true, data: tags });
  } catch (error) {
    next(error);
  }
});

// Auth and Admin routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/admin/upload', require('./routes/upload.routes'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Bird Care Blog API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      articles: '/api/articles',
      species: '/api/species',
      auth: '/api/auth/login'
    }
  });
});

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Iniciar servidor
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();

    if (!dbConnected) {
      console.warn('⚠️  Servidor iniciando sin conexión a base de datos');
      console.warn('⚠️  Verifica tu configuración DATABASE_URL en .env');
    }

    app.listen(PORT, () => {
      console.log('\n' + '='.repeat(50));
      console.log(`🚀 Servidor Express corriendo en puerto ${PORT}`);
      console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
      console.log('='.repeat(50) + '\n');
    });
  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  }
};

// Manejo de señales de terminación
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM recibido, cerrando servidor gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n👋 SIGINT recibido, cerrando servidor gracefully...');
  process.exit(0);
});

startServer();

module.exports = app;
