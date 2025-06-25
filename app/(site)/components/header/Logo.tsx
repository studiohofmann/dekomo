import LogoDeKoMoSvg from "@/public/logos/logo-dekomo.svg";
import Link from "next/link";

export default function LogoDeKoMo() {
  return (
    <Link href="/" className="flex items-center justify-center">
      <LogoDeKoMoSvg className="h-24 w-auto" />
    </Link>
  );
}
