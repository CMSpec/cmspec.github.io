import { Fragment } from "react";
import { differentialEquationsCourse } from "../../../content/courses/differential-equations";
import { differentialEquationsChapters } from "../../../content/courses/differential-equations-chapters";
import CourseIndex from "../_components/CourseIndex";
import SiteHeader from "../../_components/SiteHeader";
import SageSandbox from "../_components/SageSandbox";
import { getSageSandbox } from "../../../content/courses/sage-sandboxes";
import SolutionFamilyLab from "./SolutionFamilyLab";
import SlopeFieldLab from "./SlopeFieldLab";
import PhaseLineLab from "./PhaseLineLab";
import EulerMethodLab from "./EulerMethodLab";
import SolutionDisclosures from "../algebra-lineal/SolutionDisclosures";

function DifferentialSectionContent({ title, html }: { title: string; html: string }) {
  if (title !== "Soluciones de una ecuación diferencial") {
    return <div className="latex-content" dangerouslySetInnerHTML={{ __html: html }} />;
  }

  const explicitSolution = html.indexOf("Solución explícita");
  const insertionPoint = explicitSolution >= 0 ? html.lastIndexOf("<p", explicitSolution) : -1;
  if (insertionPoint < 0) {
    return <div className="latex-content" dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <>
      <div className="latex-content" dangerouslySetInnerHTML={{ __html: html.slice(0, insertionPoint) }} />
      <SlopeFieldLab />
      <div className="latex-content" dangerouslySetInnerHTML={{ __html: html.slice(insertionPoint) }} />
    </>
  );
}

export default function DifferentialEquationsCoursePage() {
  const course = differentialEquationsCourse;
  const indexUnits = differentialEquationsChapters.map((chapter, chapterIndex) => ({
    number: chapter.number,
    title: chapter.title,
    href: `#lectura-clase-${chapterIndex + 1}`,
    items: chapter.sections.map((section, sectionIndex) => ({
      href: `#${chapter.slug}-seccion-${sectionIndex + 1}`,
      title: section.title,
    })),
  }));

  return (
    <main className="course-page edo-course">
      <SiteHeader />
      <SolutionDisclosures />

      <article className="course-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">{course.eyebrow}</p>
        <h1>{course.title}</h1>
        <p className="course-deck">{course.introduction}</p>
        <div className="course-meta">
          <div><span>AUTORÍA</span><strong>{course.authors}</strong></div>
          <div><span>COLECCIÓN</span><strong>CMSpec · Aprender</strong></div>
          <div><span>CONTENIDO</span><strong>Apuntes de ecuaciones desde primer orden a ordenes superiores y métodos de resolución</strong></div>
        </div>
      </article>

      <div className="course-article-layout">
        <CourseIndex units={indexUnits} />

        <section className="course-reader" aria-labelledby="edo-reader-title">
          <header className="reader-heading">
            <p>APUNTES COMPLETOS</p>
            <h2 id="edo-reader-title">{course.readerTitle}</h2>
            <p>{course.readerDescription}</p>
          </header>

          <div className="edo-visual-note" aria-label="Idea central de las ecuaciones diferenciales">
            <span>UNA RELACIÓN LOCAL</span>
            <strong>y′ = f(x, y)</strong>
            <p>Las ecuaciones diferenciales surgieron de la necesidad de describir fenómenos en los que solo era posible observar el cambio, permitiendo comprender y predecir la evolución de sistemas en el tiempo y el espacio.</p>
          </div>

          <div className="reading-chapters">
            {differentialEquationsChapters.map((chapter, chapterIndex) => (
              <details
                className={`reading-chapter chapter-tone-${(chapterIndex % 4) + 1}`}
                id={`lectura-clase-${chapterIndex + 1}`}
                key={chapter.slug}
                open={chapterIndex === 0}
              >
                <summary>
                  <span>{chapter.number}</span>
                  <h3>{chapter.title}</h3>
                  <i aria-hidden="true">+</i>
                </summary>
                <article className="chapter-article">
                  {chapter.sections.map((section, sectionIndex) => (
                    <Fragment key={`${chapter.slug}-${sectionIndex}`}>
                      {chapterIndex === 0 && section.title === "Problemas de valores iniciales" ? <SolutionFamilyLab /> : null}
                      {chapterIndex === 0 && section.title === "Ecuaciones Diferenciales de Variables Separables" ? <PhaseLineLab /> : null}
                      <section
                        className="chapter-section"
                        id={`${chapter.slug}-seccion-${sectionIndex + 1}`}
                      >
                        <h4>{section.title}</h4>
                        <DifferentialSectionContent title={section.title} html={section.html} />
                      </section>
                      {chapterIndex === 0 && section.title === "Problemas de valores iniciales" ? <EulerMethodLab /> : null}
                    </Fragment>
                  ))}
                  <SageSandbox {...getSageSandbox("ecuaciones-diferenciales", chapterIndex, chapter.title)} />
                </article>
              </details>
            ))}
          </div>
        </section>

      </div>

      <footer className="course-footer">
        <p>CMSpec · Un espectro de intereses</p>
        <a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a>
      </footer>
    </main>
  );
}
