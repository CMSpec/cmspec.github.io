import type { ReactNode } from "react";
import MathText from "./IntroMathText";

type Point = [number, number];
type Label = { at: Point; text: string; dx?: number; dy?: number; anchor?: "start" | "middle" | "end" };
type Curve = { points: Point[]; color?: string; dashed?: boolean; arrow?: boolean };
type Diagram = { id: string; title: string; caption: string; bounds: [number, number, number, number]; curves?: Curve[]; labels?: Label[]; points?: { at: Point; open?: boolean }[]; axes?: boolean; equal?: boolean; custom?: "venn" | "induction" };
const t = String.raw;
const teal = "#256b70", orange = "#a95030";
const sample = (start: number, end: number, f: (x: number) => Point): Point[] => Array.from({ length: 121 }, (_, i) => f(start + (end - start) * i / 120));
const circle = (x: number, y: number, a: number, b = a) => sample(0, 2 * Math.PI, angle => [x + a * Math.cos(angle), y + b * Math.sin(angle)]);
const label = (x: number, y: number, text: string, dx = 0, dy = -12): Label => ({ at: [x, y], text, dx, dy });
const line = (points: Point[], options: Omit<Curve, "points"> = {}): Curve => ({ points, ...options });

export const introDiagramSections: Record<string, Diagram[]> = {
  "ecuaciones-2": [{ id: "absolute-distance", title: "Dos puntos a distancia cuatro de tres", bounds: [-3, 9, -1.5, 1.8],
    caption: t`$|x-3|=4$: los dos puntos a distancia $4$ de $3$ son $-1$ y $7$.`,
    curves: [line([[-3, 0], [9, 0]], { color: "#777" }), line([[-1, .6], [3, .6]], { arrow: true }), line([[3, .6], [7, .6]], { arrow: true })],
    points: [-1, 3, 7].map(x => ({ at: [x, 0] })), labels: [label(-1, 0, "−1", 0, 24), label(3, 0, "3", 0, 24), label(7, 0, "7", 0, 24), label(1, .6, "4"), label(5, .6, "4")] }],
  "inecuaciones-3": [{ id: "repeated-root-sign", title: "El cero de un factor cuadrado también se excluye", bounds: [-1, 4, -1.5, 1.8],
    caption: t`En $x(x-1)^2(x-3)<0$, el factor cuadrado no cambia el signo, pero $x=1$ sigue excluido. Solución: $(0,1)\cup(1,3)$.`,
    curves: [line([[-1, 0], [4, 0]], { color: "#777" }), line([[0, 0], [3, 0]])], points: [0, 1, 3].map(x => ({ at: [x, 0], open: true })),
    labels: [label(0, 0, "0", 0, 24), label(1, 0, "1", 0, 24), label(3, 0, "3", 0, 24), ...[-.5, .5, 2, 3.5].map((x, i) => label(x, .3, i === 0 || i === 3 ? "+" : "−"))] }],
  "funciones-1": [{ id: "vertical-parabola", title: "Prueba de la recta vertical en una parábola", bounds: [-2.2, 2.2, -.7, 4], axes: true,
    caption: t`En $y=x^2$, cada recta vertical corta la gráfica a lo sumo una vez.`,
    curves: [line(sample(-1.9, 1.9, x => [x, x*x])), line([[1, -.5], [1, 3.7]], { dashed: true, color: orange })], points: [{ at: [1, 1] }], labels: [label(1, 3.3, "x = 1", 42)] },
    { id: "vertical-circle", title: "La circunferencia no es una función de x", bounds: [-2.1, 2.1, -2.1, 2.1], axes: true, equal: true,
      caption: t`Una circunferencia completa no es una gráfica $y=f(x)$: para $x=3/4$ hay dos valores de $y$.`,
      curves: [line(circle(0, 0, 1.5)), line([[.75, -1.8], [.75, 1.8]], { color: orange, dashed: true })], points: [{ at: [.75, Math.sqrt(27)/4] }, { at: [.75, -Math.sqrt(27)/4] }] }],
  "funciones-2": [{ id: "piecewise-function", title: "Puntos abiertos y cerrados en una función por tramos", bounds: [-4.8, 4.8, -4.8, 7.2], axes: true,
    caption: t`Ejemplo: $f(x)=x$ si $x<-2$; $f(x)=4-x^2$ si $-2\le x\le2$; $f(x)=x+2$ si $x>2$. Los puntos cerrados pertenecen a la gráfica; los abiertos, no.`,
    curves: [line([[-4, -4], [-2, -2]]), line(sample(-2, 2, x => [x, 4-x*x])), line([[2, 4], [4, 6]])], points: [{ at: [-2, 0] }, { at: [2, 0] }, { at: [-2, -2], open: true }, { at: [2, 4], open: true }], labels: [label(-2, 0, "−2", -17, 22), label(2, 0, "2", 17, 22)] }],
  "funciones-3": [{ id: "inverse-reflection", title: "Una función y su inversa reflejadas en y igual a x", bounds: [-3, 5, -3, 5], axes: true, equal: true,
    caption: t`La gráfica de $f(x)=(x-3)/2$ (verde) y la de $f^{-1}(x)=2x+3$ (naranja) son reflejos respecto de $y=x$.`,
    curves: [line(sample(-3, 5, x => [x, (x-3)/2])), line(sample(-3, 1, x => [x, 2*x+3]), { color: orange }), line([[-3, -3], [5, 5]], { color: "#777", dashed: true })], labels: [label(3.8, 3.8, "y = x", 24)] }],
  "trigonometria-1": [{ id: "right-triangle", title: "Catetos e hipotenusa de un triángulo rectángulo", bounds: [-1.2, 5.5, -1, 4.2], equal: true,
    caption: t`Respecto de $\theta$, el cateto opuesto mide $3$ y el adyacente $4$: $\sin\theta=3/5$, $\cos\theta=4/5$ y $\tan\theta=3/4$.`,
    curves: [line([[0, 0], [4, 0], [4, 3], [0, 0]]), line([[3.7, 0], [3.7, .3], [4, .3]], { color: "#777" })], labels: [label(2, 0, "adyacente: 4", 0, 25), label(4, 1.5, "opuesto: 3", 70, 0), label(2, 1.7, "hipotenusa: 5", -25, -30), label(.9, .13, "θ", 0, -1)] },
    { id: "lighthouse-distance", title: "Faro y dos observadores al mismo lado", bounds: [-1, 5.2, -1.6, 5.2], equal: true,
      caption: t`Para un faro de altura $90$ y ángulos de elevación $60^\circ$ y $45^\circ$, las distancias horizontales son $30\sqrt3$ y $90$. La separación es $90-30\sqrt3$.`,
      curves: [line([[0, 0], [0, 4.5], [4.5, 0], [0, 0]]), line([[0, 4.5], [4.5/Math.sqrt(3), 0]]), line([[4.5/Math.sqrt(3), -.9], [4.5, -.9]], { color: orange })], labels: [label(0, 2.2, "90", -25, 0), label(2.6, 0, "60°", 0, 23), label(4.5, 0, "45°", 0, 23), label(3.55, -.9, "separación", 0, 24)] }],
  "trigonometria-3": [{ id: "transformed-sine", title: "Amplitud, período y eje medio de una sinusoide", bounds: [-.15, 5, -3, 5], axes: true,
    caption: t`$g(x)=-3\sin(2x-\pi/2)+1$: amplitud $3$, período $\pi$ y eje medio $y=1$. Los cinco puntos marcados delimitan un período, desde $\pi/4$ hasta $5\pi/4$.`,
    curves: [line(sample(0, 4.8, x => [x, -3*Math.sin(2*x-Math.PI/2)+1])), line([[0, 1], [4.8, 1]], { color: "#777", dashed: true })], points: [1, 2, 3, 4, 5].map(k => ({ at: [k*Math.PI/4, -3*Math.sin(k*Math.PI/2-Math.PI/2)+1] })), labels: [label(Math.PI/2, 0, "π/2", 0, 24), label(Math.PI, 0, "π", 0, 24), label(3*Math.PI/2, 0, "3π/2", 0, 24), label(0, -2, "−2", -22, 0), label(0, 4, "4", -17, 5)] }],
  "vectores-1": [{ id: "translated-vector", title: "El mismo vector desde distintos puntos", bounds: [-4, 6.5, -1, 11.5], axes: true, equal: true,
    caption: t`El vector $(3,5)$ puede comenzar en $(0,0)$, $(2,3)$ o $(-3,5)$: termina en $(3,5)$, $(5,8)$ o $(0,10)$, respectivamente. En los tres casos, final menos inicial es $(3,5)$.`,
    curves: [[0, 0], [2, 3], [-3, 5]].map(([x, y]) => line([[x, y], [x+3, y+5]], { arrow: true })), labels: [label(3, 5, "(3,5)", 33), label(5, 8, "(5,8)", 27), label(0, 10, "(0,10)", 35)] }],
  "vectores-2": [{ id: "vector-sum", title: "La suma de vectores como diagonal", bounds: [-.8, 5.3, -.8, 4.1], equal: true,
    caption: t`Traslada $v$ al extremo de $u$ sin cambiarlo. La diagonal desde el origen representa $u+v$.`,
    curves: [line([[3, 1], [4, 3], [1, 2]], { dashed: true, color: "#777" }), line([[0, 0], [3, 1]], { arrow: true }), line([[0, 0], [1, 2]], { arrow: true, color: orange }), line([[0, 0], [4, 3]], { arrow: true, color: "#333" })], labels: [label(3, 1, "u", 16, 12), label(1, 2, "v", -16), label(4, 3, "u + v", 24), label(0, 0, "O", -12, 20)] }],
  "conjuntos-2": [{ id: "venn-regions", title: "Las cuatro regiones de dos conjuntos", bounds: [0, 1, 0, 1], custom: "venn", caption: t`Las regiones $A\setminus B$, $A\cap B$, $B\setminus A$ y $(A\cup B)^c$ son disjuntas y juntas forman el universo $U$.` }],
  "induccion-sumatorias-1": [{ id: "induction-chain", title: "La base inicia la cadena y el paso inductivo la continúa", bounds: [0, 1, 0, 1], custom: "induction", caption: t`La base establece $P(1)$; el paso demuestra $P(k)\Rightarrow P(k+1)$ para todo $k\ge1$. El tramo punteado representa los casos intermedios.` }],
  "complejos-1": [{ id: "no-real-roots", title: "Una cuadrática sin raíces reales", bounds: [-2.4, 2.4, -.7, 5.5], axes: true,
    caption: t`La gráfica de $y=x^2+1$ no corta el eje horizontal: $x^2+1=0$ no tiene soluciones reales.`, curves: [line(sample(-2, 2, x => [x, x*x+1]))], labels: [label(0, 1, "1", -20, 5)] }],
  "complejos-8": [{ id: "complex-argument", title: "El argumento de un complejo del segundo cuadrante", bounds: [-4.2, 1.6, -.8, 3], axes: true, equal: true,
    caption: t`$-3+\sqrt3i$ está en el segundo cuadrante. Su argumento en $[0,2\pi)$ es $5\pi/6$, no el valor negativo que entrega directamente $\arctan(-\sqrt3/3)$.`,
    curves: [line([[0, 0], [-3, Math.sqrt(3)]], { arrow: true }), line([[-3, 0], [-3, Math.sqrt(3)], [0, Math.sqrt(3)]], { dashed: true, color: "#777" }), line(sample(0, 5*Math.PI/6, x => [Math.cos(x), Math.sin(x)]), { arrow: true, color: orange })], labels: [label(-3, Math.sqrt(3), "−3 + √3 i"), label(.2, 1.1, "5π/6"), label(1.5, 0, "Re", 5, 24), label(0, 2.6, "Im", 20)] }],
  "geometria-analitica-1": [{ id: "distance-midpoint", title: "Distancia y punto medio mediante coordenadas", bounds: [-.7, 5.3, -.7, 4], axes: true, equal: true,
    caption: t`Las diferencias $x_2-x_1$ e $y_2-y_1$ forman los catetos; $M$ promedia las coordenadas de $P$ y $Q$. Pitágoras da la distancia entre los puntos.`,
    curves: [line([[1, 1], [4, 3]]), line([[1, 1], [4, 1], [4, 3]], { dashed: true, color: "#777" })], points: [{ at: [2.5, 2] }], labels: [label(1, 1, "P", -15, 0), label(4, 3, "Q", 16), label(2.5, 2, "M"), label(2.5, 1, "x₂ − x₁", 0, 25), label(4, 2, "y₂ − y₁", 58, 0)] }],
  "geometria-analitica-4": [{ id: "circle-radius", title: "Radio constante de una circunferencia", bounds: [-1, 5.6, -1, 4], axes: true, equal: true,
    caption: t`Una circunferencia reúne los puntos $P=(x,y)$ cuya distancia al centro $C=(h,k)$ es el radio $r$.`,
    curves: [line(circle(2, 1.5, 1.5)), line([[2, 1.5], [2+1.5/Math.sqrt(2), 1.5+1.5/Math.sqrt(2)]], { arrow: true, color: orange })], points: [{ at: [2, 1.5] }], labels: [label(2, 1.5, "C = (h,k)", 0, 25), label(3.1, 2.6, "P = (x,y)", 42), label(2.4, 2.1, "r", -14)] }],
  "geometria-analitica-5": [{ id: "parabola-focus", title: "Parábola definida por foco y directriz", bounds: [-3.7, 3.8, -1.8, 3.7], axes: true, equal: true,
    caption: t`Para $x^2=4py$ con $p>0$, el foco es $(0,p)$ y la directriz es $y=-p$. Los segmentos punteados desde $P$ al foco y a la directriz tienen igual longitud.`,
    curves: [line(sample(-3.5, 3.5, x => [x, x*x/4])), line([[-3.5, -1], [3.5, -1]], { color: orange }), line([[0, 1], [2, 1], [2, -1]], { dashed: true, color: "#777" })], points: [{ at: [0, 1] }, { at: [2, 1] }], labels: [label(0, 1, "F = (0,p)", -64, 0), label(2, 1, "P", 17), label(0, 0, "V", -18, 23), label(2.6, -1, "y = −p", 0, 26)] }],
  "geometria-analitica-6": [{ id: "ellipse-foci", title: "La suma de las distancias a los focos de una elipse", bounds: [-4, 4, -2.8, 2.8], axes: true, equal: true,
    caption: t`En una elipse, $PF_1+PF_2=2a$. Si $a$ es el semieje mayor, $c^2=a^2-b^2$.`,
    curves: [line(circle(0, 0, 3, 2)), line([[-Math.sqrt(5), 0], [1.5, Math.sqrt(3)], [Math.sqrt(5), 0]], { dashed: true, color: "#777" })], points: [{ at: [-Math.sqrt(5), 0] }, { at: [Math.sqrt(5), 0] }], labels: [label(-Math.sqrt(5), 0, "F₁", 0, 24), label(Math.sqrt(5), 0, "F₂", 0, 24), label(1.5, Math.sqrt(3), "P"), label(3, 0, "a", 0, 24), label(0, 2, "b", -18, 3)] }],
  "geometria-analitica-7": [{ id: "hyperbola-asymptotes", title: "Hipérbola horizontal y asíntotas", bounds: [-4.7, 4.7, -4.7, 4.7], axes: true, equal: true,
    caption: t`Para $x^2/4-y^2/9=1$, los vértices son $(\pm2,0)$, los focos $(\pm\sqrt{13},0)$ y las asíntotas $y=\pm3x/2$.`,
    curves: [line(sample(-4, 4, y => [2*Math.sqrt(1+y*y/9), y])), line(sample(-4, 4, y => [-2*Math.sqrt(1+y*y/9), y])), line([[-3, -4.5], [3, 4.5]], { dashed: true, color: "#777" }), line([[-3, 4.5], [3, -4.5]], { dashed: true, color: "#777" })], points: [{ at: [-Math.sqrt(13), 0] }, { at: [Math.sqrt(13), 0] }], labels: [label(-2, 0, "−2", 0, 23), label(2, 0, "2", 0, 23), label(-Math.sqrt(13), 0, "F₁"), label(Math.sqrt(13), 0, "F₂")] }],
};

