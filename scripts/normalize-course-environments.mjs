import fs from "node:fs";
import path from "node:path";

const courseDirectories = process.argv.slice(2);

if (!courseDirectories.length) {
  throw new Error("Uso: node scripts/normalize-course-environments.mjs DIRECTORIO [DIRECTORIO ...]");
}

const theoremDeclarations = String.raw`\theoremstyle{plain}
\newtheorem{thm}{Teorema}[section]
\newtheorem{prop}[thm]{Proposición}
\newtheorem{lemma}[thm]{Lema}
\newtheorem{cor}[thm]{Corolario}
\theoremstyle{definition}
\newtheorem{rec}[thm]{Recuerdo}
\newtheorem{defin}[thm]{Definición}
\newtheorem{ejem}[thm]{Ejemplo}
\newtheorem{ejer}[thm]{Ejercicio}
\newtheorem{sol}[thm]{Solución}
\newtheorem{rmk}[thm]{Observación}`;

const markerPattern = /^(\s*)(?:\\textit\{)?\\textbf\{((?:Definici(?:ón|on|\\'on)|Teorema|Proposici(?:ón|on|\\'on)|Corolario|Ejemplos?|Ejercicio(?!s)(?:\s+para\s+(?:el|los)\s+alumnos?)?|Soluci(?:ón|on|\\'on)|Respuesta|Observaci(?:ón|on|\\'on)|Nota(?:\s+importante)?)[^{}]*)\}(?:\})?(.*)$/i;
const italicMarkerPattern = /^(\s*)\\textit\{((?:Soluci(?:ón|on|\\'on)|Respuesta|Observaci(?:ón|on|\\'on)|Nota(?:\s+importante)?)[^{}]*):?\}(.*)$/i;

function environmentFor(label) {
  const normalized = label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll("\\'", "")
    .toLowerCase();

  if (normalized.startsWith("definici")) return "defin";
  if (normalized.startsWith("teorema")) return "thm";
  if (normalized.startsWith("proposici")) return "prop";
  if (normalized.startsWith("corolario")) return "cor";
  if (normalized.startsWith("ejemplo")) return "ejem";
  if (normalized.startsWith("ejercicio")) return "ejer";
  if (normalized.startsWith("soluci") || normalized.startsWith("respuesta")) return "sol";
  if (normalized.startsWith("observaci") || normalized.startsWith("nota")) return "rmk";
  return null;
}

function optionalTitle(label, environment) {
  if (environment !== "thm" && environment !== "prop" && environment !== "cor") return "";
  const match = label.match(/\(([^()]*)\)/);
  return match?.[1]?.trim() ? `[${match[1].trim()}]` : "";
}

function normalizeMarkerLine(line) {
  const match = line.match(markerPattern) ?? line.match(italicMarkerPattern);
  if (!match) return line;

  const [, indentation, rawLabel, rawBody] = match;
  const environment = environmentFor(rawLabel);
  if (!environment) return line;

  const body = rawBody.replace(/^\s*:?\s*/, "");
  const title = optionalTitle(rawLabel, environment);
  return `${indentation}\\begin{${environment}}${title}${body}\n${indentation}\\end{${environment}}`;
}

function normalizePreamble(source) {
  if (/\\newtheorem\{defin\}/.test(source)) return source;
  return source.replace(
    /\\theoremstyle\{definition\}\s*\n\\newtheorem\{ejer\}\{Ejercicio\}/,
    theoremDeclarations,
  );
}

for (const directory of courseDirectories) {
  const absoluteDirectory = path.resolve(directory);
  const files = fs.readdirSync(absoluteDirectory).filter((file) => /^Clase_\d+\.tex$/.test(file));

  for (const file of files) {
    const filePath = path.join(absoluteDirectory, file);
    const original = fs.readFileSync(filePath, "utf8");
    const withPreamble = normalizePreamble(original);
    const normalized = withPreamble.split("\n").map(normalizeMarkerLine).join("\n");
    fs.writeFileSync(filePath, normalized);
  }

  console.log(`${files.length} archivos normalizados en ${absoluteDirectory}`);
}
