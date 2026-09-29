import type { Exercise, ExerciseDifficulty } from "./exercises";

// Solo se separan listas revisadas de problemas independientes, no listas de datos
// ni etapas que necesitan el resultado del inciso anterior.
type Plan = { title: string; levels?: ExerciseDifficulty[]; solutions?: string[][]; titles?: string[]; hints?: string[][]; statements?: string[][] };
const r=String.raw;
export const splitPlans: Record<string, Plan> = {
  "965fa23243af": {title:"Función · dominio y recorrido",levels:["Inicial","Intermedio","Inicial"],statements:[
    [r`Dada $f(x)=|x+1|-2$, determine su dominio y recorrido.`],
    [r`Dada $g(x)=\sqrt{\frac{2x-1}{3x+5}}$, determine su dominio.`],
    [r`Dada $h(x)=(x-1)^2+3$, determine su recorrido, los cortes con los ejes y los intervalos de crecimiento y decrecimiento. Utilizando traslaciones, grafique la función.`]
  ],solutions:[
    [r`El valor absoluto está definido para todo real y su mínimo es cero, alcanzado en $x=-1$. Por tanto el dominio es $\mathbb R$ y el recorrido $[-2,\infty)$.`],
    [r`Se exige $(2x-1)/(3x+5)\ge0$ y $x\ne-5/3$. La tabla de signos con puntos críticos $-5/3$ y $1/2$ da el dominio $(-\infty,-5/3)\cup[1/2,\infty)$.`],
    [r`La parábola tiene vértice $(1,3)$ y abre hacia arriba: recorrido $[3,\infty)$. Corta el eje $Y$ en $(0,4)$ y no corta $X$. Decrece en $(-\infty,1]$ y crece en $[1,\infty)$. Su gráfica se obtiene trasladando $y=x^2$ una unidad a la derecha y tres arriba.`]
  ]},
  "94d7c2627742": {title:"Ecuación o desigualdad",levels:Array(18).fill("Intermedio")},
  "6908b72e2228": {title:"Ecuación trigonométrica"},
  "2cfa534c58ed": {title:"Identidad trigonométrica"},
  "104d8f10f1fd": {title:"Ecuación"},
  "b617d76e5bb2": {title:"Desigualdad"},
  "edf5c4329f88": {title:"Ecuación trigonométrica"},
  "9cdebb09088b": {title:"Función · traslación, cortes y monotonía"},
  "b69651f0b88f": {title:"Problema de alturas",titles:["Problema de alturas · faro y barco","Problema de alturas · cometa","Problema de alturas · edificio y antena","Problema de alturas · montaña y barco","Problema de alturas · estatua y ángulo doble"],levels:["Inicial","Inicial","Intermedio","Intermedio","Desafío"]},
  "c0ea2e56dd22": {title:"Problema de alturas",titles:["Problema de alturas · sombra en una ladera","Problema de alturas · Romeo y Julieta"]},
  "cb9cae5642de": {title:"Lógica",titles:["Lógica · valores de una implicación falsa","Lógica · negación de un universal"]},
  "53a07816e1c5": {title:"Trigonometría",titles:["Ecuación trigonométrica · coseno al cuadrado","Identidad trigonométrica · secante y tangente"]},
  "9211d2958ca8": {title:"Ecuación o desigualdad"},
  "9f29ce699774": {title:"Ecuación trigonométrica"},
  "131acaac0687": {title:"Desigualdad"},
  "757fc782b09d": {title:"Identidad trigonométrica"},
  "9460063d45f6": {title:"Ecuación trigonométrica"},
  "73b0b5e85343": {title:"Desigualdad"},
  "031b6e35088d": {title:"Desigualdad"},
  "e67de0d54f98": {title:"Desigualdad"},
  "53597c80efef": {title:"Fracciones parciales",levels:["Intermedio","Desafío"],solutions:[
    [r`El denominador es $(x-1)^3$ y $5x-2=5(x-1)+3$. Por tanto $\frac{5x-2}{(x-1)^3}=\frac5{(x-1)^2}+\frac3{(x-1)^3}$, con $x\ne1$.`],
    [r`El denominador es $(x-3)(x^2+1)^2$. Plantea $A/(x-3)+(Bx+C)/(x^2+1)+(Dx+E)/(x^2+1)^2$. Multiplicando e igualando coeficientes se obtiene $A=29/100$, $B=-29/100$, $C=-87/100$, $D=-29/10$, $E=-17/10$.`,r`La descomposición es $\frac{29}{100(x-3)}-\frac{29x+87}{100(x^2+1)}-\frac{29x+17}{10(x^2+1)^2}$, con $x\ne3$.`]
  ]},
  "a3669395d762": {title:"Operación con números complejos"},
  "875810255219": {title:"Demostración o binomio",titles:["Inducción · divisibilidad por siete","Binomio · igualdad de dos coeficientes"],levels:["Intermedio","Intermedio"]},
  "a1aab9bf0518": {title:"Demostración o binomio",titles:["Inducción · potencia de ocho y divisibilidad","Binomio · exponentes enteros admisibles"],levels:["Intermedio","Desafío"]},
  "cb0486d977e3": {title:"Sumatoria",titles:["Sumatoria telescópica","Suma binomial alternada"]},
  "40879519004b": {title:"Ecuación de una parábola"},
  "a551541d1b57": {title:"Sumatoria"},
  "4ac792f3776e": {title:"Sumatoria"},
  "e4ef000cedc3": {title:"Sumatoria"},
  "b49a0ec48110": {title:"Suma doble"},
  "ffd8bffed0e6": {title:"Demostración · identidad de conjuntos"},
  "2af6dd524a49": {title:"Sumatoria"},
  "4c34761ee9b0": {title:"Ortogonalidad de una base"},
  "4e633a156f71": {title:"Límite"},
  "1a73c47958de": {title:"Límite"},
  "80a4f5d339a1": {title:"Derivación implícita",levels:["Intermedio","Desafío","Desafío","Desafío","Desafío","Intermedio","Desafío","Intermedio"]},
  "938df7613ee7": {title:"Tangente y normal a una curva",levels:Array(6).fill("Intermedio"),solutions:[
    [r`El punto verifica $1^3\cdot3+3^3\cdot1=30$. Al derivar, $y'=-(3x^2y+y^3)/(x^3+3xy^2)$, que vale $-9/7$. Tangente: $y-3=-9(x-1)/7$. Normal: $y-3=7(x-1)/9$.`],
    [r`El punto verifica $2^2\cdot1^2+4\cdot2\cdot1=12$. Derivando, $(2x^2y+4x-12)y'=-(2xy^2+4y)$; en $(2,1)$, $m=-2$. Tangente: $y-1=-2(x-2)$. Normal: $y-1=(x-2)/2$.`],
    [r`$\sin(\pi/2)=1$, así que el punto pertenece a la curva. De $\cos(xy)(y+xy')=y'$ se obtiene $m=0$ en el punto. Tangente $y=1$; normal vertical $x=\pi/2$.`],
    [r`El punto verifica $0+\cos0+3=4$. Derivando, $y'-\sin(xy^2)(y^2+2xyy')+6x=0$; en $(1,0)$, $m=-6$. Tangente $y=-6(x-1)$; normal $y=(x-1)/6$.`],
    [r`El punto verifica $1-1+2=2$. Derivando, $2/(3\sqrt[3]x)-2y'/(3\sqrt[3]y)-2y'=0$; en $(1,-1)$, $m=1/2$. Tangente $y+1=(x-1)/2$; normal $y+1=-2(x-1)$.`],
    [r`El punto verifica $\sqrt1+4\cdot1^2=5$. Derivando, $y'/(2\sqrt y)+y^2+2xyy'=0$; en $(4,1)$, $m=-2/17$. Tangente $y-1=-2(x-4)/17$; normal $y-1=17(x-4)/2$.`]
  ]},
  "6725a8822eb7": {title:"Derivación implícita"},
  "01fc90b37ad8": {title:"Derivada · reglas de derivación"},
  "a9ce301e3cc8": {title:"Derivación implícita"},
  "505737f7c9ca": {title:"Derivada · reglas de derivación"},
  "7ec53692de0c": {title:"Derivada · reglas de derivación"},
  "ab09d0720b60": {title:"Asíntotas de una función",levels:["Intermedio","Intermedio","Desafío","Desafío","Intermedio","Desafío"]},
  "8caca28938b7": {title:"Continuidad y discontinuidades",solutions:[
    [r`La función es continua en $\mathbb R\setminus\{-2,2\}$. En ambos puntos excluidos tiene polos, por lo que no admite extensiones continuas allí.`],
    [r`Para $x\ne2$, $f(x)=(x^2+2x+4)/5$. El límite en $2$ es $12/5$. La extensión $\widetilde f(x)=(x^2+2x+4)/5$ para todo real repara el hueco.`],
    [r`Para $x\ne-4,2$, $f(x)=(x-4)/(x-2)$. En $-4$ el límite es $4/3$, así se repara definiendo $\widetilde f(-4)=4/3$. En $2$ hay un polo no reparable. La extensión es continua en $\mathbb R\setminus\{2\}$.`],
    [r`Para $x\ne-3$, $f(x)=(x^2-3x+9)/2$. Definiendo $\widetilde f(-3)=27/2$ y conservando los otros valores se obtiene una función continua en todo $\mathbb R$.`],
    [r`Para $x\ne1,-2$, $f(x)=(x+1)/(x+2)$. El hueco en $1$ se repara con valor $2/3$, pero el polo en $-2$ no es reparable.`],
    [r`La función es continua en $\mathbb R\setminus\{0\}$. En cero tiene un polo ($f=1/x+1/x^3$), por lo que no hay extensión continua.`],
    [r`Para $x\ne-5,3$, $f(x)=(x-5)/(x-3)$. El hueco en $-5$ se repara asignando $5/4$, mientras que $3$ es un polo no reparable.`],
    [r`Para $x\ne1$, $f=x+1+\sin(x-1)/(x-1)$, cuyo límite en $1$ es $3$. Se define $\widetilde f(1)=3$ y se conserva la expresión fuera de ese punto para obtener continuidad en todo $\mathbb R$.`]
  ]},
  "f1bfced50854": {title:"Recta tangente a una función"},
  "32dee0cf5bcb": {title:"Límite"},
  "b1262eeea1e9": {title:"Asíntotas de una función"},
  "bbee04920b7e": {title:"Inyectividad de una función",solutions:[
    [r`No es inyectiva en $\mathbb R$: $f(0)=f(2)=0$, aunque $0\ne2$.`],
    [r`No es inyectiva en $\mathbb R$: $f(-1)=f(1)=6$, aunque $-1\ne1$.`],
    [r`Sí es inyectiva en $\mathbb R$: $f'(x)=3x^2+1>0$ para todo real, por lo que es estrictamente creciente.`],
    [r`Su dominio es $[-1,\infty)$. La raíz cuadrada, y por tanto $1+\sqrt{1+x}$, es estrictamente creciente en ese dominio: sí es inyectiva.`],
    [r`Su dominio es $[-3,3]$. No es inyectiva: $f(-1)=f(1)=\sqrt8$.`]
  ]},
  "ac54adff0df4": {title:"Dominio de una función",solutions:[
    [r`Un polinomio puede evaluarse en cualquier real. Dominio: $\mathbb R$.`],
    [r`$x^2+x+1=(x+1/2)^2+3/4>0$ para todo real, por lo que el denominador nunca se anula. Dominio: $\mathbb R$.`],
    [r`Se exige $x^2-x-30=(x-6)(x+5)\ge0$. La tabla de signos da dominio $(-\infty,-5]\cup[6,\infty)$.`],
    [r`Un polinomio está definido para todo real. Dominio: $\mathbb R$.`],
    [r`$x^2+1>0$ para todo real, por lo que no hay valores excluidos. Dominio: $\mathbb R$.`],
    [r`Se exige $(x-2)(x-3)\ge0$, por lo que el dominio es $(-\infty,2]\cup[3,\infty)$.`]
  ]},
  "e79d87e1520a": {title:"Linealidad de una aplicación"},
};

