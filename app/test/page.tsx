"use client";
import React from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { div } from "three/examples/jsm/nodes/Nodes.js";

const page = () => {
  return (
    <div className="container mx-auto">
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="#db2777" position={[0, 0, 5]} />
        <mesh>
          <boxGeometry args={[5, 5, 5]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
};

export default page;
