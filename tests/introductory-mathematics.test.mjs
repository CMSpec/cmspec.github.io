import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import katex from "katex";
import { introductoryChapters } from "../content/courses/introductory-mathematics.ts";
import { introductoryAlgebraExtension } from "../content/courses/introductory-algebra-extension.ts";
import { handwrittenNotes, handwrittenNoteCount } from "../content/courses/introductory-handwritten-notes.ts";
import { sourceDevelopments } from "../content/courses/introductory-source-developments.ts";
import { introductoryOpenings } from "../content/courses/introductory-openings.ts";

const chapters = [...introductoryChapters, ...introductoryAlgebraExtension];

test("sucesiones y sumatorias conservan la secuencia conceptual del documento", () => {
  const unit = chapters.find(c => c.slug === "induccion-sumatorias");
  assert.deepEqual(unit.sections[1].blocks.map(b => b.title), [
    "Una sucesión real es una función", "La sucesión y su término general",
    "Calcular los primeros tres términos", "Definir una sucesión por recurrencia",
  ]);
  assert.match(unit.sections[1].blocks[0].tex, /a\(n\)=a_n/);
  assert.match(unit.sections[1].blocks[1].text, /sucesión completa/);
  assert.match(unit.sections[2].blocks[0].text, /número finito de términos de una sucesión/);
  const html = readFileSync(new URL("../out/cursos/introduccion-matematicas/index.html", import.meta.url), "utf8");
  const start = html.indexOf('id="intro-induccion-sumatorias-2"');
  const end = html.indexOf('class="intro-practice"', start);
  const section = html.slice(start, end);
  let previous = -1;
  for (const title of [...unit.sections[1].blocks.map(b => b.title), "De una cadena de igualdades a una fórmula explícita"]) {
    const at = section.indexOf(title);
    assert.ok(at > previous, title);
    previous = at;
  }
  assert.equal(section.split("Una sucesión real es una función").length - 1, 1);
  const properties = sourceDevelopments["induccion-sumatorias-3"][0].steps.join(" ");
  for (const phrase of ["sucesiones reales", "cinco términos", "primer término sigue siendo", "simultáneamente"]) assert.ok(properties.includes(phrase), phrase);
});

