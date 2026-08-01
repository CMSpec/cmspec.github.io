export type CollectionTone = "olive" | "blue" | "pink";

export type EditorialEntry = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  authors: string;
  published: string;
  modified: string;
  href: string;
  visual: string;
  eyebrow: string;
  introduction: string;
  sections: { title: string; body: string }[];
};

export type EditorialCollection = {
  slug: string;
  label: string;
  kicker: string;
  title: string;
  deck: string;
  colophon: string;
  tone: CollectionTone;
  entries: EditorialEntry[];
};

export const collections: EditorialCollection[] = [
  {
    slug: "investigacion",
    label: "INVESTIGACIÓN & MATH",
    kicker: "CMSPEC / INVESTIGACIÓN & MATH",
    title: "Investigar",
    deck: "Un espacio para documentar preguntas, modelos, avances y conexiones matemáticas mientras toman forma.",
    colophon: "Estas entradas son documentos vivos: registran procesos, preguntas abiertas y relaciones que pueden seguir desarrollándose.",
    tone: "blue",
    entries: [
      {
        number: "01",
        title: "Preguntas y modelos",
        subtitle: "Del problema inicial a una estructura matemática",
        description: "Un lugar para formular preguntas, precisar supuestos y reconocer qué objetos matemáticos pueden ayudar a estudiarlas.",
        authors: "Camila Muñoz Santander",
        published: "19 julio 2026",
        modified: "19 julio 2026",
        href: "/investigacion/preguntas-y-modelos",
        visual: "? → M",
        eyebrow: "01 / CUADERNO DE INVESTIGACIÓN",
        introduction: "Investigar comienza mucho antes de obtener un resultado: comienza al construir una pregunta que permita mirar el problema con precisión.",
        sections: [
          { title: "La pregunta", body: "Esta entrada servirá para registrar el problema de interés, su contexto y las preguntas que orientan el trabajo." },
          { title: "El modelo", body: "Aquí se explicitarán las variables, relaciones, supuestos y límites del modelo matemático elegido." },
          { title: "Avances", body: "Este apartado reunirá resultados parciales, decisiones metodológicas y nuevas preguntas que aparezcan durante el proceso." },
        ],
      },
      {
        number: "02",
        title: "Notas matemáticas",
        subtitle: "Ideas, demostraciones y conexiones en desarrollo",
        description: "Apuntes breves para conservar argumentos, ejemplos y relaciones matemáticas que surgen durante una investigación.",
        authors: "Camila Muñoz Santander",
        published: "19 julio 2026",
        modified: "19 julio 2026",
        href: "/investigacion/notas-matematicas",
        visual: "A ⇄ B",
        eyebrow: "02 / NOTAS MATEMÁTICAS",
        introduction: "Algunas ideas necesitan un espacio intermedio entre el borrador y el texto terminado: estas notas cumplen esa función.",
        sections: [
          { title: "Idea central", body: "Aquí se presentará la observación matemática que da origen a cada nota y la razón por la que resulta útil conservarla." },
          { title: "Desarrollo", body: "Este espacio contendrá definiciones, argumentos, ejemplos o cálculos necesarios para comprender la idea." },
          { title: "Conexiones", body: "La entrada podrá enlazar la idea con otros problemas, cursos o áreas del espectro de CMSpec." },
        ],
      },
    ],
  },
  {
    slug: "salud",
    label: "COLABORACIONES EN SALUD",
    kicker: "CMSPEC / COLABORACIONES EN SALUD",
    title: "Salud",
    deck: "Análisis, exploración y discusión para comprender preguntas relevantes de salud pública.",
    colophon: "Las entradas de esta colección describen preguntas y métodos; no reemplazan orientación clínica ni constituyen consejo médico.",
    tone: "olive",
    entries: [
      {
        number: "01",
        title: "Explorar datos de salud",
        subtitle: "Preguntar antes de resumir",
        description: "Una guía inicial para reconocer la procedencia, estructura, calidad y límites de datos vinculados con salud pública.",
        authors: "Camila Muñoz Santander",
        published: "19 julio 2026",
        modified: "19 julio 2026",
        href: "/salud/explorar-datos",
        visual: "data → ?",
        eyebrow: "01 / EXPLORACIÓN DE DATOS",
        introduction: "Antes de calcular indicadores conviene comprender cómo se produjeron los datos, qué representan y qué preguntas permiten responder.",
        sections: [
          { title: "Procedencia", body: "Aquí se documentará el origen de los datos, la población observada y el proceso mediante el cual fueron registrados." },
          { title: "Calidad", body: "Este apartado permitirá discutir datos ausentes, definiciones operacionales, sesgos posibles y consistencia de las mediciones." },
          { title: "Preguntas", body: "La exploración se organizará alrededor de preguntas explícitas y de las limitaciones que deben acompañar cualquier interpretación." },
        ],
      },
      {
        number: "02",
        title: "Conversaciones en salud pública",
        subtitle: "Evidencia, contexto y decisiones",
        description: "Notas para discutir conceptos, métodos y resultados de manera comprensible, cuidadosa y situada en su contexto.",
        authors: "Camila Muñoz Santander",
        published: "19 julio 2026",
        modified: "19 julio 2026",
        href: "/salud/conversaciones-salud-publica",
        visual: "evidencia + contexto",
        eyebrow: "02 / DISCUSIÓN",
        introduction: "Los resultados cuantitativos adquieren sentido cuando se relacionan con su contexto, sus supuestos y las decisiones que podrían informar.",
        sections: [
          { title: "El tópico", body: "Cada entrada podrá introducir un problema de salud pública y explicar por qué merece ser discutido." },
          { title: "La evidencia", body: "Aquí se organizarán los datos, conceptos o resultados relevantes, distinguiendo hallazgos de interpretaciones." },
          { title: "La conversación", body: "Este espacio reunirá preguntas abiertas, perspectivas complementarias y aspectos que requieren cautela." },
        ],
      },
    ],
  },
  {
    slug: "tejido",
    label: "TEJIDO & PATRONES",
    kicker: "CMSPEC / TEJIDO & PATRONES",
    title: "Tejer",
    deck: "Una colección sobre repeticiones, simetrías y estructuras matemáticas que se vuelven visibles al trabajar con hilo.",
    colophon: "Tejer permite pensar con las manos: cada muestra puede convertirse en una pequeña exploración de forma, número y estructura.",
    tone: "pink",
    entries: [
      {
        number: "03",
        title: "Trenzas, nudos y tejido",
        subtitle: "Cuando cruzar hilos se convierte en álgebra",
        description: "Una entrada desde el gesto cotidiano de trenzar hasta la formalización del grupo de trenzas y sus relaciones.",
        authors: "Camila Muñoz Santander",
        published: "1 agosto 2026",
        modified: "1 agosto 2026",
        href: "/tejido/trenzas-nudos-y-tejido",
        visual: "σ₁ σ₂ σ₁",
        eyebrow: "03 / MATEMÁTICA & TEJIDO",
        introduction: "Trenzar parece un gesto simple: tomar hebras vecinas, cruzarlas y repetir. Pero si registramos el orden y la orientación de cada cruce aparece una estructura algebraica sorprendentemente rica.",
        sections: [],
      },
      {
        number: "01",
        title: "Repetición y ritmo",
        subtitle: "Contar puntos para construir un patrón",
        description: "Una introducción a la repetición como regla: módulos, secuencias y variaciones que organizan una pieza tejida.",
        authors: "Camila Muñoz Santander",
        published: "19 julio 2026",
        modified: "19 julio 2026",
        href: "/tejido/repeticion-y-ritmo",
        visual: "◦ ◦ ● ◦ ◦ ●",
        eyebrow: "01 / PATRONES",
        introduction: "Un patrón de tejido puede leerse como una regla que se repite, se desplaza o se transforma a lo largo de una superficie.",
        sections: [
          { title: "El módulo", body: "Aquí se identificará la unidad mínima que se repite y la cantidad de puntos y vueltas necesarias para construirla." },
          { title: "La secuencia", body: "El patrón podrá describirse con palabras, símbolos o una sucesión que haga visible su organización." },
          { title: "Variaciones", body: "Este apartado explorará qué ocurre al cambiar la escala, alternar módulos o modificar la regla de repetición." },
        ],
      },
      {
        number: "02",
        title: "Simetrías tejidas",
        subtitle: "Reflejos, traslaciones y giros hechos materia",
        description: "Una mirada matemática a las transformaciones que aparecen en motivos, guardas y composiciones textiles.",
        authors: "Camila Muñoz Santander",
        published: "19 julio 2026",
        modified: "19 julio 2026",
        href: "/tejido/simetrias-tejidas",
        visual: "↔  ↻  →",
        eyebrow: "02 / SIMETRÍAS",
        introduction: "Los motivos tejidos ofrecen una forma concreta de observar transformaciones geométricas y comparar qué permanece invariante.",
        sections: [
          { title: "Traslación", body: "Una guarda aparece cuando un motivo se desplaza a intervalos regulares sin cambiar su forma ni orientación." },
          { title: "Reflexión", body: "Al reflejar un motivo se construyen correspondencias que pueden organizar bordes, centros y ejes visuales." },
          { title: "Rotación", body: "Los giros permiten componer motivos alrededor de un punto y estudiar el orden de una simetría." },
        ],
      },
    ],
  },
];

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getEntry(collectionSlug: string, href: string) {
  return getCollection(collectionSlug)?.entries.find((entry) => entry.href === href);
}
