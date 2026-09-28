import { sectionPractice } from "../../../content/courses/section-practice";
import ExerciseMath from "../../ejercicios/ExerciseMath";

export default function SectionPractice({ course, chapter, index }: { course: string; chapter: string; index: number }) {
  const exercise = sectionPractice[course]?.[chapter]?.[index];
  if (!exercise) throw new Error(`Falta la práctica de ${course}/${chapter}/${index + 1}`);
  return <aside className="section-practice" aria-label="Ejercicio de cierre">
    <p className="practice-label">PARA PRACTICAR · CÁLCULO O DEMOSTRACIÓN</p>
    <p><ExerciseMath text={exercise.question}/></p>
    <details><summary>Ver pista</summary><p><ExerciseMath text={exercise.hint}/></p></details>
    <details><summary>Ver solución</summary><p><ExerciseMath text={exercise.solution}/></p></details>
  </aside>;
}
