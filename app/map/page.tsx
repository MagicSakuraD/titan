"use client";
import React from "react";
import {
  ImageOverlay,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
  ScaleControl,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { div } from "three/examples/jsm/nodes/Nodes.js";

const DynamicMapPage = dynamic(() => import("./DynamicMapPage"), {
  ssr: false, // 禁用服务器端渲染
});

const MapPage = () => {
  return (
    <div>
      <DynamicMapPage />
    </div>
  );
};

export default MapPage;
