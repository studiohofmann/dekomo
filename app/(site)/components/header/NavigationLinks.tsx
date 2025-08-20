"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // <-- import your Button

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            setActiveSection((entry.target as HTMLElement).id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-128px 0px 0px 0px", // Offset for fixed header (8rem = 128px)
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
            <Button
              asChild
              variant={isActive ? "selected" : "custom"}
              size="custom"
            >
              <Link href={href}>
                <h3>{item.seitentitelMenue}</h3>
              </Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
