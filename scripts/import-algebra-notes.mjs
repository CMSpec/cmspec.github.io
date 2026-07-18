import fs from "node:fs";
import path from "node:path";
import katex from "katex";

const sourceDirectory = process.argv[2];
const outputFile = process.argv[3] ?? "content/courses/algebra-lineal-chapters.ts";

if (!sourceDirectory) {
  throw new Error("Uso: node scripts/import-algebra-notes.mjs DIRECTORIO_APUNTES [ARCHIVO_SALIDA]");
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

const calloutLabels = {
  defin: "Definición", thm: "Teorema", prop: "Proposición", lemma: "Lema",
  cor: "Corolario", ejem: "Ejemplo", ejer: "Ejercicio", sol: "Solución",
  rmk: "Observación", rec: "Recuerdo",
};

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function decodeLatexText(value) {
  const accents = {
    "\\'a": "á", "\\'e": "é", "\\'i": "í", "\\'o": "ó", "\\'u": "ú",
    "\\'A": "Á", "\\'E": "É", "\\'I": "Í", "\\'O": "Ó", "\\'U": "Ú",
    '\\"u': "ü", '\\"U': "Ü", "\\~n": "ñ", "\\~N": "Ñ",
  };
  let result = value;
  for (const [latex, character] of Object.entries(accents)) result = result.replaceAll(latex, character);
  return result.replaceAll("?`", "¿").replaceAll("!`", "¡");
}

function stripComments(source) {
  return source.split("\n").map((line) => {
    let escaped = false;
    for (let index = 0; index < line.length; index += 1) {
      if (line[index] === "%" && !escaped) return line.slice(0, index);
      escaped = line[index] === "\\" ? !escaped : false;
    }
    return line;
  }).join("\n");
}

function renderMath(source, displayMode) {
  const cleaned = source
    .replace(/\\begin\{(equation|equation\*|align|align\*)\}/g, "\\begin{$1}")
    .trim();
  try {
    return katex.renderToString(cleaned, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: false,
      output: "mathml",
      macros,
    });
  } catch {
    return `<code class="latex-fallback">${escapeHtml(cleaned)}</code>`;
  }
}

