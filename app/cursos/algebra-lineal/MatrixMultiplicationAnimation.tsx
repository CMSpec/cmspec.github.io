"use client";

import { useSteppedAnimation } from "./MatrixOperationsAnimations";

const matrixA = [
  [8, -2, -5],
  [3, -1, 1],
];

const matrixB = [
  [2, -1, 1],
  [-2, 4, 0],
  [1, 0, 0],
];

const matrixAB = [
  [15, -16, 8],
  [9, -7, 3],
];

type MatrixGridProps = {
  activeColumn?: number;
  activeRow?: number;
  label: string;
  revealThrough?: number;
  values: number[][];
};

function MatrixGrid({ activeColumn, activeRow, label, revealThrough, values }: MatrixGridProps) {
  const columns = values[0].length;

  return (
    <div className="multiplication-matrix-block">
      <strong>{label}</strong>
      <div
        className="multiplication-matrix"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(34px, 1fr))` }}
        aria-label={`Matriz ${label}`}
      >
        {values.flatMap((row, rowIndex) =>
          row.map((value, columnIndex) => {
            const index = rowIndex * columns + columnIndex;
            const isActive = rowIndex === activeRow || columnIndex === activeColumn;
            const isResult = label === "AB";
            const isRevealed = !isResult || (revealThrough !== undefined && index <= revealThrough);
            const isCurrentResult = isResult && index === revealThrough;

            return (
              <span
                className={`${isActive ? "is-active" : ""} ${isCurrentResult ? "is-current-result" : ""}`}
                key={`${label}-${rowIndex}-${columnIndex}`}
              >
                {isRevealed ? value : "·"}
              </span>
            );
          }),
        )}
      </div>
    </div>
  );
}

export default function MatrixMultiplicationAnimation() {
  const animation = useSteppedAnimation(matrixAB.flat().length);
  const activeRow = Math.floor(animation.step / matrixAB[0].length);
  const activeColumn = animation.step % matrixAB[0].length;
  const row = matrixA[activeRow];
  const column = matrixB.map((values) => values[activeColumn]);
  const result = matrixAB[activeRow][activeColumn];
  const calculation = row.map((value, index) => `(${value})(${column[index]})`).join(" + ");

  return (
    <section
      id="unidad-1-a0000000047"
      className="matrix-multiplication-animation ejem_thmwrapper"
      aria-labelledby="matrix-multiplication-title"
    >
      <header className="matrix-animation-heading">
        <div><span>Ejemplo</span><strong>1.24</strong></div>
        <p id="matrix-multiplication-title">Producto de matrices fila por columna</p>
      </header>

      <div className="matrix-multiplication-stage">
        <MatrixGrid values={matrixA} label="A" activeRow={activeRow} />
        <span className="matrix-operator" aria-hidden="true">×</span>
        <MatrixGrid values={matrixB} label="B" activeColumn={activeColumn} />
        <span className="matrix-operator" aria-hidden="true">=</span>
        <MatrixGrid values={matrixAB} label="AB" revealThrough={animation.step} />
      </div>

      <p className="matrix-multiplication-equation" aria-live="polite">
        <span>fila {activeRow + 1} de A</span> · <span>columna {activeColumn + 1} de B</span>
        <strong>{calculation} = {result}</strong>
      </p>

      <div className="matrix-animation-controls">
        <p>
          {animation.complete
            ? "Producto AB completo"
            : `Calculando la entrada (${activeRow + 1}, ${activeColumn + 1}) de AB`}
        </p>
        <button type="button" onClick={animation.toggle}>
          {animation.complete ? "Repetir" : animation.playing ? "Pausar" : "Continuar"}
        </button>
      </div>
    </section>
  );
}
