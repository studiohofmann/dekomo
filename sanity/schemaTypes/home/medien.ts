import { defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

const medien = {
  name: "medien",
  title: "Medien",
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
  ],
};

export default medien;
