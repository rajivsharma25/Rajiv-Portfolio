"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Sparkles,
  MessageSquare,
  Send,
  Code2,
  Rocket,
  Coffee,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const floatingIcons = [
  {
    icon: Sparkles,
    position: "top-[12%] left-[8%]",
    color: "text-white/30",
    size: 26,
    animate: { y: [0, -14, 0], x: [0, 4, 0], rotate: [0, 12, 0] },
    transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
  },
  {
    icon: MessageSquare,
    position: "top-[20%] right-[9%]",
    color: "text-white/25",
    size: 24,
    animate: { y: [0, 12, 0], x: [0, -5, 0], rotate: [0, -8, 0] },
    transition: { duration: 5.1, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
  },
  {
    icon: Rocket,
    position: "top-[14%] right-[24%]",
    color: "text-white/25",
    size: 22,
    animate: { y: [0, -16, 0], rotate: [0, 14, 0] },
    transition: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1 },
  },
  {
    icon: Code2,
    position: "bottom-[16%] left-[9%]",
    color: "text-white/30",
    size: 28,
    animate: { y: [0, 15, 0], x: [0, 6, 0], rotate: [0, -10, 0] },
    transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
  },
  {
    icon: Send,
    position: "bottom-[22%] right-[11%]",
    color: "text-white/25",
    size: 22,
    animate: { y: [0, -12, 0], x: [0, -4, 0], rotate: [0, 10, 0] },
    transition: { duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
  },
  {
    icon: Coffee,
    position: "bottom-[14%] left-[25%]",
    color: "text-white/25",
    size: 20,
    animate: { y: [0, -10, 0], rotate: [0, -6, 0] },
    transition: { duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 1.8 },
  },
  {
    icon: Zap,
    position: "top-[48%] left-[4%]",
    color: "text-white/30",
    size: 20,
    animate: { y: [0, 14, 0], rotate: [0, 15, 0] },
    transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
  },
  {
    icon: Mail,
    position: "top-[44%] right-[5%]",
    color: "text-white/20",
    size: 22,
    animate: { y: [0, -12, 0], x: [0, 5, 0], rotate: [0, -8, 0] },
    transition: { duration: 5.3, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
  },
  {
    icon: Sparkles,
    position: "bottom-[28%] right-[22%]",
    color: "text-white/25",
    size: 16,
    animate: { y: [0, 8, 0], rotate: [0, 18, 0] },
    transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
  },
  {
    icon: Phone,
    position: "top-[18%] left-[22%]",
    color: "text-white/20",
    size: 18,
    animate: { y: [0, -8, 0], rotate: [0, -12, 0] },
    transition: { duration: 4.9, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
  },
];

export default function ContactCTA() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-gray-50 dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-3xl p-6 sm:p-10 md:p-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Subtle Ambient Background Circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Floating Animated Icons (No Background, Organic Placement) */}
          {floatingIcons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                className={`absolute ${item.position} pointer-events-none hidden sm:block select-none`}
                animate={item.animate}
                transition={item.transition}
              >
                <Icon size={item.size} className={`${item.color} drop-shadow-sm`} />
              </motion.div>
            );
          })}

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-4">
              <Zap size={13} className="text-amber-300" />
              <span>Fast-Track Connection</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3 sm:mb-4">
              Prefer An Immediate Conversation?
            </h2>

            <p className="text-sm sm:text-base text-blue-100 mb-8 sm:mb-10 leading-relaxed">
              Skip the contact form! Send me a direct WhatsApp ping or an email, and let&apos;s start discussing your next big move right away.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
              <a
                href="https://wa.me/919305635022?text=Hi%20Rajiv,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%20or%20role%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200"
              >
                <FaWhatsapp size={18} />
                <span>Chat on WhatsApp</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href="mailto:rajivsharma93056@gmail.com"
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-full bg-white hover:bg-neutral-100 active:scale-95 text-neutral-900 font-bold text-xs sm:text-sm shadow-md transition-all duration-200"
              >
                <Mail size={16} className="text-blue-600" />
                <span>rajivsharma93056@gmail.com</span>
              </a>

              <a
                href="tel:+919305635022"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 font-medium text-xs sm:text-sm transition-all duration-200"
              >
                <Phone size={15} />
                <span>+91 9305635022</span>
              </a>
            </div>

            {/* Trust Reassurance */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] sm:text-xs text-blue-100/80 pt-6 border-t border-white/15">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-300" />
                Direct Communication with Rajiv
              </span>
              <span>•</span>
              <span>No Spam Guarantee</span>
              <span>•</span>
              <span>Prompt Response Within 24h</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
