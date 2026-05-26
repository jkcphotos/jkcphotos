import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import "dotenv/config";

const rawProjectId = process.env.PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || "";
// Sanity requires projectId to match /^[-a-z0-9]+$/; fall back to a safe placeholder so the
// build doesn't crash when env vars aren't set yet. Fetches will fail gracefully in the pages.
const projectId = /^[-a-z0-9]+$/.test(rawProjectId) ? rawProjectId : "placeholder";
const dataset = process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  site: "https://jkcphotos.com",
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: false,
      studioBasePath: "/admin"
    }),
    react()
  ],
  vite: {
    ssr: {
      noExternal: ["@sanity/client"]
    }
  }
});
