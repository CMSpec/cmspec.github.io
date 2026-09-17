"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { sitePath } from "../../../lib/site-path";

export type CourseIndexItem = { href: string; label?: string; title: string };
export type CourseIndexUnit = { href: string; items?: CourseIndexItem[]; number: string; title: string };

export default function CourseIndex({ note, units }: { note?: string; units: CourseIndexUnit[] }) {
  const root = useRef<HTMLElement>(null);
  const topics = useMemo(() => units.flatMap(unit => (unit.items?.length ? unit.items : [unit]).map((item, i) => ({ ...item, unit: unit.title, number: unit.number + "." + (i + 1) }))), [units]);
  const [selection, setSelection] = useState<{ index: number; element: HTMLElement } | null>(null);

  useEffect(() => {
    const layout = root.current?.closest<HTMLElement>(".course-article-layout");
    if (!layout) return;
    let frame = 0;
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let hash = window.location.hash;
        try { hash = decodeURIComponent(hash); } catch { /* Keep malformed links on the index. */ }
        const target = hash ? document.getElementById(hash.slice(1)) : null;
        const chapter = target?.closest<HTMLDetailsElement>(".reading-chapter");
        const section = target?.closest<HTMLElement>(".chapter-section") ?? chapter?.querySelector<HTMLElement>(".chapter-section");
        const index = section ? topics.findIndex(topic => topic.href === "#" + section.id) : -1;
        const active = index >= 0 && section ? { index, element: section } : null;
        layout.classList.toggle("is-reading-topic", Boolean(active));
        layout.querySelectorAll<HTMLElement>(".chapter-section").forEach(element => { element.hidden = element !== active?.element; });
        layout.querySelectorAll<HTMLDetailsElement>(".reading-chapter").forEach(element => {
          const visible = element === chapter && Boolean(active);
          element.hidden = !visible;
          element.open = visible;
          element.classList.toggle("is-last-topic", visible && element.querySelector(".chapter-section:last-of-type") === section);
        });
        setSelection(active);
        const focusTarget = active ? section?.querySelector<HTMLElement>("h4") : root.current?.querySelector<HTMLElement>("h2");
        if (focusTarget) {
          focusTarget.tabIndex = -1;
          focusTarget.focus({ preventScroll: true });
          if (hash) (active ? (target === section || target === chapter ? layout : target ?? focusTarget) : root.current ?? focusTarget).scrollIntoView({ block: "start", behavior: "instant" });
        }
      });
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", sync); };
  }, [topics]);

  const current = selection ? topics[selection.index] : null;
  const previous = selection ? topics[selection.index - 1] : null;
  const next = selection ? topics[selection.index + 1] : null;
  return <nav className="course-topic-index" ref={root} aria-label="Temario del curso" id="temario">
    {current ? <div className="topic-reading-bar"><a href="#temario">← Volver al temario</a><span>{current.unit} · {selection!.index + 1} de {topics.length}</span></div> :
      <>
        <a className="topic-back" href={sitePath("/aprender")}>← Todos los cursos</a>
        <header className="topic-index-heading"><p>ELIGE POR DÓNDE EMPEZAR</p><h2>Temario del curso</h2><p>{units.length} unidades · {topics.length} minicapítulos. Abre un tema y avanza a tu ritmo.</p></header>
        <div className="topic-unit-grid">{units.map(unit => <section className="topic-unit-card" key={unit.href}>
          <header><span>{unit.number}</span><h3>{unit.title}</h3></header>
          <ol>{(unit.items?.length ? unit.items : [unit]).map((item, i) => <li key={item.href}><a href={item.href}><span className="topic-number">{unit.number}.{i + 1}</span><span>{item.title}</span><span aria-hidden="true">→</span></a></li>)}</ol>
        </section>)}</div>
        {note && <p className="topic-index-note">{note}</p>}
      </>}
    {selection && createPortal(<nav className="topic-pagination" aria-label="Continuar el curso">
      {previous ? <a href={previous.href}><small>← ANTERIOR</small><span>{previous.title}</span></a> : <a href="#temario"><small>← VOLVER</small><span>Temario del curso</span></a>}
      {next ? <a className="topic-next" href={next.href}><small>SIGUIENTE →</small><span>{next.title}</span></a> : <a className="topic-next" href="#temario"><small>FIN DEL RECORRIDO ✓</small><span>Volver al temario →</span></a>}
    </nav>, selection.element)}
    <noscript><p>Activa JavaScript para navegar por minicapítulos. Sin JavaScript puedes abrir las unidades que aparecen debajo.</p><style>{".course-article-layout:has(.course-topic-index) > .course-reader { display: block !important; }"}</style></noscript>
  </nav>;
}
