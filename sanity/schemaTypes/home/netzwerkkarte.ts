import { defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

const netzwerkkarte = {
  name: "netzwerkkarte",
  title: "Netzwerkkarte",
  type: "document",
  icon: HomeIcon,

  fields: [
    defineField({
      name: "ueberschrift",
      title: "Überschrift",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "standorte",
      title: "Standorte",
      type: "array",
      of: [
        {
          type: "object",
          name: "standort",
          title: "Standort",
          fields: [
            {
              name: "titel",
              title: "Titel",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "latitude",
              title: "Latitude (Breitengrad)",
              type: "number",
              description: "z.B. 46.9481 für Bern",
              validation: (rule) => rule.required().min(-90).max(90),
            },
            {
              name: "longitude",
              title: "Longitude (Längengrad)",
              type: "number",
              description: "z.B. 7.4474 für Bern",
              validation: (rule) => rule.required().min(-180).max(180),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "ueberschrift",
    },
  },
};

export default netzwerkkarte;
