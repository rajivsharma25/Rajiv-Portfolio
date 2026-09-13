import blogsData from "@/data/blogs.json";

/**
 * Get all blogs sorted by published date (newest first).
 */
export function getAllBlogs() {
  return [...blogsData].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Find a blog by its URL slug.
 */
export function getBlogBySlug(slug) {
  if (!slug) return null;
  return blogsData.find((b) => b.slug === slug) || null;
}

/**
 * Get featured blog (or the most recent blog if none explicitly featured).
 */
export function getFeaturedBlog() {
  const blogs = getAllBlogs();
  return blogs.find((b) => b.featured) || blogs[0] || null;
}

/**
 * Get related blogs (excluding current blog, prioritizing same category).
 */
export function getRelatedBlogs(currentSlug, limit = 2) {
  const current = getBlogBySlug(currentSlug);
  const others = getAllBlogs().filter((b) => b.slug !== currentSlug);

  if (!current) return others.slice(0, limit);

  // Sort by same category first, then by date
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
export function getAllCategories() {
  const categories = new Set(blogsData.map((b) => b.category));
  return ["All", ...Array.from(categories)];
}
