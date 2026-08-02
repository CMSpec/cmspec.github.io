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

function subtract(a: Point3, b: Point3): Point3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function cross(a: Point3, b: Point3): Point3 {
  return { x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x };
}

function normalize(point: Point3): Point3 {
  const length = Math.hypot(point.x, point.y, point.z) || 1;
  return { x: point.x / length, y: point.y / length, z: point.z / length };
}

function offset(point: Point3, direction: Point3, distance: number): Point3 {
  return { x: point.x + direction.x * distance, y: point.y + direction.y * distance, z: point.z + direction.z * distance };
}

function drawWalker(
  ctx: CanvasRenderingContext2D,
  theta: number,
  screen: (point: Point3) => { x: number; y: number; depth: number },
) {
  const anchor3 = moebiusPoint(theta, 24);
  const tangent = normalize(subtract(moebiusPoint(theta + .015, 24), moebiusPoint(theta - .015, 24)));
  const across = normalize(subtract(moebiusPoint(theta, 25), moebiusPoint(theta, 23)));
  let normal = normalize(cross(tangent, across));
  if (normal.z < -.15) normal = { x: -normal.x, y: -normal.y, z: -normal.z };

  const foot = screen(offset(anchor3, normal, 2));
  const hip = screen(offset(anchor3, normal, 21));
  const shoulder = screen(offset(anchor3, normal, 35));
  const head = screen(offset(anchor3, normal, 47));
  const tangentAhead = screen(offset(offset(anchor3, normal, 24), tangent, 12));
  const tangentBehind = screen(offset(offset(anchor3, normal, 24), tangent, -12));
  const tangentLength = Math.hypot(tangentAhead.x - tangentBehind.x, tangentAhead.y - tangentBehind.y) || 1;
  const tx = (tangentAhead.x - tangentBehind.x) / tangentLength;
  const ty = (tangentAhead.y - tangentBehind.y) / tangentLength;
  const stride = Math.sin(theta * 3) * 7;

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "rgba(255,250,246,.92)";
  ctx.lineWidth = 8;
  ctx.beginPath(); ctx.moveTo(foot.x - tx * stride, foot.y - ty * stride); ctx.lineTo(hip.x, hip.y); ctx.lineTo(foot.x + tx * stride, foot.y + ty * stride); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(hip.x, hip.y); ctx.lineTo(shoulder.x, shoulder.y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(shoulder.x - tx * 11, shoulder.y - ty * 11); ctx.lineTo(shoulder.x, shoulder.y); ctx.lineTo(shoulder.x + tx * 11, shoulder.y + ty * 11); ctx.stroke();

  ctx.strokeStyle = "#12343d";
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(foot.x - tx * stride, foot.y - ty * stride); ctx.lineTo(hip.x, hip.y); ctx.lineTo(foot.x + tx * stride, foot.y + ty * stride); ctx.stroke();
  ctx.strokeStyle = "#007190";
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(hip.x, hip.y); ctx.lineTo(shoulder.x, shoulder.y); ctx.stroke();
  ctx.strokeStyle = "#12343d";
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(shoulder.x - tx * 11, shoulder.y - ty * 11); ctx.lineTo(shoulder.x, shoulder.y); ctx.lineTo(shoulder.x + tx * 11, shoulder.y + ty * 11); ctx.stroke();
  ctx.fillStyle = "#f0b89b"; ctx.strokeStyle = "#12343d"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(head.x, head.y, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.restore();
}

function drawWalk(canvas: HTMLCanvasElement, journey: number) {
  const prepared = prepareCanvas(canvas);
  if (!prepared) return;
  const { context: ctx, width, height } = prepared;
  const background = ctx.createLinearGradient(0, 0, 0, height);
  background.addColorStop(0, "#f5fbfc"); background.addColorStop(1, "#fffaf6");
  ctx.fillStyle = background; ctx.fillRect(0, 0, width, height);

  const scale = Math.min(width / 405, height / 310);
  const screen = (point: Point3) => project(point, width, height + 18, scale);
  const cells: { points: ReturnType<typeof screen>[]; depth: number; stripe: number }[] = [];
  const along = 72;
  const across = 10;
  for (let i = 0; i < along; i += 1) {
    const theta0 = i / along * Math.PI * 2;
    const theta1 = (i + 1) / along * Math.PI * 2;
    for (let j = 0; j < across; j += 1) {
      const v0 = -48 + j / across * 96;
      const v1 = -48 + (j + 1) / across * 96;
      const points = [screen(moebiusPoint(theta0, v0)), screen(moebiusPoint(theta1, v0)), screen(moebiusPoint(theta1, v1)), screen(moebiusPoint(theta0, v1))];
      cells.push({ points, depth: points.reduce((sum, point) => sum + point.depth, 0) / 4, stripe: i });
    }
  }
  cells.sort((a, b) => b.depth - a.depth).forEach(({ points, stripe }) => {
    ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y); points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y)); ctx.closePath();
    ctx.fillStyle = stripe % 12 < 6 ? "rgba(253,212,189,.68)" : "rgba(215,232,183,.72)";
    ctx.fill(); ctx.strokeStyle = "rgba(18,52,61,.09)"; ctx.lineWidth = .8; ctx.stroke();
  });

  [-48, 48].forEach((v) => {
    ctx.beginPath();
    for (let i = 0; i <= 150; i += 1) {
      const point = screen(moebiusPoint(i / 150 * Math.PI * 2, v));
      if (i === 0) ctx.moveTo(point.x, point.y); else ctx.lineTo(point.x, point.y);
    }
    ctx.strokeStyle = "#12343d"; ctx.lineWidth = 2.5; ctx.stroke();
  });
  for (let i = 0; i < 12; i += 1) {
    ctx.beginPath();
    for (let j = 0; j <= 20; j += 1) {
      const point = screen(moebiusPoint(i / 12 * Math.PI * 2, -48 + j / 20 * 96));
      if (j === 0) ctx.moveTo(point.x, point.y); else ctx.lineTo(point.x, point.y);
    }
    ctx.strokeStyle = "rgba(18,52,61,.18)"; ctx.lineWidth = 1.2; ctx.stroke();
  }

  const maxTheta = journey * Math.PI * 4;
  const pieces = Math.max(1, Math.floor(journey * 260));
  ctx.beginPath();
  for (let i = 0; i <= pieces; i += 1) {
    const point = screen(moebiusPoint(i / pieces * maxTheta, 24));
    if (i === 0) ctx.moveTo(point.x, point.y); else ctx.lineTo(point.x, point.y);
  }
  ctx.strokeStyle = "rgba(255,250,246,.94)"; ctx.lineWidth = 13; ctx.lineCap = "round"; ctx.stroke();
  ctx.strokeStyle = "#d56f52"; ctx.lineWidth = 8; ctx.stroke();
  const start = screen(moebiusPoint(0, 24));
  ctx.fillStyle = "#fffaf6"; ctx.strokeStyle = "#d56f52"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(start.x, start.y, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  drawWalker(ctx, maxTheta, screen);

  ctx.fillStyle = "rgba(255,255,255,.9)"; ctx.fillRect(18, 18, 224, 61);
  ctx.fillStyle = "#12343d"; ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace"; ctx.textAlign = "left";
  const phaseText = journey < .5 ? "PRIMERA VUELTA" : journey < .995 ? "SEGUNDA VUELTA" : "REGRESO AL INICIO";
  ctx.fillText(phaseText, 30, 41);
  ctx.font = "15px Georgia, serif";
  ctx.fillText(journey < .5 ? "La orientación está girando" : journey < .995 ? "La huella continúa al reverso" : "Mismo punto y orientación", 30, 64);

  ctx.strokeStyle = "#d56f52"; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(width - 158, 35); ctx.lineTo(width - 121, 35); ctx.stroke();
  ctx.fillStyle = "#12343d"; ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.fillText("HUELLA PINTADA", width - 110, 39);
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
      <header><p>EXPLORACIÓN 02 · UN SOLO LADO</p><h3>Caminar y dejar una huella</h3><p>La figura camina directamente sobre la banda mientras el trazo muestra el camino que ya ha recorrido.</p></header>
      <canvas ref={canvasRef} aria-label="Figura humana caminando sobre una banda de Möbius mientras deja una huella pintada" />
      <div className="moebius-controls">
        <button type="button" onClick={toggle}>{playing ? "Pausar" : journey >= .998 ? "Repetir" : "Comenzar a caminar"}</button>
        <button type="button" className="secondary" onClick={() => { stop(); setValue(0); }}>Volver al inicio</button>
        <label>Recorrido: <strong>{status}</strong><input type="range" min="0" max="1" step="0.002" value={journey} onChange={(event) => { stop(); setValue(Number(event.target.value)); }} /></label>
      </div>
      <figcaption>Después de una vuelta la orientación transversal se invierte. La segunda completa el camino y devuelve también la orientación inicial.</figcaption>
    </figure>
  );
}
