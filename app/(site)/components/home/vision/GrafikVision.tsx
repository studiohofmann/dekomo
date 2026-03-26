import GrafikVisionSvg from "@/public/grafiken/grafik-vision.svg";

type GrafikVisionProps = {
  className?: string;
};

export default function GrafikVision({ className = "" }: GrafikVisionProps) {
  return <GrafikVisionSvg className={className} />;
}
