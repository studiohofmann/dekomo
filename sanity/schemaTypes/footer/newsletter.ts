import { defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

const newsletter = {
  name: "newsletter",
  title: "Newsletter",
  type: "document",
  icon: EnvelopeIcon,

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
      type: "text",
      description: "Kurzbeschreibung unter der Überschrift",
    }),
  ],
};

export default newsletter;
