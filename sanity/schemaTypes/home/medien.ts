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
              description: "Titel",
            }),
            defineField({
              name: "datum",
              title: "Datum",
              type: "string",
              description:
                "Datum der Veröffentlichung (YYYY-MM-DD oder YYYY-MM für Monat/Jahr)",
              validation: (Rule) =>
                Rule.custom((value) => {
                  if (!value) return true; // Optional field
                  const dateRegex = /^\d{4}-\d{2}(-\d{2})?$/;
                  if (!dateRegex.test(value)) {
                    return "Datum muss im Format YYYY-MM oder YYYY-MM-DD sein (z.B. 2023-10 oder 2023-10-15)";
                  }
                  // Additional validation for valid dates
                  const parts = value.split("-");
                  const year = parseInt(parts[0], 10);
                  const month = parseInt(parts[1], 10);
                  if (month < 1 || month > 12) {
                    return "Ungültiger Monat (1-12)";
                  }
                  if (parts[2]) {
                    const day = parseInt(parts[2], 10);
                    const daysInMonth = new Date(year, month, 0).getDate();
                    if (day < 1 || day > daysInMonth) {
                      return `Ungültiger Tag für ${month}/${year}`;
                    }
                  }
                  return true;
                }),
            }),
            defineField({
              name: "medium",
              title: "Medium",
              type: "string",
              description: "Name der Zeitschrift, Website, etc.",
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
