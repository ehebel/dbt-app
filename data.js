// DBT App Data Store - Extracted from DBTApp_Completa_v3.bmpr

export const DBT_MODULES = [
  {
    id: "mindfulness",
    number: 1,
    title: "Mindfulness (Atención Plena)",
    badge: "Módulo 1",
    color: "#8DA9C4",
    bgSoft: "#EEF4F8",
    description: "Conciencia del momento presente sin juzgar, integrando razón y emoción.",
    skills: ["5.1", "5.2", "5.3"]
  },
  {
    id: "distress_tolerance",
    number: 2,
    title: "Tolerancia al Malestar",
    badge: "Módulo 2",
    color: "#6B9080",
    bgSoft: "#EAF4F4",
    description: "Sobrevivir a crisis intensas sin empeorar la situación y aceptar la realidad.",
    skills: ["5.4", "5.5", "5.6", "5.7", "5.8"]
  },
  {
    id: "emotion_regulation",
    number: 3,
    title: "Regulación Emocional",
    badge: "Módulo 3",
    color: "#E29578",
    bgSoft: "#FFF0EB",
    description: "Comprender y modular emociones difíciles, reduciendo la vulnerabilidad.",
    skills: ["5.9", "5.10", "5.11", "5.12", "5.13", "5.14"]
  },
  {
    id: "interpersonal",
    number: 4,
    title: "Efectividad Interpersonal",
    badge: "Módulo 4",
    color: "#9D8DF1",
    bgSoft: "#F4F1FA",
    description: "Alcanzar objetivos personales mientras se cuidan las relaciones y el autorrespeto.",
    skills: ["5.15", "5.16", "5.17"]
  }
];

