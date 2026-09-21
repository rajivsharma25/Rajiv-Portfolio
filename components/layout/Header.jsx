"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Linkedin,
  Moon,
  Sun,
  Briefcase,
  BookOpen,
  Send,
  ChevronRight,
  Github,
  FileText,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasResume, setHasResume] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkResume = async () => {
      try {
        const res = await fetch("/api/resume/status");
        if (res.ok) {
          const data = await res.json();
          setHasResume(!!data.hasResume);
        }
      } catch (e) {
        // Silently maintain default
      }
    };

    checkResume();
    window.addEventListener("resumeUpdated", checkResume);
    return () => window.removeEventListener("resumeUpdated", checkResume);
  }, []);

  const navItems = [
    {
      key: "portfolio",
      name: "Portfolio",
      href: "/",
      icon: Briefcase,
      desc: "Projects, skills & career highlights",
    },
    {
      key: "blogs",
      name: "Blogs",
      href: "/blogs",
      icon: BookOpen,
      desc: "Technical articles, guides & insights",
    },
    {
      key: "contact",
      name: "Contact",
      href: "/contact",
      icon: Send,
      desc: "Get in touch & discuss opportunities",
    },
  ];

  const isItemActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href === "/blogs") return pathname.startsWith("/blogs");
    if (href === "/contact") return pathname === "/contact";
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
      <nav className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-2 sm:gap-4 py-2.5 sm:py-3 md:py-4">
          <Link
            href="/"
            className={`shrink-0 inline-flex items-center justify-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border transition-all duration-300 ${
              isScrolled
                ? "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-gray-200/70 dark:border-neutral-800/80 shadow-xs"
                : "bg-transparent border-transparent shadow-none"
            }`}
          >
            <Image
              src="/logo.webp"
              alt="Rajiv Sharma Logo"
              width={200}
              height={60}
              className="h-auto w-[85px] sm:w-[95px] dark:invert-100"
              priority
            />
          </Link>

          {/* Desktop Navigation - 3 Core Pages Pill */}
          <div className="hidden sm:flex items-center gap-1.5 p-1.5 bg-gray-100/80 dark:bg-neutral-900/80 backdrop-blur-md border border-gray-200/70 dark:border-neutral-800/80 rounded-full shadow-inner">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = isItemActive(item.href);

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors duration-200 z-10 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-gray-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeHeaderPill"
                      className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-full shadow-xs -z-10"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <IconComponent
                    size={15}
                    className={isActive ? "text-blue-600 dark:text-blue-400" : "opacity-60"}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Toggle */}
            <div className="relative group">
              <button
                onClick={() => {
                  const isDark =
                    typeof document !== "undefined" &&
                    document.documentElement.classList.contains("dark");
                  setTheme(isDark ? "light" : "dark");
                }}
                className="p-2.5 rounded-full text-gray-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md hover:bg-white dark:hover:bg-neutral-800 border border-gray-200/70 dark:border-neutral-800/80 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center w-10 h-10 shadow-xs"
                aria-label="Toggle Theme"
              >
                <Sun
                  size={19}
                  className="hidden dark:block text-amber-400 dark:text-yellow-300 transition-transform duration-200 group-hover:rotate-45"
                />
                <Moon
                  size={19}
                  className="block dark:hidden text-gray-700 transition-transform duration-200 group-hover:-rotate-12"
                />
              </button>
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gray-800 dark:bg-neutral-800 text-white text-[10px] font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-sm">
                <span className="hidden dark:inline">Light Mode</span>
                <span className="inline dark:hidden">Dark Mode</span>
              </span>
            </div>

            {/* Desktop CTA: Resume (if uploaded) or LinkedIn */}
            {hasResume ? (
              <a
                href="/api/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer"
              >
                <FileText size={16} />
                <span>Resume</span>
              </a>
            ) : (
              <Link
                href="https://linkedin.com/in/rajivsharma25"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-blue-600/80 dark:border-blue-500/80 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </Link>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="sm:hidden flex items-center gap-1.5">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={() => {
                const isDark =
                  typeof document !== "undefined" &&
                  document.documentElement.classList.contains("dark");
                setTheme(isDark ? "light" : "dark");
              }}
              className="p-2 rounded-full text-gray-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-gray-200/70 dark:border-neutral-800/80 hover:bg-white dark:hover:bg-neutral-800 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center w-9 h-9 shadow-xs"
              aria-label="Toggle Theme"
            >
              <Sun size={18} className="hidden dark:block text-amber-400 dark:text-yellow-300" />
              <Moon size={18} className="block dark:hidden text-gray-700" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center w-9 h-9 ${
                isMenuOpen
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white/70 dark:bg-neutral-900/70 text-gray-700 dark:text-neutral-200 border border-gray-200/70 dark:border-neutral-800/80 hover:bg-white dark:hover:bg-neutral-800 hover:text-blue-600 dark:hover:text-blue-400 shadow-xs"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden pt-2 pb-4">
            <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl rounded-2xl border border-gray-200/80 dark:border-neutral-800/80 p-3 shadow-2xl space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = isItemActive(item.href);

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`group flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 active:scale-[0.98] ${
                      isActive
                        ? "bg-blue-50/90 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 font-semibold"
                        : "hover:bg-blue-50/70 dark:hover:bg-neutral-800/70 text-gray-800 dark:text-neutral-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 shrink-0">
                        <IconComponent size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-gray-500 dark:text-neutral-400 truncate">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      size={15}
                      className="text-gray-400 dark:text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180 transition-all shrink-0 ms-2"
                    />
                  </Link>
                );
              })}

              {/* Quick Actions: Resume or LinkedIn, and GitHub */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-neutral-800/80">
                {hasResume ? (
                  <a
                    href="/api/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white py-3 px-3 rounded-full text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95"
                  >
                    <FileText size={14} />
                    Resume
                  </a>
                ) : (
                  <Link
                    href="https://linkedin.com/in/rajivsharma25"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white py-3 px-3 rounded-full text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95"
                  >
                    <Linkedin size={14} />
                    LinkedIn
                  </Link>
                )}
                <Link
                  href="https://github.com/rajivsharma25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 text-gray-800 dark:text-neutral-200 py-3 px-3 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95"
                >
                  <Github size={14} />
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
