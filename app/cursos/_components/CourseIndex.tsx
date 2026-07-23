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
  return (
    <aside className="course-toc" aria-label="Índice del curso">
      <details className="course-toc-disclosure" open>
        <summary>
          <span>EN ESTE CURSO</span>
          <i aria-hidden="true">+</i>
        </summary>
        <nav>
          {units.map((unit, index) => (
            <details className="course-toc-group" key={unit.href} open={index === 0}>
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
                      <a href={item.href} key={item.href}>
                        <span>{item.label ?? "·"}</span>{item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </details>
          ))}
        </nav>
      </details>
      {note && <small>{note}</small>}
    </aside>
  );
}
