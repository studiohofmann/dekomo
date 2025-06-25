import { sanityFetch } from "@/sanity/lib/client";
import { VISION_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";

export default async function Vision() {
  const vision = await sanityFetch({
    query: VISION_QUERY,
    revalidate: 60,
  });

  if (!vision) {
    return <div>No content found.</div>;
  }

  return (
    <section className="bg-[#5e6b78] text-[#f9f9f9]">
      <h2>{vision.ueberschrift}</h2>
      <div className="prose prose-lg max-w-none prose-headings:text-[#f9f9f9] prose-p:text-[#f9f9f9] prose-li:text-[#f9f9f9] prose-strong:text-[#f9f9f9]">
        <PortableText value={vision.text || []} />
      </div>
    </section>
  );
}
