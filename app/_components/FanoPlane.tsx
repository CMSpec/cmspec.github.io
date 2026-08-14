"use client";

import { useState } from "react";

const points = {
  A: [50, 10], B: [15, 82], C: [85, 82], D: [32.5, 46], E: [67.5, 46], F: [50, 82], G: [50, 58],
} as const;

const lines = [
  { name: "Carta 1", points: ["A", "D", "B"], segment: ["A", "B"] },
  { name: "Carta 2", points: ["A", "E", "C"], segment: ["A", "C"] },
  { name: "Carta 3", points: ["B", "F", "C"], segment: ["B", "C"] },
  { name: "Carta 4", points: ["A", "G", "F"], segment: ["A", "F"] },
  { name: "Carta 5", points: ["B", "G", "E"], segment: ["B", "E"] },
  { name: "Carta 6", points: ["C", "G", "D"], segment: ["C", "D"] },
  { name: "Carta 7", points: ["D", "E", "F"], circle: true },
] as const;

function segmentStyle(from: keyof typeof points, to: keyof typeof points) {
  const [x1, y1] = points[from];
  const [x2, y2] = points[to];
  const width = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  return { left: `${x1}%`, top: `${y1}%`, width: `${width}%`, transform: `rotate(${angle}deg)` };
}

export default function FanoPlane() {
  const [active, setActive] = useState(0);
  const selected = new Set<string>(lines[active].points);

  return (
    <figure className="fano-explorer">
      <figcaption>
        <span>VISUALIZACIÓN · PLANO DE FANO</span>
        <strong>Siete puntos, siete rectas y una coincidencia entre cada par</strong>
        <p>Selecciona una carta. Sus tres símbolos y la recta que los contiene quedarán destacados.</p>
      </figcaption>
      <div className="fano-layout">
        <div className="fano-board" aria-label="Plano proyectivo finito de orden dos">
          {lines.map((line, index) => line.circle
            ? <i key={line.name} className={`fano-circle${active === index ? " is-active" : ""}`} aria-hidden="true" />
            : <i key={line.name} className={`fano-line${active === index ? " is-active" : ""}`} style={segmentStyle(line.segment[0], line.segment[1])} aria-hidden="true" />
          )}
          {Object.entries(points).map(([label, [x, y]]) => (
            <span key={label} className={`fano-point${selected.has(label) ? " is-active" : ""}`} style={{ left: `${x}%`, top: `${y}%` }}>
              {label}
            </span>
          ))}
        </div>
        <div className="fano-cards" aria-label="Rectas del plano de Fano">
          {lines.map((line, index) => (
            <button key={line.name} type="button" className={active === index ? "is-active" : ""} onClick={() => setActive(index)} aria-pressed={active === index}>
              <span>{line.name}</span><strong>{line.points.join(" · ")}</strong>
            </button>
          ))}
        </div>
      </div>
      <p className="fano-caption">Aquí cada punto funciona como un símbolo y cada recta como una carta. Dos rectas distintas se encuentran en un solo punto: por eso dos cartas comparten exactamente un símbolo.</p>
    </figure>
  );
}
