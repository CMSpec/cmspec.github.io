"use client";

import { useState } from "react";

type SageSandboxProps = {
  code: string;
  title: string;
};

type SageServiceResponse = {
  success?: boolean;
  stdout?: string;
};

export default function SageSandbox({ code, title }: SageSandboxProps) {
  const [source, setSource] = useState(code);
  const [output, setOutput] = useState("La salida aparecerá aquí.");
  const [status, setStatus] = useState<"idle" | "running" | "error">("idle");

  const execute = async () => {
    setStatus("running");
    setOutput("Calculando…");

    try {
      const response = await fetch("https://sagecell.sagemath.org/service", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: new URLSearchParams({ code: source }),
      });

      if (!response.ok) throw new Error(`Respuesta ${response.status}`);
      const result = (await response.json()) as SageServiceResponse;
      setOutput(result.stdout?.trim() || "El cálculo terminó sin producir una salida de texto. Usa print(...) para mostrar un resultado.");
      setStatus(result.success === false ? "error" : "idle");
    } catch {
      setOutput("El servidor de SageMath no respondió. Tus apuntes siguen disponibles; intenta nuevamente o abre la calculadora completa.");
      setStatus("error");
    }
  };

  return (
    <section className="sage-sandbox" aria-labelledby={`sage-${title}`}>
      <header>
        <p>LABORATORIO DE CÁLCULO</p>
        <h4 id={`sage-${title}`}>{title}</h4>
        <span>Edita los comandos y presiona «Ejecutar». Usa print(...) para mostrar resultados.</span>
      </header>

      <div className="sage-console">
        <label>
          <span>COMANDOS</span>
          <textarea value={source} onChange={(event) => setSource(event.target.value)} spellCheck={false} />
        </label>
        <div className="sage-console-actions">
          <button type="button" onClick={() => void execute()} disabled={status === "running"}>
            {status === "running" ? "Calculando…" : "Ejecutar"}
          </button>
          <button type="button" className="is-secondary" onClick={() => setSource(code)}>Restablecer</button>
        </div>
        <div className={`sage-console-output${status === "error" ? " is-error" : ""}`} aria-live="polite">
          <span>SALIDA</span>
          <pre>{output}</pre>
        </div>
      </div>

      <p className="sage-sandbox-fallback">
        Para gráficos y cálculos visuales, abre <a href="https://sagecell.sagemath.org/" target="_blank" rel="noreferrer">SageMathCell completo ↗</a>.
      </p>
    </section>
  );
}
