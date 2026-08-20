"use client";

import { useState, type MouseEvent } from "react";

const WIDTH = 760;
const HEIGHT = 460;
const ORIGIN = { x: WIDTH / 2, y: HEIGHT / 2 };
const SCALE = 78;

function sx(x: number) { return ORIGIN.x + x * SCALE; }
function sy(y: number) { return ORIGIN.y - y * SCALE; }

export default function OpenClosedBallsExplorer() {
  const [closed, setClosed] = useState(false);
  const [radius, setRadius] = useState(1.5);
  const [point, setPoint] = useState({ x: 1.5, y: 0 });
  const distance = Math.hypot(point.x, point.y);
  const onBoundary = Math.abs(distance - radius) < 0.045;
  const inside = distance < radius - 0.045;
  const belongs = inside || (closed && onBoundary);
  const position = inside ? "interior" : onBoundary ? "frontera" : "exterior";

  const placePoint = (event: MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const viewX = (event.clientX - rect.left) / rect.width * WIDTH;
    const viewY = (event.clientY - rect.top) / rect.height * HEIGHT;
    setPoint({ x: (viewX - ORIGIN.x) / SCALE, y: (ORIGIN.y - viewY) / SCALE });
  };

  return (
    <figure className="vector-concept-explorer balls-explorer" id="bolas-topologia-interactivo">
      <figcaption>
        <div>
          <span>EXPLORACIÓN · BOLAS Y TOPOLOGÍA</span>
          <h5>Interior, frontera y exterior</h5>
          <p>Haz clic para mover el punto. La diferencia entre una bola abierta y una cerrada está exactamente en su frontera.</p>
        </div>
        <strong>{closed ? "‖x−a‖ ≤ r" : "‖x−a‖ < r"}</strong>
      </figcaption>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} onClick={placePoint} role="img" aria-label={`Bola ${closed ? "cerrada" : "abierta"} de radio ${radius.toFixed(1)}. El punto está en el ${position}.`}>
        <defs><pattern id="balls-grid" width="39" height="39" patternUnits="userSpaceOnUse"><path d="M39 0H0V39" fill="none" stroke="#d9e1df" strokeWidth="1" /></pattern></defs>
        <rect width={WIDTH} height={HEIGHT} fill="url(#balls-grid)" />
        <line x1="30" y1={ORIGIN.y} x2={WIDTH - 30} y2={ORIGIN.y} className="concept-axis" />
        <line x1={ORIGIN.x} y1="24" x2={ORIGIN.x} y2={HEIGHT - 24} className="concept-axis" />
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r={radius * SCALE} className={closed ? "topology-ball is-closed" : "topology-ball is-open"} />
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r="6" className="topology-center" />
        <line x1={ORIGIN.x} y1={ORIGIN.y} x2={ORIGIN.x + radius * SCALE} y2={ORIGIN.y} className="topology-radius" />
        <text x={ORIGIN.x + radius * SCALE / 2} y={ORIGIN.y - 10} className="concept-label">r</text>
        <circle cx={sx(point.x)} cy={sy(point.y)} r="10" className={belongs ? "topology-test-point belongs" : "topology-test-point"} />
        <text x={sx(point.x) + 14} y={sy(point.y) - 12} className="concept-label">x</text>
      </svg>
      <div className="vector-concept-controls balls-controls">
        <div className="balls-mode" role="group" aria-label="Tipo de bola">
          <button type="button" className={!closed ? "is-active" : ""} onClick={() => setClosed(false)}>Abierta</button>
          <button type="button" className={closed ? "is-active" : ""} onClick={() => setClosed(true)}>Cerrada</button>
        </div>
        <label htmlFor="ball-radius">Radio r <output>{radius.toFixed(1)}</output></label>
        <input id="ball-radius" type="range" min="0.8" max="2.3" step="0.1" value={radius} onChange={(event) => setRadius(Number(event.target.value))} />
        <p>‖x−a‖={distance.toFixed(2)} · {position}</p>
        <strong>{belongs ? "x pertenece a la bola" : "x no pertenece a la bola"}</strong>
      </div>
      <p className="topology-note">Las bolas abiertas son las vecindades básicas de ℝⁿ: un conjunto es abierto cuando cada uno de sus puntos cabe dentro de alguna bola contenida completamente en el conjunto.</p>
    </figure>
  );
}
