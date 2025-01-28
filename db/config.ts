// src/db/schema.ts
import { defineDb, defineTable, column } from "astro:db";

const Post = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    slug: column.text({ unique: true }),
    description: column.text(),
    content: column.text(),
    status: column.text(),
    featured: column.boolean({ optional: true }),
    image: column.json({ optional: true }),
    tags: column.json(), // Store as JSON array
    authorId: column.text({ references: () => Author.columns.id }),
    publishedAt: column.date(),
    createdAt: column.date(),
    updatedAt: column.date(),
  },
});

const Author = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    username: column.text(),
    name: column.text(),
    title: column.text(),
    email: column.text({ unique: true }),
    image: column.json({ optional: true }),
    bio: column.text(),
    socialLinks: column.json(), // Store as JSON array
    createdAt: column.date(),
  },
});

export default defineDb({
  tables: { Post, Author },
});
