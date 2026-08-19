"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const VISUAL_HEIGHT_SCALE = 0.58;
const DOMAIN = 2.05;

type DynamicParts = {
  cuttingPlane: THREE.Mesh;
  cuttingFrame: THREE.LineLoop;
  levelCurve: THREE.Mesh;
  projectedCurve: THREE.Line;
  guides: THREE.LineSegments;
};

function circlePoints(radius: number, height: number) {
  return Array.from({ length: 129 }, (_, index) => {
    const angle = index / 128 * Math.PI * 2;
    return new THREE.Vector3(radius * Math.cos(angle), height, radius * Math.sin(angle));
  });
}

function createSurfaceGeometry() {
  const divisions = 54;
  const vertices: number[] = [];
  const indices: number[] = [];

  for (let row = 0; row <= divisions; row += 1) {
    const y = -DOMAIN + row / divisions * DOMAIN * 2;
    for (let column = 0; column <= divisions; column += 1) {
      const x = -DOMAIN + column / divisions * DOMAIN * 2;
      vertices.push(x, VISUAL_HEIGHT_SCALE * (x * x + y * y), y);
    }
  }

  for (let row = 0; row < divisions; row += 1) {
    for (let column = 0; column < divisions; column += 1) {
      const current = row * (divisions + 1) + column;
      const next = current + divisions + 1;
      indices.push(current, next, current + 1, current + 1, next, next + 1);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createAxisLabel(text: string, color = "#153640") {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    context.font = "italic 700 68px Georgia";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, 64, 62);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }),
  );
  sprite.scale.set(0.34, 0.34, 1);
  sprite.renderOrder = 8;
  return sprite;
}

function updateGuides(guides: THREE.LineSegments, radius: number, height: number) {
  const points: THREE.Vector3[] = [];
  for (let index = 0; index < 12; index += 1) {
    const angle = index / 12 * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0.018, y), new THREE.Vector3(x, height, y));
  }
  guides.geometry.dispose();
  guides.geometry = new THREE.BufferGeometry().setFromPoints(points);
}

