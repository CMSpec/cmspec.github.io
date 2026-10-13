import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { chromium } from "playwright";
import { createCourseDocument, coursePdfName } from "./course-document.mjs";

const require = createRequire(import.meta.url);
const katexDir = path.dirname(require.resolve("katex/package.json"));
let mathCss = await readFile(path.join(katexDir, "dist/katex.min.css"), "utf8");
// Embed fonts: the finished document and PDF never depend on network resources.
for (const match of [...mathCss.matchAll(/url\((fonts\/[^)]+)\)/g)]) {
  const font = await readFile(path.join(katexDir, "dist", match[1]));
  const ext = path.extname(match[1]).slice(1);
  mathCss = mathCss.replace(match[0], `url(data:font/${ext};base64,${font.toString("base64")})`);
}
const source = await readFile("out/cursos/introduccion-matematicas/index.html", "utf8");
const css = await readFile(new URL("./course-document.css", import.meta.url), "utf8");
const date = new Intl.DateTimeFormat("es-CL", { dateStyle: "long", timeZone: "Asia/Seoul" }).format(new Date());
const html = createCourseDocument(source, { date, css, mathCss });
await mkdir("out/descargas", { recursive: true });
await writeFile("out/descargas/introduccion-matematicas.html", html);
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  // This is an isolated document renderer, not a live website/browser session.
  await page.route("**/*", route => route.abort());
  await page.setContent(html, { waitUntil: "load" });
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => document.fonts.ready);
  // Scale only oversized display formulas; never cut off a long equation.
  const resized = await page.evaluate(() => {
    let count = 0;
    for (const box of document.querySelectorAll(".course-math")) {
      if (box.scrollWidth > box.clientWidth + 1) {
        box.style.fontSize = `${Math.max(7, 11 * box.clientWidth / box.scrollWidth)}pt`;
        count++;
      }
    }
    return count;
  });
  const destination = path.join("out/descargas", coursePdfName);
  await page.pdf({
    path: destination, format: "A4", printBackground: true, preferCSSPageSize: true,
    tagged: true, outline: true, displayHeaderFooter: true,
    headerTemplate: '<div style="font:8px Arial;color:#53666c;width:100%;margin:0 18mm">CMSpec · Introducción a las Matemáticas</div>',
    footerTemplate: '<div style="font:8px Arial;color:#53666c;width:100%;margin:0 18mm;display:flex;justify-content:space-between"><span>cmspec.github.io</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
    margin: { top: "20mm", bottom: "20mm", left: "18mm", right: "18mm" },
  });
  if (!process.env.CI) {
    await mkdir("output/pdf", { recursive: true });
    await copyFile(destination, path.join("output/pdf", coursePdfName));
  }
  console.log(`PDF generado: ${destination} (${resized} fórmulas ajustadas).`);
} finally { await browser.close(); }
