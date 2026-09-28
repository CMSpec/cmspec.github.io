import type { Exercise, ExerciseDifficulty } from "./exercises";

const r = String.raw;
function guide(title: string, difficulty: ExerciseDifficulty, hints: string[], bodies: string[], finalAnswer: string): Partial<Exercise> {
  return { title, difficulty, hints, solution: bodies.map(body => ({body})), finalAnswer };
}
const equations = [
  r`$\cos x=\sin(2x)$ equivale a $\cos x(1-2\sin x)=0$. Por tanto $x=\frac\pi2+k\pi$, $x=\frac\pi6+2k\pi$ o $x=\frac{5\pi}6+2k\pi$.`,
  r`$\cos(2x)=\sin x+1$ se convierte en $1-2\sin^2x=\sin x+1$, es decir $\sin x(2\sin x+1)=0$. Así $x=k\pi$, $x=\frac{7\pi}6+2k\pi$ o $x=\frac{11\pi}6+2k\pi$.`,
  r`$\sqrt3\tan(x/2)=1$ da $x/2=\pi/6+k\pi$, luego $x=\pi/3+2k\pi$. Estos valores no anulan $\cos(x/2)$.`,
  r`$2\cos^2x+\sin x=1$ se transforma en $2\sin^2x-\sin x-1=0$, o $(2\sin x+1)(\sin x-1)=0$. Las soluciones son $x=\pi/2+2k\pi$, $x=7\pi/6+2k\pi$ o $x=11\pi/6+2k\pi$.`,
];
const eqHints = [r`Usa $\sin(2x)=2\sin x\cos x$ y $\cos(2x)=1-2\sin^2x$, cuando corresponda.`,r`Factoriza la ecuación; no dividas por un factor que podría ser cero.`,r`Encuentra las soluciones en una vuelta y añade la periodicidad; $k\in\mathbb Z$.`];
function equationGuide(indices: number[]) {
  return guide("Ecuaciones trigonométricas · ángulo doble y factorización", "Intermedio", eqHints, indices.map((i,j)=>`${j+1}. ${equations[i]}`), r`Las familias indicadas en cada inciso, con $k\in\mathbb Z$.`);
}
const identities = [
  r`Donde la expresión original está definida ($\sin\alpha\ne0$, $\cos\alpha\ne0$ y $1-2\cos^2\alpha\ne0$), $\tan\alpha-\cot\alpha=\frac{\sin^2\alpha-\cos^2\alpha}{\sin\alpha\cos\alpha}=\frac{1-2\cos^2\alpha}{\sin\alpha\cos\alpha}$. Al dividir por $1-2\cos^2\alpha$ queda $1/(\sin\alpha\cos\alpha)=\tan\alpha+\cot\alpha$.`,
  r`Para $\sin x\ne0$, $\cot x\cos x+\sin x=\frac{\cos^2x}{\sin x}+\sin x=\frac{\cos^2x+\sin^2x}{\sin x}=\frac1{\sin x}=\csc x$.`,
];
const identityHints = [r`Escribe tangente y cotangente como cocientes de seno y coseno.`,r`Lleva los términos a un denominador común y usa $\sin^2x+\cos^2x=1$.`,r`La igualdad debe demostrarse solo donde las expresiones originales estén definidas.`];
function antenna(d: number, a: number, b: number, noun = "antena") {
  const h=d*Math.tan(a*Math.PI/180), top=d*Math.tan(b*Math.PI/180);
  return guide(`Problema de alturas · ${noun} y dos ángulos de elevación`, "Intermedio", [r`Dibuja dos triángulos rectángulos con la misma base horizontal.`,r`Usa $\tan\theta=\text{altura}/\text{distancia horizontal}$.`,r`La altura del objeto superior es la diferencia entre las dos alturas totales.`], [
    r`El esquema tiene observador $O=(0,0)$, base $B=(`+d+r`,0)$, punto inferior $C=(`+d+r`,h)$ y extremo superior $D=(`+d+r`,H)$. Las visuales $OC$ y $OD$ forman los ángulos dados con $OB$.`,
    `$h=${d}\\tan(${a}^\\circ)\\approx ${h.toFixed(3)}$ m y $H=${d}\\tan(${b}^\\circ)\\approx ${top.toFixed(3)}$ m. La ${noun} mide $H-h\\approx ${(top-h).toFixed(3)}$ m. Se redondea al final.`
  ],`Altura inferior: $${h.toFixed(3)}$ m; longitud de la ${noun}: $${(top-h).toFixed(3)}$ m.`);
}
function statue(p: number,s: number) {
  const distance = p*Math.sqrt((p+s)/(s-p));
  const exact = p===2 && s===3 ? r`2\sqrt5` : String(distance);
  return guide("Problema de alturas · estatua y ángulo doble", "Desafío", [r`Llama $d>0$ a la distancia horizontal y $\theta$ al ángulo hacia los pies de la estatua.`,r`Plantea una ecuación para $\tan\theta$ y otra para $\tan(2\theta)$.`,r`Usa $\tan(2\theta)=2\tan\theta/(1-\tan^2\theta)$ y conserva solo distancias positivas.`],[
    `Si el pedestal mide $p=${p}$ y la estatua $s=${s}$, entonces $\\tan\\theta=p/d$ y $\\tan(2\\theta)=(p+s)/d$.`,
    r`Sustituyendo: $(p+s)/d=2(p/d)/(1-p^2/d^2)$, de donde $(s-p)d^2=(p+s)p^2$. Por tanto $d=p\sqrt{(p+s)/(s-p)}$.`,
    `Con los datos, $d=${exact}\\approx ${distance.toFixed(3)}$ m. Se cumple $d>p$, por lo que $0<\\theta<45^\\circ$ y $2\\theta<90^\\circ$, como exige la geometría.`
  ],`La distancia horizontal es $${exact}$ m.`);
}
function sinusoid(kind: "sin"|"cos", amplitude: number, frequency: number, phase: string, shift: string, vertical: number, xPoints: string[], yPoints:number[]) {
  return guide(`Función trigonométrica · gráfica de ${kind === "sin" ? "seno" : "coseno"} transformado`, "Inicial", [r`Compara con $A\sin(B(x-h))+D$ o $A\cos(B(x-h))+D$.`,r`La amplitud es $|A|$ y el período $2\pi/|B|$. El signo de $A$ refleja la gráfica respecto de su línea media.`,r`Marca cinco puntos separados por un cuarto de período y únelos con la forma suave del seno o coseno.`],[
    `La amplitud es $${amplitude}$, la línea media $y=${vertical}$, el período $T=2\\pi/${frequency}$ y el desplazamiento horizontal $h=${shift}$. El desplazamiento vertical es $${vertical}$. En efecto, $${frequency}x+${phase}=${frequency}(x-(${shift}))$.`,
    `Un período se representa con los puntos $${xPoints.map((x,i)=>`(${x},${yPoints[i]})`).join(',\\quad ')}$. La curva oscila entre $${vertical-amplitude}$ y $${vertical+amplitude}$ y se repite cada $T$.`
  ],`Amplitud $${amplitude}$; período $2\\pi/${frequency}$; desplazamientos horizontal $${shift}$ y vertical $${vertical}$.`);
}
export const trigonometryGuidance: Record<string,Partial<Exercise>> = {
  "6908b72e2228": equationGuide([0,3]),
  "edf5c4329f88": equationGuide([0,1,2]),
  "9f29ce699774": equationGuide([0,1,2,3]),
  "9460063d45f6": equationGuide([2,3]),
  "2cfa534c58ed": guide("Identidades trigonométricas · cocientes y reciprocidad","Intermedio",identityHints,identities,"Ambas igualdades se cumplen en sus respectivos dominios."),
  "757fc782b09d": guide("Identidades trigonométricas · cocientes y reciprocidad","Intermedio",identityHints,identities,"Ambas igualdades se cumplen en sus respectivos dominios."),
  "ea28df13e881": guide("Identidad trigonométrica · cotangente y cosecante","Inicial",identityHints,[identities[1]],r`La identidad es válida para $x\notin\pi\mathbb Z$.`),
  "f085b03e1361": guide("Identidad trigonométrica · secante al cuadrado","Inicial",[r`Usa $1+\tan^2x=\sec^2x$.`,r`Simplifica $\cos^2x\sec^2x$.`,r`Recuerda que $1/\cot x=\tan x$ donde la expresión original está definida.`],[r`Para $\sin x\ne0$ y $\cos x\ne0$, $\frac{\cos^2x(1+\tan^2x)}{\cot x}=\frac{\cos^2x\sec^2x}{\cot x}=\frac1{\cot x}=\tan x$.`],r`La identidad se cumple si $\sin x\cos x\ne0$.`),
  "e24393775350": guide("Ecuación trigonométrica · tangente al cuadrado","Inicial",[r`Sustituye $1-\cos^2x$ por $\sin^2x$.`,r`Obtendrás $\tan^2x=3$.`,r`Considera ambos signos de la tangente y su período $\pi$.`],[r`El dominio exige $\cos x\ne0$. La ecuación equivale a $\tan x=\pm\sqrt3$. Por tanto $x=\pi/3+k\pi$ o $x=-\pi/3+k\pi$, con $k\in\mathbb Z$; todos estos valores cumplen el dominio.`],r`$x=\pm\pi/3+k\pi$, $k\in\mathbb Z$.`),
  "53a07816e1c5": guide("Ecuación e identidad trigonométrica · coseno y secante","Intermedio",[r`En el primer inciso despeja $\cos^2x$.`,r`En el segundo usa denominador común.`,r`Usa $\sec^2x-\tan^2x=1$.`],[r`1. $\cos^2x=3/4$, luego $x=k\pi\pm\pi/6$, $k\in\mathbb Z$.`,r`2. La diferencia de fracciones es $\frac{-2\tan x}{\sec^2x-\tan^2x}=-2\tan x$. Es válida para $\cos x\ne0$; ninguno de los denominadores $\sec x\pm\tan x$ puede ser cero porque su producto es $1$.`],r`1. $x=k\pi\pm\pi/6$. 2. Identidad válida para $\cos x\ne0$.`),
  "d340435601f3": guide("Problema de alturas · barco que se aleja de un faro","Intermedio",[r`Supón que el barco se aleja en línea recta de la base del faro. Llama $d$ a la distancia horizontal inicial.`,r`La altura es la misma en ambos triángulos: $h=d\tan60^\circ=(d+100)\tan30^\circ$.`,r`Usa $\tan60^\circ=\sqrt3$ y $\tan30^\circ=1/\sqrt3$.`],[r`Esquema: base $B=(0,0)$, cima $F=(0,h)$, posiciones del barco $P=(d,0)$ y $Q=(d+100,0)$. Las visuales $PF$ y $QF$ forman $60^\circ$ y $30^\circ$ con la horizontal.`,r`Igualando las alturas: $d\sqrt3=(d+100)/\sqrt3$, así que $3d=d+100$ y $d=50$. Entonces $h=50\sqrt3\approx86.603$ m.`],r`La altura es $86.603$ m, suponiendo alejamiento horizontal directamente desde el faro.`),
  "9459f43407c6": guide("Problema de triángulos · distancia mediante la ley de senos","Intermedio",[r`Suma los ángulos interiores para obtener el que falta.`,r`El lado $AB$ está frente al ángulo $C$.`,r`Usa $AC/\sin B=AB/\sin C$.`],[r`$B=180^\circ-30^\circ-45^\circ=105^\circ$. Por la ley de senos, $AC=50\sin105^\circ/\sin45^\circ=25(1+\sqrt3)$ m.`],r`$AC=25(1+\sqrt3)\approx68.301$ m.`),
  "3ddd7750238d": guide("Problema de triángulos · ley de senos con ángulos de 60° y 45°","Intermedio",[r`Calcula $B=180^\circ-A-C$.`,r`Empareja $AB$ con $\sin C$.`,r`Despeja $AC$ de la ley de senos.`],[r`$B=75^\circ$. Entonces $AC=100\sin75^\circ/\sin45^\circ=50(1+\sqrt3)$ m.`],r`$AC=50(1+\sqrt3)\approx136.603$ m.`),
  "599b6399dd72": statue(2,3),
  "44994f6601d6": statue(4,5),
  "4c76b4260565": antenna(150,30,31,"árbol"),
  "46c41badeddd": antenna(70,32,33),
  "8e1b70d39fd9": antenna(100,40,42),
  "a350e20b75ed": antenna(40,35,38),
  "ac007f1998c0": guide("Cálculo trigonométrico · ángulos complementarios","Intermedio",[r`Como $\alpha$ es agudo, $\sin\alpha=4/5$.`,r`Usa $\beta=\pi/2-\alpha$, por lo que $\cos(2\beta)=-\cos(2\alpha)$.`,r`Calcula por separado el numerador y el denominador.`],[r`$\sin(2\alpha)=24/25$, $\cos(2\alpha)=9/25-16/25=-7/25$, luego $\cos(2\beta)=7/25$. Además $\tan\beta=\cot\alpha=3/4$. La expresión es $(24/25-21/25)/(3/2)=2/25$.`],r`$2/25$.`),
  "1ae2dc558d55": guide("Cálculo trigonométrico · signos en el tercer cuadrante","Intermedio",[r`En el tercer cuadrante seno y coseno son negativos.`,r`Usa $\cot\theta=\cos\theta/\sin\theta=1/5$ y la identidad pitagórica.`,r`Sustituye $\sin^2(3\pi/4)=1/2$.`],[r`$\cos\theta=-1/\sqrt{26}$ y $\sin\theta=-5/\sqrt{26}$. Por tanto $\frac{1/2+1/\sqrt{26}}{-15/\sqrt{26}}=-\frac{\sqrt{26}+2}{30}$.`],r`$-(\sqrt{26}+2)/30$.`),
  "3aac4664bc51": guide("Cálculo trigonométrico · signos en el segundo cuadrante","Intermedio",[r`En el segundo cuadrante el coseno es negativo.`,r`Calcula $\cos\theta$ con la identidad pitagórica y después $\tan\theta$.`,r`Usa $\sin^2(-\pi/3)=3/4$.`],[r`$\cos\theta=-\sqrt{1-4/49}=-3\sqrt5/7$ y $\tan\theta=-2/(3\sqrt5)$. La expresión vale $(3/4-6\sqrt5/7)(-3\sqrt5/2)=45/7-9\sqrt5/8$.`],r`$45/7-9\sqrt5/8$.`),
  "f5cea27080f4": sinusoid("sin",1,3,r`3\pi/2`,r`-\pi/2`,-1,[r`-\pi/2`,r`-\pi/3`,r`-\pi/6`,`0`,r`\pi/6`],[-1,-2,-1,0,-1]),
  "2417059a22d4": sinusoid("sin",3,2,r`2\pi/3`,r`-\pi/3`,4,[r`-\pi/3`,r`-\pi/12`,r`\pi/6`,r`5\pi/12`,r`2\pi/3`],[4,1,4,7,4]),
  "6251b77c9ea7": sinusoid("cos",2,3,r`3\pi/4`,r`-\pi/4`,-4,[r`-\pi/4`,r`-\pi/12`,r`\pi/12`,r`\pi/4`,r`5\pi/12`],[-6,-4,-2,-4,-6]),
  "b69651f0b88f": guide("Problemas de alturas · faro, cometa, antena y estatua","Desafío",[r`Haz un triángulo por cada visual. Distingue distancia horizontal e hipotenusa.`,r`Para dos posiciones del observador o dos alturas, iguala la altura común o resta las alturas calculadas.`,r`En el último inciso usa la fórmula de la tangente del ángulo doble.`],[
    r`1. Distancia horizontal a la base del faro: $d=40/\tan55^\circ\approx28.008$ m. Si se pide distancia visual al foco del faro, es $40/\sin55^\circ\approx48.831$ m.`,
    r`2. El hilo es la hipotenusa: $h=100\sin60^\circ=50\sqrt3\approx86.603$ m.`,
    r`3. Edificio: $40\tan35^\circ\approx28.008$ m. Antena: $40(\tan38^\circ-\tan35^\circ)\approx3.243$ m.`,
    r`4. Suponiendo alejamiento directamente desde la base de la montaña, $d\tan60^\circ=(d+100)\tan30^\circ$ da $d=50$ y $h=50\sqrt3\approx86.603$ m.`,
    r`5. Con $\tan\theta=4/d$ y $\tan2\theta=9/d$, la identidad de ángulo doble da $9(d^2-16)=8d^2$, de donde $d=12$ m.`
  ],r`1. $28.008$ m horizontales; 2. $86.603$ m; 3. $28.008$ m y $3.243$ m; 4. $86.603$ m; 5. $12$ m.`),
  "c0ea2e56dd22": guide("Problemas de alturas · sombra en una ladera y ángulo doble","Desafío",[r`Para el árbol, distingue la longitud de la sombra sobre la ladera de su proyección horizontal.`,r`El sentido de la pendiente respecto a la sombra importa: el enunciado no lo especifica.`,r`Para Romeo usa $\tan\theta=2/d$ y $\tan2\theta=5/d$.`],[
    r`1. Suponiendo un árbol vertical, la sombra de longitud $10$ tiene proyección horizontal $10\cos30^\circ$ y desnivel de magnitud $10\sin30^\circ$. Si la sombra cae cuesta abajo, $h=10\cos30^\circ\tan40^\circ-10\sin30^\circ\approx2.267$ m. Si cae cuesta arriba, $h=10\cos30^\circ\tan40^\circ+10\sin30^\circ\approx12.267$ m. Sin indicar la orientación no hay una única altura.`,
    r`2. Con $d>0$, $5/d=2(2/d)/(1-4/d^2)$, así $5(d^2-4)=4d^2$, $d^2=20$ y $d=2\sqrt5\approx4.472$ m.`
  ],r`Árbol: $2.267$ m o $12.267$ m, según la orientación de la sombra, suponiendo tronco vertical. Romeo: $2\sqrt5$ m.`),
};
