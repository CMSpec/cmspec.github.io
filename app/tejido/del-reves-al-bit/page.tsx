import { BrandHeader } from "../../_components/editorial";
import { getCollection, getEntry } from "../../../content/collections";
import { StitchPatternGrid } from "./StitchPatternGrid";
import { sitePath } from "../../../lib/site-path";

const textileBits = [
  0, 1, 1, 0, 0, 1, 1, 0,
  1, 0, 0, 1, 1, 0, 0, 1,
  1, 0, 1, 0, 0, 1, 0, 1,
  0, 1, 0, 1, 1, 0, 1, 0,
  0, 1, 1, 0, 0, 1, 1, 0,
];

export default function BinaryTextilesPage() {
  const collection = getCollection("tejido")!;
  const entry = getEntry("tejido", "/tejido/del-reves-al-bit")!;

  return (
    <main className="course-page editorial-entry tone-pink binary-article-page">
      <BrandHeader label={collection.label} backHref="/tejido" />
      <article className="course-masthead editorial-entry-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">{entry.eyebrow}</p>
        <h1>{entry.title}</h1>
        <p className="course-deck">{entry.subtitle}</p>
        <div className="course-meta">
          <div><span>AUTORÍA</span><strong>{entry.authors}</strong></div>
          <div><span>COLECCIÓN</span><strong>Tejido & Estructuras</strong></div>
          <div><span>LECTURA</span><strong>Puntos · Bits · Programación</strong></div>
        </div>
      </article>

      <article className="braid-article binary-article">
        <p className="braid-article-lead">{entry.introduction}</p>

        <figure className="stitch-inversion-figure" aria-labelledby="stitch-inversion-caption">
          <div className="stitch-face stitch-right"><span>D</span><strong>derecho</strong><small>punto visto por el frente</small></div>
          <div className="inversion-arrow"><span>dar vuelta</span><strong>↔</strong><small>I</small></div>
          <div className="stitch-face stitch-wrong"><span>R</span><strong>revés</strong><small>el mismo punto desde atrás</small></div>
          <figcaption id="stitch-inversion-caption">I(D)=R, I(R)=D y, por lo tanto, I²=id.</figcaption>
        </figure>

        <figure className="stitch-comparison-figure" aria-labelledby="stitch-comparison-caption">
          <div className="stitch-comparison-labels" aria-hidden="true"><span>DERECHO</span><span>REVÉS</span></div>
          <img src={sitePath("/images/derecho-reves-tejido.png")} alt="Comparación ampliada del punto derecho, con columnas de formas en V, y el punto revés, con hileras de pequeños relieves horizontales" />
          <figcaption id="stitch-comparison-caption">A la izquierda, el derecho forma columnas de «V»; a la derecha, el revés muestra relieves horizontales. Son las dos vistas de una misma estructura tejida.</figcaption>
        </figure>

        <section className="braid-prose-section">
          <p className="braid-section-number">01 / DAR VUELTA</p>
          <h2>Dos caras de un mismo punto</h2>
          <p>En un tejido de punto, la lazada que aparece como punto derecho desde una cara se reconoce como punto revés desde la otra. Al dar vuelta la labor intercambiamos esas dos vistas. Si la volvemos a girar, regresamos exactamente al comienzo.</p>
          <p>Podemos llamar I a la operación «dar vuelta» y representar las dos vistas por D y R. Entonces I(D)=R e I(R)=D. Aplicar I dos veces no produce un tercer estado: I(I(D))=D e I(I(R))=R.</p>
          <p>En matemáticas, una transformación que al aplicarse dos veces devuelve cada elemento a su estado inicial se llama una <strong>involución</strong>. Se escribe I²=id, donde id es la transformación que no cambia nada.</p>
        </section>

        <aside className="braid-pullquote binary-pullquote">Invertir no siempre significa perder información: a veces es una operación perfectamente reversible.</aside>

        <section className="braid-prose-section">
          <p className="braid-section-number">02 / DEL PUNTO AL BIT</p>
          <h2>Dos estados, muchas secuencias</h2>
          <p>Un bit también posee dos estados posibles, que solemos escribir como 0 y 1. La negación binaria los intercambia: N(0)=1 y N(1)=0. Igual que al dar vuelta el tejido, invertir dos veces recupera el estado original: N(N(b))=b.</p>
          <p>Podemos codificar una hilera usando 0 para derecho y 1 para revés —o al contrario; la elección es una convención—. Una fila de puntos se convierte así en una palabra binaria. Ocho decisiones producen 2⁸=256 filas posibles; al aumentar el largo, la variedad crece exponencialmente.</p>

          <figure className="binary-textile-figure">
            <div className="binary-textile-grid" aria-label="Patrón de cuarenta puntos representados por ceros y unos">
              {textileBits.map((bit, index) => <span className={bit ? "bit-one" : "bit-zero"} key={index}>{bit}</span>)}
            </div>
            <figcaption><span><i className="legend-zero" />0 · derecho</span><span><i className="legend-one" />1 · revés</span></figcaption>
          </figure>

          <StitchPatternGrid />

          <p>Esta comparación no afirma que todo tejido sea un computador. Sirve para reconocer una estructura común: elegir entre dos estados, ordenar esas elecciones y repetir una regla para construir un patrón mayor.</p>
        </section>

        <section className="braid-prose-section binary-history-section">
          <p className="braid-section-number">03 / TEJER INSTRUCCIONES</p>
          <h2>Del telar a la máquina</h2>
          <p>A comienzos del siglo XIX, el telar de Jacquard utilizó tarjetas perforadas para controlar qué hilos se levantaban y, con ello, qué patrón aparecía en la tela. Cada posición de una tarjeta ofrecía dos posibilidades físicas: perforación o ausencia de perforación.</p>
          <p>Charles Babbage adoptó posteriormente tarjetas perforadas para ingresar instrucciones y datos en el diseño de su Máquina Analítica. La conexión histórica no es solo una metáfora: una tecnología destinada a organizar patrones textiles ayudó a imaginar cómo organizar operaciones de cálculo.</p>
        </section>

        <section className="braid-prose-section binary-programmers-section">
          <p className="braid-section-number">04 / PROGRAMAR CON LAS MANOS</p>
          <h2>Las primeras programadoras</h2>
          <p>En 1843, Ada Lovelace publicó sus notas sobre la Máquina Analítica. En ellas describió un procedimiento para calcular números de Bernoulli, hoy ampliamente reconocido como un antecedente fundamental de la programación.</p>
          <p>Un siglo después, las seis programadoras iniciales de ENIAC —entre ellas Jean Bartik— debían estudiar el problema, diseñar la configuración y materializarla conectando cables y ajustando interruptores. Programar todavía era un trabajo visible y corporal: la secuencia lógica se convertía físicamente en conexiones.</p>
          <p>En ese sentido, su labor puede compararse con la de una tejedora: ambas traducen un diseño en una sucesión precisa de operaciones, reconocen módulos que se repiten, detectan errores y reconstruyen el proceso cuando el resultado no coincide con el patrón esperado. Es una comparación conceptual, no una equivalencia entre oficios.</p>
        </section>

        <section className="braid-prose-section binary-formal-section">
          <p className="braid-section-number">05 / FORMALIZACIÓN</p>
          <h2>El sistema binario</h2>
          <p>El conjunto binario es B={`{0,1}`}. Sobre él podemos definir la operación de complemento N:B→B mediante N(b)=1−b. Esta función satisface N∘N=id, por lo que es una involución.</p>
          <div className="binary-formulas" aria-label="Reglas del complemento binario">
            <span>N(0)=1</span><span>N(1)=0</span><strong>N²=id</strong>
          </div>
          <p>Una cadena b₁b₂…bₙ pertenece al conjunto Bⁿ y puede almacenar una sucesión de decisiones. Su significado no está dentro del cero o del uno: aparece cuando acordamos una interpretación. En un tejido podría significar derecho o revés; en una máquina, dos niveles distinguibles de una señal.</p>
        </section>

        <section className="binary-sources" aria-labelledby="binary-sources-title">
          <p className="braid-section-number">FUENTES HISTÓRICAS</p>
          <h2 id="binary-sources-title">Para seguir leyendo</h2>
          <a href="https://collection.sciencemuseumgroup.org.uk/objects/co44906/jacquard-hand-loom">Science Museum Group · Jacquard Hand Loom <span>↗</span></a>
          <a href="https://collection.sciencemuseumgroup.org.uk/objects/co62248/punched-cards-for-babbages-analytical-engine-analytical-engines-components-calculating-machines">Science Museum Group · Punched cards for Babbage’s Analytical Engine <span>↗</span></a>
          <a href="https://blogs.loc.gov/inside_adams/2019/10/the-enchantress-of-number/">Library of Congress · Ada Lovelace and the Analytical Engine <span>↗</span></a>
          <a href="https://computerhistory.org/profile/jean-jennings-bartik/">Computer History Museum · Jean Jennings Bartik <span>↗</span></a>
        </section>
      </article>

      <footer className="course-footer"><p>CMSpec · Del revés al bit</p><a href={sitePath("/tejido")}>Todas las entradas ↗</a></footer>
    </main>
  );
}
