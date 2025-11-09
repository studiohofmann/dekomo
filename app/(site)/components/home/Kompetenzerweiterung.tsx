import { sanityFetch } from "@/sanity/lib/client";
import { KOMPETENZERWEITERUNG_QUERY } from "@/sanity/lib/queries";
import type { KOMPETENZERWEITERUNG_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import ExpandableSquareCard from "../ExpandableSquareCard";

export default async function Kompetenzerweiterung() {
  const kompetenzerweiterung: KOMPETENZERWEITERUNG_QUERYResult =
    await sanityFetch({
      query: KOMPETENZERWEITERUNG_QUERY,
      revalidate: 60,
    });

  if (!kompetenzerweiterung) {
    return <div>No content found.</div>;
  }

  return (
    <section id={kompetenzerweiterung.sectionId ?? undefined}>
      <ExpandableSquareCard>
        <h2>{kompetenzerweiterung.ueberschrift}</h2>
        {kompetenzerweiterung.text && (
          <div className="portable-text">
            <PortableText value={kompetenzerweiterung.text || []} />
          </div>
        )}
      </ExpandableSquareCard>
    </section>
  );
}
