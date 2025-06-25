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
              name: "coordinates",
              title: "Coordinates",
              type: "geopoint",
              description: "Click on the map to set the location",
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: "titel",
            },
            prepare(selection) {
              const { title } = selection;
              return {
                title: title || "Unbenannter Standort",
              };
            },
          },
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