export default function LevelCurves3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const partsRef = useRef<DynamicParts | null>(null);
  const [level, setLevel] = useState(1.8);

  const radius = Math.sqrt(level);
  const visualHeight = level * VISUAL_HEIGHT_SCALE;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(5.8, 4.9, 6.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 5;
    controls.maxDistance = 14;
    controls.maxPolarAngle = Math.PI * 0.49;
    controls.target.set(0, 1.15, 0);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xdce9dd, 2.2));
    const light = new THREE.DirectionalLight(0xffffff, 2.8);
    light.position.set(4, 7, 5);
    scene.add(light);

    const surfaceGeometry = createSurfaceGeometry();
    const surface = new THREE.Mesh(
      surfaceGeometry,
      new THREE.MeshPhongMaterial({
        color: 0xddebd2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.58,
        shininess: 22,
        depthWrite: false,
      }),
    );
    scene.add(surface);

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(surfaceGeometry),
      new THREE.LineBasicMaterial({ color: 0x9db1a1, transparent: true, opacity: 0.16 }),
    );
    scene.add(wire);

    const basePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(DOMAIN * 2.25, DOMAIN * 2.25),
      new THREE.MeshPhongMaterial({ color: 0xf8f3e5, transparent: true, opacity: 0.58, side: THREE.DoubleSide }),
    );
    basePlane.rotation.x = -Math.PI / 2;
    basePlane.position.y = -0.02;
    scene.add(basePlane);

    const baseGrid = new THREE.GridHelper(DOMAIN * 2.2, 12, 0x8fa0a4, 0xd5dedf);
    (baseGrid.material as THREE.Material).transparent = true;
    (baseGrid.material as THREE.Material).opacity = 0.38;
    scene.add(baseGrid);

    const cuttingPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(DOMAIN * 2.15, DOMAIN * 2.15),
      new THREE.MeshBasicMaterial({ color: 0xb9ddec, transparent: true, opacity: 0.28, side: THREE.DoubleSide, depthWrite: false, depthTest: false }),
    );
    cuttingPlane.rotation.x = -Math.PI / 2;
    cuttingPlane.renderOrder = 2;
    scene.add(cuttingPlane);

    const planeHalfSize = DOMAIN * 1.075;
    const cuttingFrame = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-planeHalfSize, 0, -planeHalfSize),
        new THREE.Vector3(planeHalfSize, 0, -planeHalfSize),
        new THREE.Vector3(planeHalfSize, 0, planeHalfSize),
        new THREE.Vector3(-planeHalfSize, 0, planeHalfSize),
      ]),
      new THREE.LineBasicMaterial({ color: 0x75b7c8, transparent: true, opacity: 0.75, depthTest: false }),
    );
    cuttingFrame.renderOrder = 3;
    scene.add(cuttingFrame);

    const levelCurve = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.035, 12, 128),
      new THREE.MeshBasicMaterial({ color: 0x007d9d }),
    );
    levelCurve.rotation.x = Math.PI / 2;
    levelCurve.renderOrder = 5;
    scene.add(levelCurve);

    const projectedCurve = new THREE.Line(
      new THREE.BufferGeometry(),
      new THREE.LineDashedMaterial({ color: 0x7e812d, dashSize: 0.13, gapSize: 0.08, transparent: true, opacity: 0.95 }),
    );
    projectedCurve.renderOrder = 3;
    scene.add(projectedCurve);

    const guides = new THREE.LineSegments(
      new THREE.BufferGeometry(),
      new THREE.LineDashedMaterial({ color: 0x8aa2a7, dashSize: 0.09, gapSize: 0.08, transparent: true, opacity: 0.34 }),
    );
    scene.add(guides);

    // Three.js usa Y como eje vertical. En la notación matemática de la
    // visualización, ese eje representa z y el plano horizontal representa xy.
    const origin = new THREE.Vector3(0, 0.025, 0);
    const axisLength = DOMAIN * 1.18;
    const axisMaterial = new THREE.LineBasicMaterial({ color: 0x153640 });
    const negativeAxes = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-axisLength, origin.y, 0), origin,
        new THREE.Vector3(0, origin.y, -axisLength), origin,
      ]),
      axisMaterial,
    );
    scene.add(
      negativeAxes,
      new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), origin, axisLength, 0x153640, 0.16, 0.08),
      new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), origin, axisLength, 0x153640, 0.16, 0.08),
      new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), origin, 3.05, 0x153640, 0.16, 0.08),
    );

    const xLabel = createAxisLabel("x");
    xLabel.position.set(axisLength + 0.18, 0.08, 0);
    const yLabel = createAxisLabel("y");
    yLabel.position.set(0, 0.08, axisLength + 0.18);
    const zLabel = createAxisLabel("z");
    zLabel.position.set(0.08, 3.2, 0);
    scene.add(xLabel, yLabel, zLabel);

    partsRef.current = { cuttingPlane, cuttingFrame, levelCurve, projectedCurve, guides };

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
      partsRef.current = null;
    };
  }, []);

  useEffect(() => {
    const parts = partsRef.current;
    if (!parts) return;
    parts.cuttingPlane.position.y = visualHeight;
    parts.cuttingFrame.position.y = visualHeight + 0.012;

    parts.levelCurve.position.y = visualHeight + 0.025;
    parts.levelCurve.scale.set(radius, radius, 1);

    parts.projectedCurve.geometry.dispose();
    parts.projectedCurve.geometry = new THREE.BufferGeometry().setFromPoints(circlePoints(radius, 0.025));
    (parts.projectedCurve as THREE.Line<THREE.BufferGeometry, THREE.LineDashedMaterial>).computeLineDistances();

    updateGuides(parts.guides, radius, visualHeight);
    (parts.guides as THREE.LineSegments<THREE.BufferGeometry, THREE.LineDashedMaterial>).computeLineDistances();
  }, [level, radius, visualHeight]);

  return (
    <figure className="level-curves-3d" id="curvas-de-nivel-3d">
      <figcaption>
        <div>
          <span>EXPLORACIÓN 3D · CURVAS DE NIVEL</span>
          <h5>Cortar una superficie a una altura constante</h5>
          <p>El plano <i>z = c</i> corta el paraboloide. La intersección azul es la curva de nivel y la línea oliva muestra su proyección en el plano <i>xy</i>.</p>
        </div>
        <strong>z = x² + y²</strong>
      </figcaption>

      <div className="level-curves-stage-wrap">
        <div
          ref={mountRef}
          className="level-curves-stage"
          role="img"
          aria-label={`Paraboloide tridimensional cortado por el plano z igual a ${level.toFixed(1)}. La curva de nivel es una circunferencia de radio ${radius.toFixed(2)}.`}
        />
        <span className="level-curves-camera-hint" aria-hidden="true">↕ ARRASTRA PARA GIRAR · SCROLL PARA ACERCAR</span>
        <div className="level-curves-legend" aria-hidden="true">
          <span><i /> superficie</span>
          <span><i /> curva de nivel</span>
          <span><i /> proyección en <em>xy</em></span>
        </div>
      </div>

      <div className="level-curves-controls">
        <label htmlFor="level-curves-height">
          Altura del corte <i>c</i>
          <output>{level.toFixed(1)}</output>
        </label>
        <input
          id="level-curves-height"
          type="range"
          min="0.3"
          max="3"
          step="0.1"
          value={level}
          onChange={(event) => setLevel(Number(event.target.value))}
        />
        <p aria-live="polite">x² + y² = {level.toFixed(1)} <span>·</span> radio = √{level.toFixed(1)} ≈ {radius.toFixed(2)}</p>
      </div>
    </figure>
  );
}
