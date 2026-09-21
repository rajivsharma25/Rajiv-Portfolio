import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";

export const DEFAULT_AUTHOR = {
  name: "Rajiv Sharma",
  role: "Software Developer",
  avatar: "/profile.webp",
};

export function buildTableOfContents(content) {
  if (!Array.isArray(content)) return [];
  return content
    .filter((block) => block && block.type === "heading" && block.text)
    .map((block) => ({
      id:
        block.id ||
        block.text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      title: block.text,
      text: block.text,
      level: block.level || 2,
    }));
}

function formatBlogDocument(b) {
  const plain = JSON.parse(JSON.stringify(b));
  return {
    ...plain,
    id: plain._id ? plain._id.toString() : plain.id,
    author: plain.author || DEFAULT_AUTHOR,
    tableOfContents: buildTableOfContents(plain.content),
    updatedAt: plain.updatedAt
      ? typeof plain.updatedAt === "string"
        ? plain.updatedAt.split("T")[0]
        : new Date(plain.updatedAt).toISOString().split("T")[0]
      : plain.publishedAt,
  };
}

/**
 * Get all blogs sorted by published date (newest first).
 */
export async function getAllBlogs() {
  if (!process.env.MONGODB_URI) {
    return [];
  }

  try {
    await connectToDatabase();
    const blogs = await Blog.find({}).sort({ createdAt: -1, publishedAt: -1 }).lean();
    if (Array.isArray(blogs)) {
      return blogs.map(formatBlogDocument);
    }
  } catch (err) {
    console.error("getAllBlogs: MongoDB query error:", err.message);
  }

  return [];
}

/**
 * Find a blog by its URL slug.
 */
export async function getBlogBySlug(slug) {
  if (!slug || !process.env.MONGODB_URI) return null;

  try {
    await connectToDatabase();
    const blog = await Blog.findOne({ slug }).lean();
    if (blog) {
      return formatBlogDocument(blog);
    }
  } catch (err) {
    console.error("getBlogBySlug: MongoDB query error:", err.message);
  }

  return null;
}

/**
 * Get related blogs (excluding current blog, prioritizing same category).
 */
export async function getRelatedBlogs(currentSlug, limit = 2) {
  const all = await getAllBlogs();
  const current = all.find((b) => b.slug === currentSlug);
  const others = all.filter((b) => b.slug !== currentSlug);

  if (!current) return others.slice(0, limit);

  const sorted = [...others].sort((a, b) => {
    const aMatch = a.category === current.category ? 1 : 0;
    const bMatch = b.category === current.category ? 1 : 0;
    if (aMatch !== bMatch) return bMatch - aMatch;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return sorted.slice(0, limit);
}

/**
 * Get all distinct categories.
 */
export async function getAllCategories() {
  const blogs = await getAllBlogs();
  const categories = new Set(blogs.map((b) => b.category).filter(Boolean));
  return ["All", ...Array.from(categories)];
}
