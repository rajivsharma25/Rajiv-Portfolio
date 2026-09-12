"use client";
import {
  Calendar,
  Award,
  ExternalLink,
  GraduationCap,
  Trophy,
  BookOpen,
  Building2,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { SiMysql, SiCplusplus } from "react-icons/si";
import { motion } from "framer-motion";
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
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Certifications() {
  const { t } = useLanguage();

  const certifications = [
    {
      title: t("certifications.aws.title"),
      issuer: t("certifications.aws.issuer"),
      date: "2025",
      description: t("certifications.aws.description"),
      skills: Array.isArray(t("certifications.aws.skills"))
        ? t("certifications.aws.skills")
        : ["Cloud Computing", "AWS Services", "Cloud Security", "Cost Management"],
      badge: "/assets/images/aws-badge.png",
      badgeUrl:
        "https://www.credly.com/badges/be66bf69-1877-4ab3-88e9-aa85f0dd88e7/public_url",
      badgeType: "image",
      level: t("certifications.aws.level"),
      status: t("certifications.status"),
    },
    {
      title: t("certifications.sql.title"),
      issuer: t("certifications.sql.issuer"),
      date: "2023",
      description: t("certifications.sql.description"),
      skills: Array.isArray(t("certifications.sql.skills"))
        ? t("certifications.sql.skills")
        : ["Basic SQL Queries", "Data Retrieval", "Table Relationships", "RDBMS Fundamentals"],
      badge: SiMysql,
      badgeUrl:
        "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxODExIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvdGh1bWJfNDU5NTY0NF8xNjk3OTkwMDQ1LnBuZyIsInVzZXJuYW1lIjoiUmFqaXYgU2hhcm1hIn0%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F4309%2FIntroduction-to-SQL%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1507310509089914254&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVD04Pz%2FUL9Pc2c0myrytKTUstKsrMS49PKsovL04tsnVNSU8FAOxz5Aw9AAAA",
      badgeType: "icon",
      level: t("certifications.sql.level"),
      status: t("certifications.status"),
    },
    {
      title: t("certifications.cpp.title"),
      issuer: t("certifications.cpp.issuer"),
      date: "2023",
      description: t("certifications.cpp.description"),
      skills: Array.isArray(t("certifications.cpp.skills"))
        ? t("certifications.cpp.skills")
        : ["C++ Syntax", "Functions", "Loops & Conditions", "OOP Basics"],
      badge: SiCplusplus,
      badgeUrl:
        "https://www.udemy.com/certificate/UC-cc91b127-a4b8-41e1-be25-d69ceff2ee19/",
      badgeType: "icon",
      level: t("certifications.cpp.level"),
      status: t("certifications.status"),
    },
  ];

  const achievements = [
    {
      title: t("certifications.education.btech.title"),
      institution: t("certifications.education.btech.institution"),
      year: t("certifications.education.btech.year"),
      degree: t("certifications.education.btech.degree"),
      description: t("certifications.education.btech.description"),
      icon: GraduationCap,
      status: t("certifications.education.graduated"),
    },
    {
      title: t("certifications.education.class12.title"),
      institution: t("certifications.education.class12.institution"),
      year: t("certifications.education.class12.year"),
      degree: t("certifications.education.class12.degree"),
      description: t("certifications.education.class12.description"),
      icon: BookOpen,
      status: t("certifications.education.completed"),
    },
    {
      title: t("certifications.education.class10.title"),
      institution: t("certifications.education.class10.institution"),
      year: t("certifications.education.class10.year"),
      degree: t("certifications.education.class10.degree"),
      description: t("certifications.education.class10.description"),
      icon: Trophy,
      status: t("certifications.education.completed"),
    },
  ];

  return (
    <section
      id="certifications"
      className="relative py-12 sm:py-16 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900 transition-colors duration-300 overflow-hidden"
    >
      {/* Pure Soft Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-blue-500/6 dark:bg-blue-600/7 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-indigo-500/6 dark:bg-sky-600/7 rounded-full blur-3xl" />
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
            {t("certifications.heading")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent inline-block py-0.5">
              {t("certifications.headingHighlight")}
            </span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-3.5 sm:mb-6 rounded-full"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            {t("certifications.subheading")}
          </p>
        </motion.div>

        {/* Professional Certifications */}
        <motion.div
          className="mb-10 sm:mb-14"
          variants={cardFadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="flex items-center justify-between pb-3.5 sm:pb-4 mb-5 sm:mb-6 border-b border-gray-100 dark:border-neutral-800">
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-white">
                Industry Certifications
              </h3>
              <p className="text-[11px] sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                Accredited cloud, database, and programming credentials
              </p>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
          >
            {certifications.map((cert, index) => {
              const IconBadge = cert.badge;
              return (
                <motion.div
                  key={index}
                  variants={cardFadeUp}
                  className="bg-gray-50/80 dark:bg-neutral-800/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 border border-gray-200/80 dark:border-neutral-700/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Badge/Icon & Status Pills */}
                    <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-white dark:bg-neutral-900 border border-gray-200/70 dark:border-neutral-700/70 flex items-center justify-center p-2 sm:p-2.5 flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-200">
                        {cert.badgeType === "image" ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={cert.badge}
                              alt={`${cert.title} badge`}
                              fill
                              className="object-contain"
                              sizes="64px"
                            />
                          </div>
                        ) : (
                          <IconBadge
                            size={28}
                            className={
                              cert.title.includes("SQL")
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-sky-600 dark:text-sky-400"
                            }
                          />
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-1 sm:gap-1.5">
                        <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          {cert.status}
                        </span>
                        <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/40">
                          {cert.level}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-neutral-900 dark:text-white mb-1.5 sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-normal">
                      {cert.title}
                    </h4>

                    {/* Issuer & Date */}
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2.5 sm:mb-3">
                      <Building2 size={13} className="flex-shrink-0" />
                      <span>{cert.issuer}</span>
                      <span className="text-neutral-400">•</span>
                      <Calendar size={12} className="flex-shrink-0 ml-0.5" />
                      <span>{cert.date}</span>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                      {cert.description}
                    </p>
                  </div>

                  {/* Skills / Topics list */}
                  <div className="pt-3.5 sm:pt-4 border-t border-gray-200/70 dark:border-neutral-700/60">
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill, sIndex) => (
                        <span
                          key={sIndex}
                          className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-medium bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-gray-200/70 dark:border-neutral-700/70 shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Academic Credentials */}
        <motion.div
          variants={cardFadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="flex items-center justify-between pb-3.5 sm:pb-4 mb-5 sm:mb-6 border-b border-gray-100 dark:border-neutral-800">
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-white">
                {t("certifications.education.heading")}
              </h3>
              <p className="text-[11px] sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                {t("certifications.education.subheading")}
              </p>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
          >
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardFadeUp}
                  className="bg-gray-50/80 dark:bg-neutral-800/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 border border-gray-200/80 dark:border-neutral-700/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Icon & Status Badge */}
                    <div className="flex items-center justify-between mb-4 sm:mb-5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        <IconComponent size={22} />
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-gray-200 dark:border-neutral-700">
                        <Calendar size={12} className="text-blue-600 dark:text-blue-400" />
                        {achievement.year}
                      </span>
                    </div>

                    {/* Degree / Level */}
                    <span className="text-[11px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400 block mb-1">
                      {achievement.degree}
                    </span>

                    {/* Title */}
                    <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-1.5 sm:mb-2 leading-normal group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {achievement.title}
                    </h4>

                    {/* Institution */}
                    <div className="flex items-start gap-2 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mb-2.5 sm:mb-3">
                      <Building2 size={13} className="flex-shrink-0 mt-0.5 text-neutral-400" />
                      <span>{achievement.institution}</span>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Status Indicator */}
                  <div className="pt-3.5 sm:pt-4 mt-4 sm:mt-5 border-t border-gray-200/60 dark:border-neutral-700/60 flex items-center justify-between">
                    <span className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                      {t("certifications.education.status")}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {achievement.status}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
