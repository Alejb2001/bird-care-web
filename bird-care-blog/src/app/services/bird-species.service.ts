import { Injectable } from '@angular/core';
import { BirdSpecies } from '../models/bird-species.model';

@Injectable({
  providedIn: 'root'
})
export class BirdSpeciesService {
  private species: BirdSpecies[] = [
    {
      id: 'periquito-australiano',
      commonName: 'Periquito Australiano',
      scientificName: 'Melopsittacus undulatus',
      description: 'El periquito australiano es una de las aves de compañía más populares del mundo. Son pequeños, coloridos, sociales y relativamente fáciles de cuidar. Originarios de Australia, estos loros en miniatura son conocidos por su capacidad de aprender a hablar y su naturaleza juguetona.',
      image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
      characteristics: {
        size: '18-20 cm de longitud',
        weight: '30-40 gramos',
        lifespan: '5-10 años en cautiverio (hasta 15 con excelente cuidado)',
        temperament: ['Sociable', 'Juguetón', 'Curioso', 'Activo', 'Inteligente'],
        colors: ['Verde y amarillo (silvestre)', 'Azul', 'Blanco', 'Gris', 'Violeta', 'Amarillo limón']
      },
      care: {
        dietBasic: 'Mezcla de semillas de calidad + vegetales frescos diarios',
        dietDetails: [
          'Mezcla de semillas: mijo, alpiste, avena descascarillada',
          'Verduras frescas diarias: espinaca, brócoli, zanahoria rallada, pimiento',
          'Frutas ocasionales: manzana, pera, melón (sin semillas)',
          'Hueso de jibia para calcio',
          'Evitar: aguacate, chocolate, sal, azúcar, alcohol',
          'Agua fresca diariamente'
        ],
        cageSize: 'Mínimo 60x40x40 cm para un periquito, mayor si son varios',
        temperature: '18-24°C óptimo, evitar corrientes de aire',
        humidity: '40-70% humedad relativa',
        socialNeeds: 'Altamente social, ideal mantener en parejas o grupos. Requiere interacción diaria con humanos si está solo'
      },
      health: {
        commonIssues: [
          'Ácaros de la sarna (en pico y patas)',
          'Problemas respiratorios',
          'Obesidad por dieta inadecuada',
          'Crecimiento excesivo de pico y uñas',
          'Tumores (más común en aves mayores)',
          'Diarrea por estrés o dieta'
        ],
        preventiveCare: [
          'Limpieza de jaula 2-3 veces por semana',
          'Revisión diaria de heces y comportamiento',
          'Proporcionar perchas de diferentes grosores',
          'Baños regulares (2-3 veces por semana)',
          'Evitar vapores de teflón, humos y aerosoles',
          'Cuarentena de 30 días para nuevas aves'
        ],
        veterinaryVisits: 'Chequeo anual mínimo, o ante cualquier cambio de comportamiento'
      },
      breeding: {
        maturityAge: '6-8 meses',
        breedingSeason: 'Todo el año en cautiverio, primavera-verano ideal',
        clutchSize: '4-6 huevos',
        incubationPeriod: '18-21 días, polluelos vuelan a las 4-5 semanas'
      },
      behavior: {
        vocalLevel: 3,
        activityLevel: 5,
        sociability: 5,
        trainability: 4,
        notes: [
          'Pueden aprender a hablar, especialmente los machos',
          'Necesitan volar fuera de la jaula diariamente (supervisado)',
          'El juego y enriquecimiento son esenciales',
          'Pueden desarrollar comportamiento destructivo si están aburridos',
          'Los machos cantan y regurgitan para cortejar',
          'Las hembras pueden volverse agresivas al anidar'
        ]
      },
      habitat: {
        origin: 'Australia (regiones áridas y semiáridas)',
        naturalHabitat: 'Zonas de matorrales, praderas, bosques abiertos cerca de fuentes de agua',
        cageRequirements: [
          'Jaula rectangular (no redonda)',
          'Barrotes horizontales para trepar',
          'Múltiples perchas de madera natural',
          'Juguetes variados (espejos, campanas, columpios)',
          'Comederos y bebederos seguros',
          'Bañera o plato poco profundo'
        ],
        enrichment: [
          'Rotación de juguetes semanalmente',
          'Ramas naturales para roer',
          'Forrajeo (esconder comida en juguetes)',
          'Música o sonidos naturales',
          'Tiempo de juego fuera de la jaula',
          'Compañía de otros periquitos'
        ]
      },
      compatibility: {
        withOwnSpecies: 'Excelente, prefieren vivir en parejas o grupos pequeños',
        withOtherSpecies: 'Moderada. Pueden convivir con otras aves pequeñas pacíficas, supervisión necesaria',
        withChildren: 'Buena para niños responsables (mayores de 8 años con supervisión)'
      },
      tips: [
        'Los machos tienen la cera (nariz) azul, las hembras marrón o beige',
        'Un periquito sano tiene los ojos brillantes y plumaje suave',
        'Habla con ellos a diario para fomentar la vocalización',
        'Nunca uses papel periódico con tinta como lecho',
        'Los periquitos jóvenes se adaptan mejor al contacto humano',
        'Cubre la jaula por la noche para 10-12 horas de sueño',
        'Introduce nuevos alimentos gradualmente mezclados con los habituales'
      ]
    },
    {
      id: 'canario',
      commonName: 'Canario',
      scientificName: 'Serinus canaria domestica',
      description: 'El canario doméstico es famoso por su hermoso canto melodioso y sus vibrantes colores. Originario de las Islas Canarias, Azores y Madeira, ha sido domesticado durante siglos. Son aves relativamente independientes, ideales para quienes disfrutan de su canto más que de la interacción física constante.',
      image: 'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=800',
      characteristics: {
        size: '12-14 cm de longitud',
        weight: '15-20 gramos',
        lifespan: '10-15 años con cuidados adecuados',
        temperament: ['Tímido', 'Melodioso', 'Activo', 'Independiente', 'Territorial'],
        colors: ['Amarillo brillante', 'Naranja', 'Rojo', 'Blanco', 'Verde', 'Marrón variado']
      },
      care: {
        dietBasic: 'Mezcla especializada de semillas para canarios + vegetales',
        dietDetails: [
          'Mezcla de semillas: alpiste, colza, negrillo, linaza',
          'Verduras frescas: lechuga romana, espinaca, pepino, zanahoria',
          'Frutas: manzana, pera, naranja, melón (pequeñas cantidades)',
          'Pasta de cría durante época de reproducción',
          'Huevo cocido ocasionalmente (proteína)',
          'Grit o arena para digestión',
          'Evitar: lechuga iceberg, aguacate, alimentos salados',
          'Agua limpia diariamente'
        ],
        cageSize: 'Mínimo 40x40x40 cm individual, prefieren jaulas anchas para volar horizontalmente',
        temperature: '15-22°C, toleran temperaturas frescas mejor que el calor',
        humidity: '50-70%, importante durante muda de plumas',
        socialNeeds: 'Independientes, pueden vivir solos. Los machos son territoriales entre sí'
      },
      health: {
        commonIssues: [
          'Problemas respiratorios (sensibles a corrientes de aire)',
          'Ácaros rojos y de las plumas',
          'Quistes de plumas (en razas rizadas)',
          'Enfermedad del hígado graso (por dieta alta en grasa)',
          'Problemas en las patas (escamas)',
          'Muda anormal por estrés o nutrición deficiente'
        ],
        preventiveCare: [
          'Ambiente limpio y seco',
          'Evitar cambios bruscos de temperatura',
          'Baños regulares (3-4 veces por semana)',
          'Desparasitación preventiva según veterinario',
          'Luz natural o lámpara UV (10-12 horas diarias)',
          'Dieta balanceada baja en grasas'
        ],
        veterinaryVisits: 'Chequeo anual, especialmente antes de la temporada de cría'
      },
      breeding: {
        maturityAge: '9-12 meses',
        breedingSeason: 'Primavera (marzo-julio en hemisferio norte)',
        clutchSize: '3-5 huevos',
        incubationPeriod: '13-14 días, polluelos independientes a las 3-4 semanas'
      },
      behavior: {
        vocalLevel: 5,
        activityLevel: 4,
        sociability: 2,
        trainability: 2,
        notes: [
          'Los machos cantan especialmente durante la primavera',
          'El canto se puede "entrenar" con exposición a otros canarios o grabaciones',
          'No son aves de contacto físico, prefieren ser observados',
          'Disfrutan volando, necesitan tiempo fuera de la jaula en espacio seguro',
          'Son territoriales durante la cría',
          'La muda anual (verano-otoño) puede afectar el canto temporalmente'
        ]
      },
      habitat: {
        origin: 'Islas Canarias, Azores y Madeira',
        naturalHabitat: 'Bosques de pinos, áreas semiabiertas con matorrales',
        cageRequirements: [
          'Jaula amplia horizontal para vuelos cortos',
          'Perchas de diferentes diámetros a distintas alturas',
          'Baño o bañera (les encanta bañarse)',
          'Comederos separados para semillas, frutas y verduras',
          'Nido durante temporada de cría (hembras)',
          'Evitar juguetes ruidosos que los estresen'
        ],
        enrichment: [
          'Espejo (con moderación, puede causar comportamiento obsesivo)',
          'Ramas naturales para posarse',
          'Cambios en la disposición de perchas ocasionalmente',
          'Luz solar indirecta o lámpara UV',
          'Música suave o sonidos de naturaleza',
          'Compañía de otros canarios (visual o auditiva)'
        ]
      },
      compatibility: {
        withOwnSpecies: 'Machos son territoriales entre sí. Hembras pueden convivir. Parejas solo durante cría',
        withOtherSpecies: 'No recomendado, son tímidos y pueden estresarse con aves más grandes o agresivas',
        withChildren: 'Moderada. Son aves de observación, no de manipulación. Buenos para niños tranquilos'
      },
      tips: [
        'Los machos son los cantores, las hembras gorjean suavemente',
        'Un canario que deja de cantar puede estar enfermo, estresado o en muda',
        'La coloración roja/naranja requiere alimentación con cantaxantina',
        'Ubica la jaula en lugar tranquilo pero con actividad familiar moderada',
        'Durante la muda, aumenta proteínas y reduce semillas oleaginosas',
        'Los baños son esenciales para la salud del plumaje',
        'No mezcles canarios de canto con otras especies ruidosas',
        'La jaula debe tener al menos una pared sólida para seguridad'
      ]
    },
    {
      id: 'agapornis',
      commonName: 'Agapornis (Inseparable)',
      scientificName: 'Agapornis spp.',
      description: 'Los agapornis, también conocidos como "inseparables" o "lovebirds", son pequeños loros africanos famosos por su fuerte vínculo de pareja. Son aves extremadamente sociales, cariñosas y juguetonas que forman lazos profundos con sus compañeros o cuidadores humanos. Requieren mucha atención y estimulación.',
      image: 'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=800',
      characteristics: {
        size: '13-17 cm de longitud',
        weight: '40-60 gramos',
        lifespan: '10-15 años, algunos hasta 20 con excelente cuidado',
        temperament: ['Muy social', 'Afectuoso', 'Juguetón', 'Territorial', 'Vocal', 'Enérgico'],
        colors: ['Verde con cara roja/naranja (Fischer)', 'Verde con cara melocotón (Roseicollis)', 'Azul', 'Lutino (amarillo)', 'Combinaciones múltiples']
      },
      care: {
        dietBasic: 'Pellets de alta calidad + frutas y verduras frescas diarias',
        dietDetails: [
          'Pellets formulados para loros pequeños (60-70% de la dieta)',
          'Mezcla de semillas (10-20%): girasol, cártamo, mijo',
          'Verduras diarias: espinaca, brócoli, zanahoria, calabaza, pimiento',
          'Frutas: manzana, uva, arándanos, mango, papaya (10-15%)',
          'Granos cocidos: arroz integral, quinoa, pasta',
          'Hueso de jibia y block mineral para calcio',
          'Evitar: aguacate, chocolate, cafeína, sal, azúcar refinada',
          'Agua fresca 2 veces al día'
        ],
        cageSize: 'Mínimo 80x50x50 cm para una pareja, cuanto más grande mejor',
        temperature: '18-25°C, sensibles a cambios bruscos',
        humidity: '40-70%',
        socialNeeds: 'CRÍTICO: Necesitan compañía constante. Si están solos, requieren 4-6 horas diarias de interacción humana'
      },
      health: {
        commonIssues: [
          'Problemas de comportamiento por soledad o aburrimiento',
          'Psitacosis (fiebre del loro)',
          'Problemas respiratorios',
          'Obesidad por dieta inadecuada',
          'Arrancado de plumas (estrés, soledad)',
          'Crecimiento excesivo de pico',
          'Problemas reproductivos en hembras (puesta crónica de huevos)'
        ],
        preventiveCare: [
          'Compañía de otro agapornis o tiempo extenso con humanos',
          'Limpieza diaria de comederos y bebederos',
          'Limpieza profunda de jaula semanalmente',
          'Enriquecimiento ambiental constante',
          'Baños o duchas 3-4 veces por semana',
          'Recorte de uñas según necesidad',
          'Monitoreo de peso mensual'
        ],
        veterinaryVisits: 'Chequeo cada 6-12 meses con veterinario aviar especializado'
      },
      breeding: {
        maturityAge: '10-12 meses',
        breedingSeason: 'Todo el año en cautiverio, principalmente primavera-verano',
        clutchSize: '4-6 huevos',
        incubationPeriod: '21-23 días, polluelos destetados a las 6-8 semanas'
      },
      behavior: {
        vocalLevel: 4,
        activityLevel: 5,
        sociability: 5,
        trainability: 3,
        notes: [
          'Forman lazos de pareja de por vida (de ahí el nombre "inseparables")',
          'Si se cría un solo agapornis a mano, se vinculará fuertemente con el humano',
          'Son mordedores cuando están asustados o no socializados',
          'Extremadamente juguetones, necesitan destruir juguetes regularmente',
          'Pueden aprender algunos trucos, pero no hablan como otros loros',
          'Territoriales con su jaula y juguetes favoritos',
          'La separación de su pareja puede causar depresión severa'
        ]
      },
      habitat: {
        origin: 'África (Tanzania, Kenia, Madagascar según especie)',
        naturalHabitat: 'Sabanas, bosques tropicales, zonas áridas con vegetación',
        cageRequirements: [
          'Jaula espaciosa con barrotes fuertes (pueden masticar metal débil)',
          'Múltiples perchas de diferentes texturas y grosores',
          'Juguetes masticables en abundancia (madera, cuero, papel)',
          'Zona de forrajeo con comida escondida',
          'Columpios y escaleras',
          'Caja nido si se desea criar (advertencia: fomenta reproducción)',
          'Espacio para volar fuera de jaula diariamente'
        ],
        enrichment: [
          'Rotación semanal de juguetes (mínimo 5-6 juguetes diferentes)',
          'Juguetes destructibles: palitos, papel, cartón',
          'Juguetes de forrajeo (rompecabezas para comida)',
          'Tiempo de vuelo supervisado diario (2-3 horas)',
          'Entrenamiento con refuerzo positivo',
          'Baños o duchas regulares',
          'Interacción social constante'
        ]
      },
      compatibility: {
        withOwnSpecies: 'Excelente en parejas del mismo sexo o parejas reproductoras. Grupos pequeños posibles si se crían juntos',
        withOtherSpecies: 'No recomendado. Son territoriales y pueden herir a aves más pequeñas',
        withChildren: 'Moderada a baja. Pueden morder. Mejor con adolescentes responsables que respeten sus límites'
      },
      tips: [
        'NUNCA separes una pareja establecida, puede causar depresión fatal',
        'Si quieres un agapornis cariñoso contigo, críalo solo (sin otro agapornis)',
        'Los criados a mano son más dóciles que los de aviario',
        'Socialízalos jóvenes con diferentes personas para evitar vinculación exclusiva',
        'Proporciona MUCHOS juguetes para masticar o destruirán muebles',
        'Son ruidosos por la mañana y tarde (vocalizaciones naturales)',
        'Las hembras pueden poner huevos sin macho (controla calcio y dieta)',
        'Retira la caja nido si no deseas cría para evitar comportamiento hormonal',
        'Son muy inteligentes, pueden abrir cerrojos simples de jaulas'
      ]
    },
    {
      id: 'ninfa',
      commonName: 'Ninfa (Cacatúa Ninfa)',
      scientificName: 'Nymphicus hollandicus',
      description: 'La ninfa o carolina es un loro pequeño originario de Australia, reconocible por su cresta prominente y sus mejillas naranja características. Son aves extremadamente cariñosas, inteligentes y sociales que pueden aprender a silbar melodías y algunas palabras. Son mascotas ideales para principiantes debido a su temperamento dócil.',
      image: 'https://images.unsplash.com/photo-1597318001819-c365bdfa6e91?w=800',
      characteristics: {
        size: '30-33 cm de longitud (incluyendo cola larga)',
        weight: '80-100 gramos',
        lifespan: '15-20 años, algunos hasta 25-30 años',
        temperament: ['Muy cariñoso', 'Dócil', 'Sociable', 'Curioso', 'Inteligente', 'Sensible'],
        colors: ['Gris con mejillas naranja (silvestre)', 'Lutino (amarillo/blanco)', 'Perlado', 'Canela', 'Albino', 'Cara blanca']
      },
      care: {
        dietBasic: 'Pellets de alta calidad como base + amplia variedad de alimentos frescos',
        dietDetails: [
          'Pellets formulados para cacatúas (50-60% de la dieta)',
          'Mezcla de semillas (20-30%): mijo, avena, girasol con moderación',
          'Verduras frescas diarias: zanahoria, brócoli, calabaza, espinaca, pimiento',
          'Frutas: manzana, uva, arándanos, plátano, mango (15-20%)',
          'Granos y legumbres cocidas: arroz, frijoles, lentejas',
          'Hueso de jibia y suplemento mineral',
          'Treats saludables: mijo en spray (con moderación)',
          'Evitar: aguacate, chocolate, sal, azúcar, alcohol, cafeína',
          'Agua fresca 2-3 veces al día'
        ],
        cageSize: 'Mínimo 60x60x80 cm individual, prefieren jaulas altas y anchas',
        temperature: '18-24°C, evitar corrientes de aire frío',
        humidity: '40-60%',
        socialNeeds: 'MUY ALTO: Necesitan compañía constante. Mínimo 2-4 horas de interacción diaria si están solas'
      },
      health: {
        commonIssues: [
          'Terrores nocturnos (gritos y aleteos en la noche)',
          'Arrancado de plumas por estrés o aburrimiento',
          'Obesidad (especialmente en aves sedentarias)',
          'Enfermedad del hígado graso',
          'Psitacosis',
          'Problemas respiratorios',
          'Puesta crónica de huevos en hembras',
          'Lipomas (tumores grasos)'
        ],
        preventiveCare: [
          'Luz nocturna tenue para prevenir terrores nocturnos',
          'Ejercicio diario (vuelo supervisado)',
          'Estimulación mental constante (juguetes, entrenamiento)',
          'Dieta baja en grasas',
          'Limpieza de jaula 3-4 veces por semana',
          'Baños o duchas 3-4 veces por semana',
          'Evitar stroking corporal (solo cabeza) para prevenir hormonal issues',
          'Ambiente tranquilo y rutinas consistentes'
        ],
        veterinaryVisits: 'Chequeo anual mínimo con veterinario aviar'
      },
      breeding: {
        maturityAge: '9-12 meses',
        breedingSeason: 'Primavera-verano principalmente, pueden criar todo el año',
        clutchSize: '4-7 huevos',
        incubationPeriod: '18-21 días, polluelos destetados a las 8-10 semanas'
      },
      behavior: {
        vocalLevel: 3,
        activityLevel: 4,
        sociability: 5,
        trainability: 4,
        notes: [
          'Pueden aprender a silbar melodías completas muy bien',
          'Los machos son mejores vocalizadores que las hembras',
          'Expresan emociones con su cresta (arriba = alerta/excitado, plana = relajado)',
          'Son propensos a "ataques de pánico" si se asustan',
          'Disfrutan siendo acariciados en la cabeza y cuello',
          'Pueden desarrollar vínculo muy fuerte con una persona',
          'Necesitan rutinas consistentes para sentirse seguros',
          'Los silbidos y vocalizaciones son más frecuentes al amanecer y atardecer'
        ]
      },
      habitat: {
        origin: 'Australia (zonas áridas y semiáridas del interior)',
        naturalHabitat: 'Praderas, zonas de matorral, cerca de fuentes de agua',
        cageRequirements: [
          'Jaula espaciosa vertical y horizontal',
          'Barrotes horizontales para trepar',
          'Múltiples perchas de madera natural a diferentes alturas',
          'Juguetes variados: cuerdas, espejos, campanas',
          'Zona de forrajeo',
          'Columpios y escaleras',
          'Bañera o plato para baño',
          'Área de descanso tranquila'
        ],
        enrichment: [
          'Rotación de juguetes cada 1-2 semanas',
          'Juguetes para masticar (madera, cuero, papel)',
          'Juguetes interactivos y de forrajeo',
          'Tiempo de vuelo diario supervisado (mínimo 2 horas)',
          'Entrenamiento de trucos con clicker',
          'Música o silbar juntos',
          'Perches naturales con textura variada',
          'Compañía de otra ninfa (ideal)'
        ]
      },
      compatibility: {
        withOwnSpecies: 'Excelente. Prefieren vivir en parejas o grupos pequeños',
        withOtherSpecies: 'Buena con aves de tamaño similar pacíficas. Supervisión necesaria',
        withChildren: 'Excelente para niños de todas las edades (con supervisión). Son gentiles y tolerantes'
      },
      tips: [
        'Los machos tienen mejillas naranja brillante, las hembras más apagadas (en variedades normales)',
        'Una cresta erguida indica alerta o curiosidad, no necesariamente miedo',
        'Cubre parcialmente la jaula de noche (3 lados) para ayudar con terrores nocturnos',
        'Comienza entrenamiento con mijo en spray como recompensa',
        'Socializa con múltiples personas para evitar vinculación exclusiva',
        'Las ninfas criadas a mano son extremadamente dóciles',
        'Responden bien al refuerzo positivo, nunca castigo',
        'Pueden asustarse fácilmente: evita movimientos bruscos y ruidos fuertes',
        'Las hembras pueden poner huevos sin macho: proporciona calcio extra',
        'Son excelentes para apartamentos (no son excesivamente ruidosas)',
        'El polvo de plumas es notable: considera purificador de aire',
        'Aprenden mejor silbidos que palabras, pero algunos pueden hablar'
      ]
    }
  ];

  constructor() { }

  getAllSpecies(): BirdSpecies[] {
    return this.species;
  }

  getSpeciesById(id: string): BirdSpecies | undefined {
    return this.species.find(s => s.id === id);
  }

  getSpeciesByName(commonName: string): BirdSpecies | undefined {
    return this.species.find(s =>
      s.commonName.toLowerCase().includes(commonName.toLowerCase())
    );
  }

  getFeaturedSpecies(): BirdSpecies[] {
    return this.species.slice(0, 4);
  }
}
