"use client";

import { useMemo, useState } from "react";

const WIDTH = 680;
const HEIGHT = 390;
const CENTER_X = WIDTH / 2;
const CENTER_Y = 185;
const SCALE = 70;

function ellipsePoint(t: number) {
  return { x: 3 * Math.cos(t), y: 2 * Math.sin(t) };
}

function screenPoint(t: number) {
  const point = ellipsePoint(t);
  return { x: CENTER_X + SCALE * point.x, y: CENTER_Y - SCALE * point.y };
}

function pathUntil(t: number) {
  const steps = Math.max(2, Math.ceil(150 * t / (Math.PI * 2)));
  return Array.from({ length: steps + 1 }, (_, index) => {
    const parameter = t * index / steps;
    const point = screenPoint(parameter);
    return `${index === 0 ? "M" : "L"}${point.x.toFixed(2)},${point.y.toFixed(2)}`;
  }).join(" ");
}

export default function ParametricEllipse() {
  const [parameter, setParameter] = useState(Math.PI * 0.75);
  const current = ellipsePoint(parameter);
  const currentScreen = screenPoint(parameter);
  const trace = useMemo(() => pathUntil(parameter), [parameter]);

  return (
    <figure className="parametric-ellipse" id="elipse-parametrizada-interactiva">
      <figcaption>
        <div>
          <span>EXPLORACIÓN · EJEMPLO 3</span>
          <h5>Una parametrización recorre la elipse</h5>
          <p>Al aumentar <i>t</i>, el punto avanza y deja visible la parte de la curva que ya ha recorrido.</p>
        </div>
        <strong>f(t)=(3 cos t, 2 sen t)</strong>
      </figcaption>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`Elipse parametrizada recorrida hasta t igual a ${parameter.toFixed(2)}`}>
        <defs>
          <marker id="parametric-axis-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#526b73" />
          </marker>
        </defs>
        <g className="parametric-grid">
          {[-3, -2, -1, 1, 2, 3].map((value) => <line key={`x-${value}`} x1={CENTER_X + value * SCALE} y1="28" x2={CENTER_X + value * SCALE} y2="342" />)}
          {[-2, -1, 1, 2].map((value) => <line key={`y-${value}`} x1="78" y1={CENTER_Y - value * SCALE} x2="602" y2={CENTER_Y - value * SCALE} />)}
        </g>
        <line className="parametric-axis" x1="68" y1={CENTER_Y} x2="615" y2={CENTER_Y} markerEnd="url(#parametric-axis-arrow)" />
        <line className="parametric-axis" x1={CENTER_X} y1="350" x2={CENTER_X} y2="18" markerEnd="url(#parametric-axis-arrow)" />
        <text className="parametric-axis-label" x="622" y={CENTER_Y - 8}>x</text>
        <text className="parametric-axis-label" x={CENTER_X + 10} y="25">y</text>
        <ellipse className="parametric-ellipse-guide" cx={CENTER_X} cy={CENTER_Y} rx={3 * SCALE} ry={2 * SCALE} />
        <path className="parametric-ellipse-trace" d={trace} />
        <line className="parametric-radius" x1={CENTER_X} y1={CENTER_Y} x2={currentScreen.x} y2={currentScreen.y} />
        <circle className="parametric-current-point" cx={currentScreen.x} cy={currentScreen.y} r="8" />
        <text className="parametric-point-label" x={currentScreen.x + 13} y={currentScreen.y - 13}>f(t)</text>
      </svg>

      <div className="parametric-ellipse-controls">
        <label htmlFor="ellipse-parameter">
          <span>PARÁMETRO</span>
          <output><i>t</i> = {parameter.toFixed(2)}</output>
        </label>
        <input
          id="ellipse-parameter"
          type="range"
          min="0"
          max={Math.PI * 2}
          step="0.01"
          value={parameter}
          onChange={(event) => setParameter(Number(event.target.value))}
        />
        <p aria-live="polite">f({parameter.toFixed(2)}) ≈ ({current.x.toFixed(2)}, {current.y.toFixed(2)})</p>
      </div>
    </figure>
  );
}
