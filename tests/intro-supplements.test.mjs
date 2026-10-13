import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import katex from "katex";
import { introductorySupplements, supplementaryProblems } from "../content/courses/introductory-supplements.ts";
import { partialFractionSolutions, partialFractionHints, partialFractionSlug } from "../content/courses/partial-fractions-solutions.ts";
import { partialFractionExercises } from "../content/courses/partial-fractions-guide.ts";
import { introSupplementaryExercises } from "../content/intro-supplementary-exercises.ts";
import { exercises } from "../content/exercises.ts";

const html = () => readFileSync("out/cursos/introduccion-matematicas/index.html", "utf8");
test("los complementos de LaTeX se leen en el tema correspondiente, sin enlaces a documentos", () => {
  const page = html();
  for (const [section, items] of Object.entries(introductorySupplements)) {
    const start = page.indexOf(`id="intro-${section}"`), end = page.indexOf('class="intro-practice"', start);
    assert.ok(start >= 0 && end > start);
    for (const item of items) {
      assert.ok(page.slice(start, end).includes(item.title), item.title);
      for (const p of item.paragraphs) for (const m of p.matchAll(/\$([^$]+)\$/g)) katex.renderToString(m[1], { throwOnError: true, strict: "error" });
    }
  }
  const pdfLinks = [...page.matchAll(/href="([^"]*\.pdf)"/g)].map(match => match[1]);
  assert.ok(pdfLinks.every(href => href === "/descargas/introduccion-matematicas.pdf"));
  assert.ok(page.includes("se divide el cociente obtenido por b; el resto no cambia"));
});

test("la guía conserva 17 enunciados con tres pistas y una solución por ejercicio", () => {
  assert.equal(partialFractionSolutions.length, partialFractionExercises.length);
  const page = html(), start = page.indexOf('<ol class="partial-fraction-exercises">');
  const guide = page.slice(start, page.indexOf('</ol>', start));
  assert.equal((guide.match(/<details>/g) ?? []).length, 17*4);
  assert.equal((guide.match(/<summary>Ver solución<\/summary>/g) ?? []).length, 17);
  for (const [i, item] of partialFractionSolutions.entries()) {
    for (const tex of [item.factorization, item.domain, item.setup, item.answer]) katex.renderToString(tex, { throwOnError: true, strict: "error" });
    for (const p of [...partialFractionHints(item), ...item.working]) for (const m of p.matchAll(/\$([^$]+)\$/g)) katex.renderToString(m[1], { throwOnError: true, strict: "error" });
    const slug = partialFractionSlug(i);
    assert.equal(exercises.filter(e => e.slug === slug).length, 1, slug);
    assert.ok(guide.includes(`/ejercicios/${slug}`));
    assert.ok(readFileSync(`out/ejercicios/${slug}/index.html`, "utf8").includes("Ver solución completa"));
  }
  assert.equal(introSupplementaryExercises.length, 19);
  assert.equal(new Set(exercises.map(e => e.number)).size, exercises.length);
});

