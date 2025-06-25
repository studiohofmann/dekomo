import { sanityFetch } from "@/sanity/lib/client";
import { KONTAKT_SEITE_QUERY } from "@/sanity/lib/queries";
import type { KONTAKT_SEITE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import ContactForm from "../components/ContactForm";

export default async function Kontakt() {
  const kontaktSeite: KONTAKT_SEITE_QUERYResult = await sanityFetch({
    query: KONTAKT_SEITE_QUERY,
    revalidate: 60,
  });

  if (!kontaktSeite) {
    return <div>No content found.</div>;
  }

  return (
    <div className="pt-48">
      {kontaktSeite.seitentitelMenue}
      <PortableText value={kontaktSeite.text ?? []} />
      {kontaktSeite.ueberschriftAnsprechpersonen}
      <PortableText value={kontaktSeite.textAnsprechpersonen ?? []} />
      <ContactForm />
    </div>
  );
}
