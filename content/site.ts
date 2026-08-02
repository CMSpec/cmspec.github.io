/*
 * CONTENIDO EDITABLE DE CMSpec
 *
 * Puedes cambiar los textos que están entre comillas sin tocar el diseño.
 * Conserva las comillas, las comas y los nombres que aparecen a la izquierda.
 * El correo actual es provisional: reemplázalo por el que quieras publicar.
 */

export const siteContent = {
  brand: {
    name: "CMSpec",
    owner: "Camila Muñoz Santander",
    email: "camila.mspec@gmail.com",
    tagline: "Un espectro de intereses entre aprendizaje, curiosidad y manualidades.",
  },

  navigation: {
    ariaLabel: "Navegación principal",
    links: [
      { label: "Aprender", href: "/aprender" },
      { label: "Archivo", href: "#archivo" },
      { label: "Sobre mí", href: "/sobre-mi" },
    ],
    contactLabel: "Contacto",
  },

  hero: {
    kicker: "Un Cuaderno de notas de Camila",
    title: "Conocimiento a través de todo el",
    highlightedTitle: "espectro.",
    introduction:
      "Investigo, enseño y exploro con matemáticas, datos y visualización. CMSpec es el lugar donde se reúne el espectro de mis intereses.",
    primaryAction: "Explorar CMSpec",
    visualizationLabel: "Visualización del espectro de intereses de CMSpec",
  },

  domains: [
    {
      id: "research",
      short: "01",
      title: "Investigación & Math",
      eyebrow: "Pensar con estructura",
      description:
        "Proyectos, avances, modelos y notas matemáticas que hacen visible el proceso, no solo el resultado.",
      color: "var(--blue)",
      href: "/investigacion",
      linkLabel: "Abrir la colección",
    },
    {
      id: "health",
      short: "02",
      title: "Colaboraciones en Salud",
      eyebrow: "Leer lo que los datos dicen",
      description:
        "Análisis, exporación y discusión en tópicos de salud pública.",
      color: "var(--olive)",
      href: "/salud",
      linkLabel: "Abrir la colección",
    },
    {
      id: "learn",
      short: "03",
      title: "Apuntes y exploración",
      eyebrow: "Explorar antes de memorizar",
      description:
        "Cursos y apuntes de pregrado con simulaciones, ejemplos y explicaciones interactivas.",
      color: "var(--green)",
      href: "/aprender",
      linkLabel: "Abrir la biblioteca",
    },
    {
      id: "misc",
      short: "04",
      title: "Tejido & Patrones",
      eyebrow: "La matemática hecha materia",
      description:
        "Tejido, patrones, simetrías y otros hobbies que conectan la creatividad manual con el pensamiento matemático.",
      color: "var(--pink)",
      href: "/tejido",
      linkLabel: "Abrir la colección",
    },
  ],

  spectrumSection: {
    index: "01 / EL ESPECTRO",
    titleFirstLine: "Espectro",
    titleSecondLine: "del sitio",
    description:
      "Cada sección representa una parte de mis intereses. Pueden existir intersecciones entre ellos, que a veces no son tan evidentes.",
  },

  laboratory: {
    index: "02 / VISUALIZACIÓN INTERACTIVA",
    title: "Cuando un resultado positivo no significa lo que parece.",
    description:
      "Cambia los supuestos de esta prueba diagnóstica. Observa cómo la prevalencia transforma el significado de un resultado positivo, incluso cuando la prueba es precisa.",
    predictiveValueLabel: "Valor predictivo positivo",
    predictiveValueExplanation: "de los positivos realmente tienen la condición",
    controls: {
      prevalence: "Prevalencia",
      sensitivity: "Sensibilidad",
      specificity: "Especificidad",
    },
    populationIntro: "En una población de",
    populationSize: "1.000 personas",
    results: {
      truePositive: "Verdaderos positivos",
      falsePositive: "Falsos positivos",
      falseNegative: "Falsos negativos",
      trueNegative: "Verdaderos negativos",
    },
    footnote: "Modelo educativo simplificado · No constituye consejo médico",
  },

  archive: {
    index: "02 / EN CONSTRUCCIÓN",
    titleFirstLine: "Este archivo crecerá",
    titleSecondLine: "con cada pregunta.",
    description:
      "La primera versión de CMSpec abre el espacio. Pronto aquí vivirán investigaciones, cursos, notas y visualizaciones interactivas.",
    topics: [
      "Investigaciones",
      "Notas matemáticas",
      "Datos de salud",
      "Apuntes interactivos",
      "Tejido y matemáticas",
    ],
  },

  about: {
    index: "03 / SOBRE MÍ",
    titleFirstLine: "Camila Muñoz",
    titleSecondLine: "Santander",
    introduction:
      "Soy matemática y docente. Me interesa construir formas de leer, enseñar y comunicar ideas que suelen aparecer separadas, pero que comparten estructuras y preguntas.",
    paragraphs: [
      "En CMSpec reúno investigación matemática, apuntes de pregrado, colaboraciones en salud pública y exploraciones visuales. Este sitio funciona como un cuaderno abierto: conserva procesos, conecta conceptos y permite que los materiales sigan creciendo.",
      "El tejido ocupa un lugar especial en este espectro. Sus repeticiones, simetrías, cruces y superficies permiten pensar la matemática con las manos y encontrar relaciones que no siempre son evidentes en una fórmula.",
    ],
    interests: ["Matemáticas", "Docencia", "Salud pública", "Visualización", "Tejido & patrones"],
  },

  recommended: {
    index: "04 / PARA SEGUIR LEYENDO",
    title: "Entradas recomendadas",
    description: "Tres recorridos para entrar a CMSpec desde distintos puntos del espectro.",
    entries: [
      {
        title: "Álgebra Lineal",
        category: "APUNTES & EXPLORACIÓN",
        description: "Vectores, matrices, sistemas y transformaciones acompañados por ejemplos y visualizaciones.",
        href: "/cursos/algebra-lineal",
        image: "/images/recommended-math.jpg",
        imageAlt: "Cuaderno abierto con ejercicios matemáticos sobre una mesa",
        credit: "Foto provisional: De an Sun · Unsplash",
        creditHref: "https://unsplash.com/photos/white-paper-document-on-brown-wooden-table-46kSHMAbCeM",
        tone: "blue",
      },
      {
        title: "Explorar datos de salud",
        category: "COLABORACIONES EN SALUD",
        description: "Preguntas sobre procedencia, calidad y límites antes de resumir un conjunto de datos.",
        href: "/salud/explorar-datos",
        image: "/images/recommended-health.jpg",
        imageAlt: "Persona trabajando con un computador y un estetoscopio sobre la mesa",
        credit: "Foto provisional: National Cancer Institute · Unsplash",
        creditHref: "https://unsplash.com/photos/person-sitting-while-using-laptop-computer-and-green-stethoscope-near-NFvdKIhxYlU",
        tone: "olive",
      },
      {
        title: "Cuando una superficie se puede tejer",
        category: "TEJIDO & PATRONES",
        description: "De la ecuación del círculo al crochet hiperbólico y el arrecife de las hermanas Wertheim.",
        href: "/tejido/superficies-que-se-pueden-tejer",
        image: "/images/recommended-crochet.jpg",
        imageAlt: "Proceso de crochet realizado con hilo azul",
        credit: "Foto provisional: Liana S · Unsplash",
        creditHref: "https://unsplash.com/photos/crocheting-with-blue-yarn-is-in-progress-7XP0xSMobkg",
        tone: "pink",
      },
    ],
  },
} as const;
