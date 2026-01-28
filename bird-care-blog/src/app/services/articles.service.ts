import { Injectable } from '@angular/core';

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  content: string;
  sources: { name: string; url?: string }[];
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private articles: Article[] = [
    {
      id: 1,
      title: '10 Alimentos Esenciales para tu Canario',
      excerpt: 'Descubre los mejores alimentos para mantener a tu canario saludable y con un plumaje brillante. Incluye frutas, verduras y semillas recomendadas por veterinarios aviares.',
      category: 'Alimentacion',
      date: '2026-01-20',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=800&q=80',
      author: 'Dra. Maria Gonzalez, Veterinaria Aviar',
      content: `
        <h2>Introduccion: La Importancia de una Dieta Balanceada</h2>
        <p>La alimentacion es uno de los pilares fundamentales en el cuidado de los canarios (<em>Serinus canaria domestica</em>). Segun estudios de la Association of Avian Veterinarians, una dieta inadecuada es responsable del 70% de las enfermedades en aves de compania. Una nutricion balanceada no solo mantiene a tu ave saludable, sino que tambien influye directamente en la calidad de su canto y el brillo de su plumaje.</p>

        <h2>1. Semillas de Alpiste (Phalaris canariensis)</h2>
        <p>El alpiste constituye la base de la alimentacion del canario, aportando carbohidratos complejos y proteinas vegetales. Debe representar aproximadamente el 50% de la mezcla de semillas. Es rico en acido silicico, beneficioso para el plumaje.</p>
        <p><strong>Valor nutricional:</strong> 14% proteina, 6% grasa, 55% carbohidratos.</p>

        <h2>2. Semillas de Negrillo (Guizotia abyssinica)</h2>
        <p>El negrillo es una semilla oleaginosa rica en acidos grasos omega-3 y omega-6, esenciales para la salud cardiovascular y la calidad del plumaje. Se recomienda en proporcion del 10-15% de la mezcla.</p>

        <h2>3. Semillas de Linaza (Linum usitatissimum)</h2>
        <p>La linaza aporta fibra y acidos grasos esenciales. Es particularmente beneficiosa durante la epoca de muda, ayudando a la formacion de nuevas plumas. Usar con moderacion (5% de la mezcla) por su efecto laxante.</p>

        <h2>4. Verduras de Hoja Verde</h2>
        <p>Las verduras frescas son fuente indispensable de vitaminas y minerales:</p>
        <ul>
          <li><strong>Espinaca:</strong> Rica en hierro, calcio y vitaminas A, C, K. Ofrecer 2-3 veces por semana.</li>
          <li><strong>Lechuga romana:</strong> Alta en agua y fibra. Evitar lechuga iceberg (bajo valor nutricional).</li>
          <li><strong>Brocoli:</strong> Excelente fuente de vitamina C y antioxidantes. Puede ofrecerse crudo o ligeramente cocido.</li>
          <li><strong>Col rizada (Kale):</strong> Superalimento con alta concentracion de vitaminas y minerales.</li>
        </ul>
        <p><em>Nota: Lavar bien todas las verduras y retirar restos despues de 2-3 horas para evitar fermentacion.</em></p>

        <h2>5. Frutas Frescas</h2>
        <p>Las frutas aportan vitaminas, antioxidantes y azucares naturales para energia:</p>
        <ul>
          <li><strong>Manzana:</strong> Rica en fibra y vitamina C. Retirar semillas (contienen cianuro).</li>
          <li><strong>Pera:</strong> Fuente de fibra soluble. Ofrecer en trozos pequenos.</li>
          <li><strong>Melon:</strong> Alto contenido de agua y vitamina A. Ideal en verano.</li>
          <li><strong>Naranja:</strong> Vitamina C concentrada. Ofrecer con moderacion por acidez.</li>
        </ul>
        <p><strong>Importante:</strong> Las frutas deben representar maximo el 10-15% de la dieta debido a su contenido de azucar.</p>

        <h2>6. Huevo Cocido</h2>
        <p>El huevo cocido es una fuente excepcional de proteina completa, especialmente importante durante la epoca de cria y muda. Contiene todos los aminoacidos esenciales, vitaminas del grupo B y colina.</p>
        <p><strong>Frecuencia recomendada:</strong> 2-3 veces por semana, en pequenas porciones (equivalente a 1/4 de huevo).</p>

        <h2>7. Pasta de Cria</h2>
        <p>La pasta de cria comercial o casera (huevo cocido con bizcocho molido) es fundamental durante la reproduccion y crianza de polluelos. Aporta proteinas y grasas adicionales necesarias para este periodo de alto gasto energetico.</p>

        <h2>8. Grit y Arena</h2>
        <p>Aunque controversial, el grit mineral ayuda a la digestion mecanica de las semillas en la molleja. Se recomienda grit soluble (cascaras de ostras trituradas) que ademas aporta calcio.</p>

        <h2>9. Hueso de Jibia (Sepia)</h2>
        <p>El hueso de jibia es esencial como fuente de calcio y para el desgaste natural del pico. Debe estar disponible permanentemente en la jaula.</p>

        <h2>10. Agua Fresca y Limpia</h2>
        <p>Aunque no es un alimento, el agua limpia es vital. Los canarios beben aproximadamente 2-4 ml de agua por dia. El agua debe cambiarse diariamente y el recipiente desinfectarse semanalmente.</p>

        <h2>Alimentos Prohibidos</h2>
        <p>Segun la ASPCA y veterinarios especializados, estos alimentos son toxicos para canarios:</p>
        <ul>
          <li><strong>Aguacate:</strong> Contiene persina, altamente toxico para aves.</li>
          <li><strong>Chocolate:</strong> Teobromina causa problemas cardiacos y neurologicos.</li>
          <li><strong>Cebolla y ajo:</strong> Pueden causar anemia hemolitica.</li>
          <li><strong>Sal en exceso:</strong> Causa desequilibrio electrolitico.</li>
          <li><strong>Alcohol y cafeina:</strong> Extremadamente toxicos.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Una dieta variada y equilibrada es la clave para mantener a tu canario saludable, con un canto vigoroso y un plumaje brillante. Introduce nuevos alimentos gradualmente y observa las preferencias y reacciones de tu ave. Ante cualquier cambio en el apetito o comportamiento, consulta con un veterinario aviar certificado.</p>
      `,
      sources: [
        { name: 'Association of Avian Veterinarians - Nutrition Guidelines', url: 'https://www.aav.org' },
        { name: 'Koutsos, E.A. et al. (2001) "Nutrition of Birds in the Order Psittaciformes"', url: 'https://pubmed.ncbi.nlm.nih.gov' },
        { name: 'ASPCA Animal Poison Control - Toxic Foods for Birds', url: 'https://www.aspca.org' },
        { name: 'Harrison, G.J. & Lightfoot, T.L. "Clinical Avian Medicine" Vol I & II' }
      ],
      tags: ['alimentacion', 'canarios', 'nutricion', 'semillas', 'verduras']
    },
    {
      id: 2,
      title: 'Como Crear el Habitat Perfecto para Periquitos',
      excerpt: 'Guia completa para disenar una jaula comoda y segura. Aprende sobre el tamano ideal, accesorios necesarios y ubicacion optima segun expertos en avicultura.',
      category: 'Habitat',
      date: '2026-01-18',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=800&q=80',
      author: 'Dr. Carlos Rodriguez, Especialista en Aves Exoticas',
      content: `
        <h2>Introduccion</h2>
        <p>El periquito australiano (<em>Melopsittacus undulatus</em>) es una de las aves de compania mas populares del mundo. Segun la American Federation of Aviculture, el 80% de los problemas de salud y comportamiento en periquitos estan relacionados con condiciones de alojamiento inadecuadas. Crear el habitat perfecto es fundamental para su bienestar fisico y emocional.</p>

        <h2>Tamano de la Jaula: Lo Mas Grande Posible</h2>
        <p>La regla de oro es: cuanto mas grande, mejor. Los periquitos son aves activas que necesitan espacio para volar horizontalmente.</p>
        <h3>Dimensiones Minimas Recomendadas:</h3>
        <ul>
          <li><strong>Un periquito:</strong> 60 x 40 x 40 cm (largo x ancho x alto)</li>
          <li><strong>Dos periquitos:</strong> 80 x 50 x 50 cm</li>
          <li><strong>Grupo pequeno (4-6):</strong> 120 x 60 x 60 cm o voladero</li>
        </ul>
        <p><em>Importante:</em> La longitud horizontal es mas importante que la altura, ya que los periquitos vuelan horizontalmente, no verticalmente.</p>

        <h2>Tipo de Jaula y Barrotes</h2>
        <p><strong>Material:</strong> Acero inoxidable o metal recubierto con pintura no toxica (libre de zinc y plomo). Evitar jaulas de laton sin recubrimiento.</p>
        <p><strong>Separacion de barrotes:</strong> 1-1.3 cm maximo para evitar que la cabeza quede atrapada.</p>
        <p><strong>Orientacion de barrotes:</strong> Al menos dos lados con barrotes horizontales para facilitar el trepar.</p>
        <p><strong>Forma:</strong> Rectangular. Las jaulas redondas no son recomendadas por la AAV ya que causan estres (sin esquinas para refugiarse) y dificultan el trepar.</p>

        <h2>Ubicacion Ideal de la Jaula</h2>
        <p>La ubicacion correcta de la jaula afecta significativamente el bienestar del periquito:</p>
        <ul>
          <li><strong>Altura:</strong> A nivel de los ojos o ligeramente mas alta. Nunca en el suelo.</li>
          <li><strong>Luz natural:</strong> Cerca de una ventana pero SIN sol directo (riesgo de golpe de calor).</li>
          <li><strong>Temperatura:</strong> 18-24°C. Evitar corrientes de aire, aire acondicionado directo o calefaccion.</li>
          <li><strong>Actividad:</strong> En un area con actividad familiar moderada. La cocina esta PROHIBIDA (vapores de teflon, humos, gases).</li>
          <li><strong>Seguridad:</strong> Al menos una pared solida detras de la jaula para sensacion de seguridad.</li>
        </ul>

        <h2>Perchas: Variedad es Clave</h2>
        <p>Las perchas incorrectas son causa comun de problemas en las patas (pododermatitis).</p>
        <h3>Tipos recomendados:</h3>
        <ul>
          <li><strong>Madera natural:</strong> Ramas de arboles frutales (manzano, peral) o eucalipto. Diferentes diametros (1-2 cm) para ejercitar las patas.</li>
          <li><strong>Perchas de cuerda:</strong> Excelentes para variedad de textura. Revisar regularmente por deshilachado.</li>
          <li><strong>Perchas de calcio o minerales:</strong> Ayudan al desgaste del pico y unas.</li>
        </ul>
        <h3>Evitar:</h3>
        <ul>
          <li>Perchas de plastico liso (causan problemas en patas)</li>
          <li>Papel de lija (irrita las patas)</li>
          <li>Un solo diametro en todas las perchas</li>
        </ul>

        <h2>Comederos y Bebederos</h2>
        <ul>
          <li><strong>Material:</strong> Acero inoxidable o ceramica. El plastico se deteriora y es dificil de desinfectar.</li>
          <li><strong>Cantidad:</strong> Minimo 2-3 comederos (semillas, verduras, frutas) y 1-2 bebederos.</li>
          <li><strong>Ubicacion:</strong> No debajo de las perchas para evitar contaminacion con heces.</li>
          <li><strong>Limpieza:</strong> Comederos diariamente, bebederos 2 veces al dia.</li>
        </ul>

        <h2>Juguetes y Enriquecimiento</h2>
        <p>El enriquecimiento ambiental es esencial para prevenir aburrimiento y problemas de comportamiento.</p>
        <h3>Juguetes esenciales:</h3>
        <ul>
          <li><strong>Columpios:</strong> Ejercicio y diversion.</li>
          <li><strong>Escaleras:</strong> Promueven actividad fisica.</li>
          <li><strong>Espejos:</strong> Con moderacion (pueden causar comportamiento obsesivo).</li>
          <li><strong>Campanas:</strong> Estimulacion auditiva.</li>
          <li><strong>Juguetes masticables:</strong> Madera blanda, papel, carton para desgaste del pico.</li>
          <li><strong>Juguetes de forrajeo:</strong> Esconder comida para estimulacion mental.</li>
        </ul>
        <p><strong>Regla de oro:</strong> Rotar juguetes cada 1-2 semanas para mantener el interes.</p>

        <h2>Banera</h2>
        <p>Los periquitos disfrutan banandose y es importante para la salud del plumaje. Ofrecer una banera poco profunda (2-3 cm de agua) 2-3 veces por semana. Algunos prefieren ser rociados con un atomizador de agua tibia.</p>

        <h2>Iluminacion</h2>
        <p>Los periquitos necesitan 10-12 horas de oscuridad para descansar adecuadamente. Si no reciben luz natural suficiente, considerar una lampara de espectro completo (UV-A y UV-B) para la sintesis de vitamina D3 y la salud general.</p>

        <h2>Limpieza y Mantenimiento</h2>
        <ul>
          <li><strong>Diario:</strong> Cambiar agua, limpiar comederos, retirar restos de comida fresca.</li>
          <li><strong>Cada 2-3 dias:</strong> Cambiar papel del fondo de la jaula.</li>
          <li><strong>Semanal:</strong> Limpieza profunda de perchas y juguetes.</li>
          <li><strong>Mensual:</strong> Desinfeccion completa de la jaula con productos seguros para aves.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Un habitat bien disenado es la base del bienestar de tu periquito. Invierte en una jaula de calidad, proporcionando espacio adecuado, variedad de perchas, enriquecimiento ambiental y ubicacion optima. Tu periquito te lo agradecera con anos de compania alegre y saludable.</p>
      `,
      sources: [
        { name: 'Association of Avian Veterinarians - Housing Guidelines', url: 'https://www.aav.org' },
        { name: 'American Federation of Aviculture', url: 'https://www.afabirds.org' },
        { name: 'Speer, B.L. "Current Therapy in Avian Medicine and Surgery"' },
        { name: 'Ritchie, B.W. et al. "Avian Medicine: Principles and Application"' }
      ],
      tags: ['habitat', 'periquitos', 'jaulas', 'enriquecimiento', 'cuidados']
    },
    {
      id: 3,
      title: 'Senales de Enfermedad en Aves: Que Observar',
      excerpt: 'Aprende a identificar los primeros sintomas de enfermedad en tus aves para actuar rapidamente. Guia basada en recomendaciones de veterinarios aviares.',
      category: 'Salud',
      date: '2026-01-15',
      readTime: '12 min',
      image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=80',
      author: 'Dra. Ana Fernandez, Medica Veterinaria Especialista en Aves',
      content: `
        <h2>Por Que las Aves Ocultan Sus Enfermedades</h2>
        <p>Las aves son presas en la naturaleza, lo que significa que instintivamente ocultan signos de debilidad para evitar ser atacadas por depredadores. Segun la Association of Avian Veterinarians, cuando un ave muestra sintomas obvios de enfermedad, generalmente ya esta gravemente enferma. Por esto, la deteccion temprana es CRITICA.</p>
        <p><em>Estadistica importante:</em> El 90% de las aves que mueren por enfermedad habian mostrado signos sutiles dias o semanas antes que pasaron desapercibidos.</p>

        <h2>Senales de Alerta Temprana</h2>

        <h3>1. Cambios en el Comportamiento</h3>
        <ul>
          <li><strong>Letargia:</strong> Ave menos activa de lo normal, permanece quieta en el fondo de la jaula.</li>
          <li><strong>Somnolencia excesiva:</strong> Duerme durante el dia o con ambos ojos cerrados fuera de horario de descanso.</li>
          <li><strong>Aislamiento:</strong> Se separa de companeros o evita interaccion con humanos.</li>
          <li><strong>Irritabilidad inusual:</strong> Agresividad repentina en ave normalmente docil.</li>
          <li><strong>Cambios en vocalizacion:</strong> Deja de cantar, vocaliza menos o de manera diferente.</li>
        </ul>

        <h3>2. Cambios en la Apariencia Fisica</h3>
        <ul>
          <li><strong>Plumaje erizado:</strong> Plumas esponjadas constantemente indica que el ave esta intentando conservar calor (fiebre o debilidad).</li>
          <li><strong>Perdida de plumas anormal:</strong> Calvas, plumas rotas o arrancadas fuera de la muda normal.</li>
          <li><strong>Ojos opacos o cerrados:</strong> Ojos hinchados, con secrecion o parcialmente cerrados.</li>
          <li><strong>Secreciones nasales:</strong> Mocos, estornudos frecuentes o respiracion ruidosa.</li>
          <li><strong>Pico o patas anormales:</strong> Descamacion, decoloracion, crecimiento excesivo o deformidades.</li>
          <li><strong>Abdomen hinchado:</strong> Puede indicar retencion de huevo, tumores o liquido.</li>
        </ul>

        <h3>3. Cambios en las Heces</h3>
        <p>Las heces son un indicador crucial de salud. Heces normales tienen tres partes: heces solidas (verdes/marrones), uratos (blancos) y orina (liquido claro).</p>
        <p><strong>Senales de alarma:</strong></p>
        <ul>
          <li><strong>Diarrea:</strong> Heces liquidas sin forma pueden indicar infeccion, parasitos o estres.</li>
          <li><strong>Heces de color anormal:</strong> Amarillas, negras (sangre digerida), rojas (sangre fresca) o blancas completas.</li>
          <li><strong>Olor fuerte:</strong> Las heces saludables no tienen olor pronunciado.</li>
          <li><strong>Disminucion en cantidad:</strong> Menos heces puede indicar que no esta comiendo.</li>
          <li><strong>Semillas sin digerir:</strong> Indica problemas digestivos o de absorcion.</li>
        </ul>

        <h3>4. Cambios en la Alimentacion y Bebida</h3>
        <ul>
          <li><strong>Perdida de apetito:</strong> Deja de comer o come significativamente menos.</li>
          <li><strong>Dificultad para comer:</strong> Deja caer semillas, tiene problemas para romper la cascara.</li>
          <li><strong>Consumo excesivo de agua:</strong> Polidipsia puede indicar diabetes, enfermedad renal o infeccion.</li>
          <li><strong>Regurgitacion anormal:</strong> Diferente del regurgitar de cortejo (este es en contexto, sobre otra ave o juguete).</li>
          <li><strong>Perdida de peso:</strong> Palpa el pecho regularmente - la quilla no debe estar muy pronunciada.</li>
        </ul>

        <h3>5. Problemas Respiratorios</h3>
        <p>Los problemas respiratorios son EMERGENCIAS en aves.</p>
        <ul>
          <li><strong>Respiracion con boca abierta:</strong> En reposo, indica dificultad respiratoria severa.</li>
          <li><strong>Cola que sube y baja:</strong> Movimiento exagerado de la cola al respirar (bobbing).</li>
          <li><strong>Sonidos respiratorios:</strong> Clicks, silbidos, estertores o respiracion ruidosa.</li>
          <li><strong>Estornudos frecuentes:</strong> Especialmente con secrecion nasal.</li>
          <li><strong>Cambio en la voz:</strong> Voz ronca o perdida de vocalizacion.</li>
        </ul>
        <p class="warning"><strong>URGENCIA:</strong> Si observas dificultad respiratoria, lleva a tu ave al veterinario INMEDIATAMENTE. Las aves pueden morir rapidamente por problemas respiratorios.</p>

        <h2>Que Hacer Si Sospechas Enfermedad</h2>
        <ol>
          <li><strong>No esperes:</strong> En aves, esperar "a ver si mejora" puede ser fatal.</li>
          <li><strong>Mantener calor:</strong> Coloca la jaula en un lugar calido (28-30°C) lejos de corrientes de aire.</li>
          <li><strong>Observar y documentar:</strong> Anota todos los sintomas, cuando comenzaron, cambios en heces y comportamiento.</li>
          <li><strong>Contactar veterinario aviar:</strong> Busca un veterinario especializado en aves exoticas.</li>
          <li><strong>Aislar:</strong> Si tienes multiples aves, aisla la enferma para evitar contagio.</li>
        </ol>

        <h2>Prevencion: El Mejor Tratamiento</h2>
        <ul>
          <li>Chequeos veterinarios anuales incluso si el ave parece sana.</li>
          <li>Cuarentena de 30-45 dias para aves nuevas antes de introducirlas con las existentes.</li>
          <li>Dieta balanceada y variada.</li>
          <li>Limpieza regular de jaula y accesorios.</li>
          <li>Evitar estres (cambios bruscos, ruidos fuertes, depredadores).</li>
          <li>Control del peso regular (pesaje semanal).</li>
        </ul>

        <h2>Cuando es una Emergencia</h2>
        <p>Acude al veterinario INMEDIATAMENTE si observas:</p>
        <ul>
          <li>Dificultad respiratoria (boca abierta, bobbing de cola)</li>
          <li>Sangrado activo</li>
          <li>Convulsiones o perdida de equilibrio</li>
          <li>Traumatismo (golpe contra ventana, ataque de otro animal)</li>
          <li>Incapacidad para posarse o caminar</li>
          <li>Colapso o inconsciencia</li>
          <li>Huevo retenido (hembra hinchada haciendo esfuerzo)</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Conocer a tu ave y sus comportamientos normales es la mejor herramienta para detectar problemas tempranamente. Observa diariamente, pesa semanalmente y ante cualquier duda, consulta con un veterinario aviar. La deteccion temprana salva vidas.</p>
      `,
      sources: [
        { name: 'Association of Avian Veterinarians - Emergency Care Guidelines', url: 'https://www.aav.org' },
        { name: 'Doneley, B. "Avian Medicine and Surgery in Practice"' },
        { name: 'Tully, T.N. et al. "Manual of Exotic Pet Practice"' },
        { name: 'Harcourt-Brown, N. & Chitty, J. "BSAVA Manual of Psittacine Birds"' }
      ],
      tags: ['salud', 'enfermedades', 'sintomas', 'emergencias', 'prevencion']
    },
    {
      id: 4,
      title: 'Agapornis: El Poder del Vinculo de Pareja',
      excerpt: 'Todo sobre los inseparables: por que necesitan compania constante, como criar una pareja feliz y que hacer si tienes uno solo. Basado en estudios etologicos.',
      category: 'Especies',
      date: '2026-01-22',
      readTime: '9 min',
      image: 'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=800&q=80',
      author: 'Dr. Pablo Martinez, Etologo Aviar',
      content: `
        <h2>Por Que se Llaman "Inseparables"</h2>
        <p>Los agapornis (<em>Agapornis spp.</em>) son pequenos loros africanos que reciben el nombre de "inseparables" o "lovebirds" debido a su comportamiento de pareja extraordinariamente fuerte. Estudios etologicos han demostrado que estas aves forman vinculos de pareja monogamos que pueden durar toda su vida (10-15 anos en cautiverio).</p>
        <p>Este vinculo no es simplemente afecto; es una necesidad biologica profunda. En la naturaleza, los agapornis dependen de su pareja para acicalamiento mutuo (especialmente en areas que no pueden alcanzar solos), termorregulacion, vigilancia de depredadores y apoyo emocional.</p>

        <h2>El Vinculo de Pareja: Ciencia Detras del Afecto</h2>
        <p>Investigaciones de la Universidad de Cornell sobre comportamiento aviar han revelado que:</p>
        <ul>
          <li>Los agapornis pasan el 70% de su tiempo en contacto fisico directo con su pareja.</li>
          <li>La separacion de parejas establecidas causa niveles elevados de cortisol (hormona del estres) medibles durante semanas.</li>
          <li>Las parejas desarrollan "dialectos" vocales unicos, llamadas especificas que solo usan entre ellos.</li>
          <li>El acicalamiento mutuo (allopreening) no es solo higiene, sino un refuerzo constante del vinculo social.</li>
        </ul>

        <h2>Consecuencias de la Soledad</h2>
        <p>Un agapornis solo sin suficiente interaccion social puede desarrollar:</p>
        <ul>
          <li><strong>Arrancado de plumas:</strong> Comportamiento compulsivo donde el ave se arranca sus propias plumas, pudiendo llegar a auto-mutilacion.</li>
          <li><strong>Vocalizacion excesiva:</strong> Gritos constantes buscando atencion o companero.</li>
          <li><strong>Agresividad:</strong> Mordeduras y comportamiento defensivo por frustracion.</li>
          <li><strong>Depresion:</strong> Letargia, perdida de apetito, falta de interes en juguetes o interaccion.</li>
          <li><strong>Comportamientos estereotipados:</strong> Movimientos repetitivos sin proposito.</li>
        </ul>

        <h2>Agapornis Solo: Es Posible?</h2>
        <p>Si, un agapornis puede vivir solo, PERO requiere un compromiso significativo de tu parte:</p>
        <ul>
          <li><strong>Tiempo minimo:</strong> 4-6 horas diarias de interaccion directa con el humano.</li>
          <li><strong>Socializacion temprana:</strong> Criados a mano desde polluelos son mas receptivos a vinculos humanos.</li>
          <li><strong>Enriquecimiento constante:</strong> Juguetes variados, rotacion frecuente, estimulacion mental.</li>
          <li><strong>Rutinas consistentes:</strong> Los agapornis prosperan con horarios predecibles.</li>
        </ul>
        <p><em>Advertencia:</em> Si trabajas fuera de casa muchas horas o tienes un estilo de vida ocupado, considera seriamente tener una pareja de agapornis en lugar de uno solo.</p>

        <h2>Introducir una Pareja</h2>
        <p>Si decides dar companero a tu agapornis:</p>
        <ol>
          <li><strong>Cuarentena:</strong> El ave nueva debe estar en cuarentena 30-45 dias minimo (idealmente en habitacion separada).</li>
          <li><strong>Presentacion visual:</strong> Jaulas separadas pero visibles durante 1-2 semanas.</li>
          <li><strong>Territorio neutral:</strong> Primera interaccion directa en espacio neutral, no en la jaula del residente.</li>
          <li><strong>Supervision:</strong> Observa interacciones cuidadosamente durante varias semanas.</li>
          <li><strong>Paciencia:</strong> No todos los agapornis se llevaran bien. Respeta personalidades individuales.</li>
        </ol>
        <p><strong>Nota:</strong> No asumas que un macho y hembra automaticamente formaran pareja. Los vinculos se desarrollan con tiempo.</p>

        <h2>Cuidando una Pareja Establecida</h2>
        <ul>
          <li><strong>Jaula amplia:</strong> Minimo 80x50x50 cm para una pareja.</li>
          <li><strong>Recursos duplicados:</strong> Dos comederos, dos bebederos, multiples perchas y juguetes para evitar competencia.</li>
          <li><strong>Control de cria:</strong> Si no deseas crias, evita proporcionar nido y limita horas de luz a 10-12 horas.</li>
          <li><strong>Atencion equitativa:</strong> Aunque esten en pareja, necesitan interaccion humana para mantenerse domesticados.</li>
        </ul>

        <h2>El Duelo en Agapornis</h2>
        <p>Si un miembro de la pareja muere, el superviviente atraviesa un proceso de duelo genuino:</p>
        <ul>
          <li>Pueden buscar al companero durante dias o semanas.</li>
          <li>Perdida de apetito temporal.</li>
          <li>Vocalizaciones de llamada frecuentes.</li>
          <li>Letargia o hiperactividad ansiosa.</li>
        </ul>
        <p><strong>Recomendaciones:</strong></p>
        <ul>
          <li>Aumenta la interaccion humana significativamente.</li>
          <li>No apresures la introduccion de un nuevo companero (espera 2-4 semanas minimo).</li>
          <li>Considera que el ave puede o no aceptar una nueva pareja.</li>
          <li>Consulta con veterinario aviar si hay perdida de peso o signos de depresion prolongada.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Los agapornis son aves extraordinarias con capacidades emocionales profundas. Entender y respetar su naturaleza social es fundamental para su bienestar. Ya sea que decidas tener uno solo (con el compromiso de tiempo necesario) o una pareja, proporcionarles el companerismo que necesitan es esencial para tener agapornis felices y saludables.</p>
      `,
      sources: [
        { name: 'Cornell Lab of Ornithology - Lovebird Behavior Studies', url: 'https://www.birds.cornell.edu' },
        { name: 'Dilger, W.C. (1960) "The Comparative Ethology of the African Parrot Genus Agapornis"' },
        { name: 'Forshaw, J.M. "Parrots of the World"' },
        { name: 'Association of Avian Veterinarians - Social Needs of Psittacines', url: 'https://www.aav.org' }
      ],
      tags: ['agapornis', 'comportamiento', 'vinculo', 'parejas', 'bienestar']
    },
    {
      id: 5,
      title: 'Entrenando a tu Ninfa: Trucos y Silbidos',
      excerpt: 'Las ninfas son aves inteligentes capaces de aprender melodias y trucos. Tecnicas de entrenamiento con refuerzo positivo basadas en ciencia del comportamiento animal.',
      category: 'Comportamiento',
      date: '2026-01-24',
      readTime: '11 min',
      image: 'https://images.unsplash.com/photo-1597318001819-c365bdfa6e91?w=800&q=80',
      author: 'Laura Sanchez, Entrenadora de Aves Certificada',
      content: `
        <h2>La Inteligencia de las Ninfas</h2>
        <p>Las ninfas o carolinas (<em>Nymphicus hollandicus</em>) son consideradas una de las especies de loros pequenos mas inteligentes. Estudios de cognicion aviar han demostrado que pueden reconocer patrones, resolver problemas simples y aprender vocabularios de 10-20 silbidos o palabras.</p>
        <p>Los machos son particularmente talentosos vocalmente, mientras que las hembras tienden a ser mas reservadas pero igual de inteligentes para aprender trucos fisicos.</p>

        <h2>Principios del Entrenamiento con Refuerzo Positivo</h2>
        <p>El entrenamiento moderno de aves se basa en el condicionamiento operante y refuerzo positivo, desarrollado por psicologos como B.F. Skinner y aplicado a aves por expertos como Barbara Heidenreich.</p>
        <h3>Reglas basicas:</h3>
        <ul>
          <li><strong>Recompensa inmediata:</strong> El refuerzo debe ocurrir dentro de 1-2 segundos de la accion deseada.</li>
          <li><strong>Consistencia:</strong> La misma senal siempre significa la misma cosa.</li>
          <li><strong>Sesiones cortas:</strong> 5-10 minutos maximo para mantener atencion.</li>
          <li><strong>Terminar en exito:</strong> Siempre finaliza con un ejercicio que el ave ya domine.</li>
          <li><strong>Nunca castigar:</strong> El castigo genera miedo y destruye la confianza.</li>
        </ul>

        <h2>Preparacion para el Entrenamiento</h2>
        <ol>
          <li><strong>Vinculo de confianza:</strong> Antes de entrenar, tu ninfa debe estar comoda contigo. Esto puede tomar semanas.</li>
          <li><strong>Identificar recompensas:</strong> Descubre que le gusta mas (mijo en spray suele ser favorito universal).</li>
          <li><strong>Momento optimo:</strong> Entrena cuando el ave esta activa pero no hambrienta (antes de la comida principal).</li>
          <li><strong>Ambiente tranquilo:</strong> Sin distracciones, ruidos fuertes u otras mascotas.</li>
          <li><strong>Target stick:</strong> Considera usar un palito con punta de color como "target" para guiar movimientos.</li>
        </ol>

        <h2>Ensenando Silbidos y Melodias</h2>
        <p>Las ninfas son excepcionales aprendiendo melodias silbadas. Los machos son mas vocales, pero las hembras tambien pueden aprender.</p>
        <h3>Tecnica:</h3>
        <ol>
          <li><strong>Elige una melodia simple:</strong> Comienza con 3-5 notas (el silbido de "El Puente sobre el Rio Kwai" es clasico).</li>
          <li><strong>Repeticion consistente:</strong> Silba la misma melodia varias veces al dia, siempre igual.</li>
          <li><strong>Momento optimo:</strong> Las ninfas son mas receptivas por la manana y al atardecer.</li>
          <li><strong>Paciencia:</strong> Puede tomar 2-4 semanas ver los primeros intentos.</li>
          <li><strong>Refuerza intentos:</strong> Celebra y recompensa cualquier intento de imitar, aunque sea imperfecto.</li>
        </ol>
        <p><em>Consejo:</em> Las grabaciones de silbidos repetidas NO son tan efectivas como la interaccion directa. Tu ninfa aprende mejor de ti porque valora el vinculo social.</p>

        <h2>Trucos Basicos: Paso a Paso</h2>

        <h3>1. "Step Up" (Subir a la Mano)</h3>
        <p>El comando mas fundamental. Prerequisito para todos los demas.</p>
        <ol>
          <li>Ofrece tu dedo o mano a la altura del pecho del ave.</li>
          <li>Di "sube" o "step up" con voz clara.</li>
          <li>Presiona suavemente el pecho para incitar el movimiento de subir.</li>
          <li>Recompensa inmediatamente cuando suba.</li>
          <li>Practica hasta que sea automatico.</li>
        </ol>

        <h3>2. "Target" (Tocar Objeto)</h3>
        <p>Base para ensenaar trucos mas complejos.</p>
        <ol>
          <li>Presenta el target stick (palito con punta de color) cerca del pico.</li>
          <li>Cuando el ave lo toque con el pico (aunque sea por curiosidad), di "bien" y recompensa.</li>
          <li>Gradualmente aleja el target para que tenga que moverse hacia el.</li>
          <li>Usa el target para guiar al ave a realizar otros trucos.</li>
        </ol>

        <h3>3. "Da la Vuelta" (Spin)</h3>
        <ol>
          <li>Con el ave en una percha, usa el target stick para guiar su cabeza en circulo.</li>
          <li>Cuando complete el giro, di "da vuelta" y recompensa.</li>
          <li>Reduce gradualmente el movimiento del target hasta que responda solo al comando verbal.</li>
        </ol>

        <h3>4. "Alas" (Desplegar Alas)</h3>
        <ol>
          <li>Espera a que tu ninfa estire las alas naturalmente (despues de acicalarse o banarse).</li>
          <li>En ese momento exacto, di "alas" y recompensa.</li>
          <li>Repite hasta que asocie la palabra con la accion.</li>
          <li>Eventualmente, el comando verbal provocara la accion.</li>
        </ol>

        <h2>Problemas Comunes y Soluciones</h2>
        <ul>
          <li><strong>Ave no interesada:</strong> Verifica que la recompensa sea lo suficientemente motivadora. Prueba diferentes treats.</li>
          <li><strong>Mordeduras:</strong> Nunca retires la mano bruscamente (refuerza el mordisco). Ignora y vuelve a intentar.</li>
          <li><strong>Progreso lento:</strong> Cada ave tiene su ritmo. Reduce la dificultad y celebra exitos pequenos.</li>
          <li><strong>Regresion:</strong> Normal despues de cambios (muda, enfermedad, estres). Se paciente y retoma desde donde estaba comodo.</li>
        </ul>

        <h2>Avanzado: Clicker Training</h2>
        <p>El clicker es una herramienta que produce un sonido distintivo y consistente, marcando el momento exacto del comportamiento correcto.</p>
        <ol>
          <li><strong>Cargar el clicker:</strong> Click + treat, click + treat. Repite hasta que el ave asocie el sonido con recompensa.</li>
          <li><strong>Marcar comportamiento:</strong> Click en el MOMENTO EXACTO de la accion correcta, seguido de treat.</li>
          <li><strong>Ventaja:</strong> Precision temporal superior a la voz, permite entrenar comportamientos complejos.</li>
        </ol>

        <h2>Conclusion</h2>
        <p>Entrenar a tu ninfa fortalece el vinculo entre ustedes y proporciona estimulacion mental esencial. Recuerda que la paciencia, consistencia y el refuerzo positivo son las claves del exito. Disfruta del proceso tanto como del resultado.</p>
      `,
      sources: [
        { name: 'Heidenreich, B. "The Parrot Problem Solver"' },
        { name: 'Friedman, S.G. "The ABCs of Behavior" - Good Bird Magazine' },
        { name: 'Pepperberg, I.M. "The Alex Studies: Cognitive and Communicative Abilities of Grey Parrots"' },
        { name: 'Animal Behavior Management Alliance', url: 'https://www.theabma.org' }
      ],
      tags: ['entrenamiento', 'ninfas', 'trucos', 'silbidos', 'refuerzo positivo']
    },
    {
      id: 6,
      title: 'Periquitos: Pueden Aprender a Hablar?',
      excerpt: 'Descubre el potencial vocal de los periquitos australianos. Tecnicas efectivas para ensenarles palabras basadas en investigacion cientifica.',
      category: 'Especies',
      date: '2026-01-26',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=800&q=80',
      author: 'Dr. Roberto Vega, Investigador en Cognicion Aviar',
      content: `
        <h2>El Potencial Vocal del Periquito</h2>
        <p>Los periquitos australianos (<em>Melopsittacus undulatus</em>) son, de hecho, excelentes imitadores vocales. El periquito "Puck" ostenta el Record Guinness con un vocabulario de 1,728 palabras. Aunque este es un caso excepcional, demuestra el potencial notable de estas pequenas aves.</p>
        <p>Estudios de la Universidad de Leiden han demostrado que los periquitos poseen las estructuras cerebrales necesarias para el aprendizaje vocal, similares a las de loros mayores como los yacos africanos.</p>

        <h2>Machos vs Hembras: Quien Habla Mejor?</h2>
        <p>Aunque ambos sexos pueden aprender, los <strong>machos tienen mayor probabilidad de hablar</strong>. Esto se debe a:</p>
        <ul>
          <li>En la naturaleza, los machos vocalizan para cortejar y defender territorio.</li>
          <li>Tienen mayor motivacion para experimentar con vocalizaciones.</li>
          <li>Las hembras tienden a ser mas selectivas y reservadas vocalmente.</li>
        </ul>
        <p><em>Nota:</em> Esto no significa que las hembras no puedan hablar; simplemente es menos comun y generalmente requiere mas esfuerzo.</p>

        <h2>Edad Optima para Ensenar</h2>
        <p>Los periquitos tienen un "periodo critico" de aprendizaje vocal:</p>
        <ul>
          <li><strong>3-6 meses:</strong> Edad ideal para comenzar. Maxima plasticidad cerebral.</li>
          <li><strong>6-12 meses:</strong> Todavia muy receptivos.</li>
          <li><strong>Mas de 1 ano:</strong> Mas dificil pero no imposible. Requiere mas paciencia.</li>
        </ul>

        <h2>Condiciones para el Exito</h2>
        <ol>
          <li><strong>Ave sola o contacto humano prioritario:</strong> Los periquitos que viven con otros periquitos tienen menos motivacion para imitar humanos (ya tienen companeros con quienes comunicarse).</li>
          <li><strong>Vinculo fuerte:</strong> El ave debe estar fuertemente vinculada a ti. La motivacion para hablar viene del deseo de comunicarse con su "bandada".</li>
          <li><strong>Ambiente tranquilo:</strong> Demasiado ruido de fondo dificulta el aprendizaje.</li>
          <li><strong>Consistencia:</strong> Mismas palabras, mismo tono, multiples veces al dia.</li>
        </ol>

        <h2>Tecnica de Ensenanza</h2>
        <h3>Paso 1: Elegir las Primeras Palabras</h3>
        <ul>
          <li>Palabras cortas con sonidos agudos: "Hola", "Bonito", "Perico".</li>
          <li>Sonidos con "i" y "o" son mas faciles para ellos.</li>
          <li>Evita palabras con "s" o "z" al principio (dificiles de articular).</li>
        </ul>

        <h3>Paso 2: Sesiones de Practica</h3>
        <ol>
          <li>Elige un momento tranquilo cuando el ave este atenta pero relajada.</li>
          <li>Acercate a la jaula o ten al ave contigo.</li>
          <li>Repite la palabra 10-20 veces con entusiasmo y claridad.</li>
          <li>Haz esto 2-3 veces al dia, durante 5-10 minutos cada vez.</li>
          <li>Se consistente: misma entonacion, mismo ritmo.</li>
        </ol>

        <h3>Paso 3: Asociacion</h3>
        <p>Asocia palabras con acciones especificas:</p>
        <ul>
          <li>"Hola" al descubrir la jaula por la manana.</li>
          <li>"Rico" al ofrecer un treat.</li>
          <li>El nombre del ave al mirarlo directamente.</li>
        </ul>

        <h3>Paso 4: Reforzar Intentos</h3>
        <ul>
          <li>Celebra CUALQUIER intento de imitacion, aunque sea imperfecto.</li>
          <li>Los primeros "murmullos" que recuerdan a la palabra son el comienzo.</li>
          <li>Ofrece treats y atencion entusiasmada.</li>
        </ul>

        <h2>Cuanto Tiempo Toma?</h2>
        <ul>
          <li><strong>Primeros sonidos:</strong> 2-4 semanas de practica consistente.</li>
          <li><strong>Primera palabra clara:</strong> 1-3 meses.</li>
          <li><strong>Vocabulario amplio:</strong> Meses a anos de interaccion continua.</li>
        </ul>
        <p><em>Importante:</em> Algunos periquitos nunca hablan claramente y eso esta bien. No todos los individuos tienen la misma aptitud.</p>

        <h2>Como Suenan los Periquitos al Hablar</h2>
        <p>A diferencia de los loros grandes, la voz del periquito es aguda y rapida, lo que puede dificultar entender las palabras al principio. Con practica, aprenderas a distinguir lo que dicen. Suelen "acelerar" las palabras, asi que "hola bonito" puede sonar como "olabonito".</p>

        <h2>Errores Comunes a Evitar</h2>
        <ul>
          <li><strong>Usar grabaciones:</strong> Aunque pueden ayudar como complemento, la interaccion directa es mucho mas efectiva.</li>
          <li><strong>Cambiar palabras frecuentemente:</strong> Confunde al ave. Domina una palabra antes de pasar a otra.</li>
          <li><strong>Ensenar frases antes que palabras:</strong> Es demasiado complejo para empezar.</li>
          <li><strong>Frustrarse:</strong> Tu frustracion se transmite. Si no hay progreso, toma un descanso.</li>
          <li><strong>Forzar:</strong> Si el ave no esta interesada en ese momento, respeta su estado de animo.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Los periquitos pueden ser parlanchines sorprendentes con paciencia y tecnica adecuada. Sin embargo, recuerda que el valor de tu periquito no depende de su capacidad para hablar. Disfruta de tu companero emplumado independientemente de su repertorio vocal.</p>
      `,
      sources: [
        { name: 'Guinness World Records - Most Words Learned by a Bird', url: 'https://www.guinnessworldrecords.com' },
        { name: 'ten Cate, C. et al. - Leiden University Studies on Budgerigar Vocalization' },
        { name: 'Pepperberg, I.M. "Studies on Parrot Intelligence"' },
        { name: 'Farabaugh, S.M. et al. "Acoustic Communication in Parrots"' }
      ],
      tags: ['periquitos', 'habla', 'vocalizacion', 'entrenamiento', 'comunicacion']
    },
    {
      id: 7,
      title: 'La Muda en Aves: Guia Completa',
      excerpt: 'Entiende el proceso natural de muda de plumas, como apoyar a tu ave durante este periodo y cuando preocuparse.',
      category: 'Salud',
      date: '2026-01-12',
      readTime: '9 min',
      image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&q=80',
      author: 'Dra. Elena Torres, Veterinaria Aviar',
      content: `
        <h2>Que es la Muda?</h2>
        <p>La muda es el proceso natural mediante el cual las aves reemplazan sus plumas viejas por nuevas. Es esencial para mantener un plumaje funcional para el vuelo, la termorregulacion y la exhibicion. Todas las aves mudan, pero la frecuencia y el patron varian segun la especie.</p>

        <h2>Ciclo Normal de Muda</h2>
        <p>La mayoria de las aves de compania experimentan:</p>
        <ul>
          <li><strong>Muda principal:</strong> Una vez al ano, generalmente despues de la temporada de cria (verano-otono).</li>
          <li><strong>Muda menor:</strong> Algunas especies tienen una segunda muda parcial antes de la temporada de cria.</li>
          <li><strong>Duracion:</strong> 6-8 semanas para la muda completa, aunque puede extenderse 2-3 meses.</li>
        </ul>

        <h2>Signos Normales de Muda</h2>
        <ul>
          <li>Plumas sueltas en el fondo de la jaula (aumento gradual, no dramatico).</li>
          <li>"Canutos" o fundas de queratina en nuevas plumas emergentes.</li>
          <li>Picazon leve: el ave se rasca mas y pide que le rasquen la cabeza.</li>
          <li>Ligera disminucion en la actividad y canto.</li>
          <li>Posible irritabilidad temporal.</li>
        </ul>

        <h2>Apoyo Nutricional Durante la Muda</h2>
        <p>La produccion de nuevas plumas requiere proteina, aminoacidos (especialmente metionina y cistina), y nutrientes adicionales:</p>
        <ul>
          <li><strong>Aumentar proteina:</strong> Huevo cocido, legumbres, semillas de mayor contenido proteico.</li>
          <li><strong>Acidos grasos:</strong> Pequenas cantidades de semillas oleaginosas (linaza, negrillo).</li>
          <li><strong>Vitaminas:</strong> Especialmente A, D, E y biotina. Vegetales coloridos.</li>
          <li><strong>Minerales:</strong> Calcio (hueso de jibia), zinc, hierro.</li>
          <li><strong>Hidratacion:</strong> Agua fresca abundante.</li>
          <li><strong>Banos:</strong> Frecuentes para suavizar los canutos y aliviar picazon.</li>
        </ul>

        <h2>Problemas de Muda: Cuando Preocuparse</h2>
        <h3>Muda Anormal</h3>
        <ul>
          <li><strong>Muda continua:</strong> Que dura mas de 3 meses sin detenerse.</li>
          <li><strong>Calvas visibles:</strong> Zonas sin plumaje (la muda normal no deja calvas).</li>
          <li><strong>Plumas deformes:</strong> Nuevas plumas que crecen rotas, retorcidas o descoloridas.</li>
          <li><strong>Sangrado:</strong> Plumas de sangre danadas que sangran.</li>
          <li><strong>Picazon extrema:</strong> Rascado compulsivo, arrancado de plumas.</li>
        </ul>

        <h3>Causas de Muda Anormal</h3>
        <ul>
          <li>Deficiencias nutricionales (especialmente proteina, vitamina A)</li>
          <li>Enfermedad hepatica o renal</li>
          <li>Parasitos (acaros de las plumas)</li>
          <li>Infecciones virales (PBFD en psitacidos)</li>
          <li>Desequilibrio hormonal</li>
          <li>Estres cronico</li>
          <li>Iluminacion inadecuada (ciclo luz-oscuridad alterado)</li>
        </ul>

        <h2>Muda Inducida por Estres ("Shock Molt")</h2>
        <p>El estres severo puede provocar una muda abrupta y excesiva:</p>
        <ul>
          <li>Perdida de muchas plumas simultaneamente</li>
          <li>Causado por: trauma, cambio de hogar, enfermedad, susto severo</li>
          <li>Proporciona ambiente calido, tranquilo y nutricion reforzada</li>
          <li>Consulta veterinario si la perdida es extrema</li>
        </ul>

        <h2>Plumas de Sangre: Emergencia Potencial</h2>
        <p>Las plumas nuevas en crecimiento tienen suministro sanguineo activo. Si una pluma de sangre se rompe:</p>
        <ol>
          <li>Aplica presion con gasa limpia durante 5-10 minutos.</li>
          <li>Si el sangrado no se detiene, la pluma puede necesitar ser extraida (idealmente por veterinario).</li>
          <li>En emergencia: sujeta firmemente la base de la pluma con pinzas y extrae con un tiron rapido en direccion del crecimiento.</li>
          <li>Aplica presion y polvo hemostatico o harina de maiz.</li>
        </ol>
        <p><em>Prevencion:</em> Durante la muda intensa, minimiza vuelos en espacios con obstaculos.</p>

        <h2>Iluminacion y Muda</h2>
        <p>El ciclo luz-oscuridad influye en el ciclo de muda:</p>
        <ul>
          <li>Las aves necesitan 10-12 horas de oscuridad completa para dormir.</li>
          <li>Luz artificial constante puede alterar los ciclos naturales de muda.</li>
          <li>Exposicion a luz natural o lamparas de espectro completo ayuda a regular el ciclo.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>La muda es un proceso natural que requiere paciencia y apoyo nutricional adecuado. Conoce lo que es normal para tu especie de ave y consulta con un veterinario aviar si observas patrones anormales. Con los cuidados adecuados, tu ave emergera de la muda con un plumaje brillante y saludable.</p>
      `,
      sources: [
        { name: 'Gill, F.B. "Ornithology" - Chapter on Feathers and Molt' },
        { name: 'Ritchie, B.W. et al. "Avian Medicine: Principles and Application"' },
        { name: 'Association of Avian Veterinarians - Feather Care Guidelines', url: 'https://www.aav.org' },
        { name: 'Murphy, M.E. "Nutrition and Metabolism in Molting Birds"' }
      ],
      tags: ['muda', 'plumas', 'salud', 'nutricion', 'cuidados']
    },
    {
      id: 8,
      title: 'Plantas Toxicas vs Seguras para Aves',
      excerpt: 'Lista completa de plantas que puedes tener en casa con aves y cuales debes evitar absolutamente. Guia de seguridad basada en datos veterinarios.',
      category: 'Salud',
      date: '2026-01-10',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80',
      author: 'Dra. Patricia Luna, Toxicologa Veterinaria',
      content: `
        <h2>Por Que las Plantas son un Riesgo</h2>
        <p>Las aves son curiosas por naturaleza y exploran su entorno con el pico. Muchas plantas comunes de interior y jardin contienen compuestos toxicos que pueden causar desde irritacion leve hasta la muerte. Segun el ASPCA Animal Poison Control Center, las intoxicaciones por plantas estan entre las 10 emergencias mas comunes en aves.</p>

        <h2>Plantas TOXICAS - Evitar Absolutamente</h2>

        <h3>Altamente Toxicas (Pueden ser Fatales)</h3>
        <ul>
          <li><strong>Aguacate (Persea americana):</strong> TODAS las partes, especialmente hojas y hueso. Contiene persina, causa edema pulmonar y muerte subita.</li>
          <li><strong>Lirio (Lilium spp.):</strong> Todas las partes. Extremadamente toxico, puede causar insuficiencia renal.</li>
          <li><strong>Adelfa/Oleander (Nerium oleander):</strong> Glucosidos cardiacos. Una pequena cantidad puede ser fatal.</li>
          <li><strong>Ricino (Ricinus communis):</strong> Las semillas contienen ricina, una de las toxinas naturales mas potentes.</li>
          <li><strong>Azalea/Rododendro:</strong> Grayanotoxinas afectan corazon y sistema nervioso.</li>
          <li><strong>Cicuta (Conium maculatum):</strong> Altamente toxica, paralisis respiratoria.</li>
          <li><strong>Dedalera (Digitalis purpurea):</strong> Glucosidos cardiacos, arritmias fatales.</li>
        </ul>

        <h3>Toxicas (Causan Enfermedad Severa)</h3>
        <ul>
          <li><strong>Difenbaquia (Dieffenbachia):</strong> Cristales de oxalato de calcio causan irritacion severa de boca y garganta, dificultad para respirar.</li>
          <li><strong>Filodendro (Philodendron):</strong> Similar a difenbaquia, muy comun en hogares.</li>
          <li><strong>Pothos/Potos:</strong> Oxalatos, irritacion oral e intestinal.</li>
          <li><strong>Flor de Pascua/Nochebuena (Euphorbia pulcherrima):</strong> Latex irritante, vomitos, diarrea.</li>
          <li><strong>Hiedra inglesa (Hedera helix):</strong> Saponinas causan problemas gastrointestinales.</li>
          <li><strong>Muerdago:</strong> Todas las partes toxicas, especialmente bayas.</li>
          <li><strong>Hortensia:</strong> Contiene cianuro en hojas y flores.</li>
          <li><strong>Tulipanes y narcisos:</strong> Bulbos especialmente toxicos.</li>
        </ul>

        <h2>Plantas SEGURAS para Hogares con Aves</h2>
        <p>Estas plantas son consideradas no toxicas segun ASPCA y veterinarios aviares:</p>

        <h3>Plantas de Interior Seguras</h3>
        <ul>
          <li><strong>Bambu de la suerte (Dracaena sanderiana):</strong> Decorativo y seguro.</li>
          <li><strong>Cinta/Mala madre (Chlorophytum comosum):</strong> Excelente purificadora de aire.</li>
          <li><strong>Violeta africana (Saintpaulia):</strong> Flores coloridas y seguras.</li>
          <li><strong>Orquidea (Orchidaceae):</strong> La mayoria de variedades son seguras.</li>
          <li><strong>Peperomia (Peperomia spp.):</strong> Variedad de formas y colores.</li>
          <li><strong>Calathea:</strong> Hojas decorativas, no toxica.</li>
          <li><strong>Maranta (planta de la oracion):</strong> Segura y decorativa.</li>
          <li><strong>Helecho de Boston (Nephrolepis exaltata):</strong> Seguro para aves.</li>
          <li><strong>Palma de bambu (Chamaedorea):</strong> Segura y purificadora de aire.</li>
        </ul>

        <h3>Hierbas Seguras (y Beneficiosas)</h3>
        <ul>
          <li><strong>Albahaca:</strong> Pueden picotearla, algunas aves la disfrutan.</li>
          <li><strong>Menta:</strong> Segura en pequenas cantidades.</li>
          <li><strong>Cilantro:</strong> Muchas aves lo disfrutan como alimento.</li>
          <li><strong>Oregano:</strong> Propiedades antibacterianas naturales.</li>
          <li><strong>Romero:</strong> Seguro, aroma agradable.</li>
        </ul>

        <h2>Precauciones Importantes</h2>
        <ul>
          <li><strong>Pesticidas:</strong> Incluso plantas seguras pueden ser peligrosas si han sido tratadas con pesticidas. Usa solo plantas organicas o lavalas exhaustivamente.</li>
          <li><strong>Fertilizantes:</strong> La tierra fertilizada puede ser toxica si el ave la ingiere.</li>
          <li><strong>Ubicacion:</strong> Coloca plantas fuera del alcance del ave durante el tiempo de vuelo libre.</li>
          <li><strong>Identificacion correcta:</strong> Asegurate de la identificacion exacta de la planta, los nombres comunes varian.</li>
        </ul>

        <h2>Sintomas de Intoxicacion por Plantas</h2>
        <ul>
          <li>Vomitos o regurgitacion</li>
          <li>Diarrea</li>
          <li>Salivacion excesiva</li>
          <li>Dificultad para tragar o respirar</li>
          <li>Letargia</li>
          <li>Convulsiones</li>
          <li>Colapso</li>
        </ul>
        <p><strong>Si sospechas intoxicacion:</strong> Contacta a tu veterinario o a una linea de control de envenenamiento animal inmediatamente. Si es posible, lleva una muestra de la planta.</p>

        <h2>Conclusion</h2>
        <p>La seguridad es primero. Ante la duda sobre una planta, no la tengas en tu hogar si tienes aves. Hay muchas opciones seguras y decorativas disponibles. Crear un hogar seguro para tus aves requiere planificacion, pero vale la pena por su bienestar.</p>
      `,
      sources: [
        { name: 'ASPCA Animal Poison Control Center - Toxic Plants Database', url: 'https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants' },
        { name: 'Pet Poison Helpline', url: 'https://www.petpoisonhelpline.com' },
        { name: 'Lightfoot, T.L. & Yeager, J.M. "Pet Bird Toxicity and Related Environmental Concerns"' },
        { name: 'Association of Avian Veterinarians - Household Hazards', url: 'https://www.aav.org' }
      ],
      tags: ['plantas', 'toxicidad', 'seguridad', 'hogar', 'prevencion']
    },
    {
      id: 9,
      title: 'Enriquecimiento Ambiental: Clave del Bienestar',
      excerpt: 'Como proporcionar estimulacion mental y fisica a tus aves para prevenir aburrimiento y problemas de comportamiento.',
      category: 'Habitat',
      date: '2026-01-08',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?w=800&q=80',
      author: 'Dr. Miguel Herrera, Especialista en Comportamiento Aviar',
      content: `
        <h2>Que es el Enriquecimiento Ambiental?</h2>
        <p>El enriquecimiento ambiental consiste en modificaciones al habitat y rutina de un animal para estimular comportamientos naturales, reducir el estres y mejorar el bienestar general. Para aves de compania, esto es especialmente critico ya que en cautiverio carecen de los estimulos que encontrarian en la naturaleza.</p>
        <p>Segun estudios de comportamiento animal, las aves en cautiverio sin enriquecimiento adecuado pasan solo el 5% de su tiempo en actividades similares a las de sus congeneres salvajes, comparado con mas del 70% en ambientes enriquecidos.</p>

        <h2>Por Que es Tan Importante?</h2>
        <p>Las aves son animales inteligentes que en la naturaleza:</p>
        <ul>
          <li>Pasan 4-8 horas diarias buscando alimento (forrajeo)</li>
          <li>Vuelan largas distancias</li>
          <li>Interactuan constantemente con su bandada</li>
          <li>Enfrentan desafios cognitivos variados</li>
        </ul>
        <p>Sin estos estimulos, desarrollan <strong>problemas de comportamiento</strong> como:</p>
        <ul>
          <li>Arrancado de plumas</li>
          <li>Gritos excesivos</li>
          <li>Agresividad</li>
          <li>Estereotipias (comportamientos repetitivos sin proposito)</li>
          <li>Apatia y depresion</li>
        </ul>

        <h2>Tipos de Enriquecimiento</h2>

        <h3>1. Enriquecimiento Alimenticio (Forrajeo)</h3>
        <p>En lugar de presentar comida en un plato, hazle trabajar por ella:</p>
        <ul>
          <li><strong>Juguetes de forrajeo:</strong> Esconde comida en juguetes disenados para ser manipulados.</li>
          <li><strong>Brochetas de frutas y verduras:</strong> Cuelga vegetales en pinchos de acero inoxidable.</li>
          <li><strong>Envolver comida:</strong> Usa papel sin tinta para envolver treats.</li>
          <li><strong>Esparcir semillas:</strong> En lugar de un comedero, esparce semillas por el fondo de la jaula.</li>
          <li><strong>Pinatas de papel:</strong> Crea bolsas de papel con comida dentro para que las rompa.</li>
          <li><strong>Conos de pino:</strong> Unta mantequilla de semillas en las grietas.</li>
        </ul>

        <h3>2. Enriquecimiento Fisico/Espacial</h3>
        <ul>
          <li><strong>Tiempo fuera de jaula:</strong> Minimo 2-4 horas diarias de vuelo supervisado.</li>
          <li><strong>Perchas variadas:</strong> Diferentes diametros, materiales y alturas.</li>
          <li><strong>Gimnasios de juego:</strong> Areas fuera de la jaula con perchas, juguetes y comederos.</li>
          <li><strong>Cuerdas y escaleras:</strong> Para trepar y balancearse.</li>
          <li><strong>Reorganizar la jaula:</strong> Cambia la disposicion periodicamente.</li>
          <li><strong>Baneras:</strong> Oportunidades regulares para banarse.</li>
        </ul>

        <h3>3. Enriquecimiento Cognitivo</h3>
        <ul>
          <li><strong>Entrenamiento:</strong> Sesiones diarias de entrenamiento con refuerzo positivo.</li>
          <li><strong>Rompecabezas:</strong> Juguetes que requieren resolver problemas.</li>
          <li><strong>Nuevos juguetes:</strong> Rotacion semanal para mantener la novedad.</li>
          <li><strong>Ensenar trucos:</strong> Estimula el cerebro y fortalece el vinculo.</li>
          <li><strong>Sonidos nuevos:</strong> Musica variada, sonidos de naturaleza.</li>
        </ul>

        <h3>4. Enriquecimiento Social</h3>
        <ul>
          <li><strong>Interaccion humana:</strong> Tiempo de calidad diario con la familia.</li>
          <li><strong>Compania de congeneres:</strong> Considerar companero de especie (segun especie).</li>
          <li><strong>Participacion familiar:</strong> Incluir al ave en actividades seguras del hogar.</li>
          <li><strong>Television/Radio:</strong> Compannia auditiva cuando estas fuera (con moderacion).</li>
          <li><strong>Ubicacion social:</strong> Jaula en area donde haya actividad familiar.</li>
        </ul>

        <h3>5. Enriquecimiento Sensorial</h3>
        <ul>
          <li><strong>Visuales:</strong> Vista a una ventana (con sombra disponible), espejos, moviles.</li>
          <li><strong>Auditivos:</strong> Musica variada, sonidos de aves silvestres, conversacion.</li>
          <li><strong>Tactiles:</strong> Materiales diversos para manipular (papel, madera, tela, cuero).</li>
          <li><strong>Luz natural:</strong> Exposicion a luz solar indirecta o lamparas de espectro completo.</li>
        </ul>

        <h2>Juguetes Recomendados por Tipo de Ave</h2>
        <h3>Aves pequenas (periquitos, canarios, diamantes):</h3>
        <ul>
          <li>Columpios pequenos</li>
          <li>Escaleras de madera</li>
          <li>Campanas</li>
          <li>Espejos (con moderacion)</li>
          <li>Juguetes de papel y carton</li>
        </ul>

        <h3>Aves medianas (ninfas, agapornis, cotorras):</h3>
        <ul>
          <li>Juguetes masticables de madera</li>
          <li>Juguetes de forrajeo</li>
          <li>Cuerdas y columpios</li>
          <li>Rompecabezas simples</li>
          <li>Juguetes con partes moviles</li>
        </ul>

        <h3>Loros grandes (yacos, amazonas, cacatuas):</h3>
        <ul>
          <li>Juguetes grandes para destruir</li>
          <li>Rompecabezas complejos</li>
          <li>Bloques de madera para roer</li>
          <li>Juguetes de acrilico duraderos</li>
          <li>Materiales para construir/manipular</li>
        </ul>

        <h2>Calendario de Enriquecimiento</h2>
        <ul>
          <li><strong>Diario:</strong> Interaccion social, tiempo fuera de jaula, forrajeo.</li>
          <li><strong>Cada 2-3 dias:</strong> Rotar juguetes menores, banos.</li>
          <li><strong>Semanal:</strong> Introducir juguete nuevo, cambiar disposicion de jaula.</li>
          <li><strong>Mensual:</strong> Evaluacion general del enriquecimiento, nuevas ideas.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>El enriquecimiento ambiental no es un lujo, es una necesidad para el bienestar de las aves de compania. Un ave estimulada es un ave feliz, saludable y con menos problemas de comportamiento. La clave es la variedad, la consistencia y adaptar el enriquecimiento a las preferencias individuales de tu ave.</p>
      `,
      sources: [
        { name: 'Meehan, C.L. et al. "Enrichment and Captive Parrot Welfare" - Applied Animal Behaviour Science' },
        { name: 'Nirmalan, G. "Environmental Enrichment for Psittacines"' },
        { name: 'Wilson, L. "Foraging Enrichment for Parrots" - Journal of Avian Medicine and Surgery' },
        { name: 'Association of Avian Veterinarians - Behavioral Enrichment Guidelines', url: 'https://www.aav.org' }
      ],
      tags: ['enriquecimiento', 'bienestar', 'juguetes', 'forrajeo', 'comportamiento']
    },
    {
      id: 10,
      title: 'Primeros Auxilios para Aves: Guia de Emergencia',
      excerpt: 'Que hacer en situaciones de emergencia mientras llegas al veterinario. Kit de primeros auxilios esencial para duenos de aves.',
      category: 'Salud',
      date: '2026-01-05',
      readTime: '12 min',
      image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80',
      author: 'Dra. Claudia Mendez, Veterinaria de Emergencias',
      content: `
        <h2>Preparacion: Kit de Primeros Auxilios para Aves</h2>
        <p>Todo dueno de aves debe tener un kit de emergencia listo. La rapidez de respuesta puede salvar la vida de tu ave.</p>
        <h3>Elementos Esenciales:</h3>
        <ul>
          <li>Toallas pequenas (para sujetar al ave)</li>
          <li>Gasas esteriles</li>
          <li>Cinta adhesiva medica</li>
          <li>Polvo hemostatico (Quick Stop o harina de maiz/fecula)</li>
          <li>Solucion salina esteril (para lavar heridas)</li>
          <li>Jeringas sin aguja (para administrar liquidos)</li>
          <li>Transportin pequeno o caja con ventilacion</li>
          <li>Fuente de calor (botella de agua caliente envuelta en toalla)</li>
          <li>Linterna pequena</li>
          <li>Numeros de emergencia: veterinario aviar, clinica 24h</li>
        </ul>

        <h2>Principios Generales de Emergencia</h2>
        <ol>
          <li><strong>Mantener la calma:</strong> Tu estres se transmite al ave.</li>
          <li><strong>Evaluar rapidamente:</strong> Respiracion, sangrado, nivel de consciencia.</li>
          <li><strong>Estabilizar:</strong> Calor, oscuridad, quietud.</li>
          <li><strong>Contactar veterinario:</strong> Llamar mientras estabilizas.</li>
          <li><strong>Transportar con cuidado:</strong> En contenedor pequeno, caliente, oscuro.</li>
        </ol>

        <h2>Emergencias Especificas y Que Hacer</h2>

        <h3>1. Sangrado</h3>
        <p><strong>Pluma de sangre rota:</strong></p>
        <ul>
          <li>Aplica presion directa con gasa durante 5-10 minutos.</li>
          <li>Si continua, aplica polvo hemostatico o harina de maiz.</li>
          <li>Si no para: la pluma debe extraerse (preferiblemente por veterinario).</li>
          <li>En emergencia: sujeta firmemente la base y extrae con tiron rapido en direccion del crecimiento.</li>
        </ul>
        <p><strong>Herida sangrante:</strong></p>
        <ul>
          <li>Presion directa con gasa limpia.</li>
          <li>No uses torniquetes en aves.</li>
          <li>Busca atencion veterinaria urgente.</li>
        </ul>
        <p><strong>Una rota sangrante:</strong></p>
        <ul>
          <li>Aplica polvo hemostatico directamente.</li>
          <li>Presion suave con gasa.</li>
          <li>No cortes la una mas corta.</li>
        </ul>

        <h3>2. Traumatismo (Golpe, Caida)</h3>
        <ul>
          <li>Coloca al ave en contenedor pequeno, oscuro, caliente y seguro.</li>
          <li>No la manipules mas de lo necesario.</li>
          <li>Observa respiracion y movimiento.</li>
          <li>Signos de conmocion: letargia, ojos cerrados, falta de respuesta.</li>
          <li>Busca atencion veterinaria inmediata.</li>
          <li>No ofrezcas agua o comida a un ave inconsciente o semiconsciente.</li>
        </ul>

        <h3>3. Dificultad Respiratoria</h3>
        <p><strong>EMERGENCIA CRITICA</strong></p>
        <ul>
          <li>Signos: boca abierta, cola que sube y baja al respirar, sonidos respiratorios.</li>
          <li>Coloca al ave en ambiente caliente (28-30°C) con aire fresco.</li>
          <li>Minimiza estres y manipulacion.</li>
          <li>Transporta al veterinario INMEDIATAMENTE.</li>
          <li>El oxigeno es critico; no pierdas tiempo.</li>
        </ul>

        <h3>4. Convulsiones</h3>
        <ul>
          <li>No sujetes al ave durante la convulsion.</li>
          <li>Coloca en superficie suave, retira objetos que puedan danarla.</li>
          <li>Oscuridad y silencio ayudan.</li>
          <li>Anota duracion y caracteristicas.</li>
          <li>Busca veterinario urgente (puede ser intoxicacion, enfermedad metabolica, neurologica).</li>
        </ul>

        <h3>5. Intoxicacion</h3>
        <ul>
          <li>Retira al ave de la fuente del toxico inmediatamente.</li>
          <li>Si fue inhalacion: aire fresco y ventilado.</li>
          <li>Si fue ingestion: NO induzcas vomito.</li>
          <li>Llama a veterinario o linea de control de venenos.</li>
          <li>Lleva muestra del toxico (planta, producto, etc.).</li>
        </ul>

        <h3>6. Quemaduras</h3>
        <ul>
          <li>Enfria el area con agua fresca (no helada) durante 5-10 minutos.</li>
          <li>No apliques cremas, aceites o mantequilla.</li>
          <li>Cubre ligeramente con gasa humedecida.</li>
          <li>Mantener caliente el resto del cuerpo.</li>
          <li>Atencion veterinaria urgente.</li>
        </ul>

        <h3>7. Ahogamiento/Asfixia</h3>
        <ul>
          <li>Objeto visible en boca: intenta remover con cuidado con pinzas.</li>
          <li>No hagas maniobra de Heimlich en aves.</li>
          <li>Si el ave puede respirar parcialmente, no manipules y lleva al veterinario.</li>
          <li>Si no respira: veterinario de emergencia inmediatamente.</li>
        </ul>

        <h3>8. Huevo Retenido (Hembras)</h3>
        <ul>
          <li>Signos: hembra en el fondo de la jaula, haciendo esfuerzo, plumas erizadas, abdomen hinchado.</li>
          <li>Proporciona calor (28-30°C) y humedad.</li>
          <li>Unas gotas de aceite vegetal en la cloaca pueden ayudar.</li>
          <li>EMERGENCIA: sin tratamiento puede ser fatal en horas.</li>
          <li>Veterinario urgente.</li>
        </ul>

        <h2>Como Transportar un Ave Enferma</h2>
        <ol>
          <li>Usa contenedor pequeno (transportin o caja con agujeros).</li>
          <li>Forra con toalla suave.</li>
          <li>Proporciona calor: botella de agua tibia envuelta, o calienta el auto.</li>
          <li>Cubre parcialmente para reducir estres visual.</li>
          <li>Viaja en silencio, movimientos suaves.</li>
          <li>No ofrezcas comida ni agua durante el transporte corto.</li>
        </ol>

        <h2>Cuando es Emergencia Absoluta</h2>
        <p>Busca veterinario INMEDIATAMENTE si observas:</p>
        <ul>
          <li>Sangrado que no se detiene</li>
          <li>Dificultad para respirar</li>
          <li>Convulsiones</li>
          <li>Perdida de consciencia</li>
          <li>Incapacidad para mantenerse en pie</li>
          <li>Traumatismo (golpe, ataque de otro animal)</li>
          <li>Exposicion a toxicos conocidos</li>
          <li>Huevo retenido</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Los primeros auxilios para aves buscan estabilizar al animal mientras llega atencion veterinaria profesional. Nunca sustituyen el tratamiento veterinario. Ten siempre a mano el numero de tu veterinario aviar y de clinicas de emergencia 24 horas. La preparacion salva vidas.</p>
      `,
      sources: [
        { name: 'Association of Avian Veterinarians - Emergency Care Guidelines', url: 'https://www.aav.org' },
        { name: 'Lightfoot, T.L. "Clinical Techniques in Pet Avian Medicine"' },
        { name: 'Hess, L. & Mauldin, G. "First Aid for Birds"' },
        { name: 'Pet Poison Helpline', url: 'https://www.petpoisonhelpline.com' }
      ],
      tags: ['emergencias', 'primeros auxilios', 'salud', 'seguridad', 'veterinario']
    },
    {
      id: 11,
      title: 'Diferencias entre Machos y Hembras en Aves de Compania',
      excerpt: 'Como identificar el sexo de tus aves y que diferencias de comportamiento esperar. Guia para las especies mas populares.',
      category: 'Especies',
      date: '2026-01-03',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=800&q=80',
      author: 'Dr. Fernando Ruiz, Ornitolog',
      content: `
        <h2>Por Que Importa Conocer el Sexo de tu Ave?</h2>
        <p>Conocer el sexo de tu ave de compania es importante para:</p>
        <ul>
          <li>Entender comportamientos especificos (canto, puesta de huevos)</li>
          <li>Prevenir cria no deseada</li>
          <li>Anticipar problemas de salud especificos del sexo (retencion de huevo en hembras)</li>
          <li>Elegir nombres apropiados</li>
          <li>Planificar companeros compatibles</li>
        </ul>

        <h2>Metodos de Sexado</h2>
        <h3>1. Dimorfismo Sexual (Diferencias Visuales)</h3>
        <p>Algunas especies muestran diferencias fisicas claras entre machos y hembras. Este es el metodo mas facil pero no disponible en todas las especies.</p>

        <h3>2. Sexado por ADN</h3>
        <p>El metodo mas confiable para especies sin dimorfismo. Se realiza mediante:</p>
        <ul>
          <li>Muestra de sangre (unas gotas)</li>
          <li>Plumas arrancadas (con foliculo)</li>
          <li>Cascara de huevo</li>
        </ul>
        <p>Precision: 99.9%. Costo: $15-30 USD aproximadamente.</p>

        <h3>3. Sexado Quirurgico (Endoscopia)</h3>
        <p>Observacion directa de gonadas mediante cirugia menor. Menos comun actualmente debido a la disponibilidad del sexado por ADN.</p>

        <h2>Diferencias por Especie</h2>

        <h3>Periquito Australiano</h3>
        <p><strong>Dimorfismo:</strong> SI - en la cera (area sobre el pico)</p>
        <ul>
          <li><strong>Macho adulto:</strong> Cera azul brillante (azul palido en variedades claras)</li>
          <li><strong>Hembra adulta:</strong> Cera marron, beige o blanquecina (se oscurece en celo)</li>
          <li><strong>Juveniles:</strong> Dificil distinguir, cera rosada en ambos</li>
        </ul>
        <p><strong>Comportamiento:</strong></p>
        <ul>
          <li>Machos: Mas cantores, vocalizaciones complejas, cabeceo de cortejo, regurgitan</li>
          <li>Hembras: Mas territoriales, pueden morder mas, vocalizacion mas simple</li>
        </ul>

        <h3>Canario</h3>
        <p><strong>Dimorfismo:</strong> PARCIAL</p>
        <ul>
          <li><strong>Canto:</strong> Los machos cantan melodias largas y complejas. Las hembras emiten gorjeos cortos.</li>
          <li><strong>Visual:</strong> Dificil distinguir. Machos pueden tener cabeza ligeramente mas plana, hembras mas redondeada.</li>
          <li><strong>Comportamiento de celo:</strong> Hembras construyen nido activamente, adoptan postura receptiva</li>
        </ul>

        <h3>Ninfa (Cacatua Ninfa)</h3>
        <p><strong>Dimorfismo:</strong> SI - en variedades normales (gris)</p>
        <ul>
          <li><strong>Macho:</strong> Cara amarilla brillante, mejillas naranja intenso, cola gris uniforme</li>
          <li><strong>Hembra:</strong> Cara mas apagada, barrado en la parte inferior de las plumas de la cola y alas</li>
          <li><strong>Variedades mutadas (lutino, albino, perlado):</strong> Mas dificil, a veces imposible visualmente</li>
        </ul>
        <p><strong>Comportamiento:</strong></p>
        <ul>
          <li>Machos: Cantan, silban melodias, golpean el pico, vocalizaciones elaboradas</li>
          <li>Hembras: Mas calladas, pueden silbar pero menos, postura de solicitud de apareamiento</li>
        </ul>

        <h3>Agapornis</h3>
        <p><strong>Dimorfismo:</strong> NO en la mayoria de especies</p>
        <ul>
          <li>Sexado por ADN es el metodo confiable</li>
          <li><strong>Metodo de palpacion pelvica:</strong> Hembras tienen huesos pelvicos mas separados. Requiere experiencia.</li>
        </ul>
        <p><strong>Comportamiento (indicativo pero no definitivo):</strong></p>
        <ul>
          <li>Hembras: Tienden a meter material en sus plumas para "construir nido", pueden ser mas territoriales</li>
          <li>Machos: Mas propensos a regurgitar para su pareja</li>
        </ul>

        <h3>Diamante Mandarin</h3>
        <p><strong>Dimorfismo:</strong> SI - muy marcado</p>
        <ul>
          <li><strong>Macho:</strong> Mejillas naranja, pecho rayado, flancos con puntos blancos, pico rojo intenso</li>
          <li><strong>Hembra:</strong> Sin mejillas naranja, sin rayas en pecho, pico naranja mas palido</li>
        </ul>

        <h3>Cotorra Argentina</h3>
        <p><strong>Dimorfismo:</strong> NO</p>
        <ul>
          <li>Sexado por ADN necesario</li>
          <li>Algunos criadores reportan que machos tienen cabeza ligeramente mas grande, pero no es confiable</li>
        </ul>

        <h3>Loro del Senegal</h3>
        <p><strong>Dimorfismo:</strong> MINIMO</p>
        <ul>
          <li>Hembras pueden tener "chaleco" amarillo mas estrecho</li>
          <li>Cabeza de hembras puede ser ligeramente mas pequena</li>
          <li>ADN recomendado para confirmacion</li>
        </ul>

        <h2>Consideraciones de Salud por Sexo</h2>
        <h3>Problemas Especificos de Hembras:</h3>
        <ul>
          <li><strong>Retencion de huevo:</strong> Emergencia comun. Sintomas: esfuerzo, letargia, abdomen hinchado</li>
          <li><strong>Puesta cronica:</strong> Agotamiento de calcio, debilidad. Requiere manejo veterinario</li>
          <li><strong>Prolapso de oviducto:</strong> Emergencia quirurgica</li>
          <li><strong>Prevencion:</strong> Limitar horas de luz, evitar nidos, dieta rica en calcio</li>
        </ul>

        <h3>Problemas Mas Comunes en Machos:</h3>
        <ul>
          <li><strong>Comportamiento territorial/agresivo:</strong> Especialmente en epoca de cria</li>
          <li><strong>Regurgitacion excesiva:</strong> Puede causar perdida de peso si es constante</li>
          <li><strong>Masturbacion cronica:</strong> Puede indicar frustracion hormonal</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Conocer el sexo de tu ave te ayuda a entenderla mejor y anticipar sus necesidades. Si no puedes determinar el sexo visualmente, el sexado por ADN es una inversion pequena que proporciona certeza. Consulta con tu veterinario aviar sobre las consideraciones especificas de salud segun el sexo de tu ave.</p>
      `,
      sources: [
        { name: 'Forshaw, J.M. "Parrots of the World"' },
        { name: 'Avian Biotech International - DNA Sexing', url: 'https://www.avianbiotech.com' },
        { name: 'Speer, B.L. "Current Therapy in Avian Medicine and Surgery"' },
        { name: 'Gill, F.B. "Ornithology" - Sexual Dimorphism Chapter' }
      ],
      tags: ['sexado', 'machos', 'hembras', 'dimorfismo', 'especies']
    },
    {
      id: 12,
      title: 'Viajando con tu Ave: Guia Completa',
      excerpt: 'Todo lo que necesitas saber para transportar a tu ave de forma segura, desde viajes cortos al veterinario hasta mudanzas y vuelos.',
      category: 'Cuidados',
      date: '2026-01-01',
      readTime: '11 min',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      author: 'Dra. Sofia Navarro, Veterinaria Aviar',
      content: `
        <h2>Preparacion General para Viajar</h2>
        <p>Las aves pueden viajar de forma segura con la preparacion adecuada. Sin embargo, es importante reconocer que el viaje es estresante para ellas. Minimizar el estres es la prioridad.</p>

        <h2>El Transportin Ideal</h2>
        <h3>Caracteristicas esenciales:</h3>
        <ul>
          <li><strong>Tamano:</strong> Lo suficientemente grande para que el ave pueda estar comoda, pero no tanto que se mueva excesivamente (riesgo de lesion)</li>
          <li><strong>Ventilacion:</strong> Agujeros o rejillas adecuadas, pero que no creen corrientes directas</li>
          <li><strong>Material:</strong> Plastico solido con puerta de rejilla, o jaula de viaje especifica</li>
          <li><strong>Seguridad:</strong> Cierres que el ave no pueda abrir</li>
          <li><strong>Percha:</strong> Una percha baja y estable (algunas aves prefieren el fondo durante el viaje)</li>
        </ul>
        <h3>Evitar:</h3>
        <ul>
          <li>Cajas de carton (sin ventilacion adecuada, el ave puede roer y escapar)</li>
          <li>Jaulas grandes (el ave puede golpearse)</li>
          <li>Bolsas o telas cerradas</li>
        </ul>

        <h2>Viajes Cortos (Veterinario, Dentro de la Ciudad)</h2>
        <ol>
          <li>Acostumbra al ave al transportin con anticipacion (dejalo abierto en casa, con treats)</li>
          <li>Cubre parcialmente el transportin para reducir estimulos visuales estresantes</li>
          <li>Asegura el transportin con cinturon de seguridad o en el piso del auto</li>
          <li>Temperatura del auto: 18-24°C. Nunca dejes al ave en auto estacionado</li>
          <li>Evita musica alta o movimientos bruscos</li>
          <li>Para viajes de menos de 2 horas, agua y comida no son necesarias</li>
        </ol>

        <h2>Viajes Largos en Auto (Mas de 2-3 Horas)</h2>
        <ul>
          <li><strong>Hidratacion:</strong> Ofrece agua en paradas (bebedero de botella evita derrames) o frutas con alto contenido de agua</li>
          <li><strong>Alimentacion:</strong> Pequenas cantidades de alimentos familiares</li>
          <li><strong>Paradas:</strong> Cada 2-3 horas para verificar al ave (sin sacarla del transportin)</li>
          <li><strong>Temperatura:</strong> Monitorear constantemente. Las aves son sensibles a cambios</li>
          <li><strong>Pernoctar:</strong> Si es viaje de multiples dias, busca alojamiento que acepte aves o planifica con anticipacion</li>
        </ul>

        <h2>Viajes en Avion</h2>
        <p>Viajar en avion con aves requiere planificacion significativa.</p>
        <h3>Requisitos generales:</h3>
        <ul>
          <li><strong>Documentacion:</strong> Certificado de salud veterinario (generalmente emitido 10 dias antes del viaje)</li>
          <li><strong>CITES:</strong> Para especies protegidas, documentacion CITES puede ser requerida</li>
          <li><strong>Aerolinea:</strong> Cada aerolinea tiene politicas diferentes. Algunas no aceptan aves</li>
          <li><strong>Cabina vs. Bodega:</strong> Aves pequenas a veces pueden ir en cabina. La bodega tiene riesgos de temperatura</li>
        </ul>
        <h3>Recomendaciones:</h3>
        <ul>
          <li>Contacta a la aerolinea con semanas de anticipacion</li>
          <li>Reserva vuelos directos para minimizar estres</li>
          <li>Evita viajar en temperaturas extremas (verano/invierno)</li>
          <li>Transportin aprobado por la aerolinea (IATA specifications)</li>
          <li>Llega temprano al aeropuerto</li>
        </ul>

        <h2>Viajes Internacionales</h2>
        <p>Los viajes internacionales con aves son complejos y requieren:</p>
        <ul>
          <li>Permisos de importacion/exportacion del pais de destino y origen</li>
          <li>Cuarentena en algunos paises (puede ser de semanas)</li>
          <li>Certificados de salud especificos</li>
          <li>Pruebas de enfermedades (psitacosis, gripe aviar segun destino)</li>
          <li>Microchip o anillo de identificacion en algunos casos</li>
        </ul>
        <p><em>Recomendacion:</em> Consulta con agentes de aduanas especializados en mascotas o el consulado del pais de destino con meses de anticipacion.</p>

        <h2>Mudanzas</h2>
        <p>Una mudanza es estresante para las aves. Estrategias para minimizar el impacto:</p>
        <ol>
          <li><strong>Mantener rutinas:</strong> En lo posible, mantener horarios de comida, sueno y juego</li>
          <li><strong>Ultimo en empacar, primero en desempacar:</strong> El ave viaja contigo, no en camion de mudanza</li>
          <li><strong>Preparar el nuevo espacio:</strong> Ten lista la jaula en la nueva ubicacion antes de llegar</li>
          <li><strong>Familiaridad:</strong> Usa los mismos juguetes, perchas y accesorios inicialmente</li>
          <li><strong>Paciencia:</strong> Espera cambios de comportamiento temporales (menos vocalizacion, desconfianza). Pueden durar semanas</li>
        </ol>

        <h2>Senales de Estres Durante el Viaje</h2>
        <ul>
          <li>Respiracion agitada (boca abierta, jadeo)</li>
          <li>Plumas muy erizadas o muy pegadas al cuerpo</li>
          <li>Letargia extrema o hiperactividad</li>
          <li>Vocalizaciones de angustia continuas</li>
          <li>Temblores</li>
        </ul>
        <p><strong>Si observas estos signos:</strong> Detente en lugar seguro, verifica temperatura, reduce estimulos, considera acortar el viaje si es posible.</p>

        <h2>Aves que NO Deberian Viajar</h2>
        <ul>
          <li>Aves enfermas o en recuperacion</li>
          <li>Aves muy viejas o fragiles</li>
          <li>Hembras en periodo de puesta</li>
          <li>Aves no acostumbradas a manipulacion (estres extremo)</li>
          <li>Polluelos no destetados</li>
        </ul>

        <h2>Alternativa: Cuidador en Casa</h2>
        <p>Para viajes donde no puedes llevar a tu ave, considera:</p>
        <ul>
          <li>Cuidador experimentado que visite tu casa</li>
          <li>Pension especializada en aves (visita antes para verificar condiciones)</li>
          <li>Amigo o familiar confiable con instrucciones detalladas</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Viajar con aves es posible y seguro con la preparacion adecuada. La clave es planificar con anticipacion, minimizar el estres, mantener condiciones de temperatura estables y nunca dejar a tu ave desatendida. Consulta con tu veterinario aviar antes de viajes largos o internacionales.</p>
      `,
      sources: [
        { name: 'IATA Live Animals Regulations', url: 'https://www.iata.org/en/programs/cargo/live-animals/' },
        { name: 'USDA APHIS - Traveling with Birds', url: 'https://www.aphis.usda.gov/aphis/pet-travel' },
        { name: 'Association of Avian Veterinarians - Transport Guidelines', url: 'https://www.aav.org' },
        { name: 'CITES - Convention on International Trade in Endangered Species', url: 'https://cites.org' }
      ],
      tags: ['viajes', 'transporte', 'mudanzas', 'avion', 'seguridad']
    }
  ];

  constructor() { }

  getAllArticles(): Article[] {
    return this.articles;
  }

  getArticleById(id: number): Article | undefined {
    return this.articles.find(a => a.id === id);
  }

  getArticlesByCategory(category: string): Article[] {
    return this.articles.filter(a =>
      a.category.toLowerCase() === category.toLowerCase()
    );
  }

  getFeaturedArticles(count: number = 6): Article[] {
    return this.articles.slice(0, count);
  }

  getRelatedArticles(currentId: number, count: number = 2): Article[] {
    const current = this.getArticleById(currentId);
    if (!current) return this.articles.slice(0, count);

    return this.articles
      .filter(a => a.id !== currentId && a.category === current.category)
      .slice(0, count);
  }

  searchArticles(query: string): Article[] {
    const lowerQuery = query.toLowerCase();
    return this.articles.filter(a =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.excerpt.toLowerCase().includes(lowerQuery) ||
      a.tags.some(tag => tag.includes(lowerQuery))
    );
  }
}