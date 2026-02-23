import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Download,
  Heart,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Me", href: "#about" },
    { name: "My Skills", href: "#skills" },
    { name: "My Experience", href: "#experience" },
    { name: "Freelance", href: "#freelance" },
    { name: "My Projects", href: "#projects" },
    { name: "My Certifications", href: "#certifications" },
    { name: "Contact Me", href: "#contact" },
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
    "React.js Development",
    "Frontend Development",
    "Responsive Web Design",
    "Redux State Management",
    "UI/UX Implementation",
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black/80 text-white transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Rajiv Sharma Logo"
                width={100}
                height={100}
                className="rounded-full invert-100"
              />
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Frontend Developer focused on building modern, responsive web
              applications with clean code and seamless user experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 bg-gray-800 dark:bg-gray-900 rounded-full transition-all duration-300 hover:scale-110 ${social.color} border border-gray-700 dark:border-gray-800 hover:border-current`}
                    title={social.name}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-violet-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-violet-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-violet-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-violet-400">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 flex items-start">
                  <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-violet-400">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail size={20} className="text-violet-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <a
                    href="mailto:rajivsharma93056@gmail.com"
                    className="text-white hover:text-violet-300 transition-colors text-sm"
                  >
                    rajivsharma93056@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone size={20} className="text-violet-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">Phone</p>
                  <a
                    href="tel:+919305635022"
                    className="text-white hover:text-violet-300 transition-colors text-sm"
                  >
                    +91 9305635022
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-violet-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">Location</p>
                  <p className="text-white text-sm">Gurugram, Haryana, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h4 className="text-lg font-semibold mb-2 text-violet-400">
                Let&apos;s Connect & Collaborate
              </h4>
              <p className="text-gray-300">
                Ready to discuss your next project or explore collaboration
                opportunities?
              </p>
            </div>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-violet-700 active:scale-95 shadow-md hover:shadow-lg flex-shrink-0"
              >
                <MessageCircle size={16} />
                Let&apos;s Connect
              </a>
              <a
                href="/Rajiv-Sharma-Resume-2025.pdf"
                download
                className="inline-flex items-center gap-2 border border-violet-600 text-violet-400 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-violet-600 hover:text-white active:scale-95 flex-shrink-0"
              >
                <Download size={16} />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © {currentYear} Rajiv Sharma. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <p className="text-gray-400 text-sm flex items-center gap-1">
                Made with
                <Heart size={14} className="text-red-500 fill-current" />
                by Rajiv Sharma
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
