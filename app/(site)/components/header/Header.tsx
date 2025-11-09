"use client";

import { useEffect, useState } from "react";
import LogoDeKoMo from "./LogoDeKoMo";
import SearchBar from "./search-bar/SearchBar";
import NavigationLinks from "./NavigationLinks";
import MobileMenu from "./MobileMenu"; // Add this

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

  // Mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  return (
    <>
      <div className={`header ${isShrunk ? "h-20" : "h-32"}`}>
        <LogoDeKoMo
          className={`transition-all duration-300 ${isShrunk ? "h-12" : "h-24"}`}
        />
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4 relative">
          <div className="flex-none">
            <NavigationLinks menuItems={menuItems} />
          </div>
          <div className="hidden md:block relative">
            <SearchBar isShrunk={isShrunk} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        menuItems={menuItems}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        isShrunk={isShrunk}
      />
    </>
  );
}
