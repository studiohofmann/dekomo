"use client";

import React, { useState } from "react";
import Link from "next/link";

// add global declaration so we can use window.removeAllHighlights without `any`
declare global {
  interface Window {
    removeAllHighlights?: () => void;
  }
}

// Types for portable text blocks used in previews
type PTChild = { text?: string };
type PTBlock = { children?: PTChild[] };

// Shape of a search result item (only the fields we use)
type SearchResult = {
  _id: string;
  slug?: { current?: string };
  sectionId?: string;
  text?: string | PTBlock[];
  angabenText?: string;
  impressumText?: string;
  ansprechperson?: { text?: PTBlock[] }[]; // can contain blocks
  metaDescription?: string;
  ueberschrift?: string;
  seitentitelMenue?: string;
  seoTitle?: string;
};

// Highlight the search term in the preview text
function highlight(text: string, query: string): React.ReactNode {
  if (!text || !query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-200">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

// Get a preview snippet from the first matching field
function getPreview(item: SearchResult, query: string): string {
  const fields: (string | PTBlock[] | undefined)[] = [
    item.text,
    item.angabenText,
    item.impressumText,
    // flatten ansprechperson.text arrays if present
    item.ansprechperson?.flatMap((p) => p.text) as PTBlock[] | undefined,
    item.metaDescription,
    item.ueberschrift,
    item.seitentitelMenue,
    item.seoTitle,
  ];

  for (const field of fields) {
    if (Array.isArray(field)) {
      for (const block of field) {
        if (block && block.children) {
          for (const child of block.children) {
            const childText = child?.text ?? "";
            if (
              childText &&
              childText.toLowerCase().includes(query.toLowerCase())
            ) {
              const idx = childText.toLowerCase().indexOf(query.toLowerCase());
              if (idx !== -1) {
                const start = Math.max(0, idx - 30);
                const end = Math.min(childText.length, idx + query.length + 70);
                let snippet = childText.slice(start, end);
                if (start > 0) snippet = "…" + snippet;
                if (end < childText.length) snippet = snippet + "…";
                return snippet;
              }
            }
          }
        }
      }
    } else if (
      typeof field === "string" &&
      field.toLowerCase().includes(query.toLowerCase())
    ) {
      const idx = field.toLowerCase().indexOf(query.toLowerCase());
      if (idx !== -1) {
        const start = Math.max(0, idx - 30);
        const end = Math.min(field.length, idx + query.length + 70);
        let snippet = field.slice(start, end);
        if (start > 0) snippet = "…" + snippet;
        if (end < field.length) snippet = snippet + "…";
        return snippet;
      }
    }
  }
  return "";
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Handle search input and fetch results
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // use the declared window property instead of casting to any
    if (typeof window !== "undefined") {
      window.removeAllHighlights?.();
    }
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
    const data = (await res.json()) as SearchResult[];
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="relative">
      <input
        type="search"
        value={query}
        onChange={handleSearch}
        placeholder="Suche..."
        className="
          bg-gray-200 border px-4 py-2 h-10 rounded-md text-gray-700
          focus:outline-none
          placeholder-gray-500 placeholder:italic placeholder:text-sm w-[123.7px]
        "
      />
      {query.length > 1 && (
        <div className="absolute p-8 bg-gray-100 left-0 top-full border border-gray-700 rounded-md shadow mt-2 z-10 w-64">
          {loading && <div className="p-2">Lädt...</div>}
          {!loading && results.length === 0 && (
            <div className="p-2">Keine Treffer</div>
          )}
          {!loading &&
            results.map((item) => {
              const sectionId =
                item.sectionId || (item as Partial<SearchResult>)._id;
              const targetUrl = `/${item.slug?.current || ""}#${sectionId}-search-${encodeURIComponent(query)}`;
              return (
                <Link
                  key={item._id}
                  href={targetUrl}
                  className="bg-gray-100 px-4 py-2 hover:bg-gray-100"
                  // type the event and use the declared window property
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    if (typeof window !== "undefined") {
                      window.removeAllHighlights?.();
                    }
                    const isSamePage =
                      window.location.pathname ===
                      `/${item.slug?.current || ""}`;
                    if (isSamePage) {
                      e.preventDefault();
                      window.location.hash = `${sectionId}-search-${encodeURIComponent(query)}`;
                      window.dispatchEvent(new Event("hashchange"));
                    }
                    setQuery("");
                    setResults([]);
                    // For cross-page navigation, do NOT prevent default!
                  }}
                  scroll={false}
                >
                  <div className="font-bold">
                    {item.seitentitelMenue ||
                      item.seoTitle ||
                      item.ueberschrift ||
                      item.metaDescription}
                  </div>
                  <div className="text-sm text-gray-600 line-clamp-2">
                    {highlight(getPreview(item, query), query)}
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}
