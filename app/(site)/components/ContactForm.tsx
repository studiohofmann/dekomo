"use client";

import { useState } from "react";

export default function ContactForm() {
  const [recipientEmail, setRecipientEmail] = useState("peter@example.com");

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientEmail(e.target.value);
  };

  return (
    <form
      method="POST"
      action="https://api.web3forms.com/submit"
      className="space-y-4 max-w-md mx-auto"
    >
      {/* Required Web3Forms fields */}
      <input
        type="hidden"
        name="access_key"
        value="bdb3eaa5-bf50-4463-a211-f21a5b466e55"
      />
      <input type="hidden" name="from_name" value="Website Contact" />
      <input type="hidden" name="subject" value="New Contact Message" />
      <input
        type="hidden"
        name="redirect"
        value="https://yourwebsite.com/thanks"
      />

      {/* Dynamic recipient */}
      <input type="hidden" name="to" value={recipientEmail} />

      {/* Radio buttons for choosing recipient */}
      <fieldset className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="recipient"
            value="peter@example.com"
            checked={recipientEmail === "peter@example.com"}
            onChange={handleRecipientChange}
          />
          Peter
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="recipient"
            value="lisa@example.com"
            checked={recipientEmail === "lisa@example.com"}
            onChange={handleRecipientChange}
          />
          Lisa
        </label>
      </fieldset>

      {/* User inputs */}
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="border p-2 w-full"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        className="border p-2 w-full"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        required
        className="border p-2 w-full"
      />

      <button type="submit" className="bg-black text-white px-4 py-2">
        Send Message
      </button>
    </form>
  );
}
