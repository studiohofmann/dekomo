"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";

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
                // increase context: show more chars before/after match
                const start = Math.max(0, idx - 100); // was 30
                const end = Math.min(
                  childText.length,
                  idx + query.length + 200
                ); // was +70
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
        const start = Math.max(0, idx - 100); // was 30
        const end = Math.min(field.length, idx + query.length + 200); // was +70
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
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Handle search input and fetch results
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    try {
      console.log("Searching for:", value);
      const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      console.log("API response status:", res.status);
      let data = await res.json();
      console.log("Raw search results:", data);

      // Filter results to only include those with actual preview content
      data = data.filter((item: SearchResult) => {
        const preview = getPreview(item, value);
        return preview.trim().length > 0;
      });

      console.log("Filtered search results:", data);
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  return (
    <>
      {/* Search Icon */}
      <div
        onClick={() => {
          if (typeof window !== "undefined") {
            window.removeAllHighlights?.();
          }
          setIsOpen(true);
        }}
        className="w-full h-full flex items-center justify-center text-lg cursor-pointer text-[#5a7cbe] hover:text-gray-700 transition-colors duration-300 ease-in-out"
        aria-label="Search"
      >
        <SearchOutlined />
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-100 z-50 flex justify-center p-4 md:px-8 xl:px-16 2xl:px-32"
          onClick={closeModal}
        >
          <div
            className="search-bar"
            style={{
              height: results.length > 0 ? "auto" : "8rem", // Dynamic height
              maxHeight: "100vh", // Limit max height
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="search"
              value={query}
              onChange={handleSearch}
              placeholder="Suche..."
              autoFocus
            />

            {/* Results */}
            <div
              className={`flex flex-col flex-1 overflow-y-auto gap-4 ${
                results.length > 0 ? "block" : "hidden"
              }`}
            >
              {loading && <div className="p-4 text-center">Lädt...</div>}
              {!loading && results.length === 0 && query.length > 1 && (
                <div className="p-4 text-center text-gray-500">
                  Keine Treffer
                </div>
              )}
              {!loading &&
                results.map((item) => {
                  return (
                    <Link
                      key={item._id}
                      href={`${item.slug?.current || ""}?search=${encodeURIComponent(query)}`}
                      className="block"
                      onClick={() => {
                        if (typeof window !== "undefined")
                          window.removeAllHighlights?.();
                        closeModal();
                      }}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="font-semibold">
                          {item.seitentitelMenue ||
                            item.seoTitle ||
                            item.ueberschrift ||
                            item.metaDescription}
                        </div>
                        <div className="font-normal">
                          {highlight(getPreview(item, query), query)}
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
            <button onClick={closeModal} aria-label="Close search">
              <CloseOutlined />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
