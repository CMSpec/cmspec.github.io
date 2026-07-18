import { linearAlgebraCourse } from "../../../content/courses/algebra-lineal";
import { linearAlgebraChapters } from "../../../content/courses/algebra-lineal-chapters";

export default function LinearAlgebraCoursePage() {
  const course = linearAlgebraCourse;

  return (
    <main className="course-page">
      <header className="course-header">
        <a className="brand" href="/" aria-label="CMSpec, volver al inicio">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>CMSpec</span>
        </a>
        <a className="course-back" href="/">← Volver al espectro</a>
      </header>

      <section className="course-hero">
        <div>
          <p className="kicker"><span />{course.eyebrow}</p>
          <h1>{course.title}</h1>
        </div>
        <div className="course-introduction">
          <p>{course.introduction}</p>
          <span>Apuntes de {course.author}</span>
        </div>
      </section>

      <section className="course-map" aria-labelledby="course-map-title">
        <div className="course-map-heading">
          <p className="section-index">CONTENIDOS</p>
          <h2 id="course-map-title">Seis unidades para construir una mirada lineal.</h2>
          <p>{course.note}</p>
        </div>

        <div className="course-units">
          {course.units.map((unit, index) => (
            <details className="course-unit" key={unit.number} open={index === 0}>
              <summary>
                <span>{unit.number}</span>
                <div><h3>{unit.title}</h3><p>{unit.description}</p></div>
                <i aria-hidden="true">+</i>
              </summary>
              <ol>
                {unit.topics.map((topic) => <li key={topic}>{topic}</li>)}
              </ol>
              <a className="unit-read-link" href={`#lectura-unidad-${index + 1}`}>
                Leer la unidad completa <span>↓</span>
              </a>
            </details>
          ))}
        </div>
      </section>

      <section className="course-reader" aria-labelledby="course-reader-title">
        <div className="reader-heading">
          <p className="section-index">APUNTES COMPLETOS</p>
          <h2 id="course-reader-title">Contenido de los capítulos.</h2>
          <p>Abre una unidad para consultar sus definiciones, teoremas, ejemplos, ejercicios y fórmulas.</p>
        </div>

        <div className="reading-chapters">
          {linearAlgebraChapters.map((chapter, chapterIndex) => (
            <details
              className="reading-chapter"
              id={`lectura-unidad-${chapterIndex + 1}`}
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
                    <div
                      className="latex-content"
                      dangerouslySetInnerHTML={{ __html: section.html }}
                    />
                  </section>
                ))}
              </article>
            </details>
          ))}
        </div>
      </section>

      <footer className="course-footer">
        <p>CMSpec · Un espectro de intereses</p>
        <a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a>
      </footer>
    </main>
  );
}
