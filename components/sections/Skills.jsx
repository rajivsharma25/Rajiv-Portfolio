"use client";
import { useState } from "react";
import { Network, Boxes, MonitorSmartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardFadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

import {
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiHtml5,
  SiCss3,
  SiMysql,
  SiReact,
  SiRedux,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiVite,
  SiFramer,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import SiGsap from "@/svg/SiGsap";
import SiCursor from "@/svg/SiCursor";
import SiAntigravity from "@/svg/SiAntigravity";
const getPopupPlacement = (index) => {
  // Desktop columns: index % 3: 0 = left, 1 = center, 2 = right
  // Mobile columns: index % 2: 0 = left, 1 = right
  const isMobileRight = index % 2 === 1;
  const isDesktopCenter = index % 3 === 1;
  const isDesktopRight = index % 3 === 2;
  const isDesktopLeft = index % 3 === 0;

  // Container positioning
  let containerPos = "";
  let arrowPos = "";
  let transformOrigin = "bottom center";

  // Mobile base classes (< sm)
  if (isMobileRight) {
    containerPos = "right-0";
    arrowPos = "right-7";
    transformOrigin = "bottom right";
  } else {
    containerPos = "left-0";
    arrowPos = "left-7";
    transformOrigin = "bottom 28px";
  }

  // Desktop responsive override (>= sm)
  if (isDesktopLeft) {
    containerPos += " sm:left-0 sm:right-auto sm:translate-x-0";
    arrowPos += " sm:left-8 sm:right-auto sm:translate-x-0";
    transformOrigin = "bottom 32px";
  } else if (isDesktopRight) {
    containerPos += " sm:right-0 sm:left-auto sm:translate-x-0";
    arrowPos += " sm:right-8 sm:left-auto sm:translate-x-0";
    transformOrigin = "bottom right";
  } else if (isDesktopCenter) {
    containerPos += " sm:left-1/2 sm:-translate-x-1/2 sm:right-auto";
    arrowPos += " sm:left-1/2 sm:-translate-x-1/2 sm:right-auto";
    transformOrigin = "bottom center";
  }

  const containerClasses = `absolute bottom-full mb-3 z-50 w-56 sm:w-64 p-3.5 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/90 dark:border-neutral-800/90 pointer-events-none text-left ${containerPos}`;
  const arrowClasses = `absolute top-full w-0 h-0 pointer-events-none ${arrowPos}`;

  return { containerClasses, arrowClasses, transformOrigin };
};

function SkillCard({ skill, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = skill.icon;
  const { containerClasses, arrowClasses, transformOrigin } = getPopupPlacement(index);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-center justify-center p-2.5 sm:p-3.5 bg-gray-50/80 dark:bg-neutral-950/60 rounded-xl sm:rounded-2xl border border-gray-200/60 dark:border-neutral-800/60 hover:border-blue-300/80 dark:hover:border-blue-500/40 hover:bg-white dark:hover:bg-neutral-900 hover:shadow-xs transition-all duration-200 group cursor-default hover:z-30"
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mb-1.5 sm:mb-2">
        <IconComponent
          size={28}
          className={`${skill.color} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}
        />
      </div>
      <span className="text-neutral-700 dark:text-neutral-300 text-[11px] sm:text-xs font-semibold text-center leading-normal py-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate max-w-full px-0.5">
        {skill.name}
      </span>

      {/* Animated Summary Popup with funky left-right shaking open animation */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.75, rotate: 0 }}
            animate={{
              opacity: 1,
              y: [14, -3, 1, -0.5, 0],
              scale: [0.75, 1.08, 0.96, 1.02, 1],
              rotate: [0, -7, 6, -3.5, 1.5, 0],
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.85,
              rotate: 4,
              transition: { duration: 0.15, ease: "easeIn" },
            }}
            transition={{
              duration: 0.42,
              ease: "easeOut",
            }}
            style={{ transformOrigin }}
            className={containerClasses}
          >
            {/* Soft Ambient Inner Glow */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10">
              {/* Header: Icon + Name + Category Badge */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-gray-100 dark:border-neutral-800/80">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-neutral-800/80 border border-gray-200/70 dark:border-neutral-700/70 flex items-center justify-center shrink-0">
                    <IconComponent size={16} className={skill.color} />
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white truncate">
                    {skill.name}
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/40 shrink-0">
                  Skill
                </span>
              </div>

              {/* Summary Description */}
              <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                {skill.desc}
              </p>
            </div>

            {/* Seamless Dual-Theme Bordered Arrow */}
            <div className={`${arrowClasses} border-[7px] border-transparent border-t-gray-200/90 dark:border-t-neutral-800/90`} />
            <div className={`${arrowClasses} -mt-[1px] border-[6px] border-transparent border-t-white dark:border-t-neutral-900`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages & Web Technologies",
      skills: [
        {
          name: "JavaScript",
          icon: SiJavascript,
          color: "text-yellow-500",
          desc: "Brings websites to life with interactive features, animations, and live updates.",
        },
        {
          name: "TypeScript",
          icon: SiTypescript,
          color: "text-blue-600",
          desc: "A smarter version of JavaScript that catches errors early to keep apps bug-free.",
        },
        {
          name: "C++",
          icon: SiCplusplus,
          color: "text-blue-600",
          desc: "A powerful programming language used for high speed and solving complex logic.",
        },
        {
          name: "HTML5",
          icon: SiHtml5,
          color: "text-orange-600",
          desc: "The skeleton of every website, organizing content like text, images, and links.",
        },
        {
          name: "CSS3",
          icon: SiCss3,
          color: "text-blue-500",
          desc: "Styles websites with colors, fonts, and responsive layouts that fit every screen.",
        },
        {
          name: "SQL",
          icon: SiMysql,
          color: "text-blue-700 dark:text-blue-400",
          desc: "Used to organize, search, and manage information stored in databases.",
        },
      ],
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        {
          name: "React.js",
          icon: SiReact,
          color: "text-cyan-500",
          desc: "Builds fast, smooth user interfaces using reusable visual building blocks.",
        },
        {
          name: "Next.js",
          icon: SiNextdotjs,
          color: "text-neutral-900 dark:text-white",
          desc: "A modern framework that makes web apps super fast and easy to find on Google.",
        },
        {
          name: "Tailwind CSS",
          icon: SiTailwindcss,
          color: "text-teal-500",
          desc: "Quickly creates clean, modern, and beautiful designs for any device.",
        },
        {
          name: "Redux",
          icon: SiRedux,
          color: "text-purple-600",
          desc: "Keeps all app information (like logins or carts) in sync across every page.",
        },
        {
          name: "GSAP",
          icon: SiGsap,
          color: "text-emerald-500",
          desc: "Creates cinematic, ultra-smooth web animations and scroll effects that wow users.",
        },
        {
          name: "Framer Motion",
          icon: SiFramer,
          color: "text-pink-500",
          desc: "Powers playful micro-animations, hover effects, and smooth screen transitions.",
        },
      ],
    },
    {
      title: "Tools & Platforms",
      skills: [
        {
          name: "Git",
          icon: SiGit,
          color: "text-orange-600",
          desc: "Saves project history and lets developers safely collaborate on code together.",
        },
        {
          name: "VSCode",
          icon: VscVscode,
          color: "text-blue-600",
          desc: "My daily workspace for writing, testing, and organizing clean, efficient code.",
        },
        {
          name: "Cursor",
          icon: SiCursor,
          color: "text-sky-500",
          desc: "An AI-powered editor that speeds up coding and helps write cleaner code faster.",
        },
        {
          name: "Antigravity",
          icon: SiAntigravity,
          color: "text-fuchsia-500",
          desc: "An advanced AI coding assistant that automates complex software engineering tasks.",
        },
        {
          name: "Vite",
          icon: SiVite,
          color: "text-purple-500",
          desc: "A super-fast build tool that shows live code changes in the browser instantly.",
        },
        {
          name: "AWS",
          icon: FaAws,
          color: "text-orange-500",
          desc: "Amazon's cloud platform to host websites, store files safely, and run apps 24/7.",
        },
      ],
    },
  ];

  const coreSkills = [
    {
      name: "Data Structures & Algorithms",
      description: "Problem Solving & Algorithmic Thinking",
      icon: Network,
    },
    {
      name: "OOP",
      description: "Object-Oriented Programming",
      icon: Boxes,
    },
    {
      name: "Responsive Design",
      description: "Mobile-First Development",
      icon: MonitorSmartphone,
    },
  ];

  return (
    <section
      id="skills"
      className="relative py-12 sm:py-16 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-gray-50 dark:bg-neutral-950 transition-colors duration-300 overflow-hidden"
    >
      {/* Pure Soft Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-blue-500/5 dark:from-blue-600/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-sky-400/6 dark:bg-blue-600/6 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-400/6 dark:bg-sky-600/6 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2.5 sm:mb-4 leading-normal sm:leading-snug py-0.5">
            Technical{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent inline-block py-0.5">
              Skills
            </span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-3.5 sm:mb-6 rounded-full"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive technical expertise across modern frontend and web technologies
          </p>
        </motion.div>

        {/* Technical Skills Categories */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={cardFadeUp}
              className="bg-white dark:bg-neutral-900/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-md border border-gray-200/80 dark:border-neutral-800/80 hover:border-gray-300 dark:hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="pb-3.5 mb-4 sm:pb-4 sm:mb-5 border-b border-gray-100 dark:border-neutral-800/80">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white text-center">
                    {category.title}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillCard key={skillIndex} skill={skill} index={skillIndex} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Concepts */}
        <motion.div
          variants={cardFadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="bg-white dark:bg-neutral-900/90 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 shadow-sm hover:shadow-md border border-gray-200/80 dark:border-neutral-800/80 hover:border-gray-300 dark:hover:border-neutral-700 transition-all duration-300">
            <div className="flex items-center justify-between pb-3.5 mb-5 sm:pb-4 sm:mb-6 border-b border-gray-100 dark:border-neutral-800/80">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                  Core Capabilities
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Foundational computer science & engineering principles
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
              {coreSkills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4.5 bg-gray-50/80 dark:bg-neutral-950/60 rounded-xl sm:rounded-2xl border border-gray-200/70 dark:border-neutral-800/70 hover:border-blue-300/80 dark:hover:border-blue-500/40 hover:bg-white dark:hover:bg-neutral-900 hover:shadow-xs transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/40 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                      <IconComponent size={19} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-neutral-900 dark:text-white mb-0.5 sm:mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-xs sm:text-sm md:text-base">
                        {skill.name}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-[11px] sm:text-xs leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
