import SiteHeader from "../../_components/SiteHeader";
import { exercises } from "../../../content/exercises";
import { sitePath } from "../../../lib/site-path";
import PracticeTest from "../PracticeTest";

export const metadata = { title: "Crear una prueba | CMSpec" };

export default function PracticeTestPage() {
  return (
    <main className="exercises-page">
      <SiteHeader />
      <section className="exercise-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">CMSPEC / EJERCITACIÓN</p>
        <h1>Crear una prueba</h1>
        <p>Elige el curso y los temas que quieres practicar. Genera una prueba de cinco ejercicios, con pistas y soluciones para consultar cuando las necesites.</p>
        <a className="exercise-back-link" href={sitePath("/ejercicios")}>← Volver a ejercitación</a>
      </section>
      <section className="exercise-library" aria-label="Configurar la prueba">
        <PracticeTest exercises={exercises} />
      </section>
      <footer className="course-footer"><p>CMSpec · Ejercitación</p><a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a></footer>
    </main>
  );
}
