import { sanityFetch } from "@/sanity/lib/client";
import { ANSPRECHPERSONEN_QUERY } from "@/sanity/lib/queries";
import type { ANSPRECHPERSONEN_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../SanityImage";

export default async function Ansprechpersonen() {
  const ansprechpersonen: ANSPRECHPERSONEN_QUERYResult = await sanityFetch({
    query: ANSPRECHPERSONEN_QUERY,
    revalidate: 60,
  });

  if (!ansprechpersonen) {
    return <div>No content found.</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <h2>{ansprechpersonen.ueberschrift}</h2>
      <div className="flex flex-col gap-4">
        {(ansprechpersonen.ansprechperson ?? []).map((person, index) => (
          <div key={index} className="flex gap-4 items-center">
            {person.profilbild && person.profilbild.asset && (
              <SanityImage
                image={person.profilbild}
                altFallback={person.profilbild.alt || "Profilbild"}
                width={80}
                height={80}
                className="object-cover rounded-full shadow-md"
              />
            )}
            {person.text && (
              <div>
                <PortableText value={person.text || []} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
