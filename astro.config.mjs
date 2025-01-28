import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import clerk from "@clerk/astro";
import vercel from "@astrojs/vercel";

import vercel from "@astrojs/vercel";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    react(),
    db(),
    clerk({
      appearance: {
        variables: { colorPrimary: "#06b6d4" },
      },
    }),
  ],
  output: "server",
  adapter: vercel(),
});
