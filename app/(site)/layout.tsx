import type { Metadata } from "next";
import "../globals.css";
import { sanityFetch } from "@/sanity/lib/client";
import { NAVIGATION_QUERY, NEWSLETTER_QUERY } from "@/sanity/lib/queries";
import type { NAVIGATION_QUERYResult, NEWSLETTER_QUERYResult } from "@/sanity/types";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SearchHighlighter from "./components/header/search-bar/SearchHighlighter";
import NewsletterModal from "./components/NewsletterModal";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "DeKoMo",
  description: "Vernetz für kompetente Demenzversorgung",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch navigation data
  const menuItemsRaw: NAVIGATION_QUERYResult = await sanityFetch({
    query: NAVIGATION_QUERY,
    revalidate: 60,
  });
  const newsletter: NEWSLETTER_QUERYResult = await sanityFetch({
    query: NEWSLETTER_QUERY,
    revalidate: 60,
  });

  // Filter out items where slug is null
  const menuItems = menuItemsRaw.filter(
    (
      item
    ): item is typeof item & {
      slug: { current: string };
      seitentitelMenue: string;
      menuReihenfolge: number;
    } => !!item.slug && !!item.slug.current && !!item.seitentitelMenue
  );

  return (
    <>
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossOrigin=""
    />
    <div className="antialiased">
      <NewsletterModal text={newsletter?.text} />
      <Header menuItems={menuItems} />
      <main>
        <SearchHighlighter />
        {children}
        <SpeedInsights />
      </main>
      <Footer />
    </div>
    </>
  );
}
