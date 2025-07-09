"use client";

import {
  HomeFilled,
  MailFilled,
  InfoCircleFilled,
  DatabaseFilled,
} from "@ant-design/icons";
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
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

  // Function to get the correct icon based on slug
  const getIcon = (slug: string) => {
    switch (slug) {
      case "":
      case "/":
        return <HomeFilled />;
      case "kontakt":
        return <MailFilled />;
      case "impressum":
        return <InfoCircleFilled />;
      case "datenschutz":
        return <DatabaseFilled />;
      default:
        return null; // No icon for other pages
    }
  };

  return (
    <ul className="grid grid-cols-4 md:flex md:gap-4 lg:gap-8 w-full">
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
            <Link
              className={`transition-colors
                         ${
                           isActive
                             ? "text-gray-700 "
                             : "text-[#5a7cbe] hover:text-gray-700"
                         }`}
              href={href}
            >
              <div className="flex flex-col items-center justify-center gap-1 md:gap-2 md:flex-row md:items-center">
                {getIcon(item.slug.current)}
                <h3 className="md:mt-1">{item.seitentitelMenue}</h3>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
