import Einleitung from "./components/home/Einleitung";
import Vision from "./components/home/Vision";
import Projektbeschreibung from "./components/home/Projektbeschreibung";
import Teilprojekte from "./components/home/Teilprojekte";
import Zugangswege from "./components/home/Zugangswege";
import Auswirkungen from "./components/home/Auswirkungen";
import Netzwerk from "./components/home/Netzwerk";

export default function Home() {
  return (
    <div className="page-section">
      <Einleitung />
      <section className="bg-[#5a7cbe] text-gray-100">
        <Vision />
      </section>
      <section>
        <Projektbeschreibung />
      </section>
      <section className="bg-[#f7f1a9]">
        <Teilprojekte />
      </section>
      <section className="bg-[#5a7cbe] text-gray-100">
        <Zugangswege />
      </section>
      <section>
        <Auswirkungen />
      </section>
      <section className="bg-[#f7f1a9]">
        <Netzwerk />
      </section>
    </div>
  );
}
