import { defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

const projektbeschreibung = {
  name: "projektbeschreibung",
  title: "Projektbeschreibung",
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
      name: "grafik",
      title: "Grafik",
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
    defineField({
      name: "zusatzinfos",
      title: "Zusatzinfos",
      type: "object",
      fields: [
        {
          name: "grafik",
          title: "Grafik",
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
        },
        {
          name: "text",
          title: "Text",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    }),
    defineField({
      name: "teilprojekte",
      title: "Teilprojekte",
      type: "object",
      fields: [
        {
          name: "ueberschrift",
          title: "Überschrift",
          type: "string",
        },
        {
          name: "projekte",
          title: "Projekte",
          type: "array",
          of: [
            {
              name: "teilprojekt",
              title: "Teilprojekt",
              type: "object",
              fields: [
                {
                  name: "ueberschrift",
                  title: "Überschrift",
                  type: "string",
                  validation: (rule) => rule.required(),
                },
                {
                  name: "text",
                  title: "Text",
                  type: "array",
                  of: [{ type: "block" }],
                },
                {
                  name: "grafik",
                  title: "Grafik",
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
                },
              ],
              preview: {
                select: {
                  title: "ueberschrift",
                },
                prepare(selection) {
                  const { title } = selection;
                  return {
                    title: title || "Unbenanntes Projekt",
                  };
                },
              },
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

export default projektbeschreibung;
