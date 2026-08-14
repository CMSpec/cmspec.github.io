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
        title: "Cuatro funciones de IA en salud",
        subtitle: "Interpretar, estimar, redactar y auditar sin confundir sus salidas",
        description: "Una introducción a los distintos papeles que puede asumir la inteligencia artificial al analizar información clínica y poblacional.",
        authors: "Camila Muñoz Santander",
        published: "14 agosto 2026",
        modified: "14 agosto 2026",
        href: "/salud/funciones-ia-en-salud",
        visual: "datos → IA → apoyo",
        eyebrow: "01 / INTELIGENCIA ARTIFICIAL EN SALUD",
        introduction: "Hablar de «una IA» puede ocultar tareas muy diferentes. No es lo mismo explicar qué variables influyen, estimar una probabilidad, organizar información en un resumen o advertir que ciertos datos no parecen consistentes. Separar esas funciones permite entender qué puede aportar cada herramienta al trabajo en salud y qué debe seguir revisando una persona.",
        sections: [
          {
            title: "No existe una sola IA",
            body: "Bajo el nombre de inteligencia artificial conviven herramientas que responden preguntas diferentes. Una IA interpretativa intenta mostrar qué variables influyen y mediante qué relaciones; una predictiva estima probabilidades o prioridades; una generativa organiza lenguaje en resúmenes y cronologías; y una auditora busca anomalías o discrepancias que merecen una segunda mirada. Distinguirlas es importante porque una explicación, una predicción, un texto generado y una alerta no tienen el mismo significado ni deben usarse como si fueran equivalentes.",
          },
          {
            title: "Entradas y salidas",
            body: "Una aplicación puede comenzar con documentos, texto extraído, variables clínicas, indicadores poblacionales o resultados observados con anterioridad. La salida depende de la tarea: puede ser una explicación de variables relevantes, una probabilidad acompañada de incertidumbre, un resumen enlazado a sus fuentes o una alerta con la evidencia que la originó. Esta correspondencia entre lo que entra, el proceso realizado y lo que sale debe permanecer visible. De lo contrario, la fluidez de un texto o la precisión aparente de un número pueden dar una confianza que el sistema no justifica.",
          },
          {
            title: "Qué puede aportar en salud pública",
            body: "Estas herramientas pueden organizar registros extensos, reconstruir cronologías, detectar información faltante, anticipar demanda y hacer visibles patrones que serían difíciles de reconocer manualmente. A escala poblacional también pueden apoyar la identificación de desigualdades y orientar una revisión más oportuna. El beneficio no proviene solo de hacer una tarea más rápido: puede aparecer al conectar fuentes dispersas, formular mejores preguntas o liberar tiempo profesional para situaciones que requieren contexto y deliberación.",
          },
          {
            title: "Los límites también cambian con la escala",
            body: "La calidad de una salida depende de cómo se produjeron los datos y de quiénes quedaron representados en ellos. Un resumen convincente puede contener errores, una variable importante no demuestra causalidad y un buen desempeño promedio puede esconder fallas persistentes en ciertos grupos. En salud pública, además, una clasificación puede cambiar prioridades o influir indirectamente en el acceso a recursos. Por eso es necesario distinguir una asociación de una causa, una prioridad operativa de una necesidad sanitaria y una mejora global de una distribución realmente justa de sus beneficios y errores.",
          },
          {
            title: "Integrar sin confundir",
            body: "Una estrategia responsable puede combinar reglas de calidad, lectura de documentos, modelos predictivos y herramientas de auditoría, pero debe conservar diferenciadas sus salidas. La persona que recibe el resultado necesita saber de dónde proviene, con qué información fue construido, qué incertidumbre contiene y cuándo no debería utilizarse. La meta no es automatizar por completo una decisión de alto impacto, sino construir apoyos que mejoren su calidad, consistencia, trazabilidad y oportunidad.",
          },
        ],
      },
      {
        number: "02",
        title: "Human-in-the-loop",
        subtitle: "Supervisión humana para decisiones asistidas por inteligencia artificial",
        description: "Una mirada a los distintos niveles de intervención humana: validar cada caso, vigilar el sistema mientras opera y conservar la capacidad de corregirlo o detenerlo.",
        authors: "Camila Muñoz Santander",
        published: "14 agosto 2026",
        modified: "14 agosto 2026",
        href: "/salud/human-in-the-loop",
        visual: "IA ⇄ persona",
        eyebrow: "02 / SUPERVISIÓN HUMANA",
        introduction: "Incluir a una persona en un sistema de inteligencia artificial no consiste solamente en pedir una aprobación al final. El human-in-the-loop define quién revisa cada resultado, quién observa el funcionamiento general y quién tiene autoridad para cambiar las reglas o detener el sistema.",
        sections: [
          {
            title: "La persona dentro del proceso",
            body: "Cuando una persona está in the loop, revisa el resultado de cada caso antes de que produzca una acción. La IA puede resumir, estimar o alertar, mientras el profesional contrasta las fuentes, incorpora antecedentes que el modelo no conoce y documenta su decisión. Esta intervención no debería convertirse en una aprobación automática: para que sea significativa, la persona necesita tiempo, información comprensible y autoridad real para disentir.",
          },
          {
            title: "Vigilar mientras el sistema opera",
            body: "Estar on the loop significa mirar el funcionamiento del sistema en el tiempo. No exige revisar manualmente cada cálculo, pero sí observar errores, incidentes, cambios en los datos y diferencias de desempeño entre grupos. Un modelo puede degradarse aunque su código no cambie, simplemente porque cambia la población o el contexto. La supervisión requiere entonces indicadores útiles, criterios de alerta y una capacidad concreta para corregir o detener la operación.",
          },
          {
            title: "Mantener el control y la responsabilidad",
            body: "Human-in-command amplía la mirada hacia la gobernanza: definir para qué se usa la IA, qué fuentes están autorizadas, qué límites no puede traspasar, cómo se audita y bajo qué condiciones debe suspenderse. En aplicaciones sanitarias de alto impacto conviene combinar los tres niveles: una persona dentro de la decisión, otra mirada sobre la operación y una estructura responsable al mando del sistema. Las tareas completamente automatizadas deberían limitarse a situaciones de bajo impacto y contar igualmente con mecanismos para reconocer consecuencias inesperadas.",
          },
          {
            title: "Supervisar es también interpretar",
            body: "La supervisión humana no funciona solamente como respaldo cuando la IA falla. También permite discutir la relevancia de una correlación, reconocer información ausente, considerar circunstancias excepcionales y explicar por qué se aceptó o descartó una recomendación. Esa trazabilidad forma parte del resultado. Sin ella es difícil distinguir una decisión realmente deliberada de otra en la que una persona se limitó a confirmar lo que la interfaz sugería.",
          },
          {
            title: "Una mirada colectiva",
            body: "En salud pública, revisar casos individuales no es suficiente. También hay que observar si el sistema cambia prioridades, distribuye de manera desigual sus errores o perjudica sistemáticamente a una región, edad, sexo, patología u otro grupo relevante. Esto exige indicadores desagregados, canales para reportar incidentes y participación de profesionales y comunidades capaces de reconocer daños que una métrica general no muestra. El control humano, en este sentido, no es una sola persona frente a una pantalla, sino una práctica continua de evaluación y responsabilidad compartida.",
          },
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
        number: "08",
        title: "Topología para tejedoras",
        subtitle: "Del punto local a la forma global de un sweater",
        description: "Una introducción a la topología desde la experiencia de tejer: vecindades, continuidad, bordes, orificios y las propiedades que sobreviven al deformar una prenda.",
        authors: "Camila Muñoz Santander",
        published: "3 agosto 2026",
        modified: "3 agosto 2026",
        href: "/tejido/topologia-para-tejedoras",
        visual: "local ↔ global",
        eyebrow: "08 / TEJIDO & TOPOLOGÍA",
        introduction: "Antes de convertirse en una prenda, un tejido es una colección de relaciones locales: cada punto se enlaza con otros y cada decisión modifica la continuidad de la tela. La topología permite preguntar cómo esas relaciones producen una forma global y qué permanece cuando la estiramos, doblamos o vestimos.",
        sections: [],
      },
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
