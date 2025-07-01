import Projektfoerderung from "./Projektfoerderung";
import Projektartner from "./Projektpartner";
import ErweitertesNetzwerk from "./ErweitertesNetzwerk";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <div className="footer">
      <Projektfoerderung />
      <Projektartner />
      <ErweitertesNetzwerk />
      <Copyright />
    </div>
  );
}
