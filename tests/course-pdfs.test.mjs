import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import test from "node:test";
import { load } from "cheerio";
import { createCourseDocument, courseSlugs } from "../scripts/course-document.mjs";

const expectedSections = { "introduccion-matematicas": 64, "algebra-lineal": 39, "calculo-diferencial": 20, "calculo-vectorial": 43, "ecuaciones-diferenciales": 35 };
const manifest = JSON.parse(readFileSync("out/descargas/manifest.json", "utf8"));
const hash = value => createHash("sha256").update(value).digest("hex");
const options = { date: "13 de octubre de 2026", css: "", mathCss: "" };

for (const slug of courseSlugs) {
  const source = readFileSync(`out/cursos/${slug}/index.html`, "utf8");
  const original = load(source);
  const html = createCourseDocument(source, { ...options, slug });
  const doc = load(html);

  test(`${slug}: descarga visible y PDF generado desde la versión actual del curso`, () => {
    assert.equal(original(".course-download a[download]").attr("href"), `/descargas/${slug}.pdf`);
    assert.match(original(".course-download").text(), /se actualiza cada vez que se publica/);
    const pdf = readFileSync(`out/descargas/${slug}.pdf`);
    assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
    assert.ok(pdf.length > 50000);
    assert.equal(manifest[slug].sourceSha256, hash(source));
    assert.equal(manifest[slug].pdfSha256, hash(pdf));
  });

  test(`${slug}: todas las unidades, prácticas y fórmulas se conservan`, () => {
    assert.equal(doc(".document-chapter").length, original(".reading-chapter").length);
    assert.equal(doc(".chapter-section").length, expectedSections[slug]);
    assert.equal(doc(".answer").length, expectedSections[slug]);
    assert.equal(doc(".intro-practice, .section-practice").length, expectedSections[slug]);
    const formulas = new Map();
    doc("annotation").each((_, element) => { const tex = doc(element).text(); formulas.set(tex, (formulas.get(tex) || 0) + 1); });
    original(".reading-chapters annotation").each((_, element) => {
      const tex = original(element).text();
      assert.ok(formulas.get(tex) > 0, `Falta fórmula: ${tex}`);
      formulas.set(tex, formulas.get(tex) - 1);
    });
    original(".chapter-section").each((_, element) => {
      const id = original(element).attr("id");
      assert.equal(doc(`[id="ayudas-${id}"] h4`).length, 2);
      assert.equal(doc(`[id="${id}"] .intro-practice a, [id="${id}"] .section-practice a`).attr("href"), `#ayudas-${id}`);
    });
  });

  test(`${slug}: conserva el texto de los apuntes y elimina controles sin función en papel`, () => {
    const normalize = text => text.replace(/\s+/g, " ").trim();
    const target = load(html);
    target(".katex").remove();
    const allText = normalize(target.text());
    original(".reading-chapters .latex-content p").each((_, element) => {
      const paragraph = load(original(element).html());
      paragraph(".katex").remove();
      const text = normalize(paragraph.text());
      if (text) assert.ok(allText.includes(text), text.slice(0, 100));
    });
    assert.equal(doc("script, input, button, textarea, select, details, canvas, iframe").length, 0);
    doc('a[href^="#"]').each((_, element) => {
      assert.equal(doc(`[id="${doc(element).attr("href").slice(1)}"]`).length, 1);
    });
    const rendered = load(readFileSync(`out/descargas/${slug}.html`, "utf8"));
    assert.equal(rendered("head > title").text(), `${original("h1").text()} | CMSpec`);
    assert.equal(manifest[slug].title, original("h1").text());
    assert.equal(rendered(".katex svg [style]").length, 0, "Los estilos de diagramas no deben sobrescribir las raíces y signos de KaTeX");
    rendered("img").each((_, el) => assert.match(rendered(el).attr("src"), /^data:image\//));
  });

  test(`${slug}: una edición de contenido se refleja al regenerar, sin copiar otro documento`, () => {
    const changed = load(source);
    changed(".chapter-section").first().append('<p>Prueba editorial de actualización automática.</p><span class="katex"><math><semantics><mrow/><annotation encoding="application/x-tex">x+2026</annotation></semantics></math></span>');
    const updated = load(createCourseDocument(changed.html(), { ...options, slug }));
    assert.ok(updated(".chapter-section").first().text().includes("Prueba editorial de actualización automática."));
    assert.ok(updated("annotation").toArray().some(el => updated(el).text() === "x+2026"));
  });
}

test("la versión estática de una animación se recalcula desde sus datos", () => {
  const source = load(readFileSync("out/cursos/algebra-lineal/index.html", "utf8"));
  source(".trace-animation .structure-matrix > span").first().text("10");
  const updated = load(createCourseDocument(source.html(), { ...options, slug: "algebra-lineal" }));
  assert.equal(updated(".trace-calculation").text(), "Tr(A) = 10 + 4 - 2 = 12");
});
