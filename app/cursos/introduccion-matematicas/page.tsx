import type { Metadata } from "next";
import katex from "katex";
import SiteHeader from "../../_components/SiteHeader";
import CourseIndex from "../_components/CourseIndex";
import { introductoryChapters } from "../../../content/courses/introductory-mathematics";
import { handwrittenNotes, handwrittenNoteCount } from "../../../content/courses/introductory-handwritten-notes";
import { sitePath } from "../../../lib/site-path";
import { FunctionNotationDiagram } from "../calculo-diferencial/FunctionConceptExplorers";
import { LogicExplorer, UnitCircleExplorer } from "./IntroExplorers";

export const metadata: Metadata = { title: "Introducción a las Matemáticas | CMSpec", description: "Lógica, ecuaciones, inecuaciones, funciones, trigonometría y vectores. Un curso con teoría, ejemplos, ejercicios guiados y apuntes originales." };
function MathText({text}: {text:string}) {
  return <>{text.split(/(\$[^$]+\$)/g).map((part,i) => part.startsWith("$") && part.endsWith("$") ? <span key={i} className="course-inline-math" dangerouslySetInnerHTML={{__html:katex.renderToString(part.slice(1,-1),{output:"mathml",throwOnError:true})}}/> : part)}</>;
}
const names = {definition:"Definición",example:"Ejemplo",remark:"Observación"};
const styles = {definition:"defin",example:"ejem",remark:"rmk"};
export default function IntroductoryMathematicsPage() {
  const units = introductoryChapters.map((chapter,i)=>({number:String(i+1).padStart(2,"0"),title:chapter.title,href:`#lectura-intro-${i+1}`,items:chapter.sections.map((section,j)=>({title:section.title,href:`#intro-${chapter.slug}-${j+1}`}))}));
  return <main className="course-page intro-course">
    <SiteHeader/>
    <article className="course-masthead">
      <div className="course-spectrum" aria-hidden="true"><i/><i/><i/><i/></div>
      <p className="course-kicker">CURSO INTRODUCTORIO · FUNDAMENTOS Y PRECÁLCULO</p>
      <h1>Introducción a las Matemáticas</h1>
      <p className="course-deck">Aprender a leer, representar y resolver. Desde el lenguaje lógico hasta las funciones y los vectores, una base para entrar al cálculo y al álgebra lineal.</p>
      <div className="course-meta"><div><span>COLECCIÓN</span><strong>CMSpec · Aprender</strong></div><div><span>CONTENIDO</span><strong>6 unidades · 24 prácticas guiadas</strong></div><div><span>PUNTO DE PARTIDA</span><strong>Aritmética y operaciones con fracciones</strong></div></div>
    </article>
    <div className="course-article-layout">
      <CourseIndex units={units} note="Sigue las unidades en orden o consulta una sección. Intenta cada ejercicio antes de abrir su pista y solución."/>
      <section className="course-reader" aria-labelledby="intro-reader-title">
        <header className="reader-heading"><p>APRENDER DESDE LOS FUNDAMENTOS</p><h2 id="intro-reader-title">Del lenguaje a las ideas.</h2><p>Una adaptación de las clases de lógica, ecuaciones, inecuaciones, funciones, trigonometría y vectores. Cada unidad reúne conceptos, ejemplos y ejercicios con ayuda progresiva.</p></header>
        <div className="differential-visual-note"><span>RUTA DE APRENDIZAJE</span><strong>comprender → representar → resolver → comprobar</strong><p>Lee la idea, explora un ejemplo y ensaya una respuesta propia. Las pistas y las soluciones se abren por separado.</p></div>
        <aside className="intro-manuscript-intro"><h3>También están las explicaciones escritas a mano</h3><p>{handwrittenNoteCount} apuntes de clase adaptados a texto, junto al tema que explican. Abre cada desarrollo para seguir el razonamiento y consultar la página manuscrita. Las correcciones y los pasos completados se indican explícitamente; no es una transcripción literal de todos los trazos.</p></aside>
        <div className="reading-chapters">{introductoryChapters.map((chapter,i)=><details className={`reading-chapter chapter-tone-${i%4+1}`} id={`lectura-intro-${i+1}`} key={chapter.slug} open={i===0}>
          <summary><span>{String(i+1).padStart(2,"0")}</span><h3>{chapter.title}</h3><i aria-hidden="true">+</i></summary>
          <article className="chapter-article">
            <nav className="intro-source-links" aria-label={`Material de ${chapter.title}`}><a href={sitePath(`/cursos/introduccion-matematicas/${chapter.source}`)} target="_blank" rel="noreferrer">Clase original · PDF ↗</a>{chapter.annotated && <a href={sitePath(`/cursos/introduccion-matematicas/${chapter.annotated}`)} target="_blank" rel="noreferrer">Apuntes ampliados · PDF ↗</a>}</nav>
            {chapter.sections.map((section,j)=><section className="chapter-section" id={`intro-${chapter.slug}-${j+1}`} key={section.title}>
              <h4>{section.title}</h4>
              <div className="latex-content">{section.blocks.map((block,k)=><div className={`${styles[block.kind]}_thmwrapper`} key={k}><div className={`${styles[block.kind]}_thmheading`}><span>{names[block.kind]}</span><span> · {block.title}</span></div><div className={`${styles[block.kind]}_thmcontent`}><p><MathText text={block.text}/></p>{block.tex && <div className="course-math" dangerouslySetInnerHTML={{__html:katex.renderToString(block.tex,{displayMode:true,output:"mathml",throwOnError:true})}}/>}</div></div>)}</div>
              {section.visual === "functions" && <FunctionNotationDiagram/>}{section.visual === "logic" && <LogicExplorer/>}{section.visual === "circle" && <UnitCircleExplorer/>}
              {chapter.annotated && handwrittenNotes[`${chapter.slug}-${j+1}`] && <div className="intro-handwritten-notes"><p className="practice-label">APUNTES DE CLASE · DEL MANUSCRITO AL RAZONAMIENTO</p>{handwrittenNotes[`${chapter.slug}-${j+1}`].map((note)=><details className="intro-handwritten-note" key={note.title}>
                <summary><span>{note.title}</span><span className="intro-note-action">Ver desarrollo</span></summary>
                <div className="intro-note-body"><ol>{note.steps.map((step,l)=><li key={l}><MathText text={step}/></li>)}</ol>{note.correction && <p className="intro-note-correction"><strong>Nota de la adaptación: </strong>{note.correction}</p>}<a aria-label={`Consultar el manuscrito: ${note.title}, página ${note.pages[0]}`} href={`${sitePath(`/cursos/introduccion-matematicas/${chapter.annotated}`)}#page=${note.pages[0]}`} target="_blank" rel="noreferrer">Ver manuscrito · {note.pages[0]===note.pages[1]?`p. ${note.pages[0]}`:`pp. ${note.pages[0]}–${note.pages[1]}`} del PDF ↗</a></div>
              </details>)}</div>}
              <div className="intro-practice"><p className="practice-label">PRÁCTICA · {i+1}.{j+1}</p><p><MathText text={section.exercise}/></p><details><summary>Ver pista</summary><p><MathText text={section.hint}/></p></details><details><summary>Ver solución</summary><p><MathText text={section.solution}/></p></details></div>
            </section>)}
          </article>
        </details>)}</div>
        <section className="intro-editorial-note"><h3>Sobre estos apuntes</h3><p>La lectura web reorganiza y desarrolla una selección de los conceptos y ejercicios de las clases compartidas. Los PDF conservan el material original y sus anotaciones. En la adaptación se revisaron las fórmulas, las restricciones de dominio y las respuestas; las correcciones no modifican los archivos originales.</p><p>Referencias citadas en las clases: <cite>Álgebra e Introducción al Cálculo</cite>, Irene F. Mikenberg; <cite>Precálculo. Matemáticas para el Cálculo</cite>, James Stewart; y <cite>Álgebra</cite>, Ximena Carreño Campos y Ximena Cruz Schmidt.</p><h3>Para continuar</h3><p><a href={sitePath("/cursos/calculo-diferencial")}>Cálculo Diferencial →</a> · <a href={sitePath("/cursos/algebra-lineal")}>Álgebra Lineal →</a></p></section>
      </section>
    </div>
    <footer className="course-footer"><p>CMSpec · Un espectro de intereses</p><a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a></footer>
  </main>;
}
