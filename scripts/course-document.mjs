import { load } from "cheerio";
import katex from "katex";

export const courseUrl = "https://cmspec.github.io/cursos/introduccion-matematicas/";
export const coursePdfName = "introduccion-matematicas.pdf";
export const courseSlugs = ["introduccion-matematicas", "algebra-lineal", "calculo-diferencial", "calculo-vectorial", "ecuaciones-diferenciales"];

// Read the complete server-rendered course, not the currently selected topic.
// This preserves editorial additions, diagrams and handwritten-source comments.
export function createCourseDocument(source, { date, css, mathCss, slug = "introduccion-matematicas" }) {
  const $ = load(source);
  if (!courseSlugs.includes(slug)) throw new Error(`Curso desconocido: ${slug}`);
  const courseUrl = `https://cmspec.github.io/cursos/${slug}/`;
  const introductory = slug === "introduccion-matematicas";
  const courseTitle = $(".course-masthead h1").text();
  // Share the website's contact address and prepared message with the PDF.
  const feedbackHref = $(".course-masthead .course-feedback-button").first().attr("href");
  if (!feedbackHref?.startsWith("mailto:")) throw new Error(`Falta el enlace para reportar errores: ${slug}`);
  const author = $(".course-meta > div").filter((_, el) => /^AUTOR/.test($(el).find("span").text())).find("strong").text() || "Camila Muñoz Santander";
  const chapters = $(".reading-chapter");
  if (!chapters.length || !courseTitle) throw new Error(`No se encontró el curso completo: ${slug}`);
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
      const practice = current.find(".intro-practice, .section-practice");
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
  if (!introductory) prepareCourseVisuals($, courseUrl);
  // The additional worked exercises must not remain collapsed in the download.
  $(".reading-chapters details").each((_, element) => {
    const help = $(element);
    const title = help.children("summary").text();
    help.children("summary").remove();
    help.replaceWith(`<section class="document-exercise-help"><h6>${escapeHtml(title)}</h6>${help.html()}</section>`);
  });
  const body = $(".reading-chapters").html();
  const editorial = $(".intro-editorial-note").html() || `<h3>Sobre estos apuntes</h3><p>${escapeHtml(author)}</p><p>Esta edición se genera automáticamente a partir del contenido publicado en CMSpec. Consulta la versión web para acceder a los laboratorios y a las actualizaciones.</p>`;
  const readingIntro = introductory ? $(".intro-manuscript-intro").html().replace("Solo las pistas y las soluciones de las prácticas se abren por separado.", "En esta edición, las pistas y las soluciones de las prácticas se consultan al final del documento.") : `<p>${escapeHtml($(".course-deck").text())}</p>${$(".course-reader > .reader-heading p").last().prop("outerHTML") || ""}<p>Las prácticas de cierre incluyen pistas y soluciones al final. Los ejemplos resueltos y las demostraciones se conservan junto a la teoría. Usa el índice para ir a cada minicapítulo.</p>`;
  const doc = load(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${escapeHtml(courseTitle)} | CMSpec</title></head><body>
    <section class="cover"><p class="brand">CMSpec / APUNTES PARA ESTUDIAR</p><div class="spectrum"></div>
      <h1>${introductory ? "Introducción<br>a las Matemáticas" : escapeHtml(courseTitle)}</h1><p class="subtitle">${introductory ? "Fundamentos y precálculo" : "Apuntes completos para estudiar"}</p>
      <p class="author">${escapeHtml(author)}</p><p>Edición unificada · ${escapeHtml(date)}</p>
      <p>${chapters.length} unidades · ${expectedPracticeCount} prácticas guiadas</p>
      <div class="cover-note"><p>Teoría, introducciones, observaciones y ejemplos desarrollados. Las pistas y soluciones de las prácticas están reunidas al final.</p>
      <p>Los diagramas disponibles se presentan como ejemplos estáticos. Los modelos 3D y laboratorios que necesitan interacción se consultan mediante enlaces a la web. El banco independiente de Ejercitación se consulta por separado.</p>
      <p><a href="${courseUrl}">cmspec.github.io/cursos/${slug}/</a></p>
      <p class="document-feedback"><a href="${escapeHtml(feedbackHref)}"><strong>¿Encontraste algún error?</strong> Ayúdanos a mejorar estos apuntes.</a><br>
      <span>El enlace abre un correo con el nombre de este curso. Indica la página o el tema.</span></p></div></section>
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
    const rendered = katex.renderToString(tex.replace(/\\label\{[^}]*\}/g, "").replace(/[’”]/g, ch => ch === "’" ? "'" : "''"), {
      displayMode, output: "htmlAndMathml", throwOnError: true,
      macros: { "\\sign": "\\operatorname{sign}", "\\adj": "\\operatorname{adj}", "\\senh": "\\sinh", "\\Vec": "\\vec" },
    });
    // Keep the original TeX annotation for exact source-fidelity checks.
    const parsed = load(rendered, {}, false);
    parsed("annotation").text(tex);
    math.replaceWith(parsed.html());
  });
  const targetIds = new Set(doc("[id]").toArray().map(element => doc(element).attr("id")));
  doc("a[href]").each((_, a) => {
    const link = doc(a);
    const href = link.attr("href");
    if (href.startsWith("/")) link.attr("href", new URL(href, courseUrl).href);
    if (href.startsWith("#") && !targetIds.has(href.slice(1))) link.attr("href", courseUrl + href);
  });
  // Imported notes can contain duplicated legacy figure ids. Preserve the first target.
  const ids = new Set();
  doc("[id]").each((_, element) => { const id = doc(element).attr("id"); if (ids.has(id)) doc(element).removeAttr("id"); else ids.add(id); });
  doc("head").append(`<style>${mathCss}\n${css}</style>`);
  if (doc(".chapter-section").length !== expectedPracticeCount || doc(".answer").length !== expectedPracticeCount) throw new Error("El documento perdió secciones o soluciones.");
  return doc.html();
}

