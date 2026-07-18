const notes = [
  {
    number: "01",
    title: "Álgebra Lineal",
    description: "Vectores, matrices, sistemas, espacios vectoriales, transformaciones y cambios de base.",
    subtitle: "Bases para construir una mirada lineal",
    authors: "Camila Muñoz Santander",
    published: "18 julio 2026",
    modified: "18 julio 2026",
    href: "/cursos/algebra-lineal",
    formula: "A\u2009x = b",
  },
  {
    number: "02",
    title: "Ecuaciones Diferenciales",
    description: "Métodos de primer orden, ecuaciones de orden superior, Laplace, Fourier y problemas de frontera.",
    subtitle: "De una razón de cambio local a una trayectoria completa",
    authors: "Marcos Morales Inostroza y Camila Muñoz Santander",
    published: "18 julio 2026",
    modified: "18 julio 2026",
    href: "/cursos/ecuaciones-diferenciales",
    formula: "y′ = f(x, y)",
  },
] as const;

export default function LearnPage() {
  return (
    <main className="learn-page">
      <header className="course-header">
        <a className="brand" href="/" aria-label="CMSpec, volver al inicio">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>CMSpec</span>
        </a>
        <span className="course-publication">COLECCIÓN · APRENDER</span>
        <a className="course-back" href="/">Volver al espectro ↗</a>
      </header>

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
          {notes.map((note) => (
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
