"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type Mode = "cylindrical" | "spherical";

function line(points: THREE.Vector3[], color: number, dashed = false) {
  const material = dashed
    ? new THREE.LineDashedMaterial({ color, dashSize: 0.11, gapSize: 0.07 })
    : new THREE.LineBasicMaterial({ color });
  const result = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
  if (dashed) result.computeLineDistances();
  return result;
}

function arcPoints(radius: number, angle: number, height = 0) {
  return Array.from({ length: 65 }, (_, index) => {
    const t = angle * index / 64;
    return new THREE.Vector3(radius * Math.cos(t), height, radius * Math.sin(t));
  });
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

export default function CoordinateSystems3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const dynamicRef = useRef<THREE.Group | null>(null);
  const [mode, setMode] = useState<Mode>("cylindrical");
  const [radius, setRadius] = useState(1.7);
  const [theta, setTheta] = useState(48);
  const [height, setHeight] = useState(1.35);
  const [rho, setRho] = useState(2.25);
  const [phi, setPhi] = useState(56);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(5.4, 4.2, 6.2);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, .55, 0);
    controls.minDistance = 4.3;
    controls.maxDistance = 11;

    scene.add(new THREE.HemisphereLight(0xffffff, 0xe4eadf, 2.4));
    const light = new THREE.DirectionalLight(0xffffff, 2.5);
    light.position.set(4, 7, 5);
    scene.add(light);

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 6.4), new THREE.MeshPhongMaterial({ color: 0xf8f5ed, transparent: true, opacity: .55, side: THREE.DoubleSide }));
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -.015;
    scene.add(plane);
    const grid = new THREE.GridHelper(6.4, 12, 0x9aadb0, 0xd9e1df);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = .42;
    scene.add(grid);

    const axis = new THREE.Vector3(0, 0, 0);
    scene.add(
      new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), axis, 3.35, 0x173d48, .15, .08),
      new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), axis, 3.35, 0x173d48, .15, .08),
      new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), axis, 3.25, 0x173d48, .15, .08),
    );
    const dynamic = new THREE.Group();
    dynamicRef.current = dynamic;
    scene.add(dynamic);

    const resize = () => {
      const width = mount.clientWidth;
      const viewHeight = mount.clientHeight;
      renderer.setSize(width, viewHeight, false);
      camera.aspect = width / viewHeight;
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
    const angle = theta * Math.PI / 180;
    let point: THREE.Vector3;

    if (mode === "cylindrical") {
      point = new THREE.Vector3(radius * Math.cos(angle), height, radius * Math.sin(angle));
      const base = new THREE.Vector3(point.x, 0, point.z);
      const cylinderHeight = Math.max(.03, Math.abs(height));
      const cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, cylinderHeight, 64, 1, true),
        new THREE.MeshPhongMaterial({ color: 0xb9ddec, transparent: true, opacity: .18, side: THREE.DoubleSide, depthWrite: false }),
      );
      cylinder.position.y = height / 2;
      group.add(cylinder, line([new THREE.Vector3(), base], 0x7e812d), line([base, point], 0x007d9d, true), line(arcPoints(.62, angle), 0xd58f72));
    } else {
      const polar = phi * Math.PI / 180;
      point = new THREE.Vector3(rho * Math.sin(polar) * Math.cos(angle), rho * Math.cos(polar), rho * Math.sin(polar) * Math.sin(angle));
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(rho, 32, 20),
        new THREE.MeshPhongMaterial({ color: 0xddebd2, wireframe: true, transparent: true, opacity: .16, depthWrite: false }),
      );
      const base = new THREE.Vector3(point.x, 0, point.z);
      const meridianRadius = rho;
      const meridian = Array.from({ length: 65 }, (_, index) => {
        const t = polar * index / 64;
        return new THREE.Vector3(meridianRadius * Math.sin(t) * Math.cos(angle), meridianRadius * Math.cos(t), meridianRadius * Math.sin(t) * Math.sin(angle));
      });
      group.add(sphere, line([new THREE.Vector3(), point], 0x007d9d), line([base, point], 0x9caf72, true), line(meridian, 0xd58f72), line(arcPoints(Math.max(.2, Math.hypot(point.x, point.z)), angle), 0x7e812d));
    }

    const marker = new THREE.Mesh(new THREE.SphereGeometry(.105, 24, 16), new THREE.MeshPhongMaterial({ color: 0xd58f72 }));
    marker.position.copy(point);
    group.add(marker);
  }, [mode, radius, theta, height, rho, phi]);

  const angle = theta * Math.PI / 180;
  const polar = phi * Math.PI / 180;
  const xyz = mode === "cylindrical"
    ? [radius * Math.cos(angle), radius * Math.sin(angle), height]
    : [rho * Math.sin(polar) * Math.cos(angle), rho * Math.sin(polar) * Math.sin(angle), rho * Math.cos(polar)];

  return (
    <figure className="vector-concept-explorer coordinate-systems-explorer" id="coordenadas-cilindricas-esfericas-3d">
      <figcaption>
        <div><span>EXPLORACIÓN · COORDENADAS EN EL ESPACIO</span><h5>Dos maneras de localizar un mismo tipo de punto</h5><p>Construye el punto usando distancia, ángulos y altura. Arrastra la escena para observar cómo las coordenadas describen la geometría desde distintos puntos de vista.</p></div>
        <strong>{mode === "cylindrical" ? "(r,θ,z)" : "(ρ,θ,φ)"}</strong>
      </figcaption>
      <div className="concept-mode-row" role="group" aria-label="Sistema de coordenadas">
        <button type="button" className={mode === "cylindrical" ? "is-active" : ""} onClick={() => setMode("cylindrical")}>Cilíndricas</button>
        <button type="button" className={mode === "spherical" ? "is-active" : ""} onClick={() => setMode("spherical")}>Esféricas</button>
        <span>↻ mover la cámara</span>
      </div>
      <div className="coordinate-systems-stage-wrap"><div className="coordinate-systems-stage" ref={mountRef} aria-label="Escena tridimensional interactiva" /></div>
      <div className="coordinate-controls">
        {mode === "cylindrical" ? <>
          <label htmlFor="cyl-radius">Radio r <output>{radius.toFixed(2)}</output></label><input id="cyl-radius" type="range" min=".35" max="2.6" step=".05" value={radius} onChange={(event) => setRadius(Number(event.target.value))} />
          <label htmlFor="cyl-height">Altura z <output>{height.toFixed(2)}</output></label><input id="cyl-height" type="range" min="-2.4" max="2.4" step=".05" value={height} onChange={(event) => setHeight(Number(event.target.value))} />
        </> : <>
          <label htmlFor="sph-rho">Distancia ρ <output>{rho.toFixed(2)}</output></label><input id="sph-rho" type="range" min=".5" max="2.8" step=".05" value={rho} onChange={(event) => setRho(Number(event.target.value))} />
          <label htmlFor="sph-phi">Ángulo φ <output>{phi}°</output></label><input id="sph-phi" type="range" min="5" max="175" step="1" value={phi} onChange={(event) => setPhi(Number(event.target.value))} />
        </>}
        <label htmlFor="coord-theta">Ángulo θ <output>{theta}°</output></label><input id="coord-theta" type="range" min="0" max="360" step="1" value={theta} onChange={(event) => setTheta(Number(event.target.value))} />
        <p>Punto cartesiano</p><strong>({xyz.map((value) => value.toFixed(2)).join(", ")})</strong>
      </div>
    </figure>
  );
}
