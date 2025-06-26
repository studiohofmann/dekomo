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
    <div className="page-section">
      <section>
        <h1 className="text-center">{kontaktSeite.seitentitelMenue}</h1>
        <div className="portable-text">
          <PortableText value={kontaktSeite.text ?? []} />
        </div>
      </section>
      <section>
        <div className="flex flex-col gap-4">
          <h2>{kontaktSeite.ueberschriftAnsprechpersonen}</h2>
          <div className="portable-text">
            <PortableText value={kontaktSeite.textAnsprechpersonen ?? []} />
          </div>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
