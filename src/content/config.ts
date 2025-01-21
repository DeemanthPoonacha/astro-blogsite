import {
  z,
  defineCollection,
  type CollectionEntry,
  reference,
} from "astro:content";
// import {format} from "date-fns"
import { glob } from "astro/loaders"; // Not available with legacy API

const authors = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/authors" }),

  schema: ({ image }) =>
    z.object({
      name: z.string(),
      subtitle: z.string(),
      image: image().optional(),
      social: z
        .array(
          z.object({
            platform: z.string(),
            link: z.string(),
          }),
        )
        .optional(),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      author: reference("authors"),
      tags: z.array(z.string()),
      relatedPosts: z.array(reference("posts")).default([]),
      isDraft: z.boolean().default(true),

      date: z.string().transform((str) =>
        new Date(str).toLocaleDateString("en-GB", {
          weekday: "short",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      ),
      featured: z.boolean().default(false),
      image: image(),
      title: z.string(),
    }),
});

export const collections = {
  authors,
  posts,
};

export type Post = CollectionEntry<"posts">;

export type Author = CollectionEntry<"authors">;
