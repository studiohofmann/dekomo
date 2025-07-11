import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipientEmail, gender, name, vorname, email, message } = body;

    console.log("Attempting to send email to:", recipientEmail);

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

    // Create SendGrid transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: {
        user: "apikey", // This is always "apikey" for SendGrid
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"DeKoMo Kontakt" <noreply@dekomo.ch>`, // Clean name, noreply address
      to: recipientEmail,
      replyTo: email, // User can reply directly to the person who sent the form
      subject: `Kontaktanfrage DeKoMo: ${name} ${vorname}`,
      text: `
Neue Kontaktanfrage über DeKoMo Website

Anrede: ${gender}
Name: ${name}
Vorname: ${vorname}
E-Mail: ${email}

Nachricht:
${message}

---
Diese Nachricht wurde über das Kontaktformular der DeKoMo Website gesendet.
Antworten Sie direkt auf diese E-Mail, um mit ${name} ${vorname} in Kontakt zu treten.
      `,
      html: `
        <h2>Neue Kontaktanfrage über DeKoMo Website</h2>
        <p><strong>Anrede:</strong> ${gender}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Vorname:</strong> ${vorname}</p>
        <p><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
        
        <h3>Nachricht:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
          ${message.replace(/\n/g, "<br>")}
        </div>
        
        <hr style="margin: 20px 0;">
        <p style="font-size: 12px; color: #666;">
          Diese Nachricht wurde über das Kontaktformular der DeKoMo Website gesendet.<br>
          Antworten Sie direkt auf diese E-Mail, um mit ${name} ${vorname} in Kontakt zu treten.
        </p>
      `,
    });

    console.log("Email sent successfully:", info.messageId);

    return NextResponse.json(
      {
        message: "E-Mail erfolgreich gesendet",
        messageId: info.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Fehler beim Senden der E-Mail" },
      { status: 500 }
    );
  }
}
