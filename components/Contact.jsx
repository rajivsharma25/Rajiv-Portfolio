"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  MessageCircle,
  User,
  AtSign,
  MessageSquare,
  ArrowUpRight,
  Clock,
  Sparkles,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success(t("contact.successTitle"), {
          description: t("contact.successDesc"),
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error("Error sending message:", data);
        toast.error(t("contact.errorTitle"), {
          description: data.error || t("contact.errorDesc"),
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t("contact.networkError"), {
        description: t("contact.networkErrorDesc"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t("contact.channels.email"),
      value: "rajivsharma93056@gmail.com",
      link: "mailto:rajivsharma93056@gmail.com",
      color: "text-red-500 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-950/40",
      borderColor: "border-red-100 dark:border-red-900/30",
    },
    {
      icon: FaWhatsapp,
      title: t("contact.channels.whatsapp"),
      value: "+91 9305635022",
      link: "https://wa.me/919305635022?text=Hi%20Rajiv,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you.",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
      borderColor: "border-emerald-100 dark:border-emerald-900/30",
    },
    {
      icon: Linkedin,
      title: t("contact.channels.linkedin"),
      value: "linkedin.com/in/rajivsharma25",
      link: "https://linkedin.com/in/rajivsharma25",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      borderColor: "border-blue-100 dark:border-blue-800/40",
    },
    {
      icon: MapPin,
      title: t("contact.channels.location"),
      value: t("contact.channels.locationValue"),
      link: "https://maps.app.goo.gl/h6TbMkZFqFLaYZG88",
      color: "text-sky-600 dark:text-sky-400",
      bgColor: "bg-sky-50 dark:bg-sky-950/40",
      borderColor: "border-sky-100 dark:border-sky-900/30",
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/rajivsharma25",
      hoverClass: "hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/rajivsharma25",
      hoverClass: "hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      url: "https://wa.me/919305635022?text=Hi%20Rajiv,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you.",
      hoverClass: "hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:rajivsharma93056@gmail.com",
      hoverClass: "hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30",
    },
    {
      name: "Phone",
      icon: Phone,
      url: "tel:+919305635022",
      hoverClass: "hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30",
    },
  ];

  const quickHighlights = [
    {
      title: t("contact.availability.item1Title"),
      subtitle: t("contact.availability.item1Sub"),
      icon: Sparkles,
      status: t("contact.availability.item1Status"),
      badgeColor: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40",
      indicator: true,
    },
    {
      title: t("contact.availability.item2Title"),
      subtitle: t("contact.availability.item2Sub"),
      icon: Clock,
      status: t("contact.availability.item2Status"),
      badgeColor: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/40",
      indicator: false,
    },
    {
      title: t("contact.availability.item3Title"),
      subtitle: t("contact.availability.item3Sub"),
      icon: Globe,
      status: t("contact.availability.item3Status"),
      badgeColor: "bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 border-sky-100 dark:border-sky-800/40",
      indicator: false,
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-12 sm:py-16 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-gray-50 dark:bg-neutral-950 transition-colors duration-300"
    >
      {/* Pure Soft Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-blue-500/6 dark:bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-sky-500/6 dark:bg-indigo-600/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2.5 sm:mb-4 leading-normal sm:leading-snug py-0.5">
            {t("contact.heading")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent inline-block py-0.5">
              {t("contact.headingHighlight")}
            </span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-3.5 sm:mb-6 rounded-full"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            {t("contact.subheading")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Bento Information Cards */}
          <motion.div
            className="lg:col-span-6 space-y-5 sm:space-y-6"
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Direct Channels Bento Box */}
            <div className="bg-white dark:bg-neutral-900/90 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm border border-gray-200/80 dark:border-neutral-800/80 transition-all duration-300">
              <div className="pb-3.5 sm:pb-4 mb-4 sm:mb-5 border-b border-gray-100 dark:border-neutral-800/80 flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                    {t("contact.directChannels")}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {t("contact.directChannelsSub")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.link}
                      target={info.link.startsWith("http") ? "_blank" : undefined}
                      rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 bg-gray-50/80 dark:bg-neutral-950/60 rounded-xl sm:rounded-2xl border border-gray-200/70 dark:border-neutral-800/70 hover:border-blue-400/60 dark:hover:border-blue-500/40 hover:bg-white dark:hover:bg-neutral-900 hover:shadow-xs transition-all duration-200 group min-w-0"
                    >
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${info.bgColor} ${info.borderColor} border flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}
                      >
                        <IconComponent size={18} className={info.color} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            {info.title}
                          </span>
                          <ArrowUpRight
                            size={12}
                            className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          />
                        </div>
                        <p
                          className="font-semibold text-xs sm:text-sm text-neutral-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                          title={info.value}
                        >
                          {info.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Collaboration & Working Terms */}
            <div className="bg-white dark:bg-neutral-900/90 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm border border-gray-200/80 dark:border-neutral-800/80 transition-all duration-300">
              <div className="pb-3.5 sm:pb-4 mb-4 sm:mb-5 border-b border-gray-100 dark:border-neutral-800/80 flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                    {t("contact.availability.heading")}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {t("contact.availability.subheading")}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {quickHighlights.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={index}
                      className="p-3 sm:p-3.5 bg-gray-50/80 dark:bg-neutral-950/60 rounded-xl sm:rounded-2xl border border-gray-200/70 dark:border-neutral-800/70 flex items-start gap-3 sm:gap-3.5 transition-all duration-200 hover:border-gray-300 dark:hover:border-neutral-700"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <IconComponent size={17} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white leading-normal py-0.5">
                            {item.title}
                          </h4>
                          <span
                            className={`text-[10px] sm:text-[11px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full border ${item.badgeColor} flex items-center gap-1 flex-shrink-0`}
                          >
                            {item.indicator && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            )}
                            {item.status}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Channels Bento Box */}
            <div className="bg-white dark:bg-neutral-900/90 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm border border-gray-200/80 dark:border-neutral-800/80 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <MessageCircle size={18} className="text-blue-600 dark:text-blue-400" />
                    {t("contact.social.heading")}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {t("contact.social.subheading")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-gray-200 dark:border-neutral-700 flex items-center justify-center transition-all duration-200 active:scale-95 ${social.hoverClass}`}
                        title={social.name}
                      >
                        <IconComponent size={17} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form (Sticky on Desktop) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 z-10 self-start">
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="bg-white dark:bg-neutral-900/90 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 shadow-sm border border-gray-200/80 dark:border-neutral-800/80 transition-all duration-300">
              {/* Form Title & Intro */}
              <div className="pb-4 sm:pb-5 mb-5 sm:mb-6 border-b border-gray-100 dark:border-neutral-800/80">
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <h3 className="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2 sm:gap-2.5">
                    <Send size={18} className="text-blue-600 dark:text-blue-400" />
                    {t("contact.sendEmail")}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                  {t("contact.quickResponse")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5 sm:mb-2"
                    >
                      <User size={13} className="text-blue-600 dark:text-blue-400" />
                      {t("contact.nameLabel")} <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border border-gray-200 dark:border-neutral-700 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/80 dark:bg-neutral-800/60 focus:bg-white dark:focus:bg-neutral-900 outline-none text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                      placeholder={t("contact.namePlaceholder")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5 sm:mb-2"
                    >
                      <AtSign size={13} className="text-blue-600 dark:text-blue-400" />
                      {t("contact.emailLabel")} <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border border-gray-200 dark:border-neutral-700 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/80 dark:bg-neutral-800/60 focus:bg-white dark:focus:bg-neutral-900 outline-none text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                      placeholder={t("contact.emailPlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5 sm:mb-2"
                  >
                    <MessageSquare size={13} className="text-blue-600 dark:text-blue-400" />
                    {t("contact.messageLabel")} <span className="text-blue-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border border-gray-200 dark:border-neutral-700 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none bg-gray-50/80 dark:bg-neutral-800/60 focus:bg-white dark:focus:bg-neutral-900 outline-none text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                    placeholder={t("contact.messagePlaceholder")}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={15} />
                  <span>
                    {isSubmitting ? t("contact.sending") : t("contact.sendMessage")}
                  </span>
                </button>
              </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

