"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const TAU = Math.PI * 2;

function smoothStep(value: number) {
  const clamped = Math.max(0, Math.min(1, value));
  return clamped * clamped * (3 - 2 * clamped);
}

function pointOnBand(theta: number, across = 0) {
  const revolution = Math.floor(theta / TAU);
  const localTheta = theta - revolution * TAU;
  const twist = revolution * Math.PI + Math.PI * smoothStep((localTheta - Math.PI * 1.24) / (Math.PI * .52));
  const radius = 2.35 + across * Math.sin(twist);
  return new THREE.Vector3(radius * Math.cos(theta), radius * Math.sin(theta), across * Math.cos(twist));
}

function frameOnBand(theta: number) {
  const tangent = pointOnBand(theta + .002).sub(pointOnBand(theta - .002)).normalize();
  const across = pointOnBand(theta, .01).sub(pointOnBand(theta, -.01)).normalize();
  const normal = new THREE.Vector3().crossVectors(tangent, across).normalize();
  return { tangent, across, normal };
}

function createBandGeometry() {
  const along = 192;
  const acrossSteps = 24;
  const halfWidth = .52;
  const positions: number[] = [];
  const indices: number[] = [];
  for (let i = 0; i <= along; i += 1) {
    const theta = i / along * TAU;
    for (let j = 0; j <= acrossSteps; j += 1) {
      const across = -halfWidth + j / acrossSteps * halfWidth * 2;
      const point = pointOnBand(theta, across);
      positions.push(point.x, point.y, point.z);
    }
  }
  const row = acrossSteps + 1;
  for (let i = 0; i < along; i += 1) {
    for (let j = 0; j < acrossSteps; j += 1) {
      const a = i * row + j;
      const b = (i + 1) * row + j;
      indices.push(a, b, b + 1, a, b + 1, a + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createGrid() {
  const group = new THREE.Group();
  const material = new THREE.LineBasicMaterial({ color: 0x31515a, transparent: true, opacity: .2 });
  [-.52, 0, .52].forEach((across) => {
    const points = Array.from({ length: 241 }, (_, index) => pointOnBand(index / 240 * TAU, across));
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material));
  });
  for (let i = 0; i < 16; i += 1) {
    const theta = i / 16 * TAU;
    const points = Array.from({ length: 17 }, (_, index) => pointOnBand(theta, -.52 + index / 16 * 1.04));
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material));
  }
  return group;
}

function createWalker() {
  const person = new THREE.Group();
  const dark = new THREE.MeshStandardMaterial({ color: 0x12343d, roughness: .72 });
  const blue = new THREE.MeshStandardMaterial({ color: 0x007190, roughness: .68 });
  const skin = new THREE.MeshStandardMaterial({ color: 0xf0b89b, roughness: .8 });
  const deckMaterial = new THREE.MeshStandardMaterial({ color: 0xd56f52, roughness: .62 });
  const cylinder = (radius: number, height: number, material: THREE.Material) => new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 12), material);

  const torso = cylinder(.12, .62, blue); torso.position.y = .48; person.add(torso);
  const head = new THREE.Mesh(new THREE.SphereGeometry(.18, 18, 14), skin); head.position.y = .94; person.add(head);
  const leftLeg = cylinder(.055, .42, dark); leftLeg.position.set(-.09, .18, 0); leftLeg.rotation.z = -.18; person.add(leftLeg);
  const rightLeg = cylinder(.055, .42, dark); rightLeg.position.set(.09, .18, 0); rightLeg.rotation.z = .18; person.add(rightLeg);
  const leftArm = cylinder(.045, .46, dark); leftArm.position.set(-.25, .57, 0); leftArm.rotation.z = -.72; person.add(leftArm);
  const rightArm = cylinder(.045, .46, dark); rightArm.position.set(.25, .57, 0); rightArm.rotation.z = .72; person.add(rightArm);
  const deck = new THREE.Mesh(new THREE.BoxGeometry(.42, .055, .92), deckMaterial);
  deck.position.y = -.045; person.add(deck);
  [-.28, .28].forEach((z) => {
    const axle = cylinder(.025, .5, dark); axle.rotation.z = Math.PI / 2; axle.position.set(0, -.095, z); person.add(axle);
    [-.235, .235].forEach((x) => {
      const wheel = cylinder(.065, .055, dark); wheel.rotation.z = Math.PI / 2; wheel.position.set(x, -.12, z); person.add(wheel);
    });
  });
  person.scale.setScalar(.72);
  person.traverse((object) => { if (object instanceof THREE.Mesh) object.castShadow = true; });
  return person;
}

type SceneApi = {
  setJourney: (journey: number) => void;
  dispose: () => void;
};

