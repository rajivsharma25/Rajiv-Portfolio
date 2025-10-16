import { ExternalLink, Github, CheckCircle, Clock } from 'lucide-react';
import Image from 'next/image';

export default function Projects() {
  const projects = [
    {
      title: "Forever",
      description: "A comprehensive e-commerce solution built with React.js featuring product catalog, shopping cart, user authentication, and payment integration.",
      image: "/assets/images/forever.jpg",
      technologies: ["React.js", "Redux", "JavaScript", "CSS3", "Tailwind CSS"],
      features: [
        "Dynamic product catalog with filtering and search",
        "Shopping cart functionality with persistent storage",
        "User authentication and profile management",
        "Responsive design for all devices",
        "Order tracking and management system"
      ],
      demoUrl: "https://forever-ecommerce-website-rajiv-sharma.vercel.app/",
      githubUrl: "https://github.com/rajivsharma25/Forever-Ecommerce-Website",
      status: "Active"
    },
    {
      title: "CraveCart",
      description: "Modern food delivery application with real-time order tracking, restaurant management, and user-friendly interface for seamless food ordering experience.",
      image: "/assets/images/cravecart.jpg",
      technologies: ["React.js", "Context API", "JavaScript", "Tailwind CSS"],
      features: [
        "Restaurant and menu browsing with categories",
        "Real-time order tracking and status updates",
        "User profiles with order history",
        "Advanced filtering and search capabilities",
        "Responsive mobile-first design"
      ],
      demoUrl: "https://cravecart-food-delivery-website-rajivsharma25s-projects.vercel.app/",
      githubUrl: "https://github.com/rajivsharma25/CraveCart-Food-Delivery-Website",
      status: "Active"
    },
    {
      title: "Prescripto",
      description: "A comprehensive doctor appointment booking platform with real-time scheduling and patient management.",
      image: "/assets/images/prescripto.jpg",
      technologies: ["React.js", "Context API", "JavaScript", "CSS3", "Tailwind CSS"],
      features: [
        "Doctor profiles with specializations and availability",
        "Appointment booking and scheduling system",
        "Patient medical history management",
        "Secure doctor-patient messaging",
        "Appointment reminders and notifications"
      ],
      demoUrl: "https://prescripto-online-doctor-appointment-pl-rajivsharma25s-projects.vercel.app/",
      githubUrl: "https://github.com/rajivsharma25/Prescripto-Online-Doctor-Appointment-Platform",
      status: "Active"
    }
  ];

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-violet-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Showcasing my expertise in building modern, scalable web applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
              {/* Project Image */}
              <div className="h-48 relative overflow-hidden bg-gradient-to-br from-violet-50 to-purple-50">
                <Image
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="p-6">
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-2">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : project.status === 'Completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status === 'Active' ? 
                      <CheckCircle size={12} /> : <Clock size={12} />
                    }
                    {project.status}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-2 leading-relaxed text-base">
                  {project.description}
                </p>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-600 flex items-start">
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
                        className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-medium transition-all duration-300 hover:bg-violet-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-violet-600 text-white py-2.5 px-4 rounded-full text-sm font-medium transition-all duration-300 hover:bg-violet-700 active:scale-95"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 border border-violet-600 text-violet-600 py-2.5 px-4 rounded-full text-sm font-medium transition-all duration-300 hover:bg-violet-600 hover:text-white active:scale-95"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Want to see more projects?
            </h3>
            <p className="text-gray-600 mb-6">
              Check out my GitHub profile for more web development projects and contributions.
            </p>
            <a
              href="https://github.com/rajivsharma25"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-violet-700 active:scale-95 shadow-md hover:shadow-lg"
            >
              <Github size={20} />
              Visit GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
