import { Briefcase, Calendar, MapPin, GraduationCap } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      title: "ReactJS Developer",
      company: "Bodmas Education Services",
      period: "May 2025 - Present",
      type: "Full-time",
      location: "Noida, Uttar Pradesh",
      description: [
        "Developing and maintaining modern web applications using React.js and Redux",
        "Building responsive and user-friendly interfaces with Tailwind CSS",
        "Collaborating with cross-functional teams to deliver high-quality solutions",
        "Implementing best practices for code quality and performance optimization"
      ],
      technologies: ["React.js", "Redux", "JavaScript", "Tailwind CSS", "Context API", "AXIOS"]
    },
    {
      title: "Web Development Intern",
      company: "Cognifyz Technologies",
      period: "Feb 2025 - Mar 2025",
      type: "Internship",
      location: "Remote, India",
      description: [
        "Built responsive web applications using modern frameworks",
        "Collaborated with cross-functional teams to deliver high-quality frontend solutions",
        "Focused on user interface design and user experience optimization",
        "Delivered projects with emphasis on clean code and modern development practices"
      ],
      technologies: ["HTML", "Responsive CSS", "JavaScript", "ReactJS", "Tailwind CSS", "API Integration"]
    },
    {
      title: "AWS Cloud Training",
      company: "TATA STRIVE",
      period: "Jan 2024 - Mar 2024",
      type: "Training Program",
      location: "Dasrathpuri, Delhi",
      description: [
        "Comprehensive training on AWS cloud services and architecture",
        "Hands-on experience with EC2, S3, Lambda, and other core AWS services",
        "Learning cloud best practices and security implementations",
      ],
      technologies: ["AWS", "Cloud Architecture", "EC2", "S3", "Lambda"]
    },
    {
      title: "Full Stack Development Internship",
      company: "CETPA Infotech Pvt Ltd.",
      period: "Jun 2023 - Aug 2023",
      type: "Internship",
      location: "Noida, Uttar Pradesh",
      description: [
        "Intensive hands-on experience in full-stack web development",
        "Built multiple projects using React.js and Node.js",
        "Learned database management and API development",
        "Gained practical experience in modern development tools and practices"
      ],
      technologies: ["React.js", "Node.js", "JavaScript", "HTML", "CSS", "MySQL"]
    }
  ];

  const timelineItems = [
    { year: "2025", title: "ReactJS Developer at Bodmas Education", type: "work", icon: Briefcase },
    { year: "2025", title: "Web Development Intern at Cognifyz Technologies", type: "internship", icon: Briefcase },
    { year: "2024", title: "AWS Cloud Training at TATA STRIVE", type: "training", icon: GraduationCap },
    { year: "2024", title: "B.Tech CSE Graduate", type: "education", icon: GraduationCap },
    { year: "2023", title: "Full Stack Internship at CETPA", type: "internship", icon: Briefcase },
    { year: "2020", title: "Started Computer Science Journey", type: "education", icon: GraduationCap }
  ];

  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-violet-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            My journey in web development and cloud technologies
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Timeline - Sticky Container with Border & Shadow */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Career Timeline</h3>
              <div className="space-y-6">
                {timelineItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full flex-shrink-0 ${
                        item.type === 'work' ? 'bg-violet-100 text-violet-600' :
                        item.type === 'internship' ? 'bg-blue-100 text-blue-600' :
                        item.type === 'training' ? 'bg-purple-100 text-purple-600' : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        <IconComponent size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-violet-600">{item.year}</div>
                        <div className="text-gray-700 leading-snug">{item.title}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Experience Details */}
          <div className="lg:col-span-2 space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-100 transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-violet-600 font-medium text-lg">{exp.company}</p>
                  </div>
                  <div className="text-left md:text-right mt-2 md:mt-0">
                    <div className="flex items-center md:justify-end text-gray-600 font-medium mb-1">
                      <Calendar size={16} className="mr-2" />
                      {exp.period}
                    </div>
                    <div className="flex items-center md:justify-end text-sm text-gray-500">
                      <MapPin size={14} className="mr-1" />
                      {exp.type} • {exp.location}
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {exp.description.map((desc, descIndex) => (
                    <li key={descIndex} className="flex items-start text-gray-600">
                      <span className="w-2 h-2 bg-violet-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-white text-violet-700 rounded-full text-sm font-medium border border-violet-200 transition-all duration-300 hover:bg-violet-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
