import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { load } from "cheerio";
import { createCourseDocument } from "../scripts/course-document.mjs";

const source = readFileSync("out/cursos/introduccion-matematicas/index.html", "utf8");
const original = load(source);
const html = createCourseDocument(source, { date: "13 de octubre de 2026", css: "", mathCss: "" });
const doc = load(html);

test("el PDF conserva todas las unidades, temas, introducciones y notas", () => {
  assert.equal(doc(".document-chapter").length, original(".reading-chapter").length);
  for (const selector of [".chapter-section", ".intro-source-opening", ".intro-handwritten-note", ".partial-fraction-case", ".partial-fraction-exercises li"]) {
    assert.equal(doc(selector).length, original(selector).length, selector);
    original(selector).each((i, element) => {
      // All editorial prose is retained, including math; formulas are re-rendered.
      const text = load(original(element).html());
      text(".katex, svg, .intro-practice, .intro-explorer").remove();
      const target = load(doc(selector).eq(i).html());
      target(".katex, svg, .intro-practice, .intro-explorer").remove();
      const normalized = target.text().replace(/\s+/g, " ");
      for (const paragraph of text("p").toArray()) {
        assert.ok(normalized.includes(text(paragraph).text().replace(/\s+/g, " ")), selector);
      }
    });
  }
});

test("las 64 prácticas enlazan a sus propias pistas y soluciones al final", () => {
  assert.equal(doc(".intro-practice").length, 64);
  assert.equal(doc(".answer").length, 64);
  original(".chapter-section").each((_, element) => {
    const id = original(element).attr("id");
    const originalHelp = original(element).find(".intro-practice details");
    const help = doc(`#ayudas-${id}`);
    assert.equal(help.find("h4").length, 2);
    originalHelp.each((i, detail) => {
      const a = load(original(detail).html());
      const b = load(help.html());
      a(".katex,summary").remove(); b(".katex,h3,h4,.backlink").remove();
      assert.ok(b.text().replace(/\s+/g, " ").includes(a.text().replace(/\s+/g, " ").trim()), id);
    });
    assert.equal(doc(`#${id} .intro-practice a`).attr("href"), `#ayudas-${id}`);
  });
  assert.equal(doc("details, button, input, select, script").length, 0);
});

test("índice, enlaces y gráficos estáticos están completos", () => {
  doc('a[href^="#"]').each((_, element) => assert.equal(doc(doc(element).attr("href")).length, 1));
  assert.equal(doc(".summation-diagram-wide").length, 1);
  assert.equal(doc(".summation-diagram-narrow").length, 0);
  assert.ok(doc(".synthetic-explorer").text().includes("Suma la última columna"));
  assert.equal(doc(".synthetic-explorer table tbody tr").last().text(), "Resultados2167");
  assert.equal(doc(".synthetic-explorer ol li").length, 12);
  assert.equal(original('.course-download a[download]').attr("href"), "/descargas/introduccion-matematicas.pdf");
});

test("todas las fórmulas LaTeX originales están en el documento", () => {
  const formulas = (page, selector) => page(selector).map((_, element) => page(element).text()).get().sort();
  assert.deepEqual(formulas(doc, "annotation"), formulas(original, ".reading-chapters annotation"));
});

test("la publicación contiene un PDF real y su HTML completo", () => {
  const pdf = readFileSync("out/descargas/introduccion-matematicas.pdf");
  assert.equal(pdf.subarray(0,5).toString(), "%PDF-");
  assert.ok(pdf.length > 50000);
  assert.ok(readFileSync("out/descargas/introduccion-matematicas.html", "utf8").includes("data:font/woff2;base64,"));
});
