import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  PresentationControls,
  Environment,
  ContactShadows,
  MeshTransmissionMaterial,
  TorusKnot,
  Icosahedron,
  Box,
  Center
} from '@react-three/drei';

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

function RotatingShape({ shape, position, color, isDark }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });
  const matColor = isDark ? '#5dbcfc' : '#3b82f6';
  const common = { ref, position, castShadow: true, receiveShadow: true };
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      {shape === 'torus' && (
        <TorusKnot {...common} args={[0.4, 0.15, 64, 16]}>
          <meshStandardMaterial color={matColor} metalness={0.4} roughness={0.6} />
        </TorusKnot>
      )}
      {shape === 'ico' && (
        <Icosahedron {...common} args={[0.45, 0]}>
          <meshStandardMaterial color={matColor} metalness={0.3} roughness={0.7} wireframe={false} />
        </Icosahedron>
      )}
      {shape === 'box' && (
        <Box {...common} args={[0.5, 0.5, 0.5]}>
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.4}
            chromaticAberration={0.02}
            anisotropy={0.2}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.05}
            iridescence={0.2}
            color={matColor}
          />
        </Box>
      )}
    </Float>
  );
}

function SceneContent({ isDarkMode }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1.2} />
      <pointLight position={[-3, -2, 2]} intensity={0.6} color={isDarkMode ? '#5dbcfc' : '#93c5fd'} />
      <Environment preset={isDarkMode ? 'night' : 'dawn'} />
      <PresentationControls
        global
        cursor
        snap
        speed={1.2}
        zoom={1}
        polar={[-0.2, 0.4]}
        azimuth={[-0.3, 0.3]}
        config={{ mass: 1, tension: 120, friction: 14 }}
      >
        <Center>
          <group position={[0, 0, 0]}>
            <RotatingShape shape="torus" position={[-0.9, 0.2, 0]} color="#5dbcfc" isDark={isDarkMode} />
            <RotatingShape shape="ico" position={[0, 0.1, 0]} color="#5dbcfc" isDark={isDarkMode} />
            <RotatingShape shape="box" position={[0.9, -0.1, 0]} color="#5dbcfc" isDark={isDarkMode} />
          </group>
        </Center>
      </PresentationControls>
      <ContactShadows position={[0, -0.6, 0]} opacity={0.4} scale={6} blur={1.5} far={2} />
    </>
  );
}

function Fallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#334155" wireframe />
    </mesh>
  );
}

export default function ThreeScene({ isDarkMode = true, className = '' }) {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (!mounted || reducedMotion) {
    return (
      <div className={className} style={{ background: isDarkMode ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)' : 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)', borderRadius: 12 }} aria-hidden>
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDarkMode ? '#64748b' : '#94a3b8', fontSize: '0.875rem' }}>
          {/* Decorative fallback when 3D is disabled */}
        </div>
      </div>
    );
  }

  const dpr = isMobile() ? 1 : Math.min(window.devicePixelRatio, 2);

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%', minHeight: 200 }}>
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        aria-hidden
      >
        <color attach="background" args={[isDarkMode ? '#0a0a0f' : '#f8fafc']} />
        <fog attach="fog" args={[isDarkMode ? '#0a0a0f' : '#e2e8f0', 3, 8]} />
        <Suspense fallback={<Fallback />}>
          <SceneContent isDarkMode={isDarkMode} />
        </Suspense>
      </Canvas>
    </div>
  );
}
