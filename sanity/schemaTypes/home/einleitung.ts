import { defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

const einleitung = {
  name: "einleitung",
  title: "Einleitung",
  type: "document",
  icon: HomeIcon,

  fields: [
    defineField({
      name: "ueberschrift",
      title: "Überschrift",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "ueberschrift",
    },
  },
};

export default einleitung;
