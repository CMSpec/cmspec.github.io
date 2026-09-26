"use client";

import { useMemo, useState } from "react";
import type { Exercise, ExerciseDifficulty } from "../../content/exercises";
import { sitePath } from "../../lib/site-path";

const difficultyOrder: Array<ExerciseDifficulty | "Todos"> = ["Todos", "Inicial", "Intermedio", "Desafío"];

export default function ExerciseLibrary({ exercises }: { exercises: Exercise[] }) {
  const [course, setCourse] = useState("Todos");
  const [difficulty, setDifficulty] = useState<ExerciseDifficulty | "Todos">("Todos");
  const [topic, setTopic] = useState("Todos");
  const courses = useMemo(() => ["Todos", ...new Set(exercises.map((exercise) => exercise.course))], [exercises]);
  const difficulties = difficultyOrder.filter(value => value === "Todos" || exercises.some(exercise => (course === "Todos" || exercise.course === course) && exercise.difficulty === value));
  const topics = useMemo(() => ["Todos", ...new Set(exercises.filter(exercise => course === "Todos" || exercise.course === course).map(exercise => exercise.topic))], [exercises, course]);
  const visible = exercises.filter((exercise) =>
    (course === "Todos" || exercise.course === course) &&
    (difficulty === "Todos" || exercise.difficulty === difficulty) &&
    (topic === "Todos" || exercise.topic === topic),
  );

  return (
    <>
      <div className="exercise-filters" aria-label="Filtros de ejercicios">
        <label>
          <span>CURSO</span>
          <select aria-label="Curso" value={course} onChange={(event) => { setCourse(event.target.value); setDifficulty("Todos"); setTopic("Todos"); }}>
            {courses.map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
        <label>
          <span>DIFICULTAD</span>
          <select aria-label="Dificultad" value={difficulty} onChange={(event) => setDifficulty(event.target.value as ExerciseDifficulty | "Todos")}>
            {difficulties.map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
        <label>
          <span>TEMA</span>
          <select aria-label="Tema" value={topic} onChange={(event) => setTopic(event.target.value)}>
            {topics.map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
        <p role="status" aria-live="polite" aria-atomic="true"><strong>{visible.length}</strong> {visible.length === 1 ? "ejercicio" : "ejercicios"}</p>
      </div>

      <div className="exercise-grid">
        {visible.map((exercise) => (
          <article className="exercise-card" key={exercise.slug}>
            <div className="exercise-card-topline">
              <span>{exercise.number}</span>
              <span>{exercise.difficulty}</span>
            </div>
            <p>{exercise.course} · {exercise.collection}</p>
            <h2><a href={sitePath(`/ejercicios/${exercise.slug}`)}>{exercise.title}</a></h2>
            <div className="exercise-card-meta">
              <span>{exercise.topic}</span><span>{exercise.estimatedTime}</span>
            </div>
            <a className="exercise-open" href={sitePath(`/ejercicios/${exercise.slug}`)}>Comenzar <span aria-hidden="true">→</span></a>
          </article>
        ))}
      </div>
      {visible.length === 0 && <p className="exercise-empty">No hay ejercicios con esta combinación todavía.</p>}
    </>
  );
}
