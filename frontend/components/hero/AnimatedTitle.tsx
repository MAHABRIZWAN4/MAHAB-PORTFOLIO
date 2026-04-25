"use client";

import { motion } from "framer-motion";

const titles = [
  "AI-Powered Full Stack Developer",
  "Claude AI + Next.js Expert",
  "Building Intelligent Web Apps",
];

export default function AnimatedTitle() {
  return (
    <div className="h-16 flex items-center">
      <motion.div
        key="title-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-full"
      >
        {titles.map((title, index) => (
          <motion.h2
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: index === 0 ? [0, 1, 1, 0] : 0,
              y: index === 0 ? [20, 0, 0, -20] : 20,
            }}
            transition={{
              duration: 8,
              delay: index * 8,
              repeat: Infinity,
              repeatDelay: 16,
              ease: "easeInOut",
            }}
            className="absolute inset-0 text-3xl md:text-4xl font-heading font-bold gradient-text"
          >
            {title}
          </motion.h2>
        ))}
      </motion.div>
    </div>
  );
}
