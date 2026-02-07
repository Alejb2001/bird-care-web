const ArticlesModel = require('../src/models/articles.model');

/**
 * Script de seed para artículos
 * Migra los 12 artículos existentes de articles.service.ts
 */

// Función helper para generar slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Datos de artículos a migrar
// NOTA: Las imágenes se subirán a Cloudinary en la Fase 5
// Por ahora usamos las rutas locales, luego se reemplazarán con URLs de Cloudinary

const articlesToSeed = [
  {
    title: '10 Alimentos Esenciales para tu Canario',
    slug: generateSlug('10 Alimentos Esenciales para tu Canario'),
    excerpt: 'Descubre los mejores alimentos para mantener a tu canario saludable y con un plumaje brillante. Incluye frutas, verduras y semillas recomendadas por veterinarios aviares.',
    category: 'Alimentacion',
    date: '2026-01-20',
    readTime: '8 min',
    imageUrl: 'images/articulos/articulo-alimento-canarios.avif', // Temporal - reemplazar con Cloudinary
    imagePublicId: null,
    author: 'Dra. Maria Gonzalez, Veterinaria Aviar',
    published: true,
    content: `
      <h2>Introducción: La Importancia de una Dieta Balanceada</h2>
      <p>La alimentación es uno de los pilares fundamentales en el cuidado de los canarios (<em>Serinus canaria domestica</em>). Según estudios de la Association of Avian Veterinarians, una dieta inadecuada es responsable del 70% de las enfermedades en aves de compañía.</p>

      <h2>1. Semillas de Alpiste (Phalaris canariensis)</h2>
      <p>El alpiste constituye la base de la alimentación del canario, aportando carbohidratos complejos y proteínas vegetales. Debe representar aproximadamente el 50% de la mezcla de semillas.</p>
      <p><strong>Valor nutricional:</strong> 14% proteína, 6% grasa, 55% carbohidratos.</p>

      <h2>2. Semillas de Negrillo (Guizotia abyssinica)</h2>
      <p>El negrillo es una semilla oleaginosa rica en ácidos grasos omega-3 y omega-6, esenciales para la salud cardiovascular y la calidad del plumaje.</p>

      <h2>3. Verduras de Hoja Verde</h2>
      <p>Las verduras frescas son fuente indispensable de vitaminas y minerales:</p>
      <ul>
        <li><strong>Espinaca:</strong> Rica en hierro, calcio y vitaminas A, C, K.</li>
        <li><strong>Lechuga romana:</strong> Alta en agua y fibra.</li>
        <li><strong>Brócoli:</strong> Excelente fuente de vitamina C y antioxidantes.</li>
      </ul>

      <h2>4. Frutas Frescas</h2>
      <p>Las frutas aportan vitaminas, antioxidantes y azúcares naturales:</p>
      <ul>
        <li><strong>Manzana:</strong> Rica en fibra y vitamina C. Retirar semillas.</li>
        <li><strong>Pera:</strong> Fuente de fibra soluble.</li>
        <li><strong>Melón:</strong> Alto contenido de agua y vitamina A.</li>
      </ul>

      <h2>Alimentos Prohibidos</h2>
      <p>Estos alimentos son tóxicos para canarios:</p>
      <ul>
        <li><strong>Aguacate:</strong> Contiene persina, altamente tóxico.</li>
        <li><strong>Chocolate:</strong> Teobromina causa problemas cardíacos.</li>
        <li><strong>Cebolla y ajo:</strong> Pueden causar anemia hemolítica.</li>
      </ul>

      <h2>Conclusión</h2>
      <p>Una dieta variada y equilibrada es la clave para mantener a tu canario saludable, con un canto vigoroso y un plumaje brillante.</p>
    `,
    sources: [
      { name: 'Association of Avian Veterinarians - Nutrition Guidelines', url: 'https://www.aav.org' },
      { name: 'Koutsos, E.A. et al. (2001) "Nutrition of Birds in the Order Psittaciformes"', url: 'https://pubmed.ncbi.nlm.nih.gov' },
      { name: 'ASPCA Animal Poison Control - Toxic Foods for Birds', url: 'https://www.aspca.org' }
    ],
    tags: ['alimentacion', 'canarios', 'nutricion', 'semillas', 'verduras']
  },
  // Los demás artículos se agregarán después de completar Fase 5 (Cloudinary)
  // Por ahora, este script sirve como base para la estructura
];

async function seedArticles() {
  console.log('\n📝 Iniciando seed de artículos...\n');

  try {
    let created = 0;
    let skipped = 0;

    for (const articleData of articlesToSeed) {
      try {
        // Verificar si ya existe
        const existing = await ArticlesModel.getArticleBySlug(articleData.slug);

        if (existing) {
          console.log(`⏭️  Artículo "${articleData.title}" ya existe, omitiendo...`);
          skipped++;
          continue;
        }

        // Crear artículo
        const article = await ArticlesModel.createArticle(articleData);
        console.log(`✅ Artículo creado: "${article.title}" (ID: ${article.id})`);
        created++;

      } catch (error) {
        console.error(`❌ Error creando artículo "${articleData.title}":`, error.message);
      }
    }

    console.log(`\n📊 Resumen:`);
    console.log(`   - Creados: ${created}`);
    console.log(`   - Omitidos: ${skipped}`);
    console.log(`   - Total: ${created + skipped}\n`);

  } catch (error) {
    console.error('💥 Error durante seed de artículos:', error);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const { pool } = require('../src/config/database');

  seedArticles()
    .then(() => {
      console.log('✨ Seed de artículos completado');
      return pool.end();
    })
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('💥 Error fatal en seed:', error);
      process.exit(1);
    });
}

module.exports = { seedArticles };
