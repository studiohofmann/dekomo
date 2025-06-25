import { sanityFetch } from "@/sanity/lib/client";
import { VISION_QUERY } from "@/sanity/lib/queries";
import PortableTextRenderer from "../PortableTextRenderer";

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
      <div>
        <PortableTextRenderer value={vision.text} />
      </div>
    </section>
  );
}
