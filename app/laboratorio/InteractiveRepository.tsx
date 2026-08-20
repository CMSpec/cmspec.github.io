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
import { MoebiusIdentification } from "../tejido/banda-de-moebius/MoebiusExplorers";
import { MoebiusWalk3D } from "../tejido/banda-de-moebius/MoebiusWalk3D";
import { StitchPatternGrid } from "../tejido/del-reves-al-bit/StitchPatternGrid";
import { GenusTwoAnimator, QuotientSurfaceAnimator } from "../tejido/repeticion-identificaciones-y-superficies/TopologyAnimations";
import { CircleEquationExplorer, CrochetCurvatureExplorer } from "../tejido/superficies-que-se-pueden-tejer/GeometryCrochetExplorers";
import BraidWordBuilder from "../tejido/trenzas-nudos-y-tejido/BraidWordBuilder";
import MappingClassSweaterLab from "../tejido/trenzas-nudos-y-tejido/MappingClassSweaterLab";
import { sitePath } from "../../lib/site-path";

type LabItem = { title: string; subtitle: string; href: string; render: () => ReactNode; group?: string };
type LabArea = { number: string; title: string; tone: string; description: string; items: LabItem[] };

const aiFunctions = [
  ["Interpretar", "Imágenes, señales o texto clínico", "Hallazgos estructurados", "La ausencia de una marca no equivale a ausencia de enfermedad."],
  ["Predecir", "Variables históricas y contextuales", "Riesgo o probabilidad", "El riesgo depende de la población y del momento donde se estimó."],
  ["Generar", "Instrucciones y antecedentes", "Texto, resumen o alternativa", "Una respuesta fluida puede contener afirmaciones no verificadas."],
  ["Auditar", "Registros de procesos y resultados", "Alertas, diferencias o patrones", "La métrica elegida determina qué desigualdad resulta visible."],
] as const;

function HealthFunctionsExplorer() {
  const [active, setActive] = useState(0);
  const [name, input, output, care] = aiFunctions[active];
  return <section className="health-lab-tool"><div className="health-lab-tabs">{aiFunctions.map((option, index) => <button className={active === index ? "is-active" : ""} onClick={() => setActive(index)} key={option[0]}>{option[0]}</button>)}</div><div className="health-flow"><p><span>ENTRADA</span>{input}</p><b>→ {name} →</b><p><span>SALIDA</span>{output}</p></div><aside><strong>Cuidado de lectura</strong><p>{care}</p></aside></section>;
}

const oversight = [
  ["Human-in-the-loop", "Antes de actuar", "Una persona revisa cada recomendación y decide si se utiliza.", "Puede convertirse en una firma automática si el volumen supera la capacidad humana."],
  ["Human-on-the-loop", "Durante la operación", "El sistema actúa y una persona supervisa, interviniendo ante señales de riesgo.", "Requiere alertas comprensibles, tiempo para reaccionar y autoridad para detener el proceso."],
  ["Human-in-command", "Sobre el sistema", "La supervisión define objetivos, límites, responsables y condiciones de retiro.", "Agrega una capa institucional de gobernanza, pero no reemplaza la revisión de casos."],
] as const;

function HumanOversightExplorer() {
  const [active, setActive] = useState(0);
  const [name, moment, role, limit] = oversight[active];
  return <section className="health-lab-tool"><div className="health-lab-tabs">{oversight.map((option, index) => <button className={active === index ? "is-active" : ""} onClick={() => setActive(index)} key={option[0]}>{option[0]}</button>)}</div><div className="oversight-stage"><span>{moment}</span><h4>{name}</h4><p>{role}</p><aside><strong>Sutileza</strong>{limit}</aside></div></section>;
}

const areas: LabArea[] = [
  { number: "01", title: "Notas matemáticas", tone: "blue", description: "Construcciones geométricas para manipular directamente las ideas desarrolladas en las entradas.", items: [
    { title: "De rectas a cartas", subtitle: "Planos proyectivos finitos", href: "/investigacion/dobble-y-geometria-proyectiva#cartas-proyectivas", render: () => <FiniteProjectiveCards /> },
    { title: "Proyección estereográfica 3D", subtitle: "De la esfera al plano", href: "/investigacion/mapas-distancias-y-conformidad#proyeccion-estereografica", render: () => <StereographicProjection /> },
    { title: "Plano de Fano", subtitle: "Siete puntos y siete rectas", href: "/investigacion/dobble-y-geometria-proyectiva#plano-de-fano", render: () => <FanoPlane /> },
  ]},
  { number: "02", title: "Aprender", tone: "green", description: "Visualizaciones geométricas de vectores y demostraciones paso a paso de cálculos con matrices.", items: [
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
  ]},
  { number: "03", title: "Salud", tone: "olive", description: "Comparadores para explorar funciones de IA y distintas posiciones de la supervisión humana.", items: [
    { title: "Funciones de IA en salud", subtitle: "Entradas, salidas y cautelas", href: "/salud/funciones-ia-en-salud", render: () => <HealthFunctionsExplorer /> },
    { title: "Supervisión humana", subtitle: "Loop, supervisión y gobernanza", href: "/salud/human-in-the-loop", render: () => <HumanOversightExplorer /> },
  ]},
  { number: "04", title: "Tejido & estructuras", tone: "pink", description: "Palabras, puntos, identificaciones y superficies para explorar la matemática que aparece al tejer.", items: [
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

function LaboratoryArea({ area }: { area: LabArea }) {
  const [active, setActive] = useState(0);
  const item = area.items[active];
  const groups = Array.from(new Set(area.items.map((option) => option.group ?? "")));
  return <section className={`laboratory-area laboratory-live-area lab-${area.tone}`}><header><span>{area.number} / COLECCIÓN</span><h2>{area.title}</h2><p>{area.description}</p></header><div className="laboratory-live-layout"><nav aria-label={`Exploraciones de ${area.title}`}>{groups.map((group) => <div className="laboratory-live-nav-group" key={group || area.title}>{group && <p>{group}</p>}{area.items.map((option, index) => option.group === (group || undefined) && <button className={active === index ? "is-active" : ""} onClick={() => setActive(index)} key={option.title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{option.title}</strong><small>{option.subtitle}</small></button>)}</div>)}</nav><article className="laboratory-live-card"><header><div><span>EXPLORACIÓN {String(active + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.subtitle}</p></div><a href={sitePath(item.href)}>Leer el contexto ↗</a></header><div className="laboratory-live-stage" key={`${area.number}-${active}`}>{item.render()}</div></article></div></section>;
}

export default function InteractiveRepository() {
  return <>{areas.map((area) => <LaboratoryArea area={area} key={area.title} />)}</>;
}
