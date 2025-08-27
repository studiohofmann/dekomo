import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { NEWS_QUERY, DOWNLOADS_SEITE_QUERY } from "@/sanity/lib/queries";
import type {
  NEWS_QUERYResult,
  DOWNLOADS_SEITE_QUERYResult,
} from "@/sanity/types";
import { PortableText } from "next-sanity";
import ExpandableSquareCard from "../ExpandableSquareCard";

export default async function News() {
  const news: NEWS_QUERYResult = await sanityFetch({
    query: NEWS_QUERY,
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
          <h2>{news?.ueberschrift || "Aktuelles & Downloads"}</h2>
          {news?.text && (
            <div className="portable-text">
              <PortableText value={news.text} />
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-center">
          <Link
            href={
              downloadsSeite?.slug?.current
                ? `/${downloadsSeite.slug.current}`
                : "/downloads"
            }
            className="self-center"
          >
            Zu den Downloads
          </Link>
        </div>
      </div>
    </ExpandableSquareCard>
  );
}
