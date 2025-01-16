import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import node from "@astrojs/node";
import clerk from "@clerk/astro";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), react(), clerk()],
  output: "server",
  // adapter: vercel(),
  adapter: node({
    mode: "standalone",
  }),
});