function parts(statement: string[]) {
  const header: string[]=[]; const groups: string[][]=[];
  for(const text of statement) {
    if(/^\d+\.\s*/.test(text)) groups.push([text.replace(/^\d+\.\s*/,"")].filter(Boolean));
    else if(groups.length) groups[groups.length-1].push(text);
    else header.push(text);
  }
  return {header,groups};
}
function singular(text:string) {
  return text.replace(/las siguientes ecuaciones/g,"la siguiente ecuación").replace(/las siguientes identidades/g,"la siguiente identidad").replace(/las siguientes desigualdades/g,"la siguiente desigualdad").replace(/los siguientes problemas/g,"el siguiente problema").replace(/las siguientes funciones/g,"la siguiente función").replace(/los siguientes límites/g,"el siguiente límite").replace(/Calcule las siguientes sumatorias/g,"Calcule la siguiente sumatoria").replace(/las ecuaciones de las parábolas que satisfacen/g,"la ecuación de la parábola que satisface").replace(/cada una de la siguiente función/g,"la siguiente función").replace(/Cuales de la siguiente función son lineales/g,"Determine si la siguiente función es lineal").replace(/los siguientes productos internos/g,"el siguiente producto interno").replace(/Calcule las siguientes expresiones y escriba el resultado/g,"Calcule la siguiente expresión y escriba el resultado").replace(/Determine \(si existen\) el siguiente límite/g,"Determine el siguiente límite, si existe");
}