function mountScene(host: HTMLDivElement): SceneApi {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xfffaf6);
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 100);
  camera.position.set(4.7, -5.8, 4.2);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = .07;
  controls.minDistance = 4.2;
  controls.maxDistance = 11;
  controls.target.set(0, 0, 0);

  scene.add(new THREE.HemisphereLight(0xfffbf5, 0x46606a, 2.3));
  const key = new THREE.DirectionalLight(0xffffff, 3.4);
  key.position.set(-4, -5, 7); key.castShadow = true; scene.add(key);
  const fill = new THREE.DirectionalLight(0xf4c8ae, 1.6);
  fill.position.set(5, 3, 1); scene.add(fill);

  const band = new THREE.Mesh(createBandGeometry(), new THREE.MeshStandardMaterial({ color: 0xd8dad7, roughness: .74, metalness: .03, side: THREE.DoubleSide }));
  band.castShadow = true; band.receiveShadow = true; scene.add(band, createGrid());

  const trailMaterial = new THREE.LineBasicMaterial({ color: 0xd56f52, transparent: true, opacity: .92 });
  const trail = new THREE.Line(new THREE.BufferGeometry(), trailMaterial); scene.add(trail);
  const walker = createWalker(); scene.add(walker);
  const start = new THREE.Mesh(new THREE.SphereGeometry(.075, 18, 14), new THREE.MeshStandardMaterial({ color: 0xd56f52 }));
  start.position.copy(pointOnBand(0)).addScaledVector(frameOnBand(0).normal, .025); scene.add(start);

  const setJourney = (journey: number) => {
    const theta = journey * Math.PI * 4;
    const anchor = pointOnBand(theta);
    const { tangent, across, normal } = frameOnBand(theta);
    walker.position.copy(anchor).addScaledVector(normal, .018);
    const basis = new THREE.Matrix4().makeBasis(across, normal, tangent);
    walker.quaternion.setFromRotationMatrix(basis);
    const count = Math.max(2, Math.floor(journey * 520));
    const points = Array.from({ length: count }, (_, index) => {
      const value = index / Math.max(1, count - 1) * theta;
      const frame = frameOnBand(value);
      return pointOnBand(value).addScaledVector(frame.normal, .018);
    });
    trail.geometry.dispose();
    trail.geometry = new THREE.BufferGeometry().setFromPoints(points);
  };

  const resize = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(1, height);
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize); observer.observe(host); resize(); setJourney(0);
  let animationFrame = 0;
  const render = () => { controls.update(); renderer.render(scene, camera); animationFrame = requestAnimationFrame(render); };
  render();

  return {
    setJourney,
    dispose: () => {
      cancelAnimationFrame(animationFrame); observer.disconnect(); controls.dispose(); renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          object.geometry?.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material?.dispose());
        }
      });
      renderer.domElement.remove();
    },
  };
}

export function MoebiusWalk3D() {
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneApi | null>(null);
  const frameRef = useRef<number | null>(null);
  const journeyRef = useRef(0);
  const [journey, setJourneyState] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!hostRef.current) return;
    sceneRef.current = mountScene(hostRef.current);
    return () => { sceneRef.current?.dispose(); sceneRef.current = null; };
  }, []);

  const setJourney = (value: number) => {
    journeyRef.current = value; setJourneyState(value); sceneRef.current?.setJourney(value);
  };
  const stop = () => {
    setPlaying(false);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  };
  const toggle = () => {
    if (playing) return stop();
    if (journeyRef.current >= .998) setJourney(0);
    setPlaying(true);
    let previous = performance.now();
    const frame = (now: number) => {
      const next = Math.min(1, journeyRef.current + (now - previous) / 16000);
      previous = now; setJourney(next);
      if (next < 1) frameRef.current = requestAnimationFrame(frame); else stop();
    };
    frameRef.current = requestAnimationFrame(frame);
  };
  useEffect(() => () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); }, []);

  const status = journey < .5 ? "lado inicial" : journey < .998 ? "lado continuo" : "regreso al inicio";
  return (
    <figure className="moebius-lab walking-lab moebius-three-lab">
      <header><p>EXPLORACIÓN 02 · UN SOLO LADO</p><h3>Caminar y dejar una huella en 3D</h3><p>Arrastra para girar la banda y usa la rueda o el gesto de pinza para acercarte. La figura permanece perpendicular a la superficie durante todo el recorrido.</p></header>
      <div ref={hostRef} className="moebius-three-stage" role="img" aria-label="Banda de Möbius tridimensional manipulable con una figura en skate que recorre su línea central">
        <div className="moebius-camera-hint" aria-hidden="true"><span>⟳</span> Mover la cámara</div>
      </div>
      <div className="moebius-controls">
        <button type="button" onClick={toggle}>{playing ? "Pausar" : journey >= .998 ? "Repetir" : "Comenzar a caminar"}</button>
        <button type="button" className="secondary" onClick={() => { stop(); setJourney(0); }}>Volver al inicio</button>
        <label>Recorrido: <strong>{status}</strong><input type="range" min="0" max="1" step="0.002" value={journey} onChange={(event) => { stop(); setJourney(Number(event.target.value)); }} /></label>
      </div>
      <figcaption>Al completar una vuelta, la figura llega al mismo punto sobre el lado que parecía opuesto; la segunda vuelta recupera su orientación inicial.</figcaption>
    </figure>
  );
}
