import { vectorCalculusCourse } from "../../../content/courses/vector-calculus";
import { vectorCalculusChapters } from "../../../content/courses/vector-calculus-chapters";
import CourseIndex from "../_components/CourseIndex";
import SiteHeader from "../../_components/SiteHeader";
import SageSandbox from "../_components/SageSandbox";
import { getSageSandbox } from "../../../content/courses/sage-sandboxes";
import LevelCurves3D from "./LevelCurves3D";
import GradientTangent3D from "./GradientTangent3D";
import ParametricEllipse from "./ParametricEllipse";
import ParametricSegment from "./ParametricSegment";
import ParametricFunctionGraph from "./ParametricFunctionGraph";
import DirectionalDerivative3D from "./DirectionalDerivative3D";
import LagrangeMultiplierExplorer from "./LagrangeMultiplierExplorer";
import OpenClosedBallsExplorer from "./OpenClosedBallsExplorer";
import DoubleIntegralRiemann3D from "./DoubleIntegralRiemann3D";
import GreenTheoremExplorer from "./GreenTheoremExplorer";
import LineIntegralPathsExplorer from "./LineIntegralPathsExplorer";
import JacobianChangeExplorer from "./JacobianChangeExplorer";
import CoordinateSystems3D from "./CoordinateSystems3D";
import SolutionDisclosures from "../algebra-lineal/SolutionDisclosures";

function findElementEndAt(html: string, start: number) {
  const divPattern = /<\/?div\b[^>]*>/g;
  let depth = 0;

  for (const match of html.slice(start).matchAll(divPattern)) {
    depth += match[0].startsWith("</") ? -1 : 1;
    if (depth === 0 && match.index !== undefined) return start + match.index + match[0].length;
  }

  return -1;
}

function findNthTheoremEnd(html: string, className: string, occurrence: number) {
  const starts = [...html.matchAll(new RegExp(`<div class="${className}[^\"]*"`, "g"))];
  const start = starts[occurrence - 1]?.index;
  return start === undefined ? -1 : findElementEndAt(html, start);
}

function VectorSectionContent({ html, chapterIndex, title }: { html: string; chapterIndex: number; title: string }) {
  if (chapterIndex === 1 && title === "Parametrizacion de curvas") {
    const splitAt = findNthTheoremEnd(html, "ejem_thmwrapper", 3);
    if (splitAt >= 0) {
      const before = html.slice(0, splitAt);
      const after = html.slice(splitAt);
      return (
        <>
          <div className="latex-content" dangerouslySetInnerHTML={{ __html: before }} />
          <ParametricEllipse />
          <ParametricSegment />
          <div className="latex-content" dangerouslySetInnerHTML={{ __html: after }} />
          <ParametricFunctionGraph />
        </>
      );
    }
  }

  if (chapterIndex === 2 && title === "Continuidad") {
    const directionalEnd = html.indexOf("Esto significa que la pendiente");
    const splitAt = directionalEnd >= 0 ? html.indexOf("</p>", directionalEnd) : -1;
    if (splitAt >= 0) {
      const before = html.slice(0, splitAt + 4);
      const after = html.slice(splitAt + 4);
      return (
        <>
          <div className="latex-content" dangerouslySetInnerHTML={{ __html: before }} />
          <DirectionalDerivative3D />
          <div className="latex-content" dangerouslySetInnerHTML={{ __html: after }} />
        </>
      );
    }
  }

  return (
    <>
      <div className="latex-content" dangerouslySetInnerHTML={{ __html: html }} />
      {chapterIndex === 1 && title === "Curvas de nivel" ? <LevelCurves3D /> : null}
      {chapterIndex === 1 && title === "Bolas abiertas y cerradas" ? <OpenClosedBallsExplorer /> : null}
      {chapterIndex === 3 && title === "Introducción" ? <GradientTangent3D /> : null}
      {chapterIndex === 4 && title === "Extremos condicionados" ? <LagrangeMultiplierExplorer /> : null}
      {chapterIndex === 6 && title === "Integrales dobles sobre rectángulos" ? <DoubleIntegralRiemann3D /> : null}
      {chapterIndex === 7 && title === "Cambio de variable" ? <JacobianChangeExplorer /> : null}
      {chapterIndex === 8 && title === "Coordenadas esféricas" ? <CoordinateSystems3D /> : null}
      {chapterIndex === 9 && title === "Integrales de Línea" ? <LineIntegralPathsExplorer /> : null}
      {chapterIndex === 10 && title === "Teorema de Green" ? <GreenTheoremExplorer /> : null}
    </>
  );
}

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
      <SolutionDisclosures />

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
                      <VectorSectionContent html={section.html} chapterIndex={chapterIndex} title={section.title} />
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