function partHints(title:string, parent:Exercise, body:string[]):string[] {
  if(/Identidad trigonométrica/.test(title))return [r`Escribe las razones trigonométricas como cocientes de seno y coseno.`,r`Usa un denominador común y la identidad $\sin^2x+\cos^2x=1$.`,r`Comprueba las restricciones de la expresión antes de cancelar factores.`];
  if(/Ecuación trigonométrica/.test(title))return [r`Busca una identidad que permita expresar la ecuación en una sola razón trigonométrica.`,r`Factoriza y considera cada factor; no dividas por uno que pueda ser cero.`,r`Encuentra las soluciones de una vuelta y añade su periodicidad, con $k\in\mathbb Z$.`];
  if(/Inducción ·/.test(title))return [r`Verifica el primer valor admisible de $n$.`,r`Supón que la expresión para $n$ es un múltiplo de siete.`,r`Reescribe la expresión del caso $n+1$ como un múltiplo de la anterior más otro múltiplo de siete.`];
  if(/Binomio ·/.test(title))return [r`Escribe el término general $T_{k+1}=\binom nk a^{n-k}b^k$.`,r`Distingue el índice $k$ del número de término $k+1$.`,r`Impón la condición pedida y exige índices enteros con $0\le k\le n$.`];
  if(/Problema de alturas/.test(title)) {
    if(/doble|estatua|Julieta/.test(title))return [r`Llama $d>0$ a la distancia horizontal y $\theta$ al ángulo menor.`,r`Expresa las tangentes de los dos ángulos usando las alturas y la misma distancia $d$.`,r`Relaciona las dos ecuaciones con $\tan(2\theta)=2\tan\theta/(1-\tan^2\theta)$.`];
    if(/cometa/.test(title))return [r`Dibuja el triángulo rectángulo formado por el hilo, el suelo y la altura.`,r`El hilo es la hipotenusa, no la distancia horizontal.`,r`La altura se obtiene multiplicando la longitud del hilo por el seno del ángulo.`];
    if(/ladera/.test(title))return [r`Supón un tronco vertical y dibuja la sombra sobre la pendiente.`,r`Descompón la longitud de la sombra en desplazamiento horizontal y desnivel.`,r`El enunciado no indica si la sombra cae cuesta arriba o cuesta abajo: considera ambas orientaciones.`];
    return [r`Dibuja los triángulos rectángulos y distingue alturas, distancias horizontales e hipotenusas.`,r`Usa la tangente para relacionar cada altura con su distancia horizontal.`,r`Si hay dos visuales, plantea una ecuación para cada una; iguala la altura común o resta las alturas, según lo solicitado.`];
  }
  if(/Dominio de/.test(title))return [r`Identifica las operaciones que restringen los valores de entrada.`,r`Exige denominadores distintos de cero y radicandos de raíces pares no negativos, cuando corresponda.`,r`Resuelve las restricciones y expresa el conjunto de valores admisibles en intervalos.`];
  if(/Inyectividad/.test(title))return [r`Identifica el dominio antes de comparar valores.`,r`Busca dos entradas distintas con igual imagen para refutar la inyectividad.`,r`Si no encuentras un contraejemplo, demuestra monotonía estricta o usa $f(a)=f(b)\Rightarrow a=b$.`];
  if(/Lógica/.test(title))return body.join(" ").includes("\\forall") ? [r`Un universal se refuta con un solo contraejemplo.`,r`Prueba los elementos del conjunto indicado, empezando por el mayor.`,r`Para negar el enunciado, cambia «para todo» por «existe» y niega la desigualdad.`] : [r`Una implicación solo es falsa con antecedente verdadero y consecuente falso.`,r`Descompón las conjunciones y disyunciones de ambos lados.`,r`Usa los valores ya fijados para resolver el bicondicional que queda.`];
  if(/Linealidad de/.test(title))return [r`Fija el cuerpo de escalares y el dominio de la aplicación.`,r`Comprueba si preserva sumas y productos por escalares.`,r`Para refutar linealidad basta una combinación lineal cuya imagen no coincida con la combinación de imágenes.`];
  if(/Operación con números complejos/.test(title))return [r`Escribe los números y sus conjugados en forma $a+bi$.`,r`Si hay un cociente, multiplica por el conjugado del denominador; si hay módulo, usa $|a+bi|=\sqrt{a^2+b^2}$.`,r`Simplifica usando $i^2=-1$ y presenta el resultado en la forma pedida.`];
  return parent.hints;
}

