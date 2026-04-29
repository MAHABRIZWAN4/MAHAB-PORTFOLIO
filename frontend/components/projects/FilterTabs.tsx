"use client";

import { motion } from "framer-motion";

interface FilterTabsProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterTabs({
  categories,
  activeFilter,
  onFilterChange,
}: FilterTabsProps) {
  return (
    <div className="flex gap-2 flex-wrap mb-8">
      {categories.map((category) => {
        const isActive = activeFilter === category;
        return (
          <motion.button
            key={category}
            onClick={() => onFilterChange(category)}
            className="relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: isActive ? "var(--accent)" : "transparent",
              color: isActive ? "white" : "var(--foreground-muted)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "var(--foreground)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "var(--foreground-muted)";
              }
            }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
