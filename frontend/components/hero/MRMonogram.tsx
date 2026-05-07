"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const techBadges = [
  { name: "Next.js", color: "#6366F1", angle: 0 },
  { name: "Claude AI", color: "#F59E0B", angle: 120 },
  { name: "FastAPI", color: "#14B8A6", angle: 240 },
];

export default function MRMonogram() {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const centerFill =
    mounted && theme === "light" ? "#FFFFFF" : "#1A1A1A";

  const centerStroke =
    mounted && theme === "light" ? "#E5E7EB" : "#27272A";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="
        relative
        w-[280px]
        h-[280px]
        sm:w-[360px]
        sm:h-[360px]
        md:w-[450px]
        md:h-[450px]
        lg:w-[550px]
        lg:h-[550px]
        xl:w-[650px]
        xl:h-[650px]
        flex
        items-center
        justify-center
      "
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full h-full"
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Outer Ring */}
          <motion.circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="2"
            strokeDasharray="4 4"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />

          {/* Ring 2 */}
          <motion.g
            animate={{
              rotate: isHovered ? -360 : -180,
            }}
            transition={{
              duration: isHovered ? 15 : 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              originX: "200px",
              originY: "200px",
            }}
          >
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="#14B8A6"
              strokeWidth="1.5"
              strokeDasharray="8 8"
              opacity="0.4"
            />

            {[0, 90, 180, 270].map((angle) => (
              <circle
                key={angle}
                cx={200 + 150 * Math.cos((angle * Math.PI) / 180)}
                cy={200 + 150 * Math.sin((angle * Math.PI) / 180)}
                r="4"
                fill="#14B8A6"
              />
            ))}
          </motion.g>

          {/* Ring 1 */}
          <motion.g
            animate={{
              rotate: isHovered ? 360 : 180,
            }}
            transition={{
              duration: isHovered ? 20 : 40,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              originX: "200px",
              originY: "200px",
            }}
          >
            <circle
              cx="200"
              cy="200"
              r="120"
              fill="none"
              stroke="#6366F1"
              strokeWidth="1.5"
              strokeDasharray="8 8"
              opacity="0.4"
            />

            {[0, 90, 180, 270].map((angle) => (
              <circle
                key={angle}
                cx={200 + 120 * Math.cos((angle * Math.PI) / 180)}
                cy={200 + 120 * Math.sin((angle * Math.PI) / 180)}
                r="4"
                fill="#6366F1"
              />
            ))}
          </motion.g>

          {/* Center */}
          <circle
            cx="200"
            cy="200"
            r="80"
            fill={centerFill}
            stroke={centerStroke}
            strokeWidth="2"
          />

          <text
            x="200"
            y="220"
            textAnchor="middle"
            style={{
              fontSize: "72px",
              fontWeight: 700,
              fill: mounted ? "#ffffff" : "#666666",
            }}
          >
            MR
          </text>

          <defs>
            <linearGradient
              id="gradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Badges */}
        {techBadges.map((badge, index) => {
          const badgeX =
            50 + 42 * Math.cos((badge.angle * Math.PI) / 180);

          const badgeY =
            50 + 42 * Math.sin((badge.angle * Math.PI) / 180);

          return (
            <motion.div
              key={badge.name}
              animate={{ rotate: 360 }}
              transition={{
                duration: isHovered ? 15 : 30,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.5,
              }}
              className="absolute inset-0"
            >
              <div
                style={{
                  position: "absolute",
                  top: `${badgeY}%`,
                  left: `${badgeX}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: isHovered ? 15 : 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileHover={{ scale: 1.1 }}
                  className="
                    px-3
                    py-1.5
                    rounded-full
                    text-[10px]
                    sm:text-xs
                    font-medium
                    text-white
                    shadow-xl
                    whitespace-nowrap
                  "
                  style={{
                    backgroundColor: badge.color,
                  }}
                >
                  {badge.name}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}