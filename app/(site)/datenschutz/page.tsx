import { sanityFetch } from "@/sanity/lib/client";
import { DATENSCHUTZ_SEITE_QUERY } from "@/sanity/lib/queries";
import type { DATENSCHUTZ_SEITE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";

export default async function Datenschutz() {
  const datenschutzSeite: DATENSCHUTZ_SEITE_QUERYResult = await sanityFetch({
    query: DATENSCHUTZ_SEITE_QUERY,
    revalidate: 60,
  });

  if (!datenschutzSeite) {
    return <div>No content found.</div>;
  }

  return (
    <div className="page-section">
      <section>
        <h1 className="text-center">{datenschutzSeite.seitentitelMenue}</h1>
      </section>
      <section className="background-blue">
        <div className="portable-text">
          <PortableText value={datenschutzSeite.text ?? []} />
        </div>
      </section>
    </div>
  );
}
