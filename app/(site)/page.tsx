import { sanityFetch } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";
import type { HOME_QUERYResult } from "@/sanity/types";
import Einleitung from "./components/home/Einleitung";
import Projektbeschreibung from "./components/home/projektbeschreibung/Projektbeschreibung";
import Teilprojekte from "./components/home/Teilprojekte";
import Auswirkungen from "./components/home/Auswirkungen";
import Fallbeispiele from "./components/home/Fallbeispiele";
import Medien from "./components/home/Medien";
import Netzwerk from "./components/home/Netzwerk";
import Zugangswege from "./components/home/Zugangswege";
import Kompetenzerweiterung from "./components/home/Kompetenzerweiterung";
import Vision from "./components/home/vision/Vision";
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

export default async function Home() {
  const homeSeite: HOME_QUERYResult = await sanityFetch({
    query: HOME_QUERY,
    revalidate: 60,
  });

  return (
    <div id={homeSeite?.sectionId ?? undefined}>
      <Einleitung />
      <div className="landing-page">
        <Projektbeschreibung />
        <Teilprojekte />
        <Auswirkungen />
        <Fallbeispiele />
        <Medien />
        <Netzwerk />
        <Zugangswege />
        <Kompetenzerweiterung />
        <Vision />
      </div>
    </div>
  );
}
