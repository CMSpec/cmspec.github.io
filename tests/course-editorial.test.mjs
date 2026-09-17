import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("los apuntes se leen sin referencias a clases o manuscritos", () => {
  for (const course of ["algebra-lineal", "calculo-diferencial", "calculo-vectorial", "ecuaciones-diferenciales", "introduccion-matematicas"]) {
    const html = readFileSync(`out/cursos/${course}/index.html`, "utf8");
    const text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    assert.doesNotMatch(text, /\bclases\b|\bclase\b(?!\s+C\s*1)|manuscrit[oa]s?|pizarra/i, course);
  }
});
