"use client";

import { motion } from "framer-motion";
import { MessageSquareCode, Layers, Code2, Rocket } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ContactProcess() {
  const steps = [
    {
      step: "01",
      icon: MessageSquareCode,
      title: "Discovery & Scope",
      description:
        "We discuss your product goals, target audience, technical requirements, and target timeline to outline clear deliverables.",
    },
    {
      step: "02",
      icon: Layers,
      title: "Architecture & Blueprint",
      description:
        "Selecting the right tech stack, defining database schemas, component hierarchies, and interactive wireframes before writing code.",
    },
    {
      step: "03",
      icon: Code2,
      title: "Agile Build & Previews",
      description:
        "Iterative development sprints with clean, documented code and regular live preview deployments for feedback and transparency.",
    },
    {
      step: "04",
      icon: Rocket,
      title: "Testing, Launch & Support",
      description:
        "Rigorous cross-device testing, SEO optimization, deployment to production (Vercel/Cloud), and post-launch maintenance.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-gray-50 dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Workflow
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-3 sm:mb-4">
            How I{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent">
              Work & Deliver
            </span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-4 rounded-full" />
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            A transparent, structured, and agile collaboration process that turns ambitious ideas into scalable digital products.
          </p>
        </motion.div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="relative bg-white dark:bg-neutral-900/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-gray-200/80 dark:border-neutral-800/80 shadow-xs hover:border-blue-400/60 dark:hover:border-blue-500/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/40 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform duration-200">
                      <Icon size={20} />
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-neutral-200 dark:text-neutral-800 group-hover:text-blue-600/30 dark:group-hover:text-blue-400/30 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
