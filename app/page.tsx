import { siteContent } from "../content/site";
import { collections } from "../content/collections";
import { courseNotes } from "../content/course-library";

const indexAreas = [
  { number: "01", title: "Investigación & Math", href: "/investigacion", tone: "blue", entries: collections.find((item) => item.slug === "investigacion")!.entries },
  { number: "02", title: "Colaboraciones en Salud", href: "/salud", tone: "olive", entries: collections.find((item) => item.slug === "salud")!.entries },
  {
    number: "03", title: "Apuntes y exploración", href: "/aprender", tone: "green",
    entries: courseNotes.map(({ title, href }) => ({ title, href })),
  },
  { number: "04", title: "Tejido & Patrones", href: "/tejido", tone: "pink", entries: collections.find((item) => item.slug === "tejido")!.entries },
];

export default function Home() {
  const { brand, navigation, hero, domains, spectrumSection, archive } = siteContent;

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label={`${brand.name}, inicio`}>
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>{brand.name}</span>
        </a>
        <nav aria-label={navigation.ariaLabel}>
          <details className="site-index-menu">
            <summary>Espectro <span aria-hidden="true">⌄</span></summary>
            <div className="site-index-panel">
              <div className="site-index-intro">
                <p>ÍNDICE DEL SITIO</p>
                <strong>Todo el espectro de CMSpec.</strong>
                <a href="#espectro">Ver las áreas en la portada →</a>
              </div>
              <div className="site-index-grid">
                {indexAreas.map((area) => (
                  <section className={`site-index-area index-${area.tone}`} key={area.href}>
                    <a className="site-index-area-title" href={area.href}>
                      <span>{area.number}</span><strong>{area.title}</strong><i>↗</i>
                    </a>
                    <div>
                      {area.entries.map((entry) => <a href={entry.href} key={entry.href}>{entry.title}<span>→</span></a>)}
                    </div>
                  </section>
                ))}
              </div>
              <div className="site-index-footer">
                <a href="#archivo">Archivo</a><a href="#contacto">Contacto</a>
              </div>
            </div>
          </details>
          {navigation.links.map((link) => (
            <a href={link.href} key={link.href}>{link.label}</a>
          ))}
        </nav>
        <a className="header-cta" href="#contacto">
          {navigation.contactLabel} <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="kicker"><span /> {hero.kicker}</p>
          <h1>
            {hero.title} <em>{hero.highlightedTitle}</em>
          </h1>
          <p className="hero-intro">{hero.introduction}</p>
        </div>

        <div className="spectrum-stage" aria-label={hero.visualizationLabel}>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="spectrum-core">
            <span>CM</span>
            <small>SPEC</small>
          </div>
          {domains.map((domain, index) => (
            <a
              className={`spectrum-node node-${index + 1}`}
              key={domain.id}
              href={domain.href}
              style={{ "--node-color": domain.color } as React.CSSProperties}
            >
              <span>{domain.short}</span>
              {domain.title}
            </a>
          ))}
          <a className="button primary stage-cta" href="#espectro">{hero.primaryAction}</a>
        </div>
      </section>

      <div className="spectrum-rule" aria-hidden="true"><i /><i /><i /><i /></div>

      <section className="domains-section" id="espectro">
        <div className="section-heading">
          <p className="section-index">{spectrumSection.index}</p>
          <h2>{spectrumSection.titleFirstLine}<br />{spectrumSection.titleSecondLine}</h2>
          <p>{spectrumSection.description}</p>
        </div>
        <div className="domain-grid">
          {domains.map((domain, index) => (
            <a
              className={`domain-card card-${index + 1}`}
              href={domain.href}
              id={domain.id}
              key={domain.id}
            >
              <div className="card-top"><span>{domain.short}</span><span className="card-arrow">↗</span></div>
              <p className="card-eyebrow">{domain.eyebrow}</p>
              <h3>{domain.title}</h3>
              <p>{domain.description}</p>
              <span className="domain-card-link">{domain.linkLabel} <span>→</span></span>
            </a>
          ))}
        </div>
      </section>

      <section className="archive-section" id="archivo">
        <p className="section-index">{archive.index}</p>
        <div>
          <h2>{archive.titleFirstLine}<br />{archive.titleSecondLine}</h2>
          <p>{archive.description}</p>
        </div>
        <div className="archive-list">
          {archive.topics.map((topic) => <span key={topic}>{topic}</span>)}
        </div>
      </section>

      <footer id="contacto">
        <a className="brand footer-brand" href="#inicio"><span className="brand-mark"><i /><i /><i /><i /></span>{brand.name}</a>
        <p>{brand.tagline}</p>
        <a href={`mailto:${brand.email}`}>{brand.email} <span>↗</span></a>
        <small>© {new Date().getFullYear()} {brand.owner}</small>
      </footer>
    </main>
  );
}
