export type DifferentialBlock =
  | { kind: "p"; text: string }
  | { kind: "formula"; tex: string }
  | { kind: "definition" | "theorem" | "example" | "exercise" | "solution" | "remark"; title: string; text: string; tex?: string };

export type DifferentialSection = { title: string; blocks: DifferentialBlock[]; visual?: "secant" | "epsilon-delta" | "function-map" | "function-slider" };

export const differentialCalculusCourse = {
  title: "Cálculo Diferencial",
  author: "Camila Muñoz Santander",
  eyebrow: "CURSO DE PREGRADO · APUNTES",
  introduction: "Un recorrido desde las funciones y los límites hasta la derivada, sus técnicas y sus aplicaciones.",
  note: "Curso elaborado a partir de los apuntes y ejercicios manuscritos de la autora.",
} as const;

export const differentialCalculusChapters: Array<{ number: string; slug: string; title: string; sections: DifferentialSection[] }> = [
  {
    number: "01", slug: "funciones", title: "Funciones reales",
    sections: [
      {
        title: "La idea de función",
        visual: "function-map",
        blocks: [
          { kind: "p", text: "Una función describe una regla que asigna a cada elemento del dominio un único elemento del conjunto de llegada. Escribimos $f:A\\to B$ y $x\\mapsto f(x)$." },
          { kind: "definition", title: "Dominio, recorrido y gráfica", text: "El dominio contiene los valores donde la regla está definida. El recorrido reúne las imágenes efectivamente alcanzadas. La gráfica es el conjunto de puntos $(x,f(x))$.", tex: "\\operatorname{Graf}(f)=\\{(x,y)\\in\\mathbb R^2:y=f(x)\\}" },
          { kind: "remark", title: "Prueba de la recta vertical", text: "Una curva del plano representa una función de $x$ si cada recta vertical la corta a lo más una vez." },
          { kind: "example", title: "Una función con raíz", text: "Para $f(x)=\\sqrt{2x+4}$ se necesita $2x+4\\ge 0$. Por tanto, su dominio es $[-2,\\infty)$ y su recorrido es $[0,\\infty)$." },
        ],
      },
      {
        title: "Funciones elementales y transformaciones",
        visual: "function-slider",
        blocks: [
          { kind: "p", text: "Las funciones constante, identidad, afín, cuadrática, raíz, valor absoluto, parte entera y definidas por tramos forman un repertorio básico. Trasladar y escalar sus gráficas permite reconocer familias completas." },
          { kind: "formula", tex: "g(x)=A f(x-B)+C" },
          { kind: "example", title: "Valor absoluto", text: "La gráfica de $f(x)=2|x+1|-2$ se obtiene trasladando $|x|$ una unidad a la izquierda, estirando verticalmente por $2$ y bajando dos unidades." },
          { kind: "exercise", title: "Dominio y cortes", text: "Determine el dominio y las intersecciones con los ejes de $h(x)=\\sqrt{x^2-x-30}$." },
          { kind: "solution", title: "Solución", text: "Factorizamos $x^2-x-30=(x+5)(x-6)$. El radicando es no negativo en $(-\\infty,-5]\\cup[6,\\infty)$. No hay corte con el eje $y$ porque $0$ no pertenece al dominio; los cortes con el eje $x$ son $(-5,0)$ y $(6,0)$." },
        ],
      },
      {
        title: "Operaciones, composición e inversa",
        blocks: [
          { kind: "p", text: "Podemos sumar, multiplicar y dividir funciones en los puntos donde todas las expresiones involucradas están definidas. La composición aplica primero una función y luego la otra." },
          { kind: "formula", tex: "(f\\circ g)(x)=f(g(x)),\\qquad \\operatorname{Dom}(f\\circ g)=\\{x\\in\\operatorname{Dom}(g):g(x)\\in\\operatorname{Dom}(f)\\}" },
          { kind: "definition", title: "Función inversa", text: "Una función posee inversa sobre su recorrido cuando es inyectiva. Entonces $f^{-1}(f(x))=x$ y $f(f^{-1}(y))=y$." },
          { kind: "example", title: "Función logística", text: "La función $f(x)=50/(1+3e^{0.2x})$ es inyectiva, tiene dominio $\\mathbb R$ y recorrido $(0,50)$. Al despejar se obtiene su inversa.", tex: "f^{-1}(y)=5\\ln\\left(\\frac{50-y}{3y}\\right)" },
        ],
      },
    ],
  },
  {
    number: "02", slug: "limites", title: "Límites y continuidad",
    sections: [
      {
        title: "Aproximarse a un punto",
        visual: "epsilon-delta",
        blocks: [
          { kind: "p", text: "El límite describe el valor al que se aproxima una función cuando $x$ se acerca a un punto, sin exigir que la función esté definida allí." },
          { kind: "definition", title: "Definición formal", text: "Decimos que $f(x)$ tiende a $L$ cuando $x$ tiende a $a$ si podemos hacer $f(x)$ tan cercano a $L$ como queramos tomando $x$ suficientemente cerca de $a$.", tex: "\\forall \\varepsilon>0\\;\\exists\\delta>0:\\;0<|x-a|<\\delta\\Rightarrow|f(x)-L|<\\varepsilon" },
          { kind: "definition", title: "Límites laterales", text: "El límite bilateral existe exactamente cuando los límites por la izquierda y por la derecha existen y coinciden.", tex: "\\lim_{x\\to a}f(x)=L\\iff\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)=L" },
          { kind: "example", title: "Una función por tramos", text: "Si $f(x)=1-x^2$ para $x<2$ y $f(x)=2x+1$ para $x\\ge2$, los límites laterales en $2$ son $-3$ y $5$. Como no coinciden, el límite no existe." },
        ],
      },
      {
        title: "Álgebra de límites y continuidad",
        blocks: [
          { kind: "theorem", title: "Propiedades algebraicas", text: "Cuando existen los límites de $f$ y $g$, el límite respeta sumas, productos, constantes y cocientes, siempre que el denominador límite no sea cero." },
          { kind: "theorem", title: "Cambio de variable", text: "Si $g(x)\\to b$ cuando $x\\to a$ y $f$ es continua en $b$, entonces $f(g(x))\\to f(b)$." },
          { kind: "definition", title: "Continuidad", text: "$f$ es continua en $a$ si $f(a)$ existe, $\\lim_{x\\to a}f(x)$ existe y ambos valores coinciden.", tex: "\\lim_{x\\to a}f(x)=f(a)" },
          { kind: "exercise", title: "Empalme continuo", text: "Determine $a$ y $b$ para que $f(x)=2x-a$ si $x<-3$, $f(x)=ax+2b$ si $-3\\le x\\le3$, y $f(x)=b-5x$ si $x>3$ sea continua." },
          { kind: "solution", title: "Solución", text: "Igualar las expresiones en $-3$ y $3$ produce $a-b=3$ y $3a+b=-15$. Al resolver: $a=-3$ y $b=-6$." },
        ],
      },
      {
        title: "Límites al infinito y asíntotas",
        blocks: [
          { kind: "p", text: "Los límites infinitos describen crecimiento sin cota cerca de un punto. Los límites cuando $x\\to\\pm\\infty$ describen el comportamiento lejano de la gráfica." },
          { kind: "definition", title: "Asíntotas", text: "$x=a$ es vertical si alguno de los límites laterales es infinito. $y=L$ es horizontal si $f(x)\\to L$ cuando $x\\to\\infty$ o $x\\to-\\infty$." },
          { kind: "definition", title: "Asíntota oblicua", text: "La recta $y=mx+n$ es una asíntota oblicua cuando la diferencia $f(x)-(mx+n)$ tiende a cero.", tex: "m=\\lim_{x\\to\\infty}\\frac{f(x)}x,\\qquad n=\\lim_{x\\to\\infty}(f(x)-mx)" },
        ],
      },
    ],
  },
  {
    number: "03", slug: "limites-notables", title: "Límites notables",
    sections: [
      {
        title: "El número e y formas exponenciales",
        blocks: [
          { kind: "theorem", title: "Límite fundamental exponencial", text: "Este límite define una de las apariciones naturales del número $e$.", tex: "\\lim_{u\\to0}(1+u)^{1/u}=e" },
          { kind: "formula", tex: "\\lim_{x\\to0}\\frac{a^x-1}{x}=\\ln(a),\\qquad \\lim_{x\\to0}\\frac{e^{ax}-1}{ax}=1" },
          { kind: "example", title: "Potencia variable", text: "Para estudiar $\\left(1+kx\\right)^{p/x}$ identificamos $u=kx$ y reescribimos el exponente para usar el límite fundamental.", tex: "\\lim_{x\\to0}(1+kx)^{p/x}=e^{pk}" },
        ],
      },
      {
        title: "Límites trigonométricos",
        blocks: [
          { kind: "theorem", title: "Límite del seno", text: "El teorema del sándwich aplicado al círculo unitario permite demostrar el límite central del cálculo trigonométrico.", tex: "\\lim_{x\\to0}\\frac{\\sin x}{x}=1" },
          { kind: "formula", tex: "\\lim_{x\\to0}\\frac{1-\\cos x}{x}=0,\\qquad \\lim_{x\\to0}\\frac{\\sin(mx)}{\\sin(nx)}=\\frac mn" },
          { kind: "example", title: "Cambio de escala", text: "$\\sin(5x)/x=5\\,\\sin(5x)/(5x)$, por lo tanto su límite cuando $x\\to0$ es $5$." },
          { kind: "exercise", title: "Práctica", text: "Calcule $\\lim_{x\\to0} x\\sin(1/x)$ usando el teorema del sándwich." },
          { kind: "solution", title: "Solución", text: "Como $|\\sin(1/x)|\\le1$, se tiene $|x\\sin(1/x)|\\le|x|$. Ambos extremos tienden a cero; el límite es $0$." },
        ],
      },
    ],
  },
  {
    number: "04", slug: "derivada", title: "La derivada",
    sections: [
      {
        title: "De la secante a la tangente",
        visual: "secant",
        blocks: [
          { kind: "p", text: "La pendiente de una secante mide un cambio promedio. Al acercar el segundo punto al primero obtenemos, cuando el límite existe, la pendiente instantánea de la recta tangente." },
          { kind: "definition", title: "Derivada en un punto", text: "La derivada de $f$ en $a$ es el límite del cociente incremental.", tex: "f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}h" },
          { kind: "formula", tex: "y-f(a)=f'(a)(x-a)" },
          { kind: "remark", title: "Derivabilidad y continuidad", text: "Toda función derivable en un punto es continua allí. La implicación inversa no es cierta: $|x|$ es continua en $0$, pero no tiene derivada en ese punto." },
        ],
      },
      {
        title: "Derivar desde la definición",
        blocks: [
          { kind: "example", title: "La función cuadrática", text: "Para $f(x)=x^2$, expandimos $(x+h)^2-x^2$, simplificamos el factor $h$ y tomamos el límite.", tex: "f'(x)=\\lim_{h\\to0}\\frac{2xh+h^2}{h}=2x" },
          { kind: "example", title: "La raíz cuadrada", text: "Para $f(x)=\\sqrt x$ racionalizamos el numerador del cociente incremental.", tex: "f'(x)=\\frac1{2\\sqrt x},\\qquad x>0" },
          { kind: "exercise", title: "Derivadas laterales", text: "Estudie la derivabilidad de $f(x)=|x|$ en $x=0$ mediante los cocientes laterales." },
          { kind: "solution", title: "Solución", text: "El cociente por la izquierda vale $-1$ y por la derecha vale $1$. Como los límites laterales no coinciden, $f'(0)$ no existe." },
        ],
      },
    ],
  },
  {
    number: "05", slug: "reglas", title: "Reglas de derivación",
    sections: [
      {
        title: "Reglas algebraicas",
        blocks: [
          { kind: "theorem", title: "Suma, producto y cociente", text: "Si $f$ y $g$ son derivables, entonces sus combinaciones también lo son donde estén definidas.", tex: "(f+g)'=f'+g',\\quad(fg)'=f'g+fg',\\quad\\left(\\frac fg\\right)'=\\frac{f'g-fg'}{g^2}" },
          { kind: "formula", tex: "(x^n)'=nx^{n-1},\\quad(e^x)'=e^x,\\quad(\\ln x)'=\\frac1x,\\quad(\\sin x)'=\\cos x,\\quad(\\cos x)'=-\\sin x" },
          { kind: "example", title: "Una potencia fraccionaria", text: "Reescribir $x^{1/4}$ permite usar directamente la regla de la potencia: $(x^{1/4})'=\\frac14x^{-3/4}$." },
        ],
      },
      {
        title: "Regla de la cadena",
        blocks: [
          { kind: "theorem", title: "Derivada de una composición", text: "La derivada exterior se evalúa en la función interior y se multiplica por la derivada interior.", tex: "(f\\circ g)'(x)=f'(g(x))g'(x)" },
          { kind: "example", title: "Composición trigonométrica y logarítmica", text: "Para $h(x)=\\sin(\\ln(3x+e^x))$ se aplican capas sucesivas de la cadena.", tex: "h'(x)=\\cos(\\ln(3x+e^x))\\,\\frac{3+e^x}{3x+e^x}" },
          { kind: "exercise", title: "Práctica", text: "Derive $h(x)=(2x-3)^{87}$." },
          { kind: "solution", title: "Solución", text: "$h'(x)=87(2x-3)^{86}\\cdot2=174(2x-3)^{86}$." },
        ],
      },
      {
        title: "Derivación implícita",
        blocks: [
          { kind: "p", text: "Cuando una curva viene dada por una ecuación entre $x$ e $y$, derivamos ambos lados respecto de $x$ y recordamos que $y$ depende de $x$." },
          { kind: "example", title: "Tangente a una curva implícita", text: "Para $\\sqrt{xy}+3\\ln(y^2)-12=0$, derivar implícitamente permite calcular la pendiente sin despejar $y$.", tex: "y'=-\\frac{y^2}{xy+12\\sqrt{xy}}" },
        ],
      },
    ],
  },
  {
    number: "06", slug: "inversa-parametricas", title: "Inversa y curvas paramétricas",
    sections: [
      {
        title: "Derivada de la función inversa",
        blocks: [
          { kind: "theorem", title: "Teorema de la función inversa", text: "Si $f$ es derivable e inyectiva en un intervalo y $f'$ no se anula, entonces su inversa es derivable.", tex: "(f^{-1})'(y)=\\frac1{f'(f^{-1}(y))}" },
          { kind: "example", title: "Sin despejar la inversa", text: "Si $f(1)=3$ y $f'(x)=1+\\cos^2(\\pi x/4)$, entonces $f^{-1}(3)=1$ y $(f^{-1})'(3)=1/f'(1)=2/3$." },
          { kind: "formula", tex: "(\\arcsin x)'=\\frac1{\\sqrt{1-x^2}},\\quad(\\arccos x)'=-\\frac1{\\sqrt{1-x^2}},\\quad(\\arctan x)'=\\frac1{1+x^2}" },
        ],
      },
      {
        title: "Curvas paramétricas",
        blocks: [
          { kind: "p", text: "Una curva paramétrica describe ambas coordenadas mediante un parámetro: $x=x(t)$, $y=y(t)$. Si $x'(t)\\ne0$, su pendiente se obtiene dividiendo las razones de cambio." },
          { kind: "formula", tex: "\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}=\\frac{y'(t)}{x'(t)}" },
          { kind: "example", title: "Círculo", text: "Para $x=a\\cos t$, $y=a\\sin t$, se obtiene $dy/dx=-\\cos t/\\sin t=-x/y$. En $(0,a)$ la tangente es horizontal; en $(a,0)$ es vertical." },
          { kind: "exercise", title: "Recta tangente", text: "Para $x=\\ln(t^2+1)$, $y=2\\sqrt{t^2-1}$, encuentre la recta tangente cuando $t=2$." },
          { kind: "solution", title: "Solución", text: "$dx/dt=2t/(t^2+1)$ y $dy/dt=2t/\\sqrt{t^2-1}$, por lo que $dy/dx=(t^2+1)/\\sqrt{t^2-1}$. En $t=2$, el punto es $(\\ln5,2\\sqrt3)$ y la pendiente $5/\\sqrt3$." },
        ],
      },
    ],
  },
  {
    number: "07", slug: "lhopital", title: "Regla de L’Hôpital",
    sections: [
      {
        title: "Formas indeterminadas",
        blocks: [
          { kind: "theorem", title: "Regla de L’Hôpital", text: "Cuando un cociente presenta la forma $0/0$ o $\\infty/\\infty$ y se cumplen las hipótesis de derivabilidad, podemos estudiar el cociente de las derivadas.", tex: "\\lim_{x\\to a}\\frac{f(x)}{g(x)}=\\lim_{x\\to a}\\frac{f'(x)}{g'(x)}" },
          { kind: "remark", title: "No es una regla de derivación", text: "Se derivan numerador y denominador por separado. No se utiliza la regla del cociente. Antes de aplicarla siempre hay que verificar la forma indeterminada." },
          { kind: "example", title: "Forma 0/0", text: "Para $\\lim_{x\\to0}(\\sqrt{x+1}-1)/x$, la sustitución da $0/0$. L’Hôpital entrega $1/(2\\sqrt{x+1})$, cuyo límite es $1/2$." },
          { kind: "example", title: "Forma infinito/infinito", text: "En $\\lim_{x\\to\\infty}2x^2/e^{3x}$, aplicar L’Hôpital dos veces da $4/(9e^{3x})$, que tiende a $0$." },
        ],
      },
      {
        title: "Otras formas indeterminadas",
        blocks: [
          { kind: "p", text: "Las formas $0\\cdot\\infty$, $\\infty-\\infty$, $0^0$, $1^\\infty$ e $\\infty^0$ deben transformarse antes de aplicar la regla. En potencias conviene tomar logaritmos." },
          { kind: "formula", tex: "f(x)^{g(x)}=e^{g(x)\\ln f(x)}" },
          { kind: "example", title: "Potencia 1 elevado a infinito", text: "Para $((x+2)/(x-1))^x$ cuando $x\\to\\infty$, tomamos logaritmos. El exponente equivalente es $x\\ln(1+3/(x-1))$, cuyo límite es $3$; por tanto, el límite original es $e^3$." },
        ],
      },
    ],
  },
  {
    number: "08", slug: "aplicaciones", title: "Aplicaciones de la derivada",
    sections: [
      {
        title: "Aproximación diferencial",
        blocks: [
          { kind: "p", text: "Cerca de $x_0$, la recta tangente aproxima a la función. Esta linealización permite estimar valores difíciles con una cuenta breve." },
          { kind: "formula", tex: "f(x_0+\\Delta x)\\approx f(x_0)+f'(x_0)\\Delta x" },
          { kind: "example", title: "Aproximar una raíz", text: "Para $\\sqrt{3.97}$ tomamos $f(x)=\\sqrt x$, $x_0=4$ y $\\Delta x=-0.03$. Entonces $\\sqrt{3.97}\\approx2+(1/4)(-0.03)=1.9925$." },
        ],
      },
      {
        title: "Crecimiento y extremos",
        blocks: [
          { kind: "theorem", title: "Criterio de la primera derivada", text: "$f$ es creciente donde $f'>0$ y decreciente donde $f'<0$. Los puntos donde $f'=0$ o donde la derivada no existe son candidatos a extremos." },
          { kind: "example", title: "Tabla de signos", text: "Para $f(x)=x^3-2x-2$, $f'(x)=3x^2-2$. Los puntos críticos son $x=\\pm\\sqrt{2/3}$. El signo cambia de $+$ a $-$ en el primero y de $-$ a $+$ en el segundo." },
          { kind: "remark", title: "Extremos locales y globales", text: "Un extremo local compara valores cercanos; uno global compara todos los valores del dominio. En un intervalo cerrado también se deben revisar los extremos del intervalo." },
        ],
      },
      {
        title: "Razones de cambio y optimización",
        blocks: [
          { kind: "p", text: "Si varias cantidades dependen del tiempo, derivar una relación que las conecta permite traducir una razón de cambio conocida en otra desconocida." },
          { kind: "example", title: "Círculo que crece", text: "Como $A=\\pi r^2$, al derivar respecto del tiempo obtenemos $dA/dt=2\\pi r\\,dr/dt$. Si $r=2$ cm y $dr/dt=0.01$ cm/s, entonces $dA/dt=0.04\\pi$ cm²/s." },
          { kind: "example", title: "Distancia, velocidad y aceleración", text: "Si $d(t)=32/(12+t^2)$, entonces $v=d'$ y $a=d''$. Los instantes de aceleración nula se obtienen resolviendo $a(t)=0$ y conservando los tiempos físicamente admisibles." },
          { kind: "exercise", title: "Razón de cambio", text: "Una luminaria está a $4$ m de altura. Una persona de $1.5$ m se aleja a $55$ m/min. ¿A qué rapidez se alarga su sombra?" },
          { kind: "solution", title: "Solución", text: "Por semejanza de triángulos, $4/(x+y)=1.5/y$, de donde $y=(3/5)x$. Al derivar: $dy/dt=(3/5)dx/dt=33$ m/min." },
        ],
      },
    ],
  },
];
