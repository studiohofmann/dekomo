import { defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

const auswirkungen = {
  name: "auswirkungen",
  title: "Auswirkungen",
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
  ],
  preview: {
    select: {
      title: "ueberschrift",
    },
  },
};

export default auswirkungen;
