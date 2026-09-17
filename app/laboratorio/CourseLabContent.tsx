import type { ReactNode } from "react";
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
import LineIntegralPathsExplorer from "../cursos/calculo-vectorial/LineIntegralPathsExplorer";
import JacobianChangeExplorer from "../cursos/calculo-vectorial/JacobianChangeExplorer";
import CoordinateSystems3D from "../cursos/calculo-vectorial/CoordinateSystems3D";
import FrenetFrame3D from "../cursos/calculo-vectorial/FrenetFrame3D";
import CrossProductPlane3D from "../cursos/calculo-vectorial/CrossProductPlane3D";
import TripleIntegral3D from "../cursos/calculo-vectorial/TripleIntegral3D";
import MultivariableLimit3D from "../cursos/calculo-vectorial/MultivariableLimit3D";
import SolutionFamilyLab from "../cursos/ecuaciones-diferenciales/SolutionFamilyLab";
import SlopeFieldLab from "../cursos/ecuaciones-diferenciales/SlopeFieldLab";
import PhaseLineLab from "../cursos/ecuaciones-diferenciales/PhaseLineLab";
import EulerMethodLab from "../cursos/ecuaciones-diferenciales/EulerMethodLab";
import DampedOscillatorLab from "../cursos/ecuaciones-diferenciales/DampedOscillatorLab";
import HeavisideLaplaceLab from "../cursos/ecuaciones-diferenciales/HeavisideLaplaceLab";
import FourierSeriesLab from "../cursos/ecuaciones-diferenciales/FourierSeriesLab";
import { FunctionInputExplorer, FunctionNotationDiagram } from "../cursos/calculo-diferencial/FunctionConceptExplorers";
import EpsilonDeltaExplorer from "../cursos/calculo-diferencial/EpsilonDeltaExplorer";
import DerivativeSecantExplorer from "../cursos/calculo-diferencial/DerivativeSecantExplorer";
import { LogicExplorer, UnitCircleExplorer } from "../cursos/introduccion-matematicas/IntroExplorers";
import SyntheticDivisionExplorer from "../cursos/introduccion-matematicas/SyntheticDivisionExplorer";

