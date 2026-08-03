"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const steps = [
  { short: "Superficie", title: "Una esfera con cuatro bordes" },
  { short: "Curvas", title: "Curvas esenciales alrededor de los orificios" },
  { short: "Giros", title: "Giros de Dehn como movimientos elementales" },
  { short: "Composición", title: "Los movimientos se componen" },
  { short: "Sweater", title: "La misma topología toma forma de prenda" },
];

const curveColors = ["#007797", "#89962f", "#d27e62"];

function ellipsePoint(cx: number, cy: number, rx: number, ry: number, angle: number) {
  return { x: cx + Math.cos(angle) * rx, y: cy + Math.sin(angle) * ry };
}

function drawArrow(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, color: string) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(angle); ctx.fillStyle = color;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-12, -6); ctx.lineTo(-9, 7); ctx.closePath(); ctx.fill(); ctx.restore();
}

function drawSphere(ctx: CanvasRenderingContext2D, opacity: number) {
  ctx.save(); ctx.globalAlpha = opacity;
  const gradient = ctx.createRadialGradient(390, 175, 20, 450, 255, 185);
  gradient.addColorStop(0, "#fffaf4"); gradient.addColorStop(.58, "#e9d9cd"); gradient.addColorStop(1, "#c89d89");
  ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(450, 255, 174, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#815b4d"; ctx.lineWidth = 2; ctx.stroke();
  const holes = [
    { x: 450, y: 101, rx: 47, ry: 17 }, { x: 294, y: 244, rx: 18, ry: 43 },
    { x: 606, y: 244, rx: 18, ry: 43 }, { x: 450, y: 407, rx: 62, ry: 18 },
  ];
  holes.forEach((hole) => {
    const shade = ctx.createRadialGradient(hole.x - 4, hole.y - 4, 2, hole.x, hole.y, Math.max(hole.rx, hole.ry));
    shade.addColorStop(0, "#173f48"); shade.addColorStop(1, "#082b33"); ctx.fillStyle = shade;
    ctx.beginPath(); ctx.ellipse(hole.x, hole.y, hole.rx, hole.ry, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.72)"; ctx.lineWidth = 3; ctx.stroke();
  });
  ctx.restore();
}

function drawCurve(ctx: CanvasRenderingContext2D, index: number, progress: number, twist: boolean) {
  const curves = [
    { cx: 374, cy: 205, rx: 104, ry: 137, start: -.6, label: "α" },
    { cx: 526, cy: 205, rx: 104, ry: 137, start: Math.PI + .6, label: "β" },
    { cx: 450, cy: 302, rx: 138, ry: 91, start: .2, label: "γ" },
  ];
  const curve = curves[index], color = curveColors[index];
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = twist ? 7 : 5; ctx.lineCap = "round";
  ctx.setLineDash([Math.max(.01, progress) * 950, 1000]); ctx.beginPath();
  ctx.ellipse(curve.cx, curve.cy, curve.rx, curve.ry, 0, curve.start, curve.start + Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
  if (progress > .7) {
    const point = ellipsePoint(curve.cx, curve.cy, curve.rx, curve.ry, curve.start + 4.7);
    drawArrow(ctx, point.x, point.y, curve.start + 4.7 + Math.PI / 2, color);
    ctx.fillStyle = color; ctx.font = "700 22px Georgia"; ctx.fillText(curve.label, point.x + 13, point.y - 10);
  }
  ctx.restore();
}

function drawSweater(ctx: CanvasRenderingContext2D, progress: number) {
  const ease = progress * progress * (3 - 2 * progress);
  ctx.save(); ctx.globalAlpha = ease; ctx.translate(450, 260); ctx.scale(.72 + .28 * ease, .72 + .28 * ease);
  const knit = ctx.createLinearGradient(-300, -180, 280, 220);
  knit.addColorStop(0, "#e1a487"); knit.addColorStop(.5, "#cf8267"); knit.addColorStop(1, "#b9604c"); ctx.fillStyle = knit;
  ctx.beginPath(); ctx.moveTo(-78, -170); ctx.bezierCurveTo(-125, -160, -166, -132, -220, -96);
  ctx.lineTo(-335, 2); ctx.quadraticCurveTo(-356, 23, -337, 46); ctx.lineTo(-287, 89); ctx.quadraticCurveTo(-267, 105, -249, 84);
  ctx.lineTo(-164, 13); ctx.lineTo(-174, 190); ctx.quadraticCurveTo(-175, 215, -149, 218); ctx.lineTo(149, 218);
  ctx.quadraticCurveTo(175, 215, 174, 190); ctx.lineTo(164, 13); ctx.lineTo(249, 84); ctx.quadraticCurveTo(267, 105, 287, 89);
  ctx.lineTo(337, 46); ctx.quadraticCurveTo(356, 23, 335, 2); ctx.lineTo(220, -96); ctx.bezierCurveTo(166, -132, 125, -160, 78, -170); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = "#864839"; ctx.lineWidth = 3; ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,.24)"; ctx.lineWidth = 2;
  for (let y = -115; y < 185; y += 25) { ctx.beginPath(); ctx.moveTo(-155, y); ctx.quadraticCurveTo(0, y + 9, 155, y); ctx.stroke(); }
  const openings = [
    { x: 0, y: -165, rx: 55, ry: 23, color: curveColors[0] }, { x: -315, y: 55, rx: 35, ry: 16, color: curveColors[1] },
    { x: 315, y: 55, rx: 35, ry: 16, color: curveColors[1] }, { x: 0, y: 207, rx: 138, ry: 21, color: curveColors[2] },
  ];
  openings.forEach((opening) => {
    ctx.fillStyle = "#fffdf9"; ctx.strokeStyle = opening.color; ctx.lineWidth = 6; ctx.beginPath();
    ctx.ellipse(opening.x, opening.y, opening.rx, opening.ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  });
  ctx.restore();
}

export default function MappingClassSweaterLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState(0), [playing, setPlaying] = useState(false);
  const progressRef = useRef(1), frameRef = useRef<number | null>(null);

  const render = useCallback((progress = 1) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2), rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr); canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.scale((rect.width / 900) * dpr, (rect.height / 500) * dpr); ctx.clearRect(0, 0, 900, 500);
    ctx.fillStyle = "#fffdf9"; ctx.fillRect(0, 0, 900, 500);
    ctx.fillStyle = "#12343d"; ctx.font = "700 13px Arial"; ctx.fillText(steps[step].title.toUpperCase(), 28, 35);
    ctx.fillStyle = "#55727a"; ctx.font = "12px Arial";
    ctx.fillText(step < 4 ? "Las curvas no son cortes: señalan dónde actúa una deformación." : "Cuello, puños y cintura corresponden a cuatro componentes de borde.", 28, 57);
    if (step < 4) {
      drawSphere(ctx, 1);
      if (step >= 1) { drawCurve(ctx, 0, step === 1 ? progress : 1, step >= 2); drawCurve(ctx, 1, step === 1 ? Math.max(0, progress - .2) : 1, step >= 2); }
      if (step >= 2) drawCurve(ctx, 2, step === 2 ? progress : 1, true);
      if (step === 3) {
        ctx.fillStyle = "rgba(255,253,249,.9)"; ctx.fillRect(620, 388, 244, 70); ctx.strokeStyle = "#d7c6bb"; ctx.strokeRect(620, 388, 244, 70);
        ctx.fillStyle = "#12343d"; ctx.font = "italic 24px Georgia"; ctx.fillText("Tα · Tβ · Tγ", 673, 422);
        ctx.fillStyle = "#55727a"; ctx.font = "11px Arial"; ctx.fillText("una palabra de transformaciones", 660, 444);
      }
    } else {
      drawSphere(ctx, 1 - progress);
      if (progress < .72) { drawCurve(ctx, 0, 1, true); drawCurve(ctx, 1, 1, true); drawCurve(ctx, 2, 1, true); }
      drawSweater(ctx, progress);
    }
  }, [step]);

  const animateStep = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const start = performance.now(), duration = step === 4 ? 2200 : 1500;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration); progressRef.current = progress; render(progress);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  }, [render, step]);

  useEffect(() => {
    progressRef.current = 0; animateStep(); const onResize = () => render(progressRef.current); window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [animateStep, render]);
  useEffect(() => {
    if (!playing) return; const timer = window.setTimeout(() => {
      if (step === steps.length - 1) setPlaying(false); else setStep((current) => current + 1);
    }, step === 4 ? 2700 : 2200); return () => window.clearTimeout(timer);
  }, [playing, step]);

  return (
    <section className="mapping-class-lab" aria-labelledby="mapping-class-lab-title">
      <header><p>EXPLORACIÓN · MAPPING CLASS GROUP</p><h2 id="mapping-class-lab-title">De una esfera perforada a un sweater</h2><p>Recorre curvas esenciales, observa giros de Dehn y reconoce los mismos cuatro bordes cuando la superficie adopta forma de prenda.</p></header>
      <canvas ref={canvasRef} role="img" aria-label={`Paso ${step + 1}: ${steps[step].title}`} />
      <ol className="mapping-class-steps">{steps.map((item, index) => <li className={index === step ? "is-current" : ""} key={item.short}><button type="button" onClick={() => { setPlaying(false); setStep(index); }} aria-current={index === step ? "step" : undefined}><span>0{index + 1}</span>{item.short}</button></li>)}</ol>
      <div className="mapping-class-controls">
        <button type="button" className="secondary" onClick={() => { setPlaying(false); setStep((current) => Math.max(0, current - 1)); }} disabled={step === 0}>← Anterior</button>
        <button type="button" onClick={() => { if (step === steps.length - 1) setStep(0); setPlaying(true); }}>{step === steps.length - 1 ? "Repetir recorrido" : "Reproducir recorrido"}</button>
        <button type="button" className="secondary" onClick={() => { setPlaying(false); setStep((current) => Math.min(steps.length - 1, current + 1)); }} disabled={step === steps.length - 1}>Siguiente →</button>
      </div>
      <p className="mapping-class-note"><strong>Lectura matemática.</strong> La esfera con cuatro componentes de borde es un modelo topológico idealizado del sweater: cuello, cintura y dos puños. Un giro de Dehn corta conceptualmente alrededor de una curva cerrada, gira una vuelta y vuelve a pegar; la superficie no se rompe durante la transformación.</p>
    </section>
  );
}
