"use client";

import { useState } from "react";
import type { Exercise } from "../../content/exercises";
import { generatePracticeTest, testAvailability, testLevels, testPool, testQuota, topicKey } from "../../lib/practice-test";
import { sitePath } from "../../lib/site-path";
import ExerciseMath from "./ExerciseMath";

export default function PracticeTest({ exercises, course }: { exercises: Exercise[]; course: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Exercise[]>([]);
  const [version, setVersion] = useState(0);
  const scoped = exercises.filter(e => course === "Todos" || e.course === course);
  const topics = [...new Map(scoped.map(e => [topicKey(e), { key: topicKey(e), title: e.topic, course: e.course }])).values()];
  const counts = testAvailability(testPool(scoped, selected));
  const ready = selected.length > 0 && testLevels.every(level => counts[level] >= testQuota[level]);
  function changeTopics(next: string[]) { setSelected(next); setQuestions([]); }
  return <section className="practice-test" aria-label="Generador de pruebas">
    <button type="button" className="practice-test-toggle" aria-expanded={open} aria-controls="practice-test-builder" onClick={() => setOpen(value => !value)}>
      Crear una prueba de 5 ejercicios <span aria-hidden="true">{open ? "−" : "+"}</span>
    </button>
    {open && <div id="practice-test-builder">
      <p>Selecciona uno o varios temas del curso elegido. La prueba combina <strong>1 inicial, 2 intermedios y 2 desafíos</strong>, sin repetir ejercicios. Cada ejercicio puede incluir varios incisos.</p>
      <p>Solo se incluyen ejercicios con dificultad revisada, pistas y solución. Se eligen entre los temas marcados; no necesariamente aparecerán todos.</p>
      <fieldset><legend>Temas para la prueba</legend>
        <div className="practice-test-topics">{topics.map(t => {
          const total = testPool(scoped, [t.key]).length;
          return <label key={t.key}><input type="checkbox" checked={selected.includes(t.key)} onChange={event => changeTopics(event.target.checked ? [...selected, t.key] : selected.filter(key => key !== t.key))} />
            <span>{t.title}{course === "Todos" && <small>{t.course}</small>}<small>{total} con pistas y solución</small></span>
          </label>;
        })}</div>
      </fieldset>
      <div className="practice-test-actions">
        <button type="button" onClick={() => changeTopics(topics.map(t => t.key))}>Seleccionar todos los temas</button>
        <button type="button" onClick={() => changeTopics([])}>Limpiar selección</button>
      </div>
      <div className="practice-test-availability" role="status" aria-live="polite">
        {!selected.length ? <p>Selecciona al menos un tema.</p> : <>
          <p>Disponibles: {testLevels.map(level => `${counts[level]} de nivel ${level.toLowerCase()}`).join(" · ")}.</p>
          {!ready && <p>Para completar la prueba faltan {testLevels.filter(level => counts[level] < testQuota[level]).map(level => `${testQuota[level] - counts[level]} de nivel ${level.toLowerCase()}`).join(" y ")}. Añade otros temas; no se cambiará la proporción solicitada.</p>}
        </>}
      </div>
      <button type="button" className="practice-test-generate" disabled={!ready} onClick={() => { setQuestions(generatePracticeTest(scoped, selected)); setVersion(value => value + 1); }}>{questions.length ? "Generar otra prueba" : "Generar prueba"}</button>
      {!!questions.length && <section className="practice-test-result" aria-label="Prueba generada" key={version}>
        <h2>Tu prueba · 5 ejercicios</h2>
        <p role="status">Prueba generada: 1 inicial, 2 intermedios y 2 desafíos. Las ayudas están ocultas hasta que las abras.</p>
        <p>Tu desarrollo en esta prueba es temporal: se pierde al generar otra, cambiar el curso o los temas, o recargar la página.</p>
        {questions.map((e, index) => <article className="practice-test-question" key={e.slug}>
          <p className="course-kicker">{index + 1} / 5 · {e.difficulty} · {e.course}</p>
          <h3>{e.title}</h3>
          {e.statement.map((text, i) => <p key={i}><ExerciseMath text={text} /></p>)}
          {e.sourceCredit && <p className="exercise-source-credit">{e.sourceCredit}</p>}
          <label className="practice-test-draft">Tu desarrollo del ejercicio {index + 1}<textarea rows={5} /></label>
          <details><summary>Consultar materia relacionada</summary><ul>{e.relatedTheory.map(link => <li key={link.href}><a href={sitePath(link.href)} target="_blank" rel="noreferrer">{link.label} ↗</a></li>)}</ul></details>
          {e.hints.map((hint, i) => <details key={i}><summary>Pista {i + 1}</summary><p><ExerciseMath text={hint} /></p></details>)}
          <details><summary>Ver solución completa</summary>
            {e.solution.map((step, i) => <div key={i}>{step.title && <h4>{step.title}</h4>}<p><ExerciseMath text={step.body} /></p></div>)}
            <div className="final-answer"><span>RESPUESTA FINAL</span><div><ExerciseMath text={e.finalAnswer} /></div></div>
          </details>
        </article>)}
      </section>}
    </div>}
  </section>;
}
