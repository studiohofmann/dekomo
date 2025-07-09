import { defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

const news = {
  name: "news",
  title: "News",
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

export default news;
