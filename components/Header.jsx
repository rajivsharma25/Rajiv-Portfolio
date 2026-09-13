"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Linkedin,
  Moon,
  Sun,
  User,
  Terminal,
  Briefcase,
  FolderGit2,
  Award,
  Send,
  ChevronRight,
  Github,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();
  const isScrollingRef = useRef(false);

  const navItems = [
    { key: "about", name: t("nav.about"), href: "#about", icon: User, desc: t("nav.aboutDesc") },
    { key: "skills", name: t("nav.skills"), href: "#skills", icon: Terminal, desc: t("nav.skillsDesc") },
    { key: "experience", name: t("nav.experiences"), href: "#experience", icon: Briefcase, desc: t("nav.experiencesDesc") },
    { key: "projects", name: t("nav.projects"), href: "#projects", icon: FolderGit2, desc: t("nav.projectsDesc") },
    { key: "certifications", name: t("nav.certifications"), href: "#certifications", icon: Award, desc: t("nav.certificationsDesc") },
    { key: "contact", name: t("nav.contact"), href: "#contact", icon: Send, desc: t("nav.contactDesc") },
  ];

  useEffect(() => {
    setMounted(true);

    const sections = [
      "about",
      "skills",
      "experience",
      "projects",
      "certifications",
      "contact",
    ];

    let ticking = false;

    const updateActiveSection = () => {
      if (isScrollingRef.current) {
        ticking = false;
        return;
      }


      // If near the top (Hero section), no nav link is active
      if (scrollY < 180) {
        setActiveSection("");
        ticking = false;
        return;
      }

      // If scrolled to the bottom of the page, activate the last section
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      if (windowHeight + scrollY >= scrollHeight - 60) {
        setActiveSection("contact");
        ticking = false;
        return;
      }

      // Find the section currently occupying the viewport reading area
      let current = "";
      const viewportTrigger = 220;

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportTrigger && rect.bottom > 80) {
            current = sections[i];
          }
        }
      }

      setActiveSection(current);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
      <nav className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-2 sm:gap-4 py-2.5 sm:py-3 md:py-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.webp"
              alt="Rajiv Sharma Logo"
              width={200}
              height={60}
              className="h-auto w-[85px] sm:w-[100px] dark:invert-100 -ml-1"
              priority
            />
          </Link>

          {/* Desktop Navigation - Apple Dynamic Island Pill */}
          <div className="hidden lg:flex items-center gap-1.5 p-1.5 lg:p-2 bg-gray-100/80 dark:bg-neutral-900/80 backdrop-blur-md border border-gray-200/70 dark:border-neutral-800/80 rounded-full shadow-inner">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              const targetHref = isHomePage ? item.href : `/${item.href}`;
              const isActive = isHomePage && activeSection === item.href.replace("#", "");
              return (
                <Link
                  key={index}
                  href={targetHref}
                  onClick={(e) => {
                    if (isHomePage) {
                      setActiveSection(item.href.replace("#", ""));
                      isScrollingRef.current = true;
                      setTimeout(() => {
                        isScrollingRef.current = false;
                      }, 800);
                    }
                  }}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full text-sm transition-colors duration-200 z-10 ${isActive
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
                    className={
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "opacity-60"
                    }
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Controls */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Language Switcher */}
            <LanguageToggle />

            {/* Theme Toggle */}
            <div className="relative group">
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-full text-gray-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md hover:bg-white dark:hover:bg-neutral-800 border border-gray-200/70 dark:border-neutral-800/80 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center w-10 h-10 shadow-xs"
                aria-label="Toggle Theme"
              >
                {mounted ? (
                  resolvedTheme === "dark" ? <Sun size={19} /> : <Moon size={19} />
                ) : (
                  <span className="w-4 h-4 block" />
                )}
              </button>
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gray-800 dark:bg-neutral-800 text-white text-[10px] font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-sm">
                {mounted ? (resolvedTheme === "dark" ? "Light Mode" : "Dark Mode") : "Theme"}
              </span>
            </div>

            {/* LinkedIn Pill Button */}
            <Link
              href="https://linkedin.com/in/rajivsharma25"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-2.5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-blue-600/80 dark:border-blue-500/80 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-1.5">
            {/* Language Switcher for Mobile */}
            <LanguageToggle />

            {/* Theme Toggle for Mobile */}
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-gray-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-gray-200/70 dark:border-neutral-800/80 hover:bg-white dark:hover:bg-neutral-800 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center w-9 h-9 shadow-xs"
              aria-label="Toggle Theme"
            >
              {mounted ? (
                resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />
              ) : (
                <span className="w-5 h-5 block" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center w-9 h-9 ${isMenuOpen
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
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                const targetHref = isHomePage ? item.href : `/${item.href}`;
                const isActive = isHomePage && activeSection === item.href.replace("#", "");
                return (
                  <Link
                    key={index}
                    href={targetHref}
                    onClick={() => {
                      if (isHomePage) {
                        setActiveSection(item.href.replace("#", ""));
                      }
                      setIsMenuOpen(false);
                    }}
                    className={`group flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 active:scale-[0.98] ${isActive
                      ? "bg-blue-50/90 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 font-semibold"
                      : "hover:bg-blue-50/70 dark:hover:bg-neutral-800/70 text-gray-800 dark:text-neutral-200"
                      }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 flex-shrink-0">
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
                      className="text-gray-400 dark:text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180 transition-all flex-shrink-0 ms-2"
                    />
                  </Link>
                );
              })}

              {/* Quick Actions (All rounded-full) */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-neutral-800/80">
                <Link
                  href="https://linkedin.com/in/rajivsharma25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white py-3 px-3 rounded-full text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </Link>
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
