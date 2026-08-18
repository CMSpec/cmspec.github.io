"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const radians = (degrees: number) => degrees * Math.PI / 180;
const tidy = (value: number) => Math.abs(value) < 0.005 ? "0.00" : value.toFixed(2);
const projectionPlaneY = -1;

type SceneParts = {
  point: THREE.Mesh;
  image: THREE.Mesh;
  ray: THREE.Mesh;
  pointLabel: THREE.Sprite;
  imageLabel: THREE.Sprite;
};

function labelSprite(text: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 160;
  canvas.height = 80;
  const context = canvas.getContext("2d");
  if (context) {
    context.font = "700 34px Georgia";
    context.fillStyle = "rgba(255,255,255,.9)";
    context.beginPath();
    context.roundRect(29, 14, 102, 52, 20);
    context.fill();
    context.fillStyle = color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, 80, 41);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
  sprite.scale.set(.65, .325, 1);
  sprite.renderOrder = 8;
  return sprite;
}

function circleLine(rotation: "xy" | "xz" | "yz") {
  const points: THREE.Vector3[] = [];
  for (let index = 0; index <= 96; index += 1) {
    const angle = index / 96 * Math.PI * 2;
    const a = Math.cos(angle);
    const b = Math.sin(angle);
    points.push(rotation === "xy" ? new THREE.Vector3(a, b, 0) : rotation === "xz" ? new THREE.Vector3(a, 0, b) : new THREE.Vector3(0, a, b));
  }
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: 0x9fc1c7, transparent: true, opacity: .58 }));
}

