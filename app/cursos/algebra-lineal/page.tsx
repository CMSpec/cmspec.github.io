import { linearAlgebraCourse } from "../../../content/courses/algebra-lineal";
import { linearAlgebraChapters } from "../../../content/courses/algebra-lineal-chapters";
import MatrixScalarAnimation from "./MatrixScalarAnimation";
import MatrixMultiplicationAnimation from "./MatrixMultiplicationAnimation";
import { DotProductAnimation, MatrixAdditionAnimation } from "./MatrixOperationsAnimations";
import { SymmetryAnimation, TraceAnimation, TriangularMatricesAnimation } from "./MatrixStructureAnimations";

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

function SectionContent({ html, placeVisual }: { html: string; placeVisual: boolean }) {
  const marker = '<div class="defin_thmwrapper';
  const markerIndex = placeVisual ? html.indexOf(marker) : -1;
  const operations: Array<{ start: number; end: number; element: ReturnType<typeof RowVectorVisual> }> = [];

  if (markerIndex >= 0) operations.push({ start: markerIndex, end: markerIndex, element: <RowVectorVisual /> });

  const traceInsertionMarker = '<div class="ejem_thmwrapper theorem-style-plain" id="unidad-1-a0000000017">';
  const traceInsertionIndex = html.indexOf(traceInsertionMarker);
  if (traceInsertionIndex >= 0) {
    operations.push({ start: traceInsertionIndex, end: traceInsertionIndex, element: <TraceAnimation /> });
  }

  const animatedExamples = [
    {
      startMarker: '<div class="ejem_thmwrapper theorem-style-plain" id="unidad-1-a0000000019">',
      endMarker: '<div class="ejem_thmwrapper theorem-style-plain" id="unidad-1-a0000000020">',
      element: <TriangularMatricesAnimation />,
    },
    {
      startMarker: '<div class="ejem_thmwrapper theorem-style-plain" id="unidad-1-a0000000023">',
      endMarker: '<div class="prop_thmwrapper theorem-style-plain" id="unidad-1-traspuesta">',
      element: <SymmetryAnimation />,
    },
    {
      startMarker: '<div class="ejem_thmwrapper theorem-style-plain" id="unidad-1-a0000000027">',
      endMarker: '<div class="rmk_thmwrapper theorem-style-plain" id="unidad-1-a0000000029">',
      element: <MatrixAdditionAnimation />,
    },
    {
      startMarker: '<div class="ejem_thmwrapper theorem-style-plain" id="unidad-1-a0000000036">',
      endMarker: "<p>Con esta definición, es posible mostrar que:",
      element: <MatrixScalarAnimation />,
    },
    {
      startMarker: '<div class="ejem_thmwrapper theorem-style-plain" id="unidad-1-a0000000043">',
      endMarker: '<p>La multiplicación entre matrices',
      element: <DotProductAnimation />,
    },
    {
      startMarker: '<div class="ejem_thmwrapper theorem-style-plain" id="unidad-1-a0000000047">',
      endMarker: '<p>La multiplicación de matrices no es conmutativa',
      element: <MatrixMultiplicationAnimation />,
    },
  ];

  animatedExamples.forEach(({ startMarker, endMarker, element }) => {
    const start = html.indexOf(startMarker);
    const end = html.indexOf(endMarker, start);
    if (start >= 0 && end > start) operations.push({ start, end, element });
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
  const firstDefinitionSectionIndex = linearAlgebraChapters[0].sections.findIndex((section) =>
    section.html.includes('<div class="defin_thmwrapper'),
  );

  return (
    <main className="course-page">
      <header className="course-header">
        <a className="brand" href="/" aria-label="CMSpec, volver al inicio">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>CMSpec</span>
        </a>
        <span className="course-publication">APUNTES · ÁLGEBRA LINEAL</span>
        <a className="course-back" href="/aprender">Todos los apuntes ↗</a>
      </header>

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
        <aside className="course-toc" aria-label="Índice del curso">
          <p>EN ESTE CURSO</p>
          <nav>
            {course.units.map((unit, index) => (
              <div className="course-toc-group" key={unit.number}>
                <a className="course-toc-unit" href={`#lectura-unidad-${index + 1}`}>
                  <span>{unit.number}</span>{unit.title}
                </a>
                {definitionsByUnit[index].length > 0 && (
                  <div className="course-definition-list" aria-label={`Definiciones de ${unit.title}`}>
                    {definitionsByUnit[index].map((definition) => (
                      <a href={`#${definition.id}`} key={definition.id}>
                        <span>{definition.label}</span>{definition.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <small>{course.note}</small>
        </aside>

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
                        placeVisual={chapterIndex === 0 && sectionIndex === firstDefinitionSectionIndex}
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
