import { sanityFetch } from "@/sanity/lib/client";
import { ZUGANGSWEGE_QUERY } from "@/sanity/lib/queries";
import type { ZUGANGSWEGE_QUERYResult } from "@/sanity/types";
import SanityImage from "../SanityImage";

export default async function Zugangswege() {
  const zugangswege: ZUGANGSWEGE_QUERYResult = await sanityFetch({
    query: ZUGANGSWEGE_QUERY,
    revalidate: 60,
  });

  if (!zugangswege) {
    return <div>No content found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>{zugangswege.ueberschrift}</h2>
      <SanityImage
        image={zugangswege.grafik}
        altFallback="Zugangswege Grafik"
      />
    </div>
  );
}
