import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("ejercitación enlaza a una página independiente desde el título", () => {
  const html = readFileSync("out/ejercicios/index.html", "utf8");
  assert.match(html, /exercise-title-row[\s\S]*?<h1>Ejercitación<\/h1>[\s\S]*?href="\/ejercicios\/prueba"/);
  assert.doesNotMatch(html, /aria-label="Generador de pruebas"/);
});

test("la página de prueba muestra curso y temas sin abrir un desplegable", () => {
  const html = readFileSync("out/ejercicios/prueba/index.html", "utf8");
  assert.match(html, /<h1>Crear una prueba<\/h1>/);
  assert.match(html, /Todos los cursos/);
  assert.match(html, /Temas para la prueba/);
  assert.match(html, /type="checkbox"/);
  assert.match(html, /href="\/ejercicios"/);
  assert.doesNotMatch(html, /practice-test-toggle/);
});
