import LogoDeKoMoSvg from "@/public/logos/logo-dekomo.svg";
import Link from "next/link";

export default function LogoDeKoMo() {
  return (
    <Link href="/" className="px-0 py-0 flex items-center justify-center">
      <LogoDeKoMoSvg className="h-32 w-auto" />
    </Link>
  );
}
