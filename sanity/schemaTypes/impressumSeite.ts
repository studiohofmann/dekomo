import { defineField } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons";

const impressumSeite = {
  name: "impressumSeite",
  title: "Impressum Seite",
  type: "document",
  icon: InfoOutlineIcon,

  fields: [
    defineField({
      name: "seitentitelMenue",
      title: "Seitentitel / Menü",
      type: "string",
    }),
    defineField({
      name: "menuReihenfolge",
      title: "Menü Reihenfolge",
      type: "number",
      description:
        "Steuert die Position im Menü (höhere Zahlen erscheinen später)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Eigener Slug für die URL oder automtisch generiert ",
      options: { source: "seitentitelMenue" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "angabenText",
      title: "Angaben Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "impressumText",
      title: "Impressum Text",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
};

export default impressumSeite;
