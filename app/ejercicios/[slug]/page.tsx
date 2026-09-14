import { notFound } from "next/navigation";
import SiteHeader from "../../_components/SiteHeader";
import { exercises, getExercise } from "../../../content/exercises";
import ExercisePractice from "../ExercisePractice";

export function generateStaticParams() {
  return exercises.map((exercise) => ({ slug: exercise.slug }));
}

export default async function ExercisePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
