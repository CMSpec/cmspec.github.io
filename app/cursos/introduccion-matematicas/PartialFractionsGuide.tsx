import katex from "katex";
import { partialFractionCases, partialFractionExercises } from "../../../content/courses/partial-fractions-guide";

function Formula({ tex }: { tex: string }) {
  return <div className="course-math" dangerouslySetInnerHTML={{ __html: katex.renderToString(tex, { displayMode: true, output: "mathml", throwOnError: true }) }}/>;
}

export default function PartialFractionsGuide() {
  return <section className="partial-fractions-guide" aria-labelledby="partial-fractions-guide-title">
    <h5 id="partial-fractions-guide-title">Guía: Fracciones parciales</h5>
    <p>Al descomponer una fracción racional, el denominador se factoriza completamente y luego se expresa la fracción como una suma de fracciones más simples según el tipo de factores. Estos son los cuatro casos más comunes; una descomposición puede combinar varios de ellos.</p>
    <aside className="intro-note-correction"><strong>Antes de aplicar las fórmulas:</strong> la fracción debe ser propia, es decir, el grado del numerador debe ser menor que el del denominador. Si no lo es, divide primero y conserva el cociente polinómico. Las igualdades se consideran donde el denominador original no se anula.</aside>
    {partialFractionCases.map(item => <section className="partial-fraction-case" key={item.title}><h6>{item.title}</h6><p>{item.text}</p><Formula tex={item.tex}/></section>)}
    <h6>Ejercicios</h6>
    <p>Descompón en fracciones parciales las siguientes expresiones. Identifica primero los tipos de factores y comprueba al final reuniendo las fracciones.</p>
    <ol className="partial-fraction-exercises">{partialFractionExercises.map((tex, index) => <li key={tex} aria-label={`Ejercicio ${index + 1}`}><Formula tex={tex}/></li>)}</ol>
  </section>;
}
