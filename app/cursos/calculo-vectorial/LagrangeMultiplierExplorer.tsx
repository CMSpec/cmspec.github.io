"use client";

import { useState } from "react";

const WIDTH = 760;
const HEIGHT = 500;
const ORIGIN = { x: WIDTH / 2, y: HEIGHT / 2 };
const SCALE = 112;
const RADIUS = 1.55;

function sx(x: number) { return ORIGIN.x + x * SCALE; }
function sy(y: number) { return ORIGIN.y - y * SCALE; }

export default function LagrangeMultiplierExplorer() {
  const [angle, setAngle] = useState(45);
  const radians = angle * Math.PI / 180;
  const x = RADIUS * Math.cos(radians);
  const y = RADIUS * Math.sin(radians);
  const value = x + y;
  const dot = (x + y) / (RADIUS * Math.sqrt(2));
  const aligned = Math.abs(dot) > 0.995;
  const extremum = dot > 0.995 ? "máximo condicionado" : dot < -0.995 ? "mínimo condicionado" : "punto sobre la restricción";
  const arrowLength = 66;
  const gradF = { x: arrowLength / Math.sqrt(2), y: -arrowLength / Math.sqrt(2) };
  const gradG = { x: arrowLength * Math.cos(radians), y: -arrowLength * Math.sin(radians) };
  const px = sx(x);
  const py = sy(y);
  const levelHalf = 245;
  const levelDirection = { x: 1 / Math.sqrt(2), y: 1 / Math.sqrt(2) };

  return (
    <figure className="vector-concept-explorer lagrange-explorer" id="multiplicadores-lagrange-interactivo">
      <figcaption>
        <div>
          <span>EXPLORACIÓN · MULTIPLICADORES DE LAGRANGE</span>
          <h5>Buscar un extremo sin abandonar la restricción</h5>
          <p>Mueve el punto sobre la circunferencia. En un extremo condicionado, la curva de nivel toca la restricción y los gradientes quedan paralelos.</p>
        </div>
        <strong>∇f = λ∇g</strong>
      </figcaption>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`Curvas de nivel de f igual a x más y y la restricción circular. El punto actual es ${x.toFixed(2)}, ${y.toFixed(2)}.`}>
        <defs>
          <marker id="lagrange-arrow-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#007d9d" /></marker>
          <marker id="lagrange-arrow-olive" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#7e812d" /></marker>
          <pattern id="lagrange-grid" width="56" height="56" patternUnits="userSpaceOnUse"><path d="M56 0H0V56" fill="none" stroke="#d9e1df" strokeWidth="1" /></pattern>
        </defs>
        <rect width={WIDTH} height={HEIGHT} fill="url(#lagrange-grid)" />
        <line x1="40" y1={ORIGIN.y} x2={WIDTH - 40} y2={ORIGIN.y} className="concept-axis" />
        <line x1={ORIGIN.x} y1="28" x2={ORIGIN.x} y2={HEIGHT - 28} className="concept-axis" />
        {[-3, -2, -1, 0, 1, 2, 3].map((c) => {
          const cx = sx(c / 2);
          const cy = sy(c / 2);
          return <line key={c} x1={cx - 245} y1={cy - 245} x2={cx + 245} y2={cy + 245} className="lagrange-level-muted" />;
        })}
        <line
          x1={px - levelDirection.x * levelHalf}
          y1={py - levelDirection.y * levelHalf}
          x2={px + levelDirection.x * levelHalf}
          y2={py + levelDirection.y * levelHalf}
          className="lagrange-level-current"
        />
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r={RADIUS * SCALE} className="lagrange-constraint" />
        <circle cx={px} cy={py} r="9" className={aligned ? "lagrange-point is-extreme" : "lagrange-point"} />
        <line x1={px} y1={py} x2={px + gradF.x} y2={py + gradF.y} className="lagrange-grad-f" markerEnd="url(#lagrange-arrow-blue)" />
        <line x1={px} y1={py} x2={px + gradG.x} y2={py + gradG.y} className="lagrange-grad-g" markerEnd="url(#lagrange-arrow-olive)" />
        <text x={px + gradF.x + 8} y={py + gradF.y - 5} className="concept-label">∇f</text>
        <text x={px + gradG.x + 8} y={py + gradG.y + 16} className="concept-label">∇g</text>
        <text x={WIDTH - 142} y={HEIGHT - 24} className="concept-label">g(x,y)=0</text>
      </svg>
      <div className="vector-concept-controls">
        <label htmlFor="lagrange-angle">Posición θ <output>{angle}°</output></label>
        <input id="lagrange-angle" type="range" min="0" max="360" step="1" value={angle} onChange={(event) => setAngle(Number(event.target.value))} />
        <p>P=({x.toFixed(2)}, {y.toFixed(2)}) · f(P)={value.toFixed(2)}</p>
        <strong className={aligned ? "is-aligned" : ""}>{extremum}{aligned ? ": los gradientes son paralelos" : ""}</strong>
      </div>
    </figure>
  );
}
