import ChangeOfBasis2D from "../algebra-lineal/ChangeOfBasis2D";
import MatrixMultiplicationAnimation from "../algebra-lineal/MatrixMultiplicationAnimation";
import { DotProductAnimation, MatrixAdditionAnimation } from "../algebra-lineal/MatrixOperationsAnimations";
import MatrixScalarAnimation from "../algebra-lineal/MatrixScalarAnimation";
import {
  SymmetryAnimation,
  TraceAnimation,
  TriangularMatricesAnimation,
} from "../algebra-lineal/MatrixStructureAnimations";
import RowReductionAnimation from "../algebra-lineal/RowReductionAnimation";
import VectorExplorations from "../algebra-lineal/VectorExplorations";
import SiteHeader from "../../_components/SiteHeader";

const sections = [
  { number: "01", title: "Vectores", href: "#vectores" },
  { number: "02", title: "Estructura de matrices", href: "#estructura" },
  { number: "03", title: "Operaciones", href: "#operaciones" },
  { number: "04", title: "Transformaciones", href: "#transformaciones" },
] as const;

export default function LinearAlgebraLabPage() {
  return (
    <main className="course-page visual-compendium-page">
      <SiteHeader />

      <article className="course-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">COLECCIÓN INTERACTIVA · ÁLGEBRA LINEAL</p>
        <h1>Laboratorio de Álgebra Lineal</h1>
        <p className="course-deck">
          Un recorrido visual por vectores, matrices y transformaciones para observar cada operación paso a paso.
        </p>
        <div className="course-meta">
          <div><span>AUTORÍA</span><strong>Camila Muñoz Santander</strong></div>
          <div><span>COLECCIÓN</span><strong>CMSpec · Aprender</strong></div>
          <div><span>CONTENIDO</span><strong>10 exploraciones interactivas</strong></div>
        </div>
      </article>

      <nav className="visual-compendium-nav" aria-label="Secciones del laboratorio">
        {sections.map((section) => (
          <a href={section.href} key={section.href}>
            <span>{section.number}</span>{section.title}
          </a>
        ))}
      </nav>

      <div className="visual-compendium">
        <section className="visual-compendium-section" id="vectores">
          <header>
            <span>01 / VECTORES</span>
            <h2>Construir y combinar</h2>
            <p>Explora el efecto de un escalar, la suma geométrica y las combinaciones de dos vectores.</p>
          </header>
          <div className="visual-compendium-stack">
            <VectorExplorations />
          </div>
        </section>

        <section className="visual-compendium-section" id="estructura">
          <header>
            <span>02 / ESTRUCTURA</span>
            <h2>Leer una matriz</h2>
            <p>Reconoce diagonales, trazas, regiones triangulares y relaciones de simetría.</p>
          </header>
          <div className="visual-compendium-stack">
            <TraceAnimation />
            <TriangularMatricesAnimation />
            <SymmetryAnimation />
          </div>
        </section>

        <section className="visual-compendium-section" id="operaciones">
          <header>
            <span>03 / OPERACIONES</span>
            <h2>Calcular paso a paso</h2>
            <p>Sigue las entradas que intervienen en una suma, un producto por escalar, un producto punto y un producto matricial.</p>
          </header>
          <div className="visual-compendium-stack">
            <MatrixAdditionAnimation />
            <MatrixScalarAnimation />
            <DotProductAnimation />
            <MatrixMultiplicationAnimation />
          </div>
        </section>

        <section className="visual-compendium-section" id="transformaciones">
          <header>
            <span>04 / TRANSFORMACIONES</span>
            <h2>Cambiar la representación</h2>
            <p>Observa cómo una operación por filas y un cambio de base modifican la forma de describir un objeto.</p>
          </header>
          <div className="visual-compendium-stack">
            <RowReductionAnimation />
            <ChangeOfBasis2D />
          </div>
        </section>
      </div>

      <footer className="course-footer">
        <p>CMSpec · Laboratorio de Álgebra Lineal</p>
        <a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a>
      </footer>
    </main>
  );
}
