"use client";

import { useEffect, useRef, useState } from "react";

const MAX_TERMS = 15;

function partialSum(x: number, terms: number) {
  let value = 0;
  for (let index = 0; index < terms; index += 1) {
    const harmonic = 2 * index + 1;
    value += Math.sin(harmonic * x) / harmonic;
  }
  return (4 / Math.PI) * value;
}

export default function FourierSeriesLab() {
  const [terms, setTerms] = useState(3);
  const [playing, setPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setTerms((value) => (value >= MAX_TERMS ? 1 : value + 1));
    }, 850);
    return () => window.clearInterval(timer);
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
      const left = 58;
      const right = width - 28;
      const top = 38;
      const plotBottom = height * 0.69;
      const spectrumTop = height * 0.79;
      const spectrumBottom = height - 35;
      const toX = (x: number) => left + ((x + Math.PI) / (2 * Math.PI)) * (right - left);
      const toY = (y: number) => top + ((1.45 - y) / 2.9) * (plotBottom - top);

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(15,56,67,.10)";
      context.lineWidth = 1;
      [-1, 0, 1].forEach((value) => {
        context.beginPath();
        context.moveTo(left, toY(value));
        context.lineTo(right, toY(value));
        context.stroke();
      });
      [-Math.PI, -Math.PI / 2, 0, Math.PI / 2, Math.PI].forEach((value) => {
        context.beginPath();
        context.moveTo(toX(value), top);
        context.lineTo(toX(value), plotBottom);
        context.stroke();
      });

      context.strokeStyle = "#48646c";
      context.lineWidth = 1.4;
      context.beginPath();
      context.moveTo(left, toY(0));
      context.lineTo(right, toY(0));
      context.moveTo(toX(0), top);
      context.lineTo(toX(0), plotBottom);
      context.stroke();

      context.setLineDash([6, 5]);
      context.strokeStyle = "rgba(133,145,48,.72)";
      context.lineWidth = 2.4;
      context.beginPath();
      context.moveTo(toX(-Math.PI), toY(-1));
      context.lineTo(toX(0), toY(-1));
      context.moveTo(toX(0), toY(1));
      context.lineTo(toX(Math.PI), toY(1));
      context.stroke();
      context.setLineDash([]);

      context.strokeStyle = "#047b9a";
      context.lineWidth = 3;
      context.beginPath();
      const samples = 620;
      for (let index = 0; index <= samples; index += 1) {
        const x = -Math.PI + (2 * Math.PI * index) / samples;
        const y = partialSum(x, terms);
        if (index === 0) context.moveTo(toX(x), toY(y));
        else context.lineTo(toX(x), toY(y));
      }
      context.stroke();

      context.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.fillStyle = "#48646c";
      context.textAlign = "center";
      const ticks: Array<[number, string]> = [[-Math.PI, "−π"], [-Math.PI / 2, "−π/2"], [0, "0"], [Math.PI / 2, "π/2"], [Math.PI, "π"]];
      ticks.forEach(([value, label]) => context.fillText(label, toX(value), plotBottom + 20));
      context.textAlign = "right";
      [-1, 0, 1].forEach((value) => context.fillText(String(value), left - 10, toY(value) + 4));
      context.textAlign = "left";
      context.fillText("función cuadrada", left, top - 13);
      context.fillStyle = "#047b9a";
      context.fillText(`suma parcial con ${terms} ${terms === 1 ? "armónico" : "armónicos"}`, left + 116, top - 13);

      context.fillStyle = "#48646c";
      context.fillText("coeficientes |bₙ|", left, spectrumTop - 10);
      const available = right - left;
      const barGap = available / MAX_TERMS;
      for (let index = 0; index < MAX_TERMS; index += 1) {
        const harmonic = 2 * index + 1;
        const coefficient = 4 / (Math.PI * harmonic);
        const barHeight = coefficient * (spectrumBottom - spectrumTop) * 0.72;
        const x = left + index * barGap + barGap * 0.2;
        context.fillStyle = index < terms ? "#047b9a" : "rgba(4,123,154,.14)";
        context.fillRect(x, spectrumBottom - barHeight, Math.max(3, barGap * 0.58), barHeight);
        if (index < 6 || index === terms - 1) {
          context.fillStyle = "#48646c";
          context.textAlign = "center";
          context.fillText(String(harmonic), x + Math.max(3, barGap * 0.58) / 2, spectrumBottom + 17);
        }
      }
      context.textAlign = "right";
      context.fillText("armónico n", right, spectrumBottom + 17);
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [terms]);

  return (
    <section className="edo-fourier-lab" aria-labelledby="edo-fourier-title">
      <header>
        <div>
          <span>EXPLORACIÓN · SERIES DE FOURIER</span>
          <h4 id="edo-fourier-title">Construir una función con armónicos</h4>
        </div>
        <strong>S<sub>N</sub>(x) = 4/π ∑ sin((2k+1)x)/(2k+1)</strong>
      </header>

      <div className="edo-fourier-controls">
        <label>
          <span>Número de armónicos</span>
          <output aria-live="polite">{terms}</output>
          <input type="range" min="1" max={MAX_TERMS} step="1" value={terms} onChange={(event) => { setPlaying(false); setTerms(Number(event.target.value)); }} />
        </label>
        <button type="button" onClick={() => setPlaying((value) => !value)} aria-pressed={playing}>{playing ? "Pausar" : "Sumar término a término"}</button>
      </div>

      <canvas ref={canvasRef} role="img" aria-label={`Aproximación de una función cuadrada mediante ${terms} armónicos impares de su serie de Fourier`} />
      <div className="edo-fourier-note">
        <span>ARMÓNICO ACTUAL</span>
        <strong>n = {2 * terms - 1} · amplitud = 4/({2 * terms - 1}π)</strong>
        <p>Los armónicos de frecuencia cada vez mayor afinan los tramos planos y concentran la diferencia cerca del salto. La pequeña sobreoscilación que permanece allí es el fenómeno de Gibbs.</p>
      </div>
    </section>
  );
}
