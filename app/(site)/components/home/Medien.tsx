import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { MEDIEN_QUERY, DOWNLOADS_SEITE_QUERY } from "@/sanity/lib/queries";
import type {
  MEDIEN_QUERYResult,
  DOWNLOADS_SEITE_QUERYResult,
} from "@/sanity/types";
import { PortableText } from "next-sanity";
import ExpandableSquareCard from "../ExpandableSquareCard";

export default async function Medien() {
  const medien: MEDIEN_QUERYResult = await sanityFetch({
    query: MEDIEN_QUERY,
    revalidate: 60,
  });

  const downloadsSeite: DOWNLOADS_SEITE_QUERYResult = await sanityFetch({
    query: DOWNLOADS_SEITE_QUERY,
    revalidate: 60,
  });

  return (
    <ExpandableSquareCard className="!bg-[#f7f1a9]">
      <div className="flex flex-col h-full w-full">
        <div className="flex-1 flex flex-col gap-4">
          <h2>{medien?.ueberschrift || "Aktuelles & Downloads"}</h2>
          {medien?.text && (
            <div className="portable-text">
              <PortableText value={medien.text} />
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-center">
          <Link
            href={
              downloadsSeite?.slug?.current
                ? `/${downloadsSeite.slug.current}`
                : "/medien"
            }
            className="self-center"
          >
            Zur Übersicht
          </Link>
        </div>
      </div>
    </ExpandableSquareCard>
  );
}
