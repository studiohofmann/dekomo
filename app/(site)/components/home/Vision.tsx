import { sanityFetch } from "@/sanity/lib/client";
import { VISION_QUERY } from "@/sanity/lib/queries";
import type { VISION_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../SanityImage";

export default async function Vision() {
  const vision: VISION_QUERYResult = await sanityFetch({
    query: VISION_QUERY,
    revalidate: 60,
  });

  if (!vision) {
    return <div>No content found.</div>;
  }

  return (
    <div className="-mb-4 flex flex-col gap-4">
      <h2>{vision.ueberschrift}</h2>
      <div className="flex flex-col lg:gap-8 lg:flex-row lg:items-start">
        <div className="portable-text lg:w-1/2">
          <PortableText value={vision.text || []} />
        </div>
        {vision.grafik && (
          <div className="lg:w-1/2">
            <SanityImage
              image={vision.grafik}
              altFallback="Vision Grafik"
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
