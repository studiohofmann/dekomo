import { defineField } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons";

const datenschutz = {
  name: "datenschutz",
  title: "Datenschutz",
  type: "document",
  icon: InfoOutlineIcon,

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

export default datenschutz;
