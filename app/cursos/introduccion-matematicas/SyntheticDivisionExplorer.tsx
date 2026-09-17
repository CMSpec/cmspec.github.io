"use client";

import { useEffect, useId, useState } from "react";

const coefficients = [2, -3, 4, -5];
const results = [2, 1, 6, 7];
const products = [0, 4, 2, 12];
const explanations = [
  "Ordena el polinomio por potencias decrecientes: 2, −3, 4, −5. Como el divisor es x−2, colocamos 2 a la izquierda. Si faltara una potencia, escribiríamos un coeficiente 0.",
  "Baja el primer coeficiente, 2, sin modificarlo. Es el primer coeficiente del cociente.",
  "Multiplica el 2 que acabas de bajar por el 2 del divisor: 2 × 2 = 4. Coloca el 4 debajo del siguiente coeficiente, −3.",
  "Suma la columna: −3 + 4 = 1. Escribe 1 en la fila inferior.",
  "Multiplica el último resultado por 2: 1 × 2 = 2. Coloca el producto debajo del siguiente coeficiente, 4.",
  "Suma la columna: 4 + 2 = 6. Escribe 6 en la fila inferior.",
  "Multiplica el último resultado por 2: 6 × 2 = 12. Coloca el producto debajo del último coeficiente, −5.",
  "Suma la última columna: −5 + 12 = 7. Los primeros tres resultados forman el cociente; el último es el resto.",
];
const fmt = (n: number) => String(n).replace("-", "−");

export default function SyntheticDivisionExplorer() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [delay, setDelay] = useState(2400);
  const arrowId = useId();
  useEffect(() => {
    if (!playing || step === 7) return;
    const timer = window.setTimeout(() => setStep(value => value + 1), delay);
    return () => window.clearTimeout(timer);
  }, [playing, step, delay]);
  const move = (next: number) => { setPlaying(false); setStep(next); };
  const activeColumn = step === 0 ? -1 : Math.floor(step / 2);
  const multiply = step > 0 && step % 2 === 0;
  const x = (column: number) => 170 + column * 110;
  const descriptionId = useId();
  return <div className="intro-explorer synthetic-explorer">
    <h5>División sintética, paso a paso</h5>
    <p>Dividimos <strong>2x³ − 3x² + 4x − 5</strong> por <strong>x − 2</strong>. Sigue el ciclo: bajar → multiplicar → sumar.</p>
    <svg viewBox="0 0 580 330" role="img" aria-label={`División sintética. Paso ${step} de 7.`} aria-describedby={descriptionId}>
      <defs><marker id={arrowId} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#007190"/></marker></defs>
      {activeColumn >= 0 && <rect x={x(activeColumn)-37} y="50" width="74" height="208" rx="12" fill="#afd472" opacity=".2"/>}
      <path d="M112 55V194H535" fill="none" stroke="currentColor" strokeWidth="2"/>
      <text x="68" y="35" className="synthetic-label">a = 2</text>
      <text x="68" y="90" className={multiply ? "synthetic-active" : ""}>2</text>
      {coefficients.map((value, col) => <g key={col}>
        <text x={x(col)} y="35" className="synthetic-label">{["x³", "x²", "x", "1"][col]}</text>
        <text x={x(col)} y="90">{fmt(value)}</text>
        {col > 0 && step >= col * 2 && <text key={`product-${col}`} x={x(col)} y="166" className={step === col * 2 ? "synthetic-new synthetic-active" : ""}>{products[col]}</text>}
        {step >= col * 2 + 1 && <text key={`result-${col}`} x={x(col)} y="233" className={step === col * 2 + 1 ? "synthetic-new synthetic-active" : ""}>{results[col]}</text>}
      </g>)}
      {step > 0 && <g key={step} className="synthetic-new">
        <path d={multiply ? `M${x(activeColumn-1)+20} 220Q${x(activeColumn)} 270 ${x(activeColumn)+34} 178` : `M${x(activeColumn)-25} ${step === 1 ? 106 : 153}V211`} fill="none" stroke="#007190" strokeWidth="2.5" markerEnd={`url(#${arrowId})`}/>
        {multiply && <text x={x(activeColumn)-3} y="285" className="synthetic-label">× 2</text>}
      </g>}
      {step === 7 && <g className="synthetic-new"><path d="M145 256V267H415V256 M465 256V267H525V256" stroke="#007190" fill="none"/><text x="280" y="300" className="synthetic-label">Cociente: 2x² + x + 6</text><text x="495" y="300" className="synthetic-label">Resto: 7</text></g>}
    </svg>
    <p id={descriptionId} className="synthetic-explanation" role="status" aria-live="polite"><strong>Paso {step} de 7. </strong>{explanations[step]}</p>
    <div className="synthetic-controls">
      <button type="button" onClick={() => move(0)} disabled={step === 0 && !playing}>Reiniciar</button>
      <button type="button" onClick={() => move(step-1)} disabled={step === 0}>Anterior</button>
      <button type="button" onClick={() => { if (step === 7) { setStep(0); setPlaying(true); } else setPlaying(value => !value); }}>{playing && step < 7 ? "Pausar" : step === 7 ? "Repetir animación" : "Reproducir"}</button>
      <button type="button" onClick={() => move(step+1)} disabled={step === 7}>Siguiente</button>
      <label>Ritmo <select value={delay} onChange={event => setDelay(Number(event.target.value))}><option value={4000}>Lento</option><option value={2400}>Normal</option><option value={1200}>Rápido</option></select></label>
    </div>
    {step === 7 && <div className="synthetic-result"><strong>Resultado y comprobación</strong><p>2x³ − 3x² + 4x − 5 = (x − 2)(2x² + x + 6) + 7.</p><p>El cociente tiene grado 2, uno menos que el polinomio inicial. Como el resto es 7 y no 0, x − 2 no es un factor del polinomio.</p></div>}
  </div>;
}
