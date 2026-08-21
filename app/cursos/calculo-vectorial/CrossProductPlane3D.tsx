"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const U = new THREE.Vector3(2, 1, 0);
const V = new THREE.Vector3(-1, 1, 2);
const P = new THREE.Vector3(.5, -.6, .4);
const N = new THREE.Vector3().crossVectors(U, V);

function disposeGroup(group: THREE.Group) {
  group.traverse((object) => {
    const item = object as THREE.Mesh;
    item.geometry?.dispose();
    const materials = Array.isArray(item.material) ? item.material : item.material ? [item.material] : [];
    materials.forEach((material) => material.dispose());
  });
  group.clear();
}

function planeGeometry() {
  const e1 = U.clone().normalize();
  const e2 = V.clone().sub(e1.clone().multiplyScalar(V.dot(e1))).normalize();
  const size = 2.75;
  const corners = [
    P.clone().addScaledVector(e1, -size).addScaledVector(e2, -size),
    P.clone().addScaledVector(e1, size).addScaledVector(e2, -size),
    P.clone().addScaledVector(e1, size).addScaledVector(e2, size),
    P.clone().addScaledVector(e1, -size).addScaledVector(e2, size),
  ];
  const geometry = new THREE.BufferGeometry().setFromPoints(corners);
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  geometry.computeVertexNormals();
  return geometry;
}

function line(points: THREE.Vector3[], color: number, dashed = false) {
  const material = dashed
    ? new THREE.LineDashedMaterial({ color, dashSize: .12, gapSize: .08 })
    : new THREE.LineBasicMaterial({ color });
  const result = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
  if (dashed) result.computeLineDistances();
  return result;
}

export default function CrossProductPlane3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const dynamicRef = useRef<THREE.Group | null>(null);
  const [lambda, setLambda] = useState(.75);
  const [mu, setMu] = useState(-.45);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(38, 1, .1, 100);
    camera.position.set(6.4, 5.1, 7.2);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.copy(P);
    controls.minDistance = 4.5;
    controls.maxDistance = 12;
    scene.add(new THREE.HemisphereLight(0xffffff, 0xe4eadf, 2.4));
    const light = new THREE.DirectionalLight(0xffffff, 2.6);
    light.position.set(5, 7, 5);
    scene.add(light);

    const axesOrigin = new THREE.Vector3(-2.7, -2.2, -2.2);
    scene.add(
      new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), axesOrigin, 1.15, 0x85989d, .1, .05),
      new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), axesOrigin, 1.15, 0x85989d, .1, .05),
      new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), axesOrigin, 1.15, 0x85989d, .1, .05),
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
    const plane = new THREE.Mesh(
      planeGeometry(),
      new THREE.MeshPhongMaterial({ color: 0xb9ddec, transparent: true, opacity: .38, side: THREE.DoubleSide, depthWrite: false }),
    );
    const pointP = new THREE.Mesh(new THREE.SphereGeometry(.1, 22, 14), new THREE.MeshPhongMaterial({ color: 0x173d48 }));
    pointP.position.copy(P);
    const pointQPosition = P.clone().addScaledVector(U, lambda).addScaledVector(V, mu);
    const pointQ = new THREE.Mesh(new THREE.SphereGeometry(.13, 22, 14), new THREE.MeshPhongMaterial({ color: 0xd58f72 }));
    pointQ.position.copy(pointQPosition);
    const normal = N.clone().normalize();
    group.add(
      plane,
      pointP,
      pointQ,
      new THREE.ArrowHelper(U.clone().normalize(), P, U.length() * .78, 0x007d9d, .18, .09),
      new THREE.ArrowHelper(V.clone().normalize(), P, V.length() * .78, 0x7e812d, .18, .09),
      new THREE.ArrowHelper(normal, P, 2.15, 0x99c970, .2, .1),
      line([P, pointQPosition], 0xd58f72, true),
    );
  }, [lambda, mu]);

  const q = P.clone().addScaledVector(U, lambda).addScaledVector(V, mu);
  const check = N.dot(q.clone().sub(P));

  return (
    <figure className="vector-concept-explorer cross-plane-explorer" id="producto-cruz-plano-3d">
      <figcaption>
        <div><span>EXPLORACIÓN · PRODUCTO CRUZ</span><h5>Dos direcciones construyen un plano</h5><p>Los vectores <i>u</i> y <i>v</i> están contenidos en el plano. Su producto cruz entrega un vector <i>n</i> perpendicular a ambos y, por tanto, normal al plano.</p></div>
        <strong>n = u × v</strong>
      </figcaption>
      <div className="concept-mode-row"><span>↻ mover la cámara</span></div>
      <div className="cross-plane-stage-wrap">
        <div className="cross-plane-stage" ref={mountRef} aria-label="Plano tridimensional generado por dos vectores y su vector normal" />
        <div className="cross-plane-legend"><span><i />u=(2,1,0)</span><span><i />v=(-1,1,2)</span><span><i />n=(2,-4,3)</span><span><i />Q</span></div>
      </div>
      <div className="cross-plane-controls">
        <label htmlFor="plane-lambda">λ <output>{lambda.toFixed(2)}</output></label><input id="plane-lambda" type="range" min="-1" max="1" step=".05" value={lambda} onChange={(event) => setLambda(Number(event.target.value))} />
        <label htmlFor="plane-mu">μ <output>{mu.toFixed(2)}</output></label><input id="plane-mu" type="range" min="-1" max="1" step=".05" value={mu} onChange={(event) => setMu(Number(event.target.value))} />
        <p>Q = P + λu + μv = ({q.toArray().map((value) => value.toFixed(2)).join(", ")})</p>
        <strong>n · (Q − P) = {Math.abs(check) < 1e-9 ? "0" : check.toFixed(2)}</strong>
      </div>
      <div className="cross-plane-equation"><span>Ecuación del plano</span><strong>2(x−0.5) − 4(y+0.6) + 3(z−0.4) = 0</strong></div>
    </figure>
  );
}
