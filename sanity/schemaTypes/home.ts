import { defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

const home = {
  name: "home",
  title: "Home",
  type: "document",
  icon: HomeIcon,

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
      name: "einleitung",
      title: "Einleitung",
      type: "string",
    }),
    defineField({
      name: "vision",
      title: "Vision",
      type: "object",
      fields: [
        {
          name: "ueberschrift",
          title: "Überschrift",
          type: "string",
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
      name: "projektbeschreibung",
      title: "Projektbeschreibung",
      type: "object",
      fields: [
        {
          name: "ueberschrift",
          title: "Überschrift",
          type: "string",
        },
        {
          name: "text",
          title: "Text",
          type: "text", // or "string" if you want single line
        },
        {
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
        },
        {
          name: "teilprojekte",
          title: "Teilprojekte",
          type: "array",
          of: [
            {
              type: "object",
              name: "section",
              title: "teilprojekt",
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
    defineField({
      name: "zugangswege",
      title: "Zugangswege",
      type: "object",
      fields: [
        {
          name: "ueberschrift",
          title: "Überschrift",
          type: "string",
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
    }),
    defineField({
      name: "auswirkungen",
      title: "Auswirkungen",
      type: "object",
      fields: [
        {
          name: "ueberschrift",
          title: "Überschrift",
          type: "string",
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
    }),
  ],
};

export default home;
