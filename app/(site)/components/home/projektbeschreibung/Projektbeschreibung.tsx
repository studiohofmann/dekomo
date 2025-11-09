import { sanityFetch } from "@/sanity/lib/client";
import { PROJEKTBESCHREIBUNG_QUERY } from "@/sanity/lib/queries";
import type { PROJEKTBESCHREIBUNG_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import GrafikProjektbeschreibung from "./GrafikProjektbeschreibung";
import ExpandableSquareCard from "../../ExpandableSquareCard";

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
    <section id={projektbeschreibung.sectionId ?? undefined}>
      <ExpandableSquareCard>
        <h2>{projektbeschreibung.ueberschrift}</h2>
        <div className="w-full">
          <GrafikProjektbeschreibung />
        </div>
        <div className="portable-text">
          <PortableText value={projektbeschreibung.text || []} />
        </div>
      </ExpandableSquareCard>
    </section>
  );
}
