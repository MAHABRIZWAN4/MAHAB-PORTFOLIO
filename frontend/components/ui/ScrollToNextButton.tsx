"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ScrollToNextButtonProps {
  nextSectionId: string;
}

export default function ScrollToNextButton({ nextSectionId }: ScrollToNextButtonProps) {
  const handleClick = () => {
    const nextSection = document.getElementById(nextSectionId);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-indigo-500/15 z-20"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(99,102,241,0.3)",
      }}
      animate={{
        y: [0, 6, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        borderColor: "rgba(99,102,241,0.6)",
        scale: 1.05,
      }}
      aria-label="Scroll to next section"
    >
      <ChevronDown size={20} style={{ color: "#6366f1" }} />
    </motion.button>
  );
}
