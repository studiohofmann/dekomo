import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

// Update to handle null values properly
type SanityImageType = {
  asset?: {
    _id: string;
    url: string | null;
  } | null;
  alt?: string | null;
} | null; // Add null to the entire type

interface SanityImageProps {
  image: SanityImageType;
  altFallback?: string;
  aspectRatio?: string;
  priority?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

export default function SanityImage({
  image,
  altFallback = "Image",
  aspectRatio = "aspect-[4/3]",
  priority = false,
  className = "object-cover",
  width,
  height,
}: SanityImageProps) {
  // Handle all null cases
  if (!image || !image.asset || !image.asset.url) {
    return null;
  }

  const altText = image.alt || altFallback;

  // If width/height provided, use them instead of fill
  if (width && height) {
    return (
      <Image
        src={urlFor(image).url()}
        alt={altText}
        width={width}
        height={height}
        quality={100}
        priority={priority}
        placeholder="blur"
        blurDataURL={urlFor(image).width(24).height(24).blur(10).url()}
        className={className}
      />
    );
  }

  return (
    <div className={`relative w-full h-full ${aspectRatio}`}>
      <Image
        src={urlFor(image).url()}
        alt={altText}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={80}
        priority={priority}
        placeholder="blur"
        blurDataURL={urlFor(image).width(24).height(24).blur(10).url()}
        className={className}
      />
    </div>
  );
}
