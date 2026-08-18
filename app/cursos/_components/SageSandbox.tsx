"use client";

import { useEffect, useRef, useState } from "react";
import { sitePath } from "../../../lib/site-path";

type SageSandboxProps = {
  code: string;
  title: string;
};

export default function SageSandbox({ code, title }: SageSandboxProps) {
  const [source, setSource] = useState(code);
  const [output, setOutput] = useState("La salida aparecerá aquí.");
  const [status, setStatus] = useState<"idle" | "running" | "error">("idle");
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => () => workerRef.current?.terminate(), []);

  const execute = async () => {
    setStatus("running");
    setOutput("Calculando…");

    const worker = workerRef.current ?? new Worker(sitePath("/pyodide-worker.mjs"), { type: "module" });
    workerRef.current = worker;
    const id = crypto.randomUUID();
    worker.onmessage = ({ data }: MessageEvent<{ id: string; output: string; error: string }>) => {
      if (data.id !== id) return;
      if (data.error) {
        setOutput(data.error);
        setStatus("error");
      } else {
        setOutput(data.output || "El cálculo terminó sin producir una salida. Usa print(...) para mostrar un resultado.");
        setStatus("idle");
      }
    };
    worker.onerror = () => {
      setOutput("No fue posible iniciar Python en este navegador. Intenta recargar la página.");
      setStatus("error");
    };
    worker.postMessage({ id, code: source });
  };

  return (
    <section className="sage-sandbox" aria-labelledby={`sage-${title}`}>
      <header>
        <p>LABORATORIO DE CÁLCULO</p>
        <h4 id={`sage-${title}`}>{title}</h4>
        <span>Edita los comandos y presiona «Ejecutar». Python se ejecuta dentro de tu navegador.</span>
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
        La primera ejecución puede tardar unos segundos mientras se carga el motor matemático.
      </p>
    </section>
  );
}
