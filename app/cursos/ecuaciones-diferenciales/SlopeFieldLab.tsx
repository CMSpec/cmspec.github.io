"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";

const LIMIT = 4;

export default function SlopeFieldLab() {
  const [initialX, setInitialX] = useState(-1.5);
  const [initialY, setInitialY] = useState(1);
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
      const padding = 28;
      const plotWidth = width - 2 * padding;
      const plotHeight = height - 2 * padding;
      const toCanvasX = (x: number) => padding + ((x + LIMIT) / (2 * LIMIT)) * plotWidth;
      const toCanvasY = (y: number) => padding + ((LIMIT - y) / (2 * LIMIT)) * plotHeight;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(15, 56, 67, 0.09)";
      context.lineWidth = 1;
      for (let value = -4; value <= 4; value += 1) {
        context.beginPath();
        context.moveTo(toCanvasX(value), padding);
        context.lineTo(toCanvasX(value), height - padding);
        context.moveTo(padding, toCanvasY(value));
        context.lineTo(width - padding, toCanvasY(value));
        context.stroke();
      }

      context.strokeStyle = "#48646c";
      context.lineWidth = 1.4;
      context.beginPath();
      context.moveTo(padding, toCanvasY(0));
      context.lineTo(width - padding, toCanvasY(0));
      context.moveTo(toCanvasX(0), padding);
      context.lineTo(toCanvasX(0), height - padding);
      context.stroke();

      context.strokeStyle = "rgba(133, 145, 48, 0.62)";
      context.lineWidth = 1.35;
      for (let x = -3.75; x <= 3.75; x += 0.5) {
        for (let y = -3.75; y <= 3.75; y += 0.5) {
          const slope = x - y;
          const norm = Math.sqrt(1 + slope * slope);
          const dx = 0.16 / norm;
          const dy = (0.16 * slope) / norm;
          context.beginPath();
          context.moveTo(toCanvasX(x - dx), toCanvasY(y - dy));
          context.lineTo(toCanvasX(x + dx), toCanvasY(y + dy));
          context.stroke();
        }
      }

      const constant = (initialY - initialX + 1) * Math.exp(initialX);
      context.strokeStyle = "#047b9a";
      context.lineWidth = 3.5;
      context.beginPath();
      let started = false;
      for (let index = 0; index <= 520; index += 1) {
        const x = -LIMIT + (2 * LIMIT * index) / 520;
        const y = x - 1 + constant * Math.exp(-x);
        if (y < -LIMIT || y > LIMIT) {
          started = false;
          continue;
        }
        if (!started) {
          context.moveTo(toCanvasX(x), toCanvasY(y));
          started = true;
        } else {
          context.lineTo(toCanvasX(x), toCanvasY(y));
        }
      }
      context.stroke();

      const pointX = toCanvasX(initialX);
      const pointY = toCanvasY(initialY);
      context.fillStyle = "#efad8e";
      context.beginPath();
      context.arc(pointX, pointY, 6, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = "#0f3843";
      context.lineWidth = 1.5;
      context.stroke();

      context.fillStyle = "#48646c";
      context.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.fillText("x", width - padding - 2, toCanvasY(0) - 8);
      context.fillText("y", toCanvasX(0) + 8, padding + 2);
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [initialX, initialY]);

  function moveInitialPoint(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = event.currentTarget;
    const bounds = canvas.getBoundingClientRect();
    const padding = 28;
    const x = ((event.clientX - bounds.left - padding) / (bounds.width - 2 * padding)) * 2 * LIMIT - LIMIT;
    const y = LIMIT - ((event.clientY - bounds.top - padding) / (bounds.height - 2 * padding)) * 2 * LIMIT;
    setInitialX(Math.max(-3.5, Math.min(3.5, Math.round(x * 4) / 4)));
    setInitialY(Math.max(-3.5, Math.min(3.5, Math.round(y * 4) / 4)));
  }

  return (
    <section className="edo-slope-field" aria-labelledby="edo-slope-field-title">
      <header>
        <div>
          <span>EXPLORACIÓN · INFORMACIÓN LOCAL</span>
          <h4 id="edo-slope-field-title">Del campo de pendientes a una solución</h4>
        </div>
        <strong>y′ = x − y</strong>
      </header>

      <div className="edo-slope-field-controls">
        <label>
          <span>x₀ <output>{initialX.toFixed(2)}</output></span>
          <input type="range" min="-3.5" max="3.5" step="0.25" value={initialX} onChange={(event) => setInitialX(Number(event.target.value))} />
        </label>
        <label>
          <span>y₀ <output>{initialY.toFixed(2)}</output></span>
          <input type="range" min="-3.5" max="3.5" step="0.25" value={initialY} onChange={(event) => setInitialY(Number(event.target.value))} />
        </label>
      </div>

      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Campo de pendientes de y prima igual a x menos y, con la solución que pasa por ${initialX}, ${initialY}`}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          moveInitialPoint(event);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) moveInitialPoint(event);
        }}
      />

      <p>
        Cada segmento entrega una pendiente local. Arrastra el punto inicial —o usa los controles— y observa cómo la curva azul sigue esas direcciones para formar una solución completa.
      </p>
    </section>
  );
}
