"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function density(x: number, y: number, z: number) {
  return 1 + .08 * (x * x + y * y + z * z);
}

function exactIntegral(a: number, b: number, c: number) {
  return a * b * c + .08 * ((a ** 3 / 3) * b * c + a * (b ** 3 / 3) * c + a * b * (c ** 3 / 3));
}

function midpointSum(a: number, b: number, c: number, divisions: number) {
  const dx = a / divisions;
  const dy = b / divisions;
  const dz = c / divisions;
  let sum = 0;
  for (let i = 0; i < divisions; i += 1) {
    for (let j = 0; j < divisions; j += 1) {
      for (let k = 0; k < divisions; k += 1) {
        sum += density((i + .5) * dx, (j + .5) * dy, (k + .5) * dz) * dx * dy * dz;
      }
    }
  }
  return sum;
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

export default function TripleIntegral3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<THREE.Group | null>(null);
  const [a, setA] = useState(2.6);
  const [b, setB] = useState(2.15);
  const [c, setC] = useState(1.8);
  const [divisions, setDivisions] = useState(3);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(38, 1, .1, 100);
    camera.position.set(6.4, 5.2, 6.7);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, .7, 0);
    controls.minDistance = 4.3;
    controls.maxDistance = 12;
    scene.add(new THREE.HemisphereLight(0xffffff, 0xdbe5df, 2.5));
    const light = new THREE.DirectionalLight(0xffffff, 2.8);
    light.position.set(5, 8, 5);
    scene.add(light);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), new THREE.MeshPhongMaterial({ color: 0xf8f5ed, transparent: true, opacity: .55, side: THREE.DoubleSide }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -.04;
    scene.add(floor);
    const grid = new THREE.GridHelper(7, 14, 0xa8b7ba, 0xdce3e1);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = .34;
    scene.add(grid);
    const cells = new THREE.Group();
    cellsRef.current = cells;
    scene.add(cells);
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
      cellsRef.current = null;
    };
  }, []);

  useEffect(() => {
    const group = cellsRef.current;
    if (!group) return;
    disposeGroup(group);
    const dx = a / divisions;
    const dy = b / divisions;
    const dz = c / divisions;
    const gap = Math.min(dx, dy, dz) * .075;
    const low = new THREE.Color(0xb9ddec);
    const high = new THREE.Color(0xd58f72);
    const maxDensity = density(a, b, c);
    for (let i = 0; i < divisions; i += 1) {
      for (let j = 0; j < divisions; j += 1) {
        for (let k = 0; k < divisions; k += 1) {
          const x = (i + .5) * dx;
          const y = (j + .5) * dy;
          const z = (k + .5) * dz;
          const t = (density(x, y, z) - 1) / Math.max(.001, maxDensity - 1);
          const color = low.clone().lerp(high, t);
          const cube = new THREE.Mesh(
            new THREE.BoxGeometry(Math.max(.02, dx - gap), Math.max(.02, dz - gap), Math.max(.02, dy - gap)),
            new THREE.MeshPhongMaterial({ color, transparent: true, opacity: .36 + .22 * t, side: THREE.DoubleSide, depthWrite: false }),
          );
          cube.position.set(x - a / 2, z, y - b / 2);
          group.add(cube);
        }
      }
    }
    const outlineGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(a, c, b));
    const outline = new THREE.LineSegments(outlineGeometry, new THREE.LineBasicMaterial({ color: 0x173d48, transparent: true, opacity: .74 }));
    outline.position.y = c / 2;
    group.add(outline);
  }, [a, b, c, divisions]);

  const exact = useMemo(() => exactIntegral(a, b, c), [a, b, c]);
  const approximation = useMemo(() => midpointSum(a, b, c, divisions), [a, b, c, divisions]);
  const cellCount = divisions ** 3;
  const deltaV = (a * b * c) / cellCount;

  return (
    <figure className="vector-concept-explorer triple-integral-explorer" id="integral-triple-riemann-3d">
      <figcaption>
        <div><span>EXPLORACIÓN · INTEGRAL TRIPLE</span><h5>Acumular pequeñas contribuciones en el espacio</h5><p>La región <i>B</i> se divide en celdas de volumen ΔV. En cada una evaluamos la densidad <i>f(x,y,z)</i>; al refinar la partición, la suma de Riemann se acerca a la integral.</p></div>
        <strong>∭<sub>B</sub> f dV</strong>
      </figcaption>
      <div className="concept-mode-row"><span>↻ mover la cámara</span></div>
      <div className="triple-integral-stage-wrap">
        <div className="triple-integral-stage" ref={mountRef} aria-label="Región tridimensional subdividida para una suma de Riemann" />
        <div className="triple-integral-legend"><span><i />menor densidad</span><span><i />mayor densidad</span></div>
      </div>
      <div className="triple-integral-controls">
        <label htmlFor="triple-a">Límite a <output>{a.toFixed(1)}</output></label><input id="triple-a" type="range" min="1" max="3.4" step=".1" value={a} onChange={(event) => setA(Number(event.target.value))} />
        <label htmlFor="triple-b">Límite b <output>{b.toFixed(1)}</output></label><input id="triple-b" type="range" min="1" max="3.4" step=".1" value={b} onChange={(event) => setB(Number(event.target.value))} />
        <label htmlFor="triple-c">Límite c <output>{c.toFixed(1)}</output></label><input id="triple-c" type="range" min="1" max="3.4" step=".1" value={c} onChange={(event) => setC(Number(event.target.value))} />
        <label htmlFor="triple-n">Divisiones n <output>{divisions}</output></label><input id="triple-n" type="range" min="1" max="5" step="1" value={divisions} onChange={(event) => setDivisions(Number(event.target.value))} />
      </div>
      <div className="triple-integral-summary">
        <span>{cellCount} celdas · ΔV={deltaV.toFixed(3)}</span>
        <p>Suma: <strong>{approximation.toFixed(3)}</strong></p>
        <p>Integral exacta: <strong>{exact.toFixed(3)}</strong></p>
        <p>Error: <strong>{Math.abs(exact - approximation).toFixed(3)}</strong></p>
      </div>
    </figure>
  );
}
