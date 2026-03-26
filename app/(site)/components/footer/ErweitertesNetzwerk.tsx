import { sanityFetch } from "@/sanity/lib/client";
import { ERWEITERTES_NETZWERK_QUERY } from "@/sanity/lib/queries";
import type { ERWEITERTES_NETZWERK_QUERYResult } from "@/sanity/types";
import SanityImage from "../SanityImage";

export default async function ErweitertesNetzwerk() {
  const erweitertesNetzwerk: ERWEITERTES_NETZWERK_QUERYResult =
    await sanityFetch({
      query: ERWEITERTES_NETZWERK_QUERY,
      revalidate: 60,
    });

  if (!erweitertesNetzwerk) {
    return <div>No content found.</div>;
  }

  return (
    <section id={erweitertesNetzwerk.sectionId || undefined}>
      <h3 className="">{erweitertesNetzwerk.ueberschrift}</h3>
      <div className="footer-grid">
        {erweitertesNetzwerk.logos?.map((logo, index) => (
          <div key={index} className="footer-logo-container">
            <SanityImage
              image={logo}
              altFallback="Netzwerk Logo"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
