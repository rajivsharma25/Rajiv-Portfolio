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
  RotateCw,
} from "lucide-react";
import FlipCard from "../ui/FlipCard";

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
  const projects = [
    {
      key: "forever",
      title: "Forever E-Commerce",
      category: "E-Commerce Platform",
      filterCategory: "ecommerce",
      image: "/assets/images/forever.webp",
      description: "Full-featured modern e-commerce storefront with real-time product search, dynamic filtering, interactive shopping cart, and streamlined multi-step checkout.",
      technologies: ["React.js", "Redux", "JavaScript", "Tailwind CSS"],
      features: [
        "Dynamic product catalog with instant search & category filtering",
        "Persistent shopping cart with state management",
        "Responsive, mobile-first clean user experience",
      ],
      demoUrl: "https://forever-ecommerce-website-rajiv-sharma.vercel.app/",
      githubUrl: "https://github.com/rajivsharma25/Forever-Ecommerce-Website",
      status: "Live Demo",
    },
    {
      key: "wearcraft",
      title: "WearCraft Clothing",
      category: "Fashion & Apparel",
      filterCategory: "ecommerce",
      image: "/assets/images/wearcraft.webp",
      description: "Modern apparel web application with high-performance product sorting, size/color selectors, customer review system, and persistent state management.",
      technologies: [
        "React.js",
        "Vite",
        "Shadcn UI",
        "Tailwind CSS",
        "Context API",
      ],
      features: [
        "Advanced product filtering, sorting, and size selectors",
        "Complete cart management & order tracking system",
        "High-performance clean UI with Shadcn components",
      ],
      demoUrl: "https://wearcrafts.vercel.app/",
      githubUrl: "https://github.com/rajivsharma25/wearcraft",
      status: "Live Demo",
    },
    {
      key: "cravecart",
      title: "CraveCart Food Delivery",
      category: "Food & Beverage",
      filterCategory: "webapps",
      image: "/assets/images/cravecart.webp",
      description: "Real-time food delivery web platform featuring interactive restaurant discovery, dynamic category filtering, customizable cart, and order tracking.",
      technologies: ["React.js", "Context API", "JavaScript", "Tailwind CSS"],
      features: [
        "Restaurant & menu discovery with instant category search",
        "Real-time order tracking & persistent cart management",
        "Fast, fluid mobile-optimized responsive layout",
      ],
      demoUrl:
        "https://cravecart-food-delivery-website-rajivsharma25s-projects.vercel.app/",
      githubUrl:
        "https://github.com/rajivsharma25/CraveCart-Food-Delivery-Website",
      status: "Live Demo",
    },
    {
      key: "prescripto",
      title: "Prescripto Doctor Appointment",
      category: "Healthcare Portal",
      filterCategory: "webapps",
      image: "/assets/images/prescripto.webp",
      description: "Complete medical appointment booking platform connecting patients with specialist doctors, with real-time slot selection and profile management.",
      technologies: ["React.js", "Context API", "JavaScript", "Tailwind CSS"],
      features: [
        "Doctor profiles with specialties, availability & ratings",
        "Interactive appointment booking & schedule management",
        "Clean, patient-friendly medical portal interface",
      ],
      demoUrl:
        "https://prescripto-online-doctor-appointment-pl-rajivsharma25s-projects.vercel.app/",
      githubUrl:
        "https://github.com/rajivsharma25/Prescripto-Online-Doctor-Appointment-Platform",
      status: "Live Demo",
    },
    {
      key: "findmycollege",
      title: "FindMyCollege Portal",
      category: "Education Platform",
      filterCategory: "webapps",
      image: "/assets/images/findmycollege.webp",
      description: "Comprehensive higher-education discovery platform with college search across streams, entrance exam details, cutoffs, and admissions guidance.",
      technologies: [
        "React.js",
        "Vite",
        "Tailwind CSS",
        "React Router",
        "React Icons",
      ],
      features: [
        "Comprehensive college search engine across multiple disciplines",
        "Detailed entrance exam guides, cutoffs & admission criteria",
        "Optimized responsive interface for students & parents",
      ],
      demoUrl: "https://findmycolleges.vercel.app/",
      githubUrl: "https://github.com/rajivsharma25/FindMyCollege",
      status: "Live Demo",
    },
  ];

  const filterTabs = [
    { id: "all", label: "All", count: projects.length },
    {
      id: "ecommerce",
      label: "E-Commerce",
      count: projects.filter((p) => p.filterCategory === "ecommerce").length,
    },
    {
      id: "webapps",
      label: "Web Apps",
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
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent inline-block py-0.5">
              Projects
            </span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-3.5 sm:mb-6 rounded-full"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Explore production-grade web applications, responsive platforms, and client solutions
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
          <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-gray-100/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-full border border-gray-200/70 dark:border-neutral-800/80 shadow-inner max-w-full overflow-x-auto no-scrollbar">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all duration-200 shrink-0 whitespace-nowrap z-10 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/40 dark:hover:bg-white/[0.06]"
                  }`}
                >
                  {/* Fluid sliding background */}
                  {isActive && (
                    <motion.span
                      layoutId="activeTabPill"
                      className="absolute inset-0 rounded-full -z-10 backdrop-blur-md bg-gradient-to-b from-white/95 via-white/85 to-white/70 dark:from-white/[0.18] dark:via-white/[0.07] dark:to-transparent dark:bg-neutral-800/80 border border-white/80 dark:border-white/20 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_1.5px_rgba(0,0,0,0.08),0_2px_8px_rgba(37,99,235,0.08)] dark:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.4),0_3px_12px_rgba(0,0,0,0.3)]"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-colors ${
                      isActive
                        ? "bg-blue-100/90 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "bg-gray-200/70 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
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
                className="w-full h-[415px] sm:h-[435px]"
              >
                <FlipCard
                  radius={24}
                  axis="y"
                  flipOnClick
                  draggable
                  tilt
                  tiltMax={10}
                  glare
                  glareOpacity={0.16}
                  hoverScale={1.02}
                  shadow={false}
                  className="w-full h-full"
                  front={
                    <div
                      className="w-full h-full bg-white dark:bg-neutral-900/90 rounded-2xl sm:rounded-3xl border border-gray-200/80 dark:border-neutral-800/80 hover:border-blue-500/40 dark:hover:border-blue-500/40 shadow-sm hover:shadow-xl transition-[border-color,box-shadow] duration-200 flex flex-col justify-between overflow-hidden"
                      style={{ clipPath: "inset(0 round 24px)" }}
                    >
                      <div>
                        {/* Project Image Preview */}
                        <div
                          className="relative h-44 sm:h-48 w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl bg-neutral-100 dark:bg-neutral-900"
                          style={{ clipPath: "inset(0 round 24px 24px 0 0)" }}
                        >
                          <Image
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover object-top rounded-t-2xl sm:rounded-t-3xl grayscale hover:grayscale-0 transition-all duration-500 ease-out"
                            loading="lazy"
                          />

                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-black/20 opacity-70 pointer-events-none rounded-t-2xl sm:rounded-t-3xl" />
                        </div>

                        {/* Title & Description */}
                        <div className="p-4 sm:p-5 pb-0">
                          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-1.5 sm:mb-2 leading-snug">
                            {project.title}
                          </h3>

                          <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Flip Hint & Quick Live Demo */}
                      <div className="p-4 sm:p-5 pt-3 border-t border-gray-100 dark:border-neutral-800/80 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                          <RotateCw size={13} className="text-blue-500" />
                          <span>Flip for features</span>
                        </span>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                        >
                          <ExternalLink size={14} />
                          <span>Demo</span>
                        </a>
                      </div>
                    </div>
                  }
                  back={
                    <div
                      className="w-full h-full bg-white dark:bg-neutral-900/95 rounded-2xl sm:rounded-3xl border border-blue-500/30 dark:border-blue-500/30 shadow-lg p-4 sm:p-6 flex flex-col justify-between overflow-hidden"
                      style={{ clipPath: "inset(0 round 24px)" }}
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-neutral-800/80">
                          <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/40">
                            {project.category}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                            <RotateCw size={12} className="text-blue-500" />
                            <span>Flip back</span>
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2 leading-snug">
                          {project.title}
                        </h3>

                        {/* Core Features */}
                        <div className="mb-3 sm:mb-4">
                          <div className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
                            Key Highlights & Features
                          </div>
                          <div className="space-y-1.5 sm:space-y-2 p-2.5 sm:p-3 bg-gray-50/80 dark:bg-neutral-950/60 rounded-xl border border-gray-100 dark:border-neutral-800/60">
                            {project.features.map((feature, fIndex) => (
                              <div
                                key={fIndex}
                                className="flex items-start gap-2 text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-300"
                              >
                                <CheckCircle2
                                  size={13}
                                  className="text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0"
                                />
                                <span className="line-clamp-2">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* All Technologies */}
                        <div>
                          <div className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1.5">
                            Tech Stack
                          </div>
                          <div className="flex flex-wrap gap-1 sm:gap-1.5">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/40 rounded-full text-[10px] sm:text-[11px] font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-3 border-t border-gray-100 dark:border-neutral-800/80">
                        <div className="flex items-center gap-2">
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white py-2 sm:py-2.5 px-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                          >
                            <ExternalLink size={14} />
                            <span>Live Demo</span>
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 active:scale-[0.98] text-neutral-800 dark:text-neutral-200 border border-gray-200/60 dark:border-neutral-700/60 py-2 sm:py-2.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
                            title="View Source Code on GitHub"
                          >
                            <Github size={14} />
                            <span>Code</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  }
                />
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
                Open Source & Code
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 leading-normal">
                Want to explore more repositories?
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed">
                Discover additional client deliverables, experimentation sandboxes, and open-source contributions on my GitHub.
              </p>
            </div>
            <Link
              href="https://github.com/rajivsharma25"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 active:scale-95 flex-shrink-0 shadow-md hover:shadow-lg"
            >
              <Github size={18} />
              <span>Visit GitHub Profile</span>
              <ArrowUpRight size={16} className="rtl:-scale-x-100 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
