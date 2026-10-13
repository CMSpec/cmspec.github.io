import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { load } from "cheerio";
import { courseFeedbackHref } from "../lib/course-feedback.ts";

const course = { title: "Introducción a las Matemáticas", slug: "introduccion-matematicas" };

test("el enlace abre el contacto con curso y espacio para describir el error", () => {
  const mail = new URL(courseFeedbackHref(course));
  assert.equal(mail.protocol, "mailto:");
  assert.equal(mail.pathname, "camila.mspec@gmail.com");
  assert.equal(mail.searchParams.get("subject"), "Corrección de apuntes · Introducción a las Matemáticas");
  const body = mail.searchParams.get("body");
  assert.ok(body.includes("Enlace: https://cmspec.github.io/cursos/introduccion-matematicas/\r\n"));
  assert.ok(body.includes("El error que encontré es:"));
  assert.ok(body.includes("Mi sugerencia de corrección (opcional):"));
  assert.ok(!body.includes("Tema:"));
});

test("el correo identifica el tema actual y conserva acentos, símbolos y ancla", () => {
  const topic = { title: "Inducción & sumatorias: ¿por qué?", href: "#intro-induccion-sumatorias-3" };
  const mail = new URL(courseFeedbackHref(course, topic));
  assert.equal(mail.searchParams.get("subject"), `Corrección de apuntes · ${course.title} · ${topic.title}`);
  assert.ok(mail.searchParams.get("body").includes(`Tema: ${topic.title}\r\n`));
  assert.ok(mail.searchParams.get("body").includes(`Enlace: https://cmspec.github.io/cursos/${course.slug}/${topic.href}`));
  assert.equal(mail.searchParams.size, 2);
  assert.equal(mail.hash, "");
});

for (const slug of ["introduccion-matematicas", "algebra-lineal", "calculo-diferencial", "calculo-vectorial", "ecuaciones-diferenciales"]) {
  test(`${slug}: botón de correcciones visible bajo el título sin JavaScript`, () => {
    const $ = load(readFileSync(new URL(`../out/cursos/${slug}/index.html`, import.meta.url), "utf8"));
    const button = $(".course-masthead h1 + .course-feedback .course-feedback-button");
    assert.equal(button.length, 1);
    assert.equal($(".course-topic-index .course-feedback-button").length, 0);
    assert.match(button.text(), /¿Encontraste algún error\?/);
    assert.match(button.text(), /Ayúdanos a mejorar estos apuntes/);
    const mail = new URL(button.attr("href"));
    assert.equal(mail.pathname, "camila.mspec@gmail.com");
    assert.ok(mail.searchParams.get("subject").includes($("h1").text()));
    assert.ok(mail.searchParams.get("body").includes(`https://cmspec.github.io/cursos/${slug}/`));
  });
}
