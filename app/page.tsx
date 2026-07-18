"use client";

import { useMemo, useState } from "react";
import { siteContent } from "../content/site";

export default function Home() {
  const { brand, navigation, hero, domains, spectrumSection, laboratory, archive } = siteContent;
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
          <div className="hero-actions">
            <a className="button primary" href="#espectro">{hero.primaryAction}</a>
            <a className="text-link" href="#laboratorio">{hero.secondaryAction} <span>↓</span></a>
          </div>
        </div>

        <div className="spectrum-stage" aria-label={hero.visualizationLabel}>
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
          <p className="section-index">{spectrumSection.index}</p>
          <h2>{spectrumSection.titleFirstLine}<br />{spectrumSection.titleSecondLine}</h2>
          <p>{spectrumSection.description}</p>
        </div>
        <div className="domain-grid">
          {domains.map((domain, index) => (
            <article className={`domain-card card-${index + 1}`} key={domain.id}>
              <div className="card-top"><span>{domain.short}</span><span className="card-arrow">↗</span></div>
              <p className="card-eyebrow">{domain.eyebrow}</p>
              <h3>{domain.title}</h3>
              <p>{domain.description}</p>
              <a href={domain.href}>{domain.linkLabel} <span>→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="lab-section" id="laboratorio">
        <div className="lab-intro">
          <p className="section-index">{laboratory.index}</p>
          <h2>{laboratory.title}</h2>
          <p>{laboratory.description}</p>
          <div className="formula-note">
            <span>{laboratory.predictiveValueLabel}</span>
            <strong>{test.ppv}%</strong>
            <small>{laboratory.predictiveValueExplanation}</small>
          </div>
        </div>

        <div className="simulator">
          <div className="controls">
            <RangeControl label={laboratory.controls.prevalence} value={prevalence} setValue={setPrevalence} min={1} max={60} />
            <RangeControl label={laboratory.controls.sensitivity} value={sensitivity} setValue={setSensitivity} min={50} max={100} />
            <RangeControl label={laboratory.controls.specificity} value={specificity} setValue={setSpecificity} min={50} max={100} />
          </div>
          <p className="population-label">{laboratory.populationIntro} <strong>{laboratory.populationSize}</strong></p>
          <div className="result-grid">
            <Result label={laboratory.results.truePositive} value={test.truePositive} tone="blue" />
            <Result label={laboratory.results.falsePositive} value={test.falsePositive} tone="pink" />
            <Result label={laboratory.results.falseNegative} value={test.falseNegative} tone="olive" />
            <Result label={laboratory.results.trueNegative} value={test.trueNegative} tone="green" />
          </div>
          <p className="simulator-footnote">{laboratory.footnote}</p>
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
