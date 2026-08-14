"use client";

import { useMemo, useState } from "react";

type Triple = [number, number, number];

const primes = [2, 3, 5, 7] as const;

function mod(value: number, q: number) {
  return ((value % q) + q) % q;
}

function projectiveTriples(q: number) {
  const triples: Triple[] = [];
  for (let y = q - 1; y >= 0; y -= 1) {
    for (let x = 0; x < q; x += 1) triples.push([x, y, 1]);
  }
  for (let slope = 0; slope < q; slope += 1) triples.push([1, slope, 0]);
  triples.push([0, 1, 0]);
  return triples;
}

function incident(point: Triple, line: Triple, q: number) {
  return mod(point[0] * line[0] + point[1] * line[1] + point[2] * line[2], q) === 0;
}

function tuple([a, b, c]: Triple) {
  return `[${a}:${b}:${c}]`;
}

function equation([a, b, c]: Triple) {
  const terms = [a && `${a === 1 ? "" : a}x`, b && `${b === 1 ? "" : b}y`, c && `${c}`].filter(Boolean);
  return `${terms.join(" + ") || "0"} = 0`;
}

export default function FiniteProjectiveCards() {
  const [q, setQ] = useState<number>(7);
  const [lineA, setLineA] = useState(0);
  const [lineB, setLineB] = useState(1);

  const points = useMemo(() => projectiveTriples(q), [q]);
  const lines = points;
  const selectedA = lines[lineA] ?? lines[0];
  const selectedB = lines[lineB] ?? lines[1];
  const pointsA = points.filter((point) => incident(point, selectedA, q));
  const pointsB = points.filter((point) => incident(point, selectedB, q));
  const shared = pointsA.find((point) => incident(point, selectedB, q)) ?? pointsA[0];
  const sharedKey = shared.join("-");
  const affine = points.filter((point) => point[2] !== 0);
  const infinity = points.filter((point) => point[2] === 0);

  function changeField(nextQ: number) {
    setQ(nextQ);
    setLineA(0);
    setLineB(1);
  }

  function changeLine(which: "a" | "b", value: number) {
    if (which === "a") {
      setLineA(value);
      if (value === lineB) setLineB((value + 1) % lines.length);
    } else {
      setLineB(value);
      if (value === lineA) setLineA((value + 1) % lines.length);
    }
  }

  function pointClass(point: Triple) {
    const onA = incident(point, selectedA, q);
    const onB = incident(point, selectedB, q);
    return onA && onB ? "is-shared" : onA ? "is-line-a" : onB ? "is-line-b" : "";
  }

  return (
    <figure className="finite-projective-explorer" id="cartas-proyectivas">
      <figcaption>
        <span>EXPLORACIÓN · GEOMETRÍA FINITA</span>
        <strong>De rectas a cartas</strong>
        <p>Cada recta reúne q+1 puntos. Elige dos: su única intersección se convierte en el símbolo compartido por ambas cartas.</p>
      </figcaption>

      <div className="finite-field-controls">
        <div>
          <small>CUERPO FINITO</small>
          <div className="finite-field-buttons" aria-label="Elegir el cuerpo finito">
            {primes.map((prime) => <button className={q === prime ? "is-active" : ""} key={prime} onClick={() => changeField(prime)}>F<sub>{prime}</sub></button>)}
          </div>
        </div>
        <div className="finite-line-selectors">
          <label><span>RECTA A · AZUL</span><select value={lineA} onChange={(event) => changeLine("a", Number(event.target.value))}>{lines.map((line, index) => <option value={index} key={`a-${line.join("-")}`}>{equation(line)}</option>)}</select></label>
          <label><span>RECTA B · OLIVA</span><select value={lineB} onChange={(event) => changeLine("b", Number(event.target.value))}>{lines.map((line, index) => <option value={index} key={`b-${line.join("-")}`}>{equation(line)}</option>)}</select></label>
        </div>
      </div>

      <div className="finite-projective-stage">
        <section className="finite-point-space" aria-label={`Puntos de PG(2,${q})`}>
          <header><strong>PG(2,{q})</strong><span>{points.length} puntos · {points.length} rectas</span></header>
          <div className="finite-affine-grid" style={{ gridTemplateColumns: `repeat(${q}, minmax(0, 1fr))`, backgroundSize: `${100 / q}% ${100 / q}%` }}>
            {affine.map((point) => <span className={`finite-point ${pointClass(point)}`} title={tuple(point)} key={point.join("-")}><i /><small>{tuple(point)}</small></span>)}
          </div>
          <div className="finite-infinity-row">
            <strong>∞</strong>
            {infinity.map((point) => <span className={`finite-point ${pointClass(point)}`} title={tuple(point)} key={point.join("-")}><i /><small>{tuple(point)}</small></span>)}
          </div>
          <p><i className="legend-a" /> recta A <i className="legend-b" /> recta B <i className="legend-shared" /> intersección</p>
        </section>

        <section className="finite-card-pair" aria-label="Dos cartas construidas con rectas proyectivas">
          {[{ name: "Carta A", line: selectedA, cardPoints: pointsA }, { name: "Carta B", line: selectedB, cardPoints: pointsB }].map((card) => (
            <article className="finite-projective-card" key={card.name}>
              <header><strong>{card.name}</strong><span>{equation(card.line)}</span></header>
              <div>{card.cardPoints.map((point, index) => <span className={point.join("-") === sharedKey ? "is-shared" : ""} title={tuple(point)} key={point.join("-")}><i>{index + 1}</i><small>{tuple(point)}</small></span>)}</div>
            </article>
          ))}
          <p className="finite-shared-result"><span>ÚNICA COINCIDENCIA</span><strong>{tuple(shared)}</strong><small>Las demás coordenadas aparecen en una sola de las dos cartas.</small></p>
        </section>
      </div>
    </figure>
  );
}
