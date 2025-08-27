"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Use the stricter type for filtered items
type MenuItem = {
  slug: { current: string };
  seitentitelMenue: string;
  menuReihenfolge: number;
};

interface NavigationLinksProps {
  menuItems: MenuItem[];
}

export default function NavigationLinks({ menuItems }: NavigationLinksProps) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (pathname !== "/impressum") return;

    // Handle hash on load
    if (window.location.hash === "#datenschutz") {
      setActiveSection("datenschutz");
    } else {
      setActiveSection("impressum"); // Default to impressum
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let hasIntersecting = false;
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Require 50% visibility
            setActiveSection((entry.target as HTMLElement).id);
            hasIntersecting = true;
          }
        });

        // If neither meets the threshold, decide by scroll position / bottom-of-page
        if (!hasIntersecting) {
          const datenschutzElement = document.getElementById("datenschutz");
          const headerOffset = 64; // same as rootMargin used above
          const buffer = 50; // tolerate small overlap

          if (datenschutzElement) {
            const scrollY = window.scrollY;
            const datenschutzTop =
              datenschutzElement.getBoundingClientRect().top +
              scrollY -
              headerOffset;
            const atBottom =
              window.innerHeight + window.scrollY >=
              document.body.scrollHeight - 10;

            if (scrollY >= datenschutzTop - buffer || atBottom) {
              setActiveSection("datenschutz");
            } else {
              setActiveSection("impressum");
            }
          } else {
            setActiveSection("impressum");
          }
        }
      },
      {
        threshold: [0.1, 0.5, 1],
        rootMargin: "-64px 0px 0px 0px",
      }
    );

    const impressumElement = document.getElementById("impressum");
    const datenschutzElement = document.getElementById("datenschutz");

    if (impressumElement) observer.observe(impressumElement);
    if (datenschutzElement) observer.observe(datenschutzElement);

    return () => {
      if (impressumElement) observer.unobserve(impressumElement);
      if (datenschutzElement) observer.unobserve(datenschutzElement);
    };
  }, [pathname]);

  return (
    <ul className="grid grid-cols-4 gap-4 w-full">
      {menuItems.map((item) => {
        let href =
          item.slug.current === "" || item.slug.current === "/"
            ? "/"
            : `/${item.slug.current}`;

        // Point "Datenschutz" to the Impressum section
        if (item.slug.current === "datenschutz") {
          href = "/impressum#datenschutz";
        }

        let isActive = false;
        if (pathname === "/impressum") {
          if (item.slug.current === "impressum") {
            isActive = activeSection === "impressum";
          } else if (item.slug.current === "datenschutz") {
            isActive = activeSection === "datenschutz";
          }
        } else {
          isActive =
            (href === "/" && pathname === "/") || // Home page special case
            (href !== "/" &&
              (pathname === href || pathname.startsWith(`${href}/`)));
        }

        return (
          <li key={item.slug.current}>
            <Link href={href} className={isActive ? "active-link" : ""}>
              {item.seitentitelMenue}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
