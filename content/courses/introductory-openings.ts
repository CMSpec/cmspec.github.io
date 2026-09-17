// Aperturas recuperadas mediante lectura visual. Referencias solo para edición.
// Sustituyen los resúmenes indicados; no son un apéndice ni enlaces al material.
type Opening = { source: string; pages: [number, number]; replaces: string[]; paragraphs: string[] };
const t = String.raw;
export const introductoryOpenings: Record<string, Opening> = {
  "logica-1": { source: "Logica.pdf", pages: [2, 3], replaces: ["Una afirmación con valor de verdad"], paragraphs: [
    "Comenzamos con frases de las que podemos afirmar si son verdaderas o falsas. A estas frases las llamamos proposiciones y las designamos con letras minúsculas.",
    "Por ejemplo, p: «El hielo flota en el agua»; q: «China está en Europa»; r: «Tres es un número impar». En estos ejemplos, p y r son verdaderas, mientras que q es falsa. Lo que permite llamarlas proposiciones no es que sean verdaderas, sino que tengan un valor de verdad.",
    "En cambio, «¿Es dos un número par?» es una pregunta y «Dos más tres» es una expresión que no afirma nada. Ninguna de las dos es una proposición. Una vez que reconocemos las proposiciones, podemos construir otras combinándolas mediante conectivos.",
  ] },
  "ecuaciones-1": { source: "Ecuaciones_1.pdf", pages: [2, 3], replaces: ["Resolver una ecuación"], paragraphs: [
    "Una ecuación es una igualdad entre dos expresiones algebraicas. Al sustituir la incógnita por un número, la igualdad puede resultar verdadera o falsa. Antes de despejar, distingamos las situaciones que pueden aparecer.",
    t`En $x-3=x+3$, ningún número hace verdadera la igualdad: al restar $x$ quedaría $-3=3$. En cambio, $(x+3)^2=x^2+6x+9$ se cumple para todo número real; basta desarrollar el cuadrado para comprobarlo.`,
    t`También puede ocurrir que la igualdad se cumpla para uno o más valores, pero no para todos. En $x+3=5$ se cumple exactamente para $x=2$. Resolver una ecuación consiste en encontrar todos los valores admisibles que la hacen verdadera.`,
  ] },
  "inecuaciones-1": { source: "Inecuaciones_1.pdf", pages: [2, 3], replaces: [], paragraphs: [
    t`Ahora consideramos una desigualdad entre dos expresiones algebraicas, en la que una o ambas contienen una incógnita. Por ejemplo, $\sqrt{x+1}>2$ y $|x-3|<\sqrt{x+1}$ son inecuaciones.`,
    t`Un número real es solución si, al reemplazar la incógnita por él, las expresiones están definidas y la desigualdad es verdadera. Para la primera inecuación, $x=8$ es una solución porque $\sqrt{8+1}=3>2$. Esto comprueba un valor, pero todavía no resuelve la inecuación.`,
    "Resolverla significa encontrar todos los números que la satisfacen. Como en las ecuaciones, una desigualdad puede cumplirse para todos los valores de su dominio, para ninguno o solo para una parte. Usaremos conjuntos e intervalos para escribir la respuesta completa.",
  ] },
  "funciones-1": { source: "funciones-comentarios.pdf", pages: [2, 3], replaces: ["Una salida por entrada"], paragraphs: [
    t`Consideramos dos conjuntos de números reales, $A$ y $B$, y escribimos $f:A\to B$, $x\mapsto f(x)$. Leamos cada parte: $f$ es el nombre de la función; $A$, el conjunto de partida; y $B$, el conjunto de llegada.`,
    t`La letra $x$ representa un elemento de $A$ que puede variar. La expresión $f(x)$ indica cómo transformamos ese elemento en un elemento de $B$: describe la regla y, al fijar $x$, el valor obtenido. Para que se trate de una función, a cada $x\in A$ debe corresponderle exactamente un $f(x)\in B$.`,
    t`El conjunto $A$ se llama dominio. El número $f(x)$ es la imagen de $x$; a su vez, $x$ es una preimagen de $f(x)$. Conviene leer ambas frases juntas: una habla del resultado y la otra del elemento del que partimos.`,
    t`El recorrido es $\operatorname{Rec}(f)=\{f(x):x\in A\}$: reúne todos los valores que obtenemos cuando $x$ recorre el dominio. No debe confundirse con $B$, que puede contener elementos que nunca se alcanzan. El dominio, el conjunto de llegada y la regla forman parte de la función; cambiar alguno de ellos cambia la función. Cambiar solamente su nombre no cambia el objeto matemático.`,
  ] },
  "trigonometria-1": { source: "F.-Trigonometrica-comentarios-.pdf", pages: [2, 3], replaces: [], paragraphs: [
    t`Un ángulo $AOB$ está formado por dos semirrectas, $R_1$ y $R_2$, con un origen común $O$, llamado vértice. Podemos pensarlo como la rotación que lleva $R_1$ hasta $R_2$: $R_1$ es el lado inicial y $R_2$ el lado terminal.`,
    "El sentido de la rotación importa. Si giramos en sentido contrario a las agujas del reloj, el ángulo es positivo; si giramos en el mismo sentido, es negativo. En ambos casos debemos identificar desde qué lado comenzamos a medir.",
    t`Para medir en grados dividimos una vuelta completa en 360 partes iguales. Una de esas partes corresponde a $1^\circ$. Otra forma de medir es comparar la longitud del arco recorrido con el radio: así llegamos a los radianes.`,
  ] },
  "vectores-1": { source: "Vectores-comentarios.pdf", pages: [2, 3], replaces: [], paragraphs: [
    "Partimos de un segmento al que asignamos una dirección y un sentido. Su punto inicial se llama origen y su punto final, extremo. La flecha permite distinguir de dónde partimos y hacia dónde avanzamos.",
    "Hay tres ideas que no debemos confundir: la magnitud es el tamaño o «porte» del vector; la dirección describe su inclinación; y el sentido indica hacia dónde apunta. Dos flechas pueden tener igual dirección y apuntar en sentidos opuestos.",
    t`Un vector no queda ligado a una única flecha dibujada en un lugar particular: podemos representarlo desde distintos puntos iniciales manteniendo su magnitud, dirección y sentido. En la notación $\langle a,b\rangle$, $a$ es la primera componente y $b$ la segunda. Para obtenerlas a partir de dos puntos, restamos final menos inicial.`,
  ] },
  "conjuntos-1": { source: "conjuntos-1.pdf", pages: [2, 3], replaces: ["Elementos y universo", "Extensión y comprensión"], paragraphs: [
    t`Un conjunto es una colección de objetos dentro de un universo $U$. Los objetos de la colección se llaman elementos. Usaremos letras mayúsculas para los conjuntos y minúsculas para sus elementos. Escribir $x\in A$ se lee «$x$ está en $A$» o «$x$ pertenece a $A$». El conjunto vacío no tiene elementos: $\varnothing=\{\}$.`,
    t`Podemos describir un conjunto por extensión, enumerando sus elementos entre llaves. Por ejemplo, el conjunto de las vocales es $V=\{a,e,i,o,u\}$. También podemos describirlo por comprensión: $A=\{x\in U:p(x)\}$. Aquí $U$ indica dónde buscamos y $p(x)$ es la condición que deben satisfacer los elementos. Los signos «:» o «/» se leen «tal que».`,
    t`Por ejemplo, $S=\{x\in\mathbb R:\cos x=0\}$. Al mirar los ceros del coseno reconocemos $\pi/2$, $3\pi/2$ y sus repeticiones hacia ambos lados. La descripción completa es $S=\{\pi/2+k\pi:k\in\mathbb Z\}$.`,
    "Volvamos a las vocales: podemos enumerarlas o decir «las letras que son vocales». Son dos maneras de describir la misma colección. El orden de enumeración y las repeticiones no cambian el conjunto. A continuación distinguiremos pertenencia de un elemento e inclusión de un conjunto.",
  ] },
  "induccion-sumatorias-1": { source: "Induccion-y-sumatorias.pdf", pages: [2, 4], replaces: ["Del primer caso a todos los siguientes", "El primer ejemplo: paridad"], paragraphs: [
    t`Sea $p(n)$, con $n\in\mathbb N$, una función proposicional. Nuestro objetivo es verificar su veracidad en el conjunto de los números naturales: no queremos comprobar únicamente algunos ejemplos, sino demostrar la afirmación para todos los naturales a partir de un punto inicial.`,
    t`El principio de inducción pide dos cosas. Primero, que exista un $n_0\in\mathbb N$ para el cual $p(n_0)$ sea verdadera. Segundo, que cada vez que $p(n)$ sea verdadera, también lo sea $p(n+1)$: si es cierto para un natural, debe ser cierto para su sucesor. Cumplidas ambas condiciones, la afirmación vale para todo natural $n\ge n_0$.`,
    t`Cuando comenzamos en 1, la demostración se organiza así: verificamos $p(1)$; después suponemos que $p(k)$ es verdadera para un natural arbitrario $k\ge1$ y, usando esa hipótesis inductiva, demostramos $p(k+1)$. La hipótesis no afirma que ya hayamos probado todos los casos: es el punto de partida para demostrar el paso al sucesor.`,
    t`El primer ejemplo pregunta por qué $3^n-1$ es par. Para $n=1$ obtenemos $3-1=2$. En el paso inductivo, escribir $3^k-1=2m$ expresa exactamente la hipótesis de paridad; esa es la igualdad que debemos reconocer y utilizar al trabajar con el siguiente exponente.`,
  ] },
  "progresiones-binomio-3": { source: "factorial-y-teorema-del-bonomio.pdf", pages: [2, 3], replaces: ["Producto de naturales", "Elegir sin ordenar"], paragraphs: [
    t`Antes de desarrollar una potencia de un binomio, introducimos el factorial. Para $n\in\mathbb N\cup\{0\}$ definimos $0!=1$ y, si $n\ge1$, $n!=(n-1)!\,n$. La definición permite volver al factorial anterior hasta llegar a cero.`,
    t`Por ejemplo, $3!=2!\cdot3=(1!\cdot2)\cdot3=0!\cdot1\cdot2\cdot3=6$. En otras palabras, para $n\ge1$ tenemos $n!=n(n-1)(n-2)\cdots2\cdot1$.`,
    t`Con esto definimos el coeficiente binomial $\binom nk$, que leemos «$n$ sobre $k$»: vale $n!/[k!(n-k)!]$ si $0\le k\le n$, y vale cero si $k>n$. Aquí $n$ y $k$ son enteros no negativos.`,
    t`Así, $\binom53=5!/(3!2!)=10$, mientras que $\binom23=0$. En los extremos obtenemos $\binom n0=\binom nn=1$; además, $\binom n{n-1}=n$ para $n\ge1$. Estos números también cuentan las maneras de elegir $k$ elementos de un conjunto de $n$ elementos sin considerar el orden.`,
  ] },
  "polinomios-1": { source: "Polinomios.pdf", pages: [2, 3], replaces: ["Potencias enteras no negativas"], paragraphs: [
    t`Escribimos $p(x)=\sum_{i=0}^{n}a_ix^i=a_0+a_1x+\cdots+a_nx^n$, con coeficientes reales y $a_n\ne0$. Los exponentes son enteros no negativos. A $a_0$ lo llamamos coeficiente libre o término independiente; a $a_n$, coeficiente líder o principal.`,
    t`El grado es la mayor potencia que aparece con coeficiente distinto de cero. Podemos encontrar las notaciones $n=\deg(p)=\operatorname{gr}(p)=\rho(p)$. Veamos qué expresiones cumplen esta definición.`,
    t`$x^2+x+1$ es un polinomio de grado 2. La expresión $(x^2+5x+6)/(x+2)$, en cambio, está escrita como un cociente y no está definida en $x=-2$. Se simplifica a $x+3$ cuando $x\ne-2$, pero como función conserva esa restricción; no es la misma función que el polinomio $x+3$ definido en todo $\mathbb R$.`,
    t`La constante $5$ tiene grado 0; $x-7$ tiene grado 1; y $1/x$ no es un polinomio en $x$, pues introduce el exponente $-1$. Denotamos por $\mathbb R[x]$ el conjunto de los polinomios con coeficientes reales, sin fijar un único grado.`,
  ] },
  "geometria-analitica-1": { source: "Geometria-analitica.pdf", pages: [2, 3], replaces: [], paragraphs: [
    "Estudiaremos geometría usando el álgebra. Para ello nos situaremos en el plano cartesiano: queremos pasar de figuras geométricas planas a relaciones algebraicas que nos permitan describirlas y trabajar con ellas.",
    "Construimos el plano con dos rectas perpendiculares que se cortan en el origen. Cada eje representa los números reales; las flechas indican el sentido positivo. Los ejes dividen el plano en cuatro cuadrantes: I arriba a la derecha, II arriba a la izquierda, III abajo a la izquierda y IV abajo a la derecha.",
    t`Cada punto se describe mediante un par ordenado $P=(a,b)$ y, recíprocamente, cada par ordenado de números reales determina un punto del plano. La primera coordenada corresponde al eje horizontal y la segunda al vertical. Con esta correspondencia podemos definir una distancia y empezar a expresar propiedades geométricas mediante ecuaciones.`,
  ] },
};
