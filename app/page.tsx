import Image from "next/image";
import { siteContent } from "../content/site";
import { collections } from "../content/collections";
import { courseNotes } from "../content/course-library";
import { aboutGallery } from "../content/about-gallery";
import SiteHeader from "./_components/SiteHeader";

const notes = courseNotes.filter((note) => note.href !== "/cursos/laboratorio-algebra-lineal");
const textileNotes = collections.find((collection) => collection.slug === "tejido")!.entries;
const recentGallery = [aboutGallery[0], aboutGallery[4], aboutGallery[5]];
const galleryCategories = { bookbinding: "Bookbinding", tejidos: "Tejidos", viajes: "Viajes" } as const;

const labPieces = [
  { number: "01", title: "Vectores", caption: "Escalares, suma y combinaciones", href: "/cursos/laboratorio-algebra-lineal#vectores", visual: "vector" },
  { number: "02", title: "Matrices", caption: "Traza, regiones y simetría", href: "/cursos/laboratorio-algebra-lineal#estructura", visual: "matrix" },
  { number: "03", title: "Operaciones", caption: "Productos y cálculos paso a paso", href: "/cursos/laboratorio-algebra-lineal#operaciones", visual: "operation" },
  { number: "04", title: "Transformaciones", caption: "Reducción por filas y cambio de base", href: "/cursos/laboratorio-algebra-lineal#transformaciones", visual: "basis" },
] as const;

function InteractiveMark() {
  return <span className="flat-interactive" title="Contiene elementos interactivos"><b aria-hidden="true">✦</b> interactivo</span>;
}

export default function Home() {
  const { brand, about } = siteContent;

  return (
    <main className="home-page flat-home">
      <SiteHeader />

      <section className="flat-intro" id="inicio">
        <figure>
          <Image src="/images/camila-tejido-y-gatos.jpeg" alt="Camila con un tejido azul y violeta, acompañada por sus dos gatos" width={1200} height={1600} priority />
        </figure>
        <div>
          <p className="flat-kicker">CAMILA MUÑOZ SANTANDER · CMSpec</p>
          <h1>Matemáticas, docencia y estructuras que también se piensan con las manos.</h1>
          <p>{about.introduction} En este sitio reúno apuntes, visualizaciones y escritos sobre matemática, salud pública, tejido y otros intereses.</p>
          <a href="/sobre-mi">Más sobre mí <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="flat-section" id="notas" aria-labelledby="notes-title">
        <header className="flat-section-heading">
          <h2 id="notes-title">Notas</h2>
          <p>Apuntes de pregrado y cuadernos de trabajo para estudiar ideas matemáticas con calma y volver a consultarlas.</p>
        </header>
        <div className="flat-entry-list">
          {notes.map((note) => (
            <a href={note.href} className="flat-entry" key={note.href}>
              <span className="flat-entry-title">{note.title}</span>
              <span className="flat-entry-meta"><InteractiveMark /><i aria-hidden="true">↗</i></span>
            </a>
          ))}
          <a href="/investigacion" className="flat-entry">
            <span className="flat-entry-title">Notas matemáticas</span>
            <span className="flat-entry-meta"><small>investigación</small><i aria-hidden="true">↗</i></span>
          </a>
        </div>
      </section>

      <section className="flat-section flat-lab" id="laboratorio" aria-labelledby="lab-title">
        <header className="flat-section-heading">
          <h2 id="lab-title"><a href="/laboratorio">Laboratorio</a></h2>
          <p>Demostraciones para mover, probar y observar operaciones de Álgebra Lineal en lugar de ver solamente el resultado.</p>
        </header>
        <div className="flat-lab-gallery">
          {labPieces.map((piece) => (
            <a href={piece.href} className="flat-lab-piece" key={piece.href}>
              <div className={`flat-lab-visual visual-${piece.visual}`} aria-hidden="true">
                {piece.visual === "vector" && <><span className="axis-x" /><span className="axis-y" /><b className="arrow-one">→</b><b className="arrow-two">→</b></>}
                {piece.visual === "matrix" && <><span>1</span><span>2</span><span>0</span><span>3</span><span>4</span><span>5</span><span>0</span><span>2</span><span>6</span></>}
                {piece.visual === "operation" && <strong>(3, 5, 8) + (1, −2, 4)</strong>}
                {piece.visual === "basis" && (
                  <div className="linear-thumbnail">
                    <div className="linear-thumbnail-plane is-before"><i /><span>antes</span></div>
                    <b aria-hidden="true">→</b>
                    <div className="linear-thumbnail-plane is-after"><i /><span>después</span></div>
                  </div>
                )}
              </div>
              <div className="flat-lab-caption"><span>{piece.number}</span><strong>{piece.title}</strong><p>{piece.caption}</p><InteractiveMark /></div>
            </a>
          ))}
        </div>
      </section>

      <section className="flat-section" id="tejido" aria-labelledby="textile-title">
        <header className="flat-section-heading">
          <h2 id="textile-title">Tejido & estructuras</h2>
          <p>Artículos sobre topología, álgebra, superficies y computación vistos desde la experiencia material de tejer.</p>
        </header>
        <div className="flat-entry-list">
          {textileNotes.map((entry) => (
            <a href={entry.href} className="flat-entry" key={entry.href}>
              <span className="flat-entry-title">{entry.title}</span>
              <span className="flat-entry-meta"><InteractiveMark /><i aria-hidden="true">↗</i></span>
            </a>
          ))}
        </div>
      </section>

      <section className="flat-section flat-recent" id="ultimamente" aria-labelledby="recent-title">
        <header className="flat-section-heading flat-recent-heading">
          <div>
            <h2 id="recent-title">Últimamente</h2>
            <p>Encuadernaciones, tejidos, viajes y otras cosas que he estado haciendo fuera de la pantalla.</p>
          </div>
          <a href="/sobre-mi#galeria">Ver la galería completa <span aria-hidden="true">→</span></a>
        </header>
        <div className="flat-recent-grid">
          {recentGallery.map((entry) => (
            <a className="flat-recent-card" href="/sobre-mi#galeria" key={entry.src}>
              <div className="flat-recent-image">
                <Image src={entry.src} alt={entry.alt} width={900} height={900} />
              </div>
              <p>{galleryCategories[entry.category]} · {entry.date}</p>
              <strong>{entry.title}</strong>
            </a>
          ))}
        </div>
      </section>

      <footer id="contacto" className="flat-footer">
        <a className="brand footer-brand" href="#inicio"><span className="brand-mark"><i /><i /><i /><i /></span>{brand.name}</a>
        <p>{brand.tagline}</p>
        <a href={`mailto:${brand.email}`}>{brand.email} <span>↗</span></a>
        <small>© {new Date().getFullYear()} {brand.owner}</small>
      </footer>
    </main>
  );
}
