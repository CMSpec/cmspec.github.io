"use client";

import { useMemo, useState } from "react";

const WIDTH = 680;
const HEIGHT = 410;
const CENTER_X = WIDTH / 2;
const CENTER_Y = 245;
const SCALE_X = 118;
const SCALE_Y = 58;
const T_MIN = -2;
const T_MAX = 2;

function functionValue(t: number) {
  return t * t - 1;
}

function screenPoint(t: number) {
  return {
    x: CENTER_X + SCALE_X * t,
    y: CENTER_Y - SCALE_Y * functionValue(t),
  };
}

function curvePath(start: number, end: number) {
  const steps = Math.max(2, Math.ceil(120 * Math.abs(end - start) / (T_MAX - T_MIN)));
  return Array.from({ length: steps + 1 }, (_, index) => {
    const t = start + (end - start) * index / steps;
    const point = screenPoint(t);
    return `${index === 0 ? "M" : "L"}${point.x.toFixed(2)},${point.y.toFixed(2)}`;
  }).join(" ");
}

export default function ParametricFunctionGraph() {
  const [parameter, setParameter] = useState(0.65);
  const current = screenPoint(parameter);
  const fullCurve = useMemo(() => curvePath(T_MIN, T_MAX), []);
  const trace = useMemo(() => curvePath(T_MIN, parameter), [parameter]);
  const y = functionValue(parameter);

  return (
    <figure className="parametric-ellipse parametric-function" id="funcion-cuadratica-parametrizada">
      <figcaption>
        <div>
          <span>EXPLORACIÓN · FUNCIÓN COMO CURVA</span>
          <h5>El gráfico de una función también se parametriza</h5>
          <p>Tomamos <i>f(t)=t²−1</i>. El parámetro ocupa el lugar de la coordenada horizontal y el punto <i>(t,f(t))</i> recorre la parábola.</p>
        </div>
        <strong>r(t)=(t,t²−1)</strong>
      </figcaption>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`Parábola recorrida hasta t igual a ${parameter.toFixed(2)}`}>
        <defs>
          <marker id="function-axis-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#526b73" />
          </marker>
        </defs>
        <g className="parametric-grid">
          {[-2, -1, 1, 2].map((value) => <line key={`x-${value}`} x1={CENTER_X + value * SCALE_X} y1="28" x2={CENTER_X + value * SCALE_X} y2="370" />)}
          {[-2, -1, 1, 2, 3].map((value) => <line key={`y-${value}`} x1="76" y1={CENTER_Y - value * SCALE_Y} x2="606" y2={CENTER_Y - value * SCALE_Y} />)}
        </g>
        <line className="parametric-axis" x1="68" y1={CENTER_Y} x2="618" y2={CENTER_Y} markerEnd="url(#function-axis-arrow)" />
        <line className="parametric-axis" x1={CENTER_X} y1="375" x2={CENTER_X} y2="20" markerEnd="url(#function-axis-arrow)" />
        <text className="parametric-axis-label" x="624" y={CENTER_Y - 8}>x=t</text>
        <text className="parametric-axis-label" x={CENTER_X + 10} y="27">y=f(t)</text>
        <path className="parametric-ellipse-guide" d={fullCurve} />
        <path className="parametric-ellipse-trace" d={trace} />
        <line className="parametric-function-guide" x1={current.x} y1={CENTER_Y} x2={current.x} y2={current.y} />
        <circle className="parametric-current-point" cx={current.x} cy={current.y} r="9" />
        <text className="parametric-point-label" x={current.x + 14} y={current.y - 14}>(t,f(t))</text>
      </svg>

      <div className="parametric-ellipse-controls">
        <label htmlFor="function-parameter">
          <span>PARÁMETRO</span>
          <output><i>t</i> = {parameter.toFixed(2)}</output>
        </label>
        <input
          id="function-parameter"
          type="range"
          min={T_MIN}
          max={T_MAX}
          step="0.01"
          value={parameter}
          onChange={(event) => setParameter(Number(event.target.value))}
        />
        <p aria-live="polite">r({parameter.toFixed(2)}) = ({parameter.toFixed(2)}, {y.toFixed(2)})</p>
      </div>

      <p className="parametric-concept-note">
        Una curva es más general que el gráfico de una función de ℝ en ℝ: puede volver sobre sí misma, tener la misma coordenada horizontal en varios puntos o vivir en dimensiones mayores. Sin embargo, todo gráfico <i>y=f(x)</i> puede verse como una curva mediante <i>r(t)=(t,f(t))</i>.
      </p>
    </figure>
  );
}
