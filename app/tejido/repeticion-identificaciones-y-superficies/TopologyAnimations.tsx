"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Stage = 0 | 1 | 2;
type Point3 = { x: number; y: number; z: number };

const stageNames = ["Plano y dominio fundamental", "Cilindro", "Toro"];
const stageDescriptions = [
  "Elegimos un rectángulo representativo dentro del plano repetido.",
  "Al identificar los bordes verticales, cada sección horizontal se cierra en un círculo.",
  "Al identificar también los bordes horizontales del cilindro, desaparece el borde y se forma un toro.",
];

function mix(a: Point3, b: Point3, t: number): Point3 {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: a.z + (b.z - a.z) * t };
}

function pointFor(stage: Stage, u: number, v: number): Point3 {
  if (stage === 0) return { x: (u - .5) * 430, y: (v - .5) * 250, z: 0 };
  if (stage === 1) {
    const theta = 2 * Math.PI * u;
    return { x: 118 * Math.sin(theta), y: (v - .5) * 250, z: 118 * Math.cos(theta) };
  }
  const theta = 2 * Math.PI * u;
  const phi = 2 * Math.PI * v;
  const radius = 116 + 47 * Math.cos(phi);
  return { x: radius * Math.cos(theta), y: 47 * Math.sin(phi), z: radius * Math.sin(theta) };
}

function project(point: Point3, width: number, height: number, tilt: number) {
  const angle = -.42;
  const x = point.x * Math.cos(angle) - point.z * Math.sin(angle);
  const z = point.x * Math.sin(angle) + point.z * Math.cos(angle);
  const verticalScale = 1 - tilt * .42;
  return { x: width / 2 + x, y: height / 2 + point.y * verticalScale - z * tilt, depth: z };
}

function drawSurface(canvas: HTMLCanvasElement, from: Stage, to: Stage, progress: number) {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(ratio, ratio);
  ctx.clearRect(0, 0, width, height);

  const viewTilt = ([.12, .22, .64][from] * (1 - progress)) + ([.12, .22, .64][to] * progress);
  const map = (u: number, v: number) => project(mix(pointFor(from, u, v), pointFor(to, u, v), progress), width, height, viewTilt);
  const drawLine = (fixed: number, horizontal: boolean, color: string, lineWidth = 1.2) => {
    ctx.beginPath();
    for (let i = 0; i <= 64; i += 1) {
      const moving = i / 64;
      const p = horizontal ? map(moving, fixed) : map(fixed, moving);
      if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  for (let i = 0; i <= 8; i += 1) drawLine(i / 8, true, "rgba(130,151,47,.25)", 1);
  for (let i = 0; i <= 12; i += 1) drawLine(i / 12, false, "rgba(0,119,151,.24)", 1);

  /* Las dos copias de cada borde se mantienen visibles durante el pegado;
     al cerrarse pasan a ser ciclos destacados sobre la superficie. */
  const verticalAlpha = to === 2 ? Math.max(.35, 1 - progress * .65) : .96;
  drawLine(0, false, `rgba(0,119,151,${verticalAlpha})`, 6.5);
  drawLine(1, false, `rgba(0,119,151,${verticalAlpha})`, 6.5);

  const horizontalAlpha = from === 0 && to === 1 ? .32 : (to === 2 || from === 2 ? .94 : .68);
  drawLine(0, true, `rgba(130,151,47,${horizontalAlpha})`, 6.5);
  drawLine(1, true, `rgba(130,151,47,${horizontalAlpha})`, 6.5);

  ctx.fillStyle = "#123d46";
  ctx.font = "600 12px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.textAlign = "center";
  ctx.fillText(stageNames[progress < .5 ? from : to], width / 2, height - 18);
}

function useCanvasResize(redraw: () => void) {
  useEffect(() => {
    window.addEventListener("resize", redraw);
    return () => window.removeEventListener("resize", redraw);
  }, [redraw]);
}

export function QuotientSurfaceAnimator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const runRef = useRef(0);
  const [stage, setStage] = useState<Stage>(0);
  const renderRef = useRef({ from: 0 as Stage, to: 0 as Stage, progress: 1 });

  const redraw = useCallback(() => {
    if (canvasRef.current) drawSurface(canvasRef.current, renderRef.current.from, renderRef.current.to, renderRef.current.progress);
  }, []);
  useCanvasResize(redraw);
  useEffect(redraw, [redraw]);

  const transition = useCallback((from: Stage, to: Stage, token: number) => new Promise<void>((resolve) => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    const start = performance.now();
    const duration = 1650;
    const frame = (time: number) => {
      if (runRef.current !== token) return resolve();
      const raw = Math.min(1, (time - start) / duration);
      const eased = raw < .5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
      renderRef.current = { from, to, progress: eased };
      redraw();
      if (raw < 1) animationRef.current = requestAnimationFrame(frame);
      else { setStage(to); resolve(); }
    };
    animationRef.current = requestAnimationFrame(frame);
  }), [redraw]);

  const showStage = async (target: Stage) => {
    const token = ++runRef.current;
    await transition(stage, target, token);
  };

  const runSequence = async (target: 1 | 2) => {
    const token = ++runRef.current;
    setStage(0);
    renderRef.current = { from: 0, to: 0, progress: 1 };
    redraw();
    await new Promise((resolve) => window.setTimeout(resolve, 350));
    if (runRef.current !== token) return;
    await transition(0, 1, token);
    if (target === 2 && runRef.current === token) {
      await new Promise((resolve) => window.setTimeout(resolve, 650));
      if (runRef.current === token) await transition(1, 2, token);
    }
  };

  return (
    <section className="topology-lab" aria-labelledby="quotient-lab-title">
      <header>
        <p>EXPLORACIÓN 01 · DOMINIOS FUNDAMENTALES</p>
        <h3 id="quotient-lab-title">Del plano al cilindro y al toro</h3>
        <p>{stageDescriptions[stage]}</p>
      </header>
      <canvas ref={canvasRef} className="topology-canvas" role="img" aria-label={`Transformación topológica: ${stageNames[stage]}`} />
      <div className="topology-controls" aria-label="Controles de la identificación">
        <button type="button" onClick={() => runSequence(1)}>Plano → cilindro</button>
        <button type="button" onClick={() => runSequence(2)}>Plano → cilindro → toro</button>
        <button type="button" className="secondary" onClick={() => showStage((Math.max(0, stage - 1)) as Stage)} disabled={stage === 0}>Volver un paso</button>
      </div>
      <ol className="topology-steps">
        {stageNames.map((name, index) => <li key={name} className={index === stage ? "is-current" : ""}><button type="button" onClick={() => showStage(index as Stage)}><span>0{index + 1}</span>{name}</button></li>)}
      </ol>
    </section>
  );
}

