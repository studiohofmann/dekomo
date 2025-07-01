import { sanityFetch } from "@/sanity/lib/client";
import { AUSWIRKUNGEN_QUERY } from "@/sanity/lib/queries";
import type { AUSWIRKUNGEN_QUERYResult } from "@/sanity/types";
import SanityImage from "../SanityImage";
import { PortableText } from "@portabletext/react";

export default async function Auswirkungen() {
  const auswirkungen: AUSWIRKUNGEN_QUERYResult = await sanityFetch({
    query: AUSWIRKUNGEN_QUERY,
    revalidate: 60,
  });

  if (!auswirkungen) {
    return <div>No content found.</div>;
  }

  return (
    <div className="flex flex-col gap-4  lg:px-32">
      <h2>{auswirkungen.ueberschrift}</h2>

      {auswirkungen.text && (
        <div className="portable-text">
          <PortableText value={auswirkungen.text || []} />
        </div>
      )}
      {/* 
        {auswirkungen.grafik && (
          <div className="lg:w-1/2">
            <SanityImage
              image={auswirkungen.grafik}
              altFallback={auswirkungen.grafik.alt || "Grafik"}
              width={600}
              height={400}
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
        )}
          */}
    </div>
  );
}
