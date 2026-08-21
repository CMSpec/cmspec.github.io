"use client";

import { useState, type ReactNode } from "react";
import FanoPlane from "../_components/FanoPlane";
import FiniteProjectiveCards from "../_components/FiniteProjectiveCards";
import StereographicProjection from "../_components/StereographicProjection";
import ChangeOfBasis2D from "../cursos/algebra-lineal/ChangeOfBasis2D";
import MatrixMultiplicationAnimation from "../cursos/algebra-lineal/MatrixMultiplicationAnimation";
import { DotProductAnimation, MatrixAdditionAnimation } from "../cursos/algebra-lineal/MatrixOperationsAnimations";
import MatrixScalarAnimation from "../cursos/algebra-lineal/MatrixScalarAnimation";
import { SymmetryAnimation, TraceAnimation, TriangularMatricesAnimation } from "../cursos/algebra-lineal/MatrixStructureAnimations";
import RowReductionAnimation from "../cursos/algebra-lineal/RowReductionAnimation";
import { ScalarVectorLab, VectorCombinationLab, VectorSumLab } from "../cursos/algebra-lineal/VectorExplorations";
import LevelCurves3D from "../cursos/calculo-vectorial/LevelCurves3D";
import GradientTangent3D from "../cursos/calculo-vectorial/GradientTangent3D";
import ParametricEllipse from "../cursos/calculo-vectorial/ParametricEllipse";
import ParametricSegment from "../cursos/calculo-vectorial/ParametricSegment";
import ParametricFunctionGraph from "../cursos/calculo-vectorial/ParametricFunctionGraph";
import DirectionalDerivative3D from "../cursos/calculo-vectorial/DirectionalDerivative3D";
import LagrangeMultiplierExplorer from "../cursos/calculo-vectorial/LagrangeMultiplierExplorer";
import OpenClosedBallsExplorer from "../cursos/calculo-vectorial/OpenClosedBallsExplorer";
import DoubleIntegralRiemann3D from "../cursos/calculo-vectorial/DoubleIntegralRiemann3D";
import GreenTheoremExplorer from "../cursos/calculo-vectorial/GreenTheoremExplorer";
import { MoebiusIdentification } from "../tejido/banda-de-moebius/MoebiusExplorers";
import { MoebiusWalk3D } from "../tejido/banda-de-moebius/MoebiusWalk3D";
import { StitchPatternGrid } from "../tejido/del-reves-al-bit/StitchPatternGrid";
import { GenusTwoAnimator, QuotientSurfaceAnimator } from "../tejido/repeticion-identificaciones-y-superficies/TopologyAnimations";
import { CircleEquationExplorer, CrochetCurvatureExplorer } from "../tejido/superficies-que-se-pueden-tejer/GeometryCrochetExplorers";
import BraidWordBuilder from "../tejido/trenzas-nudos-y-tejido/BraidWordBuilder";
import MappingClassSweaterLab from "../tejido/trenzas-nudos-y-tejido/MappingClassSweaterLab";
import { sitePath } from "../../lib/site-path";

type LabItem = { title: string; subtitle: string; href: string; render: () => ReactNode; group?: string };
export type LaboratoryAreaId = "matematicas" | "apuntes" | "tejido";
type LabArea = { id: LaboratoryAreaId; number: string; title: string; tone: string; description: string; items: LabItem[] };

