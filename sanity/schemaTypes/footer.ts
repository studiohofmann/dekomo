import { defineField } from "sanity";
import { ArrowDownIcon } from "@sanity/icons";

const footer = {
  name: "footer",
  title: "Footer",
  type: "document",
  icon: ArrowDownIcon,

  fields: [
    defineField({
      name: "projektfoerderung",
      title: "Projektförderung",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "projektfoerderungLogo",
      title: "Projektfoerderung Logo",
      type: "object",
      fields: [
        {
          name: "image",
          title: "Logo Image",
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
        {
          name: "url",
          type: "url",
          title: "Link URL",
          description: "Optional: Link when logo is clicked",
        },
        {
          name: "name",
          type: "string",
          title: "Logo Name",
          description: "Name of the organization",
        },
      ],
    }),
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
