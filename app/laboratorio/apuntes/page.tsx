import SiteHeader from "../../_components/SiteHeader";
import { courseLaboratories } from "../../../content/course-laboratories";
import { sitePath } from "../../../lib/site-path";

export default function NotesLaboratoryPage() {
  return <main className="learn-page course-library-page laboratory-page">
    <SiteHeader/>
    <section className="learn-masthead laboratory-masthead"><div className="course-spectrum" aria-hidden="true"><i/><i/><i/><i/></div><p className="course-kicker">CMSPEC / LABORATORIO</p><h1>Laboratorios de cursos</h1><div className="learn-deck"><p>Elige un curso para explorar sus conceptos con animaciones y visualizaciones organizadas por temas.</p></div><a className="laboratory-back-link" href={sitePath("/laboratorio")}>← Todas las colecciones</a></section>
    <section className="notes-library" aria-label="Laboratorios disponibles"><div className="notes-list">{courseLaboratories.map((lab,i) => <a key={lab.slug} className="note-entry laboratory-collection-entry lab-green" href={sitePath(`/laboratorio/${lab.slug}`)}><div className="note-dates"><p><span>LABORATORIO</span><strong>{String(i+1).padStart(2,"0")}</strong></p></div><div className="note-entry-copy"><h3>{lab.title}</h3><p className="note-description">{lab.description}</p></div><span className="note-visual laboratory-collection-visual" aria-hidden="true"><span>{lab.formula}</span><small>EXPLORAR →</small></span></a>)}</div></section>
    <footer className="course-footer"><p>CMSpec · Laboratorio</p><a href={sitePath("/laboratorio")}>← Laboratorio</a></footer>
  </main>;
}
