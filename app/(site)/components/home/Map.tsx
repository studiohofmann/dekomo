"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const Map = () => {
  const markerIcon = new L.Icon({
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
    iconSize: [22, 32],
    shadowSize: [41, 41], // size of the shadow
    iconAnchor: [22, 64], // point of the icon which will correspond to marker's location
    shadowAnchor: [24, 72], // the same for the shadow
    popupAnchor: [-11, -62], // point from which the popup should open relative to the iconAnchor
  });
  type MarkerType = {
    id: number;
    position: [number, number];
    title: string;
    description: string;
  };

  const markers: MarkerType[] = [
    {
      id: 1,
      position: [43.56295237, 1.46810716],
      title: "Toulouse",
      description: "Beautiful city in France",
    },
    {
      id: 2,
      position: [48.8566, 2.3522],
      title: "Paris",
      description: "Capital of France",
    },
    {
      id: 3,
      position: [45.764, 4.8357],
      title: "Lyon",
      description: "Third largest city",
    },
    {
      id: 4,
      position: [43.2965, 5.3698],
      title: "Marseille",
      description: "Port city",
    },
  ];
  return (
    <section className=" bg-gray-200 w-full h-full">
      <MapContainer
        center={[46.861505, 2.496587]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Map over the markers array */}
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position} icon={markerIcon}>
            <Popup>
              <div>
                <h3 className="font-bold">{marker.title}</h3>
                <p>{marker.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
};

export default Map;
