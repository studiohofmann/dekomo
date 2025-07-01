import Vision from "./components/home/Vision";
import Projektbeschreibung from "./components/home/Projektbeschreibung";
import Teilprojekte from "./components/home/Teilprojekte";
import Zugangswege from "./components/home/Zugangswege";
import Auswirkungen from "./components/home/Auswirkungen";
import Netzwerk from "./components/home/Netzwerk";

export default function Home() {
  return (
    <div className="page-section">
      {/*<Einleitung />*/}
      <section className="bg-[#5a7cbe] text-gray-100">
        <Projektbeschreibung />
      </section>
      <section>
        <Teilprojekte />
      </section>
      <section className="bg-[#f7f1a9]">
        <Zugangswege />
      </section>
      <section>
        <Auswirkungen />
      </section>
      <section className="bg-[#5a7cbe] text-gray-100">
        <Netzwerk />
      </section>
      <section className="bg-[#f7f1a9]">
        <Vision />
      </section>
    </div>
  );
}
