import LogoDeKoMoSvg from "@/public/logos/logo-dekomo.svg";
import Link from "next/link";

type LogoDeKoMoProps = {
  className?: string;
};

export default function LogoDeKoMo({ className = "" }: LogoDeKoMoProps) {
  return (
    <Link href="/" className={`logo-link`}>
      <LogoDeKoMoSvg className={className} />
    </Link>
  );
}
