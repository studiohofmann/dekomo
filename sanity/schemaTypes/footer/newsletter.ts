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
    defineField({
      name: "emailBetreff",
      title: "Bestätigungs-E-Mail: Betreff",
      type: "string",
      description: "Betreff der automatischen Bestätigungsmail nach Anmeldung",
    }),
    defineField({
      name: "emailText",
      title: "Bestätigungs-E-Mail: Text (HTML)",
      type: "text",
      description:
        "Inhalt der Bestätigungsmail als HTML. Wird leer gelassen, gilt der Standardtext.",
    }),
  ],
};

export default newsletter;
