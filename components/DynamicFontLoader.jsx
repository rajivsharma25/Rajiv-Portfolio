"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * Dynamically injects script-specific Google Fonts (Devanagari for Hindi, Cairo for Arabic)
 * only when that language is active, keeping initial bundle and font payload minimal for English users.
 */
export default function DynamicFontLoader() {
  const { language } = useLanguage();

  return (
    <>
      {language === "hi" && (
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap"
        />
      )}
      {language === "ar" && (
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap"
        />
      )}
    </>
  );
}
