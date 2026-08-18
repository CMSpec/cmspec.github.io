"use client";

import { useSteppedAnimation } from "./MatrixOperationsAnimations";

type Vector2 = [number, number];

const vectorX: Vector2 = [2, 1];
const canonicalBasis: Vector2[] = [[1, 0], [0, 1]];
const newBasis: Vector2[] = [[1, 1], [-1, 1]];
const newCoordinates: Vector2 = [1.5, -0.5];
const plot = { cx: 155, cy: 155, scale: 45 };

function point([x, y]: Vector2) {
  return { x: plot.cx + x * plot.scale, y: plot.cy - y * plot.scale };
}

function multiply(value: number, vector: Vector2): Vector2 {
  return [value * vector[0], value * vector[1]];
}

function add(a: Vector2, b: Vector2): Vector2 {
  return [a[0] + b[0], a[1] + b[1]];
}

function BasisPlane({
  basis,
  label,
  revealConstruction = false,
}: {
  basis: Vector2[];
  label: string;
  revealConstruction?: boolean;
}) {
  const grid = [-3, -2, -1, 0, 1, 2, 3];
  const origin = point([0, 0]);
  const vectorEnd = point(vectorX);
  const firstComponent = multiply(newCoordinates[0], newBasis[0]);
  const firstEnd = point(firstComponent);
  const secondEnd = point(add(firstComponent, multiply(newCoordinates[1], newBasis[1])));

  return (
    <figure className="basis-plane-card">
      <figcaption>{label}</figcaption>
      <svg viewBox="0 0 310 310" role="img" aria-label={`${label}, con el vector x`}>
        <defs>
          <marker id={`basis-arrow-${label.replace(/\s/g, "-")}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="context-stroke" />
          </marker>
        </defs>
        <g className="basis-r2-grid">
          {grid.map((value) => (
            <g key={value}>
              <line x1={point([value, -3]).x} y1={point([value, -3]).y} x2={point([value, 3]).x} y2={point([value, 3]).y} />
              <line x1={point([-3, value]).x} y1={point([-3, value]).y} x2={point([3, value]).x} y2={point([3, value]).y} />
            </g>
          ))}
        </g>
        {basis.map((axis, index) => {
          const positive = point(multiply(2.6, axis));
          const negative = point(multiply(-2.6, axis));
          return (
            <g className={`basis-r2-axis basis-r2-axis-${index + 1}`} key={index}>
              <line x1={negative.x} y1={negative.y} x2={positive.x} y2={positive.y} markerEnd={`url(#basis-arrow-${label.replace(/\s/g, "-")})`} />
              <text x={positive.x + 5} y={positive.y - 7}>{label === "Base inicial E" ? `e${index + 1}` : `b${index + 1}`}</text>
            </g>
          );
        })}
        {revealConstruction && (
          <g className="basis-coordinate-construction">
            <line className="basis-component-1" x1={origin.x} y1={origin.y} x2={firstEnd.x} y2={firstEnd.y} />
            <line className="basis-component-2" x1={firstEnd.x} y1={firstEnd.y} x2={secondEnd.x} y2={secondEnd.y} />
            <text x={(origin.x + firstEnd.x) / 2 + 5} y={(origin.y + firstEnd.y) / 2 - 7}>1,5b₁</text>
            <text x={(firstEnd.x + secondEnd.x) / 2 + 5} y={(firstEnd.y + secondEnd.y) / 2 - 7}>−0,5b₂</text>
          </g>
        )}
        {(label === "Base inicial E" || revealConstruction) && (
          <g className="basis-r2-vector">
            <line x1={origin.x} y1={origin.y} x2={vectorEnd.x} y2={vectorEnd.y} markerEnd={`url(#basis-arrow-${label.replace(/\s/g, "-")})`} />
            <text x={vectorEnd.x + 8} y={vectorEnd.y - 8}>x</text>
          </g>
        )}
      </svg>
      <p>{label === "Base inicial E" ? "[x]ₑ = (2, 1)" : revealConstruction ? "[x]ᵦ = (3/2, −1/2)" : "[x]ᵦ = (·, ·)"}</p>
    </figure>
  );
}

function ChangeMatrix({ step }: { step: number }) {
  return (
    <div className="change-basis-calculation" aria-live="polite">
      <p>Matriz de cambio de coordenadas</p>
      <div className="change-basis-equation" aria-label="Coordenadas de x en B igual a un medio por la matriz uno uno, menos uno uno, por el vector dos uno">
        <strong>[x]ᵦ</strong>
        <span>=</span>
        <span className="matrix-factor">½</span>
        <span className="small-r2-matrix change-matrix">
          <i className={step === 1 ? "is-active" : ""}>1</i><i className={step === 1 ? "is-active" : ""}>1</i>
          <i className={step === 2 ? "is-active" : ""}>−1</i><i className={step === 2 ? "is-active" : ""}>1</i>
        </span>
        <span className="small-r2-matrix vector-column">
          <i>2</i><i>1</i>
        </span>
        <span>=</span>
        <span className="small-r2-matrix vector-column result-column">
          <i className={step === 1 ? "is-active" : ""}>{step >= 1 ? "3/2" : "·"}</i>
          <i className={step === 2 ? "is-active" : ""}>{step >= 2 ? "−1/2" : "·"}</i>
        </span>
      </div>
      <strong>
        {step === 0 && "Partimos de [x]ₑ = (2, 1)."}
        {step === 1 && "Primera coordenada: ½(2) + ½(1) = 3/2."}
        {step === 2 && "Segunda coordenada: −½(2) + ½(1) = −1/2."}
        {step === 3 && "Entonces x = 1,5b₁ − 0,5b₂ = (2, 1)."}
      </strong>
    </div>
  );
}

export default function ChangeOfBasis2D() {
  const animation = useSteppedAnimation(4, 2300);

  return (
    <section className="basis-r2-lab" id="cambio-base-r2" aria-labelledby="basis-r2-title">
      <header className="vector-lab-heading">
        <div><span>Exploración en ℝ²</span><h5 id="basis-r2-title">Un vector, dos sistemas de coordenadas</h5></div>
        <strong>x = (2, 1)</strong>
      </header>

      <div className="basis-r2-planes">
        <BasisPlane basis={canonicalBasis} label="Base inicial E" />
        <BasisPlane basis={newBasis} label="Base nueva B" revealConstruction={animation.step === 3} />
      </div>

      <ChangeMatrix step={animation.step} />

      <div className="matrix-animation-controls">
        <p>
          {animation.step === 3
            ? "El vector geométrico es el mismo; solo cambió la pareja de coordenadas."
            : `Paso ${animation.step + 1} de 4`}
        </p>
        <div className="animation-button-group">
          <button type="button" onClick={animation.previous} disabled={animation.step === 0}>Anterior</button>
          <button type="button" onClick={animation.toggle}>{animation.complete ? "Repetir" : animation.playing ? "Pausar" : "Continuar"}</button>
          <button type="button" onClick={animation.next} disabled={animation.step === 3}>Siguiente</button>
        </div>
      </div>
    </section>
  );
}
