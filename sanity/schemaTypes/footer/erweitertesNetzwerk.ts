import { defineField } from "sanity";
import { ArrowDownIcon } from "@sanity/icons";

const erweitertesNetzwerk = {
  name: "erweitertesNetzwerk",
  title: "Erweitertes Netzwerk",
  type: "document",
  icon: ArrowDownIcon,

  fields: [
    defineField({
      name: "ueberschrift",
      title: "Überschrift",
      type: "string",
    }),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description: "Beschreibung des Bildes für Screenreader",
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
    }),
  ],
};

export default erweitertesNetzwerk;
