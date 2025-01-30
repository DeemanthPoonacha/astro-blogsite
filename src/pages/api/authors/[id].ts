import type { AuthorUpdate } from "@/types";
import type { APIRoute } from "astro";
import { db, Author, eq } from "astro:db";

export const POST: APIRoute = async ({ request, params }) => {
  try {
    const id = params.id as string;
    const authorData: AuthorUpdate = await request.json();

    // Validate required fields
    if (!id) {
      return new Response(JSON.stringify({ error: "Author ID is required" }), {
        status: 400,
      });
    }

    // Update author in database
    const updatedAuthor = await db
      .update(Author)
      .set({
        ...authorData,
      })
      .where(eq(Author.id, id));

    if (!updatedAuthor.rowsAffected) {
      throw new Error(`No author with ID (${id}) found`);
    }

    return new Response(JSON.stringify({ success: true, ...updatedAuthor }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating author:", error);
    return new Response(JSON.stringify({ error: "Failed to update author" }), {
      status: 500,
    });
  }
};

// export const GET: APIRoute = async ({ request, params }) => {
//   try {
//     const id = params.id as string;

//     // Validate required fields
//     if (!id) {
//       return new Response(JSON.stringify({ error: "Author ID is required" }), {
//         status: 400,
//       });
//     }

//     const author = await db.select().from(Author).where(eq(Author.id, id));

//     return new Response(JSON.stringify({ success: true, ...author }), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error updating author:", error);
//     return new Response(JSON.stringify({ error: "Failed to update author" }), {
//       status: 500,
//     });
//   }
// };
