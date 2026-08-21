"use client";

import { useMemo, useState } from "react";

type FieldKind = "conservative" | "rotational";

const WIDTH = 760;
const HEIGHT = 430;
const ORIGIN = { x: 380, y: 220 };
const SCALE = 78;

function toScreen(x: number, y: number) {
  return { x: ORIGIN.x + x * SCALE, y: ORIGIN.y - y * SCALE };
}

function pathPoint(path: number, t: number) {
  if (path === 0) return { x: -2 + 4 * t, y: -1 + 2.8 * t };
  return { x: -2 + 4 * t, y: -1 + 2.8 * t + 1.15 * Math.sin(Math.PI * t) };
}

function pathD(path: number, progress = 1) {
  const count = Math.max(2, Math.round(100 * progress));
  return Array.from({ length: count + 1 }, (_, index) => {
    const point = pathPoint(path, progress * index / count);
    const screen = toScreen(point.x, point.y);
    return `${index ? "L" : "M"}${screen.x.toFixed(2)},${screen.y.toFixed(2)}`;
  }).join(" ");
}

function fieldVector(kind: FieldKind, x: number, y: number) {
  return kind === "conservative" ? { x, y } : { x: -y, y: x };
}

function numericalWork(kind: FieldKind, path: number, progress: number) {
  const steps = 240;
  let work = 0;
  for (let index = 0; index < steps; index += 1) {
    const t0 = progress * index / steps;
    const t1 = progress * (index + 1) / steps;
    const p0 = pathPoint(path, t0);
    const p1 = pathPoint(path, t1);
    const midpoint = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
    const vector = fieldVector(kind, midpoint.x, midpoint.y);
    work += vector.x * (p1.x - p0.x) + vector.y * (p1.y - p0.y);
  }
  return work;
}

export default function LineIntegralPathsExplorer() {
  const [kind, setKind] = useState<FieldKind>("conservative");
  const [path, setPath] = useState(0);
  const [progress, setProgress] = useState(100);
  const current = toScreen(pathPoint(path, progress / 100).x, pathPoint(path, progress / 100).y);
  const work = numericalWork(kind, path, progress / 100);
  const fullOtherWork = numericalWork(kind, path === 0 ? 1 : 0, 1);
  const arrows = useMemo(() => {
    const values = [];
    for (let x = -3; x <= 3; x += 1) for (let y = -2; y <= 2; y += 1) {
      if (x === 0 && y === 0) continue;
      const vector = fieldVector(kind, x, y);
      const norm = Math.max(1, Math.hypot(vector.x, vector.y));
      const start = toScreen(x, y);
      values.push({ key: `${x}-${y}`, x1: start.x, y1: start.y, x2: start.x + vector.x / norm * 24, y2: start.y - vector.y / norm * 24 });
    }
    return values;
  }, [kind]);

  const fieldName = kind === "conservative" ? "F(x,y)=(x,y)" : "F(x,y)=(−y,x)";
  const conclusion = kind === "conservative"
    ? "El trabajo total coincide para ambos caminos: solo importan los extremos."
    : "El trabajo depende del camino: el campo acumula circulación.";

  return (
    <figure className="vector-concept-explorer line-integral-explorer" id="integral-linea-campos-interactivo">
      <figcaption>
        <div><span>EXPLORACIÓN · INTEGRALES DE LÍNEA</span><h5>¿Importa el camino recorrido?</h5><p>Compara una trayectoria recta con una curva entre los mismos puntos. El deslizador acumula el trabajo realizado por el campo.</p></div>
        <strong>∫<sub>C</sub> F·dr</strong>
      </figcaption>
      <div className="concept-mode-row" role="group" aria-label="Elegir campo vectorial">
        <button type="button" className={kind === "conservative" ? "is-active" : ""} onClick={() => setKind("conservative")}>Campo conservativo</button>
        <button type="button" className={kind === "rotational" ? "is-active" : ""} onClick={() => setKind("rotational")}>Campo rotacional</button>
        <span>{fieldName}</span>
      </div>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`Dos caminos en el campo ${fieldName}`}>
        <defs>
          <marker id="line-field-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#9bbcc4" /></marker>
        </defs>
        <rect width={WIDTH} height={HEIGHT} fill="#fff" />
        <g className="concept-grid">{Array.from({ length: 9 }, (_, i) => <line key={`v${i}`} x1={68 + i * 78} y1="30" x2={68 + i * 78} y2="400" />)}{Array.from({ length: 5 }, (_, i) => <line key={`h${i}`} x1="45" y1={64 + i * 78} x2="715" y2={64 + i * 78} />)}</g>
        <line x1="45" y1={ORIGIN.y} x2="715" y2={ORIGIN.y} className="concept-axis" /><line x1={ORIGIN.x} y1="25" x2={ORIGIN.x} y2="405" className="concept-axis" />
        {arrows.map((arrow) => <line {...arrow} key={arrow.key} className="line-field-vector" markerEnd="url(#line-field-arrow)" />)}
        <path d={pathD(0)} className={`line-path path-a ${path === 0 ? "is-selected" : ""}`} /><path d={pathD(1)} className={`line-path path-b ${path === 1 ? "is-selected" : ""}`} />
        <path d={pathD(path, progress / 100)} className="line-path-progress" />
        <circle {...toScreen(-2, -1)} r="8" className="line-endpoint" /><circle {...toScreen(2, 1.8)} r="8" className="line-endpoint" />
        <circle cx={current.x} cy={current.y} r="10" className="line-traveller" />
        <text x={toScreen(-2, -1).x - 28} y={toScreen(-2, -1).y + 28} className="concept-label">A</text><text x={toScreen(2, 1.8).x + 13} y={toScreen(2, 1.8).y - 10} className="concept-label">B</text>
      </svg>
      <div className="line-integral-controls">
        <div className="path-buttons"><button type="button" className={path === 0 ? "is-active" : ""} onClick={() => setPath(0)}>Camino recto</button><button type="button" className={path === 1 ? "is-active" : ""} onClick={() => setPath(1)}>Camino curvo</button></div>
        <label htmlFor="line-progress">Recorrido <output>{progress}%</output></label><input id="line-progress" type="range" min="0" max="100" value={progress} onChange={(event) => setProgress(Number(event.target.value))} />
        <p>Trabajo acumulado: <strong>{work.toFixed(2)}</strong></p><p>Otro camino completo: <strong>{fullOtherWork.toFixed(2)}</strong></p>
      </div>
      <p className="topology-note">{conclusion}</p>
    </figure>
  );
}
