import type { IntroBlock, IntroChapter, IntroSection } from "./introductory-mathematics";
import { introductoryComplexNumbers } from "./introductory-complex-numbers.ts";

// Temario contrastado con documents.zip; desarrollo autocontenido para la web.
const t = String.raw;
const d = (title: string, text: string, tex?: string): IntroBlock => ({ kind: "definition", title, text, tex });
const e = (title: string, text: string): IntroBlock => ({ kind: "example", title, text });
const r = (title: string, text: string): IntroBlock => ({ kind: "remark", title, text });
const s = (title: string, blocks: IntroBlock[], exercise: string, hint: string, solution: string): IntroSection => ({ title, blocks, exercise, hint, solution });

export const introductoryAlgebraExtension: IntroChapter[] = [
  { title: "Conjuntos y cardinalidad", slug: "conjuntos", sections: [
    s("Pertenencia, inclusión y representación", [
      d("Elementos y universo", t`Un conjunto es una colección de objetos bien determinados. Escribimos $x\in A$ si x pertenece a A y $x\notin A$ si no pertenece. El universo U fija los objetos que estamos considerando; $\varnothing$ es el conjunto sin elementos.`),
      d("Extensión y comprensión", t`Por extensión enumeramos los elementos: $A=\{2,4,6\}$. Por comprensión describimos una condición: $A=\{x\in\mathbb N: x\text{ es par y }2\le x\le6\}$. El orden y las repeticiones no cambian un conjunto.`),
      d("Subconjunto e igualdad", t`$A\subseteq B$ significa que todo elemento de A pertenece a B. Dos conjuntos son iguales si $A\subseteq B$ y $B\subseteq A$. Siempre $\varnothing\subseteq A$. No confundas pertenencia de un elemento con inclusión de un conjunto.`),
      e("Leer los símbolos", t`Si $A=\{1,2,3\}$, entonces $2\in A$ y $\{2\}\subseteq A$. En cambio, $\{2\}\in A$ es falso: los elementos de A son números, no conjuntos.`),
    ], t`Escribe por extensión $B=\{x\in\mathbb Z:-2\le x<3\}$ y decide si $\{0,2\}\subseteq B$.`, "Enumera los enteros dentro de los límites, respetando el extremo abierto.", t`$B=\{-2,-1,0,1,2\}$. Tanto 0 como 2 pertenecen a B, así que $\{0,2\}\subseteq B$.`),
    s("Operaciones y diagramas de Venn", [
      d("Unión, intersección y complemento", t`$A\cup B$ contiene lo que está en A o en B, incluida su parte común. $A\cap B$ contiene lo que está en ambos. $A^c=U\setminus A$ contiene los elementos del universo que no están en A.`),
      d("Diferencia y diferencia simétrica", t`$A\setminus B$ contiene lo que está en A pero no en B. $A\triangle B=(A\setminus B)\cup(B\setminus A)$ contiene lo que está en exactamente uno. A y B son disjuntos si $A\cap B=\varnothing$.`),
      e("Leer las regiones", t`En un diagrama de Venn de dos conjuntos, separa cuatro regiones: solo A, ambos, solo B y ninguno. La unión reúne las tres primeras; la diferencia simétrica reúne solo A y solo B.`),
      r("El universo importa", t`Si $U=\{1,2,3,4,5\}$ y $A=\{1,3\}$, entonces $A^c=\{2,4,5\}$. Al cambiar U puede cambiar el complemento. Además, en general $A\setminus B\ne B\setminus A$.`),
    ], t`Con $U=\{1,2,3,4,5,6\}$, $A=\{1,2,4\}$ y $B=\{2,3,4\}$, calcula $A\cap B$, $A\triangle B$ y $(A\cup B)^c$.`, "Clasifica cada elemento en una de las cuatro regiones.", t`$A\cap B=\{2,4\}$; $A\triangle B=\{1,3\}$; $A\cup B=\{1,2,3,4\}$, así que su complemento es $\{5,6\}$.`),
    s("Álgebra de conjuntos y demostraciones", [
      d("Leyes que permiten transformar", t`Unión e intersección son conmutativas y asociativas. Ambas distribuyen respecto de la otra: $A\cap(B\cup C)=(A\cap B)\cup(A\cap C)$ y $A\cup(B\cap C)=(A\cup B)\cap(A\cup C)$.`),
      d("De Morgan y diferencia", t`$(A\cup B)^c=A^c\cap B^c$, $(A\cap B)^c=A^c\cup B^c$ y $A\setminus B=A\cap B^c$. Complementar intercambia «o» con «y» y niega cada pertenencia.`),
      e("Demostrar por pertenencia", t`Para probar $(A\cap B)\setminus(A\cap C)=A\cap(B\setminus C)$, toma x en el lado izquierdo. Está en A y B, pero no simultáneamente en A y C. Como ya está en A, no está en C. Por tanto está en $A\cap(B\setminus C)$. El razonamiento se invierte, dando la igualdad.`),
      r("Qué cuenta como demostración", "Una igualdad de conjuntos debe valer para todos los elementos, no solo para un ejemplo. Puedes demostrar doble inclusión o transformar una expresión con leyes válidas."),
    ], t`Demuestra $A\setminus(B\cup C)=(A\setminus B)\cap(A\setminus C)$.`, "Escribe las diferencias como intersecciones con complementos y aplica De Morgan.", t`$A\cap(B\cup C)^c=A\cap B^c\cap C^c=(A\cap B^c)\cap(A\cap C^c)$. En la última igualdad se usa $A\cap A=A$.`),
    s("Cardinalidad y problemas de encuestas", [
      d("Contar sin duplicar", t`Para conjuntos finitos, $|A|$ es su número de elementos. La parte común se cuenta dos veces al sumar $|A|+|B|$, por eso $|A\cup B|=|A|+|B|-|A\cap B|$. También $|A^c|=|U|-|A|$.`),
      d("Tres conjuntos", "Sumamos los tamaños individuales, restamos las intersecciones de a dos y recuperamos la triple intersección.", t`|A\cup B\cup C|=|A|+|B|+|C|-|A\cap B|-|A\cap C|-|B\cap C|+|A\cap B\cap C|`),
      e("Ejemplo resuelto: dos revistas", t`En una encuesta de 50 personas, sean a las que leen solo A, b ambas, c solo B y d ninguna. Si $b=2a=3c=4d$, entonces $b/2+b+b/3+b/4=50$. Multiplicando por 12 queda $25b=600$: $b=24$, $a=12$, $c=8$, $d=6$. Leen A un total de $a+b=36$, no solo 12.`),
      r("Exactamente y al menos", "En tres conjuntos, llena primero la intersección triple. «A y B» incluye a quienes también están en C; «solo A y B» los excluye. «Al menos uno» es la unión; «ninguno», su complemento."),
    ], "De 80 personas, 45 practican A, 32 practican B y 12 ambos. ¿Cuántas practican exactamente uno y cuántas ninguno?", "Calcula primero la unión. Para exactamente uno resta la intersección de cada grupo.", t`La unión tiene $45+32-12=65$ personas. Exactamente uno: $(45-12)+(32-12)=53$. Ninguno: $80-65=15$.`),
  ] },
  { title: "Inducción, sucesiones y sumatorias", slug: "induccion-sumatorias", sections: [
    s("Principio de inducción matemática", [
      d("Del primer caso a todos los siguientes", t`Para demostrar P(n) para todo entero $n\ge n_0$, verifica P($n_0$). Luego, para un k arbitrario con $k\ge n_0$, supone P(k) y demuestra P(k+1). La base inicia la cadena y el paso inductivo permite continuarla.`),
      e("Divisibilidad paso a paso", t`Probemos que $11^n-8^n$ es divisible por 3 para $n\ge1$. Base: $11-8=3$. Hipótesis: $11^k-8^k=3m$ para algún entero m. Entonces $11^{k+1}-8^{k+1}=8(11^k-8^k)+3\cdot11^k=3(8m+11^k)$. Esto prueba el siguiente caso.`),
      r("No suponer lo que se quiere probar", "La hipótesis es P(k), no P(k+1). Comprobar varios números sirve para conjeturar, pero no reemplaza la demostración para un k arbitrario."),
    ], t`Demuestra por inducción que $1+3+\cdots+(2n-1)=n^2$ para $n\ge1$.`, t`Al pasar de k a k+1 se agrega $2k+1$.`, t`Base: $1=1^2$. Si los primeros k impares suman $k^2$, al agregar el siguiente resulta $k^2+2k+1=(k+1)^2$. Así se cumple para todo $n\ge1$.`),
    s("Sucesiones explícitas y por recurrencia", [
      d("Una entrada natural, un término", t`Una sucesión real es una función de los naturales a los reales. Escribimos $a_n$ para el término de índice n. En una fórmula explícita se calcula directamente; una recurrencia lo relaciona con términos anteriores y necesita valores iniciales.`),
      e("Alternancia", t`Si $a_n=(-1)^n2^n$ para $n\ge1$, sus primeros términos son $-2,4,-8,16$. El signo alterna y el valor absoluto se duplica.`),
      e("Una sucesión definida por recurrencia", t`Con $a_1=3/4$ y $a_{n+1}=3/(4-a_n)$, obtenemos $a_2=12/13$ y $a_3=39/40$. La fórmula $a_n=(3^{n+1}-3)/(3^{n+1}-1)$ reproduce estos valores y se prueba por inducción sustituyéndola en la recurrencia.`),
      r("Revisar que esté definida", "Si una recurrencia tiene denominadores o raíces, comprueba sus restricciones en cada paso. También hay que precisar si la sucesión comienza en índice 0 o 1."),
    ], t`Si $b_1=2$ y $b_{n+1}=3b_n+1$, calcula $b_2,b_3,b_4$.`, "Usa el término recién calculado en el paso siguiente.", t`$b_2=7$, $b_3=22$ y $b_4=67$. No se sustituye n por el valor anterior: se sustituye $b_n$.`),
    s("Notación sigma y propiedades", [
      d("Límites e índice de suma", t`$\sum_{i=m}^{n}a_i=a_m+a_{m+1}+\cdots+a_n$. Para enteros $m\le n$ hay $n-m+1$ términos. El índice es una variable local: cambiar su letra no cambia la suma.`),
      d("Linealidad", t`Las sumas se distribuyen sobre sumas y restas, y las constantes pueden salir: $\sum(ca_i+db_i)=c\sum a_i+d\sum b_i$. Pero, en general, la suma de productos no es el producto de las sumas.`),
      e("Contar una constante", t`$\sum_{i=3}^{7}4=5\cdot4=20$. No es $7\cdot4$: el límite inicial no es 1. También $\sum_{i=1}^3(7i-3)=4+11+18=33$.`),
    ], t`Calcula $\sum_{i=2}^{5}(3i-1)$.`, "Puedes expandir cuatro términos o separar en dos sumas.", t`$3(2+3+4+5)-4=42-4=38$.`),
    s("Sumas notables y cambio de índice", [
      d("Fórmulas para potencias", "Para n natural positivo:", t`\sum_{i=1}^{n}i=\frac{n(n+1)}2,\quad \sum_{i=1}^{n}i^2=\frac{n(n+1)(2n+1)}6,\quad \sum_{i=1}^{n}i^3=\left(\frac{n(n+1)}2\right)^2`),
      d("Cuartas potencias", t`También $\sum_{i=1}^{n}i^4=n(n+1)(2n+1)(3n^2+3n-1)/30$. Para comenzar en m, resta la suma de 1 a m−1; no cambies simplemente n por la cantidad de términos.`),
      e("Cambiar índice sin cambiar la suma", t`Si $j=i-3$, entonces $\sum_{i=3}^{7}i^2=\sum_{j=0}^{4}(j+3)^2$. Cambian los dos límites y la expresión sumada. Otra opción es $\sum_{i=1}^{7}i^2-\sum_{i=1}^{2}i^2=140-5=135$.`),
    ], t`Calcula $\sum_{i=7}^{25}(3i-2)$.`, "Resta los primeros seis términos de la suma de enteros y cuenta cuántas veces aparece el 2.", t`Hay 19 términos. El valor es $3(25\cdot26/2-6\cdot7/2)-2\cdot19=3(325-21)-38=874$.`),
    s("Sumas telescópicas y fracciones parciales", [
      d("Cancelar términos consecutivos", t`$\sum_{k=1}^{n}(a_k-a_{k+1})=a_1-a_{n+1}$. Expande los primeros y últimos términos para identificar lo que sobrevive; no se cancelan todos.`),
      e("Preparar la cancelación", t`Factoriza $k^2+5k+6=(k+2)(k+3)$. Busca $1/((k+2)(k+3))=A/(k+2)+B/(k+3)$. De $1=A(k+3)+B(k+2)$ sale $A=1$, $B=-1$.`),
      e("Sumar después de descomponer", t`Por tanto $\sum_{k=1}^{100}1/(k^2+5k+6)=\sum_{k=1}^{100}(1/(k+2)-1/(k+3))=1/3-1/103=100/309$.`),
    ], t`Encuentra una fórmula para $\sum_{k=1}^{n}\frac1{k(k+1)}$.`, t`Escribe cada término como $1/k-1/(k+1)$.`, t`La suma es $(1-1/2)+(1/2-1/3)+\cdots+(1/n-1/(n+1))=1-1/(n+1)=n/(n+1)$.`),
    s("Sumatorias dobles", [
      d("Resolver desde adentro", t`En $\sum_{i=1}^{n}\sum_{j=1}^{m}a_{ij}$, fija i, realiza la suma en j y luego suma los resultados en i. Con rangos finitos rectangulares se puede invertir el orden.`),
      e("Una región triangular", t`En $\sum_{i=1}^{3}\sum_{j=1}^{i}(i+j)$, las filas son $2$, $3+4$ y $4+5+6$. El total es $24$. El límite interior i depende de la fila: no son nueve términos.`),
      r("Cambiar el orden exige cambiar los límites", t`La región $1\le j\le i\le n$ se escribe también $1\le j\le n$, $j\le i\le n$. Así $\sum_{i=1}^{n}\sum_{j=1}^{i}a_{ij}=\sum_{j=1}^{n}\sum_{i=j}^{n}a_{ij}$. Una suma sin índices admisibles se toma como cero.`),
    ], t`Calcula $\sum_{i=1}^{3}\sum_{j=1}^{2}ij$.`, "Para cada i, el factor i es constante respecto de j.", t`La suma interior es $i(1+2)=3i$. La exterior da $3(1+2+3)=18$.`),
  ] },
  { title: "Progresiones, factorial y binomio", slug: "progresiones-binomio", sections: [
    s("Progresiones aritméticas", [
      d("Diferencia constante", t`Una progresión aritmética cumple $a_{n+1}-a_n=d$. Sus términos son $a_n=a_1+(n-1)d$. Si d es positivo crece; si es negativo decrece; si es cero es constante.`),
      d("Suma de términos", "Al emparejar el primero con el último, cada pareja tiene la misma suma.", t`S_n=\frac{n(a_1+a_n)}2=\frac n2\bigl(2a_1+(n-1)d\bigr)`),
      e("Reconstruir a partir de dos términos", t`Si $a_3=5$ y $a_8=15$, al restar las ecuaciones se obtiene $5d=10$: $d=2$. Luego $a_1=1$, $a_{20}=39$ y $S_{20}=20(1+39)/2=400$.`),
    ], "Calcula la suma de todos los múltiplos de 7 entre 100 y 400.", "Busca el primero y el último; después cuenta los términos.", t`Son $105=7\cdot15$ hasta $399=7\cdot57$. Hay $57-15+1=43$ términos y la suma es $43(105+399)/2=10836$.`),
    s("Progresiones geométricas y sumas infinitas", [
      d("Razón constante", t`Una progresión geométrica se define por $a_{n+1}=ra_n$, de donde $a_n=a_1r^{n-1}$. Cuando los términos no son cero, r se obtiene dividiendo dos consecutivos.`),
      d("Suma finita e infinita", t`Para $r\ne1$, $S_n=a_1(1-r^n)/(1-r)$; si $r=1$, $S_n=na_1$. Para $|r|<1$, las sumas parciales convergen a $S_\infty=a_1/(1-r)$. No se usa esta última fórmula con $|r|\ge1$ y $a_1\ne0$.`),
      e("Rebotes de una pelota", t`Desde 12 m, una pelota rebota cada vez a dos tercios de la altura anterior. Tras la caída inicial, cada altura se recorre subiendo y bajando: $12+2(8+16/3+\cdots)=12+2\cdot8/(1-2/3)=60$ m.`),
      e("Decimales periódicos", t`$0.333\ldots=3/10+3/100+\cdots=(3/10)/(1-1/10)=1/3$. La repetición decimal se interpreta como una suma geométrica.`),
      r("Distinguir una progresión armónica", t`Una sucesión de términos no nulos es armónica si sus recíprocos forman una progresión aritmética. Por ejemplo, $1,1/2,1/3,\ldots$ es armónica, pero no geométrica: sus razones consecutivas no son constantes.`),
    ], t`Para la progresión $6,12,24,\ldots$, encuentra $a_8$ y $S_8$.`, "Identifica el primer término y la razón antes de usar las fórmulas.", t`$a_1=6$, $r=2$. Entonces $a_8=6\cdot2^7=768$ y $S_8=6(2^8-1)=1530$.`),
    s("Factorial, combinaciones y triángulo de Pascal", [
      d("Producto de naturales", t`$0!=1$ y $n!=n(n-1)!$ para $n\ge1$. Así, $5!=120$. Para simplificar cocientes, cancela productos antes de calcular números grandes.`),
      d("Elegir sin ordenar", t`El número de subconjuntos de k elementos de un conjunto de n elementos es $\binom nk=n!/(k!(n-k)!)$ para $0\le k\le n$. No cuenta el orden de selección. Si $k>n$, se define como cero.`),
      d("Simetría y regla de Pascal", t`$\binom nk=\binom n{n-k}$ y $\binom nk+\binom n{k+1}=\binom{n+1}{k+1}$. Estas relaciones construyen el triángulo de Pascal, con unos en sus bordes.`),
      e("Evitar contar el orden dos veces", t`Elegir tres personas entre cinco da $\binom53=10$. Si importara asignar tres cargos distintos, habría $5\cdot4\cdot3=60$ asignaciones: es otro problema.`),
    ], "¿Cuántos equipos de cuatro personas pueden elegirse entre ocho, sin cargos distintos?", "Elegir los cuatro que entran equivale a elegir los cuatro que quedan fuera.", t`$\binom84=8!/(4!4!)=(8\cdot7\cdot6\cdot5)/(4\cdot3\cdot2\cdot1)=70$.`),
    s("Binomio de Newton y búsqueda de un término", [
      d("Expansión general", "Para n entero no negativo:", t`(a+b)^n=\sum_{k=0}^{n}\binom nk a^{n-k}b^k`),
      r("El primer término corresponde a k=0", t`El término de posición k+1 es $\binom nk a^{n-k}b^k$. Hay n+1 términos antes de simplificar. En $(a-b)^n$, el factor $(-1)^k$ alterna sus signos.`),
      e("Buscar un exponente en vez de expandir todo", t`En $(\frac32x^2-\frac1{3x})^9$, con $x\ne0$, el término de índice k es $\binom9k(-1)^k3^{9-2k}x^{18-3k}/2^{9-k}$. No aparece $x^5$, pues $18-3k=5$ exige un k no entero. El término independiente corresponde a k=6 y vale $\binom96/(2^3\cdot3^3)=7/18$.`),
      e("Sumar coeficientes", t`Al poner $a=b=1$ se obtiene $\sum_{k=0}^{n}\binom nk=2^n$. Con $a=1$, $b=-1$ y $n\ge1$, la suma alternada es cero.`),
    ], t`Encuentra el coeficiente de $x^3$ en $(2x-1)^5$.`, "En el término general, el exponente de x es 5−k. Igualarlo a 3 determina k.", t`$k=2$. El término es $\binom52(2x)^3(-1)^2=80x^3$; el coeficiente pedido es 80.`),
  ] },
  introductoryComplexNumbers,
  { title: "Polinomios y fracciones parciales", slug: "polinomios", sections: [
    s("Definición, grado y operaciones", [
      d("Potencias enteras no negativas", t`Un polinomio tiene forma $p(x)=a_0+a_1x+\cdots+a_nx^n$. Si $a_n\ne0$, su grado es n, su coeficiente principal $a_n$ y su término independiente $a_0$. $1/x$ y $\sqrt x$ no son polinomios en x.`),
      d("Sumar y multiplicar", t`Se suman términos de igual grado y se multiplica distribuyendo. Para polinomios no nulos, $\deg(pq)=\deg p+\deg q$. Si $p+q\ne0$, su grado es a lo más el máximo de los grados originales: los términos principales pueden cancelarse.`),
      e("Cancelación del grado mayor", t`$(x^2+1)+(-x^2+x)=x+1$: la suma tiene grado 1, aunque ambos sumandos tienen grado 2. El polinomio cero se trata por separado; no le asignamos un grado natural.`),
    ], t`Calcula $(x^2+1)(3x^2+x+1)$ e indica su grado.`, "Multiplica cada término del primer factor por cada término del segundo y reúne potencias iguales.", t`Resulta $3x^4+x^3+4x^2+x+1$, de grado 4.`),
    s("División larga y división sintética", [
      d("Algoritmo de la división", t`Para polinomios p y g con $g\ne0$, existen únicos q y r tales que $p=gq+r$, donde r es cero o $\deg r<\deg g$. Ordena los términos y escribe ceros para las potencias ausentes.`),
      e("División larga de polinomios", t`Al dividir $x^4-x^3+4x^2-12x+3$ por $x^2+2x-1$, el cociente es $x^2-3x+11$ y el resto $-37x+14$. Se comprueba multiplicando divisor por cociente y sumando el resto.`),
      d("División sintética por x−a", t`Baja el primer coeficiente; multiplícalo por a y súmalo al siguiente. Repite. El último número es el resto y los anteriores son los coeficientes del cociente. Para dividir por $x+2$, se usa $a=-2$, no 2.`),
    ], t`Divide $p(x)=3x^3-5x+4$ por $x+2$ mediante división sintética. Identifica el cociente y el resto, y deduce el valor de $p(-2)$ sin sustituir en el polinomio original.`, t`Escribe $x+2=x-(-2)$: debes usar $a=-2$. Falta el término en $x^2$, así que sus coeficientes son $3,0,-5,4$. Para evaluar, usa $p(x)=(x+2)q(x)+r$.`, t`Bajamos 3. Multiplicamos $3(-2)=-6$ y sumamos $0-6=-6$. Luego $(-6)(-2)=12$ y $-5+12=7$. Finalmente $7(-2)=-14$ y $4-14=-10$. La fila final es $3,-6,7,-10$: $q(x)=3x^2-6x+7$ y $r=-10$. Por tanto, $p(x)=(x+2)(3x^2-6x+7)-10$. Al evaluar en −2, el factor $x+2$ se anula, así que $p(-2)=-10$.`),
    s("Teorema del resto y del factor", [
      d("Evaluar es encontrar el resto", t`Si $p(x)=(x-a)q(x)+r$, al poner x=a obtenemos $p(a)=r$. En particular, $x-a$ divide a p exactamente cuando $p(a)=0$. Decimos que a es una raíz o cero de p.`),
      e("Divisibilidad sin hacer una división larga", t`Para $p(x)=32x^{20}+33x^5+1$, $p(-1)=32-33+1=0$. Por tanto, $x+1$ es factor. El teorema demuestra divisibilidad, aunque no hayamos calculado el cociente.`),
      r("No confundir raíz con factor", t`La raíz es el número a; el factor correspondiente es $x-a$. Si la raíz es −2, el factor es $x+2$.`),
    ], t`Encuentra k para que $x-2$ sea factor de $x^3+kx+2$.`, "Impón que la evaluación en 2 sea cero.", t`$8+2k+2=0$, de donde $k=-5$. Se verifica $x^3-5x+2=(x-2)(x^2+2x-1)$.`),
    s("Raíces racionales, multiplicidad y signos", [
      d("Candidatas racionales", t`Si un polinomio con coeficientes enteros y término independiente no nulo tiene raíz racional $u/v$ en forma reducida, u divide al término independiente y v al coeficiente principal. Esto da candidatas, no garantiza que todas sean raíces.`),
      d("Multiplicidad", t`Una raíz a tiene multiplicidad m si $(x-a)^m$ divide al polinomio pero $(x-a)^{m+1}$ no. Por ejemplo, $x(x-1)^2$ tiene raíz 0 simple y raíz 1 doble.`),
      d("Regla de los signos de Descartes", t`El número de raíces reales positivas, contadas con multiplicidad, es el número de cambios de signo de los coeficientes no nulos de p, o ese número menos un entero par. Para las negativas se aplica la regla a p(−x). No proporciona por sí sola los valores de las raíces.`),
      e("Un ejemplo con raíz racional y dos irracionales", t`En $2x^3-x^2-3x-1$, las candidatas son $\pm1,\pm1/2$. Al evaluar, −1/2 es raíz. La factorización es $(2x+1)(x^2-x-1)$ y las otras raíces son $(1\pm\sqrt5)/2$.`),
    ], t`Determina las raíces y sus multiplicidades de $p(x)=x^3-2x^2+x$.`, "Saca factor común x y reconoce el cuadrado de un binomio.", t`$p(x)=x(x-1)^2$. La raíz 0 tiene multiplicidad 1 y la raíz 1 multiplicidad 2. Las multiplicidades suman el grado 3.`),
    s("Teorema fundamental y factorización en R y C", [
      d("Contar todas las raíces", t`Todo polinomio complejo de grado n positivo tiene exactamente n raíces en $\mathbb C$, contadas con multiplicidad. Se factoriza como $a_n\prod_{j=1}^{n}(x-z_j)$. Esto no afirma que todas las raíces sean reales ni distintas.`),
      d("Conjugadas y factores reales", t`Si los coeficientes son reales y z es raíz, también lo es $\overline z$, con la misma multiplicidad. El producto $(x-z)(x-\overline z)=x^2-2\operatorname{Re}(z)x+|z|^2$ tiene coeficientes reales.`),
      e("Ejemplo resuelto", t`Si sabemos que 3−i es raíz de $2x^3-13x^2+26x-10$, también lo es 3+i. Su factor real es $x^2-6x+10$. Al dividir queda $2x-1$. En $\mathbb R$: $(x^2-6x+10)(2x-1)$; en $\mathbb C$: $(x-(3-i))(x-(3+i))(2x-1)$.`),
    ], t`Factoriza $x^4-1$ completamente en $\mathbb R$ y en $\mathbb C$.`, "Usa diferencia de cuadrados dos veces y resuelve x²+1=0 en los complejos.", t`En $\mathbb R$: $(x-1)(x+1)(x^2+1)$. En $\mathbb C$: $(x-1)(x+1)(x-i)(x+i)$.`),
    s("Fracciones parciales: preparación y factores lineales", [
      d("Primero dividir y factorizar", t`Para descomponer $N(x)/D(x)$, con $D\ne0$, primero haz división si $\deg N\ge\deg D$. Después factoriza D. La descomposición se realiza sobre la fracción propia restante y conserva las exclusiones del denominador original.`),
      e("Factores distintos", t`Para $(7x-1)/((x-3)(x+2))$, plantea $A/(x-3)+B/(x+2)$. Multiplicar por el denominador da $7x-1=A(x+2)+B(x-3)$. Al evaluar en 3 y −2 se obtiene $A=4$, $B=3$.`),
      d("Factores repetidos", t`Un factor $(x-a)^m$ requiere todas las potencias: $A_1/(x-a)+A_2/(x-a)^2+\cdots+A_m/(x-a)^m$. No basta el término con la potencia más alta.`),
      e("Repetición de orden tres", t`$\frac{2x^2+3x+3}{(x+1)^3}=\frac2{x+1}-\frac1{(x+1)^2}+\frac2{(x+1)^3}$ para $x\ne-1$. Al reunir numeradores obtenemos $2(x+1)^2-(x+1)+2$, que verifica el resultado.`),
    ], t`Descompón $\frac{3x+2}{(x+1)^2}$.`, "Plantea A/(x+1)+B/(x+1)² y compara coeficientes.", t`$3x+2=A(x+1)+B$ da $A=3$, $B=-1$. Resultado: $3/(x+1)-1/(x+1)^2$, con $x\ne-1$.`),
    s("Fracciones parciales: cuadráticas irreducibles", [
      d("Numerador de grado menor", t`Si $q(x)=ax^2+bx+c$ tiene discriminante negativo, es irreducible en los reales. Sobre ese factor se escribe $(Ax+B)/q(x)$, no solo una constante. Para $q(x)^m$ se incluyen todas las potencias, cada una con su numerador lineal.`),
      e("Factor lineal y cuadrático", t`$\frac{6x-5}{(x-2)(x^2+x+1)}=\frac1{x-2}+\frac{-x+3}{x^2+x+1}$. Para verificar, el numerador reunido es $x^2+x+1+(-x+3)(x-2)=6x-5$.`),
      e("Cuadrática repetida", t`$\frac{x^2-x+9}{(x^2+9)^2}=\frac1{x^2+9}-\frac{x}{(x^2+9)^2}$. Aunque la forma general permite dos numeradores lineales, algunos coeficientes pueden resultar cero.`),
    ], t`Descompón $\frac{x^2+x+1}{x(x^2+1)}$.`, "Usa A/x+(Bx+C)/(x²+1) y multiplica por el denominador.", t`$x^2+x+1=A(x^2+1)+(Bx+C)x$. Comparando: $A=1$, $C=1$, $B=0$. Queda $1/x+1/(x^2+1)$, con $x\ne0$.`),
  ] },
  { title: "Geometría analítica y cónicas", slug: "geometria-analitica", sections: [
    s("Coordenadas, distancia y punto medio", [
      d("Geometría escrita con números", t`Un punto del plano se representa por un par ordenado (x,y). La distancia entre $P=(x_1,y_1)$ y $Q=(x_2,y_2)$ es $\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$. El punto medio es $((x_1+x_2)/2,(y_1+y_2)/2)$.`),
      e("Reconocer un triángulo rectángulo", t`Para $A=(-1,-3)$, $B=(6,1)$ y $C=(2,-5)$, las distancias al cuadrado son $AB^2=65$, $BC^2=52$ y $AC^2=13$. Como $52+13=65$, el ángulo recto está en C, opuesto al lado mayor AB.`),
      r("No confundir distancia con vector", "La distancia es un número no negativo. El desplazamiento es un par de componentes y depende de la orientación. Invertir P y Q cambia el vector de signo, pero no la distancia."),
    ], t`Encuentra el punto medio y la distancia entre $(-2,3)$ y $(4,-2)$.`, "Promedia las coordenadas para el punto medio; resta y usa Pitágoras para la distancia.", t`El punto medio es $(1,1/2)$ y la distancia es $\sqrt{6^2+(-5)^2}=\sqrt{61}$.`),
    s("Rectas, paralelismo y ángulos", [
      d("Formas de una recta", t`Con pendiente m y punto $(x_0,y_0)$: $y-y_0=m(x-x_0)$. La forma general es $Ax+By+C=0$, con A y B no ambos cero. Si $B\ne0$, la pendiente es $-A/B$; si $B=0$, la recta es vertical.`),
      d("Relaciones entre rectas", t`Las rectas no verticales paralelas tienen la misma pendiente. Son perpendiculares si $m_1m_2=-1$; una vertical es perpendicular a una horizontal. Para el menor ángulo entre rectas no perpendiculares, $\tan\theta=|(m_2-m_1)/(1+m_1m_2)|$.`),
      e("Recta paralela por un punto", t`La recta $6x+3y=4$ tiene pendiente −2. La paralela por (5,−7) cumple $y+7=-2(x-5)$, luego $y=-2x+3$.`),
    ], t`Halla la perpendicular a $y=2x+1$ que pasa por $(4,0)$.`, "La pendiente perpendicular es −1/2. Usa punto-pendiente.", t`$y=-(x-4)/2=-x/2+2$. En forma general, $x+2y-4=0$.`),
    s("Distancia a una recta y lugares geométricos", [
      d("La distancia más corta", t`La distancia de $P=(x_0,y_0)$ a $Ax+By+C=0$ es $|Ax_0+By_0+C|/\sqrt{A^2+B^2}$. Es la longitud del segmento perpendicular, no la diferencia vertical salvo en casos particulares.`),
      d("Traducir una condición geométrica", "Un lugar geométrico reúne todos los puntos que cumplen una condición. Escribe P=(x,y), expresa sus distancias y traduce la condición a una ecuación. Si elevas al cuadrado, comprueba que no agregas soluciones."),
      e("Equidistancia de tres puntos", t`Para $A=(1,7)$, $B=(8,6)$ y $C=(7,-1)$, igualar $PA^2=PB^2$ y $PA^2=PC^2$ da $7x-y=25$ y $3x-4y=0$. Su solución es $P=(4,3)$; las tres distancias valen 5.`),
    ], t`Calcula la distancia de $(2,3)$ a $x+y-2=0$.`, "Sustituye el punto en el numerador y usa el valor absoluto.", t`$d=|2+3-2|/\sqrt{1^2+1^2}=3/\sqrt2=3\sqrt2/2$.`),
    s("Circunferencia y completar cuadrados", [
      d("Distancia constante a un centro", t`Una circunferencia de centro (h,k) y radio r positivo cumple $(x-h)^2+(y-k)^2=r^2$. Si el segundo miembro es cero, queda un solo punto; si es negativo, no hay puntos reales.`),
      e("De la ecuación general a sus elementos", t`En $3x^2+3y^2-12x+18y=9$, divide por 3: $x^2-4x+y^2+6y=3$. Completa cuadrados sumando 4 y 9 a ambos lados: $(x-2)^2+(y+3)^2=16$. El centro es (2,−3) y el radio 4.`),
      r("Círculo y circunferencia", t`La igualdad describe solo el borde. La desigualdad $(x-h)^2+(y-k)^2\le r^2$ describe el disco, incluido su interior.`),
    ], t`Encuentra la circunferencia con centro $(-2,3)$ que pasa por $(4,5)$.`, "El radio es la distancia del centro al punto; basta calcular su cuadrado.", t`$r^2=(4+2)^2+(5-3)^2=40$. La ecuación es $(x+2)^2+(y-3)^2=40$, con radio $2\sqrt{10}$.`),
    s("Parábola: foco, directriz y vértice", [
      d("Equidistancia entre un punto y una recta", t`Una parábola reúne los puntos a igual distancia del foco y de la directriz. Con vértice (h,k), la forma vertical es $(x-h)^2=4p(y-k)$, con $p\ne0$. Su foco es (h,k+p) y su directriz $y=k-p$.`),
      d("Orientación horizontal", t`Para $(y-k)^2=4p(x-h)$, el foco es (h+p,k) y la directriz $x=h-p$. El signo de p indica derecha o izquierda; en la forma vertical, arriba o abajo. La distancia del vértice al foco es $|p|$.`),
      e("Ejemplo resuelto", t`$2x=y^2+8y+22$ se reescribe $(y+4)^2=2(x-3)$. Entonces $4p=2$, $p=1/2$, el vértice es (3,−4), el foco (7/2,−4) y la directriz $x=5/2$. Abre a la derecha.`),
    ], t`Halla la parábola con vértice $(-4,2)$ y directriz $y=5$.`, "Usa k−p=5 para encontrar p y observa hacia dónde abre.", t`$2-p=5$ da $p=-3$. La ecuación es $(x+4)^2=-12(y-2)$, con foco $(-4,-1)$; abre hacia abajo.`),
    s("Elipse y excentricidad", [
      d("Suma de distancias constante", t`Una elipse reúne los puntos cuya suma de distancias a dos focos es $2a$. Usamos a como semieje mayor y b como semieje menor, con $a\ge b>0$. La distancia del centro a cada foco es $c=\sqrt{a^2-b^2}$.`),
      d("Orientación y elementos", t`Si el eje mayor es horizontal: $(x-h)^2/a^2+(y-k)^2/b^2=1$, con focos (h±c,k). Si es vertical, intercambia los denominadores y los focos son (h,k±c). La excentricidad es $e=c/a$: entre 0 y 1, incluyendo e=0 para la circunferencia.`),
      e("Una elipse trasladada", t`$16x^2+9y^2+64x-18y-71=0$ se transforma en $(x+2)^2/9+(y-1)^2/16=1$. Tiene centro (−2,1), eje mayor vertical, $a=4$, $b=3$, $c=\sqrt7$ y focos $(-2,1\pm\sqrt7)$.`),
      r("Interpretar a y b", "Aquí a siempre nombra el semieje mayor; no necesariamente está bajo x². Esta convención evita cambiar la fórmula c²=a²−b² cuando cambia la orientación."),
    ], t`Encuentra los focos y la excentricidad de $x^2/25+y^2/9=1$.`, "Identifica a=5 y b=3, y calcula c.", t`$c=\sqrt{25-9}=4$. Los focos son $(\pm4,0)$ y $e=4/5$. Los vértices mayores son $(\pm5,0)$.`),
    s("Hipérbola, focos y asíntotas", [
      d("Diferencia de distancias constante", t`Una hipérbola satisface $|d(P,F_1)-d(P,F_2)|=2a$. En la forma horizontal $(x-h)^2/a^2-(y-k)^2/b^2=1$, con a,b positivos, $c=\sqrt{a^2+b^2}$; los focos son (h±c,k) y los vértices (h±a,k).`),
      d("Asíntotas y orientación", t`En la horizontal, las asíntotas son $y-k=\pm(b/a)(x-h)$. En la vertical $(y-k)^2/a^2-(x-h)^2/b^2=1$, son $y-k=\pm(a/b)(x-h)$. El término positivo determina el eje de apertura. La excentricidad $e=c/a$ es mayor que 1.`),
      e("Completar cuadrados con signos distintos", t`$9x^2-4y^2-54x-16y+29=0$ da $9(x-3)^2-4(y+2)^2=36$, luego $(x-3)^2/4-(y+2)^2/9=1$. Centro (3,−2), focos $(3\pm\sqrt{13},-2)$ y asíntotas $y+2=\pm(3/2)(x-3)$.`),
    ], t`Describe $y^2/9-x^2/4=1$: vértices, focos y asíntotas.`, "El término positivo es y²: el eje de apertura es vertical.", t`$a=3$, $b=2$, $c=\sqrt{13}$. Vértices $(0,\pm3)$, focos $(0,\pm\sqrt{13})$, asíntotas $y=\pm3x/2$.`),
    s("Clasificación y parametrización de cónicas", [
      d("Clasificar con cuidado", t`En una ecuación sin término xy, $Ax^2+By^2+Dx+Ey+F=0$, cuadrados de igual signo sugieren una elipse; de signo contrario, una hipérbola; un único término cuadrático, una parábola. Completa cuadrados para comprobar que no sea un caso degenerado o sin puntos reales.`),
      e("Los signos no bastan", t`$x^2+y^2=-1$ no tiene puntos reales; $x^2+y^2=0$ es un punto; $x^2-y^2=0$ son dos rectas. Si aparece xy, puede hacer falta una rotación de ejes: las reglas anteriores no se aplican directamente.`),
      d("Describir una curva con un parámetro", t`La elipse $(x-h)^2/a^2+(y-k)^2/b^2=1$ admite $x=h+a\cos t$, $y=k+b\sin t$, $0\le t<2\pi$. Al sustituir, la ecuación se reduce a $\cos^2t+\sin^2t=1$. La curva completa no necesita ser la gráfica de una función y=f(x).`),
      e("Parábola parametrizada", t`Para $(x-h)^2=4p(y-k)$, toma $x=h+t$, $y=k+t^2/(4p)$ con t real. No confundas este parámetro t con la distancia focal p.`),
    ], t`Parametriza $(x-1)^2/4+(y+2)^2/9=1$ y encuentra el punto para $t=\pi/2$.`, "Usa las raíces de los denominadores como radios horizontal y vertical.", t`$x=1+2\cos t$, $y=-2+3\sin t$, $0\le t<2\pi$. Para $t=\pi/2$, el punto es $(1,1)$.`),
  ] },
];
