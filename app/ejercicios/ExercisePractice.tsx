"use client";

import { useEffect, useState } from "react";
import type { Exercise } from "../../content/exercises";
import { sitePath } from "../../lib/site-path";
import LinePlanePreview3D from "./LinePlanePreview3D";

type PointValues = [string, string, string];

function LinePointsCheckpoint() {
  const [firstPoint, setFirstPoint] = useState<PointValues>(["", "", ""]);
  const [secondPoint, setSecondPoint] = useState<PointValues>(["", "", ""]);
  const [feedback, setFeedback] = useState<{ valid: boolean; message: string } | null>(null);

  const updatePoint = (point: PointValues, setPoint: (value: PointValues) => void, coordinate: number, value: string) => {
    const next = [...point] as PointValues;
    next[coordinate] = value;
    setPoint(next);
    setFeedback(null);
  };

  const checkPoints = () => {
    const values = [...firstPoint, ...secondPoint];
    if (values.some((value) => value.trim() === "" || !Number.isFinite(Number(value)))) {
      setFeedback({ valid: false, message: "Completa las seis coordenadas con números." });
      return;
    }

    const pointA = firstPoint.map(Number);
    const pointB = secondPoint.map(Number);
    const tolerance = 1e-6;
    const isOnLine = ([x, y, z]: number[]) => Math.abs(y + 1) < tolerance && Math.abs(z - (7 - 2 * x)) < tolerance;
    if (!isOnLine(pointA) || !isOnLine(pointB)) {
      setFeedback({ valid: false, message: "Al menos uno de los puntos no pertenece a la recta. Busca un valor de t y evalúa las tres coordenadas." });
      return;
    }
    if (pointA.every((value, index) => Math.abs(value - pointB[index]) < tolerance)) {
      setFeedback({ valid: false, message: "El punto pertenece a la recta, pero necesitas elegir dos puntos distintos." });
      return;
    }

    const tA = pointA[0] - 2;
    const tB = pointB[0] - 2;
    setFeedback({ valid: true, message: `Bien: ambos puntos están en la recta y corresponden a t = ${tA} y t = ${tB}.` });
  };

  return (
    <div className="line-points-checkpoint">
      <div className="checkpoint-heading"><span>PASO GUIADO</span><h3>Escribe dos puntos distintos de la recta</h3><p>Elige dos valores de <i>t</i> y evalúa cada coordenada de <i>r(t)</i>.</p></div>
      <div className="point-entry-grid">
        {[
          { label: "Punto A", point: firstPoint, setPoint: setFirstPoint },
          { label: "Punto B", point: secondPoint, setPoint: setSecondPoint },
        ].map(({ label, point, setPoint }) => (
          <fieldset key={label}>
            <legend>{label}</legend>
            <span aria-hidden="true">(</span>
            {(["x", "y", "z"] as const).map((coordinate, index) => (
              <label key={coordinate}>
                <span>{coordinate}</span>
                <input type="number" step="any" value={point[index]} onChange={(event) => updatePoint(point, setPoint, index, event.target.value)} aria-label={`${coordinate} de ${label}`} />
              </label>
            ))}
            <span aria-hidden="true">)</span>
          </fieldset>
        ))}
      </div>
      <button type="button" onClick={checkPoints}>Comprobar puntos</button>
      {feedback && <p className={`checkpoint-feedback${feedback.valid ? " is-valid" : " is-invalid"}`} role="status">{feedback.message}</p>}
    </div>
  );
}

