import { sanityFetch } from "@/sanity/lib/client";
import { PROJEKTBESCHREIBUNG_QUERY } from "@/sanity/lib/queries";
import type { PROJEKTBESCHREIBUNG_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../SanityImage";
import ExpandableSquareCard from "../ExpandableSquareCard";

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
    <ExpandableSquareCard>
      <h2>{projektbeschreibung.ueberschrift}</h2>
      {projektbeschreibung.grafik && (
        <SanityImage
          image={projektbeschreibung.grafik}
          altFallback={projektbeschreibung.grafik.alt || "Grafik"}
          width={600}
          height={400}
          className="w-full object-cover"
        />
      )}
      <div className="portable-text">
        <PortableText value={projektbeschreibung.text || []} />
      </div>
    </ExpandableSquareCard>
  );
}
