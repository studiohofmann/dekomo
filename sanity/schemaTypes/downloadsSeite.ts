import { defineField } from "sanity";
import { DownloadIcon } from "@sanity/icons";

const downloadsSeite = {
  name: "downloadsSeite",
  title: "Downloads Seite",
  type: "document",
  icon: DownloadIcon,

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
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description:
        "ID for linking directly to this section from search results",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
      group: "content",
    }),
    defineField({
      name: "dateien",
      title: "Dateien",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          name: "downloadItem",
          title: "Download Item",
          fields: [
            defineField({
              name: "titel",
              title: "Titel",
              type: "string",
              description: "Name des Datei (z.B. 'Projektbericht 2024')",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "datei",
              title: "Datei",
              type: "file",
              description: "PDF, Word, Excel oder andere Dokumente",
              options: {
                accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
              },
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
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

export default downloadsSeite;
