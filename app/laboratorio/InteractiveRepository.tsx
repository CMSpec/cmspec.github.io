"use client";

import { useState, type ReactNode } from "react";
import FanoPlane from "../_components/FanoPlane";
import FiniteProjectiveCards from "../_components/FiniteProjectiveCards";
import StereographicProjection from "../_components/StereographicProjection";
import { MoebiusIdentification } from "../tejido/banda-de-moebius/MoebiusExplorers";
import { MoebiusWalk3D } from "../tejido/banda-de-moebius/MoebiusWalk3D";
import { StitchPatternGrid } from "../tejido/del-reves-al-bit/StitchPatternGrid";
import { GenusTwoAnimator, QuotientSurfaceAnimator } from "../tejido/repeticion-identificaciones-y-superficies/TopologyAnimations";
import { CircleEquationExplorer, CrochetCurvatureExplorer } from "../tejido/superficies-que-se-pueden-tejer/GeometryCrochetExplorers";
import BraidWordBuilder from "../tejido/trenzas-nudos-y-tejido/BraidWordBuilder";
import MappingClassSweaterLab from "../tejido/trenzas-nudos-y-tejido/MappingClassSweaterLab";
import { sitePath } from "../../lib/site-path";

type LabItem = { title: string; subtitle: string; href: string; render: () => ReactNode; group?: string };
export type LaboratoryAreaId = "matematicas" | "tejido";
type LabArea = { id: LaboratoryAreaId; number: string; title: string; tone: string; description: string; items: LabItem[] };

const areas: LabArea[] = [
  { id: "matematicas", number: "01", title: "Matemáticas", tone: "blue", description: "Construcciones geométricas para manipular directamente las ideas desarrolladas en las entradas.", items: [
    { title: "De rectas a cartas", subtitle: "Planos proyectivos finitos", href: "/investigacion/dobble-y-geometria-proyectiva#cartas-proyectivas", render: () => <FiniteProjectiveCards /> },
    { title: "Proyección estereográfica 3D", subtitle: "De la esfera al plano", href: "/investigacion/mapas-distancias-y-conformidad#proyeccion-estereografica", render: () => <StereographicProjection /> },
    { title: "Plano de Fano", subtitle: "Siete puntos y siete rectas", href: "/investigacion/dobble-y-geometria-proyectiva#plano-de-fano", render: () => <FanoPlane /> },
  ]},
  { id: "tejido", number: "03", title: "Tejido & estructuras", tone: "pink", description: "Palabras, puntos, identificaciones y superficies para explorar la matemática que aparece al tejer.", items: [
    { title: "Palabras en el grupo de trenzas", subtitle: "Generador por generador", href: "/tejido/trenzas-nudos-y-tejido", render: () => <BraidWordBuilder /> },
    { title: "Mapping class group", subtitle: "Lazos alrededor de orificios", href: "/tejido/trenzas-nudos-y-tejido#mapping-class-group", render: () => <MappingClassSweaterLab /> },
    { title: "Construir una banda de Möbius", subtitle: "Media vuelta e identificación", href: "/tejido/banda-de-moebius", render: () => <MoebiusIdentification /> },
    { title: "Caminar sobre Möbius", subtitle: "Recorrido tridimensional", href: "/tejido/banda-de-moebius", render: () => <MoebiusWalk3D /> },
    { title: "Patrón binario 15×15", subtitle: "Derechos y reveses", href: "/tejido/del-reves-al-bit", render: () => <StitchPatternGrid /> },
    { title: "Del rectángulo al toro", subtitle: "Identificar bordes", href: "/tejido/repeticion-identificaciones-y-superficies", render: () => <QuotientSurfaceAnimator /> },
    { title: "Del octágono al género dos", subtitle: "Ocho lados y cuatro identificaciones", href: "/tejido/repeticion-identificaciones-y-superficies", render: () => <GenusTwoAnimator /> },
    { title: "Ecuación de un círculo", subtitle: "Centro y radio", href: "/tejido/superficies-que-se-pueden-tejer", render: () => <CircleEquationExplorer /> },
    { title: "Curvatura y crochet", subtitle: "Aumentos que curvan una superficie", href: "/tejido/superficies-que-se-pueden-tejer", render: () => <CrochetCurvatureExplorer /> },
  ]},
];

