import { notFound } from "next/navigation";
import SiteHeader from "../../_components/SiteHeader";
import { courseLaboratories } from "../../../content/course-laboratories";
import { courseLabSections } from "../CourseLabContent";
import { sitePath } from "../../../lib/site-path";

export const dynamicParams = false;
export function generateStaticParams() { return courseLaboratories.map(lab => ({ course: lab.slug })); }
export async function generateMetadata({ params }: { params: Promise<{course: string}> }) {
  const { course } = await params;
  const lab = courseLaboratories.find(item => item.slug === course);
  return { title: lab ? `Laboratorio de ${lab.title} | CMSpec` : "Laboratorio" };
}
export default async function CourseLabPage({ params }: { params: Promise<{course: string}> }) {
  const { course } = await params;
  const lab = courseLaboratories.find(item => item.slug === course);
  if (!lab) notFound();
  const sections = courseLabSections[lab.slug];
  const count = sections.reduce((sum, section) => sum + section.items.length, 0);
  return <main className="course-page visual-compendium-page">
    <SiteHeader/>
    <article className="course-masthead">
      <div className="course-spectrum" aria-hidden="true"><i/><i/><i/><i/></div>
      <p className="course-kicker">LABORATORIO · {lab.title}</p>
      <h1>Laboratorio de {lab.title}</h1><p className="course-deck">{lab.description}</p>
      <div className="course-meta"><div><span>COLECCIÓN</span><strong>CMSpec · Laboratorio</strong></div><div><span>CONTENIDO</span><strong>{count} exploraciones interactivas</strong></div></div>
      <a className="laboratory-back-link" href={sitePath("/laboratorio/apuntes")}>← Todos los laboratorios de cursos</a>
    </article>
    <nav className="visual-compendium-nav" aria-label="Secciones del laboratorio">{sections.map((section,i) => <a href={`#${section.id}`} key={section.id}><span>{String(i+1).padStart(2,"0")}</span>{section.title}</a>)}</nav>
    <div className="visual-compendium">{sections.map((section,i) => <section className="visual-compendium-section" id={section.id} key={section.id}>
      <header><span>{String(i+1).padStart(2,"0")} / {section.title.toUpperCase()}</span><h2>{section.heading}</h2><p>{section.description}</p></header>
      <div className="visual-compendium-stack">{section.items.map(item => <div className="course-lab-exploration" key={item.title}><h3>{item.title}</h3><p>{item.subtitle}</p>{item.render()}<a className="laboratory-back-link" href={sitePath(item.href)}>Leer la explicación en el curso →</a></div>)}</div>
    </section>)}</div>
    <footer className="course-footer"><a href={sitePath("/laboratorio")}>← Laboratorio</a><p>CMSpec · {lab.title}</p></footer>
  </main>;
}
