import { sanityFetch } from "@/sanity/lib/client";
import { KONTAKT_SEITE_QUERY } from "@/sanity/lib/queries";
import type { KONTAKT_SEITE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import ContactForm from "../components/kontakt/ContactForm";
import Ansprechpersonen from "../components/kontakt/Ansprechpersonen";
import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";

// Replace your entire generateMetadata function with this:
export async function generateMetadata(): Promise<Metadata> {
  const kontaktSeite: KONTAKT_SEITE_QUERYResult = await sanityFetch({
    query: KONTAKT_SEITE_QUERY,
    revalidate: 60,
  });

  return generateSEOMetadata({
    data: kontaktSeite, // Pass the entire Sanity object
    title: !kontaktSeite ? "Kontakt" : undefined, // Fallback title if no data
    description: !kontaktSeite ? "Kontaktieren Sie das DeKoMo Team" : undefined,
    url: "/kontakt",
  });
}

export default async function Kontakt() {
  const kontaktSeite: KONTAKT_SEITE_QUERYResult = await sanityFetch({
    query: KONTAKT_SEITE_QUERY,
    revalidate: 60,
  });

  if (!kontaktSeite) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Kontakt</h1>
        <p className="text-gray-600">Keine Kontaktseite gefunden.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <section id={kontaktSeite.sectionId ?? undefined}>
        <h1>{kontaktSeite.seitentitelMenue}</h1>
        <div className="portable-text">
          <PortableText value={kontaktSeite.text ?? []} />
        </div>
      </section>
      <div id="kontakt-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {" "}
        <Ansprechpersonen />
        <ContactForm />
      </div>
    </div>
  );
}
