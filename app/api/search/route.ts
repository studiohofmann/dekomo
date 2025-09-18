import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("q");

  if (!searchQuery || searchQuery.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const results = await client.fetch(
      `*[_type in [
        "homeSeite", "einleitung", "vision", "projektbeschreibung", 
        "teilprojekte", "zugangswege", "news", "auswirkungen", 
        "fallbeispiele", "netzwerk", "downloadsSeite", "kontaktSeite", 
        "ansprechpersonen", "impressumSeite", "datenschutz", 
        "projektfoerderung", "projektpartner", "erweitertesNetzwerk"
      ]] | score(
        boost(ueberschrift match $searchQuery + "*", 3),
        boost(text match $searchQuery + "*", 2),
        boost(teilprojekt[].ueberschrift match $searchQuery + "*", 2),
        boost(teilprojekt[].text match $searchQuery + "*", 1),
        boost(fallbeispiel[].ueberschrift match $searchQuery + "*", 2),
        boost(fallbeispiel[].text match $searchQuery + "*", 1),
        boost(ansprechperson[].text match $searchQuery + "*", 1),
        boost(angabenUeberschrift match $searchQuery + "*", 2),
        boost(angabenText match $searchQuery + "*", 1),
        boost(impressumText match $searchQuery + "*", 1),
        boost(seitentitelMenue match $searchQuery + "*", 2),
        boost(seoTitle match $searchQuery + "*", 1),
        boost(metaDescription match $searchQuery + "*", 1)
      ) | order(_score desc)[0...20] {
        _id,
        _type,
        slug,
        ueberschrift,
        text,
        seitentitelMenue,
        seoTitle,
        metaDescription,
        "sectionId": _type  // Use _type as sectionId
      }`,
      { searchQuery: searchQuery }
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
