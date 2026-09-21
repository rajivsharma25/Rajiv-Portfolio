import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { DEFAULT_AUTHOR, buildTableOfContents } from "@/lib/blogs";

function verifyAdmin(request) {
  const adminKey = request.headers.get("x-admin-key");
  const validKey = process.env.ADMIN_SECRET_KEY || "rajiv@1407";
  return adminKey === validKey;
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function calculateReadingTime(content) {
  if (!Array.isArray(content)) return "4 min read";
  let totalWords = 0;
  for (const block of content) {
    if (block.text) totalWords += block.text.split(/\s+/).length;
    if (block.code) totalWords += block.code.split(/\s+/).length;
    if (block.caption) totalWords += block.caption.split(/\s+/).length;
    if (Array.isArray(block.items)) {
      totalWords += block.items.join(" ").split(/\s+/).length;
    }
    if (Array.isArray(block.headers)) {
      totalWords += block.headers.join(" ").split(/\s+/).length;
    }
    if (Array.isArray(block.rows)) {
      for (const row of block.rows) {
        if (Array.isArray(row)) {
          totalWords += row.join(" ").split(/\s+/).length;
        }
      }
    }
  }
  const minutes = Math.max(1, Math.ceil(totalWords / 180));
  return `${minutes} min read`;
}

// GET all blogs
export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        {
          success: false,
          error: "MONGODB_URI environment variable is missing. Please configure it in .env or Vercel.",
          blogs: [],
        },
        { status: 500 }
      );
    }

    await connectToDatabase();
    const blogs = await Blog.find({}).sort({ createdAt: -1, publishedAt: -1 }).lean();
    const formattedBlogs = blogs.map((b) => ({
      ...b,
      id: b._id ? b._id.toString() : b.id,
      author: b.author || DEFAULT_AUTHOR,
      tableOfContents: buildTableOfContents(b.content),
    }));

    return NextResponse.json({ success: true, blogs: formattedBlogs });
  } catch (error) {
    console.error("GET /api/admin/blogs error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to load blogs from database." },
      { status: 500 }
    );
  }
}

// POST: Add new blog
export async function POST(request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid admin secret key." },
        { status: 401 }
      );
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: "Database not configured. Please set MONGODB_URI." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      title,
      slug: customSlug,
      description,
      category,
      tags,
      featured,
      content,
    } = body;

    if (!title || !description || !category || !content || content.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields (title, description, category, or content)." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const todayStr = new Date().toISOString().split("T")[0];

    // Format content and ensure headings have IDs
    const formattedContent = content.map((block) => {
      if (block.type === "heading" && !block.id) {
        return {
          ...block,
          level: block.level || 2,
          id: generateSlug(block.text),
        };
      }
      if (block.type === "table") {
        return {
          type: "table",
          headers: Array.isArray(block.headers) ? block.headers : [],
          rows: Array.isArray(block.rows) ? block.rows : [],
        };
      }
      return block;
    });

    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [category];

    const baseSlug = customSlug ? generateSlug(customSlug) : generateSlug(title);

    // Find unique slug
    let finalSlug = baseSlug;
    let counter = 1;
    while (await Blog.exists({ slug: finalSlug })) {
      counter++;
      finalSlug = `${baseSlug}-${counter}`;
    }

    const newBlogDoc = await Blog.create({
      slug: finalSlug,
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      tags: parsedTags,
      publishedAt: todayStr,
      readingTime: calculateReadingTime(formattedContent),
      featured: Boolean(featured),
      content: formattedContent,
    });

    const responseBlog = {
      ...newBlogDoc.toObject(),
      id: newBlogDoc._id.toString(),
      author: DEFAULT_AUTHOR,
      tableOfContents: buildTableOfContents(formattedContent),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully!",
        blog: responseBlog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/blogs error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create blog in database." },
      { status: 500 }
    );
  }
}

// PUT: Update an existing blog
export async function PUT(request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid admin secret key." },
        { status: 401 }
      );
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: "Database not configured. Please set MONGODB_URI." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id && !updates.slug) {
      return NextResponse.json(
        { error: "Please provide a blog id or slug to update." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const query = [];
    if (id && mongoose.isValidObjectId(id)) {
      query.push({ _id: id });
    }
    if (id) {
      query.push({ id: String(id) });
    }
    if (updates.slug) {
      query.push({ slug: updates.slug });
    }

    const existingBlog = await Blog.findOne({ $or: query });
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found in database." }, { status: 404 });
    }

    let formattedContent = updates.content || existingBlog.content;
    if (Array.isArray(formattedContent)) {
      formattedContent = formattedContent.map((block) => {
        if (block.type === "heading" && !block.id) {
          return {
            ...block,
            level: block.level || 2,
            id: generateSlug(block.text),
          };
        }
        if (block.type === "table") {
          return {
            type: "table",
            headers: Array.isArray(block.headers) ? block.headers : [],
            rows: Array.isArray(block.rows) ? block.rows : [],
          };
        }
        return block;
      });
    }

    const updateData = {
      ...updates,
      readingTime: calculateReadingTime(formattedContent),
      content: formattedContent,
    };
    delete updateData.author;
    delete updateData.gradient;
    delete updateData.seo;
    delete updateData.tableOfContents;
    delete updateData.updatedAt;

    const updatedDoc = await Blog.findByIdAndUpdate(existingBlog._id, updateData, { new: true }).lean();

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully!",
      blog: {
        ...updatedDoc,
        id: updatedDoc._id.toString(),
        author: DEFAULT_AUTHOR,
        tableOfContents: buildTableOfContents(formattedContent),
      },
    });
  } catch (error) {
    console.error("PUT /api/admin/blogs error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update blog in database." },
      { status: 500 }
    );
  }
}

// DELETE: Delete a blog by id or slug
export async function DELETE(request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid admin secret key." },
        { status: 401 }
      );
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: "Database not configured. Please set MONGODB_URI." },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json(
        { error: "Specify an id or slug query parameter to delete." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const query = [];
    if (id && mongoose.isValidObjectId(id)) {
      query.push({ _id: id });
    }
    if (id) {
      query.push({ id: String(id) });
    }
    if (slug) {
      query.push({ slug });
    }

    const deleted = await Blog.findOneAndDelete({ $or: query });
    if (!deleted) {
      return NextResponse.json({ error: "Blog not found in database." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully from database!",
    });
  } catch (error) {
    console.error("DELETE /api/admin/blogs error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete blog." },
      { status: 500 }
    );
  }
}
