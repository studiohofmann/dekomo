import { sanityFetch } from "@/sanity/lib/client";
import { TEILPROJEKTE_QUERY } from "@/sanity/lib/queries";
import type { TEILPROJEKTE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../SanityImage";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default async function Teilprojekte() {
  const teilprojekte: TEILPROJEKTE_QUERYResult = await sanityFetch({
    query: TEILPROJEKTE_QUERY,
    revalidate: 60,
  });

  if (!teilprojekte || teilprojekte.length === 0) {
    return <div>No content found.</div>;
  }

  return (
    <section className="bg-[#fbef82] py-8">
      <Tabs defaultValue={teilprojekte[0].ueberschrift || "tab-0"}>
        <TabsList>
          {teilprojekte.map((teilprojekt, idx) => (
            <TabsTrigger
              key={idx}
              value={teilprojekt.ueberschrift || `tab-${idx}`}
            >
              {teilprojekt.ueberschrift || `Teilprojekt ${idx + 1}`}
            </TabsTrigger>
          ))}
        </TabsList>

        {teilprojekte.map((teilprojekt, idx) => (
          <TabsContent
            key={idx}
            value={teilprojekt.ueberschrift || `tab-${idx}`}
            className="p-4"
          >
            {teilprojekt.text && (
              <div className="portable-text">
                <PortableText value={teilprojekt.text || []} />
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
