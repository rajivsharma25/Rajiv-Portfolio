"use client";
import { Briefcase, Calendar, MapPin, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardFadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Experience() {
  const experiences = [
    {
      key: "aroha",
      title: "Software Developer",
      company: "ArohaTech IT Services",
      period: "Jun 2026 - Present",
      type: "Full-time",
      location: "Greater Noida, Uttar Pradesh",
      description: [
        "Working as a Software Developer at Arohatech IT Services Pvt. Ltd., contributing to software development and project activities.",
        "Developing and maintaining software solutions based on project requirements.",
        "Working on assigned technical tasks and delivering project requirements.",
        "Collaborating with team members to troubleshoot issues and implement solutions.",
        "Following software development practices, company processes, and project requirements.",
      ],
      technologies: [
        "React.js",
        "Next.js",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "REST APIs",
        "GSAP",
      ],
    },
    {
      key: "akvm",
      title: "Frontend Developer",
      company: "AKVM IT Solutions",
      period: "Jan 2026 - May 2026",
      type: "Full-time",
      location: "Noida, Uttar Pradesh",
      description: [
        "Developing scalable web solutions using React.js, Next.js, and JavaScript.",
        "Ensuring high-quality code standards as part of the engineering team.",
        "Building responsive user interfaces with Tailwind CSS.",
        "Implementing modern frontend technologies to enhance application performance and user experience.",
      ],
      technologies: ["React.js", "Next.js", "JavaScript", "Tailwind CSS", "Context API", "AXIOS", "Redux", "MUI"],
    },
    {
      key: "bodmas",
      title: "React.js Developer",
      company: "Bodmas Education Services",
      period: "Sep 2025 - Dec 2025",
      type: "Full-time",
      location: "Noida, Uttar Pradesh",
      description: [
        "Developing and maintaining modern web applications using React.js and Redux",
        "Building responsive and user-friendly interfaces with Tailwind CSS",
        "Collaborating with cross-functional teams to deliver high-quality solutions",
        "Implementing best practices for code quality and performance optimization",
      ],
      technologies: [
        "React.js",
        "Redux",
        "JavaScript",
        "Tailwind CSS",
        "Context API",
        "AXIOS",
      ],
    },
    {
      key: "cognifyz",
      title: "Web Developer Intern",
      company: "Cognifyz Technologies",
      period: "May 2025 - Jul 2025",
      type: "Internship",
      location: "Remote",
      description: [
        "Built responsive web applications using modern frameworks",
        "Collaborated with cross-functional teams to deliver high-quality frontend solutions",
        "Focused on user interface design and user experience optimization",
        "Delivered projects with emphasis on clean code and modern development practices",
      ],
      technologies: [
        "HTML",
        "Responsive CSS",
        "JavaScript",
        "ReactJS",
        "Tailwind CSS",
        "API Integration",
      ],
    },
    {
      key: "tatastrive",
      title: "AWS Cloud Trainee",
      company: "Tata STRIVE",
      period: "Feb 2024 - Apr 2024",
      type: "Training",
      location: "Remote",
      description: [
        "Comprehensive training on AWS cloud services and architecture",
        "Hands-on experience with EC2, S3, Lambda, and other core AWS services",
        "Learning cloud best practices and security implementations",
      ],
      technologies: ["AWS", "Cloud Architecture", "EC2", "S3", "Lambda"],
    },
    {
      key: "cetpa",
      title: "Web Development Trainee",
      company: "CETPA Infotech",
      period: "Jun 2023 - Aug 2023",
      type: "Internship",
      location: "Noida, Uttar Pradesh",
      description: [
        "Intensive hands-on experience in full-stack web development",
        "Built multiple projects using React.js and Node.js",
        "Learned database management and API development",
        "Gained practical experience in modern development tools and practices",
      ],
      technologies: [
        "React.js",
        "Node.js",
        "JavaScript",
        "HTML",
        "CSS",
        "MySQL",
      ],
    },
  ];

  const timelineItems = [
    {
      year: "2026 - Present",
      title: "Software Developer at ArohaTech",
      type: "work",
      icon: Briefcase,
    },
    {
      year: "2026",
      title: "Frontend Developer at AKVM",
      type: "work",
      icon: Briefcase,
    },
    {
      year: "2025",
      title: "React.js Developer at Bodmas",
      type: "work",
      icon: Briefcase,
    },
    {
      year: "2025",
      title: "Web Developer Intern at Cognifyz",
      type: "internship",
      icon: Briefcase,
    },
    {
      year: "2024",
      title: "AWS Cloud Training at Tata STRIVE",
      type: "training",
      icon: GraduationCap,
    },
    {
      year: "2024",
      title: "Graduated B.Tech in CSE",
      type: "education",
      icon: GraduationCap,
    },
    {
      year: "2023",
      title: "Web Development Training at CETPA",
      type: "internship",
      icon: Briefcase,
    },
    {
      year: "2020",
      title: "Commenced Computer Science Journey",
      type: "education",
      icon: GraduationCap,
    },
  ];

  return (
    <section
      id="experience"
      className="relative py-12 sm:py-16 md:py-20 px-3.5 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900 transition-colors duration-300"
    >
      {/* Pure Soft Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-24 w-80 h-80 bg-blue-500/6 dark:bg-blue-600/7 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-24 w-80 h-80 bg-sky-500/6 dark:bg-indigo-600/7 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2.5 sm:mb-4 leading-normal sm:leading-snug py-0.5">
            Work{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent inline-block py-0.5">
              Experience
            </span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-3.5 sm:mb-6 rounded-full"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            A timeline of my professional roles, milestones, and technical achievements
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Timeline - Sticky Navigator & Trajectory */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 z-10 self-start">
            <motion.div
              className="space-y-6"
              variants={slideLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              <div className="bg-gray-50/80 dark:bg-neutral-800/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-gray-200/80 dark:border-neutral-700/60 shadow-lg shadow-neutral-900/5 transition-all duration-300">
              <div className="pb-4 sm:pb-5 mb-5 sm:mb-6 border-b border-gray-200/70 dark:border-neutral-700/60">
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-normal">
                  Career Trajectory
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 sm:mt-1">
                  Milestones & Experience
                </p>
              </div>

              {/* Connected Vertical Timeline Track */}
              <div className="relative pl-7 rtl:pl-0 rtl:pr-7 space-y-4 sm:space-y-5 before:absolute before:left-[11px] rtl:before:left-auto rtl:before:right-[11px] before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-blue-600 before:via-sky-400/50 before:to-neutral-200 dark:before:to-neutral-800">
                {timelineItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const isCurrent = item.year.includes("Present");
                  const matchedExpIndex = experiences.findIndex((e) =>
                    item.title.toLowerCase().includes(e.company.toLowerCase().split(" ")[0])
                  );

                  return (
                    <a
                      key={index}
                      href={matchedExpIndex !== -1 ? `#exp-${matchedExpIndex}` : "#about"}
                      className={`group/item block relative transition-all duration-200 ${
                        matchedExpIndex !== -1 ? "cursor-pointer" : ""
                      }`}
                    >
                      {/* Node on the vertical line */}
                      <div
                        className={`absolute -left-7 rtl:-left-auto rtl:-right-7 top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isCurrent
                            ? "bg-blue-600 text-white ring-4 ring-blue-500/20 shadow-md shadow-blue-500/30"
                            : item.type === "work"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 group-hover/item:bg-blue-600 group-hover/item:text-white"
                            : item.type === "internship"
                            ? "bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400 group-hover/item:bg-sky-600 group-hover/item:text-white"
                            : item.type === "training"
                            ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 group-hover/item:bg-indigo-600 group-hover/item:text-white"
                            : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 group-hover/item:bg-neutral-700 group-hover/item:text-white"
                        }`}
                      >
                        <IconComponent size={12} />
                      </div>

                      <div className="pl-1 rtl:pl-0 rtl:pr-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[11px] sm:text-xs font-bold ${
                              isCurrent
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-neutral-500 dark:text-neutral-400"
                            }`}
                          >
                            {item.year}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors leading-normal mt-0.5">
                          {item.title}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

          {/* Experience Details - Modern Cards Stream */}
          <motion.div
            className="lg:col-span-8 space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
          >
            {experiences.map((exp, index) => (
              <motion.div
                id={`exp-${index}`}
                key={index}
                variants={cardFadeUp}
                className="rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 bg-gray-50/80 dark:bg-neutral-800/70 backdrop-blur-xl border border-gray-200/80 dark:border-neutral-700/60 hover:border-gray-300 dark:hover:border-neutral-600 shadow-sm hover:shadow-md transition-all duration-300 scroll-mt-28"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-neutral-900 dark:text-white mb-1 leading-normal">
                      {exp.title}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm sm:text-base">
                      {exp.company}
                    </p>
                  </div>

                  {/* Metadata Badges */}
                  <div className="flex flex-wrap md:flex-col md:items-end rtl:md:items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400">
                    <div className="inline-flex items-center gap-1.5 font-medium bg-white dark:bg-neutral-900/80 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-200/70 dark:border-neutral-700/60 shadow-xs">
                      <Calendar size={13} className="text-blue-600 dark:text-blue-400" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-white/80 dark:bg-neutral-900/60 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-gray-200/60 dark:border-neutral-700/40">
                      <MapPin size={12} className="text-sky-500" />
                      <span>{exp.location}</span>
                      <span className="text-neutral-300 dark:text-neutral-600">•</span>
                      <span>{exp.type}</span>
                    </div>
                  </div>
                </div>

                {/* Bullet points */}
                <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                  {exp.description.map((desc, descIndex) => (
                    <li
                      key={descIndex}
                      className="flex items-start gap-2.5 sm:gap-3 text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm md:text-[15px] leading-relaxed"
                    >
                      <span className="mt-1.5 sm:mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 ring-4 ring-blue-500/10 dark:ring-blue-400/20"></span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech stack tags */}
                <div className="pt-3.5 sm:pt-4 border-t border-gray-200/70 dark:border-neutral-700/60">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 sm:px-3 py-1 bg-white dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-200 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium border border-gray-200/70 dark:border-neutral-700/60 transition-all duration-200 hover:border-blue-500/40 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
