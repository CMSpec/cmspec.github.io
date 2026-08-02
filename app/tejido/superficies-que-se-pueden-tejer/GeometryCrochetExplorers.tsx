"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function prepareCanvas(canvas: HTMLCanvasElement) {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  return { context, width, height };
}

function useResize(redraw: () => void) {
  useEffect(() => {
    window.addEventListener("resize", redraw);
    return () => window.removeEventListener("resize", redraw);
  }, [redraw]);
}

export function CircleEquationExplorer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [centerX, setCenterX] = useState(1);
  const [centerY, setCenterY] = useState(-1);
  const [radius, setRadius] = useState(2);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const prepared = prepareCanvas(canvas);
    if (!prepared) return;
    const { context: ctx, width, height } = prepared;
    const scale = Math.min(width / 12, height / 8);
    const ox = width / 2;
    const oy = height / 2;

    ctx.strokeStyle = "rgba(18,52,61,.11)";
    ctx.lineWidth = 1;
    for (let x = -6; x <= 6; x += 1) {
      ctx.beginPath(); ctx.moveTo(ox + x * scale, 0); ctx.lineTo(ox + x * scale, height); ctx.stroke();
    }
    for (let y = -4; y <= 4; y += 1) {
      ctx.beginPath(); ctx.moveTo(0, oy - y * scale); ctx.lineTo(width, oy - y * scale); ctx.stroke();
    }
    ctx.strokeStyle = "#557078";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(width, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, height); ctx.stroke();

    const cx = ox + centerX * scale;
    const cy = oy - centerY * scale;
    ctx.fillStyle = "rgba(253,212,189,.28)";
    ctx.strokeStyle = "#007190";
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(cx, cy, radius * scale, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#837e31";
    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#837e31";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 5]);
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + radius * scale, cy); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#12343d";
    ctx.font = "13px Georgia, serif";
    ctx.fillText(`(${centerX}, ${centerY})`, cx + 10, cy - 10);
    ctx.fillText(`r = ${radius.toFixed(1)}`, cx + radius * scale / 2 - 16, cy - 10);
  }, [centerX, centerY, radius]);

  useEffect(draw, [draw]);
  useResize(draw);
  const signed = (value: number) => value === 0 ? "x" : value > 0 ? `(x−${value})` : `(x+${Math.abs(value)})`;
  const signedY = (value: number) => value === 0 ? "y" : value > 0 ? `(y−${value})` : `(y+${Math.abs(value)})`;

  return (
    <figure className="geometry-lab circle-lab">
      <header>
        <p>EXPLORACIÓN 01 · ECUACIÓN Y FORMA</p>
        <h3>Mueve el círculo</h3>
        <p>Cambia el centro y el radio. La figura y su ecuación describen el mismo objeto en dos lenguajes.</p>
      </header>
      <canvas ref={canvasRef} aria-label="Plano cartesiano con un círculo cuyo centro y radio se pueden modificar" />
      <div className="geometry-equation" aria-live="polite">{signed(centerX)}² + {signedY(centerY)}² = {radius.toFixed(1)}²</div>
      <div className="geometry-controls">
        <label>Centro a <strong>{centerX}</strong><input type="range" min="-3" max="3" step="1" value={centerX} onChange={(event) => setCenterX(Number(event.target.value))} /></label>
        <label>Centro b <strong>{centerY}</strong><input type="range" min="-2" max="2" step="1" value={centerY} onChange={(event) => setCenterY(Number(event.target.value))} /></label>
        <label>Radio r <strong>{radius.toFixed(1)}</strong><input type="range" min="0.8" max="3" step="0.1" value={radius} onChange={(event) => setRadius(Number(event.target.value))} /></label>
      </div>
      <figcaption>Cada punto de la circunferencia está exactamente a distancia r del centro (a,b).</figcaption>
    </figure>
  );
}

export function CrochetCurvatureExplorer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [interval, setInterval] = useState(4);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const prepared = prepareCanvas(canvas);
    if (!prepared) return;
    const { context: ctx, width, height } = prepared;
    const cx = width / 2;
    const cy = height / 2 + 8;
    const maxR = Math.min(width * .4, height * .43);
    const ruffle = (9 - interval) * .85;
    ctx.fillStyle = "#fffaf6";
    ctx.fillRect(0, 0, width, height);

    for (let ring = 10; ring >= 1; ring -= 1) {
      const base = maxR * ring / 10;
      ctx.beginPath();
      for (let i = 0; i <= 260; i += 1) {
        const theta = i / 260 * Math.PI * 2;
        const wave = Math.sin(theta * (3 + ring * .52)) * ruffle * (ring / 10) * 2.3;
        const secondary = Math.sin(theta * 2 - ring * .7) * ruffle * .55;
        const radius = base + wave + secondary;
        const x = cx + Math.cos(theta) * radius;
        const y = cy + Math.sin(theta) * radius * .54 + Math.sin(theta * 4 + ring) * ruffle * .35;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = ring % 2 ? "rgba(253,212,189,.24)" : "rgba(175,212,114,.13)";
      ctx.fill();
      ctx.strokeStyle = ring % 2 ? "rgba(168,95,69,.74)" : "rgba(0,113,144,.62)";
      ctx.lineWidth = ring === 10 ? 3.2 : 1.25;
      ctx.stroke();
    }

    ctx.fillStyle = "#12343d";
    ctx.font = "600 11px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.textAlign = "center";
    ctx.fillText(`AUMENTAR 1 PUNTO CADA ${interval}`, cx, 22);
  }, [interval]);

  useEffect(draw, [draw]);
  useResize(draw);
  const intensity = interval <= 3 ? "muy plegada" : interval <= 5 ? "visiblemente ondulada" : "suavemente ondulada";

  return (
    <figure className="geometry-lab crochet-lab">
      <header>
        <p>EXPLORACIÓN 02 · CRECIMIENTO</p>
        <h3>Tejer más espacio</h3>
        <p>Un aumento regular hace que cada vuelta contenga más puntos de los que cabrían en un disco plano.</p>
      </header>
      <canvas ref={canvasRef} aria-label="Modelo ilustrativo de una superficie tejida que se ondula al aumentar puntos regularmente" />
      <div className="crochet-control">
        <label>Aumentar un punto cada <strong>{interval}</strong> puntos<input type="range" min="2" max="8" step="1" value={interval} onChange={(event) => setInterval(Number(event.target.value))} /></label>
        <p aria-live="polite">Más aumentos producen una superficie <strong>{intensity}</strong>.</p>
      </div>
      <figcaption>Esquema conceptual: el tejido real depende también del punto, el hilo y la tensión. La ondulación hace perceptible el crecimiento propio de una geometría de curvatura negativa.</figcaption>
    </figure>
  );
}
