"use client";

import { useSteppedAnimation } from "./MatrixOperationsAnimations";

type RowStep = {
  before: Array<Array<number | string>>;
  after: Array<Array<number | string>>;
  calculation: string;
  explanation: string;
  operation: string;
  sourceRows: number[];
  targetRow: number;
};

const steps: RowStep[] = [
  {
    before: [[2, 1, -3], [5, -4, 1], [1, -1, -4]],
    after: [[1, -1, -4], [5, -4, 1], [2, 1, -3]],
    operation: "F₁ ↔ F₃",
    explanation: "Intercambiamos la primera y la tercera fila.",
    calculation: "La fila (1, −1, −4) pasa arriba y (2, 1, −3) pasa abajo.",
    sourceRows: [0, 2],
    targetRow: 0,
  },
  {
    before: [[1, -1, -4], [5, -4, 1], [2, 1, -3]],
    after: [[1, -1, -4], [2, 1, -3], [5, -4, 1]],
    operation: "F₂ ↔ F₃",
    explanation: "Intercambiamos la segunda y la tercera fila.",
    calculation: "La fila (2, 1, −3) queda en la segunda posición.",
    sourceRows: [1, 2],
    targetRow: 1,
  },
  {
    before: [[1, -1, -4], [2, 1, -3], [5, -4, 1]],
    after: [[1, -1, -4], [2, 1, -3], [0, 1, 21]],
    operation: "F₃ ← F₃ − 5F₁",
    explanation: "Restamos cinco veces la primera fila a la tercera.",
    calculation: "(5, −4, 1) − 5(1, −1, −4) = (0, 1, 21)",
    sourceRows: [0],
    targetRow: 2,
  },
  {
    before: [[1, -1, -4], [2, 1, -3], [0, 1, 21]],
    after: [[1, -1, -4], [0, 3, 5], [0, 1, 21]],
    operation: "F₂ ← F₂ − 2F₁",
    explanation: "Restamos dos veces la primera fila a la segunda.",
    calculation: "(2, 1, −3) − 2(1, −1, −4) = (0, 3, 5)",
    sourceRows: [0],
    targetRow: 1,
  },
  {
    before: [[1, -1, -4], [0, 3, 5], [0, 1, 21]],
    after: [[1, -1, -4], [0, 3, 5], [0, 0, "58/3"]],
    operation: "F₃ ← F₃ − ⅓F₂",
    explanation: "Restamos un tercio de la segunda fila a la tercera.",
    calculation: "(0, 1, 21) − ⅓(0, 3, 5) = (0, 0, 58/3)",
    sourceRows: [1],
    targetRow: 2,
  },
];

function RowMatrix({
  activeRows = [],
  label,
  targetRow,
  values,
}: {
  activeRows?: number[];
  label: string;
  targetRow?: number;
  values: Array<Array<number | string>>;
}) {
  return (
    <div className="row-matrix-block">
      <span>{label}</span>
      <div className="row-operation-matrix" aria-label={label}>
        {values.map((row, rowIndex) => (
          <div
            className={`${activeRows.includes(rowIndex) ? "is-source" : ""} ${rowIndex === targetRow ? "is-target" : ""}`}
            key={`${label}-${rowIndex}`}
          >
            {row.map((value, columnIndex) => (
              <span key={`${label}-${rowIndex}-${columnIndex}`}>{value}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RowReductionAnimation() {
  const animation = useSteppedAnimation(steps.length, 2600);
  const current = steps[animation.step];

  return (
    <section
      id="unidad-1-a0000000080"
      className="row-reduction-animation ejem_thmwrapper"
      aria-labelledby="row-reduction-title"
    >
      <header className="matrix-animation-heading">
        <div><span>Ejemplo</span><strong>1.40</strong></div>
        <p id="row-reduction-title">Operaciones elementales fila por fila</p>
      </header>

      <div className="row-reduction-stage">
        <RowMatrix
          values={current.before}
          label="Matriz antes"
          activeRows={[...current.sourceRows, current.targetRow]}
          targetRow={current.targetRow}
        />
        <div className="row-operation-arrow" aria-label={`Operación ${current.operation}`}>
          <strong>{current.operation}</strong>
          <span aria-hidden="true">⟶</span>
        </div>
        <RowMatrix values={current.after} label="Resultado" targetRow={current.targetRow} />
      </div>

      <div className="row-reduction-explanation" aria-live="polite">
        <span>Paso {animation.step + 1} de {steps.length}</span>
        <strong>{current.explanation}</strong>
        <p>{current.calculation}</p>
      </div>

      <div className="matrix-animation-controls">
        <p>{animation.complete ? "Escalonamiento completado" : "Cada paso permanece 2,6 segundos. También puedes recorrerlos manualmente."}</p>
        <div className="animation-button-group">
          <button type="button" onClick={animation.previous} disabled={animation.step === 0}>Anterior</button>
          <button type="button" onClick={animation.toggle}>
            {animation.complete ? "Repetir" : animation.playing ? "Pausar" : "Continuar"}
          </button>
          <button type="button" onClick={animation.next} disabled={animation.step === steps.length - 1}>Siguiente</button>
        </div>
      </div>
    </section>
  );
}
