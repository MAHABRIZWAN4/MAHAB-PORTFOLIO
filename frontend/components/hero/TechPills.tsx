"use client";

import { motion } from "framer-motion";

const pills = [
  { icon: "⚡", label: "Next.js 15" },
  { icon: "🐍", label: "Python" },
  { icon: "🤖", label: "Claude AI" },
  { icon: "🐳", label: "Docker" },
  { icon: "☁️", label: "Kubernetes" },
];

export default function TechPills() {
  return (
    <div className="flex flex-wrap gap-2 mt-4 mb-6">
      {pills.map((pill, index) => (
        <motion.div
          key={pill.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.4 + index * 0.08,
            duration: 0.4,
            ease: "easeOut",
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
          style={{
            backgroundColor: "var(--badge-bg)",
            borderColor: "var(--border)",
            color: "var(--foreground-secondary)",
          }}
        >
          <span>{pill.icon}</span>
          <span>{pill.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
