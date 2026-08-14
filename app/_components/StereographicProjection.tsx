"use client";

import { useEffect, useRef, useState } from "react";

const radians = (degrees: number) => degrees * Math.PI / 180;
const tidy = (value: number) => Math.abs(value) < 0.005 ? "0.00" : value.toFixed(2);

export default function StereographicProjection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theta, setTheta] = useState(78);
  const [phi, setPhi] = useState(35);
  const [playing, setPlaying] = useState(false);

  const angle = radians(theta);
  const longitude = radians(phi);
  const x = Math.sin(angle) * Math.cos(longitude);
  const y = Math.sin(angle) * Math.sin(longitude);
  const z = Math.cos(angle);
  const projectedX = x / (1 - z);
  const projectedY = y / (1 - z);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setTheta((current) => current <= 36 ? 170 : current - 1.2);
    }, 55);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * ratio);
      canvas.height = Math.round(bounds.height * ratio);
      const context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const width = bounds.width;
      const height = bounds.height;
      const split = width * 0.56;
      const ink = "#153640";
      const blue = "#007d9d";
      const pale = "#d9e8ea";
      const olive = "#7e812d";
      context.clearRect(0, 0, width, height);

      context.strokeStyle = pale;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(split, 22);
      context.lineTo(split, height - 22);
      context.stroke();

      context.fillStyle = ink;
      context.font = "700 10px monospace";
      context.fillText("ESFERA · CORTE MERIDIANO", 18, 23);
      context.fillText("PLANO z = 0", split + 22, 23);

      const sphereRadius = Math.min(height * 0.28, width * 0.115);
      const sphereX = Math.max(84, width * 0.145);
      const sphereY = height * 0.53;
      const northX = sphereX;
      const northY = sphereY - sphereRadius;
      const pointX = sphereX + sphereRadius * Math.sin(angle);
      const pointY = sphereY - sphereRadius * Math.cos(angle);
      const projectedRadius = Math.sin(angle) / (1 - Math.cos(angle));
      const planeX = sphereX + sphereRadius * projectedRadius;

      context.fillStyle = "#f5fafb";
      context.strokeStyle = "#8fb1b8";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(sphereX, sphereY, sphereRadius, 0, Math.PI * 2);
      context.fill();
      context.stroke();

      context.strokeStyle = pale;
      context.lineWidth = 1;
      context.beginPath();
      context.ellipse(sphereX, sphereY, sphereRadius, sphereRadius * 0.28, 0, 0, Math.PI * 2);
      context.stroke();

      context.strokeStyle = olive;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(18, sphereY);
      context.lineTo(split - 18, sphereY);
      context.stroke();

      context.strokeStyle = blue;
      context.lineWidth = 2.4;
      context.beginPath();
      context.moveTo(northX, northY);
      context.lineTo(Math.min(planeX, split - 24), sphereY);
      context.stroke();

      const dot = (cx: number, cy: number, radius: number, color: string) => {
        context.fillStyle = color;
        context.beginPath();
        context.arc(cx, cy, radius, 0, Math.PI * 2);
        context.fill();
      };
      dot(northX, northY, 5, ink);
      dot(pointX, pointY, 7, blue);
      dot(Math.min(planeX, split - 24), sphereY, 7, olive);

      context.font = "12px sans-serif";
      context.fillStyle = ink;
      context.fillText("N", northX - 20, northY - 7);
      context.fillStyle = blue;
      context.fillText("P", pointX + 10, pointY - 7);
      context.fillStyle = olive;
      context.fillText(planeX > split - 24 ? "p →" : "p", Math.min(planeX, split - 24) + 9, sphereY + 18);

      const panelX = split + 22;
      const panelWidth = width - panelX - 18;
      const planeCenterX = panelX + panelWidth / 2;
      const planeCenterY = height * 0.55;
      const range = Math.max(2.5, Math.ceil(Math.max(Math.abs(projectedX), Math.abs(projectedY))));
      const scale = Math.min((panelWidth - 30) / (range * 2), (height - 85) / (range * 2));

      context.strokeStyle = "#e5edef";
      context.lineWidth = 1;
      for (let index = -range; index <= range; index += 1) {
        context.beginPath();
        context.moveTo(planeCenterX + index * scale, planeCenterY - range * scale);
        context.lineTo(planeCenterX + index * scale, planeCenterY + range * scale);
        context.stroke();
        context.beginPath();
        context.moveTo(planeCenterX - range * scale, planeCenterY + index * scale);
        context.lineTo(planeCenterX + range * scale, planeCenterY + index * scale);
        context.stroke();
      }
      context.strokeStyle = "#9ab4ba";
      context.lineWidth = 1.5;
      context.beginPath();
      context.moveTo(planeCenterX - range * scale, planeCenterY);
      context.lineTo(planeCenterX + range * scale, planeCenterY);
      context.moveTo(planeCenterX, planeCenterY - range * scale);
      context.lineTo(planeCenterX, planeCenterY + range * scale);
      context.stroke();

      context.strokeStyle = "#b8ced2";
      context.beginPath();
      context.arc(planeCenterX, planeCenterY, scale, 0, Math.PI * 2);
      context.stroke();

      const imageX = planeCenterX + projectedX * scale;
      const imageY = planeCenterY - projectedY * scale;
      context.strokeStyle = blue;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(planeCenterX, planeCenterY);
      context.lineTo(imageX, imageY);
      context.stroke();
      dot(imageX, imageY, 7, blue);
      context.fillStyle = blue;
      context.font = "12px sans-serif";
      context.fillText(`p = (${tidy(projectedX)}, ${tidy(projectedY)})`, panelX, height - 16);
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [angle, projectedX, projectedY]);

  return (
    <figure className="stereo-explorer">
      <figcaption>
        <span>EXPLORACIÓN · PROYECCIÓN ESTEREOGRÁFICA</span>
        <strong>Del polo norte al plano</strong>
        <p>La recta que une el polo norte N con un punto P de la esfera corta el plano en su imagen p. Acerca P al polo para ver cómo su imagen se aleja.</p>
      </figcaption>
      <canvas
        ref={canvasRef}
        className="stereo-canvas"
        aria-label={`Proyección del punto P en la esfera al punto p igual a ${tidy(projectedX)}, ${tidy(projectedY)} en el plano`}
      />
      <div className="stereo-controls">
        <label>
          <span>Colatitud θ <strong>{theta.toFixed(0)}°</strong></span>
          <input type="range" min="35" max="170" step="1" value={theta} onChange={(event) => { setPlaying(false); setTheta(Number(event.target.value)); }} />
        </label>
        <label>
          <span>Longitud φ <strong>{phi.toFixed(0)}°</strong></span>
          <input type="range" min="-180" max="180" step="1" value={phi} onChange={(event) => setPhi(Number(event.target.value))} />
        </label>
        <button type="button" onClick={() => setPlaying((value) => !value)} aria-pressed={playing}>
          {playing ? "Pausar" : "Animar"}
        </button>
      </div>
      <p className="stereo-result" aria-live="polite">
        P = ({tidy(x)}, {tidy(y)}, {tidy(z)}) <span>↦</span> p = ({tidy(projectedX)}, {tidy(projectedY)})
      </p>
    </figure>
  );
}
