import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "E-Mail-Adresse ist erforderlich" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_LIST_ID);

    if (!apiKey || !listId) {
      console.error("Missing BREVO_API_KEY or BREVO_LIST_ID");
      return NextResponse.json(
        { error: "Server-Konfigurationsfehler" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    // 201 = created, 204 = already exists and updated
    if (response.status === 201 || response.status === 204) {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: { name: "DeKoMo", email: "info@dekomo.ch" },
          to: [{ email }],
          subject: "Willkommen beim DeKoMo-Newsletter",
          htmlContent: `
            <p>Guten Tag</p>
            <p>Vielen Dank für Ihre Anmeldung zum DeKoMo-Newsletter.</p>
            <p>Wir halten Sie über aktuelle Entwicklungen, Veranstaltungen und Ergebnisse des DeKoMo-Projekts auf dem Laufenden.</p>
            <p>Sie können sich jederzeit vom Newsletter abmelden.</p>
            <br>
            <p>Freundliche Grüsse<br>Das DeKoMo-Team</p>
          `,
        }),
      });

      return NextResponse.json(
        { message: "Erfolgreich angemeldet" },
        { status: 200 }
      );
    }

    const data = await response.json();

    // Brevo returns 400 with code "duplicate_parameter" when contact already exists
    // and updateEnabled is false — but with updateEnabled: true this shouldn't happen.
    // Handle it gracefully anyway.
    if (response.status === 400 && data?.code === "duplicate_parameter") {
      return NextResponse.json(
        { message: "Erfolgreich angemeldet" },
        { status: 200 }
      );
    }

    console.error("Brevo API error:", data);
    return NextResponse.json(
      { error: "Fehler bei der Anmeldung", detail: data?.message },
      { status: response.status }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Interner Serverfehler" },
      { status: 500 }
    );
  }
}
