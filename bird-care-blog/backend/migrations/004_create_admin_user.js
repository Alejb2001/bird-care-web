const bcrypt = require('bcrypt');
const { query } = require('../src/config/database');
require('dotenv').config();

/**
 * Script para crear usuario administrador inicial
 */

async function createAdminUser() {
  console.log('\n👤 Creando usuario administrador...\n');

  const username = process.env.ADMIN_USERNAME || 'admin';
  const email = process.env.ADMIN_EMAIL || 'admin@entrealas.com';
  const password = process.env.ADMIN_PASSWORD || 'Admin123!';

  try {
    // Verificar si ya existe
    const existing = await query(
      'SELECT * FROM admin_users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existing.rows.length > 0) {
      console.log('⚠️  Usuario administrador ya existe');
      console.log(`   Username: ${existing.rows[0].username}`);
      console.log(`   Email: ${existing.rows[0].email}`);
      console.log('\n💡 Para cambiar la contraseña, usa el script de actualización\n');
      return existing.rows[0];
    }

    // Hash de contraseña
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Crear usuario
    const result = await query(
      `INSERT INTO admin_users (username, email, password_hash, role, active)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, username, email, role, active, created_at`,
      [username, email, passwordHash, 'admin', true]
    );

    const user = result.rows[0];

    console.log('✅ Usuario administrador creado exitosamente!\n');
    console.log('📋 Detalles:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Username: ${user.username}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Created: ${user.created_at}`);
    console.log('\n🔒 Credenciales de acceso:');
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${password}`);
    console.log('\n⚠️  IMPORTANTE: Cambia esta contraseña después del primer login!\n');

    return user;

  } catch (error) {
    console.error('❌ Error creando usuario administrador:', error);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const { pool } = require('../src/config/database');

  createAdminUser()
    .then(() => {
      console.log('✨ Proceso completado');
      return pool.end();
    })
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('💥 Error fatal:', error);
      process.exit(1);
    });
}

module.exports = { createAdminUser };
