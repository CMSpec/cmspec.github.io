"use client";

import { useState } from "react";

const WIDTH = 760;
const HEIGHT = 410;

function mapPoint(u: number, v: number, amount: number) {
  const x = u + amount * (0.38 * u * v + 0.18 * v * v);
  const y = v + amount * (0.24 * u * u - 0.12 * u * v);
  return { x, y };
}

function panelPoint(x: number, y: number, side: "left" | "right") {
  const cx = side === "left" ? 190 : 570;
  return { x: cx + x * 70, y: 215 - y * 70 };
}

function linePath(constant: number, horizontal: boolean, amount: number, side: "left" | "right") {
  return Array.from({ length: 41 }, (_, index) => {
    const varying = -1.65 + index * 3.3 / 40;
    const source = horizontal ? { u: varying, v: constant } : { u: constant, v: varying };
    const mapped = side === "left" ? { x: source.u, y: source.v } : mapPoint(source.u, source.v, amount);
    const point = panelPoint(mapped.x, mapped.y, side);
    return `${index ? "L" : "M"}${point.x.toFixed(2)},${point.y.toFixed(2)}`;
  }).join(" ");
}

export default function JacobianChangeExplorer() {
  const [amount, setAmount] = useState(0.72);
  const [u, setU] = useState(0.45);
  const [v, setV] = useState(0.25);
  const source = panelPoint(u, v, "left");
  const mappedValue = mapPoint(u, v, amount);
  const target = panelPoint(mappedValue.x, mappedValue.y, "right");
  const duX = 1 + amount * 0.38 * v;
  const duY = amount * (0.48 * u - 0.12 * v);
  const dvX = amount * (0.38 * u + 0.36 * v);
  const dvY = 1 - amount * 0.12 * u;
  const jacobian = duX * dvY - dvX * duY;
  const gridValues = [-1.5, -1, -.5, 0, .5, 1, 1.5];

  return (
    <figure className="vector-concept-explorer jacobian-explorer" id="cambio-variable-jacobiano-interactivo">
      <figcaption>
        <div><span>EXPLORACIÓN · CAMBIO DE VARIABLE</span><h5>Una cuadrícula que cambia de forma y de área</h5><p>El mapa T(u,v) curva la región original. Cerca del punto marcado, el determinante jacobiano mide cuánto se expande o contrae una pequeña celda.</p></div>
        <strong>dA = |det J<sub>T</sub>| du dv</strong>
      </figcaption>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Comparación entre una cuadrícula original y su imagen deformada">
        <rect width={WIDTH} height={HEIGHT} fill="#fff" />
        <text x="190" y="32" textAnchor="middle" className="concept-label">plano (u,v)</text><text x="570" y="32" textAnchor="middle" className="concept-label">plano (x,y)</text>
        {gridValues.map((value) => <g key={`l-${value}`} className="jacobian-source-grid"><path d={linePath(value, true, amount, "left")} /><path d={linePath(value, false, amount, "left")} /></g>)}
        {gridValues.map((value) => <g key={`r-${value}`} className="jacobian-target-grid"><path d={linePath(value, true, amount, "right")} /><path d={linePath(value, false, amount, "right")} /></g>)}
        <path d="M348,205 L376,205 M366,197 L376,205 L366,213" className="jacobian-map-arrow" />
        <rect x={source.x - 12} y={source.y - 12} width="24" height="24" className="jacobian-source-cell" />
        <polygon points={`${target.x},${target.y} ${target.x + duX * 24},${target.y - duY * 24} ${target.x + (duX + dvX) * 24},${target.y - (duY + dvY) * 24} ${target.x + dvX * 24},${target.y - dvY * 24}`} className="jacobian-target-cell" />
        <circle cx={source.x} cy={source.y} r="5" className="jacobian-point" /><circle cx={target.x} cy={target.y} r="5" className="jacobian-point" />
      </svg>
      <div className="jacobian-controls">
        <label htmlFor="jacobian-amount">Deformación <output>{amount.toFixed(2)}</output></label><input id="jacobian-amount" type="range" min="0" max="1" step="0.01" value={amount} onChange={(event) => setAmount(Number(event.target.value))} />
        <label htmlFor="jacobian-u">u <output>{u.toFixed(2)}</output></label><input id="jacobian-u" type="range" min="-1" max="1" step="0.05" value={u} onChange={(event) => setU(Number(event.target.value))} />
        <label htmlFor="jacobian-v">v <output>{v.toFixed(2)}</output></label><input id="jacobian-v" type="range" min="-1" max="1" step="0.05" value={v} onChange={(event) => setV(Number(event.target.value))} />
        <p>T({u.toFixed(2)},{v.toFixed(2)}) = ({mappedValue.x.toFixed(2)},{mappedValue.y.toFixed(2)})</p><strong>|det J| = {Math.abs(jacobian).toFixed(3)}</strong>
      </div>
    </figure>
  );
}
