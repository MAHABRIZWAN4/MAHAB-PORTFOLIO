"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getSiteSettings } from "@/lib/siteSettings";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch logo
    async function fetchLogo() {
      try {
        const settings = await getSiteSettings();
        if (settings?.logoUrl) {
          setLogoUrl(settings.logoUrl);
        }
      } catch (error) {
        console.error("Error loading logo:", error);
      }
    }
    fetchLogo();

    // Hide after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "#0a0e18" }}
        >
          {/* Centered logo */}
          <div className="flex flex-col items-center gap-8">
            {logoUrl && (
              <motion.img
                src={logoUrl}
                alt="Loading"
                className="h-[180px] w-auto object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.08, 1],
                  rotate: [-2, 2, -2],
                  filter: [
                    "drop-shadow(0 0 20px rgba(99,102,241,0.5))",
                    "drop-shadow(0 0 50px rgba(99,102,241,0.9))",
                    "drop-shadow(0 0 20px rgba(99,102,241,0.5))",
                  ],
                }}
                transition={{
                  opacity: { duration: 0.4 },
                  scale: {
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotate: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  filter: {
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              />
            )}

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-sm tracking-wider"
              style={{
                fontFamily: "monospace",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Loading experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
