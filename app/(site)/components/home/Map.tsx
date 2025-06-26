"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";

// Define the type for locations from Sanity
type StandortType = {
  titel: string;
  latitude: number;
  longitude: number;
};

type MapProps = {
  standorte: StandortType[];
};

const Map = ({ standorte }: MapProps) => {
  const markerIcon = new L.Icon({
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
    iconSize: [22, 32],
    shadowSize: [41, 41],
    iconAnchor: [11, 32], // Fixed anchor point
    shadowAnchor: [12, 41],
    popupAnchor: [0, -32], // Fixed popup position
  });

  // Set center to Switzerland if you have locations, otherwise default
  const mapCenter: [number, number] =
    standorte.length > 0
      ? [standorte[0].latitude, standorte[0].longitude]
      : [46.8182, 8.2275]; // Center of Switzerland

  return (
    <div className="w-full h-full">
      <MapContainer
        center={mapCenter}
        zoom={7} // Adjusted for Switzerland
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Map over the Sanity locations */}
        {standorte.map((standort, index) => (
          <Marker
            key={index}
            position={[standort.latitude, standort.longitude]}
            icon={markerIcon}
          >
            {/* Tooltip shows title above marker (always visible) */}
            <Tooltip
              permanent
              direction="top"
              offset={[0, -40]}
              className="custom-tooltip"
            >
              <span>{standort.titel}</span>
            </Tooltip>

            {/* Popup shows on click */}
            <Popup>
              <div>
                <div>{standort.titel}</div>
                <p>
                  {standort.latitude.toFixed(4)},{" "}
                  {standort.longitude.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