type Item = {title: string; subtitle: string; href: string; render: () => ReactNode; group?: string};
type Section = {id: string; title: string; heading: string; description: string; items: Item[]};
const existing: Item[] = [

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
    { title: "Curvatura y triedro de Frenet", subtitle: "Tangente, normal, binormal y planos asociados", href: "/cursos/calculo-vectorial#curvatura-triedro-frenet-3d", render: () => <FrenetFrame3D />, group: "Cálculo vectorial" },
    { title: "Producto cruz y ecuación del plano", subtitle: "Dos direcciones, un plano y su vector normal", href: "/cursos/calculo-vectorial#producto-cruz-plano-3d", render: () => <CrossProductPlane3D />, group: "Cálculo vectorial" },
    { title: "Integral triple", subtitle: "Sumas de Riemann dentro de una región espacial", href: "/cursos/calculo-vectorial#integral-triple-riemann-3d", render: () => <TripleIntegral3D />, group: "Cálculo vectorial" },
    { title: "Límites por distintos caminos", subtitle: "Cuándo acercarse por otra dirección cambia el resultado", href: "/cursos/calculo-vectorial#limites-caminos-3d", render: () => <MultivariableLimit3D />, group: "Cálculo vectorial" },
    { title: "Bolas y topología", subtitle: "Interior, frontera y exterior", href: "/cursos/calculo-vectorial#bolas-topologia-interactivo", render: () => <OpenClosedBallsExplorer />, group: "Cálculo vectorial" },
    { title: "Integral doble", subtitle: "Sumas de Riemann y volumen", href: "/cursos/calculo-vectorial#integral-doble-riemann-3d", render: () => <DoubleIntegralRiemann3D />, group: "Cálculo vectorial" },
    { title: "Cambio de variable", subtitle: "Deformación y factor jacobiano", href: "/cursos/calculo-vectorial#cambio-variable-jacobiano-interactivo", render: () => <JacobianChangeExplorer />, group: "Cálculo vectorial" },
    { title: "Coordenadas cilíndricas y esféricas", subtitle: "Radio, ángulos y altura en 3D", href: "/cursos/calculo-vectorial#coordenadas-cilindricas-esfericas-3d", render: () => <CoordinateSystems3D />, group: "Cálculo vectorial" },
    { title: "Integrales de línea", subtitle: "Trabajo y dependencia del camino", href: "/cursos/calculo-vectorial#integral-linea-campos-interactivo", render: () => <LineIntegralPathsExplorer />, group: "Cálculo vectorial" },
    { title: "Teorema de Green", subtitle: "Del borde al interior", href: "/cursos/calculo-vectorial#teorema-green-interactivo", render: () => <GreenTheoremExplorer />, group: "Cálculo vectorial" },
    { title: "Familia de soluciones", subtitle: "La constante C selecciona una curva", href: "/cursos/ecuaciones-diferenciales", render: () => <SolutionFamilyLab />, group: "Ecuaciones diferenciales" },
    { title: "Campo de pendientes", subtitle: "De la información local a una solución", href: "/cursos/ecuaciones-diferenciales", render: () => <SlopeFieldLab />, group: "Ecuaciones diferenciales" },
    { title: "Recta de fase", subtitle: "Equilibrios estables e inestables", href: "/cursos/ecuaciones-diferenciales#clase-1-seccion-4", render: () => <PhaseLineLab />, group: "Ecuaciones diferenciales" },
    { title: "Método de Euler", subtitle: "Pendientes, pasos y error", href: "/cursos/ecuaciones-diferenciales#clase-1-seccion-3", render: () => <EulerMethodLab />, group: "Ecuaciones diferenciales" },
    { title: "Oscilador amortiguado", subtitle: "Movimiento, tiempo y retrato de fase", href: "/cursos/ecuaciones-diferenciales#clase-6-seccion-1", render: () => <DampedOscillatorLab />, group: "Ecuaciones diferenciales" },
    { title: "Heaviside y Laplace", subtitle: "De una señal por tramos a factores exponenciales", href: "/cursos/ecuaciones-diferenciales#clase-9-seccion-3", render: () => <HeavisideLaplaceLab />, group: "Ecuaciones diferenciales" },
    { title: "Series de Fourier", subtitle: "Construir una función sumando armónicos", href: "/cursos/ecuaciones-diferenciales#clase-11-seccion-1", render: () => <FourierSeriesLab />, group: "Ecuaciones diferenciales" },

];
const linear = existing.filter(item => item.href.includes("/algebra-lineal"));
const vector = existing.filter(item => item.href.includes("/calculo-vectorial"));
const edo = existing.filter(item => item.href.includes("/ecuaciones-diferenciales"));
const section = (id: string, title: string, heading: string, description: string, items: Item[]): Section => ({id,title,heading,description,items});
export const courseLabSections: Record<string, Section[]> = {
  "algebra-lineal": [
    section("vectores", "Vectores", "Construir y combinar", "Explora el efecto de un escalar, la suma geométrica y las combinaciones de dos vectores.", linear.slice(0,3)),
    section("estructura", "Estructura de matrices", "Leer una matriz", "Reconoce diagonales, trazas, regiones triangulares y relaciones de simetría.", linear.slice(4,7)),
    section("operaciones", "Operaciones", "Calcular paso a paso", "Sigue las entradas que intervienen en cada operación.", linear.slice(7,11)),
    section("transformaciones", "Transformaciones", "Cambiar la representación", "Operaciones por filas y cambios de base.", [linear[11],linear[3]]),
  ],
  "calculo-vectorial": [
    section("geometria", "Geometría", "Recorrer curvas y superficies", "Parametrizaciones, cortes y geometría del espacio.", [vector[0],vector[2],vector[3],vector[4],vector[7],vector[8],vector[11]]),
    section("derivadas", "Límites y derivadas", "Explorar el cambio", "Caminos, direcciones de crecimiento y restricciones.", [vector[10],vector[1],vector[5],vector[6]]),
    section("integrales", "Integrales", "Acumular y transformar", "Sumas de Riemann, coordenadas y cambios de variable.", [vector[12],vector[9],vector[13],vector[14]]),
    section("campos", "Campos", "Relacionar caminos y regiones", "Integrales de línea y teorema de Green.", [vector[15],vector[16]]),
  ],
  "ecuaciones-diferenciales": [
    section("soluciones", "Soluciones", "De pendientes a curvas", "Familias de soluciones, campos y equilibrios.", edo.slice(0,3)),
    section("metodos", "Métodos numéricos", "Aproximar paso a paso", "Explora el tamaño del paso y el error.", [edo[3]]),
    section("modelos", "Modelos", "Observar el movimiento", "Oscilaciones y amortiguamiento.", [edo[4]]),
    section("senales", "Señales", "Descomponer y reconstruir", "Heaviside, Laplace y series de Fourier.", edo.slice(5)),
  ],
  "calculo-diferencial": [
    section("funciones", "Funciones", "De una entrada a su imagen", "Identifica los elementos de una función y recorre su gráfica.", [
      {title:"Elementos de una función",subtitle:"Dominio, llegada y regla",href:"/cursos/calculo-diferencial",render:()=> <FunctionNotationDiagram/>},
      {title:"Recorrer una función",subtitle:"La entrada x y su imagen",href:"/cursos/calculo-diferencial",render:()=> <FunctionInputExplorer/>},
    ]),
    section("limites", "Límites", "Controlar la cercanía", "Relaciona los intervalos definidos por epsilon y delta.", [
      {title:"Epsilon y delta",subtitle:"Intervalos alrededor de la entrada y la salida",href:"/cursos/calculo-diferencial",render:()=> <EpsilonDeltaExplorer/>},
    ]),
    section("derivadas", "Derivadas", "De la secante a la tangente", "Observa cómo cambia la pendiente al acercar los puntos.", [
      {title:"Pendiente y derivada",subtitle:"Del cambio promedio al instantáneo",href:"/cursos/calculo-diferencial",render:()=> <DerivativeSecantExplorer/>},
    ]),
  ],
  "introduccion-matematicas": [
    section("logica", "Lógica", "Explorar valores de verdad", "Compara proposiciones y conectivos.", [
      {title:"Tabla de verdad",subtitle:"Cambia p y q",href:"/cursos/introduccion-matematicas#intro-logica-1",render:()=> <LogicExplorer/>},
    ]),
    section("funciones", "Funciones", "Reconocer una función", "Relaciona dominio, llegada y regla.", [
      {title:"Elementos de una función",subtitle:"Cómo se transforma x",href:"/cursos/introduccion-matematicas#intro-funciones-1",render:()=> <FunctionNotationDiagram/>},
    ]),
    section("trigonometria", "Trigonometría", "Recorrer la circunferencia", "Ángulos, seno y coseno.", [
      {title:"Circunferencia unitaria",subtitle:"Una vuelta y sus coordenadas",href:"/cursos/introduccion-matematicas#intro-trigonometria-2",render:()=> <UnitCircleExplorer/>},
    ]),
    section("polinomios", "Polinomios", "Dividir paso a paso", "Copia coeficientes, multiplica y suma.", [
      {title:"División sintética",subtitle:"Del dividendo al cociente y al resto",href:"/cursos/introduccion-matematicas#intro-polinomios-2",render:()=> <SyntheticDivisionExplorer/>},
    ]),
  ],
};
