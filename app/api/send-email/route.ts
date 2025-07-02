import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipientEmail, gender, name, vorname, email, message } = body;

    // Validate required fields
    if (!recipientEmail || !gender || !name || !vorname || !email || !message) {
      return NextResponse.json(
        { error: "Alle Felder sind erforderlich" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse" },
        { status: 400 }
      );
    }

    // Validate recipient email (security check)
    const allowedRecipients = [
      "stefan.kloeppel@upd.ch",
      "giuliana.crippa@unibe.ch",
    ];

    if (!allowedRecipients.includes(recipientEmail)) {
      return NextResponse.json(
        { error: "Ungültiger Empfänger" },
        { status: 400 }
      );
    }

    // Create transporter using Brevo SMTP (free tier: 300 emails/day)
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.BREVO_SMTP_USER, // Your Brevo SMTP login
        pass: process.env.BREVO_SMTP_PASS, // Your Brevo SMTP key
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"DeKoMo Kontakt" <${process.env.BREVO_SMTP_USER}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name} ${vorname}`,
      html: `
        <h2>Neue Kontaktanfrage über DeKoMo Website</h2>
        <p><strong>Anrede:</strong> ${gender}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Vorname:</strong> ${vorname}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Nachricht:</strong></p>
        <p style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">${message}</p>
        <hr>
        <p><small>Diese Nachricht wurde über das Kontaktformular der DeKoMo Website gesendet.</small></p>
      `,
    });

    return NextResponse.json(
      { message: "E-Mail erfolgreich gesendet" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Fehler beim Senden der E-Mail" },
      { status: 500 }
    );
  }
}
