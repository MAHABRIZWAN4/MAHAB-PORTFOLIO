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

  const isLight = mounted && theme === "light";

  /* LIGHT MODE COLORS */
  const centerFill = isLight ? "#FFFFFF" : "#111827";

  const centerStroke = isLight
    ? "rgba(99,102,241,0.18)"
    : "#27272A";

  const textColor = isLight ? "#111827" : "#FFFFFF";

  const outerRingOpacity = isLight ? 0.55 : 0.3;

  const ringOpacity = isLight ? 0.55 : 0.4;

  const glowShadow = isLight
    ? "drop-shadow(0px 0px 30px rgba(99,102,241,0.18))"
    : "drop-shadow(0px 0px 45px rgba(99,102,241,0.25))";

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
      {/* LIGHT MODE GLOW */}
      {isLight && (
        <>
          <div
            className="absolute w-[65%] h-[65%] rounded-full blur-[90px] opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.20) 0%, rgba(20,184,166,0.15) 45%, transparent 75%)",
            }}
          />

          <div
            className="absolute w-[45%] h-[45%] rounded-full blur-[70px] opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.95) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full h-full"
        style={{
          filter: glowShadow,
        }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* OUTER RING */}
          <motion.circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="2"
            strokeDasharray="4 4"
            animate={{
              opacity: [
                outerRingOpacity,
                outerRingOpacity + 0.2,
                outerRingOpacity,
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />

          {/* TEAL RING */}
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
              opacity={ringOpacity}
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

          {/* INDIGO RING */}
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
              opacity={ringOpacity}
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

          {/* CENTER CIRCLE */}
          <circle
            cx="200"
            cy="200"
            r="80"
            fill={centerFill}
            stroke={centerStroke}
            strokeWidth="2"
          />

          {/* INNER GLOW */}
          {isLight && (
            <circle
              cx="200"
              cy="200"
              r="70"
              fill="url(#innerGlow)"
              opacity="0.8"
            />
          )}

          {/* MR TEXT */}
          <text
            x="200"
            y="220"
            textAnchor="middle"
            style={{
              fontSize: "72px",
              fontWeight: 700,
              fill: textColor,
              letterSpacing: "-2px",
            }}
          >
            MR
          </text>

          {/* GRADIENTS */}
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

            <radialGradient id="innerGlow">
              <stop
                offset="0%"
                stopColor="rgba(255,255,255,0.95)"
              />
              <stop
                offset="100%"
                stopColor="rgba(255,255,255,0)"
              />
            </radialGradient>
          </defs>
        </svg>

        {/* TECH BADGES */}
        {techBadges.map((badge, index) => {
          const badgeX =
            50 + 42 * Math.cos((badge.angle * Math.PI) / 180);

          const badgeY =
            50 + 42 * Math.sin((badge.angle * Math.PI) / 180);

          return (
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
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: isHovered ? 15 : 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileHover={{
                    scale: 1.1,
                  }}
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
                    backdrop-blur-md
                  "
                  style={{
                    backgroundColor: badge.color,
                    boxShadow: isLight
                      ? "0 10px 25px rgba(0,0,0,0.08)"
                      : "0 10px 25px rgba(0,0,0,0.35)",
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