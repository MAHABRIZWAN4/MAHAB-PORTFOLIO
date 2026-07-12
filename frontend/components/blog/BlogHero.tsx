"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function BlogHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-white dark:bg-[#0A0E18]">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-100/40 via-white to-cyan-100/40 dark:from-violet-900/20 dark:via-[#0A0E18] dark:to-cyan-900/20" />

      {/* Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-violet-500/20 dark:bg-violet-500/30 rounded-full blur-[120px]"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/30 rounded-full blur-[120px]"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-200 dark:border-white/10"
        >
          <Sparkles size={16} className="text-violet-500 dark:text-violet-400" />
          <span className="text-sm text-gray-700 dark:text-white/70">Thoughts, Ideas & Learning</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400">
            Blog
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-600 dark:text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          Deep dives into AI agents, web development, and the future of software engineering.
          Real experiences from building in the trenches.
        </motion.p>
      </div>
    </section>
  );
}
