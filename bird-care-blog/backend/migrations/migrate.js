const fs = require('fs');
const path = require('path');
const { pool } = require('../src/config/database');

const migrations = [
  '001_initial_schema.sql',
  // Agregar más migrations aquí cuando sea necesario
];

async function runMigrations() {
  console.log('\n' + '='.repeat(60));
  console.log('🔧 Iniciando migraciones de base de datos...');
  console.log('='.repeat(60) + '\n');

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (const migration of migrations) {
      const filePath = path.join(__dirname, migration);

      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️  Archivo de migración no encontrado: ${migration}`);
        continue;
      }

      console.log(`📄 Ejecutando migración: ${migration}`);
      const sql = fs.readFileSync(filePath, 'utf8');

      await client.query(sql);
      console.log(`✅ Migración completada: ${migration}\n`);
    }

    await client.query('COMMIT');

    console.log('='.repeat(60));
    console.log('✅ Todas las migraciones completadas exitosamente!');
    console.log('='.repeat(60) + '\n');

    // Verificar tablas creadas
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log(`📊 Tablas creadas (${result.rows.length}):`);
    result.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });
    console.log('');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('\n❌ Error durante las migraciones:');
    console.error(error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('✨ Proceso de migración finalizado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Error fatal en migraciones:', error);
      process.exit(1);
    });
}

module.exports = { runMigrations };