function SpecialDrawing({ diagram }: { diagram: Diagram }) {
  if (diagram.custom === "venn") return <>
    <rect x="45" y="25" width="470" height="265" fill="none" stroke="currentColor"/>
    <circle cx="225" cy="150" r="95" fill="#d4e9e4"/><circle cx="335" cy="150" r="95" fill="#f3ddd3"/>
    <defs><clipPath id="intro-venn-left"><circle cx="225" cy="150" r="95"/></clipPath></defs>
    <circle cx="335" cy="150" r="95" fill="#dbc5df" clipPath="url(#intro-venn-left)"/>
    <circle cx="225" cy="150" r="95" fill="none" stroke="currentColor"/><circle cx="335" cy="150" r="95" fill="none" stroke="currentColor"/>
    <text x="190" y="155" textAnchor="middle">A ∖ B</text><text x="280" y="155" textAnchor="middle">A ∩ B</text><text x="370" y="155" textAnchor="middle">B ∖ A</text>
    <text x="495" y="50">U</text><text x="280" y="275" textAnchor="middle">(A ∪ B)ᶜ</text>
  </>;
  return <>
    {["P(1)", "P(2)", "P(3)", "P(k)", "P(k+1)"].map((text, i) => <g key={text}>
      <rect x={20+i*107} y="100" width={i === 4 ? 92 : 75} height="60" rx="8" fill="#e2efeb" stroke={teal}/>
      <text x={20+i*107+(i === 4 ? 46 : 37.5)} y="136" textAnchor="middle">{text}</text>
      {i<4 && <path d={`M${95+i*107} 130H${122+i*107}`} fill="none" stroke={teal} strokeWidth="2" strokeDasharray={i===2 ? "4 4" : undefined} markerEnd={`url(#${diagram.id}-arrow)`}/>}
    </g>)}
    <text x="57" y="205" textAnchor="middle">base</text><text x="440" y="205" textAnchor="middle">paso inductivo</text>
  </>;
}

