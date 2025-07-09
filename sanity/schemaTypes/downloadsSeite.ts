import { defineField } from "sanity";
import { DownloadIcon } from "@sanity/icons";

const downloadsSeite = {
  name: "downloadsSeite",
  title: "Downloads Seite",
  type: "document",
  icon: DownloadIcon,

  fields: [
    defineField({
      name: "seitentitelMenue",
      title: "Seitentitel / Menü",
      type: "string",
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
      name: "dateien",
      title: "Dateien",
      type: "array",
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
  ],
};

export default downloadsSeite;
