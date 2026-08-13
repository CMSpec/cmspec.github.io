import Image from "next/image";
import { siteContent } from "../content/site";
import { collections } from "../content/collections";
import { courseNotes } from "../content/course-library";

const notes = courseNotes.filter((note) => note.href !== "/cursos/laboratorio-algebra-lineal");
const textileNotes = collections.find((collection) => collection.slug === "tejido")!.entries;

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
  const { brand, navigation, about } = siteContent;

  return (
    <main className="home-page flat-home">
      <header className="site-header flat-header">
        <a className="brand" href="#inicio" aria-label={`${brand.name}, inicio`}>
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>{brand.name}</span>
        </a>
        <nav aria-label={navigation.ariaLabel}>
          <a href="#notas">Notas</a>
          <a href="#laboratorio">Laboratorio</a>
          <a href="#tejido">Tejido</a>
          <a href="/sobre-mi">Sobre mí</a>
        </nav>
        <a className="header-cta" href="#contacto">Contacto <span aria-hidden="true">↗</span></a>
      </header>

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
          <a href="/investigacion/notas-matematicas" className="flat-entry">
            <span className="flat-entry-title">Notas matemáticas</span>
            <span className="flat-entry-meta"><small>investigación</small><i aria-hidden="true">↗</i></span>
          </a>
        </div>
      </section>

      <section className="flat-section flat-lab" id="laboratorio" aria-labelledby="lab-title">
        <header className="flat-section-heading">
          <h2 id="lab-title">Laboratorio</h2>
          <p>Demostraciones para mover, probar y observar operaciones de Álgebra Lineal en lugar de ver solamente el resultado.</p>
        </header>
        <div className="flat-lab-gallery">
          {labPieces.map((piece) => (
            <a href={piece.href} className="flat-lab-piece" key={piece.href}>
              <div className={`flat-lab-visual visual-${piece.visual}`} aria-hidden="true">
                {piece.visual === "vector" && <><span className="axis-x" /><span className="axis-y" /><b className="arrow-one">→</b><b className="arrow-two">→</b></>}
                {piece.visual === "matrix" && <><span>1</span><span>2</span><span>0</span><span>3</span><span>4</span><span>5</span><span>0</span><span>2</span><span>6</span></>}
                {piece.visual === "operation" && <strong>(3, 5, 8) + (1, −2, 4)</strong>}
                {piece.visual === "basis" && <><span className="basis-a">e₁</span><span className="basis-b">e₂</span><span className="basis-c">v</span></>}
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

      <footer id="contacto" className="flat-footer">
        <a className="brand footer-brand" href="#inicio"><span className="brand-mark"><i /><i /><i /><i /></span>{brand.name}</a>
        <p>{brand.tagline}</p>
        <a href={`mailto:${brand.email}`}>{brand.email} <span>↗</span></a>
        <small>© {new Date().getFullYear()} {brand.owner}</small>
      </footer>
    </main>
  );
}
