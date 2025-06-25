import { defineField } from "sanity";
import { ArrowDownIcon } from "@sanity/icons";

const footer = {
  name: "footer",
  title: "Footer",
  type: "document",
  icon: ArrowDownIcon,

  fields: [
    defineField({
      name: "partner",
      title: "Partner",
      type: "string",
    }),
    defineField({
      name: "netzwerk",
      title: "Netzwerk",
      type: "string",
    }),
  ],
};

export default footer;
