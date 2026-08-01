import { BrandHeader } from "../../_components/editorial";
import { getCollection, getEntry } from "../../../content/collections";
import { GenusTwoAnimator, QuotientSurfaceAnimator } from "./TopologyAnimations";

const week = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
const stitchMotif = ["D", "D", "R", "R", "D", "R"];

export default function QuotientPatternsPage() {
  const collection = getCollection("tejido")!;
  const entry = getEntry("tejido", "/tejido/repeticion-identificaciones-y-superficies")!;

  return (
    <main className="course-page editorial-entry tone-pink quotient-article-page">
      <BrandHeader label={collection.label} backHref="/tejido" />
      <article className="course-masthead editorial-entry-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">{entry.eyebrow}</p>
        <h1>{entry.title}</h1>
        <p className="course-deck">{entry.subtitle}</p>
        <div className="course-meta">
          <div><span>AUTORÍA</span><strong>{entry.authors}</strong></div>
          <div><span>COLECCIÓN</span><strong>Tejido & Patrones</strong></div>
          <div><span>RECORRIDO</span><strong>Módulos · Cocientes · Superficies</strong></div>
        </div>
      </article>

      <article className="braid-article quotient-article">
        <p className="braid-article-lead">{entry.introduction}</p>

        <section className="braid-prose-section">
          <p className="braid-section-number">01 / LA SEMANA COMO CICLO</p>
          <h2>Volver al comienzo sin retroceder</h2>
          <p>Después del domingo vuelve el lunes. No regresamos en el tiempo: continuamos avanzando, pero usamos otra vez el mismo nombre. La semana organiza una sucesión infinita de días mediante un ciclo de siete posiciones.</p>
          <div className="week-cycle" aria-label="Los siete días como representantes de las clases módulo siete">
            {week.map((day, index) => <div key={day}><span>{index}</span><strong>{day}</strong></div>)}
          </div>
          <p>Si contamos desde el lunes, los días 0, 7, 14 y 21 ocupan la misma posición semanal. En aritmética modular escribimos 14≡0 (mod 7). Dos enteros son equivalentes cuando su diferencia es múltiplo de siete:</p>
          <div className="quotient-formula">a ≡ b (mod 7) ⇔ 7 divide a−b</div>
          <p>Los números 0,1,…,6 forman una elección conveniente de <strong>representantes</strong>. También podríamos elegir 7,8,…,13. Cambiar representantes no cambia las siete clases: solamente cambia el nombre que usamos para señalar cada una.</p>
        </section>

        <aside className="braid-pullquote">Un representante no reemplaza a los demás elementos de su clase: nos permite hablar por todos ellos sin repetir una lista infinita.</aside>

        <section className="braid-prose-section">
          <p className="braid-section-number">02 / EL MÓDULO DE UN PATRÓN</p>
          <h2>Una pieza pequeña que explica el conjunto</h2>
          <p>En tejido, un motivo puede extenderse a lo largo de una hilera repitiendo siempre la misma instrucción. Si el bloque mínimo tiene seis puntos, la posición de cualquier punto queda determinada por su resto módulo seis.</p>
          <figure className="motif-figure">
            <div className="motif-strip" aria-label="El motivo derecho derecho revés revés derecho revés repetido tres veces">
              {[0, 1, 2].map((repeat) => <div className={repeat === 0 ? "representative" : ""} key={repeat}>{stitchMotif.map((stitch, index) => <span key={`${repeat}-${index}`}>{stitch}</span>)}</div>)}
            </div>
            <figcaption><strong>Esquema representativo:</strong> DDRRDR · repetir desde el comienzo.</figcaption>
          </figure>
          <p>La simplificación no elimina el patrón completo. Conserva un <strong>dominio fundamental</strong>: una porción que contiene toda la información necesaria para reconstruirlo mediante traslaciones. Si la sucesión es xₙ, la periodicidad de largo p se expresa como xₙ₊ₚ=xₙ.</p>
          <p>Elegir el módulo y escoger representantes son dos caras de la misma operación. Agrupamos posiciones equivalentes y después seleccionamos una posición de cada grupo para describir el patrón sin redundancia.</p>
        </section>

        <section className="braid-prose-section topology-section">
          <p className="braid-section-number">03 / IDENTIFICAR BORDES</p>
          <h2>Cuando repetir cambia la forma del espacio</h2>
          <p>Pensemos ahora en un patrón que cubre todo el plano. Si repetimos un rectángulo hacia la izquierda y hacia la derecha, podemos quedarnos con una sola copia e identificar sus bordes verticales: salir por un lado equivale a entrar por el opuesto. El cociente es un cilindro.</p>
          <p>Si además repetimos hacia arriba y hacia abajo, identificamos también los bordes horizontales. El cilindro se cierra sobre sí mismo y obtenemos un toro. Formalmente, ℝ²/ℤ²≅S¹×S¹.</p>
          <QuotientSurfaceAnimator />
          <p>La animación muestra un modelo geométrico del cociente. El rectángulo no se estira en la definición matemática: lo deformamos en el espacio tridimensional para hacer visibles las identificaciones. Topológicamente importan las conexiones, no la curvatura de la dona.</p>
        </section>

        <section className="braid-prose-section topology-section">
          <p className="braid-section-number">04 / MÁS ALLÁ DEL TORO</p>
          <h2>Un octágono para construir dos asas</h2>
          <p>El mismo procedimiento permite construir superficies más complejas. Dentro del disco de Poincaré elegimos un octágono hiperbólico y emparejamos sus lados según la palabra a·b·a⁻¹·b⁻¹·c·d·c⁻¹·d⁻¹. Cada letra aparece dos veces; el exponente −1 indica que la orientación se invierte al pegar.</p>
          <GenusTwoAnimator />
          <p>Después de la identificación queda una cara, cuatro pares de aristas y un único vértice. Por eso su característica de Euler es χ=1−4+1=−2. Como una superficie orientable cerrada satisface χ=2−2g, obtenemos g=2: una superficie con dos asas.</p>
          <p>El octágono y la figura tridimensional no tienen la misma geometría. Representan el mismo espacio topológico desde dos perspectivas: un dominio fundamental con reglas de pegado y una superficie cerrada donde esas reglas ya fueron realizadas.</p>
        </section>

        <section className="braid-prose-section quotient-ending">
          <p className="braid-section-number">05 / UNA MISMA IDEA</p>
          <h2>Reconocer qué se repite</h2>
          <p>Una semana, una guarda tejida y una superficie construida por identificaciones parecen objetos muy diferentes. Sin embargo, los tres invitan a preguntar qué elementos consideraremos equivalentes, qué representantes escogeremos y cuál es la pieza mínima capaz de describir el conjunto.</p>
          <p>La repetición deja entonces de ser solamente una regularidad visual. Se convierte en una manera de simplificar, clasificar y construir espacios nuevos.</p>
        </section>
      </article>

      <footer className="course-footer"><p>CMSpec · Repetir, identificar, representar</p><a href="/tejido">Todas las entradas ↗</a></footer>
    </main>
  );
}
