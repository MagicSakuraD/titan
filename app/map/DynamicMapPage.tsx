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

const DynamicMapPage = () => {
  const position: [number, number] = [31.005, 125.021];
  return (
    <div>
      <main className="container mx-auto">
        {/* <div className="w-96 h-96 m-5 bg-current opacity-30"></div> */}
        <div className="card bg-base-100 shadow-xl glass">
          <div>
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={true}
              className="h-[35rem] rounded-lg"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  纬度: {position[0]}, 经度: {position[1]}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DynamicMapPage;
