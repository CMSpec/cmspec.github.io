import { collections } from "../../content/collections";
import { courseNotes } from "../../content/course-library";

const noteAreas = [
  {
    number: "01",
    title: "Matemáticas",
    href: "/investigacion",
    tone: "blue",
    entries: collections.find((collection) => collection.slug === "investigacion")!.entries,
  },
  {
    number: "02",
    title: "Salud",
    href: "/salud",
    tone: "olive",
    entries: collections.find((collection) => collection.slug === "salud")!.entries,
  },
  {
    number: "03",
    title: "Aprender",
    href: "/aprender",
    tone: "green",
    entries: courseNotes,
  },
];

const textileEntries = collections.find((collection) => collection.slug === "tejido")!.entries;

export default function SiteHeader() {
  return (
    <header className="site-header flat-header global-site-header">
      <a className="brand" href="/#inicio" aria-label="CMSpec, inicio">
        <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
        <span>CMSpec</span>
      </a>
      <nav aria-label="Navegación principal">
        <details className="site-index-menu notes-index-menu">
          <summary>Notas <span aria-hidden="true">⌄</span></summary>
          <div className="site-index-panel notes-index-panel">
            <div className="site-index-grid">
              {noteAreas.map((area) => (
                <section className={`site-index-area index-${area.tone}`} key={area.href}>
                  <a className="site-index-area-title" href={area.href}>
                    <span>{area.number}</span><strong>{area.title}</strong><i>↗</i>
                  </a>
                  <div>
                    {area.entries.map((entry) => (
                      <a href={entry.href} key={entry.href}>{entry.title}<span>→</span></a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </details>
        <a href="/laboratorio">Laboratorio</a>
        <details className="site-index-menu textile-index-menu">
          <summary>Tejido <span aria-hidden="true">⌄</span></summary>
          <div className="site-index-panel textile-index-panel">
            <section className="site-index-area index-pink">
              <a className="site-index-area-title" href="/tejido">
                <span>04</span><strong>Tejido & estructuras</strong><i>↗</i>
              </a>
              <div>
                {textileEntries.map((entry) => (
                  <a href={entry.href} key={entry.href}>{entry.title}<span>→</span></a>
                ))}
              </div>
            </section>
          </div>
        </details>
        <a href="/sobre-mi">Sobre mí</a>
      </nav>
      <a className="header-cta" href="/#contacto">Contacto <span aria-hidden="true">↗</span></a>
    </header>
  );
}
