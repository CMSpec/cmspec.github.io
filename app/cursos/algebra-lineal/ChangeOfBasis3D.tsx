"use client";

import { useEffect, useState } from "react";

type Vector3 = [number, number, number];

const vectorX: Vector3 = [2, 1, 1];
const center = { x: 275, y: 220 };
const scale = 62;

function project([x, y, z]: Vector3) {
  return {
    x: center.x + scale * (x - 0.72 * y),
    y: center.y - scale * (0.38 * x + 0.38 * y + z),
  };
}

function basisAt(progress: number): Vector3[] {
  const theta = progress * 35 * Math.PI / 180;
  const phi = progress * 28 * Math.PI / 180;
  return [
    [Math.cos(theta), Math.sin(theta), 0],
    [-Math.sin(theta) * Math.cos(phi), Math.cos(theta) * Math.cos(phi), Math.sin(phi)],
    [Math.sin(theta) * Math.sin(phi), -Math.cos(theta) * Math.sin(phi), Math.cos(phi)],
  ];
}

function dot(a: Vector3, b: Vector3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

export default function ChangeOfBasis3D() {
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const basis = basisAt(progress);
  const coordinates = basis.map((axis) => dot(vectorX, axis));

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setProgress((current) => {
        const next = Math.min(1, current + 0.02);
        if (next === 1) setPlaying(false);
        return next;
      });
    }, 55);
    return () => window.clearTimeout(timer);
  }, [playing, progress]);

  function toggle() {
    if (!playing && progress === 1) setProgress(0);
    setPlaying((current) => !current);
  }

  const origin = project([0, 0, 0]);
  const endpoint = project(vectorX);
  const planeCorners: Vector3[] = [[-2.5, -2.5, 0], [2.5, -2.5, 0], [2.5, 2.5, 0], [-2.5, 2.5, 0]];

  return (
    <section className="basis-3d-lab" id="cambio-base-3d" aria-labelledby="basis-3d-title">
      <header className="vector-lab-heading">
        <div><span>Exploración 3D</span><h5 id="basis-3d-title">El vector no cambia; cambian sus coordenadas</h5></div>
        <strong>[x]ᵦ = ({coordinates.map((value) => value.toFixed(2)).join(", ")})</strong>
      </header>
      <label className="vector-slider">
        <span>Transición hacia la base B <strong>{Math.round(progress * 100)}%</strong></span>
        <input type="range" min="0" max="1" step="0.01" value={progress} onChange={(event) => { setPlaying(false); setProgress(Number(event.target.value)); }} />
      </label>
      <svg className="basis-3d-scene" viewBox="0 0 550 430" role="img" aria-label="Un vector fijo expresado en una base tridimensional que gira">
        <defs>
          <marker id="basis-arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="context-stroke" />
          </marker>
        </defs>
        <polygon className="basis-plane" points={planeCorners.map((corner) => { const p = project(corner); return `${p.x},${p.y}`; }).join(" ")} />
        {[-2, -1, 0, 1, 2].flatMap((value) => {
          const a = project([value, -2.5, 0]);
          const b = project([value, 2.5, 0]);
          const c = project([-2.5, value, 0]);
          const d = project([2.5, value, 0]);
          return [
            <line className="basis-grid-line" x1={a.x} y1={a.y} x2={b.x} y2={b.y} key={`x-${value}`} />,
            <line className="basis-grid-line" x1={c.x} y1={c.y} x2={d.x} y2={d.y} key={`y-${value}`} />,
          ];
        })}
        {basis.map((axis, index) => {
          const end = project(axis.map((value) => value * 2.25) as Vector3);
          return (
            <g className={`basis-axis basis-axis-${index + 1}`} key={index}>
              <line x1={origin.x} y1={origin.y} x2={end.x} y2={end.y} markerEnd="url(#basis-arrowhead)" />
              <text x={end.x + 8} y={end.y - 7}>b{index + 1}</text>
            </g>
          );
        })}
        <g className="basis-fixed-vector">
          <line x1={origin.x} y1={origin.y} x2={endpoint.x} y2={endpoint.y} markerEnd="url(#basis-arrowhead)" />
          <text x={endpoint.x + 10} y={endpoint.y - 8}>x</text>
        </g>
      </svg>
      <div className="vector-lab-controls">
        <p aria-live="polite">{progress < 0.02 ? "En la base canónica, x = (2, 1, 1)." : "La flecha x permanece fija mientras giran los ejes y cambian sus coordenadas."}</p>
        <button type="button" onClick={toggle}>{playing ? "Pausar" : progress === 1 ? "Repetir" : "Animar cambio"}</button>
      </div>
    </section>
  );
}
