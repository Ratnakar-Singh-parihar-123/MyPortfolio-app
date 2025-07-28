import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Effects, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";

// Particle cloud using InstancedMesh for performance
function FloatingParticles({ maxCount = 180 }) {
  const meshRef = useRef();
  const { viewport } = useThree();

  // Responsive particle count based on viewport area
  const count = useMemo(() => {
    const area = viewport.width * viewport.height;
    return Math.min(maxCount, Math.max(60, Math.floor(area * 2)));
  }, [viewport.width, viewport.height, maxCount]);

  // Generate all particles' base parameters up front
  const particles = useMemo(
    () =>
      new Array(count).fill().map(() => ({
        basePos: new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 30
        ),
        radius: 3 + Math.random() * 8,
        speed: 0.001 + Math.random() * 0.002,
        size: 0.045 + Math.random() * 0.06,
        color: new THREE.Color().setHSL(0.55 + Math.random() * 0.1, 0.6, 0.66 + Math.random() * 0.28),
        opacity: 0.12 + Math.random() * 0.09,
        angle: Math.random() * Math.PI * 2,
        wobble: 0.06 + Math.random() * 0.1,
      })),
    [count]
  );

  // Animate particle positions and scales
  useFrame(() => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      p.angle += p.speed;
      // Calculate individual transformations for each instance
      const m = new THREE.Matrix4();
      const x = p.basePos.x + Math.cos(p.angle) * p.radius;
      const y =
        p.basePos.y +
        Math.sin(p.angle * 3) * 1.8 +
        Math.sin(performance.now() * 0.001 + i) * p.wobble;
      const z = p.basePos.z + Math.sin(p.angle) * p.radius;

      m.setPosition(x, y, z);
      const scale = p.size + Math.sin(performance.now() * 0.0012 + i) * 0.012;
      m.scale(new THREE.Vector3(scale, scale, scale));
      meshRef.current.setMatrixAt(i, m);
      // Optionally, update color/opacity as attributes
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Per-instance color/opacity attribute for material
  const colors = useMemo(
    () =>
      Float32Array.from(
        particles.flatMap(p => p.color.toArray())
      ),
    [particles]
  );
  const opacities = useMemo(() => Float32Array.from(particles.map(p => p.opacity)), [particles]);

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 12, 12]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <instancedBufferAttribute
          attach="attributes-opacity"
          args={[opacities, 1]}
        />
      </sphereGeometry>
      <MeshDistortMaterial
        color="#bbddff"
        attach="material"
        distort={0.2}
        speed={0.8}
        transparent
        opacity={0.19}
        roughness={1}
        toneMapped={false}
        flatShading
        vertexColors
        emissive="#bbddff"
        emissiveIntensity={0.32}
      />
    </instancedMesh>
  );
}

// Glowing, reflective icosahedron with fresnel-outline effect
function GlowingIcosahedron() {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.28;
    meshRef.current.rotation.y = t * 0.39;
    wireRef.current.rotation.x = t * 0.33;
    wireRef.current.rotation.y = t * 0.45;
  });

  return (
    <group>
      <mesh ref={meshRef} scale={2.05}>
        <icosahedronGeometry args={[2, 0]} />
        <meshPhysicalMaterial
          color="#7ebaff"
          emissive="#5888ff"
          emissiveIntensity={0.7}
          clearcoat={1}
          clearcoatRoughness={0.02}
          roughness={0.18}
          metalness={0.84}
          transmission={0.66}
          thickness={0.44}
          transparent
          opacity={0.92}
          reflectivity={1}
        />
      </mesh>
      <lineSegments ref={wireRef} scale={2.19}>
        <wireframeGeometry
          attach="geometry"
          args={[new THREE.IcosahedronGeometry(2, 0)]}
        />
        <lineBasicMaterial color="#adceff" transparent opacity={0.33} />
      </lineSegments>
    </group>
  );
}

// Parallax camera with device and touch support
function SmoothParallaxCamera() {
  const { camera, mouse, size } = useThree();

  // Device orientation for mobile parallax
  useEffect(() => {
    function handleTilt(e) {
      const x = e.gamma || 0;
      const y = e.beta || 0;
      camera.position.x += ((x / 60) - camera.position.x) * 0.08;
      camera.position.y += ((y / 80) - camera.position.y) * 0.08;
      camera.lookAt(0, 0, 0);
    }
    window.addEventListener("deviceorientation", handleTilt);
    return () => window.removeEventListener("deviceorientation", handleTilt);
  }, [camera]);

  useFrame(() => {
    if (size.width > 600) {
      // On desktop, use pointer for subtle parallax
      camera.position.x += (mouse.x * 1.18 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 0.87 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

// Cinematic visual effects
function BackgroundFX() {
  return (
    <EffectComposer multisampling={2}>
      <Bloom intensity={0.59} radius={0.49} luminanceThreshold={0.15} />
      <DepthOfField focusDistance={0.04} focalLength={0.036} bokehScale={5.5} />
    </EffectComposer>
  );
}

// --- Main Exported Component ---

export default function ThreeBackground() {
  return (
    <div
      id="bg-canvas"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none"
      }}
    >
      <Canvas
        gl={{ antialias: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 15], fov: 50 }}
        style={{ width: "100vw", height: "100vh", display: "block" }}
      >
        {/* Soft global scene lighting */}
        <hemisphereLight
          groundColor="#e0e7ff"
          skyColor="#eff6ff"
          intensity={0.37}
        />
        <ambientLight intensity={0.23} />
        <directionalLight position={[5, 10, 7]} intensity={0.82} color="#a2ccff" />
        <pointLight position={[0, 5, 5]} intensity={0.56} color="#88aaff" />

        {/* Enhanced dynamic elements */}
        <FloatingParticles />
        <GlowingIcosahedron />
        <SmoothParallaxCamera />
        <BackgroundFX />
      </Canvas>
    </div>
  );
}
