"use client";

import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import SearchBar from "./search-bar/SearchBar";
import NavigationLinks from "./NavigationLinks";

type MenuItem = {
  slug: { current: string };
  seitentitelMenue: string;
  menuReihenfolge: number;
};

interface MobileMenuProps {
  menuItems: MenuItem[];
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  isShrunk: boolean;
}

export default function MobileMenu({
  menuItems,
  mobileOpen,
  setMobileOpen,
  isShrunk,
}: MobileMenuProps) {
  return (
    <>
      {/* Mobile Menu bar at the bottom */}
      <div className="md:hidden">
        <div className="fixed p-4 inset-x-0 bottom-0 z-[9999] bg-gray-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.06)]">
          <div className="flex gap-4">
            <SearchBar isShrunk={isShrunk} />
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-full"
              onClick={() => setMobileOpen(!mobileOpen)}
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
          className={`fixed inset-x-0 z-50 bg-gray-300 flex flex-col ${isShrunk ? "top-20" : "top-32"} bottom-0`}
        >
          <div className="flex flex-col gap-4 px-4 h-full justify-center bg-[#f7f1a9] pb-18">
            <NavigationLinks
              menuItems={menuItems}
              onLinkClick={() => setMobileOpen(false)}
              isMobile={true}
            />
          </div>
        </div>
      )}
    </>
  );
}
