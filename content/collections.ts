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
      {
        number: "03",
        title: "Cuatro funciones de IA en salud",
        subtitle: "Interpretar, estimar, redactar y auditar sin confundir sus salidas",
        description: "Una introducción a los distintos papeles que puede asumir la inteligencia artificial al analizar información clínica y poblacional.",
        authors: "Camila Muñoz Santander",
        published: "14 agosto 2026",
        modified: "14 agosto 2026",
        href: "/salud/funciones-ia-en-salud",
        visual: "datos → IA → apoyo",
        eyebrow: "03 / INTELIGENCIA ARTIFICIAL EN SALUD",
        introduction: "Hablar de «una IA» puede ocultar tareas muy diferentes. No es lo mismo explicar qué variables influyen, estimar una probabilidad, organizar información en un resumen o advertir que ciertos datos no parecen consistentes. Separar esas funciones permite entender qué puede aportar cada herramienta al trabajo en salud y qué debe seguir revisando una persona.",
        sections: [
          {
            title: "Cuatro preguntas distintas",
            body: "La IA interpretativa pregunta qué variables influyen y muestra reglas o relaciones revisables. La predictiva estima una probabilidad o prioridad. La generativa organiza texto en resúmenes y cronologías. La auditora señala anomalías o discrepancias que merecen una segunda mirada. Ninguna de estas salidas equivale, por sí sola, a una decisión clínica.",
          },
          {
            title: "Entradas y salidas",
            body: "El sistema puede recibir documentos, texto extraído, variables clínicas, indicadores poblacionales y resultados previos. A partir de ellos produce salidas separadas: una explicación de variables relevantes, una probabilidad con su nivel de confianza, un resumen enlazado a sus fuentes o una alerta acompañada de la evidencia que la originó. Mantenerlas separadas evita que un texto convincente se confunda con una predicción o con una decisión.",
          },
          {
            title: "Usos posibles",
            body: "Estas herramientas pueden ayudar a organizar registros extensos, reconstruir cronologías, identificar información faltante, priorizar revisiones, anticipar demanda y hacer visibles patrones difíciles de detectar manualmente. Su valor está en preparar y enfocar el trabajo profesional, no en reemplazar la integración del contexto ni el juicio de quien decide.",
          },
          {
            title: "Desafíos que no desaparecen",
            body: "La calidad de la salida depende de la calidad y representatividad de los datos. Un resumen fluido puede contener errores; una variable importante no demuestra causalidad; y un modelo con buen desempeño promedio puede fallar en ciertos grupos. Por eso deben revisarse calibración, equidad, datos faltantes y cambios en la población a lo largo del tiempo.",
          },
          {
            title: "La escala de la salud pública",
            body: "A escala poblacional, la IA puede ayudar a reconocer desigualdades, anticipar demanda, ordenar grandes volúmenes de información y dirigir la revisión hacia donde parece más necesaria. Pero una ganancia de eficiencia también puede amplificar sesgos históricos, ocultar realidades locales detrás de un promedio o modificar indirectamente el acceso a prestaciones. La sutileza está en distinguir una asociación de una causa, una prioridad operativa de una necesidad sanitaria y un buen resultado global de un desempeño justo en cada subgrupo.",
          },
          {
            title: "Una arquitectura híbrida",
            body: "Una estrategia responsable puede combinar reglas de calidad, lectura de documentos, modelos predictivos y herramientas de auditoría, manteniendo sus salidas diferenciadas y entregándolas a un equipo humano. La meta no es automatizar una decisión de alto impacto, sino mejorar su calidad, consistencia, trazabilidad y oportunidad.",
          },
        ],
      },
      {
        number: "04",
        title: "Human-in-the-loop",
        subtitle: "Supervisión humana para decisiones asistidas por inteligencia artificial",
        description: "Una mirada a los distintos niveles de intervención humana: validar cada caso, vigilar el sistema mientras opera y conservar la capacidad de corregirlo o detenerlo.",
        authors: "Camila Muñoz Santander",
        published: "14 agosto 2026",
        modified: "14 agosto 2026",
        href: "/salud/human-in-the-loop",
        visual: "IA ⇄ persona",
        eyebrow: "04 / SUPERVISIÓN HUMANA",
        introduction: "Incluir a una persona en un sistema de inteligencia artificial no consiste solamente en pedir una aprobación al final. El human-in-the-loop define quién revisa cada resultado, quién observa el funcionamiento general y quién tiene autoridad para cambiar las reglas o detener el sistema.",
        sections: [
          {
            title: "Dentro del circuito",
            body: "Cuando una persona está in the loop, valida el resultado de cada caso antes de que produzca una acción. La IA puede resumir, estimar o alertar; el profesional contrasta las fuentes, incorpora antecedentes que el modelo no conoce y documenta la decisión final.",
          },
          {
            title: "Sobre el circuito",
            body: "Estar on the loop significa supervisar el sistema mientras opera. No exige revisar manualmente cada cálculo, pero sí observar errores, incidentes, cambios en los datos y diferencias de desempeño entre grupos. La persona responsable debe poder intervenir cuando aparecen señales de deterioro.",
          },
          {
            title: "Al mando del sistema",
            body: "Human-in-command amplía la mirada hacia la gobernanza: definir para qué se usa la IA, qué fuentes están autorizadas, qué límites no puede traspasar, cómo se audita y bajo qué condiciones debe suspenderse. También obliga a asignar responsabilidades claras.",
          },
          {
            title: "Combinar niveles de control",
            body: "En aplicaciones sanitarias de alto impacto conviene combinar tres niveles: IN en la decisión de cada caso, ON en la vigilancia de la operación y COMMAND en la gobernanza. Dejar a la persona fuera del circuito puede reservarse para tareas administrativas de bajo impacto, siempre que existan límites claros y mecanismos para detectar consecuencias inesperadas.",
          },
          {
            title: "Más que corregir errores",
            body: "La supervisión humana no solo funciona como respaldo cuando la IA falla. También permite discutir la relevancia clínica de una correlación, reconocer información ausente, considerar circunstancias excepcionales y explicar por qué se aceptó o descartó una recomendación. Esa trazabilidad es parte del resultado, no un agregado posterior.",
          },
          {
            title: "Supervisar efectos colectivos",
            body: "En salud pública, la revisión no puede limitarse a comprobar casos individuales. También debe observar si el sistema cambia prioridades, distribuye de manera desigual sus errores o perjudica sistemáticamente a una región, edad, sexo, patología u otro grupo relevante. Esto requiere indicadores desagregados, canales para reportar incidentes y participación de profesionales y comunidades capaces de reconocer daños que una métrica general no muestra.",
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
