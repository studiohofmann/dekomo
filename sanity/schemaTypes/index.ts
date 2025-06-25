import { type SchemaTypeDefinition } from "sanity";
import homeSeite from "./home/homeSeite";
import einleitung from "./home/einleitung";
import vision from "./home/vision";
import projektbeschreibung from "./home/projektbeschreibung";
import zugangswege from "./home/zugangswege";
import auswirkungen from "./home/auswirkungen";
import netzwerkkarte from "./home/netzwerkkarte";
import kontaktSeite from "./kontaktSeite";
import impressumSeite from "./impressumSeite";
import footer from "./footer";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homeSeite,
    einleitung,
    vision,
    projektbeschreibung,
    zugangswege,
    auswirkungen,
    netzwerkkarte,
    kontaktSeite,
    impressumSeite,
    footer,
  ],
};