const pairings = [
  { label: "a", color: "#007797" }, { label: "b", color: "#82972f" },
  { label: "a⁻¹", color: "#007797" }, { label: "b⁻¹", color: "#82972f" },
  { label: "c", color: "#d58f72" }, { label: "d", color: "#7c6f2b" },
  { label: "c⁻¹", color: "#d58f72" }, { label: "d⁻¹", color: "#7c6f2b" },
];

function drawOctagon(ctx: CanvasRenderingContext2D, width: number, height: number, alpha: number) {
  const cx = width / 2;
  const cy = height / 2 - 4;
  const diskRadius = Math.min(width * .29, height * .39);
  const octRadius = diskRadius * .72;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath(); ctx.arc(cx, cy, diskRadius, 0, Math.PI * 2); ctx.fillStyle = "#fbfaf6"; ctx.fill(); ctx.strokeStyle = "#9ab7bd"; ctx.lineWidth = 2; ctx.stroke();
  const points = Array.from({ length: 8 }, (_, i) => ({ x: cx + octRadius * Math.cos(-Math.PI / 8 + i * Math.PI / 4), y: cy + octRadius * Math.sin(-Math.PI / 8 + i * Math.PI / 4) }));
  for (let i = 0; i < 8; i += 1) {
    const p1 = points[i]; const p2 = points[(i + 1) % 8]; const pairing = pairings[i];
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.quadraticCurveTo(cx + (p1.x + p2.x - 2 * cx) * .62, cy + (p1.y + p2.y - 2 * cy) * .62, p2.x, p2.y);
    ctx.strokeStyle = pairing.color; ctx.lineWidth = 5; ctx.stroke();
    const mx = (p1.x + p2.x) / 2; const my = (p1.y + p2.y) / 2;
    const scale = 1.22; ctx.fillStyle = "#123d46"; ctx.font = "600 13px Georgia, serif"; ctx.textAlign = "center"; ctx.fillText(pairing.label, cx + (mx - cx) * scale, cy + (my - cy) * scale + 4);
  }
  ctx.fillStyle = "#526f76"; ctx.font = "12px Georgia, serif"; ctx.textAlign = "center"; ctx.fillText("octágono fundamental en el disco hiperbólico", cx, height - 15);
  ctx.restore();
}

