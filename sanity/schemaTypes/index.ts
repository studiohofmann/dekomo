import { type SchemaTypeDefinition } from "sanity";
import homeSeite from "./home/homeSeite";
import einleitung from "./home/einleitung";
import vision from "./home/vision";
import projektbeschreibung from "./home/projektbeschreibung";
import teilprojekte from "./home/teilprojekte";
import zugangswege from "./home/zugangswege";
import auswirkungen from "./home/auswirkungen";
import netzwerk from "./home/netzwerk";
import kontaktSeite from "./kontakt/kontaktSeite";
import ansprechpersonen from "./kontakt/ansprechpersonen";
import impressumSeite from "./impressumSeite";
import datenschutzSeite from "./datenschutzSeite";
import projektfoerderung from "./footer/projektfoerderung";
import projektpartner from "./footer/projektpartner";
import erweitertesNetzwerk from "./footer/erweitertesNetzwerk";
import footer from "./footer";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homeSeite,
    einleitung,
    vision,
    projektbeschreibung,
    teilprojekte,
    zugangswege,
    auswirkungen,
    netzwerk,
    kontaktSeite,
    ansprechpersonen,
    impressumSeite,
    datenschutzSeite,
    projektfoerderung,
    projektpartner,
    erweitertesNetzwerk,
    footer,
  ],
};
