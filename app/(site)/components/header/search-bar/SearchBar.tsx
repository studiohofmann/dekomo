"use client";

import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import SearchModal from "./SearchModal";

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
  _type: string;
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

interface SearchBarProps {
  isShrunk?: boolean;
}

export default function SearchBar({ isShrunk = false }: SearchBarProps) {
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

  // Get a preview snippet from the first matching field (moved to SearchModal, but kept here for filtering)
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
                const idx = childText
                  .toLowerCase()
                  .indexOf(query.toLowerCase());
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
        aria-label="Search"
        className="md:text-lg md:bg-transparent md:shadow-none md:p-0 md:text-[#5a7cbe] md:hover:text-gray-700"
      >
        <SearchOutlined />
        <span className="md:hidden">Suche</span>
      </button>

      <SearchModal
        isOpen={isOpen}
        onClose={closeModal}
        query={query}
        setQuery={setQuery}
        results={results}
        loading={loading}
        handleSearch={handleSearch}
        isShrunk={isShrunk}
      />
    </>
  );
}
