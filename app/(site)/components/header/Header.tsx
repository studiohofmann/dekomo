import LogoDeKoMo from "./LogoDeKoMo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gray-300 shadow-md">
      <div className="top-0 left-0  w-full z-50">
        <div className="flex justify-center md:justify-between h-32 p-4">
          <LogoDeKoMo />
          <div className="flex items-center">
            <div className="hidden md:block">
              <Navigation />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed left-0 bottom-0 w-full z-50 md:hidden bg-gray-300 h-18 flex items-center justify-center">
        <Navigation />
      </div>
    </div>
  );
}
