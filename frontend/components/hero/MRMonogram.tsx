"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const techBadges = [
  { name: "Next.js", color: "#6366F1", angle: 0 },
  { name: "Claude AI", color: "#F59E0B", angle: 120 },
  { name: "FastAPI", color: "#14B8A6", angle: 240 },
];

export default function MRMonogram() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* Floating Animation Container */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          className="w-full h-full max-w-md"
        >
          {/* Ring 3 - Pulsing Outer Ring */}
          <motion.circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="2"
            strokeDasharray="4 4"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Ring 2 - Counter-rotating with Teal Dots */}
          <motion.g
            animate={{
              rotate: isHovered ? -360 : -180,
            }}
            transition={{
              duration: isHovered ? 15 : 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ originX: "200px", originY: "200px" }}
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
                key={`teal-${angle}`}
                cx={200 + 150 * Math.cos((angle * Math.PI) / 180)}
                cy={200 + 150 * Math.sin((angle * Math.PI) / 180)}
                r="4"
                fill="#14B8A6"
              />
            ))}
          </motion.g>

          {/* Ring 1 - Rotating with Indigo Dots */}
          <motion.g
            animate={{
              rotate: isHovered ? 360 : 180,
            }}
            transition={{
              duration: isHovered ? 20 : 40,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ originX: "200px", originY: "200px" }}
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
                key={`indigo-${angle}`}
                cx={200 + 120 * Math.cos((angle * Math.PI) / 180)}
                cy={200 + 120 * Math.sin((angle * Math.PI) / 180)}
                r="4"
                fill="#6366F1"
              />
            ))}
          </motion.g>

          {/* Center Circle with MR */}
          <circle cx="200" cy="200" r="80" fill="#1A1A1A" stroke="#27272A" strokeWidth="2" />
          <text
            x="200"
            y="220"
            textAnchor="middle"
            className="font-heading"
            style={{
              fontSize: "64px",
              fontWeight: 500,
              fill: "url(#gradient2)",
            }}
          >
            MR
          </text>

          {/* Gradients */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Orbiting Tech Badges */}
        {techBadges.map((badge, index) => (
          <motion.div
            key={badge.name}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: isHovered ? 15 : 30,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.5,
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "220px",
              height: "220px",
              marginLeft: "-110px",
              marginTop: "-110px",
            }}
          >
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: isHovered ? 15 : 30,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.5,
              }}
              style={{
                position: "absolute",
                top: `${50 + 50 * Math.sin((badge.angle * Math.PI) / 180)}%`,
                left: `${50 + 50 * Math.cos((badge.angle * Math.PI) / 180)}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-lg"
                style={{
                  backgroundColor: badge.color,
                }}
              >
                {badge.name}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
