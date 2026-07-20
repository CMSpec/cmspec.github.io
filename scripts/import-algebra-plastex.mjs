import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import katex from "katex";

const sourceDirectory = path.resolve(process.argv[2] ?? "");
const outputFile = path.resolve(process.argv[3] ?? "content/courses/algebra-lineal-chapters.ts");
const projectRoot = process.cwd();
const plastexExecutable = path.join(projectRoot, ".venv-plastex", "bin", "plastex");

if (!process.argv[2] || !fs.existsSync(sourceDirectory)) {
  throw new Error("Uso: node scripts/import-algebra-plastex.mjs DIRECTORIO_APUNTES [ARCHIVO_SALIDA]");
}
if (!fs.existsSync(plastexExecutable)) {
  throw new Error("Falta plasTeX. Crea .venv-plastex e instala requirements-plastex.txt.");
}

const chapterTitles = [
  "Vectores y matrices",
  "Determinantes e inversas",
  "Sistemas lineales y diagonalización",
  "Espacios vectoriales",
  "Transformaciones lineales",
  "Cambio de base",
];

const macros = {
  "\\R": "\\mathbb{R}", "\\C": "\\mathbb{C}", "\\N": "\\mathbb{N}",
  "\\Z": "\\mathbb{Z}", "\\Q": "\\mathbb{Q}", "\\V": "\\mathbb{V}",
  "\\A": "\\mathbb{A}", "\\M": "\\mathcal{M}", "\\cN": "\\mathcal{N}",
  "\\cH": "\\mathcal{H}", "\\F": "\\mathcal{F}", "\\G": "\\mathcal{G}",
  "\\cL": "\\mathcal{L}", "\\cO": "\\mathcal{O}", "\\calP": "\\mathcal{P}",
  "\\p": "\\mathbb{P}", "\\bbH": "\\mathbb{H}", "\\IM": "\\operatorname{Im}",
  "\\im": "\\operatorname{im}", "\\tr": "\\operatorname{Tr}",
  "\\diag": "\\operatorname{diag}", "\\nul": "\\operatorname{nul}",
  "\\ran": "\\operatorname{ran}", "\\id": "\\operatorname{id}",
};

const preamble = String.raw`\documentclass[12pt]{article}
\usepackage{amsmath,amsfonts,amssymb,amsthm,graphicx}
\newcommand{\cN}{\mathcal{N}}
\newcommand{\V}{\mathbb{V}}
\newcommand{\A}{\mathbb{A}}
\newcommand{\M}{\mathcal{M}}
\newcommand{\cH}{\mathcal{H}}
\newcommand{\F}{\mathcal{F}}
\newcommand{\G}{\mathcal{G}}
\newcommand{\cL}{\mathcal{L}}
\newcommand{\cO}{\mathcal{O}}
\newcommand{\calP}{\mathcal{P}}
\newcommand{\p}{\mathbb{P}}
\newcommand{\R}{\mathbb{R}}
\newcommand{\Z}{\mathbb{Z}}
\newcommand{\Q}{\mathbb{Q}}
\newcommand{\C}{\mathbb{C}}
\newcommand{\N}{\mathbb{N}}
\newcommand{\bbH}{\mathbb{H}}
\DeclareMathOperator{\im}{im}
\DeclareMathOperator{\id}{id}
\DeclareMathOperator{\IM}{Im}
\DeclareMathOperator{\tr}{Tr}
\DeclareMathOperator{\diag}{diag}
\DeclareMathOperator{\nul}{nul}
\DeclareMathOperator{\ran}{ran}
\newcommand{\gb}[1]{\operatorname{\textbf{#1}}}
\newcommand{\thmname}{}
\newcommand{\cmspecindice}[1]{}
\newtheorem{thm}{Teorema}[section]
\newtheorem{prop}[thm]{Proposición}
\newtheorem{lemma}[thm]{Lema}
\newtheorem{cor}[thm]{Corolario}
\newtheorem{rec}[thm]{Recuerdo}
\newtheorem{defin}[thm]{Definición}
\newtheorem{ejem}[thm]{Ejemplo}
\newtheorem{sol}[thm]{Solución}
\newtheorem{rmk}[thm]{Observación}
`;

function prepareIndexMarkers(source) {
  const markers = [];
  const prepared = source.replace(/\\cmspecindice\{([^{}]+)\}/g, (_, title) => {
    const token = `CMSPECINDEXMARKER${String(markers.length).padStart(4, "0")}`;
    markers.push({ token, title: title.trim() });
    return token;
  });
  return { markers, source: prepared };
}

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function injectIndexMarkers(html, markers) {
  return markers.reduce((result, marker, index) => {
    const anchor = `<span class="cmspec-index-anchor" id="cmspec-indice-${slugify(marker.title)}-${index + 1}" data-cmspec-index-title="${escapeAttribute(marker.title)}"></span>`;
    return result.replace(marker.token, anchor);
  }, html);
}

function removeEnvironment(source, name) {
  const pattern = new RegExp(`\\\\begin\\{${name}\\}[\\s\\S]*?\\\\end\\{${name}\\}`, "g");
  return source.replace(pattern, "");
}

