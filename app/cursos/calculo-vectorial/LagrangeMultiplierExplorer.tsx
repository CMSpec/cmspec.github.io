"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const WIDTH = 760;
const HEIGHT = 500;
const ORIGIN = { x: WIDTH / 2, y: HEIGHT / 2 };
const SCALE = 112;
const RADIUS = 1.55;
const GRAPH_OFFSET = 1.65;
const GRAPH_SCALE = 0.62;

type MovingScene = {
  basePoint: THREE.Mesh;
  surfacePoint: THREE.Mesh;
  guide: THREE.Line;
  levelPlane: THREE.Mesh;
  levelLine: THREE.Line;
};

function sx(x: number) { return ORIGIN.x + x * SCALE; }
function sy(y: number) { return ORIGIN.y - y * SCALE; }

export default function LagrangeMultiplierExplorer() {
  const [angle, setAngle] = useState(45);
  const mountRef = useRef<HTMLDivElement>(null);
  const movingRef = useRef<MovingScene | null>(null);
  const radians = angle * Math.PI / 180;
  const x = RADIUS * Math.cos(radians);
  const y = RADIUS * Math.sin(radians);
  const value = x + y;
  const dot = (x + y) / (RADIUS * Math.sqrt(2));
  const aligned = Math.abs(dot) > 0.995;
  const extremum = dot > 0.995 ? "máximo condicionado" : dot < -0.995 ? "mínimo condicionado" : "punto sobre la restricción";
  const arrowLength = 66;
  const gradF = { x: arrowLength / Math.sqrt(2), y: -arrowLength / Math.sqrt(2) };
  const gradG = { x: arrowLength * Math.cos(radians), y: -arrowLength * Math.sin(radians) };
  const px = sx(x);
  const py = sy(y);
  const levelHalf = 245;
  const levelDirection = { x: 1 / Math.sqrt(2), y: 1 / Math.sqrt(2) };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(5.6, 4.6, 5.9);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 4.2;
    controls.maxDistance = 12;
    controls.target.set(0, 1.15, 0);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xdde8df, 2.2));
    const light = new THREE.DirectionalLight(0xffffff, 2.5);
    light.position.set(4, 8, 5);
    scene.add(light);

    const surfaceGeometry = new THREE.PlaneGeometry(5.2, 5.2, 20, 20);
    surfaceGeometry.rotateX(-Math.PI / 2);
    const positions = surfaceGeometry.attributes.position;
    for (let index = 0; index < positions.count; index += 1) {
      const px = positions.getX(index);
      const pz = positions.getZ(index);
      positions.setY(index, GRAPH_OFFSET + GRAPH_SCALE * (px + pz));
    }
    positions.needsUpdate = true;
    surfaceGeometry.computeVertexNormals();
    const surface = new THREE.Mesh(
      surfaceGeometry,
      new THREE.MeshPhongMaterial({
        color: 0xddebd3,
        transparent: true,
        opacity: 0.62,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    scene.add(surface);
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(surfaceGeometry),
      new THREE.LineBasicMaterial({ color: 0x8ea9a0, transparent: true, opacity: 0.13 }),
    );
    scene.add(wire);

    const baseCirclePoints: THREE.Vector3[] = [];
    const liftedCirclePoints: THREE.Vector3[] = [];
    for (let index = 0; index <= 160; index += 1) {
      const t = index / 160 * Math.PI * 2;
      const cx = RADIUS * Math.cos(t);
      const cy = RADIUS * Math.sin(t);
      baseCirclePoints.push(new THREE.Vector3(cx, 0.015, cy));
      liftedCirclePoints.push(new THREE.Vector3(cx, GRAPH_OFFSET + GRAPH_SCALE * (cx + cy) + 0.02, cy));
    }
    scene.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(baseCirclePoints),
      new THREE.LineBasicMaterial({ color: 0x7e812d, transparent: true, opacity: 0.72 }),
    ));
    scene.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(liftedCirclePoints),
      new THREE.LineBasicMaterial({ color: 0x007d9d }),
    ));

    const grid = new THREE.GridHelper(5.4, 10, 0x71888e, 0xd5dede);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.4;
    scene.add(grid);

    const pointGeometry = new THREE.SphereGeometry(0.095, 22, 22);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xd58f72 });
    const basePoint = new THREE.Mesh(pointGeometry, pointMaterial);
    const surfacePoint = new THREE.Mesh(pointGeometry.clone(), pointMaterial.clone());
    scene.add(basePoint, surfacePoint);

    const guide = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 1, 0)]),
      new THREE.LineDashedMaterial({ color: 0x69797d, dashSize: 0.1, gapSize: 0.08, transparent: true, opacity: 0.65 }),
    );
    scene.add(guide);

    const levelPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(4.9, 4.9),
      new THREE.MeshBasicMaterial({ color: 0xb9ddec, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false }),
    );
    levelPlane.rotation.x = -Math.PI / 2;
    scene.add(levelPlane);

    const levelLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2, 0, 2), new THREE.Vector3(2, 0, -2)]),
      new THREE.LineBasicMaterial({ color: 0x007d9d }),
    );
    scene.add(levelLine);
    movingRef.current = { basePoint, surfacePoint, guide, levelPlane, levelLine };

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    let frame = 0;
    const render = () => {
      controls.update();
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      movingRef.current = null;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      scene.traverse((object) => {
        const renderable = object as THREE.Mesh;
        renderable.geometry?.dispose();
        const materials = Array.isArray(renderable.material) ? renderable.material : renderable.material ? [renderable.material] : [];
        materials.forEach((material) => material.dispose());
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  useEffect(() => {
    const moving = movingRef.current;
    if (!moving) return;
    const currentRadians = angle * Math.PI / 180;
    const currentX = RADIUS * Math.cos(currentRadians);
    const currentY = RADIUS * Math.sin(currentRadians);
    const height = GRAPH_OFFSET + GRAPH_SCALE * (currentX + currentY);
    moving.basePoint.position.set(currentX, 0.08, currentY);
    moving.surfacePoint.position.set(currentX, height + 0.08, currentY);
    moving.guide.geometry.dispose();
    moving.guide.geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(currentX, 0.08, currentY),
      new THREE.Vector3(currentX, height, currentY),
    ]);
    moving.guide.computeLineDistances();
    moving.levelPlane.position.y = height;
    const half = 2.35;
    moving.levelLine.geometry.dispose();
    moving.levelLine.geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(currentX - half, height + 0.025, currentY + half),
      new THREE.Vector3(currentX + half, height + 0.025, currentY - half),
    ]);
  }, [angle]);

  return (
    <figure className="vector-concept-explorer lagrange-explorer" id="multiplicadores-lagrange-interactivo">
      <figcaption>
        <div>
          <span>EXPLORACIÓN · MULTIPLICADORES DE LAGRANGE</span>
          <h5>Buscar un extremo sin abandonar la restricción</h5>
          <p>Mueve el punto sobre la circunferencia. En un extremo condicionado, la curva de nivel toca la restricción y los gradientes quedan paralelos.</p>
        </div>
        <strong>∇f = λ∇g</strong>
      </figcaption>
      <div className="lagrange-parallel">
        <div className="lagrange-view lagrange-3d-wrap">
          <span className="lagrange-view-label">SUPERFICIE · z=f(x,y)</span>
          <div ref={mountRef} className="lagrange-3d-stage" role="img" aria-label="Plano tridimensional z igual a x más y, con la restricción circular elevada sobre la superficie y el punto sincronizado." />
          <span className="level-curves-camera-hint" aria-hidden="true">↕ ARRASTRA PARA GIRAR</span>
        </div>
        <div className="lagrange-view lagrange-plane-wrap">
          <span className="lagrange-view-label">PLANO xy · CURVAS DE NIVEL</span>
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`Curvas de nivel de f igual a x más y y la restricción circular. El punto actual es ${x.toFixed(2)}, ${y.toFixed(2)}.`}>
        <defs>
          <marker id="lagrange-arrow-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#007d9d" /></marker>
          <marker id="lagrange-arrow-olive" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#7e812d" /></marker>
          <pattern id="lagrange-grid" width="56" height="56" patternUnits="userSpaceOnUse"><path d="M56 0H0V56" fill="none" stroke="#d9e1df" strokeWidth="1" /></pattern>
        </defs>
        <rect width={WIDTH} height={HEIGHT} fill="url(#lagrange-grid)" />
        <line x1="40" y1={ORIGIN.y} x2={WIDTH - 40} y2={ORIGIN.y} className="concept-axis" />
        <line x1={ORIGIN.x} y1="28" x2={ORIGIN.x} y2={HEIGHT - 28} className="concept-axis" />
        {[-3, -2, -1, 0, 1, 2, 3].map((c) => {
          const cx = sx(c / 2);
          const cy = sy(c / 2);
          return <line key={c} x1={cx - 245} y1={cy - 245} x2={cx + 245} y2={cy + 245} className="lagrange-level-muted" />;
        })}
        <line
          x1={px - levelDirection.x * levelHalf}
          y1={py - levelDirection.y * levelHalf}
          x2={px + levelDirection.x * levelHalf}
          y2={py + levelDirection.y * levelHalf}
          className="lagrange-level-current"
        />
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r={RADIUS * SCALE} className="lagrange-constraint" />
        <circle cx={px} cy={py} r="9" className={aligned ? "lagrange-point is-extreme" : "lagrange-point"} />
        <line x1={px} y1={py} x2={px + gradF.x} y2={py + gradF.y} className="lagrange-grad-f" markerEnd="url(#lagrange-arrow-blue)" />
        <line x1={px} y1={py} x2={px + gradG.x} y2={py + gradG.y} className="lagrange-grad-g" markerEnd="url(#lagrange-arrow-olive)" />
        <text x={px + gradF.x + 8} y={py + gradF.y - 5} className="concept-label">∇f</text>
        <text x={px + gradG.x + 8} y={py + gradG.y + 16} className="concept-label">∇g</text>
        <text x={WIDTH - 142} y={HEIGHT - 24} className="concept-label">g(x,y)=0</text>
          </svg>
        </div>
      </div>
      <div className="vector-concept-controls">
        <label htmlFor="lagrange-angle">Posición θ <output>{angle}°</output></label>
        <input id="lagrange-angle" type="range" min="0" max="360" step="1" value={angle} onChange={(event) => setAngle(Number(event.target.value))} />
        <p>P=({x.toFixed(2)}, {y.toFixed(2)}) · f(P)={value.toFixed(2)}</p>
        <strong className={aligned ? "is-aligned" : ""}>{extremum}{aligned ? ": los gradientes son paralelos" : ""}</strong>
      </div>
    </figure>
  );
}
