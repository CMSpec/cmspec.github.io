import type { Exercise } from "./exercises.ts";
import { partialFractionExercises } from "./courses/partial-fractions-guide.ts";
import { partialFractionHints, partialFractionSlug, partialFractionSolutions } from "./courses/partial-fractions-solutions.ts";
import { supplementaryProblems } from "./courses/introductory-supplements.ts";
const t = String.raw;
const common = { course: "Introducción a las Matemáticas", courseSlug: "introduccion-matematicas", collection: "Ejercicios", estimatedTime: "15 min" };

export const introSupplementaryExercises: Exercise[] = [
  ...partialFractionSolutions.flatMap((item, index): Exercise[] => item.existingSlug ? [] : [{
    ...common, slug: partialFractionSlug(index), number: `FP-${String(index + 1).padStart(2, "0")}`,
    title: item.title, topic: "Fracciones parciales", difficulty: item.difficulty,
    statement: [t`Descompón en fracciones parciales sobre los reales e indica el dominio: $$${partialFractionExercises[index]}.$$`],
    relatedTheory: [{ label: "Fracciones parciales: los cuatro casos", href: "/cursos/introduccion-matematicas#intro-polinomios-7" }],
    hints: partialFractionHints(item),
    solution: [...item.working.map(body => ({ body })), { title: "Resultado y dominio", body: t`La descomposición es $$${item.answer}.$$ Se exige $${item.domain}$. Al reunir las fracciones se recupera exactamente el numerador original.` }],
    finalAnswer: t`$${item.answer}$, con $${item.domain}$.`,
    commonMistake: "Omitir potencias de un factor repetido, olvidar el cociente polinómico o intentar factorizar una cuadrática irreducible en factores lineales reales.",
  }]),
  ...supplementaryProblems.map((item, index): Exercise => ({
    ...common, slug: item.slug, number: `IM-${String(index + 1).padStart(2, "0")}`, title: item.title, topic: item.topic, difficulty: item.difficulty,
    statement: [item.statement], relatedTheory: [{ label: item.section === "ecuaciones-4" ? "Sistemas y traducción de problemas" : "Sumas telescópicas", href: `/cursos/introduccion-matematicas#intro-${item.section}` }],
    hints: item.hints, solution: item.solution.map(body => ({ body })), finalAnswer: item.answer, commonMistake: item.mistake,
  })),
];
