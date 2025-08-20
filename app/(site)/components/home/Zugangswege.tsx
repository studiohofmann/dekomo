import { sanityFetch } from "@/sanity/lib/client";
import { ZUGANGSWEGE_QUERY } from "@/sanity/lib/queries";
import type { ZUGANGSWEGE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import ExpandableSquareCard from "../ExpandableSquareCard";

export default async function Zugangswege() {
  const zugangswege: ZUGANGSWEGE_QUERYResult = await sanityFetch({
    query: ZUGANGSWEGE_QUERY,
    revalidate: 60,
  });

  if (!zugangswege) {
    return <div>No content found.</div>;
  }

  return (
    <ExpandableSquareCard>
      <h2>{zugangswege.ueberschrift}</h2>
      {zugangswege.text && (
        <div className="portable-text">
          <PortableText value={zugangswege.text || []} />
        </div>
      )}
      {/* 
        {zugangswege.grafik && (
          <div className="lg:w-1/2">
            <SanityImage
              image={zugangswege.grafik}
              altFallback={zugangswege.grafik.alt || "Grafik"}
              width={600}
              height={400}
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
        )}*/}
    </ExpandableSquareCard>
  );
}
