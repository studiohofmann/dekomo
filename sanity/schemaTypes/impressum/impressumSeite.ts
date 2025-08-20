import { defineField } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons";

const impressumSeite = {
  name: "impressumSeite",
  title: "Impressum Seite",
  type: "document",
  icon: InfoOutlineIcon,

  groups: [
    {
      name: "content",
      title: "Inhalt",
      default: true,
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

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
      name: "impressumText",
      title: "Impressum Text",
      type: "array",
      of: [{ type: "block" }],
      group: "content",
    }),
    defineField({
      name: "angabenUeberschrift",
      title: "Angaben Überschrift",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "angabenText",
      title: "Angaben Text",
      type: "array",
      of: [{ type: "block" }],
      group: "content",
    }),

    defineField({
      name: "seoTitle",
      title: "SEO Titel",
      type: "string",
      description: "Titel für Suchmaschinen (50-60 Zeichen empfohlen)",
      validation: (rule) =>
        rule.max(60).warning("Sollte unter 60 Zeichen sein"),
      group: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      description: "Beschreibung für Suchmaschinen (150-160 Zeichen empfohlen)",
      validation: (rule) =>
        rule.max(160).warning("Sollte unter 160 Zeichen sein"),
      group: "seo",
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "Relevante Suchbegriffe für diese Seite",
      options: {
        layout: "tags",
      },
      group: "seo",
    }),
    defineField({
      name: "openGraphImage",
      title: "Open Graph Bild",
      type: "image",
      description: "Bild für Social Media Shares (1200x630px empfohlen)",
      options: {
        hotspot: true,
      },
      group: "seo",
    }),
    defineField({
      name: "noIndex",
      title: "Von Suchmaschinen ausschließen",
      type: "boolean",
      description:
        "Verhindert, dass diese Seite in Suchmaschinen indexiert wird",
      initialValue: false,
      group: "seo",
    }),
  ],
};

export default impressumSeite;
