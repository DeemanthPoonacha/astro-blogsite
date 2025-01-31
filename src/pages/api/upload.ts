import type { APIRoute } from "astro";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return new Response(JSON.stringify({ error: "No image file provided" }), {
        status: 400,
      });
    }

    // Convert File to base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary with optimization settings
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "blog",
      transformation: [
        { quality: "auto:best" },
        { fetch_format: "auto" },
        { crop: "limit", width: 2000 }, // Max width
      ],
      // Optional: Add tags or custom metadata
      tags: ["blog_post"],
      // Optional: Add context metadata
      context: {
        alt: file.name,
        caption: "",
      },
    });

    return new Response(
      JSON.stringify({
        url: result.secure_url,
        // Optional: return additional URLs for different sizes
        thumbnail: cloudinary.url(result.public_id, {
          width: 400,
          height: 300,
          crop: "fill",
          quality: "auto",
          fetch_format: "auto",
        }),
        hero: cloudinary.url(result.public_id, {
          width: 1200,
          height: 630,
          crop: "fill",
          quality: "auto",
          fetch_format: "auto",
        }),
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return new Response(JSON.stringify({ error: "Failed to upload image" }), {
      status: 500,
    });
  }
};
