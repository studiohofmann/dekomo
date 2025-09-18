"use client";
import { useEffect } from "react";

function removeAllHighlights() {
  console.log("[Highlight] Removing all highlights");
  document.querySelectorAll("mark[data-search-highlight]").forEach((el) => {
    const parent = el.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(el.textContent || ""), el);
    }
  });
}

function attemptHighlight() {
  const main = document.querySelector("main");
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get("search");

  if (!searchTerm) {
    console.log("[Highlight] No search term in URL");
    return;
  }

  // Prevent infinite loop
  if (main && main.getAttribute("data-highlighted-search") === searchTerm) {
    return;
  }
  if (main) main.setAttribute("data-highlighted-search", searchTerm);

  console.log(`[Highlight] Highlighting search term: "${searchTerm}"`);
  removeAllHighlights();

  // Expand ALL expandable cards to reveal content
  const allExpandableCards = document.querySelectorAll(".expandable-card");
  const expansionPromises: Promise<void>[] = [];

  allExpandableCards.forEach((card) => {
    const isExpanded =
      card.classList.contains("expanded") ||
      card.querySelector('[aria-expanded="true"]');
    if (!isExpanded) {
      const expandButton = card.querySelector(
        'button[aria-expanded="false"], button:not([aria-expanded])'
      );
      if (expandButton) {
        console.log("[Highlight] Expanding card:", card);
        (expandButton as HTMLButtonElement).click();
        expansionPromises.push(
          new Promise((resolve) => setTimeout(resolve, 800))
        ); // Increased delay for animation
      }
    }
  });

  // After expansions complete, highlight
  Promise.all(expansionPromises).then(() => {
    console.log("[Highlight] All cards expanded, now highlighting");

    let firstMatch: HTMLElement | null = null;

    // Scan for matches in the now-expanded content
    const highlightWalker = document.createTreeWalker(
      main || document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) =>
          node.nodeValue &&
          node.nodeValue.toLowerCase().includes(searchTerm.toLowerCase())
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP,
      }
    );

    const nodesToHighlight: Text[] = [];
    let highlightNode = highlightWalker.nextNode();
    while (highlightNode) {
      nodesToHighlight.push(highlightNode as Text);
      highlightNode = highlightWalker.nextNode();
    }

    nodesToHighlight.forEach((textNode) => {
      const html = textNode.nodeValue!.replace(
        new RegExp(`(${searchTerm})`, "gi"),
        '<mark data-search-highlight style="background: #fde68a;">$1</mark>'
      );
      const span = document.createElement("span");
      span.innerHTML = html;
      textNode.parentElement?.replaceChild(span, textNode);
      if (!firstMatch) {
        firstMatch = span.querySelector("mark[data-search-highlight]");
      }
    });

    // Scroll to first match
    if (firstMatch) {
      console.log("[Highlight] Scrolling to first match");
      (firstMatch as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else {
      console.log("[Highlight] No matches found");
    }

    // Remove search param from URL to prevent persistence
    const url = new URL(window.location.href);
    url.searchParams.delete("search");
    window.history.replaceState({}, "", url.toString());
  });
}

// Replace any/NodeJS.Timeout usage with safer types
type Timeout = ReturnType<typeof setTimeout>;
type ObserverData = {
  observer: MutationObserver;
  mutationTimeout: Timeout | null;
} | null;

function attachObserver(): {
  observer: MutationObserver;
  mutationTimeout: Timeout | null;
} | null {
  const main = document.querySelector("main");
  if (!main) return null;
  let mutationTimeout: Timeout | null = null;
  const observer = new MutationObserver(() => {
    if (mutationTimeout) clearTimeout(mutationTimeout);
    mutationTimeout = setTimeout(() => {
      console.log("[Highlight] MutationObserver triggered");
      const urlParams = new URLSearchParams(window.location.search);
      const searchTerm = urlParams.get("search");
      if (searchTerm) {
        attemptHighlight();
      }
    }, 100);
  });
  observer.observe(main, { childList: true, subtree: true });
  return { observer, mutationTimeout };
}

// declare the global window augmentation so we don't need `any`
declare global {
  interface Window {
    removeAllHighlights?: () => void;
  }
}

export default function SearchHighlighter() {
  // Helper to attach MutationObserver to <main>
  // Expose removeAllHighlights globally for SearchBar to use
  if (typeof window !== "undefined") {
    window.removeAllHighlights = removeAllHighlights;
  }

  useEffect(() => {
    removeAllHighlights();

    let observerData: ObserverData = null; // Remove didInitialRender
    let pollTimeout: Timeout | null = null;

    function waitForMainAndAttach() {
      const main = document.querySelector("main");
      if (main) {
        observerData = attachObserver();
        // Remove didInitialRender = true;
        // Check for search term on initial load
        attemptHighlight();
      } else {
        pollTimeout = setTimeout(waitForMainAndAttach, 50);
      }
    }
    waitForMainAndAttach();

    const onHashChange = () => {
      console.log("[Highlight] Hash changed");
      attemptHighlight();
      if (observerData && observerData.observer)
        observerData.observer.disconnect();
      observerData = attachObserver();
    };

    const onPopState = () => {
      console.log("[Highlight] Navigation event");
      removeAllHighlights();
      attemptHighlight();
      if (observerData && observerData.observer)
        observerData.observer.disconnect();
      observerData = attachObserver();
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onPopState);
      if (observerData && observerData.observer)
        observerData.observer.disconnect();
      if (observerData && observerData.mutationTimeout)
        clearTimeout(observerData.mutationTimeout);
      if (pollTimeout) clearTimeout(pollTimeout);
      removeAllHighlights();
    };
  }, []);

  return null;
}
