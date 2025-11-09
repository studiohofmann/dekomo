import { defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

const medien = {
  name: "medien",
  title: "Medien",
  type: "document",
  icon: HomeIcon,

  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description:
        "ID for linking directly to this section from search results",
    }),
    defineField({
      name: "ueberschrift",
      title: "Überschrift",
      type: "string",
    }),
    defineField({
      name: "dateien",
      title: "Dateien",
      type: "array",
      of: [
        {
          type: "object",
          name: "dateiOderLink",
          title: "Datei oder Link",
          fields: [
            defineField({
              name: "titel",
              title: "Titel",
              type: "string",
              description: "Anzeigetitel",
            }),
            defineField({
              name: "typ",
              title: "Typ",
              type: "string",
              options: {
                list: [
                  { title: "Datei hochladen", value: "datei" },
                  { title: "Link hinzufügen", value: "link" },
                ],
                layout: "radio",
              },
              initialValue: "datei",
            }),
            defineField({
              name: "datei",
              title: "Datei",
              type: "file",
              options: {
                accept: ".pdf,.doc,.docx,.txt,.jpg,.png,.mp4,.mp3",
              },
              hidden: ({ parent }) => parent?.typ !== "datei",
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "url",
              description: "URL zum Link",
              hidden: ({ parent }) => parent?.typ !== "link",
            }),
          ],
          preview: {
            select: {
              title: "titel",
              typ: "typ",
              media: "datei",
            },
            prepare({ title, typ, media }) {
              return {
                title,
                subtitle: typ === "datei" ? "Datei" : "Link",
                media,
              };
            },
          },
        },
      ],
    }),
  ],
};

export default medien;
