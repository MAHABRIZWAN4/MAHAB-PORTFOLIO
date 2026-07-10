"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [autoBubbleShown, setAutoBubbleShown] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Mount button after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto bubble after 5 seconds of idle
  useEffect(() => {
    if (!mounted || autoBubbleShown) return;

    const timer = setTimeout(() => {
      setShowBubble(true);
      setAutoBubbleShown(true);

      // Hide bubble after 4 seconds
      setTimeout(() => setShowBubble(false), 4000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [mounted, autoBubbleShown]);

  // Click outside to close card
  useEffect(() => {
    if (!showCard) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        cardRef.current &&
        buttonRef.current &&
        !cardRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowCard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCard]);

  const handleButtonClick = () => {
    setShowBubble(false);
    setShowCard(!showCard);
  };

  const handleWhatsAppOpen = () => {
    window.open(
      "https://wa.me/923122191103?text=Hi%20Mahab!%20I%20found%20you%20on%20your%20portfolio.",
      "_blank"
    );
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.button
        ref={buttonRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleButtonClick}
        onMouseEnter={() => {
          setIsHovered(true);
          if (!showCard) setShowBubble(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          if (!showCard && !autoBubbleShown) setShowBubble(false);
        }}
        className="fixed bottom-6 right-6 z-50 h-[52px] w-[52px] rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)] flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        {/* WhatsApp Icon */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            fill="white"
          />
        </svg>

        {/* Chat Bubble */}
        <AnimatePresence>
          {showBubble && !showCard && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 w-48 rounded-[12px_12px_4px_12px] bg-white dark:bg-[#1e2433] px-3.5 py-2.5 text-[13px] text-[#0a0a0a] dark:text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
            >
              Hi! I'm available on WhatsApp 👋
              {/* Triangle pointer */}
              <div className="absolute -bottom-1 right-3 h-3 w-3 rotate-45 bg-white dark:bg-[#1e2433]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Availability Card */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-[88px] right-6 z-50 w-60 rounded-[14px] border border-[rgba(37,211,102,0.3)] bg-white dark:bg-[#1e2433] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          >
            {/* Close button */}
            <button
              onClick={() => setShowCard(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Close"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Status */}
            <div className="flex items-center gap-2 mb-1">
              <div className="relative">
                <div className="h-2.5 w-2.5 rounded-full bg-[#25D366]" />
                <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-[#25D366] animate-ping" />
              </div>
              <span className="text-[13px] font-bold text-[#0a0a0a] dark:text-white">
                Mahab is available
              </span>
            </div>

            {/* Response time */}
            <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-3">
              Usually replies within 1 hour
            </p>

            {/* Divider */}
            <div className="h-px bg-gray-200 dark:bg-gray-700 mb-3" />

            {/* WhatsApp button */}
            <button
              onClick={handleWhatsAppOpen}
              className="w-full rounded-lg bg-[#25D366] py-2.5 text-white font-medium text-[14px] hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2"
            >
              Open WhatsApp
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
