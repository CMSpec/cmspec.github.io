import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

for (const [course, count] of Object.entries({"algebra-lineal":39,"calculo-diferencial":20,"calculo-vectorial":43,"ecuaciones-diferenciales":35,"introduccion-matematicas":64})) {
  test(`${course}: temario completo y enlaces a minicapítulos existentes`, () => {
    const html = readFileSync(new URL(`../out/cursos/${course}/index.html`, import.meta.url), "utf8");
    assert.match(html, /Temario del curso/);
    const menu = html.slice(html.indexOf('class="topic-unit-grid"'), html.indexOf('</nav>', html.indexOf('class="topic-unit-grid"')));
    const links = [...menu.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
    assert.equal(links.length, count);
    assert.equal(new Set(links).size, count);
    for (const id of links) assert.ok(html.includes(`class="chapter-section" id="${id}"`), id);
  });
}
