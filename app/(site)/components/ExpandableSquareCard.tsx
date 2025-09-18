"use client";
import {
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import { RightOutlined, CloseOutlined } from "@ant-design/icons";

export default function ExpandableSquareCard({
  children,
  className = "",
  buttonLabelExpand = "Mehr erfahren",
  buttonLabelCollapse = "Weniger anzeigen",
  buttonHeightPx = 48,
  gapPx = 16,
  transitionDurationMs = 300, // <- new prop, default 300ms (duration-300)
}: {
  children: React.ReactNode;
  className?: string;
  buttonLabelExpand?: string;
  buttonLabelCollapse?: string;
  buttonHeightPx?: number;
  gapPx?: number;
  transitionDurationMs?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [measuredButtonHeight, setMeasuredButtonHeight] =
    useState<number>(buttonHeightPx);
  const [squareSize, setSquareSize] = useState<number | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  // overlay mount/visibility state so we can fade in/out
  const [overlayMounted, setOverlayMounted] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  // keep a flag to prevent double transition handlers
  const transitioningRef = useRef(false);

  // helper: get collapsed height in px (stable reference)
  const getCollapsedHeight = useCallback(() => {
    return squareSize ?? wrapperRef.current?.offsetWidth ?? 0;
  }, [squareSize]);

  // animate height between current and target px
  const animateHeight = useCallback(
    (targetPx: number, onDone?: () => void) => {
      const el = contentRef.current;
      if (!el) {
        onDone?.();
        return;
      }
      if (transitioningRef.current) {
        el.style.transition = "";
      }

      el.style.overflow = "hidden";
      el.style.willChange = "height";

      const currentPx = el.getBoundingClientRect().height;
      el.style.height = `${currentPx}px`;
      // force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.offsetHeight;

      el.style.transition = `height ${transitionDurationMs}ms cubic-bezier(.2,.8,.2,1)`;
      transitioningRef.current = true;

      const handle = () => {
        el.style.transition = "";
        transitioningRef.current = false;
        if (targetPx > currentPx) {
          el.style.height = "auto";
          el.style.overflow = "visible";
        } else {
          el.style.height = `${targetPx}px`;
          el.style.overflow = "hidden";
        }
        el.style.willChange = "";
        el.removeEventListener("transitionend", handle);
        onDone?.();
      };

      el.addEventListener("transitionend", handle);
      // start animation next frame
      requestAnimationFrame(() => {
        el.style.height = `${targetPx}px`;
      });
    },
    [contentRef, transitionDurationMs]
  );

  // Calculate square size
  useLayoutEffect(() => {
    function updateSize() {
      if (wrapperRef.current) {
        const width = wrapperRef.current.offsetWidth;
        // use measuredButtonHeight so button styling stays untouched
        const bh = measuredButtonHeight ?? buttonHeightPx;
        if (isOverflowing || expanded) {
          setSquareSize(width - bh - gapPx);
        } else {
          setSquareSize(width);
        }
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [buttonHeightPx, gapPx, expanded, isOverflowing, measuredButtonHeight]);

  // ensure the container starts with explicit collapsed height to allow collapse animation
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (!expanded) {
      const collapsed = getCollapsedHeight();
      el.style.height = `${collapsed}px`;
      el.style.overflow = "hidden";
    } else {
      el.style.height = "auto";
      el.style.overflow = "visible";
    }
  }, [getCollapsedHeight, expanded]);

  // measure real button height after render (captures font-size/padding changes)
  useLayoutEffect(() => {
    function measure() {
      const h = buttonRef.current?.offsetHeight;
      if (h && h !== measuredButtonHeight) setMeasuredButtonHeight(h);
    }
    // measure on mount and next frame
    measure();
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [measuredButtonHeight]);

  // Check for overflow
  useLayoutEffect(() => {
    function checkOverflow() {
      if (contentRef.current && !expanded) {
        const overflowing =
          contentRef.current.scrollHeight > contentRef.current.clientHeight + 1;
        setIsOverflowing(overflowing);
        if (overflowing) {
          if (!overlayMounted) setOverlayMounted(true);
          // ensure visibility is set on next frame so transition runs
          requestAnimationFrame(() => setOverlayVisible(true));
        } else {
          setOverlayVisible(false);
          // unmount after the transition finishes
          setTimeout(() => setOverlayMounted(false), transitionDurationMs);
        }
      } else if (expanded) {
        setIsOverflowing(false);
        setOverlayVisible(false);
        setTimeout(() => setOverlayMounted(false), transitionDurationMs);
      }
    }
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [squareSize, expanded, children, overlayMounted, transitionDurationMs]);

  // smooth toggle handler
  const toggle = useCallback(() => {
    const el = contentRef.current;
    if (!el) {
      setExpanded((s) => !s);
      return;
    }
    const collapsed = getCollapsedHeight();
    if (!expanded) {
      setOverlayVisible(false);
      setTimeout(() => setOverlayMounted(false), transitionDurationMs);
      const full = el.scrollHeight;
      animateHeight(full, () => {
        setExpanded(true);
      });
    } else {
      const current = el.getBoundingClientRect().height;
      el.style.height = `${current}px`;
      animateHeight(collapsed, () => {
        setExpanded(false);
        const el2 = contentRef.current;
        if (el2) {
          const overflowing = el2.scrollHeight > el2.clientHeight + 1;
          setIsOverflowing(overflowing);
          if (overflowing) {
            if (!overlayMounted) setOverlayMounted(true);
            requestAnimationFrame(() => setOverlayVisible(true));
          } else {
            setOverlayVisible(false);
            setTimeout(() => setOverlayMounted(false), transitionDurationMs);
          }
        }
      });
    }
  }, [
    contentRef,
    expanded,
    getCollapsedHeight,
    animateHeight,
    transitionDurationMs,
    overlayMounted,
  ]);

  // add this effect somewhere inside the component body (after toggle / refs are defined)
  useEffect(() => {
    function onSearchOpen(e: Event) {
      const detail = (e as CustomEvent)?.detail;
      const sectionId: string | undefined = detail?.sectionId;
      if (!sectionId || !contentRef.current) return;

      // try to find the target inside this card
      const target =
        contentRef.current.querySelector(`#${CSS.escape(sectionId)}`) ||
        contentRef.current.querySelector(`[data-section-id="${sectionId}"]`);

      if (!target) return;

      // if collapsed, toggle open first
      if (!expanded) {
        // call your existing toggle function
        try {
          toggle();
        } catch {
          setExpanded(true);
        }
        // scroll after the expand animation completes
        setTimeout(() => {
          (target as HTMLElement).scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, transitionDurationMs + 50);
      } else {
        // already open -> just scroll
        (target as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }

    window.addEventListener("search:open", onSearchOpen as EventListener);
    return () =>
      window.removeEventListener("search:open", onSearchOpen as EventListener);
  }, [expanded, transitionDurationMs, toggle, contentRef]);

  return (
    <div ref={wrapperRef} className="w-full flex flex-col items-center">
      <div
        ref={contentRef}
        // make this a positioned container so the absolute overlay is contained
        className={`expandable-card ${className} relative z-0`}
        style={{
          // initial inline styles kept minimal; height/overflow handled in effects & animateHeight
          minHeight: 0,
        }}
      >
        {children}
        {/* overlay: mounted separately so opacity can transition */}
        {overlayMounted && (
          <div
            aria-hidden
            className={
              "pointer-events-none absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-300 to-transparent z-10 transition-opacity ease-in-out " +
              (overlayVisible ? "opacity-100" : "opacity-0")
            }
            style={{ transitionDuration: `${transitionDurationMs}ms` }}
          />
        )}
      </div>
      {(isOverflowing || expanded) && <div style={{ height: gapPx }} />}
      {isOverflowing || expanded ? (
        <button
          ref={buttonRef}
          onClick={toggle}
          // ensure button sits above the overlay
          className="relative z-20"
        >
          {expanded ? buttonLabelCollapse : buttonLabelExpand}
          {expanded ? <CloseOutlined /> : <RightOutlined />}
        </button>
      ) : null}
    </div>
  );
}
