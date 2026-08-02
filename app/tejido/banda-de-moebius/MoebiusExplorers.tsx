"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Point3 = { x: number; y: number; z: number };

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

function moebiusPoint(theta: number, v: number, radius = 122): Point3 {
  const half = theta / 2;
  return {
    x: (radius + v * Math.cos(half)) * Math.cos(theta),
    y: (radius + v * Math.cos(half)) * Math.sin(theta),
    z: v * Math.sin(half),
  };
}

function project(point: Point3, width: number, height: number, scale = 1) {
  const yaw = -.52;
  const tilt = .46;
  const x1 = point.x * Math.cos(yaw) - point.y * Math.sin(yaw);
  const y1 = point.x * Math.sin(yaw) + point.y * Math.cos(yaw);
  return {
    x: width / 2 + x1 * scale,
    y: height / 2 + point.z * scale - y1 * tilt * scale,
    depth: y1,
  };
}

function useResize(redraw: () => void) {
  useEffect(() => {
    window.addEventListener("resize", redraw);
    return () => window.removeEventListener("resize", redraw);
  }, [redraw]);
}

function drawArrow(ctx: CanvasRenderingContext2D, x: number, y: number, direction: 1 | -1, color: string) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(x, y + 28 * direction); ctx.lineTo(x, y - 28 * direction); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, y - 28 * direction); ctx.lineTo(x - 8, y - 14 * direction); ctx.lineTo(x + 8, y - 14 * direction); ctx.closePath(); ctx.fill();
}

function drawIdentification(canvas: HTMLCanvasElement, progress: number) {
  const prepared = prepareCanvas(canvas);
  if (!prepared) return;
  const { context: ctx, width, height } = prepared;
  ctx.fillStyle = "#fffaf6";
  ctx.fillRect(0, 0, width, height);
  const flatWidth = Math.min(510, width - 70);
  const scale = Math.min(1.16, width / 650);
  const flatPoint = (u: number, v: number): Point3 => ({ x: (u - .5) * flatWidth / scale, y: v, z: 0 });
  const blendPoint = (u: number, v: number) => {
    const a = flatPoint(u, v);
    const b = moebiusPoint(u * Math.PI * 2, v, 122);
    const eased = progress < .5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    return { x: a.x * (1 - eased) + b.x * eased, y: a.y * (1 - eased) + b.y * eased, z: a.z * (1 - eased) + b.z * eased };
  };
  const screen = (u: number, v: number) => project(blendPoint(u, v), width, height + 20, scale);

  for (let band = 0; band < 14; band += 1) {
    const u0 = band / 14;
    const u1 = (band + 1) / 14;
    const a = screen(u0, -48), b = screen(u1, -48), c = screen(u1, 48), d = screen(u0, 48);
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.lineTo(c.x, c.y); ctx.lineTo(d.x, d.y); ctx.closePath();
    ctx.fillStyle = band % 2 ? "rgba(253,212,189,.52)" : "rgba(175,212,114,.24)";
    ctx.fill();
    ctx.strokeStyle = "rgba(18,52,61,.14)"; ctx.lineWidth = 1; ctx.stroke();
  }
  [-48, 0, 48].forEach((v, index) => {
    ctx.beginPath();
    for (let i = 0; i <= 90; i += 1) {
      const p = screen(i / 90, v);
      if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = index === 1 ? "rgba(0,113,144,.62)" : "#12343d";
    ctx.lineWidth = index === 1 ? 2 : 2.7;
    ctx.stroke();
  });

  if (progress < .42) {
    const left = screen(0, 0); const right = screen(1, 0);
    drawArrow(ctx, left.x, left.y, 1, "#007190");
    drawArrow(ctx, right.x, right.y, progress < .18 ? 1 : -1, "#a85f45");
  }
  ctx.fillStyle = "#12343d";
  ctx.font = "600 11px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.textAlign = "center";
  const label = progress < .16 ? "TIRA RECTANGULAR" : progress < .52 ? "MEDIA VUELTA EN UN EXTREMO" : progress < .96 ? "ACERCAR E IDENTIFICAR" : "BANDA DE MÖBIUS";
  ctx.fillText(label, width / 2, height - 18);
}

export function MoebiusIdentification() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  const redraw = useCallback(() => {
    if (canvasRef.current) drawIdentification(canvasRef.current, progressRef.current);
  }, []);
  useEffect(redraw, [redraw]);
  useResize(redraw);

  const setValue = (value: number) => {
    progressRef.current = value;
    setProgress(value);
    redraw();
  };
  const play = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const startValue = progressRef.current >= .995 ? 0 : progressRef.current;
    const started = performance.now();
    const duration = 3900 * (1 - startValue);
    const frame = (now: number) => {
      const value = Math.min(1, startValue + (now - started) / Math.max(1, duration) * (1 - startValue));
      setValue(value);
      if (value < 1) frameRef.current = requestAnimationFrame(frame);
    };
    frameRef.current = requestAnimationFrame(frame);
  };
  useEffect(() => () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); }, []);

  return (
    <figure className="moebius-lab identification-lab">
      <header><p>EXPLORACIÓN 01 · IDENTIFICACIÓN</p><h3>Dar media vuelta y unir</h3><p>La orientación de las flechas muestra qué puntos de los extremos se coserán entre sí.</p></header>
      <canvas ref={canvasRef} aria-label="Animación de una tira rectangular que recibe media vuelta y se cierra como banda de Möbius" />
      <div className="moebius-controls">
        <button type="button" onClick={play}>{progress > .99 ? "Repetir" : "Reproducir"}</button>
        <button type="button" className="secondary" onClick={() => setValue(0)}>Volver al rectángulo</button>
        <label>Proceso <strong>{Math.round(progress * 100)}%</strong><input type="range" min="0" max="1" step="0.01" value={progress} onChange={(event) => setValue(Number(event.target.value))} /></label>
      </div>
      <figcaption>La costura identifica (0,t) con (1,−t): arriba llega abajo y abajo llega arriba.</figcaption>
    </figure>
  );
}

