// Contenido adicional de la edición LaTeX, integrado sin repetir los desarrollos existentes.
const t = String.raw;
export type IntroSupplement = { title: string; paragraphs: string[] };
export const introductorySupplements: Record<string, IntroSupplement[]> = {
  "logica-1": [{ title: "Leer el condicional sin afirmar su antecedente", paragraphs: ["En un condicional no afirmamos que el antecedente sea verdadero: describimos qué ocurre si lo es. Una implicación falsa necesita antecedente verdadero y consecuente falso. La tabla permite distinguir estas dos afirmaciones."] }],
  "ecuaciones-2": [{ title: "Comprobar los signos al factorizar", paragraphs: [t`Al resolver $|x-3|=4$, la factorización de $x^2-6x-7$ es $(x-7)(x+1)$, no $(x+7)(x-1)$. Al multiplicar, comprueba tanto el término constante como el coeficiente de $x$. Las soluciones $7$ y $-1$ satisfacen la ecuación original.`] }],
  "induccion-sumatorias-1": [
    { title: "La imagen del dominó y los conjuntos inductivos", paragraphs: ["La primera ficha debe caer y cada ficha debe hacer caer a la siguiente. La primera condición representa la base; la segunda, el paso inductivo. Sin base no comienza la cadena; verificar muchos casos sin justificar el paso tampoco demuestra todos los casos.", t`Un conjunto $A\subseteq\mathbb R$ es inductivo si $1\in A$ y $x\in A\Rightarrow x+1\in A$. Todo conjunto inductivo contiene a $\mathbb N=\{1,2,3,\ldots\}$; no todo conjunto inductivo es igual a $\mathbb N$. Por ejemplo, $\mathbb Z$, $\mathbb Q$, $\mathbb R_{>0}$ y $[1,\infty)$ son inductivos.`] },
    { title: "Producto de potencias, por inducción", paragraphs: [t`Para $a,b\in\mathbb R$ y $n\ge1$, queremos probar $(ab)^n=a^nb^n$. La base $n=1$ es inmediata.`, t`Si $(ab)^k=a^kb^k$, entonces $(ab)^{k+1}=(ab)^k(ab)=a^kb^kab=a^{k+1}b^{k+1}$. Se usan la asociatividad y la conmutatividad del producto de números reales.`] },
    { title: "Una desigualdad por inducción", paragraphs: [t`Probemos $n<2^n$ para $n\ge1$. En la base, $1<2$.`, t`Si $k<2^k$, entonces $k+1<2^k+1\le2^k+2^k=2^{k+1}$, pues $1\le2^k$. Esta comparación intermedia es la que permite concluir el paso inductivo.`] },
  ],
  "geometria-analitica-1": [{ title: "¿Es esta la única distancia?", paragraphs: ["Existen otros tipos de distancia. La fórmula obtenida mediante Pitágoras es la distancia euclidiana, que es la que usaremos en este tema."] }],
  "geometria-analitica-2": [{ title: "La pendiente no determina por sí sola la recta", paragraphs: [t`Una recta de pendiente $1$ no tiene que pasar por el origen. Todas las rectas $y=x+b$ tienen esa pendiente; solo $b=0$ da una recta que pasa por $(0,0)$.`] }],
  "geometria-analitica-6": [
    { title: "Convenciones de los semiejes", paragraphs: [t`También es posible llamar $a$ al radio horizontal y $b$ al vertical, independientemente de cuál sea mayor. En ese convenio, $c^2=|a^2-b^2|$. Aquí $a$ nombra siempre el semieje mayor, por lo que $c^2=a^2-b^2$. Ambas convenciones describen la misma curva, pero no deben mezclarse.`] },
    { title: "Distinguir los cuatro extremos de una elipse", paragraphs: [t`Para $2x^2+9y^2=18$ se obtiene $x^2/9+y^2/2=1$. Los vértices mayores son $(\pm3,0)$; los extremos del eje menor, $(0,\pm\sqrt2)$; y los focos, $(\pm\sqrt7,0)$. Los cuatro extremos no tienen el mismo papel.`] },
    { title: "Qué ocurre al variar la excentricidad", paragraphs: [t`Si $e=0$, la elipse es una circunferencia. Si se mantiene $a$ fijo y $e$ se aproxima a $1$, $b=a\sqrt{1-e^2}$ se aproxima a cero: la elipse se aplana. El caso límite no es una elipse no degenerada.`] },
  ],
};

