import type { Metadata } from "next";
import "../globals.css";
import { sanityFetch } from "@/sanity/lib/client";
import { NAVIGATION_QUERY } from "@/sanity/lib/queries";
import type { NAVIGATION_QUERYResult } from "@/sanity/types";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SearchHighlighter from "./components/header/search-bar/SearchHighlighter";
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
    <div className="antialiased">
      <Header menuItems={menuItems} />
      <main>
        <SearchHighlighter />
        {children}
        <SpeedInsights />
      </main>
      <Footer />
    </div>
  );
}
