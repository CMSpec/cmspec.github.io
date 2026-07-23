"use client";

import { useEffect, useMemo, useState } from "react";

type Vector2 = [number, number];

const u: Vector2 = [2, 1];
const v: Vector2 = [-1, 2];
const plot = { cx: 260, cy: 165, scale: 62 };

function point([x, y]: Vector2) {
  return { x: plot.cx + x * plot.scale, y: plot.cy - y * plot.scale };
}

function add(a: Vector2, b: Vector2): Vector2 {
  return [a[0] + b[0], a[1] + b[1]];
}

function multiply(value: number, vector: Vector2): Vector2 {
  return [value * vector[0], value * vector[1]];
}

function VectorArrow({
  className,
  from = [0, 0],
  label,
  to,
}: {
  className: string;
  from?: Vector2;
  label: string;
  to: Vector2;
}) {
  const start = point(from);
  const end = point(to);
  return (
    <g className={className}>
      <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} markerEnd="url(#vector-arrowhead)" />
      <text x={end.x + 9} y={end.y - 8}>{label}</text>
    </g>
  );
}

function Plane({ children, label }: { children: React.ReactNode; label: string }) {
  const grid = [-3, -2, -1, 0, 1, 2, 3];
  return (
    <svg className="vector-plane" viewBox="0 0 520 330" role="img" aria-label={label}>
      <defs>
        <marker id="vector-arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="context-stroke" />
        </marker>
      </defs>
      <g className="vector-grid">
        {grid.map((value) => {
          const vertical = point([value, 0]).x;
          const horizontal = point([0, value]).y;
          return (
            <g key={value}>
              <line x1={vertical} y1="12" x2={vertical} y2="318" />
              <line x1="12" y1={horizontal} x2="508" y2={horizontal} />
            </g>
          );
        })}
      </g>
      <g className="vector-axes">
        <line x1="12" y1={plot.cy} x2="508" y2={plot.cy} />
        <line x1={plot.cx} y1="12" x2={plot.cx} y2="318" />
        <text x="494" y={plot.cy - 9}>x</text>
        <text x={plot.cx + 9} y="25">y</text>
      </g>
      {children}
    </svg>
  );
}

function ScalarVectorLab() {
  const [lambda, setLambda] = useState(1.5);
  const scaled = multiply(lambda, u);
  const description =
    lambda > 1 ? "Misma dirección y mayor longitud."
      : lambda > 0 ? "Misma dirección y menor longitud."
        : lambda === 0 ? "El resultado es el vector cero."
          : Math.abs(lambda) > 1 ? "Dirección opuesta y mayor longitud."
            : "Dirección opuesta y menor longitud.";

  return (
    <section className="vector-lab" aria-labelledby="scalar-vector-title">
      <header className="vector-lab-heading">
        <div><span>Exploración 01</span><h5 id="scalar-vector-title">Multiplicar un vector por un escalar</h5></div>
        <strong>λu = ({scaled[0].toFixed(1)}, {scaled[1].toFixed(1)})</strong>
      </header>
      <label className="vector-slider">
        <span>Ponderador λ <strong>{lambda.toFixed(1)}</strong></span>
        <input
          type="range"
          min="-2"
          max="2"
          step="0.1"
          value={lambda}
          onChange={(event) => setLambda(Number(event.target.value))}
        />
      </label>
      <Plane label={`El vector u igual a 2, 1 y su múltiplo por ${lambda.toFixed(1)}`}>
        <VectorArrow className="vector-arrow vector-arrow-reference" to={u} label="u" />
        <VectorArrow className="vector-arrow vector-arrow-result" to={scaled} label="λu" />
      </Plane>
      <p className="vector-live-note" aria-live="polite">{description}</p>
    </section>
  );
}

