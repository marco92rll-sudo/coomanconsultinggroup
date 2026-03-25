import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh, Vector3, MathUtils } from "three";
import earthTexture from "@/assets/earth-borders.png";

const ROTATION_CHANGE_INTERVAL = 4; // seconds between direction changes

function RotatingGlobe() {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, earthTexture);
  const timerRef = useRef(0);

  // Random rotation axis & speed
  const rotationTarget = useRef({
    axis: new Vector3(
      MathUtils.randFloatSpread(1),
      MathUtils.randFloatSpread(1),
      MathUtils.randFloatSpread(1)
    ).normalize(),
    speed: 0.08,
  });

  const currentRotation = useRef({
    x: MathUtils.randFloatSpread(0.5),
    y: 0.1,
    z: MathUtils.randFloatSpread(0.3),
  });

  const pickNewDirection = useCallback(() => {
    const axis = new Vector3(
      MathUtils.randFloatSpread(2),
      MathUtils.randFloatSpread(2),
      MathUtils.randFloatSpread(2)
    ).normalize();
    rotationTarget.current = {
      axis,
      speed: MathUtils.randFloat(0.06, 0.14),
    };
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    timerRef.current += delta;
    if (timerRef.current > ROTATION_CHANGE_INTERVAL) {
      timerRef.current = 0;
      pickNewDirection();
    }

    const { axis, speed } = rotationTarget.current;
    const lerp = 0.02;
    currentRotation.current.x = MathUtils.lerp(currentRotation.current.x, axis.x * speed, lerp);
    currentRotation.current.y = MathUtils.lerp(currentRotation.current.y, axis.y * speed, lerp);
    currentRotation.current.z = MathUtils.lerp(currentRotation.current.z, axis.z * speed, lerp);

    meshRef.current.rotation.x += currentRotation.current.x * delta;
    meshRef.current.rotation.y += currentRotation.current.y * delta;
    meshRef.current.rotation.z += currentRotation.current.z * delta;
  });

  const material = useMemo(
    () => ({
      map: texture,
      transparent: true,
      opacity: 0.85,
      emissiveMap: texture,
      emissive: "#8BAAB8",
      emissiveIntensity: 0.6,
    }),
    [texture]
  );

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.2, 64, 64]} />
      <meshStandardMaterial {...material} />
    </mesh>
  );
}

const Globe3D = () => {
  return (
    <div className="w-[320px] h-[320px] md:w-[360px] md:h-[360px]">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 3, 5]} intensity={0.8} color="#8BAAB8" />
        <pointLight position={[-4, -2, 3]} intensity={0.3} color="#E2725B" />
        <RotatingGlobe />
      </Canvas>
    </div>
  );
};

export default Globe3D;
