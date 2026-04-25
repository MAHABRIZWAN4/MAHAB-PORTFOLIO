"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "3+", label: "Apps Built" },
  { value: "50+", label: "Languages" },
  { value: "99%", label: "Uptime" },
  { value: "2+", label: "Years Exp" },
];

export default function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="glass rounded-lg p-4 text-center border border-border hover:border-accent/50 transition-colors"
        >
          <div className="text-2xl md:text-3xl font-heading font-bold gradient-text">
            {stat.value}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
