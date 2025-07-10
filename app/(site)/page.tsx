import { sanityFetch } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";
import type { HOME_QUERYResult } from "@/sanity/types";
import Vision from "./components/home/Vision";
import Projektbeschreibung from "./components/home/Projektbeschreibung";
import Teilprojekte from "./components/home/Teilprojekte";
import Zugangswege from "./components/home/Zugangswege";
import News from "./components/home/News";
import Auswirkungen from "./components/home/Auswirkungen";
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
    <div className="page-section">
      <section className="bg-[#5a7cbe] text-gray-100">
        <Projektbeschreibung />
      </section>
      <section>
        <Teilprojekte />
      </section>
      <div className="lg:flex">
        <section className="bg-[#f7f1a9] lg:flex-1 lg:pr-16">
          <Zugangswege />
        </section>
        <section className="bg-[#5a7cbe] text-gray-100 lg:flex-1 lg:pl-16">
          <Auswirkungen />
        </section>
      </div>
      <section>
        <News />
      </section>
      <section className="bg-[#5a7cbe] text-gray-100">
        <Netzwerk />
      </section>
      <section className="bg-[#f7f1a9]">
        <Vision />
      </section>
    </div>
  );
}
