"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./Map"), {
  loading: () => <p>Loading map...</p>,
  ssr: false,
});

type StandortType = {
  titel: string;
  latitude: number;
  longitude: number;
};

type MapWrapperProps = {
  standorte: StandortType[];
};

export default function MapWrapper({ standorte }: MapWrapperProps) {
  return (
    <div className="w-full h-full" id="map">
      <DynamicMap standorte={standorte} />
    </div>
  );
}
