import Einleitung from "./components/home/Einleitung";
import Vision from "./components/home/Vision";
import Projektbeschreibung from "./components/home/Projektbeschreibung";
import Teilprojekte from "./components/home/Teilprojekte";
import Zugangswege from "./components/home/Zugangswege";
import Auswirkungen from "./components/home/Auswirkungen";
import Netzwerkkarte from "./components/home/Netzwerkkarte";

export default function Home() {
  return (
    <div className="page-section">
      <Einleitung />
      <Vision />
      <Projektbeschreibung />
      <Teilprojekte />
      <Zugangswege />
      <Auswirkungen />
      <Netzwerkkarte />
    </div>
  );
}
