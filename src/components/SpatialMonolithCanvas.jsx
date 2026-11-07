import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, BoxSelect } from 'lucide-react';

/**
 * SpatialMonolithCanvas
 * Real-time Three.js WebGL architectural monolith with gyroscopic cursor tilt,
 * scroll-depth interpolation, and wireframe inspection mode.
 * Adheres strictly to Bespoke Human Design & UI/UX Pro Max principles.
 */
export default function SpatialMonolithCanvas({ className = '' }) {
  const containerRef = useRef(null);
  const [isWireframeOnly, setIsWireframeOnly] = useState(false);
  const wireframeOnlyRef = useRef(isWireframeOnly);

  useEffect(() => {
    wireframeOnlyRef.current = isWireframeOnly;
  }, [isWireframeOnly]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLightWine = new THREE.DirectionalLight(0x7D4047, 1.8);
    dirLightWine.position.set(12, 18, 14);
    scene.add(dirLightWine);

    const dirLightRoyal = new THREE.DirectionalLight(0x355CDE, 1.4);
    dirLightRoyal.position.set(-12, -10, -10);
    scene.add(dirLightRoyal);

    // 3. Monolith Group Creation
    const monolithGroup = new THREE.Group();

    // Outer Architectural Octahedron (Lattice)
    const octaGeom = new THREE.OctahedronGeometry(3.8, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x7D4047,
      wireframe: true,
      transparent: true,
      opacity: 0.38
    });
    const wireframeMesh = new THREE.Mesh(octaGeom, wireframeMat);
    monolithGroup.add(wireframeMesh);

    // Inner Refractive Faceted Core
    const innerGeom = new THREE.IcosahedronGeometry(2.5, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x355CDE,
      roughness: 0.25,
      metalness: 0.75,
      transparent: true,
      opacity: 0.55
    });
    const solidMesh = new THREE.Mesh(innerGeom, innerMat);
    monolithGroup.add(solidMesh);

    // Orbital Hairline Ring
    const ringGeom = new THREE.TorusGeometry(5.2, 0.035, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x7D4047,
      transparent: true,
      opacity: 0.45
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 3.2;
    monolithGroup.add(ringMesh);

    scene.add(monolithGroup);

    // 4. Floating Depth Particles
    const particleCount = 140;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 36;
      positions[i + 1] = (Math.random() - 0.5) * 36;
      positions[i + 2] = (Math.random() - 0.5) * 26;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x7D4047,
      size: 0.07,
      transparent: true,
      opacity: 0.4
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 5. Parallax & Scroll Physics State
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentScroll = window.scrollY || 0;
    let animationFrameId;

    const handleMouseMove = (event) => {
      if (prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.35;
      targetRotationX = y * 0.35;
    };

    const handleScroll = () => {
      currentScroll = window.scrollY || window.pageYOffset;
    };

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. 60 FPS Render Loop with Smooth Inertia
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Handle Wireframe Only State
      solidMesh.visible = !wireframeOnlyRef.current;
      wireframeMat.opacity = wireframeOnlyRef.current ? 0.85 : 0.38;

      if (!prefersReducedMotion) {
        const scrollFactor = currentScroll * 0.0018;

        // Inertial rotation
        monolithGroup.rotation.y += 0.0025;
        monolithGroup.rotation.x = THREE.MathUtils.lerp(
          monolithGroup.rotation.x,
          targetRotationX + scrollFactor,
          0.05
        );
        monolithGroup.rotation.y = THREE.MathUtils.lerp(
          monolithGroup.rotation.y,
          targetRotationY + scrollFactor * 1.2,
          0.05
        );

        // Depth translation
        monolithGroup.position.y = Math.sin(scrollFactor) * 1.5 - (currentScroll * 0.0025);
        monolithGroup.position.x = Math.sin(scrollFactor * 0.6) * 2.2;

        if (particles) {
          particles.rotation.y += 0.0004;
          particles.rotation.x += 0.0002;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Geometries & Materials
      octaGeom.dispose();
      innerGeom.dispose();
      ringGeom.dispose();
      particleGeom.dispose();
      wireframeMat.dispose();
      innerMat.dispose();
      ringMat.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none select-none ${className}`}>
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

      {/* Wireframe Inspection Toggle Control */}
      <div className="absolute top-4 right-4 z-20 pointer-events-auto">
        <button
          type="button"
          onClick={() => setIsWireframeOnly((prev) => !prev)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF6EF]/90 backdrop-blur-md border border-[#E5DDCF] hover:border-[#7D4047] text-[11px] font-bold text-[#5A534A] hover:text-[#7D4047] shadow-xs transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#7D4047] focus-visible:outline-none"
          title="Toggle 3D Wireframe Mesh"
        >
          <BoxSelect className="w-3.5 h-3.5 text-[#7D4047]" />
          <span>{isWireframeOnly ? 'Mesh: Wireframe' : 'Mesh: Hybrid'}</span>
        </button>
      </div>
    </div>
  );
}
