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
    <div className="footer mb-24">
      <section className="gap-4">
        <h3>{footer.partner}</h3>

        <div className="flex flex-wrap gap-4">
          {footer.partnerLogos?.map((logo, index) => (
            <div key={index} className="">
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
      </section>

      {/* Netzwerk Section */}
      <section className="gap-4">
        <h3>{footer.netzwerk}</h3>

        <div className="flex flex-wrap gap-8">
          {footer.netzwerkLogos?.map((logo, index) => (
            <div key={index} className="">
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
      </section>
    </div>
  );
}
