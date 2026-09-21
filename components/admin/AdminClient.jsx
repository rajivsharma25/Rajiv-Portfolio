"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
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
  Table as TableIcon,
  Loader2,
  Upload,
  BookOpen,
  Download,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminClient() {
  const [adminKey, setAdminKey] = useState("");
  const [activeTab, setActiveTab] = useState("blogs"); // 'blogs' | 'resume'
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [keyInput, setKeyInput] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [authError, setAuthError] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentView, setCurrentView] = useState("list"); // 'list' | 'editor'
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  // Resume Management States
  const [resumeInfo, setResumeInfo] = useState(null);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeUploading, setResumeUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    tags: "",
    description: "",
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

  const fetchResumeInfo = async (key) => {
    const k = key || adminKey;
    if (!k) return;
    setResumeLoading(true);
    try {
      const res = await fetch("/api/admin/resume", {
        headers: { "x-admin-key": k },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResumeInfo(data.resume);
      }
    } catch (e) {
      console.error("Failed to fetch resume info:", e);
    } finally {
      setResumeLoading(false);
    }
  };

  const handleResumeFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Only PDF files (.pdf) are supported.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit.");
      return;
    }

    setResumeUploading(true);
    const toastId = toast.loading("Uploading resume PDF...");

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/admin/resume", {
        method: "POST",
        headers: { "x-admin-key": adminKey },
        body: fd,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload resume.");
      }

      toast.success(data.message || "Resume uploaded successfully!", { id: toastId });
      setResumeInfo(data.resume);
      window.dispatchEvent(new Event("resumeUpdated"));
    } catch (err) {
      toast.error(err.message || "Error uploading resume.", { id: toastId });
    } finally {
      setResumeUploading(false);
      e.target.value = "";
    }
  };

  const handleResumeDelete = async () => {
    if (!window.confirm("Are you sure you want to delete the active resume? The website header button will revert back to LinkedIn.")) {
      return;
    }

    const toastId = toast.loading("Deleting resume...");
    try {
      const res = await fetch("/api/admin/resume", {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete resume.");
      }

      toast.success("Resume deleted successfully.", { id: toastId });
      setResumeInfo(null);
      window.dispatchEvent(new Event("resumeUpdated"));
    } catch (err) {
      toast.error(err.message || "Error deleting resume.", { id: toastId });
    }
  };

  // Check sessionStorage on mount
  useEffect(() => {
    try {
      const savedKey = sessionStorage.getItem("portfolio_admin_key");
      if (savedKey) {
        setAdminKey(savedKey);
        fetchBlogs(savedKey);
        fetchResumeInfo(savedKey);
      }
    } catch (e) {
      console.error("Failed to read session storage:", e);
    } finally {
      setCheckingAuth(false);
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
        const msg = data.error || "Authentication failed. Incorrect key.";
        setAuthError(msg);
        toast.error(msg);
        setLoading(false);
        return;
      }

      sessionStorage.setItem("portfolio_admin_key", keyInput);
      setAdminKey(keyInput);
      fetchBlogs(keyInput);
      fetchResumeInfo(keyInput);
      toast.success("Welcome back Rajiv! Dashboard unlocked.");
    } catch {
      setAuthError("Failed to connect to authentication server.");
      toast.error("Failed to connect to authentication server.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("portfolio_admin_key");
    setAdminKey("");
    setKeyInput("");
    setBlogs([]);
    setResumeInfo(null);
    toast.info("Logged out of Admin Console.");
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
      featured: Boolean(blog.featured),
      content: Array.isArray(blog.content) && blog.content.length > 0 ? blog.content : [{ type: "paragraph", text: "" }],
    });
    setCurrentView("editor");
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("Please enter both an article title and summary description.");
      return;
    }

    setSaving(true);
    setStatusMessage(null);
    const toastId = toast.loading(editingBlogId ? "Updating article..." : "Publishing article...");

    try {
      const url = "/api/admin/blogs";
      const method = editingBlogId ? "PUT" : "POST";
      const payload = {
        ...formData,
        id: editingBlogId || undefined,
        tags: formData.tags
          ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [formData.category || "General"],
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

      const successMsg = editingBlogId
        ? "Article updated successfully!"
        : "New article published successfully!";
      setStatusMessage({
        type: "success",
        text: successMsg,
      });
      toast.success(successMsg, { id: toastId });

      await fetchBlogs(adminKey);
      setCurrentView("list");
      resetForm();

      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err) {
      const errorMsg = err.message || "Failed to save article.";
      setStatusMessage({ type: "error", text: errorMsg });
      toast.error(errorMsg, { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBlog = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    const toastId = toast.loading(`Deleting "${title}"...`);
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete blog.");
      }

      toast.success(`Deleted "${title}" successfully.`, { id: toastId });
      setStatusMessage({ type: "success", text: `Deleted "${title}" successfully.` });
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      toast.error(err.message || "Error deleting blog.", { id: toastId });
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

  // SKELETON LOADER SCREEN WHILE INITIALIZING / CHECKING AUTH
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
          {/* Top Bar Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
            <div className="space-y-2">
              <div className="h-7 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
              <div className="h-4 w-72 bg-neutral-100 dark:bg-neutral-800/60 rounded-lg" />
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-36 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
              <div className="h-10 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
              <div className="h-10 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
            </div>
          </div>

          {/* Search Box Skeleton */}
          <div className="h-11 w-full max-w-md bg-neutral-200 dark:bg-neutral-800 rounded-xl" />

          {/* Article List Skeleton Rows */}
          <div className="bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs divide-y divide-neutral-200 dark:divide-neutral-800">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                    <div className="h-4 w-28 bg-neutral-100 dark:bg-neutral-800/60 rounded-md" />
                  </div>
                  <div className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                  <div className="h-3.5 w-1/2 bg-neutral-100 dark:bg-neutral-800/60 rounded-md" />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                  <div className="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                  <div className="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!adminKey) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-neutral-950">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
              <Lock size={24} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
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
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 px-3.5 sm:px-6 lg:px-0 max-w-7xl mx-auto">
      {/* Top Admin Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Portfolio Admin Console
            </h1>
            {activeTab === "blogs" ? (
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold">
                {blogs.length} Articles
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                {resumeInfo ? "Resume Active" : "No Resume"}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {activeTab === "blogs"
              ? "Create, edit, and organize articles published on your portfolio."
              : "Manage your official resume PDF document displayed across your portfolio."}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {activeTab === "blogs" && (
            <>
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
            </>
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

      {/* Top Navigation Tabs: Blogs vs Resume */}
      <div className="flex items-center gap-2 mb-8 p-1.5 rounded-2xl bg-gray-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 w-fit">
        <button
          type="button"
          onClick={() => {
            setActiveTab("blogs");
            if (currentView !== "list" && currentView !== "editor" && currentView !== "preview") {
              setCurrentView("list");
            }
          }}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "blogs"
              ? "bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-xs"
              : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          }`}
        >
          <BookOpen size={16} />
          <span>Articles & Blogs</span>
          <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold">
            {blogs.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("resume")}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "resume"
              ? "bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-xs"
              : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          }`}
        >
          <FileText size={16} />
          <span>Resume PDF</span>
          {resumeInfo && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          )}
        </button>
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

      {/* TAB 1: ARTICLES & BLOGS */}
      {activeTab === "blogs" && (
        <>
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
                <div className="bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs divide-y divide-neutral-200 dark:divide-neutral-800 animate-pulse">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="min-w-0 flex-1 space-y-2.5">
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                          <div className="h-4 w-28 bg-neutral-100 dark:bg-neutral-800/60 rounded-md" />
                        </div>
                        <div className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                        <div className="h-3.5 w-1/2 bg-neutral-100 dark:bg-neutral-800/60 rounded-md" />
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                        <div className="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                        <div className="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                      </div>
                    </div>
                  ))}
                </div>
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
                          <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white truncate">
                            {blog.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
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
                              className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono"
                            />
                            <select
                              value={block.language || "javascript"}
                              onChange={(e) => updateBlock(idx, { language: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono"
                            >
                              <option value="javascript">JavaScript</option>
                              <option value="typescript">TypeScript</option>
                              <option value="html">HTML</option>
                              <option value="css">CSS / Tailwind</option>
                              <option value="python">Python</option>
                              <option value="bash">Bash / Shell</option>
                              <option value="json">JSON</option>
                              <option value="sql">SQL</option>
                            </select>
                          </div>
                          <textarea
                            rows={6}
                            value={block.code || ""}
                            onChange={(e) => updateBlock(idx, { code: e.target.value })}
                            placeholder="// Paste your formatted code snippet here..."
                            className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 font-mono text-xs focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}

                      {block.type === "list" && (
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400">
                            Bullet Points
                          </label>
                          {(block.items || [""]).map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-center gap-2">
                              <span className="text-neutral-400 text-xs">•</span>
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => {
                                  const nextItems = [...block.items];
                                  nextItems[itemIdx] = e.target.value;
                                  updateBlock(idx, { items: nextItems });
                                }}
                                placeholder="Bullet point text..."
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
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white tracking-tight leading-tight sm:leading-tight mb-4 sm:mb-6">
                  {formData.title || "Untitled Article"}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 sm:mb-8">
                  {formData.description || "Article summary description..."}
                </p>
              </div>

              <div className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                {formData.content.map((block, i) => {
                  switch (block.type) {
                    case "heading":
                      return (
                        <h2 key={i} className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white pt-8 pb-2 tracking-tight border-b border-neutral-200/60 dark:border-neutral-800/80">
                          {block.text || "Heading"}
                        </h2>
                      );
                    case "paragraph":
                      return (
                        <p key={i} className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {block.text}
                        </p>
                      );
                    case "table":
                      return (
                        <div key={i} className="my-6 overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
                          <table className="w-full text-left text-xs sm:text-sm border-collapse">
                            {Array.isArray(block.headers) && (
                              <thead className="bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-800 font-bold uppercase text-xs text-neutral-800 dark:text-neutral-200">
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
                                    <td key={ci} className="p-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">{cell}</td>
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
                          <p className="font-bold text-sm sm:text-base">{block.title}</p>
                          <p className="text-xs sm:text-sm">{block.text}</p>
                        </div>
                      );
                    case "code":
                      return (
                        <div key={i} className="rounded-xl overflow-hidden bg-neutral-950 text-neutral-200 p-4 font-mono text-xs sm:text-sm">
                          <p className="text-neutral-500 pb-2 border-b border-neutral-800 mb-2 text-xs">{block.filename || block.language}</p>
                          <pre>{block.code}</pre>
                        </div>
                      );
                    case "list":
                      return (
                        <ul key={i} className="space-y-2 list-disc pl-5 text-sm sm:text-base">
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
    </>
  )}

  {/* TAB 2: RESUME PDF */}
  {activeTab === "resume" && (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <FileText size={20} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                Curriculum Vitae / Resume
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              Manage your official resume PDF document displayed across your portfolio.
            </p>
          </div>

          {/* Status Pill */}
          <div className="flex items-center gap-2">
            {resumeInfo ? (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active Document</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-neutral-400" />
                <span>No Document Uploaded</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Details & Actions Card */}
      {resumeInfo ? (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">
                  File Name
                </span>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate" title={resumeInfo.filename}>
                  {resumeInfo.filename || "resume.pdf"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">
                  File Size
                </span>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {resumeInfo.size ? `${(resumeInfo.size / 1024).toFixed(1)} KB` : "Unknown"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">
                  Format
                </span>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                  PDF Document
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">
                  Last Updated
                </span>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {resumeInfo.updatedAt
                    ? new Date(resumeInfo.updatedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Recently"}
                </p>
              </div>
            </div>

            {/* Actions Toolbar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="/api/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 transition active:scale-95 cursor-pointer"
              >
                <ExternalLink size={15} />
                <span>View in New Tab</span>
              </a>

              <a
                href="/api/resume"
                download={resumeInfo.filename || "Rajiv_Sharma_Resume.pdf"}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm font-semibold transition cursor-pointer"
              >
                <Download size={15} />
                <span>Download PDF</span>
              </a>

              <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm font-semibold transition cursor-pointer">
                <Upload size={15} />
                <span>{resumeUploading ? "Replacing..." : "Replace PDF"}</span>
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleResumeFileSelect}
                  disabled={resumeUploading}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={handleResumeDelete}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white text-xs sm:text-sm font-semibold transition cursor-pointer ml-auto"
              >
                <Trash2 size={15} />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Live Preview Embed */}
          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-xs">
            <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-blue-500" />
                <span className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
                  Live Document Preview
                </span>
              </div>
              <a
                href="/api/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Full Screen</span>
                <ExternalLink size={13} />
              </a>
            </div>
            <iframe
              src="/api/resume"
              title="Curriculum Vitae Preview"
              className="w-full h-[600px] sm:h-[750px] border-0 bg-neutral-100 dark:bg-neutral-950"
            />
          </div>
        </div>
      ) : (
        /* Upload Dropzone when no resume exists */
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-neutral-900 border-2 border-dashed border-neutral-200 dark:border-neutral-800 text-center flex flex-col items-center justify-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Upload size={28} />
          </div>
          <div className="space-y-1 max-w-md">
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              Upload Resume PDF
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              Select your latest CV / Resume document in PDF format (maximum file size 10MB).
            </p>
          </div>

          <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition active:scale-95 cursor-pointer">
            {resumeUploading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload size={16} />
                <span>Select PDF Document</span>
              </>
            )}
            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleResumeFileSelect}
              disabled={resumeUploading}
              className="hidden"
            />
          </label>

          <span className="text-[11px] text-neutral-600 dark:text-neutral-400">
            Supported format: .pdf (Adobe Acrobat Document)
          </span>
        </div>
      )}
    </div>
  )}
</div>
);
}
