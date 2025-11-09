import { type SchemaTypeDefinition } from "sanity";
import homeSeite from "./home/homeSeite";
import einleitung from "./home/einleitung";
import projektbeschreibung from "./home/projektbeschreibung";
import teilprojekte from "./home/teilprojekte";
import auswirkungen from "./home/auswirkungen";
import fallbeispiele from "./home/fallbeispiele";
import medien from "./home/medien";
import netzwerk from "./home/netzwerk";
import zugangswege from "./home/zugangswege";
import kompetenzerweiterung from "./home/kompetenzerweiterung";
import vision from "./home/vision";

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
    einleitung,
    projektbeschreibung,
    teilprojekte,
    auswirkungen,
    fallbeispiele,
    medien,
    netzwerk,
    zugangswege,
    kompetenzerweiterung,
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
