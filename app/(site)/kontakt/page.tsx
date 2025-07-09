import { sanityFetch } from "@/sanity/lib/client";
import { KONTAKT_SEITE_QUERY } from "@/sanity/lib/queries";
import type { KONTAKT_SEITE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import ContactForm from "../components/kontakt/ContactForm";
import Ansprechpersonen from "../components/kontakt/Ansprechpersonen";

export default async function Kontakt() {
  const kontaktSeite: KONTAKT_SEITE_QUERYResult = await sanityFetch({
    query: KONTAKT_SEITE_QUERY,
    revalidate: 60,
  });

  if (!kontaktSeite) {
    return <div>No content found.</div>;
  }

  return (
    <div className="page-section">
      <section className="background-blue gap-8">
        <h2>{kontaktSeite.seitentitelMenue}</h2>
        <div className="portable-text">
          <PortableText value={kontaktSeite.text ?? []} />
        </div>
      </section>
      <div className="lg:grid lg:grid-cols-2">
        <section className="background-yellow lg:pr-8">
          <Ansprechpersonen />
        </section>
        <section className="lg:pl-8">
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
