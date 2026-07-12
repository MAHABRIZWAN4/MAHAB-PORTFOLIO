"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, Code, MessageSquare, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useHireModalStore } from "@/lib/hire-modal-store";

const options = [
  {
    icon: Briefcase,
    title: "Full-time Position",
    description: "Join your team as a full-time developer",
    mailto: "mailto:mahabrizwan@gmail.com?subject=Full-time Position",
  },
  {
    icon: Code,
    title: "Freelance Project",
    description: "Collaborate on a specific project or engagement",
    mailto: "mailto:mahabrizwan@gmail.com?subject=Freelance Project",
  },
  {
    icon: MessageSquare,
    title: "Technical Consultation",
    description: "Get expert advice on your technical challenges",
    mailto: "mailto:mahabrizwan@gmail.com?subject=Technical Consultation",
  },
];

export default function HireMeModal() {
  const { isOpen, close } = useHireModalStore();
  const { theme } = useTheme();

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, close]);

  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[100] bg-black/70 dark:bg-black/70 backdrop-blur-md"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[480px] rounded-2xl p-8 bg-white dark:bg-[#0d1117] border border-indigo-200 dark:border-indigo-500/30 shadow-2xl"
              style={{
                boxShadow: isDark
                  ? "0 0 60px rgba(99,102,241,0.2)"
                  : "0 20px 60px rgba(99,102,241,0.15)",
              }}
            >
              {/* Close Button */}
              <button
                onClick={close}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Let's Work Together
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose how you'd like to collaborate
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {options.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <motion.a
                      key={index}
                      href={option.mailto}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer bg-gray-50 dark:bg-white/4 border border-gray-200 dark:border-white/8 hover:border-indigo-400 dark:hover:border-indigo-500/60 hover:shadow-md"
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-indigo-100 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
                        <Icon size={24} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-gray-900 dark:text-white font-semibold mb-1">
                          {option.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <ArrowRight
                        size={20}
                        className="text-gray-400 dark:text-gray-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                      />
                    </motion.a>
                  );
                })}
              </div>

              {/* Bottom Section */}
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-white/10">
                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/923122191103?text=Hi%20Mahab%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 rounded-xl text-center font-medium text-white transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                    boxShadow: "0 0 20px rgba(37,211,102,0.3)",
                  }}
                >
                  💬 Quick Contact via WhatsApp
                </a>

                {/* Email Link */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  or email directly at{" "}
                  <a
                    href="mailto:mahabrizwan@gmail.com"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline"
                  >
                    mahabrizwan@gmail.com
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
