import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { courseLaboratories } from "../content/course-laboratories.ts";
import { courseNotes } from "../content/course-library.ts";
const html = route => readFileSync(new URL(`../out/${route}/index.html`, import.meta.url), "utf8");

test("los laboratorios se ofrecen en Laboratorio y no en Aprender", () => {
  assert.equal(courseLaboratories.length, 5);
  assert.ok(courseNotes.every(note => !note.title.includes("Laboratorio")));
  assert.doesNotMatch(html("aprender"), /cursos\/laboratorio-algebra-lineal/);
  const hub = html("laboratorio/apuntes");
  for (const lab of courseLaboratories) assert.ok(hub.includes(`/laboratorio/${lab.slug}`));
});

test("todos los laboratorios conservan el formato por bloques y sus exploraciones", () => {
  const counts = {"algebra-lineal":12,"calculo-vectorial":17,"ecuaciones-diferenciales":7,"calculo-diferencial":4,"introduccion-matematicas":4};
  for (const lab of courseLaboratories) {
    const page = html(`laboratorio/${lab.slug}`);
    assert.match(page, /visual-compendium-page/);
    assert.match(page, /CMSpec · Laboratorio/);
    assert.equal((page.match(/class="course-lab-exploration"/g) ?? []).length, counts[lab.slug]);
    for (const match of page.matchAll(/href="#([^"]+)"/g)) assert.ok(page.includes(`id="${match[1]}"`), `${lab.slug}: ${match[1]}`);
  }
});

test("la dirección antigua no mantiene un segundo laboratorio", () => {
  const legacy = html("cursos/laboratorio-algebra-lineal");
  assert.match(legacy, /El laboratorio cambió de sección/);
  assert.match(legacy, /\/laboratorio\/algebra-lineal/);
  assert.doesNotMatch(legacy, /visual-compendium-stack/);
});
