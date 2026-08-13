"use client";

import { useMemo } from "react";

const SAGECELL_SCRIPT = "https://sagecell.sagemath.org/static/embedded_sagecell.js";

type SageSandboxProps = {
  code: string;
  title: string;
};

function buildIsolatedCell(code: string) {
  const safeCode = code.replace(/<\/script/gi, "<\\/script");

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="${SAGECELL_SCRIPT}"></script>
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      html, body { margin: 0; min-height: 100%; background: white; color: #123942; }
      body { padding: 20px; font-family: Georgia, serif; }
      .sagecell_input { border: 1px solid #cad7d7 !important; border-radius: 0 !important; box-shadow: none !important; }
      .sagecell_evalButton { min-height: 42px; padding: 8px 18px !important; border: 0 !important; border-radius: 0 !important; color: white !important; background: #9fcf6a !important; font: 700 12px ui-monospace, SFMono-Regular, Menlo, monospace !important; cursor: pointer; }
      .sagecell_output_elements { font-family: Georgia, serif; }
      .sagecell_messages, .sagecell_sessionTitle { display: none !important; }
    </style>
  </head>
  <body>
    <div id="sage-cell"><script type="text/x-sage">${safeCode}</script></div>
    <script>
      if (window.sagecell) {
        window.sagecell.makeSagecell({
          inputLocation: "#sage-cell",
          evalButtonText: "Ejecutar",
          languages: ["sage"],
          linked: false
        });
      }
    </script>
  </body>
</html>`;
}

export default function SageSandbox({ code, title }: SageSandboxProps) {
  const source = useMemo(() => buildIsolatedCell(code), [code]);

  return (
    <section className="sage-sandbox" aria-labelledby={`sage-${title}`}>
      <header>
        <p>LABORATORIO DE CÁLCULO</p>
        <h4 id={`sage-${title}`}>{title}</h4>
        <span>Edita los comandos y presiona «Ejecutar». El cálculo se realiza con SageMath.</span>
      </header>

      <iframe
        className="sage-sandbox-frame"
        loading="lazy"
        sandbox="allow-scripts allow-forms allow-popups allow-downloads"
        srcDoc={source}
        title={`Calculadora SageMath: ${title}`}
      />
      <p className="sage-sandbox-fallback">
        Si la calculadora no carga, puedes abrir <a href="https://sagecell.sagemath.org/" target="_blank" rel="noreferrer">SageMathCell en otra pestaña ↗</a>.
      </p>
    </section>
  );
}
