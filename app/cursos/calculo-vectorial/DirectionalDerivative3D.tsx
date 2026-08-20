"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const DOMAIN = 2.35;
const HEIGHT_SCALE = 0.34;
const POINT = { x: 1, y: 0 };

function height(x: number, y: number) {
  return x * x + y * y;
}

function makeSurfaceGeometry(divisions = 58) {
  const vertices: number[] = [];
  const indices: number[] = [];
  for (let row = 0; row <= divisions; row += 1) {
    const y = -DOMAIN + row / divisions * DOMAIN * 2;
    for (let column = 0; column <= divisions; column += 1) {
      const x = -DOMAIN + column / divisions * DOMAIN * 2;
      vertices.push(x, HEIGHT_SCALE * height(x, y), y);
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

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    const renderable = child as THREE.Mesh;
    renderable.geometry?.dispose();
    const materials = Array.isArray(renderable.material)
      ? renderable.material
      : renderable.material
        ? [renderable.material]
        : [];
    materials.forEach((material) => material.dispose());
  });
}

export default function DirectionalDerivative3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const dynamicRef = useRef<THREE.Group | null>(null);
  const [angle, setAngle] = useState(0);

  const radians = angle * Math.PI / 180;
  const ux = Math.cos(radians);
  const uy = Math.sin(radians);
  const derivative = 2 * ux;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(6.3, 4.7, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 4.5;
    controls.maxDistance = 14;
    controls.target.set(0.35, 0.75, 0);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xdde8df, 2.2));
    const light = new THREE.DirectionalLight(0xffffff, 2.5);
    light.position.set(5, 8, 4);
    scene.add(light);

    const surfaceGeometry = makeSurfaceGeometry();
    scene.add(new THREE.Mesh(
      surfaceGeometry,
      new THREE.MeshPhongMaterial({
        color: 0xdcebd2,
        transparent: true,
        opacity: 0.68,
        side: THREE.DoubleSide,
        shininess: 22,
        depthWrite: false,
      }),
    ));
    scene.add(new THREE.LineSegments(
      new THREE.WireframeGeometry(surfaceGeometry),
      new THREE.LineBasicMaterial({ color: 0x93aa9c, transparent: true, opacity: 0.11 }),
    ));

    const grid = new THREE.GridHelper(5.5, 11, 0x819296, 0xd5dede);
    grid.position.y = -0.015;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.32;
    scene.add(grid);

    const resize = () => {
      const width = mount.clientWidth;
      const stageHeight = mount.clientHeight;
      renderer.setSize(width, stageHeight, false);
      camera.aspect = width / stageHeight;
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
      sceneRef.current = null;
      dynamicRef.current = null;
      disposeObject(scene);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (dynamicRef.current) {
      scene.remove(dynamicRef.current);
      disposeObject(dynamicRef.current);
    }

    const group = new THREE.Group();
    const direction = new THREE.Vector3(ux, 0, uy);
    const pointOnDomain = new THREE.Vector3(POINT.x, 0, POINT.y);
    const pointOnSurface = new THREE.Vector3(POINT.x, HEIGHT_SCALE, POINT.y);

    const verticalPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(4.4, 2.35),
      new THREE.MeshBasicMaterial({
        color: 0xb9ddec,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    verticalPlane.position.copy(pointOnDomain).add(new THREE.Vector3(0, 1.15, 0));
    verticalPlane.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), direction);
    verticalPlane.renderOrder = 1;
    group.add(verticalPlane);

    const curvePoints: THREE.Vector3[] = [];
    for (let index = 0; index <= 100; index += 1) {
      const t = -1.65 + index / 100 * 3.3;
      const x = POINT.x + t * ux;
      const y = POINT.y + t * uy;
      curvePoints.push(new THREE.Vector3(x, HEIGHT_SCALE * height(x, y), y));
    }
    const sectionCurve = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curvePoints),
      new THREE.LineBasicMaterial({ color: 0xd58f72, linewidth: 2 }),
    );
    sectionCurve.renderOrder = 5;
    group.add(sectionCurve);

    const tangentDirection = new THREE.Vector3(ux, HEIGHT_SCALE * derivative, uy).normalize();
    const tangentPoints = [
      pointOnSurface.clone().addScaledVector(tangentDirection, -1.45),
      pointOnSurface.clone().addScaledVector(tangentDirection, 1.45),
    ];
    const tangent = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(tangentPoints),
      new THREE.LineBasicMaterial({ color: 0x007d9d }),
    );
    tangent.renderOrder = 6;
    group.add(tangent);

    const guide = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([pointOnDomain, pointOnSurface]),
      new THREE.LineDashedMaterial({ color: 0x79898e, dashSize: 0.08, gapSize: 0.06, transparent: true, opacity: 0.65 }),
    );
    guide.computeLineDistances();
    group.add(guide);

    const directionArrow = new THREE.ArrowHelper(direction, pointOnDomain, 1.35, 0x7e812d, 0.16, 0.08);
    group.add(directionArrow);

    const point = new THREE.Mesh(
      new THREE.SphereGeometry(0.095, 22, 22),
      new THREE.MeshBasicMaterial({ color: 0xd58f72 }),
    );
    point.position.copy(pointOnSurface);
    point.renderOrder = 7;
    group.add(point);

    scene.add(group);
    dynamicRef.current = group;
  }, [angle, derivative, ux, uy]);

  return (
    <figure className="gradient-tangent-3d directional-derivative-3d" id="derivada-direccional-3d">
      <figcaption>
        <div>
          <span>EXPLORACIÓN 3D · DERIVADA DIRECCIONAL</span>
          <h5>Una superficie, muchas pendientes</h5>
          <p>Gira la dirección unitaria <i>u</i>. El plano celeste produce un corte vertical de la superficie; la recta azul es tangente a ese corte en <i>P=(1,0,1)</i>.</p>
        </div>
        <strong>f(x,y)=x²+y²</strong>
      </figcaption>
      <div className="gradient-tangent-stage-wrap">
        <div
          ref={mountRef}
          className="gradient-tangent-stage"
          role="img"
          aria-label={`Paraboloide con un corte vertical en la dirección de ${angle} grados. La derivada direccional en el punto 1, 0 es ${derivative.toFixed(2)}.`}
        />
        <span className="level-curves-camera-hint" aria-hidden="true">↕ ARRASTRA PARA GIRAR · SCROLL PARA ACERCAR</span>
        <div className="gradient-tangent-legend directional-derivative-legend" aria-hidden="true">
          <span><i /> superficie</span>
          <span><i /> corte vertical</span>
          <span><i /> recta tangente</span>
          <span><i /> dirección u</span>
        </div>
      </div>
      <div className="directional-derivative-controls">
        <label htmlFor="direction-angle">Ángulo θ <output>{angle}°</output></label>
        <input
          id="direction-angle"
          type="range"
          min="0"
          max="360"
          step="1"
          value={angle}
          onChange={(event) => setAngle(Number(event.target.value))}
        />
        <p>u = ({ux.toFixed(2)}, {uy.toFixed(2)})</p>
        <strong>D<sub>u</sub>f(1,0) = ∇f(1,0) · u = {derivative.toFixed(2)}</strong>
      </div>
    </figure>
  );
}
