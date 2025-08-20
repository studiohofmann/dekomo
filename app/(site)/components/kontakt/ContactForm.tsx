"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";

export default function ContactForm() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    vorname: "",
    email: "",
    message: "",
    gender: "",
  });

  const handleRecipientClick = (email: string) => {
    // If the clicked email is already selected, deselect it
    if (recipientEmail === email) {
      setRecipientEmail("");
    } else {
      setRecipientEmail(email);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientEmail,
          ...formData,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          name: "",
          vorname: "",
          email: "",
          message: "",
          gender: "",
        });
        setRecipientEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if all fields are filled
  const isFormValid =
    recipientEmail &&
    formData.gender &&
    formData.name.trim() &&
    formData.vorname.trim() &&
    formData.email.trim() &&
    formData.message.trim();

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Kontaktformular</h2>
      <div className="flex flex-col gap-4">
        {/* 📧 Recipient Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {[
            {
              label: "Prof. Dr. med. Stefan Klöppel",
              email: "stefan.kloeppel@upd.ch",
            },
            {
              label: "M.Sc. Giuliana Crippa",
              email: "giuliana.crippa@unibe.ch",
            },
          ].map((person) => (
            <Button
              key={person.email}
              variant="custom"
              size="custom"
              onClick={() => handleRecipientClick(person.email)}
              className={`text-center ${
                recipientEmail === person.email
                  ? "bg-[#5a7cbe] text-gray-100"
                  : ""
              }`}
              type="button"
            >
              {/* Hidden input for form submission */}
              <input
                type="radio"
                name="recipient"
                value={person.email}
                checked={recipientEmail === person.email}
                onChange={() => {}} // Empty onChange to avoid React warning
                className="sr-only"
              />
              {person.label}
            </Button>
          ))}
        </div>

        {/* ✍️ Contact Info */}
        <div className="flex flex-col gap-4">
          <div className="relative">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={`${formData.gender ? "text-gray-700" : "text-gray-500"}`}
              required
            >
              <option value="" disabled>
                Anrede *
              </option>
              <option value="Herr">Herr</option>
              <option value="Frau">Frau</option>
              <option value="Neutral">Neutral</option>
            </select>
            {formData.gender ? (
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, gender: "" }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
              >
                <CloseOutlined />
              </button>
            ) : (
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <DownOutlined />
              </span>
            )}
          </div>
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="vorname"
            placeholder="Vorname *"
            value={formData.vorname}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Adresse *"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="message"
            placeholder="Nachricht *"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
          />
        </div>

        {/* ✅ Submit Button */}
        <Button
          variant="custom"
          size="custom"
          disabled={!isFormValid || isSubmitting}
          type="submit"
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Wird gesendet..." : "Senden"}
        </Button>
      </div>
      {/* Optional: Show validation message */}
      {!isFormValid && submitStatus === "idle" && (
        <p className="text-sm text-gray-500 text-center">
          <span className="text-red-500">*</span> Bitte füllen Sie alle Felder
          aus und wählen Sie einen Empfänger
        </p>
      )}

      {/* Success/Error Messages */}
      {submitStatus === "success" && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <h3 className="font-bold">Nachricht erfolgreich gesendet!</h3>
          <p>
            Vielen Dank für Ihre Nachricht. Wir werden uns bald bei Ihnen
            melden.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h3 className="font-bold">Fehler beim Senden</h3>
          <p>Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.</p>
        </div>
      )}
    </form>
  );
}
