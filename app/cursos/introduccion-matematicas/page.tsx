import type { Metadata } from "next";
import katex from "katex";
import SiteHeader from "../../_components/SiteHeader";
import CourseIndex from "../_components/CourseIndex";
import { introductoryChapters } from "../../../content/courses/introductory-mathematics";
import { introductoryAlgebraExtension } from "../../../content/courses/introductory-algebra-extension";
import { handwrittenNotes, handwrittenNoteCount } from "../../../content/courses/introductory-handwritten-notes";
import { sitePath } from "../../../lib/site-path";
import { FunctionNotationDiagram } from "../calculo-diferencial/FunctionConceptExplorers";
import { LogicExplorer, UnitCircleExplorer } from "./IntroExplorers";
import { ComplexDiagrams } from "./ComplexDiagrams";
import SyntheticDivisionExplorer from "./SyntheticDivisionExplorer";

export const metadata: Metadata = { title: "Introducción a las Matemáticas | CMSpec", description: "Lógica, conjuntos, ecuaciones, funciones, trigonometría, vectores, inducción, sumatorias, complejos, polinomios y geometría analítica. Teoría y ejercicios guiados dentro del curso." };
function MathText({text}: {text:string}) {
  return <>{text.split(/(\$[^$]+\$)/g).map((part,i) => part.startsWith("$") && part.endsWith("$") ? <span key={i} className="course-inline-math" dangerouslySetInnerHTML={{__html:katex.renderToString(part.slice(1,-1),{output:"mathml",throwOnError:true})}}/> : part)}</>;
}
const names = {definition:"Definición",example:"Ejemplo",remark:"Observación"};
const styles = {definition:"defin",example:"ejem",remark:"rmk"};
const chapters = [...introductoryChapters, ...introductoryAlgebraExtension];
const practiceCount = chapters.reduce((total, chapter) => total + chapter.sections.length, 0);
export default function IntroductoryMathematicsPage() {
  const units = chapters.map((chapter,i)=>({number:String(i+1).padStart(2,"0"),title:chapter.title,href:`#lectura-intro-${i+1}`,items:chapter.sections.map((section,j)=>({title:section.title,href:`#intro-${chapter.slug}-${j+1}`}))}));
  return <main className="course-page intro-course">
    <SiteHeader/>
    <article className="course-masthead">
      <div className="course-spectrum" aria-hidden="true"><i/><i/><i/><i/></div>
      <p className="course-kicker">CURSO INTRODUCTORIO · FUNDAMENTOS Y PRECÁLCULO</p>
      <h1>Introducción a las Matemáticas</h1>
      <p className="course-deck">Aprender a leer, representar y resolver. Lógica y funciones, conjuntos y sumatorias, números complejos y geometría: una base para entrar al cálculo y al álgebra lineal.</p>
      <div className="course-meta"><div><span>COLECCIÓN</span><strong>CMSpec · Aprender</strong></div><div><span>CONTENIDO</span><strong>{chapters.length} unidades · {practiceCount} prácticas guiadas</strong></div><div><span>PUNTO DE PARTIDA</span><strong>Aritmética y operaciones con fracciones</strong></div></div>
    </article>
    <div className="course-article-layout">
      <CourseIndex units={units} note="Sigue las unidades en orden o consulta una sección. Intenta cada ejercicio antes de abrir su pista y solución."/>
      <section className="course-reader" aria-labelledby="intro-reader-title">
        <header className="reader-heading"><p>APRENDER DESDE LOS FUNDAMENTOS</p><h2 id="intro-reader-title">Del lenguaje a las ideas.</h2><p>Un curso de fundamentos y álgebra, con conceptos, ejemplos desarrollados y ejercicios con ayuda progresiva. Todo el contenido se estudia aquí mismo.</p></header>
        <div className="differential-visual-note"><span>RUTA DE APRENDIZAJE</span><strong>comprender → representar → resolver → comprobar</strong><p>Lee la idea, explora un ejemplo y ensaya una respuesta propia. Las pistas y las soluciones se abren por separado.</p></div>
        <aside className="intro-manuscript-intro"><h3>Explicaciones de clase, paso a paso</h3><p>{handwrittenNoteCount} desarrollos complementarios integrados junto a los conceptos. Ábrelos para seguir el razonamiento sin salir del curso. Las correcciones y los pasos completados se indican explícitamente.</p><p>Las unidades 7 a 12 amplían el recorrido con los nuevos temas. Puedes estudiar conjuntos después de lógica; inducción y progresiones después de ecuaciones; complejos después de trigonometría; y geometría analítica después de funciones y vectores.</p></aside>
        <div className="reading-chapters">{chapters.map((chapter,i)=><details className={`reading-chapter chapter-tone-${i%4+1}`} id={`lectura-intro-${i+1}`} key={chapter.slug} open={i===0}>
          <summary><span>{String(i+1).padStart(2,"0")}</span><h3>{chapter.title}</h3><i aria-hidden="true">+</i></summary>
          <article className="chapter-article">
            {chapter.sections.map((section,j)=><section className="chapter-section" id={`intro-${chapter.slug}-${j+1}`} key={section.title}>
              <h4>{section.title}</h4>
              <div className="latex-content">{section.blocks.map((block,k)=><div className={`${styles[block.kind]}_thmwrapper`} key={k}><div className={`${styles[block.kind]}_thmheading`}><span>{names[block.kind]}</span><span> · {block.title}</span></div><div className={`${styles[block.kind]}_thmcontent`}><p><MathText text={block.text}/></p>{block.tex && <div className="course-math" dangerouslySetInnerHTML={{__html:katex.renderToString(block.tex,{displayMode:true,output:"mathml",throwOnError:true})}}/>}</div></div>)}</div>
              {section.visual === "functions" && <FunctionNotationDiagram/>}{section.visual === "logic" && <LogicExplorer/>}{section.visual === "circle" && <UnitCircleExplorer/>}
              {chapter.slug === "polinomios" && section.title === "División larga y división sintética" && <><SyntheticDivisionExplorer/>
                <aside className="synthetic-observations" aria-label="Observaciones sobre la división sintética">
                  <h5>Observaciones sobre la división sintética</h5>
                  <ol>
                    <li><strong>El divisor debe tener grado 1.</strong><p>El método mostrado se aplica directamente a divisores de la forma <MathText text={String.raw`$x-a$`}/>. No usamos esta tabla para un divisor de grado 2 o mayor. Si el divisor es lineal pero su coeficiente principal no es 1, hay que ajustar el procedimiento.</p></li>
                    <li><strong>El resto siempre es un número, incluido el cero.</strong><p>Por el algoritmo de la división, el resto es cero o tiene grado menor que el divisor. Como el divisor tiene grado 1, el resto no puede contener términos con x: es una constante. En la animación, el resto es 7.</p></li>
                    <li><strong>La fila inferior permite leer el cociente.</strong><p>El último número es el resto; todos los anteriores son los coeficientes del cociente, en orden de potencias decrecientes. Si el dividendo tiene grado n ≥ 1, el cociente tiene grado n − 1. Aquí, de <MathText text={String.raw`$2,1,6\mid7$`}/> obtenemos <MathText text={String.raw`$q(x)=2x^2+x+6$`}/>: grado 2, uno menos que el grado 3 del dividendo.</p></li>
                    <li><strong>¿Qué obtenemos al evaluar el polinomio en 2?</strong><p>El algoritmo de la división nos dice que <MathText text={String.raw`$p(x)=(x-2)q(x)+7$`}/>. Sustituimos x por 2 en esta igualdad:</p><p className="synthetic-evaluation"><MathText text={String.raw`$p(2)=(2-2)q(2)+7=0\cdot q(2)+7=7$.`}/></p><p>Al evaluar en 2 obtenemos 7, el mismo número que quedó como resto. Esta coincidencia es un hecho general que explicaremos en el siguiente tema.</p></li>
                  </ol>
                </aside>
              </>}
              {(section.visual === "complex-plane" || section.visual === "complex-geometry" || section.visual === "complex-roots") && <ComplexDiagrams variant={section.visual}/>}
              {handwrittenNotes[`${chapter.slug}-${j+1}`] && <div className="intro-handwritten-notes"><p className="practice-label">EXPLICACIONES DE CLASE · PASO A PASO</p>{handwrittenNotes[`${chapter.slug}-${j+1}`].map((note)=><details className="intro-handwritten-note" key={note.title}>
                <summary><span>{note.title}</span><span className="intro-note-action">Ver desarrollo</span></summary>
                <div className="intro-note-body"><ol>{note.steps.map((step,l)=><li key={l}><MathText text={step}/></li>)}</ol>{note.correction && <p className="intro-note-correction"><strong>Nota de la adaptación: </strong>{note.correction}</p>}</div>
              </details>)}</div>}
              <div className="intro-practice"><p className="practice-label">PRÁCTICA · {i+1}.{j+1}</p><p><MathText text={section.exercise}/></p><details><summary>Ver pista</summary><p><MathText text={section.hint}/></p></details><details><summary>Ver solución</summary><p><MathText text={section.solution}/></p></details></div>
            </section>)}
          </article>
        </details>)}</div>
        <section className="intro-editorial-note"><h3>Sobre el curso</h3><p>Los conceptos y ejercicios de las clases están reorganizados y desarrollados para estudiar en esta página. Se revisan las fórmulas, las restricciones de dominio y las respuestas, señalando las correcciones necesarias.</p><p>Bibliografía de las clases: <cite>Álgebra e Introducción al Cálculo</cite>, Irene F. Mikenberg; <cite>Precálculo. Matemáticas para el Cálculo</cite>, James Stewart; y <cite>Álgebra</cite>, Ximena Carreño Campos y Ximena Cruz Schmidt.</p><h3>Para continuar</h3><p><a href={sitePath("/cursos/calculo-diferencial")}>Cálculo Diferencial →</a> · <a href={sitePath("/cursos/algebra-lineal")}>Álgebra Lineal →</a></p></section>
      </section>
    </div>
    <footer className="course-footer"><p>CMSpec · Un espectro de intereses</p><a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a></footer>
  </main>;
}
