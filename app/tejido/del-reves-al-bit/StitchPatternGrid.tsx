"use client";

import { useState } from "react";

const SIZE = 10;
const CELLS = SIZE * SIZE;

export function StitchPatternGrid() {
  const [stitches, setStitches] = useState<boolean[]>(() => Array(CELLS).fill(false));
  const purlCount = stitches.filter(Boolean).length;

  const toggle = (index: number) => {
    setStitches((current) => current.map((stitch, cell) => cell === index ? !stitch : stitch));
  };

  return (
    <section className="stitch-pattern-builder" aria-labelledby="stitch-pattern-title">
      <header>
        <div>
          <p>DIAGRAMA INTERACTIVO · 10 × 10</p>
          <h3 id="stitch-pattern-title">Diseña un patrón</h3>
        </div>
        <p aria-live="polite"><strong>{CELLS - purlCount}</strong> derechos · <strong>{purlCount}</strong> reveses</p>
      </header>

      <div className="stitch-pattern-grid" role="group" aria-label="Cuadrícula de cien puntos de tejido">
        {stitches.map((isPurl, index) => {
          const row = Math.floor(index / SIZE) + 1;
          const column = index % SIZE + 1;
          return (
            <button
              type="button"
              className={isPurl ? "is-purl" : "is-knit"}
              aria-pressed={isPurl}
              aria-label={`Fila ${row}, columna ${column}: ${isPurl ? "revés" : "derecho"}. Cambiar a ${isPurl ? "derecho" : "revés"}`}
              onClick={() => toggle(index)}
              key={index}
            >
              <span aria-hidden="true">{isPurl ? "—" : "V"}</span>
            </button>
          );
        })}
      </div>

      <footer>
        <div className="stitch-pattern-legend"><span><i className="knit-swatch" />V · derecho</span><span><i className="purl-swatch" />— · revés</span></div>
        <div className="stitch-pattern-actions">
          <button type="button" onClick={() => setStitches((current) => current.map((stitch) => !stitch))}>Invertir patrón</button>
          <button type="button" className="secondary" onClick={() => setStitches(Array(CELLS).fill(false))}>Todo derecho</button>
        </div>
      </footer>
      <p className="stitch-pattern-hint">Toca una casilla para cambiarla de derecho a revés. Al invertir el patrón, cada punto cambia al estado opuesto.</p>
    </section>
  );
}
