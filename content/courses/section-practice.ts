export type SectionPractice = { question: string; hint: string; solution: string };

// Cada fila corresponde, en orden, a una subsección del capítulo indicado.
// Los separadores son editoriales; las fórmulas usan delimitadores LaTeX.
function rows(text: string): SectionPractice[] {
  return text.trim().split("\n").map(line => {
    const parts = line.split(" | ");
    if (parts.length !== 3 || parts.some(part => !part.trim())) throw new Error("Práctica incompleta");
    return { question: parts[0], hint: parts[1], solution: parts[2] };
  });
}

export const sectionPractice: Record<string, Record<string, SectionPractice[]>> = {
  "algebra-lineal": {
    "unidad-1": rows(String.raw`
Calcula $2u+v$ para $u=(1,-2)$ y $v=(3,1)$. | Opera componente a componente. | $2u+v=(2,-4)+(3,1)=(5,-3)$.
Sea $A=\begin{pmatrix}1&0&2\\-1&3&4\end{pmatrix}$. Indica su tamaño y calcula $a_{23}+a_{11}$. | El primer índice indica la fila; el segundo, la columna. | Tiene tamaño $2\times3$ y $a_{23}+a_{11}=4+1=5$.
Para $A=\begin{pmatrix}1&2\\0&-1\end{pmatrix}$ y $B=\begin{pmatrix}2&0\\3&1\end{pmatrix}$, calcula $2A-B$. | Multiplica cada entrada de $A$ por $2$ antes de restar. | $2A-B=\begin{pmatrix}0&4\\-3&-3\end{pmatrix}$.
Resuelve $2X+A=B$ si $A=\begin{pmatrix}1&0\\2&1\end{pmatrix}$ y $B=\begin{pmatrix}3&4\\0&5\end{pmatrix}$. | Despeja $X=\frac12(B-A)$. | $X=\begin{pmatrix}1&2\\-1&2\end{pmatrix}$.
Calcula $AB$ y $BA$ para $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ y $B=\begin{pmatrix}1&0\\1&1\end{pmatrix}$. ¿Son iguales? | Multiplica fila por columna en ambos órdenes. | $AB=\begin{pmatrix}2&1\\1&1\end{pmatrix}$ y $BA=\begin{pmatrix}1&1\\1&2\end{pmatrix}$. No son iguales.
Comprueba que $B=\begin{pmatrix}1&-2\\0&1\end{pmatrix}$ es inversa de $A=\begin{pmatrix}1&2\\0&1\end{pmatrix}$. | Calcula ambos productos. | $AB=BA=\begin{pmatrix}1&0\\0&1\end{pmatrix}=I_2$; por definición, $B=A^{-1}$.
Resuelve $AX=\begin{pmatrix}4\\3\end{pmatrix}$ para $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ usando la inversa. | $A^{-1}=\begin{pmatrix}1&-1\\0&1\end{pmatrix}$. | $X=A^{-1}\begin{pmatrix}4\\3\end{pmatrix}=\begin{pmatrix}1\\3\end{pmatrix}$.
Escalona $\begin{pmatrix}1&2&1\\2&4&3\end{pmatrix}$ con una operación de fila. | Usa $F_2\leftarrow F_2-2F_1$. | Se obtiene $\begin{pmatrix}1&2&1\\0&0&1\end{pmatrix}$, que está escalonada.
Calcula el rango de $\begin{pmatrix}1&2&3\\2&4&6\\0&1&1\end{pmatrix}$. | La segunda fila depende de la primera; la tercera no. | Tras eliminar la segunda fila quedan dos filas no nulas independientes. El rango es $2$.
Halla la inversa de $A=\begin{pmatrix}1&0\\2&1\end{pmatrix}$ mediante $[A\mid I]$. | Aplica $F_2\leftarrow F_2-2F_1$ a toda la matriz aumentada. | El bloque izquierdo queda $I_2$ y el derecho $A^{-1}=\begin{pmatrix}1&0\\-2&1\end{pmatrix}$.
`),
    "unidad-2": rows(String.raw`
Calcula los determinantes de $A=\begin{pmatrix}1&2\\2&4\end{pmatrix}$ y $B=\begin{pmatrix}1&2\\0&1\end{pmatrix}$. ¿Cuál es invertible? | Usa $ad-bc$. | $\det A=0$ y $\det B=1$. Solo $B$ es invertible.
Calcula $\det\begin{pmatrix}2&1&0\\0&3&4\\0&0&-1\end{pmatrix}$. | La matriz es triangular. | El determinante es el producto de la diagonal: $2\cdot3\cdot(-1)=-6$.
Usa la adjunta para invertir $A=\begin{pmatrix}2&1\\1&1\end{pmatrix}$. | Calcula primero el determinante. | $\det A=1$ y $\operatorname{adj}A=\begin{pmatrix}1&-1\\-1&2\end{pmatrix}$. Esta es también $A^{-1}$.
Calcula $\det\begin{pmatrix}1&2&3\\2&4&7\\0&1&0\end{pmatrix}$ aprovechando sus ceros. | Usa $F_2\leftarrow F_2-2F_1$ y expande por la segunda fila. | Queda $\begin{pmatrix}1&2&3\\0&0&1\\0&1&0\end{pmatrix}$. El cofactor de la entrada $(2,3)$ da determinante $-1$.
`),
    "unidad-3": rows(String.raw`
Escribe $x+2y=5$, $3x-y=1$ en la forma $AX=b$. | Coloca los coeficientes de cada ecuación en una fila. | $A=\begin{pmatrix}1&2\\3&-1\end{pmatrix}$, $X=\begin{pmatrix}x\\y\end{pmatrix}$ y $b=\begin{pmatrix}5\\1\end{pmatrix}$.
¿Cuántas soluciones tiene $x+y=2$, $2x+2y=4$? | Compara ambas ecuaciones. | La segunda es el doble de la primera. Hay infinitas soluciones: $(x,y)=(2-t,t)$, $t\in\mathbb R$.
Resuelve por eliminación $x+y=4$, $2x-y=2$. | Suma las ecuaciones. | $3x=6$, por tanto $x=2$ y $y=2$.
Parametriza las soluciones de $x+y+z=2$, $x-y+z=0$. | Resta las ecuaciones y toma $z=t$. | $2y=2$, así que $y=1$ y $x=1-t$. Las soluciones son $(1-t,1,t)$.
Aplica Gauss-Jordan al sistema $x+2y=7$, $y=2$. | Elimina el término $2y$ de la primera fila. | $F_1\leftarrow F_1-2F_2$ da $x=3$, $y=2$.
Usa Cramer para resolver $2x+y=5$, $x-y=1$. | Calcula $\Delta$, $\Delta_x$ y $\Delta_y$. | $\Delta=-3$, $\Delta_x=-6$, $\Delta_y=-3$. Luego $x=2$, $y=1$.
Encuentra todas las soluciones de $x+2y-z=0$. | Deja dos variables libres. | Con $y=s$ y $z=t$, se obtiene $(x,y,z)=s(-2,1,0)+t(1,0,1)$.
Demuestra que $A=\begin{pmatrix}2&1\\0&2\end{pmatrix}$ no es diagonalizable. | Encuentra el espacio propio asociado a $\lambda=2$. | El único valor propio es $2$. La ecuación $(A-2I)v=0$ impone $v_2=0$, por lo que solo hay una dirección propia. No existe una base de dos vectores propios.
Diagonaliza $A=\begin{pmatrix}2&1\\0&3\end{pmatrix}$. | Busca vectores propios para $2$ y $3$. | Sirven $(1,0)$ y $(1,1)$. Con $P=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ y $D=\begin{pmatrix}2&0\\0&3\end{pmatrix}$ se cumple $AP=PD$, luego $A=PDP^{-1}$.
`),
    "unidad-4": rows(String.raw`
Escribe $(3,-2)$ como combinación de $e_1=(1,0)$ y $e_2=(0,1)$. | Compara las coordenadas. | $(3,-2)=3e_1-2e_2$.
Demuestra que $0v=\mathbf0$ en cualquier espacio vectorial. | Usa $(0+0)v=0v+0v$ y suma el opuesto de $0v$. | Como $0v=0v+0v$, al sumar $-(0v)$ a ambos lados resulta $\mathbf0=0v$.
Demuestra que $W=\{(x,y):y=2x\}$ es un subespacio de $\mathbb R^2$. | Escribe sus elementos como $t(1,2)$. | Contiene el vector cero y $a[s(1,2)]+b[t(1,2)]=(as+bt)(1,2)\in W$. Está cerrado bajo combinaciones lineales.
Decide si $(1,2)$ y $(2,4)$ son linealmente independientes. | Busca una combinación nula no trivial. | $2(1,2)-(2,4)=(0,0)$, con coeficientes no todos nulos; son dependientes.
¿Pertenece $(2,3,5)$ al espacio generado por $(1,0,1)$ y $(0,1,1)$? | Las primeras dos coordenadas fijan los coeficientes. | Sí: $(2,3,5)=2(1,0,1)+3(0,1,1)$.
Da una base y la dimensión de $W=\{(x,y,z):x+y+z=0\}$. | Despeja $z=-x-y$. | $(x,y,z)=x(1,0,-1)+y(0,1,-1)$. Estos dos vectores son independientes: forman una base y $\dim W=2$.
Sean $U=\operatorname{span}\{(1,0)\}$ y $V=\operatorname{span}\{(1,1)\}$. Calcula $U+V$ y $U\cap V$. | Compara un vector $(a,0)$ con $(b,b)$. | La intersección es $\{0\}$. Además $(x,y)=(x-y)(1,0)+y(1,1)$, por lo que $U+V=\mathbb R^2$.
Con $\langle u,v\rangle=2u_1v_1+u_2v_2$, calcula $\langle(1,2),(3,-1)\rangle$ y la norma de $(1,2)$. | La norma es $\sqrt{\langle u,u\rangle}$. | El producto interno es $6-2=4$ y la norma es $\sqrt{2+4}=\sqrt6$.
Demuestra que $(1,1)$ y $(1,-1)$ son ortogonales con el producto euclídeo. | Calcula su producto punto. | $(1,1)\cdot(1,-1)=1-1=0$, luego son ortogonales.
Calcula la distancia entre $P=(1,1)$ y $Q=(4,5)$ y un vector unitario de $P$ a $Q$. | Usa $Q-P$. | $Q-P=(3,4)$ tiene norma $5$. La distancia es $5$ y el unitario es $(3/5,4/5)$.
Proyecta $v=(2,1)$ sobre $W=\operatorname{span}\{(1,1)\}$ y calcula la distancia a $W$. | Usa $\operatorname{proj}_u v=\frac{v\cdot u}{u\cdot u}u$. | La proyección es $(3/2,3/2)$. El residuo $(1/2,-1/2)$ es ortogonal a $W$ y tiene norma $1/\sqrt2$.
Aplica Gram-Schmidt a $v_1=(1,0)$, $v_2=(1,1)$. | Resta a $v_2$ su proyección sobre $v_1$. | $u_1=(1,0)$ y $u_2=(1,1)-(1,0)=(0,1)$. Ya tienen norma uno: forman la base ortonormal buscada.
`),
    "unidad-5": rows(String.raw`
Demuestra que $T(x,y)=(x+y,2x)$ es lineal. | Comprueba que $T(au+bv)=aT(u)+bT(v)$. | Para $u=(u_1,u_2)$ y $v=(v_1,v_2)$, $T(au+bv)=(a(u_1+u_2)+b(v_1+v_2),2au_1+2bv_1)=aT(u)+bT(v)$.
Calcula el núcleo y la imagen de $T(x,y)=(x+y,0)$. | Para el núcleo resuelve $T(x,y)=0$; para la imagen describe las salidas posibles. | $\ker T=\operatorname{span}\{(1,-1)\}$ e $\operatorname{Im}T=\operatorname{span}\{(1,0)\}$.
`),
    "unidad-6": rows(String.raw`
Sea $B=((1,0),(1,1))$. Halla $[v]_B$ para $v=(4,2)$ y la matriz que convierte coordenadas de $B$ a las canónicas. | Escribe $v=a(1,0)+b(1,1)$. | $b=2$, $a=2$, luego $[v]_B=(2,2)$. La matriz es $P=\begin{pmatrix}1&1\\0&1\end{pmatrix}$; verifica $P[v]_B=v$.
Para $A=\begin{pmatrix}1&2&0\\0&0&1\end{pmatrix}$, calcula rango, nulidad y una base del núcleo. | Resuelve $Ax=0$ y cuenta los pivotes. | Hay dos pivotes: rango $2$. El núcleo es $\operatorname{span}\{(-2,1,0)\}$, de dimensión $1$. Se verifica $2+1=3$.
`),
  },
  "calculo-vectorial": {
    "clase-1": rows(String.raw`
Para $u=(2,-1,3)\in\mathbb R^3$, identifica sus coordenadas y calcula $u_1+u_2+u_3$. | Respeta el orden de las componentes. | $u_1=2$, $u_2=-1$, $u_3=3$; su suma es $4$.
Calcula $u-2v$ para $u=(1,3,-1)$ y $v=(2,0,1)$. | Multiplica antes de restar. | $u-2v=(1,3,-1)-(4,0,2)=(-3,3,-3)$.
Verifica Cauchy-Schwarz para $u=(1,2)$ y $v=(2,-1)$. | Compara $|u\cdot v|$ con $\|u\|\|v\|$. | El producto punto es $0$ y ambas normas son $\sqrt5$. Por tanto $0\le5$.
Calcula $(1,0,0)\times(0,1,0)$ y comprueba que es perpendicular a ambos factores. | Usa la fórmula del producto cruz y luego productos punto. | El resultado es $(0,0,1)$. Su producto punto con cada factor es $0$.
Normaliza el vector $v=(2,-1,2)$. | Divide por su norma. | $\|v\|=3$, luego $u=(2/3,-1/3,2/3)$ y $\|u\|=1$.
Parametriza la recta por $P=(1,0,2)$ y $Q=(3,1,1)$. | Su dirección es $Q-P$. | $r(t)=(1,0,2)+t(2,1,-1)$, $t\in\mathbb R$. Para $t=0,1$ se obtienen $P,Q$.
Halla el plano que pasa por $(1,2,3)$ y tiene normal $(1,-1,2)$. | Usa $n\cdot(X-P)=0$. | $(x-1)-(y-2)+2(z-3)=0$, es decir $x-y+2z-5=0$.
`),
    "clase-2": rows(String.raw`
Clasifica $f(x,y)=x^2+y^2$ y $r(t)=(t,t^2,1)$ según dominio y codominio. | Cuenta las variables de entrada y las componentes de salida. | $f:\mathbb R^2\to\mathbb R$ es un campo escalar; $r:\mathbb R\to\mathbb R^3$ es una función vectorial que parametriza una curva.
Encuentra el dominio de $f(x,y)=\sqrt{9-x^2-y^2}$. | Exige radicando no negativo. | $x^2+y^2\le9$: el disco cerrado de centro $(0,0)$ y radio $3$.
Describe las curvas de nivel de $f(x,y)=x^2+y^2$ para niveles $0$, $1$ y $4$. | Iguala la función a cada constante. | Para $0$ se obtiene solo el origen. Para $1$ y $4$ se obtienen círculos centrados en el origen de radios $1$ y $2$.
Parametriza la elipse $x^2/4+y^2=1$. | Usa $\cos^2t+\sin^2t=1$. | $r(t)=(2\cos t,\sin t)$, $0\le t\le2\pi$. Al sustituir se cumple la ecuación.
¿Pertenece $(1,0)$ a la bola abierta de centro $(0,0)$ y radio $1$? ¿Y a la cerrada? | Compara su distancia al centro con el radio. | Su distancia es $1$. No pertenece a la abierta, que exige $d<1$, pero sí a la cerrada, que permite $d\le1$.
Prueba por definición que $\lim_{(x,y)\to(0,0)}x=0$. | Usa $|x|\le\sqrt{x^2+y^2}$. | Dado $\varepsilon>0$, toma $\delta=\varepsilon$. Si $0<\|(x,y)\|<\delta$, entonces $|x|\le\|(x,y)\|<\varepsilon$.
`),
    "clase-3": rows(String.raw`
Calcula $\lim_{(x,y)\to(1,2)}\frac{x+y}{1+x^2}$. | El denominador no se anula en el punto. | Por continuidad del cociente, el límite es $\frac{1+2}{1+1}=\frac32$.
Usa polares para probar $\lim_{(x,y)\to(0,0)}\frac{x^2y}{x^2+y^2}=0$. | Sustituye $x=r\cos\theta$, $y=r\sin\theta$ y acota uniformemente. | La expresión es $r\cos^2\theta\sin\theta$, cuyo valor absoluto es a lo más $r$. Como $r\to0$, el límite es $0$.
¿Qué valor debes asignar a $f(0,0)$ para que $f(x,y)=\frac{x^2y^2}{x^2+y^2}$ fuera del origen sea continua allí? | Usa $0\le f(x,y)\le y^2$. | El límite es $0$ por el teorema del encaje. Hay que definir $f(0,0)=0$.
`),
    "clase-4": rows(String.raw`
Para $f(x,y)=x^2y+y^3$, calcula $f_{xx}$, $f_{yy}$ y las dos derivadas mixtas. | Deriva primero respecto de una variable manteniendo fija la otra. | $f_x=2xy$, $f_y=x^2+3y^2$. Así $f_{xx}=2y$, $f_{yy}=6y$ y ambas derivadas mixtas valen $2x$.
`),
    "clase-5": rows(String.raw`
Encuentra y clasifica el punto crítico de $f(x,y)=x^2+2y^2-2x$. | Completa el cuadrado o usa el Hessiano. | $f=(x-1)^2+2y^2-1$. El único punto crítico es $(1,0)$ y es un mínimo global estricto, con valor $-1$.
Halla los extremos de $f(x,y)=x+y$ sobre $x^2+y^2=2$. | Usa $\nabla f=\lambda\nabla g$. | $1=2\lambda x=2\lambda y$ implica $x=y$. La restricción da $(1,1)$ y $(-1,-1)$. Los valores máximo y mínimo son $2$ y $-2$.
`),
    "clase-6": rows(String.raw`
Evalúa $r(t)=(t^2,\sin t,e^t)$ en $t=0$ y determina si es continua allí. | Revisa cada componente. | $r(0)=(0,0,1)$. Todas las componentes son continuas, luego $r$ también lo es.
Para $r(t)=(t,t^2,t^3)$, calcula velocidad y aceleración en $t=1$. | Deriva componente a componente dos veces. | $r'(t)=(1,2t,3t^2)$ y $r''(t)=(0,2,6t)$. En $1$ valen $(1,2,3)$ y $(0,2,6)$.
Para $r(t)=(\cos t,\sin t,0)$, halla los planos normal, osculador y rectificante en $t=0$. | En ese punto $T=(0,1,0)$, $N=(-1,0,0)$ y $B=(0,0,1)$. | Pasan por $(1,0,0)$. Sus normales son respectivamente $T,B,N$: las ecuaciones son $y=0$, $z=0$ y $x=1$.
Calcula la longitud de $r(t)=(3t,4t,0)$ para $0\le t\le2$. | Integra la rapidez $\|r'(t)\|$. | La rapidez es $5$, así que $L=\int_0^2 5\,dt=10$.
Calcula la curvatura de $r(t)=(2\cos t,2\sin t,0)$. | Usa $\kappa=\|r'\times r''\|/\|r'\|^3$. | $\|r'\|=2$ y $\|r'\times r''\|=4$. Por tanto $\kappa=4/8=1/2$.
`),
    "clase-7": rows(String.raw`
Calcula una suma de Riemann por extremos derechos de $f(x)=x$ en $[0,1]$ con $n$ intervalos y toma su límite. | Usa $\Delta x=1/n$ y $\sum_{k=1}^n k=n(n+1)/2$. | La suma es $\frac1{n^2}\sum_{k=1}^n k=\frac{n+1}{2n}$, cuyo límite es $1/2$.
Calcula $\iint_R 3\,dA$ para $R=[0,2]\times[0,4]$. | Una constante se multiplica por el área. | El área es $8$, por lo que la integral vale $24$.
Calcula $\int_0^1\int_0^2(x+y)\,dy\,dx$. | Integra primero con respecto de $y$. | La integral interior es $2x+2$. Luego $\int_0^1(2x+2)\,dx=3$.
Integra $f(x,y)=x$ sobre $D=\{0\le x\le1,\ 0\le y\le x\}$. | Describe la región con límites iterados. | $\iint_D x\,dA=\int_0^1\int_0^x x\,dy\,dx=\int_0^1x^2\,dx=1/3$.
`),
    "clase-8": rows(String.raw`
Con $x=2u$, $y=3v$, transforma la integral de $1$ sobre $[0,2]\times[0,3]$ y calcúlala. | Calcula el valor absoluto del jacobiano. | El nuevo dominio es $[0,1]^2$ y el jacobiano vale $6$. La integral es $\int_0^1\int_0^1 6\,du\,dv=6$.
Calcula $\iint_D(x^2+y^2)\,dA$ para el disco unitario. | En polares el integrando es $r^2$ y $dA=r\,dr\,d\theta$. | $\int_0^{2\pi}\int_0^1r^3\,dr\,d\theta=\pi/2$.
Encuentra el centro de masas de la lámina uniforme $[0,2]\times[0,4]$. | Usa simetría o los cocientes de momentos entre masa. | Por simetría respecto de $x=1$ e $y=2$, el centro de masas es $(1,2)$.
Calcula el momento de inercia respecto del eje $x$ de $[0,1]^2$ con densidad $1$. | La distancia al eje es $y$. | $I_x=\int_0^1\int_0^1y^2\,dy\,dx=1/3$.
Calcula el área de la superficie $z=x+y$ sobre $[0,1]^2$. | Usa $\sqrt{1+f_x^2+f_y^2}$. | Las derivadas son $f_x=f_y=1$, luego el área es $\iint_{[0,1]^2}\sqrt3\,dA=\sqrt3$.
`),
    "clase-9": rows(String.raw`
Calcula $\iiint_B z\,dV$ para $B=[0,1]\times[0,2]\times[0,3]$. | Integra primero respecto de $z$. | La integral es $1\cdot2\cdot\int_0^3z\,dz=9$.
La transformación $x=2u$, $y=v$, $z=3w$ lleva el cubo unitario a una caja. Calcula su volumen mediante el jacobiano. | La matriz derivada es diagonal. | El jacobiano absoluto vale $2\cdot1\cdot3=6$. Integrarlo sobre el cubo unitario da volumen $6$.
Calcula el volumen del cilindro $x^2+y^2\le4$, $0\le z\le3$ usando coordenadas cilíndricas. | Usa $dV=r\,dz\,dr\,d\theta$. | $V=\int_0^{2\pi}\int_0^2\int_0^3r\,dz\,dr\,d\theta=12\pi$.
Calcula el volumen de la bola unitaria con coordenadas esféricas. | Usa $dV=\rho^2\sin\phi\,d\rho\,d\phi\,d\theta$, con $0\le\phi\le\pi$. | $V=\int_0^{2\pi}\int_0^\pi\int_0^1\rho^2\sin\phi\,d\rho\,d\phi\,d\theta=4\pi/3$.
`),
    "clase-10": rows(String.raw`
Calcula $\int_C(x+y)\,ds$ sobre el segmento de $(0,0)$ a $(1,1)$. | Toma $r(t)=(t,t)$, $0\le t\le1$. | $ds=\sqrt2\,dt$ y $x+y=2t$. La integral es $\int_0^1 2t\sqrt2\,dt=\sqrt2$.
Explica por qué el disco abierto unitario es simplemente conexo. | Contrae cualquier lazo hacia el origen con segmentos. | El disco es convexo. Si $\gamma$ es un lazo, $H(s,t)=(1-s)\gamma(t)$ permanece dentro del disco y lo contrae al origen.
Encuentra una potencial de $F(x,y)=(2x,2y)$ y verifica el resultado. | Integra la primera componente y ajusta la función de $y$. | Sirve $\varphi(x,y)=x^2+y^2$, pues $\nabla\varphi=(2x,2y)$.
Calcula la integral de $F=(2x,2y)$ a lo largo de cualquier curva suave por tramos de $(0,0)$ a $(1,2)$. | Usa la potencial $\varphi=x^2+y^2$. | Por el teorema fundamental, la integral es $\varphi(1,2)-\varphi(0,0)=5$.
`),
    "clase-11": rows(String.raw`
Comprueba que $r(t)=(2\cos t,\sin t)$, $0\le t\le2\pi$, es una curva cerrada e indica su orientación. | Compara los extremos y observa hacia dónde se mueve desde $t=0$. | $r(0)=r(2\pi)=(2,0)$, así que es cerrada. Desde el extremo derecho se mueve hacia arriba, pues $r'(0)=(0,1)$; recorre la elipse en sentido antihorario, con orientación positiva.
Usa Green para calcular $\oint_C(-y\,dx+x\,dy)$, donde $C$ es el círculo unitario orientado en sentido antihorario. | El integrando de área es $Q_x-P_y=2$. | La integral vale $\iint_D2\,dA=2\pi$.
`),
  },
  "calculo-diferencial": {
    "funciones": rows(String.raw`
Sea $f:\mathbb R\to\mathbb R$, $f(x)=x^2+1$. Calcula $f(-2)$ y su recorrido. | El cuadrado es no negativo y puede tomar cualquier valor no negativo. | $f(-2)=5$. El recorrido es $[1,\infty)$, aunque el conjunto de llegada es $\mathbb R$.
Describe cómo obtener la gráfica de $g(x)=|x-2|+3$ a partir de $|x|$ y encuentra su mínimo. | Localiza dónde se anula el valor absoluto. | Se traslada dos unidades a la derecha y tres hacia arriba. El mínimo es $3$, alcanzado en $x=2$.
Para $f(x)=2x+1$ y $g(x)=x^2$, calcula $f\circ g$, $g\circ f$ y $f^{-1}$. | Respeta el orden y despeja la variable en $y=2x+1$. | $(f\circ g)(x)=2x^2+1$, $(g\circ f)(x)=(2x+1)^2$ y $f^{-1}(x)=(x-1)/2$.
`),
    "limites": rows(String.raw`
Prueba con $\varepsilon$ y $\delta$ que $\lim_{x\to2}(3x+1)=7$. | Escribe $|(3x+1)-7|=3|x-2|$. | Para $\varepsilon>0$, toma $\delta=\varepsilon/3$. Si $0<|x-2|<\delta$, el error es menor que $3\delta=\varepsilon$.
Calcula $\lim_{x\to3}\frac{x^2-9}{x-3}$. ¿Cómo completarías la función para hacerla continua en $3$? | Factoriza el numerador. | Para $x\ne3$, el cociente es $x+3$. El límite es $6$ y hay que definir $f(3)=6$.
Encuentra las asíntotas vertical y horizontal de $f(x)=\frac{2x+1}{x-1}$. | Escribe $f(x)=2+\frac3{x-1}$. | La asíntota vertical es $x=1$ y la horizontal es $y=2$.
`),
    "limites-notables": rows(String.raw`
Calcula $\lim_{n\to\infty}(1+2/n)^n$. | Relaciona la expresión con la definición de $e$. | Escribe $m=n/2$. Entonces $(1+2/n)^n=[(1+1/m)^m]^2\to e^2$.
Calcula $\lim_{x\to0}\frac{\sin(3x)}{x}$. | Introduce el denominador $3x$. | $\frac{\sin(3x)}x=3\frac{\sin(3x)}{3x}\to3$.
`),
    "derivada": rows(String.raw`
Para $f(x)=x^2$, calcula la pendiente de la secante entre $x=1$ y $x=1+h$ y su límite. | Usa el cociente incremental. | La pendiente es $\frac{(1+h)^2-1}{h}=2+h$ para $h\ne0$. Al tender $h$ a cero se obtiene $2$.
Demuestra desde la definición que la derivada de $f(x)=3x-2$ es $3$. | Sustituye en $\frac{f(x+h)-f(x)}h$. | El cociente es $\frac{3h}{h}=3$ para $h\ne0$. Su límite también es $3$.
`),
    "reglas": rows(String.raw`
Deriva $f(x)=(x^2+1)e^x$. | Usa la regla del producto. | $f'(x)=2xe^x+(x^2+1)e^x=e^x(x^2+2x+1)$.
Deriva $f(x)=\sin(x^2+1)$. | Identifica la función interior y la exterior. | $f'(x)=\cos(x^2+1)\cdot2x$.
Halla la pendiente de $x^2+y^2=25$ en $(3,4)$ por derivación implícita. | Recuerda que $y$ depende de $x$. | $2x+2yy'=0$, así que $y'=-x/y$. En $(3,4)$ la pendiente es $-3/4$.
`),
    "inversa-parametricas": rows(String.raw`
Sea $f(x)=x^3+x$. Calcula $(f^{-1})'(2)$ sin despejar la inversa. | Encuentra $a$ tal que $f(a)=2$. | $a=1$ y $f'(1)=4$. Entonces $(f^{-1})'(2)=1/f'(1)=1/4$.
Para $x(t)=t^2+1$, $y(t)=t^3$, calcula $dy/dx$ en $t=2$. | Divide $dy/dt$ por $dx/dt$, comprobando que este no sea cero. | $dy/dx=3t^2/(2t)$ para $t\ne0$. En $t=2$ vale $3$.
`),
    "lhopital": rows(String.raw`
Calcula $\lim_{x\to0}\frac{e^x-1}{x}$ mediante L'Hôpital. | Comprueba la forma $0/0$ antes de derivar. | Numerador y denominador tienden a cero. El cociente de derivadas es $e^x/1$, cuyo límite es $1$.
Calcula $\lim_{x\to0^+}x\ln x$. | Reescribe como $\ln x/(1/x)$. | Es una forma $-\infty/\infty$. L'Hôpital da $\lim_{x\to0^+}(1/x)/(-1/x^2)=\lim_{x\to0^+}(-x)=0$.
`),
    "aplicaciones": rows(String.raw`
Usa la aproximación lineal de $\sqrt{x}$ en $x=4$ para estimar $\sqrt{4.04}$. | $L(x)=f(4)+f'(4)(x-4)$. | $f(4)=2$ y $f'(4)=1/4$. Luego $\sqrt{4.04}\approx2+0.04/4=2.01$.
Determina dónde crece $f(x)=x^3-3x$ y clasifica sus extremos locales. | Estudia el signo de $f'(x)=3(x^2-1)$. | Crece en $(-\infty,-1)$ y $(1,\infty)$; decrece en $(-1,1)$. Tiene máximo local $f(-1)=2$ y mínimo local $f(1)=-2$.
Un rectángulo tiene perímetro $20$. ¿Qué dimensiones maximizan su área? | Escribe los lados como $x$ y $10-x$. | $A(x)=x(10-x)=25-(x-5)^2$, con $0<x<10$. El máximo es $25$, cuando ambos lados miden $5$.
`),
  },
  "ecuaciones-diferenciales": {
    "clase-1": rows(String.raw`
Clasifica $y''+xy'-y=0$ según orden y linealidad. | Mira la derivada de mayor orden y las potencias de la incógnita. | Es de segundo orden, lineal y homogénea. Sus coeficientes dependen solo de $x$.
Verifica que $y(x)=e^{-2x}$ resuelve $y'+2y=0$. | Deriva y sustituye. | $y'=-2e^{-2x}$, luego $y'+2y=-2e^{-2x}+2e^{-2x}=0$.
Encuentra la solución de $y'=2x$ con $y(1)=3$. | Integra y usa el dato inicial. | $y=x^2+C$. Como $3=1+C$, resulta $y=x^2+2$.
Resuelve $y'=3y$, $y(0)=2$. | Separa $dy/y=3\,dx$. | $\ln|y|=3x+C$, luego $y=Ke^{3x}$. El dato inicial da $K=2$: $y=2e^{3x}$.
`),
    "clase-2": rows(String.raw`
Comprueba que $(2x+y)\,dx+(x+2y)\,dy=0$ es exacta y encuentra una solución implícita. | Compara $M_y$ y $N_x$ e integra $M$ respecto de $x$. | Ambas derivadas valen $1$. Una potencial es $x^2+xy+y^2$, de modo que $x^2+xy+y^2=C$.
Resuelve $y'+y=1$ con $y(0)=0$. | El factor integrante es $e^x$. | $(e^xy)'=e^x$, luego $y=1+Ce^{-x}$. El dato inicial da $C=-1$: $y=1-e^{-x}$.
`),
    "clase-3": rows(String.raw`
Encuentra un factor integrante dependiente de $x$ para $2y\,dx+x\,dy=0$ en $x>0$ y resuélvela. | Calcula $(M_y-N_x)/N$. | El cociente es $1/x$, por lo que $\mu=x$. La ecuación se vuelve $2xy\,dx+x^2\,dy=0$, es decir $d(x^2y)=0$. Así $x^2y=C$.
Resuelve $y'=1+y/x$ en $x>0$ mediante $y=vx$. | Usa $y'=v+xv'$. | $v+xv'=1+v$, luego $v'=1/x$. Así $v=\ln x+C$ y $y=x(\ln x+C)$.
`),
    "clase-4": rows(String.raw`
Resuelve $y'=x+y$ mediante la sustitución $z=x+y$. | Entonces $z'=1+y'=1+z$. | $z+1=Ce^x$, luego $y=Ce^x-x-1$. Al derivar se verifica $y'=x+y$.
En la ecuación de Bernoulli $y'+y=y^2$, realiza $z=1/y$ para $y\ne0$ y resuelve. | Multiplica por $-y^{-2}$. | Se obtiene $z'-z=-1$, luego $z=1+Ce^x$ y $y=1/(1+Ce^x)$ donde el denominador no se anule. Además, $y=0$ es una solución que la sustitución excluye.
`),
    "clase-5": rows(String.raw`
Resuelve $y'''=0$ e indica cuántas constantes arbitrarias aparecen. | Integra tres veces. | $y=C_1+C_2x+C_3x^2$. Hay tres constantes arbitrarias.
Demuestra que si $y_1,y_2$ resuelven $y''+y=0$, también lo hace $ay_1+by_2$ para constantes $a,b$. | Usa la linealidad de la derivada. | $(ay_1+by_2)''+(ay_1+by_2)=a(y_1''+y_1)+b(y_2''+y_2)=0$.
Comprueba con el wronskiano que $e^x$ y $e^{-x}$ son linealmente independientes. | Forma el determinante con las funciones y sus derivadas. | $W=e^x(-e^{-x})-e^xe^{-x}=-2\ne0$. Son independientes.
Reduce $y''=2y'$ a primer orden y resuélvela. | Sustituye $v=y'$. | $v'=2v$ da $v=Ce^{2x}$. Integrando y renombrando constantes, $y=C_1+C_2e^{2x}$.
Sabiendo que $y_1=e^x$ resuelve $y''-2y'+y=0$, encuentra otra solución con $y=ve^x$. | Sustituye y cancela los términos comunes. | Resulta $e^xv''=0$, luego $v=ax+b$. Tomando $v=x$, se obtiene $y_2=xe^x$, independiente de $e^x$.
`),
    "clase-6": rows(String.raw`
Resuelve $y''-5y'+6y=0$. | Factoriza la ecuación característica. | $r^2-5r+6=(r-2)(r-3)$. La solución general es $y=C_1e^{2x}+C_2e^{3x}$.
Resuelve $y''+4y=0$, $y(0)=1$, $y'(0)=0$. | Las raíces características son $\pm2i$. | $y=C_1\cos2x+C_2\sin2x$. Los datos dan $C_1=1$, $C_2=0$, luego $y=\cos2x$.
`),
    "clase-7": rows(String.raw`
Encuentra una solución particular de $y''-y=2$. | Prueba una constante. | Si $y_p=A$, la ecuación pide $-A=2$. Por tanto $y_p=-2$.
¿Por qué falla probar $y_p=Ae^x$ en $y''-y=e^x$? Encuentra una forma que funcione. | $e^x$ ya resuelve la homogénea; prueba $Axe^x$. | Para $Ae^x$ el lado izquierdo es cero. Con $y_p=Axe^x$ resulta $y_p''-y_p=2Ae^x$, luego $A=1/2$.
Usa variación de parámetros para hallar una particular de $y''+y=1$. | Toma $y_1=\cos x$, $y_2=\sin x$, con wronskiano $1$. | $u_1'=-\sin x$, $u_2'=\cos x$. Eligiendo $u_1=\cos x$, $u_2=\sin x$ se obtiene $y_p=\cos^2x+\sin^2x=1$.
`),
    "clase-8": rows(String.raw`
Resuelve $x^2y''-2y=0$ en $x>0$. | Prueba $y=x^m$. | $m(m-1)-2=(m-2)(m+1)=0$, luego $y=C_1x^2+C_2x^{-1}$.
Calcula $\mathcal L\{1\}(s)$ desde la definición e indica para qué $s$ real converge. | Integra $e^{-st}$ entre $0$ e infinito. | Para $s>0$, $\int_0^\infty e^{-st}\,dt=1/s$. Si $s\le0$, la integral no converge.
Calcula $\mathcal L^{-1}\{3/(s+2)\}$. | Usa $\mathcal L\{e^{at}\}=1/(s-a)$. | La inversa es $3e^{-2t}$.
Expresa $\mathcal L\{y''\}$ en función de $Y(s)$ si $y(0)=2$ e $y'(0)=-1$. | Usa la fórmula para la segunda derivada. | $\mathcal L\{y''\}=s^2Y(s)-sy(0)-y'(0)=s^2Y(s)-2s+1$.
Calcula $\mathcal L\{\int_0^t \tau\,d\tau\}$. | La transformada de una integral desde cero es $F(s)/s$. | Como $\mathcal L\{t\}=1/s^2$, se obtiene $1/s^3$ para $s>0$. También se verifica transformando $t^2/2$.
`),
    "clase-9": rows(String.raw`
Resuelve con Laplace $y'+2y=0$, $y(0)=3$. | Transforma la derivada y despeja $Y(s)$. | $sY-3+2Y=0$, luego $Y=3/(s+2)$. Invirtiendo, $y=3e^{-2t}$.
Calcula $\mathcal L\{e^{3t}\sin t\}$. | Desplaza $s$ a $s-3$ en la transformada del seno. | $\mathcal L\{e^{3t}\sin t\}=1/((s-3)^2+1)$, para $s>3$.
Escribe con funciones de Heaviside una señal que vale $0$ antes de $t=1$, $2$ entre $1$ y $3$, y $0$ después de $3$. | Activa en $1$ y desactiva en $3$. | $f(t)=2H(t-1)-2H(t-3)$. Los valores exactos en los saltos dependen de la convención elegida para $H(0)$.
`),
    "clase-10": rows(String.raw`
Calcula $\mathcal L\{H(t-2)(t-2)\}$. | Aplica el segundo teorema de traslación a $f(t)=t$. | La transformada es $e^{-2s}/s^2$, para $s>0$.
Usa la derivada de una transformada para hallar $\mathcal L\{te^{-t}\}$. | Si $F(s)=\mathcal L\{f\}$, entonces $\mathcal L\{tf\}=-F'(s)$. | Para $F(s)=1/(s+1)$, se tiene $-F'(s)=1/(s+1)^2$, válido para $s>-1$.
Calcula $\mathcal L\{\sin t/t\}$ para $s>0$ usando la integral de una transformada. | Integra $1/(u^2+1)$ desde $s$ hasta infinito. | $\mathcal L\{\sin t/t\}=\int_s^\infty\frac{du}{u^2+1}=\frac\pi2-\arctan s$. En $t=0$ se usa la extensión continua de $\sin t/t$.
Resuelve por Laplace $x'=y$, $y'=-x$, con $x(0)=1$ e $y(0)=0$. | Transforma ambas ecuaciones y elimina una incógnita. | $sX-1=Y$ y $sY=-X$. Así $X=s/(s^2+1)$, $Y=-1/(s^2+1)$, luego $x=\cos t$ e $y=-\sin t$.
`),
    "clase-11": rows(String.raw`
Para $f(x)=\sin x$ en $[-\pi,\pi]$, indica sus coeficientes de Fourier. | Usa ortogonalidad de senos y cosenos. | Con $f\sim a_0/2+\sum_{n\ge1}(a_n\cos nx+b_n\sin nx)$, todos los $a_n$ son cero; $b_1=1$ y $b_n=0$ para $n\ne1$.
Verifica que $u(x,t)=e^{-t}\sin x$ resuelve $u_t=u_{xx}$ y escríbela como producto separado. | Deriva una vez en $t$ y dos en $x$. | $u_t=-e^{-t}\sin x=u_{xx}$. Es $u=X(x)T(t)$ con $X=\sin x$ y $T=e^{-t}$.
Para $u(x,t)=e^{-t}\sin x$ en $0\le x\le\pi$, comprueba las condiciones de frontera homogéneas y encuentra el dato inicial. | Evalúa en $x=0$, $x=\pi$ y $t=0$. | $u(0,t)=u(\pi,t)=0$ y $u(x,0)=\sin x$.
`),
  },
};
