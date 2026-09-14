"use client";

import { useState } from "react";

export function FunctionNotationDiagram() {
  return (
    <figure className="function-notation-diagram">
      <header><span>LECTURA DE LA NOTACIÓN</span><h5>Todo lo que define a una función</h5></header>
      <svg viewBox="0 0 820 390" role="img" aria-labelledby="function-map-title function-map-description">
        <title id="function-map-title">Diagrama de una función f desde A hasta B</title>
        <desc id="function-map-description">A es el conjunto de partida al que pertenece x, B es el conjunto de llegada al que pertenece f de x, y f de x es la regla que transforma x en un nuevo número.</desc>
        <defs>
          <marker id="function-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" /></marker>
        </defs>
        <text className="map-function-name" x="410" y="57" textAnchor="middle">f</text>
        <text className="map-function-note" x="410" y="82" textAnchor="middle">nombre de la función</text>
        <ellipse className="map-set set-a" cx="205" cy="210" rx="145" ry="120" />
        <ellipse className="map-set set-b" cx="615" cy="210" rx="145" ry="120" />
        <text className="map-set-name" x="205" y="130" textAnchor="middle">A</text>
        <text className="map-set-name" x="615" y="130" textAnchor="middle">B</text>
        <text className="map-set-description" x="205" y="355" textAnchor="middle">conjunto de partida</text>
        <text className="map-set-description" x="615" y="355" textAnchor="middle">conjunto de llegada</text>
        <circle className="map-value source" cx="205" cy="215" r="27" />
        <circle className="map-value image" cx="615" cy="215" r="34" />
        <text className="map-value-label" x="205" y="222" textAnchor="middle">x</text>
        <text className="map-value-label image-label" x="615" y="222" textAnchor="middle">f(x)</text>
        <path className="map-arrow" d="M242 215 C350 145,470 145,572 215" markerEnd="url(#function-arrow)" />
        <text className="map-rule" x="410" y="160" textAnchor="middle">regla f(x)</text>
        <text className="map-membership" x="205" y="274" textAnchor="middle">x ∈ A</text>
        <text className="map-membership" x="615" y="279" textAnchor="middle">f(x) ∈ B</text>
      </svg>
      <div className="function-notation-key">
        <p><strong>f</strong><span>es el nombre de la función.</span></p>
        <p><strong>A</strong><span>es el conjunto de partida, donde vive <i>x</i>.</span></p>
        <p><strong>B</strong><span>es el conjunto de llegada, donde vive <i>f(x)</i>.</span></p>
        <p><strong>f(x)</strong><span>es la regla que transforma el número <i>x</i> en el nuevo número <i>f(x)</i>.</span></p>
      </div>
      <figcaption><strong>Una función es el conjunto de estos datos.</strong> Si cambia el nombre, el conjunto de partida, el conjunto de llegada o la regla, cambia la función.</figcaption>
    </figure>
  );
}

const width = 650;
const height = 360;
const xMin = -4;
const xMax = 4;
const yMin = -1;
const yMax = 8;
const pad = { left: 54, right: 28, top: 24, bottom: 46 };
const sx = (x: number) => pad.left + ((x - xMin) / (xMax - xMin)) * (width - pad.left - pad.right);
const sy = (y: number) => height - pad.bottom - ((y - yMin) / (yMax - yMin)) * (height - pad.top - pad.bottom);
const fn = (x: number) => 0.5 * x * x - x + 1;

export function FunctionInputExplorer() {
  const [x, setX] = useState(-1.5);
  const y = fn(x);
  const curve = Array.from({ length: 161 }, (_, index) => {
    const value = xMin + (index / 160) * (xMax - xMin);
    return `${index ? "L" : "M"}${sx(value).toFixed(1)},${sy(fn(value)).toFixed(1)}`;
  }).join(" ");

  return (
    <figure className="function-input-explorer">
      <header>
        <div><span>EXPLORACIÓN INTERACTIVA</span><h5>De x a f(x), sobre la gráfica</h5></div>
        <strong>f({x.toFixed(1)}) = {y.toFixed(2)}</strong>
      </header>
      <div className="function-input-stage">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Gráfica de la función con x igual a ${x.toFixed(1)} y f de x igual a ${y.toFixed(2)}`}>
          <g className="function-graph-grid">
            {[-4,-3,-2,-1,0,1,2,3,4].map((tick) => <line key={`x${tick}`} x1={sx(tick)} y1={pad.top} x2={sx(tick)} y2={height-pad.bottom} />)}
            {[0,1,2,3,4,5,6,7,8].map((tick) => <line key={`y${tick}`} x1={pad.left} y1={sy(tick)} x2={width-pad.right} y2={sy(tick)} />)}
          </g>
          <line className="function-axis" x1={pad.left} y1={sy(0)} x2={width-pad.right} y2={sy(0)} />
          <line className="function-axis" x1={sx(0)} y1={pad.top} x2={sx(0)} y2={height-pad.bottom} />
          <path className="function-graph-curve" d={curve} />
          <line className="function-input-guide x-guide" x1={sx(x)} y1={sy(0)} x2={sx(x)} y2={sy(y)} />
          <line className="function-input-guide y-guide" x1={sx(0)} y1={sy(y)} x2={sx(x)} y2={sy(y)} />
          <circle className="function-graph-point" cx={sx(x)} cy={sy(y)} r="7" />
          <text className="graph-x-label" x={sx(x)} y={sy(0)+25} textAnchor="middle">x = {x.toFixed(1)}</text>
          <text className="graph-y-label" x={sx(0)-10} y={sy(y)+5} textAnchor="end">f(x) = {y.toFixed(2)}</text>
          <text className="graph-function-label" x={sx(2.45)} y={sy(fn(2.45))-12}>f(x)=½x²−x+1</text>
        </svg>
        <div className="function-value-machine">
          <span>ENTRADA</span><strong>{x.toFixed(1)}</strong><i aria-hidden="true">→</i><small>aplicar f(x)</small><i aria-hidden="true">→</i><span>SALIDA</span><strong>{y.toFixed(2)}</strong>
        </div>
      </div>
      <label><span>Mueve el valor de <b>x</b></span><input type="range" min="-3" max="3" step="0.1" value={x} onChange={(event) => setX(Number(event.target.value))} /></label>
      <figcaption>El punto siempre tiene coordenadas <strong>(x, f(x))</strong>. Al cambiar la entrada <i>x</i>, la regla de la función produce una nueva salida y desplaza el punto sobre la gráfica.</figcaption>
    </figure>
  );
}
