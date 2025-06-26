import { sanityFetch } from "@/sanity/lib/client";
import { FOOTER_QUERY } from "@/sanity/lib/queries";
import type { FOOTER_QUERYResult } from "@/sanity/types";

export default async function Footer() {
  const footer: FOOTER_QUERYResult = await sanityFetch({
    query: FOOTER_QUERY,
    revalidate: 60,
  });

  if (!footer) {
    return <div>No content found.</div>;
  }

  return (
    <div className="pb-24 bg-neutral-400">
      {/* Partner Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">{footer.partner}</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl">
          {footer.partnerLogos?.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              {logo.url ? (
                <a
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition-opacity"
                >
                  <img
                    src={logo.asset?.url ?? undefined}
                    alt={logo.alt || "Partner Logo"}
                    className="h-12 w-auto object-contain"
                  />
                </a>
              ) : (
                <img
                  src={logo.asset?.url ?? undefined}
                  alt={logo.alt || "Partner Logo"}
                  className="h-12 w-auto object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Netzwerk Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">{footer.netzwerk}</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {footer.netzwerkLogos?.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              {logo.url ? (
                <a
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition-opacity"
                >
                  <img
                    src={logo.asset?.url ?? undefined}
                    alt={logo.alt || "Netzwerk Logo"}
                    className="h-12 w-auto object-contain"
                  />
                </a>
              ) : (
                <img
                  src={logo.asset?.url ?? undefined}
                  alt={logo.alt || "Netzwerk Logo"}
                  className="h-12 w-auto object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
