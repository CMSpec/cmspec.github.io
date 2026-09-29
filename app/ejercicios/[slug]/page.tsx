import { notFound } from "next/navigation";
import SiteHeader from "../../_components/SiteHeader";
import { exercises, exerciseGroups, getExercise, getExerciseParts } from "../../../content/exercises";
import { sitePath } from "../../../lib/site-path";
import ExercisePractice from "../ExercisePractice";

export function generateStaticParams() {
  return [...exercises, ...exerciseGroups].map((exercise) => ({ slug: exercise.slug }));
}

export default async function ExercisePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parts = getExerciseParts(slug);
  if(parts.length) return <main className="exercise-detail-page"><SiteHeader /><section className="exercise-library exercise-group-links">
    <h1>Ejercicios separados</h1><p>Este grupo ahora tiene un ejercicio independiente por tarjeta, con sus propias pistas y solución.</p>
    <ul>{parts.map(e=><li key={e.slug}><a href={sitePath(`/ejercicios/${e.slug}`)}>{e.title}</a></li>)}</ul>
    <a href={sitePath("/ejercicios")}>Volver a Ejercitación</a>
  </section></main>;
  const exercise = getExercise(slug);
  if (!exercise) notFound();

  return (
    <main className="exercise-detail-page">
      <SiteHeader />
      <ExercisePractice exercise={exercise} />
      <footer className="course-footer"><p>CMSpec · Ejercitación</p><a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a></footer>
    </main>
  );
}
