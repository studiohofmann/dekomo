import { sanityFetch } from "@/sanity/lib/client";
import { AUSWIRKUNGEN_QUERY } from "@/sanity/lib/queries";
import type { AUSWIRKUNGEN_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import ExpandableSquareCard from "../ExpandableSquareCard";

export default async function Auswirkungen() {
  const auswirkungen: AUSWIRKUNGEN_QUERYResult = await sanityFetch({
    query: AUSWIRKUNGEN_QUERY,
    revalidate: 60,
  });

  if (!auswirkungen) {
    return <div>No content found.</div>;
  }

  return (
    <section id={auswirkungen.sectionId ?? undefined}>
      <ExpandableSquareCard>
        <h2>{auswirkungen.ueberschrift}</h2>
        {auswirkungen.text && (
          <div className="portable-text">
            <PortableText value={auswirkungen.text || []} />
          </div>
        )}
      </ExpandableSquareCard>
    </section>
  );
}
