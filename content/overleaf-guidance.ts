import type { Exercise } from "./exercises";
import { trigonometryGuidance } from "./trigonometry-guidance.ts";
import { calculusGuidance } from "./calculus-guidance.ts";
import { linearGuidance } from "./linear-guidance.ts";
import { introGuidance } from "./intro-guidance.ts";

// Ayudas y soluciones redactadas para la web; no se atribuyen a las fuentes.
export const overleafGuidance: Record<string, Partial<Exercise>> = {
  ...trigonometryGuidance,
  ...calculusGuidance,
  ...linearGuidance,
  ...introGuidance,
  "106c4d922912": {
    title: "Un cociente de potencias complejas", difficulty: "Inicial",
    topic: "Números complejos", relatedTheory: [{label:"Números complejos",href:"/cursos/introduccion-matematicas#intro-complejos-1"}],
    hints: [String.raw`Recuerda que $i^2=-1$ y $i^3=-i$.`, String.raw`Desarrolla $(1+i)^3$.`, String.raw`Comprueba si el numerador es un múltiplo de $1-i$.`],
    solution: [{body:String.raw`$(1+i)^2=2i$, luego $(1+i)^3=-2+2i=-2(1-i)$. El denominador es $1+i^3=1-i\ne0$, así que el cociente es $-2$.`}], finalAnswer: "$-2$.",
  },
  "535904b7a9e9": {
    title: "Una potencia del módulo", difficulty: "Inicial",
    hints: [String.raw`Calcula primero $|2+3i|$.`, String.raw`Usa $|a+bi|=\sqrt{a^2+b^2}$.`, String.raw`Escribe $2000=2\cdot1000$.`],
    solution:[{body:String.raw`$|2+3i|=\sqrt{2^2+3^2}=\sqrt{13}$. Por tanto $|2+3i|^{2000}=(\sqrt{13})^{2000}=13^{1000}$.`}], finalAnswer:String.raw`$|2+3i|^{2000}=13^{1000}$.`,
  },
  "38219c12220b": {
    title: "Módulo y conjugado", difficulty:"Inicial",
    hints:[String.raw`Escribe $z=a+bi$ con $a,b\in\mathbb R$.`,String.raw`Su conjugado es $\overline z=a-bi$.`,String.raw`Multiplica usando diferencia de cuadrados.`],
    solution:[{body:String.raw`$z\overline z=(a+bi)(a-bi)=a^2-(bi)^2=a^2+b^2$. Como $|z|=\sqrt{a^2+b^2}$, resulta $z\overline z=|z|^2$.`}],finalAnswer:String.raw`$|z|^2=z\overline z$ para todo $z\in\mathbb C$.`,
  },
  "c701b77850df": {
    title:"Un complejo a partir de su módulo y parte real",difficulty:"Inicial",
    hints:[String.raw`$z+\overline z=2x$.`,String.raw`Usa $x^2+y^2=25$.`,String.raw`Escoge la raíz negativa para $y$.`],
    solution:[{body:String.raw`De $2x=8$ se obtiene $x=4$. Entonces $16+y^2=25$, así que $y=\pm3$. La parte imaginaria negativa exige $y=-3$. Se verifica $(4-3i)+(4+3i)=8$ y $|4-3i|=5$.`}],finalAnswer:"$z=4-3i$.",
  },
  "318b6036a814": {
    title:"Dos distancias en el plano complejo",difficulty:"Intermedio",
    hints:[String.raw`De $|z|=1/|z|$ y $|z|>0$ deduce el módulo.`,String.raw`Escribe $z=a+bi$ y plantea $a^2+b^2=1$ y $(1-a)^2+b^2=1$.`,String.raw`Resta ambas ecuaciones.`],
    solution:[{body:String.raw`La primera igualdad da $|z|^2=1$, por lo que $|z|=1$. Al restar $(1-a)^2+b^2=a^2+b^2$ resulta $1-2a=0$. Así $a=1/2$ y $b^2=3/4$. Ambos signos de $b$ cumplen las tres igualdades.`}],finalAnswer:String.raw`$z=\frac12\pm\frac{\sqrt3}{2}i$.`,
  },
  "3043a2956474": {
    title:"Comprobar la linealidad de una transformación",difficulty:"Inicial",
    hints:[String.raw`Busca una matriz $A$ tal que $T(v)=Av$.`,String.raw`Sus columnas son $T(1,0)$ y $T(0,1)$.`,String.raw`Usa $A(\alpha u+\beta v)=\alpha Au+\beta Av$.`],
    solution:[{body:String.raw`$T(a,b)=\begin{pmatrix}3&2\\1&-1\\-1&1\end{pmatrix}\begin{pmatrix}a\\b\end{pmatrix}$. Al ser multiplicación por una matriz fija, preserva sumas y productos por escalares: $T(\alpha u+\beta v)=\alpha T(u)+\beta T(v)$.`}],finalAnswer:"Sí, $T$ es lineal.",
  },
  "f0cac312ea44": {
    title:"Núcleo de una transformación en tres variables",difficulty:"Inicial",
    hints:[String.raw`Impón $T(x,y,z)=(0,0,0)$.`,String.raw`Las ecuaciones son $x=0$ e $y-z=0$.`,String.raw`Toma $z=t$ como parámetro libre.`],
    solution:[{body:String.raw`La condición $T(x,y,z)=0$ equivale a $x=0$, $y=z$. Por tanto los elementos del núcleo son $(0,t,t)=t(0,1,1)$, con $t\in\mathbb R$.`}],finalAnswer:String.raw`$\ker T=\operatorname{span}\{(0,1,1)\}$.`,
  },
  "cd49bd42536d": {
    title:"Rango a partir de las imágenes posibles",difficulty:"Inicial",
    topic:"Transformaciones lineales", relatedTheory:[{label:"Transformaciones lineales",href:"/cursos/algebra-lineal#unidad-5-seccion-2"}],
    hints:[String.raw`Describe todos los posibles valores de $(-x,z,0)$.`,String.raw`Las primeras dos componentes pueden elegirse libremente.`,String.raw`Encuentra una base del plano de salida.`],
    solution:[{body:String.raw`La imagen es $\{(a,b,0):a,b\in\mathbb R\}$. Los vectores $(1,0,0)$ y $(0,1,0)$ forman una base de ese espacio, cuya dimensión es $2$.`}],finalAnswer:String.raw`$\operatorname{rango}(T)=2$.`,
  },
  "cf3a9b181ffb": {
    title:"Inyectividad y núcleo",difficulty:"Inicial",
    topic:"Transformaciones lineales", relatedTheory:[{label:"Transformaciones lineales",href:"/cursos/algebra-lineal#unidad-5-seccion-2"}],
    hints:[String.raw`Una transformación lineal es inyectiva si su núcleo contiene solo el vector cero.`,String.raw`Resuelve $x-y=0$.`,String.raw`Compara las imágenes de $(0,0)$ y $(1,1)$.`],
    solution:[{body:String.raw`$T(x,y)=0$ cuando $x=y$. Así $\ker T=\operatorname{span}\{(1,1)\}$ no es trivial. En particular, $T(0,0)=T(1,1)=(0,0)$ aunque los puntos son distintos.`}],finalAnswer:"No es inyectiva.",
  },
  "ed0b30db81e6": {
    title:"Un punto fijo usando continuidad",difficulty:"Intermedio",
    hints:[String.raw`Considera $g(t)=f(t)-t$.`,String.raw`Como $f$ toma valores en $[0,1]$, se cumple $g(0)\ge0$ y $g(1)\le0$.`,String.raw`Si ninguno de los extremos es cero, aplica el teorema del valor intermedio.`],
    solution:[{body:String.raw`La función $g$ es continua. Si $g(0)=0$ o $g(1)=0$, ese extremo es un punto fijo. En otro caso $g(0)>0>g(1)$, de modo que existe $t\in(0,1)$ con $g(t)=0$. Esto equivale a $f(t)=t$.`}],finalAnswer:String.raw`Existe $t\in[0,1]$ tal que $f(t)=t$.`,
  },
  "fa667c9f19bf": {
    title:"Trabajo de una fuerza constante",difficulty:"Inicial",
    hints:[String.raw`Parametriza el camino por $r(t)$, con extremos $P$ y $Q$.`,String.raw`El campo $F$ es constante, por lo que sale del producto con la integral.`,String.raw`Aplica $\int_a^b r'(t)\,dt=r(b)-r(a)$.`],
    solution:[{body:String.raw`Para una trayectoria suave por tramos de $P$ a $Q$, $W=\int_a^b F\cdot r'(t)\,dt=F\cdot(r(b)-r(a))=F\cdot(Q-P)$. Por tanto el trabajo solo depende de los extremos.`}],finalAnswer:String.raw`$W=F\cdot\overrightarrow{PQ}$.`,
  },
};
