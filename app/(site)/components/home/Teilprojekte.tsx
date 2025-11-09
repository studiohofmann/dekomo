import { sanityFetch } from "@/sanity/lib/client";
import { TEILPROJEKTE_QUERY } from "@/sanity/lib/queries";
import type { TEILPROJEKTE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ExpandableSquareCard from "../ExpandableSquareCard";

export default async function Teilprojekte() {
  const data: TEILPROJEKTE_QUERYResult = await sanityFetch({
    query: TEILPROJEKTE_QUERY,
    revalidate: 60,
  });

  if (!data || !data.teilprojekt || data.teilprojekt.length === 0) {
    return <div>No content found.</div>;
  }

  return (
    <section id={data.sectionId ?? undefined}>
      <ExpandableSquareCard>
        {data.ueberschrift && <h2>{data.ueberschrift}</h2>}
        <Tabs defaultValue={data.teilprojekt[0].ueberschrift || "tab-0"}>
          <TabsList>
            {data.teilprojekt.map((teilprojekt, idx) => (
              <TabsTrigger
                key={idx}
                value={teilprojekt.ueberschrift || `tab-${idx}`}
              >
                {teilprojekt.ueberschrift || `Teilprojekt ${idx + 1}`}
              </TabsTrigger>
            ))}
          </TabsList>

          {data.teilprojekt.map((teilprojekt, idx) => (
            <TabsContent
              key={idx}
              value={teilprojekt.ueberschrift || `tab-${idx}`}
            >
              {teilprojekt.text && (
                <div className="portable-text">
                  <PortableText value={teilprojekt.text || []} />
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </ExpandableSquareCard>
    </section>
  );
}
