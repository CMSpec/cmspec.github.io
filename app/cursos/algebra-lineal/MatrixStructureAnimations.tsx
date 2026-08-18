"use client";

import { useSteppedAnimation } from "./MatrixOperationsAnimations";

function StructureMatrix({ values, active, highlighted, label }: { values: number[]; active: number[]; highlighted?: number[]; label: string }) {
  return (
    <div className="structure-matrix-block">
      <span>{label}</span>
      <div className={`structure-matrix matrix-size-${Math.sqrt(values.length)}`} aria-label={label}>
        {values.map((value, index) => (
          <span
            className={`${highlighted?.includes(index) ? "is-highlighted" : ""} ${active.includes(index) ? "is-active" : ""}`}
            key={`${label}-${index}`}
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TraceAnimation() {
  const values = [2, 1, 0, -1, 4, 3, 5, 2, -2];
  const diagonal = [0, 4, 8];
  const animation = useSteppedAnimation(diagonal.length);
  const revealed = diagonal.slice(0, animation.step + 1);
  const partial = revealed.reduce((sum, index) => sum + values[index], 0);

  return (
    <section className="trace-animation course-concept-animation" aria-labelledby="trace-animation-title">
      <header className="matrix-animation-heading">
        <div><span>Ejemplo visual</span><strong>Traza</strong></div>
        <p id="trace-animation-title">Sumar los elementos de la diagonal</p>
      </header>
      <div className="trace-animation-stage">
        <StructureMatrix values={values} active={[diagonal[animation.step]]} highlighted={revealed} label="Matriz A" />
        <p className="trace-calculation">
          Tr(A) = {revealed.map((index) => values[index]).join(" + ").replace("+ -", "− ")}
          {animation.complete && <> = <strong>4</strong></>}
        </p>
      </div>
      <div className="matrix-animation-controls">
        <p aria-live="polite">{animation.complete ? "Traza completa: 2 + 4 − 2 = 4" : `Diagonal ${animation.step + 1}: suma parcial ${partial}`}</p>
        <button type="button" onClick={animation.toggle}>{animation.complete ? "Repetir" : animation.playing ? "Pausar" : "Continuar"}</button>
      </div>
    </section>
  );
}

export function TriangularMatricesAnimation() {
  const upper = [4, -1, 5, 0, -6, 0, 0, 0, 8];
  const lower = [-3, 0, 2, 7];
  const upperRegion = [0, 1, 2, 4, 5, 8];
  const lowerRegion = [0, 2, 3];
  const animation = useSteppedAnimation(2);
  const showingUpper = animation.step === 0;

  return (
    <section id="unidad-1-a0000000019" className="triangular-animation course-concept-animation ejem_thmwrapper" aria-labelledby="triangular-title">
      <header className="matrix-animation-heading">
        <div><span>Ejemplo</span><strong>1.7</strong></div>
        <p id="triangular-title">Matrices triangulares superior e inferior</p>
      </header>
      <div className="triangular-animation-stage">
        <StructureMatrix values={upper} active={showingUpper ? upperRegion : []} label="C · triangular superior" />
        <StructureMatrix values={lower} active={!showingUpper ? lowerRegion : []} label="D · triangular inferior" />
      </div>
      <div className="matrix-animation-controls">
        <p aria-live="polite">{showingUpper ? "C: se destaca la diagonal y toda la región superior" : "D: se destaca la diagonal y toda la región inferior"}</p>
        <button type="button" onClick={animation.toggle}>{animation.complete ? "Repetir" : animation.playing ? "Pausar" : "Continuar"}</button>
      </div>
    </section>
  );
}

export function SymmetryAnimation() {
  const symmetric = [6, -1, 4, -1, 7, 2, 4, 2, -3];
  const antisymmetric = [0, 2, -4, -2, 0, 3, 4, -3, 0];
  const pairs = [[1, 3], [2, 6], [5, 7]];
  const animation = useSteppedAnimation(6);
  const isSymmetricPhase = animation.step < 3;
  const symmetricPair = pairs[Math.min(animation.step, 2)];
  const antisymmetricPair = pairs[Math.max(animation.step - 3, 0)];
  const symmetricValues = symmetricPair.map((index) => symmetric[index]);
  const antisymmetricValues = antisymmetricPair.map((index) => antisymmetric[index]);

  return (
    <section id="unidad-1-a0000000023" className="symmetry-animation course-concept-animation ejem_thmwrapper" aria-labelledby="symmetry-title">
      <header className="matrix-animation-heading">
        <div><span>Ejemplo</span><strong>1.10</strong></div>
        <p id="symmetry-title">Simetría y antisimetría respecto de la diagonal</p>
      </header>
      <div className="symmetry-animation-stage">
        <div className={`symmetry-row ${isSymmetricPhase ? "is-current" : ""}`}>
          <StructureMatrix values={symmetric} active={isSymmetricPhase ? symmetricPair : []} label="Matriz A" />
          <div>
            <p className="symmetry-relation">{symmetricValues[0]} = {symmetricValues[1]}</p>
            <p>Es simétrica, pues <i>a</i><sub>ij</sub> = <i>a</i><sub>ji</sub>.</p>
          </div>
        </div>
        <div className={`symmetry-row ${!isSymmetricPhase ? "is-current" : ""}`}>
          <StructureMatrix values={antisymmetric} active={!isSymmetricPhase ? antisymmetricPair : []} label="Matriz B" />
          <div>
            <p className="symmetry-relation">{antisymmetricValues[0]} = −({antisymmetricValues[1]})</p>
            <p>Es antisimétrica, pues <i>b</i><sub>ij</sub> = −<i>b</i><sub>ji</sub>.</p>
          </div>
        </div>
      </div>
      <div className="matrix-animation-controls">
        <p aria-live="polite">
          {isSymmetricPhase ? "Los valores reflejados respecto de la diagonal son iguales" : "Los valores reflejados tienen el mismo módulo y signo contrario"}
        </p>
        <button type="button" onClick={animation.toggle}>{animation.complete ? "Repetir" : animation.playing ? "Pausar" : "Continuar"}</button>
      </div>
    </section>
  );
}
