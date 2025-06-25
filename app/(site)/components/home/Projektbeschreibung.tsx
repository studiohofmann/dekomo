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
    <section className="bg-yellow-200 p-8">
      <h1 className="text-3xl font-bold mb-6">
        {projektbeschreibung.ueberschrift}
      </h1>

      {/* Main content */}
      <div className="prose mb-8">
        <PortableText value={projektbeschreibung.text ?? []} />
      </div>

      {/* Zusatzinfos Section - Simplified */}
      {projektbeschreibung.zusatzinfos && (
        <div className="mt-12 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Zusatzinformationen</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Simplified - just pass the grafik directly */}
            {projektbeschreibung.zusatzinfos.grafik && (
              <div>
                <SanityImage
                  image={projektbeschreibung.zusatzinfos.grafik}
                  altFallback="Zusatzinformationen Grafik"
                  aspectRatio="aspect-4/3"
                  className="rounded-lg object-cover"
                />
              </div>
            )}

            {/* Zusatzinfos Text */}
            {projektbeschreibung.zusatzinfos.text && (
              <div className="prose prose-lg">
                <PortableText value={projektbeschreibung.zusatzinfos.text} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Teilprojekte Section - This is already good */}
      {projektbeschreibung.teilprojekte &&
        projektbeschreibung.teilprojekte.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Teilprojekte</h2>

            <div className="grid gap-8">
              {projektbeschreibung.teilprojekte.map((teilprojekt, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">
                    {teilprojekt.ueberschrift}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* This usage is perfect */}
                    {teilprojekt.grafik && (
                      <div>
                        <SanityImage
                          image={teilprojekt.grafik}
                          altFallback={`${teilprojekt.ueberschrift} Grafik`}
                          aspectRatio="aspect-4/3"
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}

                    {teilprojekt.text && (
                      <div className="prose">
                        <PortableText value={teilprojekt.text} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </section>
  );
}
