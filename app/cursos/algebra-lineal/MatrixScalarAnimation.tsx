"use client";

import { useEffect, useState } from "react";

const entries = [2, -1, 4, -1, 5, 2];

export default function MatrixScalarAnimation() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;

    const timer = window.setTimeout(() => {
      if (step < entries.length - 1) {
        setStep((current) => current + 1);
      } else {
        setPlaying(false);
      }
    }, 900);

    return () => window.clearTimeout(timer);
  }, [playing, step]);

  const complete = step === entries.length - 1 && !playing;
  const activeValue = entries[step];

  function toggleAnimation() {
    if (complete) {
      setStep(0);
      setPlaying(true);
      return;
    }
    setPlaying((current) => !current);
  }

  return (
    <section id="unidad-1-a0000000036" className="matrix-scalar-animation ejem_thmwrapper" aria-labelledby="matrix-scalar-title">
      <header className="matrix-animation-heading">
        <div>
          <span>Ejemplo</span>
          <strong>1.19</strong>
        </div>
        <p id="matrix-scalar-title">Multiplicación de una matriz por el escalar 3</p>
      </header>

      <div className="matrix-animation-stage">
        <strong className="matrix-scalar" aria-label="tres por">3 ×</strong>
        <div className="animated-matrix source-matrix" aria-label="Matriz original">
          {entries.map((value, index) => (
            <span className={index === step ? "is-active" : ""} key={`source-${index}`}>{value}</span>
          ))}
        </div>
        <span className="matrix-equals" aria-hidden="true">=</span>
        <div className="animated-matrix result-matrix" aria-label="Matriz resultante">
          {entries.map((value, index) => (
            <span
              className={`${index <= step ? "is-revealed" : ""} ${index === step ? "is-active" : ""}`}
              key={`result-${index}`}
            >
              {index <= step ? value * 3 : "·"}
            </span>
          ))}
        </div>
      </div>

      <div className="matrix-animation-controls">
        <p aria-live="polite">
          {complete ? "Resultado final" : `Entrada ${step + 1} de ${entries.length}: 3 × (${activeValue}) = ${activeValue * 3}`}
        </p>
        <button type="button" onClick={toggleAnimation}>
          {complete ? "Repetir" : playing ? "Pausar" : "Continuar"}
        </button>
      </div>
    </section>
  );
}
