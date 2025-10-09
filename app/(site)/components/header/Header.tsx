"use client";

import { useEffect, useState } from "react";
import LogoDeKoMo from "./LogoDeKoMo";
import SearchBar from "./search-bar/SearchBar";
import NavigationLinks from "./NavigationLinks";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

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
        {/* position this row so absolute dropdowns inside can use right:0 */}
        <div className="hidden md:flex items-center gap-4 relative">
          <div className="flex-none">
            <NavigationLinks menuItems={menuItems} />
          </div>
          <div className="hidden lg:block flex-1 min-w-0 relative">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Mobile Menu bar at the bottom */}
      <div className="md:hidden">
        <div className="fixed p-4 inset-x-0 bottom-0 z-[9999] bg-gray-300 border-t border-gray-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.06)]">
          <div>
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-full"
              onClick={() => setMobileOpen((s) => !s)}
            >
              {mobileOpen ? (
                <>
                  <CloseOutlined />
                  <span>Close</span>
                </>
              ) : (
                <>
                  <MenuOutlined />
                  <span>Menu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation-full"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-gray-300 flex items-end pb-21"
        >
          <nav className="w-full px-4">
            <NavigationLinks
              menuItems={menuItems}
              onLinkClick={() => setMobileOpen(false)} // close menu when any link is clicked
            />
          </nav>
        </div>
      )}
    </>
  );
}
