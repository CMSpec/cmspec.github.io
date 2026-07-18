const notes = [
  {
    number: "01",
    title: "Álgebra Lineal",
    description: "Vectores, matrices, sistemas, espacios vectoriales, transformaciones y cambios de base.",
    meta: "6 unidades · Lectura completa",
    href: "/cursos/algebra-lineal",
    tone: "blue",
    formula: "A\u2009x = b",
  },
  {
    number: "02",
    title: "Ecuaciones Diferenciales",
    description: "Métodos de primer orden, ecuaciones de orden superior, Laplace, Fourier y problemas de frontera.",
    meta: "11 clases · Lectura completa",
    href: "/cursos/ecuaciones-diferenciales",
    tone: "green",
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
          <span>EDICIÓN EN CURSO · 2026</span>
        </div>
      </section>

      <section className="notes-library" aria-labelledby="notes-title">
        <header>
          <p>01 / COLECCIÓN</p>
          <h2 id="notes-title">Apuntes disponibles</h2>
          <p>Cada curso conserva la estructura de los originales en LaTeX y la transforma en una lectura web integrada a CMSpec.</p>
        </header>

        <div className="notes-grid">
          {notes.map((note) => (
            <a className={`note-card note-${note.tone}`} href={note.href} key={note.href}>
              <div className="note-card-top"><span>{note.number}</span><span>APUNTES ↗</span></div>
              <div className="note-formula" aria-hidden="true">{note.formula}</div>
              <div className="note-card-copy">
                <p>{note.meta}</p>
                <h3>{note.title}</h3>
                <p>{note.description}</p>
              </div>
            </a>
          ))}
          <article className="note-card note-future">
            <div className="note-card-top"><span>03</span><span>PRÓXIMAMENTE</span></div>
            <div className="note-formula" aria-hidden="true">∑</div>
            <div className="note-card-copy">
              <p>COLECCIÓN ABIERTA</p>
              <h3>Próximo cuaderno</h3>
              <p>Este espacio crecerá con nuevas materias, visualizaciones y relaciones entre ideas.</p>
            </div>
          </article>
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
