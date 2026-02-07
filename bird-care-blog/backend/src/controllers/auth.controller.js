const bcrypt = require('bcrypt');
const { query } = require('../models/db');
const { generateToken } = require('../utils/jwt');

/**
 * Controlador de autenticación
 */
class AuthController {
  /**
   * POST /api/auth/login
   * Login de usuario administrador
   */
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      // Validación
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          error: 'Usuario y contraseña son requeridos'
        });
      }

      // Buscar usuario
      const result = await query(
        'SELECT * FROM admin_users WHERE (username = $1 OR email = $1) AND active = true',
        [username]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({
          success: false,
          error: 'Credenciales inválidas'
        });
      }

      const user = result.rows[0];

      // Verificar contraseña
      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          error: 'Credenciales inválidas'
        });
      }

      // Actualizar último login
      await query(
        'UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
        [user.id]
      );

      // Generar token JWT
      const token = generateToken({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      });

      res.json({
        success: true,
        data: {
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          }
        }
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/auth/me
   * Obtener información del usuario actual
   */
  static async me(req, res, next) {
    try {
      const userId = req.user.id;

      const result = await query(
        'SELECT id, username, email, role, created_at, last_login FROM admin_users WHERE id = $1',
        [userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Usuario no encontrado'
        });
      }

      res.json({
        success: true,
        data: result.rows[0]
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/auth/logout
   * Logout (en un sistema JWT stateless, esto se maneja principalmente en el cliente)
   */
  static async logout(req, res) {
    // En un sistema JWT puro, el logout se maneja en el cliente eliminando el token
    // Aquí podríamos implementar blacklist de tokens si fuera necesario

    res.json({
      success: true,
      message: 'Logout exitoso'
    });
  }
}

module.exports = AuthController;
