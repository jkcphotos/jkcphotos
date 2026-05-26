import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/schemas";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "jkc-photos",
  title: "JKC Photos",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes
  }
});
