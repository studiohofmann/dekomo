import { sanityFetch } from "@/sanity/lib/client";
import { FALLBEISPIEL_QUERY } from "@/sanity/lib/queries";
import type { FALLBEISPIEL_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../SanityImage";
import ExpandableSquareCard from "../ExpandableSquareCard";

export default async function Fallbeispiel() {
  const fallbeispiel: FALLBEISPIEL_QUERYResult = await sanityFetch({
    query: FALLBEISPIEL_QUERY,
    revalidate: 60,
  });

  if (!fallbeispiel) {
    return <div>No content found.</div>;
  }

  return (
    <ExpandableSquareCard>
      <h2>{fallbeispiel.ueberschrift}</h2>
      {fallbeispiel.bild && (
        <div>
          <SanityImage
            image={fallbeispiel.bild}
            altFallback={fallbeispiel.bild.alt || "Bild"}
            width={600}
            height={400}
            className="w-full h-auto"
          />
        </div>
      )}
      {fallbeispiel.text && (
        <div className="portable-text">
          <PortableText value={fallbeispiel.text || []} />
        </div>
      )}
    </ExpandableSquareCard>
  );
}
