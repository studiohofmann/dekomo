import { sanityFetch } from "@/sanity/lib/client";
import { FALLBEISPIELE_QUERY } from "@/sanity/lib/queries";
import type { FALLBEISPIELE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../SanityImage";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ExpandableSquareCard from "../ExpandableSquareCard";

export default async function Fallbeispiele() {
  const data: FALLBEISPIELE_QUERYResult = await sanityFetch({
    query: FALLBEISPIELE_QUERY,
    revalidate: 60,
  });

  if (!data || !data.fallbeispiel || data.fallbeispiel.length === 0) {
    return <div>No content found.</div>;
  }

  return (
    <section id={data.sectionId ?? undefined}>
      <ExpandableSquareCard>
        {data.ueberschrift && <h2>{data.ueberschrift}</h2>}
        <Tabs defaultValue={data.fallbeispiel[0].ueberschrift || "tab-0"}>
          <TabsList>
            {data.fallbeispiel.map((fallbeispiel, idx) => (
              <TabsTrigger
                key={idx}
                value={fallbeispiel.ueberschrift || `tab-${idx}`}
              >
                {fallbeispiel.ueberschrift || `Teilprojekt ${idx + 1}`}
              </TabsTrigger>
            ))}
          </TabsList>

          {data.fallbeispiel.map((fallbeispiel, idx) => (
            <TabsContent
              key={idx}
              value={fallbeispiel.ueberschrift || `tab-${idx}`}
            >
              {fallbeispiel.bild && (
                <div className="mb-4">
                  <SanityImage
                    image={fallbeispiel.bild}
                    altFallback={fallbeispiel.bild.alt || "Bild"}
                    width={800}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
              )}
              {fallbeispiel.text && (
                <div className="portable-text">
                  <PortableText value={fallbeispiel.text || []} />
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </ExpandableSquareCard>
    </section>
  );
}
