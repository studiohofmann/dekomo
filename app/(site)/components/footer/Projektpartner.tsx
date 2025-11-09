import { sanityFetch } from "@/sanity/lib/client";
import { PROJEKTPARTNER_QUERY } from "@/sanity/lib/queries";
import type { PROJEKTPARTNER_QUERYResult } from "@/sanity/types";
import SanityImage from "../SanityImage";

export default async function Projektpartner() {
  const partner: PROJEKTPARTNER_QUERYResult = await sanityFetch({
    query: PROJEKTPARTNER_QUERY,
    revalidate: 60,
  });

  if (!partner) {
    return <div>No content found.</div>;
  }

  return (
    <section id={partner.sectionId || undefined}>
      <h3 className="">{partner.ueberschrift}</h3>
      <div className="footer-grid">
        {partner.logos?.map((logo, index) => (
          <div key={index} className="footer-logo-container">
            <SanityImage
              image={logo}
              altFallback="Partner Logo"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
