import { sanityFetch } from "@/sanity/lib/client";
import { VISION_QUERY } from "@/sanity/lib/queries";
import type { VISION_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import ExpandableSquareCard from "../../ExpandableSquareCard";
import GrafikVision from "./GrafikVision";

export default async function Vision() {
  const vision: VISION_QUERYResult = await sanityFetch({
    query: VISION_QUERY,
    revalidate: 60,
  });

  if (!vision) {
    return <div>No content found.</div>;
  }

  return (
    <section id={vision.sectionId ?? undefined}>
      <ExpandableSquareCard>
        <h2>{vision.ueberschrift}</h2>
        <div className="w-full">
          <GrafikVision />
        </div>
        <div className="portable-text">
          <PortableText value={vision.text || []} />
        </div>
      </ExpandableSquareCard>
    </section>
  );
}
