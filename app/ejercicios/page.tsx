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
        <p>Ejercicios para practicar con pistas, conexiones a los apuntes y soluciones paso a paso.</p>
        <div className="exercise-masthead-stats">
          <span><strong>{exercises.length}</strong> ejercicios</span>
          <span><strong>3</strong> pistas por problema</span>
          <span><strong>1</strong> colección en crecimiento</span>
        </div>
      </section>
      <section className="exercise-library" aria-label="Biblioteca de ejercicios">
        <ExerciseLibrary exercises={exercises} />
      </section>
      <footer className="course-footer"><p>CMSpec · Ejercitación</p><a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a></footer>
    </main>
  );
}
