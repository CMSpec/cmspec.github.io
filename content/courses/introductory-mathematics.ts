export type IntroBlock = { kind: "definition" | "example" | "remark"; title: string; text: string; tex?: string };
export type IntroSection = { title: string; blocks: IntroBlock[]; exercise: string; hint: string; solution: string; visual?: "functions" | "circle" | "logic" };
export type IntroChapter = { title: string; slug: string; sections: IntroSection[] };
const block = (kind: IntroBlock["kind"], title: string, text: string, tex?: string): IntroBlock => ({ kind, title, text, tex });
const d = (title: string, text: string, tex?: string) => block("definition", title, text, tex);
const e = (title: string, text: string, tex?: string) => block("example", title, text, tex);
const r = (title: string, text: string, tex?: string) => block("remark", title, text, tex);
const tex = String.raw;

export const introductoryChapters: IntroChapter[] = [
  { title: "Lógica y lenguaje matemático", slug: "logica", sections: [
    { title: "Proposiciones y conectivos", visual: "logic", blocks: [
      d("Una afirmación con valor de verdad", "Una proposición es una afirmación que puede ser verdadera o falsa. Una pregunta no es una proposición. La frase «x es par» necesita un valor de x o un cuantificador para tener un valor de verdad."),
      d("Combinar afirmaciones", tex`La negación $\neg p$ cambia el valor de verdad; $p\land q$ exige que ambas sean verdaderas; $p\lor q$ exige al menos una. La disyunción matemática es inclusiva: admite que ambas sean verdaderas.`),
      d("Implicación y equivalencia", tex`$p\Rightarrow q$ solo es falsa cuando $p$ es verdadera y $q$ es falsa. $p\Leftrightarrow q$ es verdadera cuando las dos tienen el mismo valor de verdad. En una implicación, $p$ es suficiente para $q$ y $q$ es necesaria para $p$.`),
      e("Leer una implicación", "Si un entero es múltiplo de cuatro, entonces es par. La afirmación recíproca no siempre es verdadera: 6 es par y no es múltiplo de cuatro."),
    ], exercise: tex`Si $p$ es verdadera y $q$ es falsa, calcula los valores de $p\land q$, $p\lor q$ y $p\Rightarrow q$.`, hint: "Aplica la condición de verdad de cada conectivo por separado.", solution: "Son falsa, verdadera y falsa, respectivamente." },
    { title: "Tablas de verdad y equivalencias", blocks: [
      d("Examinar todos los casos", tex`Con $n$ proposiciones simples hay $2^n$ combinaciones de valores de verdad. Una tautología resulta verdadera en todas las filas; una contradicción, falsa en todas. Una contingencia es verdadera en unas y falsa en otras.`),
      d("Leyes de De Morgan", "Negar «ambas» significa que al menos una falla; negar «al menos una» significa que ambas fallan.", tex`\neg(p\land q)\equiv\neg p\lor\neg q,\qquad \neg(p\lor q)\equiv\neg p\land\neg q`),
      e("Contrarrecíproca", "Una implicación equivale a su contrarrecíproca, pero no necesariamente a su recíproca.", tex`(p\Rightarrow q)\equiv(\neg p\lor q)\equiv(\neg q\Rightarrow\neg p)`),
      r("Simplificar", tex`Las leyes de absorción dan $p\lor(p\land q)\equiv p$ y $p\land(p\lor q)\equiv p$. Por ejemplo, $[(p\land q)\lor p]\Rightarrow r$ equivale a $p\Rightarrow r$.`),
    ], exercise: tex`Simplifica $\neg(p\lor q)\lor(\neg p\land q)$.`, hint: "Aplica De Morgan y luego saca el factor lógico común.", solution: tex`Se obtiene $(\neg p\land\neg q)\lor(\neg p\land q)\equiv\neg p\land(\neg q\lor q)\equiv\neg p$.` },
    { title: "Predicados y cuantificadores", blocks: [
      d("Precisar el universo", tex`Un predicado $P(x)$ se evalúa en un dominio. $\forall x\in A$ significa «para todo elemento de A»; $\exists x\in A$ significa «existe al menos uno» y $\exists!$ significa «existe exactamente uno».`),
      e("El dominio importa", tex`$\exists x\in\mathbb R:x^2=2$ es verdadera; con dominio $\mathbb Z$ es falsa. Un solo contraejemplo basta para refutar una afirmación universal.`),
      d("Negar cuantificadores", "Al negar, intercambia universal y existencial y niega el predicado.", tex`\neg(\forall x\in A\ P(x))\equiv\exists x\in A\ \neg P(x)`),
      r("El orden importa", tex`$\forall x\in\mathbb R\ \exists y\in\mathbb R:y>x$ es verdadera: sirve $y=x+1$. En cambio, $\exists y\in\mathbb R\ \forall x\in\mathbb R:y>x$ es falsa: no existe un real mayor que todos los demás.`),
    ], exercise: tex`Niega $\forall x\in A\ \exists y\in A:y>x$.`, hint: "Intercambia cada cuantificador sin cambiar su orden y niega la desigualdad.", solution: tex`$\exists x\in A\ \forall y\in A:y\le x$. Existe un elemento de A que es mayor o igual que todos los demás.` },
  ] },
  { title: "Ecuaciones y modelos algebraicos", slug: "ecuaciones", sections: [
    { title: "Igualdades, incógnitas y restricciones", blocks: [
      d("Resolver una ecuación", "Consiste en encontrar todos los valores del dominio que hacen verdadera una igualdad. Puede no haber soluciones, haber una o varias, o cumplirse para todo el dominio."),
      d("Ecuaciones lineales", tex`Para $ax+b=0$, si $a\ne0$ la solución es $x=-b/a$. Si $a=0$, hay que distinguir $b=0$ (todos los valores) de $b\ne0$ (ninguno).`),
      e("Despejar y verificar", tex`$x/2-8=1$ equivale a $x/2=9$ y luego a $x=18$. Al reemplazar, $18/2-8=1$.`),
      r("Fracciones algebraicas", "Anota primero los valores que anulan denominadores. Multiplicar por un denominador solo conserva la equivalencia dentro del dominio permitido."),
    ], exercise: tex`Resuelve $\dfrac{2(2-x)}{x-1}+\dfrac{3-x}{x+1}+3=\dfrac4{x^2-1}$.`, hint: tex`Excluye $x=1$ y $x=-1$, y multiplica por $(x-1)(x+1)$.`, solution: tex`Se obtiene $2(2-x)(x+1)+(3-x)(x-1)+3(x^2-1)=4$, que se reduce a $6x-2=4$. El único candidato es $x=1$, pero está excluido. El conjunto solución es vacío.` },
    { title: "Valor absoluto y ecuaciones cuadráticas", blocks: [
      d("Distancia al cero", tex`$|x|$ es $x$ si $x\ge0$ y $-x$ si $x<0$. Siempre es no negativo y $\sqrt{x^2}=|x|$. Para $c\ge0$, $|u|=c$ equivale a $u=c$ o $u=-c$.`),
      e("Dos puntos a la misma distancia", tex`$|x-3|=4$ significa que x está a distancia cuatro de 3. Sus soluciones son $x=7$ y $x=-1$. Al elevar al cuadrado: $x^2-6x-7=(x-7)(x+1)=0$.`),
      d("Fórmula general", tex`Si $a\ne0$, el discriminante $\Delta=b^2-4ac$ determina cuántas raíces reales hay: dos si es positivo, una doble si es cero, ninguna si es negativo.`, tex`x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}`),
      e("Factorización", tex`$x^2+5x=24$ equivale a $(x+8)(x-3)=0$. Por tanto, $x=-8$ o $x=3$.`),
    ], exercise: tex`Resuelve $|3x-2|=|2x+7|$.`, hint: "Dos valores absolutos iguales permiten igualar sus interiores o igualar uno al opuesto del otro.", solution: tex`De $3x-2=2x+7$ resulta $x=9$; de $3x-2=-(2x+7)$ resulta $x=-1$. Ambos verifican la ecuación.` },
    { title: "Exponentes y logaritmos", blocks: [
      d("Operaciones inversas", tex`Para $a>0$, $a\ne1$ y $x>0$, $\log_a(x)=y$ significa $a^y=x$. El logaritmo natural usa base $e$.`, tex`\log_a(xy)=\log_a x+\log_a y,\quad \log_a(x/y)=\log_a x-\log_a y`),
      r("Condiciones", tex`Las reglas anteriores exigen argumentos positivos. Además, $\log_a(x^s)=s\log_a x$ para $x>0$. No existe una regla que transforme el logaritmo de una suma en la suma de logaritmos.`),
      e("Bases distintas", tex`Para resolver $2^x=7$, aplica logaritmo: $x\ln2=\ln7$, luego $x=\ln7/\ln2$.`),
    ], exercise: tex`Resuelve $\log(x+2)+\log(x-1)=1$, con logaritmos en base 10.`, hint: tex`Primero impón $x>1$. Después convierte la suma de logaritmos en el logaritmo de un producto.`, solution: tex`$(x+2)(x-1)=10$, por lo que $x^2+x-12=(x+4)(x-3)=0$. Solo $x=3$ cumple $x>1$; se descarta $x=-4$.` },
    { title: "Sistemas y traducción de problemas", blocks: [
      d("Resolver simultáneamente", "Una solución de un sistema satisface todas sus ecuaciones. Sustitución, igualación y reducción permiten combinar la información. Dos rectas pueden cortarse en un punto, ser paralelas distintas o coincidir."),
      e("Sustitución", tex`En $2x-y=5$, $x+4y=7$, despeja $y=2x-5$. Sustituye: $x+4(2x-5)=7$, luego $x=3$ y $y=1$.`),
      r("Construir un modelo", "Define la incógnita y sus unidades; traduce cada cantidad; escribe la relación; resuelve; comprueba que la respuesta tenga sentido en el contexto."),
    ], exercise: "En el curso A hay el doble de estudiantes que en C. Si pasan 8 de A a C, ambos cursos quedan con la misma cantidad. ¿Cuántos había en cada curso?", hint: "Llama x a la cantidad inicial en C. En A había 2x.", solution: tex`$2x-8=x+8$, por lo que $x=16$. Inicialmente había 32 estudiantes en A y 16 en C. Después del cambio quedan 24 en cada uno.` },
  ] },
  { title: "Inecuaciones e intervalos", slug: "inecuaciones", sections: [
    { title: "Orden y conjuntos solución", blocks: [
      d("Intervalos", tex`$(a,b)$ contiene los reales con $a<x<b$; $[a,b]$ incluye los extremos. Un paréntesis excluye y un corchete incluye. Los infinitos nunca se incluyen. La unión $\cup$ reúne alternativas; la intersección $\cap$ exige ambas condiciones.`),
      d("Operar desigualdades", "Sumar la misma cantidad conserva el orden. Multiplicar o dividir por un número positivo conserva el signo; por uno negativo lo invierte."),
      e("Desigualdad doble", tex`$4\le3x-2<13$ equivale a $6\le3x<15$ y a $2\le x<5$. El conjunto solución es $[2,5)$.`),
    ], exercise: tex`Resuelve $-3x>-2$ y expresa la solución como intervalo.`, hint: "Al dividir por −3 debes invertir el signo.", solution: tex`$x<2/3$, es decir, $(-\infty,2/3)$.` },
    { title: "Valor absoluto como distancia", blocks: [
      d("Estar cerca o lejos", tex`Para $c>0$, $|x-a|<c$ significa que x está a menos de c unidades de a. En cambio, $|x-a|>c$ describe los puntos exteriores.`, tex`|x-a|<c\iff a-c<x<a+c`),
      e("Intervalo central", tex`$|x-6|<2$ equivale a $4<x<8$. Los extremos no están incluidos porque la desigualdad es estricta.`),
      r("Un segundo miembro variable", "Si el segundo miembro también depende de x, revisa su signo antes de aplicar propiedades. No eleves al cuadrado una desigualdad sin comprobar las condiciones que conservan su equivalencia."),
    ], exercise: tex`Resuelve $8-|2x-1|\ge6$.`, hint: tex`Reordena para obtener $|2x-1|\le2$.`, solution: tex`$-2\le2x-1\le2$, luego $-1\le2x\le3$. La solución es $[-1/2,3/2]$.` },
    { title: "Tablas de signos y factores repetidos", blocks: [
      d("Estudiar el signo", "Lleva todos los términos a un lado, factoriza y ordena los ceros. En cada intervalo determina el signo del producto. Incluye los ceros solamente si la desigualdad permite igualdad."),
      e("Una cuadrática", tex`$x^2\le5x-6$ equivale a $(x-2)(x-3)\le0$. El producto es negativo entre las raíces y cero en ellas: $[2,3]$.`),
      r("Multiplicidad par", tex`Un factor como $(x-1)^2$ es positivo a ambos lados de 1 y se anula en 1. El signo no cambia al cruzarlo, pero debes revisar si ese cero se incluye.`),
    ], exercise: tex`Resuelve $x(x-1)^2(x-3)<0$.`, hint: "El factor al cuadrado no cambia de signo, pero la desigualdad estricta excluye x = 1.", solution: tex`El signo es negativo entre 0 y 3, salvo que el producto vale cero en 1. La solución es $(0,1)\cup(1,3)$.` },
    { title: "Inecuaciones racionales", blocks: [
      d("Ceros y valores prohibidos", "En un cociente, separa los ceros del numerador y del denominador. Ambos delimitan intervalos de signo, pero los ceros del denominador siempre quedan excluidos."),
      e("Una diferencia racional", tex`$\frac{x}{x+2}\le x$ equivale, para $x\ne-2$, a $\frac{x(x+1)}{x+2}\ge0$. Los puntos críticos son −2, −1 y 0. El signo da $(-2,-1]\cup[0,\infty)$.`),
      r("No multiplicar a ciegas", "Multiplicar por un denominador de signo desconocido puede cambiar el sentido de la desigualdad. El estudio de signos evita perder casos."),
    ], exercise: tex`Resuelve $\dfrac{x-2}{x+1}\ge0$.`, hint: "Estudia los intervalos separados por −1 y 2. Decide por separado qué ocurre en cada extremo.", solution: tex`El cociente es positivo en $(-\infty,-1)$ y $(2,\infty)$; vale cero en 2 y no existe en −1. Solución: $(-\infty,-1)\cup[2,\infty)$.` },
  ] },
  { title: "Funciones y sus gráficas", slug: "funciones", sections: [
    { title: "Regla, dominio y recorrido", visual: "functions", blocks: [
      d("Una salida por entrada", tex`Una función $f:A\to B$ asigna a cada $x\in A$ exactamente un valor $f(x)\in B$. A es el dominio; B, el conjunto de llegada. El recorrido contiene solamente las salidas que se alcanzan.`),
      r("Leer una gráfica", "Una relación es función de x si ninguna recta vertical corta su gráfica en más de un punto. Una circunferencia completa no cumple esta condición."),
      e("Restricciones de dominio", tex`Para $1/(x^2-x)$ se excluyen 0 y 1. Para $\sqrt{9-x^2}$ se exige $9-x^2\ge0$, así que el dominio es $[-3,3]$. Para $\log(x-2)$ se exige $x>2$.`),
    ], exercise: tex`Determina dominio y recorrido de $f(x)=\sqrt{x-2}$.`, hint: "El radicando debe ser no negativo y la raíz cuadrada nunca da una salida negativa.", solution: tex`Dominio $[2,\infty)$ y recorrido $[0,\infty)$. Todo $y\ge0$ se obtiene tomando $x=y^2+2$.` },
    { title: "Familias y transformaciones", blocks: [
      d("Rectas y parábolas", tex`Una función afín tiene forma $mx+b$; m es su pendiente y b su corte con el eje vertical. Una cuadrática $ax^2+bx+c$, con $a\ne0$, tiene vértice en $x=-b/(2a)$.`),
      d("Trasladar y reflejar", tex`$f(x-h)+k$ traslada la gráfica h horizontalmente y k verticalmente. $-f(x)$ la refleja respecto del eje horizontal; $f(-x)$, respecto del eje vertical.`),
      e("Completar el cuadrado", tex`$-2x^2-4x+1=-2(x+1)^2+3$. El vértice es $(-1,3)$, el máximo es 3 y el recorrido es $(-\infty,3]$. Crece hasta −1 y decrece después.`),
      r("Más funciones elementales", tex`$|x|$ tiene forma de V; $\sqrt{x}$ empieza en 0; $x^3$ es creciente en todos los reales. En una función por tramos, la condición de cada tramo decide qué regla usar, incluidos sus extremos.`),
    ], exercise: tex`Describe la gráfica y el recorrido de $g(x)=4-|x-1|$.`, hint: "Parte de la V de valor absoluto; localiza primero el vértice y luego la orientación.", solution: tex`Es una V invertida, trasladada una unidad a la derecha y cuatro arriba. Su vértice es $(1,4)$; dominio $\mathbb R$, recorrido $(-\infty,4]$. Corta el eje horizontal en −3 y 5.` },
    { title: "Operaciones, composición e inversa", blocks: [
      d("Operaciones de funciones", tex`Para sumar o multiplicar f y g, usa la intersección de dominios. Para dividir, excluye además los ceros de g. La composición $(f\circ g)(x)=f(g(x))$ aplica g primero.`),
      e("La composición tiene su dominio", tex`Si $f(x)=\sqrt{x}$ y $g(x)=\sqrt{2-x}$, entonces $(g\circ f)(x)=\sqrt{2-\sqrt{x}}$. Se necesitan $x\ge0$ y $\sqrt{x}\le2$, así que el dominio es $[0,4]$.`),
      d("Invertir una función", tex`Una función inyectiva no repite imágenes. Tiene inversa desde su recorrido hacia su dominio. Para una inversa definida en todo el conjunto de llegada, debe ser además sobreyectiva. La gráfica de la inversa se refleja respecto de $y=x$.`),
    ], exercise: tex`Encuentra la inversa de $f(x)=(x-3)/2$ y comprueba una composición.`, hint: "Escribe y = (x − 3)/2 y despeja x.", solution: tex`$x=2y+3$, por tanto $f^{-1}(x)=2x+3$. Ambas tienen dominio y recorrido $\mathbb R$. Además, $f(f^{-1}(x))=((2x+3)-3)/2=x$.` },
    { title: "Exponenciales y logarítmicas", blocks: [
      d("Crecimiento y decrecimiento", tex`$a^x$, para $a>0$ y $a\ne1$, tiene dominio $\mathbb R$ y recorrido $(0,\infty)$. Crece si $a>1$ y decrece si $0<a<1$. Su inversa es $\log_a x$, con dominio $(0,\infty)$ y recorrido $\mathbb R$.`),
      e("Un modelo exponencial", tex`Si $N(t)=N_0e^{kt}$, entonces $N(0)=N_0$. Un k positivo describe crecimiento y uno negativo decrecimiento. La razón $N(t+1)/N(t)=e^k$ es constante.`),
    ], exercise: tex`Encuentra el dominio, el corte horizontal y la inversa de $f(x)=\log_2(x)-1$.`, hint: "Para el corte horizontal impón f(x) = 0; para la inversa, despeja x usando la definición de logaritmo.", solution: tex`Dominio $(0,\infty)$; corte en $(2,0)$. De $y+1=\log_2 x$ resulta $x=2^{y+1}$. Entonces $f^{-1}(x)=2^{x+1}$, con dominio $\mathbb R$ y recorrido $(0,\infty)$.` },
  ] },
  { title: "Trigonometría", slug: "trigonometria", sections: [
    { title: "Ángulos, radianes y triángulos", blocks: [
      d("Medir una rotación", tex`Una vuelta completa equivale a $360^\circ=2\pi$ radianes. Si un arco tiene longitud s y el radio es r, su ángulo en radianes es $s/r$. El sentido antihorario es positivo.`),
      d("Razones de un ángulo agudo", "En un triángulo rectángulo, seno es cateto opuesto dividido por hipotenusa; coseno es adyacente dividido por hipotenusa; tangente es opuesto dividido por adyacente."),
      e("Triángulo 6–8–10", tex`Si el cateto opuesto mide 6 y el adyacente 8, la hipotenusa mide 10. Entonces $\sin\alpha=3/5$, $\cos\alpha=4/5$ y $\tan\alpha=3/4$.`),
      r("Elevación y depresión", "Ambos ángulos se miden desde la horizontal: hacia arriba para elevación y hacia abajo para depresión."),
    ], exercise: tex`Convierte $270^\circ$ y $-75^\circ$ a radianes.`, hint: tex`Multiplica por $\pi/180$.`, solution: tex`$270^\circ=3\pi/2$ y $-75^\circ=-5\pi/12$.` },
    { title: "Circunferencia unitaria y periodicidad", visual: "circle", blocks: [
      d("Coordenadas de un ángulo", tex`En la circunferencia $x^2+y^2=1$, el punto que corresponde a t es $(\cos t,\sin t)$. Esto extiende las razones a cualquier ángulo. Seno y coseno están entre −1 y 1 y tienen período $2\pi$.`),
      d("Cocientes y recíprocos", tex`$\tan t=\sin t/\cos t$, $\cot t=\cos t/\sin t$, $\sec t=1/\cos t$ y $\csc t=1/\sin t$, siempre que el denominador no sea cero. Tangente y cotangente tienen período $\pi$.`),
      e("Cuadrantes", tex`$2\pi/3$ está en el segundo cuadrante, con ángulo de referencia $\pi/3$. Por eso $\cos(2\pi/3)=-1/2$ y $\sin(2\pi/3)=\sqrt3/2$.`),
      r("Simetría", tex`Coseno es par: $\cos(-t)=\cos t$. Seno es impar: $\sin(-t)=-\sin t$. En particular, $\sin(-\pi/6)=-1/2$.`),
    ], exercise: tex`Calcula $\cos(480^\circ)$ sin calculadora.`, hint: "Quita una vuelta completa y observa el cuadrante.", solution: tex`$480^\circ=360^\circ+120^\circ$, por lo que el coseno vale $-1/2$.` },
    { title: "Gráficas e identidades", blocks: [
      d("Una oscilación transformada", tex`En $A\sin(k(x-b))+c$, con $A\ne0$ y $k>0$, la amplitud es $|A|$, el período $2\pi/k$, el desplazamiento horizontal b y el eje medio $y=c$. Lo mismo vale para coseno.`),
      d("Identidades fundamentales", tex`$\sin^2t+\cos^2t=1$. Al dividir por $\cos^2t$ se obtiene $1+\tan^2t=\sec^2t$ donde el coseno no es cero.`),
      d("Suma y ángulo doble", "Las fórmulas de suma permiten deducir las de ángulo doble.", tex`\sin(a+b)=\sin a\cos b+\cos a\sin b,\qquad \sin(2a)=2\sin a\cos a`),
      r("Coseno y productos", tex`$\cos(a+b)=\cos a\cos b-\sin a\sin b$, de donde $\cos(2a)=1-2\sin^2a$. También $2\sin a\cos b=\sin(a+b)+\sin(a-b)$; esta identidad transforma un producto en una suma.`),
    ], exercise: tex`Determina amplitud, período y desplazamientos de $3\sin(2(x-\pi/4))+1$.`, hint: "Identifica A, k, b y c antes de calcular.", solution: tex`Amplitud 3, período $\pi$, desplazamiento horizontal $\pi/4$ a la derecha y vertical 1 hacia arriba. Su recorrido es $[-2,4]$.` },
    { title: "Inversas y ecuaciones trigonométricas", blocks: [
      d("Elegir un valor principal", tex`$\arcsin$ tiene dominio $[-1,1]$ y recorrido $[-\pi/2,\pi/2]$. $\arccos$ tiene dominio $[-1,1]$ y recorrido $[0,\pi]$. Una función periódica necesita restringir su dominio para tener inversa.`),
      e("No cancelar fuera del intervalo", tex`$\arcsin(\sin(2\pi/3))=\pi/3$, porque el resultado debe estar en el intervalo principal del arcoseno.`),
      e("Todas las soluciones", tex`$\sin\theta=1/2$ tiene dos soluciones por vuelta: $\pi/6$ y $5\pi/6$. Todas se escriben $\theta=\pi/6+2k\pi$ o $\theta=5\pi/6+2k\pi$, con $k\in\mathbb Z$.`),
    ], exercise: tex`Resuelve $2\cos\theta-1=0$.`, hint: "Busca los dos ángulos con coseno 1/2 en una vuelta y añade vueltas completas.", solution: tex`$\theta=\pi/3+2k\pi$ o $\theta=-\pi/3+2k\pi$, con $k\in\mathbb Z$. En $[0,2\pi)$ son $\pi/3$ y $5\pi/3$.` },
    { title: "Triángulos no rectángulos", blocks: [
      d("Ley de senos", "Cada lado se relaciona con el seno del ángulo opuesto.", tex`\frac{a}{\sin\alpha}=\frac{b}{\sin\beta}=\frac{c}{\sin\gamma}`),
      d("Ley de cosenos", "Relaciona dos lados y el ángulo comprendido con el tercer lado.", tex`a^2=b^2+c^2-2bc\cos\alpha`),
      r("Elegir una herramienta", "Si conoces un par lado–ángulo opuesto, considera la ley de senos. Si conoces dos lados y su ángulo comprendido, usa la ley de cosenos. Revisa si los datos permiten más de un triángulo."),
    ], exercise: tex`Dos lados miden 3 y 4 y forman un ángulo de $60^\circ$. ¿Cuánto mide el tercero?`, hint: "Aplica la ley de cosenos con el ángulo comprendido.", solution: tex`$a^2=3^2+4^2-2\cdot3\cdot4\cos60^\circ=13$. El tercer lado mide $\sqrt{13}$.` },
  ] },
  { title: "Vectores en el plano y el espacio", slug: "vectores", sections: [
    { title: "Puntos, desplazamientos y magnitud", blocks: [
      d("Del punto inicial al final", tex`Un vector describe un desplazamiento. Si parte en $P=(x_1,y_1)$ y termina en $Q=(x_2,y_2)$, sus componentes son $Q-P=(x_2-x_1,y_2-y_1)$. Trasladarlo sin cambiar dirección, sentido ni longitud representa el mismo vector.`),
      d("Norma", "La longitud se calcula mediante Pitágoras.", tex`\|(a,b)\|=\sqrt{a^2+b^2},\qquad \|(a,b,c)\|=\sqrt{a^2+b^2+c^2}`),
      e("Un desplazamiento", tex`Desde $(-1,6)$ hasta $(4,8)$, el vector es $(5,2)$ y su magnitud es $\sqrt{29}$.`),
    ], exercise: tex`Un vector $(3,7)$ parte en $(3,5)$. Encuentra su punto terminal.`, hint: "Punto final = punto inicial + vector.", solution: tex`$(3,5)+(3,7)=(6,12)$.` },
    { title: "Operaciones y vectores unitarios", blocks: [
      d("Operar por componentes", "Suma y resta componente a componente. Multiplicar por un escalar modifica la longitud y, si el escalar es negativo, invierte el sentido. Geométricamente, suma colocando el inicio del segundo vector en el extremo del primero."),
      d("Normalizar", tex`Si $v\ne0$, el vector $v/\|v\|$ tiene longitud uno y conserva dirección y sentido. El vector cero no se puede normalizar.`),
      e("Combinación lineal", tex`Para $u=(2,-3)$ y $v=(-1,2)$, $2u+3v=(4,-6)+(-3,6)=(1,0)$.`),
      r("Base estándar", tex`En el plano, $i=(1,0)$ y $j=(0,1)$. En el espacio se agrega $k=(0,0,1)$ y cada vector se escribe $ai+bj+ck$.`),
    ], exercise: tex`Normaliza $v=(3,4)$ y calcula $-2v$.`, hint: "Calcula primero la norma.", solution: tex`$\|v\|=5$, por lo que el unitario es $(3/5,4/5)$. Además, $-2v=(-6,-8)$ tiene longitud 10 y sentido contrario.` },
    { title: "Producto punto y perpendicularidad", blocks: [
      d("Un número a partir de dos vectores", tex`El producto punto suma los productos de componentes correspondientes. Para vectores no nulos también expresa el ángulo $\theta\in[0,\pi]$ entre ellos.`, tex`u\cdot v=\sum_i u_i v_i=\|u\|\|v\|\cos\theta`),
      d("Ortogonalidad", tex`Dos vectores no nulos son perpendiculares exactamente cuando $u\cdot v=0$.`),
      e("Comprobar", tex`$(2,1)\cdot(-1,2)=-2+2=0$, así que son perpendiculares.`),
    ], exercise: tex`Comprueba que $(2,2,-1)$ y $(5,-4,2)$ son perpendiculares.`, hint: "Multiplica las componentes correspondientes y suma los tres resultados.", solution: tex`$2\cdot5+2\cdot(-4)+(-1)\cdot2=10-8-2=0$. Ambos vectores son no nulos y forman un ángulo recto.` },
    { title: "Dirección y coordenadas espaciales", blocks: [
      d("Longitud y ángulo en el plano", tex`Un vector de longitud r y ángulo $\theta$ respecto del eje x positivo tiene componentes $(r\cos\theta,r\sin\theta)$. El cuadrante determina los signos.`),
      e("Reconstruir", tex`Para longitud 8 y ángulo $\pi/3$, las componentes son $(4,4\sqrt3)$.`),
      d("Cosenos directores", tex`Si $v=(a,b,c)\ne0$, los cosenos de sus ángulos con los ejes son $a/\|v\|$, $b/\|v\|$ y $c/\|v\|$. La suma de sus cuadrados es uno.`),
    ], exercise: tex`Calcula el vector desde $P=(1,-4,5)$ hasta $Q=(3,1,-1)$ y su magnitud.`, hint: "Resta Q − P y aplica la fórmula de la norma en tres dimensiones.", solution: tex`$Q-P=(2,5,-6)$ y $\|Q-P\|=\sqrt{4+25+36}=\sqrt{65}$.` },
  ] },
];
