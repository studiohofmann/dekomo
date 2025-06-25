import { sanityFetch } from "@/sanity/lib/client";
import { PROJEKTBESCHREIBUNG_QUERY } from "@/sanity/lib/queries";
import type { PROJEKTBESCHREIBUNG_QUERYResult } from "@/sanity/types";
import PortableTextRenderer from "../PortableTextRenderer";
import SanityImage from "../SanityImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <section>
      <h2>{projektbeschreibung.ueberschrift}</h2>
      <PortableTextRenderer value={projektbeschreibung.text ?? []} />

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
            <PortableTextRenderer
              value={projektbeschreibung.zusatzinfos.text}
            />
          )}
        </div>
      )}

      {/* Updated to use the new nested structure */}
      {projektbeschreibung.teilprojekte?.projekte &&
        projektbeschreibung.teilprojekte.projekte.length > 0 && (
          <div>
            {/* Show the section title */}
            {projektbeschreibung.teilprojekte.ueberschrift && (
              <h3 className="text-xl font-bold mb-4">
                {projektbeschreibung.teilprojekte.ueberschrift}
              </h3>
            )}

            <Tabs defaultValue={`teilprojekt-0`}>
              {/* Tab Triggers */}
              <TabsList className="flex flex-col">
                {projektbeschreibung.teilprojekte.projekte.map(
                  (projekt, index) => (
                    <TabsTrigger key={index} value={`teilprojekt-${index}`}>
                      {projekt.ueberschrift}
                    </TabsTrigger>
                  )
                )}
              </TabsList>

              {/* Tab Content */}
              {projektbeschreibung.teilprojekte.projekte.map(
                (projekt, index) => (
                  <TabsContent key={index} value={`teilprojekt-${index}`}>
                    <div>
                      <div>
                        {projekt.grafik && (
                          <div>
                            <SanityImage
                              image={projekt.grafik}
                              altFallback={`${projekt.ueberschrift} Grafik`}
                              aspectRatio="aspect-4/3"
                              className="object-cover"
                            />
                          </div>
                        )}

                        {projekt.text && (
                          <div>
                            <PortableTextRenderer value={projekt.text} />
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                )
              )}
            </Tabs>
          </div>
        )}
    </section>
  );
}
