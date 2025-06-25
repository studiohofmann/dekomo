import { defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

const vision = {
  name: "vision",
  title: "Vision",
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

export default vision;
