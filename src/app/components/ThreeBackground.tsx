import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particle system - morphing sphere
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color1 = new THREE.Color("#8b5cf6"); // purple
    const color2 = new THREE.Color("#06b6d4"); // cyan
    const color3 = new THREE.Color("#ec4899"); // pink

    for (let i = 0; i < particleCount; i++) {
      // Distribute on a sphere surface
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 12 + Math.random() * 3;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixRatio = Math.random();
      const color = mixRatio < 0.33
        ? color1.clone().lerp(color2, mixRatio * 3)
        : mixRatio < 0.66
        ? color2.clone().lerp(color3, (mixRatio - 0.33) * 3)
        : color3.clone().lerp(color1, (mixRatio - 0.66) * 3);

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Create a torus knot wireframe
    const torusGeometry = new THREE.TorusKnotGeometry(8, 2.5, 100, 16);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: "#8b5cf6",
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    // Floating ring
    const ringGeometry = new THREE.TorusGeometry(15, 0.05, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: "#06b6d4",
      transparent: true,
      opacity: 0.3,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate particles
      particles.rotation.y = elapsed * 0.05;
      particles.rotation.x = elapsed * 0.02;

      // Morph particles
      const posArray = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = posArray[i3];
        const y = posArray[i3 + 1];
        const z = posArray[i3 + 2];
        const dist = Math.sqrt(x * x + y * y + z * z);
        const wave = Math.sin(elapsed * 0.5 + dist * 0.3) * 0.3;
        const factor = 1 + wave / dist;
        posArray[i3] *= factor;
        posArray[i3 + 1] *= factor;
        posArray[i3 + 2] *= factor;

        // Normalize back to prevent drift
        const newDist = Math.sqrt(
          posArray[i3] ** 2 + posArray[i3 + 1] ** 2 + posArray[i3 + 2] ** 2
        );
        const targetDist = 12 + Math.sin(elapsed * 0.3 + i * 0.01) * 3;
        const normalize = targetDist / newDist;
        posArray[i3] *= normalize;
        posArray[i3 + 1] *= normalize;
        posArray[i3 + 2] *= normalize;
      }
      geometry.attributes.position.needsUpdate = true;

      // Rotate torus
      torus.rotation.x = elapsed * 0.1;
      torus.rotation.y = elapsed * 0.15;

      // Ring animation
      ring.rotation.z = elapsed * 0.05;

      // Camera follows mouse smoothly
      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 3 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "none" }}
    />
  );
}