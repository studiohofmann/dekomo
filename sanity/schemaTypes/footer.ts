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
      name: "partnerLogos",
      title: "Partner Logos",
      type: "array",
      of: [
        {
          name: "logo",
          title: "Logo",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description: "Beschreibung des Logos für Screenreader",
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "netzwerk",
      title: "Netzwerk",
      type: "string",
    }),
    defineField({
      name: "netzwerkLogos",
      title: "Netzwerk Logos",
      type: "array",
      of: [
        {
          name: "logo",
          title: "Logo",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description: "Beschreibung des Logos für Screenreader",
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
    }),
  ],
};

export default footer;
