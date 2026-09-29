import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import katex from "katex";
import { exercises, getExercise } from "../content/exercises.ts";
import { additionalCourseExercises } from "../content/additional-course-exercises.ts";
import { overleafExercises } from "../content/overleaf-exercises.ts";
import { separateExercises } from "../content/split-exercises.ts";

test("todos los ejercicios tienen LaTeX válido en enunciados, pistas y soluciones", () => {
  for (const slug of ["lineal-inversa-dos-por-dos", "lineal-sistema-por-eliminacion", "diferencial-continuidad-por-tramos"]) {
    assert.ok(getExercise(slug).statement.some(text => text.includes("$$")), `Falta fórmula en bloque: ${slug}`);
  }
  for (const exercise of exercises) {
    if (!exercise.slug.startsWith("practica-")) assert.ok(exercise.finalAnswer.includes("$"), exercise.slug);
    const texts = [...exercise.statement, ...exercise.hints, ...exercise.solution.map(step => step.body), exercise.finalAnswer, exercise.commonMistake];
    for (const text of texts) {
      const plain = text.replace(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g, part => {
        const display = part.startsWith("$$");
        assert.doesNotThrow(() => katex.renderToString(part.slice(display ? 2 : 1, display ? -2 : -1), { displayMode: display, throwOnError: true, strict: "error", trust: false }), `${exercise.slug}: ${part}`);
        return "";
      });
      assert.ok(!plain.includes("$"), `Delimitador sin cerrar: ${exercise.slug}`);
      assert.ok(!/[²³⁻√κρ∇φμ]/u.test(plain), `Fórmula fuera de LaTeX: ${plain}`);
    }
    const html = readFileSync(`out/ejercicios/${exercise.slug}/index.html`, "utf8");
    if (exercise.statement.some(text=>text.includes("$"))) assert.ok(html.includes('<math'), `Fórmula no renderizada: ${exercise.slug}`);
    assert.ok(!html.includes('katex-error'), exercise.slug);
  }
});

test("Ejercitación incluye los cinco cursos sin alterar los seis ejercicios originales", () => {
  assert.deepEqual([...new Set(exercises.map(e => e.courseSlug))].sort(), ["algebra-lineal", "calculo-diferencial", "calculo-vectorial", "ecuaciones-diferenciales", "introduccion-matematicas"]);
  assert.equal(exercises.length, 14 + separateExercises(overleafExercises).length);
  assert.equal(new Set(exercises.map(e => e.slug)).size, exercises.length);
  assert.equal(new Set(exercises.map(e => e.number)).size, exercises.length);
  assert.equal(exercises[0].slug, "plano-que-contiene-una-recta");
  assert.equal(exercises.slice(0,14).filter(e => e.courseSlug === "calculo-vectorial").length, 6);
  for (const e of exercises) {
    if (!e.slug.startsWith("practica-")) {
      assert.equal(e.hints.length, 3);
      assert.ok(e.statement.length && e.solution.length && e.finalAnswer && e.commonMistake);
    }
    assert.equal(getExercise(e.slug), e);
    const html = readFileSync(`out/ejercicios/${e.slug}/index.html`, "utf8");
    assert.ok(html.includes(e.title), e.slug);
  }
});

test("los nuevos enlaces de teoría apuntan a minicapítulos existentes", () => {
  const library = readFileSync("out/ejercicios/index.html", "utf8");
  for (const e of [...additionalCourseExercises,...overleafExercises]) {
    assert.ok(library.includes(e.course));
    for (const link of e.relatedTheory) {
      const [path, anchor] = link.href.split("#");
      assert.ok(readFileSync(`out${path}/index.html`, "utf8").includes(`id="${anchor}"`), link.href);
    }
  }
});

test("comprobaciones numéricas de las soluciones añadidas", () => {
  for (const x of [-1, 9]) assert.equal(Math.abs(3*x-2), Math.abs(2*x+7));
  for (const x of [-3, 0, 2, 5]) assert.ok(Math.abs((4*x+6)/(x*x+2*x+1) - (4/(x+1)+2/(x+1)**2)) < 1e-10);
  assert.deepEqual([[1,2],[3,5]].map(row => [row[0]*-5+row[1]*3, row[0]*2-row[1]]), [[1,0],[0,1]]);
  const a=-3,b=-6;
  assert.equal(-6-a, -3*a+2*b); assert.equal(3*a+2*b, b-15);
  for(const x of [-1, 0, 1]) {
    const y=3*Math.exp(x*x), dy=6*x*Math.exp(x*x);
    assert.ok(Math.abs(dy-2*x*y)<1e-10);
    const z=(Math.exp(x)-Math.exp(-2*x))/3, dz=(Math.exp(x)+2*Math.exp(-2*x))/3;
    assert.ok(Math.abs(dz+2*z-Math.exp(x))<1e-10);
  }
});
