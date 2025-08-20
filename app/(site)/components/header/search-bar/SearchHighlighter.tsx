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

function removeHashFromUrl() {
  if (window.location.hash) {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }
}

function highlightInSection(
  section: HTMLElement,
  searchTerm: string,
  shouldScroll = true
) {
  console.log(
    `[Highlight] Highlighting "${searchTerm}" in section #${section.id}`
  );
  section.querySelectorAll("mark[data-search-highlight]").forEach((el) => {
    const parent = el.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(el.textContent || ""), el);
    }
  });

  let firstMatch: HTMLElement | null = null;
  // Collect all matching text nodes first
  const walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      node.nodeValue &&
      node.nodeValue.toLowerCase().includes(searchTerm.toLowerCase())
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP,
  });
  const nodesToHighlight: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    nodesToHighlight.push(node as Text);
    node = walker.nextNode();
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

  if (firstMatch && shouldScroll) {
    console.log("[Highlight] Scrolling to first match");
    (firstMatch as HTMLElement).scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  } else if (!firstMatch) {
    console.log("[Highlight] No matches found");
  }
}

function attemptHighlight(retries = 0) {
  const main = document.querySelector("main");
  const hash = window.location.hash;
  // Prevent infinite loop: only highlight if hash changed
  if (main && main.getAttribute("data-highlighted-hash") === hash) {
    // Already highlighted for this hash, skip
    return;
  }
  if (main) main.setAttribute("data-highlighted-hash", hash);

  console.log(`[Highlight] attemptHighlight called (retry ${retries})`);
  removeAllHighlights();
  const match = hash.match(/^#([^#]+)-search-(.+)$/);
  removeAllHighlights();

  if (!match) {
    console.log("[Highlight] No matching hash found:", hash);
    return;
  }

  const sectionId = match[1];
  const searchTerm = decodeURIComponent(match[2]);
  const section = document.getElementById(sectionId);

  if (section) {
    console.log(`[Highlight] Section "${sectionId}" found, highlighting now.`);
    // Only scroll if this is the first highlight for this hash
    const shouldScroll = true;
    highlightInSection(section, searchTerm, shouldScroll);
  } else if (retries < 20) {
    setTimeout(() => attemptHighlight(retries + 1), 150);
  } else {
    console.warn(
      `[Highlight] Section "${sectionId}" not found after 20 attempts.`
    );
  }
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
      attemptHighlight();
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
    removeAllHighlights(); // <-- Always clear highlights on mount

    let didInitialRender = false;
    let observerData: ObserverData = null;
    let pollTimeout: Timeout | null = null;

    // Wait for <main> to exist before attaching observer
    function waitForMainAndAttach() {
      const main = document.querySelector("main");
      if (main) {
        observerData = attachObserver();
        // Only set didInitialRender after <main> is present
        didInitialRender = true;
      } else {
        pollTimeout = setTimeout(waitForMainAndAttach, 50);
      }
    }
    waitForMainAndAttach();

    // Only highlight on navigation/hashchange, not on initial mount
    const safeAttemptHighlight = () => {
      if (!didInitialRender) return;
      attemptHighlight();
    };

    const onHashChange = () => {
      console.log("[Highlight] Hash changed:", window.location.hash);
      attemptHighlight();
      if (observerData && observerData.observer)
        observerData.observer.disconnect();
      observerData = attachObserver();
    };

    const onPopState = () => {
      console.log("[Highlight] popstate/navigation event");
      removeAllHighlights();
      if (observerData && observerData.observer)
        observerData.observer.disconnect();
      observerData = attachObserver();
    };

    const onPageHide = () => {
      removeAllHighlights();
    };

    window.addEventListener("hashchange", safeAttemptHighlight);
    window.addEventListener("beforeunload", onPageHide);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("beforeunload", onPageHide);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("popstate", onPopState);
      if (observerData && observerData.observer)
        observerData.observer.disconnect();
      if (observerData && observerData.mutationTimeout)
        clearTimeout(observerData.mutationTimeout);
      if (pollTimeout) clearTimeout(pollTimeout);
      removeAllHighlights();
      removeHashFromUrl();
    };
  }, []);

  return null;
}