export default function StereographicProjection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const partsRef = useRef<SceneParts | null>(null);
  const [theta, setTheta] = useState(78);
  const [phi, setPhi] = useState(35);
  const [playing, setPlaying] = useState(false);

  const angle = radians(theta);
  const longitude = radians(phi);
  const x = Math.sin(angle) * Math.cos(longitude);
  const y = Math.sin(angle) * Math.sin(longitude);
  const z = Math.cos(angle);
  const projectionScale = (1 - projectionPlaneY) / (1 - z);
  const projectedX = projectionScale * x;
  const projectedY = projectionScale * y;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setTheta((current) => current <= 36 ? 170 : current - .65), 55);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(38, 1, .1, 100);
    camera.position.set(4.7, 3.25, 5.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = .07;
    controls.minDistance = 3.2;
    controls.maxDistance = 12;
    controls.target.set(0, -.32, 0);

    const ambient = new THREE.HemisphereLight(0xffffff, 0xd5e7e4, 2.1);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 2.4);
    directional.position.set(3, 6, 4);
    scene.add(directional);

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.MeshPhongMaterial({ color: 0xddebd2, transparent: true, opacity: .25, side: THREE.DoubleSide, depthWrite: false }),
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = projectionPlaneY;
    plane.renderOrder = 1;
    scene.add(plane);
    const grid = new THREE.GridHelper(8, 16, 0x9fb2a1, 0xdbe6dc);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = .5;
    grid.position.y = projectionPlaneY + .006;
    grid.renderOrder = 2;
    scene.add(grid);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 48, 32),
      new THREE.MeshPhongMaterial({ color: 0xdbecef, transparent: true, opacity: .28, side: THREE.DoubleSide, depthWrite: false }),
    );
    scene.add(sphere, circleLine("xy"), circleLine("xz"), circleLine("yz"));

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(1.004, 24, 14)),
      new THREE.LineBasicMaterial({ color: 0xa7c6cc, transparent: true, opacity: .19 }),
    );
    scene.add(wire);

    scene.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(-3.6, projectionPlaneY + .02, 0), 7.2, 0x7e812d, .18, .09));
    scene.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, projectionPlaneY + .02, -3.6), 7.2, 0x007d9d, .18, .09));

    const north = new THREE.Mesh(new THREE.SphereGeometry(.07, 20, 16), new THREE.MeshPhongMaterial({ color: 0x153640 }));
    north.position.set(0, 1, 0);
    const northLabel = labelSprite("N", "#153640");
    northLabel.position.set(-.12, 1.24, 0);
    scene.add(north, northLabel);

    const point = new THREE.Mesh(new THREE.SphereGeometry(.085, 24, 18), new THREE.MeshPhongMaterial({ color: 0x007d9d }));
    const image = new THREE.Mesh(new THREE.SphereGeometry(.09, 24, 18), new THREE.MeshPhongMaterial({ color: 0x7e812d }));
    const pointLabel = labelSprite("P", "#007d9d");
    const imageLabel = labelSprite("p", "#7e812d");
    const ray = new THREE.Mesh(new THREE.CylinderGeometry(.018, .018, 1, 12), new THREE.MeshPhongMaterial({ color: 0x007d9d, transparent: true, opacity: .88 }));
    scene.add(point, image, pointLabel, imageLabel, ray);
    partsRef.current = { point, image, ray, pointLabel, imageLabel };

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
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
        materials.forEach((material) => {
          const spriteMaterial = material as THREE.SpriteMaterial;
          spriteMaterial.map?.dispose();
          material.dispose();
        });
      });
      renderer.dispose();
      renderer.domElement.remove();
      partsRef.current = null;
    };
  }, []);

  useEffect(() => {
    const parts = partsRef.current;
    if (!parts) return;
    const pointPosition = new THREE.Vector3(x, z, y);
    const imagePosition = new THREE.Vector3(projectedX, projectionPlaneY + .025, projectedY);
    parts.point.position.copy(pointPosition);
    parts.image.position.copy(imagePosition);
    parts.pointLabel.position.copy(pointPosition).add(new THREE.Vector3(.13, .19, .08));
    parts.imageLabel.position.copy(imagePosition).add(new THREE.Vector3(.13, .19, .08));

    const north = new THREE.Vector3(0, 1, 0);
    const direction = imagePosition.clone().sub(north);
    parts.ray.position.copy(north.clone().add(imagePosition).multiplyScalar(.5));
    parts.ray.scale.set(1, direction.length(), 1);
    parts.ray.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
  }, [x, y, z, projectedX, projectedY]);

  return (
    <figure className="stereo-explorer" id="proyeccion-estereografica">
      <figcaption>
        <span>EXPLORACIÓN 3D · PROYECCIÓN ESTEREOGRÁFICA</span>
        <strong>Del polo norte al plano</strong>
        <p>Gira la cámara para seguir la recta que une el polo N con P y corta el plano en p. Acerca P al polo para ver cómo su imagen se aleja.</p>
      </figcaption>
      <div className="stereo-scene-wrap">
        <div
          ref={mountRef}
          className="stereo-scene"
          role="img"
          aria-label={`Escena tridimensional: el punto P de la esfera se proyecta en el punto p igual a ${tidy(projectedX)}, ${tidy(projectedY)} del plano`}
        />
        <span className="stereo-camera-hint" aria-hidden="true">↻ ARRASTRA PARA GIRAR · SCROLL PARA ACERCAR</span>
        <div className="stereo-scene-legend" aria-hidden="true"><span><i /> esfera S²</span><span><i /> plano transparente z=−1</span><span><i /> recta N—p</span></div>
      </div>
      <div className="stereo-controls">
        <label>
          <span>Colatitud θ <strong>{theta.toFixed(0)}°</strong></span>
          <input type="range" min="35" max="170" step="1" value={theta} onChange={(event) => { setPlaying(false); setTheta(Number(event.target.value)); }} />
        </label>
        <label>
          <span>Longitud φ <strong>{phi.toFixed(0)}°</strong></span>
          <input type="range" min="-180" max="180" step="1" value={phi} onChange={(event) => setPhi(Number(event.target.value))} />
        </label>
        <button type="button" onClick={() => setPlaying((value) => !value)} aria-pressed={playing}>{playing ? "Pausar" : "Animar"}</button>
      </div>
      <p className="stereo-result" aria-live="polite">P = ({tidy(x)}, {tidy(y)}, {tidy(z)}) <span>↦</span> p = ({tidy(projectedX)}, {tidy(projectedY)})</p>
    </figure>
  );
}
