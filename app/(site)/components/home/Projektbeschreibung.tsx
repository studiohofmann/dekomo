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
      <div className="md:grid md:grid-cols-2 md:gap-4">
        {projektbeschreibung.text && (
          <div className="portable-text">
            <PortableText value={projektbeschreibung.text || []} />
          </div>
        )}
        {projektbeschreibung.grafik && (
          <SanityImage
            image={projektbeschreibung.grafik}
            altFallback={projektbeschreibung.grafik.alt || "Grafik"}
            aspectRatio="aspect-4/3"
            className="object-cover w-full"
          />
        )}
      </div>
    </div>
  );
}
