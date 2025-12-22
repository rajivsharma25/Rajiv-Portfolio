"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Download, Linkedin, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-violet-100 dark:border-gray-800 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Rajiv Sharma Logo"
              width={100}
              height={100}
              className="rounded-full dark:invert-100"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 font-medium">
            <Link
              href="#about"
              className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            >
              About Me
            </Link>
            <Link
              href="#skills"
              className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            >
              Skills
            </Link>
            <Link
              href="#experience"
              className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            >
              Experience
            </Link>
            <Link
              href="#projects"
              className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            >
              Contact Me
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-gray-800 transition-all duration-300 active:scale-95 cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-[10px] font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-sm">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </div>
            <a
              href="https://linkedin.com/in/rajivsharma25"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-violet-600 text-violet-600 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:bg-violet-600 hover:text-white active:scale-95"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href="/Rajiv-Sharma.pdf"
              download
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 hover:from-purple-700 hover:to-violet-700 active:scale-95 shadow-md hover:shadow-lg"
            >
              <Download size={16} />
              Download CV
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800 font-medium">
            <div className="flex flex-col space-y-4">
              <Link
                href="#about"
                className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About Me
              </Link>
              <Link
                href="#skills"
                className="text-gray-700 hover:text-violet-600 transition-colors duration-300 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Skills
              </Link>
              <Link
                href="#experience"
                className="text-gray-700 hover:text-violet-600 transition-colors duration-300 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Experience
              </Link>
              <Link
                href="#projects"
                className="text-gray-700 hover:text-violet-600 transition-colors duration-300 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="#contact"
                className="text-gray-700 hover:text-violet-600 transition-colors duration-300 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Me
              </Link>

              {/* Mobile CTA Buttons */}
              <div className="flex flex-col space-y-3 mt-4">
                <button
                  onClick={toggleTheme}
                  className="mb-4 inline-flex items-center gap-2 text-gray-700 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 px-2 py-1 transition-colors duration-300 cursor-pointer"
                >
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
                <a
                  href="https://linkedin.com/in/rajivsharma25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-violet-600 text-violet-600 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:bg-violet-600 hover:text-white active:scale-95 w-fit"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
                <a
                  href="/Rajiv-Sharma.pdf"
                  download
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 hover:from-purple-700 hover:to-violet-700 active:scale-95 shadow-md hover:shadow-lg w-fit"
                >
                  <Download size={16} />
                  Download CV
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