function sourceForItem(item: LabItem) {
  if (item.href.includes("dobble-y-geometria-proyectiva")) return "Dobble y geometría proyectiva";
  if (item.href.includes("mapas-distancias-y-conformidad")) return "Mapas, distancias y conformidad";
  if (item.href.includes("algebra-lineal")) return "Álgebra lineal";
  if (item.href.includes("calculo-vectorial")) return "Cálculo vectorial";
  if (item.href.includes("ecuaciones-diferenciales")) return "Ecuaciones diferenciales";
  if (item.href.includes("trenzas-nudos-y-tejido")) return "Trenzas, nudos y tejido";
  if (item.href.includes("banda-de-moebius")) return "La banda de Möbius";
  if (item.href.includes("del-reves-al-bit")) return "Del revés al bit";
  if (item.href.includes("repeticion-identificaciones")) return "Repetición, identificaciones y superficies";
  if (item.href.includes("superficies-que-se-pueden-tejer")) return "Superficies que se pueden tejer";
  return "Otras exploraciones";
}

export default function InteractiveRepository({ areaId }: { areaId?: LaboratoryAreaId }) {
  const visibleAreas = areaId ? areas.filter((area) => area.id === areaId) : areas;
  const [active, setActive] = useState({ areaIndex: 0, itemIndex: 0 });
  const firstSource = sourceForItem(visibleAreas[0].items[0]);
  const [openSources, setOpenSources] = useState<Set<string>>(() => new Set([`0-${firstSource}`]));
  const activeArea = visibleAreas[active.areaIndex];
  const activeItem = activeArea.items[active.itemIndex];
  const activeSource = sourceForItem(activeItem);

  function toggleSource(sourceKey: string) {
    setOpenSources((current) => {
      const next = new Set(current);
      if (next.has(sourceKey)) next.delete(sourceKey);
      else next.add(sourceKey);
      return next;
    });
  }

  return (
    <section className={`laboratory-indexed-layout lab-${activeArea.tone}`}>
      <aside className="laboratory-master-index" aria-label="Índice de visualizaciones">
        <header><span>ÍNDICE DEL LABORATORIO</span><h2>Exploraciones</h2></header>
        {visibleAreas.map((area, areaIndex) => {
          const sources = Array.from(new Set(area.items.map(sourceForItem)));
          return (
            <section className="laboratory-index-area" key={area.title}>
              <h3><span>{area.number}</span>{area.title}</h3>
              {sources.map((source) => {
                const sourceKey = `${areaIndex}-${source}`;
                const isOpen = openSources.has(sourceKey);
                return (
                  <div className="laboratory-index-source" key={sourceKey}>
                    <button className="laboratory-source-toggle" type="button" aria-expanded={isOpen} onClick={() => toggleSource(sourceKey)}>
                      <strong>{source}</strong><span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen ? <div className="laboratory-source-items">{area.items.map((item, itemIndex) => sourceForItem(item) === source && (
                      <button type="button" className={active.areaIndex === areaIndex && active.itemIndex === itemIndex ? "is-active" : ""} onClick={() => setActive({ areaIndex, itemIndex })} key={item.title}>
                        <span>{String(itemIndex + 1).padStart(2, "0")}</span><span><strong>{item.title}</strong><small>{item.subtitle}</small></span>
                      </button>
                    ))}</div> : null}
                  </div>
                );
              })}
            </section>
          );
        })}
      </aside>

      <article className="laboratory-live-card">
        <header>
          <div><span>{activeArea.title.toUpperCase()} / {activeSource.toUpperCase()}</span><h3>{activeItem.title}</h3><p>{activeItem.subtitle}</p></div>
          <a href={sitePath(activeItem.href)}>Leer el contexto ↗</a>
        </header>
        <div className="laboratory-live-stage" key={`${active.areaIndex}-${active.itemIndex}`}>{activeItem.render()}</div>
      </article>
    </section>
  );
}
