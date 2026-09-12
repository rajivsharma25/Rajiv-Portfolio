import { MapPin, GraduationCap, Briefcase, Code } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-24 h-1 bg-violet-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center lg:text-left">
              Software Developer
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              As a Software Developer, I specialize in building robust, performant
              web applications leveraging the power of React.js and Next.js. I focus
              on developing clean, scalable client-side architectures, integrating
              complex REST APIs, and maintaining robust state management systems.
              <br />
              <br />
              I believe in engineering products that are not only visually stunning
              but also technically sound. This drives my dedication to frontend
              performance optimization, web accessibility (a11y) standards, and
              modular code design.
              <br />
              <br />
              Driven by curiosity and a problem-solving mindset, I am constantly
              exploring new technologies and patterns to build next-generation web
              platforms that deliver outstanding user engagement.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="flex items-start gap-3">
                <MapPin
                  className="text-violet-600 dark:text-violet-400 mt-1"
                  size={20}
                />
                <div>
                  <h4 className="font-semibold text-violet-600 dark:text-violet-400 mb-1">
                    Location
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Noida, Uttar Pradesh
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap
                  className="text-violet-600 dark:text-violet-400 mt-1"
                  size={20}
                />
                <div>
                  <h4 className="font-semibold text-violet-600 dark:text-violet-400 mb-1">
                    Education
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    B.Tech CSE (2024)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase
                  className="text-violet-600 dark:text-violet-400 mt-1"
                  size={20}
                />
                <div>
                  <h4 className="font-semibold text-violet-600 dark:text-violet-400 mb-1">
                    Experience
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">1 Year</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Code
                  className="text-violet-600 dark:text-violet-400 mt-1"
                  size={20}
                />
                <div>
                  <h4 className="font-semibold text-violet-600 dark:text-violet-400 mb-1">
                    Specialization
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Software Development
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-violet-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Quick Facts
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-violet-600 rounded-full mr-4 flex-shrink-0"></div>
                  <span>1+ Years of Professional Experience</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-violet-600 rounded-full mr-4 flex-shrink-0"></div>
                  <span>AWS Certified Cloud Practitioner</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-violet-600 rounded-full mr-4 flex-shrink-0"></div>
                  <span>Built 6+ web applications (including Freelance)</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-violet-600 rounded-full mr-4 flex-shrink-0"></div>
                  <span>B.Tech CSE Graduate (CGPA: 7.56/10)</span>
                </li>
              </ul>
            </div>

            {/* Skills Preview */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Core Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "React.js",
                  "Next.js",
                  "TypeScript",
                  "JavaScript",
                  "Redux",
                  "Tailwind CSS",
                  "AWS",
                  "Git",
                ].map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-sm font-medium transition-all duration-300 hover:bg-violet-200 dark:hover:bg-violet-800/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
