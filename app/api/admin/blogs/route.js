import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const localBlogsFilePath = path.join(process.cwd(), "data", "blogs.json");
const tmpBlogsFilePath = path.join("/tmp", "blogs.json");

function verifyAdmin(request) {
  const adminKey = request.headers.get("x-admin-key");
  const validKey = process.env.ADMIN_SECRET_KEY || "rajiv@1407";
  return adminKey === validKey;
}

async function readBlogsFile() {
  // Check /tmp/blogs.json first (for serverless environments like Vercel)
  try {
    const tmpData = await fs.readFile(tmpBlogsFilePath, "utf-8");
    return JSON.parse(tmpData);
  } catch {
    // Not in /tmp, read from repository file
  }

  const rawData = await fs.readFile(localBlogsFilePath, "utf-8");
  return JSON.parse(rawData);
}

async function writeBlogsFile(blogs) {
  const content = JSON.stringify(blogs, null, 2);
  let written = false;

  // Try writing to repo path first (works in local dev)
  try {
    await fs.writeFile(localBlogsFilePath, content, "utf-8");
    written = true;
  } catch (err) {
    console.warn("Could not write to local data directory (serverless read-only filesystem):", err.message);
  }

  // Always write or fallback to /tmp so serverless lambda instances have the latest data
  try {
    await fs.writeFile(tmpBlogsFilePath, content, "utf-8");
    written = true;
  } catch (tmpErr) {
    console.warn("Could not write to /tmp directory:", tmpErr.message);
  }

  if (!written) {
    throw new Error("Unable to save blog changes: serverless filesystem is not writable.");
  }
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

function buildTableOfContents(content) {
  if (!Array.isArray(content)) return [];
  return content
    .filter((b) => b.type === "heading" && b.text)
    .map((b) => ({
      id: b.id || generateSlug(b.text),
      title: b.text,
    }));
}

// GET all blogs
export async function GET() {
  try {
    const blogs = await readBlogsFile();
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to load blogs." },
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

    const body = await request.json();
    const {
      title,
      slug: customSlug,
      description,
      category,
      tags,
      gradient,
      coverImage,
      featured,
      content,
      author,
      seo,
    } = body;

    if (!title || !description || !category || !content || content.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields (title, description, category, or content)." },
        { status: 400 }
      );
    }

    const blogs = await readBlogsFile();

    // Generate unique slug
    let baseSlug = customSlug ? generateSlug(customSlug) : generateSlug(title);
    let finalSlug = baseSlug;
    let counter = 1;
    while (blogs.some((b) => b.slug === finalSlug)) {
      counter++;
      finalSlug = `${baseSlug}-${counter}`;
    }

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
      if (block.type === "image") {
        return {
          type: "image",
          url: block.url ? block.url.trim() : "",
          alt: block.alt ? block.alt.trim() : "",
          caption: block.caption ? block.caption.trim() : "",
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

    const newBlog = {
      id: String(Date.now()),
      slug: finalSlug,
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      tags: parsedTags,
      publishedAt: todayStr,
      updatedAt: todayStr,
      readingTime: calculateReadingTime(formattedContent),
      coverImage: coverImage || "",
      featured: Boolean(featured),
      gradient: gradient || "from-blue-600 via-indigo-600 to-cyan-500",
      author: author || {
        name: "Rajiv Sharma",
        role: "Software Developer",
        avatar: "/profile.webp",
      },
      seo: {
        keywords: seo?.keywords || parsedTags,
        canonical: seo?.canonical || `https://rajivsharma.vercel.app/blogs/${finalSlug}`,
      },
      tableOfContents: buildTableOfContents(formattedContent),
      content: formattedContent,
    };

    // Prepend to list so it is shown first
    blogs.unshift(newBlog);
    await writeBlogsFile(blogs);

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully!",
        blog: newBlog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create blog." },
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

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required for updating." },
        { status: 400 }
      );
    }

    const blogs = await readBlogsFile();
    const index = blogs.findIndex((b) => b.id === String(id) || b.slug === updates.slug);

    if (index === -1) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    const currentBlog = blogs[index];

    let formattedContent = updates.content || currentBlog.content;
    if (Array.isArray(formattedContent)) {
      formattedContent = formattedContent.map((block) => {
        if (block.type === "heading" && !block.id) {
          return {
            ...block,
            level: block.level || 2,
            id: generateSlug(block.text),
          };
        }
        if (block.type === "image") {
          return {
            type: "image",
            url: block.url ? block.url.trim() : "",
            alt: block.alt ? block.alt.trim() : "",
            caption: block.caption ? block.caption.trim() : "",
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

    const updatedBlog = {
      ...currentBlog,
      ...updates,
      id: currentBlog.id,
      updatedAt: new Date().toISOString().split("T")[0],
      readingTime: calculateReadingTime(formattedContent),
      tableOfContents: buildTableOfContents(formattedContent),
      content: formattedContent,
    };

    blogs[index] = updatedBlog;
    await writeBlogsFile(blogs);

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully!",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update blog." },
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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json(
        { error: "Specify an id or slug query parameter to delete." },
        { status: 400 }
      );
    }

    const blogs = await readBlogsFile();
    const initialLength = blogs.length;
    const filteredBlogs = blogs.filter((b) => {
      if (id && b.id === String(id)) return false;
      if (slug && b.slug === slug) return false;
      return true;
    });

    if (filteredBlogs.length === initialLength) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    await writeBlogsFile(filteredBlogs);

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete blog." },
      { status: 500 }
    );
  }
}
