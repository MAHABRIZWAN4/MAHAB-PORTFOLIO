"use client";

import { motion } from "framer-motion";

interface StatsBarProps {
  stats: Array<{
    value: string;
    label: string;
  }>;
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 "
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-lg p-4 text-center border transition-colors"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          <div className="text-2xl md:text-3xl font-heading font-bold gradient-text">
            {stat.value}
          </div>
          <div className="text-sm mt-1" style={{ color: "var(--foreground-muted)" }}>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
