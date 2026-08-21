"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type PlaneKind = "osculating" | "normal" | "rectifying";

const RADIUS = 1.55;
const VERTICAL_RATE = 0.28;

function curvePoint(t: number) {
  return new THREE.Vector3(RADIUS * Math.cos(t), VERTICAL_RATE * (t - Math.PI * 2), RADIUS * Math.sin(t));
}

function frameAt(t: number) {
  const tangent = new THREE.Vector3(-RADIUS * Math.sin(t), VERTICAL_RATE, RADIUS * Math.cos(t)).normalize();
  const normal = new THREE.Vector3(-Math.cos(t), 0, -Math.sin(t)).normalize();
  const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();
  return { tangent, normal, binormal };
}

function planeFromBasis(center: THREE.Vector3, first: THREE.Vector3, second: THREE.Vector3, color: number) {
  const size = 1.05;
  const a = first.clone().multiplyScalar(size);
  const b = second.clone().multiplyScalar(size);
  const points = [
    center.clone().sub(a).sub(b), center.clone().add(a).sub(b),
    center.clone().add(a).add(b), center.clone().sub(a).add(b),
  ];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: .25, depthWrite: false }));
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

export default function FrenetFrame3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const dynamicRef = useRef<THREE.Group | null>(null);
  const [progress, setProgress] = useState(44);
  const [plane, setPlane] = useState<PlaneKind>("osculating");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(38, 1, .1, 100);
    camera.position.set(5.4, 3.8, 6.2);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.minDistance = 4;
    controls.maxDistance = 12;
    scene.add(new THREE.HemisphereLight(0xffffff, 0xe2e9df, 2.5));
    const light = new THREE.DirectionalLight(0xffffff, 2.7);
    light.position.set(5, 7, 4);
    scene.add(light);

    const curvePoints = Array.from({ length: 241 }, (_, index) => curvePoint(index / 240 * Math.PI * 4));
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 260, .035, 10, false), new THREE.MeshPhongMaterial({ color: 0x7399a3 }));
    scene.add(tube);
    const axis = new THREE.Vector3(0, -2.05, 0);
    scene.add(
      new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), axis, 3.1, 0x173d48, .14, .07),
      new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), axis, 3.1, 0x173d48, .14, .07),
      new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -2.05, 0), 4.1, 0x173d48, .14, .07),
    );
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
    let animation = 0;
    const render = () => { controls.update(); renderer.render(scene, camera); animation = requestAnimationFrame(render); };
    render();
    return () => {
      cancelAnimationFrame(animation);
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
    const t = progress / 100 * Math.PI * 4;
    const point = curvePoint(t);
    const { tangent, normal, binormal } = frameAt(t);
    const marker = new THREE.Mesh(new THREE.SphereGeometry(.11, 24, 16), new THREE.MeshPhongMaterial({ color: 0xd58f72 }));
    marker.position.copy(point);
    const arrowLength = 1.05;
    const tangentArrow = new THREE.ArrowHelper(tangent, point, arrowLength, 0x007d9d, .18, .09);
    const normalArrow = new THREE.ArrowHelper(normal, point, arrowLength, 0x7e812d, .18, .09);
    const binormalArrow = new THREE.ArrowHelper(binormal, point, arrowLength, 0x99c970, .18, .09);
    const bases = plane === "osculating" ? [tangent, normal] : plane === "normal" ? [normal, binormal] : [tangent, binormal];
    const planeColor = plane === "osculating" ? 0xb9ddec : plane === "normal" ? 0xefe1b8 : 0xddebd2;
    group.add(marker, tangentArrow, normalArrow, binormalArrow, planeFromBasis(point, bases[0], bases[1], planeColor));

    const curvatureRadius = (RADIUS * RADIUS + VERTICAL_RATE * VERTICAL_RATE) / RADIUS;
    const circleCenter = point.clone().add(normal.clone().multiplyScalar(curvatureRadius));
    const circlePoints = Array.from({ length: 97 }, (_, index) => {
      const angle = index / 96 * Math.PI * 2;
      return circleCenter.clone()
        .add(normal.clone().multiplyScalar(-curvatureRadius * Math.cos(angle)))
        .add(tangent.clone().multiplyScalar(curvatureRadius * Math.sin(angle)));
    });
    const circle = new THREE.Line(new THREE.BufferGeometry().setFromPoints(circlePoints), new THREE.LineDashedMaterial({ color: 0xd58f72, dashSize: .1, gapSize: .07, transparent: true, opacity: .7 }));
    circle.computeLineDistances();
    group.add(circle);
  }, [progress, plane]);

  const curvature = RADIUS / (RADIUS * RADIUS + VERTICAL_RATE * VERTICAL_RATE);
  const planeLabel = plane === "osculating" ? "span(T,N)" : plane === "normal" ? "span(N,B)" : "span(T,B)";

  return (
    <figure className="vector-concept-explorer frenet-explorer" id="curvatura-triedro-frenet-3d">
      <figcaption>
        <div><span>EXPLORACIÓN · CURVATURA</span><h5>Un sistema de referencia que viaja con la curva</h5><p>El vector tangente indica hacia dónde avanza la trayectoria; el normal señala hacia dónde se curva y el binormal completa el triedro perpendicular.</p></div>
        <strong>T · N = T · B = N · B = 0</strong>
      </figcaption>
      <div className="frenet-plane-buttons" role="group" aria-label="Plano del triedro de Frenet">
        <button type="button" className={plane === "osculating" ? "is-active" : ""} onClick={() => setPlane("osculating")}>Plano osculador</button>
        <button type="button" className={plane === "normal" ? "is-active" : ""} onClick={() => setPlane("normal")}>Plano normal</button>
        <button type="button" className={plane === "rectifying" ? "is-active" : ""} onClick={() => setPlane("rectifying")}>Plano rectificante</button>
        <span>↻ mover la cámara</span>
      </div>
      <div className="frenet-stage-wrap">
        <div className="frenet-stage" ref={mountRef} aria-label="Hélice tridimensional con su triedro de Frenet" />
        <div className="frenet-legend"><span><i />Tangente T</span><span><i />Normal N</span><span><i />Binormal B</span><span><i />Círculo osculador</span></div>
      </div>
      <div className="frenet-controls">
        <label htmlFor="frenet-progress">Posición t <output>{(progress / 100 * 4).toFixed(2)}π</output></label>
        <input id="frenet-progress" type="range" min="0" max="100" step="1" value={progress} onChange={(event) => setProgress(Number(event.target.value))} />
        <p>Plano visible: {planeLabel}</p><strong>Curvatura κ = {curvature.toFixed(3)}</strong>
      </div>
    </figure>
  );
}
