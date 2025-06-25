import { sanityFetch } from "@/sanity/lib/client";
import { FOOTER_QUERY } from "@/sanity/lib/queries";
import type { FOOTER_QUERYResult } from "@/sanity/types";

export default async function Footer() {
  const footer: FOOTER_QUERYResult = await sanityFetch({
    query: FOOTER_QUERY,
    revalidate: 60,
  });

  if (!footer) {
    return <div>No content found.</div>;
  }

  return (
    <div className="pb-48">
      <h1>{footer.partner}</h1>
      <h1>{footer.netzwerk}</h1>
    </div>
  );
}
