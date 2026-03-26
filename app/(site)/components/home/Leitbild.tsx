import { sanityFetch } from "@/sanity/lib/client";
import { LEITBILD_QUERY } from "@/sanity/lib/queries";
import type { LEITBILD_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../SanityImage";
import ExpandableSquareCard from "../ExpandableSquareCard";

export default async function Leitbild() {
  const leitbild: LEITBILD_QUERYResult = await sanityFetch({
    query: LEITBILD_QUERY,
    revalidate: 60,
  });

  if (!leitbild) {
    return <div>No content found.</div>;
  }

  return (
    <section id={leitbild.sectionId ?? undefined}>
      <ExpandableSquareCard>
        <h2>{leitbild.ueberschrift}</h2>
        {leitbild.grafik && (
          <div className="w-full">
            <SanityImage
              image={leitbild.grafik}
              altFallback={leitbild.grafik.alt || "Leitbild"}
              className="w-full object-contain"
            />
          </div>
        )}
        {leitbild.text && (
          <div className="portable-text">
            <PortableText value={leitbild.text} />
          </div>
        )}
      </ExpandableSquareCard>
    </section>
  );
}
