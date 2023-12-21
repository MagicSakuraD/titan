import { createRoot } from "react-dom/client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useRef } from "react";
import { Mesh } from "three/src/Three.js";

const Fiber = () => {
  function Scene() {
    const mesh = useRef<Mesh>(null!);
    const gltf = useLoader(GLTFLoader, "/model/shiba/scene.gltf");
    return <primitive object={gltf.scene} />;
  }
  return (
    <div className="w-7/12 card glass mx-auto h-96">
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="0x404040" position={[0, 0, 5]} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default Fiber;
