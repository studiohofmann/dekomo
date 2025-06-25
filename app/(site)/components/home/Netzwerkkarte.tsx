import { sanityFetch } from "@/sanity/lib/client";
import { NETZWERKKARTE_QUERY } from "@/sanity/lib/queries";
import type { NETZWERKKARTE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./Map"), {
  loading: () => <p>Loading map...</p>,
  ssr: !!false,
});

export default async function Netzwerkkarte() {
  const netzwerkkarte: NETZWERKKARTE_QUERYResult = await sanityFetch({
    query: NETZWERKKARTE_QUERY,
    revalidate: 60,
  });

  if (!netzwerkkarte) {
    return <div>No content found.</div>;
  }

  return (
    <section>
      <h2>{netzwerkkarte.ueberschrift}</h2>
      {/* Render text */}
      {netzwerkkarte.text && (
        <div className="prose">
          <PortableText value={netzwerkkarte.text} />
        </div>
      )}
      <div className="h-96 w-full" id="map">
        <DynamicMap />
      </div>
    </section>
  );
}