export const DBT_SKILLS = [
  {
    id: "5.1",
    moduleId: "mindfulness",
    moduleName: "Módulo 1: Mindfulness (Atención Plena)",
    name: "Mente Sabia",
    fullName: "Habilidad: Mente Sabia",
    icon: "brain",
    summary: "Integración entre la Mente Emocional y la Mente Racional",
    whatIs: "Es la síntesis e integración entre la Mente Emocional (impulsada por los sentimientos e impulsos del momento) y la Mente Racional (basada únicamente en hechos, lógica y análisis frío).",
    stepsTitle: "Pasos para conectar con tu Mente Sabia:",
    steps: [
      "1. Haz una pausa antes de reaccionar o decidir.",
      "2. Inhala profundamente y al exhalar lleva tu atención al centro de tu abdomen.",
      "3. Reconoce lo que sientes (validación emocional) y analiza los hechos objetivos (razón).",
      "4. Pregúntate: '¿Qué acción es más efectiva y coherente con mis valores a largo plazo?'"
    ],
    when: "Cuando sientas urgencia por actuar impulsivamente o cuando te desconectes de tus emociones al tomar una decisión importante.",
    tool: "reflection"
  },
  {
    id: "5.2",
    moduleId: "mindfulness",
    moduleName: "Módulo 1: Mindfulness (Atención Plena)",
    name: "Habilidades 'Qué': Observar, Describir, Participar",
    fullName: "Habilidades 'Qué': Observar, Describir, Participar",
    icon: "eye",
    summary: "Conductas concretas para practicar atención plena en el presente",
    whatIs: "Son las conductas concretas que realizamos para practicar Atención Plena en el momento presente. Solo se practica UNA a la vez.",
    stepsTitle: "Resumen de cada componente:",
    steps: [
      "1. Observar: Notar la experiencia interna o externa (sensaciones, pensamientos, emociones) sin aferrarse ni rechazar nada, como una ola que viene y va.",
      "2. Describir: Poner palabras claras y objetivas a los hechos observables sin interpretaciones ni juicios (ej. 'Mi corazón late rápido' en vez de 'Me va a dar algo').",
      "3. Participar: Entregarse 100% a la actividad del presente (trabajar, bailar, lavar la loza) olvidando la timidez o la autocrítica."
    ],
    when: "Ante rumiación mental, confusión entre pensamientos y hechos, o desconexión del presente.",
    tool: "describe"
  },
  {
    id: "5.3",
    moduleId: "mindfulness",
    moduleName: "Módulo 1: Mindfulness (Atención Plena)",
    name: "Habilidades 'Cómo': Sin juzgar, Una cosa, Eficaz",
    fullName: "Habilidades 'Cómo': Sin juzgar, Una cosa, Eficaz",
    icon: "compass",
    summary: "Actitud y forma en que observamos, describimos y participamos",
    whatIs: "Definen la actitud y la forma en que observamos, describimos y participamos en el presente.",
    stepsTitle: "Resumen de cada componente:",
    steps: [
      "1. Sin juzgar (No-juicio): Abandonar etiquetas de 'bueno/malo' o 'debería/no debería'. Describir los hechos y consecuencias tal como son.",
      "2. Una cosa a la vez: Enfocar la mente en una sola tarea en el momento presente, trayendo la atención de vuelta con amabilidad cada vez que se distraiga.",
      "3. Con eficacia: Enfocarse en lo que funciona para alcanzar tus objetivos y valores en vez de pelear por tener la razón o insistir en lo 'justo'."
    ],
    when: "Cuando notes autocrítica severa, multitarea ansiosa o rigidez ante un problema.",
    tool: "nonjudgment"
  },
  {
    id: "5.4",
    moduleId: "distress_tolerance",
    moduleName: "Módulo 2: Tolerancia al Malestar",
    name: "Habilidad STOP (Freno de crisis)",
    fullName: "Habilidad de Crisis: STOP",
    icon: "octagon-pause",
    summary: "Freno de emergencia ante impulsos destructivos",
    whatIs: "Es la herramienta de freno de emergencia ante situaciones de alta reactividad emocional para evitar actuar por impulso y empeorar la situación.",
    stepsTitle: "Acrónimo paso a paso:",
    steps: [
      "• S - Stop (Detente): Quédate congelado, no te muevas, no hables ni envíes mensajes.",
      "• T - Take a step back (Da un paso atrás): Aléjate físicamente de la situación y respira hondo.",
      "• O - Observe (Observa): Pregúntate qué está pasando dentro de ti y a tu alrededor objetivamente.",
      "• P - Proceed mindfully (Procede con mente sabia): Actúa con calma según tus metas y valores."
    ],
    when: "Cuando sientas impulsos intensos de gritar, autolesionarte, consumir o agredir.",
    tool: "stop"
  },
  {
    id: "5.5",
    moduleId: "distress_tolerance",
    moduleName: "Módulo 2: Tolerancia al Malestar",
    name: "Habilidades TIPP (Regulación física)",
    fullName: "Habilidades Fisiológicas: TIPP",
    icon: "thermometer",
    summary: "Intervenciones fisiológicas para reducir la reactividad del sistema nervioso",
    whatIs: "Intervenciones fisiológicas rápidas diseñadas para cambiar la química del cuerpo y activar el sistema parasimpático cuando el malestar es abrumador (4 o 5 de 5).",
    stepsTitle: "Los 4 componentes:",
    steps: [
      "• T - Temperatura: Sumergir la cara en agua fría (o bolsa de hielo en los ojos y mejillas) inclinándote hacia adelante durante 30 segundos (reflejo de inmersión mamífero).",
      "• I - Intensidad (Ejercicio): Realizar 10 a 15 minutos de ejercicio aeróbico intenso (saltos, trote veloz, sentadillas) para liberar adrenalina acumulada.",
      "• P - Pausar la respiración: Inhalar profundamente en 4 segundos y exhalar muy lento en 6 a 8 segundos con el diafragma.",
      "• P - Pausar la tensión (Relajación muscular): Tensar grupos musculares fuertemente por 5 segundos y soltar sintiendo la diferencia."
    ],
    when: "Ante crisis de pánico, ira desbordada o urgencias intensas de conductas problema.",
    tool: "tipp"
  },
  {
    id: "5.6",
    moduleId: "distress_tolerance",
    moduleName: "Módulo 2: Tolerancia al Malestar",
    name: "Distraerse ACCEPTS",
    fullName: "Distraerse con Mente Sabia: ACCEPTS",
    icon: "puzzle",
    summary: "Estrategias para apartar la atención del estímulo doloroso",
    whatIs: "Estrategias para apartar temporalmente la atención de un estímulo doloroso o impulso cuando no es posible resolver el problema de inmediato.",
    stepsTitle: "Acrónimo paso a paso:",
    steps: [
      "• A - Actividades: Realiza una tarea absorbente (caminar, ordenar, un juego, un hobby).",
      "• C - Contribuir: Haz algo por otra persona o por tu comunidad.",
      "• C - Comparaciones: Compara tu momento actual con momentos en que estuviste peor o con quienes atraviesan crisis mayores.",
      "• E - Emociones opuestas: Escucha música, lee o ve algo que genere otra emoción (ej. comedia).",
      "• P - Pensamientos (Pushing away): Pon el dolor en una caja mental por un rato o haz retos cognitivos (contar hacia atrás de 7 en 7).",
      "• T / S - Sensaciones seguras: Sostén un cubo de hielo o toma una ducha tibia/fría."
    ],
    when: "Cuando la intensidad emocional te impide pensar con claridad y necesitas ganar tiempo sin empeorar la situación.",
    tool: "accepts"
  },
  {
    id: "5.7",
    moduleId: "distress_tolerance",
    moduleName: "Módulo 2: Tolerancia al Malestar",
    name: "Calmarse con 5 sentidos",
    fullName: "Calmarse con los 5 Sentidos (Self-Soothing)",
    icon: "sparkles",
    summary: "Consuelo sensorial y amabilidad para el sistema nervioso",
    whatIs: "Consiste en brindarte consuelo, amabilidad y calma a través de estímulos sensoriales reconfortantes para disminuir la reactividad al estrés.",
    stepsTitle: "Cómo aplicarla con cada sentido:",
    steps: [
      "• 1. Vista: Observa la naturaleza, una imagen que te transmita paz o la llama de una vela.",
      "• 2. Oído: Escucha sonidos de lluvia, música instrumental relajante o sonidos de la naturaleza.",
      "• 3. Olfato: Usa aroma de lavanda, café recién hecho, crema perfumada o aire fresco.",
      "• 4. Gusto: Saborea lentamente una infusión caliente, un trozo de chocolate o fruta con atención plena.",
      "• 5. Tacto: Envuelve tu cuerpo en una manta suave, acaricia a tu mascota o toma un baño tibio."
    ],
    when: "Cuando te sientas agotado emocionalmente, vulnerable, solo o necesites autocompasión en crisis.",
    tool: "senses"
  },
  {
    id: "5.8",
    moduleId: "distress_tolerance",
    moduleName: "Módulo 2: Tolerancia al Malestar",
    name: "Aceptación Radical y Buena Disposición",
    fullName: "Aceptación Radical y Buena Disposición",
    icon: "heart-handshake",
    summary: "Aceptar la realidad tal como es sin pelear contra lo inalterable",
    whatIs: "Aceptar de forma completa (con mente, cuerpo y corazón) la realidad tal cual es, respondiendo a ella con apertura y eficacia en vez de terquedad.",
    stepsTitle: "Componentes clave:",
    steps: [
      "• Aceptación Radical: Dejar de pelear contra los hechos del pasado o presente que no se pueden cambiar. Aceptar NO es aprobar, perdonar ni rendirse; es dejar el sufrimiento opcional ('no debería ser así').",
      "• Buena Disposición (Willingness): Hacer justamente lo que se necesita en la situación actual de forma comprometida, escuchando a la Mente Sabia.",
      "• Opuesto a la Terquedad (Willfulness): Soltar la postura de brazos cruzados, el control rígido o el negarse a tolerar el momento."
    ],
    when: "Ante pérdidas, frustraciones inevitables o hechos dolorosos que no se pueden modificar.",
    tool: "acceptance"
  },
  {
    id: "5.9",
    moduleId: "emotion_regulation",
    moduleName: "Módulo 3: Regulación Emocional",
    name: "Verificar los Hechos (Check Facts)",
    fullName: "Habilidad: Verificar los Hechos",
    icon: "clipboard-check",
    summary: "Evaluar si la emoción y su intensidad se ajustan a los hechos reales",
    whatIs: "Consiste en evaluar si nuestra reacción emocional y su intensidad se ajustan a los hechos objetivos o a nuestras interpretaciones/suposiciones.",
    stepsTitle: "Pasos para Verificar los Hechos:",
    steps: [
      "• 1. ¿Cuál es la emoción que quiero cambiar y cuál es su intensidad?",
      "• 2. ¿Cuál fue el evento desencadenante exacto (solo hechos observables)?",
      "• 3. ¿Qué interpretaciones, creencias o pensamientos extremos estoy agregando?",
      "• 4. ¿Estoy asumiendo una amenaza o catástrofe? ¿Cuál es la probabilidad real?",
      "• 5. ¿Mi emoción y su intensidad encajan con los hechos reales?"
    ],
    when: "Cuando sientas miedo, enojo, celos o culpa intensos y sospeches que estás adivinando intenciones o catastrofizando.",
    tool: "facts"
  },
  {
    id: "5.10",
    moduleId: "emotion_regulation",
    moduleName: "Módulo 3: Regulación Emocional",
    name: "Acción Opuesta",
    fullName: "Habilidad: Acción Opuesta",
    icon: "arrow-left-right",
    summary: "Actuar de manera opuesta al impulso ineficaz de la emoción",
    whatIs: "Cuando una emoción NO se ajusta a los hechos (o actuar según ella no es efectivo), actuamos de manera completamente opuesta a su impulso de acción.",
    stepsTitle: "Guía por emoción (hacerlo al 100%):",
    steps: [
      "• Miedo injustificado: Acércate y enfrenta gradualmente lo que evitas.",
      "• Tristeza / Aislamiento: Actívate, sal de la cama e interactúa en vez de aislarte.",
      "• Enojo / Ira: Aléjate con gentileza y busca empatía en lugar de atacar.",
      "• Vergüenza / Culpa (cuando no viola tus valores): Comparte tu experiencia con personas seguras en lugar de esconderte."
    ],
    when: "Cuando la emoción es desproporcionada o seguir su impulso empeoraría tu vida.",
    tool: "opposite"
  },
  {
    id: "5.11",
    moduleId: "emotion_regulation",
    moduleName: "Módulo 3: Regulación Emocional",
    name: "Solución de Problemas",
    fullName: "Habilidad: Solución de Problemas",
    icon: "lightbulb",
    summary: "Modificar o resolver activamente situaciones dolorosas reales",
    whatIs: "Cuando una emoción dolorosa SÍ se ajusta a los hechos objetivos, la estrategia más efectiva es modificar o resolver activamente la situación que la causa.",
    stepsTitle: "Pasos estructurados:",
    steps: [
      "• 1. Describe el problema de forma concreta y basada en hechos observables.",
      "• 2. Verifica los hechos para confirmar que el problema es real y actual.",
      "• 3. Identifica tu meta realista y alcanzable en esta situación.",
      "• 4. Lluvia de ideas: Genera múltiples soluciones posibles sin juzgarlas aún.",
      "• 5. Elige una o dos soluciones que encajen con tu meta y ponlas a prueba.",
      "• 6. Evalúa los resultados y ajusta el plan si es necesario."
    ],
    when: "Cuando tu malestar proviene de un problema real modificable (ej. conflicto laboral, deudas, organización).",
    tool: "problem"
  },
  {
    id: "5.12",
    moduleId: "emotion_regulation",
    moduleName: "Módulo 3: Regulación Emocional",
    name: "Emociones Positivas y Maestría",
    fullName: "Acumular Emociones Positivas / Construir Maestría",
    icon: "trophy",
    summary: "Crear experiencias gratificantes y sentido de competencia",
    whatIs: "Fortalece tu resiliencia emocional creando experiencias gratificantes (a corto y largo plazo) y desarrollando sentido de logro y competencia personal.",
    stepsTitle: "Componentes principales:",
    steps: [
      "• A corto plazo: Realiza cada día al menos una actividad agradable sencilla (caminar al sol, escuchar música, cocinar algo rico).",
      "• A largo plazo: Da pequeños pasos consistentes hacia metas de vida importantes y basadas en tus valores.",
      "• Construir Maestría: Realiza tareas que representen un reto moderado (aprender un instrumento, ordenar un espacio complejo) para experimentar sensación de eficacia."
    ],
    when: "Para prevenir estados de vacío, depresión o vulnerabilidad emocional crónica.",
    tool: "mastery"
  },
  {
    id: "5.13",
    moduleId: "emotion_regulation",
    moduleName: "Módulo 3: Regulación Emocional",
    name: "Enfrentar por Adelantado (Cope Ahead)",
    fullName: "Enfrentar por Adelantado (Cope Ahead)",
    icon: "shield-check",
    summary: "Planificar y ensayar mentalmente el manejo de situaciones difíciles",
    whatIs: "Ensayo mental estructurado para prepararte a responder con eficacia ante una situación futura que probablemente desencadene emociones intensas.",
    stepsTitle: "Los 5 pasos estructurados:",
    steps: [
      "• 1. Describe detalladamente la situación amenazante futura.",
      "• 2. Decide qué habilidades DBT concretas vas a utilizar.",
      "• 3. Imagina la escena en tu mente vívidamente, sintiendo la incomodidad.",
      "• 4. Ensaya mentalmente en detalle cómo aplicas con éxito la habilidad.",
      "• 5. Respira profundamente y relaja tu cuerpo tras el ensayo mental."
    ],
    when: "Antes de reuniones difíciles, exámenes, eventos sociales estresantes o visitas médicas.",
    tool: "copeahead"
  },
  {
    id: "5.14",
    moduleId: "emotion_regulation",
    moduleName: "Módulo 3: Regulación Emocional",
    name: "Habilidades PLEASE (Cuidado físico)",
    fullName: "Reducción de Vulnerabilidad: PLEASE",
    icon: "apple",
    summary: "Cuidado de la salud física para equilibrar la mente",
    whatIs: "Conjunto de hábitos biológicos esenciales para reducir la vulnerabilidad a la desregulación emocional.",
    stepsTitle: "Acrónimo paso a paso:",
    steps: [
      "• PL - Tratar enfermedades físicas (PhysicaL illness): Tomar medicamentos indicados y consultar al médico.",
      "• E - Comer de forma equilibrada (Eating): No comer en exceso ni saltarse comidas.",
      "• A - Evitar drogas alteradoras del ánimo (Avoid mood-altering substances): Evitar alcohol y drogas ilegales.",
      "• S - Dormir equilibrado (Sleep): Dormir entre 7 y 9 horas con horarios constantes.",
      "• E - Ejercicio físico regular (Exercise): Realizar actividad física 20 minutos al día."
    ],
    when: "Como base de autocuidado diario para sostener la estabilidad emocional.",
    tool: "please"
  },
  {
    id: "5.15",
    moduleId: "interpersonal",
    moduleName: "Módulo 4: Efectividad Interpersonal",
    name: "DEAR MAN (Pedir / Decir No)",
    fullName: "Eficacia en Objetivos: DEAR MAN",
    icon: "message-square",
    summary: "Guía paso a paso para hacer peticiones o poner límites claros",
    whatIs: "Estrategia para conseguir un objetivo concreto (pedir algo o negarse a una petición) protegiendo la relación y el autorrespeto.",
    stepsTitle: "Acrónimo paso a paso:",
    steps: [
      "• D - Describir: Hechos concretos sin juzgar ('El informe vencía ayer').",
      "• E - Expresar: Sentimientos en primera persona ('Me siento preocupado').",
      "• A - Asertivo: Pedir claramente o decir 'no' de forma directa ('Necesito que lo envíes hoy').",
      "• R - Reforzar: Explicar las consecuencias positivas ('Así terminaremos a tiempo').",
      "• M - Mantenerse consciente (Mindful): Disco rayado ante distracciones.",
      "• A - Aparentar seguridad: Tono de voz firme, contacto visual y postura erguida.",
      "• N - Negociar: Ofrecer y pedir soluciones alternativas viables."
    ],
    when: "Cuando necesites pedir un favor, aumento, cambio de conducta en otro o poner un límite firme.",
    tool: "dearman"
  },
  {
    id: "5.16",
    moduleId: "interpersonal",
    moduleName: "Módulo 4: Efectividad Interpersonal",
    name: "GIVE (Cuidar la relación)",
    fullName: "Cuidado de la Relación: GIVE",
    icon: "heart",
    summary: "Pautas para comunicarse cuidando el vínculo afectivo",
    whatIs: "Conjunto de pautas para comunicarte cuidando y fortaleciendo el vínculo con la otra persona mientras realizas una petición o dices que no.",
    stepsTitle: "Acrónimo paso a paso:",
    steps: [
      "• G - Gentil (Gentle): Sé amable y cortés. Evita ataques verbales, amenazas, sarcasmo o juicios de valor.",
      "• I - Mostrar Interés (Interested): Escucha activamente el punto de vista del otro sin interrumpir.",
      "• V - Validar (Validate): Reconoce con palabras y gestos que los sentimientos, dificultades y opiniones de la otra persona son comprensibles.",
      "• E - Estilo ameno (Easy manner): Usa un tono cálido, una sonrisa o sentido del humor suave para reducir la tensión."
    ],
    when: "En conversaciones con personas cuyo vínculo deseas preservar a largo plazo.",
    tool: "give"
  },
  {
    id: "5.17",
    moduleId: "interpersonal",
    moduleName: "Módulo 4: Efectividad Interpersonal",
    name: "FAST (Mantener el autorrespeto)",
    fullName: "Eficacia en el Autorrespeto: FAST",
    icon: "user-check",
    summary: "Proteger tu dignidad y valores durante interacciones sociales",
    whatIs: "Pautas para proteger tu dignidad, integridad y valores personales durante una interacción interpersonal, evitando ceder por culpa o miedo.",
    stepsTitle: "Acrónimo paso a paso:",
    steps: [
      "• F - Ser Justo (Fair): Sé justo tanto contigo mismo como con la otra persona; valida tus propias necesidades tanto como las ajenas.",
      "• A - Sin disculpas excesivas (no Apologies): No pidas perdón por existir, por tener una opinión o por hacer una petición legítima.",
      "• S - Sostener tus valores (Stick to values): No sacrifiques tus principios morales ni tu integridad solo por agradar o evitar incomodidad momentánea.",
      "• T - Ser Veraz (Truthful): No mientas, no exageres excusas ni actúes como si estuvieras indefenso."
    ],
    when: "Cuando tiendes a sobre-disculparte, anular tus necesidades o sentir vergüenza al pedir algo.",
    tool: "fast"
  }
];

