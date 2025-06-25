import { defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

const kontaktSeite = {
  name: "kontaktSeite",
  title: "Kontakt Seite",
  type: "document",
  icon: EnvelopeIcon,

  fields: [
    defineField({
      name: "seitentitelMenue",
      title: "Seitentitel / Menü",
      type: "string",
    }),
    defineField({
      name: "menuReihenfolge",
      title: "Menü Reihenfolge",
      type: "number",
      description:
        "Steuert die Position im Menü (höhere Zahlen erscheinen später)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Eigener Slug für die URL oder automtisch generiert ",
      options: { source: "seitentitelMenue" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "ueberschriftAnsprechpersonen",
      title: "Überschrift Ansprechpersonen",
      type: "string",
    }),
    defineField({
      name: "textAnsprechpersonen",
      title: "Text Ansprechpersonen",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
};

export default kontaktSeite;
