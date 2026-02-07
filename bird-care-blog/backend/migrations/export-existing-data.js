const fs = require('fs');
const path = require('path');

/**
 * Script para exportar datos existentes de los servicios Angular a JSON
 * Lee articles.service.ts y bird-species.service.ts y extrae los datos
 */

console.log('\n🔍 Exportando datos existentes de servicios Angular...\n');

// Función para generar slug URL-friendly
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/-+/g, '-') // Múltiples guiones a uno
    .trim();
}

// Por ahora, vamos a crear manualmente la estructura de datos basándonos
// en lo que sabemos que existe. En un proyecto real, podrías parsear el TS.

// Este es un placeholder - los datos reales se tomarán de los archivos TypeScript
const articlesPlaceholder = {
  message: 'Los artículos se migrarán directamente en el script de seed',
  count: 12,
  note: 'Ver 002_seed_articles.js para la migración real'
};

const speciesPlaceholder = {
  message: 'Las especies se migrarán directamente en el script de seed',
  count: 9,
  note: 'Ver 003_seed_species.js para la migración real'
};

// Guardar placeholders
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(
  path.join(dataDir, 'articles-placeholder.json'),
  JSON.stringify(articlesPlaceholder, null, 2)
);

fs.writeFileSync(
  path.join(dataDir, 'species-placeholder.json'),
  JSON.stringify(speciesPlaceholder, null, 2)
);

console.log('✅ Archivos placeholder creados en migrations/data/');
console.log('\n📝 NOTA: Los datos reales se migrarán directamente en los scripts de seed.');
console.log('   - 002_seed_articles.js contendrá los 12 artículos');
console.log('   - 003_seed_species.js contendrá las 9 especies\n');