function drawInsetBand(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, journey: number) {
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,.94)";
  ctx.strokeStyle = "rgba(18,52,61,.18)";
  ctx.lineWidth = 1;
  ctx.fillRect(x, y, width, height);
  ctx.strokeRect(x, y, width, height);
  const projectSmall = (p: Point3) => {
    const q = project(p, width, height, .48);
    return { x: x + q.x, y: y + q.y };
  };
  for (let j = 0; j <= 8; j += 1) {
    const v = -43 + j / 8 * 86;
    ctx.beginPath();
    for (let i = 0; i <= 80; i += 1) {
      const p = projectSmall(moebiusPoint(i / 80 * Math.PI * 2, v, 90));
      if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = "rgba(18,52,61,.2)"; ctx.lineWidth = 1; ctx.stroke();
  }
  const maxTheta = journey * Math.PI * 4;
  ctx.beginPath();
  const pieces = Math.max(1, Math.floor(journey * 180));
  for (let i = 0; i <= pieces; i += 1) {
    const theta = i / pieces * maxTheta;
    const p = projectSmall(moebiusPoint(theta, 25, 90));
    if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
  }
  ctx.strokeStyle = "#d56f52"; ctx.lineWidth = 5; ctx.stroke();
  const walker = projectSmall(moebiusPoint(maxTheta, 0, 90));
  ctx.fillStyle = "#007190"; ctx.beginPath(); ctx.arc(walker.x, walker.y, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#12343d"; ctx.font = "600 9px ui-monospace, SFMono-Regular, Menlo, monospace"; ctx.textAlign = "left"; ctx.fillText("POSICIÓN SOBRE LA BANDA", x + 10, y + 16);
  ctx.restore();
}

function drawWalk(canvas: HTMLCanvasElement, journey: number) {
  const prepared = prepareCanvas(canvas);
  if (!prepared) return;
  const { context: ctx, width, height } = prepared;
  ctx.fillStyle = "#f4f0e8"; ctx.fillRect(0, 0, width, height);
  const mainWidth = width;
  const roll = journey * Math.PI * 2;
  ctx.save();
  ctx.translate(mainWidth * .42, height * .54);
  ctx.rotate(roll);
  const horizonY = -height * .34;
  const gradient = ctx.createLinearGradient(0, horizonY, 0, height * .48);
  gradient.addColorStop(0, "#e4f2f5"); gradient.addColorStop(1, "#fffaf6");
  ctx.fillStyle = gradient; ctx.fillRect(-width, horizonY, width * 2, height);
  ctx.strokeStyle = "rgba(18,52,61,.26)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(-width, horizonY); ctx.lineTo(width, horizonY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-width * .44, height * .48); ctx.lineTo(-24, horizonY); ctx.lineTo(24, horizonY); ctx.lineTo(width * .44, height * .48); ctx.closePath();
  ctx.fillStyle = "#fff"; ctx.fill(); ctx.strokeStyle = "#12343d"; ctx.lineWidth = 3; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, height * .48); ctx.lineTo(0, horizonY); ctx.strokeStyle = "#d56f52"; ctx.lineWidth = 18; ctx.stroke();
  for (let i = 0; i < 8; i += 1) {
    const phase = (i / 8 + journey * 3) % 1;
    const y = horizonY + Math.pow(phase, 2.1) * (height * .82);
    const half = 24 + Math.pow(phase, 1.7) * width * .42;
    ctx.beginPath(); ctx.moveTo(-half, y); ctx.lineTo(half, y); ctx.strokeStyle = "rgba(18,52,61,.16)"; ctx.lineWidth = 1; ctx.stroke();
  }
  ctx.restore();

  const insetWidth = Math.min(245, width * .34);
  drawInsetBand(ctx, width - insetWidth - 16, 16, insetWidth, 150, journey);
  ctx.fillStyle = "rgba(255,255,255,.92)"; ctx.fillRect(16, 16, 205, 61);
  ctx.fillStyle = "#12343d"; ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace"; ctx.textAlign = "left";
  const phaseText = journey < .5 ? "PRIMERA VUELTA" : journey < .995 ? "SEGUNDA VUELTA" : "REGRESO AL INICIO";
  ctx.fillText(phaseText, 28, 39);
  ctx.font = "15px Georgia, serif";
  ctx.fillText(journey < .5 ? "La orientación está girando" : journey < .995 ? "El camino continúa al reverso" : "Mismo punto y orientación", 28, 62);
}

