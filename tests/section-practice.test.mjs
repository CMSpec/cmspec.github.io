import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import katex from "katex";
import { sectionPractice } from "../content/courses/section-practice.ts";
import { linearAlgebraChapters } from "../content/courses/algebra-lineal-chapters.ts";
import { vectorCalculusChapters } from "../content/courses/vector-calculus-chapters.ts";
import { differentialEquationsChapters } from "../content/courses/differential-equations-chapters.ts";
import { differentialCalculusChapters } from "../content/courses/differential-calculus.ts";

const courses = { "algebra-lineal": linearAlgebraChapters, "calculo-vectorial": vectorCalculusChapters, "ecuaciones-diferenciales": differentialEquationsChapters, "calculo-diferencial": differentialCalculusChapters };
for (const [course, chapters] of Object.entries(courses)) {
  test(`${course}: cada subsección tiene ejercicio, pista y solución válidos`, () => {
    assert.deepEqual(Object.keys(sectionPractice[course]), chapters.map(c => c.slug));
    const questions = new Set();
    for (const chapter of chapters) {
      const practices = sectionPractice[course][chapter.slug];
      assert.equal(practices.length, chapter.sections.length, chapter.slug);
      for (const exercise of practices) {
        assert.ok(!questions.has(exercise.question), exercise.question);
        questions.add(exercise.question);
        assert.ok(exercise.solution.includes("$"), exercise.question);
        for (const text of Object.values(exercise)) {
          assert.ok(text.trim().length > 0);
          const plain = text.replace(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g, part => {
            const display = part.startsWith("$$");
            katex.renderToString(part.slice(display ? 2 : 1, display ? -2 : -1), { displayMode: display, throwOnError: true, strict: "error", trust: false });
            return "";
          });
          assert.ok(!plain.includes("$"), text);
        }
      }
    }
    const html = readFileSync(`out/cursos/${course}/index.html`, "utf8");
    assert.equal((html.match(/class="section-practice"/g) ?? []).length, questions.size);
    assert.equal((html.match(/<details><summary>Ver pista<\/summary>/g) ?? []).length, questions.size);
    assert.equal((html.match(/<details><summary>Ver solución<\/summary>/g) ?? []).length, questions.size);
    assert.ok(!html.includes("katex-error"));
  });
}

test("137 nuevas prácticas completan las 64 prácticas existentes de introducción", () => {
  assert.equal(Object.values(sectionPractice).flatMap(course => Object.values(course).flat()).length, 137);
  const intro = readFileSync("out/cursos/introduccion-matematicas/index.html", "utf8");
  assert.equal((intro.match(/class="intro-practice"/g) ?? []).length, 64);
});

test("comprobación de cálculos de cierre representativos", () => {
  const dot = (u,v) => u.reduce((sum,x,i) => sum + x*v[i], 0);
  assert.equal(dot([1,2],[2,-1]), 0);
  assert.equal(Math.hypot(2,-1,2), 3);
  assert.equal(dot([1,-1,2],[1,2,3]), 5);
  assert.equal(2*2+1, 5); assert.equal(2-1, 1);
  assert.equal(3*3+4*4, 25);
  assert.equal(25-(5-5)**2, 25);
  for (const x of [-1,0,1]) {
    const y = 2*Math.exp(3*x);
    assert.equal(6*Math.exp(3*x), 3*y);
    const z = Math.exp(x)-x-1;
    assert.ok(Math.abs((Math.exp(x)-1)-(x+z)) < 1e-12);
  }
});