export function separateExercises(exercises: Exercise[]) {
  let next=Math.max(...exercises.map(e=>Number(e.number)),14)+1;
  return exercises.flatMap(parent=>{
    const hash=parent.slug.split("-").at(-1)!;
    const plan=splitPlans[hash];
    if(!plan)return [parent];
    const {header,groups}=plan.statements ? {header:[],groups:plan.statements} : parts(parent.statement);
    if(groups.length<2)throw Error(`Grupo sin incisos independientes: ${hash}`);
    const solutions=plan.solutions ?? groups.map((_,i)=> {
      const numbered=parent.solution.filter(s=>new RegExp(`^${i+1}\\. `).test(s.body));
      if(numbered.length)return numbered.map(s=>s.body.replace(/^\d+\.\s*/,""));
      if(parent.solution.length===groups.length)return [parent.solution[i].body.replace(/^\d+\.\s*/,"")];
      throw Error(`Falta solución específica: ${hash}/${i+1}`);
    });
    if(solutions.length!==groups.length)throw Error(`Soluciones desalineadas: ${hash}`);
    return groups.map((body,i)=>({
      ...parent,
      slug:`${parent.slug}-parte-${i+1}`,
      number:String(next++),
      title:plan.titles?.[i] ?? `${plan.title} · ${parent.number}.${i+1}`,
      difficulty:plan.levels?.[i] ?? parent.difficulty,
      statement:[...header.map(singular),...body],
      solution:solutions[i].map(text=>({body:text})),
      finalAnswer:solutions[i].at(-1)!,
      hints:plan.hints?.[i] ?? partHints(plan.titles?.[i] ?? plan.title,parent,body),
      commonMistake:"",
    }));
  });
}
