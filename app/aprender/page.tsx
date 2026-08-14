import { courseNotes } from "../../content/course-library";
import SiteHeader from "../_components/SiteHeader";

export default function LearnPage() {
  return (
    <main className="learn-page course-library-page">
      <SiteHeader />

      <section className="learn-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">CMSPEC / APUNTES DE PREGRADO</p>
        <h1>Aprender</h1>
        <div className="learn-deck">
          <p>Una biblioteca de ideas matemáticas para leer con calma, conectar conceptos y volver a consultar.</p>
        </div>
      </section>

      <section className="notes-library" aria-label="Apuntes disponibles">
        <div className="notes-list">
          {courseNotes.map((note) => (
            <article className="note-entry" key={note.href}>
              <div className="note-dates">
                <p><span>PUBLICACIÓN</span><time>{note.published}</time></p>
                <p><span>ÚLTIMA MODIFICACIÓN</span><time>{note.modified}</time></p>
              </div>
              <div className="note-entry-copy">
                <p>{note.number} / APUNTES DE PREGRADO</p>
                <h3><a href={note.href}>{note.title}</a></h3>
                <p className="note-subtitle">{note.subtitle}</p>
                <p className="note-authors">Por {note.authors}</p>
                <p className="note-description">{note.description}</p>
              </div>
              <a className="note-visual" href={note.href} aria-label={`Abrir ${note.title}`}>
                <span>{note.formula}</span>
                <small>VISUAL POR INCORPORAR</small>
              </a>
            </article>
          ))}
        </div>
      </section>

      <aside className="learn-colophon">
        <span>CMSpec · UN ESPECTRO DE INTERESES</span>
        <p>Los apuntes son documentos vivos: pueden ampliarse y corregirse a medida que avanza la enseñanza.</p>
      </aside>

      <footer className="course-footer">
        <p>CMSpec · Aprender</p>
        <a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a>
      </footer>
    </main>
  );
}
