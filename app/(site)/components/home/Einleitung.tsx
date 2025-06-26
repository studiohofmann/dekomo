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
    <section className="bg-neutral-200 pt-0">
      <h2 className="text-center text-[#575756]">{einleitung.ueberschrift}</h2>
    </section>
  );
}
