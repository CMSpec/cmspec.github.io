export type ExerciseDifficulty = "Inicial" | "Intermedio" | "Desafío";

export type Exercise = {
  slug: string;
  number: string;
  course: string;
  courseSlug: string;
  collection: string;
  title: string;
  topic: string;
  difficulty: ExerciseDifficulty;
  estimatedTime: string;
  statement: string[];
  relatedTheory: Array<{ label: string; href: string }>;
  hints: string[];
  solution: Array<{ title?: string; body: string }>;
  finalAnswer: string;
  commonMistake: string;
};

export const exercises: Exercise[] = [
  {
    slug: "plano-que-contiene-una-recta",
    number: "01",
    course: "Cálculo Vectorial",
    courseSlug: "calculo-vectorial",
    collection: "Ejercicios",
    title: "Un plano que contiene una recta",
    topic: "Geometría en R³",
    difficulty: "Inicial",
    estimatedTime: "12 min",
    statement: [
      "Determine la ecuación general del plano que pasa por P = (1, 2, 0) y contiene la recta r(t) = (2, −1, 3) + t(1, 0, −2).",
      "Luego compruebe que ese plano es perpendicular a una recta cuyo vector director es (3, 5/2, 3/2).",
    ],
    relatedTheory: [
      { label: "Producto cruz", href: "/cursos/calculo-vectorial#clase-1-seccion-4" },
      { label: "Ecuación del plano", href: "/cursos/calculo-vectorial#clase-1-seccion-7" },
    ],
    hints: [
      "El plano queda determinado por P y dos puntos distintos de la recta.",
      "Resta P a cada uno de los puntos que elegiste para obtener dos vectores contenidos en el plano.",
      "El producto cruz de esos vectores entrega un vector normal. Para la perpendicularidad, compáralo con el vector director dado.",
    ],
    solution: [
      { title: "1. Dos direcciones del plano", body: "La recta contiene A = (2, −1, 3) y B = (3, −1, 1). Entonces PA = (1, −3, 3) y PB = (2, −3, 1)." },
      { title: "2. Vector normal", body: "Calculamos PA × PB = (6, 5, 3). Este vector es perpendicular a las dos direcciones del plano." },
      { title: "3. Ecuación", body: "Con n = (6, 5, 3) y P = (1, 2, 0): 6(x − 1) + 5(y − 2) + 3z = 0." },
      { title: "4. Perpendicularidad", body: "El vector director (3, 5/2, 3/2) multiplicado por 2 es (6, 5, 3), el normal del plano. Por eso la recta es perpendicular al plano." },
    ],
    finalAnswer: "6x + 5y + 3z − 16 = 0; la recta dada es perpendicular al plano.",
    commonMistake: "Usar solamente el vector director de la recta y el punto P: todavía falta una segunda dirección contenida en el plano.",
  },
  {
    slug: "interseccion-cilindro-plano",
    number: "02",
    course: "Cálculo Vectorial",
    courseSlug: "calculo-vectorial",
    collection: "Ejercicios",
    title: "Intersección de un cilindro y un plano",
    topic: "Curvas parametrizadas",
    difficulty: "Intermedio",
    estimatedTime: "15 min",
    statement: [
      "Considere el cilindro x² + y² = 9 y el plano x − y + z − 4 = 0. Encuentre una parametrización r(t) de su intersección.",
      "Determine además un punto donde la recta tangente sea paralela al vector (0, 1, 1).",
    ],
    relatedTheory: [
      { label: "Parametrización de curvas", href: "/cursos/calculo-vectorial#clase-2-seccion-4" },
      { label: "Derivadas de funciones vectoriales", href: "/cursos/calculo-vectorial#clase-6-seccion-2" },
    ],
    hints: [
      "Empieza con la parametrización usual del círculo de radio 3 en el plano xy.",
      "Sustituye x = 3 cos(t), y = 3 sin(t) en la ecuación del plano para despejar z.",
      "Deriva r(t). Para que la primera componente del vector tangente sea cero, prueba un valor sencillo de t.",
    ],
    solution: [
      { title: "1. Parametrizar el cilindro", body: "Tomamos x = 3 cos(t) e y = 3 sin(t)." },
      { title: "2. Imponer el plano", body: "De x − y + z − 4 = 0 resulta z = 4 − 3 cos(t) + 3 sin(t)." },
      { title: "3. Buscar la tangente", body: "r′(t) = (−3 sin(t), 3 cos(t), 3 sin(t) + 3 cos(t)). En t = 0 obtenemos r′(0) = (0, 3, 3), paralelo a (0, 1, 1)." },
      { title: "4. Punto", body: "Evaluando la curva en t = 0 se obtiene r(0) = (3, 0, 1)." },
    ],
    finalAnswer: "r(t) = (3 cos t, 3 sin t, 4 − 3 cos t + 3 sin t); un punto pedido es (3, 0, 1).",
    commonMistake: "Encontrar el valor de t usando r(t) en vez de r′(t). El paralelismo solicitado corresponde a la recta tangente.",
  },
  {
    slug: "curvatura-de-una-grafica",
    number: "03",
    course: "Cálculo Vectorial",
    courseSlug: "calculo-vectorial",
    collection: "Ejercicios",
    title: "Curvatura y radio de curvatura",
    topic: "Curvatura",
    difficulty: "Intermedio",
    estimatedTime: "18 min",
    statement: [
      "Para la curva y = 50 + 20√x − 5x, calcule la curvatura κ cuando x = 9/4.",
      "Determine también la magnitud del radio de curvatura en ese punto.",
    ],
    relatedTheory: [
      { label: "Curvatura", href: "/cursos/calculo-vectorial#clase-6-seccion-5" },
      { label: "Derivadas vectoriales", href: "/cursos/calculo-vectorial#clase-6-seccion-2" },
    ],
    hints: [
      "Escribe la gráfica como r(t) = (t, 50 + 20√t − 5t, 0).",
      "Usa κ = ‖r′ × r″‖ / ‖r′‖³ y evalúa las derivadas en t = 9/4.",
      "El radio de curvatura es el recíproco de la curvatura: ρ = 1/κ.",
    ],
    solution: [
      { title: "1. Derivadas", body: "r′(t) = (1, 10/√t − 5, 0) y r″(t) = (0, −5/t^(3/2), 0)." },
      { title: "2. Evaluación", body: "En t = 9/4: r′ = (1, 5/3, 0) y r″ = (0, −40/27, 0)." },
      { title: "3. Curvatura", body: "El producto cruz tiene norma 40/27 y ‖r′‖ = √34/3. Al sustituir, κ = (40/27) / (√34/3)³ = 20/(17√34)." },
      { title: "4. Radio", body: "Tomamos el recíproco: ρ = 17√34/20." },
    ],
    finalAnswer: "κ = 20/(17√34) y ρ = 17√34/20.",
    commonMistake: "Confundir ‖r′‖³ con ‖r′‖² o evaluar antes de derivar.",
  },
  {
    slug: "clasificacion-puntos-criticos",
    number: "04",
    course: "Cálculo Vectorial",
    courseSlug: "calculo-vectorial",
    collection: "Ejercicios",
    title: "Clasificación de puntos críticos",
    topic: "Extremos locales",
    difficulty: "Intermedio",
    estimatedTime: "16 min",
    statement: [
      "Halle todos los puntos críticos de f(x, y) = y³ − x³ − 6xy.",
      "Clasifíquelos como máximo relativo, mínimo relativo o punto de silla.",
    ],
    relatedTheory: [
      { label: "Extremos locales", href: "/cursos/calculo-vectorial#clase-5-seccion-1" },
      { label: "Gradiente", href: "/cursos/calculo-vectorial#lectura-clase-4" },
    ],
    hints: [
      "Los puntos críticos satisfacen ∇f = (0, 0).",
      "De fᵧ = 0 puedes escribir x = y²/2 y sustituirlo en fₓ = 0.",
      "Para clasificar, calcula D = fₓₓ fᵧᵧ − (fₓᵧ)² en cada punto.",
    ],
    solution: [
      { title: "1. Sistema crítico", body: "∇f = (−3x² − 6y, 3y² − 6x). Al igualarlo a cero queda x² + 2y = 0 e y² − 2x = 0." },
      { title: "2. Resolver", body: "Como x = y²/2, la primera ecuación da y(y³ + 8) = 0. Así, los puntos son (0, 0) y (2, −2)." },
      { title: "3. Hessiano", body: "D(x, y) = (−6x)(6y) − (−6)² = −36xy − 36." },
      { title: "4. Clasificar", body: "D(0,0) = −36 < 0, por lo que (0,0) es silla. D(2,−2) = 108 > 0 y fₓₓ(2,−2) = −12 < 0, por lo que (2,−2) es máximo local." },
    ],
    finalAnswer: "(0, 0) es un punto de silla y (2, −2) es un máximo local.",
    commonMistake: "Decir solamente que (0,0) es un punto crítico. El determinante negativo permite concluir que es un punto de silla.",
  },
  {
    slug: "produccion-costo-minimo",
    number: "05",
    course: "Cálculo Vectorial",
    courseSlug: "calculo-vectorial",
    collection: "Ejercicios",
    title: "Producción con costo mínimo",
    topic: "Multiplicadores de Lagrange",
    difficulty: "Desafío",
    estimatedTime: "22 min",
    statement: [
      "La producción es P(x,y) = 60x^(2/3)y^(1/3). La mano de obra cuesta US$64 por unidad y el capital US$108 por unidad.",
      "Si se deben producir 2160 unidades, determine x e y para minimizar el costo total.",
    ],
    relatedTheory: [
      { label: "Extremos condicionados", href: "/cursos/calculo-vectorial#clase-5-seccion-2" },
      { label: "Explorador de Lagrange", href: "/cursos/calculo-vectorial#clase-5-seccion-2" },
    ],
    hints: [
      "Minimiza C(x,y) = 64x + 108y sujeto a 60x^(2/3)y^(1/3) = 2160.",
      "Plantea ∇C = λ∇P y divide una ecuación por la otra para eliminar λ.",
      "La relación resultante es 8x = 27y. Sustitúyela en la restricción de producción.",
    ],
    solution: [
      { title: "1. Lagrange", body: "Con C = 64x + 108y y la restricción P = 2160, las dos ecuaciones de gradientes permiten eliminar λ." },
      { title: "2. Proporción óptima", body: "Al comparar ambas componentes se obtiene 8x = 27y, es decir, x = (27/8)y." },
      { title: "3. Restricción", body: "La producción exige x^(2/3)y^(1/3) = 36. Sustituyendo x = (27/8)y resulta (9/4)y = 36." },
      { title: "4. Valores", body: "De allí y = 16 y x = 54. El costo correspondiente es 64·54 + 108·16 = US$5.184." },
    ],
    finalAnswer: "54 unidades de mano de obra y 16 unidades de capital; costo mínimo US$5.184.",
    commonMistake: "Optimizar la producción en vez del costo. La producción es la restricción y permanece fija en 2160.",
  },
  {
    slug: "campo-conservativo-integral-linea",
    number: "06",
    course: "Cálculo Vectorial",
    courseSlug: "calculo-vectorial",
    collection: "Ejercicios",
    title: "Campo conservativo e integral de línea",
    topic: "Campos vectoriales",
    difficulty: "Desafío",
    estimatedTime: "20 min",
    statement: [
      "Considere F(x,y) = (e^(2y), 1 + 2xe^(2y)). Demuestre que es conservativo y encuentre una función potencial.",
      "Calcule ∫ᴄ F · dr para r(t) = (teᵗ, 1+t), con 0 ≤ t ≤ 1.",
    ],
    relatedTheory: [
      { label: "Integrales de línea", href: "/cursos/calculo-vectorial#clase-10-seccion-1" },
      { label: "Campos conservativos", href: "/cursos/calculo-vectorial#clase-10-seccion-3" },
    ],
    hints: [
      "Escribe F = (M,N) y compara Mᵧ con Nₓ.",
      "Integra M = e^(2y) respecto de x y usa N para determinar la función que depende solamente de y.",
      "Una vez encontrada la potencial φ, no parametrices la integral: aplica φ(r(1)) − φ(r(0)).",
    ],
    solution: [
      { title: "1. Conservatividad", body: "Mᵧ = 2e^(2y) y Nₓ = 2e^(2y). Como el dominio es R², simplemente conexo, el campo es conservativo." },
      { title: "2. Potencial", body: "Integrar φₓ = e^(2y) respecto de x da φ = xe^(2y) + g(y). Al comparar φᵧ con N resulta g′(y) = 1, de modo que φ = xe^(2y) + y." },
      { title: "3. Extremos de la curva", body: "r(0) = (0,1) y r(1) = (e,2)." },
      { title: "4. Teorema fundamental", body: "La integral es φ(e,2) − φ(0,1) = (e·e⁴ + 2) − 1." },
    ],
    finalAnswer: "El campo tiene potencial φ(x,y) = xe^(2y) + y; la integral vale e⁵ + 1.",
    commonMistake: "Calcular directamente una integral larga después de haber probado que el campo es conservativo.",
  },
];

export function getExercise(slug: string) {
  return exercises.find((exercise) => exercise.slug === slug);
}
