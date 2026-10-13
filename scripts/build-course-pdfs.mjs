import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { load } from "cheerio";
import { chromium } from "playwright";
import { createCourseDocument, courseSlugs } from "./course-document.mjs";

const require = createRequire(import.meta.url);
const katexDir = path.dirname(require.resolve("katex/package.json"));
let mathCss = await readFile(path.join(katexDir, "dist/katex.min.css"), "utf8");
// Embed fonts: the finished document and PDF never depend on network resources.
for (const match of [...mathCss.matchAll(/url\((fonts\/[^)]+)\)/g)]) {
  const font = await readFile(path.join(katexDir, "dist", match[1]));
  const ext = path.extname(match[1]).slice(1);
  mathCss = mathCss.replace(match[0], `url(data:font/${ext};base64,${font.toString("base64")})`);
}
const css = await readFile(new URL("./course-document.css", import.meta.url), "utf8");
const visualCss = (await readFile("app/globals.css", "utf8")).replace(/@import[^;]+;/g, "");
const date = new Intl.DateTimeFormat("es-CL", { dateStyle: "long", timeZone: "Asia/Seoul" }).format(new Date());
await mkdir("out/descargas", { recursive: true });
const browser = await chromium.launch({ headless: true });
const manifest = {};
try {
 for (const slug of courseSlugs) {
  const source = await readFile(`out/cursos/${slug}/index.html`, "utf8");
  const document = load(createCourseDocument(source, { date, css, mathCss, slug }));
  const title = document("head > title").text().replace(/ \| CMSpec$/, "");
  for (const img of document("img").toArray()) {
    const src = document(img).attr("src");
    const assetPath = path.resolve("public", src.replace(/^\//, ""));
    if (!assetPath.startsWith(path.resolve("public") + path.sep)) throw new Error(`Imagen fuera del sitio: ${src}`);
    const data = await readFile(assetPath);
    const type = path.extname(assetPath).toLowerCase() === ".svg" ? "image/svg+xml" : /\.jpe?g$/i.test(assetPath) ? "image/jpeg" : "image/png";
    document(img).attr("src", `data:${type};base64,${data.toString("base64")}`).removeAttr("loading").removeAttr("srcset");
  }
  const page = await browser.newPage();
  // This is an isolated document renderer, not a live website/browser session.
  await page.route("**/*", route => route.abort());
  // Copy the site's SVG presentation into the offline document. No site scripts run.
  const sourceDiagrams = document("svg").filter((_, el) => !document(el).parents(".katex").length);
  if (slug !== "introduccion-matematicas" && sourceDiagrams.length) {
    await page.setContent(`<style>${visualCss}</style><style>:root{--font-geist-mono:monospace;--font-geist-sans:Arial}</style>${document("body").html()}`, { waitUntil: "load" });
    const diagrams = await page.evaluate(() => Array.from(document.querySelectorAll("svg")).filter(svg => !svg.closest(".katex")).map(svg => {
      const properties = ["fill", "fill-opacity", "stroke", "stroke-width", "stroke-opacity", "stroke-dasharray", "stroke-linecap", "stroke-linejoin", "color", "opacity", "font-family", "font-size", "font-style", "font-weight", "text-anchor", "dominant-baseline"];
      const entries = Array.from(svg.querySelectorAll("*"), element => [element, properties.map(property => [property, getComputedStyle(element).getPropertyValue(property)])]);
      for (const [element, styles] of entries) for (const [property, value] of styles) element.style.setProperty(property, value);
      return svg.outerHTML;
    }));
    sourceDiagrams.each((i, element) => document(element).replaceWith(diagrams[i]));
  }
  await page.setContent(document.html(), { waitUntil: "load" });
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => document.fonts.ready);
  // Scale only oversized display formulas; never cut off a long equation.
  const resized = await page.evaluate(() => {
    let count = 0;
    for (const box of document.querySelectorAll(".course-math, .centered")) {
      if (box.scrollWidth > box.clientWidth + 1) {
        box.style.fontSize = `${Math.max(6.5, 11 * (box.clientWidth - 4) / box.scrollWidth)}pt`;
        count++;
      }
    }
    return count;
  });
  const html = await page.content();
  await writeFile(`out/descargas/${slug}.html`, html);
  const destination = `out/descargas/${slug}.pdf`;
  await page.pdf({
    path: destination, format: "A4", printBackground: true, preferCSSPageSize: true,
    tagged: true, outline: true, displayHeaderFooter: true,
    headerTemplate: `<div style="font:8px Arial;color:#53666c;width:100%;margin:0 18mm">CMSpec · ${title}</div>`,
    footerTemplate: '<div style="font:8px Arial;color:#53666c;width:100%;margin:0 18mm;display:flex;justify-content:space-between"><span>cmspec.github.io</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
    margin: { top: "20mm", bottom: "20mm", left: "18mm", right: "18mm" },
  });
  if (!process.env.CI) {
    await mkdir("output/pdf", { recursive: true });
    await copyFile(destination, `output/pdf/${slug}.pdf`);
  }
  manifest[slug] = { title, sourceSha256: createHash("sha256").update(source).digest("hex"), pdfSha256: createHash("sha256").update(await readFile(destination)).digest("hex"), generatedAt: new Date().toISOString() };
  console.log(`PDF generado: ${destination} (${resized} fórmulas ajustadas).`);
  await page.close();
 }
 await writeFile("out/descargas/manifest.json", JSON.stringify(manifest, null, 2));
} finally { await browser.close(); }
