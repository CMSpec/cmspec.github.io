"use client";

import { useEffect, useRef, useState } from "react";

const FAMILY_VALUES = [-3, -2, -1, 0, 1, 2, 3];

export default function SolutionFamilyLab() {
  const [constant, setConstant] = useState(1);
  const [evaluationX, setEvaluationX] = useState(0);
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
      const padding = { left: 46, right: 24, top: 22, bottom: 36 };
      const plotWidth = width - padding.left - padding.right;
      const plotHeight = height - padding.top - padding.bottom;
      const xMin = -2 * Math.PI;
      const xMax = 2 * Math.PI;
      const yMin = -5;
      const yMax = 5;
      const xToCanvas = (x: number) => padding.left + ((x - xMin) / (xMax - xMin)) * plotWidth;
      const yToCanvas = (y: number) => padding.top + ((yMax - y) / (yMax - yMin)) * plotHeight;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(15, 56, 67, 0.10)";
      context.lineWidth = 1;
      for (let x = -2 * Math.PI; x <= 2 * Math.PI; x += Math.PI / 2) {
        context.beginPath();
        context.moveTo(xToCanvas(x), padding.top);
        context.lineTo(xToCanvas(x), height - padding.bottom);
        context.stroke();
      }
      for (let y = -4; y <= 4; y += 1) {
        context.beginPath();
        context.moveTo(padding.left, yToCanvas(y));
        context.lineTo(width - padding.right, yToCanvas(y));
        context.stroke();
      }

      context.strokeStyle = "#48646c";
      context.lineWidth = 1.5;
      context.beginPath();
      context.moveTo(padding.left, yToCanvas(0));
      context.lineTo(width - padding.right, yToCanvas(0));
      context.moveTo(xToCanvas(0), padding.top);
      context.lineTo(xToCanvas(0), height - padding.bottom);
      context.stroke();

      const drawCurve = (c: number, color: string, lineWidth: number) => {
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.beginPath();
        let started = false;
        for (let index = 0; index <= 260; index += 1) {
          const x = xMin + ((xMax - xMin) * index) / 260;
          const y = Math.sin(x) + c;
          if (y < yMin || y > yMax) {
            started = false;
            continue;
          }
          const canvasX = xToCanvas(x);
          const canvasY = yToCanvas(y);
          if (!started) {
            context.moveTo(canvasX, canvasY);
            started = true;
          } else {
            context.lineTo(canvasX, canvasY);
          }
        }
        context.stroke();
      };

      FAMILY_VALUES.forEach((value) => {
        if (value !== constant) drawCurve(value, "rgba(133, 145, 48, 0.20)", 1.4);
      });
      drawCurve(constant, "#047b9a", 3.5);

      const sharedSlope = Math.cos(evaluationX);
      const tangentHalfWidth = 0.55;
      const guideX = xToCanvas(evaluationX);

      context.save();
      context.setLineDash([4, 5]);
      context.strokeStyle = "rgba(4, 123, 154, 0.28)";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(guideX, padding.top);
      context.lineTo(guideX, height - padding.bottom);
      context.stroke();
      context.restore();

      FAMILY_VALUES.forEach((value) => {
        const pointYValue = Math.sin(evaluationX) + value;
        const isActive = value === constant;
        const tangentStartX = evaluationX - tangentHalfWidth;
        const tangentEndX = evaluationX + tangentHalfWidth;
        const tangentStartY = pointYValue - sharedSlope * tangentHalfWidth;
        const tangentEndY = pointYValue + sharedSlope * tangentHalfWidth;

        context.strokeStyle = isActive ? "#ef8f68" : "rgba(133, 145, 48, 0.78)";
        context.lineWidth = isActive ? 3.4 : 2.1;
        context.beginPath();
        context.moveTo(xToCanvas(tangentStartX), yToCanvas(tangentStartY));
        context.lineTo(xToCanvas(tangentEndX), yToCanvas(tangentEndY));
        context.stroke();

        context.fillStyle = isActive ? "#ef8f68" : "#859130";
        context.beginPath();
        context.arc(guideX, yToCanvas(pointYValue), isActive ? 5.2 : 3.4, 0, Math.PI * 2);
        context.fill();
      });

      context.fillStyle = "#48646c";
      context.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.fillText("x", width - padding.right - 3, yToCanvas(0) - 8);
      context.fillText("y", xToCanvas(0) + 9, padding.top + 4);
      context.fillStyle = "#0f3843";
      context.fillText(`x = ${evaluationX.toFixed(1)}`, Math.min(guideX + 8, width - 86), height - padding.bottom + 23);
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [constant, evaluationX]);

  const sharedSlope = Math.cos(evaluationX);

  return (
    <section className="edo-solution-family" aria-labelledby="edo-solution-family-title">
      <header>
        <div>
          <span>EXPLORACIÓN · FAMILIA DE SOLUCIONES</span>
          <h4 id="edo-solution-family-title">Una constante, una curva distinta</h4>
        </div>
        <strong>y(x) = sin(x) {constant === 0 ? "" : constant > 0 ? `+ ${constant}` : `− ${Math.abs(constant)}`}</strong>
      </header>

      <div className="edo-solution-family-controls">
        <div className="edo-solution-family-control-row">
          <label htmlFor="solution-constant">Constante c</label>
          <input
            id="solution-constant"
            type="range"
            min="-3"
            max="3"
            step="1"
            value={constant}
            onChange={(event) => setConstant(Number(event.target.value))}
          />
          <output htmlFor="solution-constant">c = {constant}</output>
        </div>
        <div className="edo-solution-family-control-row">
          <label htmlFor="slope-position">Comparar en x</label>
          <input
            id="slope-position"
            type="range"
            min={-2 * Math.PI}
            max={2 * Math.PI}
            step="0.1"
            value={evaluationX}
            onChange={(event) => setEvaluationX(Number(event.target.value))}
          />
          <output htmlFor="slope-position">x = {evaluationX.toFixed(1)}</output>
        </div>
        <p className="edo-shared-slope" aria-live="polite">
          Pendiente común: <strong>y′({evaluationX.toFixed(1)}) = cos({evaluationX.toFixed(1)}) = {sharedSlope.toFixed(2)}</strong>
        </p>
      </div>

      <canvas ref={canvasRef} role="img" aria-label={`Familia de soluciones seno de x más c con tangentes paralelas en x igual a ${evaluationX.toFixed(1)} y pendiente ${sharedSlope.toFixed(2)}`} />
      <p>
        Mueve <i>x</i> para recorrer la familia. Los segmentos dibujados en cada curva siempre quedan paralelos porque sumar <i>c</i> desplaza la solución verticalmente, pero no cambia su derivada: todas satisfacen <i>y′ = cos(x)</i>.
      </p>
    </section>
  );
}
