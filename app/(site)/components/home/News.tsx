import Link from "next/link";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/lib/client";
import { NEWS_QUERY, DOWNLOADS_SEITE_QUERY } from "@/sanity/lib/queries";
import type {
  NEWS_QUERYResult,
  DOWNLOADS_SEITE_QUERYResult,
} from "@/sanity/types";
import { PortableText } from "next-sanity";

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
    <div className="flex flex-col gap-4">
      <h2>{news?.ueberschrift || "Aktuelles & Downloads"}</h2>
      <div className="flex flex-col gap-8 lg:flex-row">
        {news?.text && (
          <div className="portable-text lg:flex-1">
            <PortableText value={news.text} />
          </div>
        )}
        <Link
          href={
            downloadsSeite?.slug?.current
              ? `/${downloadsSeite.slug.current}`
              : "/downloads"
          }
          className="self-center sm:self-center md:self-center lg:flex-1 lg:self-end"
        >
          <Button variant="custom" size="custom">
            Zu den Downloads
          </Button>
        </Link>
      </div>
    </div>
  );
}
