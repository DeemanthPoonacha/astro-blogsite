// // src/utils/author.ts
// import { db } from "astro:db";

// export async function getAuthorData(user) {
//   //   const author = await db
//   //     .select()
//   //     .from("Author")
//   //     .where({ id: authorId })
//   //     .first();

//   //   if (!author) {
//   //     // If author doesn't exist in our db, fetch from Clerk and create
//   //     const clerkUser = await clerkClient.users.getUser(authorId);

//   //     const newAuthor = {
//   //       id: authorId,
//   //       email: clerkUser.emailAddresses[0]?.emailAddress || "",
//   //       username: clerkUser.username || authorId,
//   //       name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
//   //       title: "",
//   //       image: clerkUser.imageUrl ? { url: clerkUser.imageUrl } : null,
//   //       bio: "",
//   //       socialLinks: [],
//   //       createdAt: new Date(),
//   //     };

//   //     await db.insert("Author").values(newAuthor);
//   //     return newAuthor;
//   //   }

//   //   return author;

//   return user;
// }
