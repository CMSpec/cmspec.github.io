"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    sagecell?: {
      makeSagecell: (options: Record<string, unknown>) => void;
    };
  }
}

const initialCode = `# Edita este ejemplo y presiona Ejecutar
A = matrix([[1, 2], [3, 4]])
v = vector([2, -1])
print("A·v =", A*v)
print("det(A) =", A.det())`;

export default function SageMathCell() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const cell = document.querySelector<HTMLElement>("#cmspec-sage-cell");
    if (!cell || cell.dataset.initialized === "true") return;

    const initialize = () => {
      if (!window.sagecell || cell.dataset.initialized === "true") return;
      cell.dataset.initialized = "true";
      window.sagecell.makeSagecell({
        inputLocation: "#cmspec-sage-cell",
        code: initialCode,
        evalButtonText: "Ejecutar",
        languages: ["sage"],
        editor: "codemirror",
        hide: ["permalink", "fullScreen"],
      });
      setStatus("ready");
    };

    const existing = document.querySelector<HTMLScriptElement>('script[data-cmspec-sage="true"]');
    if (existing) {
      if (window.sagecell) initialize();
      else existing.addEventListener("load", initialize, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sagecell.sagemath.org/static/embedded_sagecell.js";
    script.async = true;
    script.dataset.cmspecSage = "true";
    script.addEventListener("load", initialize, { once: true });
    script.addEventListener("error", () => setStatus("error"), { once: true });
    document.head.appendChild(script);
  }, []);

  return (
    <section className="official-sage-cell" aria-labelledby="sage-lab-title">
      <header>
        <p>CALCULADORA · SAGEMATH</p>
        <h2 id="sage-lab-title">Calcular, modificar y volver a probar</h2>
        <span>La celda utiliza el servidor oficial de SageMath. Puedes editar el ejemplo o escribir tus propios comandos.</span>
      </header>
      <div id="cmspec-sage-cell" className="official-sage-embed" />
      {status === "loading" && <p className="official-sage-status">Preparando la calculadora…</p>}
      {status === "error" && <p className="official-sage-status is-error">La calculadora externa no respondió. El resto del laboratorio sigue disponible y puedes <a href="https://sagecell.sagemath.org/" target="_blank" rel="noreferrer">abrir SageMathCell directamente ↗</a>.</p>}
      <footer>
        <span>La ejecución se realiza en un servicio externo.</span>
        <a href="https://doc.sagemath.org/" target="_blank" rel="noreferrer">Documentación de SageMath ↗</a>
      </footer>
    </section>
  );
}
