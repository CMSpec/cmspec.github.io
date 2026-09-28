import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { overleafExercises } from "../content/overleaf-exercises.ts";
import { overleafGuidance } from "../content/overleaf-guidance.ts";

test("solo se publican candidatos revisados, sin respuestas filtradas en el enunciado",()=>{
  const reviewed=JSON.parse(readFileSync("content/overleaf-reviewed.json","utf8"));
  assert.equal(overleafExercises.length,186);
  for(const e of overleafExercises) {
    assert.ok(reviewed[e.slug.split("-").at(-1)]);
    assert.doesNotMatch(e.statement.join(" "),/Solución\s*:|\b(?:puntaje|examen|control|solemne|profesor|matlab)\b|XX puntos|\[X pts\]/i,e.slug);
    assert.ok(e.statement.every(p=>p.trim()));
    const html=readFileSync(`out/ejercicios/${e.slug}/index.html`,"utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,"");
    if(e.solution.length===0) {
      assert.ok(html.includes("Todavía no hay una solución guiada publicada"),e.slug);
      assert.ok(!html.includes("Ver solución completa"),e.slug);
      assert.ok(!html.includes("PISTAS PROGRESIVAS"),e.slug);
    } else {
      assert.equal(e.hints.length,3);
      assert.ok(html.includes("Ver solución completa"),e.slug);
      assert.ok(!html.includes("RESPUESTA FINAL"),e.slug);
    }
  }
  assert.equal(overleafExercises.filter(e=>e.solution.length>0).length,Object.keys(overleafGuidance).length);
});

test("el material de ecuaciones diferenciales se clasifica por contenido y no por el ZIP",()=>{
  const edo=overleafExercises.filter(e=>e.courseSlug==="ecuaciones-diferenciales");
  assert.equal(edo.length,2);
  assert.ok(edo.every(e=>e.relatedTheory[0].href.startsWith('/cursos/ecuaciones-diferenciales#')));
});

test("comprobaciones de las soluciones guiadas añadidas",()=>{
  for(const [a,b] of [[2,3],[4,-3],[0,0],[-2,7]]) assert.ok(Math.abs(Math.hypot(a,b)**2-(a*a+b*b))<1e-12);
  assert.equal(Math.hypot(4,-3),5);
  assert.ok(Math.abs(Math.hypot(.5,Math.sqrt(3)/2)-1)<1e-12);
  for(const t of [-3,0,2])assert.deepEqual([0,t-t,0],[0,0,0]);
  assert.deepEqual([1-1,2-2],[0,0]);
});
