export type CourseIndexItem = {
  href: string;
  label?: string;
  title: string;
};

export type CourseIndexUnit = {
  href: string;
  items?: CourseIndexItem[];
  number: string;
  title: string;
};

export default function CourseIndex({
  note,
  units,
}: {
  note?: string;
  units: CourseIndexUnit[];
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [activeHref, setActiveHref] = useState("");
  const trackedHrefs = useMemo(
    () => units.flatMap((unit) => [unit.href, ...(unit.items?.map((item) => item.href) ?? [])]),
    [units],
  );

  useEffect(() => {
    let frame = 0;
    const updateActive = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const targets = trackedHrefs
          .filter((href) => href.startsWith("#"))
          .map((href) => ({ href, element: document.getElementById(href.slice(1)) }))
          .filter((target): target is { href: string; element: HTMLElement } => Boolean(target.element));

        if (!targets.length) return;
        const readingLine = 190;
        let current = targets[0].href;
        for (const target of targets) {
          if (target.element.getBoundingClientRect().top <= readingLine) current = target.href;
          else break;
        }
        setActiveHref(current);
        const activeLink = document.querySelector<HTMLAnchorElement>(`.course-toc a[href="${CSS.escape(current)}"]`);
        const activeGroup = activeLink?.closest<HTMLDetailsElement>(".course-toc-group");
        if (activeGroup) activeGroup.open = true;
      });
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    window.addEventListener("hashchange", updateActive);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      window.removeEventListener("hashchange", updateActive);
    };
  }, [trackedHrefs]);

  return (
    <aside className={`course-toc${isVisible ? "" : " is-collapsed"}`} aria-label="Índice del curso">
      <button
        type="button"
        className="course-toc-toggle"
        aria-expanded={isVisible}
        aria-controls="course-toc-navigation"
        onClick={() => setIsVisible((visible) => !visible)}
      >
        <span>{isVisible ? "OCULTAR ÍNDICE" : "MOSTRAR ÍNDICE"}</span>
        <i aria-hidden="true">{isVisible ? "←" : "→"}</i>
      </button>
      {isVisible && (
        <div className="course-toc-disclosure" id="course-toc-navigation">
          <p>EN ESTE CURSO</p>
        <nav>
          {units.map((unit, index) => (
            <details className={`course-toc-group${activeHref === unit.href || unit.items?.some((item) => item.href === activeHref) ? " is-active" : ""}`} key={unit.href} open={index === 0}>
              <summary className="course-toc-unit">
                <span>{unit.number}</span>
                <strong>{unit.title}</strong>
                <i aria-hidden="true">+</i>
              </summary>
              <div className="course-toc-children">
                <a className="course-toc-open-unit" href={unit.href}>
                  Abrir unidad <span aria-hidden="true">→</span>
                </a>
                {unit.items && unit.items.length > 0 && (
                  <div className="course-definition-list" aria-label={`Conceptos de ${unit.title}`}>
                    {unit.items.map((item) => (
                      <a className={activeHref === item.href ? "is-active" : ""} href={item.href} key={item.href}>
                        <span>{item.label ?? "·"}</span>{item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </details>
          ))}
        </nav>
        </div>
      )}
      {isVisible && note && <small>{note}</small>}
    </aside>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";
