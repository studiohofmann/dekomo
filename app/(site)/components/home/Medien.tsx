import { sanityFetch } from "@/sanity/lib/client";
import { MEDIEN_QUERY } from "@/sanity/lib/queries";
import type { MEDIEN_QUERYResult } from "@/sanity/types";
import ExpandableSquareCard from "../ExpandableSquareCard";

export default async function Medien() {
  const medien: MEDIEN_QUERYResult = await sanityFetch({
    query: MEDIEN_QUERY,
    revalidate: 60,
  });

  return (
    <section id={medien?.sectionId ?? undefined}>
      <ExpandableSquareCard className="!bg-[#f7f1a9]">
        <div className="flex flex-col h-full w-full">
          <div className="flex-1 flex flex-col gap-4">
            <h2>{medien?.ueberschrift || "Aktuelles & Downloads"}</h2>
            {medien?.dateien && medien.dateien.length > 0 && (
              <div className="flex flex-col gap-4">
                {medien.dateien.map((item, index) => {
                  const href =
                    item.typ === "datei" ? item.datei?.asset?.url : item.link;
                  return (
                    <div key={index}>
                      <a
                        href={href || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button"
                      >
                        {item.titel}
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </ExpandableSquareCard>
    </section>
  );
}
