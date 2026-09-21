"use client";

import { useState, useRef, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Send, X, CheckCheck } from "lucide-react";
import Image from "next/image";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const defaultPlaceholder = "Hi Rajiv, I would like to discuss a project with you.";
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    const finalMsg = message.trim() || defaultPlaceholder;
    const url = `https://wa.me/919305635022?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div ref={modalRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50">
      {/* WhatsApp Chat Modal */}
      {isOpen && (
        <div className="absolute bottom-14 sm:bottom-16 right-0 mb-2 w-[calc(100vw-32px)] max-w-[340px] sm:w-88 bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-gray-200/80 dark:border-neutral-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#075E54] dark:bg-[#128C7E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/40 flex-shrink-0 bg-neutral-800">
                <Image
                  src="/profile.webp"
                  alt="Rajiv Sharma"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight text-white">
                  Rajiv Sharma
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-100/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  <span>Typically replies in minutes</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Bubble Body */}
          <div className="p-4 bg-gray-50/90 dark:bg-neutral-950/80 min-h-[120px] flex flex-col justify-end space-y-3">
            <div className="self-start max-w-[85%] bg-white dark:bg-neutral-800 p-3 rounded-2xl rounded-tl-sm shadow-xs border border-gray-100 dark:border-neutral-700/60 text-xs text-neutral-800 dark:text-neutral-200">
              <p className="leading-relaxed">
                👋 Hi there! How can I help you? Type a message below to start a conversation with me directly on WhatsApp.
              </p>
              <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-neutral-400">
                <span>Just now</span>
                <CheckCheck size={13} className="text-[#34B7F1]" />
              </div>
            </div>
          </div>

          {/* Input & Send Form */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white dark:bg-neutral-900 border-t border-gray-100 dark:border-neutral-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              autoFocus
              className="flex-1 h-10 px-4 bg-gray-100 dark:bg-neutral-800/80 border border-gray-200/80 dark:border-neutral-700 rounded-full text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#25D366]/40 focus:border-[#25D366]"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white flex items-center justify-center flex-shrink-0 transition-all cursor-pointer"
              aria-label="Send message on WhatsApp"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating WhatsApp Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer ${
          !isOpen ? "animate-bounce" : ""
        }`}
        aria-label="Toggle WhatsApp Chat"
      >
        {isOpen ? (
          <X size={22} className="sm:w-[26px] sm:h-[26px] transition-transform duration-200" />
        ) : (
          <FaWhatsapp size={26} className="sm:w-[32px] sm:h-[32px] transition-transform duration-200" />
        )}

        {/* Tooltip (when closed) */}
        {!isOpen && (
          <span className="absolute right-full mr-3 px-3 py-1 bg-neutral-900 text-white text-xs font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border border-neutral-700 shadow-md">
            Chat on WhatsApp
          </span>
        )}
      </button>
    </div>
  );
}
