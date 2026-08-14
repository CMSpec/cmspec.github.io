import SiteHeader from "../_components/SiteHeader";
import SageMathCell from "./SageMathCell";

const areas = [
  {
    number: "01", title: "Notas matemáticas", tone: "blue",
    description: "Construcciones geométricas que acompañan las entradas de investigación y permiten mover sus parámetros.",
    entries: [
      { title: "De rectas a cartas", subtitle: "Planos proyectivos sobre cuerpos finitos", description: "Cambia el cuerpo Fq, elige dos rectas y observa cómo sus puntos se convierten en dos cartas con una única coincidencia.", href: "/investigacion/dobble-y-geometria-proyectiva#cartas-proyectivas", visual: "PG(2,q)", kind: "interactivo" },
      { title: "Proyección estereográfica", subtitle: "Mover un punto entre la esfera y el plano", description: "Modifica colatitud y longitud para seguir la recta de proyección y comparar las coordenadas antes y después.", href: "/investigacion/mapas-distancias-y-conformidad#proyeccion-estereografica", visual: "S² → ℝ²", kind: "interactivo" },
      { title: "Plano de Fano", subtitle: "Siete puntos, siete rectas", description: "Selecciona una recta del plano proyectivo finito y observa los tres puntos que contiene, como modelo reducido del mazo de Dobble.", href: "/investigacion/dobble-y-geometria-proyectiva#plano-de-fano", visual: "p ∈ ℓ", kind: "interactivo" },
    ],
  },
  {
    number: "02", title: "Aprender", tone: "green",
    description: "Visualizaciones de los apuntes de pregrado, reunidas por la operación matemática que permiten explorar.",
    entries: [
      { title: "Vectores y combinaciones", subtitle: "Escalares, suma y combinaciones lineales", description: "Cambia ponderadores, suma vectores en ℝ² y observa el paralelogramo que generan dos direcciones.", href: "/cursos/laboratorio-algebra-lineal#vectores", visual: "u + v", kind: "3 exploraciones" },
      { title: "Estructura de matrices", subtitle: "Traza, regiones triangulares y simetría", description: "Destaca diagonales y pares de entradas para reconocer propiedades estructurales de una matriz.", href: "/cursos/laboratorio-algebra-lineal#estructura", visual: "tr(A)", kind: "3 exploraciones" },
      { title: "Operaciones con matrices", subtitle: "Cada entrada, paso a paso", description: "Sigue sumas, productos por escalar, productos punto y multiplicación matricial sin perder las coordenadas que intervienen.", href: "/cursos/laboratorio-algebra-lineal#operaciones", visual: "AB", kind: "4 exploraciones" },
      { title: "Transformaciones", subtitle: "Reducción por filas y cambio de base", description: "Compara una representación antes y después de aplicar operaciones elementales o una matriz de cambio de coordenadas.", href: "/cursos/laboratorio-algebra-lineal#transformaciones", visual: "[v]ᴮ", kind: "2 exploraciones" },
      { title: "Cálculo en los apuntes", subtitle: "Consolas al final de cada unidad", description: "Ejecuta ejemplos de álgebra lineal, ecuaciones diferenciales y cálculo vectorial junto al contenido que los explica.", href: "/aprender", visual: ">_", kind: "calculadoras" },
    ],
  },
  {
    number: "03", title: "Salud", tone: "olive",
    description: "Complementos de lectura para comparar funciones, riesgos y niveles de supervisión en sistemas de IA para salud.",
    entries: [
      { title: "Funciones de IA en salud", subtitle: "Entradas, salidas y cuidados", description: "Tablas de consulta para distinguir una salida interpretativa, predictiva, generativa o auditora y leer sus límites.", href: "/salud/funciones-ia-en-salud", visual: "datos → IA", kind: "guía visual" },
      { title: "Supervisión humana", subtitle: "Del caso a la gobernanza", description: "Compara human-in-the-loop, on-the-loop e in-command según el momento, la escala y la capacidad real de intervenir.", href: "/salud/human-in-the-loop", visual: "IA ⇄ persona", kind: "guía visual" },
    ],
  },
  {
    number: "04", title: "Tejido & estructuras", tone: "pink",
    description: "Experimentos sobre puntos, palabras, identificaciones y superficies que conectan gestos textiles con estructuras matemáticas.",
    entries: [
      { title: "Palabras en el grupo de trenzas", subtitle: "Construir una trenza generador por generador", description: "Añade cruces positivos e inversos, observa el diagrama y compara palabras en B₃.", href: "/tejido/trenzas-nudos-y-tejido", visual: "σ₁σ₂⁻¹", kind: "interactivo" },
      { title: "Lazos y mapping class group", subtitle: "Curvas alrededor de los orificios", description: "Anima lazos y giros sobre una superficie para observar qué información topológica conservan.", href: "/tejido/trenzas-nudos-y-tejido#mapping-class-group", visual: "Mod(S)", kind: "animación" },
      { title: "Construir una banda de Möbius", subtitle: "Dar media vuelta e identificar", description: "Sigue el cierre de una tira y compara la orientación de sus extremos antes de la costura.", href: "/tejido/banda-de-moebius", visual: "▭ ↝ ∞", kind: "animación" },
      { title: "Caminar sobre Möbius", subtitle: "Un recorrido tridimensional de un solo lado", description: "Mueve la cámara y sigue el trayecto continuo sobre la superficie hasta volver al punto inicial con la orientación invertida.", href: "/tejido/banda-de-moebius", visual: "n ↦ −n", kind: "3D interactivo" },
      { title: "Diseñar un patrón binario", subtitle: "Derechos y reveses en una cuadrícula 15×15", description: "Elige cada punto y observa una interpretación tejida del patrón binario resultante.", href: "/tejido/del-reves-al-bit", visual: "0 / 1", kind: "interactivo" },
      { title: "Del rectángulo al toro", subtitle: "Identificar bordes y hacer visibles las costuras", description: "Cierra primero un cilindro y luego un toro, manteniendo visibles los pares de lados que se identifican.", href: "/tejido/repeticion-identificaciones-y-superficies", visual: "ℝ²/ℤ²", kind: "animación" },
      { title: "Del octágono al género dos", subtitle: "Ocho lados, cuatro identificaciones", description: "Compara un dominio hiperbólico con la superficie de dos asas obtenida al pegar sus lados.", href: "/tejido/repeticion-identificaciones-y-superficies", visual: "g = 2", kind: "animación" },
      { title: "Ecuación de un círculo", subtitle: "Centro, radio y sistema de referencia", description: "Mueve los parámetros y observa cómo la ecuación determina una familia de círculos en el plano.", href: "/tejido/superficies-que-se-pueden-tejer", visual: "(x−a)²", kind: "interactivo" },
      { title: "Curvatura y crochet", subtitle: "Aumentos que producen una superficie", description: "Modifica la razón de crecimiento y observa cómo una pieza deja de permanecer plana.", href: "/tejido/superficies-que-se-pueden-tejer", visual: "K < 0", kind: "interactivo" },
    ],
  },
] as const;

