'use client';
import { useState } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageCircle, User, AtSign, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending....");
    
    const jsonData = {
      access_key: "a04a899a-9852-4664-8738-a9e163237473",
      name: formData.name,
      email: formData.email,
      message: formData.message,
      subject: "New Contact Form Submission from Portfolio",
      from_name: "Portfolio Contact Form"
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(jsonData)
      });

      const data = await response.json();
      if (data.success) {
        setResult("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setResult(""), 5000);
      } else {
        console.log("Error", data);
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult("Network error. Please check your connection and try again.");
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "rajivsharma93056@gmail.com",
      link: "mailto:rajivsharma93056@gmail.com",
      color: "text-red-600"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 9305635022",
      link: "tel:+919305635022",
      color: "text-green-600"
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      value: "+91 9305635022",
      link: "https://wa.me/919305635022?text=Hi%20Rajiv,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you.",
      color: "text-green-500"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Noida, India",
      link: "https://maps.app.goo.gl/h6TbMkZFqFLaYZG88",
      color: "text-blue-600"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "linkedin.com/in/rajivsharma25",
      link: "https://linkedin.com/in/rajivsharma25",
      color: "text-blue-800"
    }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/rajivsharma25",
      color: "hover:text-gray-900 hover:bg-gray-100"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/rajivsharma25",
      color: "hover:text-blue-600 hover:bg-blue-50"
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      url: "https://wa.me/919305635022?text=Hi%20Rajiv,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you.",
      color: "hover:text-green-500 hover:bg-green-50"
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:rajivsharma93056@gmail.com",
      color: "hover:text-red-600 hover:bg-red-50"
    },
    {
      name: "Phone",
      icon: Phone,
      url: "tel:+919305635022",
      color: "hover:text-green-600 hover:bg-green-50"
    }
  ];

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-violet-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to bring your web development project to life? Let&apos;s discuss how I can help you build amazing digital experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Let&apos;s Start a Conversation
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                I&apos;m always excited to work on new projects and collaborate with fellow developers, 
                businesses, and individuals who are passionate about creating exceptional web experiences. 
                Whether you have a project in mind, need consultation, or just want to say hello, 
                I&apos;d love to hear from you!
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:scale-105 group"
                    >
                      <div className={`p-3 rounded-lg bg-gray-50 group-hover:bg-violet-50 transition-colors duration-300`}>
                        <IconComponent size={24} className={`${info.color} group-hover:text-violet-600 transition-colors duration-300`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors duration-300">
                          {info.title}
                        </h4>
                        <p className="text-gray-600 text-sm">{info.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageCircle size={20} className="text-violet-600" />
                Connect with me
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-gray-50 rounded-full transition-all duration-300 hover:scale-105 ${social.color} border border-gray-200 hover:border-current`}
                      title={social.name}
                    >
                      <IconComponent size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-violet-600 rounded-full mr-3 flex-shrink-0"></span>
                  Available for freelance projects
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-violet-600 rounded-full mr-3 flex-shrink-0"></span>
                  Response time: Within 24 hours
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-violet-600 rounded-full mr-3 flex-shrink-0"></span>
                  Also open to remote opportunities
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-violet-600 rounded-full mr-3 flex-shrink-0"></span>
                  Specializing in React.js & Frontend Development
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form - Sticky for Desktop */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-fit">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Send size={24} className="text-violet-600" />
                Send me a message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User size={16} />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 bg-gray-50 focus:bg-white outline-none"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <AtSign size={16} />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 bg-gray-50 focus:bg-white outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare size={16} />
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 resize-none bg-gray-50 focus:bg-white outline-none"
                    placeholder="Tell me about your project or inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={result === "Sending...."}
                  className="w-full inline-flex items-center justify-center gap-2 bg-violet-600 text-white px-8 py-3 cursor-pointer rounded-full font-medium text-base transition-all duration-300 hover:bg-violet-700 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send size={16} />
                  {result === "Sending...." ? "Sending..." : "Send Message"}
                </button>

                {/* Status Message */}
                {result && (
                  <div className={`p-4 rounded-xl text-center font-medium transition-all duration-300 ${
                    result.includes("successfully") || result.includes("sent")
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : result === "Sending...." 
                      ? "bg-blue-50 text-blue-700 border border-blue-200" 
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {result}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
