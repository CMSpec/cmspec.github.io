import { collections } from "../../content/collections";

const learningEntries = [
  { title: "Álgebra Lineal", href: "/cursos/algebra-lineal", subtitle: "Bases para construir una mirada lineal" },
  { title: "Ecuaciones Diferenciales", href: "/cursos/ecuaciones-diferenciales", subtitle: "De una razón de cambio local a una trayectoria completa" },
];

const areas = [
  { number: "01", title: "Investigación & Math", href: "/investigacion", tone: "olive", entries: collections.find((item) => item.slug === "investigacion")!.entries },
  { number: "02", title: "Colaboraciones en Salud", href: "/salud", tone: "blue", entries: collections.find((item) => item.slug === "salud")!.entries },
  { number: "03", title: "Apuntes y exploración", href: "/aprender", tone: "green", entries: learningEntries },
  { number: "04", title: "Tejido & Patrones", href: "/tejido", tone: "pink", entries: collections.find((item) => item.slug === "tejido")!.entries },
];

export default function SiteMapPage() {
  return (
    <main className="sitemap-page">
      <header className="course-header">
        <a className="brand" href="/" aria-label="CMSpec, volver al inicio">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>CMSpec</span>
        </a>
        <span className="course-publication">CMSPEC · MAPA DEL SITIO</span>
        <a className="course-back" href="/">Volver al inicio ↗</a>
      </header>

      <section className="sitemap-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">CMSPEC / TODAS LAS RUTAS</p>
        <h1>Mapa del sitio</h1>
        <p>Una vista completa del espectro y de las entradas que viven dentro de cada área.</p>
      </section>

      <section className="sitemap-tree" aria-label="Estructura de CMSpec">
        <a className="sitemap-root" href="/">
          <span>INICIO</span>
          <strong>CMSpec</strong>
          <small>Un espectro de intereses</small>
        </a>
        <div className="sitemap-branches">
          {areas.map((area) => (
            <article className={`sitemap-branch sitemap-${area.tone}`} key={area.href}>
              <a className="sitemap-area" href={area.href}>
                <span>{area.number}</span>
                <strong>{area.title}</strong>
                <small>Página principal ↗</small>
              </a>
              <div className="sitemap-entries">
                {area.entries.map((entry) => (
                  <a href={entry.href} key={entry.href}>
                    <span>{entry.title}</span>
                    <small>{entry.subtitle}</small>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="sitemap-secondary">
        <p>OTROS ENLACES</p>
        <a href="/#archivo">Archivo en construcción ↗</a>
        <a href="/#contacto">Contacto ↗</a>
      </aside>

      <footer className="course-footer">
        <p>CMSpec · Mapa del sitio</p>
        <a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a>
      </footer>
    </main>
  );
}
