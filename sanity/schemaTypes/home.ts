import { defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

const home = {
  name: "home",
  title: "Home",
  type: "document",
  icon: HomeIcon,

  fields: [
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
};

export default home;
