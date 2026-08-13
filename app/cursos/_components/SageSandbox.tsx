"use client";

import { useEffect, useId, useRef, useState } from "react";

declare global {
  interface Window {
    sagecell?: {
      makeSagecell: (options: {
        inputLocation: string;
        evalButtonText?: string;
        languages?: string[];
        linked?: boolean;
      }) => void;
    };
    __cmspecSageCellLoader?: Promise<void>;
  }
}

const SAGECELL_SCRIPT = "https://sagecell.sagemath.org/static/embedded_sagecell.js";

function loadSageCell() {
  if (window.sagecell) return Promise.resolve();
  if (window.__cmspecSageCellLoader) return window.__cmspecSageCellLoader;

  window.__cmspecSageCellLoader = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SAGECELL_SCRIPT}"]`);

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("No fue posible cargar SageMathCell.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = SAGECELL_SCRIPT;
    script.async = true;
    script.dataset.cmspecSage = "true";
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("No fue posible cargar SageMathCell.")), { once: true });
    document.head.appendChild(script);
  });

  return window.__cmspecSageCellLoader;
}

type SageSandboxProps = {
  code: string;
  title: string;
};

export default function SageSandbox({ code, title }: SageSandboxProps) {
  const reactId = useId().replace(/:/g, "");
  const sandboxId = `sage-sandbox-${reactId}`;
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"waiting" | "loading" | "ready" | "error">("waiting");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const initialise = async () => {
      if (host.dataset.sageInitialised === "true") return;
      host.dataset.sageInitialised = "true";
      setStatus("loading");

      try {
        await loadSageCell();
        if (!window.sagecell) throw new Error("SageMathCell no quedó disponible.");
        window.sagecell.makeSagecell({
          inputLocation: `#${sandboxId}`,
          evalButtonText: "Ejecutar",
          languages: ["sage"],
          linked: false,
        });
        setStatus("ready");
      } catch {
        host.dataset.sageInitialised = "false";
        setStatus("error");
      }
    };

    if (!("IntersectionObserver" in window)) {
      void initialise();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        void initialise();
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [sandboxId]);

  return (
    <section className="sage-sandbox" aria-labelledby={`${sandboxId}-title`}>
      <header>
        <p>LABORATORIO DE CÁLCULO</p>
        <h4 id={`${sandboxId}-title`}>{title}</h4>
        <span>Edita los comandos y presiona «Ejecutar». El cálculo se realiza con SageMath.</span>
      </header>

      <div className="sage-sandbox-host" id={sandboxId} ref={hostRef}>
        <script type="text/x-sage" dangerouslySetInnerHTML={{ __html: code }} />
        {status !== "ready" && (
          <p className={`sage-sandbox-status is-${status}`}>
            {status === "waiting" && "La calculadora se activará al acercarte a ella."}
            {status === "loading" && "Cargando SageMath…"}
            {status === "error" && (
              <>No se pudo cargar la calculadora. Puedes usar <a href="https://sagecell.sagemath.org/" target="_blank" rel="noreferrer">SageMathCell ↗</a>.</>
            )}
          </p>
        )}
      </div>
    </section>
  );
}