function Drawing({ diagram }: { diagram: Diagram }) {
  const [minX, maxX, minY, maxY] = diagram.bounds;
  let sx = 440/(maxX-minX), sy = 260/(maxY-minY);
  if (diagram.equal) sx = sy = Math.min(sx, sy);
  const x = (value: number) => 280 + (value-(minX+maxX)/2)*sx;
  const y = (value: number) => 160 - (value-(minY+maxY)/2)*sy;
  const path = (points: Point[]) => points.map(([a,b],i) => `${i ? "L" : "M"}${x(a).toFixed(2)} ${y(b).toFixed(2)}`).join(" ");
  const id = diagram.id;
  let content: ReactNode;
  if (diagram.custom) content = <SpecialDrawing diagram={diagram}/>;
  else content = <>
    {diagram.axes && <path d={path([[minX, 0], [maxX, 0]])+" "+path([[0, minY], [0, maxY]])} fill="none" stroke="currentColor" opacity=".45"/>}
    {diagram.curves?.map((curve, i) => <path key={i} d={path(curve.points)} fill="none" stroke={curve.color ?? teal} strokeWidth="2.5" strokeDasharray={curve.dashed ? "6 5" : undefined} markerEnd={curve.arrow ? `url(#${id}-arrow)` : undefined}/>)}
    {diagram.points?.map((p, i) => <circle key={i} cx={x(p.at[0])} cy={y(p.at[1])} r="4.5" fill={p.open ? "white" : teal} stroke={teal} strokeWidth="2"/>)}
    {diagram.labels?.map((l, i) => <text key={i} x={x(l.at[0])+(l.dx ?? 0)} y={y(l.at[1])+(l.dy ?? -12)} textAnchor={l.anchor ?? "middle"}>{l.text}</text>)}
  </>;
  return <figure className="intro-supplement-diagram" data-diagram={id}>
    <svg viewBox="0 0 560 330" role="img" aria-labelledby={`${id}-title ${id}-caption`}>
      <title id={`${id}-title`}>{diagram.title}</title>
      <defs><marker id={`${id}-arrow`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 1L7 4L0 7" fill="none" stroke="context-stroke" strokeWidth="1.5"/></marker></defs>
      {content}
    </svg>
    <figcaption id={`${id}-caption`}><MathText text={diagram.caption}/></figcaption>
  </figure>;
}

export default function IntroSupplementDiagrams({ section }: { section: string }) {
  return <>{introDiagramSections[section]?.map(diagram => <Drawing key={diagram.id} diagram={diagram}/>)}</>;
}
