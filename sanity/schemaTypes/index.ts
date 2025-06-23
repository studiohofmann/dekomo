import { type SchemaTypeDefinition } from "sanity";
import home from "./home";
import kontakt from "./kontakt";
import impressum from "./impressum";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [home, kontakt, impressum],
};
