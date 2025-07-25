import { type SchemaTypeDefinition } from "sanity";
import homeSeite from "./home/homeSeite";
import vision from "./home/vision";
import projektbeschreibung from "./home/projektbeschreibung";
import teilprojekte from "./home/teilprojekte";
import zugangswege from "./home/zugangswege";
import news from "./home/news";
import auswirkungen from "./home/auswirkungen";
import netzwerk from "./home/netzwerk";
import downloadsSeite from "./downloadsSeite";
import kontaktSeite from "./kontakt/kontaktSeite";
import ansprechpersonen from "./kontakt/ansprechpersonen";
import impressumSeite from "./impressum/impressumSeite";
import datenschutz from "./impressum/datenschutz";
import projektfoerderung from "./footer/projektfoerderung";
import projektpartner from "./footer/projektpartner";
import erweitertesNetzwerk from "./footer/erweitertesNetzwerk";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homeSeite,
    projektbeschreibung,
    teilprojekte,
    zugangswege,
    news,
    auswirkungen,
    netzwerk,
    vision,
    downloadsSeite,
    kontaktSeite,
    ansprechpersonen,
    impressumSeite,
    datenschutz,
    projektfoerderung,
    projektpartner,
    erweitertesNetzwerk,
  ],
};
