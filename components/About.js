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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center lg:text-left">
              ReactJS Developer
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              I&apos;m a passionate ReactJS Developer currently working at
              Bodmas Education Services, where I develop and maintain modern web
              applications focusing on responsive and user-friendly interfaces.
              With a strong foundation in React.js, Redux, and cloud
              technologies, I create scalable solutions that deliver exceptional
              user experiences.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              My journey in web development began during my Computer Science
              Engineering studies at IMS Engineering College, where I built a
              solid foundation in programming fundamentals. I&apos;ve since
              expanded my expertise to include AWS cloud services, earning my
              Cloud Practitioner certification and gaining hands-on experience
              with cloud architecture design.
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
                    Noida, India
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
                  <p className="text-gray-600 dark:text-gray-300">~ 1 Years</p>
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
                    Frontend Development
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
                  <span>Currently working as ReactJS Developer</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-violet-600 rounded-full mr-4 flex-shrink-0"></div>
                  <span>AWS Certified Cloud Practitioner</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-violet-600 rounded-full mr-4 flex-shrink-0"></div>
                  <span>Built 5+ production-ready web applications</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-violet-600 rounded-full mr-4 flex-shrink-0"></div>
                  <span>CGPA: 7.56/10 in Computer Science</span>
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
                  "Redux",
                  "JavaScript",
                  "Tailwind CSS",
                  "AWS",
                  "Next.js",
                  "HTML",
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
