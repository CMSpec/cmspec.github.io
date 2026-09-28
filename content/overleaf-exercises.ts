import type { Exercise } from "./exercises";

// Importación conservadora; trazabilidad privada en work/overleaf-import-audit.json.
export const overleafExercises: Exercise[] = [
  {
    "slug": "practica-introduccion-matematicas-94d7c2627742",
    "number": "15",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Ecuaciones y desigualdades · dieciocho casos",
    "topic": "Ecuaciones y álgebra",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Resuelva",
      "1. $\\log(x+2)+\\log(x-1)=1$",
      "2. $\\displaystyle \\log(x^2-x-5)=0$",
      "3. $5x^2+3x= 3x^2+2$",
      "4. $\\dfrac{x}{x+1}=3$",
      "5. $\\displaystyle 3x^2+5x-8=4x^2-2x+4$",
      "6. $\\dfrac{x-4}{2x+1}=5$",
      "7. $\\displaystyle 2^{x+1}+2^x+2^{x-1}=28$",
      "8. $\\displaystyle \\frac{5x-2}{x+1} < 5$",
      "9. $\\dfrac{1}{6}<\\dfrac{2x-13}{12}\\leq \\dfrac{2}{3}$",
      "10. $3x^2-3x<2x^2+4$",
      "11. $\\dfrac{x-4}{2x+1}<5,$",
      "12. $\\left|\\dfrac{x+1}{2}\\right|\\geq 4$",
      "13. $\\dfrac{x+2}{x+3}<\\dfrac{x-1}{x-2}$",
      "14. $-\\dfrac{1}{2}<\\dfrac{4-3x}{5}\\leq \\dfrac{1}{4}$",
      "15. $\\left|\\dfrac{x-2}{3}\\right|<2$",
      "16. $\\dfrac{1}{x+1}+\\dfrac{1}{x+2}\\leq 0$",
      "17. $5x^2+3x\\geq 3x^2+2$",
      "18. $\\dfrac{x}{x+1}>3$"
    ],
    "relatedTheory": [
      {
        "label": "Ecuaciones y álgebra",
        "href": "/cursos/introduccion-matematicas#intro-ecuaciones-1"
      }
    ],
    "hints": [
      "Anota las restricciones de denominadores y argumentos de logaritmos. Aquí $\\log$ sin base se interpreta en base diez.",
      "Lleva todo a un lado y factoriza; para valores absolutos separa los casos necesarios.",
      "En desigualdades racionales usa una tabla de signos; no multipliques por una expresión de signo desconocido."
    ],
    "solution": [
      {
        "body": "1. Dominio $x>1$. $\\log((x+2)(x-1))=1$ da $x^2+x-12=0$, con raíces $3,-4$. Solo $x=3$ cumple el dominio."
      },
      {
        "body": "2. $\\log(x^2-x-5)=0$ exige $x^2-x-5=1$, luego $(x-3)(x+2)=0$. Ambas raíces cumplen argumento $1>0$: $x=-2,3$."
      },
      {
        "body": "3. $2x^2+3x-2=(2x-1)(x+2)=0$, luego $x=1/2,-2$."
      },
      {
        "body": "4. Con $x\\ne-1$, $x=3(x+1)$ da $x=-3/2$."
      },
      {
        "body": "5. $x^2-7x+12=(x-3)(x-4)=0$, luego $x=3,4$."
      },
      {
        "body": "6. Con $x\\ne-1/2$, $x-4=5(2x+1)$ da $x=-1$."
      },
      {
        "body": "7. Factoriza $2^{x-1}$: $(4+2+1)2^{x-1}=28$, así $2^{x-1}=4$ y $x=3$."
      },
      {
        "body": "8. Con $x\\ne-1$, $\\frac{5x-2}{x+1}-5=-7/(x+1)<0$. La solución es $x>-1$."
      },
      {
        "body": "9. Multiplicando por $12>0$: $2<2x-13\\le8$, por lo que $15/2<x\\le21/2$."
      },
      {
        "body": "10. $(x-4)(x+1)<0$. La tabla de signos da $-1<x<4$."
      },
      {
        "body": "11. Se excluye $x=-1/2$. La desigualdad se reduce a $-9(x+1)/(2x+1)<0$, o $(x+1)/(2x+1)>0$. Solución $(-\\infty,-1)\\cup(-1/2,\\infty)$."
      },
      {
        "body": "12. $|x+1|\\ge8$ equivale a $x+1\\le-8$ o $x+1\\ge8$. Solución $(-\\infty,-9]\\cup[7,\\infty)$."
      },
      {
        "body": "13. Se excluyen $-3,2$. La diferencia de fracciones es $(-2x-1)/((x+3)(x-2))$. Su signo es negativo en $(-3,-1/2)$ y $(2,\\infty)$; esos son los intervalos solución."
      },
      {
        "body": "14. Multiplicando por $20$: $-10<16-12x\\le5$. Al despejar y cambiar el sentido al dividir por $-12$, resulta $11/12\\le x<13/6$."
      },
      {
        "body": "15. $|x-2|<6$ equivale a $-6<x-2<6$, luego $-4<x<8$."
      },
      {
        "body": "16. Se excluyen $-2,-1$. Sumando, $(2x+3)/((x+1)(x+2))\\le0$. Los puntos críticos son $-2,-3/2,-1$; solución $(-\\infty,-2)\\cup[-3/2,-1)$."
      },
      {
        "body": "17. $(2x-1)(x+2)\\ge0$ da $(-\\infty,-2]\\cup[1/2,\\infty)$."
      },
      {
        "body": "18. Con $x\\ne-1$, $x/(x+1)-3=(-2x-3)/(x+1)>0$. Solución $(-3/2,-1)$."
      }
    ],
    "finalAnswer": "Los conjuntos solución de cada inciso se indican en su desarrollo; se excluyen siempre los valores fuera del dominio original.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-6908b72e2228",
    "number": "16",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Ecuaciones trigonométricas · ángulo doble y factorización",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Encuentre todas las soluciones $x\\in \\mathbb{R}$ de las siguientes ecuaciones.",
      "1. $\\cos(x)=\\sin(2x)$ .",
      "2. $2\\cos^2(x)+\\sin(x)=1$"
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Usa $\\sin(2x)=2\\sin x\\cos x$ y $\\cos(2x)=1-2\\sin^2x$, cuando corresponda.",
      "Factoriza la ecuación; no dividas por un factor que podría ser cero.",
      "Encuentra las soluciones en una vuelta y añade la periodicidad; $k\\in\\mathbb Z$."
    ],
    "solution": [
      {
        "body": "1. $\\cos x=\\sin(2x)$ equivale a $\\cos x(1-2\\sin x)=0$. Por tanto $x=\\frac\\pi2+k\\pi$, $x=\\frac\\pi6+2k\\pi$ o $x=\\frac{5\\pi}6+2k\\pi$."
      },
      {
        "body": "2. $2\\cos^2x+\\sin x=1$ se transforma en $2\\sin^2x-\\sin x-1=0$, o $(2\\sin x+1)(\\sin x-1)=0$. Las soluciones son $x=\\pi/2+2k\\pi$, $x=7\\pi/6+2k\\pi$ o $x=11\\pi/6+2k\\pi$."
      }
    ],
    "finalAnswer": "Las familias indicadas en cada inciso, con $k\\in\\mathbb Z$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-2cfa534c58ed",
    "number": "17",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Identidades trigonométricas · cocientes y reciprocidad",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Demuestre las siguientes identidades trigonométricas:",
      "1. $\\dfrac{\\tan(\\alpha)-\\cot(\\alpha)}{1-2\\cos^2(\\alpha)}=\\tan(\\alpha)+\\cot(\\alpha).$",
      "2. $\\cot(x) \\cos(x) + \\sin(x) = \\csc(x).$"
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Escribe tangente y cotangente como cocientes de seno y coseno.",
      "Lleva los términos a un denominador común y usa $\\sin^2x+\\cos^2x=1$.",
      "La igualdad debe demostrarse solo donde las expresiones originales estén definidas."
    ],
    "solution": [
      {
        "body": "Donde la expresión original está definida ($\\sin\\alpha\\ne0$, $\\cos\\alpha\\ne0$ y $1-2\\cos^2\\alpha\\ne0$), $\\tan\\alpha-\\cot\\alpha=\\frac{\\sin^2\\alpha-\\cos^2\\alpha}{\\sin\\alpha\\cos\\alpha}=\\frac{1-2\\cos^2\\alpha}{\\sin\\alpha\\cos\\alpha}$. Al dividir por $1-2\\cos^2\\alpha$ queda $1/(\\sin\\alpha\\cos\\alpha)=\\tan\\alpha+\\cot\\alpha$."
      },
      {
        "body": "Para $\\sin x\\ne0$, $\\cot x\\cos x+\\sin x=\\frac{\\cos^2x}{\\sin x}+\\sin x=\\frac{\\cos^2x+\\sin^2x}{\\sin x}=\\frac1{\\sin x}=\\csc x$."
      }
    ],
    "finalAnswer": "Ambas igualdades se cumplen en sus respectivos dominios.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-d340435601f3",
    "number": "18",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Problema de alturas · barco que se aleja de un faro",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Considere el siguiente problema: Desde un barco se observa un faro con un ángulo de elevación de $60^\\circ$ respecto a la horizontal. Luego, al alejarse $100$ metros, el nuevo ángulo de elevación hacia el faro es de $30^\\circ$ . Calcular la altura a la que se encuentra el punto más alto del faro con respecto al nivel del mar.",
      "Realice un diagrama o dibujo del problema. Debe dejar sus resultados redondeados al tercer decimal."
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Supón que el barco se aleja en línea recta de la base del faro. Llama $d$ a la distancia horizontal inicial.",
      "La altura es la misma en ambos triángulos: $h=d\\tan60^\\circ=(d+100)\\tan30^\\circ$.",
      "Usa $\\tan60^\\circ=\\sqrt3$ y $\\tan30^\\circ=1/\\sqrt3$."
    ],
    "solution": [
      {
        "body": "Esquema: base $B=(0,0)$, cima $F=(0,h)$, posiciones del barco $P=(d,0)$ y $Q=(d+100,0)$. Las visuales $PF$ y $QF$ forman $60^\\circ$ y $30^\\circ$ con la horizontal."
      },
      {
        "body": "Igualando las alturas: $d\\sqrt3=(d+100)/\\sqrt3$, así que $3d=d+100$ y $d=50$. Entonces $h=50\\sqrt3\\approx86.603$ m."
      }
    ],
    "finalAnswer": "La altura es $86.603$ m, suponiendo alejamiento horizontal directamente desde el faro.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-9459f43407c6",
    "number": "19",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Problema de triángulos · distancia mediante la ley de senos",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Plantee y resuelva el siguiente problema: Hay tres puntos: $A$ , $B$ y $C$ , en el piso formando un triángulo. La distancia entre $A$ y $B$ es de 50 metros y los ángulos ubicados en los vértices A y C son $30^\\circ$ y $45^\\circ$ respectivamente. ¿Cuál es la distancia entre los puntos $A$ y $C$ ?"
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Suma los ángulos interiores para obtener el que falta.",
      "El lado $AB$ está frente al ángulo $C$.",
      "Usa $AC/\\sin B=AB/\\sin C$."
    ],
    "solution": [
      {
        "body": "$B=180^\\circ-30^\\circ-45^\\circ=105^\\circ$. Por la ley de senos, $AC=50\\sin105^\\circ/\\sin45^\\circ=25(1+\\sqrt3)$ m."
      }
    ],
    "finalAnswer": "$AC=25(1+\\sqrt3)\\approx68.301$ m.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-104d8f10f1fd",
    "number": "20",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Ecuaciones · logaritmos, exponenciales y valor absoluto",
    "topic": "Ecuaciones y álgebra",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Resuelva",
      "1. $\\log(x)+\\log(x-1)=\\log(6)$",
      "2. $\\left|\\dfrac{x-4}{2x+1}\\right|=5$",
      "3. $\\displaystyle 2^{x+1}+2^x+2^{x-1}=28$",
      "4. $|x - 1| + |x + 1| - 1 = |x|$"
    ],
    "relatedTheory": [
      {
        "label": "Ecuaciones y álgebra",
        "href": "/cursos/introduccion-matematicas#intro-ecuaciones-1"
      }
    ],
    "hints": [
      "Anota las restricciones de denominadores y argumentos de logaritmos. Aquí $\\log$ sin base se interpreta en base diez.",
      "Lleva todo a un lado y factoriza; para valores absolutos separa los casos necesarios.",
      "En desigualdades racionales usa una tabla de signos; no multipliques por una expresión de signo desconocido."
    ],
    "solution": [
      {
        "body": "1. Se necesita $x>1$. $x(x-1)=6$ da $x=3,-2$, pero solo $x=3$ es admisible."
      },
      {
        "body": "2. Con $x\\ne-1/2$, el cociente debe ser $5$ o $-5$. El primer caso da $x=-1$ y el segundo $x=-1/11$; ambos son válidos."
      },
      {
        "body": "3. Factoriza $2^{x-1}$: $(4+2+1)2^{x-1}=28$, así $2^{x-1}=4$ y $x=3$."
      },
      {
        "body": "4. Si $|x|\\le1$, la suma $|x-1|+|x+1|=2$ y la ecuación exige $|x|=1$. Si $|x|\\ge1$, esa suma es $2|x|$, y de nuevo $|x|=1$."
      }
    ],
    "finalAnswer": "1. $3$. 2. $-1,-1/11$. 3. $3$. 4. $-1,1$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-b617d76e5bb2",
    "number": "21",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Desigualdades · cuadrática y racional",
    "topic": "Ecuaciones y álgebra",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Resuelva las siguientes desigualdades",
      "1. $3x^2-3x<2x^2+4$",
      "2. $\\dfrac{x+2}{x+3}<\\dfrac{x-1}{x-2}$"
    ],
    "relatedTheory": [
      {
        "label": "Ecuaciones y álgebra",
        "href": "/cursos/introduccion-matematicas#intro-ecuaciones-1"
      }
    ],
    "hints": [
      "Anota las restricciones de denominadores y argumentos de logaritmos. Aquí $\\log$ sin base se interpreta en base diez.",
      "Lleva todo a un lado y factoriza; para valores absolutos separa los casos necesarios.",
      "En desigualdades racionales usa una tabla de signos; no multipliques por una expresión de signo desconocido."
    ],
    "solution": [
      {
        "body": "1. $(x-4)(x+1)<0$. La tabla de signos da $-1<x<4$."
      },
      {
        "body": "2. Se excluyen $-3,2$. La diferencia de fracciones es $(-2x-1)/((x+3)(x-2))$. Su signo es negativo en $(-3,-1/2)$ y $(2,\\infty)$; esos son los intervalos solución."
      }
    ],
    "finalAnswer": "Los conjuntos solución de cada inciso se indican en su desarrollo; se excluyen siempre los valores fuera del dominio original.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-bb30c8e763d6",
    "number": "22",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Sistema lineal · eliminación en tres variables",
    "topic": "Ecuaciones y álgebra",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Resuelva el siguiente sistema de ecuaciones:",
      "$$\\begin{aligned} x + y +2z &= 0 \\\\ 2x - 5y - z &= 3\\\\ x -2y + z &= -1 \\end{aligned}$$"
    ],
    "relatedTheory": [
      {
        "label": "Ecuaciones y álgebra",
        "href": "/cursos/introduccion-matematicas#intro-ecuaciones-1"
      }
    ],
    "hints": [
      "Resta ecuaciones o despeja una variable para reducir el sistema.",
      "Resuelve las dos ecuaciones restantes y recupera la variable eliminada.",
      "Comprueba la terna obtenida en las tres ecuaciones originales."
    ],
    "solution": [
      {
        "body": "De la primera ecuación, $x=-y-2z$. Sustituyendo en las otras: $-7y-5z=3$ y $3y+z=1$. De la última $z=1-3y$; al sustituir en la anterior se obtiene $8y=8$. Así $y=1,z=-2,x=3$. Las tres ecuaciones se verifican."
      }
    ],
    "finalAnswer": "$(x,y,z)=(3,1,-2)$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-09323020f410",
    "number": "23",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Lógica · deducir valores desde una disyunción falsa",
    "topic": "Lógica",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Si la proposición $(\\neg p \\Rightarrow q) \\vee (r \\Rightarrow \\neg s)$ es falsa, determine el valor de verdad de:",
      "$$(\\neg r \\vee q) \\Leftrightarrow [(\\neg q \\vee r) \\wedge s]$$"
    ],
    "relatedTheory": [
      {
        "label": "Lógica",
        "href": "/cursos/introduccion-matematicas#intro-logica-1"
      }
    ],
    "hints": [
      "Una disyunción es falsa solo cuando ambos miembros son falsos.",
      "Una implicación es falsa cuando el antecedente es verdadero y el consecuente falso.",
      "Sustituye esos valores en la proposición final."
    ],
    "solution": [
      {
        "body": "La falsedad de $\\neg p\\Rightarrow q$ exige $p=F,q=F$. La falsedad de $r\\Rightarrow\\neg s$ exige $r=V,s=V$."
      },
      {
        "body": "Así $\\neg r\\vee q=F$ y $(\\neg q\\vee r)\\wedge s=V$. El bicondicional entre $F$ y $V$ es falso."
      }
    ],
    "finalAnswer": "La proposición pedida es falsa.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-deb44a9dec11",
    "number": "24",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Cuantificadores · verdad y negación",
    "topic": "Lógica",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Considere el conjunto $A = \\{1,2,3,4,5 \\}$ . Para la proposición",
      "$$\\forall x \\in A, \\; x^2+3^2 \\le 25$$",
      "determine su valor de verdad y encuentre su negación."
    ],
    "relatedTheory": [
      {
        "label": "Lógica",
        "href": "/cursos/introduccion-matematicas#intro-logica-1"
      }
    ],
    "hints": [
      "Para refutar un enunciado universal basta un contraejemplo.",
      "Prueba con el mayor elemento de $A$.",
      "La negación de «para todo» usa «existe» y niega la desigualdad."
    ],
    "solution": [
      {
        "body": "La proposición es falsa: para $x=5$, $25+9=34>25$. Su negación es $\\exists x\\in A:\\ x^2+9>25$ (la cumplen $x=5$; $x=4$ produce igualdad y no la cumple)."
      }
    ],
    "finalAnswer": "Falsa; negación: $\\exists x\\in A:\\ x^2+9>25$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-50190d368339",
    "number": "25",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Conjuntos · encuesta sobre tres idiomas",
    "topic": "Conjuntos",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "En una encuesta realizada a 150 personas sobre sus preferencias por tres idiomas: Inglés, Francés y Alemán, se obtuvieron los siguientes resultados:",
      "1. 82 personas hablan Inglés.",
      "2. 54 personas hablan Francés.",
      "3. 50 personas hablan únicamente Inglés.",
      "4. 30 personas hablan solo Francés.",
      "5. El número de personas que hablan solo Francés y Alemán es la mitad del número de personas que hablan solo Inglés y Alemán.",
      "6. El número de personas que hablan solo Inglés y Francés es el triple del número de personas que hablan los tres idiomas.",
      "7. Hay tantas personas que no hablan ninguno de los idiomas mencionados como las que hablan solo Alemán.",
      "Determine:",
      "8. El número de personas que hablan solo dos de los idiomas.",
      "9. El número de personas que no hablan ninguno de los tres idiomas.",
      "10. El número de personas que hablan al menos uno de los tres idiomas."
    ],
    "relatedTheory": [
      {
        "label": "Conjuntos",
        "href": "/cursos/introduccion-matematicas#intro-conjuntos-1"
      }
    ],
    "hints": [
      "Asigna variables a las siete regiones disjuntas del diagrama de Venn.",
      "Si $t$ hablan los tres, solo inglés/francés son $3t$; llama $u$ a solo inglés/alemán.",
      "Usa los totales de inglés y francés y después el total de la encuesta."
    ],
    "solution": [
      {
        "body": "Los totales dan $50+3t+u+t=82$ y $30+3t+u/2+t=54$. Es decir $4t+u=32$ y $4t+u/2=24$, de donde $u=16$, $t=4$."
      },
      {
        "body": "Solo dos idiomas: $3t+u+u/2=12+16+8=36$. Si $a$ hablan solo alemán, también $a$ no hablan ninguno. El total es $50+30+36+4+2a=150$, por lo que $a=15$. Al menos uno: $150-15=135$."
      }
    ],
    "finalAnswer": "Solo dos: $36$ personas; ninguno: $15$; al menos uno: $135$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-9509552b94ca",
    "number": "26",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Inducción · suma de cuadrados",
    "topic": "Inducción y sumatorias",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Demuestre por inducción la siguiente proposición",
      "$\\forall n \\in \\mathbb{N}, \\quad 1^2 + 2^2 + 3^2 + \\dots + n^2 = \\frac{n(n+1)(2n+1)}{6}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Inducción y sumatorias",
        "href": "/cursos/introduccion-matematicas#intro-induccion-sumatorias-1"
      }
    ],
    "hints": [
      "Verifica el caso $n=1$.",
      "Supón la fórmula para $n$ y añade $(n+1)^2$.",
      "Factoriza $(n+1)$ para obtener la expresión del caso $n+1$."
    ],
    "solution": [
      {
        "body": "Para $n=1$, ambos lados valen $1$. Si $\\sum_{k=1}^n k^2=n(n+1)(2n+1)/6$, entonces $\\sum_{k=1}^{n+1}k^2=\\frac{n(n+1)(2n+1)+6(n+1)^2}{6}=\\frac{(n+1)(2n^2+7n+6)}6=\\frac{(n+1)(n+2)(2n+3)}6$. Esta es la fórmula con $n$ reemplazado por $n+1$."
      }
    ],
    "finalAnswer": "$\\sum_{k=1}^n k^2=n(n+1)(2n+1)/6$ para todo $n\\ge1$ (y para $n=0$ con suma vacía).",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-d08065713b36",
    "number": "27",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Sumatoria · expansión de un producto",
    "topic": "Inducción y sumatorias",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine el valor de la siguiente sumatoria",
      "$\\sum_{k=2}^{12} 5(k-2)(k+1)$"
    ],
    "relatedTheory": [
      {
        "label": "Inducción y sumatorias",
        "href": "/cursos/introduccion-matematicas#intro-induccion-sumatorias-1"
      }
    ],
    "hints": [
      "En una suma doble resuelve primero la suma interior manteniendo fijo el índice exterior.",
      "Para sumas racionales factoriza el denominador y busca una diferencia telescópica.",
      "Escribe los primeros y últimos términos para comprobar las cancelaciones y los extremos."
    ],
    "solution": [
      {
        "body": "$5(k-2)(k+1)=5(k^2-k-2)$. Entre $2$ y $12$ hay $11$ términos, $\\sum k^2=650-1=649$ y $\\sum k=78-1=77$. La suma vale $5(649-77-22)=2750$."
      }
    ],
    "finalAnswer": "$2750$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-edf5c4329f88",
    "number": "28",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Ecuaciones trigonométricas · ángulo doble y factorización",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Resuelva",
      "1. $\\cos(x)=\\sin(2x)$ .",
      "2. $\\cos(2x)=\\sin(x)+1$",
      "3. $\\sqrt{3}\\tan(x/2)-1=0$"
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Usa $\\sin(2x)=2\\sin x\\cos x$ y $\\cos(2x)=1-2\\sin^2x$, cuando corresponda.",
      "Factoriza la ecuación; no dividas por un factor que podría ser cero.",
      "Encuentra las soluciones en una vuelta y añade la periodicidad; $k\\in\\mathbb Z$."
    ],
    "solution": [
      {
        "body": "1. $\\cos x=\\sin(2x)$ equivale a $\\cos x(1-2\\sin x)=0$. Por tanto $x=\\frac\\pi2+k\\pi$, $x=\\frac\\pi6+2k\\pi$ o $x=\\frac{5\\pi}6+2k\\pi$."
      },
      {
        "body": "2. $\\cos(2x)=\\sin x+1$ se convierte en $1-2\\sin^2x=\\sin x+1$, es decir $\\sin x(2\\sin x+1)=0$. Así $x=k\\pi$, $x=\\frac{7\\pi}6+2k\\pi$ o $x=\\frac{11\\pi}6+2k\\pi$."
      },
      {
        "body": "3. $\\sqrt3\\tan(x/2)=1$ da $x/2=\\pi/6+k\\pi$, luego $x=\\pi/3+2k\\pi$. Estos valores no anulan $\\cos(x/2)$."
      }
    ],
    "finalAnswer": "Las familias indicadas en cada inciso, con $k\\in\\mathbb Z$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-9cdebb09088b",
    "number": "29",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Funciones · traslaciones y monotonía",
    "topic": "Funciones",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Para la función $f(x)$ determine la intersección con los ejes coordenados, los intervalos de crecimiento y decrecimiento. Utilizando traslaciones, grafique la función.",
      "1. $f(x)=|x -2|+3$",
      "2. $f(x)=(x +2)^2+1$",
      "3. $f(x)=\\sqrt{x +4}-2$"
    ],
    "relatedTheory": [
      {
        "label": "Funciones",
        "href": "/cursos/introduccion-matematicas#intro-funciones-1"
      }
    ],
    "hints": [
      "Identifica la función base y sus desplazamientos horizontal y vertical.",
      "Encuentra el dominio y los cortes con los ejes antes de dibujar.",
      "Usa el vértice o el extremo del dominio para describir el recorrido y la monotonía."
    ],
    "solution": [
      {
        "body": "1. $|x-2|+3$ es una V con vértice $(2,3)$, trasladada $2$ a la derecha y $3$ arriba. No corta $X$; corta $Y$ en $(0,5)$. Decrece en $(-\\infty,2]$ y crece en $[2,\\infty)$."
      },
      {
        "body": "2. $(x+2)^2+1$ es una parábola que abre hacia arriba con vértice $(-2,1)$. No corta $X$; corta $Y$ en $(0,5)$. Decrece hasta $-2$ y crece desde $-2$."
      },
      {
        "body": "3. $\\sqrt{x+4}-2$ tiene dominio $[-4,\\infty)$ y crece en todo él. Parte de $(-4,-2)$ y corta ambos ejes en $(0,0)$. Es la raíz cuadrada trasladada $4$ a la izquierda y $2$ abajo."
      }
    ],
    "finalAnswer": "Las tres gráficas y sus intervalos quedan determinados por las traslaciones, vértices y cortes descritos.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-b69651f0b88f",
    "number": "30",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Problemas de alturas · faro, cometa, antena y estatua",
    "topic": "Trigonometría",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Plantee y resuelva:",
      "1. Desde un faro situado a 40 m sobre le nivel del mar, el ángulo de depresión con",
      "que se ve un barco es de $55^\\circ$ . ¿a que distancia del faro se halla el barco?",
      "2. Una cometa está unida al suelo por un hilo de 100m, que forma con la horizontal",
      "del terreno un ángulo de 60 $^\\circ$ . Suponiendo que el hilo e stirante, hallar a que altura",
      "sobre el suelo se encuentra la cometa.",
      "3. Una persona parada a 40 metros de un edificio observa que el ángulo de elevación a la cima del edificio es de $35^\\circ$ . Desde ese mismo punto también observa que el ángulo a una antena que está sobre el edificio es de $38^\\circ$ . Determine la altura del edificio y la longitud de la antena.",
      "4. Desde un barco se divisa el alto de una montaña bajo una visual que forma con la",
      "horizontal un ángulo de 60 $^\\circ$ . Si el barco se aleja 100 m la nueva visual forma un",
      "ángulo de 30 $^\\circ$ con la horizontal. Calcular la altura de la montaña.",
      "5. Desde un punto del suelo plano, un observador divisa una estatua de 5 metros sobre un pedestal de 4 metros. Además, se sabe que el ángulo de elevación a la cabeza de la estatua es el doble que el ángulo de elevación a los pies de la estatua. Determine a qué distancia está el observador del pie del pedestal."
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Haz un triángulo por cada visual. Distingue distancia horizontal e hipotenusa.",
      "Para dos posiciones del observador o dos alturas, iguala la altura común o resta las alturas calculadas.",
      "En el último inciso usa la fórmula de la tangente del ángulo doble."
    ],
    "solution": [
      {
        "body": "1. Distancia horizontal a la base del faro: $d=40/\\tan55^\\circ\\approx28.008$ m. Si se pide distancia visual al foco del faro, es $40/\\sin55^\\circ\\approx48.831$ m."
      },
      {
        "body": "2. El hilo es la hipotenusa: $h=100\\sin60^\\circ=50\\sqrt3\\approx86.603$ m."
      },
      {
        "body": "3. Edificio: $40\\tan35^\\circ\\approx28.008$ m. Antena: $40(\\tan38^\\circ-\\tan35^\\circ)\\approx3.243$ m."
      },
      {
        "body": "4. Suponiendo alejamiento directamente desde la base de la montaña, $d\\tan60^\\circ=(d+100)\\tan30^\\circ$ da $d=50$ y $h=50\\sqrt3\\approx86.603$ m."
      },
      {
        "body": "5. Con $\\tan\\theta=4/d$ y $\\tan2\\theta=9/d$, la identidad de ángulo doble da $9(d^2-16)=8d^2$, de donde $d=12$ m."
      }
    ],
    "finalAnswer": "1. $28.008$ m horizontales; 2. $86.603$ m; 3. $28.008$ m y $3.243$ m; 4. $86.603$ m; 5. $12$ m.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-c0ea2e56dd22",
    "number": "31",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Problemas de alturas · sombra en una ladera y ángulo doble",
    "topic": "Trigonometría",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Resuelva los siguientes problemas:",
      "1. Un árbol que crece en una ladera proyecta una sombra de 10 metros sobre la colina. Encuentre la altura del árbol si la colina tiene una pendiente de $30^\\circ$ y el ángulo de elevación del Sol es de $40^\\circ$ , ambos medidos con respecto a la horizontal.",
      "2. Desde un punto en el suelo, Romeo observa a Julieta, quien se encuentra en un balcón ubicado a 2 metros de altura. Sobre este balcón, el extremo más alto de la torre está a 3 metros adicionales de altura. Se sabe que el ángulo de elevación hacia el punto más alto de la torre es el doble del ángulo de elevación hacia Julieta. Determine la distancia horizontal entre Romeo y la base de la torre donde se encuentra Julieta."
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Para el árbol, distingue la longitud de la sombra sobre la ladera de su proyección horizontal.",
      "El sentido de la pendiente respecto a la sombra importa: el enunciado no lo especifica.",
      "Para Romeo usa $\\tan\\theta=2/d$ y $\\tan2\\theta=5/d$."
    ],
    "solution": [
      {
        "body": "1. Suponiendo un árbol vertical, la sombra de longitud $10$ tiene proyección horizontal $10\\cos30^\\circ$ y desnivel de magnitud $10\\sin30^\\circ$. Si la sombra cae cuesta abajo, $h=10\\cos30^\\circ\\tan40^\\circ-10\\sin30^\\circ\\approx2.267$ m. Si cae cuesta arriba, $h=10\\cos30^\\circ\\tan40^\\circ+10\\sin30^\\circ\\approx12.267$ m. Sin indicar la orientación no hay una única altura."
      },
      {
        "body": "2. Con $d>0$, $5/d=2(2/d)/(1-4/d^2)$, así $5(d^2-4)=4d^2$, $d^2=20$ y $d=2\\sqrt5\\approx4.472$ m."
      }
    ],
    "finalAnswer": "Árbol: $2.267$ m o $12.267$ m, según la orientación de la sombra, suponiendo tronco vertical. Romeo: $2\\sqrt5$ m.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-86f8d45c74e7",
    "number": "32",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Función valor absoluto · dominio y traslación",
    "topic": "Funciones",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Dada la función $f(x) = |x -1|+3$ .",
      "1. Determine su dominio y recorrido.",
      "2. Determine la intersección con los ejes coordenados.",
      "3. Determine los intervalos de crecimiento y decrecimiento.",
      "4. Utilizando traslaciones, grafique la función."
    ],
    "relatedTheory": [
      {
        "label": "Funciones",
        "href": "/cursos/introduccion-matematicas#intro-funciones-1"
      }
    ],
    "hints": [
      "Identifica la función base y sus desplazamientos horizontal y vertical.",
      "Encuentra el dominio y los cortes con los ejes antes de dibujar.",
      "Usa el vértice o el extremo del dominio para describir el recorrido y la monotonía."
    ],
    "solution": [
      {
        "body": "El dominio es $\\mathbb R$ y, como $|x-1|\\ge0$, el recorrido es $[3,\\infty)$. No corta $X$; $f(0)=4$ da el corte $(0,4)$."
      },
      {
        "body": "La gráfica es una V de vértice $(1,3)$: $f=4-x$ para $x\\le1$ y $f=x+2$ para $x\\ge1$. Decrece hasta $1$ y crece desde $1$."
      }
    ],
    "finalAnswer": "Dominio $\\mathbb R$, recorrido $[3,\\infty)$, vértice $(1,3)$ y corte con $Y$ en $(0,4)$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-2784fdf64f0a",
    "number": "33",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Vectores · normas, unitarios y ángulo",
    "topic": "Vectores",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Dada las coordenadas $A=(-1,1)$ , $B=(3,-2), C=(-1,-2)$ y los vectores: $\\vec{p} = \\overrightarrow{AB}, \\vec{q}= \\overrightarrow{BC}$ y $\\vec{r} =\\overrightarrow{ AC}$ .",
      "Respecto de estos vectores $\\vec{p} , \\vec{q}$ y $\\vec{r},$ determine:",
      "1. Sus magnitudes.",
      "2. Vectores unitarios asociados.",
      "3. El producto punto entre ellos.",
      "4. El ángulo entre $\\vec{p}$ y $\\vec{r}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Vectores",
        "href": "/cursos/introduccion-matematicas#intro-vectores-1"
      }
    ],
    "hints": [
      "Resta coordenadas finales menos iniciales.",
      "Normaliza dividiendo cada vector por su norma.",
      "Usa $\\cos\\theta=(p\\cdot r)/(\\|p\\|\\|r\\|)$."
    ],
    "solution": [
      {
        "body": "$p=(4,-3)$, $q=(-4,0)$ y $r=(0,-3)$, con normas $5,4,3$. Los unitarios son $(4/5,-3/5)$, $(-1,0)$ y $(0,-1)$."
      },
      {
        "body": "Los productos entre vectores distintos son $p\\cdot q=-16$, $p\\cdot r=9$ y $q\\cdot r=0$. Los productos consigo mismos son $25,16,9$."
      },
      {
        "body": "$\\cos\\theta=9/(5\\cdot3)=3/5$, luego $\\theta=\\arccos(3/5)\\approx53.130^\\circ$."
      }
    ],
    "finalAnswer": "Normas $5,4,3$; productos cruzados $-16,9,0$; ángulo $\\arccos(3/5)$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-cb9cae5642de",
    "number": "34",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Lógica · implicación falsa y negación de un universal",
    "topic": "Lógica",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "1. Sabiendo que la proposición $$[(p \\wedge \\neg q)\\wedge r] \\Rightarrow [(p \\Leftrightarrow t)\\vee s]$$",
      "es falsa, determine el valor de verdad de $p,q,r,s$ y $t$",
      "2. Considere el conjunto $A = \\{1,2,3,4,5 \\}$ . Para la proposición",
      "$$\\forall x \\in A, \\; x^2+3^2 \\le 25$$",
      "determine su valor de verdad y encuentre su negación."
    ],
    "relatedTheory": [
      {
        "label": "Lógica",
        "href": "/cursos/introduccion-matematicas#intro-logica-1"
      }
    ],
    "hints": [
      "Una implicación falsa tiene antecedente verdadero y consecuente falso.",
      "Descompón las conjunciones y disyunciones antes de estudiar el bicondicional.",
      "Para negar el universal cambia el cuantificador y la desigualdad."
    ],
    "solution": [
      {
        "body": "1. El antecedente verdadero exige $p=V,q=F,r=V$. El consecuente falso exige $s=F$ y $p\\Leftrightarrow t=F$; como $p=V$, resulta $t=F$."
      },
      {
        "body": "2. La proposición es falsa: para $x=5$, $25+9=34>25$. Su negación es $\\exists x\\in A:\\ x^2+9>25$ (la cumplen $x=5$; $x=4$ produce igualdad y no la cumple)."
      }
    ],
    "finalAnswer": "1. $(p,q,r,s,t)=(V,F,V,F,F)$. 2. Universal falso, con negación $\\exists x\\in A:x^2+9>25$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-53a07816e1c5",
    "number": "35",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Ecuación e identidad trigonométrica · coseno y secante",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "1. Resuelva la siguiente ecuación trigonométrica",
      "$$\\begin{aligned} 4\\cos^2(x) -3= 0 \\end{aligned}$$",
      "2. Demuestre la siguiente identidad trigonométrica",
      "$$\\begin{aligned} \\frac{1}{\\sec(x)+\\tan(x)} -\\frac{1}{\\sec(x)-\\tan(x)}= -2\\tan(x) \\end{aligned}$$"
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "En el primer inciso despeja $\\cos^2x$.",
      "En el segundo usa denominador común.",
      "Usa $\\sec^2x-\\tan^2x=1$."
    ],
    "solution": [
      {
        "body": "1. $\\cos^2x=3/4$, luego $x=k\\pi\\pm\\pi/6$, $k\\in\\mathbb Z$."
      },
      {
        "body": "2. La diferencia de fracciones es $\\frac{-2\\tan x}{\\sec^2x-\\tan^2x}=-2\\tan x$. Es válida para $\\cos x\\ne0$; ninguno de los denominadores $\\sec x\\pm\\tan x$ puede ser cero porque su producto es $1$."
      }
    ],
    "finalAnswer": "1. $x=k\\pi\\pm\\pi/6$. 2. Identidad válida para $\\cos x\\ne0$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-9211d2958ca8",
    "number": "36",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Ecuaciones y desigualdad racional",
    "topic": "Ecuaciones y álgebra",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Resuelva",
      "1.",
      "$\\dfrac{3x-1}{x+9}<3.$",
      "2. $3x^2-3x=2x^2+4$",
      "3. $\\log(x+2)+\\log(x-1)=1$"
    ],
    "relatedTheory": [
      {
        "label": "Ecuaciones y álgebra",
        "href": "/cursos/introduccion-matematicas#intro-ecuaciones-1"
      }
    ],
    "hints": [
      "Anota las restricciones de denominadores y argumentos de logaritmos. Aquí $\\log$ sin base se interpreta en base diez.",
      "Lleva todo a un lado y factoriza; para valores absolutos separa los casos necesarios.",
      "En desigualdades racionales usa una tabla de signos; no multipliques por una expresión de signo desconocido."
    ],
    "solution": [
      {
        "body": "1. Con $x\\ne-9$, $(3x-1)/(x+9)-3=-28/(x+9)<0$ equivale a $x>-9$."
      },
      {
        "body": "2. $x^2-3x-4=(x-4)(x+1)=0$: $x=-1,4$."
      },
      {
        "body": "3. Dominio $x>1$. $\\log((x+2)(x-1))=1$ da $x^2+x-12=0$, con raíces $3,-4$. Solo $x=3$ cumple el dominio."
      }
    ],
    "finalAnswer": "1. $(-9,\\infty)$. 2. $\\{-1,4\\}$. 3. $\\{3\\}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-965fa23243af",
    "number": "37",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Funciones · dominio racional bajo una raíz y traslaciones",
    "topic": "Funciones",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Dadas las funciones",
      "$$f(x) = |x +1|-2\\quad g(x) = \\sqrt{\\frac{2x-1}{3x+5}}\\quad h(x)=(x-1)^2+3$$",
      "1. Determine el dominio de $f(x)$ y $g(x)$ .",
      "2. Determine el recorrido de $f(x)$ y $h(x)$ .",
      "3. Para la función $h(x)$ determine la intersección con los ejes coordenados, los intervalos de crecimiento y decrecimiento. Utilizando traslaciones, grafique la función."
    ],
    "relatedTheory": [
      {
        "label": "Funciones",
        "href": "/cursos/introduccion-matematicas#intro-funciones-1"
      }
    ],
    "hints": [
      "Identifica la función base y sus desplazamientos horizontal y vertical.",
      "Encuentra el dominio y los cortes con los ejes antes de dibujar.",
      "Usa el vértice o el extremo del dominio para describir el recorrido y la monotonía."
    ],
    "solution": [
      {
        "body": "$f$ tiene dominio $\\mathbb R$ y recorrido $[-2,\\infty)$. Para $g$ se exige $(2x-1)/(3x+5)\\ge0$ y $x\\ne-5/3$; la tabla de signos da $(-\\infty,-5/3)\\cup[1/2,\\infty)$."
      },
      {
        "body": "$h$ tiene recorrido $[3,\\infty)$, vértice $(1,3)$, corte con $Y$ en $(0,4)$ y ninguno con $X$. Su parábola abre hacia arriba, decrece en $(-\\infty,1]$ y crece en $[1,\\infty)$; se obtiene trasladando $y=x^2$ una unidad a la derecha y tres arriba."
      }
    ],
    "finalAnswer": "$D_f=\\mathbb R$, $D_g=(-\\infty,-5/3)\\cup[1/2,\\infty)$, $R_f=[-2,\\infty)$ y $R_h=[3,\\infty)$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-a3fb7bb73240",
    "number": "38",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Vectores · perpendicularidad y distancia",
    "topic": "Vectores",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Considere los vectores $v=(2k,3,-2)$ y $w = (2,-3k,5)$ , donde $k \\in \\mathbb{R}$",
      "1. Determine el valor de $k$ para que $v$ y $w$ sean perpendiculares.",
      "2. Una vez encontrado el valor de $k$ , determine la distancia entre $v$ y $w$ ."
    ],
    "relatedTheory": [
      {
        "label": "Vectores",
        "href": "/cursos/introduccion-matematicas#intro-vectores-1"
      }
    ],
    "hints": [
      "Impón $v\\cdot w=0$.",
      "Sustituye el parámetro obtenido en ambos vectores.",
      "La distancia entre ellos es $\\|v-w\\|$."
    ],
    "solution": [
      {
        "body": "$v\\cdot w=4k-9k-10=-5k-10=0$ da $k=-2$. Entonces $v=(-4,3,-2)$ y $w=(2,6,5)$, con diferencia $(-6,-3,-7)$ de norma $\\sqrt{36+9+49}=\\sqrt{94}$."
      }
    ],
    "finalAnswer": "$k=-2$ y $d(v,w)=\\sqrt{94}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-f5cea27080f4",
    "number": "39",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Función trigonométrica · gráfica de seno transformado",
    "topic": "Trigonometría",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Considere la función:",
      "$$\\displaystyle f(x) = -\\sin\\left(3x+\\frac{3\\pi}{2}\\right)-1,$$ determine su amplitud, desplazamiento vertical, desplazamiento horizontal y periodo. Grafique un periodo de la función."
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Compara con $A\\sin(B(x-h))+D$ o $A\\cos(B(x-h))+D$.",
      "La amplitud es $|A|$ y el período $2\\pi/|B|$. El signo de $A$ refleja la gráfica respecto de su línea media.",
      "Marca cinco puntos separados por un cuarto de período y únelos con la forma suave del seno o coseno."
    ],
    "solution": [
      {
        "body": "La amplitud es $1$, la línea media $y=-1$, el período $T=2\\pi/3$ y el desplazamiento horizontal $h=-\\pi/2$. El desplazamiento vertical es $-1$. En efecto, $3x+3\\pi/2=3(x-(-\\pi/2))$."
      },
      {
        "body": "Un período se representa con los puntos $(-\\pi/2,-1),\\quad (-\\pi/3,-2),\\quad (-\\pi/6,-1),\\quad (0,0),\\quad (\\pi/6,-1)$. La curva oscila entre $-2$ y $0$ y se repite cada $T$."
      }
    ],
    "finalAnswer": "Amplitud $1$; período $2\\pi/3$; desplazamientos horizontal $-\\pi/2$ y vertical $-1$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-3ddd7750238d",
    "number": "40",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Problema de triángulos · ley de senos con ángulos de 60° y 45°",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Plantee y resuelva el siguiente problema: Hay tres puntos: $A$ , $B$ y $C$ , en el piso formando un triángulo. La distancia entre $A$ y $B$ es de 100 metros y los ángulos ubicados en los vértices A y C son $60^\\circ$ y $45^\\circ$ respectivamente. ¿Cuál es la distancia entre los puntos $A$ y $C$ ?"
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Calcula $B=180^\\circ-A-C$.",
      "Empareja $AB$ con $\\sin C$.",
      "Despeja $AC$ de la ley de senos."
    ],
    "solution": [
      {
        "body": "$B=75^\\circ$. Entonces $AC=100\\sin75^\\circ/\\sin45^\\circ=50(1+\\sqrt3)$ m."
      }
    ],
    "finalAnswer": "$AC=50(1+\\sqrt3)\\approx136.603$ m.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-a550d853b11f",
    "number": "41",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Vectores · representación desde el origen y ortogonalidad",
    "topic": "Vectores",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Dada las coordenadas $A=(1,1)$ , $B=(-3,1), C=(1,-2)$ y los vectores: $\\vec{p} = \\overrightarrow{AB}, \\vec{q}= \\overrightarrow{BC}$ y $\\vec{r} =\\overrightarrow{ AC}$ .",
      "Respecto de estos vectores $\\vec{p} , \\vec{q}$ y $\\vec{r},$ determine:",
      "1. Sus magnitudes.",
      "2. Los vectores asociados a cada uno de ellos, pero con punto inicial en el origen.",
      "3. Vectores unitarios asociados.",
      "4. El producto punto entre ellos.",
      "5. EL ángulo entre $\\vec{p}$ y $\\vec{r}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Vectores",
        "href": "/cursos/introduccion-matematicas#intro-vectores-1"
      }
    ],
    "hints": [
      "Calcula $B-A$, $C-B$ y $C-A$.",
      "Los mismos componentes representan los vectores con inicio en el origen.",
      "Un producto punto cero implica ángulo recto."
    ],
    "solution": [
      {
        "body": "$p=(-4,0)$, $q=(4,-3)$ y $r=(0,-3)$. Desde el origen terminan en esos mismos puntos. Sus normas son $4,5,3$ y los unitarios $(-1,0),(4/5,-3/5),(0,-1)$."
      },
      {
        "body": "$p\\cdot q=-16$, $p\\cdot r=0$, $q\\cdot r=9$; los productos consigo mismos son $16,25,9$. Como $p\\cdot r=0$, su ángulo es $90^\\circ$."
      }
    ],
    "finalAnswer": "Normas $4,5,3$; unitarios $(-1,0),(4/5,-3/5),(0,-1)$; ángulo entre $p,r$: $90^\\circ$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-ac007f1998c0",
    "number": "42",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Cálculo trigonométrico · ángulos complementarios",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Si $\\alpha, \\beta$ son ángulos agudos interiores de un triángulo rectángulo y ${\\cos(\\alpha)=\\dfrac{3}{5}}$ . Determine el valor de la siguiente expresión:",
      "$$\\frac{\\sin(2\\alpha)-3\\cos(2\\beta)}{\\tan(\\beta)+\\cot(\\alpha)}.$$"
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Como $\\alpha$ es agudo, $\\sin\\alpha=4/5$.",
      "Usa $\\beta=\\pi/2-\\alpha$, por lo que $\\cos(2\\beta)=-\\cos(2\\alpha)$.",
      "Calcula por separado el numerador y el denominador."
    ],
    "solution": [
      {
        "body": "$\\sin(2\\alpha)=24/25$, $\\cos(2\\alpha)=9/25-16/25=-7/25$, luego $\\cos(2\\beta)=7/25$. Además $\\tan\\beta=\\cot\\alpha=3/4$. La expresión es $(24/25-21/25)/(3/2)=2/25$."
      }
    ],
    "finalAnswer": "$2/25$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-9f29ce699774",
    "number": "43",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Ecuaciones trigonométricas · ángulo doble y factorización",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Resuelva las siguientes ecuaciones. Considere $x\\in \\mathbb{R}$ .",
      "1. $\\cos(x)=\\sin(2x)$ .",
      "2. $\\cos(2x)=\\sin(x)+1$",
      "3. $\\sqrt{3}\\tan(x/2)-1=0$",
      "4. $2\\cos^2(x)+\\sin(x)=1$"
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Usa $\\sin(2x)=2\\sin x\\cos x$ y $\\cos(2x)=1-2\\sin^2x$, cuando corresponda.",
      "Factoriza la ecuación; no dividas por un factor que podría ser cero.",
      "Encuentra las soluciones en una vuelta y añade la periodicidad; $k\\in\\mathbb Z$."
    ],
    "solution": [
      {
        "body": "1. $\\cos x=\\sin(2x)$ equivale a $\\cos x(1-2\\sin x)=0$. Por tanto $x=\\frac\\pi2+k\\pi$, $x=\\frac\\pi6+2k\\pi$ o $x=\\frac{5\\pi}6+2k\\pi$."
      },
      {
        "body": "2. $\\cos(2x)=\\sin x+1$ se convierte en $1-2\\sin^2x=\\sin x+1$, es decir $\\sin x(2\\sin x+1)=0$. Así $x=k\\pi$, $x=\\frac{7\\pi}6+2k\\pi$ o $x=\\frac{11\\pi}6+2k\\pi$."
      },
      {
        "body": "3. $\\sqrt3\\tan(x/2)=1$ da $x/2=\\pi/6+k\\pi$, luego $x=\\pi/3+2k\\pi$. Estos valores no anulan $\\cos(x/2)$."
      },
      {
        "body": "4. $2\\cos^2x+\\sin x=1$ se transforma en $2\\sin^2x-\\sin x-1=0$, o $(2\\sin x+1)(\\sin x-1)=0$. Las soluciones son $x=\\pi/2+2k\\pi$, $x=7\\pi/6+2k\\pi$ o $x=11\\pi/6+2k\\pi$."
      }
    ],
    "finalAnswer": "Las familias indicadas en cada inciso, con $k\\in\\mathbb Z$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-599b6399dd72",
    "number": "44",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Problema de alturas · estatua y ángulo doble",
    "topic": "Trigonometría",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Desde un punto del suelo plano, un observador divisa una estatua de 3 metros sobre un pedestal de 2 metros. Además, se sabe que el ángulo de elevación a la cabeza de la estatua es el doble que el ángulo de elevación a los pies de la estatua. Determine a qué distancia está el observador del pie del pedestal."
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Llama $d>0$ a la distancia horizontal y $\\theta$ al ángulo hacia los pies de la estatua.",
      "Plantea una ecuación para $\\tan\\theta$ y otra para $\\tan(2\\theta)$.",
      "Usa $\\tan(2\\theta)=2\\tan\\theta/(1-\\tan^2\\theta)$ y conserva solo distancias positivas."
    ],
    "solution": [
      {
        "body": "Si el pedestal mide $p=2$ y la estatua $s=3$, entonces $\\tan\\theta=p/d$ y $\\tan(2\\theta)=(p+s)/d$."
      },
      {
        "body": "Sustituyendo: $(p+s)/d=2(p/d)/(1-p^2/d^2)$, de donde $(s-p)d^2=(p+s)p^2$. Por tanto $d=p\\sqrt{(p+s)/(s-p)}$."
      },
      {
        "body": "Con los datos, $d=2\\sqrt5\\approx 4.472$ m. Se cumple $d>p$, por lo que $0<\\theta<45^\\circ$ y $2\\theta<90^\\circ$, como exige la geometría."
      }
    ],
    "finalAnswer": "La distancia horizontal es $2\\sqrt5$ m.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-4c76b4260565",
    "number": "45",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Problema de alturas · árbol y dos ángulos de elevación",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Plantee y resuelva el siguiente problema:",
      "Una persona parada a 150 metros horizontalmente hasta donde se ubica la cima de un cerro. Desde ahí se observa que el ángulo de elevación a la cima es $30^\\circ$ . Desde ese mismo punto también observa que el ángulo a un árbol que está sobre la cima es de $31^\\circ$ . Calcule la longitud del árbol.",
      "Debe dejar sus resultados redondeados al tercer decimal y se puede apoyar de un diagrama o dibujo."
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Dibuja dos triángulos rectángulos con la misma base horizontal.",
      "Usa $\\tan\\theta=\\text{altura}/\\text{distancia horizontal}$.",
      "La altura del objeto superior es la diferencia entre las dos alturas totales."
    ],
    "solution": [
      {
        "body": "El esquema tiene observador $O=(0,0)$, base $B=(150,0)$, punto inferior $C=(150,h)$ y extremo superior $D=(150,H)$. Las visuales $OC$ y $OD$ forman los ángulos dados con $OB$."
      },
      {
        "body": "$h=150\\tan(30^\\circ)\\approx 86.603$ m y $H=150\\tan(31^\\circ)\\approx 90.129$ m. La árbol mide $H-h\\approx 3.527$ m. Se redondea al final."
      }
    ],
    "finalAnswer": "Altura inferior: $86.603$ m; longitud de la árbol: $3.527$ m.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-131acaac0687",
    "number": "46",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Desigualdades · intervalos y valores absolutos",
    "topic": "Ecuaciones y álgebra",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Resuelva las siguientes desigualdades",
      "1. $\\dfrac{1}{6}<\\dfrac{2x-13}{12}\\leq \\dfrac{2}{3}$",
      "2. $3x^2-3x<2x^2+4$",
      "3. $\\left|\\dfrac{x+1}{2}\\right|\\geq 4$",
      "4. $\\dfrac{x+2}{x+3}<\\dfrac{x-1}{x-2}$",
      "5. $-\\dfrac{1}{2}<\\dfrac{4-3x}{5}\\leq \\dfrac{1}{4}$",
      "6. $5x^2+3x\\geq 3x^2+2$",
      "7. $\\dfrac{x}{x+1}>3$",
      "8. $\\left|\\dfrac{x-2}{3}\\right|<2$",
      "9. $\\dfrac{1}{x+1}+\\dfrac{1}{x+2}\\leq 0$"
    ],
    "relatedTheory": [
      {
        "label": "Ecuaciones y álgebra",
        "href": "/cursos/introduccion-matematicas#intro-ecuaciones-1"
      }
    ],
    "hints": [
      "Anota las restricciones de denominadores y argumentos de logaritmos. Aquí $\\log$ sin base se interpreta en base diez.",
      "Lleva todo a un lado y factoriza; para valores absolutos separa los casos necesarios.",
      "En desigualdades racionales usa una tabla de signos; no multipliques por una expresión de signo desconocido."
    ],
    "solution": [
      {
        "body": "1. Multiplicando por $12>0$: $2<2x-13\\le8$, por lo que $15/2<x\\le21/2$."
      },
      {
        "body": "2. $(x-4)(x+1)<0$. La tabla de signos da $-1<x<4$."
      },
      {
        "body": "3. $|x+1|\\ge8$ equivale a $x+1\\le-8$ o $x+1\\ge8$. Solución $(-\\infty,-9]\\cup[7,\\infty)$."
      },
      {
        "body": "4. Se excluyen $-3,2$. La diferencia de fracciones es $(-2x-1)/((x+3)(x-2))$. Su signo es negativo en $(-3,-1/2)$ y $(2,\\infty)$; esos son los intervalos solución."
      },
      {
        "body": "5. Multiplicando por $20$: $-10<16-12x\\le5$. Al despejar y cambiar el sentido al dividir por $-12$, resulta $11/12\\le x<13/6$."
      },
      {
        "body": "6. $(2x-1)(x+2)\\ge0$ da $(-\\infty,-2]\\cup[1/2,\\infty)$."
      },
      {
        "body": "7. Con $x\\ne-1$, $x/(x+1)-3=(-2x-3)/(x+1)>0$. Solución $(-3/2,-1)$."
      },
      {
        "body": "8. $|x-2|<6$ equivale a $-6<x-2<6$, luego $-4<x<8$."
      },
      {
        "body": "9. Se excluyen $-2,-1$. Sumando, $(2x+3)/((x+1)(x+2))\\le0$. Los puntos críticos son $-2,-3/2,-1$; solución $(-\\infty,-2)\\cup[-3/2,-1)$."
      }
    ],
    "finalAnswer": "Los conjuntos solución de cada inciso se indican en su desarrollo; se excluyen siempre los valores fuera del dominio original.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-757fc782b09d",
    "number": "47",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Identidades trigonométricas · cocientes y reciprocidad",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Demuestre las siguientes identidades trigonométricas:",
      "1. $\\dfrac{\\tan(\\alpha)-\\cot(\\alpha)}{1-2\\cos^2(\\alpha)}=\\tan(\\alpha)+\\cot(\\alpha).$",
      "2. $\\cot(x) \\cos(x) + \\sin(x) = \\csc(x).$"
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Escribe tangente y cotangente como cocientes de seno y coseno.",
      "Lleva los términos a un denominador común y usa $\\sin^2x+\\cos^2x=1$.",
      "La igualdad debe demostrarse solo donde las expresiones originales estén definidas."
    ],
    "solution": [
      {
        "body": "Donde la expresión original está definida ($\\sin\\alpha\\ne0$, $\\cos\\alpha\\ne0$ y $1-2\\cos^2\\alpha\\ne0$), $\\tan\\alpha-\\cot\\alpha=\\frac{\\sin^2\\alpha-\\cos^2\\alpha}{\\sin\\alpha\\cos\\alpha}=\\frac{1-2\\cos^2\\alpha}{\\sin\\alpha\\cos\\alpha}$. Al dividir por $1-2\\cos^2\\alpha$ queda $1/(\\sin\\alpha\\cos\\alpha)=\\tan\\alpha+\\cot\\alpha$."
      },
      {
        "body": "Para $\\sin x\\ne0$, $\\cot x\\cos x+\\sin x=\\frac{\\cos^2x}{\\sin x}+\\sin x=\\frac{\\cos^2x+\\sin^2x}{\\sin x}=\\frac1{\\sin x}=\\csc x$."
      }
    ],
    "finalAnswer": "Ambas igualdades se cumplen en sus respectivos dominios.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-9460063d45f6",
    "number": "48",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Ecuaciones trigonométricas · ángulo doble y factorización",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Resuelva las siguientes ecuaciones. Considere $x\\in \\mathbb{R}$ .",
      "1. $\\sqrt{3}\\tan(x/2)-1=0$",
      "2. $2\\cos^2(x)+\\sin(x)=1$"
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Usa $\\sin(2x)=2\\sin x\\cos x$ y $\\cos(2x)=1-2\\sin^2x$, cuando corresponda.",
      "Factoriza la ecuación; no dividas por un factor que podría ser cero.",
      "Encuentra las soluciones en una vuelta y añade la periodicidad; $k\\in\\mathbb Z$."
    ],
    "solution": [
      {
        "body": "1. $\\sqrt3\\tan(x/2)=1$ da $x/2=\\pi/6+k\\pi$, luego $x=\\pi/3+2k\\pi$. Estos valores no anulan $\\cos(x/2)$."
      },
      {
        "body": "2. $2\\cos^2x+\\sin x=1$ se transforma en $2\\sin^2x-\\sin x-1=0$, o $(2\\sin x+1)(\\sin x-1)=0$. Las soluciones son $x=\\pi/2+2k\\pi$, $x=7\\pi/6+2k\\pi$ o $x=11\\pi/6+2k\\pi$."
      }
    ],
    "finalAnswer": "Las familias indicadas en cada inciso, con $k\\in\\mathbb Z$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-44994f6601d6",
    "number": "49",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Problema de alturas · estatua y ángulo doble",
    "topic": "Trigonometría",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Desde un punto del suelo plano, un observador divisa una estatua de 5 metros sobre un pedestal de 4 metros. Además, se sabe que el ángulo de elevación a la cabeza de la estatua es el doble que el ángulo de elevación a los pies de la estatua. Determine a qué distancia está el observador del pie del pedestal."
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Llama $d>0$ a la distancia horizontal y $\\theta$ al ángulo hacia los pies de la estatua.",
      "Plantea una ecuación para $\\tan\\theta$ y otra para $\\tan(2\\theta)$.",
      "Usa $\\tan(2\\theta)=2\\tan\\theta/(1-\\tan^2\\theta)$ y conserva solo distancias positivas."
    ],
    "solution": [
      {
        "body": "Si el pedestal mide $p=4$ y la estatua $s=5$, entonces $\\tan\\theta=p/d$ y $\\tan(2\\theta)=(p+s)/d$."
      },
      {
        "body": "Sustituyendo: $(p+s)/d=2(p/d)/(1-p^2/d^2)$, de donde $(s-p)d^2=(p+s)p^2$. Por tanto $d=p\\sqrt{(p+s)/(s-p)}$."
      },
      {
        "body": "Con los datos, $d=12\\approx 12.000$ m. Se cumple $d>p$, por lo que $0<\\theta<45^\\circ$ y $2\\theta<90^\\circ$, como exige la geometría."
      }
    ],
    "finalAnswer": "La distancia horizontal es $12$ m.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-46c41badeddd",
    "number": "50",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Problema de alturas · antena y dos ángulos de elevación",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Plantee y resuelva el siguiente problema:",
      "Una persona parada a 70 metros de un edificio observa que el ángulo de elevación a la cima del edificio es de $32^\\circ$ . Desde ese mismo punto también observa que el ángulo a una antena que está sobre el edificio es de $33^\\circ$ . Determine la altura del edificio y la longitud de la antena.",
      "Debe dejar sus resultados redondeados al tercer decimal y se puede apoyar de un diagrama o dibujo."
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Dibuja dos triángulos rectángulos con la misma base horizontal.",
      "Usa $\\tan\\theta=\\text{altura}/\\text{distancia horizontal}$.",
      "La altura del objeto superior es la diferencia entre las dos alturas totales."
    ],
    "solution": [
      {
        "body": "El esquema tiene observador $O=(0,0)$, base $B=(70,0)$, punto inferior $C=(70,h)$ y extremo superior $D=(70,H)$. Las visuales $OC$ y $OD$ forman los ángulos dados con $OB$."
      },
      {
        "body": "$h=70\\tan(32^\\circ)\\approx 43.741$ m y $H=70\\tan(33^\\circ)\\approx 45.459$ m. La antena mide $H-h\\approx 1.718$ m. Se redondea al final."
      }
    ],
    "finalAnswer": "Altura inferior: $43.741$ m; longitud de la antena: $1.718$ m.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-73b0b5e85343",
    "number": "51",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Desigualdades · seis tablas de signos",
    "topic": "Ecuaciones y álgebra",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Resuelva las siguientes desigualdades",
      "1. $3x^2-3x<2x^2+4$",
      "2. $\\dfrac{x-4}{2x+1}<5$",
      "3. $\\dfrac{x+2}{x+3}<\\dfrac{x-1}{x-2}$",
      "4. $-\\dfrac{1}{2}<\\dfrac{4-3x}{5}\\leq \\dfrac{1}{4}$",
      "5. $\\left|\\dfrac{x-2}{3}\\right|<2$",
      "6. $\\dfrac{1}{x+1}+\\dfrac{1}{x+2}\\leq 0$"
    ],
    "relatedTheory": [
      {
        "label": "Ecuaciones y álgebra",
        "href": "/cursos/introduccion-matematicas#intro-ecuaciones-1"
      }
    ],
    "hints": [
      "Anota las restricciones de denominadores y argumentos de logaritmos. Aquí $\\log$ sin base se interpreta en base diez.",
      "Lleva todo a un lado y factoriza; para valores absolutos separa los casos necesarios.",
      "En desigualdades racionales usa una tabla de signos; no multipliques por una expresión de signo desconocido."
    ],
    "solution": [
      {
        "body": "1. $(x-4)(x+1)<0$. La tabla de signos da $-1<x<4$."
      },
      {
        "body": "2. Se excluye $x=-1/2$. La desigualdad se reduce a $-9(x+1)/(2x+1)<0$, o $(x+1)/(2x+1)>0$. Solución $(-\\infty,-1)\\cup(-1/2,\\infty)$."
      },
      {
        "body": "3. Se excluyen $-3,2$. La diferencia de fracciones es $(-2x-1)/((x+3)(x-2))$. Su signo es negativo en $(-3,-1/2)$ y $(2,\\infty)$; esos son los intervalos solución."
      },
      {
        "body": "4. Multiplicando por $20$: $-10<16-12x\\le5$. Al despejar y cambiar el sentido al dividir por $-12$, resulta $11/12\\le x<13/6$."
      },
      {
        "body": "5. $|x-2|<6$ equivale a $-6<x-2<6$, luego $-4<x<8$."
      },
      {
        "body": "6. Se excluyen $-2,-1$. Sumando, $(2x+3)/((x+1)(x+2))\\le0$. Los puntos críticos son $-2,-3/2,-1$; solución $(-\\infty,-2)\\cup[-3/2,-1)$."
      }
    ],
    "finalAnswer": "Los conjuntos solución de cada inciso se indican en su desarrollo; se excluyen siempre los valores fuera del dominio original.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-1ae2dc558d55",
    "number": "52",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Cálculo trigonométrico · signos en el tercer cuadrante",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Si $\\cot (\\theta) = \\frac{1}{5}$ con $\\theta$ en el tercer cuadrante, calcule el valor exacto de",
      "$$\\displaystyle \\frac{\\sin^2\\left( \\frac{3\\pi}{4} \\right) - \\cos(\\theta)}{3\\sin(\\theta)},$$",
      "sin usar calculadora."
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "En el tercer cuadrante seno y coseno son negativos.",
      "Usa $\\cot\\theta=\\cos\\theta/\\sin\\theta=1/5$ y la identidad pitagórica.",
      "Sustituye $\\sin^2(3\\pi/4)=1/2$."
    ],
    "solution": [
      {
        "body": "$\\cos\\theta=-1/\\sqrt{26}$ y $\\sin\\theta=-5/\\sqrt{26}$. Por tanto $\\frac{1/2+1/\\sqrt{26}}{-15/\\sqrt{26}}=-\\frac{\\sqrt{26}+2}{30}$."
      }
    ],
    "finalAnswer": "$-(\\sqrt{26}+2)/30$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-8e1b70d39fd9",
    "number": "53",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Problema de alturas · antena y dos ángulos de elevación",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Plantee y resuelva el siguiente problema:",
      "Una persona parada a 100 metros de un edificio observa que el ángulo de elevación a la cima del edificio es de $40^\\circ$ . Desde ese mismo punto también observa que el ángulo a una antena que está sobre el edificio es de $42^\\circ$ . Determine la altura del edificio y la longitud de la antena.",
      "Debe dejar sus resultados redondeados al tercer decimal y se puede apoyar de un diagrama o dibujo."
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Dibuja dos triángulos rectángulos con la misma base horizontal.",
      "Usa $\\tan\\theta=\\text{altura}/\\text{distancia horizontal}$.",
      "La altura del objeto superior es la diferencia entre las dos alturas totales."
    ],
    "solution": [
      {
        "body": "El esquema tiene observador $O=(0,0)$, base $B=(100,0)$, punto inferior $C=(100,h)$ y extremo superior $D=(100,H)$. Las visuales $OC$ y $OD$ forman los ángulos dados con $OB$."
      },
      {
        "body": "$h=100\\tan(40^\\circ)\\approx 83.910$ m y $H=100\\tan(42^\\circ)\\approx 90.040$ m. La antena mide $H-h\\approx 6.130$ m. Se redondea al final."
      }
    ],
    "finalAnswer": "Altura inferior: $83.910$ m; longitud de la antena: $6.130$ m.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-e81b12b19f98",
    "number": "54",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Sistema lineal · restar ecuaciones",
    "topic": "Ecuaciones y álgebra",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Resuelva el siguiente sistema de ecuaciones:",
      "$$\\begin{aligned} x + y +z &= 4 \\\\ 2x + 5y - z &= 3\\\\ x + 2y + z &= 8 \\end{aligned}$$"
    ],
    "relatedTheory": [
      {
        "label": "Ecuaciones y álgebra",
        "href": "/cursos/introduccion-matematicas#intro-ecuaciones-1"
      }
    ],
    "hints": [
      "Resta ecuaciones o despeja una variable para reducir el sistema.",
      "Resuelve las dos ecuaciones restantes y recupera la variable eliminada.",
      "Comprueba la terna obtenida en las tres ecuaciones originales."
    ],
    "solution": [
      {
        "body": "Restar la primera ecuación de la tercera da $y=4$. Entonces $x+z=0$ y $2x-z=-17$, de donde $x=-17/3$ y $z=17/3$."
      }
    ],
    "finalAnswer": "$(x,y,z)=(-17/3,4,17/3)$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-0dc79756a1bf",
    "number": "55",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Desigualdad racional con un punto excluido",
    "topic": "Ecuaciones y álgebra",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Resuelva la siguiente desigualdad",
      "$$\\dfrac{x-4}{2x+1}<5,$$",
      "escribiendo las restricciones de la expresión."
    ],
    "relatedTheory": [
      {
        "label": "Ecuaciones y álgebra",
        "href": "/cursos/introduccion-matematicas#intro-ecuaciones-1"
      }
    ],
    "hints": [
      "Anota las restricciones de denominadores y argumentos de logaritmos. Aquí $\\log$ sin base se interpreta en base diez.",
      "Lleva todo a un lado y factoriza; para valores absolutos separa los casos necesarios.",
      "En desigualdades racionales usa una tabla de signos; no multipliques por una expresión de signo desconocido."
    ],
    "solution": [
      {
        "body": "Se excluye $x=-1/2$. La desigualdad se reduce a $-9(x+1)/(2x+1)<0$, o $(x+1)/(2x+1)>0$. Solución $(-\\infty,-1)\\cup(-1/2,\\infty)$."
      }
    ],
    "finalAnswer": "$x\\in(-\\infty,-1)\\cup(-1/2,\\infty)$; restricción original $x\\ne-1/2$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-e24393775350",
    "number": "56",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Ecuación trigonométrica · tangente al cuadrado",
    "topic": "Trigonometría",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine los valores del ángulo x que hacen verdadera la expresión:",
      "$$\\frac{(1-\\cos^2(x))}{\\cos^2(x)}-3=0$$"
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Sustituye $1-\\cos^2x$ por $\\sin^2x$.",
      "Obtendrás $\\tan^2x=3$.",
      "Considera ambos signos de la tangente y su período $\\pi$."
    ],
    "solution": [
      {
        "body": "El dominio exige $\\cos x\\ne0$. La ecuación equivale a $\\tan x=\\pm\\sqrt3$. Por tanto $x=\\pi/3+k\\pi$ o $x=-\\pi/3+k\\pi$, con $k\\in\\mathbb Z$; todos estos valores cumplen el dominio."
      }
    ],
    "finalAnswer": "$x=\\pm\\pi/3+k\\pi$, $k\\in\\mathbb Z$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-031b6e35088d",
    "number": "57",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Desigualdades · cuatro casos",
    "topic": "Ecuaciones y álgebra",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Resuelva las siguientes desigualdades",
      "1. $-\\dfrac{1}{2}<\\dfrac{4-3x}{5}\\leq \\dfrac{1}{4}$",
      "2. $5x^2+3x\\geq 3x^2+2$",
      "3. $\\left|\\dfrac{x-2}{3}\\right|<2$",
      "4. $\\dfrac{1}{x+1}+\\dfrac{1}{x+2}\\leq 0$"
    ],
    "relatedTheory": [
      {
        "label": "Ecuaciones y álgebra",
        "href": "/cursos/introduccion-matematicas#intro-ecuaciones-1"
      }
    ],
    "hints": [
      "Anota las restricciones de denominadores y argumentos de logaritmos. Aquí $\\log$ sin base se interpreta en base diez.",
      "Lleva todo a un lado y factoriza; para valores absolutos separa los casos necesarios.",
      "En desigualdades racionales usa una tabla de signos; no multipliques por una expresión de signo desconocido."
    ],
    "solution": [
      {
        "body": "1. Multiplicando por $20$: $-10<16-12x\\le5$. Al despejar y cambiar el sentido al dividir por $-12$, resulta $11/12\\le x<13/6$."
      },
      {
        "body": "2. $(2x-1)(x+2)\\ge0$ da $(-\\infty,-2]\\cup[1/2,\\infty)$."
      },
      {
        "body": "3. $|x-2|<6$ equivale a $-6<x-2<6$, luego $-4<x<8$."
      },
      {
        "body": "4. Se excluyen $-2,-1$. Sumando, $(2x+3)/((x+1)(x+2))\\le0$. Los puntos críticos son $-2,-3/2,-1$; solución $(-\\infty,-2)\\cup[-3/2,-1)$."
      }
    ],
    "finalAnswer": "Los conjuntos solución de cada inciso se indican en su desarrollo; se excluyen siempre los valores fuera del dominio original.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-a350e20b75ed",
    "number": "58",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Problema de alturas · antena y dos ángulos de elevación",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Plantee y resuelva el siguiente problema:",
      "Una persona parada a 40 metros de un edificio observa que el ángulo de elevación a la cima del edificio es de $35^\\circ$ . Desde ese mismo punto también observa que el ángulo a una antena que está sobre el edificio es de $38^\\circ$ . Determine la altura del edificio y la longitud de la antena.",
      "Debe dejar sus resultados redondeados al tercer decimal y se puede apoyar de un diagrama o dibujo."
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Dibuja dos triángulos rectángulos con la misma base horizontal.",
      "Usa $\\tan\\theta=\\text{altura}/\\text{distancia horizontal}$.",
      "La altura del objeto superior es la diferencia entre las dos alturas totales."
    ],
    "solution": [
      {
        "body": "El esquema tiene observador $O=(0,0)$, base $B=(40,0)$, punto inferior $C=(40,h)$ y extremo superior $D=(40,H)$. Las visuales $OC$ y $OD$ forman los ángulos dados con $OB$."
      },
      {
        "body": "$h=40\\tan(35^\\circ)\\approx 28.008$ m y $H=40\\tan(38^\\circ)\\approx 31.251$ m. La antena mide $H-h\\approx 3.243$ m. Se redondea al final."
      }
    ],
    "finalAnswer": "Altura inferior: $28.008$ m; longitud de la antena: $3.243$ m.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-ea28df13e881",
    "number": "59",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Identidad trigonométrica · cotangente y cosecante",
    "topic": "Trigonometría",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Demuestre la siguiente identidad:",
      "$$\\cot(x) \\cos(x) + \\sin(x) = \\csc(x).$$"
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Escribe tangente y cotangente como cocientes de seno y coseno.",
      "Lleva los términos a un denominador común y usa $\\sin^2x+\\cos^2x=1$.",
      "La igualdad debe demostrarse solo donde las expresiones originales estén definidas."
    ],
    "solution": [
      {
        "body": "Para $\\sin x\\ne0$, $\\cot x\\cos x+\\sin x=\\frac{\\cos^2x}{\\sin x}+\\sin x=\\frac{\\cos^2x+\\sin^2x}{\\sin x}=\\frac1{\\sin x}=\\csc x$."
      }
    ],
    "finalAnswer": "La identidad es válida para $x\\notin\\pi\\mathbb Z$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-2417059a22d4",
    "number": "60",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Función trigonométrica · gráfica de seno transformado",
    "topic": "Trigonometría",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Considere la función:",
      "$$\\displaystyle f(x) = -3\\sin\\left(2x+\\frac{2\\pi}{3}\\right)+4,$$ determine su amplitud, desplazamiento vertical, desplazamiento horizontal y periodo. Grafique un periodo de la función."
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Compara con $A\\sin(B(x-h))+D$ o $A\\cos(B(x-h))+D$.",
      "La amplitud es $|A|$ y el período $2\\pi/|B|$. El signo de $A$ refleja la gráfica respecto de su línea media.",
      "Marca cinco puntos separados por un cuarto de período y únelos con la forma suave del seno o coseno."
    ],
    "solution": [
      {
        "body": "La amplitud es $3$, la línea media $y=4$, el período $T=2\\pi/2$ y el desplazamiento horizontal $h=-\\pi/3$. El desplazamiento vertical es $4$. En efecto, $2x+2\\pi/3=2(x-(-\\pi/3))$."
      },
      {
        "body": "Un período se representa con los puntos $(-\\pi/3,4),\\quad (-\\pi/12,1),\\quad (\\pi/6,4),\\quad (5\\pi/12,7),\\quad (2\\pi/3,4)$. La curva oscila entre $1$ y $7$ y se repite cada $T$."
      }
    ],
    "finalAnswer": "Amplitud $3$; período $2\\pi/2$; desplazamientos horizontal $-\\pi/3$ y vertical $4$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-e67de0d54f98",
    "number": "61",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Desigualdades · restricciones y valores absolutos",
    "topic": "Ecuaciones y álgebra",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Resuelva las siguientes desigualdades",
      "1. $\\dfrac{1}{6}<\\dfrac{2x-13}{12}\\leq \\dfrac{2}{3}$",
      "2. $3x^2-3x<2x^2+4$",
      "3. $\\left|\\dfrac{x+1}{2}\\right|\\geq 4$",
      "4. $\\dfrac{x+2}{x+3}<\\dfrac{x-1}{x-2}$"
    ],
    "relatedTheory": [
      {
        "label": "Ecuaciones y álgebra",
        "href": "/cursos/introduccion-matematicas#intro-ecuaciones-1"
      }
    ],
    "hints": [
      "Anota las restricciones de denominadores y argumentos de logaritmos. Aquí $\\log$ sin base se interpreta en base diez.",
      "Lleva todo a un lado y factoriza; para valores absolutos separa los casos necesarios.",
      "En desigualdades racionales usa una tabla de signos; no multipliques por una expresión de signo desconocido."
    ],
    "solution": [
      {
        "body": "1. Multiplicando por $12>0$: $2<2x-13\\le8$, por lo que $15/2<x\\le21/2$."
      },
      {
        "body": "2. $(x-4)(x+1)<0$. La tabla de signos da $-1<x<4$."
      },
      {
        "body": "3. $|x+1|\\ge8$ equivale a $x+1\\le-8$ o $x+1\\ge8$. Solución $(-\\infty,-9]\\cup[7,\\infty)$."
      },
      {
        "body": "4. Se excluyen $-3,2$. La diferencia de fracciones es $(-2x-1)/((x+3)(x-2))$. Su signo es negativo en $(-3,-1/2)$ y $(2,\\infty)$; esos son los intervalos solución."
      }
    ],
    "finalAnswer": "Los conjuntos solución de cada inciso se indican en su desarrollo; se excluyen siempre los valores fuera del dominio original.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-3aac4664bc51",
    "number": "62",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Cálculo trigonométrico · signos en el segundo cuadrante",
    "topic": "Trigonometría",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Si $\\displaystyle \\sin(\\theta) = \\frac{2}{7}$ con $\\theta$ en el segundo cuadrante, calcule el valor exacto de",
      "$$\\displaystyle \\frac{\\sin^2\\left(-\\frac{\\pi}{3}\\right) + 2\\cos(\\theta)}{\\tan(\\theta)},$$",
      "sin usar calculadora."
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "En el segundo cuadrante el coseno es negativo.",
      "Calcula $\\cos\\theta$ con la identidad pitagórica y después $\\tan\\theta$.",
      "Usa $\\sin^2(-\\pi/3)=3/4$."
    ],
    "solution": [
      {
        "body": "$\\cos\\theta=-\\sqrt{1-4/49}=-3\\sqrt5/7$ y $\\tan\\theta=-2/(3\\sqrt5)$. La expresión vale $(3/4-6\\sqrt5/7)(-3\\sqrt5/2)=45/7-9\\sqrt5/8$."
      }
    ],
    "finalAnswer": "$45/7-9\\sqrt5/8$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-f085b03e1361",
    "number": "63",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Identidad trigonométrica · secante al cuadrado",
    "topic": "Trigonometría",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Demuestre la siguiente identidad",
      "$$\\displaystyle \\frac{\\cos^2(x)(1+\\tan^2(x))}{\\cot(x)} = \\tan(x).$$"
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Usa $1+\\tan^2x=\\sec^2x$.",
      "Simplifica $\\cos^2x\\sec^2x$.",
      "Recuerda que $1/\\cot x=\\tan x$ donde la expresión original está definida."
    ],
    "solution": [
      {
        "body": "Para $\\sin x\\ne0$ y $\\cos x\\ne0$, $\\frac{\\cos^2x(1+\\tan^2x)}{\\cot x}=\\frac{\\cos^2x\\sec^2x}{\\cot x}=\\frac1{\\cot x}=\\tan x$."
      }
    ],
    "finalAnswer": "La identidad se cumple si $\\sin x\\cos x\\ne0$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-6251b77c9ea7",
    "number": "64",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Función trigonométrica · gráfica de coseno transformado",
    "topic": "Trigonometría",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Considere la función:",
      "$$\\displaystyle f(x) = -2\\cos\\left(3x+\\frac{3\\pi}{4}\\right)-4,$$ determine su amplitud, desplazamiento vertical, desplazamiento horizontal y periodo. Grafique un periodo de la función."
    ],
    "relatedTheory": [
      {
        "label": "Trigonometría",
        "href": "/cursos/introduccion-matematicas#intro-trigonometria-1"
      }
    ],
    "hints": [
      "Compara con $A\\sin(B(x-h))+D$ o $A\\cos(B(x-h))+D$.",
      "La amplitud es $|A|$ y el período $2\\pi/|B|$. El signo de $A$ refleja la gráfica respecto de su línea media.",
      "Marca cinco puntos separados por un cuarto de período y únelos con la forma suave del seno o coseno."
    ],
    "solution": [
      {
        "body": "La amplitud es $2$, la línea media $y=-4$, el período $T=2\\pi/3$ y el desplazamiento horizontal $h=-\\pi/4$. El desplazamiento vertical es $-4$. En efecto, $3x+3\\pi/4=3(x-(-\\pi/4))$."
      },
      {
        "body": "Un período se representa con los puntos $(-\\pi/4,-6),\\quad (-\\pi/12,-4),\\quad (\\pi/12,-2),\\quad (\\pi/4,-4),\\quad (5\\pi/12,-6)$. La curva oscila entre $-6$ y $-2$ y se repite cada $T$."
      }
    ],
    "finalAnswer": "Amplitud $2$; período $2\\pi/3$; desplazamientos horizontal $-\\pi/4$ y vertical $-4$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-78bb832781a0",
    "number": "65",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Raíces de un polinomio por agrupación",
    "topic": "Polinomios",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Encuentre todas las raíces del polinomio: $$x^5 - 3 x^4 + 2 x^3 - 6 x^2 + x - 3$$"
    ],
    "relatedTheory": [
      {
        "label": "Polinomios",
        "href": "/cursos/introduccion-matematicas#intro-polinomios-1"
      }
    ],
    "hints": [
      "Agrupa cada par de términos para extraer $x-3$.",
      "El factor restante es un cuadrado perfecto en $x^2$.",
      "Busca también las raíces complejas y sus multiplicidades."
    ],
    "solution": [
      {
        "body": "$p=(x-3)(x^4+2x^2+1)=(x-3)(x^2+1)^2=(x-3)(x-i)^2(x+i)^2$."
      }
    ],
    "finalAnswer": "Raíces: $3$ simple; $i$ y $-i$ dobles. La única real es $3$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-53597c80efef",
    "number": "66",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Fracciones parciales · factores repetidos lineales y cuadráticos",
    "topic": "Fracciones parciales",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "En cada caso, separe en fracciones parciales la fracción dada",
      "1. $\\displaystyle \\frac{5x - 2}{x^3 - 3x^2 + 3x - 1}$",
      "2. $\\displaystyle \\frac{7x + 8}{x^5 - 3 x^4 + 2 x^3 - 6 x^2 + x - 3}$"
    ],
    "relatedTheory": [
      {
        "label": "Fracciones parciales",
        "href": "/cursos/introduccion-matematicas#intro-polinomios-6"
      }
    ],
    "hints": [
      "Factoriza completamente los denominadores sobre los reales.",
      "Incluye un término por cada potencia de cada factor; en factores cuadráticos usa numerador lineal.",
      "Multiplica por el denominador común e iguala coeficientes."
    ],
    "solution": [
      {
        "body": "1. El denominador es $(x-1)^3$ y $5x-2=5(x-1)+3$. Por tanto la descomposición es $5/(x-1)^2+3/(x-1)^3$; el coeficiente de $1/(x-1)$ es cero."
      },
      {
        "body": "2. El denominador es $(x-3)(x^2+1)^2$. Plantea $A/(x-3)+(Bx+C)/(x^2+1)+(Dx+E)/(x^2+1)^2$. Al multiplicar e igualar coeficientes se obtiene $A=29/100$, $B=-29/100$, $C=-87/100$, $D=-29/10$, $E=-17/10$."
      },
      {
        "body": "La identidad polinómica verificable es $7x+8=A(x^2+1)^2+(Bx+C)(x-3)(x^2+1)+(Dx+E)(x-3)$."
      }
    ],
    "finalAnswer": "1. $\\frac5{(x-1)^2}+\\frac3{(x-1)^3}$. 2. $\\frac{29}{100(x-3)}-\\frac{29x+87}{100(x^2+1)}-\\frac{29x+17}{10(x^2+1)^2}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-5761b4d81e46",
    "number": "67",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Polinomio con resto prescrito y raíces complejas",
    "topic": "Polinomios",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine el valor de $k$ en el polinomio ${p(x)=x^3-2x^2+kx-2}$ de modo que al dividir $p(x)$ por $(x-2)$ se tenga resto 4. Luego encuentre todas las raíces de $p(x).$"
    ],
    "relatedTheory": [
      {
        "label": "Polinomios",
        "href": "/cursos/introduccion-matematicas#intro-polinomios-1"
      }
    ],
    "hints": [
      "El resto al dividir por $x-2$ es $p(2)$.",
      "Impón $p(2)=4$ y despeja $k$.",
      "Prueba una raíz racional y factoriza el cociente cuadrático."
    ],
    "solution": [
      {
        "body": "$p(2)=8-8+2k-2=4$ da $k=3$. Entonces $p=x^3-2x^2+3x-2=(x-1)(x^2-x+2)$. El factor cuadrático tiene discriminante $-7$."
      }
    ],
    "finalAnswer": "$k=3$; raíces $1,(1+i\\sqrt7)/2,(1-i\\sqrt7)/2$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-66d1f44e107c",
    "number": "68",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Raíces cúbicas de un complejo negativo",
    "topic": "Números complejos",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Considere el número complejo $z=-8$ .",
      "1. Encuentre su forma polar.",
      "2. Determine todas sus raíces cúbicas y grafíquelas en el plano de Argand."
    ],
    "relatedTheory": [
      {
        "label": "Números complejos",
        "href": "/cursos/introduccion-matematicas#intro-complejos-1"
      }
    ],
    "hints": [
      "El módulo de $-8$ es $8$ y un argumento es $\\pi$.",
      "Las raíces tienen módulo $2$ y argumentos $(\\pi+2k\\pi)/3$.",
      "Usa $k=0,1,2$ y ubica las coordenadas reales e imaginarias."
    ],
    "solution": [
      {
        "body": "$-8=8(\\cos\\pi+i\\sin\\pi)$. Sus raíces son $2(\\cos(\\pi/3+2k\\pi/3)+i\\sin(\\pi/3+2k\\pi/3))$, $k=0,1,2$."
      },
      {
        "body": "En forma canónica: $1+i\\sqrt3,-2,1-i\\sqrt3$. En el plano de Argand se ubican en $(1,\\sqrt3),(-2,0),(1,-\\sqrt3)$, sobre el círculo de radio $2$, separadas por $120^\\circ$."
      }
    ],
    "finalAnswer": "Forma polar $8(\\cos\\pi+i\\sin\\pi)$; raíces $-2,1\\pm i\\sqrt3$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-106c4d922912",
    "number": "69",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Un cociente de potencias complejas",
    "topic": "Números complejos",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Simplifique $\\dfrac{(1+i)^3}{1+i^3}$"
    ],
    "relatedTheory": [
      {
        "label": "Números complejos",
        "href": "/cursos/introduccion-matematicas#intro-complejos-1"
      }
    ],
    "hints": [
      "Recuerda que $i^2=-1$ y $i^3=-i$.",
      "Desarrolla $(1+i)^3$.",
      "Comprueba si el numerador es un múltiplo de $1-i$."
    ],
    "solution": [
      {
        "body": "$(1+i)^2=2i$, luego $(1+i)^3=-2+2i=-2(1-i)$. El denominador es $1+i^3=1-i\\ne0$, así que el cociente es $-2$."
      }
    ],
    "finalAnswer": "$-2$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-535904b7a9e9",
    "number": "70",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Una potencia del módulo",
    "topic": "Números complejos",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Demuestre que $|2 + 3i|^{2000} = 13^{1000}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Números complejos",
        "href": "/cursos/introduccion-matematicas#intro-complejos-1"
      }
    ],
    "hints": [
      "Calcula primero $|2+3i|$.",
      "Usa $|a+bi|=\\sqrt{a^2+b^2}$.",
      "Escribe $2000=2\\cdot1000$."
    ],
    "solution": [
      {
        "body": "$|2+3i|=\\sqrt{2^2+3^2}=\\sqrt{13}$. Por tanto $|2+3i|^{2000}=(\\sqrt{13})^{2000}=13^{1000}$."
      }
    ],
    "finalAnswer": "$|2+3i|^{2000}=13^{1000}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-a3669395d762",
    "number": "71",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Operaciones complejas · conjugados e inversos",
    "topic": "Números complejos",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $z_1 = 3 - 2i$ y $z_2 = 1 + 4i$ . Calcule las siguientes expresiones y escriba el resultado en su forma canónica:",
      "1. $\\dfrac{z_1 \\cdot \\overline{z_2}}{z_2}$ .",
      "2. $z_1^{-1}\\cdot z_2^{-1}$ .",
      "3. $|z_1\\cdot z_2|$"
    ],
    "relatedTheory": [
      {
        "label": "Números complejos",
        "href": "/cursos/introduccion-matematicas#intro-complejos-1"
      }
    ],
    "hints": [
      "Racionaliza los cocientes multiplicando por el conjugado del denominador.",
      "Usa $z_1^{-1}z_2^{-1}=1/(z_1z_2)$.",
      "Para el módulo usa $|a+bi|=\\sqrt{a^2+b^2}$."
    ],
    "solution": [
      {
        "body": "1. $z_1\\overline z_2=-5-14i$. Al dividir por $1+4i$ y racionalizar, se obtiene $(-61+6i)/17$."
      },
      {
        "body": "2. $z_1z_2=11+10i$, por lo que el inverso es $(11-10i)/221$."
      },
      {
        "body": "3. $|z_1z_2|=\\sqrt{11^2+10^2}=\\sqrt{221}$."
      }
    ],
    "finalAnswer": "$-61/17+(6/17)i$; $11/221-(10/221)i$; $\\sqrt{221}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-38219c12220b",
    "number": "72",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Módulo y conjugado",
    "topic": "Números complejos",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Demuestre que para todo número complejo $z \\in \\mathbb{C}$ , se cumple la siguiente igualdad:",
      "$$|z|^2 = z \\cdot \\overline{z}.$$"
    ],
    "relatedTheory": [
      {
        "label": "Números complejos",
        "href": "/cursos/introduccion-matematicas#intro-complejos-1"
      }
    ],
    "hints": [
      "Escribe $z=a+bi$ con $a,b\\in\\mathbb R$.",
      "Su conjugado es $\\overline z=a-bi$.",
      "Multiplica usando diferencia de cuadrados."
    ],
    "solution": [
      {
        "body": "$z\\overline z=(a+bi)(a-bi)=a^2-(bi)^2=a^2+b^2$. Como $|z|=\\sqrt{a^2+b^2}$, resulta $z\\overline z=|z|^2$."
      }
    ],
    "finalAnswer": "$|z|^2=z\\overline z$ para todo $z\\in\\mathbb C$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-c701b77850df",
    "number": "73",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Un complejo a partir de su módulo y parte real",
    "topic": "Números complejos",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Encuentre un número complejo $z = x + iy$ tal que:",
      "1. $z+\\overline{z} = 8$",
      "2. Su módulo es $|z| = 5$",
      "3. Su parte imaginaria es negativa",
      "Determine $z$ y verifique que cumple todas las condiciones."
    ],
    "relatedTheory": [
      {
        "label": "Números complejos",
        "href": "/cursos/introduccion-matematicas#intro-complejos-1"
      }
    ],
    "hints": [
      "$z+\\overline z=2x$.",
      "Usa $x^2+y^2=25$.",
      "Escoge la raíz negativa para $y$."
    ],
    "solution": [
      {
        "body": "De $2x=8$ se obtiene $x=4$. Entonces $16+y^2=25$, así que $y=\\pm3$. La parte imaginaria negativa exige $y=-3$. Se verifica $(4-3i)+(4+3i)=8$ y $|4-3i|=5$."
      }
    ],
    "finalAnswer": "$z=4-3i$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-318b6036a814",
    "number": "74",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Dos distancias en el plano complejo",
    "topic": "Números complejos",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Encuentre, si existe, un complejo $z =a+bi$ tal que",
      "$$|z| = \\frac{1}{|z|} = |1 - z|.$$"
    ],
    "relatedTheory": [
      {
        "label": "Números complejos",
        "href": "/cursos/introduccion-matematicas#intro-complejos-1"
      }
    ],
    "hints": [
      "De $|z|=1/|z|$ y $|z|>0$ deduce el módulo.",
      "Escribe $z=a+bi$ y plantea $a^2+b^2=1$ y $(1-a)^2+b^2=1$.",
      "Resta ambas ecuaciones."
    ],
    "solution": [
      {
        "body": "La primera igualdad da $|z|^2=1$, por lo que $|z|=1$. Al restar $(1-a)^2+b^2=a^2+b^2$ resulta $1-2a=0$. Así $a=1/2$ y $b^2=3/4$. Ambos signos de $b$ cumplen las tres igualdades."
      }
    ],
    "finalAnswer": "$z=\\frac12\\pm\\frac{\\sqrt3}{2}i$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-875810255219",
    "number": "75",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Inducción y binomio · divisibilidad e igualdad de coeficientes",
    "topic": "Inducción y sumatorias",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "1. Demuestre por inducción que $\\forall n \\in \\mathbb{N}, \\quad 9^n - 2^n$ es divisible por 7.",
      "2. En el desarrollo de",
      "$$\\left( x-\\frac{1}{\\sqrt{x}} \\right)^{n}$$",
      "los coeficientes de los términos cuarto y décimo son iguales. Encuentre el valor de $n$ ."
    ],
    "relatedTheory": [
      {
        "label": "Inducción y sumatorias",
        "href": "/cursos/introduccion-matematicas#intro-induccion-sumatorias-1"
      }
    ],
    "hints": [
      "Escribe el término general $T_{k+1}=\\binom nk a^{n-k}b^k$.",
      "Distingue el número de término $k+1$ del índice $k$.",
      "Iguala el exponente requerido y comprueba que $k$ sea entero entre cero y $n$."
    ],
    "solution": [
      {
        "body": "1. Caso base $n=1$: $9-2=7$. Si $9^n-2^n=7m$, entonces $9^{n+1}-2^{n+1}=9(9^n-2^n)+7\\cdot2^n=7(9m+2^n)$. Por inducción siempre es divisible por $7$ (para $n=0$ también vale, pues la diferencia es cero)."
      },
      {
        "body": "2. El término $T_{k+1}=(-1)^k\\binom nk x^{n-3k/2}$. Los términos cuarto y décimo tienen coeficientes $-\\binom n3$ y $-\\binom n9$, con $n\\ge9$. En una fila de Pascal los coeficientes crecen estrictamente hasta el centro y son simétricos; la igualdad de dos índices distintos exige $3+9=n$. Así $n=12$."
      }
    ],
    "finalAnswer": "La divisibilidad es válida; en el binomio, $n=12$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-a1aab9bf0518",
    "number": "76",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Inducción y binomio · exponentes enteros admisibles",
    "topic": "Inducción y sumatorias",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "1. Demuestre por inducción que",
      "$\\forall n \\in \\mathbb{N}, \\quad 8^{n-1} +6$ es divisible por 7.",
      "2. Determine los distintos valores de $n$ de manera que en el desarrollo de",
      "$$\\left( x^3-\\frac{1}{2\\sqrt{x}} \\right)^{n}$$ tenga un término que contenga a $x^5$ ."
    ],
    "relatedTheory": [
      {
        "label": "Inducción y sumatorias",
        "href": "/cursos/introduccion-matematicas#intro-induccion-sumatorias-1"
      }
    ],
    "hints": [
      "Para la inducción verifica $n=1$ y escribe el caso siguiente en función del anterior.",
      "El término general del binomio tiene exponente $3n-7k/2$.",
      "Resuelve $6n-7k=10$ con $n,k$ enteros y $0\\le k\\le n$."
    ],
    "solution": [
      {
        "body": "1. Para $n=1$, $8^0+6=7$. Si $8^{n-1}+6=7m$, entonces $8^n+6=8(8^{n-1}+6)-42=7(8m-6)$. La afirmación vale para $n\\ge1$."
      },
      {
        "body": "2. El término general es $(-1)^k2^{-k}\\binom nk x^{3n-7k/2}$. Para obtener $x^5$, $6n-7k=10$. Módulo $7$, resulta $n\\equiv4\\pmod7$. Por tanto $n=4+7m$, $k=2+6m$; las restricciones exigen $m=0,1,2,\\ldots$."
      }
    ],
    "finalAnswer": "1. Siempre divisible por $7$ para $n\\ge1$. 2. $n=4+7m$, $m\\in\\mathbb Z_{\\ge0}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-cb0486d977e3",
    "number": "77",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Suma telescópica y suma binomial alternada",
    "topic": "Progresiones y binomio",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "1. Determine una fórmula para la sumatoria $\\displaystyle{\\sum_{k=1}^{n}\\frac{1}{ k^2 + 3 k+ 2}}$",
      "2. Calcule la siguiente suma aplicando el teorema del binomio",
      "$${n\\choose 0}- {n\\choose 1}+{n\\choose 2}-\\cdots +(-1)^n{n\\choose n}$$"
    ],
    "relatedTheory": [
      {
        "label": "Progresiones y binomio",
        "href": "/cursos/introduccion-matematicas#intro-progresiones-binomio-1"
      }
    ],
    "hints": [
      "En una suma doble resuelve primero la suma interior manteniendo fijo el índice exterior.",
      "Para sumas racionales factoriza el denominador y busca una diferencia telescópica.",
      "Escribe los primeros y últimos términos para comprobar las cancelaciones y los extremos."
    ],
    "solution": [
      {
        "body": "1. $1/((k+1)(k+2))=1/(k+1)-1/(k+2)$. Al sumar queda $1/2-1/(n+2)=n/(2(n+2))$."
      },
      {
        "body": "2. Por el binomio, la suma es $(1-1)^n=0$ para $n\\ge1$. Para $n=0$, la suma tiene un solo término y vale $1$."
      }
    ],
    "finalAnswer": "1. $n/(2(n+2))$. 2. $0$ para $n\\ge1$; $1$ si $n=0$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-46aa3e1c819c",
    "number": "78",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Polinomio real con una raíz imaginaria",
    "topic": "Polinomios",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Considere el polinomio",
      "$$p(x)= ax^4+bx^3-x^2-x-2$$",
      "Encuentre los valores de $a$ y $b$ de modo que $i$ sea raíz. Para estos valores, encuentre la factorización completa de $p(x)$ ."
    ],
    "relatedTheory": [
      {
        "label": "Polinomios",
        "href": "/cursos/introduccion-matematicas#intro-polinomios-1"
      }
    ],
    "hints": [
      "Sustituye $x=i$ y usa $i^2=-1$.",
      "Iguala por separado parte real e imaginaria a cero.",
      "Con coeficientes reales, $-i$ también es raíz."
    ],
    "solution": [
      {
        "body": "Suponiendo $a,b\\in\\mathbb R$, $p(i)=a-1-(b+1)i=0$ da $a=1,b=-1$. Entonces $p=x^4-x^3-x^2-x-2=(x^2+1)(x^2-x-2)=(x^2+1)(x-2)(x+1)$."
      }
    ],
    "finalAnswer": "$a=1,b=-1$; factorización compleja $(x-i)(x+i)(x-2)(x+1)$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-74d2239daa71",
    "number": "79",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Parábola · vértice a partir de dos rectas",
    "topic": "Geometría analítica",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Encuentre la ecuación de la parábola que cuyo vértice se encuentra en la intersección de las rectas",
      "$$\\begin{aligned} 2x+y&=-1\\\\ x+y&=2 \\end{aligned}$$",
      "su directriz es paralela al eje $X$ y que pasa por el punto $(5,9)$ . Identifique el valor de sus elementos y grafique."
    ],
    "relatedTheory": [
      {
        "label": "Geometría analítica",
        "href": "/cursos/introduccion-matematicas#intro-geometria-analitica-1"
      }
    ],
    "hints": [
      "Lleva la ecuación a su forma canónica completando cuadrados, o usa la definición de la cónica.",
      "Identifica centro o vértice y los parámetros de la forma canónica.",
      "Comprueba los puntos dados y usa simetrías para trazar la gráfica."
    ],
    "solution": [
      {
        "body": "Restando las ecuaciones se obtiene $x=-3$, $y=5$, el vértice. Por ser la directriz horizontal, la forma es $(x+3)^2=4p(y-5)$."
      },
      {
        "body": "El punto $(5,9)$ da $64=16p$, luego $p=4$. Foco $(-3,9)$, directriz $y=1$, eje $x=-3$ y lado recto de longitud $16$. La parábola abre hacia arriba; marca el vértice y los puntos $(5,9),(-11,9)$ para dibujarla."
      }
    ],
    "finalAnswer": "$(x+3)^2=16(y-5)$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-4a5e799e4259",
    "number": "80",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Hipérbola · forma canónica y elementos",
    "topic": "Geometría analítica",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Identifique si la ecuación",
      "$$x^2-4y^2-2x+16y-31=0$$",
      "corresponde a una circunferencia, parábola (con eje vertical u horizontal), elipse o hipérbola.",
      "Determine el valor de sus elementos y grafique."
    ],
    "relatedTheory": [
      {
        "label": "Geometría analítica",
        "href": "/cursos/introduccion-matematicas#intro-geometria-analitica-1"
      }
    ],
    "hints": [
      "Lleva la ecuación a su forma canónica completando cuadrados, o usa la definición de la cónica.",
      "Identifica centro o vértice y los parámetros de la forma canónica.",
      "Comprueba los puntos dados y usa simetrías para trazar la gráfica."
    ],
    "solution": [
      {
        "body": "Completando cuadrados: $(x-1)^2-4(y-2)^2=16$, o $(x-1)^2/16-(y-2)^2/4=1$."
      },
      {
        "body": "Centro $(1,2)$, semiejes $a=4,b=2$, $c=\\sqrt{a^2+b^2}=2\\sqrt5$. Vértices $(-3,2),(5,2)$; focos $(1\\pm2\\sqrt5,2)$. Asíntotas $y-2=\\pm(x-1)/2$. Excentricidad $\\sqrt5/2$ y directrices $x=1\\pm8/\\sqrt5$. Sus dos ramas abren horizontalmente y se aproximan a las asíntotas."
      }
    ],
    "finalAnswer": "Hipérbola horizontal: $(x-1)^2/16-(y-2)^2/4=1$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-b173ef90d8bd",
    "number": "81",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Circunferencia · centro sobre el eje vertical",
    "topic": "Geometría analítica",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Hallar la ecuación de la circunferencia cuyo centro está sobre el eje $Y$ y que pasa por los puntos $A(2, 2)$ y $B(6, -4)$ ."
    ],
    "relatedTheory": [
      {
        "label": "Geometría analítica",
        "href": "/cursos/introduccion-matematicas#intro-geometria-analitica-1"
      }
    ],
    "hints": [
      "Lleva la ecuación a su forma canónica completando cuadrados, o usa la definición de la cónica.",
      "Identifica centro o vértice y los parámetros de la forma canónica.",
      "Comprueba los puntos dados y usa simetrías para trazar la gráfica."
    ],
    "solution": [
      {
        "body": "Sea el centro $(0,c)$. Igualar distancias a los dos puntos da $4+(2-c)^2=36+(-4-c)^2$, de donde $c=-11/3$."
      },
      {
        "body": "El radio al cuadrado es $4+(17/3)^2=325/9$."
      }
    ],
    "finalAnswer": "$x^2+(y+11/3)^2=325/9$, con radio $5\\sqrt{13}/3$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-3f4986afef05",
    "number": "82",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Circunferencia · centro en la intersección de rectas",
    "topic": "Geometría analítica",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Hallar la ecuación de la circunferencia cuyo centro se encuentra en la intersección de las rectas",
      "$$\\begin{aligned} y&=2x-5\\\\ y&=1-x \\end{aligned}$$",
      "y que pasa por el punto $A(6,2)$ . Grafique las rectas y la circunferencia obtenida, indicando coordenadas del centro y medida del radio."
    ],
    "relatedTheory": [
      {
        "label": "Geometría analítica",
        "href": "/cursos/introduccion-matematicas#intro-geometria-analitica-1"
      }
    ],
    "hints": [
      "Lleva la ecuación a su forma canónica completando cuadrados, o usa la definición de la cónica.",
      "Identifica centro o vértice y los parámetros de la forma canónica.",
      "Comprueba los puntos dados y usa simetrías para trazar la gráfica."
    ],
    "solution": [
      {
        "body": "$2x-5=1-x$ da centro $(2,-1)$. Su distancia a $(6,2)$ es $\\sqrt{4^2+3^2}=5$."
      },
      {
        "body": "Para el dibujo, las rectas se cruzan en $(2,-1)$ y tienen pendientes $2$ y $-1$. La circunferencia se traza con radio $5$ alrededor del cruce; sus extremos horizontales son $(-3,-1),(7,-1)$ y los verticales $(2,-6),(2,4)$."
      }
    ],
    "finalAnswer": "$(x-2)^2+(y+1)^2=25$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-c9709d93cfae",
    "number": "83",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Circunferencia concéntrica y tangente a una recta",
    "topic": "Geometría analítica",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Hallar la ecuación de la circunferencia concéntrica a",
      "$$4x^2 + 4y^2 - 16x + 20y + 25 = 0.$$",
      "y que es tangente a la recta $5x-12y=1$ ."
    ],
    "relatedTheory": [
      {
        "label": "Geometría analítica",
        "href": "/cursos/introduccion-matematicas#intro-geometria-analitica-1"
      }
    ],
    "hints": [
      "Lleva la ecuación a su forma canónica completando cuadrados, o usa la definición de la cónica.",
      "Identifica centro o vértice y los parámetros de la forma canónica.",
      "Comprueba los puntos dados y usa simetrías para trazar la gráfica."
    ],
    "solution": [
      {
        "body": "Dividiendo por $4$ y completando cuadrados, la circunferencia original tiene centro $(2,-5/2)$."
      },
      {
        "body": "El radio buscado es la distancia a $5x-12y-1=0$: $|5\\cdot2-12(-5/2)-1|/\\sqrt{25+144}=39/13=3$."
      }
    ],
    "finalAnswer": "$(x-2)^2+(y+5/2)^2=9$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-40879519004b",
    "number": "84",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Parábolas · foco, directriz y punto de paso",
    "topic": "Geometría analítica",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Encuentre las ecuaciones de las parábolas que satisfacen:",
      "1. Foco $F(0,-4)$ y directriz $y=4$ .",
      "2. Vértice $V(-3,5)$ , eje paralelo al eje $X$ y que pasa por el punto $(5,9)$ ."
    ],
    "relatedTheory": [
      {
        "label": "Geometría analítica",
        "href": "/cursos/introduccion-matematicas#intro-geometria-analitica-1"
      }
    ],
    "hints": [
      "Lleva la ecuación a su forma canónica completando cuadrados, o usa la definición de la cónica.",
      "Identifica centro o vértice y los parámetros de la forma canónica.",
      "Comprueba los puntos dados y usa simetrías para trazar la gráfica."
    ],
    "solution": [
      {
        "body": "1. El vértice es el punto medio entre el foco $(0,-4)$ y la directriz $y=4$: $(0,0)$. Con $p=-4$, $x^2=4py=-16y$."
      },
      {
        "body": "2. La forma horizontal es $(y-5)^2=4p(x+3)$. Sustituyendo $(5,9)$ resulta $16=32p$, así $p=1/2$ y $(y-5)^2=2(x+3)$. Su foco es $(-5/2,5)$ y directriz $x=-7/2$."
      }
    ],
    "finalAnswer": "1. $x^2=-16y$. 2. $(y-5)^2=2(x+3)$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-48ae539fb143",
    "number": "85",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Elipse · completar cuadrados y localizar los focos",
    "topic": "Geometría analítica",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Identifique si la ecuación",
      "$$9x^2+y^2=10-2y$$",
      "corresponde a una circunferencia, parábola (con eje vertical u horizontal) o elipse.",
      "Grafique indicando sus elementos."
    ],
    "relatedTheory": [
      {
        "label": "Geometría analítica",
        "href": "/cursos/introduccion-matematicas#intro-geometria-analitica-1"
      }
    ],
    "hints": [
      "Lleva la ecuación a su forma canónica completando cuadrados, o usa la definición de la cónica.",
      "Identifica centro o vértice y los parámetros de la forma canónica.",
      "Comprueba los puntos dados y usa simetrías para trazar la gráfica."
    ],
    "solution": [
      {
        "body": "$9x^2+(y+1)^2=11$, o $x^2/(11/9)+(y+1)^2/11=1$. Es elipse de centro $(0,-1)$ y eje mayor vertical."
      },
      {
        "body": "$a=\\sqrt{11}$, $b=\\sqrt{11}/3$, $c=\\sqrt{a^2-b^2}=2\\sqrt{22}/3$. Vértices $(0,-1\\pm\\sqrt{11})$, extremos menores $(\\pm\\sqrt{11}/3,-1)$ y focos $(0,-1\\pm2\\sqrt{22}/3)$. Para graficar, marca estos extremos y dibuja la curva cerrada simétrica respecto de $x=0,y=-1$."
      }
    ],
    "finalAnswer": "Elipse $x^2/(11/9)+(y+1)^2/11=1$ con eje mayor vertical.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-a551541d1b57",
    "number": "86",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Sumatorias · suma doble y cancelación telescópica",
    "topic": "Inducción y sumatorias",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Calcule las siguientes sumatorias:",
      "1. $\\displaystyle{\\sum_{i=1}^{5} \\sum_{j=1}^{i} i(j+1) }$",
      "2. $\\displaystyle{\\sum_{j=1}^n\\frac{1}{ j^2 + 7j + 12}}$"
    ],
    "relatedTheory": [
      {
        "label": "Inducción y sumatorias",
        "href": "/cursos/introduccion-matematicas#intro-induccion-sumatorias-1"
      }
    ],
    "hints": [
      "En una suma doble resuelve primero la suma interior manteniendo fijo el índice exterior.",
      "Para sumas racionales factoriza el denominador y busca una diferencia telescópica.",
      "Escribe los primeros y últimos términos para comprobar las cancelaciones y los extremos."
    ],
    "solution": [
      {
        "body": "1. La suma interior es $i\\sum_{j=1}^i(j+1)=i^2(i+3)/2$. Para $i=1,2,3,4,5$ da $2,10,27,56,100$; total $195$."
      },
      {
        "body": "2. $1/((j+3)(j+4))=1/(j+3)-1/(j+4)$. La suma es $1/4-1/(n+4)=n/(4(n+4))$."
      }
    ],
    "finalAnswer": "1. $195$. 2. $n/(4(n+4))$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-64101b13711b",
    "number": "87",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Progresión aritmética · demostrar que un término es cero",
    "topic": "Progresiones y binomio",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "En una PA, si 7 veces el séptimo término es igual a 11 veces el décimo primer término, demuestre que el término décimo octavo es cero."
    ],
    "relatedTheory": [
      {
        "label": "Progresiones y binomio",
        "href": "/cursos/introduccion-matematicas#intro-progresiones-binomio-1"
      }
    ],
    "hints": [
      "Para una PA usa $a_n=a_1+(n-1)d$; para una PG usa $a_n=a_1r^{n-1}$.",
      "Traduce cada dato a una ecuación antes de despejar.",
      "Comprueba la razón o diferencia y sustituye en los términos originales."
    ],
    "solution": [
      {
        "body": "La hipótesis es $7(a_1+6d)=11(a_1+10d)$. Reordenando, $4a_1+68d=0$, luego $a_1+17d=0$. Esta última expresión es precisamente $a_{18}$."
      }
    ],
    "finalAnswer": "$a_{18}=0$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-bd7e8c7bd3c2",
    "number": "88",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Progresión geométrica · determinar el parámetro",
    "topic": "Progresiones y binomio",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Si $x + 9$ , $x - 6$ y 4 son los primeros tres términos de una",
      "PG, determine $x$ ."
    ],
    "relatedTheory": [
      {
        "label": "Progresiones y binomio",
        "href": "/cursos/introduccion-matematicas#intro-progresiones-binomio-1"
      }
    ],
    "hints": [
      "Para una PA usa $a_n=a_1+(n-1)d$; para una PG usa $a_n=a_1r^{n-1}$.",
      "Traduce cada dato a una ecuación antes de despejar.",
      "Comprueba la razón o diferencia y sustituye en los términos originales."
    ],
    "solution": [
      {
        "body": "Tres términos consecutivos satisfacen $(x-6)^2=4(x+9)$. Se obtiene $x^2-16x=0$, por lo que $x=0,16$."
      },
      {
        "body": "Si $x=0$, la progresión es $9,-6,4$ de razón $-2/3$. Si $x=16$, es $25,10,4$ de razón $2/5$. Ambos casos son válidos."
      }
    ],
    "finalAnswer": "$x=0$ o $x=16$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-1c18c7178000",
    "number": "89",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Binomio · igualdad de dos coeficientes",
    "topic": "Ecuaciones y álgebra",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "En el desarrollo de",
      "$$\\left( x-\\frac{1}{\\sqrt{x}} \\right)^{n}$$",
      "los coeficientes de los términos cuarto y décimo son iguales. Encuentre el valor de $n$ ."
    ],
    "relatedTheory": [
      {
        "label": "Ecuaciones y álgebra",
        "href": "/cursos/introduccion-matematicas#intro-ecuaciones-1"
      }
    ],
    "hints": [
      "Escribe el término general $T_{k+1}=\\binom nk a^{n-k}b^k$.",
      "Distingue el número de término $k+1$ del índice $k$.",
      "Iguala el exponente requerido y comprueba que $k$ sea entero entre cero y $n$."
    ],
    "solution": [
      {
        "body": "El término $T_{k+1}=(-1)^k\\binom nk x^{n-3k/2}$. Los términos cuarto y décimo tienen coeficientes $-\\binom n3$ y $-\\binom n9$, con $n\\ge9$. En una fila de Pascal los coeficientes crecen estrictamente hasta el centro y son simétricos; la igualdad de dos índices distintos exige $3+9=n$. Así $n=12$."
      }
    ],
    "finalAnswer": "$n=12$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-31f5edd14950",
    "number": "90",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Coeficientes binomiales · identidad de Pascal",
    "topic": "Progresiones y binomio",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Demuestre usando la definición del número combinatorio que",
      "$${n\\choose k}+{n\\choose k+1}={n+1\\choose k+1}$$"
    ],
    "relatedTheory": [
      {
        "label": "Progresiones y binomio",
        "href": "/cursos/introduccion-matematicas#intro-progresiones-binomio-1"
      }
    ],
    "hints": [
      "Escribe el término general $T_{k+1}=\\binom nk a^{n-k}b^k$.",
      "Distingue el número de término $k+1$ del índice $k$.",
      "Iguala el exponente requerido y comprueba que $k$ sea entero entre cero y $n$."
    ],
    "solution": [
      {
        "body": "Para $0\\le k<n$, $\\binom nk+\\binom n{k+1}=\\frac{n!(k+1)}{(k+1)!(n-k)!}+\\frac{n!(n-k)}{(k+1)!(n-k)!}=\\frac{(n+1)!}{(k+1)!(n-k)!}=\\binom{n+1}{k+1}$."
      },
      {
        "body": "Para $k=n$, usando $\\binom n{n+1}=0$, ambos lados valen $1$."
      }
    ],
    "finalAnswer": "$\\binom nk+\\binom n{k+1}=\\binom{n+1}{k+1}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-4ac792f3776e",
    "number": "91",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Sumatorias · producto de índices y fracciones telescópicas",
    "topic": "Inducción y sumatorias",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Calcule las siguientes sumatorias:",
      "1. $\\displaystyle{\\sum_{i=1}^{5} \\sum_{j=1}^{i} (i+1)(j+1) }$",
      "2. $\\displaystyle{\\sum_{j=1}^{12}\\frac{1}{ j^2 + 15 j + 56}}$"
    ],
    "relatedTheory": [
      {
        "label": "Inducción y sumatorias",
        "href": "/cursos/introduccion-matematicas#intro-induccion-sumatorias-1"
      }
    ],
    "hints": [
      "En una suma doble resuelve primero la suma interior manteniendo fijo el índice exterior.",
      "Para sumas racionales factoriza el denominador y busca una diferencia telescópica.",
      "Escribe los primeros y últimos términos para comprobar las cancelaciones y los extremos."
    ],
    "solution": [
      {
        "body": "1. La suma interior es $(i+1)i(i+3)/2$. Para $i=1,\\ldots,5$ vale $4,15,36,70,120$, cuya suma es $245$."
      },
      {
        "body": "2. $j^2+15j+56=(j+7)(j+8)$. Al sumar $1/(j+7)-1/(j+8)$ desde $1$ hasta $12$ queda $1/8-1/20=3/40$."
      }
    ],
    "finalAnswer": "1. $245$. 2. $3/40$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-486fbab41ad3",
    "number": "92",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Progresión aritmética · suma de los primeros términos",
    "topic": "Progresiones y binomio",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Si los términos quinto y décimo de una PA son 38 y 23,",
      "respectivamente, encuentre la suma de los $n$ primeros términos."
    ],
    "relatedTheory": [
      {
        "label": "Progresiones y binomio",
        "href": "/cursos/introduccion-matematicas#intro-progresiones-binomio-1"
      }
    ],
    "hints": [
      "Para una PA usa $a_n=a_1+(n-1)d$; para una PG usa $a_n=a_1r^{n-1}$.",
      "Traduce cada dato a una ecuación antes de despejar.",
      "Comprueba la razón o diferencia y sustituye en los términos originales."
    ],
    "solution": [
      {
        "body": "$a_1+4d=38$ y $a_1+9d=23$ implican $5d=-15$, así $d=-3$ y $a_1=50$. Entonces $S_n=n(2a_1+(n-1)d)/2=n(103-3n)/2$."
      }
    ],
    "finalAnswer": "$S_n=n(103-3n)/2$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-362b7677c470",
    "number": "93",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Progresión geométrica · término central",
    "topic": "Progresiones y binomio",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine $x$ de modo que los números $7, x$ y 252 sean tres términos consecutivos de una progresión geométrica."
    ],
    "relatedTheory": [
      {
        "label": "Progresiones y binomio",
        "href": "/cursos/introduccion-matematicas#intro-progresiones-binomio-1"
      }
    ],
    "hints": [
      "Para una PA usa $a_n=a_1+(n-1)d$; para una PG usa $a_n=a_1r^{n-1}$.",
      "Traduce cada dato a una ecuación antes de despejar.",
      "Comprueba la razón o diferencia y sustituye en los términos originales."
    ],
    "solution": [
      {
        "body": "La condición es $x^2=7\\cdot252=1764$, luego $x=\\pm42$. Las razones son $6$ y $-6$, respectivamente, y ambas dan el tercer término $252$."
      }
    ],
    "finalAnswer": "$x=42$ o $x=-42$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-3e3308aa6ce8",
    "number": "94",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Binomio · ausencia de término independiente",
    "topic": "Progresiones y binomio",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "En caso de existir, determine el término independiente de $x$ en el desarrollo del binomio",
      "$$\\left( x-\\frac{1}{x}\\right) ^{9}$$"
    ],
    "relatedTheory": [
      {
        "label": "Progresiones y binomio",
        "href": "/cursos/introduccion-matematicas#intro-progresiones-binomio-1"
      }
    ],
    "hints": [
      "Escribe el término general $T_{k+1}=\\binom nk a^{n-k}b^k$.",
      "Distingue el número de término $k+1$ del índice $k$.",
      "Iguala el exponente requerido y comprueba que $k$ sea entero entre cero y $n$."
    ],
    "solution": [
      {
        "body": "El término general es $(-1)^k\\binom9k x^{9-2k}$. Para exponente cero se necesitaría $k=9/2$, que no es entero."
      }
    ],
    "finalAnswer": "No hay término independiente; su coeficiente es cero.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-0b290a9bd810",
    "number": "95",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Suma binomial · todos los coeficientes",
    "topic": "Progresiones y binomio",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Calcule la siguiente suma aplicando el teorema del binomio",
      "$${n\\choose 0}+ {n\\choose 1}+\\cdots +{n\\choose n}$$"
    ],
    "relatedTheory": [
      {
        "label": "Progresiones y binomio",
        "href": "/cursos/introduccion-matematicas#intro-progresiones-binomio-1"
      }
    ],
    "hints": [
      "Escribe el término general $T_{k+1}=\\binom nk a^{n-k}b^k$.",
      "Distingue el número de término $k+1$ del índice $k$.",
      "Iguala el exponente requerido y comprueba que $k$ sea entero entre cero y $n$."
    ],
    "solution": [
      {
        "body": "Por el teorema del binomio, $(1+1)^n=\\sum_{k=0}^n\\binom nk1^{n-k}1^k=\\sum_{k=0}^n\\binom nk$."
      }
    ],
    "finalAnswer": "$2^n$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-e4ef000cedc3",
    "number": "96",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Sumatorias · desplazamientos de índices",
    "topic": "Inducción y sumatorias",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Calcule las siguientes sumatorias:",
      "1. $\\displaystyle{\\sum_{i=1}^{5} \\sum_{j=1}^{i} (i-1)(j+1) }$",
      "2. $\\displaystyle{\\sum_{j=1}^n\\frac{1}{4 j^2 + 8 j + 3}}$"
    ],
    "relatedTheory": [
      {
        "label": "Inducción y sumatorias",
        "href": "/cursos/introduccion-matematicas#intro-induccion-sumatorias-1"
      }
    ],
    "hints": [
      "En una suma doble resuelve primero la suma interior manteniendo fijo el índice exterior.",
      "Para sumas racionales factoriza el denominador y busca una diferencia telescópica.",
      "Escribe los primeros y últimos términos para comprobar las cancelaciones y los extremos."
    ],
    "solution": [
      {
        "body": "1. La suma interior es $(i-1)i(i+3)/2$, cuyos valores son $0,5,18,42,80$. Su suma es $145$."
      },
      {
        "body": "2. $4j^2+8j+3=(2j+1)(2j+3)$. El sumando es $\\frac12(1/(2j+1)-1/(2j+3))$, por lo que la suma es $\\frac12(1/3-1/(2n+3))=n/(3(2n+3))$."
      }
    ],
    "finalAnswer": "1. $145$. 2. $n/(3(2n+3))$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-9f3a17e34da7",
    "number": "97",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Binomio · término central de una potencia par",
    "topic": "Progresiones y binomio",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Encontrar el término central en el desarrollo del binomio",
      "$$\\left( 2x-\\frac{1}{x} \\right)^{20}$$"
    ],
    "relatedTheory": [
      {
        "label": "Progresiones y binomio",
        "href": "/cursos/introduccion-matematicas#intro-progresiones-binomio-1"
      }
    ],
    "hints": [
      "Escribe el término general $T_{k+1}=\\binom nk a^{n-k}b^k$.",
      "Distingue el número de término $k+1$ del índice $k$.",
      "Iguala el exponente requerido y comprueba que $k$ sea entero entre cero y $n$."
    ],
    "solution": [
      {
        "body": "Hay $21$ términos, así que el central es el undécimo, con $k=10$. Vale $\\binom{20}{10}(2x)^{10}(-1/x)^{10}=\\binom{20}{10}2^{10}=184756\\cdot1024=189190144$."
      }
    ],
    "finalAnswer": "El término central es $189190144$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-b49a0ec48110",
    "number": "98",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Sumas dobles · separación y cambio de índice",
    "topic": "Inducción y sumatorias",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Calcule las siguientes sumatorias:",
      "1. $\\displaystyle{\\sum_{i=1}^{10} \\sum_{j=1}^{i} (i-j)^2 }$",
      "2. $\\displaystyle{\\sum_{k=1}^7 \\sum_{j=1}^6\\frac{k^2}{j^2+11j+30}}$"
    ],
    "relatedTheory": [
      {
        "label": "Inducción y sumatorias",
        "href": "/cursos/introduccion-matematicas#intro-induccion-sumatorias-1"
      }
    ],
    "hints": [
      "En una suma doble resuelve primero la suma interior manteniendo fijo el índice exterior.",
      "Para sumas racionales factoriza el denominador y busca una diferencia telescópica.",
      "Escribe los primeros y últimos términos para comprobar las cancelaciones y los extremos."
    ],
    "solution": [
      {
        "body": "1. Con $h=i-j$, la suma interior es $\\sum_{h=0}^{i-1}h^2=(i-1)i(2i-1)/6$. Al sumar para $i=1,\\ldots,10$ se obtiene $825$."
      },
      {
        "body": "2. Como los límites son independientes, la suma es $(\\sum_{k=1}^7k^2)(\\sum_{j=1}^6 1/((j+5)(j+6)))=140(1/6-1/12)=35/3$."
      }
    ],
    "finalAnswer": "1. $825$. 2. $35/3$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-75f0d87aaf72",
    "number": "99",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Progresión aritmética · suma y suma de cuadrados",
    "topic": "Progresiones y binomio",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "La suma de $5$ números en P.A. es $10$ y la suma de sus cuadrados es $60$ . Hallar los números."
    ],
    "relatedTheory": [
      {
        "label": "Progresiones y binomio",
        "href": "/cursos/introduccion-matematicas#intro-progresiones-binomio-1"
      }
    ],
    "hints": [
      "Para una PA usa $a_n=a_1+(n-1)d$; para una PG usa $a_n=a_1r^{n-1}$.",
      "Traduce cada dato a una ecuación antes de despejar.",
      "Comprueba la razón o diferencia y sustituye en los términos originales."
    ],
    "solution": [
      {
        "body": "Escribe los términos como $a-2d,a-d,a,a+d,a+2d$. Su suma $5a=10$ da $a=2$."
      },
      {
        "body": "La suma de cuadrados es $5a^2+10d^2=60$, por lo que $20+10d^2=60$ y $d=\\pm2$."
      }
    ],
    "finalAnswer": "Los números son $-2,0,2,4,6$ en ese orden o en el inverso.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-3a2ac65ada85",
    "number": "100",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Progresión geométrica · fórmula general y décimo término",
    "topic": "Progresiones y binomio",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "El segundo término de una PG es 24 y el quinto es 81. Determine",
      "la sucesión y el décimo término."
    ],
    "relatedTheory": [
      {
        "label": "Progresiones y binomio",
        "href": "/cursos/introduccion-matematicas#intro-progresiones-binomio-1"
      }
    ],
    "hints": [
      "Para una PA usa $a_n=a_1+(n-1)d$; para una PG usa $a_n=a_1r^{n-1}$.",
      "Traduce cada dato a una ecuación antes de despejar.",
      "Comprueba la razón o diferencia y sustituye en los términos originales."
    ],
    "solution": [
      {
        "body": "$a_1r=24$ y $a_1r^4=81$ dan $r^3=81/24=27/8$. Para razón real, $r=3/2$ y $a_1=16$."
      },
      {
        "body": "$a_n=16(3/2)^{n-1}$, luego $a_{10}=16(3/2)^9=19683/32$."
      }
    ],
    "finalAnswer": "$a_n=16(3/2)^{n-1}$ y $a_{10}=19683/32$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-c0f2573eafc9",
    "number": "101",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Binomio · coeficiente de una potencia determinada",
    "topic": "Progresiones y binomio",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Encontrar el coeficiente que acompaña a $x^{10}$ en el desarrollo del binomio",
      "$$(3x+2x^{2})^{7}$$"
    ],
    "relatedTheory": [
      {
        "label": "Progresiones y binomio",
        "href": "/cursos/introduccion-matematicas#intro-progresiones-binomio-1"
      }
    ],
    "hints": [
      "Escribe el término general $T_{k+1}=\\binom nk a^{n-k}b^k$.",
      "Distingue el número de término $k+1$ del índice $k$.",
      "Iguala el exponente requerido y comprueba que $k$ sea entero entre cero y $n$."
    ],
    "solution": [
      {
        "body": "El término general es $\\binom7k3^{7-k}2^k x^{7+k}$. Para $x^{10}$, $k=3$. Su coeficiente es $\\binom733^42^3=35\\cdot81\\cdot8=22680$."
      }
    ],
    "finalAnswer": "El coeficiente de $x^{10}$ es $22680$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-ca86c102a799",
    "number": "102",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Coeficientes binomiales · extraer un factor del índice",
    "topic": "Progresiones y binomio",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Usando la definición del coeficiente binomial, demuestre que",
      "$$k\\binom{n}{k}=n\\binom{n-1}{k-1}$$"
    ],
    "relatedTheory": [
      {
        "label": "Progresiones y binomio",
        "href": "/cursos/introduccion-matematicas#intro-progresiones-binomio-1"
      }
    ],
    "hints": [
      "Escribe el término general $T_{k+1}=\\binom nk a^{n-k}b^k$.",
      "Distingue el número de término $k+1$ del índice $k$.",
      "Iguala el exponente requerido y comprueba que $k$ sea entero entre cero y $n$."
    ],
    "solution": [
      {
        "body": "Para $1\\le k\\le n$, $k\\binom nk=k\\frac{n!}{k!(n-k)!}=\\frac{n!}{(k-1)!(n-k)!}=n\\frac{(n-1)!}{(k-1)!(n-k)!}=n\\binom{n-1}{k-1}$."
      }
    ],
    "finalAnswer": "$k\\binom nk=n\\binom{n-1}{k-1}$ para $1\\le k\\le n$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-fb3a5626ba42",
    "number": "103",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Binomio en dos variables · término con x a la doce",
    "topic": "Progresiones y binomio",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Encuentre el término que contenga $x^{12}$ en la expansión binomial de $(x^2+2y)^{15}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Progresiones y binomio",
        "href": "/cursos/introduccion-matematicas#intro-progresiones-binomio-1"
      }
    ],
    "hints": [
      "Escribe el término general $T_{k+1}=\\binom nk a^{n-k}b^k$.",
      "Distingue el número de término $k+1$ del índice $k$.",
      "Iguala el exponente requerido y comprueba que $k$ sea entero entre cero y $n$."
    ],
    "solution": [
      {
        "body": "El término general es $\\binom{15}k2^k x^{30-2k}y^k$. Exigir $30-2k=12$ da $k=9$. Su coeficiente es $\\binom{15}9 2^9=5005\\cdot512=2562560$."
      }
    ],
    "finalAnswer": "El término es $2562560x^{12}y^9$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-d28d34562431",
    "number": "104",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Operaciones de conjuntos en un universo finito",
    "topic": "Conjuntos",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Considere el conjunto universo dado por $U=\\{n\\in\\mathbb{N} : 1\\leq n \\leq 15 \\}$ y los conjuntos:",
      "$A=\\{n\\in\\mathbb{N} : 1\\leq n \\leq 15, n \\text{ impar} \\}$ ,",
      "$B=\\{n\\in\\mathbb{N} : 1\\leq n \\leq 15, n \\text{ par} \\}$ ,",
      "$C=\\{1,2,5,6,9,10,13,14 \\}$",
      "Determine",
      "1. $A\\cup B$ .",
      "2. $A\\cap B$ .",
      "3. $(A\\cap C)\\cup B$ .",
      "4. $(A- B)^c$ .",
      "5. $[(B\\Delta C)\\cup A]^{c}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Conjuntos",
        "href": "/cursos/introduccion-matematicas#intro-conjuntos-1"
      }
    ],
    "hints": [
      "En este universo, $A$ son los impares y $B$ los pares; son complementarios.",
      "La diferencia simétrica contiene los elementos que están en exactamente uno de los dos conjuntos.",
      "Todos los complementos se toman respecto de $U$."
    ],
    "solution": [
      {
        "body": "1. $A\\cup B=U=\\{1,2,\\ldots,15\\}$. 2. $A\\cap B=\\varnothing$."
      },
      {
        "body": "3. $A\\cap C=\\{1,5,9,13\\}$; al unir con $B$ queda $\\{1,2,4,5,6,8,9,10,12,13,14\\}$."
      },
      {
        "body": "4. Como $A-B=A$, el complemento es $B=\\{2,4,6,8,10,12,14\\}$."
      },
      {
        "body": "5. Fuera de $A$ solo quedan los pares. Un par no está en $B\\mathbin\\Delta C$ exactamente cuando también pertenece a $C$. Así el resultado es $B\\cap C=\\{2,6,10,14\\}$."
      }
    ],
    "finalAnswer": "1. $U$. 2. $\\varnothing$. 3. $\\{1,2,4,5,6,8,9,10,12,13,14\\}$. 4. $B$. 5. $\\{2,6,10,14\\}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-ffd8bffed0e6",
    "number": "105",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Demostración · identidades de conjuntos",
    "topic": "Conjuntos",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Usando álgebra de conjuntos, demuestre que:",
      "1. $(A-B)\\cap (A-C) = A-(B \\cup C)$ .",
      "2. $[A-(A\\cap B)]\\cup[B -(A\\cap B)]\\cup(A\\cap B) = A\\cup B$"
    ],
    "relatedTheory": [
      {
        "label": "Conjuntos",
        "href": "/cursos/introduccion-matematicas#intro-conjuntos-1"
      }
    ],
    "hints": [
      "Sustituye $A-B$ por $A\\cap B^c$.",
      "Usa las leyes de De Morgan y distributividad.",
      "Para la segunda igualdad, separa las partes exclusivas y la parte común."
    ],
    "solution": [
      {
        "body": "1. $(A-B)\\cap(A-C)=(A\\cap B^c)\\cap(A\\cap C^c)=A\\cap(B\\cup C)^c=A-(B\\cup C)$."
      },
      {
        "body": "2. $A-(A\\cap B)=A\\cap(A^c\\cup B^c)=A\\cap B^c$, y análogamente $B-(A\\cap B)=B\\cap A^c$. Las partes $A\\cap B^c$, $B\\cap A^c$ y $A\\cap B$ son disjuntas y cubren exactamente $A\\cup B$."
      }
    ],
    "finalAnswer": "Ambas identidades se cumplen para cualesquiera conjuntos.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-c2afbc479dc8",
    "number": "106",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Encuesta · lectores de ambos periódicos",
    "topic": "Conjuntos",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Se les preguntó a 100 personas su preferencia acerca de los periódicos $A$ y $B$ . Los resultados fueron los siguientes: 65 no leen el periódico $A$ , 45 no leen el periódico $B$ y 50",
      "de ellos leen $A$ o $B$ pero no ambos. Determine la cantidad de personas que leen ambos periódicos."
    ],
    "relatedTheory": [
      {
        "label": "Conjuntos",
        "href": "/cursos/introduccion-matematicas#intro-conjuntos-1"
      }
    ],
    "hints": [
      "Convierte los datos de quienes no leen en cantidades de lectores.",
      "Si $t$ leen ambos, quienes leen solo uno son $|A|+|B|-2t$.",
      "Iguala esa expresión a cincuenta."
    ],
    "solution": [
      {
        "body": "$|A|=100-65=35$, $|B|=100-45=55$. Entonces $35+55-2t=50$, de donde $t=20$. Se comprueba: solo $A$ son $15$, solo $B$ son $35$ y ninguno $30$."
      }
    ],
    "finalAnswer": "$20$ personas leen ambos periódicos.",
    "commonMistake": ""
  },
  {
    "slug": "practica-introduccion-matematicas-2af6dd524a49",
    "number": "107",
    "course": "Introducción a las Matemáticas",
    "courseSlug": "introduccion-matematicas",
    "collection": "Ejercicios",
    "title": "Sumatorias · cotas desplazadas y suma telescópica",
    "topic": "Inducción y sumatorias",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Calcule las siguientes sumatorias:",
      "1. $\\displaystyle{\\sum_{j=10}^{50} (j+1)(j+2)}$",
      "2. $\\displaystyle{\\sum_{j=1}^n\\frac{1}{(j+1)(j+2)}}$"
    ],
    "relatedTheory": [
      {
        "label": "Inducción y sumatorias",
        "href": "/cursos/introduccion-matematicas#intro-induccion-sumatorias-1"
      }
    ],
    "hints": [
      "En una suma doble resuelve primero la suma interior manteniendo fijo el índice exterior.",
      "Para sumas racionales factoriza el denominador y busca una diferencia telescópica.",
      "Escribe los primeros y últimos términos para comprobar las cancelaciones y los extremos."
    ],
    "solution": [
      {
        "body": "1. Expande $j^2+3j+2$. Desde $10$ hasta $50$, $\\sum j^2=42925-285=42640$, $\\sum j=1275-45=1230$ y hay $41$ términos. Total $42640+3(1230)+82=46412$."
      },
      {
        "body": "2. $1/((j+1)(j+2))=1/(j+1)-1/(j+2)$; sumando queda $1/2-1/(n+2)=n/(2(n+2))$."
      }
    ],
    "finalAnswer": "1. $46412$. 2. $n/(2(n+2))$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-17a17ce8d173",
    "number": "108",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Base de polinomios trasladados",
    "topic": "Espacios vectoriales",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $V=\\mathbb{R}_2[x]$ el espacio vectorial de polinomios de grado menor o igual a 2 y sea $a$ un número real. Muestre que el conjunto $S=\\{1, x-a, (x-a)^2\\}$ es una base de $V$ ."
    ],
    "relatedTheory": [
      {
        "label": "Espacios vectoriales",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-3"
      }
    ],
    "hints": [
      "Escribe los polinomios mediante sus coordenadas en $\\{1,x,x^2\\}$.",
      "Coloca esos vectores como columnas de una matriz.",
      "Si el determinante es no nulo, son tres vectores independientes en un espacio de dimensión tres."
    ],
    "solution": [
      {
        "body": "En la base canónica, las columnas de $1,x-a,(x-a)^2$ forman $\\begin{pmatrix}1&-a&a^2\\\\0&1&-2a\\\\0&0&1\\end{pmatrix}$. Su determinante es $1$, para todo $a\\in\\mathbb R$. Por tanto los tres polinomios son independientes y, como $\\dim V=3$, forman una base."
      }
    ],
    "finalAnswer": "$S$ es una base para todo $a\\in\\mathbb R$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-1d63f06908a8",
    "number": "109",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Coordenadas en una base de polinomios trasladados",
    "topic": "Espacios vectoriales",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $V=\\mathbb{R}_2[x]$ el espacio vectorial de polinomios de grado menor o igual a 2 y sea $a$ un número real. Muestre que el conjunto $S=\\{1, x-1, (x-1)^2\\}$ es una base de $V$ .",
      "Encuentre las coordenadas del polinomio $x^2-x$ en dicha base."
    ],
    "relatedTheory": [
      {
        "label": "Espacios vectoriales",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-3"
      }
    ],
    "hints": [
      "Escribe los polinomios mediante sus coordenadas en $\\{1,x,x^2\\}$.",
      "Coloca esos vectores como columnas de una matriz.",
      "Si el determinante es no nulo, son tres vectores independientes en un espacio de dimensión tres."
    ],
    "solution": [
      {
        "body": "En la base canónica, las columnas de $1,x-a,(x-a)^2$ forman $\\begin{pmatrix}1&-a&a^2\\\\0&1&-2a\\\\0&0&1\\end{pmatrix}$. Su determinante es $1$, para todo $a\\in\\mathbb R$. Por tanto los tres polinomios son independientes y, como $\\dim V=3$, forman una base."
      },
      {
        "body": "Para la base indicada se toma $a=1$. Si $u=x-1$, entonces $x^2-x=(u+1)^2-(u+1)=u^2+u$."
      }
    ],
    "finalAnswer": "$S$ es base y $[x^2-x]_S=(0,1,1)^t$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-90598d462af1",
    "number": "110",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Demostración · descomposición en función par e impar",
    "topic": "Espacios vectoriales",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $V$ el $\\mathbb{R}-$ espacio vectorial $\\mathcal{F}(\\mathbb{R})$ . Sean",
      "$$\\begin{aligned} W_1&=\\{f\\in V\\colon f(t)=f(-t) \\text{ para todo }t \\in \\mathbb{R}\\},\\\\ W_2&=\\{f\\in V\\colon f(t)=-f(-t) \\text{ para todo }t \\in \\mathbb{R}\\} \\end{aligned}$$",
      "subespacios de $V$ .",
      "Muestre que $W_1\\cap W_2=\\{0_V\\}$ y todo $v\\in V$ se escribe como $w_1+w_2$ con $w_1\\in W_1$ y $w_2\\in W_2$ .",
      "Aquí $0_V$ denota el vector cero del espacio $V$."
    ],
    "relatedTheory": [
      {
        "label": "Espacios vectoriales",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-3"
      }
    ],
    "hints": [
      "Si una función es par e impar a la vez, compara $f(t)$ y $-f(t)$.",
      "Considera $(f(t)+f(-t))/2$ y $(f(t)-f(-t))/2$.",
      "Comprueba la paridad de cada sumando evaluándolo en $-t$."
    ],
    "solution": [
      {
        "body": "Si $f\\in W_1\\cap W_2$, entonces $f(t)=f(-t)=-f(t)$, luego $2f(t)=0$ para todo $t$. Por tanto $f=0_V$ y la intersección es $\\{0_V\\}$."
      },
      {
        "body": "Para cualquier $f$, define $f_p(t)=(f(t)+f(-t))/2$ y $f_i(t)=(f(t)-f(-t))/2$. Se cumple $f_p(-t)=f_p(t)$, $f_i(-t)=-f_i(t)$ y $f=f_p+f_i$."
      },
      {
        "body": "La descomposición es única: la diferencia entre dos partes pares sería también impar y, por la intersección calculada, sería cero."
      }
    ],
    "finalAnswer": "$W_1\\cap W_2=\\{0_V\\}$ y $f=f_p+f_i$ con las partes indicadas.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-72f8065547a3",
    "number": "111",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Ángulo entre matrices con el producto de Frobenius",
    "topic": "Ortogonalidad",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $V=M_n(\\mathbb{R})$ , con el producto interno habitual: $\\langle A, B\\rangle = tr(A^tB)$ . Si el ángulo entre vectores: Si el ángulo formado por $v$ y $w$ mide $\\alpha$ , entonces $\\cos \\alpha =\\frac{<v, w>}{\\|v\\|\\| w\\|},$ encuentre el ángulo entre las matrices $A=\\begin{pmatrix} 1 & 0 \\\\ 0 & 1\\end{pmatrix}$ y $B=\\begin{pmatrix} \\sqrt{2} & 1 \\\\ 1 & 0\\end{pmatrix}$"
    ],
    "relatedTheory": [
      {
        "label": "Ortogonalidad",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-11"
      }
    ],
    "hints": [
      "Usa el producto interno dado, no uno distinto.",
      "Recuerda que $\\|v\\|=\\sqrt{\\langle v,v\\rangle}$ y $d(u,v)=\\|u-v\\|$.",
      "La ortogonalidad equivale a producto interno cero."
    ],
    "solution": [
      {
        "body": "$\\langle A,B\\rangle=\\operatorname{tr}(A^tB)=\\sqrt2$, $\\|A\\|=\\sqrt2$ y $\\|B\\|=\\sqrt{2+1+1}=2$. Entonces $\\cos\\alpha=\\sqrt2/(2\\sqrt2)=1/2$."
      }
    ],
    "finalAnswer": "$\\alpha=\\pi/3=60^\\circ$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-65390ff0e2c5",
    "number": "112",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Ortogonalidad del residuo de una proyección",
    "topic": "Ortogonalidad",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sean $v,w \\in \\mathbb{R}^n$ , $w\\neq 0$ y $k = \\dfrac{<v,w>}{\\|w\\|^2}.$ Pruebe que $v-kw$ y $w$ son ortogonales."
    ],
    "relatedTheory": [
      {
        "label": "Ortogonalidad",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-11"
      }
    ],
    "hints": [
      "Usa el producto interno dado, no uno distinto.",
      "Recuerda que $\\|v\\|=\\sqrt{\\langle v,v\\rangle}$ y $d(u,v)=\\|u-v\\|$.",
      "La ortogonalidad equivale a producto interno cero."
    ],
    "solution": [
      {
        "body": "Por linealidad, $\\langle v-kw,w\\rangle=\\langle v,w\\rangle-k\\langle w,w\\rangle$. Como $w\\ne0$, $\\langle w,w\\rangle=\\|w\\|^2>0$ y al sustituir $k$ el resultado es cero."
      }
    ],
    "finalAnswer": "$v-kw\\perp w$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-de0dd553dbfd",
    "number": "113",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Independencia de un vector y su imagen",
    "topic": "Espacios vectoriales",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea que $A$ es una matriz de orden $n$ y $x\\in \\mathbb{R}^n$ un vector no nulo. Supongamos",
      "que $A^2x = 0$ , pero $Ax \\neq 0$ . Pruebe que $x$ y $Ax$ son linealmente independientes."
    ],
    "relatedTheory": [
      {
        "label": "Espacios vectoriales",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-3"
      }
    ],
    "hints": [
      "Parte de $\\alpha x+\\beta Ax=0$.",
      "Aplica $A$ a esa relación y usa $A^2x=0$.",
      "Usa primero $Ax\\ne0$ y después $x\\ne0$."
    ],
    "solution": [
      {
        "body": "Aplicando $A$ a $\\alpha x+\\beta Ax=0$ se obtiene $\\alpha Ax+\\beta A^2x=\\alpha Ax=0$. Como $Ax\\ne0$, $\\alpha=0$. La relación original queda $\\beta Ax=0$, por lo que $\\beta=0$."
      }
    ],
    "finalAnswer": "$\\{x,Ax\\}$ es linealmente independiente.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-99bb1ba17d3e",
    "number": "114",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Demostración · partes simétrica y antisimétrica",
    "topic": "Espacios vectoriales",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $V$ el $\\mathbb{R}-$ espacio vectorial $\\mathcal{M}_n(\\mathbb{R})$ . Sea",
      "$$\\begin{aligned} W_1&=\\{A\\in \\mathcal{M}_n(\\mathbb{R})\\colon A=A^t\\},\\\\ W_2&=\\{A\\in \\mathcal{M}_n(\\mathbb{R})\\colon -A=A^t\\}, \\end{aligned}$$",
      "subespacios de $V$ . Muestre que $W_1\\cap W_2=\\{0_V\\}$ y todo $v\\in V$ se escribe como $w_1+w_2$ con $w_1\\in W_1$ y $w_2\\in W_2$ .",
      "Aquí $0_V$ denota el vector cero del espacio $V$."
    ],
    "relatedTheory": [
      {
        "label": "Espacios vectoriales",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-3"
      }
    ],
    "hints": [
      "Si $A^t=A$ y $A^t=-A$, ¿qué se deduce de $2A$?",
      "Prueba con $S=(A+A^t)/2$ y $K=(A-A^t)/2$.",
      "Calcula $S^t$, $K^t$ y $S+K$."
    ],
    "solution": [
      {
        "body": "Si $A$ pertenece a ambos subespacios, $A=A^t=-A$, así que $A=0_V$. Recíprocamente la matriz cero pertenece a ambos."
      },
      {
        "body": "Para toda matriz real cuadrada, $S=(A+A^t)/2$ satisface $S^t=S$, mientras $K=(A-A^t)/2$ satisface $K^t=-K$. Además $S+K=A$. La intersección trivial hace única esta descomposición."
      }
    ],
    "finalAnswer": "$W_1\\cap W_2=\\{0_V\\}$ y $A=(A+A^t)/2+(A-A^t)/2$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-01d99ff5eb2f",
    "number": "115",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Parámetro para que dos vectores sean ortogonales",
    "topic": "Ortogonalidad",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine el valor de $m$ tal que los vectores $x = (1, m + 1, m)$ y $y = (m -1, m, m + 1)$ sean ortogonales."
    ],
    "relatedTheory": [
      {
        "label": "Ortogonalidad",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-11"
      }
    ],
    "hints": [
      "Usa el producto interno dado, no uno distinto.",
      "Recuerda que $\\|v\\|=\\sqrt{\\langle v,v\\rangle}$ y $d(u,v)=\\|u-v\\|$.",
      "La ortogonalidad equivale a producto interno cero."
    ],
    "solution": [
      {
        "body": "$\\langle x,y\\rangle=(m-1)+m(m+1)+m(m+1)=2m^2+3m-1$. Igualando a cero y resolviendo la cuadrática se obtiene $m=(-3\\pm\\sqrt{17})/4$."
      }
    ],
    "finalAnswer": "$m=(-3\\pm\\sqrt{17})/4$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-7f4fc57e5dc9",
    "number": "116",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Norma y distancia entre funciones continuas",
    "topic": "Ortogonalidad",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $V=\\mathcal{C}([0,1],\\mathbb{R})$ el $\\mathbb{R}-$ espacio vectorial de funciones continuas de $[0,1]$ en $\\mathbb{R}$ con el producto interno usual",
      "$$\\langle f, g\\rangle = \\int_0^1 f(x) \\cdot g(x)\\;dx.$$",
      "Sea $f(x)=x$ y $g(x)=x^2$ funciones en $V$ .",
      "1. Determine $\\|f\\|$ .",
      "2. Si la distancia entre dos vectores se define como $d(u,v)=\\|u-v\\|.$ Determine la distancia entre $f$ y $g$ ."
    ],
    "relatedTheory": [
      {
        "label": "Ortogonalidad",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-11"
      }
    ],
    "hints": [
      "Usa el producto interno dado, no uno distinto.",
      "Recuerda que $\\|v\\|=\\sqrt{\\langle v,v\\rangle}$ y $d(u,v)=\\|u-v\\|$.",
      "La ortogonalidad equivale a producto interno cero."
    ],
    "solution": [
      {
        "body": "$\\|f\\|^2=\\int_0^1x^2\\,dx=1/3$. Además $d(f,g)^2=\\int_0^1(x-x^2)^2\\,dx=1/3-1/2+1/5=1/30$."
      }
    ],
    "finalAnswer": "$\\|f\\|=1/\\sqrt3$ y $d(f,g)=1/\\sqrt{30}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-2361c5fac7c4",
    "number": "117",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Combinación lineal dependiente de un parámetro",
    "topic": "Espacios vectoriales",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sean $v = (1, -2, k)$ , $u = (3, k, -2)$ y $w = (2, -1, -5)$ ¿Para que valores de $k\\in \\mathbb{R}$ el vector $v$ es combinación lineal de vectores $u$ y $w$ ?"
    ],
    "relatedTheory": [
      {
        "label": "Espacios vectoriales",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-3"
      }
    ],
    "hints": [
      "Para que $v$ esté generado por $u,w$, el determinante con esas tres columnas debe ser cero.",
      "Calcula $u\\times w$ y su producto con $v$.",
      "Completa el cuadrado en el polinomio resultante."
    ],
    "solution": [
      {
        "body": "$u\\times w=(-5k-2,11,-3-2k)$. Por tanto $v\\cdot(u\\times w)=-2k^2-8k-24=-2((k+2)^2+8)$, que nunca es cero para $k\\in\\mathbb R$. Los tres vectores son independientes para todo parámetro real."
      }
    ],
    "finalAnswer": "No hay valores reales de $k$ que cumplan la condición.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-fc97eefba495",
    "number": "118",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Subespacio de funciones que se anulan en dos puntos",
    "topic": "Espacios vectoriales",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $\\mathcal{F}(\\mathbb{R})=\\{f:\\mathbb{R}\\to \\mathbb{R}\\mid f \\text{ funci\\'on}\\}$ el espacio vectorial sobre $\\mathbb{R}$ de funciones de variable y valores reales. Muestre que $S=\\{f\\in \\mathcal{F}(\\mathbb{R})\\colon f(0)=f(1)=0 \\}$ es un subespacio vectorial de $\\mathcal{F}(\\mathbb{R})$ ."
    ],
    "relatedTheory": [
      {
        "label": "Espacios vectoriales",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-3"
      }
    ],
    "hints": [
      "Verifica que la función cero pertenece al conjunto.",
      "Toma dos funciones del conjunto y una combinación lineal de ellas.",
      "Evalúa esa combinación en cero y en uno."
    ],
    "solution": [
      {
        "body": "La función cero satisface las dos condiciones. Si $f,g\\in S$ y $a,b\\in\\mathbb R$, entonces $(af+bg)(0)=af(0)+bg(0)=0$ y análogamente $(af+bg)(1)=0$. Luego toda combinación lineal permanece en $S$, que es subespacio."
      }
    ],
    "finalAnswer": "$S$ es un subespacio vectorial.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-7e00d326c51c",
    "number": "119",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Subespacio definido por una ecuación propia",
    "topic": "Espacios vectoriales",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $A$ una matriz cuadrada de orden $n$ y $\\lambda$ un escalar en $\\mathbb{R}$ . Pruebe que el conjunto",
      "$$S=\\{v\\in \\mathbb{R}^n \\colon Av=\\lambda v\\},$$",
      "es un subespacio de $\\mathbb{R}^n$ ."
    ],
    "relatedTheory": [
      {
        "label": "Espacios vectoriales",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-3"
      }
    ],
    "hints": [
      "Reescribe $Av=\\lambda v$ como $(A-\\lambda I)v=0$.",
      "El conjunto solución es un núcleo.",
      "O verifica directamente estabilidad bajo combinaciones lineales."
    ],
    "solution": [
      {
        "body": "$S=\\ker(A-\\lambda I)$, núcleo de una aplicación lineal. También, si $u,v\\in S$, $A(au+bv)=a\\lambda u+b\\lambda v=\\lambda(au+bv)$, y $0\\in S$. No es necesario que $\\lambda$ sea valor propio: en caso contrario $S=\\{0\\}$."
      }
    ],
    "finalAnswer": "$S$ es subespacio, incluso cuando solo contiene al vector cero.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-817e1b3cd571",
    "number": "120",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Base ortogonal de un plano por el origen",
    "topic": "Ortogonalidad",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Para el subespacio de $\\mathbb{R}^3$ definido por",
      "$$H=\\{(x,y,z)\\in\\mathbb{R}^3\\colon x+y=0 \\}$$",
      "1. Encuentre una base de $H$ .",
      "2. Calcule la norma de cada elemento de la base.",
      "3. ¿Es una base ortogonal?¿Es ortonormal?"
    ],
    "relatedTheory": [
      {
        "label": "Ortogonalidad",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-11"
      }
    ],
    "hints": [
      "Usa el producto interno dado, no uno distinto.",
      "Recuerda que $\\|v\\|=\\sqrt{\\langle v,v\\rangle}$ y $d(u,v)=\\|u-v\\|$.",
      "La ortogonalidad equivale a producto interno cero."
    ],
    "solution": [
      {
        "body": "De $x+y=0$ resulta $(x,y,z)=x(1,-1,0)+z(0,0,1)$. Los dos generadores son independientes. Sus normas son $\\sqrt2$ y $1$, y su producto interno es cero."
      }
    ],
    "finalAnswer": "Una base es $\\{(1,-1,0),(0,0,1)\\}$: ortogonal, pero no ortonormal. Al dividir el primer vector por $\\sqrt2$ se obtiene una ortonormal.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-4c34761ee9b0",
    "number": "121",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Ortogonalidad de una base bajo dos productos internos",
    "topic": "Ortogonalidad",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $V=\\mathbb{R}_2[x]$ el espacio vectorial de polinomios de grado menor o igual a 2, con la base ${S=\\{1, x, x^2-1/3\\}}$ .",
      "¿Es $S$ una base ortogonal con los siguientes productos internos?",
      "1. $\\langle p(x), q(x)\\rangle = \\int_{-1}^1p(x)q(x)\\;dx.$",
      "2. $p(x)\\cdot q(x)=p(0)q(0)+p(1)q(1)+p(2)q(2).$"
    ],
    "relatedTheory": [
      {
        "label": "Ortogonalidad",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-11"
      }
    ],
    "hints": [
      "Usa el producto interno dado, no uno distinto.",
      "Recuerda que $\\|v\\|=\\sqrt{\\langle v,v\\rangle}$ y $d(u,v)=\\|u-v\\|$.",
      "La ortogonalidad equivale a producto interno cero."
    ],
    "solution": [
      {
        "body": "1. $\\int_{-1}^1x\\,dx=0$, $\\int_{-1}^1(x^2-1/3)\\,dx=2/3-2/3=0$ y $\\int_{-1}^1x(x^2-1/3)\\,dx=0$ por imparidad. Los tres pares son ortogonales."
      },
      {
        "body": "2. Basta un contraejemplo: $\\langle1,x\\rangle=0+1+2=3\\ne0$."
      }
    ],
    "finalAnswer": "Es ortogonal para el primer producto interno, pero no para el segundo.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-a3c3241958d8",
    "number": "122",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Imagen de una proyección sobre un plano",
    "topic": "Transformaciones lineales",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Encuentre la imagen de $T( x , y , z ) = ( x , y , 0 )$"
    ],
    "relatedTheory": [
      {
        "label": "Transformaciones lineales",
        "href": "/cursos/algebra-lineal#unidad-5-seccion-2"
      }
    ],
    "hints": [
      "Escribe las imágenes de los vectores de la base como columnas.",
      "Usa que $T(\\alpha u+\\beta v)=\\alpha T(u)+\\beta T(v)$.",
      "Para núcleo, resuelve $T(v)=0$; para imagen, estudia el espacio generado por las columnas."
    ],
    "solution": [
      {
        "body": "Las primeras dos componentes de $T(x,y,z)=(x,y,0)$ son libres. Por ello la imagen es el plano generado por $(1,0,0)$ y $(0,1,0)$."
      }
    ],
    "finalAnswer": "$\\operatorname{Im}T=\\{(a,b,0):a,b\\in\\mathbb R\\}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-4de2d981d74f",
    "number": "123",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Composición de transformaciones y matrices",
    "topic": "Transformaciones lineales",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sean $T, H:\\mathbb{R}^2 \\to \\mathbb{R}^2$ transformaciones lineales tales que $[T]=\\begin{pmatrix} -4 & -6 \\\\ 3 & 5 \\end{pmatrix}$ y $[H]=\\begin{pmatrix} 2 & 0 \\\\ -1 & 4 \\end{pmatrix}$ en las bases canónicas.",
      "1. Determine $M=[T\\circ H]$ .",
      "2. Calcule $(T \\circ H)(2,3)$ ."
    ],
    "relatedTheory": [
      {
        "label": "Transformaciones lineales",
        "href": "/cursos/algebra-lineal#unidad-5-seccion-2"
      }
    ],
    "hints": [
      "Respeta el orden de los factores: las matrices no conmutan en general.",
      "Escribe cada entrada o aplica una identidad válida para matrices.",
      "Comprueba el resultado sustituyendo en la igualdad original."
    ],
    "solution": [
      {
        "body": "$[T\\circ H]=[T][H]=\\begin{pmatrix}-2&-24\\\\1&20\\end{pmatrix}$. El orden corresponde a aplicar primero $H$."
      },
      {
        "body": "Multiplicando por $(2,3)^t$ se obtiene $(-4-72,2+60)=(-76,62)$."
      }
    ],
    "finalAnswer": "$M=\\begin{pmatrix}-2&-24\\\\1&20\\end{pmatrix}$ y $(T\\circ H)(2,3)=(-76,62)$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-81fbcc690fdc",
    "number": "124",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Reconstruir una transformación desde una base",
    "topic": "Transformaciones lineales",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $T:\\mathbb{R}^3 \\rightarrow \\mathbb{R}^2$ transformación lineal dada por:",
      "$$T(1,0,0)=(-1,2),\\quad T(0,1,0)=(0,0),\\quad T(0,0,1)=(2,1).$$",
      "1. Encuentre una fórmula para $T(x, y, z)$ para todo $(x, y, z) \\in \\mathbb{R}^3$ .",
      "2. Determine la matriz de la transformación lineal $[T]$ en la base canónica."
    ],
    "relatedTheory": [
      {
        "label": "Transformaciones lineales",
        "href": "/cursos/algebra-lineal#unidad-5-seccion-2"
      }
    ],
    "hints": [
      "Escribe las imágenes de los vectores de la base como columnas.",
      "Usa que $T(\\alpha u+\\beta v)=\\alpha T(u)+\\beta T(v)$.",
      "Para núcleo, resuelve $T(v)=0$; para imagen, estudia el espacio generado por las columnas."
    ],
    "solution": [
      {
        "body": "$(x,y,z)=xe_1+ye_2+ze_3$, así $T(x,y,z)=x(-1,2)+y(0,0)+z(2,1)=(-x+2z,2x+z)$. Las imágenes de la base son las columnas de la matriz."
      }
    ],
    "finalAnswer": "$T(x,y,z)=(-x+2z,2x+z)$ y $[T]=\\begin{pmatrix}-1&0&2\\\\2&0&1\\end{pmatrix}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-3043a2956474",
    "number": "125",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Comprobar la linealidad de una transformación",
    "topic": "Transformaciones lineales",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine si $T:\\mathbb{R}^2 \\rightarrow \\mathbb{R}^3$ definida por $T( a , b )= ( 3a+2b , a-b , -a+b )$ es una transformación lineal."
    ],
    "relatedTheory": [
      {
        "label": "Transformaciones lineales",
        "href": "/cursos/algebra-lineal#unidad-5-seccion-2"
      }
    ],
    "hints": [
      "Busca una matriz $A$ tal que $T(v)=Av$.",
      "Sus columnas son $T(1,0)$ y $T(0,1)$.",
      "Usa $A(\\alpha u+\\beta v)=\\alpha Au+\\beta Av$."
    ],
    "solution": [
      {
        "body": "$T(a,b)=\\begin{pmatrix}3&2\\\\1&-1\\\\-1&1\\end{pmatrix}\\begin{pmatrix}a\\\\b\\end{pmatrix}$. Al ser multiplicación por una matriz fija, preserva sumas y productos por escalares: $T(\\alpha u+\\beta v)=\\alpha T(u)+\\beta T(v)$."
      }
    ],
    "finalAnswer": "Sí, $T$ es lineal.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-f0cac312ea44",
    "number": "126",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Núcleo de una transformación en tres variables",
    "topic": "Transformaciones lineales",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Encuentre el núcleo de $T( x , y , z ) = ( x , y-z , 0 )$ ."
    ],
    "relatedTheory": [
      {
        "label": "Transformaciones lineales",
        "href": "/cursos/algebra-lineal#unidad-5-seccion-2"
      }
    ],
    "hints": [
      "Impón $T(x,y,z)=(0,0,0)$.",
      "Las ecuaciones son $x=0$ e $y-z=0$.",
      "Toma $z=t$ como parámetro libre."
    ],
    "solution": [
      {
        "body": "La condición $T(x,y,z)=0$ equivale a $x=0$, $y=z$. Por tanto los elementos del núcleo son $(0,t,t)=t(0,1,1)$, con $t\\in\\mathbb R$."
      }
    ],
    "finalAnswer": "$\\ker T=\\operatorname{span}\\{(0,1,1)\\}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-a8a1c80a7f3c",
    "number": "127",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Preimagen de un vector en cuatro dimensiones",
    "topic": "Transformaciones lineales",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $T:\\mathbb{R}^3 \\rightarrow \\mathbb{R}^4$ transformación lineal definida por:",
      "$$T(x, y, z) = (x+ y - z, 2x+ y-z, 3x+ 2y -2z, -y+ z)$$",
      "Encuentre $(x, y, z) \\in \\mathbb{R}^3$ tal que $T(x, y, z) = (2,-1,1,-5)$ ."
    ],
    "relatedTheory": [
      {
        "label": "Transformaciones lineales",
        "href": "/cursos/algebra-lineal#unidad-5-seccion-2"
      }
    ],
    "hints": [
      "Escribe las imágenes de los vectores de la base como columnas.",
      "Usa que $T(\\alpha u+\\beta v)=\\alpha T(u)+\\beta T(v)$.",
      "Para núcleo, resuelve $T(v)=0$; para imagen, estudia el espacio generado por las columnas."
    ],
    "solution": [
      {
        "body": "Restando la primera ecuación de la segunda se obtiene $x=-3$. De $x+y-z=2$ resulta $y-z=5$. Las otras dos ecuaciones quedan $3x+2(y-z)=1$ y $-(y-z)=-5$, ambas verificadas."
      }
    ],
    "finalAnswer": "Todas las soluciones son $(x,y,z)=(-3,t+5,t)$, $t\\in\\mathbb R$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-e8373bf6693c",
    "number": "128",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Evaluar una transformación mediante linealidad",
    "topic": "Transformaciones lineales",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $T$ una transformación lineal de $\\mathbb{R}^3$ en $\\mathbb{R}^2$ y suponga que",
      "$$T ( 1 , 0 , 0 ) = ( 2 , 3 ), \\quad T ( 0 , 1 , 0 ) = ( -1 , 4 ), \\quad T ( 0 , 0 , 1 ) = ( 5 , -3 ).$$",
      "1. Calcule $T( 3 , -4 , 5 )$ .",
      "2. Determine la matriz de la transformación lineal $[T]$ en la base canónica."
    ],
    "relatedTheory": [
      {
        "label": "Transformaciones lineales",
        "href": "/cursos/algebra-lineal#unidad-5-seccion-2"
      }
    ],
    "hints": [
      "Escribe las imágenes de los vectores de la base como columnas.",
      "Usa que $T(\\alpha u+\\beta v)=\\alpha T(u)+\\beta T(v)$.",
      "Para núcleo, resuelve $T(v)=0$; para imagen, estudia el espacio generado por las columnas."
    ],
    "solution": [
      {
        "body": "$T(3,-4,5)=3(2,3)-4(-1,4)+5(5,-3)=(35,-22)$. La matriz tiene esas tres imágenes originales como columnas."
      }
    ],
    "finalAnswer": "$T(3,-4,5)=(35,-22)$; $[T]=\\begin{pmatrix}2&-1&5\\\\3&4&-3\\end{pmatrix}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-69c1f1ff963e",
    "number": "129",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Linealidad de una aplicación sobre polinomios",
    "topic": "Transformaciones lineales",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine si $F: \\mathbb{R}_2[x] \\rightarrow \\mathbb{R}^2$ , definida por $F(a+bx+cx^2 )=(a-c,b+c)$ es una transformación lineal."
    ],
    "relatedTheory": [
      {
        "label": "Transformaciones lineales",
        "href": "/cursos/algebra-lineal#unidad-5-seccion-2"
      }
    ],
    "hints": [
      "Escribe las imágenes de los vectores de la base como columnas.",
      "Usa que $T(\\alpha u+\\beta v)=\\alpha T(u)+\\beta T(v)$.",
      "Para núcleo, resuelve $T(v)=0$; para imagen, estudia el espacio generado por las columnas."
    ],
    "solution": [
      {
        "body": "El mapa de coordenadas $a+bx+cx^2\\mapsto(a,b,c)$ es lineal. Sobre esas coordenadas $F$ es multiplicación por $\\begin{pmatrix}1&0&-1\\\\0&1&1\\end{pmatrix}$, que preserva sumas y productos escalares."
      }
    ],
    "finalAnswer": "$F$ es lineal.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-cd49bd42536d",
    "number": "130",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Rango a partir de las imágenes posibles",
    "topic": "Transformaciones lineales",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine el rango de $T( x , y , z ) = (-x , z , 0 )$ ."
    ],
    "relatedTheory": [
      {
        "label": "Transformaciones lineales",
        "href": "/cursos/algebra-lineal#unidad-5-seccion-2"
      }
    ],
    "hints": [
      "Describe todos los posibles valores de $(-x,z,0)$.",
      "Las primeras dos componentes pueden elegirse libremente.",
      "Encuentra una base del plano de salida."
    ],
    "solution": [
      {
        "body": "La imagen es $\\{(a,b,0):a,b\\in\\mathbb R\\}$. Los vectores $(1,0,0)$ y $(0,1,0)$ forman una base de ese espacio, cuya dimensión es $2$."
      }
    ],
    "finalAnswer": "$\\operatorname{rango}(T)=2$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-cf3a9b181ffb",
    "number": "131",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Inyectividad y núcleo",
    "topic": "Transformaciones lineales",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine si $T: \\mathbb{R}^2 \\rightarrow \\mathbb{R}^2$ , definida por $T( x , y) = ( x-y , 2x-2y )$ es inyectiva."
    ],
    "relatedTheory": [
      {
        "label": "Transformaciones lineales",
        "href": "/cursos/algebra-lineal#unidad-5-seccion-2"
      }
    ],
    "hints": [
      "Una transformación lineal es inyectiva si su núcleo contiene solo el vector cero.",
      "Resuelve $x-y=0$.",
      "Compara las imágenes de $(0,0)$ y $(1,1)$."
    ],
    "solution": [
      {
        "body": "$T(x,y)=0$ cuando $x=y$. Así $\\ker T=\\operatorname{span}\\{(1,1)\\}$ no es trivial. En particular, $T(0,0)=T(1,1)=(0,0)$ aunque los puntos son distintos."
      }
    ],
    "finalAnswer": "No es inyectiva.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-49c0ea56aa4b",
    "number": "132",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Matriz e isomorfismo hacia un espacio de polinomios",
    "topic": "Transformaciones lineales",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $T:\\mathbb{R}^3 \\rightarrow \\mathbb{R}_2[x]$ y sea $B$ y $C$ las bases canónicas de $\\mathbb{R}^3$ y de $\\mathbb{R}_2[x]$ respectivamente, tales que",
      "$$T ( 1 , 0 , 0 ) = 5x^2+2x-1, \\quad T ( 0 , 1 , 0 ) = 3x+2, \\quad T ( 0 , 0 , 1 ) =4.$$",
      "1. Determine la matriz de la transformación lineal $[T]$ en las bases canónicas.",
      "2. Determine si $T$ es un isomorfismo."
    ],
    "relatedTheory": [
      {
        "label": "Transformaciones lineales",
        "href": "/cursos/algebra-lineal#unidad-5-seccion-2"
      }
    ],
    "hints": [
      "Escribe las imágenes de los vectores de la base como columnas.",
      "Usa que $T(\\alpha u+\\beta v)=\\alpha T(u)+\\beta T(v)$.",
      "Para núcleo, resuelve $T(v)=0$; para imagen, estudia el espacio generado por las columnas."
    ],
    "solution": [
      {
        "body": "Usando el orden $C=(1,x,x^2)$, las columnas son $(-1,2,5)^t,(2,3,0)^t,(4,0,0)^t$. Por tanto $[T]=\\begin{pmatrix}-1&2&4\\\\2&3&0\\\\5&0&0\\end{pmatrix}$."
      },
      {
        "body": "Su determinante es $-60\\ne0$, por lo que la transformación es invertible y es un isomorfismo."
      }
    ],
    "finalAnswer": "$[T]=\\begin{pmatrix}-1&2&4\\\\2&3&0\\\\5&0&0\\end{pmatrix}$; sí es isomorfismo.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-4e633a156f71",
    "number": "133",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Límites · cociente de polinomios y derivada del logaritmo",
    "topic": "Límites y continuidad",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine (si existen) los siguientes límites:",
      "1. $\\displaystyle{\\lim_{x\\to \\infty}\\frac{7x^3-4x+16}{5x^3-x+3}}$",
      "2. $\\displaystyle{\\lim_{x\\to a}\\left(\\frac{\\ln(x)-\\ln(a)}{x-a}\\right)}$"
    ],
    "relatedTheory": [
      {
        "label": "Límites y continuidad",
        "href": "/cursos/calculo-diferencial#limites-seccion-2"
      }
    ],
    "hints": [
      "Comprueba si puedes sustituir directamente o aparece una indeterminación.",
      "En cocientes de polinomios al infinito compara los grados; en diferencias usa factorización o racionalización.",
      "Una expresión de la forma $(f(a+h)-f(a))/h$ puede reconocerse como una derivada."
    ],
    "solution": [
      {
        "body": "1. Dividiendo numerador y denominador por $x^3$, el límite es $7/5$."
      },
      {
        "body": "2. Si $a>0$, es la definición de la derivada de $\\ln x$ en $a$, cuyo valor es $1/a$. Si $a\\le0$, $\\ln a$ no está definido en los reales, por lo que el límite escrito no es una expresión real válida."
      }
    ],
    "finalAnswer": "1. $7/5$. 2. $1/a$ para $a>0$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-8b24181746d3",
    "number": "134",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Tangente a una curva implícita con seno",
    "topic": "Derivadas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine la ecuación de la recta tangente a la curva $$y^2+\\sin(x+y)+3x^2=3\\pi^2$$ en el punto $(\\pi,0)$ . Verifique que el punto se encuentra en la curva."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Comprueba primero que el punto pertenece a la curva.",
      "Deriva; si la ecuación es implícita, trata $y$ como función de $x$.",
      "Usa $y-y_0=m(x-x_0)$. Para la normal, la pendiente es $-1/m$ cuando $m\\ne0$."
    ],
    "solution": [
      {
        "body": "En $(\\pi,0)$, el lado izquierdo es $0+\\sin\\pi+3\\pi^2=3\\pi^2$."
      },
      {
        "body": "Derivando: $2yy'+\\cos(x+y)(1+y')+6x=0$. En el punto queda $-(1+y')+6\\pi=0$, así $m=6\\pi-1$."
      }
    ],
    "finalAnswer": "$y=(6\\pi-1)(x-\\pi)$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-fa3f94e00490",
    "number": "135",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Producto y segunda derivada de una exponencial de seno",
    "topic": "Derivadas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $f(x)=e^{\\sin(2x)}$ y sea $g(x)=xf'(x)$ . Calcule $g'(x)$"
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Identifica las operaciones exteriores antes de derivar.",
      "Aplica las reglas de producto, cociente y cadena según corresponda.",
      "Conserva los factores de las derivadas interiores y revisa el dominio."
    ],
    "solution": [
      {
        "body": "$f'=2\\cos(2x)e^{\\sin(2x)}$. Por producto y cadena, $f''=4e^{\\sin(2x)}(\\cos^2(2x)-\\sin(2x))$."
      },
      {
        "body": "Como $g=xf'$, $g'=f'+xf''$."
      }
    ],
    "finalAnswer": "$g'=e^{\\sin(2x)}[2\\cos(2x)+4x(\\cos^2(2x)-\\sin(2x))]$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-1a73c47958de",
    "number": "136",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Límites · polinomios y diferencia de exponenciales",
    "topic": "Límites y continuidad",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine (si existen) los siguientes límites:",
      "1. $\\displaystyle{\\lim_{x\\to \\infty}\\frac{7x^3-4x+16}{5x^3-x+3}}$",
      "2. $\\displaystyle{\\lim_{x\\to 0}\\frac{e^{ax}-e^{bx}}{x}}$"
    ],
    "relatedTheory": [
      {
        "label": "Límites y continuidad",
        "href": "/cursos/calculo-diferencial#limites-seccion-2"
      }
    ],
    "hints": [
      "Comprueba si puedes sustituir directamente o aparece una indeterminación.",
      "En cocientes de polinomios al infinito compara los grados; en diferencias usa factorización o racionalización.",
      "Una expresión de la forma $(f(a+h)-f(a))/h$ puede reconocerse como una derivada."
    ],
    "solution": [
      {
        "body": "1. Al dividir por $x^3$, se obtiene $7/5$."
      },
      {
        "body": "2. Escribe $(e^{ax}-1)/x-(e^{bx}-1)/x$. Cada término es un cociente incremental en cero, con límites $a$ y $b$ respectivamente."
      }
    ],
    "finalAnswer": "1. $7/5$. 2. $a-b$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-47e32d6cd43b",
    "number": "137",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Tangente implícita con raíces cúbicas",
    "topic": "Derivadas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine la ecuación de la recta tangente a la curva $$\\sqrt[3]{x^2}-\\sqrt[3]{y^2}-2y=2$$ en el punto $(1,-1)$ . Verifique que el punto se encuentra en la curva."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Comprueba primero que el punto pertenece a la curva.",
      "Deriva; si la ecuación es implícita, trata $y$ como función de $x$.",
      "Usa $y-y_0=m(x-x_0)$. Para la normal, la pendiente es $-1/m$ cuando $m\\ne0$."
    ],
    "solution": [
      {
        "body": "El punto verifica $1-1+2=2$. Cerca de $(1,-1)$ se puede derivar: $\\frac{2}{3\\sqrt[3]x}-\\frac{2y'}{3\\sqrt[3]y}-2y'=0$."
      },
      {
        "body": "Sustituyendo resulta $2/3+(2/3)y'-2y'=0$, luego $y'=1/2$."
      }
    ],
    "finalAnswer": "$y+1=\\frac12(x-1)$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-fd592a0bcfe5",
    "number": "138",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Producto y segunda derivada de una exponencial de coseno",
    "topic": "Derivadas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $f(x)=e^{\\cos(2x)}$ y sea $g(x)=xf'(x)$ . Calcule $g'(x)$"
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Identifica las operaciones exteriores antes de derivar.",
      "Aplica las reglas de producto, cociente y cadena según corresponda.",
      "Conserva los factores de las derivadas interiores y revisa el dominio."
    ],
    "solution": [
      {
        "body": "$f'=-2\\sin(2x)e^{\\cos(2x)}$ y $f''=4e^{\\cos(2x)}(\\sin^2(2x)-\\cos(2x))$."
      },
      {
        "body": "Derivando $g=xf'$ se obtiene $g'=f'+xf''$."
      }
    ],
    "finalAnswer": "$g'=e^{\\cos(2x)}[-2\\sin(2x)+4x(\\sin^2(2x)-\\cos(2x))]$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-4ac098d97f17",
    "number": "139",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Pendiente de una curva paramétrica trigonométrica",
    "topic": "Curvas paramétricas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Considere la curva paramétrica",
      "$$\\left \\{ \\begin{array}{ll} x(t)=&2(t-\\sin(t)),\\\\ y(t)=&2t^2(1-t), \\\\ \\end{array} \\right .$$",
      "con $t\\in \\mathbb{R}$ .",
      "Determine $\\dfrac{dy}{dx}$ en el punto $(x,y)$ tal que $t=\\dfrac{\\pi}{6}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Curvas paramétricas",
        "href": "/cursos/calculo-diferencial#inversa-parametricas-seccion-2"
      }
    ],
    "hints": [
      "Calcula $x'(t)$ e $y'(t)$.",
      "Usa $dy/dx=y'(t)/x'(t)$ cuando $x'(t)\\ne0$.",
      "Sustituye $t=\\pi/6$ después de derivar."
    ],
    "solution": [
      {
        "body": "$x'=2(1-\\cos t)$, $y'=4t-6t^2$. En $t=\\pi/6$, el denominador es $2-\\sqrt3>0$ y el numerador $2\\pi/3-\\pi^2/6$."
      }
    ],
    "finalAnswer": "$\\frac{dy}{dx}=\\frac{\\pi(4-\\pi)}{6(2-\\sqrt3)}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-05f92038a429",
    "number": "140",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Pendiente de una curva paramétrica polinómica",
    "topic": "Curvas paramétricas",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Considere la curva paramétrica",
      "$$\\left \\{ \\begin{array}{ll} x(t)=&2t+3t^2,\\\\ y(t)=&t^2+2t^3, \\\\ \\end{array} \\right .$$",
      "con $t\\in \\mathbb{R}$ .",
      "Determine $\\dfrac{dy}{dx}$ en el punto $(x,y)$ tal que $t=-1$ ."
    ],
    "relatedTheory": [
      {
        "label": "Curvas paramétricas",
        "href": "/cursos/calculo-diferencial#inversa-parametricas-seccion-2"
      }
    ],
    "hints": [
      "Deriva las dos coordenadas respecto de $t$.",
      "Divide $y'(t)$ entre $x'(t)$.",
      "Verifica que $x'(-1)\\ne0$."
    ],
    "solution": [
      {
        "body": "$x'=2+6t$ e $y'=2t+6t^2=t(2+6t)$. En $t=-1$, $x'=-4$, $y'=4$ y el punto es $(1,-1)$."
      }
    ],
    "finalAnswer": "$dy/dx=-1$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-80a4f5d339a1",
    "number": "141",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Derivación implícita · ocho casos y sus dominios",
    "topic": "Derivadas",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Obtenga la derivada $\\frac{d y}{dx}$ para las siguientes funciones implícitas.",
      "1. $y\\ln(x)+x\\ln(y)=0$ .",
      "2. $\\sin(xy)=xy$ .",
      "3. $\\ln(xy)=xy$ .",
      "4. $y=e^x+e^y$ .",
      "5. $\\sqrt{x+y}=xy$ .",
      "6. $\\frac{x^2}{y^2}-\\frac{y^2}{x^2}$ =0.",
      "7. $y^2-x=x^2-y$ .",
      "8. $y=\\frac{x}{y}-x^3$ ."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Antes de derivar, comprueba que la ecuación define puntos reales.",
      "Deriva ambos miembros con la regla de la cadena y agrupa los términos con $y'$.",
      "No dividas por un factor nulo. Revisa por separado los puntos singulares."
    ],
    "solution": [
      {
        "body": "1. Para $x,y>0$, $y'\\ln x+y/x+\\ln y+xy'/y=0$, luego $y'=-(y/x+\\ln y)/(\\ln x+x/y)$ donde el denominador no sea cero."
      },
      {
        "body": "2. En números reales, $\\sin u=u$ solo para $u=0$: para $u>0$, $u-\\sin u=\\int_0^u(1-\\cos t)\\,dt>0$, y por simetría tampoco hay otra raíz negativa. Por tanto $xy=0$. La rama $y=0$ tiene derivada $0$; la recta $x=0$ es vertical y no es una gráfica $y(x)$. En el origen se cruzan ambas ramas, de modo que no hay una tangente única para toda la curva."
      },
      {
        "body": "3. Si $u=xy>0$, la desigualdad $\\ln u\\le u-1<u$ impide $\\ln(xy)=xy$. No hay puntos reales."
      },
      {
        "body": "4. La ecuación $y=e^x+e^y$ no tiene puntos reales: $e^y\\ge1+y$ implica $y-e^y\\le-1$, mientras que $e^x>0$. Por tanto no hay una función real que derivar. La manipulación formal $y'=e^x/(1-e^y)$ no representa una solución real."
      },
      {
        "body": "5. Para $\\sqrt{x+y}=xy$ se exige $x+y\\ge0$, $xy\\ge0$. Cuando $x+y>0$, $(1+y')/(2\\sqrt{x+y})=y+xy'$, luego $y'=(2y\\sqrt{x+y}-1)/(1-2x\\sqrt{x+y})$ si el denominador no es cero. El único punto con $x+y=0$ es $(0,0)$; al cuadrar se obtiene $x+y=x^2y^2$ y la rama local tiene pendiente $-1$, pero salvo el origen tiene $xy<0$. Así el origen está aislado en la curva original y no define una derivada $y(x)$."
      },
      {
        "body": "6. Para $xy\\ne0$, la ecuación equivale a $x^4=y^4$, de modo que $y=x$ o $y=-x$. Sus derivadas son $1$ y $-1$, respectivamente."
      },
      {
        "body": "7. $(y-x)(y+x+1)=0$: las ramas son $y=x$ e $y=-x-1$, de derivadas $1$ y $-1$. En su intersección $(-1/2,-1/2)$ no hay tangente única de toda la curva."
      },
      {
        "body": "8. Con $y\\ne0$, multiplica por $y$: $y^2=x-x^3y$. Derivando, $(2y+x^3)y'=1-3x^2y$, luego $y'=(1-3x^2y)/(2y+x^3)$ donde el denominador no sea cero."
      }
    ],
    "finalAnswer": "Las derivadas y excepciones de dominio están indicadas en los ocho incisos; los incisos 3 y 4 no tienen puntos reales.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-938df7613ee7",
    "number": "142",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Tangentes y normales · seis curvas implícitas",
    "topic": "Derivadas",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine la ecuaciones de las recta tangente y la recta normal a la curva en el punto dado. Verifique que el punto se encuentra en la curva.",
      "1. $x^3y+y^3x=30$ en el punto $(1,3)$ .",
      "2. $x^2y^2+4xy=12y$ en el punto $(2,1)$ .",
      "3. $\\sin(xy)=y$ en el punto $(\\pi/2, 1)$ .",
      "4. $y+\\cos(xy^2)+3x^2=4$ en el punto $(1,0)$ .",
      "5. $\\sqrt[3]{x^2}-\\sqrt[3]{y^2}-2y=2$ en el punto $(1,-1)$ .",
      "6. $\\sqrt{y}+xy^2=5$ en el punto $(4,1).$"
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Comprueba primero que el punto pertenece a la curva.",
      "Deriva; si la ecuación es implícita, trata $y$ como función de $x$.",
      "Usa $y-y_0=m(x-x_0)$. Para la normal, la pendiente es $-1/m$ cuando $m\\ne0$."
    ],
    "solution": [
      {
        "body": "Al sustituir los puntos, los lados izquierdos son respectivamente $30$, $12$, $1$, $4$, $2$ y $5$: todos pertenecen a sus curvas."
      },
      {
        "body": "1. $y'=-(3x^2y+y^3)/(x^3+3xy^2)$; en $(1,3)$, $m=-9/7$. Tangente: $y-3=-9(x-1)/7$. Normal: $y-3=7(x-1)/9$."
      },
      {
        "body": "2. Derivando se obtiene $(2x^2y+4x-12)y'=-(2xy^2+4y)$. En $(2,1)$, $m=-2$. Tangente: $y-1=-2(x-2)$. Normal: $y-1=(x-2)/2$."
      },
      {
        "body": "3. $\\cos(xy)(y+xy')=y'$. En $(\\pi/2,1)$, $m=0$. Tangente $y=1$ y normal vertical $x=\\pi/2$."
      },
      {
        "body": "4. $y'-\\sin(xy^2)(y^2+2xyy')+6x=0$. En $(1,0)$, $m=-6$. Tangente $y=-6(x-1)$ y normal $y=(x-1)/6$."
      },
      {
        "body": "5. $2/(3\\sqrt[3]x)-2y'/(3\\sqrt[3]y)-2y'=0$. En $(1,-1)$, $m=1/2$. Tangente $y+1=(x-1)/2$ y normal $y+1=-2(x-1)$."
      },
      {
        "body": "6. $y'/(2\\sqrt y)+y^2+2xyy'=0$. En $(4,1)$, $m=-2/17$. Tangente $y-1=-2(x-4)/17$ y normal $y-1=17(x-4)/2$."
      }
    ],
    "finalAnswer": "Pendientes tangentes: $-9/7,-2,0,-6,1/2,-2/17$; las seis rectas normales se detallan arriba.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-c6c7dda530b3",
    "number": "143",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Asíntotas · cancelación y división polinómica",
    "topic": "Asíntotas",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine, justificando mediante los límites respectivos, la existencia de asíntotas verticales, horizontales y oblicuas, función $$f(x) =\\displaystyle{\\frac{x^2 - x^4}{x^3- 4 x^2 -7x+10}}$$"
    ],
    "relatedTheory": [
      {
        "label": "Asíntotas",
        "href": "/cursos/calculo-diferencial#limites-seccion-3"
      }
    ],
    "hints": [
      "Factoriza y distingue ceros cancelables de polos.",
      "En cada polo estudia el signo de los límites laterales.",
      "Divide los polinomios para estudiar el comportamiento al infinito; verifica que la diferencia con la recta tienda a cero."
    ],
    "solution": [
      {
        "body": "El denominador es $(x-1)(x-5)(x+2)$. Para $x\\ne1$, se reduce a $-x^2(x+1)/((x-5)(x+2))$. En $x=1$ hay un hueco con límite $1/6$, no una asíntota."
      },
      {
        "body": "En $x=5$ y $x=-2$ hay polos con coeficientes de $(x-a)^{-1}$ negativos: los límites por la izquierda son $+\\infty$ y por la derecha $-\\infty$."
      },
      {
        "body": "La división da $f(x)=-x-4+(-22x-40)/(x^2-3x-10)$. Por tanto $f(x)-(-x-4)\\to0$ cuando $x\\to\\pm\\infty$. No hay horizontal."
      }
    ],
    "finalAnswer": "Verticales: $x=-2,5$. Oblicua: $y=-x-4$. Hueco en $x=1$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-a1f7296f7eae",
    "number": "144",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Derivada por definición · exponencial",
    "topic": "Derivadas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Calcule por definición la derivada de $f(x)=e^{2x}+1$ ."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Comprueba si puedes sustituir directamente o aparece una indeterminación.",
      "En cocientes de polinomios al infinito compara los grados; en diferencias usa factorización o racionalización.",
      "Una expresión de la forma $(f(a+h)-f(a))/h$ puede reconocerse como una derivada."
    ],
    "solution": [
      {
        "body": "$\\frac{f(x+h)-f(x)}h=e^{2x}\\frac{e^{2h}-1}h$. Haciendo $u=2h$, el segundo factor es $2(e^u-1)/u\\to2$."
      }
    ],
    "finalAnswer": "$f'(x)=2e^{2x}$ para todo $x\\in\\mathbb R$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-6725a8822eb7",
    "number": "145",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Derivación implícita · factorización y puntos singulares",
    "topic": "Derivadas",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Obtenga la derivada $\\frac{d y}{dx}$ para las siguientes funciones implícitas.",
      "1. $y^2-x=x^2-y$ .",
      "2. $\\sin(xy)=xy$ ."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Antes de derivar, comprueba que la ecuación define puntos reales.",
      "Deriva ambos miembros con la regla de la cadena y agrupa los términos con $y'$.",
      "No dividas por un factor nulo. Revisa por separado los puntos singulares."
    ],
    "solution": [
      {
        "body": "1. $y^2+y=x^2+x$ equivale a $(y-x)(y+x+1)=0$. Las ramas son $y=x$ y $y=-x-1$, de pendientes $1$ y $-1$. La fórmula $y'=(2x+1)/(2y+1)$ sirve fuera del cruce $(-1/2,-1/2)$; allí no existe una tangente única de toda la curva."
      },
      {
        "body": "2. En números reales, $\\sin u=u$ solo para $u=0$: para $u>0$, $u-\\sin u=\\int_0^u(1-\\cos t)\\,dt>0$, y por simetría tampoco hay otra raíz negativa. Por tanto $xy=0$. La rama $y=0$ tiene derivada $0$; la recta $x=0$ es vertical y no es una gráfica $y(x)$. En el origen se cruzan ambas ramas, de modo que no hay una tangente única para toda la curva."
      }
    ],
    "finalAnswer": "1. Pendientes $1$ y $-1$ según la rama. 2. Rama horizontal de pendiente $0$ y rama vertical; revisar sus cruces.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-12adf7e08243",
    "number": "146",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "¿Existe una tangente con pendiente dos?",
    "topic": "Derivadas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Dada la función de variable real $f$ , definida por $$f(x)=\\ln(x^2+2).$$ determine ecuación de la recta tangente a la curva de $f$ en todos los puntos $x$ positivos tales que $f'(x)=2$ ."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Comprueba primero que el punto pertenece a la curva.",
      "Deriva; si la ecuación es implícita, trata $y$ como función de $x$.",
      "Usa $y-y_0=m(x-x_0)$. Para la normal, la pendiente es $-1/m$ cuando $m\\ne0$."
    ],
    "solution": [
      {
        "body": "$f'(x)=2x/(x^2+2)$. Imponer $f'(x)=2$ da $x=x^2+2$, es decir $x^2-x+2=0$. Su discriminante es $1-8=-7<0$. No existe ningún punto real que cumpla esa pendiente."
      }
    ],
    "finalAnswer": "No existe una recta tangente con la pendiente solicitada.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-2f264b1ece76",
    "number": "147",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Asíntotas · dos polos y una oblicua",
    "topic": "Asíntotas",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine, justificando mediante los límites respectivos, la existencia de asíntotas verticales, horizontales y oblicuas, de la función $$f(x) =\\displaystyle{\\frac{5x^3+5x^2+5x}{2x^2+6x-8}}$$"
    ],
    "relatedTheory": [
      {
        "label": "Asíntotas",
        "href": "/cursos/calculo-diferencial#limites-seccion-3"
      }
    ],
    "hints": [
      "Factoriza y distingue ceros cancelables de polos.",
      "En cada polo estudia el signo de los límites laterales.",
      "Divide los polinomios para estudiar el comportamiento al infinito; verifica que la diferencia con la recta tienda a cero."
    ],
    "solution": [
      {
        "body": "El denominador es $2(x+4)(x-1)$ y no hay cancelaciones. En ambos polos los coeficientes de $(x-a)^{-1}$ son positivos, así que los límites por izquierda son $-\\infty$ y por derecha $+\\infty$."
      },
      {
        "body": "$f(x)=\\frac52x-5+\\frac{55x-40}{2x^2+6x-8}$. El último término tiende a cero en ambos infinitos; no hay asíntota horizontal."
      }
    ],
    "finalAnswer": "Verticales $x=-4,1$ y oblicua $y=5x/2-5$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-6b1ccaa9695e",
    "number": "148",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Derivada por definición · polinomio cuadrático",
    "topic": "Derivadas",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Calcule por definición la derivada de $f(x)=x^2+3x-1$ ."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Escribe $[f(x+h)-f(x)]/h$.",
      "Desarrolla $(x+h)^2$ y cancela los términos independientes de $h$.",
      "Simplifica antes de tomar $h\\to0$."
    ],
    "solution": [
      {
        "body": "$[f(x+h)-f(x)]/h=(2xh+h^2+3h)/h=2x+h+3$. Al tomar $h\\to0$ resulta $2x+3$."
      }
    ],
    "finalAnswer": "$f'(x)=2x+3$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-01fc90b37ad8",
    "number": "149",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Reglas de derivación · cociente y cadenas de raíces",
    "topic": "Derivadas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Utilizando reglas de derivación, determine primera derivada de cada una de las siguientes funciones:",
      "1. $f(x)=\\dfrac{\\ln(x^2+1)}{x-1}$",
      "2. $f(x)=\\sin(\\sqrt{x^2+2x-15})$",
      "3. $h(x)=\\sqrt{\\cos^2(x)+2x}\\,e^{x^2-25}$"
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Identifica las operaciones exteriores antes de derivar.",
      "Aplica las reglas de producto, cociente y cadena según corresponda.",
      "Conserva los factores de las derivadas interiores y revisa el dominio."
    ],
    "solution": [
      {
        "body": "1. Por cociente, $f'=\\frac{2x(x-1)/(x^2+1)-\\ln(x^2+1)}{(x-1)^2}$, $x\\ne1$."
      },
      {
        "body": "2. Por cadena, $f'=(x+1)\\cos(\\sqrt{x^2+2x-15})/\\sqrt{x^2+2x-15}$ para $x<-5$ o $x>3$. En los extremos del dominio no hay derivada finita."
      },
      {
        "body": "3. Sea $u=\\cos^2x+2x$. Por producto y cadena, $h'=e^{x^2-25}[(1-\\sin x\\cos x)/\\sqrt u+2x\\sqrt u]$ cuando $u>0$."
      }
    ],
    "finalAnswer": "Las tres derivadas se indican arriba, en los interiores de sus dominios.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-a9ce301e3cc8",
    "number": "150",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Derivación implícita · dominio real y singularidades",
    "topic": "Derivadas",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Obtenga la derivada $\\frac{d y}{dx}$ para las siguientes funciones implícitas.",
      "1. $\\sqrt{x+y}=xy$ .",
      "2. $y=e^x+e^y$ ."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Antes de derivar, comprueba que la ecuación define puntos reales.",
      "Deriva ambos miembros con la regla de la cadena y agrupa los términos con $y'$.",
      "No dividas por un factor nulo. Revisa por separado los puntos singulares."
    ],
    "solution": [
      {
        "body": "1. Para $\\sqrt{x+y}=xy$ se exige $x+y\\ge0$, $xy\\ge0$. Cuando $x+y>0$, $(1+y')/(2\\sqrt{x+y})=y+xy'$, luego $y'=(2y\\sqrt{x+y}-1)/(1-2x\\sqrt{x+y})$ si el denominador no es cero. El único punto con $x+y=0$ es $(0,0)$; al cuadrar se obtiene $x+y=x^2y^2$ y la rama local tiene pendiente $-1$, pero salvo el origen tiene $xy<0$. Así el origen está aislado en la curva original y no define una derivada $y(x)$."
      },
      {
        "body": "2. La ecuación $y=e^x+e^y$ no tiene puntos reales: $e^y\\ge1+y$ implica $y-e^y\\le-1$, mientras que $e^x>0$. Por tanto no hay una función real que derivar. La manipulación formal $y'=e^x/(1-e^y)$ no representa una solución real."
      }
    ],
    "finalAnswer": "1. $y'=(2y\\sqrt{x+y}-1)/(1-2x\\sqrt{x+y})$ en puntos regulares. 2. No hay soluciones reales.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-8857864f484a",
    "number": "151",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Recta normal a una exponencial compuesta",
    "topic": "Derivadas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Dada la función de variable real $f$ , definida por $$f(x)=e^{\\frac{x}{2}+\\frac{2}{x}}.$$ determine ecuación de la recta normal a la curva de $f$ que pasa por el punto $(1,f(1))$ ."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Comprueba primero que el punto pertenece a la curva.",
      "Deriva; si la ecuación es implícita, trata $y$ como función de $x$.",
      "Usa $y-y_0=m(x-x_0)$. Para la normal, la pendiente es $-1/m$ cuando $m\\ne0$."
    ],
    "solution": [
      {
        "body": "$f(1)=e^{5/2}$ y $f'(x)=e^{x/2+2/x}(1/2-2/x^2)$. Así $f'(1)=-3e^{5/2}/2$ y la pendiente normal es $2/(3e^{5/2})$."
      }
    ],
    "finalAnswer": "La normal en el punto indicado es $y-e^{5/2}=\\frac{2}{3e^{5/2}}(x-1)$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-05761fde9f6e",
    "number": "152",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Asíntotas · hueco y polo tras factorizar",
    "topic": "Asíntotas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine, justificando mediante los límites respectivos, la existencia de asíntotas verticales, horizontales y oblicuas, de la función $$f(x) =\\displaystyle{\\frac{x^3+6 x^2 +11x+6}{3x^2+3x-18}}$$"
    ],
    "relatedTheory": [
      {
        "label": "Asíntotas",
        "href": "/cursos/calculo-diferencial#limites-seccion-3"
      }
    ],
    "hints": [
      "Factoriza y distingue ceros cancelables de polos.",
      "En cada polo estudia el signo de los límites laterales.",
      "Divide los polinomios para estudiar el comportamiento al infinito; verifica que la diferencia con la recta tienda a cero."
    ],
    "solution": [
      {
        "body": "$f(x)=(x+1)(x+2)/(3(x-2))$ para $x\\ne-3,2$. En $x=-3$ el límite es $-2/15$ y hay un hueco."
      },
      {
        "body": "$f(x)=(x+5)/3+4/(x-2)$. En $2^-$ tiende a $-\\infty$, y en $2^+$ a $+\\infty$. La diferencia con $(x+5)/3$ tiende a cero en ambos infinitos."
      }
    ],
    "finalAnswer": "Vertical $x=2$; oblicua $y=(x+5)/3$. No hay horizontal; $x=-3$ es un hueco.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-1494be279af4",
    "number": "153",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Derivada por definición · raíz cuadrada",
    "topic": "Derivadas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Calcule por definición la derivada de $f(x)=\\sqrt{x+3}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "El dominio es $x\\ge-3$; para la derivada usual trabaja en $x>-3$.",
      "Racionaliza la diferencia de raíces con su conjugado.",
      "Cancela $h$ antes de tomar el límite."
    ],
    "solution": [
      {
        "body": "Para $x>-3$, $\\frac{\\sqrt{x+h+3}-\\sqrt{x+3}}h=\\frac1{\\sqrt{x+h+3}+\\sqrt{x+3}}\\to\\frac1{2\\sqrt{x+3}}$. En $x=-3$ el cociente lateral es $1/\\sqrt h\\to+\\infty$, de modo que no hay derivada finita."
      }
    ],
    "finalAnswer": "$f'(x)=1/(2\\sqrt{x+3})$ para $x>-3$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-505737f7c9ca",
    "number": "154",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Reglas de derivación · producto, cociente y logaritmo",
    "topic": "Derivadas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Utilizando reglas de derivación, determine primera derivada de cada una de las siguientes funciones:",
      "1. $f(x)=\\dfrac{\\sin(x-1)}{x-1}$",
      "2. $f(x)=(7x^3-4x+16)e^{5x^3-x+3}$",
      "3. $h(x)=\\ln(\\sqrt{9-\\cos^2(x)})$"
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Identifica las operaciones exteriores antes de derivar.",
      "Aplica las reglas de producto, cociente y cadena según corresponda.",
      "Conserva los factores de las derivadas interiores y revisa el dominio."
    ],
    "solution": [
      {
        "body": "1. $f'=((x-1)\\cos(x-1)-\\sin(x-1))/(x-1)^2$, para $x\\ne1$."
      },
      {
        "body": "2. $f'=e^{5x^3-x+3}[(21x^2-4)+(7x^3-4x+16)(15x^2-1)]$."
      },
      {
        "body": "3. Escribe $h=\\frac12\\ln(9-\\cos^2x)$. Entonces $h'=\\sin x\\cos x/(9-\\cos^2x)$, para todo $x\\in\\mathbb R$."
      }
    ],
    "finalAnswer": "Las derivadas son las expresiones obtenidas en los tres incisos.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-3087328e4d84",
    "number": "155",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Tangente horizontal a una raíz compuesta",
    "topic": "Derivadas",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Dada la función de variable real $f$ , definida por $$f(x)=\\sqrt{x^2+\\cos(x)}.$$ determine ecuación de la recta tangente a la curva de $f$ y que pasa por el punto $(0,f(0))$ ."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Comprueba primero que el punto pertenece a la curva.",
      "Deriva; si la ecuación es implícita, trata $y$ como función de $x$.",
      "Usa $y-y_0=m(x-x_0)$. Para la normal, la pendiente es $-1/m$ cuando $m\\ne0$."
    ],
    "solution": [
      {
        "body": "$f(0)=1$. Cerca de cero, $f'(x)=(2x-\\sin x)/(2\\sqrt{x^2+\\cos x})$, por lo que $f'(0)=0$."
      }
    ],
    "finalAnswer": "La tangente en $(0,f(0))$ es $y=1$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-f0c250500f75",
    "number": "156",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Asíntotas · función racional con un hueco",
    "topic": "Asíntotas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine, justificando mediante los límites respectivos, la existencia de asíntotas verticales, horizontales y oblicuas, de la función $$f(x) =\\displaystyle{\\frac{-4 + 2 x + 4 x^2 - 2 x^3}{x^3- 2 x^2 -5x+6}}$$"
    ],
    "relatedTheory": [
      {
        "label": "Asíntotas",
        "href": "/cursos/calculo-diferencial#limites-seccion-3"
      }
    ],
    "hints": [
      "Factoriza y distingue ceros cancelables de polos.",
      "En cada polo estudia el signo de los límites laterales.",
      "Divide los polinomios para estudiar el comportamiento al infinito; verifica que la diferencia con la recta tienda a cero."
    ],
    "solution": [
      {
        "body": "Factorizando se obtiene $f(x)=-2(x-2)(x+1)/((x-3)(x+2))$, conservando las exclusiones originales $x=1,3,-2$. En $x=1$ el límite es $-2/3$: hay hueco."
      },
      {
        "body": "En $x=-2$, los límites izquierdo y derecho son $-\\infty,+\\infty$. En $x=3$, son $+\\infty,-\\infty$. Los grados iguales dan límite $-2$ en ambos infinitos. No hay oblicua de pendiente no nula."
      }
    ],
    "finalAnswer": "Verticales $x=-2,3$; horizontal $y=-2$. Hueco en $x=1$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-d1f82d585ac5",
    "number": "157",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Derivada por definición · polinomio cúbico",
    "topic": "Derivadas",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Calcule por definición la derivada de $f(x)=x^3-2$ ."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Desarrolla $(x+h)^3$.",
      "Cancela $x^3$ y divide por $h\\ne0$.",
      "Toma el límite cuando $h\\to0$."
    ],
    "solution": [
      {
        "body": "$[f(x+h)-f(x)]/h=(3x^2h+3xh^2+h^3)/h=3x^2+3xh+h^2\\to3x^2$."
      }
    ],
    "finalAnswer": "$f'(x)=3x^2$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-7ec53692de0c",
    "number": "158",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Reglas de derivación · raíces, exponencial y producto",
    "topic": "Derivadas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Utilizando reglas de derivación, determine primera derivada de cada una de las siguientes funciones:",
      "1. $h(x)=\\dfrac{2x^3-5x}{x^2+x+1}$",
      "2. $f(x)=e^{(\\sqrt[3]{x^2+6})}$",
      "3. $h(x)=(\\sqrt{x}+\\sin(x))\\cdot \\ln(3x^2+1)$"
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Identifica las operaciones exteriores antes de derivar.",
      "Aplica las reglas de producto, cociente y cadena según corresponda.",
      "Conserva los factores de las derivadas interiores y revisa el dominio."
    ],
    "solution": [
      {
        "body": "1. $h'=\\frac{(6x^2-5)(x^2+x+1)-(2x^3-5x)(2x+1)}{(x^2+x+1)^2}$ para todo $x\\in\\mathbb R$."
      },
      {
        "body": "2. $f'=e^{\\sqrt[3]{x^2+6}}\\frac{2x}{3(x^2+6)^{2/3}}$."
      },
      {
        "body": "3. Para $x>0$, $h'=(1/(2\\sqrt x)+\\cos x)\\ln(3x^2+1)+(\\sqrt x+\\sin x)6x/(3x^2+1)$. En $x=0$ no hay derivada bilateral por ser extremo del dominio; la derivada por la derecha es $0$, pues $h(x)/x$ tiende a cero."
      }
    ],
    "finalAnswer": "Las tres derivadas se indican arriba, incluyendo la salvedad en el extremo del dominio.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-065597daf6f6",
    "number": "159",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Tangente paralela a una recta dada",
    "topic": "Derivadas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Dada la función de variable real $f$ , definida por $$f(x)=\\dfrac{x^3}{3}+x^2.$$ determine ecuación de la recta tangente a la curva de $f$ y que es paralela a la recta $y=5-x$ ."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Comprueba primero que el punto pertenece a la curva.",
      "Deriva; si la ecuación es implícita, trata $y$ como función de $x$.",
      "Usa $y-y_0=m(x-x_0)$. Para la normal, la pendiente es $-1/m$ cuando $m\\ne0$."
    ],
    "solution": [
      {
        "body": "La recta dada tiene pendiente $-1$. Como $f'(x)=x^2+2x$, imponemos $x^2+2x=-1$, o $(x+1)^2=0$."
      },
      {
        "body": "En $x=-1$, $f(-1)=2/3$. La tangente es $y-2/3=-(x+1)$."
      }
    ],
    "finalAnswer": "$y=-x-1/3$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-ab09d0720b60",
    "number": "160",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Asíntotas · seis funciones y denominadores de grado alto",
    "topic": "Asíntotas",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine, justificando mediante los límites respectivos, la existencia de asíntotas verticales, horizontales y oblicuas, para las siguientes funciones de variable real:",
      "1. $f(x) = \\dfrac{3}{4-x^2}.$",
      "2. $f(x) =\\displaystyle{\\frac{x^3-8}{5x-10}}$",
      "3. $f(x) =\\displaystyle{\\frac{x^5-x^4}{x^4-x^3+2}}$",
      "4. $f(x) =\\displaystyle{\\frac{3-4x-2x^3}{5x^3-8x+1}}$",
      "5. $f(x) =\\displaystyle{\\frac{x^3+27}{2x+6}}$",
      "6. $f(x) =\\displaystyle{\\frac{7x^3-4x+16}{5x^3-x+3}}$"
    ],
    "relatedTheory": [
      {
        "label": "Asíntotas",
        "href": "/cursos/calculo-diferencial#limites-seccion-3"
      }
    ],
    "hints": [
      "Factoriza y distingue ceros cancelables de polos.",
      "En cada polo estudia el signo de los límites laterales.",
      "Divide los polinomios para estudiar el comportamiento al infinito; verifica que la diferencia con la recta tienda a cero."
    ],
    "solution": [
      {
        "body": "1. $3/(4-x^2)$ tiene horizontal $y=0$ y verticales $x=\\pm2$. En $-2$ los límites izquierdo/derecho son $-\\infty,+\\infty$; en $2$ son $+\\infty,-\\infty$."
      },
      {
        "body": "2. Para $x\\ne2$, $f=(x^2+2x+4)/5$. En $2$ hay un hueco con límite $12/5$; no hay asíntotas verticales, horizontales ni oblicuas rectilíneas."
      },
      {
        "body": "3. El denominador $d=x^4-x^3+2$ tiene mínimo global en $x=3/4$ con valor $2-27/256>0$, así que no hay polos reales. La división da $f=x-2x/d$, y $f-x\\to0$ en ambos infinitos: oblicua $y=x$, sin horizontal."
      },
      {
        "body": "4. Sea $d(x)=5x^3-8x+1$. Tiene exactamente tres raíces simples $a_1\\in(-2,-1)$, $a_2\\in(0,1/2)$ y $a_3\\in(1,2)$: hay una en cada intervalo por cambio de signo y el grado es tres. El numerador cumple $N=-2d/5+(17-36x)/5$ y no se anula en esas raíces, porque $d(17/36)\\ne0$. Las tres rectas $x=a_i$ son verticales. Cerca de cada raíz, $f(x)\\sim c_i/(x-a_i)$, con $c_i=(17-36a_i)/(5(15a_i^2-8))\\ne0$, lo que da límites laterales infinitos de signos opuestos. La horizontal es $y=-2/5$."
      },
      {
        "body": "5. Para $x\\ne-3$, $f=(x^2-3x+9)/2$; hay un hueco de límite $27/2$ y ninguna asíntota rectilínea de las solicitadas."
      },
      {
        "body": "6. $d(x)=5x^3-x+3$ tiene una única raíz real $a\\in(-1,0)$. Sus extremos locales, en $\\pm1/\\sqrt{15}$, tienen ambos valores positivos, por lo que solo cruza el eje una vez. El numerador en $a$ es $(59-13a)/5>0$ y $d'(a)>0$; por tanto los límites en $a^-,a^+$ son $-\\infty,+\\infty$. La vertical es $x=a$ y la horizontal $y=7/5$."
      }
    ],
    "finalAnswer": "1. Verticales $\\pm2$, horizontal $0$. 2. Ninguna. 3. Oblicua $y=x$. 4. Tres verticales en las raíces de $5x^3-8x+1$ y horizontal $-2/5$. 5. Ninguna. 6. Una vertical en la raíz de $5x^3-x+3$ y horizontal $7/5$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-8caca28938b7",
    "number": "161",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Continuidad · ocho funciones racionales y sus extensiones",
    "topic": "Límites y continuidad",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Estudie la continuidad de las siguientes funciones. En caso de tener discontinuidades reparables, defina una nueva función",
      "1. $f(x) = \\dfrac{3}{4-x^2}.$",
      "2. $f(x) =\\displaystyle{\\frac{x^3-8}{5x-10}}$",
      "3. $f(x) =\\displaystyle{\\frac{x^2-16}{x^2+2x-8}}$",
      "4. $f(x) =\\displaystyle{\\frac{x^3+27}{2x+6}}$",
      "5. $f(x) = \\dfrac{x^2-1}{x^2+x-2}.$",
      "6. $f(x)=\\dfrac{x^2+1}{x^3}.$",
      "7. $f(x) = \\dfrac{x^2-25}{x^2+2x-15}.$",
      "8. $f(x)=\\dfrac{x^2-1}{x-1}+\\dfrac{\\sin(x-1)}{x-1}.$"
    ],
    "relatedTheory": [
      {
        "label": "Límites y continuidad",
        "href": "/cursos/calculo-diferencial#limites-seccion-2"
      }
    ],
    "hints": [
      "Comprueba si puedes sustituir directamente o aparece una indeterminación.",
      "En cocientes de polinomios al infinito compara los grados; en diferencias usa factorización o racionalización.",
      "Una expresión de la forma $(f(a+h)-f(a))/h$ puede reconocerse como una derivada."
    ],
    "solution": [
      {
        "body": "Cada expresión es continua donde está definida. Para reparar un punto excluido se necesita un límite finito; se define allí ese valor y se conserva la expresión fuera del punto."
      },
      {
        "body": "1. En $x=\\pm2$ hay polos: no se reparan. 2. Fuera de $2$, la función es $(x^2+2x+4)/5$; se repara definiendo $\\widetilde f(2)=12/5$."
      },
      {
        "body": "3. Factorizando se reduce a $(x-4)/(x-2)$, con exclusiones originales $-4,2$. Se repara $-4$ con valor $4/3$, pero $2$ es un polo."
      },
      {
        "body": "4. Se reduce a $(x^2-3x+9)/2$, y se repara $-3$ asignándole $27/2$. 5. Se reduce a $(x+1)/(x+2)$; se repara $1$ con valor $2/3$, pero $-2$ es un polo."
      },
      {
        "body": "6. En $0$ hay un polo, no reparable. 7. Se reduce a $(x-5)/(x-3)$; se repara $-5$ asignándole $5/4$, pero $3$ es un polo."
      },
      {
        "body": "8. Para $x\\ne1$, $f=x+1+\\sin(x-1)/(x-1)$. Al tender $x$ a $1$, el límite es $2+1=3$. Se define $\\widetilde f(1)=3$ para obtener continuidad en todo $\\mathbb R$."
      }
    ],
    "finalAnswer": "Puntos reparables y valores: inciso 2, $(2,12/5)$; 3, $(-4,4/3)$; 4, $(-3,27/2)$; 5, $(1,2/3)$; 7, $(-5,5/4)$; 8, $(1,3)$. Los restantes puntos excluidos son polos.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-5d22f5939d25",
    "number": "162",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Existencia de una raíz por continuidad",
    "topic": "Límites y continuidad",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Verifique que la ecuación $2x^3-2x^2-4x+1=0$ tiene solución entre $-2$ y $2$ ."
    ],
    "relatedTheory": [
      {
        "label": "Límites y continuidad",
        "href": "/cursos/calculo-diferencial#limites-seccion-2"
      }
    ],
    "hints": [
      "Define el polinomio como una función continua.",
      "Calcula su signo en los extremos.",
      "Aplica el teorema del valor intermedio."
    ],
    "solution": [
      {
        "body": "$p(x)=2x^3-2x^2-4x+1$ es continuo en $[-2,2]$. Se tiene $p(-2)=-15$ y $p(2)=1$. Como $0$ está entre esos valores, existe $c\\in(-2,2)$ con $p(c)=0$."
      }
    ],
    "finalAnswer": "Existe al menos una raíz en $(-2,2)$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-ed0b30db81e6",
    "number": "163",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Un punto fijo usando continuidad",
    "topic": "Límites y continuidad",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $f:[0,1]\\to [0,1]$ función continua. Probar que existe $t\\in[0,1]$ tal que $f(t)=t$ . Ayuda: Use el teorema del valor intermedio para la función $g(t)=f(t)-t.$"
    ],
    "relatedTheory": [
      {
        "label": "Límites y continuidad",
        "href": "/cursos/calculo-diferencial#limites-seccion-2"
      }
    ],
    "hints": [
      "Considera $g(t)=f(t)-t$.",
      "Como $f$ toma valores en $[0,1]$, se cumple $g(0)\\ge0$ y $g(1)\\le0$.",
      "Si ninguno de los extremos es cero, aplica el teorema del valor intermedio."
    ],
    "solution": [
      {
        "body": "La función $g$ es continua. Si $g(0)=0$ o $g(1)=0$, ese extremo es un punto fijo. En otro caso $g(0)>0>g(1)$, de modo que existe $t\\in(0,1)$ con $g(t)=0$. Esto equivale a $f(t)=t$."
      }
    ],
    "finalAnswer": "Existe $t\\in[0,1]$ tal que $f(t)=t$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-f1bfced50854",
    "number": "164",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Rectas tangentes · cuatro funciones explícitas",
    "topic": "Derivadas",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Dada la función de variable real $f$ , determine ecuación de la recta tangente a la curva de $f$ en el punto dado:",
      "1. $f(x)=x^3-x+2$ en el punto $(1, f(1))$ .",
      "2. $f(x)=x^2-5x+6$ en el punto $(1, f(1))$ .",
      "3. $f(x)=x+\\dfrac{1}{x}$ en el punto $(3, f(3))$ .",
      "4. $f(x)=x^3-x$ en el punto $(-4, f(-4))$ ."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Comprueba primero que el punto pertenece a la curva.",
      "Deriva; si la ecuación es implícita, trata $y$ como función de $x$.",
      "Usa $y-y_0=m(x-x_0)$. Para la normal, la pendiente es $-1/m$ cuando $m\\ne0$."
    ],
    "solution": [
      {
        "body": "1. $f(1)=2$, $f'(1)=2$: $y=2x$."
      },
      {
        "body": "2. $f(1)=2$, $f'(1)=-3$: $y=-3x+5$."
      },
      {
        "body": "3. $f(3)=10/3$, $f'(3)=8/9$: $y=8x/9+2/3$."
      },
      {
        "body": "4. $f(-4)=-60$, $f'(-4)=47$: $y=47x+128$."
      }
    ],
    "finalAnswer": "$y=2x$; $y=-3x+5$; $y=8x/9+2/3$; $y=47x+128$, respectivamente.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-517266d4e3d6",
    "number": "165",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Derivadas sucesivas del logaritmo",
    "topic": "Derivadas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Dada la función $f$ , definida por $f(x)=\\ln(x-1)$ determine $f', f'', f''', f^{(4)}$ y $f^{(n)}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "Trabaja en el dominio $x>1$.",
      "Escribe las primeras derivadas como potencias negativas de $x-1$.",
      "Reconoce el signo alternado y el factorial."
    ],
    "solution": [
      {
        "body": "$f'=1/(x-1)$, $f''=-1/(x-1)^2$, $f'''=2/(x-1)^3$, $f^{(4)}=-6/(x-1)^4$. Cada derivación multiplica por el exponente negativo y cambia el signo. Por inducción, $f^{(n)}=(-1)^{n-1}(n-1)!/(x-1)^n$ para $n\\ge1$."
      }
    ],
    "finalAnswer": "$f^{(n)}(x)=\\frac{(-1)^{n-1}(n-1)!}{(x-1)^n}$, $x>1$, $n\\ge1$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-4e27cbea56d9",
    "number": "166",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Derivadas sucesivas · exponencial de 7x + 6",
    "topic": "Derivadas",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Dada la función $f$ , definida por $f(x)=e^{7x+6}$ determine $f', f'', f''', f^{(4)}$ y $f^{(n)}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "La derivada de una exponencial compuesta introduce el factor de su exponente lineal.",
      "Repite el cálculo para reconocer una potencia del mismo factor.",
      "Justifica la fórmula general por inducción sobre el orden de derivación."
    ],
    "solution": [
      {
        "body": "$f'=7e^{7x+(6)}$, $f''=49e^{7x+(6)}$, $f'''=343e^{7x+(6)}$ y $f^{(4)}=2401e^{7x+(6)}$. Cada derivación multiplica por $7$, por lo que $f^{(n)}=7^n e^{7x+(6)}$ para todo entero $n\\ge0$."
      }
    ],
    "finalAnswer": "$f^{(n)}=7^n e^{7x+(6)}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-1ec206390441",
    "number": "167",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Derivadas sucesivas · exponencial de 5x − 1",
    "topic": "Derivadas",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Dada la función $f$ , definida por $f(x)=e^{5x-1}$ determine $f', f'', f''', f^{(4)}$ y $f^{(n)}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Derivadas",
        "href": "/cursos/calculo-diferencial#reglas-seccion-1"
      }
    ],
    "hints": [
      "La derivada de una exponencial compuesta introduce el factor de su exponente lineal.",
      "Repite el cálculo para reconocer una potencia del mismo factor.",
      "Justifica la fórmula general por inducción sobre el orden de derivación."
    ],
    "solution": [
      {
        "body": "$f'=5e^{5x+(-1)}$, $f''=25e^{5x+(-1)}$, $f'''=125e^{5x+(-1)}$ y $f^{(4)}=625e^{5x+(-1)}$. Cada derivación multiplica por $5$, por lo que $f^{(n)}=5^n e^{5x+(-1)}$ para todo entero $n\\ge0$."
      }
    ],
    "finalAnswer": "$f^{(n)}=5^n e^{5x+(-1)}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-45441e72664f",
    "number": "168",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Verificar una solución de una ecuación diferencial",
    "topic": "Funciones y dominio",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Verifique que la función $f(x)=e^x\\sin(x)$ es solución de la ecuación",
      "$$2y'-y''-2y=0.$$"
    ],
    "relatedTheory": [
      {
        "label": "Funciones y dominio",
        "href": "/cursos/calculo-diferencial#funciones-seccion-1"
      }
    ],
    "hints": [
      "Identifica las operaciones exteriores antes de derivar.",
      "Aplica las reglas de producto, cociente y cadena según corresponda.",
      "Conserva los factores de las derivadas interiores y revisa el dominio."
    ],
    "solution": [
      {
        "body": "$y'=e^x(\\sin x+\\cos x)$ y $y''=2e^x\\cos x$. Entonces $2y'-y''-2y=2e^x(\\sin x+\\cos x)-2e^x\\cos x-2e^x\\sin x=0$."
      }
    ],
    "finalAnswer": "Sí, $y=e^x\\sin x$ satisface la ecuación para todo $x\\in\\mathbb R$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-32dee0cf5bcb",
    "number": "169",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Límites · factorización, racionalización y grados",
    "topic": "Límites y continuidad",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine (si existen) los siguientes límites:",
      "1. $\\displaystyle{\\lim_{x\\to 2}\\frac{x^3-8}{5x-10}}$",
      "2. $\\displaystyle{\\lim_{x\\to 6}\\frac{\\sqrt{x-2}-2}{x-6}}$",
      "3. $\\displaystyle{\\lim_{x\\to -4}\\frac{x^2-16}{(x-2)(x+4)}}$",
      "4. $\\displaystyle{\\lim_{x\\to \\infty}\\frac{x^5-x^4}{x^4-x^3+2}}$",
      "5. $\\displaystyle{\\lim_{x\\to \\infty}\\frac{3-4x-2x^3}{5x^3-8x+1}}$",
      "6. $\\displaystyle{\\lim_{x\\to -3}\\frac{x^3+27}{2x+6}}$",
      "7. $\\displaystyle{\\lim_{x\\to 2}\\frac{\\sqrt{x+7}-3}{x-2}}$",
      "8. $\\displaystyle{\\lim_{x\\to \\infty}\\frac{7x^3-4x+16}{5x^3-x+3}}$"
    ],
    "relatedTheory": [
      {
        "label": "Límites y continuidad",
        "href": "/cursos/calculo-diferencial#limites-seccion-2"
      }
    ],
    "hints": [
      "Comprueba si puedes sustituir directamente o aparece una indeterminación.",
      "En cocientes de polinomios al infinito compara los grados; en diferencias usa factorización o racionalización.",
      "Una expresión de la forma $(f(a+h)-f(a))/h$ puede reconocerse como una derivada."
    ],
    "solution": [
      {
        "body": "1. Cancela $x-2$: $(x^2+2x+4)/5\\to12/5$."
      },
      {
        "body": "2. Racionaliza: $1/(\\sqrt{x-2}+2)\\to1/4$."
      },
      {
        "body": "3. Cancela $x+4$: $(x-4)/(x-2)\\to4/3$."
      },
      {
        "body": "4. El cociente es $x-2x/(x^4-x^3+2)$, cuyo límite es $+\\infty$."
      },
      {
        "body": "5. Grados iguales: límite $-2/5$."
      },
      {
        "body": "6. Cancela $x+3$: $(x^2-3x+9)/2\\to27/2$."
      },
      {
        "body": "7. Racionaliza: $1/(\\sqrt{x+7}+3)\\to1/6$."
      },
      {
        "body": "8. Grados iguales: límite $7/5$."
      }
    ],
    "finalAnswer": "$12/5,1/4,4/3,+\\infty,-2/5,27/2,1/6,7/5$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-b1262eeea1e9",
    "number": "170",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Asíntotas · tres cocientes racionales",
    "topic": "Asíntotas",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine, justificando mediante los límites respectivos, la existencia de asíntotas verticales, horizontales y oblicuas, para las siguientes funciones de variable real:",
      "1. $f(x) = \\dfrac{x^2-1}{(x-1)(x+2)}.$",
      "2. $f(x)=\\dfrac{x^2+1}{x^3}.$",
      "3. $f(x) = \\dfrac{x^2-25}{(x-3)(x+5)}.$"
    ],
    "relatedTheory": [
      {
        "label": "Asíntotas",
        "href": "/cursos/calculo-diferencial#limites-seccion-3"
      }
    ],
    "hints": [
      "Factoriza y distingue ceros cancelables de polos.",
      "En cada polo estudia el signo de los límites laterales.",
      "Divide los polinomios para estudiar el comportamiento al infinito; verifica que la diferencia con la recta tienda a cero."
    ],
    "solution": [
      {
        "body": "1. Para $x\\ne1$, $f=(x+1)/(x+2)=1-1/(x+2)$. Vertical $x=-2$: límites $+\\infty,-\\infty$ por izquierda y derecha. Horizontal $y=1$; hueco en $x=1$ con límite $2/3$."
      },
      {
        "body": "2. $f=1/x+1/x^3$. Vertical $x=0$, con límites $-\\infty,+\\infty$. Horizontal $y=0$."
      },
      {
        "body": "3. Para $x\\ne-5$, $f=(x-5)/(x-3)=1-2/(x-3)$. Vertical $x=3$, con límites $+\\infty,-\\infty$. Horizontal $y=1$; hueco en $x=-5$ con límite $5/4$. Ninguna tiene oblicua de pendiente no nula."
      }
    ],
    "finalAnswer": "1. $x=-2,y=1$. 2. $x=0,y=0$. 3. $x=3,y=1$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-c5c7a53172b9",
    "number": "171",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Parábola · cortes y vértice",
    "topic": "Funciones y dominio",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $f: \\mathbb{R}\\to \\mathbb{R}$ definida por $$f(x)=-x^2+2x+3.$$ Determine los cortes con los ejes $X$ e $Y$ , coordendas del vértice y gráfico de la función."
    ],
    "relatedTheory": [
      {
        "label": "Funciones y dominio",
        "href": "/cursos/calculo-diferencial#funciones-seccion-1"
      }
    ],
    "hints": [
      "Los denominadores no pueden ser cero y los radicandos de raíces pares deben ser no negativos.",
      "Para el recorrido plantea $y=f(x)$ y analiza qué valores de $y$ son posibles.",
      "Comprueba que cada valor permitido de $y$ tiene una preimagen en el dominio."
    ],
    "solution": [
      {
        "body": "$f(x)=-(x-1)^2+4=-(x-3)(x+1)$. Los cortes con $X$ son $(-1,0)$ y $(3,0)$; con $Y$, $(0,3)$."
      },
      {
        "body": "El vértice es $(1,4)$, el eje de simetría $x=1$ y la parábola abre hacia abajo. Para dibujarla marca esos puntos y su simétrico $(2,3)$; el recorrido es $(-\\infty,4]$."
      }
    ],
    "finalAnswer": "Cortes $(-1,0),(3,0),(0,3)$; vértice $(1,4)$ y concavidad hacia abajo.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-125283c2c5a2",
    "number": "172",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Parábola · dominio, recorrido e inyectividad",
    "topic": "Funciones y dominio",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $g:\\mathbb{R}\\rightarrow \\mathbb{R}$ función definida por $g(x)=x^{2}+3x-4$ .",
      "1. Determine el dominio y recorrido.",
      "2. Determine si es inyectiva.",
      "3. Indique sus cortes con el eje $X$ , con el eje $Y$ y su vértice. Grafique."
    ],
    "relatedTheory": [
      {
        "label": "Funciones y dominio",
        "href": "/cursos/calculo-diferencial#funciones-seccion-1"
      }
    ],
    "hints": [
      "Los denominadores no pueden ser cero y los radicandos de raíces pares deben ser no negativos.",
      "Para el recorrido plantea $y=f(x)$ y analiza qué valores de $y$ son posibles.",
      "Comprueba que cada valor permitido de $y$ tiene una preimagen en el dominio."
    ],
    "solution": [
      {
        "body": "$g(x)=(x+3/2)^2-25/4=(x+4)(x-1)$. Dominio $\\mathbb R$, recorrido $[-25/4,\\infty)$. No es inyectiva: $g(0)=g(-3)=-4$."
      },
      {
        "body": "Cortes $(-4,0)$, $(1,0)$ y $(0,-4)$; vértice $(-3/2,-25/4)$. La gráfica es una parábola abierta hacia arriba, simétrica respecto de $x=-3/2$."
      }
    ],
    "finalAnswer": "Dominio $\\mathbb R$, recorrido $[-25/4,\\infty)$; no inyectiva. Vértice $(-3/2,-25/4)$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-bbee04920b7e",
    "number": "173",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Inyectividad · contraejemplos y monotonía",
    "topic": "Funciones y dominio",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine si las siguientes funciones son inyectivas en su dominio:",
      "1. $f(x)=x^2-2x$ .",
      "2. $f(x)=x^4+5$ .",
      "3. $f(x)=x^3+x$ .",
      "4. $f(x)=1+\\sqrt{1+x}$ .",
      "5. $f(x)=\\sqrt{9-x^2}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Funciones y dominio",
        "href": "/cursos/calculo-diferencial#funciones-seccion-1"
      }
    ],
    "hints": [
      "Para refutar inyectividad basta encontrar dos entradas distintas con la misma imagen.",
      "Una función estrictamente creciente en su dominio es inyectiva.",
      "No olvides restringir el dominio de las raíces."
    ],
    "solution": [
      {
        "body": "1. No: $f(0)=f(2)=0$. 2. No: $f(-1)=f(1)=6$."
      },
      {
        "body": "3. Sí: $f'(x)=3x^2+1>0$ en $\\mathbb R$. 4. Sí: la raíz cuadrada es estrictamente creciente en el dominio $[-1,\\infty)$."
      },
      {
        "body": "5. No: el dominio es $[-3,3]$ y $f(-1)=f(1)=\\sqrt8$."
      }
    ],
    "finalAnswer": "En orden: no, no, sí, sí, no.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-cc838a6b8fe0",
    "number": "174",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Modelo exponencial · depreciación de un equipo",
    "topic": "Funciones y dominio",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "El valor de depreciación expresado en dólares de un equipo computacional utilizado en una empresa se encuentra dado por el modelo funcional",
      "$$V(t)=1500 e^{-0,015t}$$",
      "donde $t$ es el tiempo transcurrido en años. De acuerdo a este modelo determine:",
      "1. Calcule el valor en dólares del equipo computacional al momento de su adquisición y su valor al cabo de tres años.",
      "2. Suponiendo que el equipo será dado de baja cuando su valor sea 500 dólares, calcule el tiempo que debe transcurrir para su reemplazo."
    ],
    "relatedTheory": [
      {
        "label": "Funciones y dominio",
        "href": "/cursos/calculo-diferencial#funciones-seccion-1"
      }
    ],
    "hints": [
      "Evalúa el modelo en $t=0$ y $t=3$.",
      "Para el reemplazo iguala el valor a $500$.",
      "Despeja el exponente con logaritmo natural."
    ],
    "solution": [
      {
        "body": "$V(0)=1500$ dólares y $V(3)=1500e^{-0.045}\\approx1433.996$ dólares."
      },
      {
        "body": "$1500e^{-0.015t}=500$ equivale a $-0.015t=\\ln(1/3)=-\\ln3$, así $t=\\ln3/0.015\\approx73.241$ años."
      }
    ],
    "finalAnswer": "Valor inicial: $1500$ dólares; a los tres años: $1433.996$ dólares; reemplazo a los $73.241$ años aproximadamente.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-ac9e99f143b0",
    "number": "175",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Dominio y recorrido · cociente lineal",
    "topic": "Funciones y dominio",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Dada la función $f:D\\subset \\mathbb{R}\\to \\mathbb{R}$ definida por",
      "$$f(x)=\\frac{2x+5}{x-2}$$",
      "Determine dominio y recorrido."
    ],
    "relatedTheory": [
      {
        "label": "Funciones y dominio",
        "href": "/cursos/calculo-diferencial#funciones-seccion-1"
      }
    ],
    "hints": [
      "Los denominadores no pueden ser cero y los radicandos de raíces pares deben ser no negativos.",
      "Para el recorrido plantea $y=f(x)$ y analiza qué valores de $y$ son posibles.",
      "Comprueba que cada valor permitido de $y$ tiene una preimagen en el dominio."
    ],
    "solution": [
      {
        "body": "Escribe $f(x)=2+9/(x-2)$. Se excluye $x=2$ y nunca se alcanza $y=2$. Para todo $y\\ne2$, $x=2+9/(y-2)$ pertenece al dominio y verifica $f(x)=y$."
      }
    ],
    "finalAnswer": "Dominio $\\mathbb R\\setminus\\{2\\}$; recorrido $\\mathbb R\\setminus\\{2\\}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-ac54adff0df4",
    "number": "176",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Dominios · polinomios, cocientes y raíces",
    "topic": "Funciones y dominio",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine el dominio de las siguientes funciones",
      "1. $f(x)=x^3+3x^2+1$ ,",
      "2. $g(x)=\\frac{1}{x^2+x+1}$ ,",
      "3. $h(x)=\\sqrt{x^2-x-30}$ .",
      "4. $f(x)=x^2+5x+17$ ,",
      "5. $g(x)=\\frac{1}{x^2+1}$ ,",
      "6. $h(x)=\\sqrt{x^2-5x+6}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Funciones y dominio",
        "href": "/cursos/calculo-diferencial#funciones-seccion-1"
      }
    ],
    "hints": [
      "Los denominadores no pueden ser cero y los radicandos de raíces pares deben ser no negativos.",
      "Para el recorrido plantea $y=f(x)$ y analiza qué valores de $y$ son posibles.",
      "Comprueba que cada valor permitido de $y$ tiene una preimagen en el dominio."
    ],
    "solution": [
      {
        "body": "1 y 4. Los polinomios tienen dominio $\\mathbb R$. 2. $x^2+x+1=(x+1/2)^2+3/4>0$, luego el dominio es $\\mathbb R$. 5. $x^2+1>0$, dominio $\\mathbb R$."
      },
      {
        "body": "3. $(x-6)(x+5)\\ge0$, así $x\\le-5$ o $x\\ge6$. 6. $(x-2)(x-3)\\ge0$, así $x\\le2$ o $x\\ge3$."
      }
    ],
    "finalAnswer": "En orden: $\\mathbb R$, $\\mathbb R$, $(-\\infty,-5]\\cup[6,\\infty)$, $\\mathbb R$, $\\mathbb R$, $(-\\infty,2]\\cup[3,\\infty)$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-f109560db92e",
    "number": "177",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Dominio y recorrido · recíproco de 2x − 3",
    "topic": "Funciones y dominio",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Obtenga el dominio y el recorrido de la siguiente función",
      "$$f(x)=\\frac{5}{2x-3}$$"
    ],
    "relatedTheory": [
      {
        "label": "Funciones y dominio",
        "href": "/cursos/calculo-diferencial#funciones-seccion-1"
      }
    ],
    "hints": [
      "Los denominadores no pueden ser cero y los radicandos de raíces pares deben ser no negativos.",
      "Para el recorrido plantea $y=f(x)$ y analiza qué valores de $y$ son posibles.",
      "Comprueba que cada valor permitido de $y$ tiene una preimagen en el dominio."
    ],
    "solution": [
      {
        "body": "El denominador excluye $x=3/2$. El numerador no nulo impide $y=0$. Para cada $y\\ne0$, $x=(3+5/y)/2$ verifica $f(x)=y$."
      }
    ],
    "finalAnswer": "Dominio $\\mathbb R\\setminus\\{3/2\\}$; recorrido $\\mathbb R\\setminus\\{0\\}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-diferencial-d99da5117b8d",
    "number": "178",
    "course": "Cálculo Diferencial",
    "courseSlug": "calculo-diferencial",
    "collection": "Ejercicios",
    "title": "Dominio y recorrido · recíproco de 9x − 7",
    "topic": "Funciones y dominio",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Obtenga el dominio y el recorrido de la siguiente función",
      "$$f(x)=\\frac{2}{9x-7}$$"
    ],
    "relatedTheory": [
      {
        "label": "Funciones y dominio",
        "href": "/cursos/calculo-diferencial#funciones-seccion-1"
      }
    ],
    "hints": [
      "Los denominadores no pueden ser cero y los radicandos de raíces pares deben ser no negativos.",
      "Para el recorrido plantea $y=f(x)$ y analiza qué valores de $y$ son posibles.",
      "Comprueba que cada valor permitido de $y$ tiene una preimagen en el dominio."
    ],
    "solution": [
      {
        "body": "Se excluye $x=7/9$ por el denominador. Nunca se obtiene $y=0$. Para cualquier $y\\ne0$, $x=(7+2/y)/9$ es una preimagen válida."
      }
    ],
    "finalAnswer": "Dominio $\\mathbb R\\setminus\\{7/9\\}$; recorrido $\\mathbb R\\setminus\\{0\\}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-527dda0d9e09",
    "number": "179",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Producto interno por evaluación en tres puntos",
    "topic": "Ortogonalidad",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $V=\\mathbb{R}_2[x]$ el espacio vectorial de polinomios de grado menor o igual a 2, con la base ${S=\\{1, x, x^2-1/3\\}}$ .",
      "Muestre que $p(x)\\cdot q(x)=p(0)q(0)+p(1)q(1)+p(2)q(2)$ es un producto interno en $V$ y calcule la norma de cada elemento de la base."
    ],
    "relatedTheory": [
      {
        "label": "Ortogonalidad",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-11"
      }
    ],
    "hints": [
      "Simetría y bilinealidad se verifican término a término.",
      "Si la norma al cuadrado es cero, el polinomio se anula en tres puntos distintos.",
      "Un polinomio no nulo de grado a lo sumo dos no puede tener tres raíces distintas."
    ],
    "solution": [
      {
        "body": "La forma es simétrica y bilineal, y $\\langle p,p\\rangle=p(0)^2+p(1)^2+p(2)^2\\ge0$. Si vale cero, $p$ tiene raíces $0,1,2$, por lo que $p=0$. Es definida positiva."
      },
      {
        "body": "$\\|1\\|^2=3$, $\\|x\\|^2=5$ y $\\|x^2-1/3\\|^2=(-1/3)^2+(2/3)^2+(11/3)^2=14$."
      }
    ],
    "finalAnswer": "Es producto interno; las normas son $\\sqrt3$, $\\sqrt5$ y $\\sqrt{14}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-vectorial-fa667c9f19bf",
    "number": "180",
    "course": "Cálculo Vectorial",
    "courseSlug": "calculo-vectorial",
    "collection": "Ejercicios",
    "title": "Trabajo de una fuerza constante",
    "topic": "Campos conservativos",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Si $F(x,y,z)=a \\hat{i}+b\\hat{j}+c\\hat{k}$ es un campo de fuerzas constantes, pruebe que el trabajo realizado al mover una partícula desde $P$ a $Q$ , a lo largo de cualquier camino está dado por",
      "$$W=F\\cdot \\overline{PQ}.$$"
    ],
    "relatedTheory": [
      {
        "label": "Campos conservativos",
        "href": "/cursos/calculo-vectorial#clase-10-seccion-4"
      }
    ],
    "hints": [
      "Parametriza el camino por $r(t)$, con extremos $P$ y $Q$.",
      "El campo $F$ es constante, por lo que sale del producto con la integral.",
      "Aplica $\\int_a^b r'(t)\\,dt=r(b)-r(a)$."
    ],
    "solution": [
      {
        "body": "Para una trayectoria suave por tramos de $P$ a $Q$, $W=\\int_a^b F\\cdot r'(t)\\,dt=F\\cdot(r(b)-r(a))=F\\cdot(Q-P)$. Por tanto el trabajo solo depende de los extremos."
      }
    ],
    "finalAnswer": "$W=F\\cdot\\overrightarrow{PQ}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-calculo-vectorial-e3c66ff2a5a6",
    "number": "181",
    "course": "Cálculo Vectorial",
    "courseSlug": "calculo-vectorial",
    "collection": "Ejercicios",
    "title": "Masa de un resorte helicoidal",
    "topic": "Integrales de línea",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Calcule la masa de un resorte en forma de curva parametrizada por $(t,2 \\cos t,2\\sin t)$ con $0\\leq t\\leq \\pi/2$ , con una función de densidad dada por $\\rho(x,y,z)=e^x+yz$ $\\operatorname{kg/m}$ . Grafique el resorte."
    ],
    "relatedTheory": [
      {
        "label": "Integrales de línea",
        "href": "/cursos/calculo-vectorial#clase-10-seccion-1"
      }
    ],
    "hints": [
      "La masa es $\\int_C\\rho\\,ds$, no una integral de trabajo.",
      "Calcula $\\|r'(t)\\|$ y sustituye las coordenadas en la densidad.",
      "Usa $4\\sin t\\cos t=2\\sin(2t)$."
    ],
    "solution": [
      {
        "body": "La curva es un cuarto de hélice alrededor del eje $x$, sobre $y^2+z^2=4$, desde $(0,2,0)$ hasta $(\\pi/2,0,2)$. Un punto intermedio es $(\\pi/4,\\sqrt2,\\sqrt2)$."
      },
      {
        "body": "$r'=(1,-2\\sin t,2\\cos t)$ tiene norma $\\sqrt5$. La densidad sobre la curva es $e^t+4\\cos t\\sin t\\ge0$."
      },
      {
        "body": "$M=\\sqrt5\\int_0^{\\pi/2}(e^t+2\\sin2t)\\,dt=\\sqrt5[e^t-\\cos2t]_0^{\\pi/2}=\\sqrt5(e^{\\pi/2}+1)$."
      }
    ],
    "finalAnswer": "$M=\\sqrt5(e^{\\pi/2}+1)$ kg.",
    "commonMistake": ""
  },
  {
    "slug": "practica-ecuaciones-diferenciales-a7fd891e48f6",
    "number": "182",
    "course": "Ecuaciones Diferenciales",
    "courseSlug": "ecuaciones-diferenciales",
    "collection": "Ejercicios",
    "title": "Ecuación diferencial · sustitución de x + y",
    "topic": "Sustitución lineal",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Resuelva la siguiente ecuación diferencial de valores iniciales",
      "$$\\begin{aligned} \\dfrac{dy}{dx}&=\\dfrac{2x+2y}{2x+2y+2}\\\\ y(0)&=0 \\end{aligned}$$"
    ],
    "relatedTheory": [
      {
        "label": "Sustitución lineal",
        "href": "/cursos/ecuaciones-diferenciales#clase-4-seccion-1"
      }
    ],
    "hints": [
      "Simplifica el cociente y usa $u=x+y$.",
      "Entonces $u'=1+y'=(2u+1)/(u+1)$: separa variables.",
      "Integra $\\frac{u+1}{2u+1}=\\frac12+\\frac1{2(2u+1)}$ y aplica el dato inicial."
    ],
    "solution": [
      {
        "body": "Con $u=x+y$, $u'= (2u+1)/(u+1)$, mientras $u\\ne-1$. Separando, $\\frac12u+\\frac14\\ln|2u+1|=x+C$. El dato $u(0)=0$ da $C=0$."
      },
      {
        "body": "La solución del problema inicial es la rama $u>-1/2$ de $2u+\\ln(2u+1)=4x$. Esta expresión es estrictamente creciente de $-\\infty$ a $+\\infty$, por lo que determina un único $u$ para cada $x\\in\\mathbb R$. Luego $y=u-x$. La solución constante $u=-1/2$, excluida al separar, no cumple el dato inicial."
      }
    ],
    "finalAnswer": "$2(x+y)+\\ln(2x+2y+1)=4x$, con $x+y>-1/2$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-ecuaciones-diferenciales-dee435a0acde",
    "number": "183",
    "course": "Ecuaciones Diferenciales",
    "courseSlug": "ecuaciones-diferenciales",
    "collection": "Ejercicios",
    "title": "Ecuación lineal · factor integrante trigonométrico",
    "topic": "Ecuaciones lineales de primer orden",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Considere la siguiente ecuación diferencial",
      "$$\\begin{aligned} \\cos(x) \\dfrac{dy}{dx}+\\sin (x)y=1\\\\ \\end{aligned}$$",
      "Determine que tipo de ecuación diferencial es y luego resuélvala."
    ],
    "relatedTheory": [
      {
        "label": "Ecuaciones lineales de primer orden",
        "href": "/cursos/ecuaciones-diferenciales#clase-2-seccion-2"
      }
    ],
    "hints": [
      "En un intervalo con $\\cos x\\ne0$, divide por $\\cos x$.",
      "Obtendrás $y'+\\tan x\\,y=\\sec x$.",
      "Usa el factor integrante $\\sec x$ en ese intervalo."
    ],
    "solution": [
      {
        "body": "Multiplicar por $\\sec x$ da $(y\\sec x)'=\\sec^2x$. Integrando, $y\\sec x=\\tan x+C$, y por tanto $y=\\sin x+C\\cos x$."
      },
      {
        "body": "La ecuación es lineal de primer orden y no homogénea. La familia hallada también satisface la ecuación original en los puntos $\\cos x=0$, como se verifica sustituyendo $y'=\\cos x-C\\sin x$."
      }
    ],
    "finalAnswer": "$y(x)=\\sin x+C\\cos x$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-0c23076adfdd",
    "number": "184",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Base de polinomios alrededor de uno",
    "topic": "Espacios vectoriales",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $V=\\mathbb{R}_2[x]$ el espacio vectorial de polinomios de grado menor o igual a 2. Muestre que el conjunto $S=\\{1, x-1, (x-1)^2\\}$ es una base de $V$ ."
    ],
    "relatedTheory": [
      {
        "label": "Espacios vectoriales",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-3"
      }
    ],
    "hints": [
      "Escribe los polinomios mediante sus coordenadas en $\\{1,x,x^2\\}$.",
      "Coloca esos vectores como columnas de una matriz.",
      "Si el determinante es no nulo, son tres vectores independientes en un espacio de dimensión tres."
    ],
    "solution": [
      {
        "body": "En la base canónica, las columnas de $1,x-a,(x-a)^2$ forman $\\begin{pmatrix}1&-a&a^2\\\\0&1&-2a\\\\0&0&1\\end{pmatrix}$. Su determinante es $1$, para todo $a\\in\\mathbb R$. Por tanto los tres polinomios son independientes y, como $\\dim V=3$, forman una base."
      },
      {
        "body": "Tomando $a=1$ se obtiene exactamente el conjunto pedido."
      }
    ],
    "finalAnswer": "$\\{1,x-1,(x-1)^2\\}$ es una base de $\\mathbb R_2[x]$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-a71638d77679",
    "number": "185",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Linealidad, núcleo y nulidad en dos dimensiones",
    "topic": "Transformaciones lineales",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine si $T:\\mathbb{R}^2 \\rightarrow \\mathbb{R}^2$ definida por $T( x , y )= ( x-2y, -x+y )$ es una transformación lineal. En caso de serlo, encuentre su",
      "núcleo y nulidad."
    ],
    "relatedTheory": [
      {
        "label": "Transformaciones lineales",
        "href": "/cursos/algebra-lineal#unidad-5-seccion-2"
      }
    ],
    "hints": [
      "Escribe las imágenes de los vectores de la base como columnas.",
      "Usa que $T(\\alpha u+\\beta v)=\\alpha T(u)+\\beta T(v)$.",
      "Para núcleo, resuelve $T(v)=0$; para imagen, estudia el espacio generado por las columnas."
    ],
    "solution": [
      {
        "body": "$T(v)=Av$ con $A=\\begin{pmatrix}1&-2\\\\-1&1\\end{pmatrix}$, así que es lineal. Resolver $x-2y=0$ y $-x+y=0$ da $x=y=0$."
      }
    ],
    "finalAnswer": "$T$ es lineal, $\\ker T=\\{(0,0)\\}$ y su nulidad es $0$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-d74edbc81655",
    "number": "186",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Imagen de una transformación con dominio real",
    "topic": "Transformaciones lineales",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Encuentre la imagen y rango de la transformación lineal $T:\\mathbb{R}\\to \\mathbb{R}_3[x]$ definida por",
      "$$T(a) = a+ ax+ax^2+ax^3.$$"
    ],
    "relatedTheory": [
      {
        "label": "Transformaciones lineales",
        "href": "/cursos/algebra-lineal#unidad-5-seccion-2"
      }
    ],
    "hints": [
      "Escribe las imágenes de los vectores de la base como columnas.",
      "Usa que $T(\\alpha u+\\beta v)=\\alpha T(u)+\\beta T(v)$.",
      "Para núcleo, resuelve $T(v)=0$; para imagen, estudia el espacio generado por las columnas."
    ],
    "solution": [
      {
        "body": "$T(a)=a(1+x+x^2+x^3)$, por lo que todas las imágenes son múltiplos de ese polinomio no nulo. Un solo polinomio no nulo es una base de la imagen."
      }
    ],
    "finalAnswer": "$\\operatorname{Im}T=\\operatorname{span}\\{1+x+x^2+x^3\\}$ y $\\operatorname{rango}T=1$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-1633a2dde987",
    "number": "187",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Matriz de una transformación en una base de llegada distinta",
    "topic": "Transformaciones lineales",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $T$ la transformación lineal de $\\mathbb{R}^2$ en $\\mathbb{R}^2$ dada por",
      "$T(x,y)=(3x+2y,-5x-4y)$ . Determine la matriz de la transformación lineal $[T]_{B_1}^{B_2}$ en las bases $B_1$ la base canónica y $B_2=\\{(3,-2),(-1,1)\\}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Transformaciones lineales",
        "href": "/cursos/algebra-lineal#unidad-5-seccion-2"
      }
    ],
    "hints": [
      "Calcula $T(1,0)$ y $T(0,1)$.",
      "Expresa cada imagen como combinación de $(3,-2)$ y $(-1,1)$.",
      "Usa esas coordenadas, no las coordenadas canónicas, como columnas."
    ],
    "solution": [
      {
        "body": "La matriz de cambio de coordenadas es $P=\\begin{pmatrix}3&-1\\\\-2&1\\end{pmatrix}$, con $P^{-1}=\\begin{pmatrix}1&1\\\\2&3\\end{pmatrix}$."
      },
      {
        "body": "$[T]_{B_1}^{B_2}=P^{-1}\\begin{pmatrix}3&2\\\\-5&-4\\end{pmatrix}=\\begin{pmatrix}-2&-2\\\\-9&-8\\end{pmatrix}$. Por ejemplo $-2(3,-2)-9(-1,1)=(3,-5)=T(1,0)$."
      }
    ],
    "finalAnswer": "$[T]_{B_1}^{B_2}=\\begin{pmatrix}-2&-2\\\\-9&-8\\end{pmatrix}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-8917e5680648",
    "number": "188",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Ángulo entre matrices con el producto de Frobenius",
    "topic": "Ortogonalidad",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $V=M_n(\\mathbb{R})$ , con el producto interno habitual: $\\langle A, B\\rangle = tr(A^tB)$ . Encuentre el ángulo entre las matrices $A=\\begin{pmatrix} 1 & 0 \\\\ 0 & 1\\end{pmatrix}$ y $B=\\begin{pmatrix} \\sqrt{2} & 1 \\\\ 1 & 0\\end{pmatrix}$"
    ],
    "relatedTheory": [
      {
        "label": "Ortogonalidad",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-11"
      }
    ],
    "hints": [
      "Usa el producto interno dado, no uno distinto.",
      "Recuerda que $\\|v\\|=\\sqrt{\\langle v,v\\rangle}$ y $d(u,v)=\\|u-v\\|$.",
      "La ortogonalidad equivale a producto interno cero."
    ],
    "solution": [
      {
        "body": "$\\langle A,B\\rangle=\\operatorname{tr}(A^tB)=\\sqrt2$, $\\|A\\|=\\sqrt2$ y $\\|B\\|=\\sqrt{2+1+1}=2$. Entonces $\\cos\\alpha=\\sqrt2/(2\\sqrt2)=1/2$."
      }
    ],
    "finalAnswer": "$\\alpha=\\pi/3=60^\\circ$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-e9479b235635",
    "number": "189",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Norma y distancia entre funciones continuas",
    "topic": "Ortogonalidad",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $V=\\mathcal{C}([0,1],\\mathbb{R})$ el $\\mathbb{R}-$ espacio vectorial de funciones continuas de $[0,1]$ en $\\mathbb{R}$ con el producto interno usual",
      "$$\\langle f, g\\rangle = \\int_0^1 f(x) \\cdot g(x)\\;dx.$$",
      "Sea $f(x)=x$ y $g(x)=x^2$ funciones en $V$ .",
      "1. Determine $\\|f\\|$ .",
      "2. Determine $d(f,g)$ , la distancia entre ambas funciones."
    ],
    "relatedTheory": [
      {
        "label": "Ortogonalidad",
        "href": "/cursos/algebra-lineal#unidad-4-seccion-11"
      }
    ],
    "hints": [
      "Usa el producto interno dado, no uno distinto.",
      "Recuerda que $\\|v\\|=\\sqrt{\\langle v,v\\rangle}$ y $d(u,v)=\\|u-v\\|$.",
      "La ortogonalidad equivale a producto interno cero."
    ],
    "solution": [
      {
        "body": "$\\|f\\|^2=\\int_0^1x^2\\,dx=1/3$. Además $d(f,g)^2=\\int_0^1(x-x^2)^2\\,dx=1/3-1/2+1/5=1/30$."
      }
    ],
    "finalAnswer": "$\\|f\\|=1/\\sqrt3$ y $d(f,g)=1/\\sqrt{30}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-f978f5e1c7a4",
    "number": "190",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Cuándo conmutan dos matrices con parámetros",
    "topic": "Matrices y operaciones",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sean las matrices $A = \\begin{pmatrix} a & 1\\\\ b & a \\end{pmatrix}$ y $B = \\begin{pmatrix} b & 1\\\\ 0 & b \\end{pmatrix}$ .",
      "Indique todas las condiciones de $a$ y $b$ , de modo que las matrices $A$ y $B$ conmuten."
    ],
    "relatedTheory": [
      {
        "label": "Matrices y operaciones",
        "href": "/cursos/algebra-lineal#unidad-1-seccion-3"
      }
    ],
    "hints": [
      "Respeta el orden de los factores: las matrices no conmutan en general.",
      "Escribe cada entrada o aplica una identidad válida para matrices.",
      "Comprueba el resultado sustituyendo en la igualdad original."
    ],
    "solution": [
      {
        "body": "$AB=\\begin{pmatrix}ab&a+b\\\\b^2&b+ab\\end{pmatrix}$ y $BA=\\begin{pmatrix}ab+b&a+b\\\\b^2&ab\\end{pmatrix}$. La igualdad de las entradas diagonales exige $b=0$, y esa condición también es suficiente."
      }
    ],
    "finalAnswer": "$b=0$ y $a$ arbitrario.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-699b1cbe734a",
    "number": "191",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Sistema matricial con transpuestas",
    "topic": "Matrices y operaciones",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine $X$ e $Y$ , matrices de orden 2, tales que:",
      "$$\\begin{aligned} X+AY^t&=B\\\\ X^t+YC&=D, \\end{aligned}$$",
      "donde $A = \\begin{pmatrix} 1 & 0\\\\ 1 & 1 \\end{pmatrix}$ , $B = \\begin{pmatrix} 2 & 3\\\\ 2 & 3 \\end{pmatrix}$ , $C = \\begin{pmatrix} 1 & -1\\\\ 1 & 0 \\end{pmatrix}$ y $D = \\begin{pmatrix} 2 & 1\\\\ -1 & 0 \\end{pmatrix}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Matrices y operaciones",
        "href": "/cursos/algebra-lineal#unidad-1-seccion-3"
      }
    ],
    "hints": [
      "Transpone la primera ecuación para obtener $X^t+YA^t=B^t$.",
      "Réstala de la segunda y factoriza $Y$ por la izquierda.",
      "Resuelve $Y(C-A^t)=D-B^t$ y recupera $X$."
    ],
    "solution": [
      {
        "body": "$C-A^t=\\begin{pmatrix}0&-2\\\\1&-1\\end{pmatrix}$ tiene inversa $\\begin{pmatrix}-1/2&1\\\\-1/2&0\\end{pmatrix}$."
      },
      {
        "body": "$Y=(D-B^t)(C-A^t)^{-1}=\\begin{pmatrix}1/2&0\\\\7/2&-4\\end{pmatrix}$. Luego $X=B-AY^t=\\begin{pmatrix}3/2&-1/2\\\\3/2&7/2\\end{pmatrix}$. Sustituyendo se recuperan $B$ y $D$."
      }
    ],
    "finalAnswer": "$X=\\begin{pmatrix}3/2&-1/2\\\\3/2&7/2\\end{pmatrix}$, $Y=\\begin{pmatrix}1/2&0\\\\7/2&-4\\end{pmatrix}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-3430e6ac803a",
    "number": "192",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Invertibilidad de una matriz con parámetro",
    "topic": "Determinantes e inversas",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "¿Para qué valores reales de $k$ la matriz $A = \\begin{pmatrix} -1 & 1 & 0\\\\ 1 & k+1 & 1\\\\ 1 & -4 & 3 \\end{pmatrix}$ es invertible?"
    ],
    "relatedTheory": [
      {
        "label": "Determinantes e inversas",
        "href": "/cursos/algebra-lineal#unidad-2-seccion-2"
      }
    ],
    "hints": [
      "Respeta el orden de los factores: las matrices no conmutan en general.",
      "Escribe cada entrada o aplica una identidad válida para matrices.",
      "Comprueba el resultado sustituyendo en la igualdad original."
    ],
    "solution": [
      {
        "body": "Desarrollando por la primera fila: $\\det A=-(3(k+1)+4)-(3-1)=-3k-9$. La matriz es invertible exactamente cuando este valor no es cero."
      }
    ],
    "finalAnswer": "$k\\ne-3$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-126e057b59c7",
    "number": "193",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Resolver una ecuación matricial con la identidad",
    "topic": "Matrices y operaciones",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Determine la matriz $X$ en la siguiente ecuación matricial:",
      "$$AX-2I=B,$$",
      "donde $A = \\begin{pmatrix} 6 & 0 & 0 \\\\ 0 & 1 & 2 \\\\ 0 & 3 & 5 \\end{pmatrix}$ y $B = \\begin{pmatrix} 1 & 0 & 1 \\\\ 2 & 1 & 2 \\\\ 1 & 0 & 0 \\end{pmatrix}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Matrices y operaciones",
        "href": "/cursos/algebra-lineal#unidad-1-seccion-3"
      }
    ],
    "hints": [
      "Respeta el orden de los factores: las matrices no conmutan en general.",
      "Escribe cada entrada o aplica una identidad válida para matrices.",
      "Comprueba el resultado sustituyendo en la igualdad original."
    ],
    "solution": [
      {
        "body": "$AX=B+2I$. La inversa de $A$ es $\\begin{pmatrix}1/6&0&0\\\\0&-5&2\\\\0&3&-1\\end{pmatrix}$; el bloque inferior tiene determinante $-1$."
      },
      {
        "body": "Multiplicando $A^{-1}(B+2I)$ se obtiene $\\begin{pmatrix}1/2&0&1/6\\\\-8&-15&-6\\\\5&9&4\\end{pmatrix}$. Al multiplicar por $A$ se recupera $B+2I$."
      }
    ],
    "finalAnswer": "$X=\\begin{pmatrix}1/2&0&1/6\\\\-8&-15&-6\\\\5&9&4\\end{pmatrix}$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-f85d7d4fa0fa",
    "number": "194",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Matriz por entradas y traza de un conmutador",
    "topic": "Matrices y operaciones",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sean las matrices de orden 3, $A = \\begin{pmatrix} 3 & 0 & -1 \\\\ -2 & 4 & 0\\\\ 0 & 1 & -2 \\end{pmatrix}$ y $B = (b_{ij})$ , donde",
      "$$b_{ij}=\\left\\{\\begin{array}{ll} 0 & \\text{ si } i< j, \\\\ i & \\text{ si } i=j,\\\\ 1 & \\text{ si } i>j. \\end{array}\\right.$$",
      "Determine",
      "1. La matriz $B$ .",
      "2. La traza de $AB-BA$ ."
    ],
    "relatedTheory": [
      {
        "label": "Matrices y operaciones",
        "href": "/cursos/algebra-lineal#unidad-1-seccion-3"
      }
    ],
    "hints": [
      "Respeta el orden de los factores: las matrices no conmutan en general.",
      "Escribe cada entrada o aplica una identidad válida para matrices.",
      "Comprueba el resultado sustituyendo en la igualdad original."
    ],
    "solution": [
      {
        "body": "La regla define $B=\\begin{pmatrix}1&0&0\\\\1&2&0\\\\1&1&3\\end{pmatrix}$."
      },
      {
        "body": "Para cualesquiera matrices cuadradas del mismo orden, $\\operatorname{tr}(AB)=\\sum_{i,j}a_{ij}b_{ji}=\\operatorname{tr}(BA)$. Por tanto la traza de la diferencia es cero, sin necesidad de calcular todos los productos."
      }
    ],
    "finalAnswer": "$B=\\begin{pmatrix}1&0&0\\\\1&2&0\\\\1&1&3\\end{pmatrix}$ y $\\operatorname{tr}(AB-BA)=0$.",
    "commonMistake": ""
  },
  {
    "slug": "practica-algebra-lineal-f59520620f52",
    "number": "195",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Demostración · identidad de Cayley–Hamilton en orden dos",
    "topic": "Determinantes e inversas",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $A\\in \\mathrm M_2(K)$ . Demostrar que $A^2-\\operatorname{Tr}(A)A+\\det(A)I=0$ ."
    ],
    "relatedTheory": [
      {
        "label": "Determinantes e inversas",
        "href": "/cursos/algebra-lineal#unidad-2-seccion-2"
      }
    ],
    "hints": [
      "Escribe $A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$.",
      "Calcula $A^2$ y resta $(a+d)A$.",
      "Compara el resultado con $-(ad-bc)I$."
    ],
    "solution": [
      {
        "body": "$A^2=\\begin{pmatrix}a^2+bc&ab+bd\\\\ac+cd&bc+d^2\\end{pmatrix}$. Restando $(a+d)A$ queda $\\begin{pmatrix}bc-ad&0\\\\0&bc-ad\\end{pmatrix}=-(ad-bc)I$. Como $\\operatorname{tr}A=a+d$ y $\\det A=ad-bc$, la identidad queda demostrada."
      }
    ],
    "finalAnswer": "$A^2-\\operatorname{tr}(A)A+\\det(A)I=0$.",
    "commonMistake": "",
    "sourceCredit": "Héctor del Castillo · Universidad de Santiago de Chile (según la guía original)"
  },
  {
    "slug": "practica-algebra-lineal-bd8f2e9e97b3",
    "number": "196",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Potencias de la matriz de unos",
    "topic": "Matrices y operaciones",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $A= \\begin{pmatrix}1 & 1 \\\\ 1& 1\\end{pmatrix}\\in \\mathrm{M}_2(K)$ . Mostrar que $A^n=\\begin{pmatrix}2^{n-1}&2^{n-1}\\\\ 2^{n-1}& 2^{n-1}\\end{pmatrix}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Matrices y operaciones",
        "href": "/cursos/algebra-lineal#unidad-1-seccion-3"
      }
    ],
    "hints": [
      "Calcula $A^2$.",
      "Observa que $A^2=2A$.",
      "Prueba por inducción que $A^n=2^{n-1}A$ para $n\\ge1$."
    ],
    "solution": [
      {
        "body": "La fórmula es cierta para $n=1$. Si $A^n=2^{n-1}A$, entonces $A^{n+1}=2^{n-1}A^2=2^nA$. Esto demuestra el resultado para enteros $n\\ge1$ sobre cualquier cuerpo, interpretando los escalares en él."
      }
    ],
    "finalAnswer": "$A^n=2^{n-1}\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$, $n\\ge1$. Para $n=0$, $A^0=I$.",
    "commonMistake": "",
    "sourceCredit": "Héctor del Castillo · Universidad de Santiago de Chile (según la guía original)"
  },
  {
    "slug": "practica-algebra-lineal-e19a4d0c17b6",
    "number": "197",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Demostración · un conmutador no puede ser la identidad",
    "topic": "Matrices y operaciones",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Demostrar que $AB-BA\\neq 1$ para toda $A,B\\in \\mathrm M_{n}(\\mathbb R)$ ."
    ],
    "relatedTheory": [
      {
        "label": "Matrices y operaciones",
        "href": "/cursos/algebra-lineal#unidad-1-seccion-3"
      }
    ],
    "hints": [
      "Interpreta $1$ como la identidad matricial $I_n$.",
      "Calcula la traza de $AB-BA$.",
      "Compara con $\\operatorname{tr}(I_n)=n$ sobre los reales."
    ],
    "solution": [
      {
        "body": "Si $AB-BA=I_n$, al tomar trazas se obtiene $\\operatorname{tr}(AB)-\\operatorname{tr}(BA)=n$. El lado izquierdo es cero por la propiedad cíclica, pero $n>0$ en $\\mathbb R$. Es una contradicción."
      }
    ],
    "finalAnswer": "$AB-BA\\ne I_n$.",
    "commonMistake": "",
    "sourceCredit": "Héctor del Castillo · Universidad de Santiago de Chile (según la guía original)"
  },
  {
    "slug": "practica-algebra-lineal-2794d92c1160",
    "number": "198",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Demostración · inversa a partir de una matriz nilpotente",
    "topic": "Determinantes e inversas",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $A\\in \\mathrm{M}_n(K)$ tal que $A^k=0$ , para algun natrual $k$ . Demostrar que $I-A$ es invertible y encuentre su inversa."
    ],
    "relatedTheory": [
      {
        "label": "Determinantes e inversas",
        "href": "/cursos/algebra-lineal#unidad-2-seccion-2"
      }
    ],
    "hints": [
      "Prueba con una suma geométrica finita de potencias de $A$.",
      "Multiplica $I+A+\\cdots+A^{k-1}$ por $I-A$.",
      "Los términos intermedios se cancelan y queda $I-A^k$."
    ],
    "solution": [
      {
        "body": "Sea $S=I+A+\\cdots+A^{k-1}$. Entonces $(I-A)S=I-A^k=I$. También $S(I-A)=I-A^k=I$, porque $A$ conmuta con sus potencias. Por tanto $S$ es la inversa buscada."
      }
    ],
    "finalAnswer": "$(I-A)^{-1}=I+A+\\cdots+A^{k-1}$.",
    "commonMistake": "",
    "sourceCredit": "Héctor del Castillo · Universidad de Santiago de Chile (según la guía original)"
  },
  {
    "slug": "practica-algebra-lineal-d5216b5380d2",
    "number": "199",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Potencias de una matriz de desplazamiento",
    "topic": "Matrices y operaciones",
    "difficulty": "Inicial",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sea $A=\\begin{pmatrix}0&1&0&0\\\\ 0&0&1&0\\\\ 0&0&0&1\\\\ 0&0&0&0\\end{pmatrix}$ , calcular $A,A^2,A^{2021}$ ."
    ],
    "relatedTheory": [
      {
        "label": "Matrices y operaciones",
        "href": "/cursos/algebra-lineal#unidad-1-seccion-3"
      }
    ],
    "hints": [
      "Respeta el orden de los factores: las matrices no conmutan en general.",
      "Escribe cada entrada o aplica una identidad válida para matrices.",
      "Comprueba el resultado sustituyendo en la igualdad original."
    ],
    "solution": [
      {
        "body": "$A$ tiene unos en la primera superdiagonal. Al multiplicar, $A^2=\\begin{pmatrix}0&0&1&0\\\\0&0&0&1\\\\0&0&0&0\\\\0&0&0&0\\end{pmatrix}$. Cada potencia desplaza los unos una superdiagonal más, así que $A^4=0$."
      },
      {
        "body": "$A$ es la matriz del enunciado y $A^{2021}=A^4A^{2017}=0$."
      }
    ],
    "finalAnswer": "$A$ es la matriz dada; $A^2$ tiene unos solo en $(1,3)$ y $(2,4)$; $A^{2021}=0$.",
    "commonMistake": "",
    "sourceCredit": "Héctor del Castillo · Universidad de Santiago de Chile (según la guía original)"
  },
  {
    "slug": "practica-algebra-lineal-b6cb7ed19395",
    "number": "200",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Demostración · polinomios de matrices semejantes",
    "topic": "Determinantes e inversas",
    "difficulty": "Desafío",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Sean $A,B\\in \\mathrm{M}_n(K)$ y $P\\in K[X]$ . Si $B$ es invertible, entonces $BP(A)B^{-1}=P(BAB^{-1})$ ."
    ],
    "relatedTheory": [
      {
        "label": "Determinantes e inversas",
        "href": "/cursos/algebra-lineal#unidad-2-seccion-2"
      }
    ],
    "hints": [
      "Escribe el polinomio como suma de monomios.",
      "Prueba $(BAB^{-1})^j=BA^jB^{-1}$ por cancelación de factores adyacentes.",
      "Usa distributividad y que los coeficientes escalares conmutan con las matrices."
    ],
    "solution": [
      {
        "body": "Para $j=0$, $BI B^{-1}=I$. Para $j\\ge1$, el producto $(BAB^{-1})^j$ cancela cada factor $B^{-1}B$ interior y queda $BA^jB^{-1}$."
      },
      {
        "body": "Si $P(t)=\\sum_{j=0}^m c_jt^j$, entonces $P(BAB^{-1})=\\sum c_jBA^jB^{-1}=B(\\sum c_jA^j)B^{-1}=BP(A)B^{-1}$."
      }
    ],
    "finalAnswer": "$BP(A)B^{-1}=P(BAB^{-1})$.",
    "commonMistake": "",
    "sourceCredit": "Héctor del Castillo · Universidad de Santiago de Chile (según la guía original)"
  },
  {
    "slug": "practica-algebra-lineal-e79d87e1520a",
    "number": "201",
    "course": "Álgebra Lineal",
    "courseSlug": "algebra-lineal",
    "collection": "Ejercicios",
    "title": "Linealidad · escalares, polinomios y operadores diferenciales",
    "topic": "Matrices y operaciones",
    "difficulty": "Intermedio",
    "estimatedTime": "A tu ritmo",
    "statement": [
      "Cuales de las siguientes funciones son lineales:",
      "1. Sea $x\\in \\mathbb C$ . ¿Es la función $z\\mapsto xz$ ( $z\\in\\mathbb C$ ) $\\mathbb C$ -lineal? ¿ $\\mathbb R$ -lineal?",
      "2. Sean $a,b\\in K$ . Es la función $P(X)\\mapsto P(aX+b)$ , ( $P(X)\\in K[X]_{\\leq n}$ ) $K$ -lineal?",
      "3. ¿Es la función $P(X)\\mapsto P(X+1)-P(X)$ ( $P \\in K[X]_{\\leq n}$ ) $K$ -lineal?",
      "4. ¿Es la función $(x_1,x_2,x_3)\\mapsto (x_1,x_2^2,x_3+x_2)$ ( $x_1,x_2,x_3 \\in \\mathbb R$ ) $\\mathbb R$ -lineal?",
      "5. ¿Es la función $f(x)\\mapsto f^{''}(x)+\\cos(x)f(x)$ ( $f \\in C^{2}(\\mathbb R; \\mathbb R)$ ) $\\mathbb R$ -lineal?"
    ],
    "relatedTheory": [
      {
        "label": "Matrices y operaciones",
        "href": "/cursos/algebra-lineal#unidad-1-seccion-3"
      }
    ],
    "hints": [
      "Escribe las imágenes de los vectores de la base como columnas.",
      "Usa que $T(\\alpha u+\\beta v)=\\alpha T(u)+\\beta T(v)$.",
      "Para núcleo, resuelve $T(v)=0$; para imagen, estudia el espacio generado por las columnas."
    ],
    "solution": [
      {
        "body": "1. Para $x$ fijo, multiplicar por $x$ preserva combinaciones lineales complejas y, en particular, reales: sí en ambos casos."
      },
      {
        "body": "2. La sustitución fija $aX+b$ cumple $(\\alpha P+\\beta Q)(aX+b)=\\alpha P(aX+b)+\\beta Q(aX+b)$ y no aumenta el grado: sí."
      },
      {
        "body": "3. La diferencia $P(X+1)-P(X)$ es resta de dos operadores lineales: sí."
      },
      {
        "body": "4. No: para $v=(0,1,0)$, $F(2v)=(0,4,2)$ y $2F(v)=(0,2,2)$."
      },
      {
        "body": "5. Sí como mapa de $C^2(\\mathbb R)$ a $C^0(\\mathbb R)$: derivar dos veces y multiplicar por la función fija $\\cos x$ son operaciones lineales. No se puede suponer que la imagen sea siempre $C^2$ sin mayor regularidad de $f$."
      }
    ],
    "finalAnswer": "1. Sí sobre ambos cuerpos. 2. Sí. 3. Sí. 4. No. 5. Sí, con codominio de funciones continuas.",
    "commonMistake": "",
    "sourceCredit": "Héctor del Castillo · Universidad de Santiago de Chile (según la guía original)"
  }
];
