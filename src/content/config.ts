import { z, defineCollection, type CollectionEntry } from "astro:content";
// import {format} from "date-fns"

const authorsCollection = defineCollection({
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

const postsCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      author: z.string(),
      tags: z.array(z.string()),
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
  authors: authorsCollection,
  posts: postsCollection,
};

export type Post = CollectionEntry<"posts">;
