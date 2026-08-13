import { linearAlgebraCourse } from "../../../content/courses/algebra-lineal";
import { linearAlgebraChapters } from "../../../content/courses/algebra-lineal-chapters";
import MatrixScalarAnimation from "./MatrixScalarAnimation";
import MatrixMultiplicationAnimation from "./MatrixMultiplicationAnimation";
import RowReductionAnimation from "./RowReductionAnimation";
import { ScalarVectorLab, VectorCombinationLab, VectorSumLab } from "./VectorExplorations";
import ChangeOfBasis2D from "./ChangeOfBasis2D";
import { DotProductAnimation, MatrixAdditionAnimation } from "./MatrixOperationsAnimations";
import { SymmetryAnimation, TraceAnimation, TriangularMatricesAnimation } from "./MatrixStructureAnimations";
import CourseIndex from "../_components/CourseIndex";
import SolutionDisclosures from "./SolutionDisclosures";
import SiteHeader from "../../_components/SiteHeader";

function cleanDefinitionName(html: string) {
  return html
    .replace(/<annotation[\s\S]*?<\/annotation>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&times;/g, "×")
    .replace(/&nbsp;|&#xA0;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getDefinitionIndex(html: string) {
  const selectedEntries = [...html.matchAll(/<span class="cmspec-index-anchor" id="([^"]+)" data-cmspec-index-title="([^"]+)"><\/span>/g)]
    .map((match) => ({ id: match[1], label: "·", name: cleanDefinitionName(match[2]) }));

  if (selectedEntries.length > 0) return selectedEntries;

  return html.split('<div class="defin_thmwrapper').slice(1).flatMap((block) => {
    const id = block.match(/id="([^"]+)"/)?.[1];
    const label = block.match(/<span class="defin_thmlabel">\s*([^<]+)<\/span>/)?.[1]?.trim();
    const nameHtml = block.match(/<b class="bfseries">([\s\S]*?)<\/b>/)?.[1];
    const name = nameHtml ? cleanDefinitionName(nameHtml) : "";
    return id && label && name ? [{ id, label, name }] : [];
  });
}

