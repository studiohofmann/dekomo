import { sanityFetch } from "@/sanity/lib/client";
import { MEDIEN_QUERY } from "@/sanity/lib/queries";
import type { MEDIEN_QUERYResult } from "@/sanity/types";

export default async function MedienPage() {
  const medien: MEDIEN_QUERYResult = await sanityFetch({
    query: MEDIEN_QUERY,
    revalidate: 60,
  });

  return (
    <div className="page">
      <section id={medien?.sectionId ?? undefined}>
        <h1>{medien?.ueberschrift || "Medien"}</h1>
      </section>

      <section>
        {medien?.dateien && medien.dateien.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {medien.dateien.map((item, index) => {
              const href =
                item.typ === "datei" ? item.datei?.asset?.url : item.link;
              return (
                <div key={index} className="card flex-row items-center justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="font-bold">{item.titel}</div>
                    <div className="flex flex-col text-sm font-medium">
                      {item.medium && <span>{item.medium}</span>}
                      {item.datum && <span>{item.datum}</span>}
                    </div>
                  </div>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button>zum Artikel</button>
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600">Derzeit sind keine Medieneinträge verfügbar.</p>
        )}
      </section>
    </div>
  );
}
