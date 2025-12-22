import Link from "next/link";
import Image from "next/image";
import { FolderOpen, MessageCircle } from "lucide-react";
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaAws,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiRedux } from "react-icons/si";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/10 dark:to-slate-900 transition-colors duration-300"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-violet-200 to-purple-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200 to-indigo-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-indigo-200 to-violet-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-purple-200 to-violet-300 rounded-full opacity-20 blur-xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="h-full w-full bg-[length:60px_60px]"
            style={{
              backgroundImage: `radial-gradient(circle, #7c3aed 2px, transparent 2px)`,
            }}
          ></div>
        </div>

        {/* Floating Dots */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-violet-400 rounded-full opacity-30"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-indigo-400 rounded-full opacity-25"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-violet-400 rounded-full opacity-35"></div>

        {/* Floating Technology Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {/* React Icon */}
          <div
            className="absolute top-24 left-16 animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "6s" }}
          >
            <FaReact className="text-blue-500 opacity-20 text-3xl" />
          </div>

          {/* JavaScript Icon */}
          <div
            className="absolute top-32 right-24 animate-bounce"
            style={{ animationDelay: "1s", animationDuration: "5s" }}
          >
            <FaJs className="text-yellow-500 opacity-20 text-2xl" />
          </div>

          {/* Next.js Icon */}
          <div
            className="absolute top-1/2 left-12 animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "7s" }}
          >
            <SiNextdotjs className="text-gray-900 opacity-15 text-3xl" />
          </div>

          {/* HTML5 Icon */}
          <div
            className="absolute bottom-40 right-16 animate-bounce"
            style={{ animationDelay: "0.5s", animationDuration: "6s" }}
          >
            <FaHtml5 className="text-orange-500 opacity-20 text-2xl" />
          </div>

          {/* CSS3 Icon */}
          <div
            className="absolute bottom-24 left-24 animate-bounce"
            style={{ animationDelay: "1.5s", animationDuration: "5.5s" }}
          >
            <FaCss3Alt className="text-blue-600 opacity-20 text-2xl" />
          </div>

          {/* Tailwind CSS Icon */}
          <div
            className="absolute top-40 left-1/3 animate-bounce"
            style={{ animationDelay: "3s", animationDuration: "6.5s" }}
          >
            <SiTailwindcss className="text-cyan-500 opacity-15 text-2xl" />
          </div>

          {/* Redux Icon */}
          <div
            className="absolute bottom-1/3 right-1/4 animate-bounce"
            style={{ animationDelay: "2.5s", animationDuration: "5s" }}
          >
            <SiRedux className="text-purple-600 opacity-20 text-2xl" />
          </div>

          {/* Javascript Icon */}
          <div
            className="absolute top-1/3 right-12 animate-bounce"
            style={{ animationDelay: "4s", animationDuration: "7s" }}
          >
            <FaJs className="text-blue-700 opacity-15 text-2xl" />
          </div>

          {/* Git Icon */}
          <div
            className="absolute bottom-48 left-1/4 animate-bounce"
            style={{ animationDelay: "3.5s", animationDuration: "6s" }}
          >
            <FaGitAlt className="text-red-500 opacity-20 text-2xl" />
          </div>

          {/* AWS Icon */}
          <div
            className="absolute top-56 right-1/3 animate-bounce"
            style={{ animationDelay: "4.5s", animationDuration: "5.5s" }}
          >
            <FaAws className="text-orange-600 opacity-15 text-2xl" />
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto text-center z-10">
        {/* Profile Image First */}
        <div className="mb-6">
          <div className="w-48 h-48 mx-auto rounded-full dark:violet-gradient p-1 relative overflow-hidden">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
              <Image
                src="/profile.jpg"
                alt="Rajiv Sharma Profile"
                width={240}
                height={240}
                className="rounded-full object-cover"
                priority
              />
            </div>
            {/* Glow effect around profile */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur-2xl opacity-20 -z-10"></div>
          </div>
        </div>

        {/* Content Below */}
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-900 dark:text-gray-100 font-medium mb-4">
            Hi, I&apos;m <span className="dark:text-gradient">Rajiv Sharma</span>
          </h1>

          <h2 className="text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-violet-800 via-violet-600 to-purple-500 bg-clip-text text-transparent font-bold mb-6">
            Frontend Developer
          </h2>

          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            A motivated frontend developer learning and building modern,
            responsive web applications using React.js, Next.js, and Redux. I
            enjoy improving my skills by working on real-world projects and
            creating clean, user-friendly interfaces.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-violet-700 active:scale-95 shadow-md hover:shadow-lg"
            >
              <FolderOpen size={20} />
              View My Projects
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 border border-violet-600 text-violet-600 dark:text-violet-400 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-violet-600 hover:text-white dark:hover:text-white active:scale-95"
            >
              <MessageCircle size={20} />
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
