import { sanityFetch } from "@/sanity/lib/client";
import { DATENSCHUTZ_QUERY } from "@/sanity/lib/queries";
import type { DATENSCHUTZ_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";

export default async function Datenschutz() {
  const datenschutz: DATENSCHUTZ_QUERYResult = await sanityFetch({
    query: DATENSCHUTZ_QUERY,
    revalidate: 60,
  });

  if (!datenschutz) {
    return <div>No content found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>{datenschutz.ueberschrift}</h2>
      {datenschutz.text && (
        <div className="portable-text">
          <PortableText value={datenschutz.text || []} />
        </div>
      )}
    </div>
  );
}
