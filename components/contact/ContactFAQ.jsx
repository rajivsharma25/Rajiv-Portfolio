"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const faqs = [
  {
    question: "What is your current availability for work?",
    answer:
      "I am currently actively open to full-time software engineering roles as well as selected freelance, contract, or consulting projects. Feel free to reach out to discuss role fit and timelines.",
  },
  {
    question: "How do you handle collaboration across international time zones?",
    answer:
      "I am based in Noida, India (IST, UTC+5:30). I have extensive experience coordinating asynchronously and setting up scheduled overlap windows for teams in North America (EST/PST), Europe (GMT/CET), and the Asia-Pacific region.",
  },
  {
    question: "What core technologies do you specialize in?",
    answer:
      "My core stack centers on modern web technologies: Next.js 15, React 19, TypeScript, JavaScript (ES6+), Node.js, Express, Tailwind CSS v4, MongoDB, PostgreSQL, and Framer Motion.",
  },
  {
    question: "What is the typical kickoff timeline for a new project?",
    answer:
      "For small-to-medium projects or feature additions, we can typically kick off within 3 to 7 business days following our initial discovery call and scope agreement. Rush timelines can also be accommodated depending on scheduling.",
  },
  {
    question: "Do you provide post-launch support and maintenance?",
    answer:
      "Yes. Every project includes a post-launch warranty period for bug fixes, performance monitoring, and handover documentation. Ongoing monthly maintenance and retainer agreements are also available.",
  },
  {
    question: "How do we communicate throughout the collaboration?",
    answer:
      "I adapt to your team's preferred communication channels—typically Slack, Discord, WhatsApp, or Microsoft Teams for day-to-day messaging, paired with Google Meet/Zoom for sprint demos and GitHub/Linear for issue tracking.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900/50 border-t border-b border-gray-200/70 dark:border-neutral-800/70">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-3 sm:mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-4 rounded-full" />
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Everything you need to know about working together, timelines, communication, and technical expectations.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-gray-50/90 dark:bg-neutral-900 border-blue-500/50 shadow-xs"
                    : "bg-white dark:bg-neutral-900/60 border-gray-200/80 dark:border-neutral-800/80 hover:border-gray-300 dark:hover:border-neutral-700"
                }`}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-xs sm:text-base text-neutral-900 dark:text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "bg-blue-600 text-white rotate-180"
                        : "bg-gray-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-gray-200/50 dark:border-neutral-800/60">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}