const areas: LabArea[] = [
  { id: "matematicas", number: "01", title: "Matemáticas", tone: "blue", description: "Construcciones geométricas para manipular directamente las ideas desarrolladas en las entradas.", items: [
    { title: "De rectas a cartas", subtitle: "Planos proyectivos finitos", href: "/investigacion/dobble-y-geometria-proyectiva#cartas-proyectivas", render: () => <FiniteProjectiveCards /> },
    { title: "Proyección estereográfica 3D", subtitle: "De la esfera al plano", href: "/investigacion/mapas-distancias-y-conformidad#proyeccion-estereografica", render: () => <StereographicProjection /> },
    { title: "Plano de Fano", subtitle: "Siete puntos y siete rectas", href: "/investigacion/dobble-y-geometria-proyectiva#plano-de-fano", render: () => <FanoPlane /> },
  ]},
  { id: "apuntes", number: "02", title: "Apuntes", tone: "green", description: "Visualizaciones geométricas de vectores y demostraciones paso a paso de cálculos con matrices.", items: [
    { title: "Vector por un escalar", subtitle: "Dirección y longitud", href: "/cursos/algebra-lineal", render: () => <ScalarVectorLab />, group: "Visualizaciones de vectores" },
    { title: "Suma de vectores", subtitle: "Regla punta con cola", href: "/cursos/algebra-lineal", render: () => <VectorSumLab />, group: "Visualizaciones de vectores" },
    { title: "Combinaciones lineales", subtitle: "Región generada por dos vectores", href: "/cursos/algebra-lineal", render: () => <VectorCombinationLab />, group: "Visualizaciones de vectores" },
    { title: "Cambio de base", subtitle: "Dos sistemas de coordenadas", href: "/cursos/algebra-lineal", render: () => <ChangeOfBasis2D />, group: "Visualizaciones de vectores" },
    { title: "Traza", subtitle: "Sumar la diagonal", href: "/cursos/algebra-lineal", render: () => <TraceAnimation />, group: "Demostraciones de cálculo" },
    { title: "Matrices triangulares", subtitle: "Regiones superior e inferior", href: "/cursos/algebra-lineal", render: () => <TriangularMatricesAnimation />, group: "Demostraciones de cálculo" },
    { title: "Simetría y antisimetría", subtitle: "Entradas reflejadas", href: "/cursos/algebra-lineal", render: () => <SymmetryAnimation />, group: "Demostraciones de cálculo" },
    { title: "Suma de matrices", subtitle: "Entrada por entrada", href: "/cursos/algebra-lineal", render: () => <MatrixAdditionAnimation />, group: "Demostraciones de cálculo" },
    { title: "Producto por escalar", subtitle: "Cada entrada multiplicada", href: "/cursos/algebra-lineal", render: () => <MatrixScalarAnimation />, group: "Demostraciones de cálculo" },
    { title: "Producto punto", subtitle: "Coordenada por coordenada", href: "/cursos/algebra-lineal", render: () => <DotProductAnimation />, group: "Demostraciones de cálculo" },
    { title: "Producto de matrices", subtitle: "Fila por columna", href: "/cursos/algebra-lineal", render: () => <MatrixMultiplicationAnimation />, group: "Demostraciones de cálculo" },
    { title: "Reducción por filas", subtitle: "Operaciones elementales", href: "/cursos/algebra-lineal", render: () => <RowReductionAnimation />, group: "Demostraciones de cálculo" },
    { title: "Curvas de nivel en 3D", subtitle: "Cortes horizontales de una superficie", href: "/cursos/calculo-vectorial#clase-2-seccion-3", render: () => <LevelCurves3D />, group: "Cálculo vectorial" },
    { title: "Gradiente y plano tangente", subtitle: "Superficie, plano y dirección normal", href: "/cursos/calculo-vectorial#clase-4-seccion-1", render: () => <GradientTangent3D />, group: "Cálculo vectorial" },
    { title: "Elipse parametrizada", subtitle: "Una curva que aparece a medida que avanza t", href: "/cursos/calculo-vectorial#clase-2-seccion-4", render: () => <ParametricEllipse />, group: "Cálculo vectorial" },
    { title: "Segmento parametrizado", subtitle: "De P a Q con el parámetro entre 0 y 1", href: "/cursos/calculo-vectorial#segmento-parametrizado-interactivo", render: () => <ParametricSegment />, group: "Cálculo vectorial" },
    { title: "Función como curva", subtitle: "La parábola recorrida como (t,f(t))", href: "/cursos/calculo-vectorial#funcion-cuadratica-parametrizada", render: () => <ParametricFunctionGraph />, group: "Cálculo vectorial" },
    { title: "Derivada direccional", subtitle: "El corte vertical y su recta tangente", href: "/cursos/calculo-vectorial#derivada-direccional-3d", render: () => <DirectionalDerivative3D />, group: "Cálculo vectorial" },
    { title: "Multiplicadores de Lagrange", subtitle: "Gradientes paralelos sobre una restricción", href: "/cursos/calculo-vectorial#multiplicadores-lagrange-interactivo", render: () => <LagrangeMultiplierExplorer />, group: "Cálculo vectorial" },
    { title: "Bolas y topología", subtitle: "Interior, frontera y exterior", href: "/cursos/calculo-vectorial#bolas-topologia-interactivo", render: () => <OpenClosedBallsExplorer />, group: "Cálculo vectorial" },
    { title: "Integral doble", subtitle: "Sumas de Riemann y volumen", href: "/cursos/calculo-vectorial#integral-doble-riemann-3d", render: () => <DoubleIntegralRiemann3D />, group: "Cálculo vectorial" },
    { title: "Teorema de Green", subtitle: "Del borde al interior", href: "/cursos/calculo-vectorial#teorema-green-interactivo", render: () => <GreenTheoremExplorer />, group: "Cálculo vectorial" },
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
