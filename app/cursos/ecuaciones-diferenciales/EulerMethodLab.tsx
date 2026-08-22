"use client";

import { useEffect, useRef, useState } from "react";

const T_MAX = 2.5;
const Y_MAX = 13;

export default function EulerMethodLab() {
  const [step, setStep] = useState(0.25);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const draw = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(bounds.width * ratio));
      canvas.height = Math.max(1, Math.round(bounds.height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const width = bounds.width;
      const height = bounds.height;
      const padLeft = 50;
      const padRight = 28;
      const padTop = 28;
      const padBottom = 38;
      const toX = (t: number) => padLeft + (t / T_MAX) * (width - padLeft - padRight);
      const toY = (y: number) => height - padBottom - (y / Y_MAX) * (height - padTop - padBottom);

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(15, 56, 67, 0.10)";
      context.lineWidth = 1;
      for (let t = 0; t <= T_MAX + 0.001; t += 0.5) {
        context.beginPath();
        context.moveTo(toX(t), padTop);
        context.lineTo(toX(t), height - padBottom);
        context.stroke();
      }
      for (let y = 0; y <= 12; y += 2) {
        context.beginPath();
        context.moveTo(padLeft, toY(y));
        context.lineTo(width - padRight, toY(y));
        context.stroke();
      }

      context.strokeStyle = "#48646c";
      context.lineWidth = 1.4;
      context.beginPath();
      context.moveTo(padLeft, padTop);
      context.lineTo(padLeft, height - padBottom);
      context.lineTo(width - padRight, height - padBottom);
      context.stroke();

      context.fillStyle = "#48646c";
      context.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.textAlign = "center";
      for (let t = 0; t <= T_MAX + 0.001; t += 0.5) context.fillText(t.toFixed(1), toX(t), height - 15);
      context.textAlign = "right";
      for (let y = 0; y <= 12; y += 2) context.fillText(String(y), padLeft - 10, toY(y) + 4);
      context.textAlign = "left";
      context.fillText("t", width - padRight - 4, height - padBottom - 9);
      context.fillText("y", padLeft + 9, padTop + 4);

      context.strokeStyle = "#91bd69";
      context.lineWidth = 3;
      context.beginPath();
      for (let index = 0; index <= 260; index += 1) {
        const t = (T_MAX * index) / 260;
        const y = Math.exp(t);
        if (index === 0) context.moveTo(toX(t), toY(y));
        else context.lineTo(toX(t), toY(y));
      }
      context.stroke();

      const points: Array<{ t: number; y: number }> = [{ t: 0, y: 1 }];
      let t = 0;
      let y = 1;
      while (t < T_MAX - 0.0001) {
        const actualStep = Math.min(step, T_MAX - t);
        y += actualStep * y;
        t += actualStep;
        points.push({ t, y });
      }

      context.strokeStyle = "#047b9a";
      context.lineWidth = 3;
      context.beginPath();
      points.forEach((point, index) => {
        if (index === 0) context.moveTo(toX(point.t), toY(point.y));
        else context.lineTo(toX(point.t), toY(point.y));
      });
      context.stroke();

      points.forEach((point) => {
        context.fillStyle = "#efad8e";
        context.beginPath();
        context.arc(toX(point.t), toY(point.y), 4.5, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle = "#0f3843";
        context.lineWidth = 1.2;
        context.stroke();
      });

      context.font = "600 12px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.fillStyle = "#557a31";
      context.fillText("solución exacta", toX(1.56), toY(Math.exp(1.56)) - 12);
      context.fillStyle = "#047b9a";
      const labelPoint = points[Math.max(1, points.length - 3)];
      context.fillText("Euler", toX(labelPoint.t) + 8, toY(labelPoint.y) + 20);
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [step]);

  const steps = Math.ceil(T_MAX / step);
  let approximation = 1;
  let elapsed = 0;
  while (elapsed < T_MAX - 0.0001) {
    const actualStep = Math.min(step, T_MAX - elapsed);
    approximation += actualStep * approximation;
    elapsed += actualStep;
  }
  const error = Math.abs(Math.exp(T_MAX) - approximation);

  return (
    <section className="edo-euler-method" aria-labelledby="edo-euler-title">
      <header>
        <div>
          <span>EXPLORACIÓN · APROXIMACIÓN NUMÉRICA</span>
          <h4 id="edo-euler-title">Avanzar siguiendo la pendiente</h4>
        </div>
        <strong>y′ = y, &nbsp;y(0) = 1</strong>
      </header>

      <div className="edo-euler-controls">
        <label>
          <span>Tamaño del paso h</span>
          <input type="range" min="0.05" max="0.5" step="0.05" value={step} onChange={(event) => setStep(Number(event.target.value))} />
          <output>{step.toFixed(2)}</output>
        </label>
        <p>{steps} pasos · error final ≈ <strong>{error.toFixed(3)}</strong></p>
      </div>

      <canvas ref={canvasRef} role="img" aria-label={`Comparación entre la solución exacta y el método de Euler con paso ${step.toFixed(2)}`} />

      <p>Euler reemplaza la curva por pequeños segmentos con la pendiente conocida en cada punto. Al reducir h, aumenta el número de pasos y el polígono azul se acerca a la solución exacta verde.</p>
    </section>
  );
}
