import { FaBrain } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { FaWrench } from "react-icons/fa6";
import { BiSolidZap } from "react-icons/bi";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { FaClock } from "react-icons/fa6";

import {
  SiJavascript,
  SiCplusplus,
  SiHtml5,
  SiCss3,
  SiMysql,
  SiReact,
  SiRedux,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiGit,
  SiVite,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
        { name: "C++", icon: SiCplusplus, color: "text-blue-600" },
        { name: "HTML5", icon: SiHtml5, color: "text-orange-600" },
        { name: "CSS3", icon: SiCss3, color: "text-blue-500" },
        { name: "SQL", icon: SiMysql, color: "text-blue-800" },
      ],
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "React.js", icon: SiReact, color: "text-cyan-500" },
        { name: "Redux", icon: SiRedux, color: "text-purple-600" },
        { name: "Next.js", icon: SiNextdotjs, color: "text-black" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-500" },
        { name: "Bootstrap", icon: SiBootstrap, color: "text-purple-700" },
      ],
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git", icon: SiGit, color: "text-orange-600" },
        { name: "VSCode", icon: VscVscode, color: "text-blue-600" },
        { name: "Vite", icon: SiVite, color: "text-purple-500" },
        { name: "AWS", icon: FaAws, color: "text-orange-500" },
        { name: "MySQL", icon: SiMysql, color: "text-blue-800" },
      ],
    },
  ];

  const coreSkills = [
    { name: "Data Structures", description: "Algorithms & Problem Solving" },
    { name: "OOP", description: "Object-Oriented Programming" },
    { name: "Responsive Design", description: "Mobile-First Development" },
  ];

  const softSkills = [
    { name: "Problem Solving", icon: FaBrain },
    { name: "Team Collaboration", icon: RiTeamFill },
    { name: "Quick Learning", icon: BiSolidZap },
    { name: "Adaptability", icon: FaWrench },
    { name: "Communication", icon: BiSolidMessageSquareDots },
    { name: "Time Management", icon: FaClock },
  ];

  return (
    <section
      id="skills"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-violet-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive expertise in modern web development technologies and
            cloud platforms
          </p>
        </div>

        {/* Technical Skills with React Icons */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                {category.title}
              </h3>

              <div className="grid grid-cols-3 gap-4">
                {category.skills.map((skill, skillIndex) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={skillIndex}
                      className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl transition-all duration-300 hover:bg-violet-50 dark:hover:bg-violet-900/10 hover:scale-105 group"
                    >
                      <IconComponent
                        size={40}
                        className={`${skill.color} mb-3 group-hover:scale-110 transition-transform duration-300`}
                      />
                      <span className="text-gray-500 dark:text-gray-400 text-xs font-medium text-center group-hover:text-violet-700 dark:group-hover:text-violet-300">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Core Concepts */}
        <div className="mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Core Concepts
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreSkills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-violet-100 dark:border-gray-600 transition-all duration-300 hover:shadow-md"
                >
                  <h4 className="font-semibold text-violet-700 dark:text-violet-400 mb-1">
                    {skill.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Soft Skills */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Soft Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {softSkills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 bg-violet-50 dark:bg-gray-700 rounded-xl transition-all duration-300 hover:bg-violet-100 dark:hover:bg-gray-600 hover:scale-105 group"
                  >
                    <IconComponent
                      size={24}
                      className="text-violet-700 dark:text-violet-400 mb-2"
                    />
                    <span className="text-violet-700 dark:text-violet-300 text-sm font-medium text-center group-hover:text-violet-800 dark:group-hover:text-violet-200">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
