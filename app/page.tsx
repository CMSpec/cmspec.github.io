"use client";

import { useMemo, useState } from "react";

const domains = [
  {
    id: "research",
    short: "01",
    title: "Investigación & Math",
    eyebrow: "Pensar con estructura",
    description:
      "Proyectos, avances, modelos y notas matemáticas que hacen visible el proceso, no solo el resultado.",
    color: "var(--olive)",
  },
  {
    id: "health",
    short: "02",
    title: "Datos & Salud",
    eyebrow: "Leer lo que los datos dicen",
    description:
      "Análisis reproducibles y visualizaciones para comprender preguntas relevantes en salud.",
    color: "var(--blue)",
  },
  {
    id: "learn",
    short: "03",
    title: "Aprender",
    eyebrow: "Explorar antes de memorizar",
    description:
      "Cursos y apuntes de pregrado con simulaciones, ejemplos y explicaciones interactivas.",
    color: "var(--green)",
  },
  {
    id: "misc",
    short: "04",
    title: "Misceláneo",
    eyebrow: "El resto del espectro",
    description:
      "Lecturas, hobbies, experimentos y hallazgos que alimentan la curiosidad fuera del aula.",
    color: "var(--pink)",
  },
];

export default function Home() {
  const [activeDomain, setActiveDomain] = useState(0);
  const [prevalence, setPrevalence] = useState(20);
  const [sensitivity, setSensitivity] = useState(90);
  const [specificity, setSpecificity] = useState(85);

  const test = useMemo(() => {
    const population = 1000;
    const ill = population * (prevalence / 100);
    const healthy = population - ill;
    const truePositive = Math.round(ill * (sensitivity / 100));
    const falseNegative = Math.round(ill - truePositive);
    const trueNegative = Math.round(healthy * (specificity / 100));
    const falsePositive = Math.round(healthy - trueNegative);
    const ppv = Math.round((truePositive / (truePositive + falsePositive)) * 100);
    return { truePositive, falseNegative, trueNegative, falsePositive, ppv };
  }, [prevalence, sensitivity, specificity]);

  const active = domains[activeDomain];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="CMSpec, inicio">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>CMSpec</span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#espectro">Espectro</a>
          <a href="#laboratorio">Laboratorio</a>
          <a href="#archivo">Archivo</a>
        </nav>
        <a className="header-cta" href="#contacto">
          Conversemos <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="kicker"><span /> Cuaderno abierto de Camila Muñoz</p>
          <h1>
            Ideas a través de todo el <em>espectro.</em>
          </h1>
          <p className="hero-intro">
            Investigo, enseño y exploro con matemáticas, datos y visualización.
            CMSpec es el lugar donde esas preguntas se encuentran.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#espectro">Explorar CMSpec</a>
            <a className="text-link" href="#laboratorio">Ver un experimento <span>↓</span></a>
          </div>
        </div>

        <div className="spectrum-stage" aria-label="Visualización del espectro de intereses de CMSpec">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="spectrum-core">
            <span>CM</span>
            <small>SPEC</small>
          </div>
          {domains.map((domain, index) => (
            <button
              className={`spectrum-node node-${index + 1} ${activeDomain === index ? "active" : ""}`}
              key={domain.id}
              onClick={() => setActiveDomain(index)}
              style={{ "--node-color": domain.color } as React.CSSProperties}
              aria-pressed={activeDomain === index}
            >
              <span>{domain.short}</span>
              {domain.title}
            </button>
          ))}
          <div className="stage-caption">
            <span style={{ background: active.color }} />
            <p><strong>{active.eyebrow}</strong>{active.description}</p>
          </div>
        </div>
      </section>

      <div className="spectrum-rule" aria-hidden="true"><i /><i /><i /><i /></div>

      <section className="domains-section" id="espectro">
        <div className="section-heading">
          <p className="section-index">01 / EL ESPECTRO</p>
          <h2>Cuatro formas de mirar<br />una misma curiosidad.</h2>
          <p>Cada sección tiene su propio pulso. Juntas forman un archivo vivo de ideas en desarrollo.</p>
        </div>
        <div className="domain-grid">
          {domains.map((domain, index) => (
            <article className={`domain-card card-${index + 1}`} key={domain.id}>
              <div className="card-top"><span>{domain.short}</span><span className="card-arrow">↗</span></div>
              <p className="card-eyebrow">{domain.eyebrow}</p>
              <h3>{domain.title}</h3>
              <p>{domain.description}</p>
              <a href="#archivo">Próximamente <span>→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="lab-section" id="laboratorio">
        <div className="lab-intro">
          <p className="section-index">02 / LABORATORIO INTERACTIVO</p>
          <h2>Cuando un resultado positivo no significa lo que parece.</h2>
          <p>
            Cambia los supuestos de esta prueba diagnóstica. Observa cómo la prevalencia transforma
            el significado de un resultado positivo, incluso cuando la prueba es precisa.
          </p>
          <div className="formula-note">
            <span>Valor predictivo positivo</span>
            <strong>{test.ppv}%</strong>
            <small>de los positivos realmente tienen la condición</small>
          </div>
        </div>

        <div className="simulator">
          <div className="controls">
            <RangeControl label="Prevalencia" value={prevalence} setValue={setPrevalence} min={1} max={60} />
            <RangeControl label="Sensibilidad" value={sensitivity} setValue={setSensitivity} min={50} max={100} />
            <RangeControl label="Especificidad" value={specificity} setValue={setSpecificity} min={50} max={100} />
          </div>
          <p className="population-label">En una población de <strong>1.000 personas</strong></p>
          <div className="result-grid">
            <Result label="Verdaderos positivos" value={test.truePositive} tone="blue" />
            <Result label="Falsos positivos" value={test.falsePositive} tone="pink" />
            <Result label="Falsos negativos" value={test.falseNegative} tone="olive" />
            <Result label="Verdaderos negativos" value={test.trueNegative} tone="green" />
          </div>
          <p className="simulator-footnote">Modelo educativo simplificado · No constituye consejo médico</p>
        </div>
      </section>

      <section className="archive-section" id="archivo">
        <p className="section-index">03 / EN CONSTRUCCIÓN</p>
        <div>
          <h2>Un archivo que crecerá<br />con cada pregunta.</h2>
          <p>La primera versión de CMSpec abre el espacio. Pronto aquí vivirán investigaciones, cursos, notas y experimentos reales.</p>
        </div>
        <div className="archive-list">
          <span>Investigaciones</span><span>Notas matemáticas</span><span>Datos de salud</span><span>Apuntes interactivos</span>
        </div>
      </section>

      <footer id="contacto">
        <a className="brand footer-brand" href="#inicio"><span className="brand-mark"><i /><i /><i /><i /></span>CMSpec</a>
        <p>Un espectro de ideas, investigación y aprendizaje.</p>
        <a href="mailto:camila@example.com">camila@example.com <span>↗</span></a>
        <small>© {new Date().getFullYear()} Camila Muñoz</small>
      </footer>
    </main>
  );
}

function RangeControl({ label, value, setValue, min, max }: { label: string; value: number; setValue: (value: number) => void; min: number; max: number }) {
  return (
    <label className="range-control">
      <span>{label}<strong>{value}%</strong></span>
      <input aria-label={label} type="range" min={min} max={max} value={value} onChange={(event) => setValue(Number(event.target.value))} />
    </label>
  );
}

function Result({ label, value, tone }: { label: string; value: number; tone: string }) {
  return <div className={`result result-${tone}`}><span>{label}</span><strong>{value}</strong><i style={{ width: `${Math.max(8, Math.min(100, value / 8))}%` }} /></div>;
}
