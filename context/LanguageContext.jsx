"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import en from "@/locales/en.json";
import hi from "@/locales/hi.json";
import ar from "@/locales/ar.json";

const translations = { en, hi, ar };
const RTL_LANGUAGES = new Set(["ar"]);

const LanguageContext = createContext({
  language: "en",
  direction: "ltr",
  isRTL: false,
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (path, fallback) => fallback || path,
  mounted: false,
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("portfolio_lang");
    if (saved === "hi" || saved === "en" || saved === "ar") {
      setLanguageState(saved);
      const isRtl = RTL_LANGUAGES.has(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = isRtl ? "rtl" : "ltr";
    } else {
      // Check system preference
      const browserLang = (navigator.language || "").toLowerCase();
      if (browserLang.startsWith("ar")) {
        setLanguageState("ar");
        document.documentElement.lang = "ar";
        document.documentElement.dir = "rtl";
      } else if (browserLang.startsWith("hi")) {
        setLanguageState("hi");
        document.documentElement.lang = "hi";
        document.documentElement.dir = "ltr";
      } else {
        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";
      }
    }
  }, []);

  const setLanguage = useCallback((lang) => {
    if (lang === "en" || lang === "hi" || lang === "ar") {
      setLanguageState(lang);
      const isRtl = RTL_LANGUAGES.has(lang);
      try {
        localStorage.setItem("portfolio_lang", lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = isRtl ? "rtl" : "ltr";
      } catch (e) {
        console.error("Failed to save language preference:", e);
      }
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "hi" : prev === "hi" ? "ar" : "en"));
  }, [setLanguage]);

  const t = useCallback(
    (path, fallback = "") => {
      if (!path) return fallback;
      const keys = path.split(".");
      
      // Try active language first
      let current = translations[language];
      for (const k of keys) {
        if (current && typeof current === "object" && k in current) {
          current = current[k];
        } else {
          current = undefined;
          break;
        }
      }

      if (current !== undefined) return current;

      // Fallback to English
      let fallbackCurrent = translations.en;
      for (const k of keys) {
        if (fallbackCurrent && typeof fallbackCurrent === "object" && k in fallbackCurrent) {
          fallbackCurrent = fallbackCurrent[k];
        } else {
          fallbackCurrent = undefined;
          break;
        }
      }

      return fallbackCurrent !== undefined ? fallbackCurrent : (fallback || path);
    },
    [language]
  );

  const isRTL = RTL_LANGUAGES.has(language);
  const direction = isRTL ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, direction, isRTL, setLanguage, toggleLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
