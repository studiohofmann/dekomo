"use client";
import { useState, useRef, useLayoutEffect } from "react";
import { RightOutlined, CloseOutlined } from "@ant-design/icons";

export default function ExpandableSquareCard({
  children,
  className = "",
  buttonLabelExpand = "Mehr erfahren",
  buttonLabelCollapse = "Weniger anzeigen",
  buttonHeightPx = 48,
  gapPx = 16,
}: {
  children: React.ReactNode;
  className?: string;
  buttonLabelExpand?: string;
  buttonLabelCollapse?: string;
  buttonHeightPx?: number;
  gapPx?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [measuredButtonHeight, setMeasuredButtonHeight] =
    useState<number>(buttonHeightPx);
  const [squareSize, setSquareSize] = useState<number | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

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
        setIsOverflowing(
          contentRef.current.scrollHeight > contentRef.current.clientHeight + 1
        );
      } else if (expanded) {
        setIsOverflowing(false);
      }
    }
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [squareSize, expanded, children]);

  return (
    <div ref={wrapperRef} className="w-full flex flex-col items-center">
      <div
        ref={contentRef}
        className={`expandable-card ${className} ${
          expanded ? "" : "overflow-hidden"
        }`}
        style={
          !expanded
            ? squareSize
              ? { height: `${squareSize}px`, minHeight: 0 }
              : { aspectRatio: "1/1", minHeight: 0 }
            : { minHeight: 0 }
        }
      >
        {children}
        {/* fading overlay — LAST child inside this relative container */}
        {!expanded && isOverflowing && (
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-300 to-transparent z-[9998]" />
        )}
      </div>
      {(isOverflowing || expanded) && <div style={{ height: gapPx }} />}
      {isOverflowing || expanded ? (
        <button ref={buttonRef} onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? buttonLabelCollapse : buttonLabelExpand}
          {expanded ? <CloseOutlined /> : <RightOutlined />}
        </button>
      ) : null}
    </div>
  );
}