export const EMOTIONS_LIST = [
  { id: "ansiedad", name: "Ansiedad / Miedo", color: "#F6BD60", icon: "wind" },
  { id: "tristeza", name: "Tristeza", color: "#8DA9C4", icon: "cloud-rain" },
  { id: "enojo", name: "Enojo", color: "#E29578", icon: "flame" },
  { id: "verguenza", name: "Vergüenza", color: "#DDA15E", icon: "eye-off" },
  { id: "culpa", name: "Culpa", color: "#BC6C25", icon: "frown" },
  { id: "asco", name: "Asco", color: "#A3B18A", icon: "shield-alert" },
  { id: "alegria", name: "Alegría", color: "#84A59D", icon: "sun" }
];

export const PROBLEM_BEHAVIORS_LIST = [
  { id: "autolesion", name: "Ideas de autolesión" },
  { id: "suicidio", name: "Ideas de suicidio" },
  { id: "atracon", name: "Idea de atracón" },
  { id: "drogas", name: "Ideas de consumir drogas" },
  { id: "alcohol", name: "Ideas de consumir alcohol" },
  { id: "otras", name: "Otras conductas problema" }
];

// Initial mock data matching Mockup 7
export const INITIAL_DIARY_RECORDS = [
  {
    id: "rec-2026-10-19",
    date: "2026-10-19",
    dayLabel: "Lun",
    fullDateLabel: "Lunes 19 Oct",
    emotions: {
      ansiedad: 4,
      tristeza: 2,
      enojo: 1,
      verguenza: 1,
      culpa: 1,
      asco: 0,
      alegria: 1
    },
    maxEmotion: "Ansiedad (4/5)",
    impulseLevel: 2,
    impulseLabel: "Autolesión (2)",
    behaviors: {
      autolesion: { scale: 2, performed: false },
      suicidio: { scale: 0, performed: false },
      atracon: { scale: 0, performed: false },
      drogas: { scale: 0, performed: false },
      alcohol: { scale: 0, performed: false },
      otras: { scale: 0, performed: false, detail: "" }
    },
    performedAny: false,
    notes: "Tensión elevada por presentación de proyecto. Sentí el impulso pero me detuve a tiempo.",
    skillsUsed: ["5.1", "5.5"],
    skillsLabel: "TIPP / Mente Sabia"
  },
  {
    id: "rec-2026-10-20",
    date: "2026-10-20",
    dayLabel: "Mar",
    fullDateLabel: "Martes 20 Oct",
    emotions: {
      ansiedad: 2,
      tristeza: 3,
      enojo: 1,
      verguenza: 0,
      culpa: 1,
      asco: 0,
      alegria: 2
    },
    maxEmotion: "Tristeza (3/5)",
    impulseLevel: 2,
    impulseLabel: "Atracón (2)",
    behaviors: {
      autolesion: { scale: 0, performed: false },
      suicidio: { scale: 0, performed: false },
      atracon: { scale: 2, performed: false },
      drogas: { scale: 0, performed: false },
      alcohol: { scale: 0, performed: false },
      otras: { scale: 0, performed: false, detail: "" }
    },
    performedAny: false,
    notes: "Ganas de aislarme y comer en exceso. Apliqué acción opuesta saliendo a caminar.",
    skillsUsed: ["5.10"],
    skillsLabel: "Acción Opuesta"
  },
  {
    id: "rec-2026-10-21",
    date: "2026-10-21",
    dayLabel: "Mié",
    fullDateLabel: "Miércoles 21 Oct",
    emotions: {
      ansiedad: 2,
      tristeza: 1,
      enojo: 3,
      verguenza: 1,
      culpa: 0,
      asco: 0,
      alegria: 2
    },
    maxEmotion: "Enojo (3/5)",
    impulseLevel: 1,
    impulseLabel: "Alcohol (1)",
    behaviors: {
      autolesion: { scale: 0, performed: false },
      suicidio: { scale: 0, performed: false },
      atracon: { scale: 0, performed: false },
      drogas: { scale: 0, performed: false },
      alcohol: { scale: 1, performed: false },
      otras: { scale: 0, performed: false, detail: "" }
    },
    performedAny: false,
    notes: "Discusión con familiar. Quería tomar una copa pero usé STOP y verifiqué los hechos.",
    skillsUsed: ["5.4", "5.9"],
    skillsLabel: "STOP / Verificar"
  },
  {
    id: "rec-2026-10-22",
    date: "2026-10-22",
    dayLabel: "Jue",
    fullDateLabel: "Jueves 22 Oct",
    emotions: {
      ansiedad: 1,
      tristeza: 1,
      enojo: 0,
      verguenza: 1,
      culpa: 2,
      asco: 0,
      alegria: 3
    },
    maxEmotion: "Culpa (2/5)",
    impulseLevel: 0,
    impulseLabel: "Ninguno (0)",
    behaviors: {
      autolesion: { scale: 0, performed: false },
      suicidio: { scale: 0, performed: false },
      atracon: { scale: 0, performed: false },
      drogas: { scale: 0, performed: false },
      alcohol: { scale: 0, performed: false },
      otras: { scale: 0, performed: false, detail: "" }
    },
    performedAny: false,
    notes: "Sentimiento de culpa por retraso. Descompuse la tarea en pasos pequeños.",
    skillsUsed: ["5.11"],
    skillsLabel: "Solución Problemas"
  },
  {
    id: "rec-2026-10-23",
    date: "2026-10-23",
    dayLabel: "Vie",
    fullDateLabel: "Viernes 23 Oct",
    emotions: {
      ansiedad: 3,
      tristeza: 2,
      enojo: 0,
      verguenza: 1,
      culpa: 1,
      asco: 0,
      alegria: 2
    },
    maxEmotion: "Ansiedad (3/5)",
    impulseLevel: 1,
    impulseLabel: "Drogas (1)",
    behaviors: {
      autolesion: { scale: 0, performed: false },
      suicidio: { scale: 0, performed: false },
      atracon: { scale: 0, performed: false },
      drogas: { scale: 1, performed: false },
      alcohol: { scale: 0, performed: false },
      otras: { scale: 0, performed: false, detail: "" }
    },
    performedAny: false,
    notes: "Cansancio extremo al terminar la semana. Usé infusión de té y música relajante.",
    skillsUsed: ["5.7"],
    skillsLabel: "Calmarse 5 Sentidos"
  },
  {
    id: "rec-2026-10-24",
    date: "2026-10-24",
    dayLabel: "Sáb",
    fullDateLabel: "Sábado 24 Oct",
    emotions: {
      ansiedad: 3,
      tristeza: 2,
      enojo: 1,
      verguenza: 1,
      culpa: 1,
      asco: 0,
      alegria: 3
    },
    maxEmotion: "Ansiedad (3/5)",
    impulseLevel: 1,
    impulseLabel: "Atracón (1)",
    behaviors: {
      autolesion: { scale: 0, performed: false },
      suicidio: { scale: 0, performed: false },
      atracon: { scale: 1, performed: false },
      drogas: { scale: 0, performed: false },
      alcohol: { scale: 0, performed: false },
      otras: { scale: 1, performed: false, detail: "Inquietud motriz" }
    },
    performedAny: false,
    notes: "Sentí ansiedad antes de la reunión, pero apliqué respiración pausada (TIPP) y Mente Sabia.",
    skillsUsed: ["5.6"],
    skillsLabel: "Distraerse ACCEPTS"
  },
  {
    id: "rec-2026-10-25",
    date: "2026-10-25",
    dayLabel: "Dom",
    fullDateLabel: "Domingo 25 Oct",
    emotions: {
      ansiedad: 1,
      tristeza: 1,
      enojo: 0,
      verguenza: 0,
      culpa: 0,
      asco: 0,
      alegria: 4
    },
    maxEmotion: "Alegría (4/5)",
    impulseLevel: 0,
    impulseLabel: "Ninguno (0)",
    behaviors: {
      autolesion: { scale: 0, performed: false },
      suicidio: { scale: 0, performed: false },
      atracon: { scale: 0, performed: false },
      drogas: { scale: 0, performed: false },
      alcohol: { scale: 0, performed: false },
      otras: { scale: 0, performed: false, detail: "" }
    },
    performedAny: false,
    notes: "Paseo por el parque y cocina con calma. Logré experimentar maestría.",
    skillsUsed: ["5.12"],
    skillsLabel: "Emociones Positivas"
  }
];

export const DEFAULT_USER = {
  name: "María G.",
  email: "paciente@programa-dbt.cl",
  program: "Programa DBT",
  streakDays: 5,
  completedDaysThisWeek: 5,
  mostUsedSkill: "Atención Plena (Mente Sabia)",
  nextSession: "Martes 16:00 hrs",
  contacts: {
    therapist: {
      name: "Dra. Sofía Valenzuela (Terapeuta DBT)",
      phone: "+56 9 8765 4321",
      note: "Coaching telefónico (llamadas breves de 5-10 min)"
    },
    support: {
      name: "Carlos (Contacto de Confianza)",
      phone: "+56 9 1234 5678",
      note: "Red de apoyo personal"
    },
    crisisLine: {
      name: "Línea Prevención Suicidio (Minsal Chile)",
      phone: "*4141",
      note: "Atención gratuita, 24 horas, confidencial (SAMU: 131)"
    }
  }
};
