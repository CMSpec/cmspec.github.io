import SiteHeader from "../_components/SiteHeader";
import SageMathCell from "./SageMathCell";
import { sitePath } from "../../lib/site-path";

const collections = [
  {
    number: "01",
    slug: "matematicas",
    title: "Matemáticas",
    subtitle: "Geometría para explorar",
    description: "Proyecciones, planos finitos y construcciones geométricas vinculadas con las notas matemáticas.",
    formula: "ℙ²(Fₚ)",
    tone: "blue",
  },
  {
    number: "02",
    slug: "apuntes",
    title: "Apuntes",
    subtitle: "Conceptos que se pueden mover",
    description: "Vectores, matrices, superficies, derivadas e integrales reunidos desde los cursos de pregrado.",
    formula: "Ax = b",
    tone: "green",
  },
  {
    number: "03",
    slug: "tejido",
    title: "Tejido & estructuras",
    subtitle: "De la materia a la forma",
    description: "Trenzas, identificaciones, superficies y patrones para experimentar con la matemática del tejido.",
    formula: "⟳",
    tone: "pink",
  },
] as const;

export default function LaboratoryPage() {
  return (
    <main className="learn-page course-library-page laboratory-page laboratory-home">
      <SiteHeader />

      <section className="learn-masthead laboratory-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">CMSPEC / COMPLEMENTOS INTERACTIVOS</p>
        <h1>Laboratorio</h1>
        <div className="learn-deck"><p>Un archivo de visualizaciones para experimentar con ideas matemáticas desde distintas colecciones del sitio.</p></div>
      </section>

      <section className="notes-library laboratory-collection-library" aria-label="Colecciones del laboratorio">
        <div className="notes-list">
          {collections.map((collection) => {
            const href = sitePath(`/laboratorio/${collection.slug}`);
            return (
              <a className={`note-entry laboratory-collection-entry lab-${collection.tone}`} href={href} aria-label={`Abrir laboratorio de ${collection.title}`} key={collection.slug}>
                <div className="note-dates">
                  <p><span>COLECCIÓN</span><strong>{collection.number}</strong></p>
                  <p><span>FORMATO</span><strong>INTERACTIVO</strong></p>
                </div>
                <div className="note-entry-copy">
                  <p>{collection.number} / LABORATORIO CMSPEC</p>
                  <h3>{collection.title}</h3>
                  <p className="note-subtitle">{collection.subtitle}</p>
                  <p className="note-description">{collection.description}</p>
                </div>
                <span className="note-visual laboratory-collection-visual" aria-hidden="true">
                  <span>{collection.formula}</span>
                  <small>ABRIR EL MENÚ ↗</small>
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="laboratory-calculator laboratory-home-calculator" aria-label="Calculadora SageMath">
        <header><span>CALCULADORA</span><h2>SageMath</h2><p>Un espacio libre para probar comandos sin salir del laboratorio.</p></header>
        <SageMathCell />
      </section>

      <aside className="learn-colophon"><span>CMSpec · LABORATORIO</span><p>Cada colección tiene su propio índice y conserva enlaces hacia las notas donde se explica el contexto.</p></aside>
      <footer className="course-footer"><p>CMSpec · Laboratorio</p><a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a></footer>
    </main>
  );
}
