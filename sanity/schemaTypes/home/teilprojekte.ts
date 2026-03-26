import { defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

const teilprojekte = {
  name: "teilprojekte",
  title: "Teilprojekte",
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
      name: "teilprojekt",
      title: "Teilprojekt",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "ueberschrift",
              title: "Überschrift",
              type: "string",
            },
            {
              name: "text",
              title: "Text",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
      ],
    }),
  ],
};

export default teilprojekte;
