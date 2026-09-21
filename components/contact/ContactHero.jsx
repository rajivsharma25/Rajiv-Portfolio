"use client";

import { motion } from "framer-motion";
import { Sparkles, Clock, Globe, Briefcase } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ContactHero() {
  const highlights = [
    {
      icon: Clock,
      label: "Response Time",
      value: "Under 24 Hours",
      subvalue: "Usually within 2h",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
      borderColor: "border-emerald-100 dark:border-emerald-900/30",
    },
    {
      icon: Globe,
      label: "Location & Timezone",
      value: "Noida, India (IST)",
      subvalue: "Flexible for US/EU/APAC",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      borderColor: "border-blue-100 dark:border-blue-800/40",
    },
    {
      icon: Briefcase,
      label: "Engagement Types",
      value: "Full-Time & Contract",
      subvalue: "Engineering & Freelance",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/40",
      borderColor: "border-purple-100 dark:border-purple-900/30",
    },
  ];

  return (
    <section className="relative pt-8 pb-10 sm:pt-12 sm:pb-14 px-3.5 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-medium mb-5 sm:mb-6 shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Available for Full-time Roles & Freelance Projects</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white tracking-tight leading-tight sm:leading-tight mb-4 sm:mb-5">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-300 bg-clip-text text-transparent">
              Exceptional
            </span>{" "}
            Together
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
            Whether you&apos;re looking to hire a dedicated software engineer, build a modern web application from the ground up, or discuss an innovative idea, I&apos;d love to connect.
          </p>
        </motion.div>

        {/* Quick Highlights Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-neutral-900/80 border border-gray-200/80 dark:border-neutral-800/80 shadow-xs hover:border-blue-400/60 dark:hover:border-blue-500/40 transition-all duration-200 group"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${item.bgColor} ${item.borderColor} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}
                >
                  <Icon size={18} className={item.color} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                    {item.label}
                  </span>
                  <p className="font-semibold text-xs sm:text-sm text-neutral-900 dark:text-white truncate">
                    {item.value}
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                    {item.subvalue}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
