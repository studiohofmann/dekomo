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
      <button
        onClick={() => {
          if (typeof window !== "undefined") {
            window.removeAllHighlights?.();
          }
          setIsOpen(true);
        }}
        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        aria-label="Search"
      >
        <SearchOutlined className="text-gray-700" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="rounded-lg shadow-xl w-full h-full m-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with close button */}
            <div className="bg-white flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Suche</h2>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Close search"
              >
                <CloseOutlined />
              </button>
            </div>

            {/* Search Input */}
            <div className="bg-white p-4 border-b">
              <input
                type="search"
                value={query}
                onChange={handleSearch}
                placeholder="Suche..."
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>

            {/* Results */}
            <div className="p-4 flex-1 overflow-y-auto">
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
                      className="block p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        if (typeof window !== "undefined")
                          window.removeAllHighlights?.();
                        closeModal();
                      }}
                    >
                      <div className="font-semibold text-gray-900 mb-2">
                        {item.seitentitelMenue ||
                          item.seoTitle ||
                          item.ueberschrift ||
                          item.metaDescription}
                      </div>
                      <div className="text-gray-700 line-clamp-3">
                        {highlight(getPreview(item, query), query)}
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
