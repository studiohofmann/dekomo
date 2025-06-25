import { sanityFetch } from "@/sanity/lib/client";
import { AUSWIRKUNGEN_QUERY } from "@/sanity/lib/queries";
import type { AUSWIRKUNGEN_QUERYResult } from "@/sanity/types";
import SanityImage from "../SanityImage";

export default async function Auswirkungen() {
  const auswirkungen: AUSWIRKUNGEN_QUERYResult = await sanityFetch({
    query: AUSWIRKUNGEN_QUERY,
    revalidate: 60,
  });

  if (!auswirkungen) {
    return <div>No content found.</div>;
  }

  return (
    <section>
      <h2>{auswirkungen.ueberschrift}</h2>
      <SanityImage
        image={auswirkungen.grafik}
        altFallback="Auswirkungen Grafik"
      />
    </section>
  );
}
