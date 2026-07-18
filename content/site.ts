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
    tagline: "Un espectro de intereses entre investigación, aprendizaje y curiosidad.",
  },

  navigation: {
    ariaLabel: "Navegación principal",
    links: [
      { label: "Espectro", href: "#espectro" },
      { label: "Aprender", href: "/aprender" },
      { label: "Archivo", href: "#archivo" },
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
      color: "var(--olive)",
      href: "#archivo",
      linkLabel: "Próximamente",
    },
    {
      id: "health",
      short: "02",
      title: "Colaboraciones en Salud",
      eyebrow: "Leer lo que los datos dicen",
      description:
        "Análisis reproducibles y visualizaciones para comprender preguntas relevantes en salud.",
      color: "var(--blue)",
      href: "#archivo",
      linkLabel: "Próximamente",
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
      href: "#archivo",
      linkLabel: "Próximamente",
    },
  ],

  spectrumSection: {
    index: "01 / EL ESPECTRO",
    titleFirstLine: "Espectro",
    titleSecondLine: "del sitio",
    description:
      "Cada sección representa una parte de mis intereses. Juntas forman un archivo vivo de ideas en desarrollo.",
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
} as const;
