import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="card">
        <h2>Hier fehlt etwas</h2>
        <p>
          Die von Ihnen gesuchte Seite wurde entfernt, verschoben oder existiert
          nicht.
        </p>
        <div className="text-xs text-center">Fehlercode: 404</div>
        <Link href="/">Zurück zur Startseite</Link>
      </div>
    </div>
  );
}
