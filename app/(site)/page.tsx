import Vision from "./components/home/Vision";
import Projektbeschreibung from "./components/home/Projektbeschreibung";
import Teilprojekte from "./components/home/Teilprojekte";
import Zugangswege from "./components/home/Zugangswege";
import Auswirkungen from "./components/home/Auswirkungen";
import Netzwerk from "./components/home/Netzwerk";

export default function Home() {
  return (
    <div className="page-section">
      {/* Testing private repo deployment */}
      {/*<Einleitung />*/}
      <section className="bg-[#5a7cbe] text-gray-100">
        <Projektbeschreibung />
      </section>
      <section>
        <Teilprojekte />
      </section>
      <div className="lg:flex">
        <section className="bg-[#f7f1a9] lg:flex-1 lg:pr-16">
          <Zugangswege />
        </section>
        <section className="bg-[#5a7cbe] text-gray-100 lg:flex-1 lg:pl-16">
          <Auswirkungen />
        </section>
      </div>
      <section>
        <Netzwerk />
      </section>
      <section className="bg-[#f7f1a9]">
        <Vision />
      </section>
    </div>
  );
}
