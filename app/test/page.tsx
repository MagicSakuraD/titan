"use client";
import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// OpenDRIVE (XODR) 数据示例，形成 T 形状的道路
const xodrData = `
<?xml version="1.0" encoding="UTF-8"?>
<OpenDRIVE>
    <road name="T-Shape Road" length="50" id="0" junction="-1">
        <lanes>
            <laneSection s="0">
                <left>
                    <lane id="3" type="driving">
                        <width sOffset="0" a="3.5"/>
                    </lane>
                    <lane id="2" type="driving">
                        <width sOffset="0" a="3.5"/>
                    </lane>
                    <lane id="1" type="driving">
                        <width sOffset="0" a="3.5"/>
                    </lane>
                </left>
                <center>
                    <lane id="0" type="none">
                        <roadMark sOffset="0" type="solid" color="yellow"/>
                    </lane>
                </center>
                <right>
                    <lane id="-1" type="driving">
                        <width sOffset="0" a="3.5"/>
                    </lane>
                </right>
            </laneSection>
            <laneSection s="25">
                <left>
                    <lane id="4" type="driving">
                        <width sOffset="0" a="3.5"/>
                    </lane>
                    <lane id="5" type="driving">
                        <width sOffset="0" a="3.5"/>
                    </lane>
                </left>
                <right>
                    <lane id="-2" type="driving">
                        <width sOffset="0" a="3.5"/>
                    </lane>
                </right>
            </laneSection>
        </lanes>
    </road>
</OpenDRIVE>
`;

// 解析 OpenDRIVE 数据的函数
const parseOpenDRIVE = (xmlString: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  const lanes = xmlDoc.querySelectorAll("lane");

  return Array.from(lanes).map((lane, index) => ({
    id: parseInt(lane.getAttribute("id") || "0"),
    width: parseFloat(lane.querySelector("width")?.getAttribute("a") || "0"),
    position: new THREE.Vector3(
      index < 3 ? (index - 1) * 3.5 : 0, // 车道的横向位置
      0,
      index < 3 ? 0 : 25 // 前三条车道在主路，后面的在交叉路口
    ),
  }));
};

interface LaneProps {
  position: THREE.Vector3;
  width: number;
  length: number;
}

const Lane: React.FC<LaneProps> = ({ position, width, length }) => {
  const geometry = new THREE.BoxGeometry(width, 0.2, length);
  const material = new THREE.MeshPhongMaterial({ color: "red" });
  return <mesh geometry={geometry} material={material} position={position} />;
};

interface Lane {
  id: number;
  width: number;
  position: THREE.Vector3;
}

const RoadNetwork: React.FC<{ lanes: Lane[] }> = ({ lanes }) => {
  return (
    <>
      {lanes.map((lane, index) => (
        <Lane
          key={index}
          position={lane.position}
          width={lane.width}
          length={index < 3 ? 50 : 10} // 主路长度和交叉路口长度
        />
      ))}
    </>
  );
};

const MapPage = () => {
  const [lanes, setLanes] = useState<Lane[]>([]);

  useEffect(() => {
    const parsedLanes = parseOpenDRIVE(xodrData);
    setLanes(parsedLanes);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight color="red" position={[0, 10, 5]} />
        <RoadNetwork lanes={lanes} />
        <OrbitControls />
        <gridHelper args={[200, 20]} rotation={[Math.PI / 2, 0, 0]} />
        <axesHelper args={[5]} />
      </Canvas>
    </div>
  );
};

export default MapPage;
