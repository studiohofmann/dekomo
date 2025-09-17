import { sanityFetch } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";
import type { HOME_QUERYResult } from "@/sanity/types";
import Einleitung from "./components/home/Einleitung";
import Vision from "./components/home/vision/Vision";
import Projektbeschreibung from "./components/home/projektbeschreibung/Projektbeschreibung";
import Teilprojekte from "./components/home/Teilprojekte";
import Zugangswege from "./components/home/Zugangswege";
import News from "./components/home/News";
import Auswirkungen from "./components/home/Auswirkungen";
import Fallbeispiele from "./components/home/Fallbeispiele";
import Netzwerk from "./components/home/Netzwerk";
import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";

// Generate metadata for the homepage
export async function generateMetadata(): Promise<Metadata> {
  const homeSeite: HOME_QUERYResult = await sanityFetch({
    query: HOME_QUERY,
    revalidate: 60,
  });

  return generateSEOMetadata({
    data: homeSeite,
    // No fallback title needed - homepage should use the default title
    url: "/",
  });
}

export default function Home() {
  return (
    <div>
      <Einleitung />
      <div className="page-content md:grid-cols-2 2xl:grid-cols-3 xl:gap-16">
        <div id="projektbeschreibung">
          <Projektbeschreibung />
        </div>
        <div id="teilprojekte">
          <Teilprojekte />
        </div>
        <div id="auswirkungen">
          <Auswirkungen />
        </div>

        <div id="fallbeispiele">
          <Fallbeispiele />
        </div>
        <div id="news">
          <News />
        </div>
        <div id="netzwerk">
          <Netzwerk />
        </div>
        <div id="zugangswege">
          <Zugangswege />
        </div>
        <div id="vision">
          <Vision />
        </div>
      </div>
    </div>
  );
}
