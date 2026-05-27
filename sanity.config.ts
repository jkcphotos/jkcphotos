import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/schemas";

export default defineConfig({
  name: "jkc-photos",
  title: "JKC Photos",
  projectId: "1y9054en",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes
  }
});
