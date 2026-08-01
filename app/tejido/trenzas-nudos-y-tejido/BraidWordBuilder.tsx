"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Generator = { index: 1 | 2; sign: 1 | -1 };

const strandColors = ["#007190", "#837e31", "#d58f72"];

function symbol(generator: Generator) {
  return `σ${generator.index}${generator.sign === -1 ? "⁻¹" : ""}`;
}

function freelyReduce(word: Generator[]) {
  const reduced: Generator[] = [];
  for (const generator of word) {
    const previous = reduced.at(-1);
    if (previous && previous.index === generator.index && previous.sign === -generator.sign) reduced.pop();
    else reduced.push(generator);
  }
  return reduced;
}

export default function BraidWordBuilder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [word, setWord] = useState<Generator[]>([]);
  const reduced = useMemo(() => freelyReduce(word), [word]);
  const wordLabel = word.length ? word.map(symbol).join(" ") : "e";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const scale = window.devicePixelRatio || 1;
    const width = Math.max(620, canvas.clientWidth);
    const height = 330;
    canvas.width = width * scale;
    canvas.height = height * scale;
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, width, height);

    const left = 58;
    const right = width - 58;
    const top = 52;
    const bottom = 278;
    const stepWidth = word.length ? (right - left) / word.length : right - left;
    const laneY = [92, 165, 238];
    const order = [0, 1, 2];

    context.fillStyle = "#557078";
    context.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
    context.fillText("inicio", left, 27);
    context.fillText("resultado", right - 63, 27);

    if (!word.length) {
      strandColors.forEach((color, index) => {
        context.beginPath();
        context.moveTo(left, laneY[index]);
        context.lineTo(right, laneY[index]);
        context.strokeStyle = color;
        context.lineWidth = 8;
        context.lineCap = "round";
        context.stroke();
      });
    }

    word.forEach((generator, step) => {
      const x0 = left + step * stepWidth;
      const x1 = left + (step + 1) * stepWidth;
      const crossing = generator.index - 1;
      const before = [...order];
      [order[crossing], order[crossing + 1]] = [order[crossing + 1], order[crossing]];

      before.forEach((strand, lane) => {
        const nextLane = order.indexOf(strand);
        context.beginPath();
        context.moveTo(x0, laneY[lane]);
        context.bezierCurveTo(x0 + stepWidth * .42, laneY[lane], x1 - stepWidth * .42, laneY[nextLane], x1, laneY[nextLane]);
        context.strokeStyle = strandColors[strand];
        context.lineWidth = 8;
        context.lineCap = "round";
        context.stroke();
      });

      const overLane = generator.sign === 1 ? crossing : crossing + 1;
      const overStrand = before[overLane];
      const nextOverLane = order.indexOf(overStrand);
      context.beginPath();
      context.moveTo(x0 + stepWidth * .34, laneY[overLane] + (laneY[nextOverLane] - laneY[overLane]) * .27);
      context.bezierCurveTo(x0 + stepWidth * .45, laneY[overLane], x1 - stepWidth * .45, laneY[nextOverLane], x0 + stepWidth * .66, laneY[overLane] + (laneY[nextOverLane] - laneY[overLane]) * .73);
      context.strokeStyle = "white";
      context.lineWidth = 15;
      context.stroke();
      context.strokeStyle = strandColors[overStrand];
      context.lineWidth = 8;
      context.stroke();

      context.fillStyle = "#12343d";
      context.font = "12px Georgia, serif";
      context.textAlign = "center";
      context.fillText(symbol(generator), x0 + stepWidth / 2, bottom + 30);
    });

    context.textAlign = "left";
    ["1", "2", "3"].forEach((label, index) => {
      context.fillStyle = strandColors[index];
      context.font = "700 12px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.fillText(label, 28, laneY[index] + 4);
      const finalLane = order.indexOf(index);
      context.fillText(label, width - 34, laneY[finalLane] + 4);
    });
  }, [word]);

  function add(index: 1 | 2, sign: 1 | -1) {
    setWord((current) => current.length < 10 ? [...current, { index, sign }] : current);
  }

  return (
    <section className="braid-builder" aria-labelledby="braid-builder-title">
      <header>
        <p>EXPLORACIÓN INTERACTIVA</p>
        <h2 id="braid-builder-title">Escribe una palabra con cruces</h2>
        <p>Lee la trenza de izquierda a derecha. σᵢ cruza la hebra i sobre la siguiente; σᵢ⁻¹ invierte ese cruce.</p>
      </header>
      <div className="braid-controls" aria-label="Generadores del grupo de trenzas B3">
        <button type="button" onClick={() => add(1, 1)}>σ₁</button>
        <button type="button" onClick={() => add(1, -1)}>σ₁⁻¹</button>
        <button type="button" onClick={() => add(2, 1)}>σ₂</button>
        <button type="button" onClick={() => add(2, -1)}>σ₂⁻¹</button>
        <button type="button" className="secondary" disabled={!word.length} onClick={() => setWord((current) => current.slice(0, -1))}>Deshacer</button>
        <button type="button" className="secondary" disabled={!word.length} onClick={() => setWord([])}>Limpiar</button>
      </div>
      <div className="braid-canvas-wrap">
        <canvas ref={canvasRef} role="img" aria-label={`Diagrama de la palabra ${wordLabel} en el grupo de trenzas de tres hebras`} />
      </div>
      <div className="braid-word" aria-live="polite">
        <span>Palabra</span><strong>{wordLabel}</strong>
        <span>Reducción inmediata</span><strong>{reduced.length ? reduced.map(symbol).join(" ") : "e"}</strong>
      </div>
      <p className="braid-builder-note">La reducción elimina solamente pares vecinos σᵢσᵢ⁻¹. Dos palabras distintas todavía pueden representar la misma trenza mediante las relaciones del grupo.</p>
    </section>
  );
}
