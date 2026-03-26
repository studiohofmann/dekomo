"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { CloseOutlined } from "@ant-design/icons";

// Types for portable text blocks used in previews
type PTChild = { text?: string };
type PTBlock = { children?: PTChild[] };

// Shape of a search result item (only the fields we use)
type SearchResult = {
  _type: string;
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

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  loading: boolean;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isShrunk: boolean;
}

// Highlight the search term in the preview text
function highlight(text: string, query: string): React.ReactNode {
  if (!text || !query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-[#f7f1a9] p-1 rounded">
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

export default function SearchModal({
  isOpen,
  onClose,
  query,
  results,
  loading,
  handleSearch,
  isShrunk,
}: SearchModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-x-0 z-50 flex justify-center px-4 md:px-8 2xl:px-24 pt-16 pb-16 bg-gray-100 ${
        isShrunk ? "top-20" : "top-32"
      } bottom-0`}
      onClick={onClose}
    >
      <div
        className="search-bar"
        style={{
          height: results.length > 0 ? "auto" : "fit-content",
          maxHeight: "100vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input and Close Button Row */}
        <div className="flex flex-col gap-4 items-center w-full">
          <input
            type="search"
            value={query}
            onChange={handleSearch}
            placeholder="Suche..."
            autoFocus
            className="w-full"
          />
        </div>

        {/* Results */}
        <div
          className={`flex flex-col flex-1 overflow-y-auto gap-4  ${
            results.length > 0 ? "block" : "hidden"
          }`}
        >
          {loading && <div className="p-4 text-center">Lädt...</div>}
          {!loading && results.length === 0 && query.length > 1 && (
            <div className="p-4 text-center ">Keine Treffer</div>
          )}
          {!loading &&
            results.map((item) => {
              const handleClick = () => {
                const base = item.slug?.current || "/";
                const pathname = base.startsWith("/") ? base : `/${base}`;
                const searchParam = `?search=${encodeURIComponent(query)}`;
                const hash = item.sectionId ? `#${item.sectionId}` : "";
                const url = `${pathname}${searchParam}${hash}`;
                console.log("Navigating to:", url);
                window.removeAllHighlights?.();
                window.location.href = url;
              };

              return (
                <Link
                  key={item._id}
                  href={`/${item.slug?.current || ""}${item.sectionId ? `#${item.sectionId}` : ""}?search=${encodeURIComponent(query)}`}
                  className="block"
                  onClick={handleClick}
                >
                  <div className="flex flex-col gap-4">
                    <div className="bg-gray-100 p-4">
                      <div className="text-sm">
                        {item.seitentitelMenue ||
                          item.seoTitle ||
                          item.ueberschrift ||
                          item.metaDescription}
                      </div>
                      <div className="text-sm font-medium text-gray-700 line-clamp-3">
                        {highlight(getPreview(item, query), query)}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
        <button onClick={onClose} aria-label="Close search" className="w-full">
          <CloseOutlined />
        </button>
      </div>
    </div>
  );
}
