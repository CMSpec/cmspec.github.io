import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";

test("los ejercicios no se presentan como controles ni exámenes", () => {
  const exercisePages = ["out/ejercicios/index.html", ...readdirSync("out/ejercicios", { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => `out/ejercicios/${entry.name}/index.html`)];
  for (const path of [...exercisePages, "out/cursos/ecuaciones-diferenciales/index.html"]) {
    const text = readFileSync(path, "utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    assert.doesNotMatch(text, /\bcontrol\s*\d|para\s+(?:el\s+)?control|pauta de examen|evaluaciones anteriores/i, path);
    assert.match(text, /ejercicios/i, path);
  }
});

test("los apuntes se leen sin referencias a clases o manuscritos", () => {
  for (const course of ["algebra-lineal", "calculo-diferencial", "calculo-vectorial", "ecuaciones-diferenciales", "introduccion-matematicas"]) {
    const html = readFileSync(`out/cursos/${course}/index.html`, "utf8");
    const text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    assert.doesNotMatch(text, /\bclases\b|\bclase\b(?!\s+C\s*1)|manuscrit[oa]s?|pizarra|\bse (?:vio|vió) en\b/i, course);
  }
});
