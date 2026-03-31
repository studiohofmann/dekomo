"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const isValid = email.trim() && consent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorDetail(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: honeypot }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setConsent(false);
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorDetail(data?.detail || data?.error || "Unbekannter Fehler");
        setStatus("error");
      }
    } catch (error) {
      setErrorDetail(String(error));
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        {/* Honeypot — hidden from real users, bots fill it in */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          aria-hidden="true"
          style={{ display: "none" }}
        />
        <input
          type="email"
          placeholder="E-Mail-Adresse *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting || status === "success"}
        />

        <label className="flex items-start gap-3 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            disabled={isSubmitting || status === "success"}
            className="mt-0.5 shrink-0"
          />
          <span className="portable-text portable-text-footer-link">
            Ich stimme zu, dass meine E-Mail-Adresse gespeichert und zum
            Versand des Newsletters verwendet wird. Die Einwilligung kann
            jederzeit widerrufen werden.{" "}
            <a href="/impressum#datenschutz">Datenschutzhinweise</a>
          </span>
        </label>

        <button
          type="submit"
          disabled={!isValid || isSubmitting || status === "success"}
          className="bg-gray-300 hover:bg-[#5a7cbe] hover:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Wird angemeldet..." : "Anmelden"}
        </button>
      </div>

      {status === "success" && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p className="font-bold">Erfolgreich angemeldet!</p>
          <p>
            Vielen Dank für Ihre Anmeldung. Sie erhalten in Kürze eine
            Bestätigung.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Fehler bei der Anmeldung</p>
          <p>Bitte versuchen Sie es erneut.</p>
          {errorDetail && (
            <p className="mt-2 text-xs border-t border-red-300 pt-2 font-mono">
              Fehlerdetails: {errorDetail}
            </p>
          )}
        </div>
      )}
    </form>
  );
}
