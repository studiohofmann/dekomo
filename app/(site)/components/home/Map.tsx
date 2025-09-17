"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { EnvironmentFilled } from "@ant-design/icons";

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
  // Create a DivIcon from a React element (Ant icon)
  const createIconFromReact = (
    node: React.ReactNode,
    size = 36,
    wrapperClass = "w-9 h-9 flex items-center justify-center"
  ) => {
    const html = renderToStaticMarkup(
      <div
        className={`map-marker-react ${wrapperClass}`}
        style={{ width: size, height: size }}
      >
        {node}
      </div>
    );
    return L.divIcon({
      className: "map-marker",
      html,
      iconSize: [size, size],
      iconAnchor: [size / 2, size],
      popupAnchor: [0, -size / 2],
    });
  };

  // use Tailwind classes for color & sizing (w-9 h-9 = 36px)
  const antIcon = createIconFromReact(
    <EnvironmentFilled />,
    36,
    "text-gray-700 text-3xl"
  );

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
        className="leaflet-map"
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
            icon={antIcon}
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
            {/* <Popup>
              <div>
                <div>{standort.titel}</div>
                <p>
                  {standort.latitude.toFixed(4)},{" "}
                  {standort.longitude.toFixed(4)}
                </p>
              </div>
            </Popup> */}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
