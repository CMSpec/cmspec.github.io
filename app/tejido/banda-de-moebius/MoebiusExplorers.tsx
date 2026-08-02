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

function drawArrow(ctx: CanvasRenderingContext2D, start: { x: number; y: number }, end: { x: number; y: number }, color: string) {
  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(start.x, start.y); ctx.lineTo(end.x, end.y); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(end.x, end.y);
  ctx.lineTo(end.x - 14 * Math.cos(angle - .55), end.y - 14 * Math.sin(angle - .55));
  ctx.lineTo(end.x - 14 * Math.cos(angle + .55), end.y - 14 * Math.sin(angle + .55));
  ctx.closePath(); ctx.fill();
}

function drawIdentification(canvas: HTMLCanvasElement, progress: number) {
  const prepared = prepareCanvas(canvas);
  if (!prepared) return;
  const { context: ctx, width, height } = prepared;
  ctx.fillStyle = "#fffaf6";
  ctx.fillRect(0, 0, width, height);
  const flatWidth = Math.min(510, width - 70);
  const scale = Math.min(1.22, width / 620);
  const ease = (value: number) => value * value * (3 - 2 * value);
  const bend = ease(Math.min(1, progress / .56));
  const twist = ease(Math.max(0, Math.min(1, (progress - .56) / .28)));
  const close = ease(Math.max(0, Math.min(1, (progress - .84) / .16)));
  const sweep = bend * Math.PI * (1.72 + .28 * close);
  const curvedPoint = (u: number, v: number): Point3 => {
    if (sweep < .001) return { x: (u - .5) * flatWidth, y: 0, z: v };
    const radius = flatWidth / sweep;
    const angle = (u - .5) * sweep;
    const center = { x: radius * Math.sin(angle), y: radius * (1 - Math.cos(angle)), z: 0 };
    const endInfluence = ease(Math.max(0, Math.min(1, (u - .68) / .32)));
    const turn = Math.PI * twist * endInfluence;
    const radial = { x: -Math.sin(angle), y: Math.cos(angle), z: 0 };
    return {
      x: center.x + v * radial.x * Math.sin(turn),
      y: center.y + v * radial.y * Math.sin(turn),
      z: v * Math.cos(turn),
    };
  };
  const screen = (u: number, v: number) => project(curvedPoint(u, v), width, height + 34, scale);

  const bands: { points: ReturnType<typeof screen>[]; depth: number; index: number }[] = [];
  for (let band = 0; band < 28; band += 1) {
    const u0 = band / 28;
    const u1 = (band + 1) / 28;
    const points = [screen(u0, -48), screen(u1, -48), screen(u1, 48), screen(u0, 48)];
    bands.push({ points, depth: points.reduce((sum, point) => sum + point.depth, 0) / 4, index: band });
  }
  bands.sort((a, b) => b.depth - a.depth).forEach(({ points, index }) => {
    ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y); points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y)); ctx.closePath();
    ctx.fillStyle = index % 4 < 2 ? "rgba(253,212,189,.58)" : "rgba(175,212,114,.28)";
    ctx.fill(); ctx.strokeStyle = "rgba(18,52,61,.13)"; ctx.lineWidth = 1; ctx.stroke();
  });
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

  drawArrow(ctx, screen(0, -27), screen(0, 27), "#007190");
  drawArrow(ctx, screen(1, 27), screen(1, -27), "#a85f45");
  ctx.fillStyle = "#12343d";
  ctx.font = "600 11px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.textAlign = "center";
  const label = progress < .12 ? "FLECHAS EN SENTIDOS OPUESTOS" : progress < .56 ? "CERRAR LA TIRA EN FORMA DE C" : progress < .84 ? "GIRAR UNO DE LOS EXTREMOS" : progress < .995 ? "UNIR LAS FLECHAS" : "BANDA DE MÖBIUS · MISMO SENTIDO";
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
      <header><p>EXPLORACIÓN 01 · IDENTIFICACIÓN</p><h3>Dar media vuelta y unir</h3><p>Las flechas comienzan opuestas. La tira se curva como un cilindro abierto y un extremo gira antes de cerrar la costura.</p></header>
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
  trackV = 0,
  opacity = 1,
) {
  const anchor3 = moebiusPoint(theta, trackV);
  const tangent = normalize(subtract(moebiusPoint(theta + .015, trackV), moebiusPoint(theta - .015, trackV)));
  const across = normalize(subtract(moebiusPoint(theta, trackV + 1), moebiusPoint(theta, trackV - 1)));
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
  ctx.globalAlpha = opacity;
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
  background.addColorStop(0, "#f8faf9"); background.addColorStop(1, "#fffaf6");
  ctx.fillStyle = background; ctx.fillRect(0, 0, width, height);

  const scale = Math.min(width / 390, height / 300);
  const screen = (point: Point3) => project(point, width, height + 10, scale);
  const shadow = ctx.createRadialGradient(width / 2, height * .66, 20, width / 2, height * .66, width * .36);
  shadow.addColorStop(0, "rgba(18,52,61,.18)"); shadow.addColorStop(1, "rgba(18,52,61,0)");
  ctx.save(); ctx.scale(1, .35); ctx.fillStyle = shadow; ctx.beginPath(); ctx.ellipse(width / 2, height * 1.88, width * .38, height * .38, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();

  const light = normalize({ x: -.35, y: -.45, z: 1 });
  const cells: { points: ReturnType<typeof screen>[]; depth: number; lightness: number }[] = [];
  const along = 96;
  const across = 12;
  for (let i = 0; i < along; i += 1) {
    const theta0 = i / along * Math.PI * 2;
    const theta1 = (i + 1) / along * Math.PI * 2;
    for (let j = 0; j < across; j += 1) {
      const v0 = -48 + j / across * 96;
      const v1 = -48 + (j + 1) / across * 96;
      const points = [screen(moebiusPoint(theta0, v0)), screen(moebiusPoint(theta1, v0)), screen(moebiusPoint(theta1, v1)), screen(moebiusPoint(theta0, v1))];
      const theta = (theta0 + theta1) / 2;
      const v = (v0 + v1) / 2;
      const tangent = subtract(moebiusPoint(theta + .012, v), moebiusPoint(theta - .012, v));
      const transverse = subtract(moebiusPoint(theta, v + 1), moebiusPoint(theta, v - 1));
      const normal = normalize(cross(tangent, transverse));
      const illumination = Math.abs(normal.x * light.x + normal.y * light.y + normal.z * light.z);
      const depth = points.reduce((sum, point) => sum + point.depth, 0) / 4;
      cells.push({ points, depth, lightness: 60 + illumination * 31 - (depth > 0 ? 7 : 0) });
    }
  }
  cells.sort((a, b) => b.depth - a.depth).forEach(({ points, lightness }) => {
    ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y); points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y)); ctx.closePath();
    ctx.fillStyle = `hsl(198 8% ${lightness}%)`;
    ctx.fill(); ctx.strokeStyle = "rgba(18,52,61,.055)"; ctx.lineWidth = .65; ctx.stroke();
  });

  [-48, 48].forEach((v) => {
    for (let i = 0; i < 180; i += 1) {
      const first = screen(moebiusPoint(i / 180 * Math.PI * 2, v));
      const second = screen(moebiusPoint((i + 1) / 180 * Math.PI * 2, v));
      ctx.beginPath(); ctx.moveTo(first.x, first.y); ctx.lineTo(second.x, second.y);
      ctx.strokeStyle = (first.depth + second.depth) / 2 > 0 ? "rgba(18,52,61,.36)" : "#12343d";
      ctx.lineWidth = (first.depth + second.depth) / 2 > 0 ? 2 : 3.2; ctx.stroke();
    }
  });
  for (let i = 0; i < 12; i += 1) {
    ctx.beginPath();
    for (let j = 0; j <= 20; j += 1) {
      const point = screen(moebiusPoint(i / 12 * Math.PI * 2, -48 + j / 20 * 96));
      if (j === 0) ctx.moveTo(point.x, point.y); else ctx.lineTo(point.x, point.y);
    }
    const depth = screen(moebiusPoint(i / 12 * Math.PI * 2, 0)).depth;
    ctx.strokeStyle = depth > 0 ? "rgba(18,52,61,.12)" : "rgba(18,52,61,.27)"; ctx.lineWidth = depth > 0 ? .8 : 1.2; ctx.stroke();
  }

  const maxTheta = journey * Math.PI * 4;
  const pathV = 9;
  const pieces = Math.max(1, Math.floor(journey * 260));
  for (let i = 0; i < pieces; i += 1) {
    const theta0 = i / pieces * maxTheta;
    const theta1 = (i + 1) / pieces * maxTheta;
    const first = screen(moebiusPoint(theta0, pathV));
    const second = screen(moebiusPoint(theta1, pathV));
    const interior = (theta0 + theta1) / 2 >= Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(first.x, first.y); ctx.lineTo(second.x, second.y);
    ctx.strokeStyle = interior ? "rgba(255,250,246,.94)" : "rgba(255,250,246,.34)"; ctx.lineWidth = interior ? 11 : 8; ctx.lineCap = "round"; ctx.stroke();
    ctx.strokeStyle = interior ? "#d56f52" : "rgba(213,111,82,.28)"; ctx.lineWidth = interior ? 7 : 4; ctx.stroke();
  }
  const start = screen(moebiusPoint(0, pathV));
  ctx.fillStyle = "#fffaf6"; ctx.strokeStyle = "#d56f52"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(start.x, start.y, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "#12343d"; ctx.font = "600 9px ui-monospace, SFMono-Regular, Menlo, monospace"; ctx.textAlign = "center";
  ctx.fillText("INICIO", start.x, start.y + 23);
  drawWalker(ctx, maxTheta, screen, pathV, 1);

  ctx.fillStyle = "rgba(255,255,255,.9)"; ctx.fillRect(18, 18, 224, 61);
  ctx.fillStyle = "#12343d"; ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace"; ctx.textAlign = "left";
  const phaseText = journey < .5 ? "RECORRIDO EXTERIOR" : journey < .995 ? "RECORRIDO INTERIOR" : "REGRESO AL INICIO";
  ctx.fillText(phaseText, 30, 41);
  ctx.font = "15px Georgia, serif";
  ctx.fillText(journey < .5 ? "Huella tenue sobre la parte externa" : journey < .995 ? "Huella sólida sobre la parte interna" : "Mismo punto y orientación", 30, 64);

  if (width > 560) {
    ctx.strokeStyle = "rgba(213,111,82,.28)"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(width - 177, 31); ctx.lineTo(width - 140, 31); ctx.stroke();
    ctx.fillStyle = "#12343d"; ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.textAlign = "left"; ctx.fillText("EXTERIOR · TENUE", width - 128, 35);
    ctx.strokeStyle = "#d56f52"; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(width - 177, 54); ctx.lineTo(width - 140, 54); ctx.stroke();
    ctx.fillText("INTERIOR · SÓLIDO", width - 128, 58);
  }
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

  const status = journey < .5 ? "parte exterior" : journey < 1 ? "parte interior" : "punto inicial";
  return (
    <figure className="moebius-lab walking-lab">
      <header><p>EXPLORACIÓN 02 · UN SOLO LADO</p><h3>Caminar y dejar una huella</h3><p>La figura avanza cerca del eje medio: primero deja una huella tenue por la parte exterior y luego una huella sólida por la interior.</p></header>
      <canvas ref={canvasRef} aria-label="Figura humana caminando sobre una banda de Möbius mientras deja una huella pintada" />
      <div className="moebius-controls">
        <button type="button" onClick={toggle}>{playing ? "Pausar" : journey >= .998 ? "Repetir" : "Comenzar a caminar"}</button>
        <button type="button" className="secondary" onClick={() => { stop(); setValue(0); }}>Volver al inicio</button>
        <label>Recorrido: <strong>{status}</strong><input type="range" min="0" max="1" step="0.002" value={journey} onChange={(event) => { stop(); setValue(Number(event.target.value)); }} /></label>
      </div>
      <figcaption>La segunda vuelta continúa sobre aquello que parecía la cara interior, sin saltar un borde ni abandonar la superficie.</figcaption>
    </figure>
  );
}
