import { defineField } from "sanity";
import { ArrowDownIcon } from "@sanity/icons";

const projektfoerderung = {
  name: "projektfoerderung",
  title: "Projektförderung",
  type: "document",
  icon: ArrowDownIcon,

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
      name: "logo",
      title: "Logo",
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
};

export default projektfoerderung;
