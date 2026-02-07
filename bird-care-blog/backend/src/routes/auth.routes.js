const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { authenticateToken } = require('../middleware/auth');

/**
 * Rutas de autenticación
 * Prefijo: /api/auth
 */

// POST /api/auth/login - Login
router.post('/login', AuthController.login);

// GET /api/auth/me - Usuario actual (requiere autenticación)
router.get('/me', authenticateToken, AuthController.me);

// POST /api/auth/logout - Logout
router.post('/logout', authenticateToken, AuthController.logout);

module.exports = router;
