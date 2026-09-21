"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code2,
  Globe,
  Layers,
  Layout,
  Cpu,
  Zap,
  Sparkles,
  Compass,
  User,
  Terminal,
  Briefcase,
  FolderGit2,
  Award,
  Send,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About", href: "/#about", icon: User },
    { name: "Skills", href: "/#skills", icon: Terminal },
    { name: "Experience", href: "/#experience", icon: Briefcase },
    { name: "Projects", href: "/#projects", icon: FolderGit2 },
    { name: "Certifications", href: "/#certifications", icon: Award },
    { name: "Contact", href: "/#contact", icon: Send },
    { name: "Blogs", href: "/blogs", icon: BookOpen },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/rajivsharma25",
      icon: Github,
      color: "hover:text-gray-400",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/rajivsharma25",
      icon: Linkedin,
      color: "hover:text-blue-400",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/919305635022?text=Hi%20Rajiv,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you.",
      icon: FaWhatsapp,
      color: "hover:text-green-400",
    },
    {
      name: "Email",
      url: "mailto:rajivsharma93056@gmail.com",
      icon: Mail,
      color: "hover:text-red-400",
    },
  ];

  const services = [
    { name: "React.js Development", icon: Code2 },
    { name: "Next.js Web Applications", icon: Globe },
    { name: "Frontend Architecture", icon: Layers },
    { name: "Responsive UI/UX Design", icon: Layout },
    { name: "Redux & State Management", icon: Cpu },
    { name: "Performance Optimization", icon: Zap },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-neutral-900 text-white transition-colors duration-300 border-t border-gray-800 dark:border-neutral-800">

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.webp"
                alt="Rajiv Sharma Logo"
                width={200}
                height={60}
                className="h-auto w-[90px] sm:w-[100px] invert-100 -ml-1.5"
                loading="lazy"
              />
            </Link>
            <p className="text-neutral-300 mb-5 sm:mb-6 leading-relaxed text-xs sm:text-sm">
              Software Developer dedicated to building high-performance, scalable, and responsive web applications with clean code and robust digital solutions.
            </p>
            <div className="flex items-center gap-2.5 sm:gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 sm:p-2.5 bg-gray-800 dark:bg-neutral-800 text-gray-300 dark:text-neutral-300 rounded-full transition-all duration-300 hover:scale-110 ${social.color} border border-gray-700 dark:border-neutral-700/60 hover:border-blue-400 hover:text-white`}
                    title={social.name}
                  >
                    <IconComponent size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-blue-400 flex items-center gap-2">
              <Compass size={18} className="text-blue-400" />
              Quick Links
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 sm:gap-2.5">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className="group flex items-center justify-between p-2 sm:p-2.5 rounded-2xl bg-gray-800/60 dark:bg-neutral-800/60 hover:bg-gray-800 dark:hover:bg-neutral-800 border border-gray-700/60 dark:border-neutral-700/60 hover:border-blue-500/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                      <div className="p-1.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                        <IconComponent size={13} />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-300 dark:text-neutral-300 group-hover:text-white transition-colors truncate font-medium">
                        {link.name}
                      </span>
                    </div>
                    <ArrowRight
                      size={12}
                      className="text-gray-400 dark:text-neutral-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:text-blue-400 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 mr-1"
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-blue-400 flex items-center gap-2">
              <Sparkles size={18} className="text-blue-400" />
              Areas of Focus
            </h4>
            <div className="p-3 sm:p-4 rounded-2xl bg-gray-800/60 dark:bg-neutral-800/60 border border-gray-700/60 dark:border-neutral-700/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 sm:gap-3">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 sm:gap-3 text-gray-300 dark:text-neutral-300 group/item hover:text-white transition-colors"
                  >
                    <div className="p-1.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300 flex-shrink-0">
                      <IconComponent size={13} />
                    </div>
                    <span className="text-xs sm:text-sm font-medium truncate">
                      {service.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-blue-400 flex items-center gap-2">
              <Send size={18} className="text-blue-400" />
              Contact Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 sm:gap-2.5">
              {/* Email Card */}
              <a
                href="mailto:rajivsharma93056@gmail.com"
                className="group flex items-center justify-between p-2 sm:p-2.5 rounded-2xl bg-gray-800/60 dark:bg-neutral-800/60 hover:bg-gray-800 dark:hover:bg-neutral-800 border border-gray-700/60 dark:border-neutral-700/60 hover:border-blue-500/40 transition-all duration-300"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                    <Mail size={13} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider text-gray-400 dark:text-neutral-400 group-hover:text-blue-300 transition-colors">
                      Email
                    </p>
                    <p className="text-xs sm:text-sm text-gray-200 dark:text-neutral-200 group-hover:text-white truncate font-medium">
                      rajivsharma93056@gmail.com
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={12}
                  className="text-gray-400 dark:text-neutral-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:text-blue-400 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 mr-1"
                />
              </a>

              {/* Phone Card */}
              <a
                href="tel:+919305635022"
                className="group flex items-center justify-between p-2 sm:p-2.5 rounded-2xl bg-gray-800/60 dark:bg-neutral-800/60 hover:bg-gray-800 dark:hover:bg-neutral-800 border border-gray-700/60 dark:border-neutral-700/60 hover:border-blue-500/40 transition-all duration-300"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                    <Phone size={13} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider text-gray-400 dark:text-neutral-400 group-hover:text-blue-300 transition-colors">
                      Phone
                    </p>
                    <p className="text-xs sm:text-sm text-gray-200 dark:text-neutral-200 group-hover:text-white truncate font-medium">
                      +91 9305635022
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={12}
                  className="text-gray-400 dark:text-neutral-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:text-blue-400 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 mr-1"
                />
              </a>

              {/* Location Card */}
              <div className="group flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-gray-800/60 dark:bg-neutral-800/60 hover:bg-gray-800 dark:hover:bg-neutral-800 border border-gray-700/60 dark:border-neutral-700/60 hover:border-blue-500/40 transition-all duration-300 cursor-default">
                <div className="p-1.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                  <MapPin size={13} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider text-gray-400 dark:text-neutral-400">
                    Location
                  </p>
                  <p className="text-xs sm:text-sm text-gray-200 dark:text-neutral-200 truncate font-medium">
                    Noida, Uttar Pradesh, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-center">
            <p className="text-neutral-400 text-xs sm:text-sm text-center">
              © {currentYear} Rajiv Sharma. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
