import { sanityFetch } from "@/sanity/lib/client";
import { NETZWERKKARTE_QUERY } from "@/sanity/lib/queries";
import type { NETZWERKKARTE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import MapWrapper from "./MapWrapper";

export default async function Netzwerkkarte() {
  const netzwerkkarte: NETZWERKKARTE_QUERYResult = await sanityFetch({
    query: NETZWERKKARTE_QUERY,
    revalidate: 60,
  });

  if (!netzwerkkarte) {
    return <div>No content found.</div>;
  }

  return (
    <section className="bg-gray-200">
      <h2>{netzwerkkarte.ueberschrift}</h2>
      {/* Render text */}
      {netzwerkkarte.text && (
        <div className="portable-text">
          <PortableText value={netzwerkkarte.text} />
        </div>
      )}
      {/* Use the client wrapper component */}
      <MapWrapper
        standorte={(netzwerkkarte.standorte || []).map((s) => ({
          titel: s.titel ?? "",
          latitude: s.latitude ?? 0,
          longitude: s.longitude ?? 0,
        }))}
      />
    </section>
  );
}
