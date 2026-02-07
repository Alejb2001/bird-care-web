const SpeciesModel = require('../src/models/species.model');

/**
 * Script de seed para especies de aves
 * Migra las 9 especies existentes de bird-species.service.ts
 */

const speciesToSeed = [
  {
    id: 'periquito-australiano',
    commonName: 'Periquito Australiano',
    scientificName: 'Melopsittacus undulatus',
    description: 'El periquito australiano es una de las aves de compañía más populares en el mundo. Originario de Australia, es conocido por su personalidad juguetona, capacidad para aprender trucos y, en algunos casos, imitar palabras.',
    imageUrl: 'images/especies/especie-periquito.avif', // Temporal
    imagePublicId: null,
    published: true,
    characteristics: {
      size: '18-20 cm de largo',
      weight: '30-40 gramos',
      lifespan: '5-10 años (hasta 15 en cautiverio con buenos cuidados)',
      temperament: ['Sociable', 'Juguetón', 'Curioso', 'Activo'],
      colors: ['Verde', 'Azul', 'Amarillo', 'Blanco', 'Gris', 'Violeta']
    },
    care: {
      dietBasic: 'Dieta basada en semillas de calidad, pellets formulados y vegetales frescos',
      dietDetails: [
        'Mezcla de semillas (mijo, alpiste, avena)',
        'Pellets comerciales (30-50% de la dieta)',
        'Verduras frescas diarias (espinaca, zanahoria, brócoli)',
        'Frutas ocasionales (manzana, pera sin semillas)',
        'Jibia o bloque mineral para calcio'
      ],
      cageSize: 'Mínimo 60x40x40 cm para una pareja',
      temperature: '18-24°C',
      humidity: '40-70%',
      socialNeeds: 'Altamente sociales, se recomienda tener al menos dos si no pueden recibir mucha atención humana'
    },
    health: {
      commonIssues: [
        'Ácaros de patas y pico',
        'Obesidad por dieta inadecuada',
        'Problemas respiratorios',
        'Tumores (especialmente en aves mayores)',
        'Crecimiento excesivo del pico'
      ],
      preventiveCare: [
        'Revisión veterinaria anual',
        'Limpieza semanal de jaula',
        'Agua fresca diaria',
        'Observación diaria del comportamiento',
        'Cuarentena de aves nuevas'
      ],
      veterinaryVisits: 'Anual para chequeo preventivo, inmediato ante cambios en comportamiento o apetito'
    },
    breeding: {
      maturityAge: '6-8 meses',
      breedingSeason: 'Todo el año en cautiverio (primavera en naturaleza)',
      clutchSize: '4-8 huevos',
      incubationPeriod: '18-21 días'
    },
    behavior: {
      vocalLevel: 3,
      activityLevel: 5,
      sociability: 5,
      trainability: 4,
      notes: [
        'Pueden aprender a hablar con paciencia y práctica',
        'Necesitan mínimo 2-3 horas fuera de la jaula diariamente',
        'Disfrutan de juguetes y rompecabezas',
        'Son muy sociales y pueden sufrir si están solos'
      ]
    },
    habitat: {
      origin: 'Australia (regiones áridas y semiáridas)',
      naturalHabitat: 'Bosques abiertos, praderas, zonas arbustivas',
      cageRequirements: [
        'Jaula espaciosa con barras horizontales para trepar',
        'Múltiples perchas de diferentes diámetros',
        'Juguetes variados (columpios, espejos, campanas)',
        'Comederos y bebederos en altura',
        'Área de baño (plato o rociador)'
      ],
      enrichment: [
        'Rotación de juguetes semanalmente',
        'Ramas naturales para roer',
        'Música suave o sonidos de la naturaleza',
        'Tiempo de juego interactivo fuera de la jaula'
      ]
    },
    compatibility: {
      withOwnSpecies: 'Excelente - prefieren vivir en parejas o grupos',
      withOtherSpecies: 'Moderada - pueden convivir con otras aves pequeñas pacíficas con supervisión',
      withChildren: 'Buena - son resistentes y tolerantes, ideales para niños responsables con supervisión'
    },
    tips: [
      'Los periquitos machos suelen ser mejores para hablar que las hembras',
      'El color del cere (piel sobre el pico) indica el sexo: azul en machos, marrón en hembras',
      'No colocar la jaula cerca de corrientes de aire o luz solar directa',
      'Proporcionar 10-12 horas de oscuridad para un ciclo de sueño saludable'
    ]
  },
  // Las demás especies se agregarán en scripts subsecuentes
];

async function seedSpecies() {
  console.log('\n🦜 Iniciando seed de especies...\n');

  try {
    let created = 0;
    let skipped = 0;

    for (const speciesData of speciesToSeed) {
      try {
        // Verificar si ya existe
        const existing = await SpeciesModel.getSpeciesById(speciesData.id);

        if (existing) {
          console.log(`⏭️  Especie "${speciesData.commonName}" ya existe, omitiendo...`);
          skipped++;
          continue;
        }

        // Crear especie
        const species = await SpeciesModel.createSpecies(speciesData);
        console.log(`✅ Especie creada: "${species.common_name}" (ID: ${species.id})`);
        created++;

      } catch (error) {
        console.error(`❌ Error creando especie "${speciesData.commonName}":`, error.message);
      }
    }

    console.log(`\n📊 Resumen:`);
    console.log(`   - Creadas: ${created}`);
    console.log(`   - Omitidas: ${skipped}`);
    console.log(`   - Total: ${created + skipped}\n`);

  } catch (error) {
    console.error('💥 Error durante seed de especies:', error);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const { pool } = require('../src/config/database');

  seedSpecies()
    .then(() => {
      console.log('✨ Seed de especies completado');
      return pool.end();
    })
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('💥 Error fatal en seed:', error);
      process.exit(1);
    });
}

module.exports = { seedSpecies };
