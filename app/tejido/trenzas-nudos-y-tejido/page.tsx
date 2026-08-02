import Image from "next/image";
import { BrandHeader } from "../../_components/editorial";
import { getCollection, getEntry } from "../../../content/collections";
import BraidWordBuilder from "./BraidWordBuilder";

export default function BraidsKnotsKnittingPage() {
  const collection = getCollection("tejido")!;
  const entry = getEntry("tejido", "/tejido/trenzas-nudos-y-tejido")!;

  return (
    <main className="course-page editorial-entry tone-pink braid-article-page">
      <BrandHeader label={collection.label} backHref="/tejido" />
      <article className="course-masthead editorial-entry-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">{entry.eyebrow}</p>
        <h1>{entry.title}</h1>
        <p className="course-deck">{entry.subtitle}</p>
        <div className="course-meta">
          <div><span>AUTORÍA</span><strong>{entry.authors}</strong></div>
          <div><span>COLECCIÓN</span><strong>Tejido & Estructuras</strong></div>
          <div><span>LECTURA</span><strong>Trenzas · Nudos · Álgebra</strong></div>
        </div>
      </article>

      <article className="braid-article">
        <p className="braid-article-lead">{entry.introduction}</p>

        <figure className="braid-hero-image">
          <Image src="/images/trenzas-tejido-editorial.png" alt="Tres cordones de colores que se cruzan progresivamente hasta formar una muestra tejida" width={1672} height={941} priority />
          <figcaption>Del cruce local de hebras a una estructura que puede leerse paso a paso.</figcaption>
        </figure>

        <section className="braid-prose-section">
          <p className="braid-section-number">01 / ANTES DEL ÁLGEBRA</p>
          <h2>Trenzar es recordar un orden</h2>
          <p>Imagina tres mechones. Tomas dos que están uno al lado del otro y decides cuál pasa por encima. Después eliges otro par y repites. El resultado no depende solamente de dónde terminan las hebras: también importa la historia de sus cruces.</p>
          <p>Una trenza funciona, entonces, como una frase hecha con movimientos elementales. Cambiar el orden de dos movimientos puede cambiar por completo la figura; deshacer un cruce exige realizar el mismo cruce en sentido contrario.</p>
        </section>

        <aside className="braid-pullquote">Una trenza no es solo una imagen final: es una secuencia de decisiones locales.</aside>

        <section className="braid-prose-section">
          <p className="braid-section-number">02 / HILOS, TEJIDO Y NUDOS</p>
          <h2>¿Qué comparte con el tejido?</h2>
          <p>Al tejer también repetimos operaciones locales: pasar una hebra, formar una lazada, cruzar puntos o trasladar un motivo. En ambos casos una instrucción breve puede producir una estructura extensa y el patrón global conserva información sobre el orden de las acciones.</p>
          <p>La comparación tiene un límite útil: una trenza mantiene hebras que avanzan entre dos extremos, mientras que el tejido forma una superficie de bucles entrelazados. No son el mismo objeto matemático, pero comparten una manera de pensar: registrar cruces, repeticiones y transformaciones.</p>
          <p>Si unimos los extremos correspondientes de una trenza obtenemos su <em>clausura</em>. Esa clausura puede producir un nudo —una sola componente— o un enlace con varias componentes. Así aparece el puente entre braids y knots.</p>
        </section>

        <BraidWordBuilder />

        <section className="braid-prose-section braid-formal-section">
          <p className="braid-section-number">03 / FORMALIZACIÓN</p>
          <h2>El grupo de trenzas</h2>
          <p>El grupo de trenzas de <em>n</em> hebras, denotado por B<sub>n</sub>, está generado por σ₁,…,σ<sub>n−1</sub>. El generador σᵢ representa el cruce de la hebra situada en la posición i sobre la que está en la posición i+1. Su inversa σᵢ⁻¹ realiza el cruce contrario.</p>
          <div className="braid-presentation" aria-label="Presentación del grupo de trenzas">
            <strong>B<sub>n</sub> = ⟨ σ₁,…,σ<sub>n−1</sub> |</strong>
            <span>σᵢσⱼ = σⱼσᵢ &nbsp; si |i−j| ≥ 2,</span>
            <span>σᵢσ<sub>i+1</sub>σᵢ = σ<sub>i+1</sub>σᵢσ<sub>i+1</sub> ⟩.</span>
          </div>
          <p>La primera relación dice que cruces suficientemente alejados pueden intercambiarse. La segunda es la relación de trenza: dos secuencias distintas de tres cruces producen la misma configuración. Multiplicar dos elementos significa concatenar sus diagramas.</p>
          <p>A diferencia de una simple permutación, hacer dos veces el mismo cruce no devuelve la identidad: en general σᵢ² ≠ e. El grupo recuerda cómo se movieron las hebras, no solo su posición final.</p>
        </section>

        <section className="braid-prose-section braid-closing-section">
          <p className="braid-section-number">04 / VOLVER AL HILO</p>
          <h2>Una gramática para los cruces</h2>
          <p>El grupo de trenzas convierte un gesto manual en una gramática: generadores como movimientos básicos, palabras como instrucciones y relaciones como maneras distintas de obtener la misma estructura. Mirar el tejido desde aquí no reduce su dimensión material; abre otra forma de leer la inteligencia de sus patrones.</p>
        </section>
      </article>

      <footer className="course-footer"><p>CMSpec · Trenzas, nudos y tejido</p><a href="/tejido">Todas las entradas ↗</a></footer>
    </main>
  );
}
