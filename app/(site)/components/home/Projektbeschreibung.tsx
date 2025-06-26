import { sanityFetch } from "@/sanity/lib/client";
import { PROJEKTBESCHREIBUNG_QUERY } from "@/sanity/lib/queries";
import type { PROJEKTBESCHREIBUNG_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../SanityImage";

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
    <section className="bg-[#f7f1a9]">
      <h2>{projektbeschreibung.ueberschrift}</h2>
      {projektbeschreibung.text && (
        <div className="portable-text">
          <PortableText value={projektbeschreibung.text || []} />
        </div>
      )}

      {projektbeschreibung.zusatzinfos && (
        <div className="flex flex-col gap-8">
          {projektbeschreibung.zusatzinfos.grafik && (
            <div>
              <SanityImage
                image={projektbeschreibung.zusatzinfos.grafik}
                altFallback="Zusatzinformationen Grafik"
                aspectRatio="aspect-4/3"
              />
            </div>
          )}

          {projektbeschreibung.zusatzinfos.text && (
            <div className="portable-text">
              <PortableText
                value={projektbeschreibung.zusatzinfos.text || []}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
