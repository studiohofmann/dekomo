import { sanityFetch } from "@/sanity/lib/client";
import { PROJEKTBESCHREIBUNG_QUERY } from "@/sanity/lib/queries";
import type { PROJEKTBESCHREIBUNG_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../SanityImage";

export default async function Projektbeschreibung() {
  const projektbeschreibung: PROJEKTBESCHREIBUNG_QUERYResult =
    await sanityFetch({
      query: PROJEKTBESCHREIBUNG_QUERY,
      revalidate: 60,
    });

  if (!projektbeschreibung) {
    return <div>No content found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>{projektbeschreibung.ueberschrift}</h2>
      <div className="flex flex-col gap-4 lg:gap-8 lg:flex-row lg:items-start">
        {projektbeschreibung.text && (
          <div className="portable-text lg:w-1/2">
            <PortableText value={projektbeschreibung.text || []} />
          </div>
        )}
        {projektbeschreibung.grafik && (
          <div className="lg:w-1/2">
            <SanityImage
              image={projektbeschreibung.grafik}
              altFallback={projektbeschreibung.grafik.alt || "Grafik"}
              width={600}
              height={400}
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
