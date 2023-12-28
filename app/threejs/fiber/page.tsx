"use client";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import {
  MeshWobbleMaterial,
  useGLTF,
  CameraControls,
  Environment,
} from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three/src/Three.js";
import { useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion-3d";

const Fiber = () => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const screenRef = useRef<HTMLDivElement>(null!);
  function Scene() {
    const mesh = useRef<Mesh>(null!);
    const gltf = useLoader(GLTFLoader, "/model/shiba/scene.gltf");
    // const obj = useLoader(OBJLoader, "/model/girl/girl2.fbx");
    // useFrame(() => {
    //   mesh.current.rotation.y += 0.01;
    // });
    return (
      <mesh ref={mesh} scale={1 / 2}>
        {/* <primitive object={obj} position={[-5, 0, 0]} /> */}
        <primitive object={gltf.scene} />
      </mesh>
    );
  }

  function Level() {
    const { nodes } = useGLTF("/model/draco/level-react-draco.glb");
    const levelMesh = nodes.Level as Mesh;
    return (
      <mesh
        geometry={levelMesh.geometry}
        material={levelMesh.material}
        position={[-1, 0.6, 0]}
        rotation={[Math.PI / 2, -Math.PI / 9, 0]}
        scale={2}
      />
    );
  }
  function FullscreenButton() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const handleFullscreen = () => {
      if (!document.fullscreenElement) {
        screenRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    };

    return (
      <button
        onClick={handleFullscreen}
        className="btn border-none bg-transparent w-fit m-1 rounded-xl hover:bg-transparent absolute bottom-0 right-0"
      >
        {isFullscreen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-fullscreen-exit"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5M0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5m10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-fullscreen"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <div className="w-7/12 card glass mx-auto h-96 border-none" ref={screenRef}>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.1} />
        <directionalLight color="#34d399" position={[0, 0, 5]} />

        <group>
          <Level />
          <Scene />
        </group>
        {/* <Environment preset="city" background blur={1} /> */}
      </Canvas>
      <FullscreenButton />
    </div>
  );
};

export default Fiber;