function prepareCourseVisuals($, courseUrl) {
  const root = $(".reading-chapters");
  // Preserve the source code of each mathematical sandbox, without fake output.
  root.find(".sage-sandbox").each((_, el) => {
    const box = $(el);
    const title = box.find("h4").text();
    const code = box.find("textarea").text();
    box.html(`<h5>${escapeHtml(title)}</h5><p>Comandos para explorar este tema en el laboratorio web:</p><pre><code>${escapeHtml(code)}</code></pre>`);
  });
  // Finish the trace from the same matrix shown by the animation, not a copied result.
  root.find(".trace-animation").each((_, el) => {
    const values = $(el).find(".structure-matrix > span").map((_, cell) => Number($(cell).text())).get();
    const size = Math.sqrt(values.length);
    const diagonal = Array.from({ length: size }, (_, i) => values[i * size + i]);
    if (!Number.isInteger(size) || !diagonal.every(Number.isFinite)) throw new Error("Matriz de traza inválida");
    const expression = diagonal.map((value, i) => i === 0 ? String(value) : value < 0 ? `- ${-value}` : `+ ${value}`).join(" ");
    $(el).find(".trace-calculation").text(`Tr(A) = ${expression} = ${diagonal.reduce((a, b) => a + b, 0)}`);
    $(el).find(".matrix-animation-controls").remove();
  });
  // Matrices implemented as animated grids need a real printed array.
  root.find(".structure-matrix").each((_, el) => {
    const matrix = $(el);
    const values = matrix.children("span").map((_, cell) => $(cell).text()).get();
    const size = matrix.hasClass("matrix-size-2") ? 2 : 3;
    const rows = Array.from({ length: values.length / size }, (_, i) => values.slice(i * size, (i + 1) * size).join(" & "));
    matrix.replaceWith(`<div class="course-math">${katex.renderToString(`\\begin{pmatrix}${rows.join("\\\\")}\\end{pmatrix}`, { output: "mathml", displayMode: true })}</div>`);
  });
  const interactive = root.find("figure:has(input, button, [class$='-stage']), .vector-lab, .course-concept-animation, .sage-sandbox, section:has(> canvas)");
  interactive.each((_, el) => {
    const box = $(el);
    if (box.parents(".document-explorer").length) return;
    box.addClass("document-explorer");
    const id = box.closest(".chapter-section").attr("id");
    box.prepend('<p class="document-static-label">Vista de referencia · consulta la interacción en la web</p>');
    box.append(`<p class="backlink"><a href="${courseUrl}#${id}">Explorar este tema en CMSpec</a></p>`);
  });
  root.find("canvas").each((_, el) => $(el).replaceWith(`<p class="document-online-figure">${escapeHtml($(el).attr("aria-label") || "Gráfico interactivo")}. Gráfico disponible en la versión web.</p>`));
  root.find("[class$='-stage'][aria-label]").each((_, el) => {
    if (!$(el).children().length) $(el).replaceWith(`<p class="document-online-figure">${escapeHtml($(el).attr("aria-label"))}. Modelo interactivo disponible en la versión web.</p>`);
  });
  root.find(".level-curves-camera-hint, .concept-mode-row, input, button, select, textarea, script, iframe").remove();
  root.find("details").each((_, el) => { const box = $(el); box.children("summary").each((_, summary) => $(summary).replaceWith(`<h5>${$(summary).html()}</h5>`)); box.replaceWith(`<section>${box.html()}</section>`); });
  root.find("[hidden]").removeAttr("hidden");
  root.find('img[src="images/img-0001.png"]').attr("src", "/courses/algebra-lineal/Regla_de_Sarrus.png").removeAttr("style");
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}
