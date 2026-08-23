"use client";

import { useEffect, useRef, useState } from "react";

const T_MAX = 8;
const OMEGA_SQUARED = 4;

function stateAt(t: number, damping: number) {
  const alpha = damping / 2;
  const discriminant = alpha * alpha - OMEGA_SQUARED;

  if (Math.abs(discriminant) < 0.0001) {
    const decay = Math.exp(-alpha * t);
    return {
      y: decay * (1 + alpha * t),
      v: -alpha * alpha * t * decay,
    };
  }

  if (discriminant < 0) {
    const omega = Math.sqrt(-discriminant);
    const decay = Math.exp(-alpha * t);
    const cosine = Math.cos(omega * t);
    const sine = Math.sin(omega * t);
    return {
      y: decay * (cosine + (alpha / omega) * sine),
      v: -decay * ((OMEGA_SQUARED / omega) * sine),
    };
  }

  const root = Math.sqrt(discriminant);
  const r1 = -alpha + root;
  const r2 = -alpha - root;
  const a = -r2 / (r1 - r2);
  const b = r1 / (r1 - r2);
  return {
    y: a * Math.exp(r1 * t) + b * Math.exp(r2 * t),
    v: a * r1 * Math.exp(r1 * t) + b * r2 * Math.exp(r2 * t),
  };
}

function regime(damping: number) {
  if (damping < 3.95) return "subamortiguado";
  if (damping <= 4.05) return "amortiguamiento crítico";
  return "sobreamortiguado";
}

