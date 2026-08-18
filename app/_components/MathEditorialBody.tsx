import type { EditorialEntry } from "../../content/collections";
import FanoPlane from "./FanoPlane";
import FiniteProjectiveCards from "./FiniteProjectiveCards";
import StereographicProjection from "./StereographicProjection";

function DobblePreviewLink() {
  return (
    <span className="external-preview-link">
      <a
        href="https://www.asmodee.es/product/dobble/"
        target="_blank"
        rel="noreferrer"
        aria-describedby="dobble-link-preview"
      >
        Dobble <span aria-hidden="true">↗</span>
      </a>
      <span className="external-preview-card" id="dobble-link-preview" role="tooltip">
        <span className="dobble-preview-art" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
        <small>SITIO OFICIAL · ASMODEE</small>
        <strong>Dobble</strong>
        <span>55 cartas, 8 símbolos y una coincidencia entre cada par.</span>
      </span>
    </span>
  );
}

function MapsArticle({ entry }: { entry: EditorialEntry }) {
  return (
    <article className="math-essay">
      <p className="math-essay-lead">{entry.introduction}</p>
      <p>
        La dificultad aparece porque la superficie terrestre tiene curvatura y el papel no. Si cortamos una cáscara de naranja e intentamos dejarla completamente plana, tendremos que romperla, superponer partes o estirarla. Un mapa hace algo equivalente mediante una función que asigna a cada punto de la superficie terrestre un punto del plano. Esa función puede estar muy bien diseñada, pero no puede ser una isometría global: no existe una manera de conservar simultáneamente todas las distancias de una esfera en una hoja plana.
      </p>

      <h2>Proyectar es elegir</h2>
      <p>
        Como no es posible conservarlo todo, una proyección se construye para proteger cierta propiedad. El nombre de cada familia describe la promesa que intenta cumplir, aunque esa promesa siempre tiene un alcance preciso.
      </p>
      <div className="health-table-wrap">
        <table className="health-table math-table">
          <caption>Familias de proyecciones cartográficas</caption>
          <thead><tr><th>Tipo</th><th>Qué conserva</th><th>Qué puede deformar</th><th>Cuándo resulta útil</th></tr></thead>
          <tbody>
            <tr><th>Conforme</th><td>Ángulos y formas locales.</td><td>Áreas y distancias globales.</td><td>Navegación y fenómenos donde importa la dirección local.</td></tr>
            <tr><th>Equivalente</th><td>Proporciones de área.</td><td>Formas y ángulos.</td><td>Mapas temáticos que comparan magnitudes por territorio.</td></tr>
            <tr><th>Equidistante</th><td>Ciertas distancias desde un punto o a lo largo de líneas elegidas.</td><td>Las demás distancias, áreas o formas.</td><td>Rutas o distancias medidas desde un lugar de referencia.</td></tr>
            <tr><th>De compromiso</th><td>No conserva exactamente una sola propiedad.</td><td>Reparte la distorsión.</td><td>Mapas generales del mundo destinados a lectura visual.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Un caso conforme: la proyección estereográfica</h2>
      <p>
        Entre estas familias hay una construcción especialmente geométrica. Imaginemos una esfera unitaria sobre un plano tangente en su polo sur y elijamos el polo norte como punto de observación. Para cada punto de la esfera trazamos una recta que parte del polo; el lugar donde esa recta corta el plano es su imagen estereográfica. Cerca del polo norte las imágenes se alejan mucho, mientras el propio polo no alcanza ningún punto finito del plano: se interpreta como el punto en el infinito.
      </p>
      <StereographicProjection />
      <h2>La función y su inversa</h2>
      <p>
        En la convención de la exploración, la esfera es S² = &#123;(x,y,z) ∈ ℝ³ : x²+y²+z²=1&#125;, el polo de proyección es N=(0,0,1) y el plano tangente inferior es z=−1. Si P=(x,y,z) es distinto de N, la proyección σ queda dada por
      </p>
      <div className="math-formula math-formula-stack" role="img" aria-label="Fórmulas de la proyección estereográfica y su inversa">
        <span>σ(x,y,z) = ( 2x/(1−z), 2y/(1−z) ) = (X,Y)</span>
        <span>σ⁻¹(X,Y) = ( 4X/(ρ²+4), 4Y/(ρ²+4), (ρ²−4)/(ρ²+4) ), &nbsp; ρ²=X²+Y²</span>
      </div>
      <p>
        Las fórmulas provienen de parametrizar la recta que une N con P y exigir que su tercera coordenada sea −1. La inversa muestra que cada punto finito del plano recupera un único punto de la esfera distinto del polo norte. Esta correspondencia conserva ángulos: dos curvas que se cruzan en la esfera mantienen su ángulo al proyectarse. Por eso es conforme, aunque su factor de escala crece al acercarse al polo. Los círculos de la esfera se transforman en círculos del plano, salvo los que pasan por N, que se convierten en rectas.
      </p>
      <aside className="math-reading-note">
        <strong>Una convención entre varias</strong>
        <p>En cartografía también se usa un plano tangente a la esfera y puede elegirse otro punto de contacto. Las fórmulas cambian por una rotación y una escala, pero la idea permanece: proyectar desde el punto antipodal al plano y conservar los ángulos localmente.</p>
      </aside>

      <h2>Qué significa que un mapa sea conforme</h2>
      <p>
        Una transformación conforme conserva ángulos en una escala local. Cerca de cada punto se comporta como una rotación o reflexión seguida de un cambio de escala: las direcciones relativas se mantienen, aunque el factor de aumento puede variar de un lugar a otro. Por eso una figura muy pequeña conserva aproximadamente su forma, mientras dos continentes alejados pueden aparecer con tamaños relativos muy distintos.
      </p>
      <div className="math-formula" role="img" aria-label="La derivada de una transformación conforme es un factor de escala por una transformación ortogonal">
        Df<sub>p</sub> = λ(p) R(p)
      </div>
      <p>
        La proyección de Mercator es conforme. Su ventaja histórica para la navegación es que las líneas de rumbo constante se representan como rectas. El precio es que la escala aumenta hacia los polos: Groenlandia y otras regiones de latitudes altas aparecen mucho más grandes en relación con territorios cercanos al ecuador. No se trata de un error escondido, sino de la consecuencia de la propiedad que la proyección decidió conservar.
      </p>

      <aside className="math-reading-note">
        <strong>Distancia no significa siempre lo mismo</strong>
        <p>En la Tierra, la distancia más corta se mide sobre la superficie mediante una geodésica. En el mapa medimos segmentos del plano. Una proyección puede hacer coincidir ambas medidas desde un punto o sobre ciertas líneas, pero no para todos los pares de lugares a la vez.</p>
      </aside>

      <h2>Un mapa también contiene una posición</h2>
      <p>
        La distorsión geométrica no vuelve falso a un mapa: lo vuelve adecuado para algunos propósitos e inadecuado para otros. Sin embargo, elegir una proyección, un centro, una orientación y un recorte no es una operación neutral. Esas decisiones determinan qué aparece cerca del centro, qué queda fragmentado, qué territorios parecen grandes y qué relaciones espaciales resultan más visibles.
      </p>
      <div className="health-table-wrap">
        <table className="health-table math-table">
          <caption>Decisiones que forman parte de una representación cartográfica</caption>
          <thead><tr><th>Decisión</th><th>Efecto visual</th><th>Pregunta crítica</th></tr></thead>
          <tbody>
            <tr><th>Proyección</th><td>Distribuye la deformación de área, forma, dirección y distancia.</td><td>¿La propiedad conservada corresponde al argumento del mapa?</td></tr>
            <tr><th>Centro y corte</th><td>Produce un interior continuo y periferias interrumpidas.</td><td>¿Qué territorio queda presentado como punto de referencia?</td></tr>
            <tr><th>Orientación</th><td>Asocia arriba, abajo, izquierda y derecha con relaciones culturales aprendidas.</td><td>¿Por qué el norte debe aparecer arriba?</td></tr>
            <tr><th>Fronteras y nombres</th><td>Convierte disputas y clasificaciones en líneas aparentemente estables.</td><td>¿Quién nombró y delimitó lo que vemos?</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Esto no significa que toda proyección esconda una intención política consciente. Significa algo más sutil: una solución técnica puede adquirir efectos culturales cuando se convierte en la imagen habitual del mundo. Leer críticamente un mapa exige entonces dos preguntas inseparables: qué hace matemáticamente la transformación y qué relato construyen las decisiones que la acompañan.
      </p>
      <div className="essay-sources">
        <strong>Para seguir leyendo</strong>
        <a href="https://pubs.usgs.gov/gip/70047422/report.pdf">U.S. Geological Survey: Map Projections</a>
        <a href="https://www.usgs.gov/faqs/how-are-different-map-projections-used">USGS: How are different map projections used?</a>
        <a href="https://math.mit.edu/~dunkel/Teach/18.04_2019S/notes/1804_Main.pdf">MIT: proyección estereográfica y esfera de Riemann</a>
        <a href="https://doi.org/10.14324/111.444.ai.2022.06">Panos Kratimenos: North isn’t necessarily up</a>
      </div>
    </article>
  );
}

