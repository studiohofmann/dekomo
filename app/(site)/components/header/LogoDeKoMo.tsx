import LogoDeKoMoSvg from "@/public/logos/logo-dekomo.svg";
import Link from "next/link";

type LogoDeKoMoProps = {
  className?: string;
};

export default function LogoDeKoMo({
  className = "h-full w-auto",
}: LogoDeKoMoProps) {
  return (
    <Link href="/" className="px-0 py-0 flex items-center justify-center">
      <LogoDeKoMoSvg className={className} />
    </Link>
  );
}
