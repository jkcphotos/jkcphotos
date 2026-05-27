import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sanity from "@sanity/astro";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://jkcphotos.com",

  integrations: [
    react(),
    sanity({
      projectId: "1y9054en",
      dataset: "production",
      useCdn: false,
      studioBasePath: "/admin"
    })
  ],

  vite: {
    ssr: {
      noExternal: ["@sanity/client"]
    }
  },

  output: "hybrid",
  adapter: cloudflare()
});