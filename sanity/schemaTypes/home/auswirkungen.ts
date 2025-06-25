import { defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

const auswirkungen = {
  name: "auswirkungen",
  title: "Auswirkungen",
  type: "document",
  icon: HomeIcon,

  fields: [
    defineField({
      name: "ueberschrift",
      title: "Überschrift",
      type: "string",
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
  ],
  preview: {
    select: {
      title: "ueberschrift",
    },
  },
};

export default auswirkungen;
