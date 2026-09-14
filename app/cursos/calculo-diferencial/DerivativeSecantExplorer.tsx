"use client";

import { useState } from "react";

const sx = (x: number) => 220 + x * 72;
const sy = (y: number) => 205 - y * 29;

export default function DerivativeSecantExplorer() {
  const [h, setH] = useState(1.6);
  const a = 1;
  const fa = a * a;
  const fb = (a + h) ** 2;
  const slope = (fb - fa) / h;
  const line = (x: number) => fa + slope * (x - a);
  const curve = Array.from({ length: 81 }, (_, index) => {
    const x = -2.5 + index * 0.0625;
    return `${index ? "L" : "M"}${sx(x)},${sy(x * x)}`;
  }).join(" ");

  return (
    <figure className="derivative-secant-lab">
      <header><div><span>EXPLORACIÓN VISUAL</span><h5>De la secante a la tangente</h5></div><strong>h = {h.toFixed(2)}</strong></header>
      <svg viewBox="0 0 440 250" role="img" aria-label="Parábola con una recta secante que se aproxima a la tangente">
        <g className="secant-grid"><line x1="20" y1={sy(0)} x2="420" y2={sy(0)} /><line x1={sx(0)} y1="18" x2={sx(0)} y2="232" /></g>
        <path className="secant-curve" d={curve} />
        <line className="secant-line" x1={sx(-2.2)} y1={sy(line(-2.2))} x2={sx(2.7)} y2={sy(line(2.7))} />
        <circle className="secant-point fixed" cx={sx(a)} cy={sy(fa)} r="6" />
        <circle className="secant-point moving" cx={sx(a + h)} cy={sy(fb)} r="6" />
        <text x={sx(a) - 22} y={sy(fa) + 25}>a</text><text x={sx(a + h) - 8} y={sy(fb) - 12}>a+h</text>
      </svg>
      <label><span>Acerca el segundo punto <strong>pendiente = {slope.toFixed(2)}</strong></span><input type="range" min="0.08" max="2" step="0.04" value={h} onChange={(event) => setH(Number(event.target.value))} /></label>
      <p>Para f(x)=x² y a=1, la pendiente secante es 2+h. Cuando h se acerca a 0, aparece la pendiente tangente f′(1)=2.</p>
    </figure>
  );
}
