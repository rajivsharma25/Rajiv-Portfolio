import {
  Calendar,
  CheckCircle,
  GraduationCap,
  Trophy,
  BookOpen,
} from "lucide-react";
import Image from 'next/image';
import { SiMysql, SiCplusplus } from 'react-icons/si';

export default function Certifications() {
  const certifications = [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2025",
      description:
        "Comprehensive certification covering AWS cloud concepts, services, security, architecture, and pricing models.",
      skills: [
        "Cloud Computing",
        "AWS Services",
        "Cloud Security",
        "Cost Management",
      ],
      badge: "/assets/images/aws-badge.png",
      badgeUrl: "https://www.credly.com/badges/be66bf69-1877-4ab3-88e9-aa85f0dd88e7/public_url",
      badgeType: "image",
      level: "Foundation",
      status: "Active",
    },
    {
      title: "Introduction to SQL",
      issuer: "Simplilearn",
      date: "2023",
      description:
        "Foundation-level certification introducing core SQL concepts, including writing queries, managing relational databases, and understanding database schema design.",
      skills: [
        "Basic SQL Queries",
        "Data Retrieval",
        "Table Relationships",
        "RDBMS Fundamentals",
      ],
      badge: SiMysql,
      badgeUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxODExIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvdGh1bWJfNDU5NTY0NF8xNjk3OTkwMDQ1LnBuZyIsInVzZXJuYW1lIjoiUmFqaXYgU2hhcm1hIn0%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F4309%2FIntroduction-to-SQL%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1507310509089914254&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVD04Pz%2FUL9Pc2c0myrytKTUstKsrMS49PKsovL04tsnVNSU8FAOxz5Aw9AAAA",
      badgeType: "icon",
      level: "Foundation",
      status: "Active",
    },
    {
      title: "Basics of C++",
      issuer: "Udemy",
      date: "2023",
      description:
        "Foundation-level certification in C++ programming focusing on syntax, control structures, functions, and fundamental object-oriented programming concepts.",
      skills: [
        "C++ Syntax",
        "Functions",
        "Loops & Conditions",
        "OOP Basics",
        "DSA",
      ],
      badge: SiCplusplus,
      badgeUrl: "https://www.udemy.com/certificate/UC-cc91b127-a4b8-41e1-be25-d69ceff2ee19/",
      badgeType: "icon",
      level: "Foundation",
      status: "Active",
    },
  ];

  const achievements = [
    {
      title: "CGPA: 7.56/10",
      description: "B.Tech in Computer Science and Engineering",
      institution: "IMS Engineering College, Ghaziabad",
      year: "2020-2024",
      icon: GraduationCap,
    },
    {
      title: "Higher Secondary: 70%",
      description: "CBSE Board - Science Stream",
      institution: "Gyan Peethika Senior Secondary School",
      year: "2019",
      icon: BookOpen,
    },
    {
      title: "Secondary School: 9.0/10 CGPA",
      description: "CBSE Board - Academic Excellence",
      institution: "Gyan Kunj Senior Secondary Academy",
      year: "2017",
      icon: Trophy,
    },
  ];

  return (
    <section
      id="certifications"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Certifications & <span className="text-gradient">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-violet-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional certifications and academic achievements that validate
            my expertise
          </p>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Professional Certifications
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-center mb-6">
                  {/* Badge Display with Icons */}
                  <div className="mb-4 flex items-center justify-center">
                    {cert.badgeType === "image" ? (
                      <div className="relative w-24 h-24">
                        <Image
                          src={cert.badge}
                          alt={`${cert.title} certification badge`}
                          fill
                          className="object-contain rounded-lg"
                          sizes="(max-width: 768px) 96px, 96px"
                        />
                      </div>
                    ) : cert.badgeType === "icon" ? (
                      <div className="w-24 h-24 bg-white rounded-full p-4 border border-gray-200 flex items-center justify-center">
                        <cert.badge
                          size={48}
                          className={cert.title.includes("SQL") ? "text-blue-600" : "text-blue-800"}
                        />
                      </div>
                    ) : (
                      <div className="text-4xl">{cert.badge}</div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        cert.level === "Foundation"
                          ? "bg-blue-100 text-blue-800"
                          : cert.level === "Professional"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {cert.level}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      <CheckCircle size={10} />
                      {cert.status}
                    </span>
                  </div>
                </div>

                {/* All Titles Now Clickable with Updated Styling */}
                {cert.badgeUrl ? (
                  <a
                    href={cert.badgeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h4 className="text-xl font-semibold text-gray-900 hover:text-violet-600 mb-2 text-center transition-colors cursor-pointer">
                      {cert.title}
                    </h4>
                  </a>
                ) : (
                  <h4 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                    {cert.title}
                  </h4>
                )}

                <div className="flex items-center justify-center text-violet-600 font-medium mb-4">
                  <Calendar size={16} className="mr-2" />
                  <span>
                    {cert.issuer} • {cert.date}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {cert.description}
                </p>

                <div className="">
                  <h5 className="font-semibold text-gray-900 mb-2 text-sm">
                    Skills Covered:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-white text-violet-700 rounded-full text-xs font-medium border border-violet-200 transition-all duration-300 hover:bg-violet-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                
              </div>
            ))}
          </div>
        </div>

        {/* Academic Achievements */}
        <div>
          <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Academic Achievements
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center transition-all duration-300 hover:shadow-xl"
                >
                  <div className="mb-4">
                    <IconComponent
                      size={48}
                      className="text-violet-600 mx-auto"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-violet-600 mb-2">
                    {achievement.title}
                  </h4>
                  <p className="text-gray-900 font-medium mb-2">
                    {achievement.description}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    {achievement.institution}
                  </p>
                  <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
                    <Calendar size={12} />
                    {achievement.year}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
