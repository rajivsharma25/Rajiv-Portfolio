"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardFadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.2, ease: "easeIn" } },
};

export default function Projects() {
  const { t } = useLanguage();

  const projects = [
    {
      key: "forever",
      title: t("projects.items.forever.title"),
      category: t("projects.items.forever.category"),
      filterCategory: "ecommerce",
      image: "/assets/images/forever.webp",
      description: t("projects.items.forever.description"),
      technologies: ["React.js", "Redux", "JavaScript", "Tailwind CSS"],
      features: Array.isArray(t("projects.items.forever.features"))
        ? t("projects.items.forever.features")
        : [
            "Dynamic product catalog with instant search & category filtering",
            "Persistent shopping cart with state management",
            "Responsive, mobile-first clean user experience",
          ],
      demoUrl: "https://forever-ecommerce-website-rajiv-sharma.vercel.app/",
      githubUrl: "https://github.com/rajivsharma25/Forever-Ecommerce-Website",
      status: t("projects.active"),
    },
    {
      key: "wearcraft",
      title: t("projects.items.wearcraft.title"),
      category: t("projects.items.wearcraft.category"),
      filterCategory: "ecommerce",
      image: "/assets/images/wearcraft.webp",
      description: t("projects.items.wearcraft.description"),
      technologies: [
        "React.js",
        "Vite",
        "Shadcn UI",
        "Tailwind CSS",
        "Context API",
      ],
      features: Array.isArray(t("projects.items.wearcraft.features"))
        ? t("projects.items.wearcraft.features")
        : [
            "Advanced product filtering, sorting, and size selectors",
            "Complete cart management & order tracking system",
            "High-performance clean UI with Shadcn components",
          ],
      demoUrl: "https://wearcrafts.vercel.app/",
      githubUrl: "https://github.com/rajivsharma25/wearcraft",
      status: t("projects.active"),
    },
    {
      key: "cravecart",
      title: t("projects.items.cravecart.title"),
      category: t("projects.items.cravecart.category"),
      filterCategory: "webapps",
      image: "/assets/images/cravecart.webp",
      description: t("projects.items.cravecart.description"),
      technologies: ["React.js", "Context API", "JavaScript", "Tailwind CSS"],
      features: Array.isArray(t("projects.items.cravecart.features"))
        ? t("projects.items.cravecart.features")
        : [
            "Restaurant & menu discovery with instant category search",
            "Real-time order tracking & persistent cart management",
            "Fast, fluid mobile-optimized responsive layout",
          ],
      demoUrl:
        "https://cravecart-food-delivery-website-rajivsharma25s-projects.vercel.app/",
      githubUrl:
        "https://github.com/rajivsharma25/CraveCart-Food-Delivery-Website",
      status: t("projects.active"),
    },
    {
      key: "prescripto",
      title: t("projects.items.prescripto.title"),
      category: t("projects.items.prescripto.category"),
      filterCategory: "webapps",
      image: "/assets/images/prescripto.webp",
      description: t("projects.items.prescripto.description"),
      technologies: ["React.js", "Context API", "JavaScript", "Tailwind CSS"],
      features: Array.isArray(t("projects.items.prescripto.features"))
        ? t("projects.items.prescripto.features")
        : [
            "Doctor profiles with specialties, availability & ratings",
            "Interactive appointment booking & schedule management",
            "Clean, patient-friendly medical portal interface",
          ],
      demoUrl:
        "https://prescripto-online-doctor-appointment-pl-rajivsharma25s-projects.vercel.app/",
      githubUrl:
        "https://github.com/rajivsharma25/Prescripto-Online-Doctor-Appointment-Platform",
      status: t("projects.active"),
    },
    {
      key: "findmycollege",
      title: t("projects.items.findmycollege.title"),
      category: t("projects.items.findmycollege.category"),
      filterCategory: "webapps",
      image: "/assets/images/findmycollege.webp",
      description: t("projects.items.findmycollege.description"),
      technologies: [
        "React.js",
        "Vite",
        "Tailwind CSS",
        "React Router",
        "React Icons",
      ],
      features: Array.isArray(t("projects.items.findmycollege.features"))
        ? t("projects.items.findmycollege.features")
        : [
            "Comprehensive college search engine across multiple disciplines",
            "Detailed entrance exam guides, cutoffs & admission criteria",
            "Optimized responsive interface for students & parents",
          ],
      demoUrl: "https://findmycolleges.vercel.app/",
      githubUrl: "https://github.com/rajivsharma25/FindMyCollege",
      status: t("projects.active"),
    },
  ];

  const filterTabs = [
    { id: "all", label: t("projects.tabAll"), count: projects.length },
    {
      id: "ecommerce",
      label: t("projects.tabEcommerce"),
      count: projects.filter((p) => p.filterCategory === "ecommerce").length,
    },
    {
      id: "webapps",
      label: t("projects.tabWebApps"),
      count: projects.filter((p) => p.filterCategory === "webapps").length,
    },
  ];

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.filterCategory === activeFilter);

  return (
    <section
      id="projects"
      className="relative py-12 sm:py-16 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-gray-50 dark:bg-neutral-950 transition-colors duration-300 overflow-hidden"
    >
      {/* Pure Soft Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-500/5 dark:bg-blue-600/7 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-28 w-96 h-96 bg-sky-400/5 dark:bg-blue-600/6 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-28 w-96 h-96 bg-indigo-400/5 dark:bg-sky-600/6 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2.5 sm:mb-4 leading-normal sm:leading-snug py-0.5">
            {t("projects.heading")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent inline-block py-0.5">
              {t("projects.headingHighlight")}
            </span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-3.5 sm:mb-6 rounded-full"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            {t("projects.subheading")}
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex items-center justify-center mb-8 sm:mb-10 w-full"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-white dark:bg-neutral-900/90 rounded-full border border-gray-200/80 dark:border-neutral-800/80 shadow-xs max-w-full overflow-x-auto no-scrollbar">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-colors duration-150 shrink-0 whitespace-nowrap ${
                    isActive
                      ? "text-white"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {/* Fluid sliding background */}
                  {isActive && (
                    <motion.span
                      layoutId="activeTabPill"
                      className="absolute inset-0 rounded-full bg-blue-600"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            exit="exit"
          >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardFadeUp}
              className="project-card group bg-white dark:bg-neutral-900/90 rounded-2xl sm:rounded-3xl border border-gray-200/80 dark:border-neutral-800/80 hover:border-blue-500/40 dark:hover:border-blue-500/40 shadow-sm hover:shadow-xl transition-[border-color,box-shadow] duration-200 flex flex-col overflow-hidden"
            >
              {/* Project Image Preview */}
              <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />

                {/* Status Badge */}
                <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {project.status}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 z-10">
                  <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-xs">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-1.5 sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-normal">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Core Feature Highlights */}
                <div className="space-y-1 sm:space-y-1.5 mb-3 sm:mb-4 p-2.5 sm:p-3 bg-gray-50/80 dark:bg-neutral-950/60 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-neutral-800/60">
                  {project.features.map((feature, fIndex) => (
                    <div
                      key={fIndex}
                      className="flex items-start gap-2 text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-300"
                    >
                      <CheckCircle2
                        size={13}
                        className="text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0"
                      />
                      <span className="line-clamp-1">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-6 mt-auto">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/40 rounded-full text-[11px] sm:text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 sm:gap-2.5 pt-3.5 sm:pt-4 border-t border-gray-100 dark:border-neutral-800/80">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200"
                  >
                    <ExternalLink size={14} />
                    <span>{t("projects.liveDemo")}</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 active:scale-[0.98] text-neutral-800 dark:text-neutral-200 border border-gray-200/60 dark:border-neutral-700/60 py-2 sm:py-2.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200"
                    title="View Source Code on GitHub"
                  >
                    <Github size={14} />
                    <span>{t("projects.code")}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        </AnimatePresence>

        {/* GitHub Call to Action Bento Banner */}
        <motion.div
          className="mt-10 sm:mt-12 bg-white dark:bg-neutral-900/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-sm border border-gray-200/80 dark:border-neutral-800/80 transition-all duration-300"
          variants={cardFadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 text-center md:text-start">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/40 inline-block mb-2 sm:mb-3">
                {t("projects.githubBannerBadge")}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 leading-normal">
                {t("projects.githubBannerTitle")}
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed">
                {t("projects.githubBannerDesc")}
              </p>
            </div>
            <Link
              href="https://github.com/rajivsharma25"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 active:scale-95 flex-shrink-0 shadow-md hover:shadow-lg"
            >
              <Github size={18} />
              <span>{t("projects.visitGithub")}</span>
              <ArrowUpRight size={16} className="rtl:-scale-x-100 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
