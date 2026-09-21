import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectToDatabase from "@/lib/mongodb";
import Resume from "@/models/Resume";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Check MongoDB
    const conn = await connectToDatabase();
    if (conn) {
      const resume = await Resume.findOne()
        .sort({ updatedAt: -1 })
        .select("-data"); // Exclude binary data for lightweight response

      if (resume) {
        return NextResponse.json({
          hasResume: true,
          filename: resume.filename,
          size: resume.size,
          updatedAt: resume.updatedAt,
        });
      }
    }

    // 2. Fallback to public/resume.pdf
    const localPath = path.join(process.cwd(), "public", "resume.pdf");
    if (fs.existsSync(localPath)) {
      const stat = await fs.promises.stat(localPath);
      return NextResponse.json({
        hasResume: true,
        filename: "Rajiv_Sharma_Resume.pdf",
        size: stat.size,
        updatedAt: stat.mtime,
      });
    }

    return NextResponse.json({
      hasResume: false,
    });
  } catch (error) {
    console.error("Error checking resume status:", error);
    return NextResponse.json({
      hasResume: false,
      error: error.message,
    });
  }
}