function VectorSumLab() {
  const [step, setStep] = useState(0);
  const result = add(u, v);

  useEffect(() => {
    const timer = window.setTimeout(() => setStep((current) => (current + 1) % 3), 1700);
    return () => window.clearTimeout(timer);
  }, [step]);

  return (
    <section className="vector-lab" aria-labelledby="vector-sum-title">
      <header className="vector-lab-heading">
        <div><span>Exploración 02</span><h5 id="vector-sum-title">Suma de vectores en ℝ²</h5></div>
        <strong className="vector-sum-equation">
          <i className="vector-sum-u">u</i>
          {" + "}
          <i className="vector-sum-v">v</i>
          {" = "}
          <i className="vector-sum-result">({result[0]}, {result[1]})</i>
        </strong>
      </header>
      <Plane label="Suma geométrica de los vectores u y v mediante la regla punta con cola">
        <VectorArrow className={`vector-arrow vector-arrow-u ${step === 0 ? "is-current" : ""}`} to={u} label="u" />
        <VectorArrow className={`vector-arrow vector-arrow-v ${step === 1 ? "is-current" : ""}`} from={u} to={result} label="v" />
        <VectorArrow className={`vector-arrow vector-arrow-sum ${step === 2 ? "is-current" : ""}`} to={result} label="u + v" />
        <line className="vector-guide" x1={point(v).x} y1={point(v).y} x2={point(result).x} y2={point(result).y} />
        <VectorArrow className="vector-arrow vector-arrow-v vector-arrow-ghost" to={v} label="v" />
      </Plane>
      <div className="vector-lab-controls">
        <p aria-live="polite">
          {step === 0 ? "Primero dibujamos u." : step === 1 ? "Trasladamos v hasta la punta de u." : "El vector resultante une el origen con la nueva punta."}
        </p>
        <button type="button" onClick={() => setStep(0)}>Repetir</button>
      </div>
    </section>
  );
}

function VectorCombinationLab() {
  const samples = useMemo(() => Array.from({ length: 121 }, (_, index) => {
    const alpha = (index % 11) / 10;
    const beta = Math.floor(index / 11) / 10;
    return { alpha, beta, value: add(multiply(alpha, u), multiply(beta, v)) };
  }), []);
  const [alpha, setAlpha] = useState(0.6);
  const [beta, setBeta] = useState(0.4);
  const [playing, setPlaying] = useState(false);
  const [sampleIndex, setSampleIndex] = useState(0);
  const combination = add(multiply(alpha, u), multiply(beta, v));
  const corners = [[0, 0], u, add(u, v), v].map((value) => point(value as Vector2));

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      const next = (sampleIndex + 1) % samples.length;
      setSampleIndex(next);
      setAlpha(samples[next].alpha);
      setBeta(samples[next].beta);
      if (next === samples.length - 1) setPlaying(false);
    }, 65);
    return () => window.clearTimeout(timer);
  }, [playing, sampleIndex, samples]);

  function updateAlpha(value: number) {
    setPlaying(false);
    setAlpha(value);
  }

  function updateBeta(value: number) {
    setPlaying(false);
    setBeta(value);
  }

  function toggle() {
    if (!playing && sampleIndex === samples.length - 1) setSampleIndex(0);
    setPlaying((current) => !current);
  }

  return (
    <section className="vector-lab" aria-labelledby="vector-combination-title">
      <header className="vector-lab-heading">
        <div><span>Exploración 03</span><h5 id="vector-combination-title">Combinaciones entre 0 y 1</h5></div>
        <strong>αu + βv = ({combination[0].toFixed(1)}, {combination[1].toFixed(1)})</strong>
      </header>
      <div className="vector-pair-sliders">
        <label className="vector-slider">
          <span>α <strong>{alpha.toFixed(1)}</strong></span>
          <input type="range" min="0" max="1" step="0.1" value={alpha} onChange={(event) => updateAlpha(Number(event.target.value))} />
        </label>
        <label className="vector-slider">
          <span>β <strong>{beta.toFixed(1)}</strong></span>
          <input type="range" min="0" max="1" step="0.1" value={beta} onChange={(event) => updateBeta(Number(event.target.value))} />
        </label>
      </div>
      <Plane label="Rombo formado por las combinaciones alfa u más beta v con alfa y beta entre cero y uno">
        <polygon className="vector-span-region" points={corners.map(({ x, y }) => `${x},${y}`).join(" ")} />
        {samples.map((sample, index) => {
          const samplePoint = point(sample.value);
          return <circle className={index <= sampleIndex ? "combination-sample is-visible" : "combination-sample"} cx={samplePoint.x} cy={samplePoint.y} r="2.2" key={index} />;
        })}
        <VectorArrow className="vector-arrow vector-arrow-u" to={u} label="u" />
        <VectorArrow className="vector-arrow vector-arrow-v" to={v} label="v" />
        <circle className="combination-point" cx={point(combination).x} cy={point(combination).y} r="7" />
      </Plane>
      <div className="vector-lab-controls">
        <p>Todos los puntos αu + βv, con 0 ≤ α, β ≤ 1, llenan el rombo.</p>
        <button type="button" onClick={toggle}>{playing ? "Pausar" : sampleIndex === samples.length - 1 ? "Repetir" : "Animar"}</button>
      </div>
    </section>
  );
}

export default function VectorExplorations() {
  return (
    <div className="vector-explorations" id="exploraciones-vectores">
      <ScalarVectorLab />
      <VectorSumLab />
      <VectorCombinationLab />
    </div>
  );
}
