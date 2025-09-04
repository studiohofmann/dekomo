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
    return <div>No content found.</div>;
  }

  return (
    <div className="relative flex justify-center items-center w-full h-[75vh]">
      {einleitung.bild && (
        <SanityImage
          image={einleitung.bild}
          altFallback={einleitung.bild.alt || "Bild"}
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
      )}
      {/* Overlay filter */}
      <div className="absolute inset-0 bg-[#94b0dd]/50 z-10" />
      <div className="page-introduction bg-none absolute inset-0 items-center justify-center z-20">
        <h1 className="text-gray-100">{einleitung.ueberschrift}</h1>
        {einleitung.text && (
          <div className="portable-text text-gray-100 text-center text-sm md:text-base 2xl:px-16">
            <PortableText value={einleitung.text || []} />
          </div>
        )}
      </div>
    </div>
  );
}
