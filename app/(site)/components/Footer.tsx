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
    <div className="footer mb-18 md:mb-0 gap-4">
      <div className="flex flex-col gap-4">
        <h3 className="text-gray-400">{footer.partner}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {footer.partnerLogos?.map((logo, index) => (
            <div
              key={index}
              className="bg-gray-400 py-2 px-4  rounded-md shadow-md"
            >
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
      <div className="flex flex-col gap-4">
        <h3 className="text-gray-400">{footer.netzwerk}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {footer.netzwerkLogos?.map((logo, index) => (
            <div
              key={index}
              className="bg-gray-400 py-2 px-4  rounded-md shadow-md"
            >
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
      <div className="text-center text-sm text-gray-400">
        Copyright &copy; {new Date().getFullYear()} DeKoMo. All rights reserved.
      </div>
    </div>
  );
}
