"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Check,
  Copy,
  Linkedin,
  Twitter,
  ChevronRight,
  BookOpen,
  Info,
  Lightbulb,
  AlertCircle,
  Code2,
  ArrowUpRight,
  Send,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function ArticleClient({ blog, relatedBlogs }) {
  const [copied, setCopied] = useState(false);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState("");

  // Reading Progress & Active Heading Tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Check which heading is currently in viewport
      if (blog.tableOfContents) {
        for (let i = blog.tableOfContents.length - 1; i >= 0; i--) {
          const item = blog.tableOfContents[i];
          const el = document.getElementById(item.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 160) {
              setActiveHeadingId(item.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog.tableOfContents]);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error("Failed to copy link", e);
    }
  };

  const handleCopyCode = async (codeText, idx) => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopiedCodeIdx(idx);
      setTimeout(() => setCopiedCodeIdx(null), 2000);
    } catch (e) {
      console.error("Failed to copy code", e);
    }
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      `Check out "${blog.title}" by Rajiv Sharma`
    );
    const url = encodeURIComponent(currentUrl);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out this article: "${blog.title}" by Rajiv Sharma - ${currentUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 min-h-screen overflow-hidden">
      {/* Background Soft Glow (matching Contact page) */}
      <div className="absolute top-44 sm:top-52 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-500 z-50 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      />

      <article className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-0 pt-6 sm:pt-8">
        {/* Breadcrumbs Navigation & Back Link Bar */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 flex-wrap min-w-0"
          >
            <Link
              href="/"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
            >
              Home
            </Link>
            <ChevronRight size={14} className="shrink-0 text-neutral-400 dark:text-neutral-600" />
            <Link
              href="/blogs"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
            >
              Blogs
            </Link>
            <ChevronRight size={14} className="shrink-0 text-neutral-400 dark:text-neutral-600" />
            <span className="text-neutral-800 dark:text-neutral-200 font-medium truncate max-w-[150px] sm:max-w-xs md:max-w-sm">
              {blog.title}
            </span>
          </nav>

          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group shrink-0 ml-auto"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to all articles</span>
          </Link>
        </div>

        {/* Article Header Hero */}
        <header className="mb-10 sm:mb-12">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-3.5 sm:mb-4">
            <span className="px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-800/60 text-xs">
              {blog.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              Published on{" "}
              {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {blog.readingTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white tracking-tight leading-tight sm:leading-tight mb-4 sm:mb-6">
            {blog.title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 sm:mb-8">
            {blog.description}
          </p>

          {/* Author & Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-6 py-5 border-y border-neutral-200 dark:border-neutral-800/80">
            {/* Author */}
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 shadow-sm">
                <Image
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                  {blog.author.name}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {blog.author.role} • Rajiv Sharma Portfolio
                </p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mr-1 hidden sm:inline">
                Share:
              </span>
              <button
                onClick={handleCopyLink}
                aria-label="Copy Article Link"
                className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-95 cursor-pointer"
                title={copied ? "Link Copied!" : "Copy Link"}
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
              <button
                onClick={shareOnLinkedIn}
                aria-label="Share on LinkedIn"
                className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-blue-600 hover:text-white transition-all active:scale-95 cursor-pointer"
                title="Share on LinkedIn"
              >
                <Linkedin size={16} />
              </button>
              <button
                onClick={shareOnTwitter}
                aria-label="Share on X Twitter"
                className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-black hover:text-white dark:hover:bg-neutral-700 transition-all active:scale-95 cursor-pointer"
                title="Share on X"
              >
                <Twitter size={16} />
              </button>
              <button
                onClick={shareOnWhatsApp}
                aria-label="Share on WhatsApp"
                className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-green-600 hover:text-white transition-all active:scale-95 cursor-pointer"
                title="Share on WhatsApp"
              >
                <FaWhatsapp size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Content Layout (Main Content + Sticky Sidebar) */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main Article Body */}
          <main className="lg:col-span-8 space-y-8 text-neutral-800 dark:text-neutral-200">
            {blog.content.map((block, idx) => {
              switch (block.type) {
                case "heading":
                  return (
                    <h2
                      key={idx}
                      id={block.id}
                      className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white pt-8 pb-2 tracking-tight border-b border-neutral-200/60 dark:border-neutral-800/80 scroll-mt-28"
                    >
                      {block.text}
                    </h2>
                  );

                case "paragraph":
                  return (
                    <p key={idx} className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {block.text}
                    </p>
                  );

                case "callout":
                  const toneColors = {
                    tip: "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200",
                    important: "bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200",
                    info: "bg-blue-500/10 border-blue-500/30 text-blue-800 dark:text-blue-200",
                  };
                  const Icon =
                    block.tone === "tip"
                      ? Lightbulb
                      : block.tone === "important"
                      ? AlertCircle
                      : Info;

                  return (
                    <aside
                      key={idx}
                      className={`p-5 sm:p-6 rounded-2xl border ${toneColors[block.tone] || toneColors.info} my-6 space-y-2`}
                    >
                      <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                        <Icon size={18} />
                        <span>{block.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                        {block.text}
                      </p>
                    </aside>
                  );

                case "list":
                  return (
                    <ul key={idx} className="space-y-3 my-4 pl-2">
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3">
                          <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mt-2.5 shrink-0" />
                          <span className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  );

                case "code":
                  return (
                    <div
                      key={idx}
                      className="my-6 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 text-neutral-200 shadow-xl"
                    >
                      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 text-xs text-neutral-400">
                        <div className="flex items-center gap-2">
                          <Code2 size={14} className="text-blue-400" />
                          <span className="font-mono">{block.filename || block.language}</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(block.code, idx)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition text-[11px] font-medium cursor-pointer"
                        >
                          {copiedCodeIdx === idx ? (
                            <>
                              <Check size={12} className="text-green-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-neutral-950">
                        <code>{block.code}</code>
                      </pre>
                    </div>
                  );

                case "table":
                  return (
                    <div key={idx} className="my-8 overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        {Array.isArray(block.headers) && block.headers.length > 0 && (
                          <thead className="bg-neutral-100/90 dark:bg-neutral-800/90 text-neutral-800 dark:text-neutral-200 uppercase text-xs font-bold tracking-wider border-b border-neutral-200 dark:border-neutral-800">
                            <tr>
                              {block.headers.map((header, hIdx) => (
                                <th key={hIdx} className="px-4 py-3.5 whitespace-nowrap">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                        )}
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900/40">
                          {Array.isArray(block.rows) &&
                            block.rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className="hover:bg-blue-50/40 dark:hover:bg-neutral-800/50 transition-colors"
                              >
                                {Array.isArray(row) &&
                                  row.map((cell, cIdx) => (
                                    <td
                                      key={cIdx}
                                      className="px-4 py-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300"
                                    >
                                      {cell}
                                    </td>
                                  ))}
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  );

                default:
                  return null;
              }
            })}

            {/* Tags Bottom Row */}
            <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-3">
                Article Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Profile Bio Card */}
            <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-blue-500 shrink-0">
                <Image
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                    Written by {blog.author.name}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    Author
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Software Developer specializing in React.js, Next.js, frontend architectures, REST API integration, and performance optimization. Constantly writing about production web engineering patterns.
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs sm:text-sm">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Connect with Rajiv</span>
                    <ArrowUpRight size={13} />
                  </Link>
                  <Link
                    href="https://github.com/rajivsharma25"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  >
                    GitHub
                  </Link>
                  <Link
                    href="https://linkedin.com/in/rajivsharma25"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-neutral-500 dark:text-neutral-400 hover:text-blue-500"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>
            </div>
          </main>

          {/* Sticky Sidebar: Table of Contents & Contact CTA */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-6">
              {/* Table of Contents */}
              {blog.tableOfContents && blog.tableOfContents.length > 0 && (
                <nav
                  aria-label="Table of Contents"
                  className="p-6 rounded-3xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 shadow-sm backdrop-blur-md"
                >
                  <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                    <BookOpen size={16} className="text-blue-500" />
                    <span>Table of Contents</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm">
                    {blog.tableOfContents.map((item) => {
                      const isActive = activeHeadingId === item.id;
                      return (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className={`block py-1 pl-2.5 border-l-2 transition-all ${
                              isActive
                                ? "border-blue-600 text-blue-600 dark:text-blue-400 font-semibold"
                                : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:border-neutral-300"
                            }`}
                          >
                            {item.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              )}

              {/* Hire Rajiv Banner */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold tracking-wider uppercase backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for Hire</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold leading-snug">
                  Need an experienced frontend engineer?
                </h4>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  I build high-performance React & Next.js web applications with seamless UX, clean code, and zero performance bottlenecks.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 px-4 rounded-full bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Send size={14} />
                  <span>Start a Conversation</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles Section (Boosts SEO & internal crawl depth) */}
        {relatedBlogs && relatedBlogs.length > 0 && (
          <section className="mt-20 pt-12 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
                  Related Technical Articles
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                  Continue reading about frontend engineering, architecture patterns, and web performance.
                </p>
              </div>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
              >
                <span>View all articles</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {relatedBlogs.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blogs/${rel.slug}`}
                  className="group flex flex-col justify-between h-full rounded-2xl sm:rounded-3xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800/80 p-5 sm:p-7 shadow-xs hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 backdrop-blur-md cursor-pointer"
                >
                  <div>
                    {/* Top Metadata */}
                    <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4">
                      <span className="text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                        {rel.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                        <Clock size={13} />
                        <span>{rel.readingTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-2 sm:mb-3">
                      {rel.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                      {rel.description}
                    </p>
                  </div>

                  {/* Bottom Footer */}
                  <div className="pt-3.5 sm:pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between mt-2">
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      {new Date(rel.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                      <span>Read Article</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