function findTheoremStart(
  html: string,
  type: "defin" | "ejem" | "prop" | "rmk",
  label: string,
) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<div class="${type}_thmwrapper[^"]*" id="[^"]+">[\\s\\S]{0,700}?<span class="${type}_thmlabel">\\s*${escapedLabel}\\s*</span>`,
  );
  return html.search(pattern);
}

function RowVectorVisual() {
  return (
    <figure className="course-visual-example">
      <div>
        <span>EJEMPLO VISUAL · VECTORES</span>
        <h3>De una tabla a un vector fila</h3>
        <p>Una fila de datos ordenados puede interpretarse como un vector.</p>
      </div>
      <img
        src="/images/algebra-lineal/tabla-a-vector-fila.png"
        alt="Una tabla con las columnas A, B y C y los valores 3, 5 y 8 se transforma en el vector fila 3, 5, 8"
        width="1792"
        height="869"
      />
    </figure>
  );
}

function visualElement(name: string) {
  const visuals: Record<string, JSX.Element> = {
    "tabla-vector": <RowVectorVisual />,
    "exploracion-vector-01": <ScalarVectorLab />,
    "exploracion-vector-02": <VectorSumLab />,
    "exploracion-vector-03": <VectorCombinationLab />,
    traza: <TraceAnimation />,
    "matrices-triangulares": <TriangularMatricesAnimation />,
    simetria: <SymmetryAnimation />,
    "suma-matrices": <MatrixAdditionAnimation />,
    "producto-escalar-matriz": <MatrixScalarAnimation />,
    "producto-punto": <DotProductAnimation />,
    "producto-matrices": <MatrixMultiplicationAnimation />,
    "reduccion-filas": <RowReductionAnimation />,
    "cambio-de-base": <ChangeOfBasis2D />,
  };
  const visual = visuals[name];
  return visual ? <div className="movable-course-visual">{visual}</div> : null;
}

function SectionContent({ html }: { html: string }) {
  const operations: Array<{ start: number; end: number; element: JSX.Element | null }> = [];
  const visualMarkerPattern = /(?:<p>\s*)?<span class="cmspec-visual-anchor" data-cmspec-visual="([^"]+)"><\/span>(?:\s*<\/p>)?/g;

  for (const match of html.matchAll(visualMarkerPattern)) {
    if (match.index === undefined) continue;
    const element = visualElement(match[1]);
    if (element) {
      operations.push({
        start: match.index,
        end: match.index + match[0].length,
        element,
      });
    }
  }

  const replacedSourceExamples = [
    {
      start: findTheoremStart(html, "ejem", "1.7"),
      end: findTheoremStart(html, "ejem", "1.8"),
    },
    {
      start: findTheoremStart(html, "ejem", "1.10"),
      end: findTheoremStart(html, "prop", "1.11"),
    },
    {
      start: findTheoremStart(html, "ejem", "1.13"),
      end: findTheoremStart(html, "rmk", "1.14"),
    },
    {
      start: findTheoremStart(html, "ejem", "1.19"),
      end: html.indexOf("<p>Con esta definición, es posible mostrar que:"),
    },
    {
      start: findTheoremStart(html, "ejem", "1.22"),
      end: html.indexOf("<p>La multiplicación entre matrices"),
    },
    {
      start: findTheoremStart(html, "ejem", "1.24"),
      end: html.indexOf("<p>La multiplicación de matrices no es conmutativa"),
    },
    {
      start: findTheoremStart(html, "ejem", "1.40"),
      end: findTheoremStart(html, "defin", "1.41"),
    },
  ];

  replacedSourceExamples.forEach(({ start, end }) => {
    if (start >= 0 && end > start) operations.push({ start, end, element: null });
  });

  if (operations.length === 0) {
    return <div className="latex-content" dangerouslySetInnerHTML={{ __html: html }} />;
  }

  operations.sort((a, b) => a.start - b.start);
  let cursor = 0;

  return (
    <>
      {operations.map((operation, index) => {
        const before = html.slice(cursor, operation.start);
        cursor = operation.end;
        return (
          <div className="course-content-fragment" key={`${operation.start}-${index}`}>
            {before && <div className="latex-content" dangerouslySetInnerHTML={{ __html: before }} />}
            {operation.element}
          </div>
        );
      })}
      {cursor < html.length && <div className="latex-content" dangerouslySetInnerHTML={{ __html: html.slice(cursor) }} />}
    </>
  );
}

export default function LinearAlgebraCoursePage() {
  const course = linearAlgebraCourse;
  const definitionsByUnit = linearAlgebraChapters.map((chapter) =>
    getDefinitionIndex(chapter.sections.map((section) => section.html).join("")),
  );
  const indexUnits = course.units.map((unit, index) => ({
    number: unit.number,
    title: unit.title,
    href: `#lectura-unidad-${index + 1}`,
    items: definitionsByUnit[index].map((definition) => ({
      href: `#${definition.id}`,
      label: definition.label,
      title: definition.name,
    })),
  }));

  return (
    <main className="course-page linear-algebra-course">
      <SolutionDisclosures />
      <SiteHeader />

      <article className="course-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">{course.eyebrow}</p>
        <h1>{course.title}</h1>
        <p className="course-deck">{course.introduction}</p>
        <div className="course-meta">
          <div><span>AUTORA</span><strong>{course.author}</strong></div>
          <div><span>COLECCIÓN</span><strong>CMSpec · Aprender</strong></div>
          <div><span>CONTENIDO</span><strong>6 unidades · Apuntes completos</strong></div>
        </div>
      </article>

      <div className="course-article-layout">
        <CourseIndex units={indexUnits} note={course.note} />

        <section className="course-reader" aria-labelledby="course-reader-title">
          <header className="reader-heading">
            <p>APUNTES COMPLETOS</p>
            <h2 id="course-reader-title">Bases del álgebra lineal.</h2>
            <p>Abre una unidad para consultar sus definiciones, teoremas, ejemplos, observaciones y fórmulas.</p>
          </header>

          <div className="reading-chapters">
            {linearAlgebraChapters.map((chapter, chapterIndex) => (
              <details
                className={`reading-chapter chapter-tone-${(chapterIndex % 4) + 1}`}
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
                      <SectionContent
                        html={section.html}
                      />
                    </section>
                  ))}
                </article>
              </details>
            ))}
          </div>
        </section>

        <aside className="course-margin-note">
          <span>CMSpec / 01</span>
          <p>Un espacio para leer, relacionar ideas y explorar la estructura detrás de los cálculos.</p>
        </aside>
      </div>

      <footer className="course-footer">
        <p>CMSpec · Un espectro de intereses</p>
        <a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a>
      </footer>
    </main>
  );
}