export default function DampedOscillatorLab() {
  const [damping, setDamping] = useState(1.2);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let previous = performance.now();
    const animate = (now: number) => {
      const delta = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      setTime((value) => {
        const next = value + delta;
        return next >= T_MAX ? 0 : next;
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

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
      const current = stateAt(time, damping);

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);

      const springTop = 28;
      const springBottom = Math.min(128, height * 0.3);
      const centerY = (springTop + springBottom) / 2;
      const wallX = 38;
      const equilibriumX = width * 0.48;
      const massX = equilibriumX + current.y * Math.min(72, width * 0.1);
      const massSize = 38;

      context.fillStyle = "rgba(15,56,67,.08)";
      context.fillRect(wallX - 8, springTop, 12, springBottom - springTop);
      context.strokeStyle = "#48646c";
      context.lineWidth = 2;
      for (let y = springTop; y < springBottom; y += 10) {
        context.beginPath();
        context.moveTo(wallX - 8, y + 8);
        context.lineTo(wallX + 4, y);
        context.stroke();
      }

      const springStart = wallX + 4;
      const springEnd = massX - massSize / 2;
      const coils = 12;
      context.strokeStyle = "#047b9a";
      context.lineWidth = 2.4;
      context.beginPath();
      context.moveTo(springStart, centerY);
      for (let index = 1; index < coils; index += 1) {
        const x = springStart + ((springEnd - springStart) * index) / coils;
        const y = centerY + (index % 2 === 0 ? -10 : 10);
        context.lineTo(x, y);
      }
      context.lineTo(springEnd, centerY);
      context.stroke();

      context.fillStyle = "#efad8e";
      context.fillRect(massX - massSize / 2, centerY - massSize / 2, massSize, massSize);
      context.strokeStyle = "#0f3843";
      context.lineWidth = 1.6;
      context.strokeRect(massX - massSize / 2, centerY - massSize / 2, massSize, massSize);

      context.setLineDash([4, 5]);
      context.strokeStyle = "rgba(133,145,48,.7)";
      context.beginPath();
      context.moveTo(equilibriumX, springTop + 4);
      context.lineTo(equilibriumX, springBottom - 4);
      context.stroke();
      context.setLineDash([]);

      context.fillStyle = "#48646c";
      context.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.textAlign = "left";
      context.fillText(`posición y(t) = ${current.y.toFixed(3)}`, Math.min(width - 190, equilibriumX + 92), centerY - 8);
      context.fillText(`velocidad = ${current.v.toFixed(3)}`, Math.min(width - 190, equilibriumX + 92), centerY + 13);

      const chartsTop = springBottom + 30;
      const chartBottom = height - 34;
      const gap = 46;
      const leftX = 45;
      const leftRight = width * 0.59 - gap / 2;
      const rightX = width * 0.59 + gap / 2;
      const rightRight = width - 32;
      const toTimeX = (t: number) => leftX + (t / T_MAX) * (leftRight - leftX);
      const toTimeY = (y: number) => chartsTop + ((1.25 - y) / 2.5) * (chartBottom - chartsTop);
      const toPhaseX = (y: number) => rightX + ((y + 1.25) / 2.5) * (rightRight - rightX);
      const toPhaseY = (v: number) => chartsTop + ((2.5 - v) / 5) * (chartBottom - chartsTop);

      context.strokeStyle = "rgba(15,56,67,.12)";
      context.lineWidth = 1;
      context.strokeRect(leftX, chartsTop, leftRight - leftX, chartBottom - chartsTop);
      context.strokeRect(rightX, chartsTop, rightRight - rightX, chartBottom - chartsTop);
      context.beginPath();
      context.moveTo(leftX, toTimeY(0));
      context.lineTo(leftRight, toTimeY(0));
      context.moveTo(toPhaseX(0), chartsTop);
      context.lineTo(toPhaseX(0), chartBottom);
      context.moveTo(rightX, toPhaseY(0));
      context.lineTo(rightRight, toPhaseY(0));
      context.stroke();

      context.fillStyle = "#48646c";
      context.font = "600 11px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.fillText("posición en el tiempo", leftX, chartsTop - 10);
      context.fillText("retrato de fase: (y, y′)", rightX, chartsTop - 10);

      const drawTrajectory = (until: number, color: string, lineWidth: number) => {
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.beginPath();
        const samples = 360;
        for (let index = 0; index <= samples; index += 1) {
          const t = (until * index) / samples;
          const state = stateAt(t, damping);
          if (index === 0) context.moveTo(toTimeX(t), toTimeY(state.y));
          else context.lineTo(toTimeX(t), toTimeY(state.y));
        }
        context.stroke();

        context.beginPath();
        for (let index = 0; index <= samples; index += 1) {
          const t = (until * index) / samples;
          const state = stateAt(t, damping);
          if (index === 0) context.moveTo(toPhaseX(state.y), toPhaseY(state.v));
          else context.lineTo(toPhaseX(state.y), toPhaseY(state.v));
        }
        context.stroke();
      };

      drawTrajectory(T_MAX, "rgba(133,145,48,.24)", 2);
      drawTrajectory(time, "#047b9a", 3);

      context.fillStyle = "#efad8e";
      context.beginPath();
      context.arc(toTimeX(time), toTimeY(current.y), 5, 0, Math.PI * 2);
      context.fill();
      context.beginPath();
      context.arc(toPhaseX(current.y), toPhaseY(current.v), 5, 0, Math.PI * 2);
      context.fill();
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [damping, time]);

  return (
    <section className="edo-damped-oscillator" aria-labelledby="edo-damped-title">
      <header>
        <div>
          <span>EXPLORACIÓN · ECUACIÓN DE SEGUNDO ORDEN</span>
          <h4 id="edo-damped-title">Del movimiento al retrato de fase</h4>
        </div>
        <strong>y″ + c y′ + 4y = 0</strong>
      </header>

      <div className="edo-damped-controls">
        <label>
          <span>Amortiguamiento c</span>
          <input type="range" min="0" max="7" step="0.1" value={damping} onChange={(event) => { setPlaying(false); setDamping(Number(event.target.value)); setTime(0); }} />
          <output>{damping.toFixed(1)}</output>
        </label>
        <label>
          <span>Tiempo t</span>
          <input type="range" min="0" max={T_MAX} step="0.02" value={time} onChange={(event) => { setPlaying(false); setTime(Number(event.target.value)); }} />
          <output>{time.toFixed(2)}</output>
        </label>
        <button type="button" onClick={() => setPlaying((value) => !value)} aria-pressed={playing}>{playing ? "Pausar" : "Animar"}</button>
      </div>

      <div className="edo-damped-regime">Régimen: <strong>{regime(damping)}</strong>{Math.abs(damping - 4) <= 0.05 ? " · raíz doble" : damping < 4 ? " · raíces complejas" : " · raíces reales distintas"}</div>
      <canvas ref={canvasRef} role="img" aria-label={`Oscilador ${regime(damping)} con coeficiente de amortiguamiento ${damping.toFixed(1)}`} />
      <p>La misma solución se observa como movimiento, gráfica temporal y trayectoria en el plano de fase. El valor crítico c = 4 separa la oscilación del retorno sin oscilaciones.</p>
    </section>
  );
}
