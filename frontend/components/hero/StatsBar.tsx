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
      className="
        grid
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-4
        gap-3
        sm:gap-4
        md:gap-5
        lg:gap-6
        mt-8
        w-full
        max-w-5xl
        mx-auto
        px-2
      "
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.9 + index * 0.1,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="
            rounded-xl
            sm:rounded-2xl
            p-3
            sm:p-4
            md:p-5
            text-center
            border
            transition-all
            duration-300
            backdrop-blur-md
          "
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.transform =
              "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor =
              "var(--border)";
            e.currentTarget.style.transform =
              "translateY(0px)";
          }}
        >
          {/* VALUE */}
          <div
            className="
              font-heading
              font-bold
              gradient-text
              text-xl
              sm:text-2xl
              md:text-3xl
              lg:text-4xl
              leading-tight
            "
          >
            {stat.value}
          </div>

          {/* LABEL */}
          <div
            className="
              text-[10px]
              sm:text-xs
              md:text-sm
              mt-1
              sm:mt-2
              tracking-wide
              uppercase
            "
            style={{
              color: "var(--foreground-muted)",
            }}
          >
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}