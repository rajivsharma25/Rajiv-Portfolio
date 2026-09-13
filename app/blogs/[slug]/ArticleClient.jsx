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
    <div className="relative pt-24 sm:pt-28 pb-20">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-500 z-50 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      />

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-6 flex-wrap"
        >
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <ChevronRight size={14} />
          <Link
            href="/blogs"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Blogs
          </Link>
          <ChevronRight size={14} />
          <span className="text-neutral-800 dark:text-neutral-200 font-medium truncate max-w-[200px] sm:max-w-xs md:max-w-md">
            {blog.title}
          </span>
        </nav>

        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to all articles</span>
          </Link>
        </div>

        {/* Article Header Hero */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-800/60">
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

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight mb-6">
            {blog.title}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8">
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

        {/* Optional Cover Image Banner */}
        {blog.coverImage && (
          <div className="relative w-full h-64 sm:h-96 md:h-[460px] rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl mb-12">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              unoptimized={Boolean(blog.coverImage?.startsWith("data:"))}
              className="object-cover"
            />
          </div>
        )}

        {/* Content Layout (Main Content + Sticky Sidebar) */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main Article Body */}
          <main className="lg:col-span-8 space-y-7 text-neutral-800 dark:text-neutral-200 leading-relaxed text-base sm:text-lg">
            {blog.content.map((block, idx) => {
              switch (block.type) {
                case "heading":
                  return (
                    <h2
                      key={idx}
                      id={block.id}
                      className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white pt-8 pb-1 tracking-tight border-b border-neutral-200/60 dark:border-neutral-800/80 scroll-mt-28"
                    >
                      {block.text}
                    </h2>
                  );

                case "paragraph":
                  return (
                    <p key={idx} className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
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

                case "image":
                  return (
                    <figure key={idx} className="my-8 space-y-2.5">
                      <div className="relative w-full h-64 sm:h-80 md:h-[450px] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-lg">
                        <Image
                          src={block.url}
                          alt={block.alt || blog.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 850px"
                          unoptimized={Boolean(block.url?.startsWith("data:"))}
                          className="object-cover"
                        />
                      </div>
                      {block.caption && (
                        <figcaption className="text-center text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 italic">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );

                case "table":
                  return (
                    <div key={idx} className="my-8 overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        {Array.isArray(block.headers) && block.headers.length > 0 && (
                          <thead className="bg-neutral-100/90 dark:bg-neutral-800/90 text-neutral-800 dark:text-neutral-200 uppercase text-[11px] font-bold tracking-wider border-b border-neutral-200 dark:border-neutral-800">
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
                                      className="px-4 py-3 text-neutral-700 dark:text-neutral-300"
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
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    Author
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Software Developer specializing in React.js, Next.js, frontend architectures, REST API integration, and performance optimization. Constantly writing about production web engineering patterns.
                </p>
                <div className="pt-2 flex items-center gap-4">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Connect with Rajiv</span>
                    <ArrowUpRight size={13} />
                  </Link>
                  <Link
                    href="https://github.com/rajivsharma25"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  >
                    GitHub
                  </Link>
                  <Link
                    href="https://linkedin.com/in/rajivsharma25"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-blue-500"
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
              <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold tracking-wider uppercase">
                  Available for Hire
                </span>
                <h4 className="text-lg font-bold leading-snug">
                  Need an experienced frontend engineer?
                </h4>
                <p className="text-xs text-blue-100 leading-relaxed">
                  I build high-performance React & Next.js web applications with seamless UX, clean code, and zero performance bottlenecks.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  <Send size={13} />
                  <span>Start a Conversation</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles Section (Boosts SEO & internal crawl depth) */}
        {relatedBlogs && relatedBlogs.length > 0 && (
          <section className="mt-20 pt-12 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Related Technical Articles
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  Continue reading about frontend engineering and modern web development
                </p>
              </div>
              <Link
                href="/blogs"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>View all blogs</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {relatedBlogs.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blogs/${rel.slug}`}
                  className="group p-6 rounded-3xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 block"
                >
                  <div className="flex items-center justify-between gap-2 text-xs text-neutral-400 mb-3">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {rel.category}
                    </span>
                    <span>{rel.readingTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                    {rel.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {rel.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Read article</span>
                    <ArrowRight size={13} />
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
