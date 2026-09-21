"use client";

import { motion } from "framer-motion";
import { Layout, Server, Zap, Sparkles, CheckCircle2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ContactServices() {
  const services = [
    {
      icon: Layout,
      title: "Frontend Engineering",
      badge: "Core Specialty",
      badgeColor: "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/40",
      description:
        "Building pixel-perfect, accessible, and ultra-responsive web applications using modern component architectures.",
      deliverables: [
        "Next.js 15 App Router & Server Components",
        "React 19, TypeScript & Custom Hooks",
        "Tailwind CSS v4 & Modular Design Systems",
        "Fluid cross-device responsiveness",
      ],
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    {
      icon: Server,
      title: "Full-Stack & Backend Systems",
      badge: "End-to-End",
      badgeColor: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40",
      description:
        "Designing robust server-side systems, RESTful APIs, database schemas, and seamless third-party integrations.",
      deliverables: [
        "Scalable RESTful API architecture",
        "Database modeling (MongoDB & PostgreSQL)",
        "Authentication, RBAC & secure sessions",
        "Third-party integrations (Resend, Stripe, etc.)",
      ],
      tech: ["Node.js", "Express", "MongoDB", "REST APIs"],
    },
    {
      icon: Sparkles,
      title: "UI/UX & Micro-Interactions",
      badge: "Visual Polish",
      badgeColor: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800/40",
      description:
        "Crafting delightful user experiences with smooth transitions, intuitive flows, and high-impact micro-animations.",
      deliverables: [
        "Framer Motion layout & scroll animations",
        "Interactive dashboards & rich data visuals",
        "Accessible, high-converting checkout & lead forms",
        "Dark & light theme support",
      ],
      tech: ["Framer Motion", "UI Design", "Micro-Interactions"],
    },
    {
      icon: Zap,
      title: "Performance & SEO Optimization",
      badge: "Speed & Reach",
      badgeColor: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/40",
      description:
        "Auditing and accelerating web applications for top-tier Lighthouse scores, instant loads, and search ranking.",
      deliverables: [
        "95+ Google Lighthouse & Core Web Vitals",
        "SEO architecture, OpenGraph & Structured JSON-LD",
        "Asset compression & smart bundle splitting",
        "Edge caching & server-side rendering tuning",
      ],
      tech: ["Core Web Vitals", "Technical SEO", "Lighthouse"],
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900/50 border-t border-b border-gray-200/70 dark:border-neutral-800/70">
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
            Capabilities & Services
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-3 sm:mb-4">
            How We Can{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent">
              Work Together
            </span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-4 rounded-full" />
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            From single-feature implementations to full-scale web applications, here are the key areas where I can add immediate value to your team or project.
          </p>
        </motion.div>

        {/* Services 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="bg-gray-50/70 dark:bg-neutral-900/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-gray-200/80 dark:border-neutral-800/80 hover:border-blue-400/60 dark:hover:border-blue-500/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-white dark:bg-neutral-800 border border-gray-200/80 dark:border-neutral-700/80 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform duration-200 shadow-xs">
                      <Icon size={22} />
                    </div>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${service.badgeColor}`}
                    >
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mb-5 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                        <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="pt-4 border-t border-gray-200/60 dark:border-neutral-800/80 flex flex-wrap gap-1.5">
                  {service.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 border border-gray-200/60 dark:border-neutral-700/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
