import LogoDeKoMo from "./LogoDeKoMo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <div className="bg-[#e1e8f0] p-4">
      <div className="top-0 left-0  w-full z-50">
        <div className="flex justify-center">
          <LogoDeKoMo />
          <div className="flex items-center gap-8">
            <div className="hidden md:block">
              <Navigation />
            </div>
          </div>
        </div>
        <div className="line"></div>
      </div>
      <div className="fixed left-0 bottom-0 w-full z-50 md:hidden backgroundcolor">
        <div className="line"></div>
        <Navigation />
      </div>
    </div>
  );
}
