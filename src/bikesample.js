import React, { Suspense, useRef, useEffect, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, Environment, Stats, CameraShake } from '@react-three/drei';
import * as THREE from 'three';

// Bike Model Component
function BikeModel({ mouseX }) {
  const { scene } = useGLTF('/BikeModal.glb');
  const bikeRef = useRef();
  const pivotOffset = 0.5;

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (bikeRef.current) {
      const clampedRotationY = THREE.MathUtils.clamp(mouseX * 0.2, -0.2, 0.2);
      bikeRef.current.rotation.y = THREE.MathUtils.lerp(bikeRef.current.rotation.y, clampedRotationY, 0.2);
    }
  });

  return (
    <group ref={bikeRef} position={[0, pivotOffset, 0]}>
      <primitive object={scene} position={[-1, -pivotOffset, 0]} />
    </group>
  );
}

// Background Model Component
function Background() {
  const { scene } = useGLTF('/bg1.glb');
  return <primitive object={scene} position={[0, -12, 0]} scale={[6, 5, -9]} />;
}

// Floor Model Component
function Floor() {
  const { scene } = useGLTF('/FloorCircle.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true;
        child.material.metalness = 3;
        child.material.roughness = 0;
      }
    });
  }, [scene]);

  return <primitive object={scene} position={[0, -1, 0]} scale={[1, 0.1, 1]} />;
}

// Frame Limiter Component
function FrameLimiter({ frameLimit = 24 }) {
  let lastFrameTime = 0;

  useFrame(({ clock }) => {
    const delta = clock.getElapsedTime() - lastFrameTime;
    const interval = 1 / frameLimit;

    if (delta > interval) {
      lastFrameTime = clock.getElapsedTime();
    }
  });

  return null;
}

// Bike Component
function Bike() {
  const [mouseX, setMouseX] = useState(0);

  const handleMouseMove = (event) => {
    const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
    setMouseX(normalizedX);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Suspense fallback={null}>
      <PerspectiveCamera makeDefault fov={35} near={1} far={200} />
      <Background />

      <group rotation={[0, Math.PI / 2, 0]} position={[0, -0.73, 0]} scale={0.85}>
        <BikeModel mouseX={mouseX} />
        <Environment files="./SmallEmpty.hdr" background={false} intensity={0.5} />
        <directionalLight color="white" position={[19.3, 13.4, -0.9]} intensity={0.6} />
        <directionalLight color="white" position={[19.4, -4.0, -16.7]} intensity={1.8} />
        <directionalLight color="white" position={[17.6, -7.7, 18.3]} intensity={0.8} />
        <directionalLight color="white" position={[0, -2, -5]} intensity={0.8} />
      </group>

      <group position={[-0.9, 0.1, -0.25]} scale={0.8}>
        <Floor />
      </group>

      <FrameLimiter frameLimit={24} />
      <OrbitControls enablePan={true} enableZoom={false} enableRotate={true} />
    </Suspense>
  );
}

export default Bike;
