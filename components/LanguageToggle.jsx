"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const languages = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिन्दी", short: "HI" },
  { code: "ar", label: "العربية", short: "AR" },
];

export default function LanguageToggle({ className = "" }) {
  const { language, setLanguage, mounted } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const activeLangObj = languages.find((l) => l.code === language) || languages[0];

  return (
    <div className={`relative group ${className}`} ref={dropdownRef}>
      {/* Header Language Icon Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-9 h-9 lg:w-10 lg:h-10 p-2 lg:p-2.5 rounded-full text-gray-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md hover:bg-white dark:hover:bg-neutral-800 border border-gray-200/70 dark:border-neutral-800/80 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center shadow-xs relative ${
          isOpen ? "ring-2 ring-blue-500/50 bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400" : ""
        }`}
        aria-label="Select Language / भाषा चुनें / اختر اللغة"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Languages size={19} className="w-[18px] h-[18px] lg:w-[19px] lg:h-[19px] transition-transform duration-200 group-hover:scale-105" />

        {/* Small Active Lang Badge */}
        <span
          suppressHydrationWarning
          className="absolute -bottom-0.5 -right-0.5 rtl:right-auto rtl:-left-0.5 inline-flex items-center justify-center whitespace-nowrap px-1 py-[0.5px] rounded-full text-[8px] font-extrabold uppercase bg-blue-600 text-white leading-none shadow-xs pointer-events-none"
        >
          {mounted ? activeLangObj.short : "EN"}
        </span>
      </button>

      {/* Tooltip on Hover when dropdown is closed */}
      {!isOpen && (
        <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gray-800 dark:bg-neutral-800 text-white text-[10px] font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-sm hidden lg:block">
          {language === "ar" ? "اللغة (Language)" : language === "hi" ? "भाषा (Language)" : "Language"}
        </span>
      )}

      {/* Language Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 w-36 sm:w-40 p-1.5 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl rounded-2xl border border-gray-200/80 dark:border-neutral-800/80 shadow-lg z-50 flex flex-col gap-1 overflow-hidden"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 border-b border-gray-100 dark:border-neutral-800/80 pb-1 mb-0.5">
              Select Language
            </div>

            {languages.map((lang) => {
              const isActive = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-gray-100/80 dark:hover:bg-neutral-800/80 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                  role="menuitem"
                  aria-checked={isActive}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md border ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border-gray-200 dark:border-neutral-700"
                      }`}
                    >
                      {lang.short}
                    </span>
                    <span className="text-xs">{lang.label}</span>
                  </div>

                  {isActive && (
                    <Check size={14} className="text-blue-600 dark:text-blue-400" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
