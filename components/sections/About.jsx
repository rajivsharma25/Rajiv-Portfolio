"use client";
import {
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Layers,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  const infoTiles = [
    {
      icon: MapPin,
      label: "Location",
      value: "Greater Noida, UP",
    },
    {
      icon: GraduationCap,
      label: "Education",
      value: "B.Tech CSE (2024)",
    },
    {
      icon: Briefcase,
      label: "Experience",
      value: "1+ Years",
    },
    {
      icon: Code2,
      label: "Specialization",
      value: "Software Development",
    },
  ];

  const quickFacts = [
    {
      icon: Briefcase,
      title: "1+ Years Experience",
      desc: "Developing scalable, high-performance web applications",
      iconBg: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/40",
    },
    {
      icon: Award,
      title: "AWS Certified Cloud Practitioner",
      desc: "Amazon Web Services cloud architecture & core infrastructure",
      iconBg: "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800/40",
    },
    {
      icon: Layers,
      title: "6+ Deployed Web Projects",
      desc: "Production-ready apps spanning e-commerce, healthcare & booking",
      iconBg: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/40",
    },
    {
      icon: GraduationCap,
      title: "B.Tech CSE Graduate",
      desc: "Computer Science & Engineering graduate (CGPA: 7.56/10)",
      iconBg: "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800/40",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-12 sm:py-16 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900 transition-colors duration-300"
    >
      {/* Pure Soft Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-400/8 dark:bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -left-20 w-96 h-96 bg-sky-400/8 dark:bg-indigo-600/8 rounded-full blur-3xl" />
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
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent inline-block py-0.5">
              Me
            </span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-3.5 sm:mb-6 rounded-full"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Get to know my journey, engineering focus, and core technical background
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Bio & Info Tiles */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="bg-gray-50/80 dark:bg-neutral-800/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 border border-gray-200/80 dark:border-neutral-700/60 hover:border-gray-300 dark:hover:border-neutral-600 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-2 mb-3.5 sm:mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
                  <Sparkles size={13} className="text-blue-500" />
                  Developer Profile
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-3 sm:mb-4">
                Software Developer
              </h3>

              <div className="space-y-3 sm:space-y-4 text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm md:text-[15px] leading-relaxed mb-6 sm:mb-8">
                <p>
                  As a <strong className="text-neutral-900 dark:text-white font-semibold">Software Developer</strong>, I specialize in building robust, performant web applications leveraging the modern capabilities of <strong className="text-neutral-900 dark:text-white font-semibold">React.js</strong> and <strong className="text-neutral-900 dark:text-white font-semibold">Next.js</strong>.
                </p>
                <p>
                  I focus on developing clean, scalable client-side architectures, integrating complex REST APIs, and maintaining reliable state management systems. My dedication to frontend performance optimization, accessibility standards (a11y), and modular design ensures digital products are technically sound and intuitive.
                </p>
                <p>
                  Driven by curiosity and a problem-solving mindset, I continually explore emerging web technologies and modern architectural patterns to deliver seamless user experiences.
                </p>
              </div>

              {/* Quick Info Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 pt-5 sm:pt-6 border-t border-gray-200/70 dark:border-neutral-700/60">
                {infoTiles.map((tile, index) => {
                  const IconComponent = tile.icon;
                  return (
                    <div
                      key={index}
                      className="group p-3 sm:p-3.5 bg-white dark:bg-neutral-900/80 rounded-xl sm:rounded-2xl border border-gray-200/70 dark:border-neutral-700/60 hover:border-blue-300/80 dark:hover:border-blue-500/40 hover:shadow-xs transition-all duration-200 flex items-center gap-3 sm:gap-3.5 shadow-2xs"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/40 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                        <IconComponent size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                          {tile.label}
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {tile.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Highlights */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 z-10 self-start">
            <motion.div
              className="space-y-6"
              variants={slideRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              {/* Quick Facts Card */}
              <div className="bg-gray-50/80 dark:bg-neutral-800/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 border border-gray-200/80 dark:border-neutral-700/60 hover:border-gray-300 dark:hover:border-neutral-600 shadow-sm hover:shadow-md transition-all duration-300">
                <h4 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-4 sm:mb-6">
                  Key Highlights
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-4">
                  {quickFacts.map((fact, index) => {
                    const IconComponent = fact.icon;
                    return (
                      <div
                        key={index}
                        className="group p-3 sm:p-3.5 bg-white dark:bg-neutral-900/80 rounded-xl sm:rounded-2xl border border-gray-200/70 dark:border-neutral-700/60 hover:border-blue-300/80 dark:hover:border-blue-500/40 hover:shadow-xs transition-all duration-200 flex items-start gap-3 sm:gap-3.5"
                      >
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-200 ${fact.iconBg}`}
                        >
                          <IconComponent size={18} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-normal mb-1">
                            {fact.title}
                          </div>
                          <div className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {fact.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
