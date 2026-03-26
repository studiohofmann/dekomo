import GrafikProjektbeschreibungSvg from "@/public/grafiken/grafik-projektbeschreibung.svg";

type GrafikProjektbeschreibungProps = {
  className?: string;
};

export default function GrafikProjektbeschreibung({
  className = "",
}: GrafikProjektbeschreibungProps) {
  return <GrafikProjektbeschreibungSvg className={className} />;
}
