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
    <section className="bg-blue-200">
      <h1>{einleitung.ueberschrift}</h1>
    </section>
  );
}
