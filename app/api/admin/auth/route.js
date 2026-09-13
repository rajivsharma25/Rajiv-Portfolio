import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { key } = body || {};

    const validKey = process.env.ADMIN_SECRET_KEY || "rajiv@1407";

    if (!key || key !== validKey) {
      return NextResponse.json(
        { error: "Invalid admin authentication key." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, message: "Authenticated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Authentication error." },
      { status: 500 }
    );
  }
}
