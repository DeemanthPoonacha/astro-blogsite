import type { PostUpdate } from "@/types";
import type { APIRoute } from "astro";
import { db, Post } from "astro:db";
import { eq } from "astro:db";

export const PATCH: APIRoute = async ({ request, params }) => {
  try {
    const id = params.id as string;
    const postData: PostUpdate = await request.json();

    const now = new Date();

    const updateData = {
      title: postData.title,
      description: postData.description,
      content: postData.content,
      tags: postData.tags,
      image: postData.image,
      lastSavedAt: now,
      updatedAt: now,
      status: postData.status,
      // Only update publishedAt if we're publishing
      ...(postData.status === "published" ? { publishedAt: now } : {}),
    };

    await db.update(Post).set(updateData).where(eq(Post.id, id));

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
