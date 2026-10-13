import { load } from "cheerio";
import katex from "katex";

export const courseUrl = "https://cmspec.github.io/cursos/introduccion-matematicas/";
export const coursePdfName = "introduccion-matematicas.pdf";

// Read the complete server-rendered course, not the currently selected topic.
// This preserves editorial additions, diagrams and handwritten-source comments.
export function createCourseDocument(source, { date, css, mathCss }) {
  const $ = load(source);
  const chapters = $(".reading-chapter");
  if (!chapters.length || !$(".intro-course").length) throw new Error("No se encontró el curso introductorio completo.");
  const sections = $(".chapter-section");
  const expectedPracticeCount = sections.length;
  const contents = [];
  const answers = [];
  chapters.each((i, element) => {
    const chapter = $(element);
    const title = chapter.find("summary h3").first().text();
    const links = [];
    chapter.find(".chapter-section").each((j, section) => {
      const current = $(section);
      const id = current.attr("id");
      const heading = current.children("h4").first();
      const label = `${i + 1}.${j + 1} ${heading.text()}`;
      links.push(`<li><a href="#${id}">${escapeHtml(label)}</a></li>`);
      heading.text(label);
      const practice = current.find(".intro-practice");
      if (practice.length !== 1 || practice.find("details").length !== 2) throw new Error(`Práctica incompleta: ${id}`);
      const aid = `ayudas-${id}`;
      const help = practice.find("details").map((_, detail) => {
        const item = $(detail);
        const title = item.children("summary").text().replace(/^Ver /, "");
        item.children("summary").remove();
        return `<h4>${escapeHtml(title)}</h4>${item.html()}`;
      }).get().join("");
      answers.push(`<section class="answer" id="${aid}"><h3>${escapeHtml(label)}</h3>${help}<p class="backlink"><a href="#${id}">Volver al tema y su ejercicio</a></p></section>`);
      practice.find("details").remove();
      practice.append(`<p class="backlink"><a href="#${aid}">Consultar pista y solución al final</a></p>`);
    });
    contents.push(`<section class="toc-unit"><h3><a href="#${chapter.attr("id")}">${i + 1}. ${escapeHtml(title)}</a></h3><ol>${links.join("")}</ol></section>`);
    chapter.children("summary").replaceWith(`<h2>${i + 1}. ${escapeHtml(title)}</h2>`);
    chapter.replaceWith(`<section class="document-chapter" id="${chapter.attr("id")}">${chapter.html()}</section>`);
  });

  // Replace interactive controls with complete static examples and a web link.
  $(".intro-explorer").each((_, element) => {
    const explorer = $(element);
    const staticVersion = explorer.find(".course-print-only");
    const id = explorer.closest(".chapter-section").attr("id");
    if (staticVersion.length) explorer.html(staticVersion.html());
    explorer.find(".intro-controls, input, select, button, .synthetic-controls").remove();
    explorer.find("caption").text("Tabla de verdad");
    explorer.append(`<p class="backlink"><a href="${courseUrl}#${id}">Explorar la versión interactiva en CMSpec</a></p>`);
  });
  $(".summation-diagram-narrow").remove();
  const body = $(".reading-chapters").html();
  const editorial = $(".intro-editorial-note").html();
  const readingIntro = $(".intro-manuscript-intro").html().replace("Solo las pistas y las soluciones de las prácticas se abren por separado.", "En esta edición, las pistas y las soluciones de las prácticas se consultan al final del documento.");
  const doc = load(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Introducción a las Matemáticas | CMSpec</title></head><body>
    <section class="cover"><p class="brand">CMSpec / APUNTES PARA ESTUDIAR</p><div class="spectrum"></div>
      <h1>Introducción<br>a las Matemáticas</h1><p class="subtitle">Fundamentos y precálculo</p>
      <p class="author">Camila Muñoz Santander</p><p>Edición unificada · ${escapeHtml(date)}</p>
      <p>${chapters.length} unidades · ${expectedPracticeCount} prácticas guiadas</p>
      <div class="cover-note"><p>Teoría, introducciones, observaciones y ejemplos desarrollados. Las pistas y soluciones de las prácticas están reunidas al final.</p>
      <p>Los gráficos interactivos se presentan como ejemplos estáticos con enlaces a la web. Esta edición reúne los apuntes del curso; el banco de ejercitación se consulta por separado.</p>
      <p><a href="${courseUrl}">cmspec.github.io/cursos/introduccion-matematicas/</a></p></div></section>
    <nav class="toc" aria-label="Índice"><h2>Índice</h2><p>Cada título lleva al tema correspondiente.</p>${contents.join("")}<p><a href="#ayudas">Pistas y soluciones de las prácticas</a></p><p><a href="#bibliografia">Sobre el curso y bibliografía</a></p></nav>
    <section class="reading-intro"><h2>Cómo usar estos apuntes</h2>${readingIntro}</section>
    ${body}
    <section class="answer-key" id="ayudas"><h2>Pistas y soluciones</h2><p>Intenta resolver cada práctica antes de consultar su ayuda. La numeración coincide con la de los temas.</p>${answers.join("")}</section>
    <section class="bibliography" id="bibliografia">${editorial}</section>
  </body></html>`);
  // HTML+MathML embeds the KaTeX fonts, avoiding platform-specific math glyphs.
  doc(".katex").each((_, element) => {
    const math = doc(element);
    const tex = math.find('annotation[encoding="application/x-tex"]').text();
    if (!tex) throw new Error("Fórmula sin fuente LaTeX.");
    const displayMode = math.find("math").attr("display") === "block";
    math.replaceWith(katex.renderToString(tex, { displayMode, output: "htmlAndMathml", throwOnError: true }));
  });
  doc("a[href]").each((_, a) => {
    const link = doc(a);
    const href = link.attr("href");
    if (href.startsWith("/")) link.attr("href", new URL(href, courseUrl).href);
  });
  doc("head").append(`<style>${mathCss}\n${css}</style>`);
  if (doc(".chapter-section").length !== expectedPracticeCount || doc(".answer").length !== expectedPracticeCount) throw new Error("El documento perdió secciones o soluciones.");
  return doc.html();
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}
