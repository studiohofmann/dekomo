import { sanityFetch } from "@/sanity/lib/client";
import { EINLEITUNG_QUERY } from "@/sanity/lib/queries";
import type { EINLEITUNG_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import SanityImage from "../SanityImage";

export default async function Einleitung() {
  const einleitung: EINLEITUNG_QUERYResult = await sanityFetch({
    query: EINLEITUNG_QUERY,
    revalidate: 60,
  });

  if (!einleitung) {
    return (
      <div>
        Willkommen bei DeKoMo - Ihr Partner für kompetente Demenzversorgung
      </div>
    );
  }

  return (
    <div className="hero">
      {einleitung.bild && (
        <SanityImage
          image={einleitung.bild}
          altFallback={einleitung.bild.alt || "Bild"}
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-[#94b0dd]/75 z-10" />

      <div className="hero-text">
        <h1>{einleitung.ueberschrift}</h1>
        {einleitung.text && (
          <div className="portable-text text-center">
            <PortableText value={einleitung.text || []} />
          </div>
        )}
      </div>
    </div>
  );
}
