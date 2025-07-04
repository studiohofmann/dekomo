import { sanityFetch } from "@/sanity/lib/client";
import { NETZWERK_QUERY } from "@/sanity/lib/queries";
import type { NETZWERK_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import MapWrapper from "./MapWrapper";

export default async function Netzwerk() {
  const netzwerk: NETZWERK_QUERYResult = await sanityFetch({
    query: NETZWERK_QUERY,
    revalidate: 60,
  });

  if (!netzwerk) {
    return <div>No content found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>{netzwerk.ueberschrift}</h2>
      <div className="flex flex-col gap-4 lg:gap-8 lg:grid lg:grid-cols-2">
        {netzwerk.text && (
          <div className="portable-text">
            <PortableText value={netzwerk.text} />
          </div>
        )}
        {/* Use the client wrapper component */}
        <MapWrapper
          standorte={(netzwerk.standorte || []).map((s) => ({
            titel: s.titel ?? "",
            latitude: s.latitude ?? 0,
            longitude: s.longitude ?? 0,
          }))}
        />
      </div>
    </div>
  );
}
