import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import katex from "katex";

const sourceDirectory = path.resolve(process.argv[2] ?? "");
const outputFile = path.resolve(process.argv[3] ?? "content/courses/differential-equations-chapters.ts");
const plastexExecutable = path.join(process.cwd(), ".venv-plastex", "bin", "plastex");

if (!process.argv[2] || !fs.existsSync(sourceDirectory)) {
  throw new Error("Uso: node scripts/import-edo-plastex.mjs DIRECTORIO_CLASES [ARCHIVO_SALIDA]");
}
if (!fs.existsSync(plastexExecutable)) {
  throw new Error("Falta plasTeX. Crea .venv-plastex e instala requirements-plastex.txt.");
}

const classTitles = [
  "Fundamentos y variables separables",
  "Ecuaciones exactas y lineales",
  "Factor integrante y ecuaciones homogéneas",
  "Sustituciones y ecuaciones de Bernoulli",
  "Ecuaciones de orden superior",
  "Ecuaciones homogéneas con coeficientes constantes",
  "Coeficientes indeterminados y variación de parámetros",
  "Cauchy–Euler y transformada de Laplace",
  "Resolución con Laplace y función de Heaviside",
  "Traslación y sistemas diferenciales",
  "Series de Fourier y problemas de frontera",
];

const macros = {
  "\\R": "\\mathbb{R}", "\\C": "\\mathbb{C}", "\\N": "\\mathbb{N}",
  "\\Z": "\\mathbb{Z}", "\\Q": "\\mathbb{Q}", "\\F": "\\mathbb{F}",
  "\\calM": "\\mathcal{M}", "\\calP": "\\mathcal{P}", "\\bbH": "\\mathbb{H}",
};

const preamble = String.raw`\documentclass[12pt]{article}
\usepackage{amsmath,amsfonts,amssymb,amsthm,graphicx,xcolor}
\newcommand{\N}{\mathbb{N}}
\newcommand{\calM}{\mathcal{M}}
\newcommand{\calP}{\mathcal{P}}
\newcommand{\F}{\mathbb{F}}
\newcommand{\R}{\mathbb{R}}
\newcommand{\Z}{\mathbb{Z}}
\newcommand{\Q}{\mathbb{Q}}
\newcommand{\C}{\mathbb{C}}
\newcommand{\bbH}{\mathbb{H}}
\newtheorem{thm}{Teorema}[section]
\newtheorem{prop}[thm]{Proposición}
\newtheorem{lemma}[thm]{Lema}
\newtheorem{cor}[thm]{Corolario}
\newtheorem{rec}[thm]{Recuerdo}
\newtheorem{defin}[thm]{Definición}
\newtheorem{ejem}[thm]{Ejemplo}
\newtheorem{ejer}[thm]{Ejercicio}
\newtheorem{sol}[thm]{Solución}
\newtheorem{rmk}[thm]{Observación}
`;

function prepareSource(source) {
  const firstSection = source.search(/\\section\s*\{/);
  let prepared = firstSection >= 0 ? source.slice(firstSection) : source;
  prepared = prepared.replace(/\\end\{document\}[\s\S]*$/, "");
  prepared = prepared
    .replace(/\\mathbbm/g, "\\mathbb")
    .replace(/\\displaystyle\s*\\displaystyle/g, "\\displaystyle")
    .replace(/\\textcolor\{[^}]+\}\{([^}]*)\}/g, "$1")
    .replace(/\\phantom\{[^}]*\}/g, "")
    .replace(/\\vspace\*?\{[^}]*\}/g, "")
    .replace(/\\newpage/g, "");
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

function splitSections(html) {
  const headingPattern = /<h([12])[^>]*>([\s\S]*?)<\/h\1>/g;
  const matches = [...html.matchAll(headingPattern)];
  const sections = [];
  let cursor = 0;
  let currentTitle = "Introducción";

  for (const match of matches) {
    const body = html.slice(cursor, match.index);
    if (stripTags(body)) sections.push({ title: currentTitle, html: body });
    currentTitle = stripTags(match[2]).replace(/^\d+(?:\.\d+)*\s+/, "");
    cursor = match.index + match[0].length;
  }
  const finalBody = html.slice(cursor);
  if (stripTags(finalBody)) sections.push({ title: currentTitle, html: finalBody });
  return sections.filter((section) => stripTags(section.html));
}

const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "cmspec-edo-plastex-"));
const chapters = [];

try {
  for (let index = 0; index < classTitles.length; index += 1) {
    const classNumber = index + 1;
    const classWork = path.join(workspace, `class-${classNumber}`);
    const outputDirectory = path.join(classWork, "html");
    fs.mkdirSync(classWork, { recursive: true });

    const source = fs.readFileSync(path.join(sourceDirectory, `Clase_${classNumber}.tex`), "utf8");
    fs.writeFileSync(path.join(classWork, "class.tex"), `${preamble}\n\\begin{document}\n${prepareSource(source)}\n\\end{document}\n`);

    execFileSync(plastexExecutable, [
      "--no-load-tex-packages", "--disable-images", "--split-level=0",
      "--no-theme-extras", "--no-theme-js", "--no-theme-css",
      "--dir", outputDirectory, "class.tex",
    ], { cwd: classWork, stdio: "pipe" });

    const rendered = fs.readFileSync(path.join(outputDirectory, "index.html"), "utf8");
    const main = rendered.match(/<div class="main-text">([\s\S]*?)<\/div>\s*<!--main-text -->/)?.[1];
    if (!main) throw new Error(`plasTeX no generó contenido para Clase_${classNumber}.tex`);

    const slug = `clase-${classNumber}`;
    chapters.push({
      number: String(classNumber).padStart(2, "0"),
      slug,
      title: classTitles[index],
      sections: splitSections(prefixAnchors(renderMathInHtml(main), slug)),
    });
  }
} finally {
  fs.rmSync(workspace, { recursive: true, force: true });
}

const output = `/* Archivo generado con plasTeX 3.1 desde las clases de EDO. */\n\nexport const differentialEquationsChapters = ${JSON.stringify(chapters, null, 2)} as const;\n`;
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, output);

const errorCount = (output.match(/katex-error/g) ?? []).length;
console.log(`plasTeX generó ${chapters.length} clases en ${outputFile}`);
console.log(chapters.map((chapter) => `${chapter.number}: ${chapter.sections.length} secciones`).join("\n"));
console.log(`Errores matemáticos: ${errorCount}`);
if (errorCount) process.exitCode = 2;