test("identidades de los 17 ejercicios de fracciones parciales", () => {
  const pairs = [
    [x=>(3*x+7)/(x*x-x-6), x=>16/(5*(x-3))-1/(5*(x+2))],
    [x=>(2*x-5)/(x*x+4*x-5), x=>5/(2*(x+5))-1/(2*(x-1))],
    [x=>(x+1)/(x*x-9), x=>2/(3*(x-3))+1/(3*(x+3))],
    [x=>(x*x+1)/(x*x-4*x+4), x=>1+4/(x-2)+5/(x-2)**2],
    [x=>(5*x-2)/(x**3-3*x*x+3*x-1), x=>5/(x-1)**2+3/(x-1)**3],
    [x=>(4*x+6)/(x*x+2*x+1), x=>4/(x+1)+2/(x+1)**2],
    [x=>(2*x+1)/(x*x+4), x=>(2*x+1)/(x*x+4)],
    [x=>(x*x-3*x+5)/(x*x+x+1), x=>1+(-4*x+4)/(x*x+x+1)],
    [x=>(6*x+7)/(x*x+2*x+5), x=>(6*x+7)/(x*x+2*x+5)],
    [x=>(3*x+2)/(x*x+1)**2, x=>(3*x+2)/(x*x+1)**2],
    [x=>(x*x+x+2)/(x*x+4)**3, x=>1/(x*x+4)**2+(x-2)/(x*x+4)**3],
    [x=>(5*x-1)/(x*x+x+1)**2, x=>(5*x-1)/(x*x+x+1)**2],
    [x=>(4*x+3)/((x*x+1)*(x-1)), x=>7/(2*(x-1))+(-7*x+1)/(2*(x*x+1))],
    [x=>(2*x*x+3*x+1)/((x-2)**2*(x+3)), x=>8/(5*(x-2))+3/(x-2)**2+2/(5*(x+3))],
    [x=>(5*x+6)/((x*x+x+1)*(x*x-1)), x=>(-4*x-11)/(3*(x*x+x+1))+11/(6*(x-1))-1/(2*(x+1))],
    [x=>(x*x+4)/((x-1)*(x+2)**2*(x*x+1)), x=>5/(18*(x-1))-76/(225*(x+2))-8/(15*(x+2)**2)+(3*x-21)/(50*(x*x+1))],
    [x=>(7*x+8)/((x*x+4)**2*(x-3)), x=>29/(169*(x-3))-(29*x+87)/(169*(x*x+4))+(-29*x+4)/(13*(x*x+4)**2)],
  ];
  for (const [i, [original, result]] of pairs.entries()) for (const x of [-7, -4.5, -.5, 0, .5, 1.5, 2.5, 4, 8]) {
    assert.ok(Math.abs(original(x)-result(x)) < 1e-9 * (1+Math.abs(original(x))), `ejercicio ${i+1}, x=${x}`);
  }
});

test("los cuatro problemas adicionales tienen enlaces, pistas, soluciones y cálculos comprobados", () => {
  const page = html();
  for (const item of supplementaryProblems) {
    assert.ok(page.includes(item.title));
    const exercise = exercises.find(e => e.slug === item.slug);
    assert.equal(exercise.hints.length, 3);
    assert.ok(exercise.relatedTheory[0].href.endsWith(`intro-${item.section}`));
  }
  assert.equal(.05*2800000+.08*5600000, 588000);
  assert.equal(.06*35000+.045*65000, 5025);
  assert.ok(Math.abs(.06*7/18+.15/9-.04)<1e-12);
  const sum=Array.from({length:200},(_,j)=>{const k=j+1;return .25*(1/(2*k-1)-1/(2*k+1))-5*k**3+4;}).reduce((a,b)=>a+b,0);
  assert.ok(Math.abs(sum-(100/401-2020049200))<1e-5);
  for(let n=1;n<30;n++) assert.ok(n<2**n);
});

test("las figuras nuevas tienen descripciones y no sustituyen las animaciones", () => {
  const page = html();
  for(const id of ["absolute-distance","repeated-root-sign","vertical-parabola","vertical-circle","piecewise-function","inverse-reflection","right-triangle","lighthouse-distance","transformed-sine","translated-vector","vector-sum","venn-regions","induction-chain","no-real-roots","complex-argument","distance-midpoint","circle-radius","parabola-focus","ellipse-foci","hyperbola-asymptotes"]) {
    assert.ok(page.includes(`data-diagram="${id}"`),id);
    assert.ok(page.includes(`aria-labelledby="${id}-title ${id}-caption"`));
  }
  for(const phrase of ["synthetic-explorer", "summation-definition-diagram", "Un ángulo, dos coordenadas", "Explora los valores de verdad"]) assert.ok(page.includes(phrase));
});
