import { sanityFetch } from "@/sanity/lib/client";
import { IMPRESSUM_SEITE_QUERY } from "@/sanity/lib/queries";
import type { IMPRESSUM_SEITE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import Datenschutz from "../components/Datenschutz";

export default async function Impressum() {
  const impressumSeite: IMPRESSUM_SEITE_QUERYResult = await sanityFetch({
    query: IMPRESSUM_SEITE_QUERY,
    revalidate: 60,
  });

  if (!impressumSeite) {
    return <div>No content found.</div>;
  }

  return (
    <div className="page-section">
      <div className="flex flex-col lg:flex-row">
        <section
          id="impressum"
          className="background-blue gap-8 lg:flex-1 lg:!pr-8"
        >
          <h2>{impressumSeite.seitentitelMenue}</h2>
          <div className="portable-text portable-text-blue-background-links">
            <PortableText value={impressumSeite.angabenText ?? []} />
          </div>
        </section>
        <section className="lg:flex-1 lg:!pl-8">
          <div className="portable-text">
            <PortableText value={impressumSeite.impressumText ?? []} />
          </div>
        </section>
      </div>
      <section id="datenschutz" className="background-yellow scroll-mt-12">
        <Datenschutz />
      </section>
    </div>
  );
}
