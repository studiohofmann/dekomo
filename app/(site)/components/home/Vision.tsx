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
    <div className="-mb-4 flex flex-col gap-4">
      <h2>{vision.ueberschrift}</h2>
      <div className="portable-text">
        <PortableText value={vision.text || []} />
      </div>
    </div>
  );
}
