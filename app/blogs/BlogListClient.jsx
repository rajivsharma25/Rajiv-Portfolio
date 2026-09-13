"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Send,
} from "lucide-react";

export default function BlogListClient({ blogs, categories }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  const featuredBlog = useMemo(() => {
    return blogs.find((b) => b.featured) || blogs[0];
  }, [blogs]);

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-semibold mb-4">
          <BookOpen size={14} className="animate-pulse" />
          <span>Engineering & Architecture Insights</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Articles, Guides & <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">Frontend Deep Dives</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          In-depth technical writeups on React 19, Next.js 15, Core Web Vitals optimization, state management, and modern software engineering best practices by Rajiv Sharma.
        </p>

        {/* Search & Category Filter Toolbar */}
        <div className="mt-8 space-y-4">
          {/* Search Box */}
          <div className="relative max-w-xl mx-auto">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, keyword, or tag (e.g. Next.js, Redux)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 shadow-sm transition-all text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105"
                      : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-800 hover:border-blue-400 dark:hover:border-neutral-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Blog Highlight (Shown when no search query and 'All' category selected) */}
      {!searchQuery && selectedCategory === "All" && featuredBlog && (
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-amber-500" />
            <h2 className="text-sm uppercase tracking-wider font-bold text-neutral-500 dark:text-neutral-400">
              Featured Insight
            </h2>
          </div>

          <Link
            href={`/blogs/${featuredBlog.slug}`}
            className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50/90 via-white/95 to-indigo-50/80 dark:from-blue-950/30 dark:via-neutral-900/70 dark:to-indigo-950/40 border border-blue-200/80 dark:border-blue-500/30 p-6 sm:p-8 md:p-10 shadow-lg shadow-blue-500/5 dark:shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer"
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 dark:group-hover:bg-blue-600/30 transition-all duration-500" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-semibold text-xs shadow-xs">
                  {featuredBlog.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {new Date(featuredBlog.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {featuredBlog.readingTime}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight mb-4">
                {featuredBlog.title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed line-clamp-3">
                {featuredBlog.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/80">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
                    <Image
                      src={featuredBlog.author.avatar}
                      alt={featuredBlog.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900 dark:text-white">
                      {featuredBlog.author.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {featuredBlog.author.role}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 group-hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/20 transition-all duration-300 group-hover:gap-3">
                  <span>Read Article</span>
                  <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Blog Cards Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
            {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
          </h2>
          <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
            Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-neutral-900/50 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <BookOpen size={40} className="mx-auto text-neutral-400 mb-3" />
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              No matching articles found
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm mx-auto">
              We couldn't find any articles matching &ldquo;{searchQuery}&rdquo;. Try another search keyword or switch category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredBlogs.map((blog) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={blog.id}
                  className="h-full"
                >
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="group flex flex-col justify-between h-full rounded-3xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800/80 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 backdrop-blur-md cursor-pointer"
                  >
                    <div>
                      {/* Top Metadata */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                          {blog.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                          <Clock size={13} />
                          <span>{blog.readingTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-3">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed mb-4">
                        {blog.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Footer */}
                    <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                      <span className="text-xs text-neutral-400 dark:text-neutral-500">
                        {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>

                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                        <span>Read More</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Footer CTA Banner */}
      <div className="mt-16 sm:mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-radial from-white/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Looking for a Software Developer to Build Scalable Web Apps?
          </h3>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6">
            I specialize in React, Next.js, frontend architectures, REST API integration, and performance optimization. Let&apos;s build something impactful together.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-blue-600 hover:bg-blue-50 font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <Send size={15} />
              <span>Get In Touch</span>
            </Link>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-700/50 hover:bg-blue-700 border border-white/30 text-white font-semibold text-sm transition-all active:scale-95"
            >
              <span>View Portfolio Projects</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
