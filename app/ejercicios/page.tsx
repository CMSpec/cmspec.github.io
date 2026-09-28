import SiteHeader from "../_components/SiteHeader";
import { exercises } from "../../content/exercises";
import ExerciseLibrary from "./ExerciseLibrary";

export default function ExercisesPage() {
  return (
    <main className="exercises-page">
      <SiteHeader />
      <section className="exercise-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">CMSPEC / APRENDER HACIENDO</p>
        <h1>Ejercitación</h1>
        <p>Ejercicios organizados por curso y tema, con pistas, soluciones y enlaces a los apuntes. Practica a tu ritmo o genera una prueba de cinco ejercicios con tres niveles de dificultad.</p>
        <div className="exercise-masthead-stats">
          <span><strong>{exercises.length}</strong> ejercicios</span>
          <span><strong>{exercises.filter(exercise=>exercise.solution.length>0).length}</strong> con solución</span>
          <span><strong>{new Set(exercises.map(exercise => exercise.courseSlug)).size}</strong> cursos</span>
        </div>
      </section>
      <section className="exercise-library" aria-label="Biblioteca de ejercicios">
        <ExerciseLibrary exercises={exercises} />
      </section>
      <footer className="course-footer"><p>CMSpec · Ejercitación</p><a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a></footer>
    </main>
  );
}
