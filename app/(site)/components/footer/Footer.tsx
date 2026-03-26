import Newsletter from "../home/Newsletter"
import Projektfoerderung from "./Projektfoerderung";
import Projektartner from "./Projektpartner";
import ErweitertesNetzwerk from "./ErweitertesNetzwerk";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <footer className="footer">
      <Newsletter/>
      <Projektfoerderung />
      <Projektartner />
      <ErweitertesNetzwerk />
      <Copyright />
    </footer>
  );
}
