import {
  ExternalLink,
  CheckCircle,
  Clock,
  Briefcase,
} from "lucide-react";
import Image from "next/image";

export default function FreelanceProjects() {
  const projects = [
    {
      title: "YoGrow Solutions",
      description:
        "A high-performance digital marketing agency platform featuring AI-driven marketing strategies, SEO optimization, and comprehensive client management systems.",
      image: "/assets/images/yogrow.png",
      technologies: [
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "Lucide icons",
      ],
      features: [
        "AI-Driven Performance Marketing dashboard",
        "SEO and PPC campaign management tools",
        "Dynamic content management for blogs and services",
        "Real-time lead generation and tracking",
        "Responsive and high-performance user interface",
      ],
      demoUrl: "https://yogrowsolutions.vercel.app/",
      status: "Completed",
    },
  ];

  return (
    <section
      id="freelance"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Freelance <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-violet-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Delivering professional solutions for businesses and organizations
            as a freelance developer
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700"
            >
              {/* Project Image */}
              <div className="h-48 relative overflow-hidden bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-700 dark:to-gray-800">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:scale-110 transition-transform duration-300">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} project screenshot`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <Briefcase size={64} />
                  )}
                </div>
              </div>

              <div className="p-6">
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-2">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : project.status === "Completed"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {project.status === "Active" ||
                    project.status === "Completed" ? (
                      <CheckCircle size={12} />
                    ) : (
                      <Clock size={12} />
                    )}
                    {project.status}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-base">
                  {project.description}
                </p>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-200 mb-3">
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {project.features
                      .slice(0, 3)
                      .map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-sm text-gray-600 dark:text-gray-300 flex items-start"
                        >
                          <span className="w-1.5 h-1.5 bg-violet-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-xs font-medium transition-all duration-300 hover:bg-violet-200 dark:hover:bg-violet-800/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live Demo Button Only */}
                <div className="flex">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-violet-600 text-white py-2.5 px-4 rounded-full text-sm font-medium transition-all duration-300 hover:bg-violet-700 active:scale-95"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}