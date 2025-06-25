import LogoDeKoMo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <div>
      <div className="fixed top-0 left-0  w-full z-50 backgroundcolor">
        <div className="flex justify-between">
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
