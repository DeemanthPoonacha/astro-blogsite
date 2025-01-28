// // import { db, Post } from "astro:db";
// // import { defineAction } from "astro:actions";
// // import { z } from "astro:schema";
// // import { reference } from "astro:content";

// import { defineAction } from "astro:actions";
// import { db } from "astro:db";

// // export const server = {
// //   addPost: defineAction({
// //     // Actions include type safety with Zod, removing the need
// //     // to check if typeof {value} === 'string' in your pages
// //     input: ({ image }) =>
// //       z.object({
// //         author: reference("authors"),
// //         tags: z.array(z.string()),
// //         relatedPosts: z.array(reference("posts")).default([]),
// //         isDraft: z.boolean().default(true),

// //         date: z.string().transform((str) =>
// //           new Date(str).toLocaleDateString("en-GB", {
// //             weekday: "short",
// //             year: "numeric",
// //             month: "long",
// //             day: "numeric",
// //           }),
// //         ),
// //         featured: z.boolean().default(false),
// //         image: image(),
// //         title: z.string(),
// //       }),
// //     handler: async (input) => {
// //       const updatedPosts = await db.insert(Post).values(input).returning(); // Return the updated Posts
// //       return updatedPosts;
// //     },
// //   }),
// // };

// export const server = {
//   getPosts: defineAction({
//     handler: async () => {
//       const posts = await db
//         .query("posts")
//         .select("id", "title", "slug", "image")
//         .all(); // Return the updated Posts
//     },
//   }),
// };