export const supplementaryProblems = [
  { slug: "introduccion-inversion-dos-fondos", section: "ecuaciones-4", title: "Inversión en dos fondos", topic: "Ecuaciones y álgebra", difficulty: "Inicial" as const,
    statement: t`Se invierte al $8\%$ el doble de lo invertido al $5\%$; el interés anual total es $588\,000$. Determina los dos capitales.`,
    hints: [t`Llama $x$ al capital que gana el $5\%$.`, t`El capital que gana el $8\%$ es $2x$. El interés es capital por tasa.`, t`Resuelve $0.05x+0.08(2x)=588\,000$ y comprueba los intereses.`],
    solution: [t`La ecuación $0.05x+0.08(2x)=588\,000$ se reduce a $0.21x=588\,000$. Por tanto, $x=2\,800\,000$.`, t`Los capitales son $2\,800\,000$ al $5\%$ y $5\,600\,000$ al $8\%$. Los intereses verifican $140\,000+448\,000=588\,000$.`],
    answer: t`$2\,800\,000$ al $5\%$ y $5\,600\,000$ al $8\%$.`, mistake: "El doble corresponde al capital invertido, no a la tasa ni al interés obtenido." },
  { slug: "introduccion-distribucion-capital", section: "ecuaciones-4", title: "Distribución de un capital", topic: "Ecuaciones y álgebra", difficulty: "Inicial" as const,
    statement: t`Se reparten $100\,000$ entre tasas anuales del $6\%$ y del $4.5\%$, obteniendo $5\,025$ de interés en un año. Determina cuánto se invierte a cada tasa.`,
    hints: [t`Llama $x$ al capital que gana el $6\%$.`, t`La otra cantidad es $100\,000-x$.`, t`Plantea $0.06x+0.045(100\,000-x)=5\,025$.`],
    solution: [t`Desarrollamos $0.06x+0.045(100\,000-x)=5\,025$: queda $0.015x=525$.`, t`Así, $x=35\,000$ y el otro capital es $65\,000$. Comprobamos los intereses: $2\,100+2\,925=5\,025$.`],
    answer: t`$35\,000$ al $6\%$ y $65\,000$ al $4.5\%$.`, mistake: "Los dos capitales deben sumar el total; no son incógnitas independientes sin relación." },
  { slug: "introduccion-mezcla-soluciones", section: "ecuaciones-4", title: "Mezcla de soluciones", topic: "Ecuaciones y álgebra", difficulty: "Intermedio" as const,
    statement: t`¿Qué volúmenes de soluciones al $6\%$ y al $15\%$ deben mezclarse para obtener medio litro al $8\%$? Supón que los volúmenes se suman y que las concentraciones están expresadas en la misma base.`,
    hints: [t`Sean $x$ e $y$ los volúmenes en litros. Entonces $x+y=1/2$.`, t`Conserva la cantidad de soluto: $0.06x+0.15y=0.08(1/2)$.`, t`Sustituye $y=1/2-x$ en la ecuación de concentración.`],
    solution: [t`Al sustituir obtenemos $0.06x+0.15(1/2-x)=0.04$, es decir, $0.09x=0.035$.`, t`Resultan $x=7/18$ e $y=1/9$ litros. Suman $1/2$ litro, y la cantidad de soluto es $0.06(7/18)+0.15(1/9)=0.04$, el $8\%$ de medio litro.`],
    answer: t`$7/18$ litros al $6\%$ y $1/9$ litros al $15\%$.`, mistake: "No se promedian directamente los porcentajes cuando se mezclan volúmenes distintos." },
  { slug: "introduccion-sumatoria-telescopica-cubos", section: "induccion-sumatorias-5", title: "Una suma que combina telescopía, cubos y constantes", topic: "Inducción y sumatorias", difficulty: "Desafío" as const,
    statement: t`Calcula $\displaystyle S=\sum_{k=1}^{200}\left[\frac14\left(\frac1{2k-1}-\frac1{2k+1}\right)-5k^3+4\right]$.`,
    hints: ["Separa las tres sumas usando linealidad.", t`En la primera toma $a_k=1/(2k-1)$; entonces $a_{k+1}=1/(2k+1)$.`, t`Usa $\sum_{k=1}^{n}k^3=[n(n+1)/2]^2$ y cuenta las $200$ constantes.`],
    solution: [t`La parte telescópica es $(1-1/3)+(1/3-1/5)+\cdots+(1/399-1/401)=1-1/401$. Queda el primero menos el término que sigue al último índice.`, t`Por linealidad, $S=\frac14(1-1/401)-5(200\cdot201/2)^2+4\cdot200$.`, t`Por tanto, $S=100/401-2\,020\,049\,200$. El factor $1/4$ solo multiplica la suma telescópica, no los otros dos sumandos.`],
    answer: t`$S=\frac{100}{401}-2\,020\,049\,200$.`, mistake: "Al cancelar no desaparecen todos los términos: el último denominador es 401, no 399." },
];
