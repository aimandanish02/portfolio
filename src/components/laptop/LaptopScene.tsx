"use client";

import { Suspense, useRef, type MutableRefObject, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/laptop.glb";

/**
 * Lid geometry measured from the GLB accessors: x -0.246..-0.018,
 * y 0.029..0.146, z 0.169..0.221, face normal (0, 0.408, -0.913).
 */
const SCREEN = {
  center: [-0.132, 0.0875, 0.195] as const,
  tiltX: -0.42,
  width: 0.2285,
  height: 0.1278,
};

// The lid faces -Z in model space, so the rig spins to meet the camera.
const MODEL_YAW = Math.PI;

// The overlay is authored at a fixed 16:9 size and scaled to the projected lid,
// so the terminal layout never reflows as the laptop grows.
export const OVERLAY_SIZE = { width: 960, height: 536 };

// END.rotX cancels the lid tilt exactly, leaving the screen square to the camera.
const START = { scale: 2.9, rotX: 0.24, rotY: -0.6, posY: -0.06 };
const END = { scale: 11.2, rotX: -SCREEN.tiltX, rotY: 0, posY: 0 };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

interface LaptopProps {
  progressRef: MutableRefObject<number>;
  overlayRef: RefObject<HTMLDivElement | null>;
}

function Laptop({ progressRef, overlayRef }: LaptopProps) {
  const rig = useRef<THREE.Group>(null);
  const screen = useRef<THREE.Mesh>(null);
  const smoothed = useRef(0);
  const corner = useRef(new THREE.Vector3());
  const { scene } = useGLTF(MODEL_URL);

  useFrame((state, delta) => {
    if (!rig.current) return;

    smoothed.current = THREE.MathUtils.damp(smoothed.current, progressRef.current, 6, delta);
    const p = easeInOut(THREE.MathUtils.clamp(smoothed.current, 0, 1));

    rig.current.scale.setScalar(lerp(START.scale, END.scale, p));
    rig.current.position.y = lerp(START.posY, END.posY, p);
    rig.current.rotation.x = lerp(START.rotX, END.rotX, p);

    // Idle drift keeps the model alive before the scroll takes over.
    const idle = Math.sin(state.clock.elapsedTime * 0.45) * 0.1 * (1 - p);
    rig.current.rotation.y = lerp(START.rotY, END.rotY, p) + idle;

    // Project the lid plane to screen space and drive the DOM overlay from it,
    // so the terminal text stays crisp and its links stay clickable.
    const overlay = overlayRef.current;
    if (!overlay || !screen.current) return;

    const opacity = THREE.MathUtils.clamp((p - 0.74) / 0.16, 0, 1);
    if (opacity <= 0.001) {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      return;
    }

    const { width: vw, height: vh } = state.size;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const [sx, sy] of [
      [-0.5, -0.5],
      [0.5, -0.5],
      [-0.5, 0.5],
      [0.5, 0.5],
    ]) {
      corner.current.set(SCREEN.width * sx, SCREEN.height * sy, 0);
      screen.current.localToWorld(corner.current);
      corner.current.project(state.camera);

      const px = (corner.current.x * 0.5 + 0.5) * vw;
      const py = (-corner.current.y * 0.5 + 0.5) * vh;
      minX = Math.min(minX, px);
      maxX = Math.max(maxX, px);
      minY = Math.min(minY, py);
      maxY = Math.max(maxY, py);
    }

    // Projected corners are viewport-relative; the overlay is positioned inside
    // the sticky container, so rebase onto that container's origin.
    const host = overlay.parentElement?.getBoundingClientRect();
    const offsetX = host?.left ?? 0;
    const offsetY = host?.top ?? 0;
    const scale = (maxX - minX) / OVERLAY_SIZE.width;

    overlay.style.opacity = `${opacity}`;
    overlay.style.pointerEvents = opacity > 0.9 ? "auto" : "none";
    overlay.style.transform = `translate(${minX - offsetX}px, ${minY - offsetY}px) scale(${scale})`;
  });

  return (
    <group ref={rig} dispose={null}>
      <group rotation={[0, MODEL_YAW, 0]}>
        <group position={[-SCREEN.center[0], -SCREEN.center[1], -SCREEN.center[2]]}>
          <primitive object={scene} />
        </group>
      </group>

      {/* Dark plate over the model's flat screen face; the DOM overlay sits on top. */}
      <mesh ref={screen} position={[0, 0, 0.0015]} rotation={[SCREEN.tiltX, 0, 0]}>
        <planeGeometry args={[SCREEN.width, SCREEN.height]} />
        <meshBasicMaterial color="#05060f" toneMapped={false} />
      </mesh>
    </group>
  );
}

interface LaptopSceneProps {
  progressRef: MutableRefObject<number>;
  overlayRef: RefObject<HTMLDivElement | null>;
}

export default function LaptopScene({ progressRef, overlayRef }: LaptopSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 32 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#a855f7" />
      <pointLight position={[0, 1, 2]} intensity={6} color="#38bdf8" distance={8} />

      <Suspense fallback={null}>
        <Laptop progressRef={progressRef} overlayRef={overlayRef} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
