"use client";

import { useEffect, useState } from "react";

export function useSteppedAnimation(length: number) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (step < length - 1) setStep((current) => current + 1);
      else setPlaying(false);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [length, playing, step]);

  const complete = step === length - 1 && !playing;

  function toggle() {
    if (complete) {
      setStep(0);
      setPlaying(true);
    } else {
      setPlaying((current) => !current);
    }
  }

  return { step, playing, complete, toggle };
}

function Matrix({ values, step, reveal = false, label }: { values: number[]; step: number; reveal?: boolean; label: string }) {
  return (
    <div className="matrix-animation-block">
      <span>{label}</span>
      <div className={`animated-matrix ${reveal ? "result-matrix" : "source-matrix"}`} aria-label={label}>
        {values.map((value, index) => (
          <span
            className={`${!reveal || index <= step ? "is-revealed" : ""} ${index === step ? "is-active" : ""}`}
            key={`${label}-${index}`}
          >
            {!reveal || index <= step ? value : "·"}
          </span>
        ))}
      </div>
    </div>
  );
}

export function MatrixAdditionAnimation() {
  const left = [1, 4, 0, -2, 6, 5];
  const right = [-3, 1, -1, 3, 0, 2];
  const result = left.map((value, index) => value + right[index]);
  const animation = useSteppedAnimation(left.length);

  return (
    <section id="unidad-1-a0000000027" className="matrix-operation-animation ejem_thmwrapper" aria-labelledby="matrix-addition-title">
      <header className="matrix-animation-heading">
        <div><span>Ejemplo</span><strong>1.13</strong></div>
        <p id="matrix-addition-title">Suma de matrices entrada por entrada</p>
      </header>
      <div className="matrix-addition-stage">
        <Matrix values={left} step={animation.step} label="Matriz A" />
        <span className="matrix-operator" aria-hidden="true">+</span>
        <Matrix values={right} step={animation.step} label="Matriz B" />
        <span className="matrix-operator" aria-hidden="true">=</span>
        <Matrix values={result} step={animation.step} reveal label="Resultado" />
      </div>
      <div className="matrix-animation-controls">
        <p aria-live="polite">
          {animation.complete ? "Matriz suma completa" : `Entrada ${animation.step + 1} de ${left.length}: ${left[animation.step]} + (${right[animation.step]}) = ${result[animation.step]}`}
        </p>
        <button type="button" onClick={animation.toggle}>{animation.complete ? "Repetir" : animation.playing ? "Pausar" : "Continuar"}</button>
      </div>
    </section>
  );
}

export function DotProductAnimation() {
  const vectorA = [-4, -2, 3];
  const vectorB = [3, -2, -5];
  const products = vectorA.map((value, index) => value * vectorB[index]);
  const animation = useSteppedAnimation(vectorA.length);

  return (
    <section id="unidad-1-a0000000043" className="dot-product-animation ejem_thmwrapper" aria-labelledby="dot-product-title">
      <header className="matrix-animation-heading">
        <div><span>Ejemplo</span><strong>1.22</strong></div>
        <p id="dot-product-title">Producto punto coordenada por coordenada</p>
      </header>
      <div className="dot-product-stage">
        <div className="dot-product-vectors">
          {[{ label: "a", values: vectorA }, { label: "b", values: vectorB }].map((vector) => (
            <div className="animated-vector" key={vector.label}>
              <strong>{vector.label} =</strong>
              <div>
                {vector.values.map((value, index) => (
                  <span className={index === animation.step ? "is-active" : ""} key={`${vector.label}-${index}`}>{value}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="dot-product-terms" aria-label="Productos de las coordenadas">
          {products.map((product, index) => (
            <div className={`${index <= animation.step ? "is-revealed" : ""} ${index === animation.step ? "is-active" : ""}`} key={`term-${index}`}>
              <span>({vectorA[index]})({vectorB[index]})</span>
              <strong>{index <= animation.step ? product : "·"}</strong>
            </div>
          ))}
        </div>
        <p className={`dot-product-result ${animation.complete ? "is-visible" : ""}`}>
          −12 + 4 − 15 = <strong>−23</strong>
        </p>
      </div>
      <div className="matrix-animation-controls">
        <p aria-live="polite">
          {animation.complete ? "Producto punto: −12 + 4 − 15 = −23" : `Coordenada ${animation.step + 1}: (${vectorA[animation.step]})(${vectorB[animation.step]}) = ${products[animation.step]}`}
        </p>
        <button type="button" onClick={animation.toggle}>{animation.complete ? "Repetir" : animation.playing ? "Pausar" : "Continuar"}</button>
      </div>
    </section>
  );
}
