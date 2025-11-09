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
  const main = document.body;
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

  // IMPORTANT: Wait for content to load before processing
  setTimeout(() => {
    // Handle hash scrolling FIRST
    const hash = window.location.hash;
    let highlightScope: Node = main;

    if (hash) {
      const sectionId = hash.substring(1);
      window.dispatchEvent(
        new CustomEvent("search:open", { detail: { sectionId } })
      );
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        highlightScope = targetElement;
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.log("[Highlight] Section not found:", hash);
      }
    }

    // Decide which cards need expanding
    let cardsToExpand: Element[] = [];
    if (hash && highlightScope instanceof Element) {
      const parentCard = highlightScope.closest(
        ".expandable-card, .expandable-square-card"
      );
      if (parentCard) cardsToExpand = [parentCard];
    } else {
      cardsToExpand = Array.from(
        document.querySelectorAll(".expandable-card, .expandable-square-card")
      );
    }

    cardsToExpand = Array.from(new Set(cardsToExpand));

    const expansionPromises: Promise<void>[] = [];

    console.log("[Highlight] Found expandable cards:", cardsToExpand.length);

    cardsToExpand.forEach((card) => {
      const wrapper = card.closest(".expandable-wrapper");
      const isExpanded =
        card.classList.contains("expanded") ||
        wrapper?.getAttribute("data-expanded") === "true" ||
        wrapper?.querySelector('[aria-expanded="true"]');

      if (!isExpanded) {
        const expandButton =
          wrapper?.querySelector('button[aria-expanded="false"]') ??
          wrapper?.querySelector("button:not([aria-expanded])");

        if (expandButton) {
          console.log("[Highlight] Expanding card:", wrapper);
          (expandButton as HTMLButtonElement).click();
          expansionPromises.push(
            new Promise((resolve) => setTimeout(resolve, 1500))
          );
        }
      }
    });

    Promise.all(expansionPromises).then(() => {
      console.log("[Highlight] Highlighting within scope");

      const createWalker = () =>
        document.createTreeWalker(highlightScope, NodeFilter.SHOW_TEXT, {
          acceptNode: (node) => {
            const parent = (node as Text).parentElement;
            if (
              parent &&
              (parent.tagName === "SCRIPT" || parent.tagName === "STYLE")
            ) {
              return NodeFilter.FILTER_SKIP;
            }
            return node.nodeValue &&
              node.nodeValue.toLowerCase().includes(searchTerm.toLowerCase())
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_SKIP;
          },
        });

      const collectMatches = () => {
        const walker = createWalker();
        const nodes: Text[] = [];
        let current = walker.nextNode();
        while (current) {
          nodes.push(current as Text);
          current = walker.nextNode();
        }
        return nodes;
      };

      let nodesToHighlight = collectMatches();

      if (nodesToHighlight.length === 0) {
        console.log("[Highlight] No matches found in page content");
        return;
      }

      // Only use the first match (the one the user clicked)
      nodesToHighlight = [nodesToHighlight[0]];

      const cardsToExpand = Array.from(
        new Set(
          nodesToHighlight
            .map((textNode) =>
              textNode.parentElement?.closest(
                ".expandable-card, .expandable-square-card"
              )
            )
            .filter(Boolean) as Element[]
        )
      );

      const expansionPromises: Promise<void>[] = [];
      cardsToExpand.forEach((card) => {
        const wrapper = card.closest(".expandable-wrapper");
        const isExpanded =
          card.classList.contains("expanded") ||
          wrapper?.getAttribute("data-expanded") === "true" ||
          wrapper?.querySelector('[aria-expanded="true"]');

        if (!isExpanded) {
          const expandButton =
            wrapper?.querySelector('button[aria-expanded="false"]') ??
            wrapper?.querySelector("button:not([aria-expanded])");

          if (expandButton) {
            console.log("[Highlight] Expanding card:", wrapper);
            (expandButton as HTMLButtonElement).click();
            expansionPromises.push(
              new Promise((resolve) => setTimeout(resolve, 1500))
            );
          }
        }
      });

      Promise.all(expansionPromises).then(() => {
        if (expansionPromises.length > 0) {
          const updatedMatches = collectMatches();
          if (updatedMatches.length === 0) {
            console.log(
              "[Highlight] No matches found in page content after expansion"
            );
            return;
          }
          nodesToHighlight = [updatedMatches[0]];
        }

        let firstMatch: HTMLElement | null = null;

        nodesToHighlight.forEach((textNode) => {
          if (!textNode.parentElement || !textNode.nodeValue) return;

          const html = textNode.nodeValue.replace(
            new RegExp(`(${searchTerm})`, "gi"),
            '<mark data-search-highlight style="background: #f7f1a9; padding: 0.25rem; border-radius: 0.25rem;">$1</mark>'
          );
          const span = document.createElement("span");
          span.innerHTML = html;
          textNode.parentElement.replaceChild(span, textNode);
          if (!firstMatch) {
            const mark = span.querySelector("mark[data-search-highlight]");
            if (mark && mark instanceof HTMLElement) {
              firstMatch = mark;
            }
          }
        });

        if (firstMatch !== null && !hash) {
          console.log("[Highlight] Scrolling to first match");
          (firstMatch as HTMLElement).scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        setTimeout(() => {
          const url = new URL(window.location.href);
          url.searchParams.delete("search");
          window.history.replaceState({}, "", url.toString());
        }, 3000);
      });
    });
  }, 500); // Wait 500ms for content to render
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
  const main = document.body; // Instead of document.querySelector("main")
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
      const main = document.body; // Instead of document.querySelector("main")
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
