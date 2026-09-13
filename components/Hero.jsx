"use client";
import Link from "next/link";
import Image from "next/image";
import { FolderOpen, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaAws,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiTypescript,
  SiFramer,
} from "react-icons/si";
import Typewriter from "./Typewriter";
import { useLanguage } from "@/context/LanguageContext";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut", delay },
});

export default function Hero() {
  const { t, language } = useLanguage();
  const typewriterWords = Array.isArray(t("hero.roles"))
    ? t("hero.roles")
    : ["Frontend", "Web", "ReactJS", "Software"];
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-24 px-3.5 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Base Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-sky-50/40 to-blue-50/25 dark:from-neutral-950 dark:via-neutral-900/50 dark:to-neutral-950 transition-colors duration-300"></div>

        {/* Ambient Aurora Glow Orbs */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[650px] sm:w-[850px] h-[400px] bg-gradient-to-b from-blue-400/20 via-sky-400/15 to-transparent dark:from-blue-600/20 dark:via-sky-500/10 dark:to-transparent rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute top-1/4 -left-24 w-80 h-80 bg-blue-400/15 dark:bg-blue-600/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-sky-400/15 dark:bg-indigo-600/15 rounded-full blur-[80px] pointer-events-none" />

        {/* Modern Precision Technical Grid with Radial Vignette */}
        <div
          className="absolute inset-0 opacity-[0.045] dark:opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 80% 68% at 50% 42%, black 25%, transparent 88%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 68% at 50% 42%, black 25%, transparent 88%)",
          }}
        />

        {/* Concentric Ambient Orbital Rings (Centered on Avatar) */}
        <div className="absolute top-[28%] sm:top-[26%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {/* Inner Ring */}
          <div className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full border border-blue-500/20 dark:border-blue-400/20" />

          {/* Middle Dashed Tech Orbit */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] sm:w-[520px] sm:h-[520px] rounded-full border border-dashed border-sky-500/20 dark:border-sky-400/15" />

          {/* Outer Ambient Perimeter */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[720px] sm:h-[720px] rounded-full border border-blue-500/10 dark:border-blue-400/10 hidden sm:block" />
        </div>

        {/* Floating Technology Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-16 animate-bounce will-change-transform" style={{ animationDelay: "0s", animationDuration: "6s" }}>
            <FaReact className="text-blue-500 opacity-20 text-3xl animate-spin" style={{ animationDelay: "0s", animationDuration: "6s" }} />
          </div>
          <div className="absolute top-32 right-24 animate-bounce will-change-transform" style={{ animationDelay: "1s", animationDuration: "5s" }}>
            <FaJs className="text-yellow-500 opacity-20 text-2xl" />
          </div>
          <div className="absolute top-1/2 left-12 animate-bounce will-change-transform" style={{ animationDelay: "2s", animationDuration: "7s" }}>
            <SiNextdotjs className="text-gray-900 dark:text-gray-100 opacity-15 text-3xl" />
          </div>
          <div className="absolute bottom-40 right-16 animate-bounce will-change-transform" style={{ animationDelay: "0.5s", animationDuration: "6s" }}>
            <FaHtml5 className="text-orange-500 opacity-20 text-2xl" />
          </div>
          <div className="absolute bottom-24 left-24 animate-bounce will-change-transform" style={{ animationDelay: "1.5s", animationDuration: "5.5s" }}>
            <FaCss3Alt className="text-blue-600 opacity-20 text-2xl" />
          </div>
          <div className="absolute top-40 left-1/3 animate-bounce will-change-transform" style={{ animationDelay: "3s", animationDuration: "6.5s" }}>
            <SiTailwindcss className="text-cyan-500 opacity-15 text-2xl" />
          </div>
          <div className="absolute bottom-1/3 right-1/4 animate-bounce will-change-transform" style={{ animationDelay: "2.5s", animationDuration: "5s" }}>
            <SiRedux className="text-purple-600 opacity-20 text-2xl" />
          </div>
          <div className="absolute top-1/3 right-12 animate-bounce will-change-transform" style={{ animationDelay: "4s", animationDuration: "7s" }}>
            <FaReact className="text-blue-400 opacity-15 text-2xl" />
          </div>
          <div className="absolute bottom-48 left-1/4 animate-bounce will-change-transform" style={{ animationDelay: "3.5s", animationDuration: "6s" }}>
            <FaGitAlt className="text-red-500 opacity-20 text-2xl" />
          </div>
          <div className="absolute top-56 right-1/3 animate-bounce will-change-transform" style={{ animationDelay: "4.5s", animationDuration: "5.5s" }}>
            <FaAws className="text-orange-600 opacity-15 text-2xl" />
          </div>
          <div className="absolute bottom-1/3 left-20 animate-bounce will-change-transform" style={{ animationDelay: "5s", animationDuration: "6.5s" }}>
            <SiTypescript className="text-blue-600 opacity-20 text-2xl" />
          </div>
          <div className="absolute bottom-24 right-32 animate-bounce will-change-transform" style={{ animationDelay: "2.8s", animationDuration: "5.8s" }}>
            <SiFramer className="text-pink-500 opacity-15 text-2xl" />
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto text-center z-10 w-full">
        {/* Profile Image */}
        <motion.div
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.34, 1.2, 0.64, 1] }}
        >
          <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-blue-600 dark:from-blue-400 dark:via-sky-400 dark:to-blue-500 p-1 relative overflow-hidden shadow-lg shadow-blue-500/10 transition-transform duration-300 hover:scale-105">
            <div className="w-full h-full rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center">
              <Image
                src="/profile.webp"
                alt="Rajiv Sharma Profile"
                width={240}
                height={240}
                quality={90}
                className="rounded-full object-cover"
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 240px"
              />
            </div>
          </div>
        </motion.div>

        <div>
          <motion.h1
            className="text-lg sm:text-2xl md:text-3xl text-gray-900 dark:text-neutral-100 font-medium mb-2 sm:mb-3.5 leading-normal sm:leading-relaxed py-0.5"
            {...fadeUp(0.1)}
          >
            {t("hero.greeting")}{" "}
            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-blue-500 dark:from-blue-400 dark:via-sky-300 dark:to-blue-400 bg-clip-text text-transparent font-bold inline-block py-0.5">
              {t("hero.name")}
            </span>
          </motion.h1>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-800 via-blue-600 to-sky-500 dark:from-blue-400 dark:via-sky-300 dark:to-blue-400 bg-clip-text text-transparent font-bold mb-3 sm:mb-5 leading-[1.28] sm:leading-[1.22] py-1"
            {...fadeUp(0.2)}
          >
            <Typewriter
              key={language}
              words={typewriterWords}
              typingSpeed={90}
              deletingSpeed={50}
              pauseDuration={1600}
            />{" "}
            {t("hero.developerSuffix")}
          </motion.h2>

          <motion.p
            className="mt-4 sm:mt-6 md:mt-7 text-sm sm:text-base md:text-lg text-gray-600 dark:text-neutral-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-1 sm:px-0"
            {...fadeUp(0.3)}
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-2.5 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
            {...fadeUp(0.4)}
          >
            <Link
              href="#projects"
              className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 hover:bg-blue-700 active:scale-95 shadow-md hover:shadow-lg"
            >
              <FolderOpen size={18} />
              {t("hero.viewProjects")}
            </Link>
            <Link
              href="#contact"
              className="w-full sm:w-auto justify-center inline-flex items-center gap-2 border border-blue-600 text-blue-600 dark:text-blue-400 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 hover:bg-blue-600 hover:text-white dark:hover:text-white active:scale-95"
            >
              <MessageCircle size={18} />
              {t("hero.getInTouch")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
