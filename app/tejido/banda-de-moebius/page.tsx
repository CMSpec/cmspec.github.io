import { BrandHeader } from "../../_components/editorial";
import { getCollection, getEntry } from "../../../content/collections";
import { MoebiusIdentification, MoebiusWalk } from "./MoebiusExplorers";

export default function MoebiusBandPage() {
  const collection = getCollection("tejido")!;
  const entry = getEntry("tejido", "/tejido/banda-de-moebius")!;

  return (
    <main className="course-page editorial-entry tone-pink moebius-page">
      <BrandHeader label={collection.label} backHref="/tejido" />
      <article className="course-masthead editorial-entry-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">{entry.eyebrow}</p>
        <h1>{entry.title}</h1>
        <p className="course-deck">{entry.subtitle}</p>
        <div className="course-meta">
          <div><span>AUTORÍA</span><strong>{entry.authors}</strong></div>
          <div><span>COLECCIÓN</span><strong>Tejido & Patrones</strong></div>
          <div><span>RECORRIDO</span><strong>Costura · Un lado · Orientabilidad</strong></div>
        </div>
      </article>

      <article className="braid-article moebius-article">
        <p className="braid-article-lead">{entry.introduction}</p>

        <section className="braid-prose-section">
          <p className="braid-section-number">01 / UN CUELLO CON MEDIA VUELTA</p>
          <h2>Una construcción conocida al tejer</h2>
          <p>Muchos cuellos de lana se construyen a partir de una pieza larga y rectangular. Los extremos pueden coserse directamente para formar un tubo, o puede darse media vuelta a uno de ellos antes de unirlos. La segunda opción ayuda a que el cuello se acomode y muestre alternativamente distintas partes del tejido.</p>
          <p>Ese gesto pequeño —girar antes de coser— es exactamente el que distingue una banda de Möbius. La costura no une la esquina superior izquierda con la superior derecha: la une con la inferior derecha.</p>
          <MoebiusIdentification />
        </section>

        <section className="braid-prose-section">
          <p className="braid-section-number">02 / CASI UN CILINDRO</p>
          <h2>Una diferencia sutil, propiedades opuestas</h2>
          <p>El cilindro y la banda de Möbius se obtienen identificando los extremos de un rectángulo. En el cilindro se unen conservando la orientación; en la banda se invierte uno de los extremos. Antes de coser, la diferencia parece limitarse a media vuelta. Después de coser, cambia la topología completa.</p>
          <div className="surface-comparison">
            <div><span>CILINDRO</span><strong>(0,t) ∼ (1,t)</strong><p>Dos lados distinguibles · dos componentes de borde · orientable.</p></div>
            <div><span>BANDA DE MÖBIUS</span><strong>(0,t) ∼ (1,−t)</strong><p>Un solo lado · una componente de borde · no orientable.</p></div>
          </div>
          <p>En un cilindro podemos pintar el exterior sin tocar el interior. En una banda de Möbius, una pincelada que continúa sin cruzar el borde alcanza aquello que inicialmente parecía el reverso. Frente y dorso forman una sola superficie continua.</p>
        </section>

        <aside className="braid-pullquote moebius-pullquote">La banda no pierde su reverso: revela que derecho y revés nunca estuvieron separados.</aside>

        <section className="braid-prose-section">
          <p className="braid-section-number">03 / CAMINAR SOBRE LA BANDA</p>
          <h2>Volver al inicio, pero invertida</h2>
          <p>Imaginemos una persona diminuta que camina manteniendo siempre los pies sobre la banda. El marco local que distingue izquierda y derecha gira lentamente. Tras una vuelta llega al mismo sector, pero la dirección transversal se ha invertido; una segunda vuelta devuelve también la orientación inicial.</p>
          <p>La huella pintada de la animación se desplaza ligeramente del centro para que el cambio resulte visible: después del primer circuito continúa por lo que, en un cilindro, llamaríamos la otra cara. Nunca salta un borde ni atraviesa la superficie.</p>
          <MoebiusWalk />
        </section>

        <section className="braid-prose-section">
          <p className="braid-section-number">04 / ORIENTABILIDAD</p>
          <h2>Cuando no existe un “arriba” global</h2>
          <p>Una superficie es orientable cuando podemos elegir continuamente una dirección normal —un “arriba”— en todos sus puntos sin producir una contradicción. En una esfera o un cilindro elegimos la normal exterior y la transportamos alrededor de cualquier camino cerrado: vuelve con la misma dirección.</p>
          <p>En la banda de Möbius ocurre algo distinto. Si transportamos una flecha normal alrededor de la curva central, al regresar apunta en sentido contrario. Por eso no existe un campo normal continuo y global. Esta imposibilidad es la formulación matemática de la experiencia de recorrer un solo lado.</p>
          <div className="orientation-note"><span>PRUEBA CONCEPTUAL</span><strong>n(0) = −n(2π)</strong><p>La normal cambia de signo después de una vuelta; no puede definirse de manera consistente en toda la banda.</p></div>
        </section>

        <section className="braid-prose-section moebius-formal-section">
          <p className="braid-section-number">05 / FORMALIZACIÓN</p>
          <h2>Un cociente y una parametrización</h2>
          <p>La definición topológica parte del rectángulo [0,1]×[−1,1] y declara equivalentes los puntos (0,t) y (1,−t). El espacio cociente resultante es la banda de Möbius:</p>
          <div className="moebius-formula">M = [0,1]×[−1,1] / ((0,t) ∼ (1,−t)).</div>
          <p>También podemos situarla en ℝ³ mediante una parametrización. Para 0≤u&lt;2π y −w≤v≤w:</p>
          <div className="moebius-parametrization">
            <span>x(u,v) = (R+v cos(u/2)) cos u</span>
            <span>y(u,v) = (R+v cos(u/2)) sin u</span>
            <span>z(u,v) = v sin(u/2)</span>
          </div>
          <p>El ángulo u recorre la curva central y v atraviesa el ancho. Los términos cos(u/2) y sin(u/2) introducen exactamente media rotación cuando u completa una vuelta. La fórmula tridimensional hace visible una realización; la identificación explica la estructura topológica que no cambia al deformarla sin cortar ni pegar.</p>
        </section>

        <section className="braid-prose-section moebius-closing">
          <p className="braid-section-number">06 / VOLVER AL TEJIDO</p>
          <h2>Una costura que cambia el espacio</h2>
          <p>El cuello de lana muestra por qué la topología puede comenzar en un gesto cotidiano. La tira, el giro y la costura contienen una decisión matemática: qué puntos serán considerados el mismo punto. Una media vuelta basta para convertir una superficie orientable en otra que obliga a reconsiderar qué significan lado, borde y dirección.</p>
        </section>
      </article>

      <footer className="course-footer"><p>CMSpec · Caminar por una banda de Möbius</p><a href="/tejido">Todas las entradas ↗</a></footer>
    </main>
  );
}
