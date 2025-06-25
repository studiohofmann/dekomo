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
      className="space-y-6 max-w-md mx-auto"
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
          { label: "Peter", email: "peter@example.com" },
          { label: "Lisa", email: "lisa@example.com" },
        ].map((person) => (
          <label
            key={person.email}
            className={`cursor-pointer rounded-xl border p-4 text-center font-medium transition-all ${
              recipientEmail === person.email
                ? "border-black bg-zinc-100 shadow-md"
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
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="border p-2 w-full rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        className="border p-2 w-full rounded"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        required
        className="border p-2 w-full rounded h-32"
      />

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
