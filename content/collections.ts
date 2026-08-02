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
    label: "TEJIDO & ESTRUCTURAS",
    kicker: "CMSPEC / TEJIDO & ESTRUCTURAS",
    title: "Tejer",
    deck: "Una colección sobre repeticiones, simetrías y estructuras matemáticas que se vuelven visibles al trabajar con hilo.",
    colophon: "Tejer permite pensar con las manos: cada muestra puede convertirse en una pequeña exploración de forma, número y estructura.",
    tone: "pink",
    entries: [
      {
        number: "07",
        title: "Caminar por una banda de Möbius",
        subtitle: "De un cuello tejido a una superficie no orientable",
        description: "Una media vuelta antes de coser transforma una tira en una superficie de un solo lado, con propiedades muy distintas a las de un cilindro.",
        authors: "Camila Muñoz Santander",
        published: "2 agosto 2026",
        modified: "2 agosto 2026",
        href: "/tejido/banda-de-moebius",
        visual: "▭ ↝ ∞",
        eyebrow: "07 / TEJIDO & TOPOLOGÍA",
        introduction: "Un cuello de lana puede comenzar como una tira rectangular. Si antes de unir sus extremos damos media vuelta a uno de ellos, el objeto cotidiano se convierte en una banda de Möbius: una superficie cuya diferencia con un cilindro parece mínima, pero cambia por completo su geometría.",
        sections: [],
      },
      {
        number: "06",
        title: "Cuando una superficie se puede tejer",
        subtitle: "De la ecuación del círculo al crochet hiperbólico",
        description: "Un recorrido por las ecuaciones que describen formas, la geometría algebraica y las superficies que Margaret y Christine Wertheim convirtieron en un arrecife colectivo.",
        authors: "Camila Muñoz Santander",
        published: "2 agosto 2026",
        modified: "2 agosto 2026",
        href: "/tejido/superficies-que-se-pueden-tejer",
        visual: "x²+y²=r² ↝ crochet",
        eyebrow: "06 / GEOMETRÍA & CROCHET",
        introduction: "Una ecuación puede describir con exactitud una forma y, aun así, no hacerla fácil de imaginar. El crochet ofrece otra clase de comprensión: convierte la curvatura en una superficie que puede mirarse, doblarse y tocarse.",
        sections: [],
      },
      {
        number: "05",
        title: "Repetir, identificar, representar",
        subtitle: "De los días de la semana a superficies con agujeros",
        description: "Módulos, representantes y dominios fundamentales para comprender cómo un patrón repetido puede convertirse en un cilindro, un toro o una superficie de género 2.",
        authors: "Camila Muñoz Santander",
        published: "1 agosto 2026",
        modified: "1 agosto 2026",
        href: "/tejido/repeticion-identificaciones-y-superficies",
        visual: "ℤ/7ℤ → T²",
        eyebrow: "05 / PATRONES & TOPOLOGÍA",
        introduction: "Repetir un patrón también significa decidir qué posiciones consideraremos equivalentes. Los días de la semana, los puntos de un tejido y los bordes de una superficie comparten esa misma idea: elegir una pieza representativa y reconstruir el conjunto mediante identificaciones.",
        sections: [],
      },
      {
        number: "04",
        title: "Del revés al bit",
        subtitle: "Tejido, inversión y sistemas binarios",
        description: "Una lectura del derecho y el revés como dos estados que conduce desde los puntos tejidos hasta los bits y la historia de la programación.",
        authors: "Camila Muñoz Santander",
        published: "1 agosto 2026",
        modified: "1 agosto 2026",
        href: "/tejido/del-reves-al-bit",
        visual: "D ↔ R · 0 ↔ 1",
        eyebrow: "04 / TEJIDO & COMPUTACIÓN",
        introduction: "Cuando damos vuelta un tejido, aquello que veíamos como derecho aparece como revés. Si lo damos vuelta nuevamente, recuperamos la vista inicial. Ese gesto cotidiano contiene una idea matemática precisa: una transformación que es su propia inversa.",
        sections: [],
      },
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
    ],
  },
];

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getEntry(collectionSlug: string, href: string) {
  return getCollection(collectionSlug)?.entries.find((entry) => entry.href === href);
}