function drawGenusTwo(ctx: CanvasRenderingContext2D, width: number, height: number, alpha: number) {
  const cx = width / 2;
  const cy = height / 2 - 2;
  ctx.save(); ctx.globalAlpha = alpha;
  const gradient = ctx.createLinearGradient(cx - 190, cy - 110, cx + 190, cy + 120);
  gradient.addColorStop(0, "#cfe6dd"); gradient.addColorStop(.5, "#f6d5c5"); gradient.addColorStop(1, "#d8e8b7");
  ctx.fillStyle = gradient; ctx.strokeStyle = "#123d46"; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 205, cy); ctx.bezierCurveTo(cx - 205, cy - 115, cx - 45, cy - 120, cx - 28, cy - 28);
  ctx.bezierCurveTo(cx - 10, cy - 10, cx + 10, cy - 10, cx + 28, cy - 28);
  ctx.bezierCurveTo(cx + 45, cy - 120, cx + 205, cy - 115, cx + 205, cy);
  ctx.bezierCurveTo(cx + 205, cy + 115, cx + 45, cy + 120, cx + 28, cy + 28);
  ctx.bezierCurveTo(cx + 10, cy + 10, cx - 10, cy + 10, cx - 28, cy + 28);
  ctx.bezierCurveTo(cx - 45, cy + 120, cx - 205, cy + 115, cx - 205, cy); ctx.fill(); ctx.stroke();
  for (const offset of [-105, 105]) {
    ctx.beginPath(); ctx.ellipse(cx + offset, cy, 42, 25, 0, 0, Math.PI * 2); ctx.fillStyle = "#fff"; ctx.fill(); ctx.strokeStyle = "#123d46"; ctx.stroke();
    for (let i = -2; i <= 2; i += 1) { ctx.beginPath(); ctx.ellipse(cx + offset, cy, 57 + i * 13, 34 + i * 8, 0, 0, Math.PI * 2); ctx.strokeStyle = `rgba(0,119,151,${.14 + .07 * (i + 2)})`; ctx.stroke(); }
  }
  ctx.fillStyle = "#123d46"; ctx.font = "600 13px ui-monospace, SFMono-Regular, Menlo, monospace"; ctx.textAlign = "center"; ctx.fillText("dos asas · género 2", cx, height - 15);
  ctx.restore();
}

export function GenusTwoAnimator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const [identified, setIdentified] = useState(false);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ratio = window.devicePixelRatio || 1; const width = canvas.clientWidth; const height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    const ctx = canvas.getContext("2d"); if (!ctx) return; ctx.scale(ratio, ratio); ctx.clearRect(0, 0, width, height);
    drawOctagon(ctx, width, height, 1 - progressRef.current);
    drawGenusTwo(ctx, width, height, progressRef.current);
  }, []);
  useCanvasResize(redraw);
  useEffect(redraw, [redraw]);

  const animate = (target: number) => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const initial = progressRef.current; const start = performance.now();
    const frame = (time: number) => {
      const raw = Math.min(1, (time - start) / 1900); const eased = raw < .5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
      progressRef.current = initial + (target - initial) * eased; redraw();
      if (raw < 1) frameRef.current = requestAnimationFrame(frame); else setIdentified(target === 1);
    };
    frameRef.current = requestAnimationFrame(frame);
  };

  return (
    <section className="topology-lab genus-lab" aria-labelledby="genus-lab-title">
      <header><p>EXPLORACIÓN 02 · OCTÁGONO HIPERBÓLICO</p><h3 id="genus-lab-title">Ocho lados, una superficie de género 2</h3><p>{identified ? "Después de emparejar los lados, la superficie cerrada posee dos asas." : "Los lados con la misma letra y color se pegan respetando la orientación indicada."}</p></header>
      <canvas ref={canvasRef} className="topology-canvas" role="img" aria-label={identified ? "Representación tridimensional esquemática de una superficie de género dos" : "Octágono fundamental dentro del disco hiperbólico con sus lados emparejados"} />
      <div className="pairing-word" aria-label="Palabra de identificación de los lados">a · b · a⁻¹ · b⁻¹ · c · d · c⁻¹ · d⁻¹</div>
      <div className="topology-controls"><button type="button" onClick={() => animate(1)}>Identificar los lados</button><button type="button" className="secondary" onClick={() => animate(0)}>Volver al octágono</button></div>
    </section>
  );
}
