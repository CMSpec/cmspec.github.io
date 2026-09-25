import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { exercises, getExercise } from "../content/exercises.ts";
import { additionalCourseExercises } from "../content/additional-course-exercises.ts";

test("Ejercitación incluye los cinco cursos sin alterar los seis ejercicios originales", () => {
  assert.deepEqual([...new Set(exercises.map(e => e.courseSlug))].sort(), ["algebra-lineal", "calculo-diferencial", "calculo-vectorial", "ecuaciones-diferenciales", "introduccion-matematicas"]);
  assert.equal(exercises.length, 14);
  assert.equal(new Set(exercises.map(e => e.slug)).size, exercises.length);
  assert.equal(new Set(exercises.map(e => e.number)).size, exercises.length);
  assert.equal(exercises[0].slug, "plano-que-contiene-una-recta");
  assert.equal(exercises.filter(e => e.courseSlug === "calculo-vectorial").length, 6);
  for (const e of exercises) {
    assert.equal(e.hints.length, 3);
    assert.ok(e.statement.length && e.solution.length && e.finalAnswer && e.commonMistake);
    assert.equal(getExercise(e.slug), e);
    const html = readFileSync(`out/ejercicios/${e.slug}/index.html`, "utf8");
    assert.ok(html.includes(e.title), e.slug);
  }
});

test("los nuevos enlaces de teoría apuntan a minicapítulos existentes", () => {
  const library = readFileSync("out/ejercicios/index.html", "utf8");
  for (const e of additionalCourseExercises) {
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
