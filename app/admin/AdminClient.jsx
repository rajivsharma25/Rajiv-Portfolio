"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  ArrowLeft,
  Check,
  Code2,
  AlertCircle,
  Lightbulb,
  List,
  Heading2,
  AlignLeft,
  Save,
  Search,
  LogOut,
  FileText,
  ChevronUp,
  ChevronDown,
  Image as ImageIcon,
  Table as TableIcon,
  Upload,
  Loader2,
} from "lucide-react";

export default function AdminClient() {
  const [adminKey, setAdminKey] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [authError, setAuthError] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("list"); // 'list' | 'editor' | 'preview'
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    tags: "",
    description: "",
    coverImage: "",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "",
      },
    ],
  });

  const existingCategories = useMemo(() => {
    const list = blogs.map((b) => b.category).filter(Boolean);
    return Array.from(new Set(list));
  }, [blogs]);

  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingBlockIdx, setUploadingBlockIdx] = useState(null);

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: {
        "x-admin-key": adminKey,
      },
      body: data,
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to upload image");
    }
    return json.url;
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const url = await uploadFile(file);
      setFormData((prev) => ({ ...prev, coverImage: url }));
    } catch (err) {
      alert("Error uploading image: " + err.message);
    } finally {
      setUploadingCover(false);
      e.target.value = "";
    }
  };

  const handleBlockImageUpload = async (file, blockIdx) => {
    if (!file) return;
    setUploadingBlockIdx(blockIdx);
    try {
      const url = await uploadFile(file);
      updateBlock(blockIdx, { url });
    } catch (err) {
      alert("Error uploading image: " + err.message);
    } finally {
      setUploadingBlockIdx(null);
    }
  };

  // Check sessionStorage on mount
  useEffect(() => {
    const savedKey = sessionStorage.getItem("portfolio_admin_key");
    if (savedKey) {
      setAdminKey(savedKey);
      fetchBlogs(savedKey);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: keyInput }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setAuthError(data.error || "Authentication failed. Incorrect key.");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("portfolio_admin_key", keyInput);
      setAdminKey(keyInput);
      fetchBlogs(keyInput);
    } catch (err) {
      setAuthError("Failed to connect to authentication server.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("portfolio_admin_key");
    setAdminKey("");
    setKeyInput("");
    setBlogs([]);
  };

  const fetchBlogs = async (key) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs", {
        headers: { "x-admin-key": key || adminKey },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-slugify
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug === "" || prev.slug === generateSlug(prev.title) ? slug : prev.slug,
    }));
  };

  const generateSlug = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // Content Block Handlers
  const addBlock = (type) => {
    let newBlock;
    switch (type) {
      case "heading":
        newBlock = { type: "heading", level: 2, text: "", id: "" };
        break;
      case "paragraph":
        newBlock = { type: "paragraph", text: "" };
        break;
      case "callout":
        newBlock = {
          type: "callout",
          tone: "tip",
          title: "Pro Tip",
          text: "",
        };
        break;
      case "code":
        newBlock = {
          type: "code",
          language: "javascript",
          filename: "example.js",
          code: "",
        };
        break;
      case "list":
        newBlock = {
          type: "list",
          items: [""],
        };
        break;
      case "image":
        newBlock = {
          type: "image",
          url: "",
          alt: "",
          caption: "",
        };
        break;
      case "table":
        newBlock = {
          type: "table",
          headers: ["Feature / Metric", "Description", "Status / Notes"],
          rows: [
            ["Option A", "High performance architecture", "Recommended"],
            ["Option B", "Standard implementation", "Alternative"],
          ],
        };
        break;
      default:
        newBlock = { type: "paragraph", text: "" };
    }

    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, newBlock],
    }));
  };

  const updateBlock = (index, updated) => {
    setFormData((prev) => {
      const nextContent = [...prev.content];
      nextContent[index] = { ...nextContent[index], ...updated };
      return { ...prev, content: nextContent };
    });
  };

  const removeBlock = (index) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  const moveBlock = (index, direction) => {
    setFormData((prev) => {
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.content.length) return prev;
      const nextContent = [...prev.content];
      const temp = nextContent[index];
      nextContent[index] = nextContent[newIndex];
      nextContent[newIndex] = temp;
      return { ...prev, content: nextContent };
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      category: "",
      tags: "",
      description: "",
      coverImage: "",
      featured: false,
      content: [{ type: "paragraph", text: "" }],
    });
    setEditingBlogId(null);
  };

  const openEditorForNew = () => {
    resetForm();
    setCurrentView("editor");
  };

  const openEditorForEdit = (blog) => {
    setEditingBlogId(blog.id);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      category: blog.category || "",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
      description: blog.description || "",
      coverImage: blog.coverImage || "",
      featured: Boolean(blog.featured),
      content: Array.isArray(blog.content) && blog.content.length > 0 ? blog.content : [{ type: "paragraph", text: "" }],
    });
    setCurrentView("editor");
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert("Please enter a title and description.");
      return;
    }

    setSaving(true);
    setStatusMessage(null);

    try {
      const url = "/api/admin/blogs";
      const method = editingBlogId ? "PUT" : "POST";
      const payload = {
        ...formData,
        id: editingBlogId || undefined,
        tags: formData.tags
          ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [formData.category],
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to save blog.");
      }

      setStatusMessage({
        type: "success",
        text: editingBlogId ? "Blog updated successfully!" : "New blog published successfully!",
      });

      await fetchBlogs(adminKey);
      setCurrentView("list");
      resetForm();

      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err) {
      setStatusMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBlog = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to delete blog.");
        return;
      }

      setStatusMessage({ type: "success", text: `Deleted "${title}" successfully.` });
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      alert("Error deleting blog: " + err.message);
    }
  };

  const filteredBlogs = useMemo(() => {
    if (!searchQuery) return blogs;
    const q = searchQuery.toLowerCase();
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        (Array.isArray(b.tags) && b.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }, [blogs, searchQuery]);

  // LOGIN SCREEN
  if (!adminKey) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-neutral-950">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
              <Lock size={24} />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Portfolio Admin Console
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Enter your admin secret key to manage articles and blog content.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle size={15} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                Admin Secret Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="Enter ADMIN_SECRET_KEY..."
                  required
                  className="w-full pl-4 pr-10 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
                >
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              <KeyRound size={16} />
              <span>{loading ? "Verifying..." : "Unlock Dashboard"}</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-blue-500 transition-colors group"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to public blogs</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // MAIN ADMIN DASHBOARD
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Admin Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
              Blog Admin Console
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold">
              {blogs.length} Articles
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Create, edit, and organize articles published on your portfolio.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {currentView !== "list" ? (
            <button
              onClick={() => {
                setCurrentView("list");
                resetForm();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition cursor-pointer"
            >
              <ArrowLeft size={15} />
              <span>Articles List</span>
            </button>
          ) : (
            <button
              onClick={openEditorForNew}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 transition active:scale-95 cursor-pointer"
            >
              <Plus size={16} />
              <span>Create New Article</span>
            </button>
          )}

          <Link
            href="/blogs"
            target="_blank"
            className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            title="View Public Blogs"
          >
            <ExternalLink size={16} />
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-red-600 transition cursor-pointer"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Toast / Status Alert */}
      {statusMessage && (
        <div
          className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${
            statusMessage.type === "success"
              ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
              : "bg-red-500/15 border border-red-500/30 text-red-700 dark:text-red-300"
          }`}
        >
          {statusMessage.type === "success" ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* VIEW: ARTICLES LIST */}
      {currentView === "list" && (
        <div className="space-y-6">
          {/* Search Box */}
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title or category..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loading ? (
            <div className="text-center py-16 text-neutral-400 text-sm">Loading articles...</div>
          ) : (
            <div className="bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 transition"
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                          {blog.category}
                        </span>
                        {blog.featured && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            Featured
                          </span>
                        )}
                        <span className="text-xs text-neutral-400">
                          {blog.publishedAt} • {blog.readingTime}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-white truncate">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                        {blog.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 text-xs font-medium flex items-center gap-1"
                        title="View Live"
                      >
                        <ExternalLink size={14} />
                      </Link>

                      <button
                        onClick={() => openEditorForEdit(blog)}
                        className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 text-xs font-medium flex items-center gap-1 cursor-pointer"
                        title="Edit Article"
                      >
                        <Edit3 size={14} />
                      </button>

                      <button
                        onClick={() => handleDeleteBlog(blog.id, blog.title)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white transition text-xs font-medium flex items-center gap-1 cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW: EDITOR & PREVIEW */}
      {currentView !== "list" && (
        <div className="space-y-8">
          {/* Sub-Tabs: Edit vs Live Preview */}
          <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
            <button
              onClick={() => setCurrentView("editor")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                currentView === "editor"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              Editor & Content Blocks
            </button>
            <button
              onClick={() => setCurrentView("preview")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                currentView === "preview"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              Live Article Preview
            </button>
          </div>

          {currentView === "editor" ? (
            <form onSubmit={handleSaveBlog} className="space-y-8">
              {/* Basic Article Info Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-5">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <FileText size={18} className="text-blue-500" />
                  <span>Article Metadata</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={handleTitleChange}
                      placeholder="e.g. Mastering Next.js 15 Server Components"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="e.g. mastering-nextjs-15-server-components"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm font-mono focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      Category *
                    </label>
                    <input
                      type="text"
                      required
                      list="category-suggestions"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. Technology, Career, Lifestyle, Travel..."
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <datalist id="category-suggestions">
                      {existingCategories.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="e.g. Next.js, React 19, Performance, Web Development"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      Summary / Meta Description *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="A short, compelling summary for SEO and listing cards..."
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
                      <span>Cover Image (Upload from Computer or URL)</span>
                      {formData.coverImage && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, coverImage: "" })}
                          className="text-[11px] text-red-500 hover:underline cursor-pointer"
                        >
                          Remove Image
                        </button>
                      )}
                    </label>

                    {/* Upload button & URL input */}
                    <div className="grid sm:grid-cols-2 gap-3 items-center">
                      <label className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 bg-neutral-50 dark:bg-neutral-800/60 cursor-pointer transition group">
                        {uploadingCover ? (
                          <>
                            <Loader2 size={16} className="animate-spin text-blue-600" />
                            <span className="text-xs font-semibold text-blue-600">Uploading cover...</span>
                          </>
                        ) : (
                          <>
                            <Upload size={16} className="text-neutral-500 group-hover:text-blue-500 transition-colors" />
                            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              Upload Image File
                            </span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingCover}
                          onChange={handleCoverUpload}
                        />
                      </label>

                      <input
                        type="url"
                        value={formData.coverImage || ""}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                        placeholder="Or paste image URL (e.g. /profile.webp)..."
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {formData.coverImage && (
                      <div className="mt-2 relative w-full h-44 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={formData.coverImage}
                          alt="Cover preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 md:col-span-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <label htmlFor="featured" className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 cursor-pointer">
                      Mark as Featured Article (pinned to top of /blogs)
                    </label>
                  </div>
                </div>
              </div>

              {/* Dynamic Content Block Builder */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <span>Article Content Blocks</span>
                    <span className="text-xs text-neutral-400 font-normal">
                      ({formData.content.length} blocks)
                    </span>
                  </h2>

                  {/* Add Block Toolbar */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => addBlock("paragraph")}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      <AlignLeft size={13} />
                      <span>+ Paragraph</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock("heading")}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      <Heading2 size={13} />
                      <span>+ Heading</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock("callout")}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      <Lightbulb size={13} />
                      <span>+ Callout</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock("code")}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      <Code2 size={13} />
                      <span>+ Code Block</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock("list")}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      <List size={13} />
                      <span>+ Bullet List</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock("image")}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      <ImageIcon size={13} />
                      <span>+ Image</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock("table")}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      <TableIcon size={13} />
                      <span>+ Table</span>
                    </button>
                  </div>
                </div>

                {/* Content Block List */}
                <div className="space-y-4">
                  {formData.content.map((block, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs relative group/block space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            Block #{idx + 1}: {block.type}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveBlock(idx, "up")}
                            className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                            title="Move Up"
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            type="button"
                            disabled={idx === formData.content.length - 1}
                            onClick={() => moveBlock(idx, "down")}
                            className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                            title="Move Down"
                          >
                            <ChevronDown size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeBlock(idx)}
                            className="p-1 rounded text-red-500 hover:bg-red-500/10 ml-2 cursor-pointer"
                            title="Delete Block"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Block Specific Editors */}
                      {block.type === "paragraph" && (
                        <textarea
                          rows={4}
                          value={block.text || ""}
                          onChange={(e) => updateBlock(idx, { text: e.target.value })}
                          placeholder="Write paragraph content here..."
                          className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      )}

                      {block.type === "heading" && (
                        <div className="grid grid-cols-4 gap-3">
                          <div className="col-span-3">
                            <input
                              type="text"
                              value={block.text || ""}
                              onChange={(e) => updateBlock(idx, { text: e.target.value, id: generateSlug(e.target.value) })}
                              placeholder="Heading Title (automatically adds to Table of Contents)..."
                              className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm font-bold focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <select
                              value={block.level || 2}
                              onChange={(e) => updateBlock(idx, { level: Number(e.target.value) })}
                              className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                            >
                              <option value={2}>H2 Subtitle</option>
                              <option value={3}>H3 Section</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {block.type === "callout" && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <select
                                value={block.tone || "tip"}
                                onChange={(e) => updateBlock(idx, { tone: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs"
                              >
                                <option value="tip">Tip (Green)</option>
                                <option value="important">Important (Amber)</option>
                                <option value="info">Info (Blue)</option>
                              </select>
                            </div>
                            <div className="col-span-2">
                              <input
                                type="text"
                                value={block.title || ""}
                                onChange={(e) => updateBlock(idx, { title: e.target.value })}
                                placeholder="Callout Header Title..."
                                className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold"
                              />
                            </div>
                          </div>
                          <textarea
                            rows={2}
                            value={block.text || ""}
                            onChange={(e) => updateBlock(idx, { text: e.target.value })}
                            placeholder="Callout body text..."
                            className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs"
                          />
                        </div>
                      )}

                      {block.type === "code" && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={block.filename || ""}
                              onChange={(e) => updateBlock(idx, { filename: e.target.value })}
                              placeholder="Filename (e.g. app/page.jsx)..."
                              className="w-full px-3 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono"
                            />
                            <select
                              value={block.language || "javascript"}
                              onChange={(e) => updateBlock(idx, { language: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono"
                            >
                              <option value="javascript">JavaScript</option>
                              <option value="jsx">JSX</option>
                              <option value="typescript">TypeScript</option>
                              <option value="tsx">TSX</option>
                              <option value="css">CSS</option>
                              <option value="bash">Bash / Terminal</option>
                              <option value="json">JSON</option>
                              <option value="python">Python</option>
                            </select>
                          </div>
                          <textarea
                            rows={5}
                            value={block.code || ""}
                            onChange={(e) => updateBlock(idx, { code: e.target.value })}
                            placeholder="// Paste or write source code here..."
                            className="w-full p-3 rounded-xl bg-neutral-950 text-neutral-200 border border-neutral-800 text-xs font-mono focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}

                      {block.type === "list" && (
                        <div className="space-y-2">
                          {(block.items || []).map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => {
                                  const nextItems = [...(block.items || [])];
                                  nextItems[itemIdx] = e.target.value;
                                  updateBlock(idx, { items: nextItems });
                                }}
                                placeholder={`Bullet point item #${itemIdx + 1}...`}
                                className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const nextItems = block.items.filter((_, i) => i !== itemIdx);
                                  updateBlock(idx, { items: nextItems });
                                }}
                                className="p-1 text-red-500 hover:bg-red-500/10 rounded cursor-pointer"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => updateBlock(idx, { items: [...(block.items || []), ""] })}
                            className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline pt-1 cursor-pointer"
                          >
                            + Add Bullet Item
                          </button>
                        </div>
                      )}

                      {block.type === "image" && (
                        <div className="space-y-3">
                          {/* Upload File or URL */}
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400">
                              Image File (Upload from Computer or URL) *
                            </label>
                            <div className="grid sm:grid-cols-2 gap-3 items-center">
                              <label className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-blue-500 bg-neutral-50 dark:bg-neutral-800/60 cursor-pointer transition group">
                                {uploadingBlockIdx === idx ? (
                                  <>
                                    <Loader2 size={14} className="animate-spin text-blue-600" />
                                    <span className="text-xs font-semibold text-blue-600">Uploading...</span>
                                  </>
                                ) : (
                                  <>
                                    <Upload size={14} className="text-neutral-500 group-hover:text-blue-500" />
                                    <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-blue-600">
                                      Upload Image File
                                    </span>
                                  </>
                                )}
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  disabled={uploadingBlockIdx === idx}
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleBlockImageUpload(file, idx);
                                    e.target.value = "";
                                  }}
                                />
                              </label>

                              <input
                                type="url"
                                value={block.url || ""}
                                onChange={(e) => updateBlock(idx, { url: e.target.value })}
                                placeholder="Or paste image URL here..."
                                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400">
                              Alt Text (Accessibility & SEO)
                            </label>
                            <input
                              type="text"
                              value={block.alt || ""}
                              onChange={(e) => updateBlock(idx, { alt: e.target.value })}
                              placeholder="Describe the image..."
                              className="w-full px-3 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400">
                              Caption (Optional)
                            </label>
                            <input
                              type="text"
                              value={block.caption || ""}
                              onChange={(e) => updateBlock(idx, { caption: e.target.value })}
                              placeholder="e.g. Figure 1. System architecture breakdown"
                              className="w-full px-3 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs"
                            />
                          </div>

                          {block.url && (
                            <div className="relative w-full max-h-56 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={block.url}
                                alt={block.alt || "Preview"}
                                className="max-h-56 w-auto object-contain rounded-xl"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {block.type === "table" && (
                        <div className="space-y-3">
                          {/* Table Controls */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                            <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
                              Table Grid ({block.headers?.length || 0} Columns × {block.rows?.length || 0} Rows)
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  const currentHeaders = block.headers || ["Col 1"];
                                  const newHeaderName = `Column ${currentHeaders.length + 1}`;
                                  const nextHeaders = [...currentHeaders, newHeaderName];
                                  const nextRows = (block.rows || []).map((row) => [...row, ""]);
                                  updateBlock(idx, { headers: nextHeaders, rows: nextRows });
                                }}
                                className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-xs font-semibold text-neutral-700 dark:text-neutral-300 cursor-pointer"
                              >
                                + Add Column
                              </button>
                              {block.headers?.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextHeaders = block.headers.slice(0, -1);
                                    const nextRows = (block.rows || []).map((row) => row.slice(0, -1));
                                    updateBlock(idx, { headers: nextHeaders, rows: nextRows });
                                  }}
                                  className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-xs font-semibold text-neutral-500 cursor-pointer"
                                >
                                  - Remove Column
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  const colCount = (block.headers || []).length || 2;
                                  const newRow = new Array(colCount).fill("");
                                  updateBlock(idx, { rows: [...(block.rows || []), newRow] });
                                }}
                                className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-xs font-semibold cursor-pointer"
                              >
                                + Add Row
                              </button>
                            </div>
                          </div>

                          {/* Interactive Table Matrix */}
                          <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-700">
                            <table className="w-full text-xs">
                              <thead className="bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                                <tr>
                                  <th className="p-2 w-8 text-neutral-400 font-mono text-center">#</th>
                                  {(block.headers || []).map((header, hIdx) => (
                                    <th key={hIdx} className="p-1.5">
                                      <input
                                        type="text"
                                        value={header}
                                        onChange={(e) => {
                                          const nextHeaders = [...block.headers];
                                          nextHeaders[hIdx] = e.target.value;
                                          updateBlock(idx, { headers: nextHeaders });
                                        }}
                                        placeholder={`Header ${hIdx + 1}`}
                                        className="w-full px-2 py-1 rounded bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 font-bold text-xs"
                                      />
                                    </th>
                                  ))}
                                  <th className="p-2 w-8"></th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700 bg-white dark:bg-neutral-900/50">
                                {(block.rows || []).map((row, rIdx) => (
                                  <tr key={rIdx}>
                                    <td className="p-2 text-center text-neutral-400 font-mono text-[11px]">
                                      {rIdx + 1}
                                    </td>
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="p-1.5">
                                        <input
                                          type="text"
                                          value={cell}
                                          onChange={(e) => {
                                            const nextRows = block.rows.map((r, ri) =>
                                              ri === rIdx ? r.map((c, ci) => (ci === cIdx ? e.target.value : c)) : r
                                            );
                                            updateBlock(idx, { rows: nextRows });
                                          }}
                                          placeholder={`Row ${rIdx + 1}, Col ${cIdx + 1}`}
                                          className="w-full px-2 py-1 rounded bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs"
                                        />
                                      </td>
                                    ))}
                                    <td className="p-2 text-center">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const nextRows = block.rows.filter((_, ri) => ri !== rIdx);
                                          updateBlock(idx, { rows: nextRows });
                                        }}
                                        className="p-1 text-red-500 hover:bg-red-500/10 rounded cursor-pointer"
                                        title="Delete row"
                                      >
                                        <Trash2 size={13} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView("list");
                    resetForm();
                  }}
                  className="px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <Save size={16} />
                  <span>{saving ? "Publishing..." : editingBlogId ? "Save Changes" : "Publish Article"}</span>
                </button>
              </div>
            </form>
          ) : (
            /* LIVE PREVIEW MODE */
            <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-8">
              <div>
                <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                  {formData.category}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mt-4 mb-3">
                  {formData.title || "Untitled Article"}
                </h1>
                <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                  {formData.description || "Article summary description..."}
                </p>
                {formData.coverImage && (
                  <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 mb-6">
                    <Image
                      src={formData.coverImage}
                      alt="Cover Preview"
                      fill
                      sizes="(max-width: 768px) 100vw, 850px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                {formData.content.map((block, i) => {
                  switch (block.type) {
                    case "heading":
                      return (
                        <h2 key={i} className="text-2xl font-bold text-neutral-900 dark:text-white pt-4 border-b pb-2">
                          {block.text || "Heading"}
                        </h2>
                      );
                    case "paragraph":
                      return (
                        <p key={i} className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {block.text}
                        </p>
                      );
                    case "image":
                      return (
                        <figure key={i} className="space-y-2 my-4">
                          <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
                            <Image
                              src={block.url || "/profile.webp"}
                              alt={block.alt || "Article graphic"}
                              fill
                              sizes="(max-width: 768px) 100vw, 850px"
                              className="object-cover"
                            />
                          </div>
                          {block.caption && (
                            <figcaption className="text-center text-xs text-neutral-400 italic">
                              {block.caption}
                            </figcaption>
                          )}
                        </figure>
                      );
                    case "table":
                      return (
                        <div key={i} className="my-6 overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
                          <table className="w-full text-left text-xs border-collapse">
                            {Array.isArray(block.headers) && (
                              <thead className="bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-800 font-bold uppercase text-[11px] text-neutral-800 dark:text-neutral-200">
                                <tr>
                                  {block.headers.map((h, hi) => (
                                    <th key={hi} className="p-3">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                            )}
                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                              {(block.rows || []).map((row, ri) => (
                                <tr key={ri} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                                  {row.map((cell, ci) => (
                                    <td key={ci} className="p-3 text-neutral-700 dark:text-neutral-300">{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    case "callout":
                      return (
                        <div key={i} className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-800 dark:text-blue-200 space-y-1">
                          <p className="font-bold text-sm">{block.title}</p>
                          <p className="text-xs">{block.text}</p>
                        </div>
                      );
                    case "code":
                      return (
                        <div key={i} className="rounded-xl overflow-hidden bg-neutral-950 text-neutral-200 p-4 font-mono text-xs">
                          <p className="text-neutral-500 pb-2 border-b border-neutral-800 mb-2">{block.filename || block.language}</p>
                          <pre>{block.code}</pre>
                        </div>
                      );
                    case "list":
                      return (
                        <ul key={i} className="space-y-2 list-disc pl-5 text-sm">
                          {(block.items || []).map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      );
                    default:
                      return null;
                  }
                })}
              </div>

              <div className="pt-6 border-t flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentView("editor")}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
                >
                  Return to Editor
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
