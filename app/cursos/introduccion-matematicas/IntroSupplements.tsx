import { introductorySupplements, supplementaryProblems } from "../../../content/courses/introductory-supplements";
import { sitePath } from "../../../lib/site-path";
import MathText from "./IntroMathText";

export default function IntroSupplements({ section }: { section: string }) {
  return <>
    {introductorySupplements[section]?.map(item => <section className="intro-supplement" key={item.title}>
      <h5>{item.title}</h5>
      {item.paragraphs.map((text, i) => <p key={i}><MathText text={text}/></p>)}
    </section>)}
    {supplementaryProblems.filter(item => item.section === section).map(item => <section className="intro-supplement intro-supplement-problem" key={item.slug}>
      <h5>{item.title}</h5>
      <p><MathText text={item.statement}/></p>
      <details><summary>Ver pistas</summary><ol>{item.hints.map((hint, i) => <li key={i}><MathText text={hint}/></li>)}</ol></details>
      <details><summary>Ver solución</summary>{item.solution.map((step, i) => <p key={i}><MathText text={step}/></p>)}</details>
      <a className="intro-practice-link" href={sitePath(`/ejercicios/${item.slug}`)}>Practicar con ayuda progresiva →</a>
    </section>)}
  </>;
}
