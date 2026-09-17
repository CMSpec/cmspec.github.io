import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import katex from "katex";
import { introductoryChapters } from "../content/courses/introductory-mathematics.ts";
import { introductoryAlgebraExtension } from "../content/courses/introductory-algebra-extension.ts";
import { handwrittenNotes, handwrittenNoteCount } from "../content/courses/introductory-handwritten-notes.ts";

const chapters = [...introductoryChapters, ...introductoryAlgebraExtension];

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
  for (const phrase of ["NO lleva i", "forman un cuerpo", "1–4.", "5–8.", "9. Positividad", "10. Módulo", "11–13.", "14. Las componentes", "15. Desigualdad", "paso inductivo", "raíces cúbicas de i", "Precisión sobre arctan"]) assert.ok(all.includes(phrase), phrase);
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
  for (const text of texts) {
    assert.equal((text.match(/\$/g) ?? []).length % 2, 0, text);
    for (const match of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(match[1], { throwOnError: true });
  }
  for (const block of chapters.flatMap(c => c.sections.flatMap(s => s.blocks))) {
    if (block.tex) katex.renderToString(block.tex, { throwOnError: true });
  }
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
