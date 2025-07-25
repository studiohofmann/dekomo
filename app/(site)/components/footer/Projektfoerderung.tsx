import { sanityFetch } from "@/sanity/lib/client";
import { PROJEKTFOERDERUNG_QUERY } from "@/sanity/lib/queries";
import type { PROJEKTFOERDERUNG_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../SanityImage";

export default async function Projektfoerderung() {
  const projektfoerderung: PROJEKTFOERDERUNG_QUERYResult = await sanityFetch({
    query: PROJEKTFOERDERUNG_QUERY,
    revalidate: 60,
  });

  if (!projektfoerderung) {
    return <div>No content found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="">{projektfoerderung.ueberschrift}</h3>
      <div className="footer-grid">
        {projektfoerderung.logo && (
          <div className="footer-logo-container flex justify-center items-center">
            <SanityImage
              image={projektfoerderung.logo}
              altFallback="Projektförderung Logo"
              className="object-contain"
            />
          </div>
        )}
        {projektfoerderung.text && (
          <div className="portable-text text-sm col-span-2">
            <PortableText value={projektfoerderung.text} />
          </div>
        )}
      </div>
    </div>
  );
}