function DobbleArticle({ entry }: { entry: EditorialEntry }) {
  return (
    <article className="math-essay">
      <p className="math-essay-lead">
        <DobblePreviewLink />{entry.introduction.slice("Dobble".length)}
      </p>
      <p>
        Cuando pensamos en las matemáticas de los juegos suele aparecer primero la teoría de juegos, que estudia decisiones, estrategias e incentivos entre participantes. Dobble, sin embargo, plantea otra clase de pregunta. Antes de analizar cómo juega una persona, hay que explicar cómo pudo diseñarse el mazo. Esa tarea pertenece a la combinatoria: el estudio de configuraciones discretas, sus restricciones y las maneras de contar o construirlas.
      </p>
      <p>
        La regla material es simple. La edición clásica tiene 55 cartas con 8 símbolos en cada una, y cualquier par de cartas comparte exactamente un símbolo. Si elegimos los dibujos al azar, esa regularidad se pierde casi de inmediato. La geometría proyectiva finita ofrece, en cambio, una estructura donde la coincidencia está garantizada desde el comienzo.
      </p>

      <h2>Cartas como rectas, símbolos como puntos</h2>
      <p>
        La traducción esencial consiste en llamar <em>punto</em> a cada símbolo y <em>recta</em> a cada carta. La regla del juego se convierte entonces en un axioma geométrico: dos rectas distintas se encuentran en exactamente un punto. Para ver esta idea sin enfrentarnos todavía a 57 elementos, podemos usar el plano proyectivo más pequeño, conocido como plano de Fano.
      </p>
      <FanoPlane />
      <p>
        La circunferencia del dibujo también representa una recta. Esto puede resultar extraño porque estamos observando el plano proyectivo a través de una imagen dibujada en el plano euclidiano. Lo importante no es que todas las rectas parezcan rectas en el papel, sino qué puntos pertenecen a cada una y cómo se intersectan.
      </p>

      <h2>La formalización: PG(2, 7)</h2>
      <p>
        Para acercarnos al tamaño de Dobble utilizamos el cuerpo finito F₇, formado por los números 0, 1, …, 6 con suma y multiplicación módulo 7. Consideramos los triples no nulos (x,y,z) de F₇³, pero identificamos dos triples cuando uno es un múltiplo no nulo del otro. Cada clase se escribe con coordenadas homogéneas [x:y:z] y representa un punto del plano proyectivo PG(2,7).
      </p>
      <div className="math-formula math-formula-stack">
        <span>[x:y:z] = [λx:λy:λz], &nbsp; λ ∈ F₇, λ ≠ 0</span>
        <span>ℓ<sub>[a:b:c]</sub> = &#123;[x:y:z] : ax + by + cz = 0&#125;</span>
      </div>
      <p>
        Una recta se describe mediante otro triple no nulo [a:b:c] y contiene los puntos que satisfacen la ecuación ax + by + cz = 0 en F₇. La incidencia del lenguaje geométrico se vuelve una ecuación algebraica: un símbolo pertenece a una carta precisamente cuando sus coordenadas satisfacen la ecuación de esa recta.
      </p>
      <div className="health-table-wrap">
        <table className="health-table math-table">
          <caption>Del plano proyectivo al mazo</caption>
          <thead><tr><th>Geometría</th><th>Juego</th><th>En PG(2,7)</th></tr></thead>
          <tbody>
            <tr><th>Punto</th><td>Símbolo</td><td>57 puntos posibles.</td></tr>
            <tr><th>Recta</th><td>Carta</td><td>57 rectas posibles.</td></tr>
            <tr><th>Puntos sobre una recta</th><td>Símbolos de una carta</td><td>8 por recta.</td></tr>
            <tr><th>Rectas por un punto</th><td>Cartas donde aparece un símbolo</td><td>8 por punto.</td></tr>
            <tr><th>Intersección de dos rectas</th><td>Símbolo compartido</td><td>Exactamente uno.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>De coordenadas a cartas</h2>
      <p>
        La misma construcción puede recorrerse en distintos tamaños. Al elegir un cuerpo finito y dos rectas, la exploración calcula sus puntos, convierte cada recta en una carta y destaca la única coordenada que ambas comparten. En F₂ reaparece el plano de Fano; en F₇ cada carta contiene ocho símbolos y el sistema completo alcanza 57.
      </p>
      <FiniteProjectiveCards />

      <p>
        El número 57 aparece al contar las clases de triples no nulos: hay 7³−1 triples posibles y cada punto tiene 7−1 representantes escalares, de modo que (7³−1)/(7−1)=57. La construcción completa produciría 57 cartas; el juego comercial clásico contiene 55. Retirar cartas no destruye la propiedad de las restantes: cualquier par todavía proviene de dos rectas que se encuentran en un punto.
      </p>

      <aside className="math-reading-note">
        <strong>Del hecho abstracto al juego de memoria</strong>
        <p>La geometría garantiza que el símbolo común existe y es único. El diseño gráfico cambia tamaños, orientaciones y posiciones para que reconocerlo no sea inmediato. La dificultad perceptiva se construye encima de una regularidad matemática perfecta.</p>
      </aside>

      <p>
        Esta es una de las virtudes de los diseños combinatorios: transforman una condición global —que todos los pares funcionen— en una estructura que puede generarse sin revisar carta por carta. Dobble parece pedir rapidez visual, pero debajo del juego hay una solución algebraica a una pregunta de incidencia: cómo organizar puntos y rectas para que cada encuentro ocurra una sola vez.
      </p>
      <div className="essay-sources">
        <strong>Para seguir leyendo</strong>
        <a href="https://www.asmodee.es/product/dobble/">Asmodee: reglas y componentes de Dobble</a>
        <a href="https://www.math.cmu.edu/users/math/mtait/301/Notes.pdf">Carnegie Mellon University: notas de combinatoria y planos proyectivos</a>
      </div>
    </article>
  );
}

export default function MathEditorialBody({ entry }: { entry: EditorialEntry }) {
  return entry.href === "/investigacion/dobble-y-geometria-proyectiva"
    ? <DobbleArticle entry={entry} />
    : <MapsArticle entry={entry} />;
}
