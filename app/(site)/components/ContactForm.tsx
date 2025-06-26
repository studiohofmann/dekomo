"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [recipientEmail, setRecipientEmail] = useState("peter@example.com");

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientEmail(e.target.value);
  };

  return (
    <form
      method="POST"
      action="https://api.web3forms.com/submit"
      className="flex flex-col gap-2"
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
          <label
            key={person.email}
            className={`cursor-pointer p-2 text-center bg-gray-300 transition-all ${
              recipientEmail === person.email
                ? "border-black bg-zinc-100 "
                : "border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            <input
              type="radio"
              name="recipient"
              value={person.email}
              checked={recipientEmail === person.email}
              onChange={handleRecipientChange}
              className="sr-only"
            />
            {person.label}
          </label>
        ))}
      </div>

      {/* ✍️ Contact Info */}
      <div className="flex flex-col gap-2">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required />
      </div>

      {/* ✅ Submit Button */}
      <Button
        variant="default"
        disabled={!recipientEmail}
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-zinc-800 transition"
      >
        Send Message
      </Button>
    </form>
  );
}
