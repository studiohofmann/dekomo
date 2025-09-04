import { defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

const fallbeispiele = {
  name: "fallbeispiele",
  title: "Fallbeispiele",
  type: "document",
  icon: HomeIcon,

  fields: [
    defineField({
      name: "ueberschrift",
      title: "Überschrift",
      type: "string",
    }),
    defineField({
      name: "fallbeispiel",
      title: "Fallbeispiel",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "ueberschrift",
              title: "Überschrift",
              type: "string",
            },
            defineField({
              name: "bild",
              title: "Bild",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alternative Text",
                  description: "Beschreibung des Bildes für Screenreader",
                },
              ],
            }),
            {
              name: "text",
              title: "Text",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
      ],
    }),
  ],
};

export default fallbeispiele;