test("las introducciones recuperadas preceden la teoría y sustituyen sus resúmenes", () => {
  const html = readFileSync(new URL("../out/cursos/introduccion-matematicas/index.html", import.meta.url), "utf8");
  assert.equal(Object.keys(introductoryOpenings).length, 11);
  for (const [key, opening] of Object.entries(introductoryOpenings)) {
    const start = html.indexOf(`id="intro-${key}"`);
    assert.ok(start >= 0, key);
    const end = html.indexOf('class="intro-practice"', start);
    const section = html.slice(start, end);
    assert.ok(section.indexOf('class="intro-source-opening"') < section.indexOf('class="latex-content"'), key);
    assert.ok(opening.paragraphs.length >= 3);
    for (const title of opening.replaces) assert.ok(!section.includes(` · ${title}`), title);
  }
  for (const phrase of ["El hielo flota en el agua", "función proposicional", "Estudiaremos geometría usando el álgebra", "final menos inicial", "preimagen"]) assert.ok(html.includes(phrase), phrase);
  assert.doesNotMatch(html, /<details class="intro-handwritten-note/);
  assert.doesNotMatch(html, /Ver desarrollo|Ábrelos para seguir/);
  assert.equal((html.match(/<section class="intro-handwritten-note/g) ?? []).length, 95);
  assert.ok(html.includes("Ver pista") && html.includes("Ver solución"));
});

test("la práctica de división sintética es distinta de la animación y verifica el resto", () => {
  const section = chapters.find(c => c.slug === "polinomios").sections[1];
  assert.match(section.exercise, /3x\^3-5x\+4/);
  assert.match(section.hint, /3,0,-5,4/);
  assert.match(section.solution, /p\(-2\)=-10/);
  for (const x of [-3, -2, 0, 1, 4]) assert.equal(3*x**3-5*x+4, (x+2)*(3*x*x-6*x+7)-10);
  assert.equal(2*2**3-3*2**2+4*2-5, 7);
  const html = readFileSync(new URL("../out/cursos/introduccion-matematicas/index.html", import.meta.url), "utf8");
  assert.ok(html.indexOf('class="synthetic-observations"') > html.indexOf('class="intro-explorer synthetic-explorer"'));
  assert.match(html, /Esta coincidencia es un hecho general que explicaremos en el siguiente tema/);
  const observations = html.slice(html.indexOf('class="synthetic-observations"'), html.indexOf('</aside>', html.indexOf('class="synthetic-observations"')));
  assert.doesNotMatch(observations, /teorema del resto/i);
});

test("complejos conserva el inicio y los desarrollos de las clases", () => {
  const complex = chapters.find(c => c.slug === "complejos");
  assert.equal(complex.sections.length, 11);
  assert.match(complex.sections[0].title, /Ecuaciones/);
  const opening = JSON.stringify(complex.sections[0].blocks);
  assert.ok(opening.indexOf("ax+b=0") < opening.indexOf("x^2=2"));
  assert.ok(opening.indexOf("x^2=2") < opening.indexOf("ax^2+bx+c=0"));
  const all = JSON.stringify(complex);
  for (const phrase of ["NO lleva i", "forman un cuerpo", "1–4.", "5–8.", "9. Positividad", "10. Módulo", "11–13.", "14. Las componentes", "15. Desigualdad", "Demostración por inducción", "raíces cúbicas de i", "Precisión sobre arctan"]) assert.ok(all.includes(phrase), phrase);
  assert.equal(complex.sections.filter(s => s.visual).length, 3);
  for (let k = 0; k < 3; k++) {
    const angle = (Math.PI / 2 + 2 * k * Math.PI) / 3;
    assert.ok(Math.abs(Math.cos(3 * angle)) < 1e-12);
    assert.ok(Math.abs(Math.sin(3 * angle) - 1) < 1e-12);
  }
  assert.ok(Math.abs(64 * Math.cos(5 * Math.PI / 4) + 32 * Math.sqrt(2)) < 1e-12);
});

test("el curso tiene 12 unidades, 64 prácticas completas y anclas únicas", () => {
  assert.equal(chapters.length, 12);
  assert.equal(chapters.flatMap(c => c.sections).length, 64);
  assert.equal(new Set(chapters.map(c => c.slug)).size, chapters.length);
  for (const chapter of chapters) {
    for (const section of chapter.sections) {
      for (const key of ["title", "exercise", "hint", "solution"]) assert.ok(section[key]?.trim());
      assert.ok(section.blocks.length >= 2);
    }
  }
  for (const section of introductoryAlgebraExtension.flatMap(c => c.sections)) assert.ok(section.blocks.length >= 3);
});

test("todas las fórmulas se pueden renderizar y los delimitadores están balanceados", () => {
  const texts = chapters.flatMap(c => c.sections.flatMap(s => [s.exercise, s.hint, s.solution, ...s.blocks.map(b => b.text)]));
  texts.push(...Object.values(handwrittenNotes).flatMap(notes => notes.flatMap(n => n.steps)));
  texts.push(...Object.values(sourceDevelopments).flatMap(notes => notes.flatMap(n => n.steps)));
  texts.push(...Object.values(introductoryOpenings).flatMap(opening => opening.paragraphs));
  for (const text of texts) {
    assert.equal((text.match(/\$/g) ?? []).length % 2, 0, text);
    for (const match of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(match[1], { throwOnError: true });
  }
  for (const block of chapters.flatMap(c => c.sections.flatMap(s => s.blocks))) {
    if (block.tex) katex.renderToString(block.tex, { throwOnError: true });
  }
});

test("los desarrollos ampliados conservan su referencia editorial sin publicar documentos", () => {
  const anchors = new Set(chapters.flatMap(c => c.sections.map((_, i) => `${c.slug}-${i + 1}`)));
  const html = readFileSync(new URL("../out/cursos/introduccion-matematicas/index.html", import.meta.url), "utf8");
  const all = Object.values(sourceDevelopments).flat();
  assert.ok(all.length >= 40);
  for (const [key, developments] of Object.entries(sourceDevelopments)) {
    assert.ok(anchors.has(key), key);
    assert.equal(new Set(developments.map(d => d.title)).size, developments.length);
    for (const d of developments) {
      assert.ok(d.source.endsWith(".pdf"));
      assert.ok(d.pages[0] >= 1 && d.pages[1] >= d.pages[0]);
      assert.ok(d.steps.length >= 4, d.title);
      assert.ok(html.includes(d.title), d.title);
      assert.ok(!html.includes(d.source), d.source);
    }
  }
  assert.equal((html.match(/class="intro-handwritten-note intro-source-development"/g) ?? []).length, all.length);
  for (let i = 1; i <= 6; i++) assert.ok(sourceDevelopments[`induccion-sumatorias-${i}`]);
  assert.match(sourceDevelopments["induccion-sumatorias-1"][0].title, /3ⁿ−1/);
  assert.ok(sourceDevelopments["induccion-sumatorias-2"][0].steps.length >= 10);
  assert.ok(sourceDevelopments["trigonometria-3"].some(d => d.title.includes("Prostaféresis")));
});

test("comprobaciones de los desarrollos recuperados", () => {
  for (let n = 1; n <= 12; n++) {
    assert.equal((3 ** n - 1) % 2, 0);
    const N = BigInt(n);
    assert.equal((11n ** N - 8n ** N) % 3n, 0n);
    assert.ok(3 ** n > n * n);
    const a = (3 ** (n + 1) - 3) / (3 ** (n + 1) - 1);
    const next = (3 ** (n + 2) - 3) / (3 ** (n + 2) - 1);
    assert.ok(Math.abs(3 / (4 - a) - next) < 1e-12);
  }
  assert.equal(1470 * 465, 683550);
  assert.equal(3 * 42 * 43 * 85 / 6, 76755);
  assert.equal(180 - 396 + 30 * (1036 / 5), 6000);
  for (const x of [-5, -4, -2, 0, 2, 4, 7]) {
    assert.equal(Math.abs(Math.abs(x + 1) - 2) === 1, [-4, -2, 0, 2].includes(x));
    assert.equal(4*x**4-4*x**3-5*x*x+x+1, 4*(x-.5)*(x+.5)*(x*x-x-1));
    assert.equal(2*x**3-13*x*x+26*x-10, (x*x-6*x+10)*(2*x-1));
    assert.equal(10*x*x-8*x-9, 3*(x-2)*(2*x-1)+(x+3)*(2*x-1)+2*(x+3)*(x-2));
    assert.equal(x**4-10*x*x+3*x+1, (x*x-6)*(x*x-4)+3*x-23);
  }
  for (const angle of [0, .2, 1, 2, 3, 4]) {
    const x = -41/5 + 4*Math.cos(angle), y = 12/5*Math.sin(angle);
    assert.ok(Math.abs(Math.hypot(x+5,y)/(Math.abs(5*x+16)/5)-4/5) < 1e-12);
  }
  assert.equal(126*3/32, 189/16);
  assert.equal(-126/48, -21/8);
  assert.equal(84/216, 7/18);
});

test("se conservan las explicaciones previas y corresponden a secciones existentes", () => {
  const anchors = new Set(chapters.flatMap(c => c.sections.map((_, i) => `${c.slug}-${i + 1}`)));
  assert.equal(handwrittenNoteCount, 46);
  for (const key of Object.keys(handwrittenNotes)) assert.ok(anchors.has(key), key);
});

test("la página publicada no ofrece referencias ni enlaces a PDF", () => {
  const html = readFileSync(new URL("../out/cursos/introduccion-matematicas/index.html", import.meta.url), "utf8");
  assert.doesNotMatch(html, /\.pdf(?:["#?]|&quot;)|\bPDF\b|Consultar el manuscrito|Ver manuscrito|Apuntes ampliados/);
  assert.equal((html.match(/class="intro-handwritten-note"/g) ?? []).length, 46);
  assert.equal((html.match(/class="intro-practice"/g) ?? []).length, 64);
  for (const chapter of chapters) {
    for (let i = 1; i <= chapter.sections.length; i++) assert.ok(html.includes(`id="intro-${chapter.slug}-${i}"`));
  }
});

test("cálculos numéricos de los ejemplos nuevos", () => {
  assert.equal(Array.from({ length: 19 }, (_, k) => 3 * (k + 7) - 2).reduce((a, b) => a + b), 874);
  assert.equal(Array.from({ length: 43 }, (_, k) => 7 * (k + 15)).reduce((a, b) => a + b), 10836);
  assert.equal(Array.from({ length: 8 }, (_, k) => 6 * 2 ** k).reduce((a, b) => a + b), 1530);
  for (const x of [-5, -3, 0, 1, 3, 5]) {
    assert.equal((x*x+2*x-1)*(x*x-3*x+11)-37*x+14, x**4-x**3+4*x*x-12*x+3);
    assert.equal((2*x+1)*(x*x-x-1), 2*x**3-x*x-3*x-1);
    assert.equal((x-2)*(x*x+2*x-1), x**3-5*x+2);
  }
});
