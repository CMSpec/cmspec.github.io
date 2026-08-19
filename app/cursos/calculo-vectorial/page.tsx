import { vectorCalculusCourse } from "../../../content/courses/vector-calculus";
import { vectorCalculusChapters } from "../../../content/courses/vector-calculus-chapters";
import CourseIndex from "../_components/CourseIndex";
import SiteHeader from "../../_components/SiteHeader";
import SageSandbox from "../_components/SageSandbox";
import { getSageSandbox } from "../../../content/courses/sage-sandboxes";
import LevelCurves3D from "./LevelCurves3D";

export default function VectorCalculusCoursePage() {
  const course = vectorCalculusCourse;
  const indexUnits = vectorCalculusChapters.map((chapter, chapterIndex) => ({
    number: chapter.number,
    title: chapter.title,
    href: `#lectura-clase-${chapterIndex + 1}`,
    items: chapter.sections.map((section, sectionIndex) => ({
      href: `#${chapter.slug}-seccion-${sectionIndex + 1}`,
      title: section.title,
    })),
  }));

  return (
    <main className="course-page vector-course">
      <SiteHeader />

      <article className="course-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">{course.eyebrow}</p>
        <h1>{course.title}</h1>
        <p className="course-deck">{course.introduction}</p>
        <div className="course-meta">
          <div><span>AUTORÍA</span><strong>{course.authors}</strong></div>
          <div><span>COLECCIÓN</span><strong>CMSpec · Aprender</strong></div>
          <div><span>CONTENIDO</span><strong>Geometría, derivación e integración en varias variables</strong></div>
        </div>
      </article>

      <div className="course-article-layout">
        <CourseIndex units={indexUnits} />

        <section className="course-reader" aria-labelledby="vector-reader-title">
          <header className="reader-heading">
            <p>APUNTES COMPLETOS</p>
            <h2 id="vector-reader-title">{course.readerTitle}</h2>
            <p>{course.readerDescription}</p>
          </header>

          <div className="edo-visual-note" aria-label="Idea central del cálculo vectorial">
            <span>CAMBIO EN VARIAS DIRECCIONES</span>
            <strong>∇f · u</strong>
            <p>El cálculo vectorial extiende las ideas de derivación e integración a curvas, superficies, regiones y campos en varias dimensiones.</p>
          </div>

          <div className="reading-chapters">
            {vectorCalculusChapters.map((chapter, chapterIndex) => (
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
                    <section
                      className="chapter-section"
                      id={`${chapter.slug}-seccion-${sectionIndex + 1}`}
                      key={`${chapter.slug}-${sectionIndex}`}
                    >
                      <h4>{section.title}</h4>
                      <div className="latex-content" dangerouslySetInnerHTML={{ __html: section.html }} />
                      {chapterIndex === 1 && section.title === "Curvas de nivel" ? <LevelCurves3D /> : null}
                    </section>
                  ))}
                  <SageSandbox {...getSageSandbox("calculo-vectorial", chapterIndex, chapter.title)} />
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
