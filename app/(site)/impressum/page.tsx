import { sanityFetch } from "@/sanity/lib/client";
import { IMPRESSUM_SEITE_QUERY } from "@/sanity/lib/queries";
import type { IMPRESSUM_SEITE_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import Datenschutz from "../components/Datenschutz";
import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import ExpandableSquareCard from "../components/ExpandableSquareCard";

// Generate metadata for the impressum page
export async function generateMetadata(): Promise<Metadata> {
  const impressumSeite: IMPRESSUM_SEITE_QUERYResult = await sanityFetch({
    query: IMPRESSUM_SEITE_QUERY,
    revalidate: 60,
  });

  return generateSEOMetadata({
    data: impressumSeite,
    title: !impressumSeite ? "Impressum" : undefined, // Fallback title if no data
    description: !impressumSeite
      ? "Impressum und rechtliche Hinweise"
      : undefined,
    url: "/impressum",
  });
}

export default async function Impressum() {
  const impressumSeite: IMPRESSUM_SEITE_QUERYResult = await sanityFetch({
    query: IMPRESSUM_SEITE_QUERY,
    revalidate: 60,
  });

  if (!impressumSeite) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Impressum</h1>
        <p className="text-gray-600">Keine Impressum-Seite gefunden.</p>
      </div>
    );
  }

  return (
    <div id="impressumSeite">
      <div className="page-introduction">
        <h1>{impressumSeite.seitentitelMenue}</h1>
        <div className="portable-text">
          <PortableText value={impressumSeite.impressumText ?? []} />
        </div>
      </div>
      <div className="page-content">
        <div className="card">
          <h2>{impressumSeite.angabenUeberschrift}</h2>
          <div className="portable-text portable-text-impressum-links">
            <PortableText value={impressumSeite.angabenText ?? []} />
          </div>
        </div>
        <div id="datenschutz" className="scroll-mt-24">
          <ExpandableSquareCard className="!bg-[#f7f1a9]">
            <Datenschutz />
          </ExpandableSquareCard>
        </div>
      </div>
    </div>
  );
}
