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
      <section className="background-blue">
        <h1>{kontaktSeite.seitentitelMenue}</h1>
      </section>
      <section>
        <div className="portable-text">
          <PortableText value={kontaktSeite.text ?? []} />
        </div>
      </section>
      <div className="md:grid md:grid-cols-2">
        <section className="bg-[#f7f1a9]">
          <Ansprechpersonen />
        </section>
        <section className="!pl-8">
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
