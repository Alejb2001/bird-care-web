/**
 * Script para probar la conexión a PostgreSQL
 * Uso: node scripts/test-connection.js
 */

const { testConnection, pool } = require('../src/config/database');

async function test() {
  console.log('\n🔍 Probando conexión a PostgreSQL...\n');
  console.log('📝 Variables de entorno:');
  console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? '✓ Configurada' : '✗ No configurada'}`);
  console.log('');

  try {
    const connected = await testConnection();

    if (connected) {
      console.log('\n✅ ¡Conexión exitosa!\n');
      console.log('📊 Verificando tablas...');

      const result = await pool.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
        ORDER BY table_name;
      `);

      if (result.rows.length > 0) {
        console.log(`\n✅ Tablas encontradas (${result.rows.length}):`);
        result.rows.forEach(row => {
          console.log(`   ✓ ${row.table_name}`);
        });
      } else {
        console.log('\n⚠️  No se encontraron tablas.');
        console.log('💡 Ejecuta "npm run migrate" para crear las tablas.\n');
      }

      await pool.end();
      process.exit(0);
    } else {
      console.log('\n❌ No se pudo conectar a PostgreSQL\n');
      console.log('💡 Soluciones posibles:');
      console.log('   1. Verifica que PostgreSQL esté corriendo');
      console.log('   2. Verifica la variable DATABASE_URL en .env');
      console.log('   3. Verifica que la base de datos exista\n');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

test();
