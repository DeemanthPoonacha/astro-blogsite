import type { APIRoute } from "astro";
import { db, Author, eq } from "astro:db";

export const POST: APIRoute = async ({ request, params }) => {
  try {
    const id = params.id as string;
    const authorData = await request.json();

    // Validate required fields
    if (!authorData.id) {
      return new Response(JSON.stringify({ error: "Author ID is required" }), {
        status: 400,
      });
    }

    // Update author in database
    await db
      .update(Author)
      .set({
        penName: authorData.penName,
        title: authorData.title,
        bio: authorData.bio,
        socialLinks: authorData.socials,
        // Don't update fields like email, username, etc. that aren't part of the form
      })
      .where(eq(Author.id, authorData.id));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating author:", error);
    return new Response(JSON.stringify({ error: "Failed to update author" }), {
      status: 500,
    });
  }
};

export const GET: APIRoute = async ({ request, params }) => {
  try {
    const id = params.id as string;

    // Validate required fields
    if (!id) {
      return new Response(JSON.stringify({ error: "Author ID is required" }), {
        status: 400,
      });
    }

    const author = await db.select().from(Author).where(eq(Author.id, id));

    return new Response(JSON.stringify({ success: true, ...author }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating author:", error);
    return new Response(JSON.stringify({ error: "Failed to update author" }), {
      status: 500,
    });
  }
};
