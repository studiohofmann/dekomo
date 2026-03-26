import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio",
  description: "Content management for DeKoMo",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
