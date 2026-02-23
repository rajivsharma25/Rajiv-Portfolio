"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const whatsappUrl =
    "https://wa.me/919305635022?text=Hi%20Rajiv,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 hidden lg:flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 hover:bg-[#20ba5a] transition-all duration-300 group animate-bounce"
      aria-label="Contact on WhatsApp"
    >
      <FaWhatsapp size={32} />

      {/* Tooltip */}
      <span className="absolute right-full mr-4 px-3 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-gray-700">
        Freelance Inquiries
      </span>
    </a>
  );
}
