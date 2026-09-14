import katex from "katex";
import SiteHeader from "../../_components/SiteHeader";
import CourseIndex from "../_components/CourseIndex";
import SolutionDisclosures from "../algebra-lineal/SolutionDisclosures";
import { differentialCalculusChapters, differentialCalculusCourse, type DifferentialBlock } from "../../../content/courses/differential-calculus";
import DerivativeSecantExplorer from "./DerivativeSecantExplorer";
import EpsilonDeltaExplorer from "./EpsilonDeltaExplorer";
import { FunctionInputExplorer, FunctionNotationDiagram } from "./FunctionConceptExplorers";

function Math({ tex, display = false }: { tex: string; display?: boolean }) {
  return <span className={display ? "course-math" : "course-inline-math"} dangerouslySetInnerHTML={{ __html: katex.renderToString(tex, { displayMode: display, output: "mathml", throwOnError: false }) }} />;
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return <>{parts.map((part, index) => part.startsWith("$") && part.endsWith("$") ? <Math tex={part.slice(1, -1)} key={index} /> : part)}</>;
}

const classMap = { definition: "defin", theorem: "thm", example: "ejem", exercise: "ejer", solution: "sol", remark: "rmk" } as const;
const labelMap = { definition: "Definición", theorem: "Teorema", example: "Ejemplo", exercise: "Ejercicio", solution: "Solución", remark: "Observación" } as const;

function CourseBlock({ block }: { block: DifferentialBlock }) {
  if (block.kind === "p") return <p><RichText text={block.text} /></p>;
  if (block.kind === "formula") return <Math tex={block.tex} display />;
  const prefix = classMap[block.kind];
  return (
    <div className={`${prefix}_thmwrapper`}>
      <div className={`${prefix}_thmheading`}><span>{labelMap[block.kind]}</span><span>· {block.title}</span></div>
      <div className={`${prefix}_thmcontent`}><p><RichText text={block.text} /></p>{block.tex && <Math tex={block.tex} display />}</div>
    </div>
  );
}

export default function DifferentialCalculusPage() {
  const indexUnits = differentialCalculusChapters.map((chapter, chapterIndex) => ({
    number: chapter.number,
    title: chapter.title,
    href: `#lectura-diferencial-${chapterIndex + 1}`,
    items: chapter.sections.map((section, sectionIndex) => ({ href: `#${chapter.slug}-seccion-${sectionIndex + 1}`, title: section.title })),
  }));

  return (
    <main className="course-page differential-course">
      <SolutionDisclosures />
      <SiteHeader />
      <article className="course-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">{differentialCalculusCourse.eyebrow}</p>
        <h1>{differentialCalculusCourse.title}</h1>
        <p className="course-deck">{differentialCalculusCourse.introduction}</p>
        <div className="course-meta">
          <div><span>AUTORA</span><strong>{differentialCalculusCourse.author}</strong></div>
          <div><span>COLECCIÓN</span><strong>CMSpec · Aprender</strong></div>
          <div><span>CONTENIDO</span><strong>8 unidades · Teoría, ejemplos y ejercicios</strong></div>
        </div>
      </article>
      <div className="course-article-layout">
        <CourseIndex units={indexUnits} note={differentialCalculusCourse.note} />
        <section className="course-reader" aria-labelledby="differential-reader-title">
          <header className="reader-heading"><p>APUNTES COMPLETOS</p><h2 id="differential-reader-title">El cambio, paso a paso.</h2><p>Abre una unidad para consultar conceptos, teoremas, ejemplos resueltos y ejercicios.</p></header>
          <div className="differential-visual-note"><span>IDEA CENTRAL</span><strong>secante → tangente</strong><p>La derivada nace al observar cómo cambia una función en intervalos cada vez más pequeños.</p></div>
          <div className="reading-chapters">
            {differentialCalculusChapters.map((chapter, chapterIndex) => (
              <details className={`reading-chapter chapter-tone-${(chapterIndex % 4) + 1}`} id={`lectura-diferencial-${chapterIndex + 1}`} key={chapter.slug} open={chapterIndex === 0}>
                <summary><span>{chapter.number}</span><h3>{chapter.title}</h3><i aria-hidden="true">+</i></summary>
                <article className="chapter-article">
                  {chapter.sections.map((section, sectionIndex) => (
                    <section className="chapter-section" id={`${chapter.slug}-seccion-${sectionIndex + 1}`} key={section.title}>
                      <h4>{section.title}</h4>
                      <div className="latex-content">{section.blocks.map((block, blockIndex) => <CourseBlock block={block} key={blockIndex} />)}</div>
                      {section.visual === "function-map" && <FunctionNotationDiagram />}
                      {section.visual === "function-slider" && <FunctionInputExplorer />}
                      {section.visual === "epsilon-delta" && <EpsilonDeltaExplorer />}
                      {section.visual === "secant" && <DerivativeSecantExplorer />}
                    </section>
                  ))}
                </article>
              </details>
            ))}
          </div>
        </section>
      </div>
      <footer className="course-footer"><p>CMSpec · Un espectro de intereses</p><a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a></footer>
    </main>
  );
}
