import { sanityFetch } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";

export default async function Home() {
  const home = await sanityFetch({
    query: HOME_QUERY,
    revalidate: 60,
  });

  if (!home) {
    return <div>No content found.</div>;
  }

  return <PortableText value={home.introduction ?? []} />;
}
