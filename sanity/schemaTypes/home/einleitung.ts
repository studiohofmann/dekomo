import { defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

const einleitung = {
  name: "einleitung",
  title: "Einleitung",
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
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
    }),
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
  ],
};

export default einleitung;
