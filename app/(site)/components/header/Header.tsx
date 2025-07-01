"use client";

import { useEffect, useState } from "react";
import LogoDeKoMo from "./LogoDeKoMo";
import NavigationLinks from "./NavigationLinks";

type MenuItem = {
  slug: { current: string };
  seitentitelMenue: string;
  menuReihenfolge: number;
};

interface HeaderProps {
  menuItems: MenuItem[];
}

export default function Header({ menuItems }: HeaderProps) {
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 bg-gray-300 shadow-md transition-all duration-300 flex items-center justify-center md:justify-between px-4 md:px-8 lg:px-16 xl:px-32 ${
          isShrunk ? "h-12" : "h-32"
        }`}
      >
        <LogoDeKoMo
          className={`transition-all duration-300 ${isShrunk ? "h-8" : "h-24"}`}
        />

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationLinks menuItems={menuItems} />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed left-0 bottom-0 w-full z-50 md:hidden bg-gray-300 h-18 flex items-center justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <NavigationLinks menuItems={menuItems} />
      </div>
    </>
  );
}
