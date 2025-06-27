import { defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

const ansprechpersonen = {
  name: "ansprechpersonen",
  title: "Ansprechpersonen",
  type: "document",
  icon: EnvelopeIcon,

  fields: [
    defineField({
      name: "ueberschrift",
      title: "Überschrift",
      type: "string",
    }),
    defineField({
      name: "ansprechperson",
      title: "Ansprechperson",
      type: "array",
      of: [
        {
          type: "object",
          title: "Ansprechperson",
          fields: [
            defineField({
              name: "text",
              title: "Text",
              type: "array",
              of: [{ type: "block" }],
            }),
            defineField({
              name: "profilbild",
              title: "Profilbild",
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
          ],
        },
      ],
    }),
  ],
};

export default ansprechpersonen;
