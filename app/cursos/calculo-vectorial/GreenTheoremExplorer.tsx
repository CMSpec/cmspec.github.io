"use client";

import { useMemo, useState } from "react";

const WIDTH = 760;
const HEIGHT = 520;
const CENTER = { x: WIDTH / 2, y: 270 };
const SCALE = 94;

function pointOnCircle(radius: number, angle: number) {
  return {
    x: CENTER.x + radius * SCALE * Math.cos(angle),
    y: CENTER.y - radius * SCALE * Math.sin(angle),
  };
}

function arcPath(radius: number, angle: number) {
  const pointCount = Math.max(2, Math.ceil(angle / (Math.PI / 50)) + 1);
  const points = Array.from({ length: pointCount }, (_, index) => {
    const t = angle * index / (pointCount - 1);
    return pointOnCircle(radius, t);
  });
  return points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
}

export default function GreenTheoremExplorer() {
  const [radius, setRadius] = useState(1.55);
  const [progress, setProgress] = useState(35);
  const angle = progress / 100 * Math.PI * 2;
  const current = pointOnCircle(radius, angle);
  const radiusPixels = radius * SCALE;
  const circulation = radius * radius * angle;
  const total = 2 * Math.PI * radius * radius;
  const end = pointOnCircle(radius, angle);
  const sectorLargeArc = angle > Math.PI ? 1 : 0;
  const sectorPath = progress >= 100
    ? `M${CENTER.x - radiusPixels},${CENTER.y}a${radiusPixels},${radiusPixels} 0 1,0 ${radiusPixels * 2},0a${radiusPixels},${radiusPixels} 0 1,0 ${-radiusPixels * 2},0`
    : `M${CENTER.x},${CENTER.y} L${CENTER.x + radiusPixels},${CENTER.y} A${radiusPixels},${radiusPixels} 0 ${sectorLargeArc} 0 ${end.x},${end.y} Z`;

  const arrows = useMemo(() => {
    const result: Array<{ x1: number; y1: number; x2: number; y2: number; key: string }> = [];
    for (let gx = -3; gx <= 3; gx += 1) {
      for (let gy = -2; gy <= 2; gy += 1) {
        if (gx === 0 && gy === 0) continue;
        const length = Math.hypot(gx, gy);
        const factor = 20 / length;
        const x1 = CENTER.x + gx * 98;
        const y1 = CENTER.y - gy * 98;
        result.push({
          x1,
          y1,
          x2: x1 + (-gy) * factor,
          y2: y1 - gx * factor,
          key: `${gx}-${gy}`,
        });
      }
    }
    return result;
  }, []);

  const tangentLength = 54;
  const tangent = {
    x: current.x - Math.sin(angle) * tangentLength,
    y: current.y - Math.cos(angle) * tangentLength,
  };

  return (
    <figure className="vector-concept-explorer green-theorem-explorer" id="teorema-green-interactivo">
      <figcaption>
        <div>
          <span>EXPLORACIÓN · TEOREMA DE GREEN</span>
          <h5>Lo que circula por el borde se acumula en el interior</h5>
          <p>Recorre la frontera en sentido antihorario. Para el campo F=(−y,x), la circulación por el arco coincide en cada instante con la integral del rotacional sobre el sector barrido.</p>
        </div>
        <strong>∮<sub>C</sub> F·dr = ∬<sub>R</sub> rot(F)dA</strong>
      </figcaption>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`Campo rotacional alrededor de un disco de radio ${radius.toFixed(2)}. Se ha recorrido el ${progress} por ciento de la frontera.`}>
        <defs>
          <marker id="green-field-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#82afbd" /></marker>
          <marker id="green-tangent-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#007d9d" /></marker>
          <pattern id="green-grid" width="49" height="49" patternUnits="userSpaceOnUse"><path d="M49 0H0V49" fill="none" stroke="#dde4e2" strokeWidth="1" /></pattern>
        </defs>
        <rect width={WIDTH} height={HEIGHT} fill="url(#green-grid)" />
        <line x1="32" y1={CENTER.y} x2={WIDTH - 32} y2={CENTER.y} className="concept-axis" />
        <line x1={CENTER.x} y1="28" x2={CENTER.x} y2={HEIGHT - 28} className="concept-axis" />
        {arrows.map((arrow) => <line key={arrow.key} {...arrow} className="green-field-vector" markerEnd="url(#green-field-arrow)" />)}
        <circle cx={CENTER.x} cy={CENTER.y} r={radiusPixels} className="green-region" />
        <path d={sectorPath} className="green-swept-sector" />
        <circle cx={CENTER.x} cy={CENTER.y} r={radiusPixels} className="green-boundary" />
        {progress > 0 ? <path d={arcPath(radius, angle)} className="green-boundary-trace" /> : null}
        <circle cx={current.x} cy={current.y} r="9" className="green-current-point" />
        <line x1={current.x} y1={current.y} x2={tangent.x} y2={tangent.y} className="green-tangent" markerEnd="url(#green-tangent-arrow)" />
        <text x={tangent.x + 8} y={tangent.y - 8} className="concept-label">F</text>
        <text x={WIDTH - 118} y="45" className="concept-label">rot(F)=2</text>
        <text x={CENTER.x + 12} y={CENTER.y - 12} className="concept-label">R</text>
        <text x={CENTER.x + radiusPixels + 10} y={CENTER.y + 24} className="concept-label">C</text>
      </svg>
      <div className="green-theorem-controls">
        <label htmlFor="green-progress">Recorrido <output>{progress}%</output></label>
        <input id="green-progress" type="range" min="0" max="100" step="1" value={progress} onChange={(event) => setProgress(Number(event.target.value))} />
        <label htmlFor="green-radius">Radio <output>{radius.toFixed(2)}</output></label>
        <input id="green-radius" type="range" min="0.8" max="2.1" step="0.05" value={radius} onChange={(event) => setRadius(Number(event.target.value))} />
        <p>Borde acumulado: {circulation.toFixed(3)}</p>
        <p>Interior acumulado: {circulation.toFixed(3)}</p>
        <strong>Vuelta completa: {total.toFixed(3)}</strong>
      </div>
    </figure>
  );
}
