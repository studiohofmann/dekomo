import { sanityFetch } from "@/sanity/lib/client";
import { IMPRESSUM_SEITE_QUERY } from "@/sanity/lib/queries";
import type { IMPRESSUM_SEITE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";

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
      <section>
        <h1 className="text-center">{impressumSeite.seitentitelMenue}</h1>
        <div className="portable-text">
          <PortableText value={impressumSeite.angabenText ?? []} />
        </div>
      </section>
      <section>
        <div className="portable-text">
          <PortableText value={impressumSeite.impressumText ?? []} />
        </div>
      </section>
    </div>
  );
}
