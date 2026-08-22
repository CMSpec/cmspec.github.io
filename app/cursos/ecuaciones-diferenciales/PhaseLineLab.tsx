"use client";

import { useEffect, useRef, useState } from "react";

const Y_MIN = -2;
const Y_MAX = 2;
const T_MAX = 5;

function field(y: number) {
  return y * (1 - y * y);
}

function equilibriumKind(y: number) {
  if (Math.abs(y) < 0.08) return "inestable";
  if (Math.abs(Math.abs(y) - 1) < 0.08) return "estable";
  return "en movimiento";
}

export default function PhaseLineLab() {
  const [initialY, setInitialY] = useState(0.45);
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
      const top = 34;
      const bottom = height - 34;
      const phaseX = Math.max(72, width * 0.18);
      const graphLeft = Math.max(154, width * 0.34);
      const graphRight = width - 34;
      const graphWidth = graphRight - graphLeft;
      const toY = (y: number) => bottom - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * (bottom - top);
      const toX = (t: number) => graphLeft + (t / T_MAX) * graphWidth;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(15, 56, 67, 0.10)";
      context.lineWidth = 1;
      for (let y = -2; y <= 2; y += 0.5) {
        context.beginPath();
        context.moveTo(graphLeft, toY(y));
        context.lineTo(graphRight, toY(y));
        context.stroke();
      }
      for (let t = 0; t <= T_MAX; t += 1) {
        context.beginPath();
        context.moveTo(toX(t), top);
        context.lineTo(toX(t), bottom);
        context.stroke();
      }

      context.strokeStyle = "#48646c";
      context.lineWidth = 1.5;
      context.beginPath();
      context.moveTo(phaseX, top);
      context.lineTo(phaseX, bottom);
      context.moveTo(graphLeft, toY(0));
      context.lineTo(graphRight, toY(0));
      context.stroke();

      const arrow = (y: number, direction: number) => {
        const cy = toY(y);
        const tipY = cy - direction * 12;
        context.strokeStyle = "#047b9a";
        context.fillStyle = "#047b9a";
        context.lineWidth = 2.5;
        context.beginPath();
        context.moveTo(phaseX, cy + direction * 9);
        context.lineTo(phaseX, tipY);
        context.stroke();
        context.beginPath();
        context.moveTo(phaseX, tipY);
        context.lineTo(phaseX - 5, tipY + direction * 7);
        context.lineTo(phaseX + 5, tipY + direction * 7);
        context.closePath();
        context.fill();
      };

      [-1.55, -0.55, 0.55, 1.55].forEach((y) => arrow(y, Math.sign(field(y))));

      [-1, 0, 1].forEach((value) => {
        const stable = value !== 0;
        context.beginPath();
        context.arc(phaseX, toY(value), 7, 0, Math.PI * 2);
        context.fillStyle = stable ? "#91bd69" : "#ffffff";
        context.fill();
        context.strokeStyle = stable ? "#557a31" : "#d87955";
        context.lineWidth = 2.5;
        context.stroke();
      });

      context.fillStyle = "#48646c";
      context.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.textAlign = "center";
      context.fillText("recta de fase", phaseX, 18);
      context.fillText("t", graphRight, toY(0) - 8);
      context.fillText("y(t)", graphLeft + 18, top - 12);
      context.textAlign = "right";
      [-1, 0, 1].forEach((value) => context.fillText(String(value), phaseX - 14, toY(value) + 4));

      let y = initialY;
      const dt = 0.0125;
      context.strokeStyle = "#047b9a";
      context.lineWidth = 3.5;
      context.beginPath();
      context.moveTo(toX(0), toY(y));
      for (let t = dt; t <= T_MAX; t += dt) {
        const k1 = field(y);
        const k2 = field(y + (dt * k1) / 2);
        const k3 = field(y + (dt * k2) / 2);
        const k4 = field(y + dt * k3);
        y += (dt / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
        y = Math.max(Y_MIN, Math.min(Y_MAX, y));
        context.lineTo(toX(t), toY(y));
      }
      context.stroke();

      context.fillStyle = "#efad8e";
      context.beginPath();
      context.arc(toX(0), toY(initialY), 6, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = "#0f3843";
      context.lineWidth = 1.4;
      context.stroke();
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [initialY]);

  const destination = initialY > 0.08 ? "y = 1" : initialY < -0.08 ? "y = −1" : "y = 0";

  return (
    <section className="edo-phase-line" aria-labelledby="edo-phase-line-title">
      <header>
        <div>
          <span>EXPLORACIÓN · EQUILIBRIO Y ESTABILIDAD</span>
          <h4 id="edo-phase-line-title">La recta de fase anticipa la solución</h4>
        </div>
        <strong>y′ = y(1 − y²)</strong>
      </header>

      <div className="edo-phase-line-controls">
        <label>
          <span>Condición inicial y(0)</span>
          <input type="range" min="-1.8" max="1.8" step="0.05" value={initialY} onChange={(event) => setInitialY(Number(event.target.value))} />
          <output>{initialY.toFixed(2)}</output>
        </label>
        <p>Destino: <strong>{destination}</strong> · {equilibriumKind(initialY)}</p>
      </div>

      <canvas ref={canvasRef} role="img" aria-label={`Recta de fase de y prima igual a y por uno menos y cuadrado, con condición inicial ${initialY.toFixed(2)}`} />

      <p>Las flechas indican el signo de y′. Los círculos verdes atraen soluciones; el círculo vacío en y = 0 las repele. Cambia la condición inicial y observa el comportamiento sin resolver primero la ecuación.</p>
    </section>
  );
}
