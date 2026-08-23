"use client";

import { useEffect, useRef, useState } from "react";

const T_MAX = 10;

function signalAt(t: number, first: number, second: number) {
  if (t < first) return 2;
  if (t < second) return -7;
  return 12;
}

export default function HeavisideLaplaceLab() {
  const [first, setFirst] = useState(2.5);
  const [second, setSecond] = useState(7);
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
        return next > T_MAX ? 0 : next;
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
      const left = 56;
      const right = width - 28;
      const top = 42;
      const bottom = height - 48;
      const toX = (t: number) => left + (t / T_MAX) * (right - left);
      const toY = (value: number) => top + ((14 - value) / 25) * (bottom - top);

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(15,56,67,.10)";
      context.lineWidth = 1;
      for (let tick = 0; tick <= T_MAX; tick += 1) {
        context.beginPath();
        context.moveTo(toX(tick), top);
        context.lineTo(toX(tick), bottom);
        context.stroke();
      }
      [-7, 0, 2, 12].forEach((value) => {
        context.beginPath();
        context.moveTo(left, toY(value));
        context.lineTo(right, toY(value));
        context.stroke();
      });

      context.strokeStyle = "#48646c";
      context.lineWidth = 1.5;
      context.beginPath();
      context.moveTo(left, top);
      context.lineTo(left, bottom);
      context.lineTo(right, bottom);
      context.stroke();

      context.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.fillStyle = "#48646c";
      context.textAlign = "center";
      for (let tick = 0; tick <= T_MAX; tick += 2) {
        context.fillText(String(tick), toX(tick), bottom + 19);
      }
      context.textAlign = "right";
      [-7, 0, 2, 12].forEach((value) => context.fillText(String(value), left - 10, toY(value) + 4));
      context.textAlign = "left";
      context.fillText("t", right + 8, bottom + 4);
      context.fillText("h(t)", left - 4, top - 14);

      [first, second].forEach((point, index) => {
        context.setLineDash([5, 5]);
        context.strokeStyle = index === 0 ? "rgba(239,173,142,.85)" : "rgba(133,145,48,.78)";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(toX(point), top);
        context.lineTo(toX(point), bottom);
        context.stroke();
        context.setLineDash([]);
      });

      context.strokeStyle = "rgba(4,123,154,.22)";
      context.lineWidth = 7;
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(toX(0), toY(2));
      context.lineTo(toX(first), toY(2));
      context.lineTo(toX(first), toY(-7));
      context.lineTo(toX(second), toY(-7));
      context.lineTo(toX(second), toY(12));
      context.lineTo(toX(T_MAX), toY(12));
      context.stroke();

      const drawSegment = (start: number, end: number, value: number) => {
        if (time <= start) return;
        context.strokeStyle = "#047b9a";
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(toX(start), toY(value));
        context.lineTo(toX(Math.min(time, end)), toY(value));
        context.stroke();
      };
      drawSegment(0, first, 2);
      drawSegment(first, second, -7);
      drawSegment(second, T_MAX, 12);

      if (time >= first) {
        context.strokeStyle = "#047b9a";
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(toX(first), toY(2));
        context.lineTo(toX(first), toY(-7));
        context.stroke();
      }
      if (time >= second) {
        context.beginPath();
        context.moveTo(toX(second), toY(-7));
        context.lineTo(toX(second), toY(12));
        context.stroke();
      }

      const current = signalAt(time, first, second);
      context.fillStyle = "#efad8e";
      context.beginPath();
      context.arc(toX(time), toY(current), 6, 0, Math.PI * 2);
      context.fill();

      context.textAlign = "center";
      context.font = "700 11px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.fillStyle = "#9d634b";
      context.fillText(`−9 H(t − ${first.toFixed(1)})`, toX(first), top + 16);
      context.fillStyle = "#6d7629";
      context.fillText(`+19 H(t − ${second.toFixed(1)})`, toX(second), top + 16);
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [first, second, time]);

  const changeFirst = (value: number) => {
    setPlaying(false);
    setFirst(value);
    if (second <= value + 0.5) setSecond(Math.min(T_MAX - 0.5, value + 0.5));
    setTime(0);
  };

  return (
    <section className="edo-heaviside-lab" aria-labelledby="edo-heaviside-title">
      <header>
        <div>
          <span>EXPLORACIÓN · SEÑALES POR TRAMOS</span>
          <h4 id="edo-heaviside-title">Construir una señal con escalones</h4>
        </div>
        <strong>h(t) = 2 − 9H(t − t₁) + 19H(t − t₂)</strong>
      </header>

      <div className="edo-heaviside-controls">
        <label>
          <span>Primer salto t₁</span>
          <output>{first.toFixed(1)}</output>
          <input type="range" min="1" max="7.5" step="0.1" value={first} onChange={(event) => changeFirst(Number(event.target.value))} />
        </label>
        <label>
          <span>Segundo salto t₂</span>
          <output>{second.toFixed(1)}</output>
          <input type="range" min={first + 0.5} max="9.5" step="0.1" value={second} onChange={(event) => { setPlaying(false); setSecond(Number(event.target.value)); setTime(0); }} />
        </label>
        <label>
          <span>Recorrer el tiempo</span>
          <output>{time.toFixed(1)}</output>
          <input type="range" min="0" max={T_MAX} step="0.02" value={time} onChange={(event) => { setPlaying(false); setTime(Number(event.target.value)); }} />
        </label>
        <button type="button" onClick={() => setPlaying((value) => !value)} aria-pressed={playing}>{playing ? "Pausar" : "Animar"}</button>
      </div>

      <canvas ref={canvasRef} role="img" aria-label="Señal escalonada construida mediante dos funciones de Heaviside" />
      <div className="edo-heaviside-transform">
        <span>EN EL DOMINIO DE LAPLACE</span>
        <strong>ℒ&#123;h&#125;(s) = 2/s − 9e<sup>−t₁s</sup>/s + 19e<sup>−t₂s</sup>/s</strong>
        <p>Cada desplazamiento temporal aparece como un factor exponencial. Mover un salto en la señal cambia ese factor, pero no la magnitud del salto.</p>
      </div>
    </section>
  );
}
