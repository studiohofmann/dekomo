import { sanityFetch } from "@/sanity/lib/client";
import { EINLEITUNG_QUERY } from "@/sanity/lib/queries";

export default async function Einleitung() {
  const einleitung = await sanityFetch({
    query: EINLEITUNG_QUERY,
    revalidate: 60,
  });

  if (!einleitung) {
    return <div>No content found.</div>;
  }

  return (
    <section className="bg-[#e1e8f0] pt-0">
      <h2 className="text-center text-[#5e6b78]">{einleitung.ueberschrift}</h2>
    </section>
  );
}
