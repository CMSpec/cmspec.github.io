import type { EditorialCollection, EditorialEntry } from "../../content/collections";
import SiteHeader from "./SiteHeader";

export function BrandHeader({ label, backHref = "/" }: { label: string; backHref?: string }) {
  void label;
  void backHref;
  return <SiteHeader />;
}

export function CollectionPage({ collection }: { collection: EditorialCollection }) {
  return (
    <main className={`learn-page course-library-page collection-library-page tone-${collection.tone}`}>
      <BrandHeader label={collection.label} />
      <section className="learn-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">{collection.kicker}</p>
        <h1>{collection.title}</h1>
        <div className="learn-deck"><p>{collection.deck}</p></div>
      </section>
      <section className="notes-library" aria-label={`Entradas de ${collection.label}`}>
        <div className="notes-list">
          {collection.entries.map((entry) => (
            <article className="note-entry" key={entry.href}>
              <div className="note-dates">
                <p><span>PUBLICACIÓN</span><time>{entry.published}</time></p>
                <p><span>ÚLTIMA MODIFICACIÓN</span><time>{entry.modified}</time></p>
              </div>
              <div className="note-entry-copy">
                <p>{entry.number} / {collection.label}</p>
                <h3><a href={entry.href}>{entry.title}</a></h3>
                <p className="note-subtitle">{entry.subtitle}</p>
                <p className="note-authors">Por {entry.authors}</p>
                <p className="note-description">{entry.description}</p>
              </div>
              <a className="note-visual" href={entry.href} aria-label={`Abrir ${entry.title}`}>
                <span>{entry.visual}</span><small>ENTRADA · CMSPEC</small>
              </a>
            </article>
          ))}
        </div>
      </section>
      <aside className="learn-colophon"><span>CMSpec · {collection.label}</span><p>{collection.colophon}</p></aside>
      <footer className="course-footer"><p>CMSpec · {collection.title}</p><a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a></footer>
    </main>
  );
}

export function EntryPage({ collection, entry }: { collection: EditorialCollection; entry: EditorialEntry }) {
  const proseLayout = collection.slug === "salud";
  return (
    <main className={`course-page editorial-entry tone-${collection.tone}`}>
      <BrandHeader label={collection.label} backHref={`/${collection.slug}`} />
      <article className="course-masthead editorial-entry-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">{entry.eyebrow}</p>
        <h1>{entry.title}</h1>
        <p className="course-deck">{entry.subtitle}</p>
        <div className="course-meta">
          <div><span>AUTORÍA</span><strong>{entry.authors}</strong></div>
          <div><span>COLECCIÓN</span><strong>{collection.label}</strong></div>
          <div><span>ESTADO</span><strong>Entrada en desarrollo</strong></div>
        </div>
      </article>
      <div className={`editorial-reading${proseLayout ? " editorial-reading-prose" : ""}`}>
        {!proseLayout && <aside className="editorial-entry-index"><span>{entry.number}</span><strong>{entry.visual}</strong></aside>}
        <article>
          <p className="editorial-lead">{entry.introduction}</p>
          {entry.sections.map((section, index) => (
            <section key={section.title}>
              {!proseLayout && <p>{String(index + 1).padStart(2, "0")}</p>}
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </article>
      </div>
      <footer className="course-footer"><p>CMSpec · {collection.title}</p><a href={`/${collection.slug}`}>Todas las entradas ↗</a></footer>
    </main>
  );
}
