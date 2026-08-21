"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type LimitMode = "exists" | "path-dependent";

const RADIUS = 2.35;

function valueAt(mode: LimitMode, x: number, y: number) {
  if (mode === "exists") return x * x + y * y;
  const denominator = x * x + y * y;
  return denominator < 1e-8 ? 0 : x * y / denominator;
}

function visualHeight(mode: LimitMode, value: number) {
  return mode === "exists" ? value * .46 : value * 2.05;
}

function surfaceGeometry(mode: LimitMode) {
  const radialSteps = 31;
  const angleSteps = 96;
  const vertices: number[] = [];
  const indices: number[] = [];
  for (let i = 0; i < radialSteps; i += 1) {
    const radius = .055 + (RADIUS - .055) * i / (radialSteps - 1);
    for (let j = 0; j <= angleSteps; j += 1) {
      const angle = 2 * Math.PI * j / angleSteps;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      vertices.push(x, visualHeight(mode, valueAt(mode, x, y)), y);
    }
  }
  const row = angleSteps + 1;
  for (let i = 0; i < radialSteps - 1; i += 1) {
    for (let j = 0; j < angleSteps; j += 1) {
      const a = i * row + j;
      const b = a + row;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function line(points: THREE.Vector3[], color: number, dashed = false) {
  const material = dashed
    ? new THREE.LineDashedMaterial({ color, dashSize: .11, gapSize: .07 })
    : new THREE.LineBasicMaterial({ color });
  const result = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
  if (dashed) result.computeLineDistances();
  return result;
}

function disposeGroup(group: THREE.Group) {
  group.traverse((object) => {
    const item = object as THREE.Mesh;
    item.geometry?.dispose();
    const materials = Array.isArray(item.material) ? item.material : item.material ? [item.material] : [];
    materials.forEach((material) => material.dispose());
  });
  group.clear();
}

export default function MultivariableLimit3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const dynamicRef = useRef<THREE.Group | null>(null);
  const [mode, setMode] = useState<LimitMode>("exists");
  const [slope, setSlope] = useState(1);
  const [distance, setDistance] = useState(1.45);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(38, 1, .1, 100);
    camera.position.set(5.7, 4.7, 6.4);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, .55, 0);
    controls.minDistance = 4.2;
    controls.maxDistance = 11;
    scene.add(new THREE.HemisphereLight(0xffffff, 0xe3e9e4, 2.5));
    const light = new THREE.DirectionalLight(0xffffff, 2.7);
    light.position.set(5, 8, 5);
    scene.add(light);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.MeshPhongMaterial({ color: 0xf8f5ed, transparent: true, opacity: .48, side: THREE.DoubleSide }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -.04;
    scene.add(floor);
    const grid = new THREE.GridHelper(6, 12, 0x9bacaf, 0xdce3e1);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = .34;
    scene.add(grid);
    const dynamic = new THREE.Group();
    dynamicRef.current = dynamic;
    scene.add(dynamic);
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
    const render = () => { controls.update(); renderer.render(scene, camera); frame = requestAnimationFrame(render); };
    render();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      scene.traverse((object) => {
        const item = object as THREE.Mesh;
        item.geometry?.dispose();
        const materials = Array.isArray(item.material) ? item.material : item.material ? [item.material] : [];
        materials.forEach((material) => material.dispose());
      });
      renderer.dispose();
      renderer.domElement.remove();
      dynamicRef.current = null;
    };
  }, []);

  useEffect(() => {
    const group = dynamicRef.current;
    if (!group) return;
    disposeGroup(group);
    const geometry = surfaceGeometry(mode);
    const surface = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: mode === "exists" ? 0xb9ddec : 0xe8d5b2, transparent: true, opacity: .72, side: THREE.DoubleSide }));
    const wire = new THREE.Mesh(geometry.clone(), new THREE.MeshBasicMaterial({ color: mode === "exists" ? 0x78aebe : 0xa38b42, wireframe: true, transparent: true, opacity: .15 }));
    const angle = Math.atan(slope);
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    const pathPoints = Array.from({ length: 121 }, (_, index) => {
      const signedDistance = -RADIUS + 2 * RADIUS * index / 120;
      const x = signedDistance * dx;
      const y = signedDistance * dy;
      return new THREE.Vector3(x, visualHeight(mode, valueAt(mode, x, y)) + .035, y);
    });
    const x = distance * dx;
    const y = distance * dy;
    const value = valueAt(mode, x, y);
    const point = new THREE.Mesh(new THREE.SphereGeometry(.12, 22, 14), new THREE.MeshPhongMaterial({ color: 0xd58f72 }));
    point.position.set(x, visualHeight(mode, value) + .04, y);
    const projection = new THREE.Vector3(x, 0, y);
    const vertical = line([projection, point.position.clone()], 0xd58f72, true);
    const origin = new THREE.Mesh(new THREE.SphereGeometry(.075, 20, 12), new THREE.MeshPhongMaterial({ color: mode === "exists" ? 0x99c970 : 0xffffff, emissive: mode === "exists" ? 0x315120 : 0x000000 }));
    origin.position.y = .02;
    group.add(surface, wire, line(pathPoints, 0x007d9d), point, vertical, origin);
  }, [mode, slope, distance]);

  const angle = Math.atan(slope);
  const x = distance * Math.cos(angle);
  const y = distance * Math.sin(angle);
  const value = valueAt(mode, x, y);
  const pathLimit = mode === "exists" ? 0 : slope / (1 + slope * slope);

  return (
    <figure className="vector-concept-explorer multivariable-limit-explorer" id="limites-caminos-3d">
      <figcaption>
        <div><span>EXPLORACIÓN · LÍMITES</span><h5>Acercarse a un punto por caminos diferentes</h5><p>En dos variables existen infinitas formas de aproximarse al origen. Cambia la pendiente del camino y compara una función continua con otra cuyo valor límite depende de la dirección.</p></div>
        <strong>{mode === "exists" ? "lim f = 0" : "¿existe lim g?"}</strong>
      </figcaption>
      <div className="concept-mode-row" role="group" aria-label="Caso de límite">
        <button type="button" className={mode === "exists" ? "is-active" : ""} onClick={() => setMode("exists")}>El límite existe</button>
        <button type="button" className={mode === "path-dependent" ? "is-active" : ""} onClick={() => setMode("path-dependent")}>Depende del camino</button>
        <span>↻ mover la cámara</span>
      </div>
      <div className="multivariable-limit-stage-wrap">
        <div className="multivariable-limit-stage" ref={mountRef} aria-label="Superficie y camino de aproximación al origen en tres dimensiones" />
        <div className="multivariable-limit-legend"><span><i />camino y=mx</span><span><i />punto móvil</span></div>
      </div>
      <div className="multivariable-limit-controls">
        <label htmlFor="limit-slope">Pendiente m <output>{slope.toFixed(2)}</output></label><input id="limit-slope" type="range" min="-3" max="3" step=".05" value={slope} onChange={(event) => setSlope(Number(event.target.value))} />
        <label htmlFor="limit-distance">Distancia al origen <output>{distance.toFixed(2)}</output></label><input id="limit-distance" type="range" min=".08" max="2.2" step=".02" value={distance} onChange={(event) => setDistance(Number(event.target.value))} />
      </div>
      <div className="multivariable-limit-summary">
        <span>{mode === "exists" ? "f(x,y)=x²+y²" : "g(x,y)=xy/(x²+y²)"}</span>
        <p>Punto: ({x.toFixed(2)}, {y.toFixed(2)})</p>
        <p>Valor actual: <strong>{value.toFixed(3)}</strong></p>
        <p>Por este camino: <strong>{pathLimit.toFixed(3)}</strong></p>
      </div>
      <p className="multivariable-limit-note">{mode === "exists" ? "Al reducir la distancia, todos los caminos llegan a la misma altura: 0." : "Al cambiar m cambia la altura de llegada. Como dos caminos producen valores distintos, el límite bidimensional no existe."}</p>
    </figure>
  );
}
