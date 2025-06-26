import { sanityFetch } from "@/sanity/lib/client";
import { PROJEKTBESCHREIBUNG_QUERY } from "@/sanity/lib/queries";
import type { PROJEKTBESCHREIBUNG_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../SanityImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Teilprojekte() {
  const projektbeschreibung: PROJEKTBESCHREIBUNG_QUERYResult =
    await sanityFetch({
      query: PROJEKTBESCHREIBUNG_QUERY,
      revalidate: 60,
    });

  if (!projektbeschreibung) {
    return <div>No content found.</div>;
  }

  return (
    <section className="bg-[#fbef82]">
      {projektbeschreibung.teilprojekte?.projekte &&
        projektbeschreibung.teilprojekte.projekte.length > 0 && (
          <div>
            {projektbeschreibung.teilprojekte.ueberschrift && (
              <h3 className="text-xl font-bold mb-4">
                {projektbeschreibung.teilprojekte.ueberschrift}
              </h3>
            )}

            <Tabs defaultValue={`teilprojekt-0`}>
              <TabsList className="flex flex-col">
                {projektbeschreibung.teilprojekte.projekte.map(
                  (projekt, index) => (
                    <TabsTrigger key={index} value={`teilprojekt-${index}`}>
                      {projekt.ueberschrift}
                    </TabsTrigger>
                  )
                )}
              </TabsList>

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
                          <div className="portable-text px-4 py-8">
                            <PortableText value={projekt.text || []} />
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
