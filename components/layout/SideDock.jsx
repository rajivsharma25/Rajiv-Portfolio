"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  User,
  Terminal,
  Briefcase,
  FolderGit2,
  Award,
  Send,
  ChevronRight,
} from "lucide-react";

const dockItems = [
  { id: "hero", name: "Intro", icon: Sparkles },
  { id: "about", name: "About", icon: User },
  { id: "skills", name: "Skills", icon: Terminal },
  { id: "experience", name: "Experience", icon: Briefcase },
  { id: "projects", name: "Projects", icon: FolderGit2 },
  { id: "certifications", name: "Certificates", icon: Award },
  { id: "contact", name: "Contact", icon: Send },
];

export default function SideDock() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);
  const isScrollingRef = useRef(false);
  const dockRef = useRef(null);

  // Close on outside click on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && dockRef.current && !dockRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const sectionIds = dockItems.map((item) => item.id);
    let ticking = false;

    const updateActiveSection = () => {
      if (isScrollingRef.current) {
        ticking = false;
        return;
      }

      const scrollY = window.scrollY;

      // If near the top (Hero section), activate the Top item
      if (scrollY < 180) {
        setActiveSection("hero");
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

      // Find section in viewport
      let current = "hero";
      const viewportTrigger = 250;

      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportTrigger && rect.bottom > 80) {
            current = sectionIds[i];
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

  const scrollToSection = (id) => {
    setActiveSection(id);
    setIsOpen(false); // Close drawer on mobile after clicking
    isScrollingRef.current = true;
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  return (
    <>
      {/* Subtle Mobile Backdrop when Dock is Open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-xs z-30 md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Dock Container */}
      <div
        ref={dockRef}
        className={`fixed top-1/2 -translate-y-1/2 z-40 transition-transform duration-300 ease-out ${isOpen
          ? "translate-x-2 sm:translate-x-4"
          : "-translate-x-full md:translate-x-0"
          } left-0 md:left-3 sm:md:left-5`}
      >
        {/* Mobile Right Arrow Tab Attached to Left Side of Screen */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close section navigation" : "Open section navigation"}
          aria-expanded={isOpen}
          className="md:hidden absolute left-full top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-12 rounded-r-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-l-0 border-gray-200/80 dark:border-neutral-800/80 shadow-md text-blue-600 dark:text-blue-400 cursor-pointer active:scale-95 transition-all duration-200"
        >
          <ChevronRight
            size={16}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
              }`}
          />
        </button>

        {/* Side Dock List */}
        <aside
          aria-label="Section Navigation Dock"
          className="group flex flex-col gap-1.5 p-1.5 rounded-3xl bg-gray-100/90 dark:bg-neutral-900/90 backdrop-blur-md border border-gray-200/70 dark:border-neutral-800/80 shadow-xl md:shadow-inner transition-all duration-300 ease-out w-44 md:w-[52px] md:hover:w-44 overflow-hidden"
        >
          {dockItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-label={`Scroll to ${item.name}`}
                className={`relative flex items-center h-10 w-full rounded-full transition-colors duration-200 cursor-pointer overflow-hidden z-10 ${isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/40 dark:hover:bg-white/[0.06] font-medium"
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeDockPill"
                    className="absolute inset-0 rounded-full -z-10 backdrop-blur-md bg-gradient-to-b from-white/95 via-white/85 to-white/70 dark:from-white/[0.18] dark:via-white/[0.07] dark:to-transparent dark:bg-neutral-800/80 border border-white/80 dark:border-white/20 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_1.5px_rgba(0,0,0,0.08),0_2px_8px_rgba(37,99,235,0.08)] dark:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.4),0_3px_12px_rgba(0,0,0,0.3)]"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  <Icon
                    size={18}
                    className={`transition-transform duration-200 ${isActive ? "text-blue-600 dark:text-blue-400 scale-105" : "opacity-70"
                      }`}
                  />
                </div>
                <span className="text-xs font-semibold whitespace-nowrap overflow-hidden max-w-[120px] opacity-100 md:max-w-0 md:group-hover:max-w-[120px] md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 pr-3">
                  {item.name}
                </span>
              </button>
            );
          })}
        </aside>
      </div>
    </>
  );
}
