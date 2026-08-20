"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const DOMAIN = 2.75;
const HEIGHT_SCALE = 0.5;
const POINT = { x: 1, y: 2, z: -1 };

function surfaceHeight(x: number, y: number) {
  return 4 - x * x - y * y;
}

function tangentHeight(x: number, y: number) {
  return -2 * x - 4 * y + 9;
}

function makeGraphGeometry(
  height: (x: number, y: number) => number,
  center = { x: 0, y: 0 },
  halfSize = DOMAIN,
  divisions = 52,
) {
  const vertices: number[] = [];
  const indices: number[] = [];
  for (let row = 0; row <= divisions; row += 1) {
    const y = center.y - halfSize + row / divisions * halfSize * 2;
    for (let column = 0; column <= divisions; column += 1) {
      const x = center.x - halfSize + column / divisions * halfSize * 2;
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

export default function GradientTangent3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(7.2, 5.3, 7.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 5;
    controls.maxDistance = 15;
    controls.target.set(0.5, 0.25, 0.8);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xdde8df, 2.25));
    const light = new THREE.DirectionalLight(0xffffff, 2.6);
    light.position.set(4, 8, 5);
    scene.add(light);

    const surfaceGeometry = makeGraphGeometry(surfaceHeight);
    const surface = new THREE.Mesh(
      surfaceGeometry,
      new THREE.MeshPhongMaterial({
        color: 0xdcebd2,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
        shininess: 24,
        depthWrite: false,
      }),
    );
    scene.add(surface);

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(surfaceGeometry),
      new THREE.LineBasicMaterial({ color: 0x93aa9c, transparent: true, opacity: 0.14 }),
    );
    scene.add(wire);

    const tangentGeometry = makeGraphGeometry(tangentHeight, { x: POINT.x, y: POINT.y }, 1.35, 1);
    const tangentPlane = new THREE.Mesh(
      tangentGeometry,
      new THREE.MeshBasicMaterial({
        color: 0xb9ddec,
        transparent: true,
        opacity: 0.58,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    tangentPlane.renderOrder = 3;
    scene.add(tangentPlane);

    const tangentFrame = new THREE.LineSegments(
      new THREE.EdgesGeometry(tangentGeometry),
      new THREE.LineBasicMaterial({ color: 0x007d9d, transparent: true, opacity: 0.85 }),
    );
    tangentFrame.renderOrder = 4;
    scene.add(tangentFrame);

    const pointPosition = new THREE.Vector3(POINT.x, POINT.z * HEIGHT_SCALE, POINT.y);
    const point = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 22, 22),
      new THREE.MeshBasicMaterial({ color: 0xd58f72 }),
    );
    point.position.copy(pointPosition);
    point.renderOrder = 6;
    scene.add(point);

    // El gráfico usa la altura visual Y=s·f(x,z). Por eso el plano renderizado
    // satisface Y-s(-2X-4Z+9)=0 y su normal es (2s,1,4s).
    // Esta corrección mantiene la perpendicularidad aunque la altura esté
    // comprimida para que la superficie quepa cómodamente en la escena.
    const normalDirection = new THREE.Vector3(
      2 * HEIGHT_SCALE,
      1,
      4 * HEIGHT_SCALE,
    ).normalize();
    const normal = new THREE.ArrowHelper(normalDirection, pointPosition, 2.15, 0x007d9d, 0.2, 0.1);
    scene.add(normal);

    const projection = new THREE.Vector3(POINT.x, -2.15, POINT.y);
    const guide = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([projection, pointPosition]),
      new THREE.LineDashedMaterial({ color: 0x8c9698, dashSize: 0.1, gapSize: 0.08, transparent: true, opacity: 0.58 }),
    );
    guide.computeLineDistances();
    scene.add(guide);

    const gradientDirection = new THREE.Vector3(-2, 0, -4).normalize();
    const gradient = new THREE.ArrowHelper(gradientDirection, projection, 1.5, 0x7e812d, 0.18, 0.09);
    scene.add(gradient);

    const grid = new THREE.GridHelper(6.3, 12, 0x819296, 0xd5dede);
    grid.position.y = -2.17;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.38;
    scene.add(grid);

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
    };
  }, []);

  return (
    <figure className="gradient-tangent-3d" id="gradiente-plano-tangente-3d">
      <figcaption>
        <div>
          <span>EXPLORACIÓN 3D · GRADIENTE</span>
          <h5>Del gradiente al plano tangente</h5>
          <p>En el punto <i>P=(1,2,-1)</i>, el plano celeste toca la superficie. La flecha azul es normal al plano y la flecha oliva muestra <i>∇f(1,2)</i> sobre el dominio.</p>
        </div>
        <strong>f(x,y)=4−x²−y²</strong>
      </figcaption>
      <div className="gradient-tangent-stage-wrap">
        <div
          ref={mountRef}
          className="gradient-tangent-stage"
          role="img"
          aria-label="Superficie z igual a 4 menos x cuadrado menos y cuadrado, con su plano tangente en el punto 1, 2, menos 1, el gradiente y un vector normal."
        />
        <span className="level-curves-camera-hint" aria-hidden="true">↕ ARRASTRA PARA GIRAR · SCROLL PARA ACERCAR</span>
        <div className="gradient-tangent-legend" aria-hidden="true">
          <span><i /> superficie</span>
          <span><i /> plano tangente</span>
          <span><i /> normal</span>
          <span><i /> gradiente</span>
        </div>
      </div>
      <div className="gradient-tangent-formulas">
        <p>∇f(1,2) = (−2,−4)</p>
        <p>z = −2x − 4y + 9</p>
      </div>
    </figure>
  );
}