export default function LaboratoryPage() {
  return (
    <main className="learn-page course-library-page laboratory-page">
      <SiteHeader />
      <section className="learn-masthead laboratory-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">CMSPEC / COMPLEMENTOS INTERACTIVOS</p>
        <h1>Laboratorio</h1>
        <div className="learn-deck"><p>Un repositorio para mover parámetros, seguir operaciones y experimentar con las ideas que aparecen en las notas.</p></div>
      </section>

      <section className="laboratory-calculator" aria-label="Calculadora SageMath"><SageMathCell /></section>

      <section className="laboratory-repository" aria-label="Repositorio de complementos">
        {areas.map((area) => (
          <section className={`laboratory-area lab-${area.tone}`} key={area.title}>
            <header><span>{area.number} / COLECCIÓN</span><h2>{area.title}</h2><p>{area.description}</p></header>
            <div className="notes-list">
              {area.entries.map((entry, index) => (
                <article className="note-entry laboratory-entry" key={entry.title}>
                  <div className="note-dates">
                    <p><span>TIPO</span><strong>{entry.kind}</strong></p>
                    <p><span>ENTRADA</span><strong>{String(index + 1).padStart(2, "0")}</strong></p>
                  </div>
                  <div className="note-entry-copy">
                    <p>{area.number}.{String(index + 1).padStart(2, "0")} / LABORATORIO</p>
                    <h3><a href={entry.href}>{entry.title}</a></h3>
                    <p className="note-subtitle">{entry.subtitle}</p>
                    <p className="note-description">{entry.description}</p>
                  </div>
                  <a className="note-visual laboratory-visual" href={entry.href} aria-label={`Abrir ${entry.title}`}>
                    <span>{entry.visual}</span><small>ABRIR COMPLEMENTO ↗</small>
                  </a>
                </article>
              ))}
            </div>
          </section>
        ))}
      </section>

      <aside className="learn-colophon"><span>CMSpec · LABORATORIO</span><p>Los complementos conservan un enlace con la entrada donde fueron creados, para que la exploración y su contexto permanezcan juntos.</p></aside>
      <footer className="course-footer"><p>CMSpec · Laboratorio</p><a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a></footer>
    </main>
  );
}
