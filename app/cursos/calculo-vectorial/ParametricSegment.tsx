"use client";

import { useState } from "react";

const WIDTH = 680;
const HEIGHT = 390;
const CENTER_X = WIDTH / 2;
const CENTER_Y = 190;
const SCALE = 72;
const P = { x: -2, y: -1 };
const Q = { x: 3, y: 2 };

function interpolate(t: number) {
  return {
    x: (1 - t) * P.x + t * Q.x,
    y: (1 - t) * P.y + t * Q.y,
  };
}

function toScreen(point: { x: number; y: number }) {
  return {
    x: CENTER_X + SCALE * point.x,
    y: CENTER_Y - SCALE * point.y,
  };
}

export default function ParametricSegment() {
  const [parameter, setParameter] = useState(0.45);
  const current = interpolate(parameter);
  const startScreen = toScreen(P);
  const endScreen = toScreen(Q);
  const currentScreen = toScreen(current);

  return (
    <figure className="parametric-ellipse parametric-segment" id="segmento-parametrizado-interactivo">
      <figcaption>
        <div>
          <span>EXPLORACIÓN · SEGMENTO</span>
          <h5>La recta entre dos puntos</h5>
          <p>Cuando <i>t</i> avanza de 0 a 1, el punto comienza en <i>P</i> y termina en <i>Q</i>, sin salir del segmento que los une.</p>
        </div>
        <strong>r(t)=(1−t)P+tQ</strong>
      </figcaption>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`Segmento entre P y Q recorrido hasta t igual a ${parameter.toFixed(2)}`}>
        <defs>
          <marker id="segment-axis-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#526b73" />
          </marker>
        </defs>
        <g className="parametric-grid">
          {[-3, -2, -1, 1, 2, 3].map((value) => <line key={`x-${value}`} x1={CENTER_X + value * SCALE} y1="26" x2={CENTER_X + value * SCALE} y2="350" />)}
          {[-2, -1, 1, 2].map((value) => <line key={`y-${value}`} x1="70" y1={CENTER_Y - value * SCALE} x2="616" y2={CENTER_Y - value * SCALE} />)}
        </g>
        <line className="parametric-axis" x1="64" y1={CENTER_Y} x2="620" y2={CENTER_Y} markerEnd="url(#segment-axis-arrow)" />
        <line className="parametric-axis" x1={CENTER_X} y1="356" x2={CENTER_X} y2="18" markerEnd="url(#segment-axis-arrow)" />
        <text className="parametric-axis-label" x="624" y={CENTER_Y - 8}>x</text>
        <text className="parametric-axis-label" x={CENTER_X + 10} y="25">y</text>

        <line className="parametric-segment-guide" x1={startScreen.x} y1={startScreen.y} x2={endScreen.x} y2={endScreen.y} />
        <line className="parametric-segment-trace" x1={startScreen.x} y1={startScreen.y} x2={currentScreen.x} y2={currentScreen.y} />
        <circle className="parametric-endpoint" cx={startScreen.x} cy={startScreen.y} r="7" />
        <circle className="parametric-endpoint" cx={endScreen.x} cy={endScreen.y} r="7" />
        <circle className="parametric-current-point" cx={currentScreen.x} cy={currentScreen.y} r="9" />
        <text className="parametric-point-label" x={startScreen.x - 31} y={startScreen.y + 30}>P</text>
        <text className="parametric-point-label" x={endScreen.x + 15} y={endScreen.y - 13}>Q</text>
        <text className="parametric-point-label" x={currentScreen.x + 15} y={currentScreen.y - 15}>r(t)</text>
      </svg>

      <div className="parametric-ellipse-controls">
        <label htmlFor="segment-parameter">
          <span>PARÁMETRO</span>
          <output><i>t</i> = {parameter.toFixed(2)}</output>
        </label>
        <input
          id="segment-parameter"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={parameter}
          onChange={(event) => setParameter(Number(event.target.value))}
        />
        <p aria-live="polite">r({parameter.toFixed(2)}) = ({current.x.toFixed(2)}, {current.y.toFixed(2)})</p>
      </div>
    </figure>
  );
}
