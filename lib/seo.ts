import type { Metadata } from "next";

// Updated interface to match your actual Sanity generated types
interface SEOData {
  seoTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string[] | null;
  openGraphImage?: {
    asset?: {
      _id?: string;
      url?: string | null;
      metadata?: {
        dimensions?: {
          width?: number | null;
          height?: number | null;
        } | null;
      } | null;
    } | null;
    alt?: string | null;
  } | null;
  noIndex?: boolean | null;
  seitentitelMenue?: string | null;
}

interface GenerateSEOMetadataParams {
  data?: SEOData | null;
  title?: string;
  description?: string;
  url: string;
  type?: "website" | "article";
}

export function generateSEOMetadata({
  data,
  title,
  description,
  url,
  type = "website",
}: GenerateSEOMetadataParams): Metadata {
  const defaultTitle = "DeKoMo";
  const defaultDescription = "Vernetzt für kompetente Dememnzversorgung";
  const siteUrl = "https://dekomo.ch";

  const finalTitle = title
    ? `${title} | DeKoMo`
    : data?.seoTitle
      ? `${data.seoTitle} | DeKoMo`
      : data?.seitentitelMenue
        ? `${data.seitentitelMenue} | DeKoMo`
        : defaultTitle;

  const finalDescription =
    description || data?.metaDescription || defaultDescription;
  const finalUrl = `${siteUrl}${url}`;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: data?.keywords?.join(", "),
    robots: data?.noIndex ? "noindex, nofollow" : undefined,
    alternates: {
      canonical: finalUrl,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: finalUrl,
      type: type,
      images: data?.openGraphImage?.asset?.url
        ? [
            {
              url: data.openGraphImage.asset.url,
              width:
                data.openGraphImage.asset.metadata?.dimensions?.width ||
                undefined,
              height:
                data.openGraphImage.asset.metadata?.dimensions?.height ||
                undefined,
              alt: data.openGraphImage.alt || finalTitle,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: data?.openGraphImage?.asset?.url
        ? [data.openGraphImage.asset.url]
        : undefined,
    },
  };
}
