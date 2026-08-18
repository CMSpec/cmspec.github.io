"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const steps = [
  { short: "Superficie", title: "Una esfera con cuatro componentes de borde" },
  { short: "Curvas", title: "Curvas esenciales alrededor de los orificios" },
  { short: "Giros", title: "Giros de Dehn como movimientos elementales" },
  { short: "Composición", title: "Una palabra de transformaciones" },
] as const;

const curveColors = [0x007797, 0x89962f, 0xd27e62];

function orientToNormal(object: THREE.Object3D, normal: THREE.Vector3) {
  object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal.clone().normalize());
}

function makeBoundary(normal: THREE.Vector3, radius: number) {
  const group = new THREE.Group();
  const direction = normal.clone().normalize();
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(radius, 0.055, 18, 80),
    new THREE.MeshStandardMaterial({ color: 0xd27e62, roughness: 0.42, metalness: 0.04 }),
  );
  const opening = new THREE.Mesh(
    new THREE.CircleGeometry(radius - 0.035, 64),
    new THREE.MeshStandardMaterial({ color: 0x143941, roughness: 0.8, side: THREE.DoubleSide }),
  );
  ring.position.copy(direction.multiplyScalar(1.94));
  opening.position.copy(ring.position).add(normal.clone().normalize().multiplyScalar(-0.015));
  orientToNormal(ring, normal);
  orientToNormal(opening, normal);
  group.add(opening, ring);
  return group;
}

function makeCurve(normal: THREE.Vector3, offset: number, color: number) {
  const radius = 2.08;
  const n = normal.clone().normalize();
  const helper = Math.abs(n.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const u = new THREE.Vector3().crossVectors(n, helper).normalize();
  const v = new THREE.Vector3().crossVectors(n, u).normalize();
  const circleRadius = Math.sqrt(radius * radius - offset * offset);
  const points = Array.from({ length: 129 }, (_, index) => {
    const angle = (index / 128) * Math.PI * 2;
    return n.clone().multiplyScalar(offset)
      .add(u.clone().multiplyScalar(Math.cos(angle) * circleRadius))
      .add(v.clone().multiplyScalar(Math.sin(angle) * circleRadius));
  });
  const path = new THREE.CatmullRomCurve3(points, true);
  const tube = new THREE.Mesh(
    new THREE.TubeGeometry(path, 160, 0.035, 10, true),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.12, roughness: 0.35 }),
  );
  return tube;
}

export default function MappingClassSweaterLab() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfffdf9);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(5.5, 3.7, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    stage.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 5;
    controls.maxDistance = 12;
    controls.target.set(0, 0, 0);

    scene.add(new THREE.HemisphereLight(0xfff8ef, 0x31535b, 2.4));
    const key = new THREE.DirectionalLight(0xffffff, 3.1);
    key.position.set(4, 6, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xf2bca6, 1.2);
    fill.position.set(-5, -2, 4);
    scene.add(fill);

    const surface = new THREE.Mesh(
      new THREE.SphereGeometry(2, 96, 64),
      new THREE.MeshPhysicalMaterial({ color: 0xe7cdbc, roughness: 0.7, transparent: true, opacity: 0.78, side: THREE.DoubleSide, clearcoat: 0.15 }),
    );
    scene.add(surface);

    const boundaries = [
      [new THREE.Vector3(0, 1, 0), 0.47],
      [new THREE.Vector3(0, -1, 0), 0.58],
      [new THREE.Vector3(-1, 0.08, 0), 0.43],
      [new THREE.Vector3(1, 0.08, 0), 0.43],
    ] as const;
    boundaries.forEach(([normal, radius]) => scene.add(makeBoundary(normal, radius)));

    const curves = [
      makeCurve(new THREE.Vector3(0.58, 0.78, 0.2), 0.2, curveColors[0]),
      makeCurve(new THREE.Vector3(-0.62, 0.7, 0.35), -0.18, curveColors[1]),
      makeCurve(new THREE.Vector3(0.05, 0.32, 0.95), 0.12, curveColors[2]),
    ];
    curves.forEach((curve) => scene.add(curve));

    const twistBands = curves.map((curve, index) => {
      const band = curve.clone();
      (band as THREE.Mesh<THREE.BufferGeometry, THREE.Material>).material = new THREE.MeshBasicMaterial({ color: curveColors[index], transparent: true, opacity: 0.09, wireframe: true });
      band.scale.setScalar(1.035);
      scene.add(band);
      return band;
    });

    const resize = () => {
      const { width, height } = stage.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(stage);

    const clock = new THREE.Clock();
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      controls.update();
      curves.forEach((curve, index) => {
        curve.visible = step >= 1;
        curve.scale.setScalar(step === 1 ? 0.995 + Math.sin(time * 2 + index) * 0.008 : 1);
        if (step >= 2) {
          curve.rotation.x = Math.sin(time * 0.72 + index * 1.7) * 0.1;
          curve.rotation.y = Math.sin(time * 0.56 + index) * 0.12;
        } else {
          curve.rotation.set(0, 0, 0);
        }
      });
      twistBands.forEach((band, index) => {
        band.visible = step >= 2;
        band.rotation.x = curves[index].rotation.x;
        band.rotation.y = curves[index].rotation.y;
        band.scale.setScalar(1.025 + Math.sin(time * 1.6 + index) * 0.018);
      });
      surface.rotation.y = Math.sin(time * 0.18) * 0.035;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [step]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (step === steps.length - 1) setPlaying(false);
      else setStep((current) => current + 1);
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [playing, step]);

  return (
    <section className="mapping-class-lab mapping-class-lab-3d" aria-labelledby="mapping-class-lab-title">
      <header><p>EXPLORACIÓN 3D · MAPPING CLASS GROUP</p><h2 id="mapping-class-lab-title">Transformaciones de una superficie perforada</h2><p>Rota la escena para observar los cuatro bordes, las curvas esenciales y los giros de Dehn que generan transformaciones de la superficie.</p></header>
      <div className="mapping-class-three-stage" ref={stageRef} role="img" aria-label={`Escena tridimensional. Paso ${step + 1}: ${steps[step].title}`}>
        <span className="mapping-class-camera-hint" aria-hidden="true">↻ arrastra para rotar · desplaza para acercar</span>
        {step === 3 && <span className="mapping-class-word">T<sub>α</sub> · T<sub>β</sub> · T<sub>γ</sub></span>}
      </div>
      <ol className="mapping-class-steps">{steps.map((item, index) => <li className={index === step ? "is-current" : ""} key={item.short}><button type="button" onClick={() => { setPlaying(false); setStep(index); }} aria-current={index === step ? "step" : undefined}><span>0{index + 1}</span>{item.short}</button></li>)}</ol>
      <div className="mapping-class-controls">
        <button type="button" className="secondary" onClick={() => { setPlaying(false); setStep((current) => Math.max(0, current - 1)); }} disabled={step === 0}>← Anterior</button>
        <button type="button" onClick={() => { if (step === steps.length - 1) setStep(0); setPlaying(true); }}>{step === steps.length - 1 ? "Repetir recorrido" : "Reproducir recorrido"}</button>
        <button type="button" className="secondary" onClick={() => { setPlaying(false); setStep((current) => Math.min(steps.length - 1, current + 1)); }} disabled={step === steps.length - 1}>Siguiente →</button>
      </div>
      <p className="mapping-class-note"><strong>Lectura matemática.</strong> Cada curva coloreada representa una curva cerrada esencial. Un giro de Dehn modifica una banda alrededor de ella, completa una vuelta y vuelve a pegarla sin cortar ni cambiar la topología de la superficie.</p>
    </section>
  );
}