export function MoebiusWalk() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const [journey, setJourney] = useState(0);
  const [playing, setPlaying] = useState(false);
  const journeyRef = useRef(0);
  const playingRef = useRef(false);

  const redraw = useCallback(() => { if (canvasRef.current) drawWalk(canvasRef.current, journeyRef.current); }, []);
  useEffect(redraw, [redraw]);
  useResize(redraw);
  const setValue = (value: number) => { journeyRef.current = value; setJourney(value); redraw(); };

  const stop = () => {
    playingRef.current = false; setPlaying(false);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  };
  const toggle = () => {
    if (playingRef.current) return stop();
    if (journeyRef.current >= .998) setValue(0);
    playingRef.current = true; setPlaying(true);
    let previous = performance.now();
    const frame = (now: number) => {
      if (!playingRef.current) return;
      const next = Math.min(1, journeyRef.current + (now - previous) / 12500);
      previous = now; setValue(next);
      if (next >= 1) stop(); else frameRef.current = requestAnimationFrame(frame);
    };
    frameRef.current = requestAnimationFrame(frame);
  };
  useEffect(() => () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); }, []);

  const status = journey < .5 ? "primera vuelta" : journey < 1 ? "segunda vuelta" : "punto inicial";
  return (
    <figure className="moebius-lab walking-lab">
      <header><p>EXPLORACIÓN 02 · UN SOLO LADO</p><h3>Caminar y dejar una huella</h3><p>La vista principal acompaña el giro local; el mapa pequeño muestra la posición y el camino ya pintado.</p></header>
      <canvas ref={canvasRef} aria-label="Recorrido en primera persona por una banda de Möbius con un mapa que muestra la posición y la huella pintada" />
      <div className="moebius-controls">
        <button type="button" onClick={toggle}>{playing ? "Pausar" : journey >= .998 ? "Repetir" : "Comenzar a caminar"}</button>
        <button type="button" className="secondary" onClick={() => { stop(); setValue(0); }}>Volver al inicio</button>
        <label>Recorrido: <strong>{status}</strong><input type="range" min="0" max="1" step="0.002" value={journey} onChange={(event) => { stop(); setValue(Number(event.target.value)); }} /></label>
      </div>
      <figcaption>Después de una vuelta la orientación transversal se invierte. La segunda completa el camino y devuelve también la orientación inicial.</figcaption>
    </figure>
  );
}
