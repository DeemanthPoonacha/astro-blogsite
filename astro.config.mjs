import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import node from "@astrojs/node";
import clerk from "@clerk/astro";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
    react(),
    clerk({
      appearance: {
        variables: { colorPrimary: "#06b6d4" },
      },
    }),
  ],
  output: "server",
  adapter: vercel(),
  // adapter: node({
  //   mode: "standalone",
  // }),
});
