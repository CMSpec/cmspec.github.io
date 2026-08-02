import { BrandHeader } from "../../_components/editorial";
import { getCollection, getEntry } from "../../../content/collections";
import { CircleEquationExplorer, CrochetCurvatureExplorer } from "./GeometryCrochetExplorers";

export default function CrochetedSurfacesPage() {
  const collection = getCollection("tejido")!;
  const entry = getEntry("tejido", "/tejido/superficies-que-se-pueden-tejer")!;

  return (
    <main className="course-page editorial-entry tone-pink geometry-crochet-page">
      <BrandHeader label={collection.label} backHref="/tejido" />
      <article className="course-masthead editorial-entry-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">{entry.eyebrow}</p>
        <h1>{entry.title}</h1>
        <p className="course-deck">{entry.subtitle}</p>
        <div className="course-meta">
          <div><span>AUTORÍA</span><strong>{entry.authors}</strong></div>
          <div><span>COLECCIÓN</span><strong>Tejido & Patrones</strong></div>
          <div><span>RECORRIDO</span><strong>Ecuaciones · Superficies · Crochet</strong></div>
        </div>
      </article>

      <article className="braid-article geometry-crochet-article">
        <p className="braid-article-lead">{entry.introduction}</p>

        <section className="braid-prose-section">
          <p className="braid-section-number">01 / FIJAR UN SISTEMA DE REFERENCIA</p>
          <h2>Una forma también puede ser una ecuación</h2>
          <p>Dibujar un círculo parece inmediato. Para describirlo sin depender del dibujo, primero elegimos un sistema de coordenadas: un origen, dos ejes y una unidad de medida. Entonces cada punto del plano recibe un par de números (x,y).</p>
          <p>Si el centro es (a,b) y el radio es r, el círculo queda descrito por (x−a)²+(y−b)²=r². La ecuación no entrega una lista de puntos: establece la condición que todos ellos deben satisfacer. Traducimos así una propiedad geométrica —estar a distancia r del centro— a una relación algebraica.</p>
          <CircleEquationExplorer />
        </section>

        <section className="braid-prose-section">
          <p className="braid-section-number">02 / DE ECUACIONES A LUGARES GEOMÉTRICOS</p>
          <h2>Una puerta a la geometría algebraica</h2>
          <p>La geometría algebraica estudia los conjuntos de soluciones de ecuaciones polinomiales y la estructura que esas soluciones revelan. Una recta, un círculo o la curva con cúspide y²=x³ son ejemplos accesibles de <em>lugares algebraicos</em>: formas cuyos puntos obedecen una ecuación.</p>
          <div className="algebraic-shape-strip" aria-label="Tres ejemplos de ecuaciones y formas algebraicas">
            <div><span>RECTA</span><strong>y = mx+b</strong></div>
            <div><span>CÍRCULO</span><strong>x²+y² = r²</strong></div>
            <div><span>CÚSPIDE</span><strong>y² = x³</strong></div>
          </div>
          <p>Esta imagen real y bidimensional es apenas la entrada. La disciplina suele trabajar también con números complejos, coordenadas proyectivas y espacios de muchas dimensiones. Allí una ecuación puede seguir siendo precisa aunque la figura completa ya no quepa en nuestra intuición visual.</p>
        </section>

        <aside className="braid-pullquote geometry-pullquote">Comprender una ecuación y poder imaginar todas sus soluciones son tareas diferentes.</aside>

        <section className="braid-prose-section">
          <p className="braid-section-number">03 / EL LÍMITE DEL DIBUJO</p>
          <h2>¿Cómo mirar una superficie difícil?</h2>
          <p>Una pantalla plana obliga a proyectar, cortar o sombrear una superficie. Cada recurso ayuda, pero también oculta algo: una proyección deforma distancias, una perspectiva esconde la parte posterior y una fórmula no siempre comunica cómo se siente la curvatura local.</p>
          <p>El plano hiperbólico es un caso especialmente sugerente. Tiene curvatura negativa: alrededor de cada punto hay, en cierto sentido, más espacio que en un plano euclidiano. Sus circunferencias crecen más rápido y un modelo plano tendría que plegarse para acomodar ese exceso.</p>
          <p>Aquí dejamos la geometría algebraica y entramos en la geometría hiperbólica. La conexión de esta entrada no consiste en confundir ambas áreas, sino en una pregunta común: ¿qué representación nos permite comprender una forma?</p>
        </section>

        <section className="braid-prose-section">
          <p className="braid-section-number">04 / UNA SUPERFICIE QUE SE PUEDE TOCAR</p>
          <h2>El crochet como modelo geométrico</h2>
          <p>En 1997, la matemática Daina Taimina encontró una manera resistente y manipulable de modelar el plano hiperbólico con crochet. La idea esencial es aumentar puntos a una razón constante. Como cada vuelta incorpora más longitud, la pieza no permanece plana: comienza a ondularse y plegarse.</p>
          <p>El modelo permite recorrer la superficie con los dedos, extender una región, comparar caminos y observar la curvatura sin reducirla a una sombra bidimensional. El crochet no reemplaza la definición matemática; ofrece una interfaz material para pensarla.</p>
          <CrochetCurvatureExplorer />
        </section>

        <section className="braid-prose-section wertheim-section">
          <p className="braid-section-number">05 / MARGARET Y CHRISTINE WERTHEIM</p>
          <h2>Un arrecife construido con geometría</h2>
          <p>Inspiradas por estas superficies, Margaret y Christine Wertheim iniciaron en 2005 el <em>Crochet Coral Reef</em> desde el Institute For Figuring. No inventaron el crochet hiperbólico —esa contribución corresponde a Taimina—, pero convirtieron la técnica en un proyecto artístico, científico, ecológico y comunitario de gran escala.</p>
          <div className="reef-editorial-visual" role="img" aria-label="Interpretación editorial de varias superficies hiperbólicas tejidas reunidas como un arrecife">
            <i /><i /><i /><i /><i /><i />
            <strong>curvatura + variación + comunidad</strong>
          </div>
          <p>Una misma regla de aumentos produce resultados diferentes al cambiar el hilo, la tensión, el color o el tipo de punto. Las piezas reunidas recuerdan corales, algas y anémonas: la regularidad matemática no elimina la diferencia, sino que crea condiciones para que aparezca.</p>
          <p>El arrecife hace visible algo que una ecuación aislada difícilmente puede mostrar: una superficie matemática también puede ser una experiencia colectiva, táctil y situada. La dificultad de imaginar la geometría se responde aquí no con una imagen más exacta, sino con un objeto que puede sostenerse entre las manos.</p>
        </section>

        <section className="braid-prose-section sources-section">
          <p className="braid-section-number">FUENTES / PARA SEGUIR EXPLORANDO</p>
          <h2>Créditos y lecturas</h2>
          <div className="source-links">
            <a href="https://math.cornell.edu/news/taimina-shares-viral-crocheting-technique-alumni" target="_blank" rel="noreferrer"><span>01</span><strong>Cornell Mathematics</strong><small>Daina Taimina y el origen del crochet hiperbólico ↗</small></a>
            <a href="https://ocean.si.edu/ocean-life/invertebrates/when-art-meets-science-hyberbolic-crochet-coral-reef" target="_blank" rel="noreferrer"><span>02</span><strong>Smithsonian Ocean</strong><small>Historia del Hyperbolic Crochet Coral Reef ↗</small></a>
            <a href="https://www.theiff.org/exhibits/reef.html" target="_blank" rel="noreferrer"><span>03</span><strong>Institute For Figuring</strong><small>Proyecto Crochet Coral Reef de Margaret y Christine Wertheim ↗</small></a>
          </div>
        </section>
      </article>

      <footer className="course-footer"><p>CMSpec · Cuando una superficie se puede tejer</p><a href="/tejido">Todas las entradas ↗</a></footer>
    </main>
  );
}
