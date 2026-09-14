"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function LinePlanePreview3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const movingPointRef = useRef<THREE.Mesh | null>(null);
  const [parameter, setParameter] = useState(0.5);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f5f1e8");

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(9, 7, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    stage.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 6;
    controls.maxDistance = 24;
    controls.target.set(1.2, 0.3, 1.1);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x6f796d, 2.1));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.3);
    directionalLight.position.set(6, 9, 7);
    scene.add(directionalLight);

    const lineOrigin = new THREE.Vector3(2, -1, 3);
    const lineDirection = new THREE.Vector3(1, 0, -2);
    const outsidePoint = new THREE.Vector3(1, 2, 0);
    const secondPlaneDirection = outsidePoint.clone().sub(lineOrigin);
    const planeNormal = new THREE.Vector3().crossVectors(lineDirection, secondPlaneDirection).normalize();
    const planeBasisX = lineDirection.clone().normalize();
    const planeBasisY = new THREE.Vector3().crossVectors(planeNormal, planeBasisX).normalize();

    const planeGeometry = new THREE.PlaneGeometry(9, 7);
    const planeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xb7d4ca,
      transparent: true,
      opacity: 0.48,
      side: THREE.DoubleSide,
      roughness: 0.85,
      depthWrite: false,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    const basisMatrix = new THREE.Matrix4().makeBasis(planeBasisX, planeBasisY, planeNormal);
    plane.quaternion.setFromRotationMatrix(basisMatrix);
    plane.position.copy(lineOrigin);
    scene.add(plane);

    const linePoints = [
      lineOrigin.clone().addScaledVector(lineDirection, -2.6),
      lineOrigin.clone().addScaledVector(lineDirection, 2.6),
    ];
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(linePoints),
      new THREE.LineBasicMaterial({ color: 0x087f8c, linewidth: 3 }),
    );
    line.renderOrder = 2;
    scene.add(line);

    const makePoint = (position: THREE.Vector3, color: number, radius = 0.15) => {
      const point = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 28, 20),
        new THREE.MeshStandardMaterial({ color, roughness: 0.45 }),
      );
      point.position.copy(position);
      point.renderOrder = 3;
      scene.add(point);
      return point;
    };

    makePoint(outsidePoint, 0xd45d3c, 0.2);
    makePoint(lineOrigin, 0x20352c);
    makePoint(lineOrigin.clone().add(lineDirection), 0x20352c);
    movingPointRef.current = makePoint(lineOrigin.clone().addScaledVector(lineDirection, 0.5), 0xf1b44c, 0.19);

    const connectionMaterial = new THREE.LineDashedMaterial({ color: 0x53665d, dashSize: 0.16, gapSize: 0.11, transparent: true, opacity: 0.78 });
    [lineOrigin, lineOrigin.clone().add(lineDirection)].forEach((pointOnLine) => {
      const connection = new THREE.Line(new THREE.BufferGeometry().setFromPoints([outsidePoint, pointOnLine]), connectionMaterial.clone());
      connection.computeLineDistances();
      scene.add(connection);
    });

    const resize = () => {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    resize();

    let animationFrame = 0;
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      controls.dispose();
      movingPointRef.current = null;
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  useEffect(() => {
    movingPointRef.current?.position.set(2 + parameter, -1, 3 - 2 * parameter);
  }, [parameter]);

  return (
    <section className="line-plane-preview" aria-labelledby="line-plane-preview-title">
      <div className="line-plane-preview-heading">
        <div><span>VISUALIZACIÓN 3D</span><h3 id="line-plane-preview-title">La recta y el plano que estás buscando</h3></div>
        <p>Arrastra para rotar · usa la rueda para acercar</p>
      </div>
      <div className="line-plane-stage" ref={stageRef} aria-label="Escena tridimensional interactiva de una recta y un punto contenidos en el plano buscado" />
      <div className="line-plane-legend" aria-label="Leyenda">
        <span><i className="is-line" /> Recta r</span>
        <span><i className="is-point" /> Punto P</span>
        <span><i className="is-plane" /> Plano buscado</span>
        <span><i className="is-moving" /> Punto móvil Q</span>
      </div>
      <label className="line-plane-slider">
        <span>Mueve Q sobre la recta</span>
        <input type="range" min="-2" max="2" step="0.05" value={parameter} onChange={(event) => setParameter(Number(event.target.value))} />
        <output>t = {parameter.toFixed(2)}</output>
      </label>
      <p className="line-plane-prompt">Observa: ¿qué dos direcciones contenidas en el plano podrías construir con los elementos visibles?</p>
    </section>
  );
}
