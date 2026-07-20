import { vectorCalculusCourse } from "../../../content/courses/vector-calculus";
import { vectorCalculusChapters } from "../../../content/courses/vector-calculus-chapters";

export default function VectorCalculusCoursePage() {
  const course = vectorCalculusCourse;

  return (
    <main className="course-page vector-course">
      <header className="course-header">
        <a className="brand" href="/" aria-label="CMSpec, volver al inicio">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>CMSpec</span>
        </a>
        <span className="course-publication">APUNTES · CÁLCULO VECTORIAL</span>
        <a className="course-back" href="/aprender">Todos los apuntes ↗</a>
      </header>

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
        <aside className="course-toc" aria-label="Índice del curso">
          <details className="course-toc-disclosure" open>
            <summary><span>EN ESTE CURSO</span><i aria-hidden="true">+</i></summary>
            <nav>
              {vectorCalculusChapters.map((chapter, index) => (
                <a className="course-toc-unit" href={`#lectura-clase-${index + 1}`} key={chapter.slug}>
                  <span>{chapter.number}</span><strong>{chapter.title}</strong>
                </a>
              ))}
            </nav>
          </details>
        </aside>

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
                    <section className="chapter-section" key={`${chapter.slug}-${sectionIndex}`}>
                      <h4>{section.title}</h4>
                      <div className="latex-content" dangerouslySetInnerHTML={{ __html: section.html }} />
                    </section>
                  ))}
                </article>
              </details>
            ))}
          </div>
        </section>

        <aside className="course-margin-note">
          <span>CMSpec / 03</span>
          <p>Del cambio local a la geometría y la integración en varias dimensiones.</p>
        </aside>
      </div>

      <footer className="course-footer">
        <p>CMSpec · Un espectro de intereses</p>
        <a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a>
      </footer>
    </main>
  );
}
