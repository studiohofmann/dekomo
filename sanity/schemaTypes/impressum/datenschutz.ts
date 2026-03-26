import { defineField } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons";

const datenschutz = {
  name: "datenschutz",
  title: "Datenschutz",
  type: "document",
  icon: InfoOutlineIcon,

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
};

export default datenschutz;
