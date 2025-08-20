"use client";

import { useEffect, useState } from "react";
import LogoDeKoMo from "./LogoDeKoMo";
import SearchBar from "./search-bar/SearchBar";
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
        className={`fixed top-0 left-0 w-full z-[9999] bg-gray-300 shadow-md transition-all duration-300 flex gap-4 items-center justify-center md:justify-between px-4 md:px-8 xl:px-16 2xl:px-32 ${
          isShrunk ? "h-20" : "h-32"
        }`}
      >
        <LogoDeKoMo
          className={`transition-all duration-300 ${isShrunk ? "h-12" : "h-24"}`}
        />
        <div className="hidden md:flex items-center gap-4">
          <div className="hidden lg:block">
            <SearchBar />
          </div>
          <NavigationLinks menuItems={menuItems} />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed px-4 left-0 bottom-0 w-full z-[9999] md:hidden bg-gray-300 h-18 flex items-center justify-center">
        <NavigationLinks menuItems={menuItems} />
      </div>
    </>
  );
}