export default function ExercisePractice({ exercise }: { exercise: Exercise }) {
  const storageKey = `cmspec-exercise-${exercise.slug}`;
  const readProgress = () => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(window.localStorage.getItem(storageKey) ?? "{}") as { draft?: string; completed?: boolean };
    } catch { return {}; }
  };
  const [openHints, setOpenHints] = useState(0);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [draft, setDraft] = useState(() => readProgress().draft ?? "");
  const [completed, setCompleted] = useState(() => Boolean(readProgress().completed));

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ draft, completed }));
  }, [completed, draft, storageKey]);

  return (
    <div className="practice-layout">
      <aside className="practice-context">
        <a href={sitePath("/ejercicios")}>← Todos los ejercicios</a>
        <p>ANTES DE COMENZAR</p>
        <h2>Materia relacionada</h2>
        <nav>
          {exercise.relatedTheory.map((link) => (
            <a href={sitePath(link.href)} key={link.label}>{link.label}<span aria-hidden="true">↗</span></a>
          ))}
        </nav>
        <dl>
          <div><dt>Dificultad</dt><dd>{exercise.difficulty}</dd></div>
          <div><dt>Tiempo sugerido</dt><dd>{exercise.estimatedTime}</dd></div>
          <div><dt>Origen</dt><dd>{exercise.collection}</dd></div>
        </dl>
      </aside>

      <article className="practice-sheet">
        <header>
          <p>{exercise.course.toUpperCase()} · {exercise.topic.toUpperCase()}</p>
          <span>EJERCICIO {exercise.number}</span>
          <h1>{exercise.title}</h1>
        </header>

        <section className="practice-statement" aria-labelledby="statement-title">
          <p className="practice-label" id="statement-title">ENUNCIADO</p>
          {exercise.statement.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>

        <section className="practice-hints" aria-labelledby="hints-title">
          <div className="practice-section-heading">
            <div><p className="practice-label">PISTAS PROGRESIVAS</p><h2 id="hints-title">Avanza sin revelar todo</h2></div>
            <span>{openHints} / {exercise.hints.length}</span>
          </div>
          {exercise.hints.map((hint, index) => (
            <div key={hint}>
              <div className={`hint-row${index < openHints ? " is-open" : ""}`}>
                <button type="button" onClick={() => setOpenHints(Math.max(openHints, index + 1))} aria-expanded={index < openHints}>
                  <span>Pista {index + 1}</span><i aria-hidden="true">{index < openHints ? "−" : "+"}</i>
                </button>
                {index < openHints && <p>{hint}</p>}
              </div>
              {exercise.slug === "plano-que-contiene-una-recta" && index === 0 && openHints >= 1 && <LinePointsCheckpoint />}
              {exercise.slug === "plano-que-contiene-una-recta" && index === 1 && openHints >= 2 && <LinePlanePreview3D />}
            </div>
          ))}
        </section>

        <section className="practice-draft" aria-labelledby="draft-title">
          <p className="practice-label">TU DESARROLLO</p>
          <h2 id="draft-title">Escribe una idea antes de comparar</h2>
          <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Anota aquí tu estrategia, cálculos o respuesta…" />
          <small>Tu borrador se guarda solamente en este dispositivo.</small>
        </section>

        <section className="practice-solution" aria-labelledby="solution-title">
          <button type="button" className="solution-toggle" onClick={() => setSolutionOpen((open) => !open)} aria-expanded={solutionOpen}>
            <span><small>CUANDO ESTÉS LISTA/O</small><strong id="solution-title">{solutionOpen ? "Ocultar solución" : "Ver solución completa"}</strong></span>
            <i aria-hidden="true">{solutionOpen ? "−" : "+"}</i>
          </button>
          {solutionOpen && (
            <div className="solution-content">
              {exercise.solution.map((step, index) => (
                <div className="solution-step" key={step.body}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>{step.title && <h3>{step.title}</h3>}<p>{step.body}</p></div>
                </div>
              ))}
              <div className="final-answer"><span>RESPUESTA FINAL</span><strong>{exercise.finalAnswer}</strong></div>
              <div className="common-mistake"><span>OJO CON ESTO</span><p>{exercise.commonMistake}</p></div>
            </div>
          )}
        </section>

        <button type="button" className={`complete-exercise${completed ? " is-complete" : ""}`} onClick={() => setCompleted((value) => !value)}>
          <span aria-hidden="true">{completed ? "✓" : "○"}</span>{completed ? "Ejercicio completado" : "Marcar como completado"}
        </button>
      </article>
    </div>
  );
}
