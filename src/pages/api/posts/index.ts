import type { DBPost, PostUpdate } from "@/types";
import { generateSlug } from "@/utils/helpers";
import type { APIRoute } from "astro";
import { db, Post } from "astro:db";
import { eq } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  try {
    const postData: PostUpdate = await request.json();
    const now = new Date();

    await db.insert(Post).values({
      id: crypto.randomUUID(), // Generate a unique ID
      title: postData.title,
      slug: generateSlug(postData.title),
      description: postData.description,
      content: postData.content,
      status: postData.status,
      featured: false,
      image: postData.image || "",
      tags: postData.tags,
      authorId: postData.authorId, // Replace with a valid author ID
      publishedAt: postData.status === "published" ? now : null,
      createdAt: now,
      updatedAt: now,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return new Response(JSON.stringify({ error: "Failed to update post" }), {
      status: 500,
    });
  }
};
