import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectToDatabase from "@/lib/mongodb";
import Resume from "@/models/Resume";

export const dynamic = "force-dynamic";

function verifyAdmin(request) {
  const adminKey = request.headers.get("x-admin-key");
  const validKey = process.env.ADMIN_SECRET_KEY || "rajiv@1407";
  return adminKey === validKey;
}

// GET /api/admin/resume: Fetch current resume metadata
export async function GET(request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const resume = await Resume.findOne()
        .sort({ updatedAt: -1 })
        .select("-data");

      if (resume) {
        return NextResponse.json({
          success: true,
          hasResume: true,
          resume: {
            id: resume._id.toString(),
            filename: resume.filename,
            size: resume.size,
            contentType: resume.contentType,
            updatedAt: resume.updatedAt,
          },
        });
      }
    }

    // Local filesystem check
    const localPath = path.join(process.cwd(), "public", "resume.pdf");
    if (fs.existsSync(localPath)) {
      const stat = await fs.promises.stat(localPath);
      return NextResponse.json({
        success: true,
        hasResume: true,
        resume: {
          filename: "Rajiv_Sharma_Resume.pdf",
          size: stat.size,
          contentType: "application/pdf",
          updatedAt: stat.mtime,
        },
      });
    }

    return NextResponse.json({
      success: true,
      hasResume: false,
      resume: null,
    });
  } catch (error) {
    console.error("Error fetching admin resume info:", error);
    return NextResponse.json(
      { error: "Failed to fetch resume status." },
      { status: 500 }
    );
  }
}

// POST /api/admin/resume: Upload / replace resume PDF
export async function POST(request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No PDF file was provided." },
        { status: 400 }
      );
    }

    // Validate mime type & extension
    const isPdfType =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdfType) {
      return NextResponse.json(
        { error: "Only PDF files (.pdf) are allowed." },
        { status: 400 }
      );
    }

    // Validate size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds the 10MB limit." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = file.name || "Rajiv_Sharma_Resume.pdf";
    const contentType = file.type || "application/pdf";
    const size = file.size;

    // 1. Save to MongoDB
    const conn = await connectToDatabase();
    let savedDoc = null;
    if (conn) {
      await Resume.deleteMany({}); // Keep only single active resume
      savedDoc = await Resume.create({
        filename,
        contentType,
        size,
        data: buffer,
      });
    }

    // 2. Also write to public/resume.pdf for fast static fallback if local filesystem allows
    try {
      const publicDir = path.join(process.cwd(), "public");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      const localPath = path.join(publicDir, "resume.pdf");
      await fs.promises.writeFile(localPath, buffer);
    } catch (fsErr) {
      console.warn("Filesystem write skipped (expected on read-only serverless):", fsErr.message);
    }

    return NextResponse.json({
      success: true,
      message: "Resume uploaded successfully!",
      resume: {
        id: savedDoc ? savedDoc._id.toString() : "local",
        filename,
        size,
        contentType,
        updatedAt: savedDoc ? savedDoc.updatedAt : new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error uploading resume:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload resume." },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/resume: Remove resume
export async function DELETE(request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    // 1. Delete from MongoDB
    const conn = await connectToDatabase();
    if (conn) {
      await Resume.deleteMany({});
    }

    // 2. Delete local file if it exists
    const localPath = path.join(process.cwd(), "public", "resume.pdf");
    if (fs.existsSync(localPath)) {
      try {
        await fs.promises.unlink(localPath);
      } catch (fsErr) {
        console.warn("Could not delete local file:", fsErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Resume deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting resume:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete resume." },
      { status: 500 }
    );
  }
}
