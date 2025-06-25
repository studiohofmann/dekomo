"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <ul className="grid grid-cols-3 md:flex md:gap-4">
      {menuItems.map((item) => {
        const href = `/${item.slug.current}`;
        const isActive =
          pathname === href ||
          (pathname.startsWith(`${href}/`) && href !== "/");

        return (
          <li key={item.slug.current}>
            <Link
              className={`transition-colors flex justify-center items-center py-4 md:py-0 
                         ${
                           isActive
                             ? "text-blue-600 font-semibold"
                             : "text-gray-700 hover:text-blue-600"
                         }`}
              href={href}
            >
              {item.seitentitelMenue}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
