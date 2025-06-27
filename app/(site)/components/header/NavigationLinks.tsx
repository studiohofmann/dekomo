"use client";

import {
  HomeFilled,
  MailFilled,
  InfoCircleFilled,
  DatabaseFilled,
} from "@ant-design/icons";
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

  // Function to get the correct icon based on slug
  const getIcon = (slug: string) => {
    switch (slug) {
      case "":
      case "/":
        return <HomeFilled className="" />;
      case "kontakt":
        return <MailFilled className="" />;
      case "impressum":
        return <InfoCircleFilled className="" />;
      case "datenschutz":
        return <DatabaseFilled className="" />;
      default:
        return null; // No icon for other pages
    }
  };

  return (
    <ul className="grid grid-cols-4 md:flex md:gap-8 w-full">
      {menuItems.map((item) => {
        const href = `/${item.slug.current}`;
        const isActive =
          pathname === href ||
          (pathname.startsWith(`${href}/`) && href !== "/");

        return (
          <li key={item.slug.current}>
            <Link
              className={`transition-colors
                         ${
                           isActive
                             ? "text-blue-600 "
                             : "text-[#5a7cbe] hover:text-blue-600"
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
