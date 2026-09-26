import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function Hero3DExperience({ active = true, onToggle }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const meshRef = useRef(null);
  const frameIdRef = useRef(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !active) return;

    // Prefers reduced motion check
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsSupported(false);
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    // Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
    } catch (e) {
      setIsSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting for luxury silk & gold zari
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.4);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xc6a15b, 3.2);
    goldKeyLight.position.set(3, 4, 3);
    scene.add(goldKeyLight);

    const crimsonRimLight = new THREE.DirectionalLight(0x5c2730, 2.0);
    crimsonRimLight.position.set(-3, -2, -1);
    scene.add(crimsonRimLight);

    const softFillLight = new THREE.PointLight(0xffffff, 1.2, 10);
    softFillLight.position.set(0, 2, 2);
    scene.add(softFillLight);

    // Silk Drape Geometry: segmented plane with gentle catenary drape curve
    const geom = new THREE.PlaneGeometry(3.6, 2.8, 64, 48);
    const pos = geom.attributes.position;
    const origPositions = new Float32Array(pos.array);

    // Silk Material with shimmering gold zari highlights
    const silkMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#2a1217"), // Royal deep mulberry/crimson base
      roughness: 0.38,
      metalness: 0.45,
      side: THREE.DoubleSide,
      wireframe: false,
    });

    const silkMesh = new THREE.Mesh(geom, silkMaterial);
    silkMesh.rotation.x = -0.2;
    silkMesh.rotation.y = 0.15;
    scene.add(silkMesh);
    meshRef.current = silkMesh;

    // Interactive pointer
    let targetRotX = -0.15;
    let targetRotY = 0.1;
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.4;
      targetRotX = -0.15 - y * 0.3;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !renderer) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop: undulating silk fabric ripples
    let clock = new THREE.Clock();

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Fluid drape undulating wave calculation
      const p = geom.attributes.position;
      for (let i = 0; i < p.count; i++) {
        const u = origPositions[i * 3];
        const v = origPositions[i * 3 + 1];

        // Complex multi-frequency silk ripple equation
        const wave1 = Math.sin(u * 2.2 + elapsedTime * 1.5) * 0.18;
        const wave2 = Math.cos(v * 3.0 + elapsedTime * 1.1) * 0.12;
        const wave3 = Math.sin((u + v) * 2.8 + elapsedTime * 2.0) * 0.08;

        // Realistic hanging drape sag towards bottom
        const sag = -Math.pow((v - 1.4) / 2.8, 2) * 0.15;

        p.setZ(i, wave1 + wave2 + wave3 + sag);
      }
      geom.computeVertexNormals();
      geom.attributes.position.needsUpdate = true;

      // Smooth damped rotation towards pointer
      silkMesh.rotation.x += (targetRotX - silkMesh.rotation.x) * 0.04;
      silkMesh.rotation.y += (targetRotY - silkMesh.rotation.y) * 0.04;
      silkMesh.position.y = Math.sin(elapsedTime * 0.8) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
      geom.dispose();
      silkMaterial.dispose();
    };
  }, [active]);

  if (!isSupported) {
    return (
      <div className="hero-3d-fallback">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85"
          alt="Tactile silk fabric drape folds"
          className="hero-3d-fallback-img"
        />
      </div>
    );
  }

  return (
    <div className="hero-3d-viewport" ref={containerRef} aria-label="Interactive 3D Silk Drape Simulation">
      <div className="hero-3d-controls-overlay">
        <span className="hero-3d-hint">✦ Drag or tilt to inspect zari reflection & weave drape</span>
      </div>
    </div>
  );
}
