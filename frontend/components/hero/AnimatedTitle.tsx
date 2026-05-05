"use client";

import { motion } from "framer-motion";

interface AnimatedTitleProps {
  titles: string[];
}

export default function AnimatedTitle({ titles }: AnimatedTitleProps) {
  return (
    <div className="h-16 flex text-white items-center py-6">
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
              opacity: [0, 1, 1, 0],
              y: [20, 0, 0, -20],
            }}
            transition={{
              duration: 2,
              delay: index * 3,
              repeat: Infinity,
              repeatDelay: 8 - index * 3,
              ease: "easeInOut",
            }}
            className="absolute inset-0 text-2xl md:text-3xl font-bold text-cyan-400"
          >
            {title}
          </motion.h2>
        ))}
      </motion.div>
    </div>
  );
}
