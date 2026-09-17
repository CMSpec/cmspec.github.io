type Point = [number, number, string];

function Plane({ title, points, radius, polygon, guides, scale = 30 }: { title: string; points: Point[]; radius?: number; polygon?: boolean; guides?: boolean; scale?: number }) {
  const x = (a: number) => 190 + a * scale;
  const y = (b: number) => 190 - b * scale;
  return <svg viewBox="0 0 400 390" role="img" aria-label={title}>
    <title>{title}</title>
    <defs><marker id={`arrow-${title.length}`} markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="context-stroke"/></marker></defs>
    <path d="M20 190H380 M190 365V20" stroke="currentColor" opacity=".5" fill="none"/>
    <text x="357" y="212">Re</text><text x="200" y="28">Im</text><text x="173" y="210">0</text>
    {radius && <circle cx="190" cy="190" r={radius * scale} fill="none" stroke="currentColor" opacity=".3"/>}
    {polygon && <polygon points={points.map(([a,b]) => `${x(a)},${y(b)}`).join(" ")} fill="#efb8cf" fillOpacity=".15" stroke="#ad527b" strokeWidth="2"/>}
    {points.map(([a,b,label],i) => <g key={label}>
      {guides && <path d={`M${x(a)} 190V${y(b)}H190`} stroke="#8b8799" strokeDasharray="4 4" fill="none"/>}
      <path d={`M190 190L${x(a)} ${y(b)}`} fill="none" stroke={i%2 ? "#ad527b" : "#557c73"} strokeWidth="2" markerEnd={`url(#arrow-${title.length})`}/>
      <circle cx={x(a)} cy={y(b)} r="3" fill="currentColor"/>
      <text x={x(a)+(a<0 ? -8 : 8)} y={y(b)+(b<0 ? 22 : -10)} textAnchor={a<0 ? "end" : "start"}>{label}</text>
    </g>)}
  </svg>;
}

export function ComplexDiagrams({ variant }: { variant: "complex-plane" | "complex-geometry" | "complex-roots" }) {
  if (variant === "complex-plane") return <figure className="intro-complex-figure"><Plane title="Plano de Argand: z=a+bi y sus proyecciones" points={[[3,3,"z = a + bi"],[3,0,"a"],[0,3,"b"]]} guides/><figcaption>La proyección horizontal es a, la vertical es b y la longitud de la flecha es |z|.</figcaption></figure>;
  if (variant === "complex-roots") return <figure className="intro-complex-figure"><Plane title="Las tres raíces cúbicas de i forman un triángulo equilátero" points={[[Math.sqrt(3)/2,.5,"w₀"],[-Math.sqrt(3)/2,.5,"w₁"],[0,-1,"w₂ = −i"]]} scale={130} radius={1} polygon/><figcaption>w₀ = √3/2 + i/2; w₁ = −√3/2 + i/2; w₂ = −i. Todas están a distancia 1 del origen y separadas por 120°.</figcaption></figure>;
  return <div className="intro-complex-grid">
    <figure className="intro-complex-figure"><Plane title="Escalares, opuesto y conjugado" points={[[2,2,"z"],[4,4,"2z"],[1,1,"z/2"],[-2,-2,"−z"],[2,-2,"conjugado"]]}/><figcaption>Representación ilustrativa: escalar conserva la dirección de la recta; conjugar refleja en el eje real.</figcaption></figure>
    <figure className="intro-complex-figure"><svg viewBox="0 0 400 390" role="img" aria-label="Suma de vectores mediante el paralelogramo"><title>La diagonal representa z+w</title><path d="M30 310H370 M60 350V30" stroke="currentColor" opacity=".5"/><path d="M60 310L220 270L300 100L140 140Z" stroke="#ad527b" strokeWidth="2" fill="#efb8cf" fillOpacity=".15"/><path d="M60 310L300 100" stroke="#557c73" strokeWidth="3"/><text x="224" y="292">z</text><text x="114" y="127">w</text><text x="302" y="90">z+w</text><text x="34" y="332">0</text><text x="345" y="332">Re</text><text x="70" y="40">Im</text></svg><figcaption>Trasladar w al extremo de z completa el paralelogramo. Su diagonal es la suma.</figcaption></figure>
    <figure className="intro-complex-figure"><Plane title="Cuatro puntos en el plano complejo" points={[[-2,3,"z₁"],[4,4,"z₂"],[2,-1,"z₃"],[2,1,"conjugado z₃"]]} guides/><figcaption>z₁ = −2+3i; z₂ = 4+4i; z₃ = 2−i; conjugado de z₃ = 2+i.</figcaption></figure>
  </div>;
}
