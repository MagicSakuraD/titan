"use client";
import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import ModuleOpenDrive from "@/public/lib/ModuleOpenDrive";

// Define Lane interface
interface Lane {
  id: number;
  width: number;
  position: THREE.Vector3;
  length: number;
  rotation: THREE.Euler;
}

// Define RoadNetworkProps interface
interface RoadNetworkProps {
  lanes: Lane[];
}

// Define LaneProps interface
interface LaneProps {
  position: THREE.Vector3;
  width: number;
  length: number;
  rotation: THREE.Euler;
}

// Lane component
const LaneComponent: React.FC<LaneProps> = ({
  position,
  width,
  length,
  rotation,
}) => {
  const laneGeometry = new THREE.BoxGeometry(width, 0.1, length);
  const laneMaterial = new THREE.MeshStandardMaterial({
    color: "#808080",
    transparent: true,
    opacity: 0.7,
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh geometry={laneGeometry} material={laneMaterial} />
    </group>
  );
};

// RoadNetwork component
const RoadNetwork: React.FC<RoadNetworkProps> = ({ lanes }) => {
  return (
    <>
      {lanes.map((lane, index) => (
        <LaneComponent
          key={index}
          position={lane.position}
          width={lane.width}
          length={lane.length}
          rotation={lane.rotation}
        />
      ))}
    </>
  );
};

// MapPage component
const MapPage: React.FC = () => {
  const [lanes, setLanes] = useState<Lane[]>([]);

  useEffect(() => {
    const loadModule = async () => {
      try {
        // Initialize the module
        const Module = await ModuleOpenDrive({
          locateFile: (path: string, prefix: string) => {
            if (path.endsWith(".wasm")) {
              return `/lib/${path}`;
            }
            return prefix + path;
          },
        });
        let OpenDriveMap: any;

        const loadFile = (file_text: string, clear_map: boolean) => {
          if (clear_map) {
            Module.FS_unlink("./data.xodr");
          }

          // Create a data file from the provided text
          Module.FS_createDataFile(".", "data.xodr", file_text, true, true);

          if (OpenDriveMap) {
            OpenDriveMap.delete();
          }

          OpenDriveMap = new Module.OpenDriveMap("./data.xodr", {
            with_lateralProfile: true,
            with_laneHeight: true,
            with_road_objects: false,
            center_map: true,
            abs_z_for_for_local_road_obj_outline: true,
          });

          loadOdrMap(clear_map);
        };

        const loadOdrMap = (clear_map: boolean) => {
          // Implement the logic to parse lanes and update the state
          const parsedLanes: Lane[] = []; // Implement lane parsing logic here
          console.log("Parsed lanes:", parsedLanes);
          setLanes(parsedLanes);
        };

        // Load the local XODR file directly
        const response = await fetch("/map/try.xodr");
        const xodrContent = await response.text();

        // Call loadFile with the local XODR content
        loadFile(xodrContent, false);
      } catch (error) {
        console.error("Error loading or parsing the XODR file:", error);
      }
    };

    loadModule();
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 50, 50], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          color="#ffffff"
          position={[10, 10, 5]}
          intensity={0.8}
        />
        <RoadNetwork lanes={lanes} />
        <OrbitControls />
        <gridHelper args={[200, 20]} />
      </Canvas>
    </div>
  );
};

export default MapPage;
