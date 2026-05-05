"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface AnimatedNameProps {
  name: string;
}

export default function AnimatedName({ name }: AnimatedNameProps) {
  const words = name.split(" ");
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeIn",
      },
    },
    hover: {
      scale: 1.2,
      y: -10,
      rotateY: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="inline"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {words.map((word, wordIndex) => (
        <span
          key={`word-${wordIndex}`}
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              variants={letterVariants}
              whileHover="hover"
              className="inline-block"
              style={{
                perspective: "1000px",
              }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && " "}
        </span>
      ))}
    </motion.div>
  );
}
