import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

function verifyAdmin(request) {
  const adminKey = request.headers.get("x-admin-key");
  const validKey = process.env.ADMIN_SECRET_KEY || "rajiv@1407";
  return adminKey === validKey;
}

export async function POST(request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid admin secret key." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No image file provided in request." },
        { status: 400 }
      );
    }

    // Validate mime type
    const validMimes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "image/avif",
    ];
    if (file.type && !validMimes.includes(file.type)) {
      return NextResponse.json(
        { error: `Unsupported image format (${file.type}). Use PNG, JPG, WEBP, AVIF, or SVG.` },
        { status: 400 }
      );
    }

    // File buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate clean unique filename
    const originalExt = path.extname(file.name || "") || ".png";
    const rawName = path.basename(file.name || "blog-image", originalExt);
    const cleanName = rawName
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 40);
    const fileName = `${cleanName || "image"}-${Date.now()}${originalExt.toLowerCase()}`;
    const targetFilePath = path.join(uploadsDir, fileName);

    // Save file to disk
    await fs.writeFile(targetFilePath, buffer);

    const publicUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
    });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file." },
      { status: 500 }
    );
  }
}
