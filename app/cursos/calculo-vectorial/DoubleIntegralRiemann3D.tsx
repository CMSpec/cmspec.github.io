"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const LIMIT = 1.5;
const HEIGHT_SCALE = 0.58;
const EXACT_VALUE = 11.7;

function surfaceValue(x: number, y: number) {
  return 1 + 0.22 * x * x + 0.18 * y * y;
}

function surfaceGeometry(divisions = 42) {
  const geometry = new THREE.PlaneGeometry(LIMIT * 2, LIMIT * 2, divisions, divisions);
  geometry.rotateX(-Math.PI / 2);
  const positions = geometry.attributes.position;
  for (let index = 0; index < positions.count; index += 1) {
    const x = positions.getX(index);
    const y = positions.getZ(index);
    positions.setY(index, HEIGHT_SCALE * surfaceValue(x, y));
  }
  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

export default function DoubleIntegralRiemann3D() {
  const [divisions, setDivisions] = useState(4);
  const [approximation, setApproximation] = useState(EXACT_VALUE);
  const mountRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(5.1, 4.1, 5.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 3.8;
    controls.maxDistance = 12;
    controls.target.set(0, 0.65, 0);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xdde8df, 2.2));
    const light = new THREE.DirectionalLight(0xffffff, 2.5);
    light.position.set(4, 8, 5);
    scene.add(light);

    const graphGeometry = surfaceGeometry();
    const graph = new THREE.Mesh(
      graphGeometry,
      new THREE.MeshPhongMaterial({
        color: 0xddebd3,
        transparent: true,
        opacity: 0.48,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    graph.renderOrder = 3;
    scene.add(graph);
    scene.add(new THREE.LineSegments(
      new THREE.WireframeGeometry(graphGeometry),
      new THREE.LineBasicMaterial({ color: 0x87a09a, transparent: true, opacity: 0.13 }),
    ));

    const region = new THREE.Mesh(
      new THREE.PlaneGeometry(LIMIT * 2, LIMIT * 2),
      new THREE.MeshBasicMaterial({ color: 0xb9ddec, transparent: true, opacity: 0.22, side: THREE.DoubleSide }),
    );
    region.rotation.x = -Math.PI / 2;
    region.position.y = -0.015;
    scene.add(region);
    const regionFrame = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(LIMIT * 2, 0.02, LIMIT * 2)),
      new THREE.LineBasicMaterial({ color: 0x007d9d, transparent: true, opacity: 0.72 }),
    );
    scene.add(regionFrame);

    const grid = new THREE.GridHelper(4.8, 12, 0x71888e, 0xd5dede);
    grid.position.y = -0.03;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.28;
    scene.add(grid);

    const boxes = new THREE.Group();
    boxesRef.current = boxes;
    scene.add(boxes);

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
      boxesRef.current = null;
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
    const boxes = boxesRef.current;
    if (!boxes) return;
    while (boxes.children.length) {
      const child = boxes.children.pop() as THREE.Mesh;
      child.geometry.dispose();
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => material.dispose());
    }

    const width = LIMIT * 2 / divisions;
    let sum = 0;
    for (let row = 0; row < divisions; row += 1) {
      for (let column = 0; column < divisions; column += 1) {
        const x = -LIMIT + (column + 0.5) * width;
        const y = -LIMIT + (row + 0.5) * width;
        const value = surfaceValue(x, y);
        const visualHeight = value * HEIGHT_SCALE;
        sum += value * width * width;
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(width * 0.91, visualHeight, width * 0.91),
          new THREE.MeshPhongMaterial({
            color: (row + column) % 2 === 0 ? 0xb9ddec : 0xcfe6c0,
            transparent: true,
            opacity: 0.62,
          }),
        );
        box.position.set(x, visualHeight / 2, y);
        boxes.add(box);
      }
    }
    setApproximation(sum);
  }, [divisions]);

  return (
    <figure className="gradient-tangent-3d riemann-sum-3d" id="integral-doble-riemann-3d">
      <figcaption>
        <div>
          <span>EXPLORACIÓN 3D · INTEGRAL DOBLE</span>
          <h5>De una suma de Riemann al volumen</h5>
          <p>Cada columna tiene base ΔA y altura f(xᵢ,yᵣ). Al refinar la partición, la suma de sus volúmenes aproxima la integral doble bajo la superficie.</p>
        </div>
        <strong>∫∫<sub>R</sub> f(x,y)dA</strong>
      </figcaption>
      <div className="gradient-tangent-stage-wrap">
        <div ref={mountRef} className="riemann-sum-stage" role="img" aria-label={`Superficie tridimensional y ${divisions * divisions} columnas que aproximan su volumen mediante una suma de Riemann.`} />
        <span className="level-curves-camera-hint" aria-hidden="true">↕ ARRASTRA PARA GIRAR · SCROLL PARA ACERCAR</span>
      </div>
      <div className="riemann-sum-controls">
        <label htmlFor="riemann-divisions">Partición <output>{divisions}×{divisions}</output></label>
        <input id="riemann-divisions" type="range" min="2" max="12" step="1" value={divisions} onChange={(event) => setDivisions(Number(event.target.value))} />
        <p>Suma: {approximation.toFixed(3)}</p>
        <strong>Valor exacto: {EXACT_VALUE.toFixed(3)}</strong>
      </div>
    </figure>
  );
}
