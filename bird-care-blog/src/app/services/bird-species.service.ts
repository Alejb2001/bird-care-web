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
      image: 'images/especies/especie-periquito.avif',
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
      image: 'images/especies/especie-canario.avif',
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
      image: 'images/especies/especie-agapornis.avif',
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
      image: 'images/especies/especie-ninfa.avif',
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
    },
    {
      id: 'diamante-mandarin',
      commonName: 'Diamante Mandarín',
      scientificName: 'Taeniopygia guttata',
      description: 'El diamante mandarín es un pinzón australiano pequeño y activo, perfecto para principiantes. Son aves sociables que viven mejor en parejas o grupos pequeños. Su canto es suave y agradable, y son fáciles de mantener. Son ideales para quienes desean observar el comportamiento natural de las aves sin necesidad de manipulación constante.',
      image: 'images/especies/especie-diamante-mandarin.avif',
      characteristics: {
        size: '10-11 cm de longitud',
        weight: '12-15 gramos',
        lifespan: '5-7 años en cautiverio, hasta 10 con excelente cuidado',
        temperament: ['Activo', 'Social', 'Pacífico', 'Gregario', 'Independiente'],
        colors: ['Gris con mejillas naranja y pecho rayado (silvestre)', 'Blanco', 'Leonado', 'Perlado', 'Isabel']
      },
      care: {
        dietBasic: 'Mezcla de semillas para pinzones + vegetales frescos',
        dietDetails: [
          'Mezcla de semillas: mijo blanco, mijo rojo, alpiste, negrillo',
          'Verduras frescas: espinaca, lechuga, pepino, zanahoria rallada',
          'Frutas ocasionales: manzana, pera (pequeñas cantidades)',
          'Grit para digestión y calcio',
          'Hueso de jibia disponible siempre',
          'Pasta de cría durante reproducción',
          'Evitar: aguacate, chocolate, alimentos salados',
          'Agua limpia diariamente, les gusta bañarse'
        ],
        cageSize: 'Mínimo 60x40x40 cm para una pareja, prefieren jaulas largas para vuelos cortos',
        temperature: '18-24°C, evitar temperaturas extremas',
        humidity: '40-60%',
        socialNeeds: 'Muy social, deben vivir en parejas o grupos. No requieren interacción humana constante'
      },
      health: {
        commonIssues: [
          'Ácaros de las patas',
          'Problemas respiratorios por corrientes de aire',
          'Obesidad si no pueden volar suficiente',
          'Crecimiento excesivo de uñas',
          'Retención de huevos en hembras',
          'Diarrea por cambios bruscos de dieta'
        ],
        preventiveCare: [
          'Limpieza de jaula 2-3 veces por semana',
          'Bañera disponible diariamente',
          'Desparasitación preventiva semestral',
          'Revisión regular de patas y uñas',
          'Evitar sobrepoblación en jaula',
          'Mantener ambiente seco y ventilado'
        ],
        veterinaryVisits: 'Chequeo anual, o si se observan síntomas de enfermedad'
      },
      breeding: {
        maturityAge: '3-6 meses',
        breedingSeason: 'Todo el año en cautiverio, más activos en primavera',
        clutchSize: '4-6 huevos',
        incubationPeriod: '12-14 días, polluelos independientes a las 3-4 semanas'
      },
      behavior: {
        vocalLevel: 2,
        activityLevel: 5,
        sociability: 5,
        trainability: 1,
        notes: [
          'Su canto es suave y melodioso, agradable para apartamentos',
          'Muy activos durante todo el día',
          'Prefieren la compañía de otros diamantes a la interacción humana',
          'Son excelentes para observar comportamiento social natural',
          'Las parejas forman vínculos fuertes',
          'Crían fácilmente si se les proporciona nido',
          'No son aves de manipulación, son para observación'
        ]
      },
      habitat: {
        origin: 'Australia (zonas áridas y semiáridas)',
        naturalHabitat: 'Pastizales, sabanas, cerca de fuentes de agua',
        cageRequirements: [
          'Jaula larga más que alta (prefieren vuelos horizontales)',
          'Múltiples perchas a diferentes alturas',
          'Bañera o plato de agua para baño',
          'Nidos si se desea criar',
          'Comederos múltiples para evitar competencia',
          'Materiales para nido: fibra de coco, paja, hierbas'
        ],
        enrichment: [
          'Ramas naturales con diferentes grosores',
          'Plantas naturales o artificiales',
          'Espejos (disfrutan de su reflejo)',
          'Columpios pequeños',
          'Música suave de fondo',
          'Compañía de otros diamantes mandarín'
        ]
      },
      compatibility: {
        withOwnSpecies: 'Excelente, deben vivir mínimo en pareja, idealmente en grupos',
        withOtherSpecies: 'Buena con otros pinzones y aves pequeñas pacíficas del mismo tamaño',
        withChildren: 'Excelente para niños (observación). No requieren manipulación, fáciles de cuidar'
      },
      tips: [
        'Los machos tienen mejillas naranja brillante, las hembras más pálidas',
        'El canto del macho es señal de salud y felicidad',
        'Son prolíficos criadores, controla la reproducción si no deseas polluelos',
        'Les encanta bañarse, ofrecen agua fresca para baño diariamente',
        'Pueden convivir con canarios y otros pinzones pacíficos',
        'No necesitan salir de la jaula si esta es espaciosa',
        'Son muy económicos de mantener',
        'Perfectos para principiantes en avicultura',
        'Observar su comportamiento social es fascinante',
        'Retira nidos si no quieres que críen constantemente'
      ]
    },
    {
      id: 'cotorra-argentina',
      commonName: 'Cotorra Argentina',
      scientificName: 'Myiopsitta monachus',
      description: 'La cotorra argentina, también conocida como cotorra monje, es un loro pequeño a mediano extremadamente inteligente y social. Son aves muy vocales y activas que pueden aprender trucos y palabras. Forman vínculos fuertes con sus cuidadores y necesitan mucha estimulación mental. Son ideales para dueños experimentados que pueden dedicarles tiempo y atención.',
      image: 'images/especies/especie-cotorra-argentina.avif',
      characteristics: {
        size: '28-31 cm de longitud',
        weight: '100-150 gramos',
        lifespan: '20-30 años con cuidados adecuados',
        temperament: ['Muy inteligente', 'Social', 'Vocal', 'Juguetón', 'Cariñoso', 'Territorial'],
        colors: ['Verde brillante con pecho y frente gris', 'Azul (mutación)', 'Amarillo (mutación)']
      },
      care: {
        dietBasic: 'Pellets de alta calidad + amplia variedad de frutas y verduras',
        dietDetails: [
          'Pellets formulados para loros pequeños (50-60% de dieta)',
          'Mezcla de semillas (20-30%): girasol, cártamo, avena',
          'Verduras diarias: brócoli, zanahoria, calabaza, espinaca, pimiento',
          'Frutas: manzana, uva, mango, papaya, arándanos (20%)',
          'Granos cocidos: arroz integral, quinoa, lentejas',
          'Nueces ocasionales: almendras, nueces (con moderación)',
          'Evitar: aguacate, chocolate, sal, azúcar, alcohol',
          'Agua fresca 2-3 veces al día'
        ],
        cageSize: 'Mínimo 80x60x80 cm, cuanto más grande mejor',
        temperature: '18-26°C, toleran variaciones moderadas',
        humidity: '40-70%',
        socialNeeds: 'MUY ALTO: Necesitan 3-4 horas diarias de interacción. Mejor en parejas si no tienes mucho tiempo'
      },
      health: {
        commonIssues: [
          'Arrancado de plumas por aburrimiento o estrés',
          'Psitacosis',
          'Problemas respiratorios',
          'Obesidad',
          'Crecimiento excesivo de pico y uñas',
          'Problemas hepáticos por dieta alta en grasas',
          'Comportamiento agresivo por falta de socialización'
        ],
        preventiveCare: [
          'Estimulación mental diaria (juguetes, entrenamiento)',
          'Dieta balanceada baja en grasas',
          'Limpieza de jaula 3-4 veces por semana',
          'Baños o duchas regulares',
          'Socialización temprana con diferentes personas',
          'Chequeos veterinarios regulares',
          'Tiempo de vuelo supervisado diario'
        ],
        veterinaryVisits: 'Cada 6-12 meses con veterinario aviar especializado'
      },
      breeding: {
        maturityAge: '1-2 años',
        breedingSeason: 'Primavera-verano principalmente',
        clutchSize: '5-8 huevos',
        incubationPeriod: '23-26 días, polluelos destetados a las 8-10 semanas'
      },
      behavior: {
        vocalLevel: 5,
        activityLevel: 5,
        sociability: 5,
        trainability: 5,
        notes: [
          'Pueden aprender a hablar y hacer trucos complejos',
          'MUY vocales, especialmente por la mañana y tarde',
          'Son destructores naturales, necesitan juguetes para masticar',
          'Forman vínculos muy fuertes con sus cuidadores',
          'Pueden ser territoriales con su jaula',
          'Les encanta construir nidos, incluso sin intención de criar',
          'Requieren rutinas consistentes para sentirse seguros',
          'Pueden ser ruidosos, no aptos para apartamentos con vecinos sensibles'
        ]
      },
      habitat: {
        origin: 'Argentina, Uruguay, Paraguay, sur de Brasil',
        naturalHabitat: 'Bosques, áreas urbanas, construyen nidos comunales grandes',
        cageRequirements: [
          'Jaula robusta con barrotes fuertes (pueden masticar metal débil)',
          'Múltiples perchas de diferentes grosores',
          'Abundantes juguetes destructibles',
          'Zona de forrajeo',
          'Columpios y escaleras',
          'Materiales para construir (incluso sin criar)',
          'Espacio para vuelo o tiempo fuera de jaula diario'
        ],
        enrichment: [
          'Rotación semanal de juguetes (mínimo 8-10 juguetes)',
          'Juguetes de madera natural para destruir',
          'Rompecabezas y juguetes de forrajeo',
          'Entrenamiento diario con clicker',
          'Tiempo de vuelo supervisado (2-3 horas)',
          'Interacción social constante',
          'Ramas frescas para roer'
        ]
      },
      compatibility: {
        withOwnSpecies: 'Excelente en parejas o grupos. Son muy sociales entre ellos',
        withOtherSpecies: 'Moderada. Pueden ser territoriales con otras especies de loros',
        withChildren: 'Moderada. Pueden morder si se sienten amenazados. Mejor con niños mayores'
      },
      tips: [
        'Son RUIDOSAS: considera a los vecinos antes de adquirir una',
        'Necesitan MUCHA atención diaria, no son para personas ocupadas',
        'Los criados a mano son más dóciles',
        'Socializa temprano con diferentes personas para evitar vinculación exclusiva',
        'Construirán nidos incluso sin intención de criar',
        'Son muy inteligentes, pueden abrir cerrojos',
        'Proporciona MUCHOS juguetes para destruir',
        'Son gregarias: considera tener una pareja',
        'Excelentes para entrenamiento y trucos',
        'Requieren compromiso a largo plazo (viven 20-30 años)',
        'Son ilegales como mascota en algunos lugares (invasoras)'
      ]
    },
    {
      id: 'loro-senegal',
      commonName: 'Loro del Senegal',
      scientificName: 'Poicephalus senegalus',
      description: 'El loro del Senegal es un loro africano de tamaño mediano, ideal para apartamentos y dueños intermedios. Son relativamente tranquilos para ser loros, inteligentes y cariñosos con sus dueños. Pueden aprender a hablar algunas palabras y son excelentes compañeros. Son menos demandantes que loros grandes pero igual de afectuosos.',
      image: 'images/especies/especie-loro-senegal.avif',
      characteristics: {
        size: '23-25 cm de longitud',
        weight: '120-170 gramos',
        lifespan: '25-30 años, algunos hasta 50 años',
        temperament: ['Inteligente', 'Cariñoso', 'Tranquilo', 'Leal', 'Independiente', 'Territorial'],
        colors: ['Verde con cabeza gris y vientre amarillo/naranja', 'Variaciones en tono del vientre']
      },
      care: {
        dietBasic: 'Pellets de alta calidad como base + frutas y verduras variadas',
        dietDetails: [
          'Pellets formulados para loros medianos (60-70% de dieta)',
          'Mezcla de semillas (15-20%): limitada por alto contenido graso',
          'Verduras diarias: zanahoria, brócoli, calabaza, pimiento, col',
          'Frutas: mango, papaya, uva, manzana, granada (15-20%)',
          'Granos cocidos: arroz integral, pasta, legumbres',
          'Nueces ocasionales como premio',
          'Evitar: aguacate, chocolate, cafeína, sal, alcohol',
          'Agua fresca 2 veces al día'
        ],
        cageSize: 'Mínimo 60x60x90 cm, prefieren altura sobre anchura',
        temperature: '20-26°C, sensibles a frío extremo',
        humidity: '50-70%',
        socialNeeds: 'ALTO: Necesitan 2-3 horas de interacción diaria. Forman vínculos fuertes con una persona'
      },
      health: {
        commonIssues: [
          'Aspergilosis (infección fúngica respiratoria)',
          'Enfermedad del hígado graso',
          'Obesidad',
          'Arrancado de plumas por estrés',
          'Problemas de comportamiento por vinculación excesiva',
          'Deficiencia de vitamina A',
          'Crecimiento excesivo de pico'
        ],
        preventiveCare: [
          'Dieta baja en grasas y semillas',
          'Ambiente limpio y seco',
          'Purificador de aire (sensibles a esporas)',
          'Socialización con múltiples personas desde jóvenes',
          'Ejercicio diario fuera de jaula',
          'Baños regulares',
          'Revisión veterinaria anual'
        ],
        veterinaryVisits: 'Cada 6-12 meses, especialmente importante en aves mayores'
      },
      breeding: {
        maturityAge: '3-4 años',
        breedingSeason: 'Primavera principalmente en cautiverio',
        clutchSize: '3-4 huevos',
        incubationPeriod: '25-28 días, polluelos destetados a las 10-12 semanas'
      },
      behavior: {
        vocalLevel: 2,
        activityLevel: 3,
        sociability: 4,
        trainability: 4,
        notes: [
          'Relativamente tranquilos, aptos para apartamentos',
          'Pueden aprender algunas palabras y silbidos',
          'Tienden a vincularse fuertemente con UNA persona',
          'Pueden ser territoriales con su jaula',
          'Muerden si se sienten amenazados o en época hormonal',
          'Disfrutan de rutinas predecibles',
          'Son más independientes que otros loros',
          'Pueden ser tímidos con extraños'
        ]
      },
      habitat: {
        origin: 'África Occidental (Senegal, Gambia, Guinea)',
        naturalHabitat: 'Sabanas arboladas, bosques abiertos',
        cageRequirements: [
          'Jaula alta con barrotes horizontales',
          'Múltiples perchas de diferentes texturas',
          'Juguetes para masticar (madera, cuero)',
          'Zona de forrajeo',
          'Columpios',
          'Área de descanso elevada',
          'Bañera o sistema de ducha'
        ],
        enrichment: [
          'Rotación de juguetes cada 1-2 semanas',
          'Juguetes de forrajeo y rompecabezas',
          'Ramas naturales para roer',
          'Entrenamiento con refuerzo positivo',
          'Tiempo fuera de jaula (2-3 horas diarias)',
          'Música clásica o jazz',
          'Interacción social diaria'
        ]
      },
      compatibility: {
        withOwnSpecies: 'Moderada. Pueden ser territoriales, mejor como aves solitarias o parejas establecidas',
        withOtherSpecies: 'Baja. Pueden ser agresivos con otras especies de loros',
        withChildren: 'Moderada a baja. Pueden morder. Mejor con adolescentes que respeten su espacio'
      },
      tips: [
        'Excelente loro para apartamentos (relativamente silencioso)',
        'Socializa con TODA la familia, no solo una persona',
        'Establece límites tempranos para evitar comportamiento territorial',
        'No fomentes comportamientos de pareja (acariciar solo la cabeza)',
        'Son sensibles a cambios de rutina',
        'Pueden ser tímidos, respeta su espacio',
        'Excelentes para dueños intermedios de loros',
        'Requieren menos atención que loros grandes',
        'Son longevos: compromiso de 25-30+ años',
        'Las semillas deben ser limitadas (obesidad)',
        'Son curiosos, asegura el espacio de vuelo',
        'Responden muy bien al entrenamiento con clicker'
      ]
    },
    {
      id: 'cacatua',
      commonName: 'Cacatúa',
      scientificName: 'Cacatuidae (varias especies)',
      description: 'Las cacatúas son loros grandes originarios de Australia y región circundante, famosos por su cresta distintiva y personalidad extremadamente cariñosa. Son aves muy inteligentes y demandantes que requieren MUCHA atención diaria. Forman vínculos profundos con sus cuidadores y pueden sufrir problemas de comportamiento graves si se descuidan. Solo para dueños MUY experimentados y comprometidos.',
      image: 'images/especies/especie-cacatua.avif',
      characteristics: {
        size: '30-60 cm dependiendo de la especie',
        weight: '300-1000 gramos (varía según especie)',
        lifespan: '40-70 años (algunas especies hasta 80-100 años)',
        temperament: ['Extremadamente cariñoso', 'Demandante', 'Inteligente', 'Sensible', 'Vocal', 'Social'],
        colors: ['Blanco con cresta amarilla (Sulphurea)', 'Blanco puro (Alba)', 'Rosa y gris (Galah)', 'Negro con mejillas rojas (Banksii)']
      },
      care: {
        dietBasic: 'Pellets premium de alta calidad + diversidad de alimentos frescos',
        dietDetails: [
          'Pellets de calidad premium para loros grandes (50-60%)',
          'Mezcla de semillas y nueces (20%): limitada por grasas',
          'Verduras frescas diarias: brócoli, zanahoria, calabaza, espinaca',
          'Frutas: mango, papaya, uva, granada, manzana (20%)',
          'Granos y legumbres cocidas: arroz, quinoa, lentejas',
          'Nueces: almendras, nueces, avellanas (con moderación)',
          'Evitar: aguacate, chocolate, sal, azúcar, cafeína, alcohol',
          'Agua fresca múltiples veces al día'
        ],
        cageSize: 'Mínimo 120x90x180 cm, prefieren aviarios o habitación dedicada',
        temperature: '18-26°C, evitar cambios bruscos',
        humidity: '50-70%',
        socialNeeds: 'CRÍTICO: Necesitan 4-6+ horas de atención DIARIA. Son extremadamente demandantes y pueden desarrollar problemas graves sin atención suficiente'
      },
      health: {
        commonIssues: [
          'ARRANCADO DE PLUMAS (muy común por estrés, soledad)',
          'Auto-mutilación por problemas emocionales',
          'Gritos excesivos por falta de atención',
          'Enfermedad del pico y las plumas de psitacidas (PBFD)',
          'Aspergilosis',
          'Obesidad',
          'Enfermedad hepática',
          'Problemas de comportamiento (agresión, fobias)'
        ],
        preventiveCare: [
          'Atención y estimulación DIARIA consistente',
          'Rutinas predecibles',
          'Enriquecimiento ambiental constante',
          'Dieta balanceada estricta',
          'Baños frecuentes',
          'Socialización continua',
          'Entrenamiento de comportamiento',
          'Chequeos veterinarios cada 6 meses'
        ],
        veterinaryVisits: 'Cada 6 meses MÍNIMO con veterinario especializado en aves exóticas'
      },
      breeding: {
        maturityAge: '3-7 años dependiendo de la especie',
        breedingSeason: 'Primavera principalmente',
        clutchSize: '2-3 huevos (varía según especie)',
        incubationPeriod: '24-30 días, polluelos destetados a las 12-16 semanas'
      },
      behavior: {
        vocalLevel: 5,
        activityLevel: 5,
        sociability: 5,
        trainability: 5,
        notes: [
          'EXTREMADAMENTE vocales: gritos muy fuertes (hasta 120 decibeles)',
          'Requieren atención CONSTANTE, como un niño pequeño',
          'Polvo de plumas abundante (consideración para alergias)',
          'Pueden desarrollar "behavior problems" graves si se descuidan',
          'Forman vínculos tan fuertes que pueden ser problemáticos',
          'Son destructores naturales potentes',
          'Necesitan espacio amplio para extender alas completamente',
          'NO son adecuadas para la mayoría de hogares',
          'Pueden ser territoriales y agresivas en época hormonal'
        ]
      },
      habitat: {
        origin: 'Australia, Indonesia, Filipinas, Nueva Guinea',
        naturalHabitat: 'Bosques, áreas boscosas, sabanas',
        cageRequirements: [
          'Jaula EXTRA GRANDE o aviario (mínimo 120x90x180 cm)',
          'Barrotes MUY resistentes (pueden doblar metal débil)',
          'Múltiples perchas robustas de madera natural',
          'ABUNDANTES juguetes destructibles',
          'Zona de forrajeo compleja',
          'Área de juego fuera de jaula',
          'Sistema de ducha o bañera grande',
          'Idealmente: habitación dedicada'
        ],
        enrichment: [
          'Rotación DIARIA de juguetes (mínimo 15-20 juguetes)',
          'Juguetes para destruir (madera, cartón, papel)',
          'Rompecabezas complejos de forrajeo',
          'Entrenamiento diario extenso (1-2 horas)',
          'Tiempo libre supervisado (4-6+ horas)',
          'Interacción social constante',
          'Actividades variadas (baile, juegos, exploración)',
          'Ramas grandes para trepar y destruir'
        ]
      },
      compatibility: {
        withOwnSpecies: 'Buena en parejas establecidas. Pueden ser territoriales',
        withOtherSpecies: 'Baja a moderada. Su tamaño puede intimidar a aves más pequeñas',
        withChildren: 'Baja. Su tamaño, pico fuerte y demandas las hacen inadecuadas para hogares con niños pequeños'
      },
      tips: [
        'ADVERTENCIA: NO son para principiantes o dueños casuales',
        'Requieren compromiso de 40-70+ AÑOS',
        'Son EXTREMADAMENTE ruidosas (problemas con vecinos garantizados)',
        'Polvo de plumas constante (limpieza diaria necesaria)',
        'Costosas de mantener (comida, juguetes, veterinario)',
        'Pueden destruir muebles y paredes si salen de jaula',
        'Requieren veterinario especializado en aves exóticas',
        'Arrancado de plumas es COMÚN si no reciben atención adecuada',
        'Considera seriamente ADOPTAR en lugar de comprar',
        'Muchas cacatúas son abandonadas por ser "demasiado"',
        'Necesitan rutinas ESTRICTAS y consistentes',
        'Son como tener un niño pequeño de por vida',
        'Solo adquiere si puedes dedicar 4-6+ horas DIARIAS',
        'Investiga MUCHO antes de comprometerte',
        'Considera especies más pequeñas si dudas'
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
