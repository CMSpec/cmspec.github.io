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
    owner: "Camila Muñoz",
    email: "camila@example.com",
    tagline: "Un espectro de ideas, investigación y aprendizaje.",
  },

  navigation: {
    ariaLabel: "Navegación principal",
    links: [
      { label: "Espectro", href: "#espectro" },
      { label: "Laboratorio", href: "#laboratorio" },
      { label: "Archivo", href: "#archivo" },
    ],
    contactLabel: "Conversemos",
  },

  hero: {
    kicker: "Cuaderno abierto de Camila Muñoz",
    title: "Ideas a través de todo el",
    highlightedTitle: "espectro.",
    introduction:
      "Investigo, enseño y exploro con matemáticas, datos y visualización. CMSpec es el lugar donde esas preguntas se encuentran.",
    primaryAction: "Explorar CMSpec",
    secondaryAction: "Ver un experimento",
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
    },
    {
      id: "health",
      short: "02",
      title: "Datos & Salud",
      eyebrow: "Leer lo que los datos dicen",
      description:
        "Análisis reproducibles y visualizaciones para comprender preguntas relevantes en salud.",
      color: "var(--blue)",
    },
    {
      id: "learn",
      short: "03",
      title: "Aprender",
      eyebrow: "Explorar antes de memorizar",
      description:
        "Cursos y apuntes de pregrado con simulaciones, ejemplos y explicaciones interactivas.",
      color: "var(--green)",
    },
    {
      id: "misc",
      short: "04",
      title: "Misceláneo",
      eyebrow: "El resto del espectro",
      description:
        "Lecturas, hobbies, experimentos y hallazgos que alimentan la curiosidad fuera del aula.",
      color: "var(--pink)",
    },
  ],

  spectrumSection: {
    index: "01 / EL ESPECTRO",
    titleFirstLine: "Cuatro formas de mirar",
    titleSecondLine: "una misma curiosidad.",
    description:
      "Cada sección tiene su propio pulso. Juntas forman un archivo vivo de ideas en desarrollo.",
    cardLink: "Próximamente",
  },

  laboratory: {
    index: "02 / LABORATORIO INTERACTIVO",
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
    index: "03 / EN CONSTRUCCIÓN",
    titleFirstLine: "Un archivo que crecerá",
    titleSecondLine: "con cada pregunta.",
    description:
      "La primera versión de CMSpec abre el espacio. Pronto aquí vivirán investigaciones, cursos, notas y experimentos reales.",
    topics: [
      "Investigaciones",
      "Notas matemáticas",
      "Datos de salud",
      "Apuntes interactivos",
    ],
  },
} as const;
