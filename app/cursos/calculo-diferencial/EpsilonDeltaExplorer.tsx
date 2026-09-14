"use client";

import { useState } from "react";

const xMin = -0.25;
const xMax = 2.35;
const yMin = -0.25;
const yMax = 4.75;
const width = 620;
const height = 360;
const pad = { left: 55, right: 25, top: 25, bottom: 52 };
const sx = (x: number) => pad.left + ((x - xMin) / (xMax - xMin)) * (width - pad.left - pad.right);
const sy = (y: number) => height - pad.bottom - ((y - yMin) / (yMax - yMin)) * (height - pad.top - pad.bottom);

export default function EpsilonDeltaExplorer() {
  const [epsilon, setEpsilon] = useState(0.8);
  const [delta, setDelta] = useState(0.3);
  const a = 1;
  const limit = 1;
  const deltaMax = Math.sqrt(1 + epsilon) - 1;
  const imageVariation = 2 * delta + delta * delta;
  const works = imageVariation <= epsilon + 1e-9;
  const curve = Array.from({ length: 121 }, (_, index) => {
    const x = xMin + (index / 120) * (xMax - xMin);
    return `${index ? "L" : "M"}${sx(x).toFixed(1)},${sy(x * x).toFixed(1)}`;
  }).join(" ");

  return (
    <figure className={`epsilon-delta-lab${works ? " is-valid" : " is-invalid"}`}>
      <header>
        <div><span>EXPLORACIÓN VISUAL</span><h5>El juego entre ε y δ</h5></div>
        <strong>{works ? "La condición se cumple" : "δ es demasiado grande"}</strong>
      </header>

      <div className="epsilon-delta-stage">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Gráfica de x al cuadrado con intervalo delta ${delta.toFixed(2)} y franja epsilon ${epsilon.toFixed(2)}`}>
          <rect className="epsilon-band" x={sx(xMin)} y={sy(limit + epsilon)} width={sx(xMax) - sx(xMin)} height={sy(limit - epsilon) - sy(limit + epsilon)} />
          <rect className="delta-band" x={sx(a - delta)} y={pad.top} width={sx(a + delta) - sx(a - delta)} height={height - pad.top - pad.bottom} />
          <g className="epsilon-delta-grid">
            <line x1={pad.left} y1={sy(0)} x2={width - pad.right} y2={sy(0)} />
            <line x1={sx(0)} y1={pad.top} x2={sx(0)} y2={height - pad.bottom} />
            <line className="guide limit" x1={pad.left} y1={sy(limit)} x2={width - pad.right} y2={sy(limit)} />
            <line className="guide point" x1={sx(a)} y1={pad.top} x2={sx(a)} y2={height - pad.bottom} />
            <line className="bound epsilon" x1={pad.left} y1={sy(limit + epsilon)} x2={width - pad.right} y2={sy(limit + epsilon)} />
            <line className="bound epsilon" x1={pad.left} y1={sy(limit - epsilon)} x2={width - pad.right} y2={sy(limit - epsilon)} />
            <line className="bound delta" x1={sx(a - delta)} y1={pad.top} x2={sx(a - delta)} y2={height - pad.bottom} />
            <line className="bound delta" x1={sx(a + delta)} y1={pad.top} x2={sx(a + delta)} y2={height - pad.bottom} />
          </g>
          <path className="epsilon-delta-curve" d={curve} />
          <circle className="epsilon-delta-point" cx={sx(a)} cy={sy(limit)} r="6" />
          <g className="epsilon-bracket">
            <line x1={sx(0.12)} y1={sy(limit)} x2={sx(0.12)} y2={sy(limit + epsilon)} />
            <line x1={sx(0.08)} y1={sy(limit)} x2={sx(0.16)} y2={sy(limit)} />
            <line x1={sx(0.08)} y1={sy(limit + epsilon)} x2={sx(0.16)} y2={sy(limit + epsilon)} />
          </g>
          <g className="delta-bracket">
            <line x1={sx(a)} y1={height - 25} x2={sx(a + delta)} y2={height - 25} />
            <line x1={sx(a)} y1={height - 31} x2={sx(a)} y2={height - 19} />
            <line x1={sx(a + delta)} y1={height - 31} x2={sx(a + delta)} y2={height - 19} />
          </g>
          <text className="epsilon-label" x={sx(0.18)} y={(sy(limit) + sy(limit + epsilon)) / 2}>ε</text>
          <text className="delta-label" x={(sx(a) + sx(a + delta)) / 2} y={height - 31}>δ</text>
          <text x={sx(a) - 7} y={height - 36}>a</text>
          <text x={pad.left + 4} y={sy(limit) - 7}>L</text>
          <text className="function-label" x={sx(1.82)} y={sy(1.82 ** 2) - 10}>f(x)=x²</text>
        </svg>

        <div className="epsilon-delta-controls">
          <label>
            <span><strong>ε = {epsilon.toFixed(2)}</strong><small>franja vertical: ({(limit - epsilon).toFixed(2)}, {(limit + epsilon).toFixed(2)})</small></span>
            <input type="range" min="0.15" max="1.5" step="0.05" value={epsilon} onChange={(event) => setEpsilon(Number(event.target.value))} />
          </label>
          <label>
            <span><strong>δ = {delta.toFixed(2)}</strong><small>intervalo horizontal: ({(a - delta).toFixed(2)}, {(a + delta).toFixed(2)})</small></span>
            <input type="range" min="0.05" max="0.8" step="0.025" value={delta} onChange={(event) => setDelta(Number(event.target.value))} />
          </label>
        </div>
      </div>

      <figcaption>
        <span>{works ? "SÍ" : "AÚN NO"}</span>
        <p>Para todo <b>0 &lt; |x−1| &lt; {delta.toFixed(2)}</b>, la variación máxima es <b>|x²−1| ≈ {imageVariation.toFixed(2)}</b>. Debe ser menor que ε = {epsilon.toFixed(2)}.</p>
        <small>Con este ε, el mayor δ posible es aproximadamente {deltaMax.toFixed(2)}.</small>
      </figcaption>
    </figure>
  );
}