function renderFragment(source) {
  const tokens = [];
  const stash = (html, block = false) => {
    const token = `@@CMSPEC_${block ? "BLOCK" : "INLINE"}_${tokens.length}@@`;
    tokens.push({ token, html, block });
    return block ? `\n${token}\n` : token;
  };

  let text = decodeLatexText(stripComments(source));
  text = text.replace(/\\label\{[^}]*\}/g, "");

  text = text.replace(/\\\[([\s\S]*?)\\\]/g, (_, math) =>
    stash(`<div class="course-math">${renderMath(math, true)}</div>`, true));
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) =>
    stash(`<div class="course-math">${renderMath(math, true)}</div>`, true));
  text = text.replace(/\\begin\{(align\*?|equation\*?)\}([\s\S]*?)\\end\{\1\}/g, (_, environment, math) =>
    stash(`<div class="course-math">${renderMath(`\\begin{${environment}}${math}\\end{${environment}}`, true)}</div>`, true));

  text = text.replace(/(?<!\\)\$([^$\n]+?)(?<!\\)\$/g, (_, math) => stash(renderMath(math, false)));
  text = text.replace(/\\\((.*?)\\\)/g, (_, math) => stash(renderMath(math, false)));

  for (const [environment, label] of Object.entries(calloutLabels)) {
    const pattern = new RegExp(`\\\\begin\\{${environment}\\}([\\s\\S]*?)\\\\end\\{${environment}\\}`, "g");
    text = text.replace(pattern, (_, body) => stash(
      `<aside class="course-callout callout-${environment}"><strong>${label}</strong>${renderFragment(body)}</aside>`,
      true,
    ));
  }

  for (const [environment, tag] of [["enumerate", "ol"], ["itemize", "ul"]]) {
    const pattern = new RegExp(`\\\\begin\\{${environment}\\}(?:\\[[^\\]]*\\])?([\\s\\S]*?)\\\\end\\{${environment}\\}`, "g");
    for (let pass = 0; pass < 5; pass += 1) {
      const previous = text;
      text = text.replace(pattern, (_, body) => {
        const items = body.split(/\\item\s*/).filter((item) => item.trim());
        return stash(`<${tag}>${items.map((item) => `<li>${renderFragment(item)}</li>`).join("")}</${tag}>`, true);
      });
      if (text === previous) break;
    }
  }

  text = text.replace(/\\begin\{center\}([\s\S]*?)\\end\{center\}/g, (_, body) =>
    stash(`<div class="course-centered">${renderFragment(body)}</div>`, true));
  text = text.replace(/\\begin\{figure\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{figure\}/g, (_, body) =>
    stash(`<div class="course-figure">${renderFragment(body)}</div>`, true));
  text = text.replace(/\\includegraphics(?:\[[^\]]*\])?\{([^}]+)\}/g, (_, file) =>
    stash(`<span class="course-image-note">Figura del apunte: ${escapeHtml(file)}</span>`));

  const inlineCommands = [
    ["textbf", "strong"], ["emph", "em"], ["textit", "em"], ["underline", "u"],
  ];
  for (const [command, tag] of inlineCommands) {
    const pattern = new RegExp(`\\\\${command}\\{([^{}]*)\\}`, "g");
    for (let pass = 0; pass < 4; pass += 1) {
      text = text.replace(pattern, (_, body) => stash(`<${tag}>${renderInline(body, tokens)}</${tag}>`));
    }
  }
  text = text.replace(/\\footnote\{([^{}]*)\}/g, (_, body) => stash(`<small class="course-footnote">${escapeHtml(body)}</small>`));
  text = text.replace(/\\href\{([^}]+)\}\{([^}]+)\}/g, (_, url, label) =>
    stash(`<a href="${escapeHtml(url)}" rel="noreferrer">${escapeHtml(label)}</a>`));
  text = text.replace(/\\url\{([^}]+)\}/g, (_, url) => stash(`<a href="${escapeHtml(url)}" rel="noreferrer">${escapeHtml(url)}</a>`));
  text = text.replace(/\\caption\{([^}]+)\}/g, (_, caption) => stash(`<span class="course-caption">${escapeHtml(caption)}</span>`));
  text = text.replace(/\\proof\b/g, () => stash("<strong class=\"course-proof\">Demostración.</strong>"));
  text = text.replace(/\\qed\b/g, () => stash("<span class=\"course-qed\">□</span>"));

  text = text
    .replace(/\\(medskip|bigskip|smallskip|newpage|noindent)\b/g, "\n\n")
    .replace(/\\(hfill|vspace|hspace)\*?(?:\[[^\]]*\])?\{[^}]*\}/g, " ")
    .replace(/\\ref\{([^}]+)\}/g, "$1")
    .replace(/\\[a-zA-Z]+\*?(?:\[[^\]]*\])?/g, "")
    .replace(/\\([%&#_{}])/g, "$1")
    .replace(/\\\\/g, "\n")
    .replace(/[{}]/g, "");

  const tokenPattern = /@@CMSPEC_(?:BLOCK|INLINE)_\d+@@/g;
  const blockTokenPattern = /(@@CMSPEC_BLOCK_\d+@@)/g;
  const paragraphs = text.split(/\n\s*\n+/).map((part) => part.trim()).filter(Boolean).map((part) =>
    part.split(blockTokenPattern).filter(Boolean).map((piece) => {
      if (/^@@CMSPEC_BLOCK_\d+@@$/.test(piece.trim())) return piece.trim();
      const exact = tokens.find((token) => token.block && token.token === piece.trim());
      if (exact) return exact.token;
      return `<p>${escapeHtml(piece).replaceAll("\n", " ").trim()}</p>`;
    }).join("")
  ).join("");

  return restoreTokens(paragraphs, tokens, tokenPattern);
}

function renderInline(value, tokens) {
  let escaped = escapeHtml(value);
  for (const token of tokens) escaped = escaped.replaceAll(token.token, token.html);
  return escaped;
}

function restoreTokens(value, tokens, pattern) {
  let output = value;
  for (let pass = 0; pass < 8 && output.includes("@@CMSPEC_"); pass += 1) {
    pattern.lastIndex = 0;
    for (const token of tokens) output = output.replaceAll(token.token, token.html);
  }
  return output;
}

function plainHeading(value) {
  return decodeLatexText(value)
    .replace(/\$([^$]+)\$/g, "$1")
    .replace(/\\[a-zA-Z]+\*?/g, "")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function splitChapter(source) {
  const cleaned = stripComments(source).replace(/\\section(?:\[[^\]]*\])?\{[^}]*\}/, "");
  const headingPattern = /\\subsection\*?(?:\[[^\]]*\])?\{([^}]*)\}/g;
  const sections = [];
  let cursor = 0;
  let currentTitle = "Introducción";
  for (const match of cleaned.matchAll(headingPattern)) {
    const body = cleaned.slice(cursor, match.index);
    if (body.trim()) sections.push({ title: currentTitle, html: renderFragment(body) });
    currentTitle = plainHeading(match[1]);
    cursor = match.index + match[0].length;
  }
  const finalBody = cleaned.slice(cursor);
  if (finalBody.trim()) sections.push({ title: currentTitle, html: renderFragment(finalBody) });
  return sections.filter((section) => section.html.replace(/<[^>]+>/g, "").trim());
}

const chapters = chapterTitles.map((title, index) => {
  const file = path.join(sourceDirectory, `chap${index + 1}.tex`);
  const source = fs.readFileSync(file, "utf8");
  return {
    number: String(index + 1).padStart(2, "0"),
    slug: `unidad-${index + 1}`,
    title,
    sections: splitChapter(source),
  };
});

const output = `/* Archivo generado desde los capítulos LaTeX de la carpeta Apuntes. */\n\nexport const linearAlgebraChapters = ${JSON.stringify(chapters, null, 2)} as const;\n`;
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, output);
console.log(`Generados ${chapters.length} capítulos en ${outputFile}`);
console.log(chapters.map((chapter) => `${chapter.number}: ${chapter.sections.length} secciones`).join("\n"));
