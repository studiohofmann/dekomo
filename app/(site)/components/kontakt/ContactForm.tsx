"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DownOutlined } from "@ant-design/icons";

export default function ContactForm() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
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

  // Check if all fields are filled
  const isFormValid =
    recipientEmail &&
    formData.gender &&
    formData.name.trim() &&
    formData.email.trim() &&
    formData.message.trim();

  return (
    <form
      method="POST"
      action="https://api.web3forms.com/submit"
      className="flex flex-col gap-4"
    >
      {/* Web3Forms hidden fields */}
      <input type="hidden" name="access_key" value="YOUR_API_KEY_HERE" />
      <input type="hidden" name="from_name" value="Website Contact" />
      <input type="hidden" name="subject" value="New Contact Message" />
      <input
        type="hidden"
        name="redirect"
        value="https://yourwebsite.com/thanks"
      />
      <input type="hidden" name="to" value={recipientEmail} />

      {/* 📧 Recipient Cards */}
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            label: "Prof. Dr. med. Stefan Klöppel",
            email: "peter@example.com",
          },
          { label: "M.Sc. Giuliana Crippa", email: "lisa@example.com" },
        ].map((person) => (
          <div
            key={person.email}
            onClick={() => handleRecipientClick(person.email)}
            className={`cursor-pointer p-2 text-center transition-all ${
              recipientEmail === person.email
                ? "  bg-[#5a7cbe] text-sm font-bold text-gray-100 "
                : " bg-[#94b0dd] text-gray-100 text-sm font-bold hover:bg-[#5a7cbe]"
            }`}
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
          </div>
        ))}
      </div>

      {/* ✍️ Contact Info */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            className="bg-gray-100 px-4 py-2 pr-10 appearance-none w-full"
          >
            <option value="" disabled>
              Anrede
            </option>
            <option value="Herr">Herr</option>
            <option value="Frau">Frau</option>
            <option value="Neutral">Neutral</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <DownOutlined />
          </span>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* ✅ Submit Button */}
      <Button
        variant="default"
        disabled={!isFormValid}
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send Message
      </Button>

      {/* Optional: Show validation message */}
      {!isFormValid && (
        <h3 className="text-center font-normal">
          Bitte füllen Sie alle Felder aus und wählen Sie einen Empfänger
        </h3>
      )}
    </form>
  );
}
