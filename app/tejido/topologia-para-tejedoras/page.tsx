import { BrandHeader } from "../../_components/editorial";
import { getCollection, getEntry } from "../../../content/collections";
import { sitePath } from "../../../lib/site-path";

export default function TopologyForKnittersPage() {
  const collection = getCollection("tejido")!;
  const entry = getEntry("tejido", "/tejido/topologia-para-tejedoras")!;

  return (
    <main className="course-page editorial-entry tone-pink topology-knitting-page">
      <BrandHeader label={collection.label} backHref="/tejido" />
      <article className="course-masthead editorial-entry-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">{entry.eyebrow}</p>
        <h1>{entry.title}</h1>
        <p className="course-deck">{entry.subtitle}</p>
        <div className="course-meta">
          <div><span>AUTORÍA</span><strong>{entry.authors}</strong></div>
          <div><span>COLECCIÓN</span><strong>Tejido & Estructuras</strong></div>
          <div><span>RECORRIDO</span><strong>Local · Global · Orificios</strong></div>
        </div>
      </article>

      <article className="braid-article topology-knitting-article">
        <p className="braid-article-lead">{entry.introduction}</p>

        <section className="braid-prose-section">
          <p className="braid-section-number">01 / LA EXPERIENCIA DE LA TEJEDORA</p>
          <h2>La forma comienza punto por punto</h2>
          <p>Al tejer, las manos trabajan localmente. La tejedora mira el punto que tiene en la aguja, reconoce cuáles lo rodean y decide qué relación tendrá con ellos: derecho o revés, aumento o disminución, cruce, lazada o cierre. Ninguna de estas operaciones contiene por sí sola la imagen completa del sweater.</p>
          <p>Sin embargo, esas decisiones locales se acumulan. Un aumento repetido produce amplitud; una disminución puede cerrar una coronilla; una secuencia de puntos levantados transforma un borde plano en el comienzo de una manga. La forma global no se añade al final: emerge de cómo se conectan entre sí miles de pequeñas vecindades.</p>
          <aside className="braid-pullquote topology-inline-quote">Tejer es construir una superficie desde información local sin perder de vista la forma global.</aside>
        </section>

        <section className="braid-prose-section">
          <p className="braid-section-number">02 / LOCAL Y GLOBAL</p>
          <h2>Una tela puede parecer plana y terminar siendo una prenda</h2>
          <p>En una zona pequeña, la mayoría de los tejidos se parecen a un trozo de plano: podemos señalar filas, columnas y puntos vecinos. Esa es una descripción <em>local</em>. Pero al seguir la tela encontramos costuras, tubos, bordes y aberturas que solo se reconocen al observar la pieza completa.</p>
          <div className="topology-local-global">
            <div><span>ESCALA LOCAL</span><strong>¿Quién está junto a quién?</strong><p>Puntos, cruces, aumentos y disminuciones organizan pequeñas vecindades.</p></div>
            <div><span>ESCALA GLOBAL</span><strong>¿Qué superficie construyen?</strong><p>El cuerpo, las mangas, el cuello y las costuras determinan la forma completa.</p></div>
          </div>
          <p>Dos muestras pueden verse iguales alrededor de cada punto y, aun así, tener estructuras globales distintas. Una tira puede cerrarse como cilindro o recibir media vuelta y convertirse en una banda de Möbius. Cerca de cualquier punto ambas parecen una superficie ordinaria; la diferencia aparece al recorrerlas enteras.</p>
        </section>

        <section className="braid-prose-section topology-formal-section">
          <p className="braid-section-number">03 / UNA INTRODUCCIÓN MATEMÁTICA</p>
          <h2>¿Qué estudia la topología?</h2>
          <p>La topología estudia propiedades que permanecen bajo deformaciones continuas: estirar, comprimir, doblar o torcer sin cortar, rasgar ni pegar puntos que antes estaban separados. Dos espacios son <em>homeomorfos</em> cuando existe entre ellos una correspondencia continua, biyectiva y con inversa continua.</p>
          <div className="topology-formula" aria-label="Definición de homeomorfismo">
            <strong>f : X → Y</strong>
            <span>continua · biyectiva · f⁻¹ continua</span>
            <small>X ≅ Y</small>
          </div>
          <p>Más que medir longitudes o ángulos, la topología pregunta por conexiones. ¿El objeto está formado por una o varias piezas? ¿Tiene borde? ¿Cuántos lazos independientes pueden rodearlo? ¿Puede elegirse un derecho y un revés de manera consistente? ¿Qué caminos cerrados pueden contraerse hasta un punto?</p>
        </section>

        <section className="braid-prose-section">
          <p className="braid-section-number">04 / CONTAR ORIFICIOS</p>
          <h2>¿Qué topología esconde un sweater?</h2>
          <p>La analogía clásica dice que una dona y una taza con asa son topológicamente equivalentes: ambas tienen un orificio que atraviesa el objeto. Si el material pudiera deformarse como arcilla sin romperse, el agujero central de la dona podría convertirse en el espacio delimitado por el asa.</p>
          <div className="topology-object-comparison topology-classic-comparison" aria-label="Comparación topológica entre una dona y una taza">
            <div className="topology-object-card"><span>DONA</span><div className="topology-donut" aria-hidden="true" /><strong>un túnel</strong></div>
            <b aria-hidden="true">≃</b>
            <div className="topology-object-card"><span>TAZA</span><div className="topology-cup" aria-hidden="true"><i /></div><strong>un asa</strong></div>
          </div>
          <p>El sweater vuelve más interesante la pregunta. Para una tejedora, el cuello, los puños y la cintura son todos “huecos” por los que algo puede pasar. Matemáticamente conviene distinguir: una cosa es un <em>asa</em> o túnel de la superficie —el género— y otra son sus <em>componentes de borde</em>. Un sweater abierto en cuello, cintura y dos puños tiene cuatro bordes circulares; no por eso tiene género cuatro.</p>
          <p>Esta distinción muestra por qué contar orificios no siempre significa contar lo primero que vemos como abertura. La topología precisa qué clase de orificio está estudiando y qué transformaciones permite.</p>
          <a className="topology-braid-link" href={sitePath("/tejido/trenzas-nudos-y-tejido#mapping-class-group")}>
            <span>SIGUIENTE PREGUNTA</span>
            <strong>¿Cómo se pueden transformar esos orificios sin cambiar la superficie?</strong>
            <small>Explorar el mapping class group en la entrada sobre trenzas →</small>
          </a>
        </section>

        <section className="braid-prose-section">
          <p className="braid-section-number">05 / PREGUNTAS TOPOLÓGICAS</p>
          <h2>Mirar una prenda como una superficie</h2>
          <div className="topology-question-list">
            <p><span>01</span>¿Cuántas piezas conexas tiene antes y después de coser?</p>
            <p><span>02</span>¿Cuántos bordes quedan libres y cuáles se identificaron?</p>
            <p><span>03</span>¿Qué caminos pueden recorrerse sin cruzar una costura?</p>
            <p><span>04</span>¿Un lazo tejido puede contraerse o rodea una abertura esencial?</p>
            <p><span>05</span>¿La superficie conserva una orientación global de derecho y revés?</p>
          </div>
          <p>Estas preguntas son básicas porque no dependen del color, del grosor de la lana ni de la tensión exacta. Describen la arquitectura de la prenda antes que su apariencia métrica.</p>
        </section>

        <section className="braid-prose-section topology-closing">
          <p className="braid-section-number">06 / VOLVER A LAS MANOS</p>
          <h2>La topología ya estaba en el tejido</h2>
          <p>Cuando una tejedora decide si trabajará en plano o en redondo, dónde levantará puntos, qué bordes coserá o qué aberturas conservará, está tomando decisiones topológicas. La matemática no reemplaza esa experiencia: ofrece un lenguaje para distinguir lo local de lo global y para explicar por qué una modificación pequeña puede cambiar la superficie completa.</p>
          <p>El sweater es, entonces, más que una analogía simpática. Es una superficie construida conscientemente, capaz de hacer visibles conceptos como vecindad, borde, conectividad, identificación y orientación.</p>
        </section>
      </article>

      <footer className="course-footer"><p>CMSpec · Topología para tejedoras</p><a href={sitePath("/tejido")}>Todas las entradas ↗</a></footer>
    </main>
  );
}
