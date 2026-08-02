import { BrandHeader } from "../_components/editorial";
import { siteContent } from "../../content/site";

export default function AboutPage() {
  const { about, brand } = siteContent;

  return (
    <main className="course-page editorial-entry tone-blue about-page">
      <BrandHeader label="SOBRE MÍ" backHref="/" />
      <article className="course-masthead editorial-entry-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">{about.index}</p>
        <h1>{about.titleFirstLine}<br />{about.titleSecondLine}</h1>
        <p className="course-deck">Matemáticas, docencia y exploraciones que conectan distintas partes de un mismo espectro.</p>
        <div className="course-meta">
          <div><span>SITIO</span><strong>{brand.name}</strong></div>
          <div><span>INTERESES</span><strong>Ideas · Visualización · Patrones</strong></div>
          <div><span>FORMATO</span><strong>Cuaderno abierto</strong></div>
        </div>
      </article>

      <section className="about-detail">
        <p className="about-detail-index">UNA PRESENTACIÓN</p>
        <figure className="about-detail-photo">
          <img src="/images/camila-tejido-y-gatos.jpeg" alt="Camila con un tejido azul y violeta, acompañada por sus dos gatos" />
          <figcaption>Tejido y compañía.</figcaption>
        </figure>
        <div className="about-detail-lead">
          <h2>Ideas que se encuentran.</h2>
          <p>{about.introduction}</p>
        </div>
        <div className="about-detail-copy">
          {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="about-interests" aria-label="Áreas de interés">
            {about.interests.map((interest) => <span key={interest}>{interest}</span>)}
          </div>
        </div>
      </section>

      <section className="about-spectrum" aria-label="Áreas que componen CMSpec">
        <a href="/investigacion"><span>01</span><strong>Investigación & Math</strong><small>Preguntas, modelos y notas matemáticas.</small></a>
        <a href="/salud"><span>02</span><strong>Colaboraciones en Salud</strong><small>Análisis y discusión en salud pública.</small></a>
        <a href="/aprender"><span>03</span><strong>Apuntes y exploración</strong><small>Cursos de pregrado y visualizaciones.</small></a>
        <a href="/tejido"><span>04</span><strong>Tejido & Estructuras</strong><small>Matemática que también se piensa con las manos.</small></a>
      </section>

      <footer className="course-footer"><p>CMSpec · Sobre mí</p><a href="/">Volver al espectro ↗</a></footer>
    </main>
  );
}
