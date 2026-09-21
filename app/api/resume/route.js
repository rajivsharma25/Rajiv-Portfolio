import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectToDatabase from "@/lib/mongodb";
import Resume from "@/models/Resume";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Try fetching from MongoDB
    const conn = await connectToDatabase();
    if (conn) {
      const resume = await Resume.findOne().sort({ updatedAt: -1 });
      if (resume && resume.data) {
        return new Response(resume.data, {
          status: 200,
          headers: {
            "Content-Type": resume.contentType || "application/pdf",
            "Content-Disposition": `inline; filename="${resume.filename || "Rajiv_Sharma_Resume.pdf"}"`,
            "Content-Length": resume.size.toString(),
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
          },
        });
      }
    }

    // 2. Fallback to local filesystem (public/resume.pdf)
    const localPath = path.join(process.cwd(), "public", "resume.pdf");
    if (fs.existsSync(localPath)) {
      const fileBuffer = await fs.promises.readFile(localPath);
      const stat = await fs.promises.stat(localPath);
      return new Response(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'inline; filename="Rajiv_Sharma_Resume.pdf"',
          "Content-Length": stat.size.toString(),
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
      });
    }

    return NextResponse.json(
      { error: "Resume not found. Please upload one via the Admin panel." },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error serving resume:", error);
    return NextResponse.json(
      { error: "Failed to retrieve resume." },
      { status: 500 }
    );
  }
}