function prepareSource(source) {
  let prepared = removeEnvironment(source, "ejer");
  prepared = prepared
    .replace(/^\\proof\s*\(Ejercicio\)\s*$/gm, "")
    .replace(/\s*\(ejercicio:[^)]*\)/gi, "")
    .replace(/\\begin\{subsection\}\{([^}]*)\}/g, "\\subsection{$1}")
    .replace(/\\systeme\{([\s\S]*?)\}/g, (_, equations) =>
      `\\left\\{\\begin{aligned}${equations.split(",").map((equation) => equation.trim()).filter(Boolean).join("\\\\")}\\end{aligned}\\right.`)
    .replace(/\\begin\{blockarray\}\{[^}]+\}/g, "\\begin{array}{ccccc|c}")
    .replace(/\\end\{blockarray\}/g, "\\end{array}")
    .replace(/\\begin\{block\}\{[^}]+\}/g, "")
    .replace(/\\end\{block\}/g, "");
  return prepared;
}

function decodeEntities(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&#160;", " ");
}

function renderMath(source, displayMode) {
  return katex.renderToString(decodeEntities(source).trim(), {
    displayMode,
    throwOnError: false,
    strict: false,
    trust: false,
    output: "mathml",
    macros,
  });
}

function renderMathInHtml(html) {
  return html
    .replace(/<div class="displaymath"[^>]*>\s*([\s\S]*?)\s*<\/div>/g, (_, body) => {
      const math = body.trim().replace(/^\\\[/, "").replace(/\\\]$/, "");
      return `<div class="course-math">${renderMath(math, true)}</div>`;
    })
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => `<div class="course-math">${renderMath(math, true)}</div>`)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => renderMath(math, false));
}

function stripTags(value) {
  return decodeEntities(value.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function prefixAnchors(html, prefix) {
  return html
    .replace(/id="([^"]+)"/g, (_, id) => `id="${prefix}-${id}"`)
    .replace(/href="#([^"]+)"/g, (_, id) => `href="#${prefix}-${id}"`);
}

function splitSections(html, chapterTitle) {
  const headingPattern = /<h([12])[^>]*>([\s\S]*?)<\/h\1>/g;
  const matches = [...html.matchAll(headingPattern)];
  const sections = [];
  let cursor = 0;
  let currentTitle = "Introducción";

  for (const match of matches) {
    const body = html.slice(cursor, match.index);
    if (stripTags(body)) sections.push({ title: currentTitle, html: body });
    const heading = stripTags(match[2]).replace(/^\d+(?:\.\d+)*\s+/, "");
    const comparableHeading = heading.toLowerCase().replace(/[.\s]+$/, "");
    const comparableChapter = chapterTitle.toLowerCase().replace(/[.\s]+$/, "");
    currentTitle = comparableHeading === comparableChapter ? "Introducción" : heading;
    cursor = match.index + match[0].length;
  }
  const finalBody = html.slice(cursor);
  if (stripTags(finalBody)) sections.push({ title: currentTitle, html: finalBody });
  return sections.filter((section) => stripTags(section.html));
}

const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "cmspec-plastex-"));
const chapters = [];

try {
  for (let index = 0; index < chapterTitles.length; index += 1) {
    const chapterNumber = index + 1;
    const chapterWork = path.join(workspace, `chapter-${chapterNumber}`);
    const outputDirectory = path.join(chapterWork, "html");
    fs.mkdirSync(chapterWork, { recursive: true });

    const source = fs.readFileSync(path.join(sourceDirectory, `chap${chapterNumber}.tex`), "utf8");
    const indexedSource = prepareIndexMarkers(source);
    fs.writeFileSync(path.join(chapterWork, "chapter.tex"), `${preamble}\n\\begin{document}\n${prepareSource(indexedSource.source)}\n\\end{document}\n`);

    const sourceImage = path.join(sourceDirectory, "Regla_de_Sarrus.png");
    if (fs.existsSync(sourceImage)) fs.copyFileSync(sourceImage, path.join(chapterWork, "Regla_de_Sarrus.png"));

    execFileSync(plastexExecutable, [
      "--no-load-tex-packages", "--disable-images", "--split-level=0",
      "--no-theme-extras", "--no-theme-js", "--no-theme-css",
      "--dir", outputDirectory, "chapter.tex",
    ], { cwd: chapterWork, stdio: "pipe" });

    const rendered = fs.readFileSync(path.join(outputDirectory, "index.html"), "utf8");
    const main = rendered.match(/<div class="main-text">([\s\S]*?)<\/div>\s*<!--main-text -->/)?.[1];
    if (!main) throw new Error(`plasTeX no generó contenido para chap${chapterNumber}.tex`);

    const slug = `unidad-${chapterNumber}`;
    const html = prefixAnchors(injectIndexMarkers(renderMathInHtml(main), indexedSource.markers), slug)
      .replace(/<img([^>]*?)src="Regla_de_Sarrus\.png"([^>]*)>/g, '<img$1src="/courses/algebra-lineal/Regla_de_Sarrus.png"$2>');

    chapters.push({
      number: String(chapterNumber).padStart(2, "0"),
      slug,
      title: chapterTitles[index],
      sections: splitSections(html, chapterTitles[index]),
    });
  }
} finally {
  fs.rmSync(workspace, { recursive: true, force: true });
}

const output = `/* Archivo generado con plasTeX 3.1 desde la carpeta Apuntes. */\n\nexport const linearAlgebraChapters = ${JSON.stringify(chapters, null, 2)} as const;\n`;
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, output);

const errorCount = (output.match(/katex-error/g) ?? []).length;
console.log(`plasTeX generó ${chapters.length} capítulos en ${outputFile}`);
console.log(chapters.map((chapter) => `${chapter.number}: ${chapter.sections.length} secciones`).join("\n"));
console.log(`Errores matemáticos: ${errorCount}`);
if (errorCount) process.exitCode = 2;
